/**
 * New node file
 */
/*
 var log4js = require('log4js'); 
log4js.configure({
	  appenders: [
	    { type: 'console' },
	    { type: 'file', filename: 'logs/cheese.log',
	    	 maxLogSize:1024 ,backups:2}
	  ]
	});

var logger = log4js.getLogger('cheese');
logger.setLevel('ERROR');

*/
/////////////////////

var express  = require('express');
var log4js = require('log4js'); 


log4js.configure({
	  appenders: [
	    { type: 'console' },
	    { type: 'file', filename: 'logs/cheese.log',
	    	 maxLogSize:1024 ,backups:2}
	  ]
	});


var logger = log4js.getLogger('log4js');
logger.setLevel('ERROR');
module.exports = function (app) {
	app.configure(function () {
		app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
		app.use(app.router);
	});
}
 
module.exports.logger=function(name){
	logger = log4js.getLogger(name);
	logger.setLevel('ERROR');
	  return logger;
}
