const mongoose = require('mongoose');

const borrowstorage = mongoose.Schema({
  Nameuser: String,
  name: String,
  amount: Number
});

const BorrowStorageModel = mongoose.model('BorrowStorage', borrowstorage);

module.exports = BorrowStorageModel;