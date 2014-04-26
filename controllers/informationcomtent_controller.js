/**
 * informationcomtent 息信、资讯内容段落
 */
var _ = require('lodash');
var helpers = require('./_helpers');
var orm = require('orm');
var logger = require('../config/log4js').logger('informationcomtent_controller');
module.exports = {
	list : function(req, res, next) {
		
		 
		if(undefined ==req.params.pid || null == req.params.pid      ){
			res.send( { 
				'success' : false,
				'err' : 'not pid'
			}); 
			//return next();
		}
		
		req.models.informationcomtent.find({
			'information_id' : req.params.pid
		}).order(['sort']).all(function(err, informationcomtents) {
			if (err) {
				logger.error(err);
				res.send( { 
					'success' : false ,
					 'err':err
				});
				req.db.close();
				//return next(err);
			}
			var items = informationcomtents.map(function(m) {
				return m.serialize();
			});
			//console.log(items);
			 res.send( { 
					'success' :  true,
					'items' : items
				});
			 req.db.close();
		});

	},
	remove : function(req, res, next) {
		if(undefined ==req.params.itemId || null == req.params.itemId      ){
			res.send( { 
				'success' : false,
				'err' : 'not id'
			}); 
		}
		req.models.informationcomtent.find({ 'id': req.params.itemId }).remove(function (err) {
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
	saveOrUpdate : function(req, res, next) {
		var params = _.pick(req.body, 'id','information_id', 'sort','comtent','style','img_url');
		 
		var t=req.body;
		if(params.id == ''){
			req.models.informationcomtent.create(params, function(err, informationcomtent) {
				if (err) {
					logger.error(err);
					if (Array.isArray(err)) {
						return res.send(200, {
							errors : helpers.formatErrors(err)
						});
					} else {
						return next(err);
					}
				}
				res.send( {
					'success' : true,
					'informationcomtent'    : informationcomtent.serialize()
				});
				req.db.close();
			});
		}else{
			
			req.models.informationcomtent.get(params.id ,function (err,informationcomtent) {
				if (err) {
					logger.error(err);
					 res.send( { 
							'success' : false,
							'err' : err
						});
				};				
				informationcomtent.id=params.id;
				informationcomtent.information_id=params.information_id; 
				informationcomtent.sort=params.sort;
				informationcomtent.comtent=params.comtent;
				informationcomtent.style=params.style;
				informationcomtent.img_url=params.img_url;
				informationcomtent.save();
				//console.log(information.pubilshed_date);
			 
				res.send( {
						'success' : true,
						'informationcomtent'    : informationcomtent.serialize()
					});
				req.db.close();
			});
		}
	},
	get : function(req, res, next) {

	}
};
