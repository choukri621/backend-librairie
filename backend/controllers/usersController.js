const db = require('../config/db');

// Tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nom, email, role FROM users');
    res.json({ users: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};

// Utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, nom, email, role FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ user: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
  }
};