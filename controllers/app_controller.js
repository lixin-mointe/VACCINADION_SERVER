/**
 * information 信息、资讯配置
 */
var _ = require('lodash');
var helpers = require('./_helpers');
var orm = require('orm');
var common = require('../node_modules/sql-query/test/common.js');

module.exports = {
	get : function(req, res, next) {
		//'{ __sql: [["version = ?", ["(SELECT MAX(id) from appVersion)"]]] }'
		req.models.appversion.find().where(' version= (SELECT MAX(id) from appversion) ') 
				 .all(function(err, appversion) {
					  	appversion.map(function(m) {
						// console.log(m.serialize());
					  		v=m.serialize();
					  		 var r='<?xml version="1.0" encoding="utf-8"?>'+
								'<info><version>'+v.version+'</version>'+
								'<url>'+v.up_url+'</url>'+
								'</info>';
								res.writeHead('200', {
									"Content-Type" : "xml/plain"
								});
							 
								res.write(r);
								res.end(); 
						}); 
					 
					 
					 
					
				});
		//console.log(11111111111);
		
	 
	} 
};