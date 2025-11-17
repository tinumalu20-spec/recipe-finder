import React from "react";
import "./Footer.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h4>🍳 Food Paradise</h4>
        <p>
          Bringing the joy of cooking straight to your home — one recipe at a time.
        </p>

        {/* Contact Section */}
        <div className="footer-contact">
          <p><FaEnvelope className="icon" /> foodparadise@gmail.com</p>
          <p><FaPhoneAlt className="icon" /> +91 98765 43210</p>
          <p><FaMapMarkerAlt className="icon" /> Kochi, Kerala, India</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="/home">Home</a>
          <a href="/search">Search</a>
          {/* <a href="/recipe finder">Recipe Finder</a> */}
          <a href="/favorites">Favorites</a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Food Paradise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

