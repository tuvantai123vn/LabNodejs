const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { product_id, productPrice } = req.body;

    // Creating an instance of the Cart class
    const cartInstance = new Cart();

    // Using the instance to call the addProduct method
    cartInstance.addProduct(product_id, 1, productPrice, (success) => {
        if (success) {
            res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.' });
        } else {
            res.status(500).json({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng.' });
        }
    });
};
