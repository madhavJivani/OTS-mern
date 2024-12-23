import { Router } from 'express';
import { createNote } from '../controllers/note.controller.js';
import { verifyJWT, verifyTeacherOrAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
router.route("/create").post(verifyJWT, verifyTeacherOrAdmin, upload.fields([
    { name: 'material', maxCount: 1 }
]),createNote);

export default router;