import { Link } from "react-router";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <h1>404 ไม่พบหน้าที่คุณต้องการ</h1>
      <Link to="/">กลับสู่หน้าหลัก</Link>
    </div>
  );
};

export default NotFound;
