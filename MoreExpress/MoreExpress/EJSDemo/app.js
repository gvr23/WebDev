var express = require("express");
var app = express();

// tells express to serve the contents of the public directory
app.use(express.static("public"));
//looking for ejs files automatically
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
   res.render("love", {thingVar: thing}); 
});

app.get("/posts", function(req, res){
   var posts = [
            {title : "kinky sex", author : "kamasutra"},
            {title : "sexy timr", author : "Porno"},
            {title : "soft sex", author : "gllax"},
            
       ];
    res.render("posts", {posts : posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is listening!!!")
});
