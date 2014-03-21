/**
 * information 信息、资讯配置
 */
var _       = require('lodash');
var helpers = require('./_helpers');
var orm     = require('orm');
var common     = require('../node_modules/sql-query/test/common.js');
//var common     = require('./common.js');
module.exports = {
  list: function (req, res, next) {
	//  console.log("LIST-----");
	  // limit(2) 全部 offset(1) limit后面跟的是2条数据，offset后面是从第1条开始读取 开始时0
	  //order('id') 根据id排序 -id 倒序
	  //find({'id':1})
	  //where({'body':'高规格月'}).
	  
	 /* var tmp=req.query;
	 console.log("------ query");
	 
	 
	  console.log("000000000000000000000 tmp "+tmp);
	  for(var i in tmp ){ 
	  console.log("i="+i+"  ;tmp="+tmp[i]);
      }*/
 
	 
	  
		
		/*  var yy={ id: common.Query.lte('1') };*/
		//  var y= common.Query.lte('1') ;
		 /* for(var i in yy){
			 // console.log("i:"+i+"-------yy[i]:"+yy[i]);
			  var yi=yy[i];
			  
			  console.log("sql_comparator:"+yi.sql_comparator);
			  console.log("tag:"+yi.sql_comparator());
			  
			  for(var ii in yi){
				  console.log("ii:"+ii+"-------yy[i]:"+yi[ii]); 
			  }
		  }*/
		  /*var yy= { id: common.Query.lte('1') };;
		  console.log(yy.id); 
		  console.log(yy.id.sql_comparator); 
		  console.log (Object.getOwnPropertyDescriptor(yy.id, 'sql_comparator'))
		  */
		
		/*  var y= req.query;
			  console.log(req.query.id); 
			  console.log(req.query.id.sql_comparator); 
			  console.log (Object.getOwnPropertyDescriptor(y, 'id'))
			  */
			  
		//////////////
		  /**
		   * 创建 查询对象 obj
		   * 	val ：写死， 值 可定义
		   * 	'sql_comparator' 写死
		   * 	'lte' ：运算符
		   */
		  /*var obj={ val: 1 };
			Object.defineProperty(obj, "sql_comparator", {
				configurable : false,
				enumerable   : false,
				value        : function () { return 'lte'; }
			});
			var q={};
			q.id=obj;
			var arr = Object.keys(q);  pubilshed_date
			console.log ("qqqq:"+arr);*/
	// console.log("req.query.limit.limit:"+req.query.limit.limit);
	 
	 
	 req.query.order=['pubilshed_date','-sort'];
	 
	/* req.query.order='-id';
	 req.query.order='-sort';*/
	 //{'str' :["id", 'pubilshed_date']};
	 //req.query.order={'str' :[{'id':'a','pubilshed_date':'z'}]};
			//req.query.level=1;
	//req.models.information.find().where(q ).limit().order('-pubilshed_date').all(function (err, informations) {
    // req.models.information.find().where(req.query.query).limit(req.query.limit).offset(req.query.offset).order(req.query.order).all(function (err, informations) {
    req.models.information.find().where(req.query.query).limit(parseInt(req.query.limit.limit))
    .offset(req.query.limit.offset)
    //.order('pubilshed_date','z')
    .order(req.query.order)
   // .order(req.query.order[1])
    //.order(req.query.order[2])
    .all(function (err, informations) {
      if (err) {
    	  return next(err)
      };
      var items = informations.map(function (m) {
          return m.serialize();
        });
    //  console.log(items);
     // res.send({'success':{ id: common.Query.lte('1') }});
       res.send({'success':items});
   //   res.send({ items: items });
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
