import mongoose from "mongoose";

type PlatformId = "BOOK" | "HOST" | "TRAV" | "AGOD" | "WALK";
type PaymentMethod = "OTA" | "Cash" | "Card" | "Transfer" | "Unpaid";
type Status = "booked" | "checkedIn" | "checkedOut";

interface EncryptedField {
  ciphertext: string;
  iv: string;
  authTag: string;
}

interface Passport {
  passportHash?: string;
  nationality?: string;
  passportNo?: EncryptedField;
  passportName?: EncryptedField;
}

export interface booking extends Document {
  name: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  platformId: PlatformId;
  roomId: string;
  price: number;
  paymentMethod: PaymentMethod;
  note?: string;
  deposit?: number | null;
  depositRepaid?: boolean | null;
  staffUsername: string;
  status: Status;
  checkInByStaffUsername?: string | null;
  bookingId: string;

  passport?: Passport;
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
  status: {
    type: String,
    enum: ["booked", "checkedIn", "checkedOut"],
    default: "booked",
  },
  checkInByStaffUsername: { type: String, default: null },
  passport: {
    passportHash: String,
    nationality: { type: String },
    passportNo: {
      ciphertext: { type: String },
      iv: { type: String },
      authTag: { type: String },
    },
    passportName: {
      ciphertext: { type: String },
      iv: { type: String },
      authTag: { type: String },
    },
  },
});

export default mongoose.model<booking>("Booking", bookingSchema);
