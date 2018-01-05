var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS ROUTES
   
   router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
      
      Campground.findById(req.params.id, function(err, campground){
          
          if(err)
          {
              console.log("error");
          }
          
          else{
              res.render("comments/new", {campground: campground});
          }
      });
       
   });
   
   router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
       
      Campground.findById(req.params.id, function(err, campground) {
          
          if(err)
          {
              console.log("error");
          }
          else{
              Comment.create(req.body.comment, function(err, createdComment){
                  
                  if(err)
                  {console.log("error");}
                  else{
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    campground.comments.push(createdComment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                  }
              });
          }
      });
       
   });
   
   router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    
       Comment.findById(req.params.comment_id , function(err, foundComment){
          if(err)
          {
              console.log(err);
          }
           else{
                  res.render("comments/edit",{campground_id :req.params.id, comment:foundComment});
           }
       });
     
 
   
   });
   
   router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
       
       Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
           
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.redirect("/campgrounds/" + req.params.id);
          }
       });
   });
   
   router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
       
      Comment.findByIdAndRemove(req.params.comment_id, function(err){
          
         if(err)
         {
             console.log(err);
         }
         
         else{
             res.redirect("/campgrounds/" + req.params.id);
         }
      });
   });

    module.exports = router;