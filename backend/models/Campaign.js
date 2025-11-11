const { DataTypes } = require('sequelize');
const sequelize = global.sequelize;

// Example resource model scoped to a company
const Campaign = sequelize.define('Campaign', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Campaign name is required' },
      len: { args: [2, 150], msg: 'Campaign name must be 2-150 chars' }
    }
  },
  objective: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  budget: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: true,
    validate: {
      isDecimal: { msg: 'Budget must be a number' }
    }
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Campaign;
