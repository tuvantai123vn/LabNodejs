// controllers/cart.js
const Cart = require("../models/Cart");
const Order = require("../models/order");

const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne();

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Giỏ hàng không có sản phẩm." });
    }

    // Thay đổi phần này để truyền đúng thông tin user từ req.user
    // const { name, userId } = req.user;

    const order = new Order({
      products: cart.products, // Điều chỉnh thành 'products' thay vì 'product'
      user: {
        name: 'tu1', // Sử dụng thông tin user từ req.user
        userId: '65a5016870ffc2f6eecd78b4',
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


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("user");

    if (!orders) {
      return res.status(404).json({ message: "No orders found." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders." });
  }
};

module.exports = {
  checkout,
  getOrders,
};