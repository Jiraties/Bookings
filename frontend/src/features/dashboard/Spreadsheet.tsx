import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import "./Spreadsheet.css";

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
  isCheckedIn: boolean;
  staffUser: string;
}

const myTheme = themeQuartz.withParams({
  fontFamily: "IBM Plex Sans Thai",
  accentColor: "#51D1DC",
  backgroundColor: "#FFFFFF",
  browserColorScheme: "light",
  chromeBackgroundColor: "#FFFFFF",
  foregroundColor: "#000000",
  spacing: "0.6rem",
  wrapperBorderRadius: "1rem",
  wrapperBorder: false,
});

const platformCell = (params: any) => {
  const platformMap = {
    BOOK: { label: "Booking.com", color: "#003580" },
    AGDA: { label: "Agoda", color: "#19AC5B" },
    TRVL: { label: "Traveloka", color: "#00ADEF" },
    HSTL: { label: "Hostelworld", color: "#F15A24" },
    WALK: { label: "Walk-In", color: "#f12424" },
  };

  const platform = platformMap[params.value as keyof typeof platformMap];

  return (
    <div className="platformCell">
      <div
        className="platformCell__wrapper"
        style={{ backgroundColor: platform.color + "15" }}
      >
        <span
          className="platformCell__dot"
          style={{ backgroundColor: platform.color }}
        ></span>
        <p>{platform.label}</p>
      </div>
    </div>
  );
};

const Spreadsheet = ({ bookings }: { bookings: booking[] }) => {
  const modules = [AllCommunityModule];

  const dateValueFormater = (params: any) =>
    new Intl.DateTimeFormat("th-TH", {
      dateStyle: "medium",
      calendar: "gregory",
    }).format(params.value);

  const [colDefs] = useState<ColDef<booking>[]>([
    { field: "name", headerName: "ชื่อ", filter: true },
    {
      field: "checkIn",
      valueFormatter: dateValueFormater,
    },
    { field: "checkOut", valueFormatter: dateValueFormater },
    { field: "nights" },

    {
      field: "platformId",
      headerName: "ช่องทางการจอง",
      filter: true,
      cellRenderer: platformCell,
    },
    {
      field: "price",
      headerName: "ค่าห้อง",
      valueFormatter: (params) =>
        new Intl.NumberFormat("th-TH", {
          style: "currency",
          currency: "THB",
          minimumFractionDigits: 0,
          currencyDisplay: "code",
        }).format(params.value),
    },
    {
      field: "paymentMethod",
      headerName: "ช่องทางการจ่าย",
      filter: true,
      cellClassRules: { red: (param) => param.value === "Unpaid" },
    },
    { field: "roomId", headerName: "ห้อง" },
    {
      field: "isCheckedIn",
      headerName: "สถานะ Check-In",
      cellClassRules: { green: (param) => param.value === true },
      pinned: "right",
    },
    { field: "note", sortable: false },
  ]);

  return (
    <AgGridProvider modules={modules}>
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.25) 0px 8px 24px",
          height: 500,
          borderRadius: "   1rem",
        }}
      >
        <AgGridReact<booking>
          rowData={bookings}
          columnDefs={colDefs}
          theme={myTheme}
          autoSizeStrategy={{
            type: "fitCellContents",
          }}
        />
      </div>
    </AgGridProvider>
  );
};

export default Spreadsheet;
