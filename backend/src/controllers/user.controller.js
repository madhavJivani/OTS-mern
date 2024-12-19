import { User } from "../models/user.model.js";
import { uploadToCloudinary } from '../utils/cloudinary.service.js'
import { deleteFile } from '../utils/helpers.js';
/**
 * In any controller we always return a response to the client in specific format.
 * 
 * Format
 * 
 * if success: we always return a status code, a json object with a message(string) key and success(boolean). 
 * if error: we always return a status code, a json object with a error(string) key and success(boolean).
 */

const registerUser = async (req, res) => { 
    try {
        // we got to handle : name , email, password, role , avatar-file - produce a url and store it.

        // accept name , email, password, role from req.body
        const { name, email, password, role } = req.body;
        // console.log(name, email, password, role, req.body);
        if (!name || !email || !password || !role) {
            if (req.files && req.files.avatar) { 
                const image_local_path = req.files.avatar[0].path;
                deleteFile(image_local_path);
            }
            
            return res.status(400).json({ error: "Please fill all of them name , email, password, role" , success: false });
        }

        // if the email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            if (req.files && req.files.avatar) {
                const image_local_path = req.files.avatar[0].path;
                deleteFile(image_local_path);
            }
            return res.status(409).json({ error: "User already exists.Try with another email" , success: false });
        }
        let avatarResponse = null;
        if (req.files && req.files.avatar) {
            // accept avatar file from req.files and check if we get files , then do we get files.avatar
            // get the avatar file from req.files and save it to cloudinary and get the url
            // console.log(req.files.avatar[0]);
            // ------------- remember to extarct out element from array and extarct path out of it too.
            const avatarLocalFilePath = req.files.avatar[0].path;
            try {
                avatarResponse = await uploadToCloudinary(avatarLocalFilePath);
                if (!avatarResponse) {
                    return res.status(500).json({ error: "Error while recieving response from cloudinary", success: false });
                }
                // console.log(`avatarResponse: ${avatarResponse}`);
            } catch (error) {
                console.log(`Error in uploading image to cloudinary: ${error.message} || from user.controller.js`);
                return res.status(500).json({ error: "Error while uploading image to cloudinary", success: false });
            }
        }
        

        // create a new user with the details
        let user;
        try {
            if (!avatarResponse) {
                user = new User({ name, email, password, role });
            } else { 
                user = new User({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    avatar_url: avatarResponse.url
                });
            }
        } catch (error) {
            console.log(`Error in saving the user: ${error.message} || from user.model.js`);
            return res.status(500).json({ error: "Error while creating user(1)" , success: false });
        }

        if(!user){
            return res.status(500).json({ error: "Error while creating user(2)" , success: false });
        }

        // save the user to the database
        try {
            await user.save();
        } catch (error) {
            console.log(`Error in saving the user: ${error.message} || from user.controller.js`);
            return res.status(500).json({ error: "Error while creating user(3)" , success: false });
        }
        // return the response flowing the specific format

        return res
            .status(201)
            .json({
                message: "User registered successfully",
                success: true,
                user: user
            });


    } catch (error) {
        console.log(`Error in registerUser: ${error.message} || from user.controller.js`);
        res.
            status(500)
            .json({
                error: "Internal Server Error",
                success: false
            });
    }
};


export { registerUser };