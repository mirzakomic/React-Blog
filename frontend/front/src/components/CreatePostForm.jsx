import { useRef } from "react";
import axios from "axios";

const CreatePostForm = ({setRefresh}) => {
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();

    const sendData = async () => {
        const newPost = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            author: authorRef.current.value
        }
        const {data} = await axios.post("/api/posts", newPost)
        //* Data ist schon destructered weil axios es erlaubt, statt response und dann response.data
        console.log(data);
        setRefresh(prev => !prev)
        
    }

    return (
        <div className="create-post-container">
            <input placeholder="type in title" type="text" ref={titleRef}/>
            <textarea id="content" placeholder="type in content" type="text" ref={contentRef}/>
            <input placeholder="type in author" type="text" ref={authorRef}/>
            <button onClick={sendData}>Send</button>
        </div>
    );
}
 
export default CreatePostForm;