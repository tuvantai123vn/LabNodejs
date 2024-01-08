const { DataTypes } = require('sequelize');
const {sequelize} = require('../util/connectData');

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  products: {
    type: DataTypes.STRING,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'carts',
  timestamps: false
});

module.exports = Cart;
