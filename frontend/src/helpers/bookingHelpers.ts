import type { booking } from "../types/bookingTypes";

export const roomChargeTransaction = (booking: booking) =>
  booking.transactions.find(
    (transaction) => transaction.type === "roomCharge",
  )!;
