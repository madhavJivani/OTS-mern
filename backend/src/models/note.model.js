import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
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
    material_url: {
        type: String, //cloudinary url or google drive url
        required: true
    },
    subject: {
        type: String, // define subject's enums in frontend [Currently consider only PCM]
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
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Note = mongoose.model("Note", noteSchema);