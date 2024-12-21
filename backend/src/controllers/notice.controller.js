import {Notice} from '../models/notice.model.js';

/**
 * In any controller we always return a response to the client in specific format.
 * 
 * Format
 * 
 * if success: we always return a status code, a json object with a message(string) key and success(boolean). 
 * if error: we always return a status code, a json object with a error(string) key and success(boolean).
 */

export const createNotice = async (req, res) => { 
    try {
        const req_user = req.user;
        const { title, short_description, detailed_description } = req.body;
        // console.log(title, short_description, detailed_description, req_user, req.body);
        if (!title || !short_description || !detailed_description) { 
            return res
                .status(400)
                .json({ error: "Please enter all the fields", success: false });
        }
        try {
            const newNotice = new Notice({
                title: title,
                short_description: short_description,
                detailed_description: detailed_description,
                author: req_user.name,
                postedBy: req_user._id
            });
            const createdNotice = await newNotice.save();
            if(!createdNotice) {
                return res
                    .status(500)
                    .json({ error: "Error while saving the Notice", success: false });
            }
            return res
                .status(201)
                .json({ message: "Notice created successfully", success: true , notice: createdNotice });
        } catch (error) {
            console.log(`Error while creating the Notice: ${error.message}`);
            return res
                .status(500)
                .json({ error: "Error while creating the Notice", success: false });
            
        }
    } catch (error) {
        console.log(`Error in createNotice: ${error.message}`);
        return res
            .status(500)
            .json({ error: "Internal Server Error", success: false });
    }
};
