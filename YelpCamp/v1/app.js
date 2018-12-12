var express = require("express");
var app = express();
app.set("view engine","ejs");
var bodyParser = require("body-parser");
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

app.get("/campgrounds",function(req,res){
    

 res.render("campgrounds",{campgrounds: campgrounds});    
    
    
});

app.post("/campgrounds",function(req,res){
    var name  = req.body.name;
    var image = req.body.image;
    var newObject = {name: name, image: image};
    campgrounds.push(newObject);
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
})









app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started!!!");
})