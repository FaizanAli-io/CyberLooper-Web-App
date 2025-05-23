import "./MoreAbout.css";

import { useNavigate } from "react-router-dom";

import quote_up from "../../assets/images/quote-up.png";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

export default function About() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user_token");

  return (
    <>
      <div className="home-logo-container">
        <img src={logo} alt="Cyberlooper Logo" className="home-logo" />
      </div>
      {isLoggedIn ? (
        <p className="home-login-btn"></p>
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
      <div className="about-section">
        <h1 className="section-title">About Cyberlooper</h1>

        <div className="about-description-box">
          <div className="quote-icon">
            <img src={quote_up} alt="quote icon" />
          </div>
          <p className="description-text">
            Founded in San Antonio, Texas, Cyberlooper is a forward-thinking
            technology firm dedicated to empowering organizations with
            streamlined, data-driven solutions. Our team of seasoned
            professionals boasts decades of experience in corporate America,
            bringing together a wealth of knowledge in data analytics, software
            development, and process optimization.
          </p>
        </div>

        <p className="mission-statement">
          At Cyberlooper, our mission is to simplify how people tackle complex
          work challenges by providing intuitive, efficient tools.
        </p>

        <div className="signature-box">
          <h2 className="signature-name">Aurelia Voss</h2>
          <p className="signature-title">CEO</p>
        </div>
      </div>
      <div className="about-container">
        {/* Main Content */}
        <div className="about-content">
          {/* About Section */}

          {/* Empowering Section */}
          <section className="empowering-section">
            <h2 className="empowering-title">
              Empowering organizations with streamlined, data-driven solutions.
            </h2>
          </section>

          {/* Approach Section */}
          <section className="approach-section">
            <div className="approach-content">
              <h3 className="approach-title">
                Our Approach to Data and Productivity
              </h3>

              <div className="services-container">
                <div className="services-column">
                  <div className="service-item">Data Strategy Consulting</div>
                  <div className="service-item">Process Optimization</div>
                  <div className="service-item">Corporate Data Management</div>
                </div>
                <div className="services-column">
                  <div className="service-item">Software Development</div>
                  <div className="service-item">User-Centric Design</div>
                </div>
              </div>
            </div>
          </section>

          {/* Value Props Section */}
          <section className="value-props-section">
            {/* Row 1 */}
            <div className="value-row">
              <div className="value-card">
                <div className="value-icon clock-icon">
                  <div className="icon-border"></div>
                </div>
                <p className="value-text">
                  Efficiency - Save time and resources.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon tools-icon">
                  <div className="icon-border"></div>
                </div>
                <p className="value-text">
                  Productivity - Streamline routine tasks.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon share-icon">
                  <div className="icon-border"></div>
                </div>
                <p className="value-text">
                  Collaboration - Enhance team communication.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="value-row">
              <div className="value-card">
                <div className="value-icon attachment-icon">
                  <div className="icon-border"></div>
                </div>
                <p className="value-text">
                  Adaptability - Evolve with business changes.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon award-icon">
                  <div className="icon-border"></div>
                </div>
                <p className="value-text">
                  Customer Success - Measure success by client success.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon tech-icon">
                  <div className="icon-border"></div>
                </div>
                <p className="value-text">
                  Cutting-Edge Technology - Stay ahead of tech trends.
                </p>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="vision-section">
            <p className="vision-text">
              Cyberlooper began as a shared vision among data professionals in
              San Antonio. We focus on making data simpler and truly impactful.
            </p>
          </section>
          {/* Why Choose Section */}
          <section className="why-choose-about-section">
            <div className="why-choose-about-container">
              <h2 className="why-choose-about-title">
                Why Choose Cyberlooper?
              </h2>

              <div className="why-choose-about-description">
                <p>
                  From data strategy and consulting to robust software tools,
                  our broad expertise means you can rely on us as a one-stop
                  solution provider.
                </p>
              </div>
            </div>
          </section>
          {/* === Testimonials Section === */}
          <div className="testimonials-section">
            <h2 className="testimonials-heading">What Our Users Say</h2>

            <div className="testimonials-container">
              {/* Testimonial Card 1 */}
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">
                    I used to memorize dozens of financial formulas for
                    portfolio analysis. Now I just ask for the calculation I
                    need, and the AI instantly delivers the perfect ratio or
                    equation.
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
                    Delivering excellence in brand design, web development, and
                    social media marketing to empower your business.
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
                    It feels like I hired an extra team member who's a pro at
                    everything from Excel macros to research proposals. I can't
                    imagine working without it now.
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
        </div>
      </div>
    </>
  );
}
