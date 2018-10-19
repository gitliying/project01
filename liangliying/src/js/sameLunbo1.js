var div2 = document.querySelector("#box2");
var lis2 = document.querySelectorAll("#ul2>li");
var btns2 = document.querySelectorAll("#ol2 span");
var prev2 = document.querySelector('#prev2');
var next2 = document.querySelector("#next2");
var len2 = lis2.length;
var now2 = 0;
tab2();
for(let i = 0; i < len2; i++) {
	btns2[i].onclick = function() {
		now2 = i;
		tab2();
	}
}

function tab2() {
	for(let j = 0; j < len2; j++) {
		btns2[j].className = "";
		lis2[j].style.display = "block";
		startMove(lis2[j], {
			"opacity": 0
		}, function() {
			lis2[j].style.display = "none";
		});
	}
	btns2[now2].className = "selected";
	startMove(lis2[now2], {
		"opacity": 100
	});
}
//自动轮播
function next2() {
	now2++;
	if(now2 == len2) {
		now2 = 0;
	}
	tab2();
}
var timer2 = setInterval(next2, 2000);
div2.onmouseover = function() {
	clearInterval(timer2);
}
div2.onmouseout = function() {
	timer2 = setInterval(next2, 2000);
}
//左右按钮
prev2.onclick = function() {
	now2 = --now2 < 0 ? len2 - 1 : now2;
	tab2();
}
next2.onclick = function() {
	now2 = ++now2 > len2 - 1 ? 0 : now2;
	tab2();
}