/**
 * information 信息、资讯配置
 */
var _       = require('lodash');
var helpers = require('./_helpers');
var orm     = require('orm');
/*var common     = require('../node_modules/orm/node_modules/sql-query/lib/Comparators');
console.log(common.Query.lt(1));*/
module.exports = {
  list: function (req, res, next) {
	  // limit() 全部
	  //order('id') 根据id排序 -id 倒序
	  //find({'id':1})
	  //where({'body':'高规格月'}).
	  
	 /* var tmp=req.query;
	 console.log("------ query");
	 
	 
	  console.log("000000000000000000000 tmp "+tmp);
	  for(var i in tmp ){ 
	  console.log("i="+i+"  ;tmp="+tmp[i]);
      }*/
 
   
	  
	  
    req.models.information.find().where(req.query).limit().order('-pubilshed_date').all(function (err, informations) {
    	
      if (err) {
    	  return next(err)
      };
      var items = informations.map(function (m) {
          return m.serialize();
        });

      res.send({ items: items });
    });
  },
  create: function (req, res, next) {
    var params = _.pick(req.body, 'title', 'body');
    req.models.information.create(params, function (err, information) {
      if(err) {
        if(Array.isArray(err)) {
          return res.send(200, { errors: helpers.formatErrors(err) });
        } else {
          return next(err);
        }
      }
      return res.send(200, information.serialize());
    });
  },
  get: function (req, res, next) {

  }
};
