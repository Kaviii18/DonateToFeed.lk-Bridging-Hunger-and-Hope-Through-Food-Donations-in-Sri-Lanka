import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import { useNavigate } from "react-router-dom";

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", address: "", contact: "", role: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setForm({ ...user });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", address: "", contact: "", role: "" });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${editingUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers(users.map((u) => (u._id === editingUser ? updated : u)));
      handleCancel();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== id));
      }
    }
  };

  return (
    <div className="user-management">
      {/* ✅ Top Navigation Buttons (copied from Dashboard) */}
      <div className="top-nav">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button className="active" onClick={() => navigate("/UserManagement")}>User Management</button>
        <button onClick={() => navigate("/ListingManagement")}>Listing Management</button>
        <button onClick={() => navigate("/FeedbackManagement")}>Feedback</button>
      </div>

      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingUser === user._id ? (
              <tr key={user._id}>
                <td><input name="name" value={form.name} onChange={handleChange} /></td>
                <td><input name="email" value={form.email} onChange={handleChange} /></td>
                <td><input name="contact" value={form.contact} onChange={handleChange} /></td>
                <td><input name="address" value={form.address} onChange={handleChange} /></td>
                <td>
                  <select name="role" value={form.role} onChange={handleChange}>
                    <option value="Doner">Doner</option>
                    <option value="Receiver">Receiver</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button className="save-btn" onClick={handleUpdate}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
