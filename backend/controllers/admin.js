const Product = require('../models/Product');

// Handle GET request to retrieve a single product for editing
const deleteProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.remove();
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
    const product = await Product.findById(id);

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
  postEditProduct,
  deleteProductById
}