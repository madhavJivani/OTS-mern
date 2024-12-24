import { Router } from 'express';
import { createNoteWithFile, createNoteWithLink } from '../controllers/note.controller.js';
import { verifyJWT, verifyTeacherOrAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
router.route("/create-link").post(upload.none(),verifyJWT, verifyTeacherOrAdmin, createNoteWithLink);
router.route("/create-file").post(verifyJWT, verifyTeacherOrAdmin, upload.fields(
    [
        { name: 'material', maxCount: 1 }]
), createNoteWithFile);

export default router;