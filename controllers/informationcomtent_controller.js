/**
 * informationcomtent 息信、资讯内容段落
 */
var _       = require('lodash');
var helpers = require('./_helpers');
var orm     = require('orm');

module.exports = {
  list: function (req, res, next) {

    req.models.informationcomtent.find().limit().order('-sort').all(function (err, informationcomtents) {
      if (err) {
    	  return next(err)
      };
      var items = informationcomtents.map(function (m) {
          return m.serialize();
        });

      res.send({ items: items });
    });
  },
  create: function (req, res, next) {
    
  },
  get: function (req, res, next) {

  }
};
