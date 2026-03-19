import express from "express";
import authMiddleware from "../middleware/authMiddleware";

const activitiesRouter = express.Router();

activitiesRouter.get("/recentActivities", authMiddleware);
