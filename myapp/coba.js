const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const moment = require('moment');

const Magang = require('../models/DataMagang');
const Divisi = require('../models/divisi');


/* GET users listing. */
router.get('/', auth, async (req, res, next) => {
  try {
    const data = await Magang.find()
      .populate('divisi', ['nama_divisi'])
      .sort({ nama: 'asc' });

    res.render('magang/index', { data, loginUser: req.user });
  } catch (err) {
    res.status(500).send(err.stack);
  }
});

//router for add
router.get('/new', auth, async (req, res) => {
  try {
    if (req.user.role === 'OP') {
      return res.redirect('/index')
    }

    const divisis = await Divisi.find();
    const namaDivisi = divisis.map((divisi) => divisi.nama_divisi);

    res.render('magang/new', {
      loginUser: req.user,
      nama: '',
      alamat: '',
      universitas: '',
      jurusan: '',
      semester: '',
      devisi: '',
      mulai: '',
      berakhir: '',
      status: '',
      namaDivisi,
    })
  } catch (err) {
    console.error(err.message)
  }
})

router.post('/add', auth, async (req, res) => {
  try {
    if (req.user.role === 'OP') {
      return res.redirect('/index')
    }
    const magang = new Magang({
      nama: req.body.nama,
      alamat: req.body.alamat,
      universitas: req.body.universitas,
      jurusan: req.body.jurusan,
      semester: req.body.semester,
      devisi: req.body.devisi,
      mulai: req.body.mulai,
      berakhir: req.body.berakhir,
      status: 'Aktif',
      nama_divisi: req.body.nama_divisi,
    });
    await magang.save();
    res.redirect('/index')
  } catch (err) {
    console.error(err.message)
  }
});


//router for edit data
router.get('/edit/:id', auth, async (req, res) => {
  try {
    if (req.user.role === 'OP') {
      return res.redirect('/index');
    }

    const magang = await Magang.findById(req.params.id).populate('divisi', ['nama_divisi']);

    const divisis = await Divisi.find();
    const namaDivisi = divisis.map((divisi) => divisi.nama_divisi);

    if (!magang) {
      return res.redirect('/index');
    }

    let {
      _id,
      nama,
      alamat,
      universitas,
      jurusan,
      semester,
      devisi,
      mulai,
      berakhir,
      status,
      nama_divisi,
    } = magang;

    res.render('magang/edit', {
      loginUser: req.user,
      _id,
      nama,
      alamat,
      universitas,
      jurusan,
      semester,
      devisi,
      mulai,
      berakhir,
      status,
      namaDivisi,
      nama_divisi,
      msg: [],
    });
  } catch (err) {
    res.status(500).send(err.stack);
  }
});

router.put('/edit/:id', auth, async (req, res) => {
  try {
    if (req.user.role === 'OP') {
      return res.redirect('/magang');
    }
    let {
      _id,
      nama,
      alamat,
      universitas,
      jurusan,
      semester,
      devisi,
      mulai,
      berakhir,
    } = req.body;

    const msg = [];

    if (nama === '') msg.push('nama tidak boleh kosong!');
    if (alamat === '') msg.push('nama tidak boleh kosong!');
    if (universitas === '') msg.push('nama tidak boleh kosong!');
    if (jurusan === '') msg.push('nama tidak boleh kosong!');
    if (semester === '') msg.push('nama tidak boleh kosong!');
    if (devisi === '') msg.push('nama tidak boleh kosong!');
    if (mulai === '') msg.push('nama tidak boleh kosong!');
    if (berakhir === '') msg.push('nama tidak boleh kosong!');

    if (msg.length > 0) {
      return res.render('index/edit', {
        loginUser: req.user,
        _id,
        nama,
        alamat,
        universitas,
        jurusan,
        semester,
        devisi,
        mulai,
        berakhir,
        msg,
      });
    }

    let NewMagang = await Magang.findOne({ _id });
    if (NewMagang && nama !== req.params.nama) {
      return res.render('index/edit', {
        loginUser: req.user,
        _id,
        nama,
        alamat,
        universitas,
        jurusan,
        semester,
        devisi,
        mulai,
        berakhir,
        msg: [...msg, 'Kode nama ini sudah terdaftar!'],
      });
    }

    const magang = await Magang.findOne({ _id: req.params.id });

    magang.nama = nama;
    magang.alamat = alamat;
    magang.universitas = universitas;
    magang.jurusan = jurusan;
    magang.semester = semester;
    magang.devisi = devisi;
    magang.mulai = mulai;
    magang.berakhir = berakhir;

    await magang.save();
    res.redirect('/index');
  } catch (err) {
    console.error(err.message);
  }
});

//router for detail data
router.get('/detail/:nama', auth, async (req, res) => {
  try {
    const data = await Magang.findOne({ nama: req.params.nama })

    if (!data) {
      return res.redirect('/index')
    }
    res.render('magang/detail', { data, msg: '', loginUser: req.user, moment });
  } catch (err) {
    console.error(err.stack);
  }
})



//non aktif magang
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role === 'OP') {
      return req.redirect('/index');
    }
    const magang = await Magang.findOne({ _id: req.params.id });
    magang.status = 'Non-Aktif',

      await magang.save();
    res.redirect('/index');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;