import React, { useState } from "react";
import logo from  './assets/logos/logo_green.png'

export default function Sidebar({icon}) {
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
        <div class = "flex-container">
            <button className="w3-button w3-teal w3-xlarge" onClick={w3_open}>
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
    </div>
  );
}
