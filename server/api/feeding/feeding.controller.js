/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/feedings              ->  index
 */

'use strict';
var Feeding = require('./feeding.model');

// Gets a list of Feedings
exports.index = function(req, res) {
  Feeding.find().sort('-timeFed').limit(10).exec(function(err, result) {
    return res.json(result);
  });
};

exports.create = function(req, res) {
  var feeding = new Feeding();
  feeding.timeFed = new Date();
  feeding.save(function(err, result) {
    return res.json(result);
  });
};

exports.getLastFed = function(callback) {
  Feeding.find().sort('-timeFed').limit(1).exec(function(err, result) {
    callback(result[0].timeFed);
  });
};
