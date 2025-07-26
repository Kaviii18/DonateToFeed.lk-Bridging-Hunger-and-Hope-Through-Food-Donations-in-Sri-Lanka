import React, { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ New success state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSuccess(false); // Reset success message when user starts typing again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSuccess(true); // ✅ Show success message
      }
    } catch (err) {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h2>Contact Us</h2>
        <p className="contact-description">
          Have questions or suggestions? We'd love to hear from you.
        </p>

        <div className="contact-info-grid">
          <div className="contact-info-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Our Location</h3>
            <p>123 Donation Street, Colombo</p>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-phone"></i>
            <h3>Phone Number</h3>
            <p>+94 11 234 5678</p>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email Address</h3>
            <p>info@donatetofeed.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* ✅ Success message */}
        {success && (
          <p style={{ color: "green", marginTop: "15px", fontWeight: "bold" }}>
            ✅ Message sent successfully!
          </p>
        )}
      </div>
    </div>
  );
}
