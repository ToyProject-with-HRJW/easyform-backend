import express from "express";
import { validateCreateSurvey } from "../middlewares/survey.js";
import { createSurvey } from "../controllers/survey.js";

const router = express.Router();
router.post("/", validateCreateSurvey, createSurvey);

export default router;
