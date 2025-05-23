import "./TermsOfService.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const TermsOfService = () => {
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

      <div className="tos-container">
        {/* Hero Title */}
        <div className="tos-hero-title">Terms of Service</div>

        {/* Hero Subtitle */}
        <p className="tos-hero-subtitle">Effective Date: March 7, 2025</p>

        {/* Introduction */}
        <div className="tos-intro">
          <p>
            Welcome to Cyberlooper ("Cyberlooper," "we," "us," or "our"). These
            Terms of Service ("Terms") govern your access to and use of our
            website, products, and services (collectively, the "Services"). By
            using our Services, you agree to be bound by these Terms. If you do
            not agree to all of the following, you are not permitted to use our
            Services.
          </p>
        </div>

        {/* Section 1 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">1. Acceptance of Terms</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">1.1 Legal Agreement</h3>
            <p className="tos-content-text">
              By accessing or using the Services, you acknowledge and agree that
              these Terms represent a legal contract between you and
              Cyberlooper.
            </p>

            <h3 className="tos-subsection-title">1.2 Eligibility</h3>
            <p className="tos-content-text">
              You must be at least 18 years old—or the age of majority in your
              jurisdiction—to use our Services. By using the Services, you
              confirm that you meet this requirement.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 2 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">2. Scope of Services</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">2.1 Overview</h3>
            <p className="tos-content-text">
              Cyberlooper specializes in providing data-related solutions such
              as data engineering, analytics consulting, SQL development, and
              cloud integrations. Additional details about our offerings can be
              found on our website.
            </p>

            <h3 className="tos-subsection-title">2.2 Modifications</h3>
            <p className="tos-content-text">
              We reserve the right to change, update, or discontinue certain
              aspects of the Services at any time without prior notice.
              Cyberlooper will not be liable for any modifications made to the
              Services.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 3 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">3. Privacy and Data Usage</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">3.1 Privacy Policy</h3>
            <p className="tos-content-text">
              Our practices regarding the collection, use, and disclosure of
              your personal information are detailed in our Privacy Policy,
              which is incorporated into these Terms. By using our Services, you
              confirm that you have reviewed and accept our Privacy Policy.
            </p>

            <h3 className="tos-subsection-title">3.2 Consent</h3>
            <p className="tos-content-text">
              You acknowledge that by using our Services, you consent to the
              collection and use of your information as described in our Privacy
              Policy.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 4 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">4. User Obligations</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">4.1 Account Information</h3>
            <p className="tos-content-text">
              If you create an account with Cyberlooper, you must provide
              accurate and up-to-date information. It is your responsibility to
              maintain the confidentiality of your login credentials.
            </p>

            <h3 className="tos-subsection-title">4.2 Prohibited Activities</h3>
            <p className="tos-content-text">
              You agree not to use the Services in any manner that is unlawful,
              harmful, or infringes on the rights of others. Any activities that
              disrupt or compromise the integrity of our systems are strictly
              prohibited.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 5 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">5. Intellectual Property Rights</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">5.1 Cyberlooper Ownership</h3>
            <p className="tos-content-text">
              All content, trademarks, service marks, and related intellectual
              property within the Services remain the exclusive property of
              Cyberlooper or its licensors.
            </p>

            <h3 className="tos-subsection-title">5.2 Limited License</h3>
            <p className="tos-content-text">
              Subject to your compliance with these Terms, Cyberlooper grants
              you a non-exclusive, non-transferable, revocable license to access
              and use the Services for your internal business purposes.
            </p>

            <h3 className="tos-subsection-title">5.3 Restrictions</h3>
            <p className="tos-content-text">
              Unless explicitly permitted by written agreement, you may not
              modify, reproduce, distribute, create derivative works of, or
              commercially exploit any part of the Services.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 6 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">6. Confidential Information</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">6.1 Definition</h3>
            <p className="tos-content-text">
              "Confidential Information" refers to non-public or proprietary
              information provided by Cyberlooper to you in connection with the
              Services.
            </p>

            <h3 className="tos-subsection-title">6.2 Protection and Use</h3>
            <p className="tos-content-text">
              You agree to protect all Confidential Information using a standard
              of care that is at least as strong as the protection you give to
              your own confidential materials. You may not disclose Confidential
              Information to any third party without Cyberlooper's prior written
              consent.
            </p>

            <h3 className="tos-subsection-title">6.3 Exclusions</h3>
            <p className="tos-content-text">
              Information that is or becomes publicly available (through no
              fault of your own) will not be considered Confidential
              Information.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 7 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">
            7. Fees and Payment (If Applicable)
          </h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">7.1 Billing</h3>
            <p className="tos-content-text">
              Some aspects of our Services may be offered on a paid basis. Fees
              and payment terms will be presented to you in a separate agreement
              or on our website.
            </p>

            <h3 className="tos-subsection-title">7.2 Late Payments</h3>
            <p className="tos-content-text">
              If you fail to make a payment by the due date, Cyberlooper may
              charge interest on the overdue amount and/or suspend your access
              to the paid features of the Services until all outstanding amounts
              are settled.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 8 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">
            8. Third-Party Links and Services
          </h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">8.1 External Services</h3>
            <p className="tos-content-text">
              Our Services may include links to or integrations with third-party
              services. Cyberlooper does not endorse or control such third-party
              services.
            </p>

            <h3 className="tos-subsection-title">8.2 Your Responsibility</h3>
            <p className="tos-content-text">
              If you choose to use any third-party services, you do so at your
              own risk and will be subject to the separate terms and conditions
              of those third parties.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 9 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">9. Warranty Disclaimer</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">9.1 As Is</h3>
            <p className="tos-content-text">
              Except as expressly provided herein, the Services are provided "as
              is" and "as available," without any warranties of any kind, either
              express or implied.
            </p>

            <h3 className="tos-subsection-title">9.2 No Guarantees</h3>
            <p className="tos-content-text">
              Cyberlooper does not guarantee that the Services will meet your
              requirements, be uninterrupted, or be error-free. We disclaim all
              implied warranties to the maximum extent allowed by law.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 10 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">10. Limitation of Liability</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">10.1 Indirect Damages</h3>
            <p className="tos-content-text">
              Cyberlooper shall not be liable for any indirect, incidental,
              punitive, or consequential damages (including loss of profits or
              data) arising out of or related to your use of or inability to use
              the Services.
            </p>

            <h3 className="tos-subsection-title">10.2 Maximum Liability</h3>
            <p className="tos-content-text">
              In no event shall Cyberlooper's total liability exceed the amount
              you have paid to us for the Services in the six (6) months
              preceding the event giving rise to a claim.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 11 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">11. Indemnification</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">11.1 Defense and Indemnity</h3>
            <p className="tos-content-text">
              You agree to defend, indemnify, and hold harmless Cyberlooper, its
              affiliates, and their respective employees, officers, directors,
              and agents from any claims, damages, and expenses (including
              reasonable attorneys' fees) arising from your breach of these
              Terms or your misuse of the Services.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 12 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">12. Termination and Suspension</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">12.1 Termination by You</h3>
            <p className="tos-content-text">
              You may stop using the Services at any time. If you have an
              account, you can request to deactivate it.
            </p>

            <h3 className="tos-subsection-title">
              12.2 Termination by Cyberlooper
            </h3>
            <p className="tos-content-text">
              Cyberlooper reserves the right to terminate or suspend your
              account or access to the Services at any time, with or without
              notice, for any reason, including violation of these Terms.
            </p>

            <h3 className="tos-subsection-title">
              12.3 Effects of Termination
            </h3>
            <p className="tos-content-text">
              Upon termination, all licenses granted to you under these Terms
              immediately cease. Sections related to fees, indemnification,
              confidentiality, and limitation of liability shall survive any
              termination.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 13 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">
            13. Governing Law and Dispute Resolution
          </h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">13.1 Governing Law</h3>
            <p className="tos-content-text">
              These Terms will be governed by the laws of the State of Texas,
              without regard to its conflicts of law principles.
            </p>

            <h3 className="tos-subsection-title">13.2 Arbitration</h3>
            <p className="tos-content-text">
              Any dispute arising under or relating to these Terms shall be
              resolved by binding arbitration conducted in San Antonio, Texas,
              under the rules of the American Arbitration Association. Each
              party is responsible for its own legal fees unless otherwise
              determined by the arbitrator.
            </p>

            <h3 className="tos-subsection-title">13.3 Injunctive Relief</h3>
            <p className="tos-content-text">
              Notwithstanding the arbitration clause, either party may seek
              injunctive or equitable relief in any court of competent
              jurisdiction to prevent irreparable harm.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 14 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">14. Changes to These Terms</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">14.1 Updates</h3>
            <p className="tos-content-text">
              We may update these Terms from time to time. The most current
              version will be posted on our website. By continuing to use the
              Services after changes take effect, you agree to the revised
              Terms.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 15 */}
        <div className="tos-section-container">
          <h2 className="tos-section-title">15. General Provisions</h2>
          <div className="tos-content-wrapper">
            <h3 className="tos-subsection-title">15.1 Entire Agreement</h3>
            <p className="tos-content-text">
              These Terms, along with any additional written agreements or
              policies referenced herein, represent the complete agreement
              between you and Cyberlooper concerning the Services.
            </p>

            <h3 className="tos-subsection-title">15.2 Severability</h3>
            <p className="tos-content-text">
              If any provision of these Terms is found to be invalid or
              unenforceable, that part will be limited or eliminated to the
              minimum extent necessary, and the remainder will stay in full
              force and effect.
            </p>

            <h3 className="tos-subsection-title">15.3 Waiver</h3>
            <p className="tos-content-text">
              No waiver of any breach or default shall be deemed a waiver of any
              preceding or subsequent breach or default.
            </p>

            <h3 className="tos-subsection-title">15.4 Assignment</h3>
            <p className="tos-content-text">
              You may not assign any rights or delegate any obligations under
              these Terms without our prior written consent.
            </p>
          </div>
        </div>

        <div className="tos-divider"></div>

        {/* Section 16 - Contact Information */}
        <div className="tos-contact-section">
          <h2 className="tos-section-title">16. Contact Information</h2>
          <div className="tos-contact-content">
            <p className="tos-contact-text">
              If you have any questions about these Terms or need further
              information, feel free to contact us:
            </p>
            <div className="tos-contact-info">
              <p>Cyberlooper</p>
              <p>San Antonio, Texas</p>
              <p>contact@cyberlooper.com</p>
            </div>
            <p className="tos-final-statement">
              By using Cyberlooper's Services on or after March 7, 2025, you
              confirm that you have read, understood, and agree to these Terms
              of Service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
