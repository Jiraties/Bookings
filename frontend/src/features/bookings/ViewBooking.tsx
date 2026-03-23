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
              {"  ( "}
              {booking.nights} คืน )
            </p>
          </div>
          <div className="viewBooking__item">
            <span className="viewBooking__label">Booking No: </span>
            <p className="viewBooking__infoText">{booking.bookingId}</p>
          </div>

          <div className="viewBooking__item">
            <span className="viewBooking__label">Notes: </span>
            <p className="viewBooking__infoText">{booking.note || "-"}</p>

            {/* <textarea
              className="boxInput viewBooking__noteTextArea"
              onChange={(e) => setNote(e.target.value)}
              value={note}
            ></textarea> */}
          </div>
          <div className="viewBooking__item">
            <span className="viewBooking__label">Staff ที่บันทึกรายการ: </span>
            <p className="viewBooking__infoText">{booking.staffUsername}</p>
          </div>
        </div>
        <div className="viewBooking__mainRight">
          {/* <p>ค่าใช้จ่าย</p> */}
          <div className="viewBooking__priceLIst">
            <div
              className={
                booking.paymentMethod === "Unpaid"
                  ? "viewBooking__price viewBooking__unpaidPrice"
                  : "viewBooking__price"
              }
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <i
                  className={
                    booking.paymentMethod === "Unpaid"
                      ? "bx bx-bed-alt  viewBooking__bedIconUnpaid"
                      : "bx bx-bed-alt viewBooking__bedIcon"
                  }
                />
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

            {/* <div
              className={
                booking.paymentMethod === "Unpaid"
                  ? "viewBooking__price viewBooking__unpaidPrice"
                  : "viewBooking__price"
              }
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <i
                  className={"viewBooking__bedIcon bx " + "bx-ship"}
                  style={{ backgroundColor: "#1e3a5f" }}
                />
                <div>
                  <p className="viewBooking__infoText">
                    {Number("240").toLocaleString("th-TH")} บาท
                  </p>
                  <p>ค่า Slowboat</p>
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
                  {"Cash"}
                  {}
                </p>
                {booking.paymentMethod === "Unpaid" ? (
                  <i
                    className="bx bx-error viewBooking__unpaid"
                    style={{ fontSize: "1.4rem" }}
                  />
                ) : (
                  <i
                    className={"bx " + paymentMethodIconMap["Cash"]}
                    style={{ fontSize: "1.4rem" }}
                  />
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="viewBooking__actions">
        <ActionButton text="แก้ไขการจอง" onClick={() => {}} icon="bx-edit" />
        <ActionButton
          text="ลบการจอง"
          onClick={() => removeBookingHandler(booking)}
          icon="bx-trash"
        />
        {!booking.isCheckedIn && (
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
