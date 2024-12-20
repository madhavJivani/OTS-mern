import { Router } from 'express';
import { registerUser,loginUser,logoutUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(
    upload.fields([
        { name: 'avatar', maxCount: 1 }
    ]),
    registerUser);

router.route('/login').post(
    upload.none(),
    loginUser
);


router.route('/logout').post(
    verifyJWT,
    logoutUser
);

router.route('/confirm').post(
    verifyJWT,
    (req, res) => {
        res.json({ success: true, message: "User is authenticated" });
    }
);

export default router;