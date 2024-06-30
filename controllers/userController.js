const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const User = require('../models/user')
const passport = require("../passport-config");

exports.sign_up_get = asyncHandler( async (req, res, next) => {
    res.render("sign-up", {title: "Sign up"})})

exports.sign_up_post = [
    body("firstName").trim().isLength({ min: 1}).escape().withMessage("Required firstName"),
    body("lastName").trim().isLength({ min: 1}).escape().withMessage("Required lastName"),
    body("email").trim().isLength({ min: 1}).escape().isEmail().withMessage("Required email"),
    body("password").trim().isLength({ min: 1}).escape().withMessage("Required password"),
    body("passwordConfirm").custom( (value, { req }) => { return value === req.body.password }).withMessage("Passwords don't match"), 
    body("username").trim().isLength({ min: 1}).escape().withMessage("Required userName"),
    
    asyncHandler (async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render("sign-up", {title: "Sign up", errors: errors.array()})
        } else {
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
            })
        }
    })
]

exports.log_in_get = asyncHandler( async (req, res, next) => {
    res.render("log-in", {title: "Log in"})
})

exports.log_in_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
  })
  