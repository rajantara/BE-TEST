const mongoose = require("mongoose");

const artikelSchema = new mongoose.Schema({
  namaArtikel: {
    type : String,
    required: true,
  },
  sumberArtikel: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("artikel", artikelSchema);

