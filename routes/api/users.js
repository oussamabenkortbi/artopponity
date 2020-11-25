const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateUpdatePassword = require("../../validation/updatePassword");

// Load User model
const User = require("../../models/User");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload with user data
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 1 day in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect"
        return res.status(400).json(errors);
      }
    });
  });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        type: req.body.type,
        isConfirmed: false,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ _id: user._id }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/updatePassword
// @desc Update user
// @access Public
router.post("/updatePassword", (req, res) => {
  // Form validation
  const { errors, isValid } = validateUpdatePassword(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ _id: req.body._id }).then(user => {

    if (!user) {
      return res.status(400).json({ _id: "User is not valid!" });
    }
    
    bcrypt.compare(req.body.oldPassword, user.password).then(isMatch => {
      if (isMatch) {
        // User matched

        const userUpdate = new User({
          password: req.body.password,
          password2: req.body.password2,
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(userUpdate.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(() => {
                errors.changed = "Votre mot de pass à été modifer"
                res.status(400).json(errors);
              })
              .catch(err => console.log(err));
          });
        });

      } else {
        errors.oldPassword = "Password incorrect"
        return res.status(400).json(errors);
      }
    });
  });
});

router.get("/getUsersList", (req, res) => {

  User.find({}, { name: 1, _id: 1, password: 0 })
    .then(user => {
      res.json({
        user
      });
    }
  );
})

router.post("/isConfirmed", (req, res) => {

  User.findOne({ _id: req.body._id }, { isConfirmed: 1 })
    .then(user => {
      res.json({ isConfirmed: user.isConfirmed });
    }).catch(err => console.log(err))
})

module.exports = router;