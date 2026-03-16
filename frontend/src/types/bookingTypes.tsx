export interface booking {
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
