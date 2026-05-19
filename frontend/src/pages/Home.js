import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [livres, setLivres] = useState([]);
  const { addToCart } = useContext(CartContext);

  const imagesGaranties = [
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80",
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80",
    "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=500&q=80",
    "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=500&q=80",
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&q=80"
  ];

  useEffect(() => {
    axios.get('http://localhost:3000/api/ouvrages')
      .then(res => setLivres(res.data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  // Fonction pour supprimer
  const supprimerLivre = async (id) => {
    if (window.confirm("Supprimer cet ouvrage ?")) {
      await fetch(`http://localhost:3000/api/ouvrages/${id}`, { method: 'DELETE' });
      window.location.reload();
    }
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', margin: '40px 0' }}>Découvrez nos Livres Gourmands</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {livres.map((livre, index) => (
          <div key={livre.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', width: '260px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
            
            <img src={imagesGaranties[index % imagesGaranties.length]} alt={livre.titre} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            
            <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>
              <Link to={`/ouvrages/${livre.id}`} style={{ textDecoration: 'none', color: '#1e293b' }}>{livre.titre}</Link>
            </h3>
            
            <p style={{ color: '#64748b' }}>De {livre.auteur}</p>
            <p style={{ color: '#2563eb', fontWeight: 'bold' }}>{parseFloat(livre.prix).toFixed(2)} $</p>
            
            <button onClick={() => addToCart(livre)} style={{ width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '5px' }}>
              Ajouter au panier
            </button>
            
            <button onClick={() => supprimerLivre(livre.id)} style={{ width: '100%', padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;