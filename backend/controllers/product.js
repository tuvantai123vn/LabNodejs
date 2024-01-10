const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  try {
    const { title, imageUrl, price, description } = req.body;
    const priceFloat = parseFloat(price);

    const newProduct = await Product.create({
      title,
      imageUrl,
      price: priceFloat,
      description,
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
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).exec();
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
};
