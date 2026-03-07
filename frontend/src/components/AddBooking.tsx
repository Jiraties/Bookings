import { useState } from "react";
import ActionButton from "./ActionButton";
import "./AddBooking.css";

const AddBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    checkIn: "00-" + new Date().getMonth() + "-" + new Date().getDate(),
    checkOut: "",
    platform: "BOOK",
    room: "",
    price: "",
  });

  const formDataChangeHandler = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = () => {
    console.log(formData);
  };

  return (
    <form className="addBooking__wrapper">
      <h1>เพิ่มการจองใหม่</h1>
      <div className="addBooking__grid">
        <div>
          <p className="addBooking__label">ชื่อ-สกุล</p>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => formDataChangeHandler("name", e.target.value)}
            placeholder="Ex. John Doe"
          />
        </div>
        <div>
          <div className="addBooking__labels">
            <p className="addBooking__label">Check In</p>
            <p className="addBooking__label">Check Out</p>
          </div>
          <div className="addBooking__dateInputs">
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => formDataChangeHandler("checkIn", e.target.value)}
              style={{
                borderRight: "0.1rem solid #e8e8e8",
                borderRadius: "0.5rem 0 0 0.5rem",
              }}
              className="addBooking__dateInput"
            />
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) =>
                formDataChangeHandler("checkOut", e.target.value)
              }
              style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
              className="addBooking__dateInput"
            />
          </div>
        </div>
        <div>
          <p className="addBooking__label">ช่องทางการจอง</p>
          <select
            name="platforms"
            id=""
            value={formData.platform}
            onChange={(e) => formDataChangeHandler("platform", e.target.value)}
          >
            <option value="BOOK">
              <div
                className="platformCell__wrapper"
                style={{ backgroundColor: "#00358010" }}
              >
                Booking.com{" "}
                <span
                  style={{ backgroundColor: "#003580" }}
                  className="platformCell__dot"
                />
              </div>
            </option>
            <option value="HSTL">Hostelworld</option>
            <option value="AGDA">Agoda</option>
            <option value="TRVL">Traveloka</option>
          </select>
        </div>{" "}
        <div>
          <p className="addBooking__label">ห้อง</p>
          <input
            type="text"
            value={formData.room}
            onChange={(e) => formDataChangeHandler("room", e.target.value)}
          />
        </div>{" "}
        <div>
          <p className="addBooking__label">ราคา</p>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => formDataChangeHandler("price", e.target.value)}
          />
        </div>{" "}
      </div>
      <ActionButton
        text="เพิ่ม"
        icon="bx-plus"
        onClick={submitHandler}
        className="addBooking__submit"
      />
    </form>
  );
};

export default AddBooking;
