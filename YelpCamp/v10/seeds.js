var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "When you go to Clouds Rest, a lot of mystery and natural charm is in store for you. The cloud  lake is situated roughly at 16499 feet above sea level. It  begins in the town of Loharjung and takes you through mountains replete with rich biodiversity and picturesque surroundings. You travel through little hilly villages before arriving in Ali Bugyal. It is an alpine meadow at an elevation of about 10830 feet above sea level. Best time to visit : Any season can be chosen to attempt it, depending on your desire. If you like snow and want a challenging hike, then the months of May and June are perfect for you. On the other hand if you want to experience the nature , then you should plan the excursion in September or October."
    },
    {
        name: "Dayara Bugyal", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "The mighty Himalayas have a unique charm about them and their beauty is simply unmatched. Besides snow-clad mountains, the region is famous for its scenic meadows, which over the years have become popular trekking routes and one such is the Dayara Bugyal trek. This trail takes adventure enthusiasts to some of the scenic open lands and thick forests, ending at a vast region of lush green meadow. Many have described this trek to be like a fairy-tale and the untouched beauty of  this region is a proof of that. The Dayara Bugyal trekking expedition starts from Barsu, a small village in the district of Uttarkashi that serves as the base camp for this breathtaking experience. To reach Barsu, you will undertake a full-day drive from the revered town of Haridwar. All along this route, starting from Barsu and Barnala, you will get an opportunity to behold the serenity of the Greater Himalayas and various other lofty peaks. "
    },
    {
        name: "Deo Tibba Base", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Deo Tibba Base Trek is a pleasant trek that takes you through the lush green oak & deodar forested trails, passing through undulating meadows and pastures of the Gaddi shepherds to the base camp of Tenta, where one encounters breathtaking vistas of Mt. Deo Tibba with its hanging glaciers rising right under your nose. The Deo Tibba Base Trek offers spectacular views which will forever leave a mark in the minds of all nature lovers and trekkers. Arrive at Rumsu Base Camp on your own, located at Rumsu Village. The village is easily accessible through Kullu. Acclimatize to the weather, which is a very necessary part of a trek to avoid Acute Mountain Sickness. Stroll around the village and go on for peaceful nature walk to explore the place around. Have your lunch and later indulge in some adventure activity. We will begin the orientation about the trek in the evening which will be hosted by our instructor. Get a good night’s sleep at Rumsu Base Camp."
    }
];
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;