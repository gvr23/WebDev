// in order to modularize code and require it elsewhere
var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model("Post", postSchema);
