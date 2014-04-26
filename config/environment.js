var path     = require('path');
var express  = require('express');
var settings = require('./settings');
var models   = require('../models/');
var  partials = require('express-partials');
module.exports = function (app) {
    app.configure(function () {
	//设置 ejs映射 html 文件
	app.set('view engine', 'html');
	app.engine('.html', require('ejs').__express);
	
    app.use(express.static(path.join(settings.path, 'public')));
    app.use(express.logger({ format: 'dev' }));
    //app.use(express.bodyParser());
    app.use(partials());
   /* console.log("```````__dirname:"+__dirname);
    console.log("当前执行的工作目录,",process.cwd());*/
    app.use(express.bodyParser({uploadDir:  process.cwd()+settings.tmproot ,keepExtensions: true}));
    app.use(express.methodOverride());
    app.use(function (req, res, next) {
      models(function (err, db) {
    	  if (err) return next(err);

        req.models = db.models;
        req.db     = db;
        return next();
      });
    }),
    app.use(app.router);
  });
};
