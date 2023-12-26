import crypto from "crypto";

export const generateKey = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
