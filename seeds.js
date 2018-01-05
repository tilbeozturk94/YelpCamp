var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    {
        name:"Wye Valley Camping" , 
        image:"https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg" , 
        description: "Beautiful atmosphere!!!"
    },
    {
        name:"Farm 2 Camping",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description:"Under the beautiful sky with stars!"
    },
    {
        name:"Bubbaville",
        image:"https://farm3.staticflickr.com/2238/1514148183_092606ba94.jpg",
        description:"Our first traditional camping gathering."
    }
];


function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        
        if(err){
            console.log(err);
            
        }
        
        console.log("removed campgrounds!!");
        
        data.forEach(function(camp){    //to be sure it works after removing
            
            Campground.create(camp, function(err, saved){
               if(err)
               {
                   console.log(err);
               }
               else
               {
                   console.log(saved);
                   //create a comment
                   Comment.create({
                       text: "This place is great! But i wish there was internet.", 
                       author: "Tilbe"
                       }, function(err, createdComment){
                           
                           if(err)
                           {
                               console.log(err);
                           }
                           else{
                               saved.comments.push(createdComment); //saved is created campground!
                               saved.save();
                               console.log("created comment!");
                           }
                       }
                       
                       );
               }
                
            });
        });
    });
  

}



module.exports = seedDB;