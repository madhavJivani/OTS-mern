import { Notice } from '../models/notice.model.js';
import mongoose from 'mongoose';

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
                .json({ error: "All fields (title, short description, and detailed description) are required.", success: false });
        }
        try {
            const newNotice = new Notice({
                title: title,
                short_description: short_description,
                detailed_description: detailed_description,
                postedBy: req_user._id
            });
            const createdNotice = await newNotice.save();
            if(!createdNotice) {
                return res
                    .status(500)
                    .json({ error: "Failed to save the notice. Please try again later.", success: false });
            }
            return res
                .status(201)
                .json({ message: "Notice created successfully", success: true , notice: createdNotice });
        } catch (error) {
            console.log(`Error while creating the Notice: ${error.message}`);
            return res
                .status(500)
                .json({ error: "An unexpected error occurred while creating the notice. Please try again later.", success: false });
            
        }
    } catch (error) {
        console.log(`Error in createNotice: ${error.message}`);
        return res
            .status(500)
            .json({ error: "Internal Server Error", success: false });
    }
};

export const getNotices = async (req, res) => { 
    try {
        const notices = await Notice.aggregate([
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
                    path : "$postedBy",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    title: 1,
                    short_description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "author_name": "$postedBy.name",
                    "author_avatar": "$postedBy.avatar_url",
                    "author_role": "$postedBy.role"
                }
            }
        ]);
        
        // Check if notices are empty
        if (!notices || notices.length === 0) {
            return res.status(404).json({
                error: "No notices available at the moment.",
                success: false
            });
        }

        return res
            .status(200)
            .json({ message: "Notices found successfully", success: true , notices: notices });
    } catch (error) {
        console.log(`Error in getNotices: ${error.message}`);
        return res
            .status(500)
            .json({ error: "An unexpected error occurred while fetching notices. Please try again later.", success: false });
    }
};

export const getNotice = async (req, res) => { 
    try {
        // console.log(req.params.id);
        const notice = await Notice.aggregate([
            // match the notice id
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            // lookup the user who posted the notice
            {
                $lookup: {
                    from: "users",
                    localField: "postedBy",
                    foreignField: "_id",
                    as: "postedBy"
                }
            },
            // unwind the user object
            {
                $unwind: {
                    path : "$postedBy",
                    preserveNullAndEmptyArrays: true
                }
            },
            // project the required fields
            {
                $project: {
                    title: 1,
                    short_description: 1,
                    detailed_description: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "author_name": "$postedBy.name",
                    "author_email" : "$postedBy.email",
                    "author_avatar": "$postedBy.avatar_url",
                    "author_role": "$postedBy.role"
                }
            }
        ]);
        // console.log(notice);
        // Check if notice is empty
        if (!notice || notice.length === 0) {
            return res.status(404).json({
                error: "No notice found with the provided id.",
                success: false
            });
        }
        return res.status(200).json({ message: "Notice found successfully", success: true , notice: notice[0] });

    } catch (error) {
        console.log(`Error in getNotice: ${error.message}`);
        return res
            .status(500)
            .json({ error: "Internal Server Error", success: false });
    }
};

export const updateNotice = async (req, res) => { 
    try {
        const notice = await Notice.findById(req.params.id);
        if(!notice) {
            return res
                .status(404)
                .json({ error: "The notice to be updated does not exist or may have been removed.", success: false });
        }
        const { title, short_description, detailed_description } = req.body;
        if (!(title || short_description || detailed_description)) { 
            return res
                .status(400)
                .json({ error: "No update data provided. Please update at least one of (title or short description or detailed description).", success: false });
        }
        try {
            if (title)
                notice.title = title;
            if (short_description)
                notice.short_description = short_description;
            if (detailed_description)
                notice.detailed_description = detailed_description;
            const updatedNotice = await notice.save();
            if(!updatedNotice) {
                return res
                    .status(500)
                    .json({ error: "An unexpected error occurred while updating the notice. Please try again later.", success: false });
            }
            return res
                .status(201)
                .json({ message: "Notice updated successfully", success: true , notice: updatedNotice });
        } catch (error) {
            console.log(`Error Updating the notice: ${error.message}`);
            return res
                .status(500)
                .json({ error: "An unexpected error occurred while updating the notice. Please try again later.", success: false });
            
        }
    } catch (error) {
        console.log(`Error in updateNotice: ${error.message}`);
        return res
            .status(500)
            .json({ error: "Internal Server Error", success: false });
        
    }
};

export const deleteNotice = async (req, res) => { 
    try {
        const notice = await Notice.findById(req.params.id);
        if(!notice) {
            return res
                .status(404)
                .json({ error: "The notice to be deleted does not exist or may have been removed.", success: false });
        }
        try {
            const deletedNotice = await Notice.deleteOne({ _id: notice._id });
            if(!deletedNotice) {
            return res
                .status(500)
                .json({ error: "An unexpected error occurred while deleting the notice. Please try again later.", success: false });
            }
        } catch (error) {
            console.log(`Error while deleting the Notice: ${error.message}`);
            return res
            .status(500)
                .json({ error: "An unexpected error occurred while deleting the notice. Please try again later.", success: false });
        }
        return res
            .status(200)
            .json({ message: "Notice deleted successfully", success: true });
    } catch (error) {
        console.log(`Error in deleteNotice: ${error.message}`);
        return res
            .status(500)
            .json({ error: "Internal Server Error", success: false });
    }
};