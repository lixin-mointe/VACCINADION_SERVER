/**
 * New node file
 */

var http = require('http');
var urllib = require('url');
var async= require('async');

var port = 3000;
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '192.168.1.113',
    user: 'root',
    password: 'mointe',
    database:'Vaccination',
    dateStrings: true , //解决时间格式化问题
    supportBigNumbers: true,
 //   debug: true,
    port: 3306
});
conn.connect();

 

http.createServer(function(req, res){
	var data= new Array();  
	function  putData(item,id){
		console.log("putData---id="+id);
		for(var i in data){
			/*console.log(" i= "+i);
			console.log(" data[i].id==id "+data[i].id==id);*/
			if(parseInt(data[i].ID) == parseInt(id)){
				data[i].COMTENT=item;
				//console.log(" data[i].COMTENT="+data[i].COMTENT);
			}
		}
		//console.log( "55555555555555555");
		//console.log( JSON.stringify(data));	
	};
	function sendJson(){
		// console.log("sendJson");
		 res.end(JSON.stringify(data)); 
	};
	function getComtent(id){
		var itemSql="select * from VACCINADION_INFO_COMTENT where MAIN_ID="+id;
		conn.query(itemSql, function (err1, results) {
		    if (err1) { 
		    	//console.log(err1);
		    	callback(err1);  
			}
		  //  console.log("item.ID---"+item.ID);
		    putData(results,item.ID);
		}); 
	};
	var begin=0;
	function getItem(){
		
		console.log("getItem begin:"+begin);
		async.forEach(data,function(item, callback) {
			console.log("getItem"+item.ID);
			var itemSql="select * from VACCINADION_INFO_COMTENT where MAIN_ID="+item.ID;
			
			conn.query(itemSql, function (err1, results) {
    		    if (err1) { 
    		    	console.log(err1);
    		    	callback(err1);  
    			}
    		  //  console.log("item.ID---"+item.ID);
    		  //  putData(results,item.ID);
    		    for(var i in data){
    				/*console.log(" i= "+i);
    				console.log(" data[i].id==id "+data[i].id==id);*/
    				if(parseInt(data[i].ID) == parseInt(item.ID)){
    					data[i].COMTENT=item;
    					console.log("COMTENT" + item.ID);
    					//console.log(" data[i].COMTENT="+data[i].COMTENT);
    				}
    			}
    		}); 
			
			    
			console.log("getItem end"+item.ID); 
    	} ) 
    	console.log("getItem end:"+begin);
		begin=begin+1;
	};
	var selectSQL = 'select * from VACCINADION_INFO ';
	var params = urllib.parse(req.url, true);
	var where=0;
	if (params.query && params.query.id) {
		selectSQL=selectSQL+" where ID="+params.query.id;
		where=1;
	}
	if (params.query && params.query.type) {
		if(where==1){
			selectSQL=selectSQL+"  and TYPE="+params.query.type;
		}else{
			selectSQL=selectSQL+"  where  TYPE="+params.query.type;
		}
		
	}
	if (params.query && params.query.level) {
		if(where==1){
			selectSQL=selectSQL+"  and LEVEL="+params.query.type;
		}else{
			selectSQL=selectSQL+"  where  LEVEL="+params.query.type;
		}
		
	}
	if (params.query && params.query.date) {
		if(where==1){
			selectSQL=selectSQL+"  and PUBILSHED_DATE >='"+params.query.date+"'";
		}else{
			selectSQL=selectSQL+"  where  PUBILSHED_DATE >='"+params.query.date+"'";
		}
		
	}
	if (params.query && params.query.orderBy) {
			
			if (params.query && params.query.sort) {
				selectSQL=selectSQL+"  order by "+params.query.orderBy+" "+params.query.sort;
			}else{
				selectSQL=selectSQL+"  order by "+params.query.orderBy;
			}
			
	}else{
		selectSQL=selectSQL+"  order by PUBILSHED_DATE desc" ;
	}
	if (params.query && params.query.limit) {
		selectSQL=selectSQL+"  limit "+params.query.limit;
	}
	 
	
		//console.log("+++++++++++++++++++");
		//console.log("sql="+selectSQL);
		
		
	 	conn.query(selectSQL, function (err, rows) {
		    if (err) { 
		    	console.log(err);
			}
		   
		    var i=0;
		    for (var ii in rows) {
		    	rows[ii].COMTENT=[];
		    	data.splice(ii,0,rows[ii]);
		    }
	   
	    async.series( 
	    		[
	    		 	function(callback){
	    		 		getItem(callback);
	    		    },  
	    		    function(callback){
	    		    	sendJson(callback);
	    		    }
	    		 ]);
	     
		console.log("end"); 
		//console.log( JSON.stringify(data));
		
		
	}) ;                  
	 	
	 
}


).listen(port, function(){
  console.log('server is listening on port ' + port);  
})
