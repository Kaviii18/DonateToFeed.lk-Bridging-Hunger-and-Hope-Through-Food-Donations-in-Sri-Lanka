import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <section className="about-container">
      <div className="circle-left"></div>
      <div className="circle-right"></div>

      <div className="about-content">
        <h2 className="about-title">About Us</h2>
        <p className="about-paragraph">
          <strong>Donate To Feed</strong> is a purpose-driven initiative committed to reducing food waste and alleviating
          hunger across Sri Lanka. Our platform serves as a bridge between individuals, businesses, and organizations
          with surplus edible food, and those in need such as low-income families, shelters, and community kitchens.
        </p>
        <p className="about-paragraph">
          By leveraging technology, we aim to create an efficient, transparent, and safe food-sharing network that empowers
          communities to support one another. At the heart of our mission is a simple belief: <strong>no food should go
          to waste while people go hungry</strong>.
        </p>

        <div className="about-stats">
          <div className="stat-box">
            <div className="stat-number">3000+</div>
            <div className="stat-label">Donations</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">1500+</div>
            <div className="stat-label">Feeds</div>
          </div>
        </div>
      </div>
    </section>
  );
}
