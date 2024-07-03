const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")
const Message = require('../models/message')

exports.add_message_post = [
    body("title").trim().isLength({ min: 1}).escape().withMessage("Required message title"),
    body("text").trim().isLength({ min: 1}).escape().withMessage("Required message text"),
    asyncHandler( async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render("index", {title: "Sign up", user: req.user, errors: errors.array()})
        } else {
            const message = new Message({
                title: req.body.title,
                text: req.body.text,
                timeStamp: new Date(),
                user: res.locals.currentUser._id
            })
            await message.save()
            res.redirect('/')
        }
    })
]

exports.delete_message_post = asyncHandler( async (req, res, next) => {
    await Message.findByIdAndDelete(req.body.messageId)
    res.redirect('/')
})