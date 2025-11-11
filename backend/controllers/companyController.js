const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Ensure requester has company_admin or admin role within the same company
const ensureCompanyAdmin = (req, res) => {
  if (!req.user || !req.companyId) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  if (!['company_admin', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient role' });
  }
  return null;
};

// Get company info (current user's company)
exports.getMyCompany = async (req, res) => {
  try {
    if (!req.companyId) {
      return res.status(404).json({ success: false, message: 'User has no company' });
    }
    const company = await Company.findByPk(req.companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    const userCount = await User.count({ where: { companyId: company.id } });
    res.status(200).json({ success: true, company: { id: company.id, name: company.name, userCount } });
  } catch (err) {
    console.error('getMyCompany error:', err);
    res.status(500).json({ success: false, message: 'Error fetching company' });
  }
};

// Invite user to company (creates user with temp password)
exports.inviteUser = async (req, res) => {
  try {
    const authErr = ensureCompanyAdmin(req, res);
    if (authErr) return; // response already sent

    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User with that email already exists' });
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-10) + '!A1';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(tempPassword, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed, // already hashed
      companyId: req.companyId,
      role: 'user'
    });

    res.status(201).json({
      success: true,
      message: 'User invited successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
      tempPassword // In production, email this instead of returning
    });
  } catch (err) {
    console.error('inviteUser error:', err);
    res.status(500).json({ success: false, message: 'Error inviting user' });
  }
};

// List users in company (admin only)
exports.listCompanyUsers = async (req, res) => {
  try {
    const authErr = ensureCompanyAdmin(req, res);
    if (authErr) return;
    const users = await User.findAll({
      where: { companyId: req.companyId },
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'lastLogin']
    });
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error('listCompanyUsers error:', err);
    res.status(500).json({ success: false, message: 'Error listing users' });
  }
};

// Promote a user to company_admin (must already be an admin or company_admin)
exports.promoteUser = async (req, res) => {
  try {
    const authErr = ensureCompanyAdmin(req, res);
    if (authErr) return;
    const { userId } = req.params;
    const target = await User.findByPk(userId);
    if (!target || target.companyId !== req.companyId) {
      return res.status(404).json({ success: false, message: 'User not found in your company' });
    }
    target.role = 'company_admin';
    await target.save();
    res.status(200).json({ success: true, message: 'User promoted', user: { id: target.id, role: target.role } });
  } catch (err) {
    console.error('promoteUser error:', err);
    res.status(500).json({ success: false, message: 'Error promoting user' });
  }
};
