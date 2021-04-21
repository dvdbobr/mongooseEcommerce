const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');


router.get('/', (req, res) => {
   productController.getAll(req, res);
}).post('/', (req, res) => {
   productController.create(req, res);
}).get('/findById/:id', (req, res) => {
   productController.getById(req, res);
}).get('/getActive', (req, res) => {
   productController.getActive(req, res);
}).get('/getPriceRange', (req, res) => {
   productController.getRange(req, res);
}).patch('/patchById/:id', (req, res) => {
   productController.updateProductById(req, res);
}).delete('/deleteById/:id', (req, res) => {
   productController.deleteProductById(req, res);
}).delete('/delete', (req, res) => {
   productController.deleteProducts(req, res);
})


module.exports = router;
