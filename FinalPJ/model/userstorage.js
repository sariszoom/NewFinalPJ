const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStorageSchema = new Schema({
  name: String,

  pic: String,
  name: String,
  amount: Number
});

const UserStorageModel = mongoose.model('UserStorage', UserStorageSchema);

module.exports = UserStorageModel;