import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadVideoToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log(`No video to upload to cloudinary || from cloudinary.service.js`);
            return null;
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'video',
            folder: 'Lectures',
        });
        // console.log(`Image uploaded to cloudinary: ${result.secure_url} || from cloudinary.service.js`);
        return result;
    } catch (error) {
        console.log(`Error in uploading video to cloudinary: ${error.message} || from cloudinary.service.js`);
        return null;
    }
    finally {
        fs.unlinkSync(localFilePath);
    }
};


export const uploadImageToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log(`No file to upload to cloudinary || from cloudinary.service.js`);
            return null;
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image',
            folder: 'Avatars',
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
}

export const uploadRawToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log(`No file to upload to cloudinary || from cloudinary.service.js`);
            return null;
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'raw',
            folder: 'Notes',
        });
        // console.log(`Image uploaded to cloudinary: ${result.secure_url} || from cloudinary.service.js`);
        return result;
    } catch (error) {
        console.log(`Error in uploading RAW to cloudinary: ${error.message} || from cloudinary.service.js`);
        return null;
    }
    finally {
        fs.unlinkSync(localFilePath);
    }
}
export const deleteFromCloudinary = async (imageUrl) => {
    try {
        // Extract the public_id from the image URL
        const urlParts = imageUrl.split('/'); // Split the URL by "/"
        const fileNameWithExtension = urlParts.pop(); // Get the last part (file name with extension)
        const folderPath = urlParts.slice(7).join('/'); // Extract the folder structure after the 7th segment (cloudinary format)
        const publicId = `${folderPath}/${fileNameWithExtension.split('.')[0]}`; // Combine folder path and file name without extension

        console.log(`Deleting public_id: ${publicId}`); // For debugging

        // Call Cloudinary's destroy method
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            console.log('Image deleted successfully:', result);
        } else {
            console.log('Failed to delete image. Cloudinary response:', result);
        }

        return result;
    } catch (error) {
        console.error(`Error in deleting image from Cloudinary: ${error.message}`);
        return null;
    }
};
