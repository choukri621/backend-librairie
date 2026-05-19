const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Non autorisé, token manquant" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'votre_cle_secrete_jwt'); 
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};