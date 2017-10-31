var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    passwordo : String
});

// takes care of hashing and unhashing the password from the user
userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User", userSchema);