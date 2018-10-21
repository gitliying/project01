var isTrue = false;
//判断手机号是否被注册
	$('#txtUserName').blur(function(){
		var tel = $('#txtUserName').val();
		$.ajax({
			type:"post",
			url:"../api/selectReg.php",
			async:true,
			success:function(str){
				var data = JSON.parse(str);
//				console.log(data);
				for(var i=0;i<data.length;i++){
					if(tel == data[i].tel){
						$('#comftxtUserName').text('手机号可登录').css('color','green');
						//console.log('if'+data[i].tel);
						return;
					}
					
					//return;跳不出来 会执行else
					else{
						$('#comftxtUserName').html('手机号未注册').css('color','red');
						console.log('else'+data[i].tel);
					}
				}
			}
		});
	});
	
//判断密码	是否正确
	$('#txtPass').blur(function(){
		var pass = $('#txtPass').val();
//		console.log(pass);
		$.ajax({
			type:"post",
			url:"../api/selectReg.php",
			async:true,
			success:function(str){
				var data = JSON.parse(str);
//				console.log(data);
				for(var i=0;i<data.length;i++){
					if(pass == data[i].password){
						$('#comfTxtPass').text('密码正确').css('color','green');
//						console.log($('#comfTxtPass'));
						//密码正确后，登录开关打开, 否则开关false
						isTrue = true;
						return;
					}
					
					//return;跳不出来 会执行else
					else{
						$('#comfTxtPass').text('密码错误！').css('color','red');
//						console.log('else'+data[i].password);
					}
					
				}
			}
		});
	});

	

//点击登录 3秒自动跳转首页 
var timer = null;
$('#btnLogin').click(function(){
	//判断checkbox是否被选中  自动登录的时候，使用cookie记录数据（没有做）
	//var isAgree = $("input[type='checkbox']").is(':checked');
	if(isTrue){
//		window.location.href = "../index.html";
//		alert('登录成功！');
		var obj = $('#regMsg'); 
		var screenWidth = $(window).width();
		var screenHeight = $(window).height(); //当前浏览器窗口的 宽高
		var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
		var objLeft = (screenWidth - obj.width())/2 ;
		var objTop = (screenHeight - obj.height())/2 + scrolltop;
		obj.css({left: objLeft + 'px', top: objTop + 'px'});
		$('#regMsg').show();
		var tt = 3;
		clearInterval(timer);
    	timer = setInterval(function(){
    		if (tt == -1) {
      			clearInterval(timer);
      			$('#regMsg').hide();
	      		window.location.href = "../index.html";
	      		return;
	      	};
	     	$('#regMsg').html("登录成功,页面将在 " + tt + " 后转向首页");
	      	tt--;
    	},1000);
	}else{
		alert('登录失败！');
	}
});

//重置密码
$('#resetPass').click(function(){
	$('#txtPass').val('');
});

