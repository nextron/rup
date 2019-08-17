const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require('jsonwebtoken');

//Enable cors
app.use(cors());

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//mongo connection
//let uri = "mongodb+srv://nextron:nextron@nextron-xwdga.mongodb.net/test?retryWrites=true&w=majority";
let uri = "mongodb://localhost:27017/rup"

mongoose.connect(uri, {useNewUrlParser: true}, function(err){
    if (err) console.log(err);
    console.log("db connected");
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//console.log(db.products_inventory.find());

//handle login route
const loginRoute = require("./routes/login.route");
app.use('/login',loginRoute);

//To verify every req if user is logged in or not
/*app.use(async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, 'shhhhh')
        if(decoded.user=="mani"){
            next();
        }else{
            res.send({success:"false",msg:"Please Login with a valid user"});
        }
        //return res.send("success")
    } catch (e) {
        res.send({success:"false",msg:"Please Login First"});
    }
})*/

//handle product inventory route
const productInventoryRoute = require("./routes/productInventory.route");
app.use('/products',productInventoryRoute);

//handle add and sell products route
const productTransactionRoute = require("./routes/productTransactions.route");
app.use('/transaction',productTransactionRoute);

//app.listen(3000);
const port = 3000;
app.listen(port,()=>{console.log("server listening at "+port)});