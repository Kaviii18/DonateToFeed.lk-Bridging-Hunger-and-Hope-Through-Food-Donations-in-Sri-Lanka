import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; // <-- Use your actual logo path
import { FiArrowLeftCircle } from "react-icons/fi";
import "./DonationConfirmation.css";

export default function DonationConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="confirmation-bg">
      <div className="confirmation-box">
        <div className="confirmation-content">
          <h1 className="confirmation-title">Thank You for Your Donation!</h1>
          <p className="confirmation-msg">
            We have successfully received your food<br />donation request.
          </p>
          <div className="confirmation-btn-row">
            <button
              className="confirmation-btn orange"
              onClick={() => navigate("/donations")}
            >
              View Donation
            </button>
            <button
              className="confirmation-btn"
              onClick={() => navigate("/donate")}
            >
              Donate
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
