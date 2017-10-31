var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - TITLE, CONTENT
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//USER - EMAIL, NAME 
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    //one to many realtionship
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



var Post = mongoose.model("Post", postSchema);

/*var newUser = new User({
    email: "harrypoter@brown.edu",
    name: "harry potter"
});

newUser.posts.push({
   title: "how to brew polyjuice potion", 
   content: "just kidding, go to potions class  "
});*/
// in order to save the newly created user
/*newUser.save(function(err, user){
    if (err) {
        console.log(err);
    }else {
        console.log(user);
    }
});*/

/*var newPost = new Post({
    title: "reflecions on apples",
    content: "they are delicious"
});

newPost.save(function(err, post){
    if (err) {
        console.log(err);
    }else{
        console.log(post);
    }
});*/

User.findOne({name : "harry potter"}, function(err, user){
    if (err) {
        console.log(err);
    }else{
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort, Voldemort, Voldemort"
        });
        
        user.save(function(err, user){
            if (err) {
                console.log(err);
            } else{
                console.log(user);
            }
        });
    }
});