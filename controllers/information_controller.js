/**
 * information 信息、资讯配置
 */
var _ = require('lodash');
var helpers = require('./_helpers');
var orm = require('orm');
var common = require('../node_modules/sql-query/test/common.js');
 


module.exports = {
	index : function(req, res, next) {
		
		res.render('information/information_list.html', {
			title : '资讯查询',
		//	 user : req.session.user, 
			'items' : ''
			//success : req.flash('success').toString(),
			//error : req.flash('error').toString()
		});

	},

	list : function(req, res, next) {
		/**
		 * 
		 * 	query.query= { type: 1,soures:{'sql_comparator':'like',val: '%1%'}};
		 * 	query.order=['pubilshed_date',"-id"];
		 * 	query.limit={'limit':10,'offset':1};
		 * 
		 */
		var query={};
		var limit=10;
		var offset=0;
		var order={};
		//  req.query.limit.
		if(req.query.query  != undefined){
			query=req.query.query;
		}
		if(req.query.order  != undefined){
			order=req.query.order;
		}
		if(req.query.limit  != undefined){
			if(req.query.limit.limit  != undefined){
				limit=req.query.limit.limit;
			}
			if(req.query.limit.pageNum  != undefined){
				offset=(req.query.limit.pageNum-1)*limit;
			}
		}
		//查询列表
		req.models.information.find().where(query).limit(
				parseInt(limit)).offset(offset)
				.order(order).all(function(err, informations) {
					if (err) {
						return next(err)
					}
					;
					var items = informations.map(function(m) {
						return m.serialize();
					});
					
					 //查询记录数 count
					 req.models.information.count(query ,function (err, count){	
						var pageSize= Math.ceil(count/limit) ;
						if (err) {
							return next(err)
						}
						
						/*console.log("req.query.limit.pageNum："+req.query.limit.pageNum);
						console.log(pageSize+' count:'+count+' limit:'+limit);
						console.log(items);*//*
						console.log(pageSize+' count:'+count+' limit:'+limit);
						console.log("req.query.limit.pageNum"+req.query.limit.pageNum);*/
						 res.send( { 
								'success' : true,
								'items' : items,
								'pageSize' : pageSize ,
								'pageNum' : req.query.limit.pageNum,
								'pageLimit':limit
							});
						});
				});
	       
	},
	create : function(req, res, next) {
		var params = _.pick(req.body, 'title', 'body');
		req.models.information.create(params, function(err, information) {
			if (err) {
				if (Array.isArray(err)) {
					return res.send(200, {
						errors : helpers.formatErrors(err)
					});
				} else {
					return next(err);
				}
			}
			return res.send(200, information.serialize());
		});
	},
	get : function(req, res, next) {

	},
	remove : function(req, res, next) {
		console.log('req.id：'+req.query.id);
		
	 console.log('sss '+ (req.query.id == null  || req.query.id == undefined));
		if(undefined ==req.query.id || null == req.query.id      ){
			res.send( { 
				'success' : false,
				'err' : 'not id'
			}); 
			return next();
		}
		req.models.information.find({ 'id': req.query.id }).remove(function (err) {
		//req.models.information.Remove().where({ 'id': req.id } ).all( req, res, next,function(err) {
		
			if (err) {
				 res.send( { 
						'success' : false,
						'err' : err
					});
				return next(err);
			};
			console.log('wwwwwww');
			 res.send( { 
					'success' : true
				});
		//	list  (req, res, next);
		}); 
	}
};
