const mongoose = require('mongoose');

const artikelSchema = new mongoose.Schema({
    NamaArtikel: String,
    SumberArtikel: String,
});

module.exports = mongoose.model('artikel', artikelSchema);