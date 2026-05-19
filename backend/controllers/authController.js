const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// INSCRIPTION (REGISTER)
exports.register = async (req, res) => {
    const { nom, email, password } = req.body;
    try {
        const [userExists] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO utilisateurs (nom, email, password) VALUES (?, ?, ?)',
            [nom, email, hashedPassword]
        );

        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
};

// CONNEXION (LOGIN)
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            'ma_cle_secrete_123',
            { expiresIn: '2h' }
        );

        res.json({
            message: "Connexion réussie",
            token: token,
            user: { nom: user.nom, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};