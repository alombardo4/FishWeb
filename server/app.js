/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var request = require('request');
var hardwareController = require('./api/hardware/hardware.controller');
var feedingController = require('./api/feeding/feeding.controller');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

var CronJob = require('cron').CronJob;
//job for updating standard mode
new CronJob('1 */1 * * * *', function(){
	hardwareController.hardware(function(hardware) {

		if (hardware && hardware.state === -1) {
			var time = new Date();
			console.log('Updating standard at: ' + time.getHours() + ':' + time.getMinutes());
			// only on for 10 hours...from 8am to 6pm
			if ((time.getHours() > 17 && time.getHours() <= 18) || (time.getHours() >= 8 && time.getHours() < 9)) {
        //early morning/night -> 8-9am 5-6pm
        updateLight(hardware, 255, 255, 120, 180);
				console.log('Updated to 180 at ' + time.getHours());
      } else if (time.getHours() > 18 || time.getHours() < 8) {
        //late night -> 0-8am, 6-11:59pm
        updateLight(hardware, 255, 255, 120, 0);
				console.log('Updated to 0 at ' + time.getHours());
      } else if (time.getHours() >= 9 && time.getHours() <= 17) {
        //day time -> 9am to 5pm
        updateLight(hardware, 255, 255, 120, 255);
				console.log('Updated to 255 at ' + time.getHours());
      }
		}

	});

}, null, true, "America/New_York");

//job for food flash
new CronJob('*/30 * * * * *', function() {
	hardwareController.hardware(function(hardware) {
		if (hardware && hardware.foodFlash === true) {
			//get last fed time
			feedingController.getLastFed(function(feedTime) {
				var nowTime = new Date();
				var timeDiff = Math.abs(nowTime.getTime() - feedTime.getTime());
				var diffHours = Math.ceil(timeDiff / (1000 * 60 * 60));

				if (diffHours >= 16) {
					//flash lights
					setTimeout(function() {
						updateLight(hardware, 255, 0, 0, 255);
					}, 5);
					setTimeout(function() {
						updateLight(hardware, 0, 0, 255, 255);
					}, 850);
					setTimeout(function() {
						directUpdateLight(hardware, hardware.command);
					}, 1700);
				}
			});
		}


	});
}, null, true, "America/New_York");

function updateLight(hardware, r, g, b, brightness) {
	var command = '0' + ' ' + r + ' ' + g + ' ' + b + ' ' + brightness;
	directUpdateLight(hardware, command);
}

function directUpdateLight(hardware, command) {
	request.post({url:'https://api.particle.io/v1/devices/' + hardware.identifier + '/updateLights?access_token=' + hardware.token,
	 form: {arg:command}},
	 function(err,httpResponse,body) {
		 hardware.state = -1;
		 hardware.save(function(err, hardware) {
		 });
	 });
}

// Expose app
exports = module.exports = app;
