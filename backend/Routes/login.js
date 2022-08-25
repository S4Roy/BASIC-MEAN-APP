const express = require("express");
const Users = require("../Models/userModel");
const { getToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const { isEmail } = require("../utils/utils");
const router = express.Router();


router.post("/login", (req, res) => {
  data = req.body;
  let filter = {};

  if (isEmail(data.email)) {
    filter = { email: data.email };
  } else {
    res.status(400).send({ message: "email is not valid" });
    return;
  }

  Users.findOne(filter, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      if (!doc) {
        res.status(401).send({ message: "Invalid password or email" });
        // console.log("here");
      } else {
        bcrypt.compare(data.password, doc.password, (err, result) => {
          if (err) {
            res.status(401).send({ message: "Invalid password or email" });
          } else if (result) {
            let user = {};
            user.fullname = doc.firstname + ' ' + doc.lastname;
            user.mobile = doc.mobile;
            user.profilePic = doc.profilePic;
            user.email = doc.email;
            user._id = doc._id;
            console.log("user", user);

            let payload = { user: user };
            let token = getToken(payload);
            res.status(200).send({ token: token, user: user });

          } else {
            res.status(401).send({ message: "Invalid password or email" });
          }
        });
      }
    }
  });
});


module.exports = router;
