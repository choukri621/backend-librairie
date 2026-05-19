const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController'); // Assure-toi que le fichier existe
const { protect } = require('../middlewares/authMiddleware'); // chemin correct

// Routes utilisateurs
router.get('/', protect, usersController.getAllUsers);
router.get('/:id', protect, usersController.getUserById);

module.exports = router;