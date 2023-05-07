import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  INVALID_TOKEN,
  REISSUANCE_ACCESS_TOKEN,
} from "./consts.js";
const { CRYPTO_CI_KEY, CRYPTO_TOKEN_KEY } = process.env;

const tokenOptions = {
  algorithm: "HS256", // 해싱 알고리즘
};

function resFormat(message, data = {}) {
  const res = { message, data };
  return res;
}

async function generateCi(email, type) {
  const encrypt = crypto.createCipher("des", CRYPTO_CI_KEY);
  const encryptResult =
    encrypt.update(email + type, "utf8", "base64") + encrypt.final("base64"); // 인코딩

  return encryptResult;
}

async function generateNickname() {
  let randomStr = Math.random().toString(36).substring(2, 12);
  return randomStr;
}

async function generateAccessToken(ci) {
  let payload = { ci, tokenFor: ACCESS_TOKEN };
  tokenOptions.expiresIn = "1h";
  const accessToken = jwt.sign(payload, CRYPTO_TOKEN_KEY, tokenOptions);
  return accessToken;
}

async function generateRefreshToken(ci) {
  let payload = { ci, tokenFor: REFRESH_TOKEN };
  tokenOptions.expiresIn = "14d";
  const refreshToken = jwt.sign(payload, CRYPTO_TOKEN_KEY, tokenOptions);
  return refreshToken;
}

async function checkToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    try {
      const verifyToken = jwt.verify(bearerToken, CRYPTO_TOKEN_KEY);
      if (verifyToken.tokenFor === REFRESH_TOKEN) {
        const data = { accessToken: await generateAccessToken(verifyToken.ci) };
        res.json(resFormat(REISSUANCE_ACCESS_TOKEN, data));
      }
      req.ci = verifyToken.ci;
      next();
    } catch (error) {
      res.status(401).json(resFormat(INVALID_TOKEN));
    }
  }
  return 1;
}

export {
  resFormat,
  generateCi,
  generateNickname,
  generateAccessToken,
  generateRefreshToken,
  checkToken,
};
