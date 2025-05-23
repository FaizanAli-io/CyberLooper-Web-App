import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import "./ForgotPassword.css"; // same CSS as forgot password

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      alert("No token provided");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/users/reset-password`,
        { token, new_password: newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setMessage("Password reset successfully. Please login.");
        setTimeout(() => navigate("/login"), 1500); // redirect after short delay
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-layout">
        {/* Left section with form */}
        <div className="left-section">
          <div className="su-logo-section">
            <div className="su-logo-container">
              <img src={logo} alt="Cyberlooper Logo" className="footer-logo" />
            </div>
          </div>
          <div className="welcome-container">
            <p className="welcome-text">Set Your New</p>
            <h1 className="time-to-get">Password</h1>
            <div className="productive-container">
              <p className="productive-text">Securely</p>
            </div>
            <p className="description">
              Enter a new password below to regain access to your account
              safely.
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
              {message && <p className="success-message">{message}</p>}

              <div className="email-container">
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <div className="signup-container">
                <span className="signup-text">Remembered your password? </span>
                <a href="/login" className="signup-link">
                  Sign In instead
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Right section with security note */}
        <div className="right-section">
          <div className="security-note-container">
            <div className="security-note-background"></div>
            <div className="security-note-text-container">
              <div className="security-note-icon">
                <div className="flash-circle">
                  <MDBIcon icon="lock" />
                </div>
                <span className="security-label">Password Reset</span>
              </div>
            </div>
            <p className="security-note-description">
              We'll verify your identity and help you regain access to your
              account
            </p>
          </div>
        </div>
      </div>

      <div className="cyberlooper">
        <div className="green-ellipse"></div>
      </div>
    </div>
  );
}

export default ResetPassword;
