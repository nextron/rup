const express = require('express');
const router = express.Router();

const productController = require('../controllers/productInventory.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', productController.list);
router.get('/getProductId',productController.getProductId);
router.post('/add',productController.add);
//delete
router.delete('/delete',productController.deleteProduct);
module.exports = router;