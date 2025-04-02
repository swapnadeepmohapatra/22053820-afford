import express from "express";
import { getTop5Users } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getTop5Users);

export default router;
