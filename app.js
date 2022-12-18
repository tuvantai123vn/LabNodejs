const express = require('express');

const app = express();
const index = require('./routes/index');
const users = require('./routes/users');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));
app.use(index);
app.use(users);
app.use( (req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})


app.listen(3000);