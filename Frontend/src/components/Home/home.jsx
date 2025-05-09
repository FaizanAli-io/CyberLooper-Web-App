import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import { logoutUser } from "../firebase/firebase.js";
import quote_up from "../../assets/images/quote-up.png";
import up_right from "../../assets/images/up_right.png";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user_token");

  return (

    <div className="home-wrapper">
      {/* === Hero Section === */}
      
      <div className="home-hero-section">
         <div className="home-logo-container">
                  <img src={logo} alt="Cyberlooper Logo" className="home-logo" />
                </div>
                {isLoggedIn ? (
                  <p className="home-login-btn">
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
        <div className="home-content">
          <h2 className="elevate-heading">Elevate Your Workday!</h2>
          <div className="ai-banner">
            <span className="ai-support">AI Support</span>
            <span className="like-text">That Feels Like</span>
          </div>
          <p className="sub-heading">Having a Personal Technology Assistant</p>
          <div className="quote-section">
            <div className="quote-icon">
              <img src={quote_up} alt="quote icon" />
            </div>
            <p className="quote-text">
              Experience faster decision-making, effortless collaboration, and unwavering data privacy—
              all powered by an AI built for the modern workplace.
            </p>
          </div>
          <button className="join-button">
            <span>Join for Free</span>
            <img src={up_right} alt="arrow" className="arrow-icon" />
          </button>
        </div>
              {/* === Scroll Down Prompt === */}
      <div className="home-scroll-down">
        <span className="scroll-text">Scroll down</span>
        <div className="scroll-circle">
          <div className="scroll-arrow"></div>
        </div>
      </div>
      </div>



      {/* === Features Section === */}
      <div className="home-feature-section">
        <div className="feature-highlights-container">
          <div className="highlight-block">
            <h3>Boost Productivity:</h3>
            <p>
              Tackle complex tasks in seconds—draft reports, generate insights,
              and brainstorm ideas without the wait.
            </p>
          </div>
          <div className="highlight-block">
            <h3>Enterprise-Grade Security:</h3>
            <p>
              Confidential by design, ensuring your data remains private and
              compliant with corporate standards.
            </p>
          </div>
          <div className="highlight-block">
            <h3>Adaptive and Intelligent:</h3>
            <p>
              Tailored to your industry, delivering precise, context-aware
              responses for daily work challenges.
            </p>
          </div>
        </div>
      </div>

      {/* === Why Choose Us Section === */}
      <div className="why-choose-section">
        <div className="section-header">
          <h2 className="why-choose-title">Why Choose Us</h2>
          <button className="join-free-button">
            <span>Join for Free</span>
            <img src={up_right} alt="arrow" className="arrow-icon" />
          </button>
        </div>

        {/* Value Proposition Section */}
        <div className="value-prop-section">
          {/* First Row */}
          <div className="value-prop-row">
            <div className="value-prop-block">
              <div className="prop-icon">
                <img src="/zap-icon.svg" alt="Lightning fast" className="icon-svg" />
              </div>
              <p className="prop-text">
                Lightning-Fast Answers: Get near-instant responses tailored to your specific work tasks.
              </p>
            </div>

            <div className="value-prop-block">
              <div className="prop-icon">
                <img src="/bar-chart-icon.svg" alt="Data visualization" className="icon-svg" />
              </div>
              <p className="prop-text">
                Excel, Power BI, and Tableau: Instantly know the right formula or data visualization trick.
              </p>
            </div>

            <div className="value-prop-block">
              <div className="prop-icon">
                <img src="/edit-icon.svg" alt="Brainstorming" className="icon-svg" />
              </div>
              <p className="prop-text">
                Brainstorm Better: Spark ideas, share best practices, and transform how work gets done.
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="value-prop-row">
            <div className="value-prop-block">
              <div className="prop-icon">
                <img src="/info-circle-icon.svg" alt="Natural language" className="icon-svg" />
              </div>
              <p className="prop-text">
                Natural Language Processing: Talk to me like a real colleague.
              </p>
            </div>

            <div className="value-prop-block">
              <div className="prop-icon">
                <img src="/lock-icon.svg" alt="Data privacy" className="icon-svg" />
              </div>
              <p className="prop-text">
                Data Privacy: Your data stays private—always.
              </p>
            </div>

            <div className="value-prop-block">
              <div className="prop-icon">
                <img src="/tools-icon.svg" alt="Streamlined workflow" className="icon-svg" />
              </div>
              <p className="prop-text">
                Streamlined Workflow: No complex setup, just jump right in.
              </p>
            </div>
          </div>


        </div>
      </div>

      {/* === Testimonials Section === */}
      <div className="testimonials-section">
        <h2 className="testimonials-heading">What Our Users Say</h2>

        <div className="testimonials-container">
          {/* Testimonial Card 1 */}
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">
                I used to memorize dozens of financial formulas for portfolio analysis. Now I just ask for the calculation I need, and the AI instantly delivers the perfect ratio or equation.
              </p>
              <div className="testimonial-divider"></div>
              <div className="testimonial-meta">
                <div className="testimonial-image">
                  <img src="/test-1.png" alt="User" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">John D. Alexon</h3>
                  <p className="testimonial-position">Software Engineer</p>
                </div>
                <div className="testimonial-quote">
                  <img src="/quote.png" alt="Quote" />
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="testimonial-card card-variant">
            <div className="testimonial-content">
              <p className="testimonial-text">
                Delivering excellence in brand design, web development, and social media marketing to empower your business.
              </p>
              <div className="testimonial-divider dark-divider"></div>
              <div className="testimonial-meta">
                <div className="testimonial-image">
                  <img src="/test-1.png" alt="User" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">John D. Alexon</h3>
                  <p className="testimonial-position">Financial Analyst</p>
                </div>
                <div className="testimonial-quote">
                  <img src="/quote.png" alt="Quote" />
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          {/* Testimonial Card 3 */}
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">
                It feels like I hired an extra team member who's a pro at everything from Excel macros to research proposals. I can't imagine working without it now.
              </p>
              <div className="testimonial-divider light-divider"></div>
              <div className="testimonial-meta">
                <div className="testimonial-image">
                  <img src="/test-1.png" alt="User" />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">John D. Alexon</h3>
                  <p className="testimonial-position">CEO & Founder</p>
                </div>
                <div className="testimonial-quote">
                  <img src="/quote.png" alt="Quote" />
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      </div>

      {/* === Pricing Section === */}
      <div className="pricing-background">
      <div className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-logo-container">
            <img src={logo} alt="Cyberlooper Logo" className="pricing-logo" />
          </div>

          <h2 className="pricing-heading">Pricing</h2>
          <p className="pricing-subheading">Free for now so sign up!</p>

          <button className="pricing-cta-button" onClick={() => navigate("/signup")}>
            <span className="pricing-cta-text">Try it free</span>
            <div className="pricing-arrow-icon">
              <i className="pi pi-arrow-up-right"></i>
            </div>
          </button>
        </div>
      </div>


      {/* === Join the Future of Work Section === */}
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
      {/* === Additional Sections can continue below === */}
    </div>
  );
}