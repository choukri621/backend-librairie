const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware pour autoriser la communication avec ton frontend (React)
app.use(cors());
app.use(express.json());

// Configuration de la connexion à ta base de données "librairie"
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'librairie'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('✅ Connecté avec succès à la base de données MySQL "librairie"');
});

// 1. GET : Récupérer tous les ouvrages
app.get('/api/ouvrages', (req, res) => {
    const query = "SELECT * FROM ouvrages";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });
        res.status(200).json(results);
    });
});

// 2. GET : Récupérer un ouvrage par son ID
app.get('/api/ouvrages/:id', (req, res) => {
    const query = "SELECT * FROM ouvrages WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ error: "Ouvrage non trouvé." });
        res.status(200).json(results[0]);
    });
});

// 3. POST : Ajouter un ouvrage
app.post('/api/ouvrages', (req, res) => {
    const { titre, auteur, prix } = req.body;
    const query = "INSERT INTO ouvrages (titre, auteur, prix) VALUES (?, ?, ?)";
    db.query(query, [titre, auteur, prix], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de l'ajout." });
        res.status(201).json({ message: "Livre ajouté !", id: result.insertId });
    });
});

// 4. DELETE : Supprimer un ouvrage
app.delete('/api/ouvrages/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM ouvrages WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la suppression." });
        res.status(200).json({ message: "Ouvrage supprimé avec succès !" });
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend actif sur : http://localhost:${PORT}`);
});