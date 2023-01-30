const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {

  req.user
  .getCart()
  .then(cart => {
    return  cart
    .getProducts()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'You Cart',
        products: products
      })
    })
    .catch(err => console.log(err))
  })
  .catch(err => {
    console.log(err);
  })
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fechedCart;
  // Product.findById(prodId, product => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect('/cart');
  req.user
  .getCart()
  .then(cart => {
    fechedCart = cart;
    return cart.getProduct({where: {id: prodId}})
  })
  .then(products => {
    let product;
    if(product.length > 0){
      product = products[0]
    }
    let newQuality = 1;
    if(product){

    }
    return products.findByPk(prodId)
    .then(product => {
      return fechedCart.addProduct(product, {throught: {quantity: newQuality}});
    }) 
    .catch(err => console.log(err))
  })
  .then(() => {
    res.redirect("/cart");
  })
  .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
