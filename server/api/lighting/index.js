'use strict';

var express = require('express');
var controller = require('./lighting.controller');

var router = express.Router();

// router.get('/', controller.index);
router.post('/', controller.sendLighting);
router.get('/', controller.currentLighting);
module.exports = router;
