import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo_white from '../assets/icons-white/logo-white.png';
import logo_black from '../assets/icons-black/logo-black.png';
import theme_white from '../assets/icons-white/lightbulb-off.png'
import theme_black from '../assets/icons-black/lightbulb-on.png'

export default function TopBar() {
  const [theme, setTheme] = useState('light');

  // Initialize theme on component mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    setTheme(saved);
  }, []);

  // Toggle theme and update DOM + localStorage
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  // Swap logos based on theme
  const logo = theme === 'dark' ? logo_white : logo_black;
  const themeIcon = theme == 'dark' ? theme_white: theme_black;

  return (
    <div className="flex-topbar">
      <img src={logo} style={{ width: '40px', marginLeft: '20px' }} />

      <div className="flex-topbar-2 link-headers">
        <span className="name-header">Tennis Time</span>
        <Link to="/" style={{ fontSize: '16px', marginLeft: '10%' }}>Home</Link>
        <Link to="/map" style={{ fontSize: '16px', marginLeft: '20px' }}>Map</Link>
        <Link to="/about" style={{ fontSize: '16px', marginLeft: '20px' }}>About</Link>
      </div>

      <button class = "theme-button">
        <img src={themeIcon} style = {{width: "30px"}} onClick={toggleTheme} />
      </button>
    </div>
  );
}
