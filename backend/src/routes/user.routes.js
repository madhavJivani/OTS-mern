import { Router } from 'express';
import { registerUser,loginUser,logoutUser,refreshAccessToken,changePassword,getCurrentUser,updateUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(upload.fields([{ name: 'avatar', maxCount: 1 }]),registerUser);
router.route('/login').post(upload.none(),loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-tokens").post(upload.none(),refreshAccessToken)
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateUser)


router.route('/is-authenticated').get(verifyJWT, (req, res) => {
    if (req.user) {
        return res.status(200).json({ success: true, message: "User is authenticated" });
    }
});

export default router;