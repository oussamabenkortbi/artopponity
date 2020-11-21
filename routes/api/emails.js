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

router.post('/ForgotPassword', (req, res) => {

    //validate email
    const errors = {}

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                errors.email = "Email is invalid";
                res.status(400).json(errors);
            }    
            else {
                link = "http://" + req.get('host') + "/verify?id=";
            
                mailOptions = {
                    from: 'kortbyoussama@gmail.com',
                    to : req.body.email,
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Password.<br><a href="+link+">Click here to verify</a>" 
                }
            
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) res.status(400).json(error);
                    else res.json('Email sent: ' + info.response)
                });
            }
        })
    .catch((err) => console.log(err))
    
});

router.post('/reset-password', function (req, res) {
    const email = req.body.email
    User
        .findOne({
            where: {email: email},//checking if the email address sent by client is present in the db(valid)
        })
        .then(function (user) {
            if (!user) {
                return throwFailed(res, 'No user found with that email address.')
            }
            ResetPassword
                .findOne({
                    where: {userId: user.id, status: 0},
                }).then(function (resetPassword) {
                if (resetPassword)
                    resetPassword.destroy({
                        where: {
                            id: resetPassword.id
                        }
                    })
                token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
                bcrypt.hash(token, null, null, function (err, hash) { //hashing the password to store in the db node.js
                    ResetPassword.create({
                        userId: user.id,
                        resetPasswordToken: hash,
                        expire: moment.utc().add(config.tokenExpiry, 'seconds'),
                    }).then(function (item) {
                        if (!item)
                            return throwFailed(res, 'Oops problem in creating new password record')
                        let mailOptions = {
                            from: 'kortbyoussama@gmail.com',
                            to: user.email,
                            subject: 'Reset your account password',
                            html: '<h4><b>Reset Password</b></h4>' +
                            '<p>To reset your password, complete this form:</p>' +
                            '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
                            '<br><br>' +
                            '<p>--Team</p>'
                        }
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) res.status(400).json(error);
                            else res.json('Email sent: ' + info.response)
                        });
                    })
                })
            });
        })
})

module.exports = router;