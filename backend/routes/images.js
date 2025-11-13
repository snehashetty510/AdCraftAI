const express = require('express');
const router = express.Router();
const { generateCampaignImage } = require('../controllers/imageController');
const { protect } = require('../middleware/auth');

// Temporarily remove protect middleware for testing
router.post('/generate', generateCampaignImage);

module.exports = router;
