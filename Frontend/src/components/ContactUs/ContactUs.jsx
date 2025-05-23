import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logos/Cyberlooper_Logo on Dark Color.png";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const ContactUs = () => {
  const isLoggedIn = !!localStorage.getItem("user_token");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const sendMessage = async () => {
    // Basic Form Validations
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      alert("Please fill out all the fields.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setSendingMessage(true);

    const token = localStorage.getItem("user_token");

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/contactform`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          message: message,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert(
          "Contact form submitted! Please check your email for acknowledgement."
        );
        // Clear fields after successful submit
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Unexpected response:", response);
        alert("Failed to submit the contact form.");
      }
    } catch (error) {
      console.error("Error Submitting Contact Form:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to submit the contact form. Please try again later.";
      alert(errorMessage);
    } finally {
      setSendingMessage(false);
    }
  };

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

      <div className="faq-page">
        <div className="faq-container">
          {/* Contact Section */}
          <div className="contact-section">
            <div className="contact-header">
              <h2>Get in Touch</h2>
              <p>
                We would love to hear from you. Please fill out this form and we
                will get in touch with you shortly.
              </p>
            </div>

            <div className="contact-form">
              <div className="form-row">
                <div className="input-standard">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="input-standard">
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-standard full-width">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-multiline">
                <textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="submit-button-container">
                <button
                  className="submit-button"
                  onClick={sendMessage}
                  disabled={sendingMessage}
                >
                  {sendingMessage ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
