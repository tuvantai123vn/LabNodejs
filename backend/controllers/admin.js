const Product = require('../models/Product');

// Handle GET request to retrieve a single product for editing
exports.getEditProduct = (req, res) => {
  const { title } = req.params;

  Product.findOneByTitle(title, product => {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  });
};

// Handle PUT request to update a product
exports.editProduct = (req, res) => {
  const { productTitle } = req.params;
  const updatedProductData = req.body;

  Product.findOneByUpdate(productTitle, product => {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product properties
    product.title = updatedProductData.title;
    product.imageUrl = updatedProductData.imageUrl;
    product.description = updatedProductData.description;
    product.price = updatedProductData.price;

    // Save the updated product
    product.save();

    res.status(200).json(product);
  });
};
