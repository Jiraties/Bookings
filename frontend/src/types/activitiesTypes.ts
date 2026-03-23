export type actionType = "LOGIN" | "LOGOUT" | "NEW_BOOKING" | "REMOVE_BOOKING";

export type activity =
  | {
      staffUsername: string;
      action: "LOGIN" | "LOGOUT";
      details: {
        success: boolean;
      };
      timestamp: Date;
    }
  | {
      staffUsername: string;
      action: "NEW_BOOKING" | "REMOVE_BOOKING";
      details: {
        changes?: Record<string, { before: any; after: any }>;
        snapshot?: {
          name: string;
          checkIn: Date;
          checkOut: Date;
          platformId: "BOOK" | "HSTL" | "TRVL" | "AGDA";
          roomId: string;
          price: number;
          paymentMethod: "OTA" | "Cash" | "Card" | "Transfer" | "Unpaid";
          bookingId: string;
        };
      };
      timestamp: Date;
      bookingId: string;
    };
