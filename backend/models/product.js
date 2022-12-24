
const path = require('path');
const fs = require('fs');

const getProductsFromFile = cb => {
    const p = path.join(path.dirname(process.mainModule.filename),
    'datas', 'product.json');
    fs.readFile(p, (err, fileContent) => {
        if(err){
            console.log(err);
            return cb([]);
        }else{
            console.log(fileContent);
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product{
    constructor(t){
        this.title = t;
    }
    save(){
        getProductsFromFile(product => {
            fs.writeFile(p, JSON.stringify(product), (err) =>{
                console.log(err);
            })
        })
    }
    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}