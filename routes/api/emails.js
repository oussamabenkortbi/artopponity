const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const User = require("../../models/User");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kortbyoussama',
    pass: 'Sonicx204@'
  }
});

router.post('/send', (req, res) => {

    let user = {
        _id: req.body._id,
        email: req.body.email
    }
    
    host = req.get('host');
    link = "http://" + req.get('host') + "/verify?id=" + user._id;

    mailOptions = {
        from: 'kortbyoussama@gmail.com',
        to : user.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) res.status(400).json(error);
        else res.json('Email sent: ' + info.response)
    });
});

router.get('/', (req,res) => {
    if ((req.protocol + "://" + req.get('host') ) == ("http://" + req.get('host'))) {
        User.findOne({ _id: req.query.id }).then(user => {
            if (user) {
                user.isConfirmed = true;
                user.save().then( () => {
                    res.status(200).redirect('http://localhost:3000/login');
                })
            }
            else {
                res.status(400).end("<h1>Bad Request</h1>");
            }
        })    
    }
});

module.exports = router;