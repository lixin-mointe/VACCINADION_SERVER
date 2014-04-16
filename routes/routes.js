/**
 * 路径映射，请求方法
 */
var controllers = require('../controllers')

module.exports = function (app) {
  app.get( '/'                            ,controllers.home);
  app.get( '/version'                     ,controllers.app.get);
  app.get( '/information'                 ,controllers.information.index);
  app.get( '/information/index'           ,controllers.information.index);
  
  /**
   * 资讯部分
   */
 // 获取列表	GET  	
  app.get(  '/informations/:limit/:pageNum' ,controllers.information.list);
 // 根据id获取	GET  	
  app.get( '/information/:information_id'   ,controllers.information.get);
 // 创建	POST	
  app.post( '/information',controllers.information.create);
 // 删除	DELETE	
  app.get ( '/information/remove/:information_id',controllers.information.remove);
 // 更新或创建	PUT 	
  app.put( '/information',controllers.information.get);
  app.post( '/fileUpload',controllers.file.post);
 

};
