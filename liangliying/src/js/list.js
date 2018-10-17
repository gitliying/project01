//nav list出现和隐藏
//$('#nav_header').mouseenter(function(){
//	$('#goodlist').css('display','block');
//});
//$('#goodlist').mouseout(function(){
//	$('#goodlist').css('display','none');
//}).stop();
//$('#nav_header').hover(function(){
//	$('#goodlist').show();
//},function(){
//	$('#goodlist').hide();
//});

//点击显示更多brands
$('#more').click(function(){
	$('#more_lists').show();
});
$('#less').click(function(){
	$('#more_lists').hide();
});

//ajax加载数据

function creat(data){
	var html=``;
	for(var i=0;i<data.length;i++){
		html += `
			<li>
			<a href=""><img src="../${data[i].url}" alt="" />
				<span>${data[i].title}</span>
			</a>
			<i>${data[i].nowprice}</i>
			<i>${data[i].price}</i>
			<p>月销${data[i].count}件</p>
		</li>
		`;
	}
	$('#productList').html(html);
}



$.ajax({
	type:"get",
	url:"../api/selectList.php",
	async:true,
//	data:{
//		'page':page,
//		'qty':12
//	},
	success:function(str){
		//数据渲染
//		console.log(str);
		var data = JSON.parse(str);
//		var arrData = data.list;
//		console.log(data.list);
		creat(data.list);
		
		//创建分页点
		//console.log(data.total);
		var count = Math.ceil(data.total / 12);
		var html2 = ``;
		for(var i=0;i<count;i++){
			html2 += `
			
				<li><span class='ipage'>${i+1}</span></li>
			`;
		}
		$('#pages').html('<li><span>上一页</span></li>'+html2 + $('#pages').html());
		$('#pages span').eq(1).addClass('active');
		
		//绑定点击事件，页码跟随切换
		var nowpage =0;
		function light(){
			var span =$("#pages .ipage");
//			console.log(span.length)
			$(span).removeClass('active');
			$('.ipage').eq(nowpage).addClass('active');
		}
		
		$('#pages .ipage').click(function(){
//			console.log($('#pages .ipage'));
			//获取到当前点击页码的索引
			var _this = $('#pages .ipage').index($(this));
//			console.log(_this);
			nowpage = _this;
//			console.log(nowpage);
			light();
			
			//点击哪一页，传页码给接口
			$.ajax({
				type:"get",
				url:"../api/selectList.php",
				async:true,
				data:{
					'page':nowpage,
					'qty':12
				},
				success:function(str){
					var data = JSON.parse(str);
					//console.log(data);
					//分页加载
					creat(data.list);
				}
			});
			
			
			
		});
		 
		
	}
});



