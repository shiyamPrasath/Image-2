import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './component/LandingPage/LandingPage';
import Home from './component/HomePage/Home';
import Update from './component/UpdatePage/Update'; // Import the new Update component
import { CartProvider } from './component/HomePage/CartContext'; // Import the CartProvider

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/update" element={<Update />} /> {/* New Update route */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
