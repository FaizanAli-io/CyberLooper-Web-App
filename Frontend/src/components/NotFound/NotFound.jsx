import React from "react";
import "./NotFound.css";
import notFoundImage from "../../assets/images/error-404-image.png"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrapper">
      <img src={notFoundImage} alt="Not Found" className="not-found-image" />

      <h2 className="oops-heading">Oops!</h2>
      <h3 className="page-not-found-heading">Page Not Founded</h3>

      <div className="description-container">
        <p className="description-text">
          The page you are looking for does not exist. It might have been moved
          or deleted unfortunately.
        </p>
      </div>

      <div className="back-home-button" onClick={() => navigate("/")}>
        <span className="button-text">Go to Homepage</span>
      </div>
    </div>
  );
};

export default NotFound;
