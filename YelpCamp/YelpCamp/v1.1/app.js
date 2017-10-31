var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
        name : "Granite Hill", 
        image : "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg",
        description: "This is a huge granite hill, no bathrooms. No water, just beautiful granite!"
    }
,function(err, campground){
    if (err) {
        console.log(err);
    }else{
        console.log("Newly created Campground");
        console.log(campground);
    }
});*/

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // GET all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        }else{
            res.render("index", {campgrounds : allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.post("/campgrounds", function(req, res){
//   get data from form
        
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newCampground = {name : name, image : image, description : desc};
        
    //  create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    
});

// SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground){
        if (err) {
            console.log(err);
        }else{
            //show the template with that campground
            res.render("show", {campground : foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELP CAMP SERVER HAS STARTED");
});