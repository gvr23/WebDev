var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// <!--every time that you need too etract something from a form you need to install BODYPARSER  package-->
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

// *********************global variables***********************
    var friends = ["Jose", "Gustavo", "Zico", "Wilfredo", "Enrique"];
// *********************global variables***********************

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
   res.render("friends", {friends : friends}); 
});

app.post("/addfriend", function(req, res){
   var newFriend = req.body.newfriend;
   friends.push(newFriend);
//   res.render("friends", {friends : friends});
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(req, res){
    
});
