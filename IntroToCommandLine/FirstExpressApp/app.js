var express = require("express");
var app = express();
app.get("/", function(req,res){
    res.send("Hi There");
});
app.get("/bye",function(req,res){
    console.log("SOMEONE MADE A REQUEST TO /bye");
    res.send("Goodbye");
});
app.get("/dogs",function(req,res){
    res.send("MEOW!");
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started");
});
app.get("*",function(req, res) {
    res.send("YOU ARE A STAR");
});