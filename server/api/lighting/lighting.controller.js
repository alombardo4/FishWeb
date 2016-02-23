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
         hardware.command = command;
         hardware.save(function(err, hardware) {
           return res.send(hardware);
         });
       });



    });
  } else {
    hardwareController.hardware(function(hardware) {
      hardware.state = req.body.mode;
      var time = new Date();

      if ((time.getHours() > 18 && time.getHours() <= 23) || (time.getHours() >= 6 && time.getHours() < 8)) { //6pm to 11pm and 6am to 8am
        //early morning/night
        updateLight(hardware, 255, 255, 120, 180);
      } else if (time.getHours() > 23 && time.getHours() <= 6) { //11pm to 6am
        //late night
        updateLight(hardware, 255, 255, 120, 0);
      } else if (time.getHours() >= 8 && time.getHours() <= 18) { //8 am to 6pm
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
