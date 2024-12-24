import { Note } from "../models/note.model.js";
import mongoose from "mongoose";
import { uploadRawToCloudinary ,deleteFromCloudinary } from '../utils/cloudinary.service.js'

export const createNoteWithLink = async (req, res) => { 
    const in_user = req.user;
    if (!in_user) {
        return res.status(401).json({ error: "Unauthorized request no user found" , success: false});
    }
    const { title, description, material_url, subject } = req.body;
    if (!title || !description || !material_url || !subject) {
        console.log(title, description, material_url, subject,req.body);
        return res.status(400).json({ error: "Please fill all fields", success: false });
    }
    try {
        const newNote = new Note({
            title: title,
            description: description,
            material_url: material_url,
            subject: subject,
            postedBy: in_user._id
        });
        await newNote.save();
        return res.status(201).json({ message: "Note created successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};

export const createNoteWithFile = async (req, res) => {
    const in_user = req.user;
    if (!in_user) {
        return res.status(401).json({ error: "Unauthorized request no user found", success: false });
    }
    const { title, description, subject } = req.body;
    if (!title || !description || !subject) {
        return res.status(400).json({ error: "Please fill all fields", success: false });
    }
    // first try to get the pdf or the file from user via req.files
    // second try to upload the obtained file to cloudinary server
    // third save the file url to the database
    let materialLocalPath, materialCloudinaryUrl;
    try {
        if (!req.files || !req.files.material) {
            console.log(req.files, req.files?.material);
            return res.status(400).json({ error: "Please upload a file", success: false });
        }
        materialLocalPath = req.files.material[0].path;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Unable to retreive file", success: false });
    }

    try {
        if (materialLocalPath) {
            materialCloudinaryUrl = await uploadRawToCloudinary(materialLocalPath);
        }
        else { 
            return res.status(500).json({ error: "Unable to access file", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Cloudianry Upload error", success: false });
    }
    try {
        if (materialCloudinaryUrl) {
            const newNote = new Note({
                title: title,
                description: description,
                material_url: materialCloudinaryUrl.secure_url,
                subject: subject,
                postedBy: in_user._id
            });
            await newNote.save();
            return res.status(201).json({ message: "Note created successfully", success: true });
        }
        else { 
            return res.status(500).json({ error: "Unable to upload file to our servers, Please try again later !!", success: false });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};


export const getNotes = async (req, res) => { 
    try {
        try {
            const notices = await Note.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "postedBy",
                        foreignField: "_id",
                        as: "postedBy"
                    }
                }, {
                    $unwind: {
                        path: "$postedBy",
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $project: {
                        title: 1,
                        description: 1,
                        material_url: 1,
                        subject: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        "author_name": "$postedBy.name",
                        "author_avatar": "$postedBy.avatar_url",
                        "author_role": "$postedBy.role"
                    }
                },
            ]);
            return res.status(200).json({ notes: notices, success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};

export const getNotesBySubject = async (req, res) => { 
    try {
        const notes = await Note.aggregate([
            {
                $match: {
                    subject: req.params.subject
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "postedBy"
                }
            },
            {
                $unwind: {
                    path: "$postedBy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    material_url: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "author_name": "$postedBy.name",
                    "author_avatar": "$postedBy.avatar_url",
                    "author_role": "$postedBy.role"
                }
            }
        ]);
        if (!notes || notes.length === 0) {
            return res.status(404).json({
                error: "No Notes found with the provided subject.",
                success: false
            });
        }
        return res.status(200).json({ message: "Notes found successfully", success: true, notes: notes , subject : req.params.subject });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
    
};

export const getNote = async (req, res) => { 
    try {
        const note = await Note.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "postedBy"
                }
            },
            {
                $unwind: {
                    path: "$postedBy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    material_url: 1,
                    subject:1,
                    createdAt: 1,
                    updatedAt: 1,
                    "author_name": "$postedBy.name",
                    "author_email": "$postedBy.email",
                    "author_avatar": "$postedBy.avatar_url",
                    "author_role": "$postedBy.role"
                }
            }
        ]); 
        if (!note || note.length === 0) {
            return res.status(404).json({
                error: "No Note found with the provided id.",
                success: false
            });
        }
        return res.status(200).json({ message: "Note found successfully", success: true, note: note[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};

export const deleteNote = async (req, res) => { 
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found", success: false });
        }
        const note_material_url = note.material_url;
        if (note_material_url) {
            await deleteFromCloudinary(note_material_url);
        }

        return res.status(200).json({ message: "Note deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", success: false });
    }
};