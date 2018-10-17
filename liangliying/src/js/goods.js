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
			<div>
				<span>购买数量</span>
				<input type="button" value="-"/><input type="text" placeholder="1"/><input type="button" value="+" />
			</div>
			<div class="addtocart">
				<span>加入购物车</span>
				<span>立即购买</span>
				<i>拨打：</i><b>4008-678-888</b><i>可语音下单~</i>
			</div>
		`;
		$('#details').html(html);
	}
});

