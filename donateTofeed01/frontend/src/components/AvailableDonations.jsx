import React, { useEffect, useState } from "react";
import "./AvailableDonations.css";
import { useNavigate } from "react-router-dom";

// Check if current user is an Admin
function isAdmin() {
  return localStorage.getItem("userRole") === "Admin";
}

export default function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
      };
    }
    return { name: "", email: "", phone: "" };
  });

  const [requestedIds, setRequestedIds] = useState([]);
  const [requestMessage, setRequestMessage] = useState("");
  const navigate = useNavigate();

  // Fetch all available donations
  useEffect(() => {
    fetch("http://localhost:5000/api/available-donations")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        setLoading(false);
      });
  }, []);

  // User requests a donation
  const handleRequest = async (donationId) => {
    try {
      const res = await fetch("http://localhost:5000/api/feed-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId,
          receiverName: user.name || "Anonymous",
          receiverEmail: user.email || "anonymous@example.com",
          receiverPhone: user.phone || "N/A",
        }),
      });

      if (res.ok) {
        setRequestedIds((prev) => [...prev, donationId]);
        setRequestMessage("✅ Request submitted successfully!");
        setTimeout(() => setRequestMessage(""), 3000);
      } else {
        const data = await res.json();
        setRequestMessage(`❌ ${data.error || "Request failed."}`);
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      setRequestMessage("❌ Server error. Please try again later.");
    }
  };

  const filteredDonations = donations.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.location?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="food-donations-section">
      <h2>Available Food Donations</h2>
      {requestMessage && (
        <div className="request-message">{requestMessage}</div>
      )}

      <div className="donations-toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by location or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Add Donation Button Removed */}
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="donations-grid">
          {filteredDonations.length === 0 && (
            <div>No donations available.</div>
          )}
          {filteredDonations.map((item, idx) => (
            <div className="donation-card" key={item._id || idx}>
              <img
                className="donation-img"
                src={item.img}
                alt={item.category || "Food"}
              />
              <div className="donation-info">
                <h3>{item.category || "Food"}</h3>
                <div className="donation-detail">📍 {item.location}</div>
                {item.expiry && (
                  <div className="donation-detail">Expires: {item.expiry}</div>
                )}
                <div className="donation-detail">Quantity: {item.amount}</div>
                {item.note && (
                  <div className="donation-detail">{item.note}</div>
                )}
                <button
                  className="donation-btn"
                  onClick={() => handleRequest(item._id)}
                  disabled={requestedIds.includes(item._id)}
                >
                  {requestedIds.includes(item._id)
                    ? "Requested"
                    : "Request Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
