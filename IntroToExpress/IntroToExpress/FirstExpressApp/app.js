// to require express in our app
var express = require("express");
var app = express();

// --------------------ROUTES---------------------------------------------------
// "/" => "Hi there!"
    //takes two parameters, the first one is the url
    app.get("/", function(req, res){
       res.send("Hi there!");
    });
// "/bye" => "Goodbye!"
    app.get("/bye", function(req, res){
       res.send("Goodbye!");
    });
// "/dog" => "MEOW"
    app.get("/dog", function(req, res){
       res.send("MEOW"); 
    });
    
// to make the rout into a pattern, variable this tells express to not match character for character in the route
    app.get("/r/:subbreditName", function(req, res){
       res.send("welcome to a subbredit"); 
    });
    
//more variables, in order to obtain the value of the parameters that you are passing in we utilize req.params
    app.get("/r/:subbreditName/comments/:id/:title", function(req, res){
        var subbreditname = req.params.subbreditName;
        res.send("welcome to the " + subbreditname.toUpperCase() + " page");
    })
    
//anything that is not mapped will go to this route 
    app.get("*", function(req, res){
        res.send("You are a star");
    });
    
//Tell express to listen for requests (start server)
//port that cloud 9 wants this app to listen in, and the ip address it wants this app to use
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("server has started");
    });
// --------------------ROUTES---------------------------------------------------