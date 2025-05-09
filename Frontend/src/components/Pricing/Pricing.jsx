import React from "react";
import { useNavigate } from "react-router-dom";
import "./Pricing.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const PricingPage = () => {
  const isLoggedIn = !!localStorage.getItem("user_token");
  const navigate = useNavigate();

  return (
    <>
      <div className="home-logo-container">
        <img src={logo} alt="Cyberlooper Logo" className="home-logo" />
      </div>
      {isLoggedIn ? (
        <p className="home-login-btn">
          {/* Logged in UI elements could go here */}
        </p>
      ) : (
        <>
        
          <button className="home-login-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
          <div className="home-try-button" onClick={() => navigate("/signup")}>
            <span className="try-text">Try it free</span>
            <i className="pi pi-arrow-up-right icon-arrow"></i>
          </div>
        </>
      )}

      <div className="pp-pricing-container">
        {/* Hero Title */}
        <h1 className="pp-hero-title">Free During Beta</h1>
        
        {/* Hero Subtitle */}
        <p className="pp-hero-subtitle">
          Full Feature Access: Experience our entire suite of data tools at no cost. Direct Feedback Loop: Influence upcoming features and improvements by providing valuable insights. No Hidden Fees: Zero credit card details required; sign up and start using Cyberlooper risk-free.
        </p>
        
        {/* First Section - Early Access Advantages */}
        <div className="pp-section-container">
          <h2 className="pp-section-title">Early Access Advantages</h2>
          <div className="pp-content-wrapper">
            <p className="pp-content-text">
              Full Feature Access: Experience our entire suite of data tools at no cost. Direct Feedback Loop: Influence upcoming features and improvements by providing valuable insights. No Hidden Fees: Zero credit card details required; sign up and start using Cyberlooper risk-free.
            </p>
          </div>
        </div>
        
        {/* Line 534 */}
        <div className="pp-divider"></div>
        
        {/* Second Section - Title not specified in the reference but reusing structure */}
        <div className="pp-section-container">
          <h2 className="pp-section-title">Early Access Advantages</h2>
          <div className="pp-content-wrapper">
            <p className="pp-content-text">
              Full Feature Access: Experience our entire suite of data tools at no cost. Direct Feedback Loop: Influence upcoming features and improvements by providing valuable insights. No Hidden Fees: Zero credit card details required; sign up and start using Cyberlooper risk-free.
            </p>
          </div>
        </div>
        
        {/* Line 533 */}
        <div className="pp-divider"></div>
        
        {/* Third Section - Why Sign Up Now? */}
        <div className="pp-section-container">
          <h2 className="pp-section-title">Why Sign Up Now?</h2>
          <div className="pp-content-wrapper">
            <p className="pp-content-text">
              Exclusive Access: Be among the first to benefit from our latest updates and features. Cost-Free Development: Leverage Cyberlooper's advanced analytics and automation to jumpstart your projects without draining your budget. Priority Support: Beta users receive dedicated support and faster response times, so your feedback leads directly to product enhancements.
            </p>
          </div>
        </div>
        
        {/* Line 532 */}
        <div className="pp-divider"></div>
        <div className="join-future-section">
          <div className="join-future-content">
            <h2 className="join-title">Join the Future of Work</h2>
            <p className="join-subtitle">Sign up now to experience the AI advantage.</p>
          </div>
          <button className="join-future-btn" onClick={() => navigate("/signup")}>
            Join for free
          </button>
        </div>
      </div>
    </>
  );
};

export default PricingPage;