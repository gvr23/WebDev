// express router
var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router({mergeParams : true});


//=============================================================
    //COMMENTS ROUTES
//=============================================================
    // point to the form to create a comment
    router.get("/new", isLoggedIn ,function(req, res) {
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
    router.post("/", isLoggedIn, function(req, res) {
        // lookup campground using id
            Campground.findById(req.params.id, function(err, foundcampground) {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                }else{
                     // create new comment
                     Comment.create(req.body.comment,function(err, comment){
                         if (err) {
                             console.log(err);
                         }else {
                             comment.author.id = req.user._id;
                             comment.author.username = req.user.username;
                             comment.save();
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
    
//MIDDLEWARE
    function isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }else {
            res.redirect("/login");
        }
    }
    
module.exports = router;