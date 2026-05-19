const mysql = require('mysql2/promise'); // On ajoute /promise ici

const db = mysql.createPool({ // On utilise createPool (meilleur pour les apps web)
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'librairie'
});

// Avec les promises, la connexion est automatique au premier appel
console.log('MySQL configuré avec Promises');

module.exports = db;