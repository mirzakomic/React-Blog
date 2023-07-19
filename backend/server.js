import express, { response } from "express"
import {Post} from "./models/PostModel.js"
import { Author } from "./models/AuthorModel.js";
import "./models/index.js"

const app = express();
const PORT = 3001;
app.use(express.json())

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
app.get("/api/posts", async (req,res)=> {
    const data = await Post.find()
    res.json(data)
})

app.get("/api/posts/:authorId", async (req, res) => {
    try {
        const authorId = req.params.authorId
        const posts = await Post.find({author : authorId})
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.send("something went wrong")
    }
})

//* Einen post erstellen und in die DB speichern
app.post("/api/posts", async (req,res)=> {
    try {
        const response = await Post.create(req.body)
        res.json(response)
    } catch (error) {
        console.error(error);
    }
})

app.post("/api/newAuthor", async (req,res) => {
    try {
        const newAuthor = await Author.create(req.body)
        res.json(newAuthor)
    } catch(err) {
        console.error(err);
        res.send("There was an error")
    }
})

app.put("/api/editPost/:id", async (req,res) => {
    const edits = req.body
    const postId = req.params.id
    try {
        const dbRes = await Post.findByIdAndUpdate(postId, edits, {new:true})
        res.json(dbRes)
    } catch(error) {
        console.error(error);
    }
})

app.delete("/api/delete/:id", async (req,res) => {
    const postId = req.params.id
    try {
        const dbRes = await Post.findByIdAndRemove(postId)
        res.send("Deleted")
    } catch (error) {
        console.error(error);
        response.send("Error")
    }
})

// findPost("Sanja");

// addPost({
//     title: "Mein erster Post",
//     content: "Hallo, liebes Tagebuch!",
//     author: "Mirza Komic"
// })

app.listen(PORT, ()=> console.log(`On port: ${PORT}`));