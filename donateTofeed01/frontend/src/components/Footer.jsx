import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contact">
        <p>Email: donatefeed@gmail.com</p>
        <p>Address: 125, Kandy Road, Colombo</p>
        <p>Phone: 0112233445</p>
        <p>Hours: 8:30 am - 4:30 pm</p>
      </div>
      <div className="footer-social">
        <span>Follow Us On</span>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="mailto:donatefeed@gmail.com"><FaEnvelope /></a>
      </div>
      <div className="footer-bottom">
        <p>© 2025. Donate to Feed. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
