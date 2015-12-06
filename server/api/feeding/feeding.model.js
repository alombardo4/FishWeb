'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var FeedingSchema  = new Schema({
  timeFed: Date
});


module.exports = mongoose.model('Feeding', FeedingSchema);
