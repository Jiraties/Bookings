import express from "express";
import { createUser, login, logout, me } from "../controller/auth";
import authMiddleware from "../middleware/authMiddleware";

const authRouter = express.Router();

authRouter.post("/createUser", createUser);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/me", authMiddleware, me);

export default authRouter;
