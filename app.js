var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//     {name: "Granite Hill", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//     {name: "Salmon Creek", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//     {name: "Granite Hill", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//     {name: "Salmon Creek", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//     {name: "Granite Hill", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// ];

mongoose.connect("mongodb://localhost/yelp_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// SCHEMA SETUP
// var campgroundSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//         description: "One very good nice camp site. No water. No electricity."
//     }
//     , 
//     function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }    
// );


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgorunds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds}); 
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from form and add to camggrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new") ;
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// ===========================
// COMMENTS ROUTES
// ===========================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelCamp Server Has Started!"); 
});