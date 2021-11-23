var express = require('express');
var router = express.Router();
const Id = require('../models/artikel')



/* GET home page. */
router.get('/', function (req, res, next) {
  Id.find().then((data) => {
    res.json(data)
  }).catch((err) => {
    res.status(500).json(err)
    console.log('data get error', err)
  })
});


router.post('/', function (req, res, next) {
  const { NamaArtikel, SumberArtikel } = req.body;
  Id.create({ NamaArtikel, SumberArtikel }).then((data) => {
    res.status(201).json(data)

  }).catch((err) => {
    res.status(500).json(err)
    console.log('data post error', err)
  })
});



module.exports = router;
