const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/articles")
const Coments = require('./models/comments');
require("dotenv/config")

const app = express();

app.use('/', routes);
app.use(app.router);
routes.initialize(app);

//app.use("/articles",articles)
app.use(express.json());

const port = 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.post("/articles", async (req, res) => {
  try {
    console.log("req.body: ", req, body);

    const newArticles = new Articles({
      articlesNameArticles: req.body.articlesNameArticles,
      articlesSumberArticles: req.body.articlesSumberArticles
    });

    await Articles.create(newArticles);
    res.send("Articles added");

  } catch(err) {
    console.log("error: ", err);
  }
})


app.post("/coments", async (req, res) => {
  try {
    console.log("req.body: ", req, body);

    const newArticles = new Articles({
      comentsNew: req.body.comentsNew,
      comentsOld: req.body.comentsOld
    });

    await Coments.create(newComents);
    res.send("Coments added");

  } catch(err) {
    console.log("error: ", err);
  }
})


app.listen(port, () => {
  console.log(`App is listening at http://localhost${port}`)
});

