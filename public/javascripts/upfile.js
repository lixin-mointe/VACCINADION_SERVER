

var $choosebox = $('#choosebox');
var $file = $('#file');
/*
function upFile(fromNmae){
	 
	//alert(fromNmae);
	//alert($imgform.attr('id'));
	// return true; 
	var $imgform = $("#"+fromNmae);
	var $imgerr = $imgform.find('#imgerr');
	var $imgload = $imgform.find('#imgload');
	if (!$file.val()) {
		$imgerr.removeClass().addClass('text-error');
		$imgerr.text('请选择文件！');
 		return false;
	}
	$imgerr.text('');
	$imgload.show();
	$imgform.attr('enctype','multipart/form-data');
	alert( $imgform.serialize());
	$.post( "/fileUpload"
			, $imgform.find("#file").serialize()
			, function(data){
			     alert("Data Loaded: " + data);
			   });
	
	$imgform.ajaxForm({
		url: '/fileUpload',
		type: 'POST',
			success: function (res, status, xhr, $form) {
				alert(2);
			var tp;
			if (!res) tp = '异常错误！可能不支持该格式的图片。';
			else if (res == '1') tp = '图片大小不得超过2m！';
			else if (res == '2') tp = '文件类型必须是图片！';
			else if (res.code == '3') ;//window.location.reload(true);
			else  tp = res;
			$imgerr.removeClass().addClass('text-error');
				$imgerr.text("上传成功");
			$imgload.hide();
			$imgform.find("#img").attr('src','http://127.0.0.1:3000/images/'+res.fname);
			$imgform.find('#img_url').attr('value','http://127.0.0.1:3000/images/'+res.fname);
			//$choosebox.text('点击选择图片');
			//$imgform.clearForm();
		},
		error: function (res, status, e) {
			alert(e);
			$imgload.hide();
			//$imgform.clearForm();
		}
	});
}*/
//$(document).ready(function(){
	$choosebox.click(function(){
		$file.click();
	});
	$file.change(function(){
		
		$choosebox.text($file.val()); 
	});
	$('#upload').click(function(){
		var $imgform = $("#modifyFrom");
		var $imgerr = $imgform.find('#imgerr');
		var $imgload = $imgform.find('#imgload');
		if (!$file.val()) {
			$imgerr.removeClass().addClass('text-error');
			$imgerr.text('请选择文件！');
	 		return false;
		}
		$imgerr.text('');
		$imgload.show();
		$imgform.attr('enctype','multipart/form-data');
		$imgform.ajaxForm({
			url: '/fileUpload',
			type: 'POST',
				success: function (res, status, xhr, $form) {
				var tp;
				if (!res) tp = '异常错误！可能不支持该格式的图片。';
				else if (res == '1') tp = '图片大小不得超过2m！';
				else if (res == '2') tp = '文件类型必须是图片！';
				else if (res.code == '3') ;//window.location.reload(true);
				else  tp = res;
				$imgerr.removeClass().addClass('text-error');
 				$imgerr.text("上传成功");
				$imgload.hide();
				//alert($imgform.find("#img").attr('src'));
				$imgform.find("#img").attr('src',res.fname);
				//alert($imgform.find("#img").attr('src'));
				$imgform.find('#img_url').attr('value',res.fname);
				//$choosebox.text('点击选择图片');
				//$imgform.clearForm();
			},
			error: function (res, status, e) {
				alert(e);
				$imgload.hide();
				//$imgform.clearForm();
			}
		});
		 
	});
/*});*/
