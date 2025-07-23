import React, { useEffect, useState } from "react";
import "./FeedbackManagement.css";
import { useNavigate } from "react-router-dom";

export default function FeedbackManagement() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/feedback");
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await fetch(`http://localhost:5000/api/feedback/${id}`, {
        method: "DELETE",
      });
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEdit = (feedback) => {
    setEditingId(feedback._id);
    setEditData({ name: feedback.name, email: feedback.email, message: feedback.message });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/feedback/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const updated = await res.json();
      setFeedbacks(feedbacks.map((f) => (f._id === editingId ? updated : f)));
      setEditingId(null);
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  return (
    <div className="feedback-container">
      {/* ✅ Top Navigation Bar */}
      <div className="top-nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/UserManagement")}>User Management</button>
        <button onClick={() => navigate("/ListingManagement")}>Listing Management</button>
        <button className="active" onClick={() => navigate("/FeedbackManagement")}>Feedback</button>
      </div>

      <h2>Feedback Management</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) =>
              editingId === f._id ? (
                <tr key={f._id}>
                  <td>
                    <input name="name" value={editData.name} onChange={handleEditChange} />
                  </td>
                  <td>
                    <input name="email" value={editData.email} onChange={handleEditChange} />
                  </td>
                  <td>
                    <textarea name="message" value={editData.message} onChange={handleEditChange} />
                  </td>
                  <td>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={f._id}>
                  <td>{f.name}</td>
                  <td>{f.email}</td>
                  <td>{f.message}</td>
                  <td>
                    <button onClick={() => startEdit(f)}>Edit</button>
                    <button onClick={() => handleDelete(f._id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
