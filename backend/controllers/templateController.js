const Template = require('../models/Template');

// Get all active templates
exports.getTemplates = async (req, res) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    
    if (category) {
      where.category = category;
    }
    
    const templates = await Template.findAll({
      where,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'category', 'description', 'thumbnail', 'isPremium', 'layout', 'styleGuide']
    });
    
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error('getTemplates error:', error);
    res.status(500).json({ success: false, message: 'Error fetching templates' });
  }
};

// Get single template
exports.getTemplate = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id);
    
    if (!template || !template.isActive) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }
    
    res.status(200).json({ success: true, template });
  } catch (error) {
    console.error('getTemplate error:', error);
    res.status(500).json({ success: false, message: 'Error fetching template' });
  }
};
