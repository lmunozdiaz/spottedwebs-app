import express from "express";
import { createUser, getUser } from "@controllers/user";

export const router = express.Router();

router.post("/signup", createUser);
router.get("/:username", getUser);
