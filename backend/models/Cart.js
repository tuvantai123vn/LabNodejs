const path = require("path");
const fs = require("fs");

class Cart {
  static addProduct(id, qty, productPrice, cb) {
    this.getCartFromFile((cart) => {
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increase the quantity
        cart.products[existingProductIndex].qty += qty;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.products.push({ id, qty, price: parseFloat(productPrice) });
      }

      // Update the total price based on quantity and price
      cart.totalPrice = cart.products.reduce((total, product) => {
        return total + (product.qty || 0) * (product.price || 0);
      }, 0);

      // Save the cart to the file
      this.saveCartToFile(cart, (success) => {
        cb(success);
      });
    });
  }

  static getCartFromFile(cb) {
    const cartPath = path.join(
      path.dirname(process.mainModule.filename),
      "datas",
      "cart.json"
    );
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        return cb({ products: [], totalPrice: 0 });
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }

  static saveCartToFile(cart, cb) {
    const cartPath = path.join(
      path.dirname(process.mainModule.filename),
      "datas",
      "cart.json"
    );
    fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
      if (err) {
        console.log(err);
        cb(false);
      } else {
        cb(true);
      }
    });
  }
  static removeProduct(id, cb) {
    this.getCartFromFile((cart) => {
      const updatedCart = cart.products.filter((product) => product.id !== id);

      // Update the total price based on quantity and price
      cart.totalPrice = updatedCart.reduce((total, product) => {
        return total + (product.qty || 0) * (product.price || 0);
      }, 0);

      // Update the products array in the cart
      cart.products = updatedCart;

      // Save the updated cart to the file
      this.saveCartToFile(cart, (success) => {
        cb(success);
      });
    });
  }
}

// Exporting the Cart class
module.exports = Cart;
