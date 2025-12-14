import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        🍭 <span>SweetShop</span>
      </div>

      <div className="nav-right">
        <span className="nav-link" onClick={() => navigate("/")}>
          Dashboard
        </span>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
