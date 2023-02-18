const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  password: String
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;

//สร้าง floder in mongoose