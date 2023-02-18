const mongoose = require('mongoose');

const storage = mongoose.Schema({
  itempic: String,
  itemname: String,
  itemamount: String
});

const StorageModel = mongoose.model('Storage', storage);

module.exports = StorageModel;