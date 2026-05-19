import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Simulation d'inscription réussie à la maison
    setMessage('✅ Inscription réussie (Mode Local) ! Redirection...');
    
    // On sauvegarde un faux utilisateur dans le navigateur pour simuler la connexion
    localStorage.setItem('user', JSON.stringify({ username, email }));
    
    // Redirection vers la page de connexion après 2 secondes
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', padding: '20px' }}>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#1e293b' }}>Créer un compte</h2>
        
        {message && <p style={{ textAlign: 'center', fontWeight: '500', marginBottom: '15px', color: '#16a34a' }}>{message}</p>}
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Nom d'utilisateur</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Adresse courriel</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <button type="submit" style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginTop: '10px' }}>
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;