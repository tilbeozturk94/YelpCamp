var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser");
   // seedDB   = require("./seeds");
   
   
   var campgroundRoutes = require("./routes/campgrounds"),
       commentRoutes = require("./routes/comments"),
       indexRoutes = require("./routes/index");
 
var User = require("./models/user");
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    
    secret:"App",
    resave: false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){ //to use the current user in every file!
    
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//schema setup

var Campground = require("./models/campground");
var Comment = require("./models/comment");

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP);