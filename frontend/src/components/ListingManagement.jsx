import React, { useEffect, useState } from "react";
import "./ListingManagement.css";
import { useNavigate } from "react-router-dom";

export default function ListingManagement() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    img: "",
    location: "",
    category: "",
    amount: "",
    expiry: "",
    note: "",
  });

  // Fetch listings
  useEffect(() => {
    fetch("http://localhost:5000/api/available-donations")
      .then((res) => res.json())
      .then((data) => setListings(data));
  }, []);

  const handleEdit = (listing) => {
    setEditingId(listing._id);
    setForm({ ...listing });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    const res = await fetch(`http://localhost:5000/api/available-donations/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setListings(listings.filter((item) => item._id !== id));
    }
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/available-donations/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setListings(listings.map((item) => (item._id === updated._id ? updated : item)));
      setEditingId(null);
    }
  };

  const handleApprove = async (id) => {
    const res = await fetch(`http://localhost:5000/api/available-donations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    if (res.ok) {
      const updated = await res.json();
      setListings(listings.map((item) => (item._id === updated._id ? updated : item)));
    }
  };

  return (
    <div className="listing-management">
      <div className="top-nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/UserManagement")}>User Management</button>
        <button className="active" onClick={() => navigate("/ListingManagement")}>Listing Management</button>
        <button onClick={() => navigate("/FeedbackManagement")}>Feedback</button>
      </div>

      <h2>Manage Listings</h2>
      <table className="listing-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Location</th>
            <th>Amount</th>
            <th>Expiry</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.img} alt="donation" className="listing-img" />
              </td>
              {editingId === item._id ? (
                <>
                  <td><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></td>
                  <td><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></td>
                  <td><input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></td>
                  <td><input value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} /></td>
                  <td><input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></td>
                  <td>
                    <button onClick={handleUpdate} className="btn save">Save</button>
                    <button onClick={() => setEditingId(null)} className="btn cancel">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.category}</td>
                  <td>{item.location}</td>
                  <td>{item.amount}</td>
                  <td>{item.expiry}</td>
                  <td>{item.note}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} className="btn edit">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="btn delete">Delete</button>
                    {item.approved ? (
                      <span className="status approved">Approved</span>
                    ) : (
                      <button onClick={() => handleApprove(item._id)} className="btn approve">Approve</button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}