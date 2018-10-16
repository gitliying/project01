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
