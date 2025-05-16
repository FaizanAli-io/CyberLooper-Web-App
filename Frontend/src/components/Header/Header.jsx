import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import hamburger_icon from "../../assets/images/hamburger-icon.png";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("user_token"); // Check if user is logged in
  const [mobileView, setMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  // Check screen size on component mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setMobileView(window.innerWidth <= 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const items = [
    {
      label: "Home",
      command: () => {
        navigate("/home");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/home" ? "active-item" : "",
    },
    {
      label: "Chat",
      command: () => {
        navigate("/chat");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/chat" ? "active-item" : "",
    },
    {
      label: "About",
      command: () => {
        navigate("/about");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/about" ? "active-item" : "",
    },
    {
      label: "FAQ",
      command: () => {
        navigate("/faq");
        setShowMobileMenu(false);
      },
      className: location.pathname === "/faq" ? "active-item" : "",
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Start component for mobile view is no longer needed
  // Mobile hamburger is now handled separately

  return (
    <>
      {mobileView && (
        <div className="hamburger-container-mobile" onClick={toggleMobileMenu}>
          <img 
            src={hamburger_icon} 
            alt="Menu" 
            className="hamburger-icon" 
          />
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
      <div className={`header-container ${mobileView ? 'mobile-hidden' : ''}`}>
        <Menubar 
          model={items} 
          className="header-menubar"
        />
      </div>
    </>
  );
}