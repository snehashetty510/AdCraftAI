const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createCampaign,
  getCampaigns,
  getCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaignController');

// All campaign routes are protected & tenant scoped
router.use(protect);

router.route('/')
  .get(getCampaigns)
  .post(createCampaign);

router.route('/:id')
  .get(getCampaign)
  .put(updateCampaign)
  .delete(deleteCampaign);

module.exports = router;
