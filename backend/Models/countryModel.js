const mongoose = require("mongoose");
var CountrySchema = new mongoose.Schema({
    id: String,
    name: String,
    phone_code: String,
    capital: String,
    currency: String,
    currency_name: String,
    currency_symbol: String,
    region: String,
    subregion: String,
    timezones: String,
    emoji: String,
});

module.exports = mongoose.model("countrie", CountrySchema);
