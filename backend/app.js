const express = require("express");
const app = express();
const fs = require('fs');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const getProductsFromFile = (cb) => {
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

app.get('/products', (req, res, next) => {
    getProductsFromFile( (products) => { 
        res.json(products);
        console.log(products);
    });
    
 });

app.post('/add-products', (req, res, next) => {    
    getProductsFromFile( (products) => { 
        let newProduct = {
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            price: req.body.price,
        };
        let list = [...products, newProduct];
        console.log(list);
        fs.writeFile(
            path.join(
                path.dirname(process.mainModule.filename), 
                'datas', 
                'products.json'), JSON.stringify(list) , 'utf8' , (err) => {
            console.log(err);
        })
    });
    
});
 

app.listen(4000);