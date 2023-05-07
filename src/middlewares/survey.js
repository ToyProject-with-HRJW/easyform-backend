import { resFormat } from "../utils/common.js";
import { MISSING_REQUIRED_QUERY_PRAMETER } from "../utils/consts.js";

function validateCreateSurvey(req, res, next) {
  const { survey } = req.body;
  if (!survey) {
    res.status(400).json(resFormat(MISSING_REQUIRED_QUERY_PRAMETER));
    return;
  }
  next();
}

export { validateCreateSurvey };
