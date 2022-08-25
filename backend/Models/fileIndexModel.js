const mongoose = require("mongoose");
var FileIndexSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  fileObjective: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  otherDetails: {
    type: Object,
  },
});

module.exports = mongoose.model("FileIndex", FileIndexSchema);
