const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProcductInventorySchema = new Schema({
    prod_id : {type: Number, required: true},
    prod_name : {type: String, required: true},
    prod_brand : {type: String, required: true},
    current_quantity : {type: Number, required: true},
    price: {type: Number, required: true} 
});

let products_inventory = mongoose.model('products_inventory', ProcductInventorySchema);
//Export the model
module.exports = products_inventory;