import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Sidebar({icon}) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonIcon, setButtonIcon] = useState("fas fa-bars");

   function toggleOpen() {
    setIsOpen(prev => !prev);
    setButtonIcon(prevIcon => prevIcon === "fas fa-bars" ? "fas fa-times" : "fas fa-bars");
  }

  return (
    <div>
      <div className="w3-teal w-full">
        <div className = "flex-container">
            <button className="custom-button" onClick={toggleOpen}>
             <i className={buttonIcon}></i>
            </button>

            <div style = {{textAlign: "right"}}>
                <img src = {icon} 
                    style={{ width: '300px'}}/>   
            </div>
        </div>
      </div>

      <div
        className="w3-sidebar w3-bar-block w3-border-right w3-white"
        style={{ display: isOpen ? "block" : "none", zIndex: 1 }}
        id="mySidebar"
      >
        <Link to="/" className="w3-bar-item w3-button">Home</Link>
        <Link to="/datavisualizations" className="w3-bar-item w3-button">Data Visualizations</Link>
        <Link to="/about" className="w3-bar-item w3-button">About</Link>
        <Link to="/contact" className="w3-bar-item w3-button">Contact</Link>
      </div>
    </div>
  );
}
