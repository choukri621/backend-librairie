// routes/panierRoutes.js
const express = require('express');
const router = express.Router();
const panierController = require('../controllers/panierController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/items', protect, panierController.addItem);
router.get('/', protect, panierController.getCart);

module.exports = router;