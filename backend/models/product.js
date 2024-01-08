const { DataTypes } = require('sequelize');
const {sequelize} = require('../util/connectData');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'products',
  timestamps: false
});

module.exports = Product;
