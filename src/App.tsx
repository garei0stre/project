import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Plumber Components
import PlumberLayout from './components/PlumberLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Emergency from './pages/Emergency';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlumberLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="urgence" element={<Emergency />} />
          <Route path="realisations" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}
