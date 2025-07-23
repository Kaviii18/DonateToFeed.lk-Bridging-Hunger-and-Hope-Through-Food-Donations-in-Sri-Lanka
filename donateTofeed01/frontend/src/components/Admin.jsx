import React, { useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
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
        body: JSON.stringify({ ...form, role: "Admin" }),
      });

      const data = await response.json();

      if (response.ok && data.user?.role === "Admin") {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        localStorage.setItem("userRole", "Admin");

        if (setUser) setUser(data.user);
        setSuccess("Admin login successful! Redirecting...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError(data.error || "Invalid admin credentials");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminlogin-bg">
      <form className="adminlogin-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {success && <div className="form-success">{success}</div>}
        {error && <div className="form-error">{error}</div>}

        <label>
          Email
          <input
            type="text"
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

        <button className="adminlogin-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
