import React from "react";
import { FaUserPlus, FaSearch, FaComments, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2>How it Works</h2>
      <div className="steps">
        <div className="step">
          <FaUserPlus size={32} color="#ff9100" />
          <p>Step 1<br />Create Account</p>
        </div>
        <div className="step">
          <FaSearch size={32} color="#00c853" />
          <p>Step 2<br />List or Search Food</p>
        </div>
        <div className="step">
          <FaComments size={32} color="#ff9100" />
          <p>Step 3<br />Connect & Communicate</p>
        </div>
        <div className="step">
          <FaCheckCircle size={32} color="#00c853" />
          <p>Step 4<br />Complete Donation</p>
        </div>
      </div>
    </section>
  );
}
