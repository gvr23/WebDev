var bodyParser = require("body-parser"), 
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

// APP CONFIG    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
// so i can serve the costum style sheet
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// 1st Start with Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image : String,
    body: String,
    // created should be a date and the default value shoulld be todaoys date
    created: {type: Date, default: Date.now}
});

// 2nd add the schema to the model
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
    //default
    app.get("/", function(req, res){
        res.redirect("/blogs");
    });

    // index, list all
    app.get("/blogs", function(req, res){
        Blog.find({}, function(err, blogs){
            if (err) {
                console.log(err);
            }else{
                res.render("index", {blogs : blogs});
            }
        });
    });
    
    //NEW ROUTE
    app.get("/blogs/new", function(req, res){
        res.render("new");
    });
        
    //CREATE ROUTE
    app.post("/blogs", function(req, res){
        //   first ist the parameter to get what we are passing through the form, through the objet we created whichis blog
        //sanitize
        req.body.blog.body = req.sanitize();
        
           Blog.create(req.body.blog, function(err, newBlog){
               if (err) {
                   res.redirect("new");
               }else{
                   res.redirect("/blogs");
               }
           });
    });
    
    //SHOW ROUTE
    app.get("/blogs/:id", function(req, res){
        var id = req.params.id;
        Blog.findById(id, function(err, foundBlog){
            if (err) {
                res.redirect("/blogs");
            }else{
                res.render("show", {blog : foundBlog});
            }
        });
    });
    
    //EDIT ROUTE
    app.get("/blogs/:id/edit", function(req, res){
        Blog.findById(req.params.id, function(err, foundBlog){
            if (err) {
                res.redirect("/blogs");
            }else{
                res.render("edit", {blog : foundBlog});
            }
        });
    });
    
    //UPDATE ROUTE
    app.put("/blogs:id", function(req, res){
        // three parameters, id, newData, callBack
       Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
           if (err) {
               res.redirect("/blogs");
           }else{
               res.redirect("/blogs/" + req.params.id);
           }
       });
    });
    
    //DELETE ROUTE
    app.delete("/blogs/:id", function(req, res){
        Blog.findByIdAndRemove(req.params.id, function(err){
            if (err) {
                res.redirect("/blogs");
            }else{
                res.redirect("/blogs");
            }
        });
    });
    
/*Blog.create({
    title: "Best Wireles Headphone",
    image: "data:image/jpeg;base64,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",
    body: "this are the best sound quality headphones"
    
}, function(err, newBlog){
    if (err) {
        console.log(err);
    }else{
        console.log("this has been created");
        console.log(newBlog);
    }
})  */  
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING");
});