import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  FaBell,
  FaFileAlt,
  FaHistory,
  FaCog,
  FaInfoCircle,
} from "react-icons/fa";
import profilePic from "../assets/prf-pic.jpeg";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/fix-leaflet-icon"; // Fixes missing default icon

export default function Dashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser")) || {
    name: "Admin",
    email: "admin@demo.com",
  };

  const [userStats, setUserStats] = useState({
    total: 0,
    donors: 0,
    receivers: 0,
    admins: 0,
  });

  const [donationStats, setDonationStats] = useState({
    total: 0,
    feeds: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((users) => {
        const stats = {
          total: users.length,
          donors: users.filter((u) => u.role === "Doner").length,
          receivers: users.filter((u) => u.role === "Receiver").length,
          admins: users.filter((u) => u.role === "Admin").length,
        };
        setUserStats(stats);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/available-donations")
      .then((res) => res.json())
      .then((donations) => {
        const total = donations.length;
        const feeds = donations.filter((d) => d.isFed === true).length;
        setDonationStats({ total, feeds });
      })
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="sidebar-icons">
          <FaBell title="Notifications" />
          <FaFileAlt title="Files" />
          <FaHistory title="History" />
        </div>
        <div className="sidebar-bottom">
          <FaCog title="Settings" />
          <FaInfoCircle title="Help" />
        </div>
      </aside>

      <main className="dashboard-main">
        {/* Navigation */}
        <div className="top-nav">
          <button className="active" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/UserManagement")}>User Management</button>
          <button onClick={() => navigate("/ListingManagement")}>Listing Management</button>
          <button onClick={() => navigate("/FeedbackManagement")}>Feedback</button>
        </div>

        {/* Profile Info */}
        <div className="profile-area">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="profile-info">
            <img src={profilePic} alt={admin.name} className="profile-pic" />
            <span className="profile-name">{admin.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Welcome */}
        <section className="welcome-section">
          <h1>Hello! <span>{admin.name}</span></h1>
          <div className="status-bar">
            <span className="status complete">Completed 70%</span>
            <span className="status ongoing">On Going 20%</span>
            <span className="status scheduled">Scheduled 10%</span>
          </div>
        </section>

        {/* Grid Section */}
        <section className="dashboard-grid">
          {/* User Count */}
          <div className="card chart-card">
            <h3>User Count</h3>
            <p><strong>Total:</strong> {userStats.total}</p>
            <p><strong>Donors:</strong> {userStats.donors}</p>
            <p><strong>Receivers:</strong> {userStats.receivers}</p>
            <p><strong>Admins:</strong> {userStats.admins}</p>
          </div>

          {/* Donations */}
          <div className="card donut-card">
            <h3>Total Donations & Feeds</h3>
            <div className="donut-charts">
              <div className="donut">
                <span className="value">{donationStats.total}</span>
                <p>Donations</p>
              </div>
              <div className="donut green">
                <span className="value">{donationStats.feeds}</span>
                <p>Feeds</p>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="card map-card">
            <h3>Distribution in Sri Lanka</h3>
            <div style={{ height: "300px", width: "100%" }}>
              <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={[6.0535, 80.221]}><Popup>Matara Drop-off</Popup></Marker>
                <Marker position={[7.2906, 80.6337]}><Popup>Kandy Delivery</Popup></Marker>
              </MapContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="card bar-chart-card">
            <h3>Donations vs Feeds</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Total", value: donationStats.total },
                  { name: "Fed", value: donationStats.feeds },
                  { name: "Pending", value: donationStats.total - donationStats.feeds },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ff9100" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Footer */}
        <section className="footer-updates">
          <p>
            <strong>Updates:</strong> 70% donations delivered.<br />
            20% ongoing. 10% scheduled.
          </p>
          <button className="refresh-btn">⟳</button>
        </section>
      </main>
    </div>
  );
}
