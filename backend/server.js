const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// SQLite Database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || './database.sqlite',
  logging: false,
});

// Make sequelize available globally for models
global.sequelize = sequelize;

// Import models & routes (after sequelize is set)
const Company = require('./models/Company');
const User = require('./models/User');
const Campaign = require('./models/Campaign');
const Template = require('./models/Template');
const BrandProfile = require('./models/BrandProfile');
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaigns');
const companyRoutes = require('./routes/companies');
const templateRoutes = require('./routes/templates');
const brandRoutes = require('./routes/brand');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Define associations (after models loaded)
Company.hasMany(User, { foreignKey: 'companyId' });
User.belongsTo(Company, { foreignKey: 'companyId' });

Company.hasMany(Campaign, { foreignKey: 'companyId' });
Campaign.belongsTo(Company, { foreignKey: 'companyId' });

Company.hasOne(BrandProfile, { foreignKey: 'companyId' });
BrandProfile.belongsTo(Company, { foreignKey: 'companyId' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/images', require('./routes/images'));

// Simple root status route
app.get('/', (req, res) => {
  res.status(200).json({ ok: true, service: 'AdCraft AI API', health: '/api/health' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running', database: 'SQLite' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Test database connection and sync models
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connected successfully');
    
    // Sync all models (creates tables if they don't exist)
  await sequelize.sync({ alter: true }); // alter keeps schema up to date for new columns/associations
    console.log('✅ Database tables synchronized');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Database: SQLite (${process.env.DB_PATH || './database.sqlite'})`);
  });
});

module.exports = app;
