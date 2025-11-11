const Campaign = require('../models/Campaign');

// Helper to ensure a campaign belongs to current tenant
const ensureOwnership = (campaign, companyId) => {
  if (!campaign || campaign.companyId !== companyId) {
    return false;
  }
  return true;
};

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const { name, objective, budget } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Campaign name is required' });
    }
    if (!req.companyId) {
      return res.status(400).json({ success: false, message: 'User is not associated with a company' });
    }
    const campaign = await Campaign.create({
      name,
      objective: objective || null,
      budget: budget || null,
      companyId: req.companyId
    });
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ success: false, message: 'Error creating campaign' });
  }
};

// Get all campaigns for tenant
exports.getCampaigns = async (req, res) => {
  try {
    if (!req.companyId) {
      return res.status(400).json({ success: false, message: 'User is not associated with a company' });
    }
    const campaigns = await Campaign.findAll({ where: { companyId: req.companyId }, order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, campaigns });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ success: false, message: 'Error fetching campaigns' });
  }
};

// Get single campaign
exports.getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!ensureOwnership(campaign, req.companyId)) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.status(200).json({ success: true, campaign });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ success: false, message: 'Error fetching campaign' });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!ensureOwnership(campaign, req.companyId)) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    const { name, objective, budget } = req.body;
    if (name !== undefined) campaign.name = name;
    if (objective !== undefined) campaign.objective = objective;
    if (budget !== undefined) campaign.budget = budget;
    await campaign.save();
    res.status(200).json({ success: true, campaign });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ success: false, message: 'Error updating campaign' });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!ensureOwnership(campaign, req.companyId)) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    await campaign.destroy();
    res.status(200).json({ success: true, message: 'Campaign deleted' });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ success: false, message: 'Error deleting campaign' });
  }
};
