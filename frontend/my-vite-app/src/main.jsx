import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadScriptNext } from '@react-google-maps/api'; // Use LoadScriptNext
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Map from './pages/Map.jsx';

const MapKey = import.meta.env.VITE_MAP_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadScriptNext googleMapsApiKey={MapKey} libraries={['places']}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </LoadScriptNext>
  </StrictMode>
);
