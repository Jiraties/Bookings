import type { booking } from "../../types/bookingTypes";
import "./ViewBooking.css";

const platformMap = {
  BOOK: {
    label: "Booking.com",
    color: "#003580",
    logo: "../../../assets/images/booking.jpeg",
  },
  AGDA: {
    label: "Agoda",
    color: "#19AC5B",

    logo: "../../../assets/images/agoda.png",
  },
  TRVL: {
    label: "Traveloka",
    color: "#00ADEF",
    logo: "../../../assets/images/traveloka.jpg",
  },
  HSTL: {
    label: "Hostelworld",
    color: "#F15A24",
    logo: "../../../assets/images/hostelworld.png",
  },
  WALK: {
    label: "Walk-In",
    color: "#f12424",
    logo: "",
  },
};

const ViewBooking = ({ booking }: { booking: booking }) => {
  return (
    <div className="viewBooking__wrapper">
      <div className="viewBooking__top">
        <h1 className="viewBooking__name">
          {booking.name.split(" ").map((word) => (
            <>
              {" "}
              <span key={word}>{word} </span>
              <br />
            </>
          ))}
        </h1>
        <h1 className="viewBooking__roomAndIsCheckedIn">
          {booking.roomId} <br />
          <span className={booking.isCheckedIn ? "checkedIn" : "notCheckedIn"}>
            {booking.isCheckedIn ? "Check In แล้ว" : "ยังไม่ Check In"}
          </span>
        </h1>
      </div>
      <div className="viewBooking__main">
        <div className="viewBooking__mainLeft">
          <div className="viewBooking__item">
            <span className="viewBooking__label">ช่องทางการจอง: </span>
            <div className="viewBooking__platform">
              <p className="viewBooking__infoText">
                {platformMap[booking.platformId]?.label || "ไม่ทราบ"}
              </p>
              <img
                className="viewBooking__logo"
                src={platformMap[booking.platformId]?.logo}
                alt={platformMap[booking.platformId]?.label}
              />
            </div>
          </div>
          <div className="viewBooking__item">
            <span className="viewBooking__label">เข้าพัก: </span>
            <p className="viewBooking__infoText">
              {new Intl.DateTimeFormat("th-TH", {
                calendar: "gregory",
                dateStyle: "short",
              }).format(booking.checkIn)}{" "}
              -{" "}
              {new Intl.DateTimeFormat("th-TH", {
                calendar: "gregory",
                dateStyle: "short",
              }).format(booking.checkOut)}
              {"  ( "}
              {booking.nights} คืน )
            </p>
          </div>
          <div className="viewBooking__item">
            <span className="viewBooking__label">Booking No: </span>
            <p className="viewBooking__infoText">{booking.bookingId}</p>
          </div>
        </div>
        <div className="viewBooking__mainRight">
          <p>ค่าใช้จ่าย</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
