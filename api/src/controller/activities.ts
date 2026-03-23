import { NextFunction, Request, Response } from "express";
import Activity from "../models/activity";

export const recentActivities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (limit > 20) throw new Error("Max limit is 20");

    const fetchedActivities = await Activity.find({
      staffUsername: req.user?.userId,
    })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const totalActivitycount = await Activity.countDocuments({
      staffUsername: req.user?.userId,
    });

    res
      .status(200)
      .json({ activities: fetchedActivities, page, limit, totalActivitycount });
  } catch (err: any) {
    res.status(400).json({ error: (err as Error).message });
  }
};
