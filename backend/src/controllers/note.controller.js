import { Note } from "../models/note.model.js";
import { uploadRawToCloudinary } from '../utils/cloudinary.service.js'

export const createNoteWithLink = async (req, res) => { 
    const in_user = req.user;
    if (!in_user) {
        return res.status(401).json({ message: "Unauthorized request no user found" , success: false});
    }
    const { title, description, material_url, subject } = req.body;
    if (!title || !description || !material_url || !subject) {
        console.log(title, description, material_url, subject,req.body);
        return res.status(400).json({ message: "Please fill all fields", success: false });
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
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const createNoteWithFile = async (req, res) => {
    const in_user = req.user;
    if (!in_user) {
        return res.status(401).json({ message: "Unauthorized request no user found", success: false });
    }
    const { title, description, subject } = req.body;
    if (!title || !description || !subject) {
        return res.status(400).json({ message: "Please fill all fields", success: false });
    }
    // first try to get the pdf or the file from user via req.files
    // second try to upload the obtained file to cloudinary server
    // third save the file url to the database
    let materialLocalPath, materialCloudinaryUrl;
    try {
        if (!req.files || !req.files.material) {
            console.log(req.files, req.files?.material);
            return res.status(400).json({ message: "Please upload a file", success: false });
        }
        materialLocalPath = req.files.material[0].path;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to retreive file", success: false });
    }

    try {
        if (materialLocalPath) {
            materialCloudinaryUrl = await uploadRawToCloudinary(materialLocalPath);
        }
        else { 
            return res.status(500).json({ message: "Unable to access file", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Cloudianry Upload error", success: false });
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
            return res.status(500).json({ message: "Unable to upload file to our servers, Please try again later !!", success: false });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};