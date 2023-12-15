const path = require('path');
const fs = require('fs');

const getProductsFromFile = cb => {
    const p = path.join(
        path.dirname(process.mainModule.filename), 
        'datas', 
        'products.json');
    fs.readFile(p, (err, fileContent) => {
        if(err){
         return cb([]);
        }else{
            cb(JSON.parse(fileContent));
        } 
    })
}

module.exports = class Product{
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save(){
      getProductsFromFile(products => {
        fs.writeFile(products, JSON.stringify(list), (err) => {
            console.log(err);
        })
      });
    }
    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}