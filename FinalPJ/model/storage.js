const mongoose = require('mongoose');

const storage = mongoose.Schema({
  pic: String,
  name: String,
  amount: Number
});

const StorageModel = mongoose.model('Storage', storage);

module.exports = StorageModel;