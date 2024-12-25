import { Router } from 'express';
import { createLectureWithLink, createLectureWithVideo, getAllLectures, getLecture, updateLecture, deleteLecture } from '../controllers/lecture.controller.js'
import { verifyJWT, verifyAdmin, verifyTeacherOrAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js'

const router = Router();
router.route('/create-link').post(upload.none(),verifyJWT, verifyTeacherOrAdmin, createLectureWithLink);
router.route('/create-video').post(verifyJWT, verifyTeacherOrAdmin, upload.fields([
    {name: 'lecture', maxCount: 1}
]), createLectureWithVideo);
router.route('/get-all').get(verifyJWT, getAllLectures);
router.route('/get/:id').get(verifyJWT, getLecture);
router.route('/update/:id').put(verifyJWT, verifyTeacherOrAdmin, updateLecture);
router.route('/delete/:id').delete(verifyJWT, verifyAdmin, deleteLecture);
export default router;