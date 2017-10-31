var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [{
        name: "Clouds Rest",
        image: "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
        description: "blah blah blah"
    },
    {
        name: "Cusco",
        image: "https://farm4.staticflickr.com/3858/15007514128_769e3c7b32.jpg",
        description: "arto color"
    },
    {
        name: "Cicilia",
        image: "https://farm5.staticflickr.com/4212/35709300001_82a34e805b.jpg",
        description: "buena vista y comida"
    }
];

function seedDB() {
    // to remove everything from the database
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Removed Campgrounds!");
            // add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(campground);
                    }
                    else {
                        console.log("Added Campground!!");
                        // createa a comment
                        Comment.create({
                            text: "This place is great but I ih it had internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("created new comment");
                                campground.comments.push(comment);
                                campground.save()
                            }

                        });
                    }
                });
            });
        }
    });

    // add a few comments
}

module.exports = seedDB;
