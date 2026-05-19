// controllers/commandesController.js
const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM commandes');
    res.json({ commandes: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM commandes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Commande non trouvée" });
    res.json({ commande: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la commande" });
  }
};