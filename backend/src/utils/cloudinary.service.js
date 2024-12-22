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
            resource_type: 'auto',
            transformation: [
                {
                    width: 500, // Resize to 500px width
                    height: 500, // Resize to 500px height
                    crop: 'fill', // Crop to fill the 500x500 square area
                    gravity: 'auto', // Automatically select the most important part of the image
                    fetch_format: 'auto', // Optimize format (JPEG/PNG/WebP)
                    quality: 'auto', // Optimize quality (auto-detect best quality)
                }
            ]
        });
        // console.log(`Image uploaded to cloudinary: ${result.secure_url} || from cloudinary.service.js`);
        return result;
    } catch (error) {
        console.log(`Error in uploading image to cloudinary: ${error.message} || from cloudinary.service.js`);
        return null;
    }
    finally { 
        fs.unlinkSync(localFilePath);
    }
};

