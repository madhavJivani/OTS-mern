import { Router } from 'express';
import { registerUser,loginUser,logoutUser,refreshAccessToken,changePassword,getCurrentUser,updateUser,updateAvatar } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(upload.fields([{ name: 'avatar', maxCount: 1 }]),registerUser);
router.route('/login').post(upload.none(),loginUser);
//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/change-password").post(upload.none(),verifyJWT, changePassword)
router.route("/update-account").patch(upload.none() ,verifyJWT, updateUser)
router.route("/update-avatar").patch(verifyJWT, upload.fields([{ name: 'avatar', maxCount: 1 }]), updateAvatar);
router.route("/refresh-tokens").post(upload.none(),verifyJWT,refreshAccessToken)

//  check if user is authenticated
router.route('/is-authenticated').get(verifyJWT, (req, res) => {
    if (req.user) {
        return res.status(200).json({ success: true, message: "User is authenticated" });
    }
    else { 
        return res.status(401).json({ success: false, message: "User is not authenticated" });
    }
});

export default router;