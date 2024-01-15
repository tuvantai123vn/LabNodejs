const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const { product_id, price, qty } = req.body;

  try {
      let cart = await Cart.findOneAndUpdate(
          {},
          {
              $push: {
                  products: {
                      product: product_id,
                      price: price,
                      qty: qty
                  }
              },
              $inc: { totalPrice: price * qty }
          },
          { upsert: true, new: true }
      );

      res.status(200).json({ message: "Product added to the cart successfully." });
  } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ message: "Failed to add product to the cart." });
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(1); // Sử dụng ID tùy ý đã chọn ở bước trước

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin giỏ hàng." });
  }
};
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    // Lấy thông tin giỏ hàng
    const cart = await Cart.findByPk(1); // Sử dụng ID tùy ý đã chọn ở bước thêm giỏ hàng

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    // Cập nhật giỏ hàng sau khi xóa sản phẩm
    const updatedCart = await cart.update({
      products: cart.products.filter((product) => product.id !== productId),
    });

    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng." });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng." });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};