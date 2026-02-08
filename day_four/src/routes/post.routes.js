import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getMyPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createPost);
router.get("/", getMyPosts);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
