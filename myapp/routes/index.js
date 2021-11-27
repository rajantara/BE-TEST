const express = require('express');
const router = express.Router();

const Artikel = require('../models/articles');
const Coments = require('../models/comments');

/* GET users listing. */
router.get('/artikel', async(req, res, next) => {
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
    res.send('artikel add')
  } catch (err) {
    console.error('error boss'+err)
  }
});


// get comments
router.get('/coments', async(req, res, next) => {
  try {
    const data = await Coments.find()
    res.render('index', { data });

  } catch (err) {
    res.status(500).send(err.stack);
  }
});

router.post('/addcoments', async (req, res) => {
  try {
    const coments = new Coments({
      comentNew: req.body.comentsNew,
      comentsOld: req.body.comentsOld,
    });
    await coments.save();
    res.send('coments add')
  } catch (err) {
    console.error('error boss'+err)
  }
});





module.exports = router;

