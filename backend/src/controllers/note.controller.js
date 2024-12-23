import { Note } from "../models/note.model.js";
import { uploadToCloudinary } from '../utils/cloudinary.service.js'

export const createNote = async (req, res) => { 
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: "Unauthorized request" , success: false });
    }
    const { title, description, subject, linkOption_status, linkOption_link } = req.body;
    console.log(title, description, subject, linkOption_status, linkOption_link);
    if (linkOption_status === null || linkOption_status === undefined) { 
        return res.status(400).json({ error: "Link status is must" , success: false });
    }
    try {
        if (linkOption_status === "self") {
            // self or upload are possible values
            if (!title || !description || !subject || !linkOption_link) {
                return res.status(400).json({ error: "Title,Description,Subject,Link are compulsory" , success: false });
            }
            let note;
            try {
                note = new Note({
                    title: title,
                    description: description,
                    subject: subject,
                    material_url: linkOption_link,
                    postedBy: user._id
                });
                await note.save();
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Error while saving your material" , success: false });
                
            }
            if(!note) {
                return res.status(500).json({ error: "Error while saving your material or file" , success: false });
            }

            return res.status(201).json({ message: "Note created successfully" , success: true });
        }
        else { 
            if (!title || !description || !subject) {
                return res.status(400).json({ error: "Title,Description,Subject are required", success: false });
            }
            if (!req.files || !req.files.material) {
                return res.status(400).json({ error: "Files is required", success: false });
            }
            const materialLocalPath = req.files.material[0].path;
            if (!materialLocalPath) { 
                return res.status(400).json({ error: "Material not recived",success: false });
            }
            const result = await uploadToCloudinary(materialLocalPath);
            if (!result) {
                return res.status(500).json({ error: "Error while processing your file",success: false });
            }
            let note;
            try {
                note = new Note({
                    title: title,
                    description: description,
                    subject: subject,
                    material_url: result.secure_url,
                    postedBy: user._id
                });
                await note.save();
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Error while saving your material",success: false });
            }
            if(!note) {
                return res.status(500).json({ error: "Error while saving your material or file",success: false });
            }
            return res.status(201).json({ message: "Note created successfully",success: true });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};