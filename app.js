const express = require('express');

const app = express();
const defaults = require('./routes/defaults');
const users = require('./routes/users');

app.use(express.urlencoded({extended: false}));
app.use(defaults);
app.use(users);
app.use( (req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})


app.listen(3000);