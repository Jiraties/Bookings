import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { useAuth } from "./context/AuthContext";

import "./App.css";

function App() {
  const { isAuthenticated, login } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });

        const user = response.data.user;

        if (response.data.user) {
          console.log(user);
          login(user);
          setCheckingAuth(false);
        }
      } catch (err) {
        console.error(err);
        setCheckingAuth(false);
      }
    };

    fetchUser();
  }, []);

  if (checkingAuth) return <></>;

  return (
    <div className="root">
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
