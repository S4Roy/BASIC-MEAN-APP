const mongoose = require("mongoose");
var StateSchema = new mongoose.Schema({
    id: String,
    name: String,
    country_id: String,
    country_name: String,
    statecode: String,
});

module.exports = mongoose.model("states", StateSchema);
