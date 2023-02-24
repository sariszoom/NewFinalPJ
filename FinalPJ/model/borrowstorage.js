const mongoose = require('mongoose');

const borrowstorage = mongoose.Schema({
  Nameuser: String,
  pic: String,
  name: String,
  amount: Number
});

const BorrowStorageModel = mongoose.model('BorrowStorage', borrowstorage);

module.exports = BorrowStorageModel;