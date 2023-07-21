import axios from "axios"

const PostImage = ({setRefresh}) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const response = await axios.post("/api/posts", formData)
        setRefresh(prev=> !prev)
        console.log(response);
        e.target.reset()
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" name="title" />
            <textarea type="text" placeholder="content" name="content" />
            <input type="text" placeholder="author" name="author" value="64ba363882c1c2596896dd2f"/>
            <input type="file" placeholder="image" name="image"/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}
 
export default PostImage;