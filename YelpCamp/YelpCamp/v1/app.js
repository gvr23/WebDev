var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campground = [
        {name : "Salmon Creek", image : "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name : "DSB", image : "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
        {name : "Granite Hill", image : "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name : "Granite Hill", image : "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name : "Granite Hill", image : "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name : "Granite Hill", image : "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name : "Granite Hill", image : "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg"},
        {name : "Salmon Creek", image : "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name : "Salmon Creek", image : "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name : "Salmon Creek", image : "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name : "Salmon Creek", image : "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"}
    ];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds : campground});
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.post("/campgrounds", function(req, res){
//   get data from form
        var name = req.body.name;
        var image = req.body.image;
        var newCampground = {name : name, image : image};
        
    //  add to campgrounds array
        campground.push(newCampground)
    //we do have two  /campgrounds routes but the default will e a get request.
        res.redirect("/campgrounds");
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELP CAMP SERVER HAS STARTED");
});