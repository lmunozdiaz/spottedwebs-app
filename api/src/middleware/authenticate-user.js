import jwt from "jsonwebtoken";
import AccessToken from "../repositories/access-token-repository.js";
import TokenBlacklist from "../repositories/token-blacklist-repository.js";

export async function authenticateUser(request, response, next) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null)
    return response.status(401).send({ message: "Unauthorized" });

  try {
    const blacklistedToken = await TokenBlacklist.findByToken(token);
    const tokenIsBlacklisted = blacklistedToken != null;
    if (tokenIsBlacklisted)
      return response
        .status(403)
        .send({ message: "You must be logged in to access that content." });
  } catch (error) {
    return response
      .status(500)
      .send({ message: "An error occured during authentication." });
  }

  let secretKey;
  try {
    const existingAccessToken = await AccessToken.findByToken(token);
    console.log(existingAccessToken);
    secretKey = existingAccessToken.secretKey;
  } catch (error) {
    console.log(error);
  }

  jwt.verify(token, secretKey, function (error, decoded) {
    if (error) {
      console.log(error);
      if (error.expiredAt)
        return response
          .status(403)
          .send({ message: "Your access to this content has expired." });
    }
    request.publicProfile = decoded;
    next();
  });
}

export function preventIfLoggedIn(req, res, next) {
  if (req.body.isLoggedIn) {
    return res.redirect("/");
  }
  next();
}
