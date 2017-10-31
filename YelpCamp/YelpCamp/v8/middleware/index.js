var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//MIDDLEWARE
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        // it only shows up in the next page
        req.flash("error", "You need to be logged in for this action");
        res.redirect("/login");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user loogged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else {
                // does the user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You don´t have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "You need to be logged in");
        // return to the previous page that they where on
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment._id, function(err, foundComment){
           if (err) {
               res.redirect("back");
           } else {
               if (foundComment.author.id.equals(req.user._id)) {
                   next();
               }else {
                   req.flash("err", "You don´t have permission for that action");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("err", "You need to be logged in to do that");
    }
}

module.exports = middlewareObj;