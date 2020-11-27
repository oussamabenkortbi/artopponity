const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const User = require("../../models/User");

const transporter = nodemailer.createTransport({
  host: 'mail.branchiny.com',
  port: '587',
  auth: {
    user: 'contact',
    pass: 'contactbranchiny2020'
  }
});

router.post('/send', (req, res) => {

    const errors = {}

    const user = {
        _id: req.body._id,
        email: req.body.email
    }
    
    const link = "http://branchiny.com/api/verify?id="
    const payload = {
        id: user._id
    }
    jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 86400 // 1 day in seconds
        },
        (err, token) => {
            mailOptions = {
                from: 'contact@branchiny.com',
                to : user.email,
                subject : "Vérifier votre adresse émail",
                html : "Bonjour,<br>merci de rejoindre á branchiny,<br>Veuillez cliquer sur le lien pour vérifier votre email.<br><a href="+link+token+">Cliquez ici pour vérifier</a><br>Artistiquement votre",
            }
            transporter.sendMail(mailOptions, function(error, info){
                if (error) res.status(400).json(error);
                else {
                    errors.email = "Le mail de confirmation a été envoyé à votre email. si vous ne le trouvez pas, veuillez vérifier la section spam";
                    res.status(400).json(errors)
                }
            });
        }
    )
    
});

router.get('/', (req, res) => {
    const id = (jwt.decode(req.query.id)).id
    
    if ((req.protocol + "://" + req.get('host') ) == ("http://" + req.get('host'))) {
        User.findOne({ _id: id }).then(user => {
            if (user) {
                user.isConfirmed = true;
                user.save().then( () => {
                    res.status(200).redirect('http://branchiny.com/login');
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
                const random = (length = 8) => {
                    // Declare all characters
                    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    // Pick characers randomly
                    let str = '';
                    for (let i = 0; i < length; i++) {
                        str += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return str;
                };

                const tmp = random(14);
                
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(tmp, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user
                        .save()
                        .then(() => {
                            link = "https://branchiny.com/"
                            mailOptions = {
                                from: 'contact@branchiny.com',
                                to : req.body.email,
                                subject : "Mot de pass oublié",
                                html : "Bonjour,<br> Votre mot de passe temporaire est <b>"+tmp+"</b>.<br>Veuillez changer votre mot de passe en moins de 24H. <br><a href="+link+"></a><br>Artistiquement votre"
                            }
                        
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) res.status(400).json(error);
                                else {
                                    errors.email = "Un mot de passe temporaire a été envoyé à votre email, Veuillez changer votre mot de passe en moins de 24H. si vous ne trouvez pas le mail de confirmation sur votre boîte de réception, veuillez vérifier la section spam";
                                    res.status(400).json(errors);
                                }    
                            });
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        })
    .catch((err) => console.log(err))  
});

module.exports = router;