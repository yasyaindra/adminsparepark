const mongoose = require("mongoose");
const { urlDb } = require("../config/index.js");

mongoose.connect(urlDb, {
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
