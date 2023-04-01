import express from "express";
import { validateToken } from "../middlewares/auth.js";
import { getToken } from "../controllers/auth.js";

const router = express.Router();
router.post("/token", validateToken, getToken);

export default router;
