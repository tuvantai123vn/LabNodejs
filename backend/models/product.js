const path = require("path");
const fs = require("fs");

const getProductsFromFile = (cb) => {
  const p = path.join(
    path.dirname(process.mainModule.filename),
    "datas",
    "products.json"
  );
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // Lấy đường dẫn tới file
    const p = path.join(
        path.dirname(process.mainModule.filename),
        "datas",
        "products.json"
    );

    getProductsFromFile((products) => {
        const existingProductIndex = products.findIndex(
            (prod) => prod.title === this.title
        );

        if (existingProductIndex !== -1) {
            // If the product with the same title exists, update it
            products[existingProductIndex] = this;
        } else {
            // If the product with the same title does not exist, add it to the list
            products.push(this);
        }

        fs.writeFile(p, JSON.stringify(products), (err) => {
            console.log(err);
        });
    });
}

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findOneByTitle(title, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.title === title);
      cb(product);
    });
  }
  // Trong class Product
  static findOneByUpdate(title, cb) {
    getProductsFromFile((products) => {
      const productData = products.find((prod) => prod.title === title);

      // Kiểm tra nếu có dữ liệu sản phẩm
      if (productData) {
        const product = new Product(
          productData.title,
          productData.imageUrl,
          productData.description,
          productData.price
        );
        cb(product);
      } else {
        // Nếu không tìm thấy sản phẩm
        cb(null);
      }
    });
  }
};
