const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  articlesNameArticles: {
    type: String,
    required: true,
    unique: true,
  },
  articlesSumberArticles: {
    type: String,
    required: true,
    unique: true,
  },
});

const Articles = mongoose.model("articles", articlesSchema);

module.exports = Articles;
