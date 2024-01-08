import dotenv from "dotenv";
import { Router } from "express";
import {
  login,
  logout,
  refreshAccess,
  register,
} from "../controllers/auth-controller.js";
import { preventIfLoggedIn } from "../middleware/authenticate-user.js";

dotenv.config();

const router = Router();

router.post("/register", preventIfLoggedIn, register);

router.post("/login", preventIfLoggedIn, login);

router.delete("/logout", logout);

router.post("/refresh-access", refreshAccess);

export default router;
