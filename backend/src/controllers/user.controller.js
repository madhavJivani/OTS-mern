import { User } from "../models/user.model.js";
import { uploadToCloudinary , deleteFromCloudinary } from '../utils/cloudinary.service.js'
import { deleteFile } from '../utils/helpers.js';
import jwt from 'jsonwebtoken';
/**
 * In any controller we always return a response to the client in specific format.
 * 
 * Format
 * 
 * if success: we always return a status code, a json object with a message(string) key and success(boolean). 
 * if error: we always return a status code, a json object with a error(string) key and success(boolean).
 */

const gen_tokens = async (user_id) => {
    const user = await User.findById(user_id);
    if (!user) {
        console.log(`Error in generating tokens: User not found`);
        return { accessToken: null, refreshToken: null };
    }
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        try {
            await user.save({validateBeforeSave: false});
        } catch (error) {
            console.log(`Error in saving the refreshToken to database: ${error.message} || from user.controller.js`);
            return { accessToken: null, refreshToken: null };
        }

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(`Error in generating tokens(2): ${error.message}`);
        return { accessToken: null, refreshToken: null };
    }
};

const options = {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    path: '/',
    withCredentials: true,
}
//exportable functions

export const registerUser = async (req, res) => { 
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
            
            return res.status(400).json({ error: "All fields (name, email, password, role) are required." , success: false });
        }

        // if the email already exists
        const userExists = await User.findOne({ email });
        // console.log(req.files);
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
                    return res.status(500).json({ error: "Failed to retrieve response from Cloudinary. Please try again.", success: false });
                }
                // console.log(`avatarResponse: ${avatarResponse}`);
            } catch (error) {
                console.log(`Error in uploading image to cloudinary: ${error.message} || from user.controller.js`);
                return res.status(500).json({ error: "Failed to upload avatar. Ensure the file is valid and try again.", success: false });
            }
        }
        

        // create a new user with the details
        let user;
        try {
            if (!avatarResponse) {
                user = new User({ name, email, password, role, refreshToken: null });
            } else { 
                user = new User({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    avatar_url: avatarResponse.url,
                    refreshToken: null
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


export const loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password", success: false });
        }

        // check if the user exists

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ error: "User not found, Email does not match", success: false });
        }
        
        //check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password. Please try again.", success: false });
        }

        // generate the access token and refresh token
        const { accessToken, refreshToken } = await gen_tokens(user._id);
        if (!accessToken || !refreshToken) {
            return res.status(500).json({ error: "Token generation failed. Please try again later.", success: false });
        }

        // return the response flowing the specific format

        return res
            .status(200)
            .cookie('refreshToken', refreshToken, options)
            .cookie('accessToken', accessToken, options)
            .json({
                message: "User logged in successfully",
                success: true,
            })

    } catch (error) {
        console.log(`Error in loginUser: ${error.message} || from user.controller.js`);
        res.
            status(500)
            .json({
                error: "Internal Server Error",
                success: false
            });
        
    }
};


export const logoutUser = async (req, res) => { 
    try {
        const user = req.user;
        user.refreshToken = null;
        try {
            await user.save({validateBeforeSave: false});
        } catch (error) {
            console.log(`Error in saving the refreshToken to database: ${error.message} for logout || from user.controller.js`);
            return res.status(500).json({ error: "Failed to log out. Please try again.", success: false });
        }

        return res
            .status(200)
            .clearCookie('refreshToken')
            .clearCookie('accessToken')
            .json({ message: "User logged out successfully", success: true });

    } catch (error) {
        console.log(`Error in logoutUser: ${error.message} || from user.controller.js`);
        res.
            status(500)
            .json({
                error: "Internal Server Error",
                success: false
            });
        
    }
};


export const getCurrentUser = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ error: "No user information found. Please log in and try again.", success: false });
    }

    return res
        .status(200)
        .json({ success: true, message: "User found", user: user });
};


export const changePassword = async (req, res) => { 
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Please provide oldPassword and newPassword", success: false });
    }
    const in_user = req.user;
    if (!in_user) {
        return res.status(404).json({ error: "Unauthorized request to change password", success: false });
    }

    const user = await User.findById(in_user._id);
    if (!user) {
        return res.status(404).json({ error: "User not found", success: false });
    }

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
        return res.status(401).json({ error: "Old password is incorrect. Please try again.", success: false });
    }

    user.password = newPassword;
    try {
        await user.save();
    } catch (error) {
        console.log(`Error in saving the user: ${error.message} || from user.controller.js`);
        return res.status(500).json({ error: "Failed to update password. Please try again.", success: false });
    }

    return res
        .status(200)
        .json({ message: "Password changed successfully", success: true });
};


