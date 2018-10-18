//接收url参数，获取gid
function getUrl(name){
	var str = location.search; //?gid=1
//	console.log(str);
	if(str!=''){
		var arr = str.substring(1).split("&");
//		console.log(arr);
		for(var i=0;i<arr.length;i++){
			var a = arr[i].split("=");
//			console.log(a);
			if( a[0] == name ){
				return a[1];
			}
		}
	}
}
var gid = getUrl("gid");
//console.log(gid);

//由gid,从数据库获取商品数据

$.ajax({
	type:"get",
	url:"../api/goods.php",
	async:true,
	data:{
		'gid':gid
	},
	success:function(str){
		var data = JSON.parse(str);
//		console.log(str);
		var jsonData = data[0];
//		console.log(jsonData);
		var gValues = Object.values(jsonData);
//		console.log(gValues);
		//数据渲染
		var html = `
			<h3>${gValues[2]}</h3>
			<div>
				<p>${gValues[3]}</p>
				<p>${gValues[4]}</p>
				<p>月销  &nbsp; ${gValues[5]}</p>
			</div>
		`;
		$('#goodContent').html(html);
	}
});

//加入购物车事件
var nums =1;//定义一个全局变量，存商品加入购物车的数量
//购买数量+ -
$('#buy').on('click','.addNum',function(){
	var addNum = $(this).prev().val();
	addNum++;
	//库存10件，才能添加入购物车
	if( addNum > 100 ){
		addNum = 100;
		alert('亲，库存只有100件了！')
	}
	$(this).prev().val(addNum);
	nums = addNum;
//	console.log(nums);
});

$('#buy').on('click','.cutNum',function(){
	var cutNum = $(this).next().val();
//	console.log($(this));
	cutNum--;
	//最少有1件，才能添加入购物车
	if(cutNum<=1){
		cutNum=1;
		alert('亲，至少有一件商品才能添加到购物车哦！');
	}
	$(this).next().val(cutNum);
	nums = cutNum;
});

//手动改数量的时候
$('#buy').on('keydown','.autoNum',function(){
	var autoNum = $(this).val();
//	console.log($(this));
	//最少有1件，才能添加入购物车
	if( autoNum < 1 ){
		autoNum = 1;
		alert('亲，至少有一件商品才能添加到购物车哦！');
	}else if( autoNum >100 ){
		autoNum = 100;
		alert('亲，库存只有100件了！');
	}
	$(this).val(autoNum);
	nums = autoNum;
});

//添加到购物车
$('.addCar').click(function(){
	
});

//根据gid，从数据库调取数据
//datas();
function　datas(){
	$.ajax({
		type:"get",
		url:"../api/goods.php",
		async:true,
		data:{
			'gid':gid
		},
		success:function(str){
			var data = JSON.parse(str);
	//		console.log(str);
			var jsonData = data[0];
	//		console.log(jsonData);
			var gValues = Object.values(jsonData);
//			console.log(gValues);
			
			//数据渲染
			var html2 = `
				<li>
					<img src="../${gValues[1]}" />
					<span>${gValues[2]}</span>
					<i>${gValues[3]} X ${nums}</i>
				</li>
			`;
			$('#imglists').html(html2);
//			console.log($('#imglists'));
		}
	});
}

//点击加入购物车,就渲染数据出来
$('.addCar').click(function(){
	datas();
});


function cardata(){
	$.ajax({
		type:"get",
		url:"../api/goods.php",
		async:true,
		data:{
			'gid':gid
		},
		success:function(str){
			var data = JSON.parse(str);
	//		console.log(str);
			var jsonData = data[0];
	//		console.log(jsonData);
			var gValues = Object.values(jsonData);
//			console.log(gValues[1]);
//			console.log(gValues);
//			console.log(gValues[1]);
			//把加入过购物车的商品,插入数据库
			$.ajax({
				type:"get",
				url:"../api/insertCar.php",
				async:true,
				data:{
					'gid':gid,
					'url':gValues[1],
					'title':gValues[2] ,
					'nowprice':gValues[3] ,
					'nums': nums
					
				},
				success:function(str){
					console.log(str);
				}
			});
		}
		
	});
	
}

cardata();
//console.log(typeof(gValues) );
//	//把加入过购物车的商品,插入数据库
//	$.ajax({
//		type:"get",
//		url:"../api/insertCar.php",
//		async:true,
//		data:{
//			'gid':gid,
//			'url':gValues[1],
//			'title':gValues[2] ,
//			'nowprice':gValues[3] ,
//			'nums': nums
//			
//		},
//		success:function(str){
////			console.log(str);
//		}
//	});















//details tab切换
$('#detail1').click(function(){
	$('span').removeClass('active');
	$('#detail1').addClass('active');
	$('.con').css('display','none');
	$('.detail').css('display','block');
});
$('#detail2').click(function(){
	$('span').removeClass('active');
	$('#detail2').addClass('active');
	$('.con').css('display','none');
	$('.setting').css('display','block');
});




