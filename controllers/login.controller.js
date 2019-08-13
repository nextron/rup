const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.login = function (req,res) {
    if(req.body.id == "mani"){
        hash = "$2b$10$Jsh7W2r0LZD7egl4SRp2n.r8fZZTp/ZbIHui0VP8a67mQwukgQkUS";
        bcrypt.compare(req.body.password, hash, function(err, result) {
            if(result) {
                var tokenId = jwt.sign({ user: req.body.id }, 'shhhhh');
                //to check if its  a valid user
                /*var decoded = jwt.verify(tokenId, 'shhhhh');
                console.log(decoded.user)*/
                res.send({success : "true", token: tokenId ,msg : "valid user"});
            }else{
                res.send({sucess : "false", msg : "Password is not valid"});
            }
        });
    }else{
        res.send({success : "false", msg:  "user name doesn' exist"});
    }
}

/*function checkDetails(id, password){
    if(id == "mani"){
        hash = "$2b$10$Jsh7W2r0LZD7egl4SRp2n.r8fZZTp/ZbIHui0VP8a67mQwukgQkUS";
        bcrypt.compare(password, hash, function(err, res) { console.log("abc");return res;});
    }else{
        return(false);
    }
}*/
//to generate encrypted password and below is for password="mani"
/*encrypted password = $2b$10$Jsh7W2r0LZD7egl4SRp2n.r8fZZTp/ZbIHui0VP8a67mQwukgQkUS
bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    res.send(hash);
});*/