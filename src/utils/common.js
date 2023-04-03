import crypto from "crypto";
import jwt from "jsonwebtoken";
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
  let payload = { ci, tokenFor: "accessToken" };
  tokenOptions.expiresIn = "1h";
  const accessToken = jwt.sign(payload, CRYPTO_TOKEN_KEY, tokenOptions);
  return accessToken;
}

async function generateRefreshToken(ci) {
  let payload = { ci, tokenFor: "refreshToken" };
  tokenOptions.expiresIn = "14d";
  const refreshToken = jwt.sign(payload, CRYPTO_TOKEN_KEY, tokenOptions);
  return refreshToken;
}

export {
  resFormat,
  generateCi,
  generateNickname,
  generateAccessToken,
  generateRefreshToken,
};
