var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv/config");


const port = 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('koneksi berhasil');
});

var indexRouter = require('./routes/users');
var IdRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/api/index', IdRouter);

app.listen(port, () => {
  console.log(`App is listening at http://localhost${port}`)
});

module.exports = app;
