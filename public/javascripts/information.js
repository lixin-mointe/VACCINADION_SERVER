/**
 * 资讯 js
 */


 
 
 

$("#template").hide();
$("#pageTemplate").hide();
//总页数
var pageSize=0;
var pageLimit=10;
var pageNum=0;
initPage(pageSize,0);
function addRow(id ,date){
var row = $("#template").clone(); 

	 
	row.find("#removeId").click(function(){
		remove(date.id);
		  }); 
	row.find("#modifyId").click(function(){
		modify(date.id);
		  }); 
	
	row.find("#title").text(date.title); 
	row.find("#soures").text(date.soures); 
	row.find("#type").text(date.type); 
	row.find("#level").text(date.level); 
	row.find("#pubilshed_date").text(date.pubilshed_date); 
	//row.find("#introduction").text(date.introduction); 
	var abb=row.find("#introduction").find('abbr');
	abb.text(date.introductionAttr);
	abb.attr('title',date.introduction);
	//row.find("#introduction").find('abbr').text(date.comments); 
	row.attr('id',id);
	row.appendTo($("#infoList"));
	row.show();
//	offset=offset+1;
	//alert();
}

function select(pageNum){ 
	this.pageNum=pageNum;
var data={};
data.query= { type: [$("#query_type").val()]
		,title:{'sql_comparator':'like',val: '%'+$("#query_title").val()+'%'}
		,soures:{'sql_comparator':'like',val: '%'+$("#query_soures").val()+'%'}
};
data.order=['pubilshed_date',"-id"];
data.limit={'limit':pageLimit,'pageNum':pageNum};
$.ajax({
	  type: "GET",
	  url: '/information',
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
 
$('#c_select').on('click',function(event){
			//alert($("#query_title").val());
	pageNum=1;
			select(pageNum);
});
/**
 * 删除
 * @param id 资讯id
 */
function remove(id){
	var data={};
	data.id=id;
	$.ajax({
		  type: "GET",
		  url: '/information/remove',
		  processData:"false",
		  data: data,
		  success: function (data, textStatus){
		  	  if(data.success){ 
		  		select(pageNum);
		  		/*
		  		 for(var i=0;i<=pageLimit ;i++){
		  			 $("#"+i).remove(); 
		  		 }	
		  		$.each(data.items, function(i, n){ 
		  			addRow(i,n);
		  		}); */
		  		//initPage(data.pageSize,data.pageNum);
		  	  } else {
		  		alert('err');
		  	  	$('#msg').html(data.err);
		  	  	$('#msg').addClass('alert alert-error');
		  	  }
		  }
		});
}
/**
 *  修改
 * @param id
 */
function modify(id){
	alert('modify'+id);
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
	  row.find("a").html(i);
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
 	 

		
