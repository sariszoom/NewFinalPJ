const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storageSchema = new Schema({
  nameitem: String,
  amountitem: Int32Array
});

const StorageModel = mongoose.model('Storage', storageSchema);

module.exports = StorageModel;