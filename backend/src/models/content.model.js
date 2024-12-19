import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    short_description: {
        type: String,
        required: true
    },
    detailed_description: {
        type: String,
        required: true
    },
    content_url: {
        type: String, //cloudinary url or youtube url
        required: true
    },
    topic: {
        type: String, // define topic's enums in frontend
        required: true,
        index: true
    },
    author: {
        type: String, // fetch from postedBy(user.name)
        required: true,
        index: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Content = mongoose.model("Content", contentSchema);