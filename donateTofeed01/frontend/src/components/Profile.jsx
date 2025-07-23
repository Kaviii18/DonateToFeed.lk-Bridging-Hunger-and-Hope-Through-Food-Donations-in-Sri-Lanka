import React from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import coverImage from "../assets/prf.jpg";
import profileImg from "../assets/user.png";


const Profile = () => {
  const navigate = useNavigate();

  // Get logged-in user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  // If no user data, redirect to sign in
  if (!userData) {
    navigate("/signin");
    return null;
  }

  const user = {
    name: userData.name || "N/A",
    title: userData.role === "Doner" ? "Registered Donor" : "Registered Receiver",
    email: userData.email || "N/A",
    address: userData.address || "Not Provided",
    contact: userData.phone || "Not Provided",
    donations: userData.donations || 0,
    feeds: userData.feeds || 0,
    profileImg: userData.profileImg || profileImg, // fallback
    coverImg: coverImage
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    navigate("/signin");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.coverImg} alt="cover" className="cover-img" />
        <button className="signout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="profile-content">
        <img src={user.profileImg} alt="profile" className="profile-img" />
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>{user.title}</p>
          <div className="email-line">
            <span className="material-icons">email</span>
            <span className="email-text">{user.email}</span>
          </div>
        </div>
      </div>

      <div className="profile-info">
        <div className="info-row">
          <strong>Name</strong>
          <span>{user.name}</span>
        </div>
        <div className="info-row">
          <strong>Email</strong>
          <span>{user.email}</span>
        </div>
        <div className="info-row">
          <strong>Address</strong>
          <span>{user.address}</span>
        </div>
        <div className="info-row">
          <strong>Contact Number</strong>
          <span>{user.contact}</span>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card peach">
          <p>Total no of<br />Donations</p>
          <h1>{user.donations}</h1>
        </div>
        <div className="stat-card mint">
          <p>Total no of<br />Feeds</p>
          <h1>{user.feeds}</h1>
        </div>
      </div>

      <div className="profile-footer">
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default Profile;
