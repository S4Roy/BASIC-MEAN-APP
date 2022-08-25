const express = require("express");
const { authorizer } = require("../utils/auth");
const { genFileName } = require("../utils/utils");
const fs = require("fs");
const path = require("path");
const fileIndex = require("../Models/fileIndexModel");
const router = express.Router();

let directories = {
  g: "/../uploadedFiles/",
};

router.post("/uploadFile/:dir/", (req, res) => {
  saveFile(req, res, directories[req.params.dir], (fileName) => {
    req.body.filename = fileName;
    new fileIndex(req.body).save((err, doc) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        // console.log(doc);
        res.send(doc);
      }
    });
  });
});

router.post("/updateFile/:dir/:filename", authorizer, (req, res) => {
  let dir = directories[req.params.dir];
  // console.log(dir);
  saveFile(req, res, dir, (fileName) => {
    req.body.filename = fileName;
    let filePath = __dirname + dir + req.params.filename;
    fileIndex.findOneAndUpdate(
      { id: req.body.id, fileObjective: req.body.fileObjective },
      req.body,
      (err, doc) => {
        if (err) {
          res.status(400).send({ message: err.message });
        } else {
          console.log("deleting file");
          fs.unlink(filePath, () => {
            res.send({ filename: fileName });
          });
        }
      }
    );
  });
});



router.delete("/deleteFile/:dir/:filename", authorizer, (req, res) => {
  let dir = directories[req.params.dir];
  filePath = __dirname + dir + req.params.filename;
  fileIndex.find({ filename: req.params.filename }, (err, doc) => {
    console.log(doc);
  });
  fileIndex.findOneAndRemove({ filename: req.params.filename }, (err, doc) => {
    if (!err) {
      fs.unlink(filePath, () => {
        res.send(doc);
      });
    }
  });
});

router.get("/getFile/:dir/:filename", (req, res) => {
  filePath = __dirname + directories[req.params.dir] + req.params.filename;
  console.log(filePath);
  // fileExtenstion

  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      var stat = fs.statSync(filePath);

      res.setHeader("Content-Length", stat.size);

      switch (path.extname(filePath)) {
        case "pdf":
          res.setHeader("Content-Type", "application/pdf");
          break;
        case "jpeg":
          res.setHeader("Content-Type", "image/jpeg");
          break;
        case "jpg":
          res.setHeader("Content-Type", "image/jpeg");
          break;
        case "png":
          res.setHeader("Content-Type", "image/png");
          break;
        default:
          break;
      }

      var readStream = fs.createReadStream(filePath);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.pipe(res);
    }
  });
});

function saveFile(req, res, directory, callback) {
  // console.log("upload");
  // console.log(req);
  let sampleFile;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  sampleFile = req.files.file;
  fileName = genFileName() + "." + sampleFile.name.split(".").pop(); //keep the extension
  uploadPath = __dirname + directory + fileName;

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("could not save file");
    } else {
      callback(fileName);
    }
  });
}


module.exports = router;
