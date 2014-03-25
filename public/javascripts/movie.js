$(function() {
		$('#c_save').on('click',function(event){
			var data = {};
			//data['content'] = mdata;
			/*data['type'] = '1';
			data['id'] = '1';*/
			/*data.id=1;
			//data.id=1;
			var type={};
			type.sql_comparator='lte';
			type.tau='id';
			type.val=1;
			data.type=type; */
			//data='id[eq]9';
			//data={ id: { '<=': '=2' }};
			//data=[{type:1},{ id: { 'eq': '9' }}];
			
			//var base={};
			/*data.base=base;
			data.base.type=1;
			data.base.id={ 'eq': '1' };*/
			
			//data={ id: { 'id': '9' }};
			
			/*data['type']=1;
			data['sort']={ 'eq': '1' };*/
			/*data="?id=1";*/
			//alert(data);
			//-------------------------------
			//`id` IN ('1', '2')
		   /* data={id:[ '1',2 ]}; 
		    data.id=[ '1',2 ];*/
			
			//((`id` = '1') OR (`id` = '2'))
		//	data= { or: [ { id: 1 }, { id: 2 } ] };
			
			//`type` = '1' AND NOT ((`id` = '2') OR (`id` = '3'))
		  //data= { type: 1, not_or: [ { id: 2 }, { id: 3 } ] };
			 
	 
			
			//data.query= { type: 1, or: [ { id: 1 }, { id: 3 } ],soures:{'sql_comparator':'like',val: '来源%'} };
		//	data.or=[ { id: 1 }, { id: 3 } ] ;
		/*  data.id={ 'sql_comparator':'eq',val: 1};*/
		 // data.soures={'sql_comparator':'like',val: '来源1%'};
			data.query= { type: 1,soures:{'sql_comparator':'like',val: '来源%'}};
			data.order=[  'pubilshed_date',"-id"];
			data.limit={'limit':5,'offset':0};
			  
			 
		//	alert(a.sql_comparator());
			$.ajax({
			  type: "GET",
			 // url: '/movie/add',
			  url: '/information',
			 // contentType: "application/json; charset=utf-8",
			 // dataType: "script",
			  processData:"false",
			  data: data,
			  success: function (data, textStatus){
			  	  if(data.success){
			  		  
			  		//  alert(data.success[0].id) ;
			  		  
			  		//$('#msg').html( data.success.id.sql_comparator());
			  	 	$('#msg').html(JSON.stringify(data.success));
			  	  //	$('#msg').addClass('alert alert-success');
			  	 // 	$(location).attr('href','/');
			  	  } else {
			  	  	$('#msg').html(data.err);
			  	  	$('#msg').addClass('alert alert-error');
			  	  }
			  }
			});
		});
	 

	
});