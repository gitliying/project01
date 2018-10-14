var div = document.querySelector("#box");
var lis = document.querySelectorAll("#ul1>li");
var btns = document.querySelectorAll("#ol1 span");
var prev = document.querySelector('#prev');
var next1 = document.querySelector("#next1");
var len = lis.length;
var now = 0;
tab();
for(let i = 0; i < len; i++) {
	btns[i].onclick = function() {
		now = i;
		tab();
	}
}

function tab() {
	for(let j = 0; j < len; j++) {
		btns[j].className = "";
		lis[j].style.display = "block";
		startMove(lis[j], {
			"opacity": 0
		}, function() {
			lis[j].style.display = "none";
		});
	}
	btns[now].className = "selected";
	startMove(lis[now], {
		"opacity": 100
	});
}
//自动轮播
function next() {
	now++;
	if(now == len) {
		now = 0;
	}
	tab();
}
var timer = setInterval(next, 2000);
div.onmouseover = function() {
	clearInterval(timer);
}
div.onmouseout = function() {
	timer = setInterval(next, 2000);
}
//左右按钮
prev.onclick = function() {
	now = --now < 0 ? len - 1 : now;
	tab();
}
next1.onclick = function() {
	now = ++now > len - 1 ? 0 : now;
	tab();
}