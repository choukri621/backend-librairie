const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route pour enregistrer une commande
router.post('/', async (req, res) => {
    const { items, total } = req.body;
    
    // Pour ton projet scolaire, on simule l'enregistrement.
    // Idéalement, ici tu ferais un INSERT dans une table "commandes".
    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Le panier est vide" });
        }

        console.log(`📦 Nouvelle commande reçue ! Total : ${total}$`);
        console.table(items); // Affiche les livres dans la console Node

        res.status(201).json({ message: "Commande enregistrée avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors du traitement de la commande" });
    }
});

module.exports = router;