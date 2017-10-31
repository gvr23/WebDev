var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();

mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    // used to encode and decode the session
    secret : "Aprender a programar es lo mejor",
    resave : false,
    saveUninitialized: false
}));    
// we need these two lines evreytime we want to use this package
app.use(passport.initialize());
app.use(passport.session());

// taking the data from the session and encoding it and unencoding it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
// ++++++++++++++++++ROUTE+++++++++++++++++++++++++++++++++++
    app.get("/", function(req, res){
        res.render("home");
    });
    
    app.get("/secret", isLoggedIn, function(req, res){
        res.render("secret");
    });
    
    //Auth Routes
    app.get("/register", function(req, res){
        res.render("register");
    });
    
    app.post("/register", function(req, res){
       User.register(new User({username : req.body.username}), req.body.password, function(err, user){
           if (err) {
               console.log(err);
               return res.render("register");
           }else{
            //   this lines logs the user in and serializes it along with the hash password
               passport.authenticate("local")(req, res, function(){
                   res.redirect("/secret");
               });
           }
       });
    });
    
    //Login Routes
    app.get("/login", function(req, res){
         res.render("login");
    });
    
    app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
        
    }), function(req, res){
    });
    
    //Logout routes
    app.get("/logout", function(req, res){
       //destroying all the user´s data that in the session
       req.logout(); 
       res.redirect("/");
    });
// ++++++++++++++++++ROUTE+++++++++++++++++++++++++++++++++++
 
//MIDDLEWARE, next is the next thing that need to be called
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
    
app.listen(process.env.PORT, process.env.IP, function(err){
   if (err) {
      console.log("no se puedo conectar");
   } else {
       console.log("se conecto");
   }
});