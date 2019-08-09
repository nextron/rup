const Product = require('../models/productInventory.model');

exports.list = function (req, res) {
    //res.send('db');
    //console.log(Product.find());
    //console.log(Product.findById("5d440a233b9be7cb2d084e5b"));
    Product.find({prod_id :{$gt: 0}}).sort({prod_id:-1}).exec((err,products)=>{res.send(products)});
};

exports.add = function(req,res){
    if(req.body.prod_name==null || req.body.prod_brand==null || req.body.current_quantity==null || req.body.price==null){
        console.log("Please provide the details");
        res.send({"success":"false","msg" : "Please provide the details"});
    }
    else {
        Product.findOne().sort({prod_id: -1}).limit(1).then((result) => {
            //console.log(result.prod_id);
            let newProduct = new Product({
                prod_id: result.prod_id+1,
                prod_name: req.body.prod_name,
                prod_brand: req.body.prod_brand,
                current_quantity: req.body.current_quantity,
                price: req.body.price
            });
            //console.log(newProduct);
            newProduct.save().then(() => {
                console.log("Product added");
                res.status(200).send({"success": "true", "msg": "Product added"});
            }).catch((err)=>{
                res.send({"success": "false", "msg": "Product not added, somthing went wrong"});
            });
        }).catch((err) => {
            res.send({"success": "false", "msg": "Product not added, somthing went wrong"});
        });
    }
    //to add a product to product inventory
    /*_let newProduct = new Product({
        prod_id : 3,
        prod_name : "oreo",
        prod_brand : "somethigasdgang",
        current_quantity : 21122,
        price: 300
    });*/
    //let productId = 0;
    /*Product.findOne().sort({prod_id:-1}).limit(1).exec((err,product)=> {
        console.log(product.prod_id)});
    //getProductId().then((result)=>{console.log(result)});
    var query = Product.findOne().sort({prod_id:-1}).limit(1);
    var promise = query.exec();
    //assert.ok(promise instanceof Promise);
    promise.then(function(doc){
        console.log(doc.prod_id);
        productId = doc.prod_id+1;
        console.log(productId);
    });
    
    setTimeout(function(){
        console.log(productId);
    }, 500);
    //console.log(productId);
    */
    //productId = getProductId().then();
    //getProductId().then((res)=>{productId=res});
    //console.log(getProductId());
    //console.log(productId);
    /*let newProduct = new Product({
        prod_id : productId,
        prod_name : req.body.prod_name,
        prod_brand : req.body.prod_brand,
        current_quantity : req.body.current_quantity,
        price: req.body.price
    });*/
    //console.log(newProduct);
    //newProduct.save().then(()=>{res.send("Product added")});
    //res.send("test");
}

exports.getProductId = function (req,res){
    //res.send("1");
    Product.findOne().sort({prod_id:-1}).limit(1).exec((err,product)=> {
        let product_id = product.prod_id+1;
        res.send(JSON.stringify(product_id));
    });
}


exports.deleteProduct = function(req,res){
    //here your code
    console.log(req.body);
    Product.findOneAndDelete({'prod_id': req.body['id']}).then( () => {
        console.log('product deleted');
    }
    )
    res.send(req.body);
}