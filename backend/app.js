const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
require("./dbs/init.mongodb")

const products = require("./router/product");
const carts = require("./router/cart");
const admin = require("./router/admin");


app.use("/products", products);
app.use("/carts", carts);
app.use("/admin", admin);

app.listen(4000);
