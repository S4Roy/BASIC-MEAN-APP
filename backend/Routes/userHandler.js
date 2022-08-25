const express = require("express");
const Users = require("../Models/userModel");
const { authorizer, getHash } = require("../utils/auth");
const router = express.Router();


router.post("/user", (req, res, next) => { next() }, (req, res) => {
  let data = req.body;
  // console.log(data, password);
  getHash(data.password, (hash) => {
    // console.log(hash);
    data.password = hash;
    new Users(data).save((err, doc) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.send(doc);
      }
    });
  });
});


router.patch("/user/:id", authorizer, (req, res) => {
  delete req.body.password;
  Users.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, docs) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(req.body);
      }
    }
  );
});


router.get("/user/:id", authorizer, (req, res) => {
  Users.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: err.message });
    } else {
      delete doc.password;
      res.json(doc);
    }
  });
});

module.exports = router;
