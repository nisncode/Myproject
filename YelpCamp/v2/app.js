var express = require("express"), 
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
    mongoose.connect("mongodb://localhost/yelp_camp");
              
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image: String,
    description:String
});
//Model
var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//      name:"Shah Grounds",
//      image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
//      description: "It is a huge ground built by the emperor Shahjahan in the memory of his beloved life. Very green and very nice nature view.Has all facilities "
// },function(err,campground){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log("SUCCESSFULLY CREATED");
//         console.log(campground);
//     }
// });
var campgrounds = [
    {
        name:"Salman Grounds",
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
    },
    {
        name:"Shah Grounds",
        image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Manikarnika Ground",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg "
    },
    {
        name:"Salman Grounds",
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
    },
    {
        name:"Shah Grounds",
        image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
    },
    {
        name: "Manikarnika Ground",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg "
    }
    
    ]    ;
app.get("/",function(req,res){
    res.render("landing");
});
//INDEX- show all campgrounds
app.get("/campgrounds",function(req,res){
    
Campground.find({},function(err,allCampGrounds){
    if(err){
        console.log(err);
    }
    else
    {
        res.render("index",{campgrounds: allCampGrounds});    
    }
})
 
    
    
});
//CREATE - create a new campground
app.post("/campgrounds",function(req,res){
    var name  = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;
    var newObject = {name: name, image: image , description: desc};
    Campground.create(newObject,function(err,campground){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");
        }
    })
    
    
});
//NEW - show the form to submit a new campground
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(error,findCampGround){
        if(error){
            console.log(error);
        }
        else
        {
             res.render("show",{campground: findCampGround});
        }
    })
    req.params.id;
   
})









app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started!!!");
})