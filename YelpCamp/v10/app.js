var express = require("express"), 
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport  = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User          = require("./models/user"),
    Campground = require("./models/campground.js"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment");
    
seedDB();    
mongoose.connect("mongodb://localhost/yelp_camp_v6");
              
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Passport Configuration
    app.use(require("express-session")({
        secret: "Sab kuch bhagwan hi hai.Vahi shiv hai vahi shakti hain paramanand hai.",
        resave: false,
        saveUninitialized:false
    }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})
//HOME Route
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
        res.render("campgrounds/index",{campgrounds: allCampGrounds});    
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
    res.render("campgrounds/new.ejs");
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
             res.render("campgrounds/show",{campground: findCampGround});
        }
    })
    req.params.id;
   
})
//EDIT Route
app.get("/campgrounds/:id/edit",function(req,res){
    //is user logged in?
    if(req.isAuthenticated())
    {
        var foundCampground = Campground.findById(req.params.id,function(err, foundCampground) {
        if(err)
         {
              res.redirect("/campgrounds");
         }
        else
         {
             //does the user own the campground?
             //if(foundCampground.author.id.equals(req.user._id))
             
                res.render("campgrounds/edit",{campground:foundCampground});
             
             //else{
               //  res.send("YOU DO NOT HAVE PERMISSION TO DO THAT");
             //}
             
         }
    }) 
    }
    else{
             //res.send("YOU NEED TO BE LOGGED IN TO DO THAT")
             res.redirect("/login");
        }
    //does user own the campground?
    //otherwise,also we'll redirect
    //if not,redirect
   
    
})
//Update Route
app.put("/campgrounds/:id",function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedBlog){
        if(err)
        {
            res.redirect("/campgrounds/:id/edit");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})
//NEW COMMENT FORM
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    //find the campground
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
           res.render("comments/new",{campground: campground});
        }
    })
    
})
//CREATING NEW COMMENT
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
             //creating new comment
             //linking comment to the campground
            //redirecting to the show page
             Comment.create(req.body.comment,function(err,comment){
                 if(err)
                 {
                     console.log(err);
                 }
                 else
                 {
                     campground.comments.push(comment);
                     campground.save();
                     res.redirect('/campgrounds/'+campground._id);
                 }
             })
            
        }
    })
   
})

//DELETE ROUTE
app.delete("/campgrounds/:id",function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds");
        }
    })
})

//=====================
//AUTH ROUTES
//=====================
//Register Route
app.get("/register",function(req,res)
{
    res.render("register");
})
app.post("/register",function(req,res)
{
    var userName = new User({username:req.body.username});
    User.register(userName,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    })
})

//LOGIN ROUTES
//Login Form
app.get("/login",function(req,res){
    res.render("login");
})
app.post("/login",passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect:"/login"
}),function(req,res){
    
});
//LOGOUT ROUTES
app.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started!!!");
});