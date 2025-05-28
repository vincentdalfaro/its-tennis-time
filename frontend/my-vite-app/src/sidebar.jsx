import React, { useState } from "react";

export default function Sidebar({icon}) {
  const [isOpen, setIsOpen] = useState(false);

  const w3_open = () => {
    setIsOpen(true);
  };

  const w3_close = () => {
    setIsOpen(false);
  };

   function toggleOpen() {
    setIsOpen(prev => !prev); // Toggle true/false
  }

  return (
    <div>
      {/* Hamburger button */}
      <div className="w3-teal w-full">
        <div class = "flex-container">
            <button className="w3-button w3-teal w3-xlarge" onClick={toggleOpen}>
            ☰ 
            </button>
            <div style = {{textAlign: "right"}}>
                <img src = {icon} 
                    style={{ width: '300px'}}/>   
            </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="w3-sidebar w3-bar-block w3-border-right w3-white"
        style={{ display: isOpen ? "block" : "none", zIndex: 1 }}
        id="mySidebar"
      >
        <a href="#" className="w3-bar-item w3-button">
          Home
        </a>
        <a href="#" className="w3-bar-item w3-button">
          Data Visualizations
        </a>
        <a href="#" className="w3-bar-item w3-button">
          About
        </a>
        <a href="#" className="w3-bar-item w3-button">
          Contact
        </a>
      </div>
    </div>
  );
}
