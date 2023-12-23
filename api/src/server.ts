import express from "express";
import cors from "cors";

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// App config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Listen
app.listen(PORT, () => `Listening on localhost: ${PORT}`);
