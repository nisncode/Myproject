var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var friends = ["Tony","Lily","Aakansha","Shruti","Sapna"];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/friends",function(req,res){
    
    res.render("friends",{friends: friends});
});

app.post("/addFriend",function(req,res){
    var newFriend = req.body.newFriend;
    //add this newFriend to the friends array
    //scoping issue
      friends.push(newFriend);
    res.redirect("/friends");
  
})


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER STARTED!!!");
})