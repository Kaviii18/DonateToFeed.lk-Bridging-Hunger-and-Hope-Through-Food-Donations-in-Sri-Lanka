import React, { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn({ setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        localStorage.setItem("userData", JSON.stringify(data.user));
        if (setUser) setUser(data.user);

        setSuccess("Login successful! Redirecting...");
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="signin-bg">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>User Sign In</h2>
        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>

        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="">-- Select Role --</option>
            <option value="Doner">Doner</option>
            <option value="Receiver">Receiver</option>
          </select>
        </label>

        <button className="signin-btn" type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="signup-link">
          Don't have an account? <Link to="/signup"><b>Sign Up</b></Link>
        </div>
      </form>
    </div>
  );
}
