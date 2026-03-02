import express from "express";
import { createUser, login } from "../controller/auth";

const authRouter = express.Router();

authRouter.post("/createUser", createUser);
authRouter.post("/login", login);

export default authRouter;
