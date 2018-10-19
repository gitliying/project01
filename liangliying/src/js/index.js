//初始化页面 ajax加载数据
$(document).ready(function(){
	$.ajax({
		type:"get",
		url:"api/select.php",
		async:true,
		success:function(str){
			var data = JSON.parse(str);
			//console.log(data);
			//数据渲染 限时抢购部分
			goodslistload(data,'#goodlists');
			//猜你喜欢部分
			goodslistload(data,'#youLikeList');
			
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
			
			$('#marquee2').Marquee({
				isAuto:false,
				distance: 1000, //每次移动162px
				time: 3, //延时时间3秒
				btnGo: {
					left: '#left2',
					right: '#right2'
				},
				direction: 'left' //方向
			});
		}
	});
});

//创建节点
function goodslistload(data,id){
	var html = ``;
	for(var i=0;i<data.length;i++){
		html += `
			<li>
				<a href="html/list.html"><img src="${data[i].url}" alt="" />
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
	$(id).html(html);
}
