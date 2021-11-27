const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:ZYVX6D4SZFepsAM3@cluster0.weqqq.mongodb.net/AppdbretryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('database not connect'+err);
  }
};

module.exports = connectDB;