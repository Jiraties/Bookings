import express from "express";
import {
  getTodayArrivalBookings,
  getTodayDepartureBookings,
  newBooking,
} from "../controller/booking";

const bookingsRouter = express.Router();

bookingsRouter.post("/newBooking", newBooking);
bookingsRouter.get("/todayArrivals", getTodayArrivalBookings);
bookingsRouter.get("/todayDepartures", getTodayDepartureBookings);

export default bookingsRouter;
