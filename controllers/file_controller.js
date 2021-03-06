/*
 * GET home page.
 */
var logger = require('../config/log4js').logger('file_controller');
var fs = require('fs');
var settings    = require('../config/settings');
function getDatetime(date) {
	var Y = date.getFullYear();
	var M = date.getMonth() + 1;
	if (M < 10)
		M = '0' + M;
	var D = date.getDate();
	if (D < 10)
		D = '0' + D;
	var h = date.getHours();
	if (h < 10)
		h = '0' + h;
	var m = date.getMinutes();
	if (m < 10)
		m = '0' + m;
	var s = date.getSeconds();
	if (s < 10)
		s = '0' + s;
	return (Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s);
}
function getDate() {
	var date=new Date();
	var Y = date.getFullYear();
	var M = date.getMonth() + 1;
	if (M < 10)
		M = '0' + M;
	var D = date.getDate();
	if (D < 10)
		D = '0' + D;
	return (Y + '-' + M + '-' + D);
}
exports.index = function(req, res) {
	// 获取user文件夹里的所有文件名
	fs.readdir('./public/images', function(err, files) {
		res.render('index', {
			title : 'GMTest by KIDx.',
			time : (new Date()).getTime(),
			files : files
		});
	});
};

exports.post = function(req, res) {
	//console.log('路径'+process.execPath);
	var gm = require('gm')
	, imageMagick = gm.subClass({
		imageMagick : true
	});
	//res.header('Content-Type', 'json');
	//console.log(1111111111111);
   
	var t=req.files;
	//console.log(t);
	 
	var path = req.files.file.path;
	// 获取用户上传过来的文件的当前路径
	var sz = req.files.file.size;
	//console.log('sz:' + sz + '  ' + 2 * 1024 * 1024);

	if (sz > 2* 1024 * 1024) {
		fs.unlink(path, function() { // fs.unlink 删除用户上传的文件
			res.end('1');
		});
	} else if (req.files.file.type.split('/')[0] != 'image') {
		fs.unlink(path, function() {
			res.end('2');
		});
	} else {
			var tName=req.files.file.path.split('\\');
			tName=tName[tName.length-1];
			//需添加按时创建目录
			var newPath = settings.imgroot+getDate();
			//console.log('newPath:'+newPath);
			if (fs.existsSync(newPath)) {
	           // console.log('已经创建过此更新目录了');
		    } else {
				 fs.mkdirSync(newPath);
				// console.log('更新目录已创建成功\n');
			 }
			
			newPath = newPath +'/'+ tName;	
			//console.log('newPath:'+newPath);
			imageMagick(path)
			.resize(250, 250, '!') // 加('!')强行把图片缩放成对应尺寸150*150！
			.autoOrient()
			.write( newPath, function(err) {
				if (err) {
					//console.log(err);
					return   res.end(err);
				}
				fs.unlink(path, function() {
					return res.send( { 
						'code' : 3,
						'fname' : settings.imgWeb+getDate()+'/' +tName 
					});
					//return res.end({code:3,fname:tName});
				});
			});
			 
	//	});
	}
};