
'use strict';

/**
 * Module dependencies.
 */
var redis  = require('redis');
var logger = require('mm-node-logger')(module);
var config = require('./config');

var redisClient = null;

if(config.redis.isAvailable) {
    redisClient = redis.createClient(config.redis.port, config.redis.host);

    redisClient.auth(config.redis.auth);

    redisClient.on('connect', function () {
        logger.info('Redis connected to ' + config.redis.host + ':' + config.redis.port);
    });

    redisClient.on('error', function (err) {
        logger.error('Redis error: ' + err);
    });
}


module.exports = redisClient;

