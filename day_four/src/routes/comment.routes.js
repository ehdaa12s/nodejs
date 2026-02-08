import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createComment,
  getMyComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createComment);
router.get("/", getMyComments);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
