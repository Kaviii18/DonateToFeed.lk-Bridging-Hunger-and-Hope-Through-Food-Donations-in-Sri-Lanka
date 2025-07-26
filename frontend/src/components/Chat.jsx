import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import { io } from "socket.io-client";
import assistantImg from "../assets/assistant.png";
import "./Chat.css";
import userAvatar from "../assets/useravatar.png"; // ✅ make sure this path is correct

const socket = io("http://localhost:5000");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [clearing, setClearing] = useState(false);
  const chatBodyRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const user = userData?.name || "Guest";

  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/${encodeURIComponent(user)}`)
      .then(res => res.json())
      .then(setMessages)
      .catch(() => {
        setMessages([{
          from: "assistant",
          message: `Hello! ${user}, you’re in DonateToFeed.lk Platform, we are here to help you.`,
          createdAt: new Date()
        }]);
      });
  }, [user]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (msg.user === user || msg.from === "assistant") {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("receiveMessage");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);

    const userMessage = { user, message: input, from: "user" };
    const botReply = { user, message: "Thanks for reaching out! We'll get back to you soon.", from: "assistant" };

    await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userMessage),
    });
    await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botReply),
    });

    socket.emit("sendMessage", userMessage);
    socket.emit("sendMessage", botReply);

    setInput("");
    setSending(false);
  };

  const handleClearMessages = async () => {
    if (!window.confirm("Clear all your chat messages?")) return;
    setClearing(true);
    await fetch(`http://localhost:5000/api/chat/${encodeURIComponent(user)}`, {
      method: "DELETE",
    });
    setMessages([{
      from: "assistant",
      message: `Hello! ${user}, welcome again to DonateToFeed.lk`,
      createdAt: new Date(),
    }]);
    setClearing(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="chat-title"><b>Chat</b></span>
        <span className="chat-help">We’re here to help you</span>
        <button
          className="chat-clear-btn"
          onClick={handleClearMessages}
          title="Clear messages"
          disabled={clearing}
        >
          <FaTrash color="#f77" size={18} />
        </button>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message-row ${msg.from === "user" ? "chat-user-row" : ""}`}>
            {msg.from === "assistant" ? (
              <img src={assistantImg} alt="assistant" className="chat-avatar" />
            ) : (
              <img src={userAvatar} alt="user" className="chat-avatar" /> // ✅ show user avatar here
            )}
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ))}
        <div className="chat-watermark">DonateToFeed.lk</div>
      </div>

      <form className="chat-footer" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          placeholder="Type your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button type="submit" className="chat-send-btn" disabled={sending || !input.trim()}>
          <FaPaperPlane size={22} />
        </button>
      </form>
    </div>
  );
}
