const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// Initialize Sequelize and set global for models
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || './database.sqlite',
  logging: false,
});
global.sequelize = sequelize;

// Load models and define associations
const Company = require('../models/Company');
const User = require('../models/User');
const Campaign = require('../models/Campaign');

Company.hasMany(User, { foreignKey: 'companyId' });
User.belongsTo(Company, { foreignKey: 'companyId' });

Company.hasMany(Campaign, { foreignKey: 'companyId' });
Campaign.belongsTo(Company, { foreignKey: 'companyId' });

async function run() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Create two companies
    const acme = await Company.findOrCreate({ where: { name: 'Acme' }, defaults: { name: 'Acme' } }).then(r => r[0]);
    const globex = await Company.findOrCreate({ where: { name: 'Globex' }, defaults: { name: 'Globex' } }).then(r => r[0]);

    // Create users for each company (password: password123)
    const [alice] = await User.findOrCreate({
      where: { email: 'alice@acme.com' },
      defaults: { name: 'Alice', email: 'alice@acme.com', password: 'password123', companyId: acme.id, role: 'company_admin' }
    });
    const [bob] = await User.findOrCreate({
      where: { email: 'bob@globex.com' },
      defaults: { name: 'Bob', email: 'bob@globex.com', password: 'password123', companyId: globex.id, role: 'company_admin' }
    });

    // Create sample campaigns
    await Campaign.findOrCreate({
      where: { name: 'Holiday Promo', companyId: acme.id },
      defaults: { name: 'Holiday Promo', objective: 'Increase seasonal sales', budget: 5000, companyId: acme.id }
    });
    await Campaign.findOrCreate({
      where: { name: 'Product Launch', companyId: globex.id },
      defaults: { name: 'Product Launch', objective: 'Launch new product line', budget: 12000, companyId: globex.id }
    });

    const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
    const aliceToken = jwt.sign({ id: alice.id }, secret, { expiresIn: '7d' });
    const bobToken = jwt.sign({ id: bob.id }, secret, { expiresIn: '7d' });

    console.log('Seeding complete. Use these tokens to test APIs:');
    console.log('Alice (Acme - company_admin) token:\n', aliceToken, '\n');
    console.log('Bob (Globex - company_admin) token:\n', bobToken, '\n');
    console.log('Example:');
    console.log('curl -H "Authorization: Bearer ' + aliceToken + '" http://localhost:5000/api/campaigns');
    console.log('curl -H "Authorization: Bearer ' + aliceToken + '" http://localhost:5000/api/companies/me');

    await sequelize.close();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

run();
