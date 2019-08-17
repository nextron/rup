const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let transactionsSchema = new Schema({
    prod_id : {type: Number, required: true},
    quantity_add : {type: Number},
    quantity_sold : {type: Number},
    timestamp: {type: Date, required: true}
});

let transactions = mongoose.model('transactionsDetails', transactionsSchema);
//Export the model
module.exports = transactions;