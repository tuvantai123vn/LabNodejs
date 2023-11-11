const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    formCSS: true,
    productsCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = new Product(req.body.title);
  const imageUrl = new Product(req.body.imageUrl);
  const description = new Product(req.body.description);
  const price = new Product(req.body.price);
  try {
    const product = {
      title,
      imageUrl,
      description,
      price,
    };
    console.log(product);
    product.save();
    res.send("add-product succesful");
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = (req, res, next) => {
  res.json([]);
};
