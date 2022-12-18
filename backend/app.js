const express = require('express');

const app = express();
const defaults = require('./routes/defaults');
const users = require('./routes/users');
const cors = require('cors');


app.use(express.urlencoded({extended: false}));
app.use(defaults);
app.use(users);
app.use( (req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>')
})


app.use(cors());

 app.listen(4000, function () {
  console.log('CORS-enabled web server listening on port 4000')
});