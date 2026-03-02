import "./App.css";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route } from "react-router";

function App() {
  const { isAuthenticated } = useAuth();

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
