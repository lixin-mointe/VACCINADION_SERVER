var $imgform = $("#modifyFrom");
var $imgload = $('#imgload');
var $imgerr = $('#imgerr');
var $choosebox = $('#choosebox');
var $file = $('#file');

function error_animate (){
	$imgerr.stop().stop().animate({
		'margin-left':'50px'
	}).animate({
		'margin-left':'10px'
	});
}
$(document).ready(function(){
	$choosebox.click(function(){
		$file.click();
	});
	$file.change(function(){
		$choosebox.text($file.val());
		 
	});
 
	$('#upload').click(function(){
		if (!$file.val()) {
			$imgerr.removeClass().addClass('text-error');
			$imgerr.text('请选择文件！');
			error_animate();
			return false;
		}
		$imgerr.text('');
		$imgload.show();
		//alert($imgform.attr('enctype'));
		$imgform.attr('enctype','multipart/form-data');
		 
		$imgform.ajaxForm({
		//$imgform.ajaxFileUpload({
		//$.ajax({
			url: '/fileUpload',
			type: 'POST',
		/*	data   : $('#modifyFrom').serialize(),
			enctype:"multipart/form-data",
			dataType: 'json',   //数据类型  
            fileElementId:'touxiang', //表示文件域ID
*/			success: function (res, status, xhr, $form) {
	 
	
				var tp;
				if (!res) tp = '异常错误！可能不支持该格式的图片。';
				else if (res == '1') tp = '图片大小不得超过2m！';
				else if (res == '2') tp = '文件类型必须是图片！';
				else if (res.code == '3') ;//window.location.reload(true);
				else  tp = res;
				$imgerr.removeClass().addClass('text-error');
				error_animate();
				$imgerr.text("上传成功");
				$imgload.hide();
				 $('#img').attr('src','http://127.0.0.1:3000/images/'+res.fname);
				 $('#img_url').attr('value','http://127.0.0.1:3000/images/'+res.fname);
				 
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
});