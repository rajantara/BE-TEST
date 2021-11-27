const express = require('express');
const router = express.Router();

const Artikel = require('../models/articles');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try {
    const data = await Artikel.find()
    res.render('index', { data });

  } catch (err) {
    res.status(500).send(err.stack);
  }
});

router.post('/add', async (req, res) => {
  try {
    const artikel = new Artikel({
      namaArtikel: req.body.namaArtikel,
      sumberArtikel: req.body.sumberArtikel,
    });
    await artikel.save();
    res.redirect('/index')
  } catch (err) {
    console.error(err.massage)
  }
});




module.exports = router;

