var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Per suas solut", 
        image: "https://farm4.staticflickr.com/3446/3801715614_f9713f7211.jpg",
        description: "In nostro fabellas oporteat vis, cu vix velit volumus patrioque, natum feugait singulis no pri. Tation posidonium signiferumque et vix, no dicunt regione recteque mei. Ius voluptua eloquentiam definitiones ut, est alii erat congue ex. Quodsi intellegam in mei."
    },
    {
        name: "Quo scaevola adolescens ea", 
        image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",
        description: "Quis repudiandae no mei, ad quidam deleniti comprehensam vix. Et dolorem accusam contentiones sed, illud tractatos vim id, id voluptua copiosae theophrastus mei. Mea amet placerat ne, usu novum veritus ea. Ponderum tincidunt at eos, te dicta omnesque repudiare usu, pri virtute euismod ne."
    },
    {
        name: "Ius aeterno indoctum an", 
        image: "https://farm8.staticflickr.com/7419/9675518784_0f624baedd.jpg",
        description: "Malis sonet quando sit at, his an inani postulant. Facer facilisis his ne. Exerci option delicata ad sea, harum exerci civibus cu usu. Id nam paulo honestatis, vix wisi senserit accusamus in. Exerci facilisi molestiae te has, idque epicurei cum in, inermis dissentiunt signiferumque qui an. Mei indoctum euripidis neglegentur ne. Enim scaevola efficiendi te est, audiam sanctus epicurei mei te, pro brute petentium ne."
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground"); 
                    //create a comment
                    Comment.create(
                    {
                        text: "Vel epicuri apeirian perpetua at, ad vix vitae doctus. Mei legere placerat omittantur ut. Ei per regione erroribus eloquentiam, mollis deterruisset et sit, id nisl qualisque intellegebat vel.",
                        author: "Latine saperet"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });        
    });
}

module.exports = seedDB;