const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSoldSchema = new Schema({
    prod_id : {type: Number, required: true},
    company_sell : {type: String, required: true},
    prod_quantity : {type: Number, required: true},
    price: {type: Number, required: true},
    timestamp: {type: Date, required: true}
});

let productSold = mongoose.model('product_sold', productSoldSchema);
//Export the model
module.exports = productSold;