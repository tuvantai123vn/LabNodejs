const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  try {
    const { title, imageUrl, price, description } = req.body;
    const priceFloat = parseFloat(price);
    console.log(
      `title: `,
      title,
      "imageUrl: ",
      imageUrl,
      "priceFloat: ",
      priceFloat,
      "description: ",
      description
    );

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
    const product = await Product.findByPk(productId);

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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postEditProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    // Tìm sản phẩm theo ID
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Cập nhật thông tin sản phẩm
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;

    // Lưu thay đổi vào cơ sở dữ liệu
    await product.save();

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProductById,
  postEditProduct,
};
