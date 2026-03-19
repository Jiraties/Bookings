import ActionButton from "../components/ActionButton";
import "./Settings.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    logout();

    navigate("/");
  };

  return (
    <main className="settings">
      <h1>ตั้งค่า</h1>
      <div className="settings__grid">
        <div className="settings__list">
          <div className="settings__item">
            <p>ออกจากระบบ</p>
            <ActionButton
              text="ออกจากระบบ"
              icon=""
              onClick={logoutHandler}
              className="settings__logout"
            />
          </div>
        </div>
        <div className="settings__activities"></div>
      </div>
    </main>
  );
};

export default Settings;
