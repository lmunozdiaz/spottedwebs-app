import express from "express";
import { getUser } from "@/controllers/user";

const router = express.Router();

router.get("/users/:username", getUser);

export default router;
