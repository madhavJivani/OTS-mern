import { Lecture } from "../models/lecture.model";
import { uploadVideoToCloudinary } from '../utils/cloudinary.service.js'

export const createLectureWithLink = async (req, res) => { 
    const { title, description, lecture_url, subject } = req.body;
    if (!title || !description || !lecture_url || !subject) {
        return res.status(400).json({ error: "Please fill all the fields" ,success: false});
    }
    const user = req.user;
    try {
        const lecture = new Lecture({
            title: title,
            description: description,
            lecture_url: lecture_url,
            subject: subject,
            postedBy: user._id
        });
        await lecture.save();
        res.status(201).json({message: "Lecture uploaded successfully", success: true});
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error", success: false });
    }
};

export const createLectureWithVideo = async (req, res) => { 
    const { title, description, subject } = req.body;
    if (!title || !description || !subject) {
        return res.status(400).json({ error: "Please fill all the fields" ,success: false});
    }
    const user = req.user;
    // for getting the file
    let lectureLocalPath, lectureUrl;
    try {
        if (!req.file || !req.file.lecture) {
            return res.status(400).json({ error: "Please upload a video file", success: false });
        }
        lectureLocalPath = req.file.lecture[0].path;
    } catch (error) {
        res.status(500).json({ error: "Could not access your file", success: false });
    }
    // try to upload the file to cloudinary
    if (!lectureLocalPath) {
        return res.status(500).json({ error: "Could not access your file", success: false });

    }
    try {
        lectureUrl = await uploadVideoToCloudinary(lectureLocalPath);
        return res.status(500).json({ error: "Could not access your file", success: false });
        
    } catch (error) {
        res.status(500).json({ error: "Could not upload your file", success: false });
    }
    if (!lectureUrl) {
        return res.status(500).json({ error: "Could not upload your file", success: false });
    }
    lectureUrl = lectureUrl.secure_url;

    try {
        const lecture = new Lecture({
            title: title,
            description: description,
            lecture_url: lectureUrl,
            subject: subject,
            postedBy: user._id
        });
        await lecture.save();
        res.status(201).json({message: "Lecture uploaded successfully", success: true});
    } catch (error) {
        res.status(400).json({ error: "Error saving your lecture", success: false });
    }
};

export const getAllLectures = async (req, res) => {
    try {
        const lectures = await Lecture.aggregate([
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
                    lecture_url: 1,
                    subject: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    author_name: "$postedBy.name",
                    author_avatar: "$postedBy.avatar_url",
                    author_role: "$postedBy.role"
                }
            }
        ]);
        res.status(200).json({lectures: lectures, success: true});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

export const getLecture = async () => { 
    const lectureId = req.params.id;
    if (!lectureId) {
        return res.status(400).json({ error: "Please provide a lecture ID", success: false });
    }
    try {
        const lecture = await Lecture.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(lectureId)
                }
            }, {
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
                    lecture_url: 1,
                    subject: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    author_name: "$postedBy.name",
                    author_email : "$postedBy.email",
                    author_avatar: "$postedBy.avatar_url",
                    author_role: "$postedBy.role"
                }
            }
        ]);
        if (lecture.length === 0) {
            return res.status(404).json({ error: "Lecture not found", success: false });
        }
        res.status(200).json({ lecture: lecture[0], success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

export const updateLecture = async (req, res) => { 
    const lectureId = req.params.id;
    const { title, description, subject } = req.body;
    if (!lectureId) {
        return res.status(400).json({ error: "Please provide a lecture ID", success: false });
    }
    if (!title || !description || !subject) {
        return res.status(400).json({ error: "Please fill all the fields", success: false });
    }
    try {
        await Lecture.findByIdAndUpdate(lectureId, {
            title: title,
            description: description,
            subject: subject
        });
        res.status(200).json({ message: "Lecture updated successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

export const deleteLecture = async (req, res) => { 
    const lectureId = req.params.id;
    if (!lectureId) {
        return res.status(400).json({ error: "Please provide a lecture ID", success: false });
    }
    try {
        await Lecture.findByIdAndDelete(lectureId);
        res.status(200).json({ message: "Lecture deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};