const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getBrandProfile, upsertBrandProfile } = require('../controllers/brandController');

// All brand routes require authentication
router.use(protect);

router.get('/', getBrandProfile);
router.post('/', upsertBrandProfile);
router.put('/', upsertBrandProfile);

module.exports = router;
