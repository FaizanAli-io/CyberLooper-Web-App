import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const SecurityPolicy = () => {
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

      <div className="privacy-policy-container">
        {/* Hero Title */}
        <h1 className="privacy-policy-hero-title">Cyberlooper Security Policy</h1>
        
        {/* Effective Date */}
        <p className="privacy-policy-effective-date">Effective Date: March 7, 2025</p>
        
        {/* Our Commitment to Security Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Our Commitment to Security</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Data Protection: We treat your data as we would our own, implementing strong encryption and robust access controls to prevent unauthorized access.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Industry Best Practices: Our security framework aligns with recognized standards and practices, helping us maintain high levels of protection against emerging threats.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* How We Protect Your Information Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">How We Protect Your Information</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Encryption: We use strong encryption protocols (e.g., TLS/SSL) to protect data in transit, and we encrypt sensitive information stored in our databases where feasible.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Secure Infrastructure: Our servers and network systems are protected by firewalls, intrusion detection systems, and other security controls to prevent unauthorized entry.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Access Controls: We follow the principle of 'least privilege,' ensuring that our employees, contractors, and partners only have access to the systems and data they need to do their jobs.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">4.</span>
              <p className="privacy-policy-text">
                Regular Assessments: We conduct periodic vulnerability scans and security audits to identify and address potential weaknesses. Any identified issues are promptly fixed according to a risk-based priority system.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Employee Training and Accountability Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Employee Training and Accountability</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Security Awareness: All team members receive ongoing training on the latest security practices, threats, and data protection regulations.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Clear Protocols: We maintain strict internal policies and procedures, ensuring everyone understands their role in keeping your data secure.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Incident Reporting: Employees must promptly report any suspicious activity or potential vulnerabilities, enabling swift response and remediation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Incident Response and Notification Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Incident Response and Notification</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Rapid Response: In the event of a security incident, our dedicated security team immediately initiates an incident response plan to contain and investigate the issue.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Transparency: If your data is ever at risk, we will notify you promptly and provide regular updates throughout the resolution process.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Post-Incident Review: We conduct a thorough investigation to learn from each incident and enhance our defenses to prevent future occurrences.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Third-Party Services and Integrations Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Third-Party Services and Integrations</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Vendor Screening: Before partnering with any third-party service, we review their security posture to ensure they meet our standards.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Data Sharing: We only share the minimum necessary data with external services and do so under strict contractual obligations that protect your information.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Ongoing Monitoring: We periodically reassess our partners to confirm their security measures remain compliant with industry best practices.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Compliance and Regulations Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Compliance and Regulations</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Legal Requirements: We comply with applicable data protection laws and regulations relevant to our services and the regions where we operate.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Standards Alignment: Our security measures align with widely accepted frameworks and industry best practices to maintain a consistently high level of protection.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Customer Responsibilities Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Customer Responsibilities</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Use Strong Passwords: Create complex passwords or passphrases, and update them regularly.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Enable Two-Factor Authentication (2FA): Whenever available, use 2FA to add an extra layer of security to your account.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Changes to This Policy Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Changes to This Policy</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                We may update this Security Policy from time to time as our practices evolve or as necessary to comply with changes in laws or regulations. When we do, we will post the revised policy on our website and update the effective date. Your continued use of our services after any updates constitute your acceptance of the new terms.
              </p>
            </div>
          </div>
        </div>
        
        <div className="privacy-policy-divider"></div>
        
        {/* Contact Information Section */}
        <div className="privacy-policy-contact-section">
          <h2 className="privacy-policy-section-title">Contact Information</h2>
          <div className="privacy-policy-contact-content">
            <p className="privacy-policy-contact-text">
              If you have any questions about this Security Policy or need further information, feel free to contact us:
            </p>
            <p className="privacy-policy-contact-details">
              Cyberlooper<br />
              San Antonio, Texas<br />
              contact@cyberlooper.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityPolicy;