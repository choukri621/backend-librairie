// controllers/panierController.js
const db = require('../config/db');

exports.addItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ouvrage_id, quantite } = req.body;
    if (!ouvrage_id || !quantite) return res.status(400).json({ error: "Champs manquants" });

    const sql = `
      INSERT INTO panier (user_id, ouvrage_id, quantite)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantite = quantite + ?
    `;
    await db.query(sql, [userId, ouvrage_id, quantite, quantite]);
    res.json({ message: "Article ajouté au panier avec succès !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout au panier" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const sql = `
      SELECT p.id, p.quantite, o.titre, o.prix
      FROM panier p
      JOIN ouvrages o ON p.ouvrage_id = o.id
      WHERE p.user_id = ?
    `;
    const [rows] = await db.query(sql, [userId]);
    res.json({ panier: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération du panier" });
  }
};