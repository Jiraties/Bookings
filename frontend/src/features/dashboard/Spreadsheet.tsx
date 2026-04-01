import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { AllCommunityModule } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";
import type { booking } from "../../types/bookingTypes";
import "./Spreadsheet.css";
import { useLocation } from "react-router";

const myTheme = themeQuartz.withParams({
  fontFamily: "IBM Plex Sans Thai",
  accentColor: "var(--primary-color)",
  backgroundColor: "var(--background)",
  browserColorScheme: "light",
  chromeBackgroundColor: "var(--background)",
  foregroundColor: "var(--text)",
  spacing: "0.6rem",
  wrapperBorderRadius: "1rem",
  wrapperBorder: false,
});

const platformCell = (params: any) => {
  const platformMap = {
    BOOK: { label: "Booking.com", color: "#003580" },
    AGOD: { label: "Agoda", color: "#19AC5B" },
    TRAV: { label: "Traveloka", color: "#00ADEF" },
    HOST: { label: "Hostelworld", color: "#F15A24" },
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

const Spreadsheet = ({
  bookings,
  setViewBookingBooking,
}: {
  bookings: booking[];
  setViewBookingBooking: (booking: booking) => void;
}) => {
  const modules = [AllCommunityModule];
  const location = useLocation();
  const status = location.pathname.includes("arrivals")
    ? "arrivals"
    : "departures";

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
    {
      field: "checkOut",
      valueFormatter: dateValueFormater,
    },
    { field: "nights", headerName: "คืน" },

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
    { field: "roomId", headerName: "ห้อง", filter: true },
    {
      field: "isCheckedIn",
      headerName: "สถานะ Check-In",
      cellClassRules: { green: (param) => param.value === true },
      pinned: "right",
    },
    { field: "bookingId", headerName: "Booking ID", sortable: false },
    {
      field: "checkedInByStaffUsername",
      headerName: "เช็คอินโดย",
    },

    { field: "note", sortable: false },
  ]);

  const onRowDoubleClicked = (event: any) => {
    setViewBookingBooking(event.data);
  };

  return (
    <AgGridProvider modules={modules}>
      <div
        style={{
          boxShadow: "rgba(149, 157, 165, 0.25) 0px 8px 24px",
          height: "100%",
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
          // gridOptions={{ enableCellTextSelection: true }}
          onRowDoubleClicked={onRowDoubleClicked}
        />
      </div>
    </AgGridProvider>
  );
};

export default Spreadsheet;
