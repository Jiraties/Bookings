type PlatformId = "BOOK" | "HOST" | "TRAV" | "AGOD" | "WALK";
type PaymentMethod = "OTA" | "Cash" | "Card" | "Transfer" | "Unpaid";
type Status = "booked" | "checkedIn" | "checkedOut";

interface Passport {
  nationality?: string;
  passportNo?: string;
  passportName?: string;
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
