//三级菜单
$('#goodlist').hover(function(){
	$('.g_tab').show();
},function(){
	$('.g_tab').hide();
});
$('.g_tab').delegate('li','mousemove',function(){
	var index = $(this).index();
	//当前hover对应的li的内容显示，其他不显示
	$('.con').eq(index).addClass('current').siblings().removeClass('current');
});
$('.con').mouseout(function(){
	$('.con').removeClass('current');
});



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
			<a href="goods.html?gid=${data[i].gid}"><img src="../${data[i].url}" alt="" />
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
		$('#pages').html('<li><span id="prevPage">上一页</span></li>'+html2+$('#pages').html());
		$('#pages span').eq(1).addClass('active');
		
		//绑定点击事件，页码跟随切换
		var nowpage =0;
		function light(){
			var span =$("#pages .ipage");
//			console.log(span.length)
			$(span).removeClass('active');
			$('.ipage').eq(nowpage).addClass('active');
		}
		
		//封装函数ajaxData,查询要加载哪一页的数据
		function ajaxData(data){
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
			ajaxData(nowpage);
		});
		
		//上下页切换  
		$('#nextPage').click(function(){
			nowpage = ++nowpage >$("#pages .ipage").length ? 0 : nowpage;
			light();
			ajaxData(nowpage);
		});
		$('#prevPage').click(function(){
			nowpage = --nowpage <0 ?$("#pages .ipage").length : nowpage;
			light();
			ajaxData(nowpage);
		});
	
		
	}
});



