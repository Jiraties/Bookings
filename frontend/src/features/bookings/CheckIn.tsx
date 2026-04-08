import { useState } from "react";
import type { booking } from "../../types/bookingTypes";
import "./CheckIn.css";
import Select from "react-select";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { customStyles } from "./AddBooking";
import ActionButton from "../../components/ActionButton";

countries.registerLocale(en);

const getFlagEmoji = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

const nationalityOptions = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({
    value: code,
    label: `${name} ${getFlagEmoji(code)}`,
  }),
);

const CheckIn = ({ booking }: { booking: booking }) => {
  const [deposit, setDeposit] = useState<number>(200);
  const [confirmedPayment, setConfirmedPayment] = useState<boolean>(false);
  const [nationality, setNationality] = useState<string>("");
  const [
    receivesCashAtDifferentAmountToRoomPrice,
    setReceivesCashAtDifferentAmountToRoomPrice,
  ] = useState(false);
  const [receivedCash, setReceivedCash] = useState<string>(
    String(booking.price),
  );

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currency: "THB",
    }).format(num);

  return (
    <div className="checkIn__wrapper">
      <div>
        <div className="checkIn__header">
          <h1 className="checkIn__title">เช็คอิน {booking.name}</h1>
          {booking.paymentMethod === "Unpaid" && (
            <div className="checkIn__reminder">
              <i className="bx bx-message-bubble-exclamation" />
              <p>
                ลูกค้าดังกล่าว
                <strong>
                  ยังไม่ชำระเงินค่าห้อง
                  {" " + formatCurrency(booking.price)}
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="checkIn__grid">
        <div className="checkIn__left">
          <div>
            {" "}
            <p className="checkIn__label">
              เลข Passport <i className="bx bx-check-shield" />
            </p>
            <input
              type="text"
              className="boxInput"
              placeholder="เช่น A12345678"
            />
          </div>
          <div>
            <p className="checkIn__label">
              ชื่อ-นามสกุล Passport <i className="bx bx-check-shield" />
            </p>
            <input
              type="text"
              className="boxInput"
              style={{ textTransform: "uppercase" }}
              placeholder="เช่น Robert Brown"
            />
          </div>
          <div>
            <p className="checkIn__label">ชาติ</p>
            <Select options={nationalityOptions} styles={customStyles} />{" "}
            //@ts-ignore
          </div>
        </div>
        <div className="checkIn__right">
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
              onChange={(e) => {
                setDeposit(Number(e.target.value));
                setConfirmedPayment(false);
              }}
            />
          </div>
          {receivesCashAtDifferentAmountToRoomPrice && (
            <div>
              <p className="checkIn__label">รับเงินสดค่าห้องมา (บาท)</p>
              <input
                className="boxInput"
                type="number"
                value={receivedCash}
                placeholder="200"
                onChange={(e) => {
                  setReceivedCash(e.target.value);
                }}
              />
            </div>
          )}
          <div>
            <p style={{ marginBottom: ".5rem" }}>ยืนยันการรับเงินสด</p>
            <div className="checkIn__paymentConfirmation">
              {/* <h3>ยืนยันการรับเงินสด</h3> */}
              <div className="checkIn__paymentConfirmationList">
                <p>ค่ามัดจำ: {formatCurrency(deposit)}</p>
                {booking.paymentMethod === "Unpaid" && (
                  <p>
                    ค่าห้อง: {formatCurrency(booking.price)}
                    <span className="checkIn__extraAmountReceived">
                      {receivesCashAtDifferentAmountToRoomPrice &&
                        ` + เกิน ${formatCurrency(Number(receivedCash) - booking.price)}`}
                    </span>
                  </p>
                )}
              </div>
              <div className="checkIn__paymentConfirmationTotal">
                <div>
                  <p>รับเงินสดทั้งหมด:</p>
                  <p className="checkIn__paymentConfirmationTotalText">
                    {booking.paymentMethod === "Unpaid"
                      ? formatCurrency(
                          deposit +
                            (receivesCashAtDifferentAmountToRoomPrice
                              ? Number(receivedCash)
                              : booking.price),
                        )
                      : formatCurrency(deposit)}
                  </p>
                </div>

                <label className="checkbox">
                  ยืนยันการรับเงินสด
                  <input
                    type="checkbox"
                    checked={confirmedPayment}
                    onChange={(e) => setConfirmedPayment(e.target.checked)}
                  />
                  <span className="box"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkIn__actions">
        {booking.paymentMethod === "Unpaid" && (
          <ActionButton
            text="รับเงินสดไม่ตรงค่าห้อง"
            onClick={() => {
              setReceivesCashAtDifferentAmountToRoomPrice(
                !receivesCashAtDifferentAmountToRoomPrice,
              );
            }}
            icon={
              receivesCashAtDifferentAmountToRoomPrice
                ? "bx-check"
                : "bx-currency-notes"
            }
            highlight={receivesCashAtDifferentAmountToRoomPrice}
          />
        )}
        <ActionButton
          text="Check In"
          onClick={() => {}}
          className="checkIn__confirmAction"
          icon="bx-check-circle"
          highlight={true}
        />
      </div>
    </div>
  );
};

export default CheckIn;
