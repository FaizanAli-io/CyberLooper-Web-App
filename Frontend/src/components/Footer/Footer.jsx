import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Tagline */}
        <div className="footer-logo-section">
          <div className="footer-logo-container">
            <img src={logo} alt="Cyberlooper Logo" className="footer-logo" />
          </div>
          <p className="footer-tagline">Looking into the future of AI Technology</p>
          
          <div className="footer-social">
            <p className="footer-social-text">Follow us on:</p>
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon_facebook"></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon_twitter"></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon_linkedin"></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon_youtube"></a>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="footer-links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links-list">
            <li><a href="/home" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>Home</a></li>
            <li><a href="/about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>About Us</a></li>
            <li><a href="/faq" onClick={(e) => { e.preventDefault(); navigate("/faq"); }}>FAQs</a></li>
            <li><a href="/ContactUs" onClick={(e) => { e.preventDefault(); navigate("/ContactUs"); }}>Contact Us</a></li>
          </ul>
        </div>
        
        {/* Contact Us */}
        <div className="footer-contact">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-contact-list">
            <li className="contact-item">
              <div className="contact-icon location-icon"></div>
              <span>Address: 123, 456789</span>
            </li>
            <li className="contact-item">
              <div className="contact-icon phone-icon"></div>
              <span>Phone: +1234567890</span>
            </li>
            <li className="contact-item">
              <div className="contact-icon email-icon"></div>
              <span>Email: cyberlooper.com</span>
            </li>
          </ul>
        </div>
        
        {/* Terms and Policies */}
        <div className="footer-terms">
          <h3 className="footer-heading">Terms and Policies</h3>
          <ul className="footer-terms-list">
            <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigate("/PrivacyPolicy"); }}>Privacy policy</a></li>
            <li><a href="/terms" onClick={(e) => { e.preventDefault(); navigate("/TermsOfService"); }}>Terms Of Service</a></li>
            <li><a href="/safety" onClick={(e) => { e.preventDefault(); navigate("/SecurityPolicy"); }}>Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-copyright">
        <p>Copyright ©2025 CYBERLOOPER All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;