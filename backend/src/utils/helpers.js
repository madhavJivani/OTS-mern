import fs from 'fs';

export const deleteFile = (filePath) => { 
    try {
        fs.unlinkSync(filePath);
        console.log(`File deleted: ${filePath} || from helpers.js`);
    } catch (error) {
        console.log(`Error in deleting file: ${error.message} || from helpers.js`);
    }
};
