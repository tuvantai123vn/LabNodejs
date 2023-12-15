const path = require('path');
const fs = require('fs');

class Cart {
    addProduct(id, qty, productPrice, cb) {
        this.getCartFromFile(cart => {
            const existingProductIndex = cart.products.findIndex(product => product.id === id);

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
            this.saveCartToFile(cart, success => {
                cb(success);
            });
        });
    }

    getCartFromFile(cb) {
        const cartPath = path.join(
            path.dirname(process.mainModule.filename),
            'datas',
            'cart.json'
        );
        fs.readFile(cartPath, (err, fileContent) => {
            if (err) {
                return cb({ products: [], totalPrice: 0 });
            } else {
                cb(JSON.parse(fileContent));
            }
        });
    }

    saveCartToFile(cart, cb) {
        const cartPath = path.join(
            path.dirname(process.mainModule.filename),
            'datas',
            'cart.json'
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
}

// Exporting the Cart class
module.exports = Cart;
