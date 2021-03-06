/**
 * informationfeedback 反馈信息
 */
var _ = require('lodash');
var helpers = require('./_helpers');
var orm = require('orm');
var logger = require('../config/log4js').logger('informationfeedback_controller');

module.exports = {
	list : function(req, res, next) {
		var query={};
		var limit=10;
		var offset=0;
		var order={};
		if(req.query.query  != undefined){
			query=req.query.query;
		}
		if(req.query.order  != undefined){
			order=req.query.order;
		}
			if(req.params.limit  != undefined){
				limit=req.params.limit;
			}
			if(req.params.pageNum  != undefined){
				offset=(req.params.pageNum-1)*limit;
			}else{
				req.params.pageNum=1;
			}
		//查询列表
		req.models.informationfeedback.find().where(query).limit(parseInt(limit)).offset(offset)
				.order(order).all(function(err, informations) {
					if (err) {
						logger.error(err);
						return next(err)
					}
					var items = informations.map(function(m) {
						return m.serialize();
					});
					 //查询记录数 count
					 req.models.informationfeedback.count(query ,function (err, count){	
						var pageSize= Math.ceil(count/limit) ;
						if (err) {
							return next(err)
						}
						 res.send( { 
								'success' : true,
								'items' : items,
								'pageSize' : pageSize ,
								'pageNum' : req.params.pageNum,
								'pageLimit':limit
							});
						 req.db.close();
						});
				});

	},
	remove : function(req, res, next) {
		if(undefined ==req.params.itemId || null == req.params.itemId      ){
			res.send( { 
				'success' : false,
				'err' : 'not id'
			}); 
		}
		req.models.informationfeedback.find({ 'id': req.params.id }).remove(function (err) {
			if (err) {
				logger.error(err);
				 res.send( { 
						'success' : false,
						'err' : err
					});
				return next(err);
			};
			 res.send( { 
					'success' : true
				});
			 req.db.close();
		}); 
	},
	save : function(req, res, next) {
		var params = _.pick(req.body,  'comtent', 'contact','app_version','create_date');
		/*for(var i in params){
			console.log('params.'+i+':'+params[i]);
		}
		*/
		 
			req.models.informationfeedback.create(params, function(err, informationfeedback) {
				if (err) {
					logger.error(err);
						return res.send(500,{
							'success' : false,
							 errors   : helpers.formatErrors(err)
						});
				 
				}
				res.send( {
					'success' : true,
					'informationfeedback'    : informationfeedback.serialize()
				});
				req.db.close();
			});
		 
	},
	get : function(req, res, next) {
		if(undefined ==req.params.id || null == req.params.id      ){
			res.send( { 
				'success' : false,
				'err' : 'not id'
			}); 
		}
 		req.models.informationfeedback.get( req.params.id ,function (err,informationfeedback) {
			if (err) {
				logger.error(err);
				 res.send( { 
						'success' : false,
						'err' : err
					});
			};
			if(undefined==informationfeedback){
				res.send( {
					'success' : false,
					'err' : 'not id'
				});
				req.db.close();
			}else{
				res.send( {
					'success' : true,
					'informationfeedback'   : informationfeedback.serialize()
				});
				req.db.close();
			}
			
		});
	}
};
