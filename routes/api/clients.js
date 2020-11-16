const express = require("express");
const router = express.Router();
const Client = require("../../models/Client");

router.post("/addClient", (req, res) => {
  const userKey = new Client({
    _id: req.body._id,
  })
  userKey.save()
    .then(client => res.json(client))
    .catch(err => console.log(err))
})

module.exports = router;