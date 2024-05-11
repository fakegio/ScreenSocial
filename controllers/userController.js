const model = require("../models/user");
const event = require("../models/event");
const rsvp = require('../models/rsvp');

//renders sign up page
exports.new = (req, res) => {
    return res.render("./user/new");
};

//Creates new user account
exports.create = (req, res, next) => {
    let user = new model(req.body);
    user
      .save()
      .then((user) => {
        req.flash("success", "Account created successfully");
        res.redirect("/users/login")})
      .catch((err) => {
        if (err.name === "ValidationError") {
          req.flash("error", err.message);
          return res.redirect("/users/new");
        }

        if (err.code === 11000) {
          req.flash("error", "Email has been used");
          return res.redirect("/users/new");
        }

        next(err);
      });
};

//renders login page
exports.getUserLogin = (req, res, next) => {
    return res.render("./user/login");
};

//processes login
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    model
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("wrong email address");
        req.flash("error", "wrong email address");
        res.redirect("/users/login");
      } else {
        user.comparePassword(password).then((result) => {
          if (result) {
            req.session.user = user;
            req.flash("success", "You have successfully logged in");
            res.redirect("/users/profile");
          } else {
            req.flash("error", "wrong password");
            res.redirect("/users/login");
          }
        });
      }
    })
    .catch((err) => next(err));
};

//retrieves user profile and hosted events
exports.profile = (req, res, next) => {
  let id = req.session.user._id;
  Promise.all([model.findById(id), event.find({ host_name: id }), rsvp.find({user:id})])
    .then((results) => {
      const [user, events, rsvps] = results; 
      res.render("./user/profile", { user, events, rsvps });     
    })
    .catch((err) => next(err));
};

//Processes log out
exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    else res.redirect("/");
  });
};
