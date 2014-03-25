/**
 * 路径映射，请求方法
 */
var controllers = require('../controllers')
var controllers = require('../controllers')

module.exports = function (app) {
  app.get( '/'                            , controllers.home);
  app.get( '/information'                 , controllers.information.list);
  app.get( '/information/index'           ,controllers.information.index);
  app.get( '/information/remove'           ,controllers.information.remove);
};
