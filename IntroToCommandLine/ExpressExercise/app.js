var express = require("express");
var app = express();
app.get("/",function(req,res){
    res.send("Hi there, welcome to my assignment");
});
app.get("/speak/:animal",function(req,res){
    var janvar = req.params.animal.toLowerCase();
    var string = 
    {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        goldfish: "...."
    };
    var sound = string[janvar];
    
    res.send("The "+janvar+" says '"+sound+"'");
});
app.get("/repeat/:message/:num",function(req,res){
    var mes = req.params.message
    var m = " ";
    var number = Number(req.params.num);
    for(var i= 0 ;i<number;i++)
    {
        
        m = m+" "+mes; 
    };
    res.send(m);
});
app.get("*",function(req,res){
    res.send("Sorry, page not found...What are you doing with your life?");
});




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER STARTED !!!");
})