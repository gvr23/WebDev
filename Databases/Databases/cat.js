var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

// 1. cat definition
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String 
});

// 2. grab the pattern and copile iti into a model and now we can use it
var Cat = mongoose.model("Cat", catSchema);

/*var george = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
});

// trying to save the cat to the db
// we pass in a call back function to let us know what happened,
// if there is error or success from whats comming back ffom the database
george.save(function(error, cat){
    if (error) {
        console.log("Someting went wrong");
    }else{
        console.log("we just saved " + cat.name);
    }
});*/

// create andcheck in one step
Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(error, cat){
    if (error) {
        console.log(error);
    }else{
        console.log(cat);
    }
});

//add a new cat to the database
    
// retrieve all cats from the database
Cat.find({},function(error, cats){
    if (error) {
        console.log("OH NO!!");
        console.log(error);
    }else{
        console.log("ALL THE CATS");
        console.log(cats);
    }
})