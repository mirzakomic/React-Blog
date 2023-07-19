import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

export const Author = mongoose.model("Author", authorSchema)