const product = require("../models/productInventory.model");
const productSold = require("../models/productSold.model");
const transactionsModel = require("../models/transactions.model");

exports.getTransactions = function(req,res){
    transactionsModel.find().exec((err, result)=>{
        if(err || result==[]){
            res.send({ success : "false", msg :"no transaction available", additionalInfo :err})}else{
                res.send(result);
        }
    })
}

exports.getProductsSold = function(req,res){
    productSold.find().exec((err, result)=>{
        if(err || result==[]){
            res.send({ success : "false", msg :"no product sold", additionalInfo :err})}else{
                res.send(result);
        }
    })
}

exports.add = function(req,res){
    if(req.body.prod_id==null || req.body.quantity_add==null || req.body.quantity_add<1){
        console.log("Please provide the details");
        //res.send(req.prod_id +" "+ req.quantity_add);
        res.send({success : "false" , msg : "Please provide the details" , controller: "transaction"});
    }else{
        let newTranaction = new transactionsModel({
           prod_id: req.body.prod_id,
           quantity_add: req.body.quantity_add,
           quantity_sold: 0,
           timestamp: Date()
        });
        product.findOne({prod_id : req.body.prod_id}).then((result)=>{
            if(result){
                let updatedQuantity = result.current_quantity + parseInt(req.body.quantity_add);
                //res.send(result.current_quantity.toString());
                product.updateOne({prod_id : req.body.prod_id}, {current_quantity: updatedQuantity}).then((resProductUpdate)=>{
                    if(resProductUpdate){
                        newTranaction.save().then(()=>{
                            console.log("transaction has been saved for product quan add");
                            res.status(200).send({success : "true", msg : "Product quantity added"});
                        }).catch((err)=>{
                            res.send({success : "false", msg : "Product quantity not added, something went wrong"});
                        });
                    }else{
                        res.send({success : "false" , msg: "failed to update in product inventory db"});
                    }
                });
            }
            else{
                res.send({success : "false", msg : "product not found"});
            }
        });
    }
}

exports.sell = function(req,res){
    if(req.body.prod_id == null || req.body.quantity_sold == null || req.body.company_sell == null){
        console.log("Please provide the details");
        res.send(req.body.prod_id +" "+ req.body.quantity_sold);
        res.send({success : "false" , msg : "Please provide the details" , controller: "transaction"});
    }else{
        let newTranaction = new transactionsModel({
            prod_id: req.body.prod_id,
            quantity_add: 0,
            quantity_sold: req.body.quantity_sold,
            timestamp: Date()
        });
        let productSelling = new productSold({
            prod_id : req.body.prod_id,
            company_sell : req.body.company_sell,
            prod_quantity : req.body.quantity_sold,
            price: 0,
            timestamp: Date()
        });
        product.findOne({prod_id : req.body.prod_id}).then((result)=>{
            if(result){
                if(result.current_quantity >= req.body.quantity_sold && req.body.quantity_sold > 1){
                    let updatedQuantity = result.current_quantity - parseInt(req.body.quantity_sold);
                    //res.send(result.current_quantity.toString());
                    productSelling.price = result.price;
                    product.updateOne({prod_id : req.body.prod_id}, {current_quantity: updatedQuantity}).then((resProductUpdate)=>{
                        if(resProductUpdate){
                            //res.send(productSelling);
                            productSelling.save().then(()=>{
                                console.log("prodcut sold");
                                newTranaction.save().then(()=>{
                                    console.log("transaction has been saved for product quan sell");
                                    res.status(200).send({success : "true", msg : "Product quantity deleted"});
                                }).catch((err)=>{
                                    res.send({success : "false", msg : "Product quantity not added, something went wrong"});
                                });
                            }).catch((err)=>{
                                res.send({success : "false" , msg : "not able to save in product sold table"})
                            })
                        }else{
                            res.send({success : "false" , msg: "failed to update in product inventory db"});
                        }
                    });
                }else{
                    res.send({success : "false" , msg: "you don't have enough quantity to sell"});
                }
            }
            else{
                res.send({success : "false", msg : "product not found"});
            }
        });
    }
}
