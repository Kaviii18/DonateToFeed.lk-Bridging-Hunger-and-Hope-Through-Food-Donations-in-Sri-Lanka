import React, { useState, useEffect } from "react";
import "./FindFood.css";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/heroimage1.jpg";
import logo from "../assets/logo.jpg";

export default function FindFood() {
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [foodCategory, setFoodCategory] = useState({
    cooked: false,
    raw: false,
    all: false,
  });
  const [availability, setAvailability] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [requestInfo, setRequestInfo] = useState({
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/donations")
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = donations;
    if (search) {
      result = result.filter(
        (d) =>
          d.description?.toLowerCase().includes(search.toLowerCase()) ||
          d.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (location) {
      result = result.filter(
        (d) =>
          d.pickup?.toLowerCase().includes(location.toLowerCase()) ||
          d.dropoff?.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (foodCategory.cooked || foodCategory.raw) {
      result = result.filter((d) => {
        if (foodCategory.cooked && d.category === "cooked") return true;
        if (foodCategory.raw && d.category === "dry") return true;
        return false;
      });
    }
    if (availability === "unavailable") {
      result = [];
    }
    if (quantity > 1) {
      result = result.filter((d) => {
        const num = parseInt(d.quantity) || 1;
        return num >= quantity;
      });
    }
    setFiltered(result);
  }, [search, location, foodCategory, availability, quantity, donations]);

  const handleRequest = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  const submitRequest = async () => {
    const { receiverName, receiverEmail, receiverPhone, message } = requestInfo;
    if (!receiverName || !receiverEmail || !receiverPhone) return;

    const res = await fetch("http://localhost:5000/api/feed-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donationId: selectedDonation._id,
        receiverName,
        receiverEmail,
        receiverPhone,
        message,
      }),
    });
    if (res.ok) {
      navigate("/request-confirmation");
    } else {
      alert("Failed to request. Please try again!");
    }
    setShowModal(false);
    setRequestInfo({ receiverName: "", receiverEmail: "", receiverPhone: "", message: "" });
  };

  return (
    <div className="findfood-bg">
      <div className="findfood-card">
        <div className="findfood-hero">
          <div className="findfood-heroimg-wrap">
            <img src={heroImg} className="findfood-heroimg" alt="Food Share" />
            <img src={logo} className="findfood-logo" alt="Logo" />
          </div>
          <div className="findfood-title">
            <span>Find Available Food</span>
            <br />
            <span className="findfood-near">Near You</span>
          </div>
        </div>

        <label className="findfood-label">Search</label>
        <div className="findfood-searchbox">
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="findfood-filtertitle">Filters:</div>
        <div className="findfood-filters">
          <div>
            <label>Location</label>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select the location</option>
              <option value="colombo">Colombo</option>
              <option value="kandy">Kandy</option>
            </select>
          </div>
          <div>
            <label>Food Category</label>
            <div className="findfood-checkboxrow">
              <label>
                <input
                  type="checkbox"
                  checked={foodCategory.cooked}
                  onChange={(e) =>
                    setFoodCategory({ ...foodCategory, cooked: e.target.checked })
                  }
                />
                Cooked Meals
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={foodCategory.raw}
                  onChange={(e) =>
                    setFoodCategory({ ...foodCategory, raw: e.target.checked })
                  }
                />
                Dry Goods
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={foodCategory.all}
                  onChange={(e) =>
                    setFoodCategory({ cooked: false, raw: false, all: e.target.checked })
                  }
                />
                All
              </label>
            </div>
          </div>
          <div>
            <label>Availability</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="">Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="findfood-quantity">
            <label>Quantity</label>
            <div className="findfood-sliderlabels">
              <span>Small</span>
              <input
                type="range"
                min={1}
                max={5}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <span>Large</span>
            </div>
          </div>
        </div>

        <div className="findfood-filterbtns">
          <button
            className="findfood-applybtn"
            onClick={(e) => e.preventDefault()}
          >
            Apply Filters
          </button>
          <button
            className="findfood-clearbtn"
            onClick={() => {
              setSearch("");
              setLocation("");
              setFoodCategory({ cooked: false, raw: false, all: false });
              setAvailability("");
              setQuantity(1);
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="findfood-foodlist">
          {filtered.length === 0 && <div>No food donations found.</div>}
          {filtered.map((food, i) => (
            <div className="findfood-foodcard" key={food._id || i}>
              <img
                src={
                  food.image
                    ? `http://localhost:5000/uploads/${food.image}`
                    : heroImg
                }
                alt="food"
                className="findfood-foodthumb"
              />
              <div className="findfood-foodinfo">
                <div><b>{food.pickup}</b></div>
                <div>{food.category}</div>
                <div>{food.description}</div>
                <div>
                  Amount: {food.quantity}
                  {food.condition ? ` (${food.condition})` : ""}
                </div>
                <div>Contact: {food.name} - {food.phone}</div>
              </div>
              <button
                className="findfood-requestbtn"
                onClick={() => handleRequest(food)}
              >
                Request
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Your Info</h3>
            <input
              placeholder="Your name"
              value={requestInfo.receiverName}
              onChange={(e) =>
                setRequestInfo({ ...requestInfo, receiverName: e.target.value })
              }
            />
            <input
              placeholder="Your email"
              value={requestInfo.receiverEmail}
              onChange={(e) =>
                setRequestInfo({ ...requestInfo, receiverEmail: e.target.value })
              }
            />
            <input
              placeholder="Your phone"
              value={requestInfo.receiverPhone}
              onChange={(e) =>
                setRequestInfo({ ...requestInfo, receiverPhone: e.target.value })
              }
            />
            <textarea
              placeholder="Message (optional)"
              rows={3}
              value={requestInfo.message}
              onChange={(e) =>
                setRequestInfo({ ...requestInfo, message: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={submitRequest}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
