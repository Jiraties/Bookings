import { useState } from "react";
import type { booking } from "../../types/bookingTypes";
import "./CheckIn.css";
import Select from "react-select";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { customStyles } from "./AddBooking";

countries.registerLocale(en);

const getFlagEmoji = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));

const nationalityOptions = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({
    value: code,
    label: `${name} ${getFlagEmoji(code)}`,
  }),
);

const CheckIn = ({ booking }: { booking: booking }) => {
  const [deposit, setDeposit] = useState<number>(200);
  const [nationality, setNationality] = useState<number>(200);

  return (
    <div className="checkIn__wrapper">
      <h1 className="checkIn__title">เช็คอิน {booking.name}</h1>
      <div className="checkIn__grid">
        <div className="checkIn__right">
          <div>
            {" "}
            <p className="checkIn__label">เลข Passport</p>
            <input
              type="text"
              className="boxInput"
              placeholder="เช่น A12345678"
            />
          </div>
          <div>
            <p className="checkIn__label">ชื่อ-นามสกุล Passport</p>
            <input
              type="text"
              className="boxInput"
              style={{ textTransform: "uppercase" }}
              placeholder="เช่น Robert Brown"
            />
          </div>
          <div>
            <p className="checkIn__label">ชาติ</p>
            <Select options={nationalityOptions} styles={customStyles} />
          </div>
        </div>
        <div className="checkIn__left">
          <div>
            <p className="checkIn__label">มัดจำ (บาท)</p>
            <input
              className="boxInput"
              type="number"
              max={1000}
              min={0}
              value={deposit}
              // value={formData.roomId}
              placeholder="200"
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
