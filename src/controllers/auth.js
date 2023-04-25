import fetch from "node-fetch";
import {
  resFormat,
  generateCi,
  generateNickname,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/common.js";
import { snsEnum } from "../utils/enums.js";
import { SNS_AUTH_FAILED, SUCCESS } from "../utils/consts.js";
import db from "../models/index.js";

const { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } = process.env;

async function getUserInfo(type, token) {
  let response;
  let email;
  switch (type) {
    case "GOOGLE":
      response = await fetch(GOOGLE_AUTH_URL + token);
      email = (await response.json()).email;
      break;
    case "KAKAO":
      response = await fetch(KAKAO_AUTH_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      email = (await response.json()).kakao_account?.email;
      break;
    case "NAVER":
      response = await fetch(NAVER_AUTH_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      email = (await response.json()).response?.email;
      break;
  }

  return email;
}

async function getToken(req, res) {
  const { type, token } = req.body;
  try {
    const result = await getUserInfo(type, token);

    if (!result) {
      res.status(400).json(resFormat(SNS_AUTH_FAILED));
      return;
    }

    let row = await db.users.findOne({
      where: { email: result },
      raw: true,
    });

    if (!row) {
      row = await db.users.create({
        ci: await generateCi(result, type),
        email: result,
        nickName: await generateNickname(),
        platformId: snsEnum[type],
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
