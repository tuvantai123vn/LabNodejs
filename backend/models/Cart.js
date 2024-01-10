const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/connectData");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    products: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "carts",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

sequelize
  .sync() // Thêm option force để xóa bảng nếu tồn tại
  .then(() => {
    console.log("Carts table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

module.exports = Cart;
