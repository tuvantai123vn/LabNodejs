const Product = require('../models/product');
const Order = require('../models/order');
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.error("Error fetching products:", err);
      const error = new Error(err.message || "Failed to fetch products");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        const error = new Error("Product not found");
        error.httpStatusCode = StatusCodes.NOT_FOUND;
        throw error;
      }
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch(err => {
      console.error("Error fetching product:", err);
      const error = new Error(err.message || "Failed to fetch product");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.error("Error fetching index:", err);
      const error = new Error(err.message || "Failed to fetch index");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(err => {
      console.error("Error fetching cart:", err);
      const error = new Error(err.message || "Failed to fetch cart");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      console.error("Error adding to cart:", err);
      const error = new Error(err.message || "Failed to add to cart");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.error("Error removing from cart:", err);
      const error = new Error(err.message || "Failed to remove from cart");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.error("Error placing order:", err);
      const error = new Error(err.message || "Failed to place order");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => {
      console.error("Error fetching orders:", err);
      const error = new Error(err.message || "Failed to fetch orders");
      error.httpStatusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return next(error);
    });
};
