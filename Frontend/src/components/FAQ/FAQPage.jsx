import React, { useState } from "react";
import "./FAQPage.css";
import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";

const FAQPage = () => {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  const FAQItem = ({ id, question, answer }) => {
    const isActive = activeItem === id;
   
    return (
      <div className="faq-item">
        <div
          className="faq-question"
          onClick={() => toggleItem(id)}
        >
          <h3>{question}</h3>
          <div className="toggle-icon">
            {isActive ? (
              <svg width="39" height="39" viewBox="0 0 39 39">
                <rect x="10" y="19" width="19" height="3" fill="#FFFFFF" />
              </svg>
            ) : (
              <svg width="39" height="39" viewBox="0 0 39 39">
                <rect x="10" y="19" width="19" height="3" fill="#FFFFFF" />
                <rect x="19" y="10" width="3" height="19" fill="#FFFFFF" />
              </svg>
            )}
          </div>
        </div>
        {isActive && (
          <div className="faq-answer">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
        <div className="home-logo-container">
        <img src={logo} alt="Cyberlooper Logo" className="home-logo" />
      </div>
      <button className="home-login-btn" onClick={() => navigate("/login")}>
        Log in
      </button>
      <div className="home-try-button" onClick={() => navigate("/signup")}>
        <span className="try-text">Try it free</span>
        <i className="pi pi-arrow-up-right icon-arrow"></i>
      </div>
    <div className="faq-page">
      <div className="faq-container">
        {/* Header Section */}
        <div className="faq-header">
          <h2>Still Have Questions?</h2>
          <p>
            If you can't find what you're looking for here, feel free to reach out to our support team or consult our Knowledge Base for more detailed guides. We're here to help make your workday simpler and more efficient!
          </p>
        </div>
       
        {/* FAQ Items */}
        <div className="faq-list">
          <FAQItem
            id={1}
            question="How does Cyberlooper platform operate?"
            answer="We use advanced language models to understand your questions and provide context-relevant answers. Simply type your question in everyday language—no complex commands needed."
          />
         
          <FAQItem
            id={2}
            question="Is my company's data secure when I use this platform?"
            answer="Yes! We employ enterprise-grade security protocols to ensure all your data remains confidential and protected at all times."
          />
         
          <FAQItem
            id={3}
            question="What kinds of work tasks can I use Cyberlooper for?"
            answer="Cyberlooper can assist with data analysis, content creation, research, customer support automation, and many other business tasks requiring information processing or generation."
          />
         
          <FAQItem
            id={4}
            question="How do I know Cyberlooper won't share confidential information?"
            answer="Our platform is designed with strict data isolation principles. Your company's information is never used to train models or shared with other users or organizations."
          />
        </div>
        
        {/* Contact Section */}
        <div className="contact-section">
          <div className="contact-header">
            <h2>Get in Touch</h2>
            <p>We would love to hear from you. Please fill out this form and we will get in touch with you shortly.</p>
          </div>
         
          <div className="contact-form">
            <div className="form-row">
              <div className="input-standard">
                <input type="text" placeholder="First name" />
              </div>
              <div className="input-standard">
                <input type="text" placeholder="Last name" />
              </div>
            </div>
           
            <div className="input-standard full-width">
              <input type="email" placeholder="Email" />
            </div>
           
            <div className="input-multiline">
              <textarea placeholder="Your message"></textarea>
            </div>
           
            <div className="submit-button-container">
              <button className="submit-button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQPage;