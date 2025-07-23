import React from "react";
import { FaUtensils, FaSearchLocation, FaExchangeAlt } from "react-icons/fa";

export default function Features() {
  return (
    <section className="features">
      <h2>Our Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <FaUtensils size={36} color="#ff9100" />
          <span>List Available Food</span>
        </div>
        <div className="feature-item">
          <FaSearchLocation size={36} color="#00c853" />
          <span>Find Nearby Food</span>
        </div>
        <div className="feature-item">
          <FaExchangeAlt size={36} color="#ff9100" />
          <span>Direct Messaging</span>
        </div>
      </div>
    </section>
  );
}
