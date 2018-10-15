//回到顶部
$('#to_top').click(function() {
		$("html,body").animate({
			scrollTop: 0
		}, 500);
	});
	//向左滚动多张lubo2
	$(function() {
//		$('#goodlists')
		$('#marquee1').Marquee({
			isAuto:false,
			distance: 1000, //每次移动162px
			time: 3, //延时时间3秒
			btnGo: {
				left: '#left',
				right: '#right'
			},
			direction: 'left' //方向

		});
	});
	
//先显示5条，以后点击再从数据库拿
//$(document).load(function(){
//	goodslistload();
//});

//ajax加载数据
function goodslistload(data){
	var html = ``;
	for(var i=0;i<data.length;i++){
		html += `
			<li>
				<a href="javascript:"><img src="${data[i].url}" alt="" />
					<span>${data[i].discount}折</span>
					<div class="left fl">
						<b>${data[i].content}</b>
						<i>￥${data[i].nowprice}</i>
						<i>￥${data[i].price}</i>
					</div>
					<div class="right fr">
						<p>立即     抢购</p>
					</div>
				</a>
				
			</li>
		`;
	}
	$('#goodlists').html(html);
}

$("#g_prev").click(function(){
	$.ajax({
		type:"get",
		url:"api/select.php",
		async:true,
		success:function(str){
			//console.log(str);
			var data = JSON.parse(str);
			//console.log(data);
			//数据渲染
			goodslistload(data);
		}
	});
});

$("#g_next").click(function(){
	$.ajax({
		type:"get",
		url:"api/select.php",
		async:true,
		success:function(str){
			//console.log(str);
			var data = JSON.parse(str);
//			console.log(data);
			//数据渲染
			goodslistload(data);
		}
	});
});
