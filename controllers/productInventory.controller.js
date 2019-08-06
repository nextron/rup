const Product = require('../models/productInventory.model');

exports.list = function (req, res) {
    //res.send('db');
    //console.log(Product.find());
    //console.log(Product.findById("5d440a233b9be7cb2d084e5b"));
    Product.find().exec((err,products)=>{res.send(products)});
};

exports.add = function(req,res){
    //to add a product to product inventory
    /*_let newProduct = new Product({
        prod_id : 3,
        prod_name : "oreo",
        prod_brand : "somethigasdgang",
        current_quantity : 21122,
        price: 300
    });*/
    let newProduct = new Product({
        prod_id : req.body.prod_id,
        prod_name : req.body.prod_name,
        prod_brand : req.body.prod_brand,
        current_quantity : req.body.current_quantity,
        price: req.body.price
    });
    newProduct.save().then(()=>{res.send("Product added")});
}