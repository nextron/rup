const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/productTransactions.contorller");

router.get('/get',transactionController.getTransactions);
router.get('/getSold',transactionController.getProductsSold);
router.post('/add',transactionController.add);
router.post('/sell',transactionController.sell);

module.exports = router;