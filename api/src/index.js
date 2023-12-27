import express from "express";
import cors from "cors";
import { router as userRouter } from "./routes/user";

// Setup
const app = express();
const PORT = process.env.PORT || 1726;

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// User Routes
app.use("/api/users", userRouter);

// Listen
app.listen(PORT, () => `Listening on localhost: ${PORT}`);