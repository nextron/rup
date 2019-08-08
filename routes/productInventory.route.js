const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/productInventory.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/', product_controller.list);
router.get('/getProductId',product_controller.getProductId);
router.post('/add',product_controller.add);
module.exports = router;