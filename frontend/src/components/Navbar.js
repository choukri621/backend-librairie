import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  
  // Somme totale de toutes les quantités d'articles dans le panier
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{ backgroundColor: '#1e293b', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 'bold' }}>
        Livres Gourmands
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Accueil</Link>
        <Link to="/panier" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>
          🛒 Panier <span style={{ backgroundColor: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', marginLeft: '4px' }}>{totalItems}</span>
        </Link>
        <Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Connexion</Link>
        <Link to="/admin" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', borderLeft: '1px solid #475569', paddingLeft: '15px' }}>Admin</Link>
        <Link to="/register" style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>S'inscrire</Link>
      </div>
    </nav>
  );
};

export default Navbar;