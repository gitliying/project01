var box2 = document.querySelector("#box2");
var lis = document.querySelectorAll("#ul2>li");
var btns = document.querySelectorAll("#ol2 span");
var prev2 = document.querySelector('#prev2');
var next2 = document.querySelector("#next2");
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
box2.onmouseover = function() {
	clearInterval(timer);
}
box2.onmouseout = function() {
	timer = setInterval(next, 2000);
}
//左右按钮
prev2.onclick = function() {
	now = --now < 0 ? len - 1 : now;
	tab();
}
next2.onclick = function() {
	now = ++now > len - 1 ? 0 : now;
	tab();
}