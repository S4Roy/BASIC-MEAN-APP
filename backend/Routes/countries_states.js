const express = require("express");
const { authorizer, getHash } = require("../utils/auth");
const router = express.Router();
const mongoose = require("mongoose");
const Countries = require("../Models/countryModel")
const States = require("../Models/stateModel")

//get country list 
router.get("/countries", (req, res) => {
    Countries.distinct("name", (err, docs) => {
        if (err) {
            res.status(400).send({ message: err.message });
        }
        else {
            var merged = [].concat.apply([], docs);
            res.json(merged);
        }
    })
})

//get States list 
router.get("/states/:country", (req, res) => {
    // let country = new RegExp(decodeURI(req.params.country), "i");
    States.distinct("name", { country_name: req.params.country }, (err, docs) => {
        if (err) {
            res.status(400).send({ message: err.message });
        }
        else {
            res.json(docs);
        }
    })
})

module.exports = router;