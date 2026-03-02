import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected To MongoDB"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
