import React from "react";
import "./Footer.css"; // Import styles for the footer

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Zidio Connect. All rights reserved.</p>
    </footer>
  );
}