import "./Header.css";

import { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";

import hamburger_icon from "../../assets/images/hamburger-icon.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileView, setMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isLoggedIn = !!localStorage.getItem("user_token");

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

  useEffect(() => {
    const checkScreenSize = () => {
      setMobileView(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const items = [
    {
      label: "Chat",
      command: () => {
        navigate("/chat");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/chat" ? "active-item" : "",
    },
    {
      label: "FAQs",
      command: () => {
        navigate("/faq");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/faq" ? "active-item" : "",
    },
    {
      label: "About Us",
      command: () => {
        navigate("/about");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/about" ? "active-item" : "",
    },
    {
      label: "More About Us",
      command: () => {
        navigate("/more-about");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/more-about" ? "active-item" : "",
    },
    isLoggedIn
      ? {
          label: "Logout",
          command: () => {
            handleLogout();
            setShowMobileMenu(false);
          },
        }
      : {
          label: "Login",
          command: () => {
            handleLogin();
            setShowMobileMenu(false);
          },
          className: location.pathname === "/login" ? "active-item" : "",
        },
  ];

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      {mobileView && (
        <div className="hamburger-container-mobile" onClick={toggleMobileMenu}>
          <img src={hamburger_icon} alt="Menu" className="hamburger-icon" />
          {showMobileMenu && (
            <div className="mobile-menu">
              <ul className="mobile-menu-list">
                {items.map((item, index) => (
                  <li key={index} className="mobile-menu-item">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        item.command && item.command();
                      }}
                      className={item.className}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className={`header-container ${mobileView ? "mobile-hidden" : ""}`}>
        <Menubar model={items} className="header-menubar" />
      </div>
    </>
  );
}
