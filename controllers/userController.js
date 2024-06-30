const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require('../models/user')
const passport = require("../passport-config");

exports.sign_up_get = asyncHandler( async (req, res, next) => {
    res.render("sign-up", {title: "Sign up"})})

exports.sign_up_post = asyncHandler ([

    body("fistName").trim().isLength({ min: 1}).escape().withMessage("Required firstName"),
    body("lastName").trim().isLength({ min: 1}).escape().withMessage("Required lastName"),
    body("email").trim().isLength({ min: 1}).escape().isEmail().withMessage("Required email"),
    body("password").trim().isLength({ min: 1}).escape().withMessage("Required password"),
    body("userName").trim().isLength({ min: 1}).escape().withMessage("Required userName"),
    
    async (req, res, next) => {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err)
        } else {
          try {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                member: false
            });
              await user.save();
              res.redirect("/log-in");
            } catch(err) {
              return next(err);
            };
          } 
  
})}])

exports.log_in_get = asyncHandler( async (req, res, next) => {
    res.render("log-in", {title: "Log in"})
})

exports.log_in_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
  