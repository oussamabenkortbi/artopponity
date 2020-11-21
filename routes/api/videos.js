const express = require("express");
const router = express.Router();

// Load User model
const Video = require("../../models/Video");

router.post("/add", (req, res) => {
    const newVideo = new Video({
      owner: req.body._id,
      embed: req.body.embed,
    })
    newVideo.save()
      .then(video => res.json(video))
      .catch(err => console.log(err))
});

router.post("/update", (req, res) => {
    Video.findOne({ _id: req.body._id }) //find video id
    .then(video => {
      video.embed = req.body.embed;
      video
        .save()
          .then(video => res.json(video))
            .catch(err => console.log(err));
    })
});

router.post("/delete", (req, res) => {
    Video.deleteOne({ _id: req.body._id })
      .then(res.json("success"))
      .catch(err => { console.log(err) });
});

router.post("/get" , (req, res) => {
    Video.find({ owner: req.body._id })
      .then(videos => { res.json({videos}) })
      .catch(err => { console.log(err) });
});
router.post("/getVideo" , (req, res) => {
    Video.findOne({ _id: req.body._id })
      .then(videos => { res.json({videos}) })
      .catch(err => { console.log(err) });
});

module.exports = router;