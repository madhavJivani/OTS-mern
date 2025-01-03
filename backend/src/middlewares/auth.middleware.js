import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {

    try {
        const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
        // console.log("Token is (from auth.middleware.js): ", token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized user request",success:false });
        }
        // console.log("Token is (from user.middleware.js): ", token);
        let decoded_token;
        try {
            decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            console.log("ERROR decoding token", error.message);
            return res.status(403).json({ error: "Invalid access token" , success:false });
            
        }
        

        if (!decoded_token) {
            return res.status(403).json({ error: "Invalid access token" , success:false });
        }

        const req_user = await User.findById(decoded_token._id).select("-password -refreshToken");

        if (!req_user) {
            return res.status(404).json({ error: "User not found" , success:false });
        }

        req.user = req_user;
        return next();
    } catch (error) {
        console.log("ERROR IN auth.middleware.js in catch block", error);
        return res.status(500).json({ error: "Internal Server Error" , success:false });
    }

}

export const verifyAdmin = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Unauthorized access, Admin only", success:false });
    }
    return next();
}

export const verifyTeacherOrAdmin = async (req, res, next) => {
    if (req.user.role === "user") {
        return res.status(403).json({ error: "Unauthorized access, Admin or Teacher only", success:false });
    }
    return next();
}

