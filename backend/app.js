const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:admin@node-products.o0dvpt9.mongodb.net/node-complete', // Thay đổi URL kết nối MongoDB theo yêu cầu
      }),
    })
  );

// parse application/json
app.use(bodyParser.json());
require("./dbs/init.mongodb")

const products = require("./router/product");
const carts = require("./router/cart");
const admin = require("./router/admin");
const user = require("./router/user");
const order = require("./router/order");


app.use("/products", products);
app.use("/carts", carts);
app.use("/admin", admin);
app.use("/user", user);
app.use("/order", order);

app.listen(4000);
