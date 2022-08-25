const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 9;
const secreteKey = "subhankarRoy";


function authorizer(req, res, next) {

  const bearerToken = req.headers["authorization"];

  if (bearerToken !== undefined) {

    jwt.verify(bearerToken, secreteKey, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
      } else if (result) {
        let decoded = jwt.decode(bearerToken);
        req.user = decoded.user;
        next()
      }
    });
  } else {
    res.sendStatus(403);
  }
}

function getToken(payload) {
  return jwt.sign(payload, secreteKey);
}


function getHash(password, callback) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      throw err;
    } else {
      callback(hash);
    }
  });
}



exports.getHash = getHash;
exports.authorizer = authorizer;
exports.getToken = getToken;
