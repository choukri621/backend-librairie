const db = require('../config/db');

// Récupérer tous les ouvrages (livres)
exports.getAll = async (req, res) => {
  try {
    // On change 'categories' par 'ouvrages'
    const [rows] = await db.query('SELECT * FROM ouvrages');
    
    // On renvoie directement 'rows' pour que React puisse faire .map() dessus
    res.json(rows); 
  } catch (error) {
    console.error("Erreur SQL détaillée:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des ouvrages" });
  }
};

// Récupérer un ouvrage par son ID
exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ouvrages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Ouvrage non trouvé" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'ouvrage" });
  }
};