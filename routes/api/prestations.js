const express = require("express");
const router = express.Router();

// Load User model
const Prestation = require("../../models/Prestation");

router.post("/add", (req, res) => {
    const newPrestation = new Prestation({
      owner: req.body._id,
      name: req.body.name,
      description: req.body.description,
      time: req.body.time,
      price: req.body.price,
      artists: req.body.artists,
      space: req.body.space,
      prepareTime: req.body.prepareTime,
    })
    newPrestation.save()
      .then(prestations => res.json(prestations))
      .catch(err => console.log(err))
});

router.post("/update", (req, res) => {
  Prestation.findOne({ _id: req.body._id })
    .then(prestation => {
      prestation.name = req.body.name;
      prestation.time = req.body.time;
      prestation.description = req.body.description;
      prestation.price = req.body.price;
      prestation.artists = req.body.artists;
      prestation.space = req.body.space;
      prestation.prepareTime = req.body.prepareTime;
      prestation
        .save()
          .then(prestation => res.json(prestation))
            .catch(err => console.log(err));
    })
});

router.post("/get" , (req, res) => {
    Prestation.find({ owner: req.body._id })
        .then(prestations => { res.json({prestations}) })
        .catch(err => { console.log(err) });
});

router.post("/deletePresation" , (req, res) => {
    Prestation.deleteOne({ _id: req.body._id })
      .then(res.json("success"))
      .catch(err => { console.log(err) });
});

module.exports = router;