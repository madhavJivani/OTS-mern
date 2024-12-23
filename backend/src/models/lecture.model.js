import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    lecture_url: {
        type: String, //cloudinary url or google drive url
        required: true
    },
    subject: {
        type: String, // define subject's enums in frontend [Currently consider only PCM]
        required: true,
        index: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

export const Lecture = mongoose.model("Lecture", lectureSchema);