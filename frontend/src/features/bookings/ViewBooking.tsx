import { useState } from "react";
import ActionButton from "../../components/ActionButton";
import type { booking } from "../../types/bookingTypes";
import "./ViewBooking.css";

const platformMap = {
  BOOK: {
    label: "Booking.com",
    color: "#003580",
    logo: "../../../assets/images/booking.jpeg",
  },
  AGOD: {
    label: "Agoda",
    color: "#19AC5B",

    logo: "../../../assets/images/agoda.png",
  },
  TRAV: {
    label: "Traveloka",
    color: "#00ADEF",
    logo: "../../../assets/images/traveloka.jpg",
  },
  HOST: {
    label: "Hostelworld",
    color: "#F15A24",
    logo: "../../../assets/images/hostelworld.png",
  },
  WALK: {
    label: "Walk-In",
    color: "#f12424",
    logo: "../../../assets/images/walkIn.png",
  },
};

const paymentMethodIconMap = {
  OTA: "bx-bank",
  Cash: "bx-currency-notes",
  Card: "bx-credit-card-alt",
  Transfer: "bx-arrow-right-left",
};

const ViewBooking = ({
  booking,
  removeBookingHandler,
  setCheckInIsOpen,
}: {
  booking: booking;
  removeBookingHandler: (booking: booking) => void;
  setCheckInIsOpen: (isOpen: boolean) => void;
}) => {
  const [note, setNote] = useState<string>(booking.note || "");

  const statusDeterminer = (status: string, usedFor: string) => {
    const checkInIsToday =
      new Date().toISOString().split("T")[0] ===
      new Date(booking.checkIn).toISOString().split("T")[0];

    if (status === "booked" && !checkInIsToday) {
      return usedFor === "classname" ? "booked" : "จองแล้ว";
    }
    if (status === "booked" && checkInIsToday) {
      return usedFor === "classname" ? "notCheckedIn" : "ยังไม่ Check-In";
    }
    if (status === "checkedIn") {
      return usedFor === "classname" ? "checkedIn" : "Check-In แล้ว";
    }
  };
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
        <div className="viewBooking__roomAndIsCheckedIn">
          <h1>
            {booking.roomId} <br />
          </h1>
          <div
            className={
              "viewBooking__statusBadge " +
              statusDeterminer(booking.status, "classname")
            }
          >
            <div className="viewBooking__statusDot"></div>
            <p className="viewBooking__statusText">
              {statusDeterminer(booking.status, "text")}
            </p>
          </div>
        </div>
      </div>
      <div className="viewBooking__main">
        <div className="viewBooking__mainLeft">
          <div className="viewBooking__item">
            <span className="viewBooking__label">ช่องทางการจอง: </span>
            <div className="viewBooking__platform">
              <p
                className="viewBooking__infoText"
                style={{ color: platformMap[booking.platformId]?.color }}
              >
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
              <div className="viewBooking__nights">{booking.nights} คืน</div>
            </p>
          </div>
          <div className="viewBooking__item">
            <span className="viewBooking__label">Booking No: </span>
            <p className="viewBooking__infoText">{booking.bookingId}</p>
          </div>

          <div className="viewBooking__item">
            <span className="viewBooking__label">Staff ที่บันทึกรายการ: </span>
            <p className="viewBooking__infoText">{booking.staffUsername}</p>
          </div>
        </div>
        <div className="viewBooking__mainRight">
          {/* <p>ค่าใช้จ่าย</p> */}
          <div className="viewBooking__priceList">
            <div className="viewBooking__price">
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <i className={"bx bx-bed-alt viewBooking__bedIcon"} />
                <div>
                  <p className="viewBooking__infoText">
                    {booking.price.toLocaleString("th-TH")} บาท
                  </p>
                  <p>ค่าห้อง</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <p
                  className={
                    booking.paymentMethod === "Unpaid"
                      ? "viewBooking__unpaid"
                      : ""
                  }
                >
                  {booking.paymentMethod}
                  {}
                </p>
                {booking.paymentMethod === "Unpaid" ? (
                  <i
                    className="bx bx-error viewBooking__unpaid"
                    style={{ fontSize: "1.4rem" }}
                  />
                ) : (
                  <i
                    className={
                      "bx " + paymentMethodIconMap[booking.paymentMethod]
                    }
                    style={{ fontSize: "1.4rem" }}
                  />
                )}
              </div>
            </div>

            {booking.note && (
              <div className="viewBooking__note">
                <p
                  style={{
                    color: "#ffbf00",
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                    marginBottom: ".5rem",
                  }}
                >
                  <i className="bx bx-note" style={{ fontSize: "1.3rem" }} />
                  Note:{" "}
                </p>
                <p>{booking.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="viewBooking__actions">
        <div className="viewBooking__actionsLeft">
          <ActionButton text="แก้ไขการจอง" onClick={() => {}} icon="bx-edit" />
          <ActionButton
            text="ลบการจอง"
            onClick={() => removeBookingHandler(booking)}
            icon="bx-trash"
          />
        </div>
        {booking.status === "booked" && (
          <ActionButton
            text="Check In"
            onClick={() => setCheckInIsOpen(true)}
            icon="bx-check-circle"
            highlight
          />
        )}
      </div>
    </div>
  );
};

export default ViewBooking;
