import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Use your actual logo path
import { FiArrowLeftCircle } from "react-icons/fi";
import "./FeedRequestConfirmation.css"; // See CSS below

export default function FeedRequestConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-bg">
      <div className="confirmation-box">
        <div className="confirmation-content">
          <h1 className="confirmation-title green">Thank You for Your Request!</h1>
          <p className="confirmation-msg">
            We review and get back to you soon
          </p>
          <p className="confirmation-success">Request Submitted Successfully.</p>
          <div className="confirmation-btn-row">
            <button
              className="confirmation-btn green"
              onClick={() => navigate("/requests")}
            >
              View Request
            </button>
            <button
              className="confirmation-btn teal"
              onClick={() => navigate("/feed")}
            >
              Browse More Food
            </button>
          </div>
          <div className="confirmation-bottom-row">
            <img src={logo} alt="logo" className="confirmation-logo" />
            <div
              className="confirmation-back"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <FiArrowLeftCircle size={24} style={{ verticalAlign: "middle" }} />
              <span>Back to home</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
