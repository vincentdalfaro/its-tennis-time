import React, { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const w3_open = () => {
    setIsOpen(true);
  };

  const w3_close = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Hamburger button */}
      <div className="w3-teal">
        <button className="w3-button w3-teal w3-xlarge" onClick={w3_open}>
          ☰
        </button>
        <div className="w3-container">
          <h1>My Page</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="w3-sidebar w3-bar-block w3-border-right w3-white"
        style={{ display: isOpen ? "block" : "none", zIndex: 1 }}
        id="mySidebar"
      >
        <button onClick={w3_close} className="w3-bar-item w3-large">
          Close &times;
        </button>
        <a href="#" className="w3-bar-item w3-button">
          Link 1
        </a>
        <a href="#" className="w3-bar-item w3-button">
          Link 2
        </a>
        <a href="#" className="w3-bar-item w3-button">
          Link 3
        </a>
      </div>

      {/* Page content */}
      <div className="w3-container" style={{ marginLeft: isOpen ? "200px" : "0" }}>
        <p>This sidebar is hidden by default.</p>
        <p>You must click on the "hamburger" icon (top left) to open it.</p>
        <p>The sidebar will hide a part of the page content.</p>
      </div>
    </div>
  );
}
