var express     = require("express"),
    router      = express.Router({mergeParams : true}),
    passport    = require("passport"),
    User        = require("../models/user");
    

//INDEX ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

// SHOw REGISTER FORM
    router.get("/register", function(req, res){
        res.render("register");
    });
    
//SIGN UP LOGIC
    router.post("/register", function(req, res){
       var newUser = new User({username : req.body.username});
       // register method provided by local moongoose
       User.register(newUser, req.body.password, function(err, newlyUser){
           if (err) {
               req.flash("error", err.message);
               return res.render("register");
           } else{
               passport.authenticate("local")(req, res, function(){
                   req.flash("success", "Wellcome to YelpCamp " + newlyUser.username);
                   res.redirect("/campgrounds");
               });
           }
       })
    });
    
// LOGIN
    router.get("/login", function(req, res){
       res.render("login"); 
    });
    
    router.post("/login", passport.authenticate(
        "local", {
            successRedirect: "/campgrounds", 
            failureRedirect: "/login"
            
        }), function(req, res){
    });
    
//LOGOUT
    router.get("/logout", function(req, res) {
        req.logout();
        req.flash("success", "Logged you out");
        res.redirect("/campgrounds");
    });
    
module.exports = router;