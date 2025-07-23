import React, { useState, useEffect } from "react";
import { FaHeart, FaComments, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.jpg"; // ✅ Import your logo image

export default function Header() {
  const [user, setUser] = useState(null);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setShowLogoutMessage(true);

    setTimeout(() => {
      setShowLogoutMessage(false);
      navigate("/signin");
    }, 2000);
  };

  return (
    <header className="header">
      <div className="logo">
        {/* ✅ Display Logo Image */}
        <img src={logoImage} alt="Donate To Feed" />

        <span className="brand-text">Donate To Feed</span>
      </div>

      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/AboutUs" className="nav-link">About Us</Link>
        <Link to="/available-donations" className="nav-link">Available Donations</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        <Link to="/feedback" className="nav-link">Feedback</Link>

        <Link to="/chat">
          <button className="chat-btn">
            <FaComments size={18} style={{ marginRight: 6, verticalAlign: "middle" }} />
            Chat
          </button>
        </Link>

        <Link to="/admin" className="nav-link">Admin</Link>

        {user ? (
          <>
            <Link to="/profile" className="profile-link">
              <FaUserCircle size={24} style={{ verticalAlign: "middle", marginRight: 5 }} />
              {user.name || "Profile"}
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            {showLogoutMessage && (
              <div className="logout-message">
                You have been successfully logged out!
              </div>
            )}
            <Link to="/signin">
              <button className="signin">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="signup">Sign Up</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
