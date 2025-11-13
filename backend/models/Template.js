const { DataTypes } = require('sequelize');
const sequelize = global.sequelize;

// Ad Template model - pre-defined layouts and styles
const Template = sequelize.define('Template', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Template name is required' }
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['social', 'email', 'display', 'video', 'print']],
        msg: 'Category must be one of: social, email, display, video, print'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.STRING, // URL to thumbnail image
    allowNull: true
  },
  layout: {
    type: DataTypes.JSON, // Layout configuration
    allowNull: true,
    defaultValue: {}
  },
  styleGuide: {
    type: DataTypes.JSON, // Default styling rules
    allowNull: true,
    defaultValue: {}
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Template;
