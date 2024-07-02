var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController")
const messageController = require("../controllers/messageController")
const asyncHandler = require("express-async-handler")
const Message = require('../models/message')

/* GET home page. */
router.get('/', asyncHandler( async function(req, res, next) {
  const messages = await Message.find().populate("user").exec()
  res.render('index', { title: 'Private Club', user: req.user, messages: messages });
}));

router.get('/sign-up', userController.sign_up_get)

router.post('/sign-up', userController.sign_up_post)

router.get('/log-in', userController.log_in_get)

router.post('/log-in', userController.log_in_post)

router.get('/join', userController.join_get)

router.post('/join', userController.join_post)

router.get('/log-out', userController.log_out)

router.post('/add-message', messageController.add_message_post)

module.exports = router;
