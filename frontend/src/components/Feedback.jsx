import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import logo from "../assets/logo.jpg";
import "./Feedback.css";

const starsArr = [1, 2, 3, 4, 5];

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 2,
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const setRating = (star) => setForm({ ...form, rating: star });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("comment", form.comment);
      fd.append("rating", form.rating);
      if (form.image) fd.append("image", form.image);

      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Feedback submitted successfully!");
        setForm({
          name: "",
          email: "",
          comment: "",
          rating: 2,
          image: null,
        });
      } else {
        setError(data.error || "Error submitting feedback.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
    setSubmitting(false);
  };

  return (
    <div className="feedback-bg">
      <form className="feedback-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="feedback-side">
          <img src={logo} alt="Logo" className="feedback-logo" />
          <div className="feedback-label-vertical">FEEDBACK</div>
        </div>
        <div className="feedback-main">
          {success && <div className="feedback-success">{success}</div>}
          {error && <div className="feedback-error">{error}</div>}

          <div className="feedback-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              disabled={submitting}
            />
          </div>
          <div className="feedback-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={submitting}
            />
          </div>
          <div className="feedback-row">
            <label>Comment</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Comment here"
              required
              rows={4}
              disabled={submitting}
            />
          </div>
          <div className="feedback-row">
            <label>Rate</label>
            <div className="feedback-stars">
              {starsArr.map((star) => (
                <span
                  key={star}
                  className={`star ${form.rating >= star ? "filled" : ""}`}
                  onClick={() => setRating(star)}
                  role="button"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="feedback-row">
            <label>Image</label>
            <div className="feedback-upload">
              <FiUpload size={22} style={{ marginRight: 7, color: "#777" }} />
              <input
                type="file"
                name="image"
                accept="image/*"
                id="feedback-file"
                onChange={handleChange}
                style={{ display: "none" }}
                disabled={submitting}
              />
              <label htmlFor="feedback-file" className="feedback-upload-label">
                {form.image ? form.image.name : "Upload image here"}
              </label>
            </div>
          </div>
          <div className="feedback-submit-row">
            <button className="feedback-submit" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
