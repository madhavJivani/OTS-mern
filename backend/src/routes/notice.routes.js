import  { Router } from "express";
import { createNotice,getNotices,getNotice,updateNotice,deleteNotice } from '../controllers/notice.controller.js';
import { verifyJWT, verifyTeacherOrAdmin, verifyAdmin } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js';


const router = Router();

router.route('/create-notice').post(upload.none(), verifyJWT, verifyTeacherOrAdmin, createNotice);
router.route('/get-notices').get(upload.none(), verifyJWT, getNotices);
router.route('/get-notice/:id').get(upload.none(), verifyJWT, getNotice);
router.route('/update-notice/:id').put(upload.none(), verifyJWT, verifyAdmin, updateNotice);
router.route('/delete-notice/:id').delete(upload.none(), verifyJWT, verifyAdmin, deleteNotice);

export default router;