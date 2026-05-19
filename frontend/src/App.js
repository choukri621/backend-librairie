import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/admin'; // Changement de Admin en admin
import { CartProvider } from './context/CartContext'; 
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          
          <Navbar />
          
          <main style={{ flex: '1 0 auto', minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} /> {/* Route admin ajoutée */}
            </Routes>
          </main>
          
          <footer style={{ backgroundColor: '#f1f5f9', color: '#64748b', textAlign: 'center', padding: '20px 0', fontSize: '0.9rem', borderTop: '1px solid #e2e8f0' }}>
            © 2026 - Librairie en ligne - Projet Institut Grasset
          </footer>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;