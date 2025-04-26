import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import { signInWithGoogle, signInWithMicrosoft } from "../firebase/firebase";
import "./signup.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STANDARD",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true)

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...dataToSend } = formData;
      
      const response = await axios.post(`${API_ENDPOINT}/users`, dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      // if (response.status === 201 || response.status === 200) {
      //   localStorage.setItem("user_token", response.data.accessToken);
      //   navigate("/Chat");
      // }
      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        setError(null);
        setMessage(response.data.message); // Show "check inbox" message
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to sign up. Please try again."
      );
    } finally {
      setLoading(false)
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
  };

  return (
    <div className="su-container">
      <div className="su-layout">
        {/* Left section - Security Note */}
        <div className="su-security-section">
        <div className="su-logo-section">
            <div className="su-logo-container">
               <img src={logo} alt="Cyberlooper Logo" className="footer-logo" />
            </div>
          </div>
          <div className="su-security-note-container">
            <div className="su-security-note-background"></div>
            <div className="su-security-text-container">
              <div className="su-flash-circle">
                <MDBIcon icon="shield-alt" size="lg" />
              </div>
              <h2 className="su-security-label">Security Note</h2>
            </div>
            <p className="su-security-description">
              We use industry-leading encryption and security practices to ensure your data remains protected. 
              Your credentials are never stored in plain text, and all communications are encrypted end-to-end.
            </p>
          </div>
          <div className="su-cyberlooper">
            <div className="su-green-ellipse"></div>
          </div>
        </div>

        {/* Right section - Signup Form */}
        <div className="su-form-section">
          

          <div className="su-welcome-container">
            <p className="su-welcome-text">GET STARTED NOW</p>
            <h1 className="su-heading">Boost Your Work Day</h1>
            <div className="su-productive-container">
              <div className="su-productive-text">With AI</div>
            </div>
            <p className="su-description">
              Create your account now and get access to all our features.
            </p>
          </div>

          <div className="su-form-wrapper">
            {error && <div className="su-error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="su-form">
              <div className="su-fullname-field">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="su-input"
                  placeholder="Enter your full name"
                  value={formData.firstame}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="su-email-field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="su-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="su-password-field">
          
                <div className="su-password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="su-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span className="su-password-toggle" onClick={togglePasswordVisibility}>
                    <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
                  </span>
                </div>
              </div>

              <div className="su-confirm-password-field">
                
                <div className="su-password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="su-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span className="su-password-toggle" onClick={toggleConfirmPasswordVisibility}>
                    <MDBIcon icon={showConfirmPassword ? "eye-slash" : "eye"} />
                  </span>
                </div>
              </div>

              <div className="su-options-row">
                <div className="su-remember-container">
                  <div 
                    className={`su-checkbox ${rememberMe ? 'su-checked' : ''}`} 
                    onClick={toggleRememberMe}
                  >
                    <div className="su-knob"></div>
                  </div>
                  <span className="su-remember-text">Remember me</span>
                </div>
                <a href="#" className="su-help-link">Need help?</a>
              </div>

              <button type="submit" className="su-submit-button">Sign Up</button>
            </form>

            <div className="su-login-redirect">
              <p className="su-redirect-text">
                Already have an account? <a href="/login" className="su-login-link">Login</a>
              </p>
            </div>

            <div className="su-social-login">
              <div className="su-divider">
                <div className="su-divider-line"></div>
                <span className="su-divider-text">Or sign up with</span>
                <div className="su-divider-line"></div>
              </div>

              <div className="su-social-buttons">
                <div className="su-social-btn su-microsoft" onClick={() => handleSocialLogin("microsoft")}>
                  <MDBIcon fab icon="microsoft" />
                </div>
                <div className="su-social-btn su-google" onClick={() => handleSocialLogin("google")}>
                  <MDBIcon fab icon="google" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;