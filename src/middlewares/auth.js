import { resFormat } from "../utils/common.js";
import {
  MISSING_REQUIRED_QUERY_PRAMETER,
  PRAMETER_VALUE_NOT_SATISFIED,
} from "../utils/consts.js";
import { sns } from "../utils/enums.js";

function validateToken(req, res, next) {
  const { type, token } = req.body;
  if (!type || !token) {
    res.status(400).json(resFormat(MISSING_REQUIRED_QUERY_PRAMETER));
    return;
  }

  if (!sns[type]) {
    res.status(400).json(resFormat(PRAMETER_VALUE_NOT_SATISFIED));
    return;
  }

  next();
}

export { validateToken };
