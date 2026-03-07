import { NextFunction, Request, Response } from "express";
import Booking from "../models/booking";

export const newBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { booking } = req.body;

    if (!booking) throw new Error("Please provide booking details");

    const calculateNights = (checkIn: string, checkOut: string) => {
      const checkInDate = new Date(checkIn + "T00:00:00");
      const checkOutDate = new Date(checkOut + "T00:00:00");

      const diff = checkOutDate.getTime() - checkInDate.getTime();
      return diff / 86400000;
    };

    const savedBooking = new Booking({
      name: booking.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      nights: calculateNights(booking.checkIn, booking.checkOut),
      platformId: booking.platformId,
      roomId: booking.roomId,
      price: booking.price,
      paymentMethod: booking.paymentMethod,
      note: booking.note,
      deposit: null,
      depositRepaid: null,
      staffUsername: booking.staffUsername, // Assuming userId is the username
      bookingId: booking.bookingId,
    });

    await savedBooking.save();
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
