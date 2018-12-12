var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");
//POST - title,content
var postSchema = new mongoose.Schema(
    {
        title: String,
        content: String
    });

var Post = mongoose.model("Post",postSchema);
//USER- email,name
var userSchema = new mongoose.Schema(
    {
        email: String,
        name: String,
        posts:[postSchema]
    });

var User = mongoose.model("User",userSchema);

// var newUser = new User(
//     {
//         email: "charlie@gmail.com",
//         name: "Charlie Brown"
//     });
//  newUser.save(function(err,user){
//      if(err){
//          console.log(err);
//      }
//      else
//      {
//          console.log(user);
//      }
//  });
 
//  var newPost = new Post(
//      {
//          title:"Faltu ki tension in dimaag",
//          content:"Kuch nahi hai.Bas bekar ka faltu ka tension paal rahe ho tum apne dimmag mein"
//      });

// newPost.save(function(err,post)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(post);
//     }
// });

//Again create a new user
// var newUser = new User(
//     {
//         email: "nishthaa@gmail.com",
//         name: "Nishthaa"
//     });
// newUser.posts.push({
//     title: "Yoga the ideal way of living life",
//     content:"Yoga can actually do wonders to you.Try it out for just 7 days and see the difference"
// });
// newUser.save(function(err,user){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(user);
//     }
// });

User.findOne({name:"Nishthaa"},function(err,user){
    if(err)
    {
        console.log(err);
    }
    else
    {
        user.posts.push({
            title: "Friends college life aur masti",
            content: "Friends college life aur masti baar baar nahi milti. Jab milti hai tab chahiye ki ise jee bhar ki enjoy karo aur phir zindagi bhar yaad karo"
        });
        user.save(function(err,user){
            if(err)
            {
                console.log(user);
            }
            else{
                console.log(user);
            }
        })
    }
});
    