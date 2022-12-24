const cors = require('cors');
const express = require("express");
const app = express();
const path = require("path");



app.use(cors());

const adminRoutes = require("./routes/product");
const shopRouter = require("./routes/defaults");

const errorController = require('./controllers/err');
app.set('views', 'views');
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRouter);

app.use(errorController.get404);


app.listen(4000);