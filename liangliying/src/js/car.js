//由gid,在caruserinfo 拿到加入购物车的数据
$.ajax({
	type:"get",
	url:"../api/selectCaruserinof.php",
	async:true,
	success:function(str){
		var data = JSON.parse(str);
//		console.log(data);
		//数据渲染
		var html = ``;
		for(var i=0;i<data.length;i++){
//			var nowprice = data[i].nowprice;
//			nowprice = nowprice.split('￥')[1];
//			console.log(nowprice);
//			console.log(typeof(nowprice));
			html += `
	            <div class="order_content">
	                <ul class="order_lists">
	                    <li class="list_chk">
	                        <input type="checkbox" id="checkbox_2${i}" class="son_check">
	                        <label for="checkbox_2${i}"></label>
	                    </li>
	                    <li class="list_con">
	                        <div class="list_img"><a href="javascript:;"><img src="../${data[i].url}" alt=""></a></div>
	                        <div class="list_text"><a href="javascript:;">${data[i].title}</a></div>
	                    </li>
	                    <li class="list_info">
	                        <p>规格：默认</p>
	                        <p>尺寸：默认</p>
	                    </li>
	                    <li class="list_price">
	                        <p class="price">${data[i].nowprice}</p>
	                    </li>
	                    <li class="list_amount">
	                        <div class="amount_box">
	                            <a href="javascript:;" class="reduce reSty">-</a>
	                            <input type="text" value="${data[i].num}" class="sum">
	                            <a href="javascript:;" class="plus">+</a>
	                        </div>
	                    </li>
	                    <li class="list_sum">
	                        <p class="sum_price">${data[i].nowprice}</p>
	                    </li>
	                    <li class="list_op">
	                        <p class="del"><a href="javascript:;" class="delBtn" data-id="${data[i].gid}">移除商品</a></p>
	                    </li>
	                </ul>
	            </div>
	        </div>
		`;
		}
		$('.cartBox').html(html);
		
	}
	//渲染成功之后
	/**
 * Created by Administrator on 2017/5/24.
 */


});