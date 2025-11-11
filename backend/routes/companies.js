const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMyCompany,
  inviteUser,
  listCompanyUsers,
  promoteUser
} = require('../controllers/companyController');

// All company routes require authentication
router.use(protect);

// Current user's company summary
router.get('/me', getMyCompany);

// List users in company (company_admin or admin)
router.get('/users', listCompanyUsers);

// Invite a user (creates user w/ temp password) - company_admin or admin
router.post('/invite', inviteUser);

// Promote a user to company_admin - company_admin or admin
router.put('/promote/:userId', promoteUser);

module.exports = router;
