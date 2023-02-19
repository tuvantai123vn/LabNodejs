const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authenticateJWT = require('./middleware');
const cors = require('cors');

const app = express();
app.use(cors());

const hotelRoute = require('./routes/hotels');
const roomRoute = require('./routes/rooms');
const userRoute = require('./routes/users');
const search = require('./routes/search');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connect = async () => {
    try{
        await mongoose
        .connect(
          "mongodb+srv://admin:admin@node-products.o0dvpt9.mongodb.net/booking?retryWrites=true&w=majority"
        )
        console.log('Connected to mongoDB');
    }
    catch(err){
        throw err
    }
}
mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected");
})

app.get('/product', authenticateJWT.authenticateJWT, (req, res, next)=>{
    res.json({ message: 'You are authorized' });
})

app.use('/api/v1/search', search);
app.use('/api/v1/hotels', hotelRoute);
app.use('/api/v1/users',  userRoute);
app.use('/api/v1/rooms', roomRoute);

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
app.listen(5001,()=> {
connect()
console.log('server is running......');
});