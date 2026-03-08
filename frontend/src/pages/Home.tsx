import { useEffect, useState } from "react";
import StatCard from "../features/dashboard/StatCard";
import Logo from "../components/Logo";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import "./Home.css";
import ActionButton from "../components/ActionButton";
import Spreadsheet from "../features/dashboard/Spreadsheet";
import { Modal } from "@mui/material";
import AddBooking from "../features/bookings/AddBooking";

interface booking {
  name: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  platformId: "BOOK" | "HSTL" | "TRVL" | "AGDA";
  roomId: string;
  price: number;
  paymentMethod: "OTA" | "Cash" | "Card" | "Transfer" | "Unpaid";
  note: string;
  deposit: number;
  depositRepaid: boolean;
  staffUsername: string;
  bookingId: string;
}

interface stat {
  id: string;
  label: string;
  value: number | null;
}

interface StatsState {
  arrivalsToday: stat;
  departuresToday: stat;
  unpaidCheckins: stat;
  cashToday: stat;
  guestsInHouse: stat;
  deposit: stat;
}

const Home = () => {
  const { user, logout } = useAuth();
  const [addBookingIsOpen, setAddBookingIsOpen] = useState(false);

  const today = new Date();

  const [bookings, setBookings] = useState<booking[]>([
    {
      name: "Michael Tan",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "BOOK",
      roomId: "A101",
      price: 4200,
      paymentMethod: "OTA",
      note: "Late arrival",
      deposit: 1000,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "frontdesk@hotel.com",
    },
    {
      name: "Suda K.",
      checkIn: today,
      checkOut: new Date(today.getTime() + 3 * 86400000),
      nights: 3,
      platformId: "AGDA",
      roomId: "B203",
      price: 5100,
      paymentMethod: "Card",
      note: "",
      deposit: 500,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "manager@hotel.com",
    },
    {
      name: "James Rodriguez",
      checkIn: today,
      checkOut: new Date(today.getTime() + 1 * 86400000),
      nights: 1,
      platformId: "TRVL",
      roomId: "C305",
      price: 1800,
      paymentMethod: "Transfer",
      note: "Airport pickup",
      deposit: 800,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "frontdesk@hotel.com",
    },
    {
      name: "Ananya Patel",
      checkIn: today,
      checkOut: new Date(today.getTime() + 4 * 86400000),
      nights: 4,
      platformId: "HSTL",
      roomId: "D110",
      price: 6200,
      paymentMethod: "Cash",
      note: "Extra pillow",
      deposit: 1000,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "staff1@hotel.com",
    },
    {
      name: "Chen Wei",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "BOOK",
      roomId: "A102",
      price: 3900,
      paymentMethod: "Unpaid",
      note: "Waiting OTA confirmation",
      deposit: 0,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "manager@hotel.com",
    },
    {
      name: "Liam O'Connor",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "TRVL",
      roomId: "B201",
      price: 3600,
      paymentMethod: "Card",
      note: "",
      deposit: 500,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "staff2@hotel.com",
    },
    {
      name: "Nattapong S.",
      checkIn: today,
      checkOut: new Date(today.getTime() + 1 * 86400000),
      nights: 1,
      platformId: "HSTL",
      roomId: "A103",
      price: 1500,
      paymentMethod: "Cash",
      note: "",
      deposit: 300,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "frontdesk@hotel.com",
    },
    {
      name: "Sarah Williams",
      checkIn: today,
      checkOut: new Date(today.getTime() + 5 * 86400000),
      nights: 5,
      platformId: "BOOK",
      roomId: "D210",
      price: 8900,
      paymentMethod: "OTA",
      note: "Honeymoon",
      deposit: 2000,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "manager@hotel.com",
    },
    {
      name: "Kenji Sato",
      checkIn: today,
      checkOut: new Date(today.getTime() + 3 * 86400000),
      nights: 3,
      platformId: "AGDA",
      roomId: "C301",
      price: 5400,
      paymentMethod: "Card",
      note: "",
      deposit: 1000,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "staff1@hotel.com",
    },
    {
      name: "Maria Garcia",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "BOOK",
      roomId: "B204",
      price: 4100,
      paymentMethod: "OTA",
      note: "",
      deposit: 800,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "frontdesk@hotel.com",
    },
    {
      name: "David Kim",
      checkIn: today,
      checkOut: new Date(today.getTime() + 4 * 86400000),
      nights: 4,
      platformId: "TRVL",
      roomId: "C302",
      price: 7200,
      paymentMethod: "Card",
      note: "Late check-in",
      deposit: 1000,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "staff2@hotel.com",
    },
    {
      name: "Emily Brown",
      checkIn: today,
      checkOut: new Date(today.getTime() + 3 * 86400000),
      nights: 3,
      platformId: "AGDA",
      roomId: "D211",
      price: 5000,
      paymentMethod: "Transfer",
      note: "",
      deposit: 900,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "manager@hotel.com",
    },
    {
      name: "Somchai P.",
      checkIn: today,
      checkOut: new Date(today.getTime() + 1 * 86400000),
      nights: 1,
      platformId: "HSTL",
      roomId: "A104",
      price: 1400,
      paymentMethod: "Cash",
      note: "",
      deposit: 200,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "frontdesk@hotel.com",
    },
    {
      name: "Oliver Smith",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "BOOK",
      roomId: "B205",
      price: 3800,
      paymentMethod: "Card",
      note: "",
      deposit: 500,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "staff1@hotel.com",
    },
    {
      name: "Fatima Hassan",
      checkIn: today,
      checkOut: new Date(today.getTime() + 3 * 86400000),
      nights: 3,
      platformId: "TRVL",
      roomId: "C303",
      price: 5200,
      paymentMethod: "Transfer",
      note: "",
      deposit: 900,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "manager@hotel.com",
    },
    {
      name: "Lucas Müller",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "AGDA",
      roomId: "D212",
      price: 4100,
      paymentMethod: "Card",
      note: "",
      deposit: 800,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "staff2@hotel.com",
    },
    {
      name: "Ploy C.",
      checkIn: today,
      checkOut: new Date(today.getTime() + 1 * 86400000),
      nights: 1,
      platformId: "HSTL",
      roomId: "A105",
      price: 1300,
      paymentMethod: "Cash",
      note: "",
      deposit: 200,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "frontdesk@hotel.com",
    },
    {
      name: "Noah Johnson",
      checkIn: today,
      checkOut: new Date(today.getTime() + 4 * 86400000),
      nights: 4,
      platformId: "BOOK",
      roomId: "B206",
      price: 6900,
      paymentMethod: "OTA",
      note: "",
      deposit: 1200,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "manager@hotel.com",
    },
    {
      name: "Isabella Rossi",
      checkIn: today,
      checkOut: new Date(today.getTime() + 3 * 86400000),
      nights: 3,
      platformId: "TRVL",
      roomId: "C304",
      price: 5400,
      paymentMethod: "Card",
      note: "",
      deposit: 1000,
      depositRepaid: false,
      isCheckedIn: false,
      staffEmail: "staff1@hotel.com",
    },
    {
      name: "Arjun Singh",
      checkIn: today,
      checkOut: new Date(today.getTime() + 2 * 86400000),
      nights: 2,
      platformId: "AGDA",
      roomId: "D213",
      price: 4300,
      paymentMethod: "Transfer",
      note: "",
      deposit: 700,
      depositRepaid: false,
      isCheckedIn: true,
      staffEmail: "staff2@hotel.com",
    },
  ]);

  const bookingCheckInIsToday = (booking: booking) =>
    booking.checkIn.toDateString() === new Date().toDateString();

  const stats = {
    arrivalsToday: bookings.filter(
      (booking) => booking.checkIn.toDateString() === new Date().toDateString(),
    ).length,
    departuresToday: bookings.filter(
      (booking) =>
        booking.checkOut.toDateString() === new Date().toDateString(),
    ).length,
    unpaidCheckins: bookings.filter(
      (booking) => booking.paymentMethod === "Unpaid",
    ).length,
    cashToday: bookings.reduce((sum, booking) => {
      if (booking.paymentMethod !== "Cash") return sum;
      if (!bookingCheckInIsToday(booking)) return sum;
      return sum + booking.price;
    }, 0),
    guestsInHouse: 10,
    deposit: 10,
  };

  const statCards = [
    { id: "arrivalsToday", label: "เช็คอินวันนี้", value: stats.arrivalsToday },
    {
      id: "departuresToday",
      label: "เช็คเอาท์วันนี้",
      value: stats.departuresToday,
    },
    {
      id: "unpaidCheckins",
      label: "ยังไม่ชำระเงิน",
      value: stats.unpaidCheckins,
    },
    { id: "cashToday", label: "เงินสดวันนี้ (฿)", value: stats.cashToday },
    {
      id: "guestsInHouse",
      label: "แขกที่พักอยู่ตอนนี้",
      value: stats.guestsInHouse,
    },
    { id: "deposit", label: "มัดจำที่ต้องคืน (฿)", value: stats.deposit },
  ];

  const logoutHandler = async () => {
    await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    logout();
  };

  return (
    <main>
      <Modal
        open={addBookingIsOpen}
        className="home__modalCenter"
        onClose={() => setAddBookingIsOpen(false)}
      >
        <AddBooking />
      </Modal>
      <header className="home__header">
        <Logo isAbsolute={false} extraText="Arrival " />
        <div className="home__headerProfile">
          <p>{user?.name}</p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3m972e8FEvBi7ETC03avlJcZDg8nT9dWLSw&s"
            alt="profilePicture"
          />
        </div>
      </header>
      <div className="home__statsAndActions">
        <div className="home__stats">
          {statCards.map((stat) => (
            <StatCard label={stat.label} value={stat.value ? stat.value : 0} />
          ))}
        </div>
        <div className="home__actions">
          <ActionButton
            text="เรียกเก็บเงิน"
            icon="bx-dollar"
            onClick={() => {}}
          />
          <ActionButton
            text="เพิ่มการจองใหม่"
            icon="bx-plus"
            onClick={() => setAddBookingIsOpen(true)}
          />
        </div>
      </div>
      <Spreadsheet bookings={bookings} />
      <button onClick={logoutHandler}>logout</button>
      {/* <button
        onClick={() => {
          setBookings((prev) => [
            ...prev,
            {
              name: "Jirat Chutrakul",
              checkIn: today,
              checkOut: new Date("2026-03-08"),
              nights: 3,
              platformId: "BOOK",
              roomId: "A102",
              price: 1000,
              paymentMethod: "Cash",
              note: "",
              deposit: 0,
              depositRepaid: false,
              staffEmail: "manager@hotel.com",
              isCheckedIn: false,
            },
          ]);
        }}
      >
        Add Booking
      </button> */}
    </main>
  );
};

export default Home;
