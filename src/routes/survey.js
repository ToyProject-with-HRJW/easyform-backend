import express from "express";
import { checkToken } from "../utils/common.js";
import { validateCreateSurvey } from "../middlewares/survey.js";
import { createSurvey } from "../controllers/survey.js";

const router = express.Router();
router.post("/", checkToken, validateCreateSurvey, createSurvey);

export default router;
