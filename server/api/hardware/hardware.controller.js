/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/hardwares              ->  index
 */

'use strict';
var Hardware = require('./hardware.model');
var _ = require('lodash');
// Gets a list of Hardwares
exports.index = function(req, res) {
  Hardware.find().limit(1).sort('-dateCreated').exec(function(err, result) {
    req.hardware = result[0];
    return res.json(req.hardware);

  });
};

exports.create = function(req, res) {
  Hardware.find().limit(1).sort('-dateCreated').exec(function(err, result) {
    req.hardware = result[0];
    if (req.hardware) {
      return res.json(req.hardware);
    } else {
      var hardware = new Hardware(req.body);
      hardware.dateCreated = new Date();
      hardware.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: 'Hardware could not be created'
          });
        } else {
          return res.json(hardware);
        }
      });
    }
  });


};

exports.update = function(req, res) {
  Hardware.find().limit(1).sort('-dateCreated').exec(function(err, result) {
    var hardware = result[0];
    hardware = _.extend(hardware, req.body);
    hardware.save(function(err) {
      if (err) {
        return res.status(400).send({
          message: 'Hardware could not be saved'
        });
      } else {
        return res.json(hardware);
      }
    });
  });

}

/**
 * hardware lookup
 */
exports.hardware = function(callback) {
  Hardware.find().limit(1).sort('-dateCreated').exec(function(err, result) {
    var hardware = result[0];
    callback(hardware);
  });
};
