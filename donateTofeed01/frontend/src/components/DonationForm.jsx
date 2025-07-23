import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonationForm.css";
import donationHeader from "../assets/donationHeader1.jpeg";

export default function DonationForm() {
  const [form, setForm] = useState({
    category: "",
    quantity: "",
    description: "",
    expiry: "",
    condition: "",
    image: null,
    pickup: "",
    dropoff: "",
    name: "",
    email: "",
    phone: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Simulate API call for demo purposes
    setTimeout(() => {
      setSuccess("✅ Donation submitted successfully!");
      setLoading(false);
      setTimeout(() => {
        // navigate("/confirmation");
        console.log("Would navigate to confirmation page");
      }, 1200);
    }, 2000);

    // Original API call code:
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append("image", value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("✅ Donation submitted successfully!");
        setLoading(false);
        setTimeout(() => {
          navigate("/confirmation");
        }, 1200);
      } else {
        setError(data.error || "❌ Something went wrong.");
        setLoading(false);
      }
    } catch (err) {
      setError("🚨 Server error. Try again later.");
      setLoading(false);
    }
    
  };

  const handleReset = () => {
    setForm({
      category: "",
      quantity: "",
      description: "",
      expiry: "",
      condition: "",
      image: null,
      pickup: "",
      dropoff: "",
      name: "",
      email: "",
      phone: "",
      agree: false,
    });
    setError("");
    setSuccess("");
    setShowModal(false);
  };

  const handleReview = () => {
    setShowModal(true);
  };

  return (
    <div className="donation-form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="header-image-wrapper">
          <div className="header-image-placeholder">
            <img src={donationHeader} alt="Donation Header" className="header-image" />
            <h3>Food Donation </h3>
            <p>Making a difference, one meal at a time</p>
          </div>
        </div>

        <div className="form-title-section">
          <div className="logo-placeholder">
            <span>🍽️</span>
          </div>
          <h2>Make Your Donation</h2>
        </div>

        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}

        <div className="section-title">Food Details</div>
        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange} required className="form-input">
          <option value="">Select food type</option>
          <option value="cooked">Cooked</option>
          <option value="dry">Dry Goods</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>

        <label>Quantity</label>
        <input name="quantity" value={form.quantity} onChange={handleChange} className="form-input" required placeholder="e.g., 5 servings, 2 kg, 10 pieces" />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="form-textarea" required placeholder="Describe the food items in detail..." />

        <label>Expiry Date</label>
        <input type="date" name="expiry" value={form.expiry} onChange={handleChange} className="form-input" required />

        <label>Condition</label>
        <select name="condition" value={form.condition} onChange={handleChange} required className="form-input">
          <option value="">Select condition</option>
          <option value="fresh">Fresh</option>
          <option value="good">Good</option>
          <option value="expired">Expired</option>
        </select>

        <label>Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-file-input" />

        <div className="section-title">Location Info</div>
        <label>Pick-Up Location</label>
        <input name="pickup" value={form.pickup} onChange={handleChange} className="form-input" required placeholder="Full address for pickup" />

        <label>Drop-Off Location</label>
        <input name="dropoff" value={form.dropoff} onChange={handleChange} className="form-input" required placeholder="Full address for drop-off" />

        <div className="section-title">Donor Info</div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} className="form-input" required placeholder="Your full name" />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="form-input" required placeholder="your.email@example.com" />

        <label>Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-input" required placeholder="+1 (555) 123-4567" />

        <div className="checkbox-container">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required />
          <label>I agree to the Terms & Conditions</label>
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Submitting..." : "Submit Donation"}
          </button>
          <button type="button" onClick={handleReset} className="reset-button">Reset Form</button>
          <button type="button" onClick={handleReview} className="review-button">Preview</button>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>📋 Donation Preview</h3>
            <div className="preview-grid">
              <div className="preview-item">
                <strong>Category:</strong>
                <span>{form.category || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Quantity:</strong>
                <span>{form.quantity || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Description:</strong>
                <span>{form.description || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Expiry:</strong>
                <span>{form.expiry || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Condition:</strong>
                <span>{form.condition || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Pickup:</strong>
                <span>{form.pickup || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Drop-off:</strong>
                <span>{form.dropoff || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Name:</strong>
                <span>{form.name || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Email:</strong>
                <span>{form.email || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Phone:</strong>
                <span>{form.phone || "Not specified"}</span>
              </div>
              <div className="preview-item">
                <strong>Terms Agreed:</strong>
                <span>{form.agree ? "✅ Yes" : "❌ No"}</span>
              </div>
            </div>
            <button className="modal-close-button" onClick={() => setShowModal(false)}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



