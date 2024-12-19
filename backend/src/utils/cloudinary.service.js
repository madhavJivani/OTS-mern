import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Upload a video
export const uploadToCloudinary = async (localFilePath) => { 
    try {
        if (!localFilePath) {
            console.log(`No file to upload to cloudinary || from cloudinary.service.js`);
            return null;
        }
            
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type : 'auto'
        });
        console.log(`Image uploaded to cloudinary: ${result.secure_url} || from cloudinary.service.js`);
        fs.unlinkSync(localFilePath);

        return result;       
    } catch (error) {
        console.log(`Error in uploading image to cloudinary: ${error.message} || from cloudinary.service.js`);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

