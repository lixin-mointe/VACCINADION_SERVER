/**
 * 路径映射，请求方法
 */
var controllers = require('../controllers')
 
module.exports = function (app) {
  app.get( '/'                           , controllers.home);
  app.get( '/information'                 , controllers.information.list);
 
};
