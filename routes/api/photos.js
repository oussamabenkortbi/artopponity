const express = require('express')
const router = express.Router()

// Load User model
const Photo = require("../../models/Photo");

router.post('/upload', (req, res) => {

    if (req.body.type === 1 || req.body.type === 2) {
        Photo.findOne({ $and: [ { owner: req.body.owner }, { type: req.body.type } ] })
        .then(photo => {
            if (photo) {
                photo.image = req.body.image;
                photo.save();
            }
            else {
                const newPic = new Photo({
                    owner: req.body.owner,
                    image: req.body.image,
                    type: req.body.type,
                })
                newPic.save()
                    .then(res.json({ success: true }))
            }
        })
    } else if(req.body.type === 3) {
        Photo.find({ $and: [ { owner: req.body.owner }, { type: 3 } ] }, { image: 0 })
        .then(photos => {
            if (photos.length >= 6) {
                res.json({ error: 'cannot add this picture' })
            } else {
                const newPic = new Photo({
                    owner: req.body.owner,
                    image: req.body.image,
                    type: 3,
                })
                newPic.save()
                    .then(res.json({ success: true }))
            }
        })
    }
})

router.post('/getProfilePic', (req, res) => {
    Photo.findOne({ $and: [ { owner: req.body.artist }, { type: 1 } ] })
        .then(photo => res.json({photo}))
    .catch(err => console.log(err))
})
router.post('/getCoverPic', (req, res) => {
    Photo.findOne({ $and: [ { owner: req.body.artist }, { type: 2 } ] })
        .then(photo => res.json({photo}))
    .catch(err => console.log(err))
})
router.post('/getGallery', (req, res) => {
    Photo.find({ $and: [ { owner: req.body.artist }, { type: 3 } ] }, {  }) // _id: 0, owner: 0, type: 0
        .then(photos => res.json({photos}))
        .catch(err => console.log(err))
})

router.post("/edit" , (req, res) => {
    Photo.findOne({ _id: req.body._id })
        .then(photo => {
            photo.image = req.body.image;
            photo.save().then(() => res.json("success")).catch(err => console.log(err))
        })
        .catch(err => { console.log(err) });
});
router.post("/delete" , (req, res) => {
    Photo.deleteOne({ _id: req.body._id })
      .then(res.json("success"))
      .catch(err => { console.log(err) });
});

module.exports = router;