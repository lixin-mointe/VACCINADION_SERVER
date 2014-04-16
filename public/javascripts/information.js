/**
 * 资讯 js
 */
$("#template").hide();
$("#pageTemplate").hide();
$("#createMsg").hide();
//总页数
var pageSize=0;
var pageLimit=10;
var pageNum=0;
initPage(pageSize,0); 

$('#c_select').on('click',function(event){
			//alert($("#query_title").val());
			pageNum=1;
			select(pageNum);
});

$('#c_modify').on('click',function(event){
	modify();
});
$('#c_submit').on('click',function(event){
	create();
});

function showModifyModal(data){
	 
		$('#modalLabel').html('资讯编辑-'+data.title);
	  	$('#id').val(data.id);
	  	$('#title').val(data.title);
  		$('#sort').val(data.sort);
  		$('#soures').val(data.soures);
  		$('#pubilshed_date').val(data.pubilshed_date);
  		$('#type').val(data.type);
  		$('#level').val(data.level);
  		$('#introduction').val(data.introduction);
  		$('#img').attr('src',data.img_url);
  		$('#img_url').val(data.img_url);
  		$('#modifyModal').modal('show');
}
function showCreateMsg(msg){
	$('#createMsg').find('strong').html(msg);
	$('#createMsg').show();
}
function create(){
	//alert(1);
		 $.ajax({
			  type: "post",
			  url: '/information',
			  processData:"false",
			  data   : $('#modifyFrom').serialize(),
 			  success: function (data, textStatus){
			  	  if(data.success){ 
			  		/*$('#modalLabel').html('资讯编辑-'+data.information.title);
 			  		$('#id').val(data.information.id);
 			  		$('#title').val(data.information.title);
			  		$('#sort').val(data.information.sort);
			  		$('#soures').val(data.information.soures);
			  		$('#pubilshed_date').val(data.information.pubilshed_date);
			  		$('#type').val(data.information.type);
			  		$('#level').val(data.information.level);
			  		$('#introduction').val(data.information.introduction);
			  		$('#img').attr('src',data.information.img_url);
			  		$('#img_url').val(data.information.img_url);
			  		$('#createMsg').show();*/
			  		showModifyModal(data.information);
			  		showCreateMsg("更新成功");
			  	  } else {
			  		  var err='';
			  		for(var i in data.errors){
			  			//alert(i+":"+data.errors[i]);
			  			err=err+data.errors[i]+'<br>';
			  		}
			  		showCreateMsg(err);
			  		/*$('#createMsg').show();
			  		$('#createMsg').find('strong').html(err);*/
	 		  	  	
			  	 // 	$('#msg').addClass('alert alert-error');
			  	  }
			  }
			}); 
	 
}
/**
 * 删除
 * @param id 资讯id
 */
function remove(id){
	var data={};
	data.id=id;
	$.ajax({
		  type: "get",
		  url: '/information/remove/'+id,
		  processData:"false",
		//  data: data,
		  success: function (data, textStatus){
		  	  if(data.success){ 
		  		select(pageNum);
		  	  } else {
 		  	  	$('#msg').html(data.err);
		  	 // 	$('#msg').addClass('alert alert-error');
		  	  }
		  }
		});
}
/**
 *  修改
 * @param id
 */
function modify(id){
	if(id != undefined){
		var data={};
		data.id=id;
		 $.ajax({
			  type: "GET",
			  url: '/information/'+id,
			  processData:"false",
			  success: function (data, textStatus){
			  	  if(data.success){ 
			  		 //标题
			  		showModifyModal(data.information);
			  	  } else {
			  		showCreateMsg(err);
			  		/*$('#createMsg').show();
			  		$('#createMsg').find('strong').html(err);*/
			  	  }
			  }
			});
	}else{
		var objDate=new Date();//创建一个日期对象表示当前时间
		var year=objDate.getFullYear();
		var month=objDate.getMonth()+1;    //getMonth返回的月份是从0开始的，因此要加1
		var date=objDate.getDate(); 
		var information={id:'',title:'', sort:1,soures:'',pubilshed_date:objDate. Format("yyyy-MM-dd"),type:1,level:1,introduction:'',img_url:''};
		showModifyModal(information);
		
		
		/*$('#modalLabel').html('资讯编辑');
		var objDate=new Date();//创建一个日期对象表示当前时间
		var year=objDate.getFullYear();
		var month=objDate.getMonth()+1;    //getMonth返回的月份是从0开始的，因此要加1
		var date=objDate.getDate(); 
		$('#pubilshed_date').val(objDate. Format("yyyy-MM-dd"));
		 $('#modifyModal').modal('show');*/
	}
	
}
/**
 * 时间格式化
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 查看明细
 * @param id
 */
