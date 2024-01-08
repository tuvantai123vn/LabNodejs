const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  try {
    const { title, imageUrl, price } = req.body;

    const newProduct = await Product.create({
      title,
      imageUrl,
      price,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const search = req.query.search;
    if (search) {
      const products = await Product.findAll({
        where: {
          title: {
            [Sequelize.Op.like]: `%${search}%`,
          },
        },
      });
      res.json(products);
    } else {
      const products = await Product.findAll();
      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProductById,
};
