const { DataTypes } = require('sequelize');

// Use global sequelize instance
const sequelize = global.sequelize;

// Company / Tenant model
// Represents an organization that owns users and data (campaigns, etc.)
const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Company name is required' },
      len: { args: [2, 100], msg: 'Company name must be between 2 and 100 characters' }
    },
    set(value) {
      if (typeof value === 'string') {
        this.setDataValue('name', value.trim());
      }
    }
  }
}, {
  timestamps: true
});

module.exports = Company;
