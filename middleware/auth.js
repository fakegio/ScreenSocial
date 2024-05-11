const Event = require('../models/event');

//Check if user is a guest
exports.isGuest = (req,res,next) =>{
    if (!req.session.user) {
        return next();
      } else {
        req.flash("error", "You are already logged in");
        return res.redirect("/users/profile");
      }
};

//Check if user is authenticated
exports.isLoggedIn = (req,res,next)=>{
  if (req.session.user) {
    return next();
  } else {
    req.flash("error", "You are not logged in");
    return res.redirect("/users/login");
  }
};

//Check if user is host of event
exports.isHost = (req,res,next) =>{
  let id = req.params.id;
  
  Event.findById(id)
    .then(event=>{
      if(event){
        if(event.host_name == req.session.user._id){
          return next();
        }else{
          let err = new Error("Unauthorized to access the resource");
          err.status = 401;
          return next(err);
        }
      }else{
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
      } 
    })
    .catch(err=>next(err));
};

exports.isNotHost = (req,res,next) =>{
  let id = req.params.id;
  
  Event.findById(id)
    .then(event=>{
      if(event){
        if(event.host_name != req.session.user._id){
          return next();
        }else{
          let err = new Error("Unauthorized to access the resource");
          err.status = 401;
          return next(err);
        }
      }else{
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
      } 
    })
    .catch(err=>next(err));
};