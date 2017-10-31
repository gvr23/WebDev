var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_references");

var Post = require("./models/post");
var User = require("./models/user");
//USER - EMAIL, NAME 
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     //one to many realtionship
//     posts: [
//         //object references
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });

// var User = mongoose.model("User", userSchema);
// var Post = mongoose.model("Post", postSchema);

/*User.create({
    email: "bob@gmail.com",
    name:  "Bob Belcher"
});*/

Post.create({
    title: "How too cook the best burger Part 6",
    content: "a wilfredo inseguro de su sexo"
}, function(err, post){
    if (err) {
        console.log(err);
    }else {
        User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
            if (err) {
                console.log(err);
            }else{
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if (err) {
                        console.log(err);
                    }else{
                        console.log(data);
                    }
                });
            }
        });
    }
});

// find user
/*    User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
       if (err) {
           console.log(err);
       } else{
           console.log(user);
       }
    });*/
// find post for that user
