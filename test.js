const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//mongo connection
let uri = "mongodb+srv://nextron:nextron@nextron-xwdga.mongodb.net/test?retryWrites=true&w=majority";
//let uri = "mongodb://localhost:27017/rup"

mongoose.connect(uri, {useNewUrlParser: true}, function(err){
    if (err) console.log(err);
    console.log("db connected");
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let signUpSchema = new mongoose.Schema({
    name: {type: String, required: false},
    address: {type: String, required: true},
    phone:{type: Number, required: false},
    sex: String
});
//name:'User'=> collection name . schema tells about how many colums will be there in then collections
const User = mongoose.model('User',signUpSchema);
const userDetails = new User({
    name: "mani",
    address: "#312,W.No.1, Jiwan nagar haredi road",
    phone: 856022906,
    sex: "M"
});

let newUser = User({});
newUser.address = "agkhadg ,madbgkadjgvad"

//commmand to save data in database
newUser.save().then(()=>console.log("user added"));

//command to get data from db
//User.find().exec((err,users)=>{console.log(users)});

//app.listen(3000);
const port = 3001;
app.listen(port,()=>{console.log("server listening at "+port)});