import fetch from "node-fetch";
import {
  resFormat,
  generateCi,
  generateNickname,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/common.js";
import { SNS_AUTH_FAILED, SUCCESS } from "../utils/consts.js";
import db from "../models/index.js";

const { GOOGLE_AUTH_URL } = process.env;

async function getGoogleUserInfo(token) {
  const result = {};
  const response = await fetch(GOOGLE_AUTH_URL + token);
  const res = await response.json();

  if (!res.error) {
    result.email = res.email;
  }
  return result;
}

const socialHandler = {
  GOOGLE: getGoogleUserInfo,
};
async function getToken(req, res) {
  const { type, token } = req.body;
  try {
    const result = await socialHandler[type](token);

    if (!result.email) {
      res.status(400).json(resFormat(SNS_AUTH_FAILED));
      return;
    }

    let row = await db.users.findOne({
      where: { email: result.email },
      raw: true,
    });

    if (!row) {
      row = await db.users.create({
        ci: await generateCi(result.email, type),
        email: result.email,
        nickName: await generateNickname(),
        signupPlatform: type,
      });
    }
    const accessToken = await generateAccessToken(row.ci);
    const refreshToken = await generateRefreshToken(row.ci);

    const data = { accessToken, refreshToken };
    res.json(resFormat(SUCCESS, data));
  } catch (err) {
    console.error("err : ", err.toString());
    res.status(500);
  }
}

export { getToken };
