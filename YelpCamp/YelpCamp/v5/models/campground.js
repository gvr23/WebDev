var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
// to be able to export the schema out of the file
module.exports = mongoose.model("Campground", campgroundSchema);