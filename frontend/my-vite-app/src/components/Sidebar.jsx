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
        {/* <Link to="/" className="w3-bar-item w3-button">Home</Link>
        <Link to="/datavisualizations" className="w3-bar-item w3-button">Data Visualizations</Link>
        <Link to="/about" className="w3-bar-item w3-button">About</Link>
        <Link to="/contact" className="w3-bar-item w3-button">Contact</Link> */}
    </div>
  );
}
