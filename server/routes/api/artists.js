const express = require("express");
const router = express.Router();
const Artist = require("../../models/Artist");

router.post("/addArtist", (req, res) => {
  const userKey = new Artist({
    _id: req.body._id,
    phoneNumber: req.body.phoneNumber,
    isValid: req.body.isValid
  })
  userKey.save()
    .then(artist => res.json(artist))
    .catch(err => console.log(err))
})

router.post("/registerArtist" , (req, res) => {
  Artist.findOne({ _id: req.body._id }).then( artist => {
    if (!artist) {
      const newArtist = new Artist({
        _id: req.body._id,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        description: req.body.description,
        wilaya: req.body.wilaya,
        type: req.body.type,
        isValid: false,
      });
      newArtist.save()
        .then(artist => res.json(artist))
        .catch(err => console.log(err));
    } else {
      if (req.body.eventType) artist.eventType = req.body.eventType
      if (req.body.fullName) artist.fullName = req.body.fullName;
      if (req.body.phoneNumber) artist.phoneNumber = req.body.phoneNumber;
      if (req.body.description) artist.description = req.body.description;
      if (req.body.wilaya) artist.wilaya = req.body.wilaya;
      if (req.body.type) artist.type = req.body.type;
      if (req.body.isValid) artist.isValid = req.body.isValid;
      artist
        .save()
          .then(() => res.json("success!!"))
            .catch(err => console.log(err));
    }
  });
})

router.post("/getInfoArtists", (req, res) => {
  Artist.findOne({ _id: req.body._id }).then(artist => {
    res.json({
      vide: 1,
      artist
    });
  });
})

router.post("/getArtistsProgress", (req, res) => {
  Artist.findOne({ _id: req.body._id }).then(artist => {
    let progress = 0;
      if (artist.fullName) progress = progress + 10;
      if (artist.description) progress = progress + 10;
      if (artist.wilaya) progress = progress + 10;
      if (artist.type) progress = progress + 10;
      if (artist.description) progress = progress + 10;
      if (artist.isValid) progress = progress + 10;
    res.json({ progress: progress })
  });
})

router.get("/getArtistList", (req, res) => {
  Artist.find({ 
    $and: [ 
      { fullName: {$ne: ''} }, 
      { description: {$ne: ''} }, 
      { wilaya: {$ne: ''} }, 
      { type: {$ne: ''} }, 
      { isValid: true }, 
    ]}, {})
    .then(artists => { res.json({ artists }); });
})

router.post("/FindArtist", (req, res) => {
  Artist.find({ 
    $and: [ 
      { wilaya: req.body.wilaya }, 
      { type: req.body.type },
    ]}, {_id: 0, __v: 0})
    .then(artist => { res.json({ artist }) });
})

module.exports = router;