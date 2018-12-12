var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
var Cat = mongoose.model("Cat",catSchema);
// var tommy = new Cat({
//     name: "Tsubaki",
//     age: 7,
//     temperament: "Evil"
// });
// tommy.save(function(err,cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG!!!");
//     }
//     else
//     {
//         console.log("WE SUCCESSFULLY ADDED A CAT TO THE DATABASE");
//         console.log(cat);
//     }
// });

//retriving  cat or cats from the database
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Calm"
},function(err, cat){
    if(err){
        console.log(err);
    }
    else
    {
        console.log(cat);
    }
});

Cat.find({},function(err,cats){
  if(err){
      console.log("OH NO! THERE IS AN ERROR");
      console.log(err);
  } 
  else
  {
      console.log("ALL THE cATS ARE FOUND...");
      console.log(cats);
  }
});
