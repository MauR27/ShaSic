import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  logoutUser,
  addUserPost,
  getUserPost,
  getUsers,
  addComments,
  postLikes,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.route("/auth").get(getUsers).post(authUser);
router.post("/logout", logoutUser);
router
  .route("/post")
  .post(protect, addUserPost)
  .get(getUserPost)
  .put(protect, postLikes);
router.route("/post/:_id/comments").post(protect, addComments);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
