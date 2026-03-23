import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import { recentActivities } from "../controller/activities";

const activitiesRouter = express.Router();

activitiesRouter.get("/recentActivities", recentActivities);

export default activitiesRouter;
