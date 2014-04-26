var settings = require('../config/settings');
var logger = require('../config/log4js').logger('test');
module.exports = function (req, res, next) {
	
 
	logger.trace('Entering cheese testing');
	logger.debug('Got cheese.');
	logger.info('Cheese is Gouda.');
	logger.warn('Cheese is quite smelly.');
	logger.error('Cheese is too ripe!');
	logger.fatal('Cheese was breeding ground for listeria.');
  res.sendfile(settings.path + '/views/test.html');
};
