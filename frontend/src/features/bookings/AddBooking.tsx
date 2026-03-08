import { useState } from "react";
import ActionButton from "../../components/ActionButton";
import "./AddBooking.css";
import Select from "react-select";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const customStyles = {
  control: (provided: React.CSSProperties) => ({
    ...provided,
    fontSize: "inherit",
    fontFamily: '"IBM Plex Sans Thai", sans-serif',
    padding: "0.6rem",
    borderRadius: "0.5rem",
    border: 0,
    boxShadow: "rgba(149, 157, 165, 0.25) 0px 8px 24px",
    width: "100%",
    color: "#000",
    backgroundColor: "#fff",
  }),

  input: (provided: React.CSSProperties) => ({
    ...provided,
    padding: 0,
    margin: 0,
    boxShadow: "none",
  }),

  singleValue: (provided: React.CSSProperties) => ({
    ...provided,
    fontSize: "inherit",
    color: "#000",
  }),

  menu: (provided: React.CSSProperties) => ({
    ...provided,
    fontSize: "inherit",
    borderRadius: "0.5rem",
    overflow: "hidden",
    fontFamily: '"IBM Plex Sans Thai", sans-serif',
  }),

  option: (provided: React.CSSProperties, state: any) => ({
    ...provided,
    fontSize: "1rem",
    fontFamily: '"IBM Plex Sans Thai", sans-serif',
    backgroundColor: state.isFocused ? "#f3f3f3" : "#fff",
    color: "#000",
    cursor: "pointer",
  }),

  dropdownIndicator: (provided: React.CSSProperties) => ({
    ...provided,
    color: "#fff",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

const AddBooking = () => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    platformId: "",
    roomId: "",
    price: "",
    paymentMethod: "",
    bookingId: "",
    staffUsername: user?.username || "",
  });

  const platformOptions = [
    { value: "BOOK", label: "Booking.com", color: "#003580" },
    { value: "HSTL", label: "Hostelworld", color: "#F15A24" },
    { value: "AGDA", label: "Agoda", color: "#19AC5B" },
    { value: "TRVL", label: "Traveloka", color: "#00ADEF" },
  ];

  const paymentMethodOptions = [
    { value: "OTA", label: "OTA" },
    { value: "Cash", label: "Cash" },
    { value: "Unpaid", label: "Unpaid" },
    { value: "Card", label: "Card" },
    { value: "Transfer", label: "Transfer" },
  ];

  const formatOptionLabel = ({
    label,
    color,
  }: {
    label: string;
    color: string;
  }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          marginRight: "8px",
        }}
      />
      {label}
    </div>
  );

  const formDataChangeHandler = (field: string, value: string) => {
    if (submitting) return;

    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "platform") {
        if (value === "BOOK") updated.paymentMethod = "OTA";
        if (value === "HSTL") updated.paymentMethod = "Unpaid";
      }

      return updated;
    });
  };

  const formatPaymentMethodLabel = ({ label }: { label: string }) => (
    <div style={label === "Unpaid" ? { color: "red" } : {}}>{label}</div>
  );

  const submitHandler = async () => {
    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/bookings/newBooking",
        { booking: formData },
        { withCredentials: true },
      );

      toast.success(`การจองของ ${formData.name} ถูกเพิ่มเรียบร้อยแล้ว`);
    } catch (err: any) {
      toast.error(err.message || "เกิดข้อผิดพลาดในการเพิ่มการจอง");
    }

    setSubmitting(false);
  };

  return (
    <form className="addBooking__wrapper">
      <h1 className="addBooking__title">เพิ่มการจองใหม่</h1>
      {/* <p className="addBooking__description">
        Note: ถ้าผู้ใช้เลือกช่องทางการจอง Booking หรือ Hostel,
        ระบบจะกำหนดช่องทางการชำระเงินโดยอัตโนมัติ
      </p> */}
      <div className="addBooking__grid">
        <div>
          <p className="addBooking__label">ชื่อ-สกุล</p>
          <input
            type="text"
            className="boxInput"
            value={formData.name}
            onChange={(e) => formDataChangeHandler("name", e.target.value)}
            placeholder="เช่น Robert Brown"
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
              className="boxInput addBooking__dateInput"
            />
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) =>
                formDataChangeHandler("checkOut", e.target.value)
              }
              style={{ borderRadius: "0 0.5rem 0.5rem 0" }}
              className="boxInput addBooking__dateInput"
            />
          </div>
        </div>
        <div>
          <p className="addBooking__label">ห้อง</p>
          <input
            className="boxInput"
            type="text"
            value={formData.roomId}
            placeholder="เช่น Pottery 1"
            onChange={(e) => formDataChangeHandler("roomId", e.target.value)}
          />
        </div>
        <div>
          <p className="addBooking__label">ช่องทางการจอง</p>
          <Select
            classNamePrefix="rs"
            styles={customStyles}
            options={platformOptions}
            placeholder="เลือกช่องทางการจอง"
            value={platformOptions.find(
              (option) => option.value === formData.platformId,
            )}
            formatOptionLabel={formatOptionLabel}
            onChange={(option) =>
              formDataChangeHandler("platformId", option?.value || "BOOK")
            }
          />
        </div>

        <div>
          <p className="addBooking__label">ราคา (฿)</p>
          <input
            className="boxInput"
            type="number"
            value={formData.price}
            placeholder="เช่น 1000"
            onChange={(e) => formDataChangeHandler("price", e.target.value)}
          />
        </div>
        <div>
          <p className="addBooking__label">จ่ายผ่าน</p>
          <Select
            classNamePrefix="rs"
            styles={customStyles}
            options={paymentMethodOptions}
            placeholder="เลือกช่องทางการชำระเงิน"
            formatOptionLabel={formatPaymentMethodLabel}
            value={paymentMethodOptions.find(
              (option) => option.value === formData.paymentMethod,
            )}
            onChange={(option) =>
              formDataChangeHandler("paymentMethod", option?.value || "")
            }
          />
        </div>
        <div>
          <p className="addBooking__label">Booking ID / Confirmation Number</p>
          <input
            className="boxInput"
            type="text"
            value={formData.bookingId}
            placeholder="เช่น 4012345678"
            onChange={(e) => formDataChangeHandler("bookingId", e.target.value)}
          />
        </div>
      </div>
      <ActionButton
        text="เพิ่มการจอง"
        icon="bx-plus"
        highlight
        onClick={submitHandler}
        className="addBooking__submit"
      />
    </form>
  );
};

export default AddBooking;
