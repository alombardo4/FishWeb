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
new CronJob('1 */5 * * * *', function(){
	hardwareController.hardware(function(hardware) {

		if (hardware && hardware.state === -1) {
			var time = new Date();
			console.log('Updating standard at: ' + time.getHours() + ':' + time.getMinutes());
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
		}

	});

}, null, true, "America/New_York");


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

// Expose app
exports = module.exports = app;
