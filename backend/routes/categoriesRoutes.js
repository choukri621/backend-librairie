const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController'); // chemin exact

router.get('/', categoriesController.getAll);     // GET /api/categories
router.get('/:id', categoriesController.getById); // GET /api/categories/:id

module.exports = router;