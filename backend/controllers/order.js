// controllers/cart.js
const Cart = require('../models/Cart');
const Order = require('../models/order');

const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne();

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Giỏ hàng không có sản phẩm." });
    }

    // Assuming you have user information available in req.user
    // const { name, userId } = req.user;

    const order = new Order({
      product: cart.products,
      user: {
        name: "tu1",
        userId: "65a5016870ffc2f6eecd78b4",
      },
    });

    await order.save();

    // Clear the cart after checkout
    await cart.deleteOne();

    res.status(200).json({ message: "Đặt hàng thành công." });
  } catch (error) {
    console.error("Lỗi khi thực hiện thanh toán:", error);
    res.status(500).json({ message: "Không thể thực hiện thanh toán." });
  }
};

module.exports = {
  checkout,
};
