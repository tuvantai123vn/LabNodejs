const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const { product_id, productPrice } = req.body;

  // Using the instance to call the addProduct method
  Cart.addProduct(product_id, 1, productPrice, (success) => {
    if (success) {
      res.status(200).json({ message: "Sản phẩm đã được thêm vào giỏ hàng." });
    } else {
      res.status(500).json({ message: "Lỗi khi thêm sản phẩm vào giỏ hàng." });
    }
  });
};
exports.getCart = (req, res, next) => {
  Cart.getCartFromFile((cart, err) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(cart);
    }
  });
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.params;
//   Gọi phương thức removeProduct từ Cart
  Cart.removeProduct(productId, (success) => {
    if (success) {
      res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng." });
    } else {
      res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng." });
    }
  });
};
