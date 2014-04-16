var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
	  	protocol : "mysql", // or "mysql" postgresql
	//    query    : { pool: true },
	    host     : "192.168.1.113",
	    database : "Vaccination",
	    user     : "root",
	    password : "mointe",
	    timezone : "zh"
  },
  tmproot		:'/public/temp', //上传临时目录
  imgroot 		:'/public/img', //图片存储目录
  log 			:'/public/error.log'//程序错误日志，记录

};

module.exports = settings;
