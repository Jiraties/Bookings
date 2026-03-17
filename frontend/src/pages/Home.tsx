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
import type { booking } from "../types/bookingTypes";
import toast from "react-hot-toast";
import { dummyBookings } from "./test";
import ViewBooking from "../features/bookings/ViewBooking";
import { useLocation } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";

const Home = ({ status }: { status: "arrivals" | "departures" }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [addBookingIsOpen, setAddBookingIsOpen] = useState(false);
  const [rowIsClicked, setRowIsClicked] = useState<booking | null>(null);
  const [bookings, setBookings] = useState<booking[]>([]);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState<{
    isOpen: boolean;
    booking: booking | null;
  }>({
    isOpen: false,
    booking: null,
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fullFormattedDate = new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
  }).format(new Date());

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

  const statCards =
    status === "arrivals"
      ? [
          {
            id: "arrivalsToday",
            label: "เช็คอินวันนี้",
            value: stats.arrivalsToday,
          },
          {
            id: "unpaidCheckins",
            label: "ยังไม่ชำระเงิน",
            value: stats.unpaidCheckins,
          },
          {
            id: "cashToday",
            label: "เงินสดวันนี้ (฿)",
            value: stats.cashToday,
          },
          {
            id: "guestsInHouse",
            label: "แขกที่พักอยู่ตอนนี้",
            value: stats.guestsInHouse,
          },
        ]
      : [
          {
            id: "departuresToday",
            label: "เช็คเอาท์วันนี้",
            value: stats.departuresToday,
          },

          {
            id: "cashToday",
            label: "เงินสดวันนี้ (฿)",
            value: stats.cashToday,
          },
          { id: "deposit", label: "มัดจำที่ต้องคืน (฿)", value: stats.deposit },
          {
            id: "guestsInHouse",
            label: "แขกที่พักอยู่ตอนนี้",
            value: stats.guestsInHouse,
          },
        ];

  const formatBookingsDates = (bookings: booking[]) =>
    bookings.map((booking: booking) => {
      booking.checkIn = new Date(booking.checkIn);
      booking.checkOut = new Date(booking.checkOut);
      return booking;
    });

  const appendToBookings = (booking: booking) => {
    const formattedBooking = formatBookingsDates([booking])[0];

    if (formattedBooking.checkIn.toDateString() === new Date().toDateString())
      setBookings((prev) => [...prev, formattedBooking]);

    setAddBookingIsOpen(false);
  };

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

  const fetchBookings = async () => {
    const response = await axios.get(
      status === "arrivals"
        ? "http://localhost:3000/bookings/todayArrivals"
        : "http://localhost:3000/bookings/todayDepartures",
      {
        withCredentials: true,
      },
    );

    const bookingsData = response.data.bookings;
    setLastUpdated(new Date());
    setBookings(formatBookingsDates(bookingsData));
  };

  const removeBookingHandler = (booking: booking) => {
    setConfirmationModalIsOpen({ isOpen: true, booking });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [location]);

  return (
    <main className="home">
      <Modal
        open={addBookingIsOpen}
        className="home__modalCenter"
        onClose={() => setAddBookingIsOpen(false)}
      >
        <AddBooking appendToBookings={appendToBookings} />
      </Modal>
      <Modal
        open={!!rowIsClicked}
        onClose={() => setRowIsClicked(null)}
        className="home__modalCenter"
      >
        <ViewBooking
          booking={rowIsClicked as booking}
          removeBookingHandler={removeBookingHandler}
        />
      </Modal>
      <Modal
        open={confirmationModalIsOpen.isOpen}
        onClose={() =>
          setConfirmationModalIsOpen((prev) => ({ ...prev, isOpen: false }))
        }
        className="home__modalCenter"
      >
        <ConfirmationModal booking={confirmationModalIsOpen.booking} />
      </Modal>
      <header className="home__header">
        <div>
          <h1>
            {status === "arrivals" ? "Arrivals" : "Departures"} |{" "}
            {fullFormattedDate}
          </h1>
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <p>
              ข้อมูลอัปเดตล่าสุดเมื่อ {lastUpdated?.getHours()}:
              {lastUpdated?.getMinutes().toString().padStart(2, "0")}
            </p>
            <i
              className="bx bx-refresh home__refreshIcon"
              onClick={() => {
                toast.promise(fetchBookings, {
                  loading: "กำลังอัปเดตข้อมูล...",
                  success: "อัปเดตข้อมูลสำเร็จ",
                  error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
                });
              }}
            />
          </div>
        </div>

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
      <Spreadsheet bookings={bookings} setRowIsClicked={setRowIsClicked} />
      {/* <button onClick={logoutHandler}>logout</button> */}
    </main>
  );
};

export default Home;
