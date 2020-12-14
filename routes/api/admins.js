const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateUpdatePassword = require("../../validation/updatePassword");

// Load User model
const Admin = require("../../models/Admin");

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
  Admin.findOne({ email }).then(admin => {
    // Check if admin exists
    if (!admin) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // admin matched
        // Create JWT Payload with admin data
        const payload = {
          id: admin.id,
          name: admin.name,
          email: admin.email
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
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newAdmin = new Admin({
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
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

  Admin.findOne({ _id: req.body._id }).then(admin => {

    if (!admin) {
      return res.status(400).json({ _id: "Admin is not valid!" });
    }
    
    bcrypt.compare(req.body.oldPassword, admin.password).then(isMatch => {
      if (isMatch) {
        // User matched

        const adminUpdate = new Admin({
          password: req.body.password,
          password2: req.body.password2,
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(adminUpdate.password, salt, (err, hash) => {
            if (err) throw err;
            admin.password = hash;
            admin
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

module.exports = router;