var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
var commentRoutes       = require("./routes/comments.js"),
    campgroundRoutes    = require("./routes/campgrounds.js"),
    indexRoutes         = require("./routes/auth.js");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));

// PASSPORT CONFIGURATION
    app.use(require("express-session")({
        secret : "once again Giovani wins",
        resave : false,
        saveUninitialized : false
    }));
    app.use(express.static(__dirname + "/public"));
    app.use(passport.initialize());
    app.use(passport.session());
    // User.authenticate is a method that comes with passport-local-mongoose
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// UTILIZE THE MADE ROUTES FROM EXTERNAL FILES
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELP CAMP SERVER HAS STARTED");
});