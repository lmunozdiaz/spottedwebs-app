import crypto from "crypto";

export function generateKey(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}
