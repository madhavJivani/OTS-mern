import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); // Directory to save files
    },
    filename: function (req, file, cb) {
        // Extract the original name (without extension)
        const originalName = file.originalname.split('.').slice(0, -1).join('.');
        // Extract the file extension
        const extension = file.originalname.split('.').pop();
        // Generate a unique filename
        const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
        cb(null, `${file.fieldname}-${originalName}-${uniqueSuffix}.${extension}`);
    }
});

export const upload = multer({ storage: storage });
