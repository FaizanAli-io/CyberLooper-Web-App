import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user_token");
      navigate("/Login");
    }
  };

  const items = [
    {
      label: "Home",
      command: () => navigate("/"),
      className: location.pathname === "/home" ? "active-item" : "",
    },
    {
      label: "Chat",
      command: () => navigate("/chat"),
      className: location.pathname === "/chat" ? "active-item" : "",
    },
    {
      label: "Blogs",
      command: () => navigate("/blogs"),
      className: location.pathname === "/blogs" ? "active-item" : "",
    },
    {
      label: "FAQ",
      command: () => navigate("/faq"),
      className: location.pathname === "/faq" ? "active-item" : "",
    },
    {
      label: "Logout",
      command: handleLogout,
    },
  ];

  return (
    <div className="header-container">
      <Menubar model={items} className="header-menubar" />
    </div>
  );
}
