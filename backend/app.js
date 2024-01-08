const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize");
const { db } = require("./util/connectData");
app.use(cors());

// const sequelize = new Sequelize('shopDev', 'root', 'Mysql123@', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const products = require("./router/product");
const carts = require("./router/cart");
const admin = require("./router/admin");
app.get("/", async (req, res, next) => {
  try {
    const result = await db.execute("SELECT * FROM products");
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params; // Trích xuất id từ req.params
    const result = await db.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (result[0].length === 0) {
      // Nếu không có sản phẩm nào có id tương ứng, trả về 404 Not Found
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result[0][0]); // Trả về dữ liệu của sản phẩm đầu tiên trong mảng result
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/cart", carts);
app.use("/admin", admin);

app.listen(4000);
