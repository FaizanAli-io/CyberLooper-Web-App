import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import { signInWithGoogle, signInWithMicrosoft } from "../firebase/firebase.js";
import "./login.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/users/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("user_token", response.data.accessToken);
        navigate("/Chat");
      }
      else {
        alert(response.data.message || response.data.detail);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Failed to log in. Please try again."
      );
      console.log("HI! Error occurred while logging in.")
    }
  };

  const handleSocialLogin = async (provider) => {
    let user;
    if (provider === "google") {
      user = await signInWithGoogle();
    } else if (provider === "microsoft") {
      user = await signInWithMicrosoft();
    }

    if (user) {
      console.log(`${provider} Logged-in User:`, user);
      localStorage.setItem("user_token", user.accessToken);
      navigate("/Chat");
    }
    else {
      alert(response.data.message || response.data.detail);
    }
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="login-container">
      <div className="login-layout">
        {/* Left section with login form */}
        <div className="left-section">
          <div className="su-logo-section">
            <div className="su-logo-container">
              <img src={logo} alt="Cyberlooper Logo" className="footer-logo" />
            </div>
          </div>
          <div className="welcome-container">
            <p className="welcome-text">Welcome Back</p>
            <h1 className="time-to-get">Time to Get</h1>
            <div className="productive-container">
              <p className="productive-text">Productive</p>
            </div>
            <p className="description">
              Log in to your account and start managing your projects
              efficiently
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
              {message && <p className="success-message">{message}</p>}

              <div className="email-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
                </span>
              </div>

              <div className="remember-forgot-container">
                <div className="remember-me-container">
                  <div
                    className={`checkbox ${rememberMe ? "checked" : ""}`}
                    onClick={toggleRememberMe}
                  >
                    <div className="knob"></div>
                  </div>
                  <span className="remember-text">Remember me</span>
                </div>

                <a href="/ForgotPassword" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="login-button">
                Log In
              </button>

              <div className="signup-container">
                <span className="signup-text">Don't have an account? </span>
                <a href="signup" className="signup-link">
                  Sign up!
                </a>
              </div>
            </form>

            <div className="social-login-container">
              <div className="divider-container">
                <div className="divider-line"></div>
                <span className="divider-text">Or continue with</span>
                <div className="divider-line"></div>
              </div>

              <div className="social-buttons">
                <button
                  className="social-button microsoft"
                  onClick={() => handleSocialLogin("microsoft")}
                >
                  <MDBIcon fab icon="microsoft" />
                </button>
                <button
                  className="social-button google"
                  onClick={() => handleSocialLogin("google")}
                >
                  <MDBIcon fab icon="google" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right section with security note */}
        <div className="right-section">
          <div className="security-note-container">
            <div className="security-note-background"></div>
            <div className="security-note-text-container">
              <div className="security-note-icon">
                <div className="flash-circle">
                  <MDBIcon icon="shield-alt" />
                </div>
                <span className="security-label">Security Note</span>
              </div>
            </div>
            <p className="security-note-description">
              We safeguard your data with enterprise-grade security
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

export default Login;
