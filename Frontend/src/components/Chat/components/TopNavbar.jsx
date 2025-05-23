import { useState } from "react";

export const TopNavbar = ({
  isAuthenticated,
  onSignIn,
  onSignUp,
  onSignOut,
  onNavigateTo,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="top-navbar-content">
      {!isAuthenticated ? (
        <div className="top-auth-buttons">
          <button className="top-auth-btn" onClick={onSignIn}>
            Sign In
          </button>
          <button className="top-auth-btn" onClick={onSignUp}>
            Sign Up
          </button>
        </div>
      ) : (
        <div className="top-user-menu">
          <button
            className="top-user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Menu ▾
          </button>
          {showDropdown && (
            <div className="top-user-dropdown">
              <button
                className="top-user-item"
                onClick={() => {
                  onNavigateTo("/profile");
                  setShowDropdown(false);
                }}
              >
                Profile & Settings
              </button>
              <button
                className="top-user-item"
                onClick={() => {
                  onNavigateTo("/dashboard");
                  setShowDropdown(false);
                }}
              >
                Dashboard
              </button>
              <button
                className="top-user-item"
                onClick={() => {
                  onSignOut();
                  setShowDropdown(false);
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
