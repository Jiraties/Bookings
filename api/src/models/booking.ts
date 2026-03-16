import mongoose from "mongoose";

type platformIdType = "OTA" | "Cash" | "Card" | "Transfer" | "Unpaid";

export interface booking extends Document {
  name: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  platformId: "BOOK" | "HSTL" | "TRVL" | "AGDA";
  roomId: string;
  price: number;
  paymentMethod: "OTA" | "Cash" | "Card" | "Transfer" | "Unpaid";
  note: string | null;
  deposit: number | null;
  depositRepaid: boolean | null;
  staffUsername: string;
  bookingId: string;
  isCheckedIn: boolean;
  checkInByStaffUsername: string | null;
}

const bookingSchema = new mongoose.Schema({
  name: { type: String },
  checkIn: { type: Date },
  checkOut: { type: Date },
  nights: { type: Number },
  platformId: { type: String },
  roomId: { type: String },
  price: { type: Number },
  paymentMethod: { type: String },
  note: { type: String },
  deposit: { type: Number, default: null },
  depositRepaid: { type: Boolean, default: null },
  staffUsername: { type: String },
  bookingId: { type: String, unique: true },
  isCheckedIn: { type: Boolean, default: false },
  checkInByStaffUsername: { type: String, default: null },
});

export default mongoose.model<booking>("Booking", bookingSchema);
