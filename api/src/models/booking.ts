import mongoose from "mongoose";

interface booking {
  name: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  platformId: "BOOK" | "HSTL" | "TRVL" | "AGDA";
  roomId: string;
  price: number;
  paymentMethod: "OTA" | "Cash" | "Card" | "Unpaid";
  note: string;
  deposit: number;
  depositRepaid: boolean;
}
