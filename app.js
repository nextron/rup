const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//mongo connection
let url = "mongodb://localhost:27017/rup"

mongoose.connect(url, {useNewUrlParser: true}, function(err){
    if (err) console.log(err);
    console.log("db connected");
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//console.log(db.products_inventory.find());

//handle product inventory route
const productInventory = require("./routes/productInventory.route");
app.use('/products',productInventory);

//app.listen(3000);
const port = 3000;
app.listen(port,()=>{console.log("server listening at "+port)});