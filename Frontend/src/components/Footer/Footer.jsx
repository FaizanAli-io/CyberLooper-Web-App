import "./Footer.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const Footer = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (e, path) => {
    e.preventDefault();
    
    // Scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Navigate to the new page
    navigate(path);
    
    // Force scroll to top after navigation (backup)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const mainLinks = [
    { label: "Chat", path: "/chat" },
    { label: "FAQ", path: "/faq" },
    { label: "Blogs", path: "/blogs" },
    { label: "About", path: "/about" },
    { label: "More About Us", path: "/more-about" },
  ];

  const userLinks = [
    { label: "Profile", path: "/profile" },
    { label: "Pricing", path: "/pricing" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo-container">
            <img src={logo} alt="Cyberlooper Logo" className="footer-logo" />
          </div>
          <p className="footer-tagline">
            Looking into the future of AI Technology
          </p>
          <div className="footer-social">
            <p className="footer-social-text">Follow us on:</p>
            <div className="footer-social-icons">
              {[
                {
                  href: "https://facebook.com",
                  className: "social-icon_facebook",
                },
                {
                  href: "https://twitter.com",
                  className: "social-icon_twitter",
                },
                {
                  href: "https://linkedin.com",
                  className: "social-icon_linkedin",
                },
                {
                  href: "https://instagram.com",
                  className: "social-icon_youtube",
                },
              ].map(({ href, className }) => (
                <a
                  key={className}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h3 className="footer-heading">Main Links</h3>
            <ul className="footer-links-list">
              {mainLinks.map(({ label, path }) => (
                <li key={path}>
                  <a href={path} onClick={(e) => handleNavigation(e, path)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">User Links</h3>
            <ul className="footer-links-list">
              {userLinks.map(({ label, path }) => (
                <li key={path}>
                  <a href={path} onClick={(e) => handleNavigation(e, path)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-terms">
          <h3 className="footer-heading">Terms and Policies</h3>
          <ul className="footer-terms-list">
            {[
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Security Policy", path: "/security-policy" },
              { label: "Terms of Service", path: "/terms-of-service" },
            ].map(({ label, path }) => (
              <li key={path}>
                <a href={path} onClick={(e) => handleNavigation(e, path)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-divider" />
      <div className="footer-copyright">
        <p>Copyright ©2025 CYBERLOOPER All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;