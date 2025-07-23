import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      address: "",
      contact: "",
      password: "",
      role: "",
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data && data._id) {
        setSuccess("Registration successful! Redirecting to sign in...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
        setForm({
          name: "",
          email: "",
          address: "",
          contact: "",
          password: "",
          role: "",
        });
      } else {
        setError(data.error || "Sign up failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-bg">
      <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Sign Up</h2>
        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Num.
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            maxLength={15}
          />
        </label>

        <div className="userrole-row">
          <span>User Role</span>
          <label className="radio">
            <input
              type="radio"
              name="role"
              value="Doner"
              checked={form.role === "Doner"}
              onChange={handleChange}
              required
            />
            <span className="custom-radio"></span>
            Doner
          </label>
          <label className="radio">
            <input
              type="radio"
              name="role"
              value="Receiver"
              checked={form.role === "Receiver"}
              onChange={handleChange}
            />
            <span className="custom-radio"></span>
            Receiver
          </label>
        </div>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <div className="signup-btn-row">
          <button className="signup-btn" type="submit">
            Sign Up
          </button>
          <button
            className="reset-btn"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="signin-link">
          Already have an account? <Link to="/signin"><b>Sign In</b></Link>
        </div>
      </form>
    </div>
  );
}
