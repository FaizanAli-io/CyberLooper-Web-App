import React from "react";
import { useNavigate } from "react-router-dom";
import "./PrivacyPolicy.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const PrivacyPolicy = () => {
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
        <h1 className="privacy-policy-hero-title">Privacy Policy</h1>

        {/* Effective Date */}
        <p className="privacy-policy-effective-date">
          Effective Date: March 7, 2025
        </p>

        {/* Scope of This Policy Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Scope of This Policy</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                This Privacy Policy applies to personal information collected
                through the Cyberlooper website and any related online or
                offline services we provide.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                It does not cover data that may be collected through third-party
                websites or services that we do not control.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Information We Collect Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            Information We Collect
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Account Registration: When you create an account, we may ask for
                your name, email address, phone number, and other relevant
                details.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Contact Forms & Inquiries: If you submit inquiries or contact us
                through our online forms or via email, we collect the
                information you provide.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Service Transactions: When you purchase or subscribe to our
                Services, we collect necessary billing and payment details.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">4.</span>
              <p className="privacy-policy-text">
                Usage Data: We may automatically collect information about how
                you interact with our website.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">5.</span>
              <p className="privacy-policy-text">
                Cookies and Similar Technologies: We use cookies, web beacons,
                and similar tracking technologies to improve your experience.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">6.</span>
              <p className="privacy-policy-text">
                Information from Third Parties: We may receive additional
                information from third-party vendors, business partners, or
                social media platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* How We Use Your Information Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            How We Use Your Information
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Service Delivery: To operate and maintain our Services, provide
                customer support, and process payments.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Communication: To respond to your inquiries, notify you of
                changes or updates to our Services.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Analytics and Improvements: To analyze how users interact with
                our website and Services.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">4.</span>
              <p className="privacy-policy-text">
                Security and Fraud Prevention: To protect our users, employees,
                and business against risks and unauthorized activities.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">5.</span>
              <p className="privacy-policy-text">
                Legal Compliance: To comply with applicable laws, regulations,
                or legal processes.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Cookies and Tracking Technologies Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            Cookies and Tracking Technologies
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Essential Cookies: Necessary for the website to function
                properly and cannot be disabled.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Performance Cookies: Help us understand how users interact with
                our website by collecting information anonymously.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Functional Cookies: Allow us to remember choices you make to
                enhance your experience.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">4.</span>
              <p className="privacy-policy-text">
                Targeting Cookies: Track browsing habits to deliver targeted
                advertising.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">5.</span>
              <p className="privacy-policy-text">
                Managing Cookies: You can adjust your browser settings to refuse
                or delete cookies.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* How We Share Your Information Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            How We Share Your Information
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Service Providers: We may share your personal information with
                trusted third-party vendors or partners.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Business Transfers: If Cyberlooper is involved in a merger,
                acquisition, or asset sale, your information may be transferred.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">3.</span>
              <p className="privacy-policy-text">
                Legal Requirements: We may disclose personal information if
                required to do so by law.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">4.</span>
              <p className="privacy-policy-text">
                Consent: We may share your personal information for other
                purposes if you give us explicit consent.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Data Retention Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Data Retention</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                We retain personal information for as long as it is necessary to
                fulfill the purposes outlined in this Privacy Policy.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                Once we no longer need your information, we will either delete
                it or anonymize it.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Data Security Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Data Security</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                We implement reasonable administrative, technical, and physical
                safeguards designed to protect your personal information.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                However, no method of transmission or storage is entirely
                secure.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Children's Privacy Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">Children's Privacy</h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Our Services are not directed toward individuals under the age
                of 13.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                We do not knowingly collect personal information from children.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* International Data Transfers Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            International Data Transfers
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                If you access or use our Services from outside the United
                States, your personal information may be transferred to and
                processed in the United States.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Your Rights and Choices Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            Your Rights and Choices
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Depending on your jurisdiction, you may have certain rights
                regarding your personal information.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                To exercise any of these rights, please contact us at the email
                or phone number provided in the 'Contact Us' section.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Third-Party Websites and Services Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            Third-Party Websites and Services
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                Our website and Services may contain links to external websites
                or services that are not operated by us.
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-policy-divider"></div>

        {/* Changes to This Privacy Policy Section */}
        <div className="privacy-policy-section">
          <h2 className="privacy-policy-section-title">
            Changes to This Privacy Policy
          </h2>
          <div className="privacy-policy-content-wrapper">
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">1.</span>
              <p className="privacy-policy-text">
                We may periodically update this Privacy Policy to reflect
                changes in our practices.
              </p>
            </div>
            <div className="privacy-policy-point">
              <span className="privacy-policy-number">2.</span>
              <p className="privacy-policy-text">
                If we make material changes, we will notify you by posting a
                notice on our website.
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
              If you have any questions about this Privacy Policy or need
              further information, feel free to contact us:
            </p>
            <p className="privacy-policy-contact-details">
              Cyberlooper
              <br />
              San Antonio, Texas
              <br />
              contact@cyberlooper.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
