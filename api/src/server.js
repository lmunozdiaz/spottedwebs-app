import express from "express";
import cors from "cors";
import authRouter from "./routes/auth-routes.js";

// Setup
const app = express();
const PORT = process.env.PORT || 1726;

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRouter);

// Listen
app.listen(PORT, () => `Listening on localhost: ${PORT}`);
