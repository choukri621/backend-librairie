import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calcul du montant total
  const totalAmount = cartItems.reduce((acc, item) => acc + item.prix * item.quantity, 0);

  const handleCheckout = () => {
    alert('✅ Commande enregistrée avec succès ! Merci de votre achat.');
    clearCart();
    navigate('/');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1e293b', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
        🛒 Mon Panier
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '20px' }}>Votre panier est actuellement vide.</p>
          <button onClick={() => navigate('/')} style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Retourner à l'accueil
          </button>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>{item.titre}</h4>
                  <p style={{ margin: 0, color: '#2563eb', fontWeight: '600' }}>{parseFloat(item.prix).toFixed(2)} $ / unité</p>
                </div>

                {/* Gestion des quantités */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontWeight: '600', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                </div>

                {/* Prix Total pour cet article & Bouton supprimer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontWeight: '700', color: '#1e293b', minWidth: '80px', textAlign: 'right' }}>
                    {(item.prix * item.quantity).toFixed(2)} $
                  </span>
                  <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Section Résumé et Validation */}
          <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '1.2rem', color: '#64748b', marginRight: '10px' }}>Total du panier :</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '750', color: '#1e293b' }}>{totalAmount.toFixed(2)} $</span>
            </div>
            <button onClick={handleCheckout} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
              Passer la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;