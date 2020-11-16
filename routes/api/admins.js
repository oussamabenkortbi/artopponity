const express = require("express");
const router = express.Router();

// Load User model
const Admin = require("../../models/Admin");

router.post("/addCommande" , (req, res) => {

});

router.post("/getCommandes" , (req, res) => {

});

router.post("/addAdmin", (req, res) => {
  const userKey = new Admin({
    _id: req.body._id,
  })
  userKey.save()
    .then(admin => res.json(admin))
    .catch(err => console.log(err))
})

module.exports = router;