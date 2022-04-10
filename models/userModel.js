// userModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    userid: {type: String, required:true},
    name: {type: String, required:true},
    address: {type: String, required:false},
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

schema.pre('save', function(next) {
  if (!this.createdAt){
    this.createdAt = new Date();
  }else {
    this.updatedAt = new Date();
  }
  next();
});

schema.pre('update', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("users", schema);
