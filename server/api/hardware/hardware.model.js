'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var HardwareSchema  = new Schema({
  name: String,
  token: String,
  identifier: String,
  dateCreated: Date,
  state: Number
});


module.exports = mongoose.model('Hardware', HardwareSchema);
