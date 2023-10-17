const express = require('express');
const controllers = require('../controllers/auth')
const auth = require('./authPage')
const Mess = require('../controllers/mess')

const router = express.Router();

router.post('/register' ,controllers.register);
router.post('/login', controllers.login);
router.delete('/logout', controllers.logout);
// router.get('/getcart/:id', auth.authPage('admin') , controllers.getCart);
router.get('/getcart/:id' , controllers.getCart);
router.post('/addToCart', controllers.addToCart);
router.post('/loginadmin', controllers.loginAdmin);
router.get('/getalluser', controllers.getAllUsers);
router.get('/:id', controllers.detail);
router.put('/update', controllers.updateToCart);
router.put('/delete', controllers.deleteToCart);
router.get('/mess/:id' , Mess.index);
router.get('/mess/get/all' , Mess.all);
router.get('/authpage');

module.exports = router;