import  { Router } from "express";
import { createNotice } from '../controllers/notice.controller.js';
import { verifyJWT, verifyTeacherOrAdmin } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/create-notice').post(upload.none(),verifyJWT, verifyTeacherOrAdmin, createNotice);

export default router;