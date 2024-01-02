import express from "express";
import session from "express-session";
import cors from "cors";
import userRouter from "@routes/public/user.js";

// Setup
const app = express();
const PORT = process.env.PORT || 1726;

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    name: "_the_cookie",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/public", userRouter);

// Listen
app.listen(PORT, () => `Listening on localhost: ${PORT}`);
