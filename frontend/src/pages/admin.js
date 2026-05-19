import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
    // 1. Définition des états pour les champs du formulaire
    const [titre, setTitre] = useState('');
    const [auteur, setAuteur] = useState('');
    const [prix, setPrix] = useState('');

    // 2. Fonction pour envoyer les données au serveur
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/ouvrages', { 
                titre: titre, 
                auteur: auteur, 
                prix: prix 
            });
            alert("Livre ajouté avec succès !");
            // Vider le formulaire après l'ajout
            setTitre('');
            setAuteur('');
            setPrix('');
            window.location.reload(); // Pour rafraîchir la liste
        } catch (err) {
            console.error("Erreur lors de l'ajout:", err);
            alert("Erreur lors de l'ajout du livre.");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Dashboard Admin</h1>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" placeholder="Titre du livre" 
                    value={titre} onChange={(e) => setTitre(e.target.value)} required 
                />
                <input 
                    type="text" placeholder="Auteur" 
                    value={auteur} onChange={(e) => setAuteur(e.target.value)} required 
                />
                <input 
                    type="number" placeholder="Prix ($)" step="0.01"
                    value={prix} onChange={(e) => setPrix(e.target.value)} required 
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#22c55e', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Ajouter l'ouvrage
                </button>
            </form>
        </div>
    );
};

export default Admin;