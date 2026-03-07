import express from "express";
import { newBooking } from "../controller/booking";

const bookingsRouter = express.Router();

bookingsRouter.post("/newBooking", newBooking);

export default bookingsRouter;
