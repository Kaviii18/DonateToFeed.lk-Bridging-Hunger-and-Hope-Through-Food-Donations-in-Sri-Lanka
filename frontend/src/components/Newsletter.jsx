import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed: " + email);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <h2>
        Subscribe to our <span>Newsletter</span>
      </h2>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email here"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}
