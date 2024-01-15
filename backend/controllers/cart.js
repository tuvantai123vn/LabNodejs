const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const product_id = req.body.product_id;
  const price = parseFloat(req.body.productPrice);
  const qty = parseFloat(req.body.quantity);
  console.log(req.body)

  try {
      // Kiểm tra giỏ hàng có tồn tại không
      let cart = await Cart.findOne();

      if (!cart) {
          // Nếu không tồn tại, khởi tạo giỏ hàng mới
          cart = await Cart.create({
              products: [{
                  product: product_id,
                  price: price,
                  quantity: qty,
              }],
              totalPrice: price * qty,
          });
      } else {
          // Nếu tồn tại, kiểm tra xem sản phẩm có trong giỏ hàng chưa
          const existingProduct = cart.products.find(product => product.product.toString() === product_id);

          if (existingProduct) {
              // Nếu sản phẩm đã tồn tại, tăng quantity lên
              cart = await Cart.findOneAndUpdate(
                  { 'products.product': product_id },
                  { $inc: { 'products.$.quantity': qty, totalPrice: price * qty } },
                  { new: true }
              );
          } else {
              // Nếu sản phẩm chưa tồn tại, thêm một mục mới vào mảng products
              cart = await Cart.findOneAndUpdate(
                  {},
                  {
                      $addToSet: {
                          products: {
                              product: product_id,
                              price: price,
                              quantity: qty,
                          },
                      },
                      $inc: { totalPrice: price * qty },
                  },
                  { upsert: true, new: true }
              );
          }
      }

      res.status(200).json({ message: "Sản phẩm được thêm vào giỏ hàng thành công." });
  } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      res.status(500).json({ message: "Không thể thêm sản phẩm vào giỏ hàng." });
  }
};


const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.find().populate('products.product');

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
    const cart = await Cart.findByPk(1);

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    const updatedCart = await cart.update({
      products: cart.products.filter((product) => product.id !== productId),
    });

    res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng." });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng." });
  }
};

// cartController.js

const changeQuantity = async (req, res) => {
  const { productId, action } = req.params;
  const quantityChange = action === "add" ? 1 : -1;

  try {
    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại." });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { 'products.product': productId },
      {
        $inc: {
          'products.$.quantity': quantityChange,
          totalPrice: cart.products.find((product) => product.product.toString() === productId).price * quantityChange,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Số lượng sản phẩm đã được cập nhật thành công." });
  } catch (error) {
    console.error("Error changing product quantity:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật số lượng sản phẩm." });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  changeQuantity,
};