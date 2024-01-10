const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/connectData");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

sequelize
  .sync() // Thêm option force để xóa bảng nếu tồn tại
  .then(() => {
    console.log("Products table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

module.exports = Product;