function views(id){
	var data={};
	data.id=id;
	 $.ajax({
		  type: "get",
		  url: '/information/'+id,
		  processData:"false",
		   
		  success: function (data, textStatus){
		  	  if(data.success){ 
		  		
		  		 //标题
		  		 $('#viewsModalLabel').html('资讯 -'+data.information.title);
		  		$('#viewsSoures').html(data.information.soures);
		  		$('#viewsPubilshedDate').html(data.information.pubilshed_date);
		  		$('#viewSort').html(data.information.sort);
		  		$('#viewsTitle').html(data.information.title);
		  	 
			 
		  		$('#viewsType').html(data.information.typeVal);
		  		$('#viewsLevel').html(data.information.levelVal);
		  		$('#viewsIntroduction').html(data.information.introduction);
		  		$('#viewsImg').attr('src',data.information.img_url);
		  		//$('#viewsImg').attr('data-src',data.information.img_url);
		  		
		  		
		  		// $('#viewsModalBody').html('body');
		  		 $('#viewsModal').modal('show');

		  	  } else {
		  	  	$('#msg').html(data.err);
		  	 // 	$('#msg').addClass('alert alert-error');
		  	  }
		  }
		});
}

/**
* 
* @param pageSize  页数
* @param pageNum  当前页 
*/

function initPage(pageSize,pageNum){
	//alert(pageSize);
	var pages= $("#pages");
	pages.find('li').remove();
	//首页
	var first = $("#pageTemplate").clone();
	first.find("a").html('First');
	if(pageNum <= 1){
		first.attr('class','disabled');
	}else{
		first.find("a").click(function(){
		  select(1);
		  }); 
	}
	first.attr('id','first');
	first.appendTo($("#pages"));
	first.show();
	//上一页
	var previous = $("#pageTemplate").clone();
	previous.find("a").html('Previous');
	if(pageNum <= 1){
		previous.attr('class','disabled');
	}else{
		previous.find("a").click(function(){
		  select(pageNum-1);
		  }); 
	}
	previous.attr('id','previous');
	previous.appendTo($("#pages"));
	previous.show();

	for(var i =1;i<=pageSize;i++){
	  var row =$("#pageTemplate").clone();
	 
	  row.attr('id','page'+i);
	  //row.attr('style',"display");
	  if(pageNum==i ){ 
		  row.attr('class','active'); 
	  } else{
		 
		  row.find("a").click(function(){
			  select( $(this).html());
			  });
	  }
	  var p=String(i);
	//  row.show();
	  row.find("a").html(p);
	  row.appendTo($("#pages"));
	  /*if(i>2){
		  
		  break ; 
	  }*/
  }
  pages.find('li').show();
//下一页
	var next = $("#pageTemplate").clone();
	next.find("a").html('Next');
	if(pageNum >= pageSize){
		next.attr('class','disabled');
	}else{
		next.find("a").click(function(){
		  select(parseInt(pageNum)+1);
		  }); 
	}
	next.attr('id','next');
	next.appendTo($("#pages"));
	next.show();
  //最后一页
  var last = $("#pageTemplate").clone();
  last.find("a").html('Last');
  if(pageNum >= pageSize){
	  last.attr('class','disabled');
  }else{
	  last.find("a").click(function(){
		  select(pageSize);
		  }); 
  }
  last.attr('id','last');
  last.appendTo($("#pages"));
  last.show();
};
 	 


function select(pageNum){ 
	this.pageNum=pageNum;
	var data={};
	data.query= { type:  $("#query_type").val().split(',') 
			,level:	$("#query_level").val().split(',') 
			,title:{'sql_comparator':'like',val: '%'+$("#query_title").val()+'%'}
			,soures:{'sql_comparator':'like',val: '%'+$("#query_soures").val()+'%'}
	};
	data.order=['pubilshed_date',"-id"];
	//data.limit={'limit':pageLimit,'pageNum':pageNum};
	$.ajax({
		  type: "GET",
		  url: '/informations/'+pageLimit+'/'+pageNum+'',
		  processData:"false",
		  data: data,
		  success: function (data, textStatus){
		  	  if(data.success){
		  		
		  		 for(var i=0;i<=pageLimit ;i++){
		  			 $("#"+i).remove(); 
		  		 }	
		  		$.each(data.items, function(i, n){ 
		  			addRow(i,n);
		  		}); 
		  		
		  		initPage(data.pageSize,data.pageNum);
		  	  } else {
		  		alert('err');
		  	  	$('#msg').html(data.err);
		  	  	$('#msg').addClass('alert alert-error');
		  	  }
		  }
		});
};
function addRow(id ,date){
	var row = $("#template").clone();  
	row.find("#removeId").click(function(){
		remove(date.id);
		  }); 
	row.find("#modifyId").click(function(){
		modify(date.id);
		  }); 
	row.find("#viewsId").click(function(){
		views(date.id);
		  }); 
	
	
	row.find("#list_title").text(date.title); 
	row.find("#list_soures").text(date.soures); 
	row.find("#list_type").text(date.typeVal); 
	row.find("#list_level").text(date.levelVal); 
	row.find("#list_pubilshed_date").text(date.pubilshed_date); 
	//row.find("#introduction").text(date.introduction); 
	var abb=row.find("#list_introduction").find('abbr');
	abb.text(date.introductionAttr);
	abb.attr('title',date.introduction);
	//row.find("#introduction").find('abbr').text(date.comments); 
	row.attr('id',id);
	row.appendTo($("#infoList"));
	row.show();
//	offset=offset+1;
	//alert();
}
 