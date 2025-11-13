const express = require('express');
const router = express.Router();
const { getTemplates, getTemplate } = require('../controllers/templateController');

// Public routes - anyone can view templates
router.get('/', getTemplates);
router.get('/:id', getTemplate);

module.exports = router;
