const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comentsSchema = new Schema({
  comentsNew: {
    type: String,
    required: true,
    unique: true,
  },
  comentsOld: {
    type: String,
    required: true,
    unique: true,
  },
});

const Coments = mongoose.model("coments", comentsSchema);

module.exports = Coments;
