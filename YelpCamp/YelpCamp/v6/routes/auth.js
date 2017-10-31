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
    
    router.post("/register", function(req, res){
        var newUser = new User({username : req.body.username});
        // register method provided by local moongoose
        User.register(newUser, req.body.password, function(err, user){
           if (err) {
               console.log(err);
               return res.render("register");
           }
           passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
           });
        });
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
        res.redirect("/");
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