import express from "express";
import { getTopPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getTopPosts);

export default router;
