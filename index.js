/********************************************************************************************************************************************
 * Set some things up...
 ********************************************************************************************************************************************/

//Set running port
const PORT = 8080;

//Set SALT ROUNDS
const SALT_ROUNDS = 10;

//Set up Express
var express = require("express");
var app = express();

//Set up Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

//Set up Mongoose for MongoDB
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://myLaptop:pcpfXQOswPPTwaC2@playingaround.cdy5i.mongodb.net/PlayingAround?retryWrites=true&w=majority");

//Set up HTTPS

var fs = require('fs');
var https = require('https');

//Set up bcrypt
var bcrypt = require("bcrypt");

//Set up User mongoose object
var user_schema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String
})

var USER = mongoose.model("User",user_schema);

/**********************************************************************************************************************************************
 * Handy Functions
 *********************************************************************************************************************************************/
//Stores a user in the database
function store_user(username,password,salt,OBJECT){
    OBJECT.create({
        username: username,
        password: password,
        salt: salt
    },function(err,obj){
        if(err){
            console.log(err);
        }
    });
}

//To see if an object is empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**********************************************************************************************************************************************
 * Begin Routes
 *********************************************************************************************************************************************/

 //Flags for password and username availability
var passFlag = false;
var userFlag = false;

//Homepage Route
app.get("/",function(req,res){
    res.render("homepage.ejs",{passFlag:passFlag,userFlag:userFlag});
});

//Once Logged In
app.get("/:user",function(req,res){
    var user = req.params.user;
    //res.render("login.ejs",{user:user});
});

//Login POST route 
app.post("/login",function(req,res){
    var username = req.body.username;
    var pass = req.body.password;
    USER.find({username:username},function(err,obj){
        if(err){
            console.log("Error Finding User");
            console.log(err);
        }else{
            if(isEmpty(obj)){
                res.redirect("/");
            }else{
                const hash = bcrypt.hashSync(pass, obj[0].salt);
                console.log(hash);
                if(hash===obj[0].password){
                    passFlag = false;
                    res.send("Welcome Back: "+obj[0].username);
                }else{
                    passFlag = true;
                    res.redirect("/");
                }   
            }
        }
    });
});

//Create User POST route
app.post("/make_user",function(req,res){
    var username = req.body.username;
    var pass = req.body.password;
    USER.find({username:username},function(err,obj){
        if(err){
            console.log(err);
        }else if(!isEmpty(obj)){
            userFlag = true;
            res.redirect('/');
        }else{
            const salt = bcrypt.genSaltSync(SALT_ROUNDS);
            const hash = bcrypt.hashSync(pass, salt);

            store_user(username,hash,salt,USER);
            userFlag = false;
            res.redirect("/");
        }
    });
    
});


//Start server
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(PORT, function () {
    console.log('Server running on port: '+PORT);
  });
