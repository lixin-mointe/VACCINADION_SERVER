var http = require("http");
var mysql = require('mysql');
var fs = require('fs');
var conn = mysql.createConnection({
	host : '192.168.1.113',
	user : 'root',
	password : 'mointe',
	database : 'Vaccination',
	dateStrings : true, // 解决时间格式化问题
	supportBigNumbers : true,
	// debug: true,
	port : 3306
});
conn.connect();
var img;
var json;
var selectSQL = 'select * from VACCINADION_INFO where id=4';
conn.query(selectSQL, function(err4, rows2) {
	if (err4)
		console.log(err4);

	console.log("SELECT ==> ");
	/*
	 * for (var i in rows2) { console.log(rows2[i]);
	 *  }
	 */
	img = rows2[0].IMG;
	json = rows2[0];
	console.log(img);
});
console.log('eeeeeeeeeee');

http.createServer(function(request, response) {
	response.writeHead('200', {
		"Content-Type" : "text/plain"
	});
	JSON.parse(json);
	response.write(JSON.parse(json));
	response.end();
	// img = rows[0].text;

	response.writeHead('200', {
		'Content-Type' : 'image/jpeg'
	}); // 写http头部信息
	response.end(img, 'binary'); // res结束，把图片显示出来也可以res.write(img,'binary')
	console.log(img);

}).listen(3000);