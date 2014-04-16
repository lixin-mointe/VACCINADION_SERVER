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
	modifyInit : function(req, res, next) {
		res.render('information/information_modify.html', {
			title : '资讯维护',
		//	 user : req.session.user, 
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
		 
	//	console.log('-----------limit：'+req.params.limit+' ------pageNum:'+req.params.pageNum);
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
		//if(req.query.limit  != undefined){
			if(req.params.limit  != undefined){
				limit=req.params.limit;
			}
			if(req.params.pageNum  != undefined){
				offset=(req.params.pageNum-1)*limit;
			}else{
				req.params.pageNum=1;
			}
		//}
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
						console.log(items);
						console.log(' count:'+count);
						console.log("pageSize"+pageSize);*/
						 res.send( { 
								'success' : true,
								'items' : items,
								'pageSize' : pageSize ,
								'pageNum' : req.params.pageNum,
								'pageLimit':limit
							});
						});
				});
	       
	},
	create : function(req, res, next) {
		 
		var params = _.pick(req.body, 'id','title', 'sort','soures','pubilshed_date','type','level','introduction','img_url');
		if(params.id==''){
			req.models.information.create(params, function(err, information) {
				
				if (err) {
					if (Array.isArray(err)) {
						//console.log(helpers.formatErrors(err));
						return res.send(200, {
							errors : helpers.formatErrors(err)
						});
					} else {
						return next(err);
					}
				}
				res.send( {
					'success' : true,
					'information'    : information.serialize()
				});
			//	return res.send(200, information.serialize());
			});
		}else{
			req.models.information.get(params.id ,function (err,information) {
				if (err) {
					 res.send( { 
							'success' : false,
							'err' : err
						});
					 
				};
				console.log(information.pubilshed_date);
				information.id=params.id;
				information.title=params.title; 
				information.sort=params.sort;
				information.soures=params.soures;
				information.pubilshed_date=params.pubilshed_date;
				information.type=params.type;
				information.level=params.level;
				information.introduction=params.introduction;
				information.img_url=params.img_url;
				console.log(information.pubilshed_date);
				
				information.save();
				console.log(information.pubilshed_date);
			 
				res.send( {
						'success' : true,
						'information'    : information.serialize()
					});
			});
		}
		
	},
	get : function(req, res, next) {
		 
		if(undefined ==req.params.information_id || null == req.params.information_id      ){
			res.send( { 
				'success' : false,
				'err' : 'not id'
			}); 
		}
 		req.models.information.get( req.params.information_id ,function (err,information) {
			if (err) {
				 res.send( { 
						'success' : false,
						'err' : err
					});
			};
			res.send( {
					'success' : true,
					'information'   : information.serialize()
				});
		});
	},
	remove : function(req, res, next) {
		if(undefined ==req.params.information_id || null == req.params.information_id      ){
			res.send( { 
				'success' : false,
				'err' : 'not id'
			}); 
			//return next();
		}
		req.models.information.find({ 'id': req.params.information_id }).remove(function (err) {
			if (err) {
				 res.send( { 
						'success' : false,
						'err' : err
					});
				return next(err);
			};
			 res.send( { 
					'success' : true
				});
		}); 
	}
};
