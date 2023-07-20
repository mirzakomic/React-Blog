import "./config/config.js"
import express, { response } from "express";
import { Post } from "./models/PostModel.js";
import { Author } from "./models/AuthorModel.js";
import "./models/index.js";
import multer from "multer";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 3001;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(morgan("dev"));

// const addPost = async (post) => {
//     const newPost = new Post(post)
//     const response = await newPost.save();
//     console.log(response);
// }

// const findPost = async (searchAuth) => {
//     const posts = await Post.find({author: searchAuth})
//     console.log(posts);
// }

//* Alle posts ausgeben
app.get("/api/posts", async (req, res) => {
  const data = await Post.find();
  res.json(data);
});

app.get("/api/posts/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await Post.find({ author: authorId });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.send("something went wrong");
  }
});

//* Einen post erstellen und in die DB speichern
app.post("/api/posts", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    if (Author === null) {
        return res.send("Author invalid")
    }
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "BlogImgs" },
        async (err, result) => {
          const response = await Post.create({
            ...req.body,
            image: { url: result.secure_url, imageId: result.public_id },
          });
          res.json(response);
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/newAuthor", async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.json(newAuthor);
  } catch (err) {
    console.error(err);
    res.send("There was an error");
  }
});

app.put("/api/editPost/:id", async (req, res) => {
  const edits = req.body;
  const postId = req.params.id;
  try {
    const dbRes = await Post.findByIdAndUpdate(postId, edits, { new: true });
    res.json(dbRes);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const dbRes = await Post.findByIdAndRemove(postId);
    cloudinary.uploader.destroy(dbRes.image?.imageId)
    res.send("Deleted");
  } catch (error) {
    console.error(error);
    response.send("Error");
  }
});

// findPost("Sanja");

// addPost({
//     title: "Mein erster Post",
//     content: "Hallo, liebes Tagebuch!",
//     author: "Mirza Komic"
// })

app.listen(PORT, () => console.log(`On port: ${PORT}`));
