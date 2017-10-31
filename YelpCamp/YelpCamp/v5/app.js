var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

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
            res.render("campground/index", {campgrounds : allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
   res.render("campground/new"); 
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
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        }else{
            //show the template with that campground
            res.render("campground/show", {campground : foundCampground});
        }
    });
});

//=============================================================
    //COMMENTS ROUTES
//=============================================================
    // point to the form to create a comment
    app.get("/campgrounds/:id/comments/new", function(req, res) {
        // find campground by id
        Campground.findById(req.params.id, function(err, foundcampground){
            if (err) {
                console.log(err);
            }else{
                res.render("comment/new", {campground : foundcampground});
            }
        });
    });
    
    // where we can submit the form to
    app.post("/campgrounds/:id/comments", function(req, res) {
        // lookup campground using id
            Campground.findById(req.params.id, function(err, foundcampground) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                }else{
                     // create new comment
                     Comment.create(req.body.comment,function(err, comment){
                         if (err) {
                             console.log(err);
                         }else {
                             // connect new comment to camprgound
                             foundcampground.comments.push(comment);
                             foundcampground.save();
                             
                             // redirect to campgrond´s show page
                             res.redirect("/campgrounds/" + foundcampground._id);
                         }
                     });
                }
            });
    });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELP CAMP SERVER HAS STARTED");
});