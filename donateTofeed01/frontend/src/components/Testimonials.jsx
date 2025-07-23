import React, { useState } from "react";


const testimonialData = [
  {
    name: "S. De Silva",
    role: "Social Worker",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Thanks to this platform, we reach more hungry families than ever. Simple, fast, and truly impactful!",
  },
  {
    name: "C. Fernando",
    role: "NGO Administrator",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Donating excess food is now easier than ever. This system has changed how we help our community!",
  },
  {
    name: "R. Jayasuriya",
    role: "Volunteer",
    img: "https://randomuser.me/api/portraits/men/64.jpg",
    text: "An amazing initiative! The user interface is clean and donations are now effortless.",
  },
  {
    name: "M. Perera",
    role: "Charity Coordinator",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "This app connects us to real people who need support. Highly recommend it to all NGOs.",
  },
  {
    name: "K. Bandara",
    role: "Community Leader",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
    text: "It’s never been easier to organize food donations. The dashboard and tracking are top notch.",
  },
];

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const showNext = () => {
    if (startIndex + 3 < testimonialData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const showPrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleTestimonials = testimonialData.slice(startIndex, startIndex + 3);

  return (
    <section className="testimonials">
      <h2>What People Say</h2>

      <div className="testimonial-list">
        {visibleTestimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            <div className="testimonial-header">
              <img src={t.img} alt={t.name} />
              <div>
                <b>{t.name}</b>
                <div className="stars">★★★★★</div>
                <span>{t.role}</span>
              </div>
            </div>
            <p>{t.text}</p>
          </div>
        ))}
      </div>

      <div className="testimonial-nav">
        <button onClick={showPrev} disabled={startIndex === 0}>← Prev</button>
        <button onClick={showNext} disabled={startIndex + 3 >= testimonialData.length}>Next →</button>
      </div>
    </section>
  );
}
