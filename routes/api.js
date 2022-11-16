const express = require("express");
const { setDriver } = require("mongoose");
const router = express.Router();
const Driver = require("../models/driver");

//read a list of drivers from db
router.get("/driver", function (req, res, next) {
  Driver.aggregate([
    {
      $geoNear: {
        near: {
          type: "point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        spherical: true,
        maxdistance: 100000,
        distanceField: "dist.calulated",
      },
    },
  ]).then(function (ninjas) {
    res.send(ninjas);
  });
  // .then(function (driver) {
  // res.send(driver);
  // });
});

//add a list of drivers from db
router.post("/driver", (req, res, next) => {
  Driver.create(req.body)
    .then(function (ninja) {
      res.send(ninja);
    })
    .catch(next);
});

//update a driver from db
router.put("/driver/:id", (req, res, next) => {
  Driver.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
    Driver.findOne({ _id: req.params.id }).then(function (driver) {
      res.send(driver);
    });
  });
});

//delete drivers from db
router.delete("/driver/:id", (req, res, next) => {
  Driver.findByIdAndRemove({ _id: req.params.id }).then(function (driver) {
    res.send(driver);
  });
});

module.exports = router;
