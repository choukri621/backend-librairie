const db = require('../config/db');

// Toutes les catégories
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json({ categories: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des catégories" });
  }
};

// Catégorie par ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Catégorie non trouvée" });
    res.json({ category: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la catégorie" });
  }
};