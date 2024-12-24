import { Router } from 'express';
import { createNoteWithFile, createNoteWithLink, getNotes,getNotesBySubject,getNote } from '../controllers/note.controller.js';
import { verifyJWT, verifyTeacherOrAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();
router.route("/create-link").post(upload.none(),verifyJWT, verifyTeacherOrAdmin, createNoteWithLink);
router.route("/create-file").post(verifyJWT, verifyTeacherOrAdmin, upload.fields(
    [
        { name: 'material', maxCount: 1 }]
), createNoteWithFile);
router.route("/get-notes").get(verifyJWT, getNotes);
router.route("/get-notes/:subject").get(verifyJWT, getNotesBySubject);
router.route("/get-note/:id").get(verifyJWT, getNote);


export default router;