/**
 * 服务启动入口
 */
var path        = require('path');
var express     = require('express');
var colors      = require('colors')
//数据库配置文件
var settings    = require('./config/settings');
//环境配置
var environment = require('./config/environment');
//路由分发配置
var routes      = require('./routes/routes');
//数据模型
var models      = require('./models/');
//日志记录 
var log4js      = require('./config/log4js');
module.exports.start = function (done) {
  var app = express();
  environment(app);
  routes(app);
  log4js(app);
  app.listen(settings.port, function () {
    console.log( ("Listening on port " + settings.port).green );

    if (done) {
      return done(null, app, server);
    }
  }).on('error', function (e) {
	  
	  log4js.logger('server').error('err:'+e);
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use. Is the server already running?'.red);
    }
    if (done) {
      return done(e);
    }
  });
}

// If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
  module.exports.start()
}
