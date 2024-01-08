import crypto from "crypto";
import jwt from "jsonwebtoken";

export function generateToken(payload, expires = false) {
  const secretKey = crypto.randomBytes(64).toString("hex");
  const token = expires
    ? jwt.sign(payload, secretKey, { expiresIn: "15m" })
    : jwt.sign(payload, secretKey);
  return { secretKey, token };
}
