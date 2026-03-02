import { useState } from "react";
import StatCard from "../components/StatCard";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  // 1️⃣ Arrivals Today
  const [arrivalsToday, setArrivalsToday] = useState({
    id: "arrivals_today",
    label: "เช็คอินวันนี้",
    value: 12,
  });

  // 2️⃣ Departures Today
  const [departuresToday, setDeparturesToday] = useState({
    id: "departures_today",
    label: "เช็คเอาท์วันนี้",
    value: 8,
  });

  // 5️⃣ Unpaid Check-ins
  const [unpaidCheckins, setUnpaidCheckins] = useState({
    id: "unpaid_checkins",
    label: "ยังไม่ชำระเงิน",
    value: 3,
  });

  // 7️⃣ Cash Collected Today
  const [cashToday, setCashToday] = useState({
    id: "cash_today",
    label: "เงินสดวันนี้ (฿)",
    value: 8450,
  });

  // 11️⃣ Guests In House
  const [guestsInHouse, setGuestsInHouse] = useState({
    id: "guests_in_house",
    label: "แขกที่พักอยู่ตอนนี้",
    value: 26,
  });

  return (
    <main>
      <header className="home__header">
        <Logo isAbsolute={false} />
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
          <StatCard label={arrivalsToday.label} value={arrivalsToday.value} />
          <StatCard
            label={departuresToday.label}
            value={departuresToday.value}
          />
          <StatCard label={unpaidCheckins.label} value={unpaidCheckins.value} />
          <StatCard label={cashToday.label} value={cashToday.value} />
          <StatCard label={guestsInHouse.label} value={guestsInHouse.value} />
        </div>
        <div className="home__actions">
          <div className="home__action">
            <p>เรียกเก็บเงิน</p>
            <i className="bx bx-dollar" />
          </div>
          <div className="home__action">
            <p>เพิ่มการจองใหม่</p>
            <i className="bx bx-plus" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
