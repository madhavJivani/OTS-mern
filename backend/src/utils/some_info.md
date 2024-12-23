# File Uploading in Cloudinary and Google Drive

## 1. Image Uploading Using Cloudinary

Below is the Node.js code to upload images to Cloudinary with transformations such as resizing, cropping, and optimizing the format and quality.

```javascript
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image
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

        return result;
    } catch (error) {
        console.log(`Error in uploading image to cloudinary: ${error.message} || from cloudinary.service.js`);
        return null;
    } finally {
        fs.unlinkSync(localFilePath);
    }
};
```

## 2. Video Uploading Using Cloudinary

To upload videos to Cloudinary, you can use the same code as above but **remove the transformations** since videos typically don't require resizing or cropping in this way.

```javascript
// Upload a video
export const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log(`No file to upload to cloudinary || from cloudinary.service.js`);
            return null;
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'video',
        });

        return result;
    } catch (error) {
        console.log(`Error in uploading video to cloudinary: ${error.message} || from cloudinary.service.js`);
        return null;
    } finally {
        fs.unlinkSync(localFilePath);
    }
};
```

## 3. PDF Uploading Using Google Drive

Google Drive is a great alternative for storing and sharing PDFs. Below is a step-by-step guide for programmatically uploading PDFs to Google Drive.

### Setting Up Google Drive API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and enable the **Google Drive API**.
3. Generate credentials (OAuth 2.0 Client ID or Service Account Key).
4. Use the `googleapis` npm library to interact with Google Drive.

### Node.js Code for Uploading PDFs

```javascript
import { google } from "googleapis";
import fs from "fs";

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN";

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: "example.pdf", // File name on Drive
                mimeType: "application/pdf",
            },
            media: {
                mimeType: "application/pdf",
                body: fs.createReadStream("path/to/your/file.pdf"),
            },
        });

        console.log("Uploaded File ID:", response.data.id);
    } catch (error) {
        console.error("Error uploading file:", error.message);
    }
}

uploadFile();



```
## Conclusion

File uploading is a common requirement in web applications, and services like Cloudinary and Google Drive provide convenient solutions for storing and managing various types of files. By following the code examples and guides provided above, you can easily implement file uploading functionality in your Node.js applications.

for more information, you can visit the official documentation of [Cloudinary](https://cloudinary.com/documentation) and [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk).

## Note
- In future apps completely rely on google drive or aws s3 for file storage and management. 

- For now we will use cloudinary for image and video uploading and processing, and google drive for PDFs and other document types. 

- This will help you optimize costs and leverage the strengths of each service for specific use cases.

