import express from "express";
import { createUser, getUser, loginUser, logoutUser } from "@controllers/user";

export const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/:username", getUser);
