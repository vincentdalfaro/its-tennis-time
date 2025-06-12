import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Map from './pages/Map.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<Map key={Date.now()} />} />
    </Routes>
  </Router>
);
