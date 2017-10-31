// express router
var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router({mergeParams : true});
var middleware = require("../middleware");

//=============================================================
    //COMMENTS ROUTES
//=============================================================
    // point to the form to create a comment
    router.get("/new", middleware.isLoggedIn ,function(req, res) {
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
    router.post("/", middleware.isLoggedIn, function(req, res) {
        // lookup campground using id
            Campground.findById(req.params.id, function(err, foundcampground) {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                }else{
                     // create new comment
                     Comment.create(req.body.comment,function(err, comment){
                         if (err) {
                             req.flash("error", "Something went wrong");
                             console.log(err);
                         }else {
                             comment.author.id = req.user._id;
                             comment.author.username = req.user.username;
                             comment.save();
                             // connect new comment to camprgound
                             foundcampground.comments.push(comment);
                             foundcampground.save();

                             req.flash("success", "Succesfully added comment");
                             // redirect to campgrond´s show page
                             res.redirect("/campgrounds/" + foundcampground._id);
                         }
                     });
                }
            });
    });
    
    // COMMENT EDIT
    router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
            }
        });
    });
    
    // COMMENT UPDATE
    router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
            if (err) {
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
    
    // COMMENT DESTROY
    router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
        Comment.findByIdAndRemove(req.params.comment_id, function(err){
            if (err) {
                res.redirect("back");
            } else {
                req.flash("succes", "Successfully deleted comment");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
    
module.exports = router;