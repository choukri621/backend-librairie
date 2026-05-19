const express = require('express');
const router = express.Router();
const ouvragesController = require('../controllers/ouvragesController');

// Routes publiques
router.get('/', ouvragesController.getAll);
router.get('/:id', ouvragesController.getById);

module.exports = router;