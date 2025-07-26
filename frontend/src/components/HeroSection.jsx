import React from "react";
import { useNavigate } from "react-router-dom";
import circleImage from "../assets/LF_Circular.png"; // updated image

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero custom-hero">
      <div className="hero-left">
        <h1>
          We make sharing <br /> simple and impact <br /> immense.
        </h1>
        <p>
          Donate To Feed. We aim to be the leading solution for food donation,
          fostering a more sustainable, eco-friendly and equitable food donation system.
        </p>
        <div className="hero-btns">
          <button className="btn-orange" onClick={() => navigate("/donate")}>Donate</button>
          <button className="btn-green" onClick={() => navigate("/feed")}>Feed</button>
        </div>
      </div>

      <div className="main-img-container">
  <img src={circleImage} alt="DonateToFeed Visual" className="static-hero-img" />
</div>
    </section>
  );
}
