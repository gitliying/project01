//4位随机验证码
function random(){
        var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
        var str = '';
        for(var i = 0 ; i < 4 ; i ++ )
            str += ''+arr[Math.floor(Math.random() * arr.length)];
        return str;
    }
$('#btnCode').html(random());
//console.log($('#btnCode').html());
$('#btnCode').click(function(){
	 $('#btnCode').html(random());
});
//随机验证码倾斜
$("#btnCode").css({fontStyle:"italic"});

//判断验证码是否正确
$('#txtPicCode').blur(function(){
	var content = $('#btnCode').html();
	if($('#txtPicCode').val()==content){
		$('#comfCode').html('验证正确').css('color','green');
	}else{
		$('#comfCode').html('验证码不正确').css('color','red');
	}
});


//注册开关
var isOk = false;
//1、验证手机号
//封装函数，验证手机号是否有效
function isPoneAvailable(str) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }
//下面的值一定要写在blur function 的里面 不然拿到都是空的
//var val = $('#txtPhoneNo').val();

function phone(){
	//失去焦点，拿到输入手机号码
	var val = $('#txtPhoneNo').val();
	//console.log(typeof(val));string
	var res = isPoneAvailable(val);
	if(res){
		//判断该号码可用之后，查询数据库是否有该号码
		$.ajax({
			type:"get",
			url:"../api/selectReg.php",
			async:true,
			success:function(str){
				var data = JSON.parse(str);
				//console.log(data);
				for(var i=0;i<data.length;i++){
					var tel = data[i].tel;
					if(val == data[i].tel){
						//console.log(tel);
						$('#txtPhoneNoInfo').html('手机号已被注册，请换一个！').css('color','red');
						return;
					}
					
					else{
						$('#txtPhoneNoInfo').html('该手机号可用！').css('color','green');
					}
				}
				
			}
		});
		
	}else{
		$('#txtPhoneNoInfo').html('请输入11位有效手机号码！').css('color','red');
	}
	return val;
}

//判断输入手机号码是否正确
$('#txtPhoneNo').blur(function(){
	phone();
});

//判断密码码是否正确
$('#txtPass').blur(function(){
	var txtPass = $('#txtPass').val();
	if(/^([\d]|[\w]){6,16}$/.test(txtPass)){
		$('#txtPassInfo').html('密码有效！').css('color','green');
	}else{
		$('#txtPassInfo').html('密码无效！请输入6-16个字符!').css('color','red');
	}
});

//确认密码
$('#txtPassConfirm').blur(function(){
	var txtPassConfirm = $('#txtPassConfirm').val();
	if(txtPassConfirm==$('#txtPass').val() && $('#txtPass').val()!='' ){
		$('#txtPassConfirmInfo').html('确认密码成功！').css('color','green');
	}else{
		$('#txtPassConfirmInfo').html('密码不一致，请重新输入！').css('color','red');
	}
	isOk=true;
});

//注册
$('#regBtn').click(function(){
	//判断checkbox是否被选中
	var isAgree = $("input[type='checkbox']").is(':checked');
	//console.log(isAgree);
	if(isOk && isAgree ){
		alert('注册成功！');
	}else{
		alert('请先完善信息！');
	}
	//注册成功，存入数据库   插入数据未完成(OK)
	function save(){
		$.ajax({
			type:"post",
			url:"../api/selectReg.php",
			async:true,
			success:function(str){
				var arr = JSON.parse(str);
				var cid = arr.length;
				cid = ++cid;
				var tel = $('#txtPhoneNo').val();
				var pass = $('#txtPass').val();
				$.ajax({
					type:"post",
					url:"../api/insert.php",
					async:true,
					data:{
						'cid':cid,
						'tel':tel,
						'pass':pass
					}
				});
//				console.log(cid);
//				console.log(tel);
//				console.log(pass);
			}
		});
	}
	//执行插入数据	
	save();
	
});


	



