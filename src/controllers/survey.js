import { resFormat } from "../utils/common.js";
import db from "../models/index.js";
import { SUCCESS } from "../utils/consts.js";

async function createSurvey(req, res) {
  const { survey } = req.body;
  const { ci } = req;

  try {
    await db.survey.create({
      ci,
      surveyForm: survey,
    });

    res.json(resFormat(SUCCESS));
  } catch (err) {
    console.error("err : ", err.toString());
    res.status(500).end();
  }
}

export { createSurvey };
