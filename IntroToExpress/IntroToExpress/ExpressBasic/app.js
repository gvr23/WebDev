var express = require("express");
var app = express();

// --------------------------------routes---------------------------------
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig : "oink",
        cow : "moooo",
        dog : "woff woof!",
        cat: "i hate you human",
        goldfish: "..."
    }
    var sound = sounds[animal];
   
    res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:number", function(req, res){
   var num = Number(req.params.number);
   var word = req.params.word;
   var cad = "";
   
   for (var i = 0; i < num; i++) {
       cad += word + " ";
   }
   res.send(cad)
});

app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
});
// --------------------------------routes---------------------------------

// Launch Service
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log("server has started");
    })