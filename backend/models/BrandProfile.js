const { DataTypes } = require('sequelize');
const sequelize = global.sequelize;

// Brand Profile model - stores company brand assets and guidelines
const BrandProfile = sequelize.define('BrandProfile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true // One brand profile per company
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  primaryColor: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^#[0-9A-F]{6}$/i
    }
  },
  secondaryColor: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^#[0-9A-F]{6}$/i
    }
  },
  accentColor: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^#[0-9A-F]{6}$/i
    }
  },
  fontFamily: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Arial, sans-serif'
  },
  brandVoice: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: {
        args: [['professional', 'casual', 'friendly', 'authoritative', 'playful', 'luxury']],
        msg: 'Brand voice must be one of: professional, casual, friendly, authoritative, playful, luxury'
      }
    }
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: true
  },
  brandGuidelines: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  customData: {
    type: DataTypes.JSON, // Additional brand assets/rules
    allowNull: true,
    defaultValue: {}
  }
}, {
  timestamps: true
});

module.exports = BrandProfile;
