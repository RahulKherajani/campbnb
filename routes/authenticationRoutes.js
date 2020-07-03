var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/userModel");

//SHOW- show register form
router.get("/register", function (req, res) {
    res.render("register", { page: "register" });
});

//SIGNUP
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to CampBnB " + user.username)
            res.redirect("/campgrounds");
        });
    });
});

//SHOW- show login form
router.get("/login", function (req, res) {
    res.render("login", { page: "login" });
});

//LOGIN
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {
    });

// LOGOUT
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you Out !")
    res.redirect("/campgrounds");
});

module.exports = router;