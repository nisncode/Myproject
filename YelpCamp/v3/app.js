var express = require("express"), 
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground.js"),
    seedDB     = require("./seeds");
    
seedDB();    
mongoose.connect("mongodb://localhost/yelp_camp_v3");
              
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

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
});
 
    
    
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
//SHOW ROUTE
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(error,findCampGround){
        if(error){
            console.log(error);
        }
        else
        {
             console.log(findCampGround);            
             res.render("show",{campground: findCampGround});
        }
    })
    req.params.id;
   
})









app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started!!!");
});