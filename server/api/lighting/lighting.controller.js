/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lightings              ->  index
 */

'use strict';
var hardwareController = require('../hardware/hardware.controller');
var Hardware = require('../hardware/hardware.model');
var request = require('request');
// Gets a list of Lightings
exports.index = function(req, res) {
  res.json([]);
};


exports.sendLighting = function(req, res) {
  if (req.body.mode !== -1) {
    var command = req.body.mode + ' ' + req.body.r + ' ' + req.body.g + ' ' + req.body.b + ' ' + req.body.brightness;
    hardwareController.hardware(function(hardware) {
      request.post({url:'https://api.particle.io/v1/devices/' + hardware.identifier + '/updateLights?access_token=' + hardware.token,
       form: {arg:command}},
       function(err,httpResponse,body) {
         hardware.state = req.body.mode;
         hardware.save(function(err, hardware) {
           return res.send(hardware);
         });
       });



    });
  } else {
    hardwareController.hardware(function(hardware) {
      hardware.state = req.body.mode;
      var time = new Date();
      console.log(time.getHours() + ':' + time.getMinutes());

      if ((time.getHours() > 2 && time.getHours() <= 6) || time.getHours() >= 20) {
        //early morning/night
        updateLight(hardware, 255, 255, 120, 100);
      } else if (time.getHours() >= 0 && time.getHours() <= 2) {
        //late night
        updateLight(hardware, 255, 255, 120, 25);
      } else if (time.getHours() >= 7 && time.getHours() <= 19) {
        //day time
        updateLight(hardware, 255, 255, 120, 255);
      }
      hardware.save(function(err, hardware) {
        return res.send(hardware);
      });



    });
  }


}
function updateLight(hardware, r, g, b, brightness) {
	var command = '0' + ' ' + r + ' ' + g + ' ' + b + ' ' + brightness;
	request.post({url:'https://api.particle.io/v1/devices/' + hardware.identifier + '/updateLights?access_token=' + hardware.token,
	 form: {arg:command}},
	 function(err,httpResponse,body) {
		 hardware.state = -1;
		 hardware.save(function(err, hardware) {
		 });
	 });
}
