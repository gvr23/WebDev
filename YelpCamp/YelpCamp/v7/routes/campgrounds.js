var express = require("express");
var Campground = require("../models/campground");
var middleware = require("../middleware");
// para que reconosca el parametro que se le manda desde app.js
var router = express.Router({ mergeParams: true });


router.get("/", function(req, res) {
    // GET all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campground/index", { campgrounds: allCampgrounds });
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    //   get data from form

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, image: image, description: desc, author: author };

    //  create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");
});


// SHOWS MORE INFO ABOUT ONE CAMPGROUND
router.get("/:id", function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            //show the template with that campground
            res.render("campground/show", { campground: foundCampground });
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
           res.redirect("back");
        } else {
            res.render("../views/campground/edit", {campground : foundCampground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground and redirect
    // the first paramete is what we want to find
    // secoond is the data that we want to update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE CAMPGROUNDS
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    debugger
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;