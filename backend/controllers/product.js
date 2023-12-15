const Product = require("../models/Product");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const productId = req.body.productId;

  try {
    const product = new Product(title, imageUrl, description, price, productId);
    console.log(product);
    product.save();
    res.send("add-product successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll((products, err) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(products);
    }
  });
};
