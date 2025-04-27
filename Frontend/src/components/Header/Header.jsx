import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("user_token"); // Check if user is logged in

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user_token");
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const items = [
    {
      label: "Home",
      command: () => navigate("/"),
      className: location.pathname === "/" ? "active-item" : "",
    },
    {
      label: "Chat",
      command: () => navigate("/chat"),
      className: location.pathname === "/chat" ? "active-item" : "",
    },
    {
      label: "About",
      command: () => navigate("/about"),
      className: location.pathname === "/about" ? "active-item" : "",
    },
    {
      label: "FAQ",
      command: () => navigate("/faq"),
      className: location.pathname === "/faq" ? "active-item" : "",
    },
    isLoggedIn
      ? {
          label: "Logout",
          command: handleLogout,
        }
      : {
          label: "Login",
          command: handleLogin,
          className: location.pathname === "/login" ? "active-item" : "",
        },
  ];

  return (
    <div className="header-container">
      <Menubar model={items} className="header-menubar" />
    </div>
  );
}