export const updateUser = async (req, res) => {
    const in_user = req.user;
    if (!in_user) {
        return res.status(400).json({ error: "You are not authorized to perform this action.", success: false });
    }
    const user = await User.findById(in_user._id);
    if (!user) {
        return res.status(404).json({ error: "User not found", success: false });
    }
    const { name, email } = req.body;
    if (!(name || email)) {
        return res.status(400).json({ error: "No update data provided. Please update at least one of (name or email).", success: false });
    }
    if (name)
        user.name = name;
    if (email) { 
        user.email = email;
        const existingUser = await User.findOne({ email, _id: { $ne: user._id } });
        if (existingUser) {
            return res.status(400).json({
                error: "Email already in use by another account.",
                success: false
            });
        }
    }

    try {
        await user.save({validateBeforeSave: false});
    } catch (error) {
        console.log(`Error in saving the user: ${error.message} || from user.controller.js`);
        return res.status(500).json({ error: "Failed to save updates. Please try again.", success: false });
    }
    return res
        .status(200)
        .json({ message: "User updated successfully", success: true });
    
};


export const updateAvatar = async (req, res) => { 
    try {
        // look for the user in the request
        const in_user = req.user;
        if (!in_user) {
            return res.status(404).json({ error: "You are not authorized to update your avatar.", success: false });
        }
        // look for the image in the request and store the previous image url
        const prev_img_url = in_user.avatar_url;
        try {
            let new_image;
            if (req.files && req.files.avatar) {
                new_image = req.files.avatar[0].path;
            }
            else { 
                console.log(`No image found in the request`,req.files,req.files?.avatar);
                return res.status(400).json({ error: "Please provide an image", success: false });
            }
            // upload the new image to cloudinary and get the url
            let avatarResponse = null;
            try {
                avatarResponse = await uploadToCloudinary(new_image);
                if (!avatarResponse) {
                    console.log(`Error in uploading image to cloudinary: ${error.message} || from user.controller.js`);
                    return res.status(500).json({ error: "Failed to upload new avatar. Please try again.", success: false });
                }
            } catch (error) {
                console.log(`Error in saving the user: ${error.message} || from user.controller.js`);
                return res.status(500).json({ error: "Failed to update avatar details. Please try again.", success: false });
                
            }
            // update the user with the new image url and save it , also delete the previous image from cloudinary
            const user = await User.findById(in_user._id);
            if (!user) {
                return res.status(404).json({ error: "User not found", success: false });
            }

            user.avatar_url = avatarResponse.url;
            try {
                await user.save();

                // --- > Currently we are not deleting the previous image from cloudinary, coz we need to add a check if that's the default image or not.
                
                // now delete the previous image from cloudinary storage
                if (prev_img_url && prev_img_url !== 'https://res.cloudinary.com/madhav-daiict/image/upload/v1734681924/rcdmth9309na2zivs0i9.png') {
                    const result = await deleteFromCloudinary(prev_img_url);
                    if (!result) { 
                        console.log(`Error in deleting the previous image from cloudinary: ${error.message} || from user.controller.js`);
                        // return res.status(500).json({ error: "Failed to delete previous avatar. Please try again.", success: false });
                    }
                }
            } catch (error) {
                console.log(`Error in saving the user: ${error.message} || from user.controller.js`);
                return res.status(500).json({ error: "Error while saving the user", success: false });
            }
        } catch (error) {
            console.log(`Error in updateAvatar: ${error.message} || from user.controller.js`);
            return res.status(500).json({ error: "Error in fetching new image", success: false });
            
        }
        return res
            .status(200)
            .json({ message: "Avatar updated successfully", success: true });
        
        
    } catch (error) {
        console.log(`Error in updateAvatar: ${error.message} || from user.controller.js`);
        res.
            status(500)
            .json({
                error: "Internal Server Error",
                success: false
            });
    }
};


export const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
        if (!incomingRefreshToken) {
            return res.status(401).json({ error: "Refresh token missing. Please log in again.", success: false });
        }

        try {
            const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (!decoded) {
                return res.status(403).json({ error: "Invalid refresh token. Please log in again.", success: false });
            }
            const user = await User.findById(decoded._id);
            if (!user) {
                return res.status(404).json({ error: "User not found. Refresh token is invalid.", success: false });
            }
            if (user.refreshToken !== incomingRefreshToken) {
                return res.status(403).json({ error: "Refresh token mismatch. Please log in again.", success: false });
            }

            const { accessToken, refreshToken } = await gen_tokens(user._id);

            if (!accessToken || !refreshToken) {
                return res.status(500).json({ error: "Failed to generate new tokens. Please try again later.", success: false });
            }

            return res
                .status(200)
                .cookie('refreshToken', refreshToken, options)
                .cookie('accessToken', accessToken, options)
                .json({ message: "Access Token refreshed successfully", success: true });

        } catch (error) {
            console.log(`Error in refreshAccessToken: ${error.message} || from user.controller.js`);
            res.
                status(500)
                .json({
                    error: "Internal Server Error",
                    success: false
                });

        }

    } catch (error) {
        console.log(`Error in refreshAccessToken: ${error.message} || from user.controller.js`);
        res.
            status(500)
            .json({
                error: "Internal Server Error",
                success: false
            });
    }
};
