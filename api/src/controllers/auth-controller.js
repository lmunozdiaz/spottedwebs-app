import { generateToken } from "../utils/generateToken.js";
import AccessToken from "../repositories/access-token-repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../repositories/refresh-token-repository.js";
import TokenBlacklist from "../repositories/token-blacklist-repository.js";
import User from "../repositories/user-repository.js";
import UserProfile from "../repositories/user-profile-repository.js";

export async function register(request, response) {
  try {
    const { username, password, firstName, lastName } = request.body;

    const existingUser = await User.findByUsername(username);
    if (existingUser)
      return response.status(409).send({ message: "Username already exists." });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.insertOne(username, hashedPassword);
    const { userId } = newUser;
    await UserProfile.insertOne(firstName, lastName, userId);

    return response.status(201).redirect("http://localhost:8080/login");
  } catch (error) {
    console.log(error);
    return response.status(500).end();
  }
}

export async function login(request, response) {
  try {
    const { username, password } = request.body;

    const authMessage = { message: "Wrong username and password" };

    const user = await User.findByUsername(username);
    if (!user) return response.status(401).send(authMessage);

    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordsMatch) return response.status(401).send(authMessage);

    const userProfile = await UserProfile.findByUserId(user.userId);

    const payloadToEncode = {
      userId: user.userId,
      username: user.username,
      profilePicture: userProfile.profilePicture,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
    };

    const shouldExpire = true;
    const { secretKey: accessTokenSecret, token: accessToken } = generateToken(
      payloadToEncode,
      shouldExpire
    );

    const { secretKey: refreshTokenSecret, token: refreshToken } =
      generateToken(payloadToEncode);

    await AccessToken.insertOne(user.userId, accessToken, accessTokenSecret);
    await RefreshToken.insertOne(user.userId, refreshToken, refreshTokenSecret);

    return response.status(200).send({ token: accessToken });
  } catch (error) {
    console.log(error);
    return response.status(500).end();
  }
}

export async function logout(request, response) {
  try {
    const { userId, token } = request.body;

    await TokenBlacklist.insertOne(userId, token);
    await AccessToken.deleteByUserId(userId);
    await RefreshToken.deleteByUserId(userId);

    return response.status(204).end();
  } catch (error) {
    console.log(error);
    return response.status(500).end();
  }
}

// Broken!
export async function refreshAccess(request, response) {
  const { userId } = request.body;

  const errorMessage = {
    error: "Token Refresh Error",
    message: "An error occured when refreshing the access token.",
  };

  let accessToken;
  try {
    const { tokenValue: refreshToken, secretKey } =
      await RefreshToken.findByUserId(userId);
    await AccessToken.deleteByUserId(userId);

    const authMessage = { message: "You are not logged in" };
    if (!refreshToken) return response.status(401).send(authMessage);

    jwt.verify(refreshToken, secretKey, function (error, decodedToken) {
      if (error) {
        console.log(error);
        return response.status(403).end();
      }
      accessToken = generateToken(decodedToken, true);
    });
    await AccessToken.insertOne(
      userId,
      accessToken.token,
      accessToken.secretKey
    );
    response.status(200).send(accessToken.tokenValue);
  } catch (error) {
    console.log(error);
    return response.status(500).send(errorMessage);
  }
}
