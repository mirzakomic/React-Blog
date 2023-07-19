import axios from "axios";
import { useEffect, useState } from "react";
import CreatePostForm from "../components/CreatePostForm";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/posts");
      setPosts(data);
    };
    fetchData();
  }, [refresh]);
  console.log(posts);

  const deletePost = async (postId) => {
    try {
        const {data} = await axios.delete(`/api/delete/${postId}`)
        setRefresh(prev => !prev)
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <>
      <h1>Add a post</h1>
      <div className="create-post-container"><CreatePostForm setRefresh = {setRefresh} /></div>
      <h1>All posts</h1>
      <main>
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <button onClick={()=>deletePost(post._id)}>Delete</button>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
