import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        imutable: true,

    },
    image: {
        type: {
            url: String,
            imageId: String,
        },
        required: true
    }
});

export const Post = mongoose.model("Post", postSchema);