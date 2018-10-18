<?php
	//连接数据库
	
	include 'connect.php';
	
	//写插入语句
	$gid=isset($_GET['gid']) ? $_GET['gid'] : '' ;
	$url=isset($_GET['url']) ? $_GET['url'] : '' ;
	$title=isset($_GET['title']) ? $_GET['title'] : '' ;
	$nowprice=isset($_GET['nowprice']) ? $_GET['nowprice'] : '' ;
	$nums=isset($_GET['nums']) ? $_GET['nums'] : '' ;
//	echo $gid;
	
	
//	$sql="insert into reg(cid,tel,password) values(30,12345678911,123456)";

//	$sql="insert into caruserinfo(gid,title,nowprice,num,url) values('5','大哥大','22','8','img/imglists/g (2).jpg')";
	$sql="insert into caruserinfo(gid,title,nowprice,num,url) values('$gid','$title','$nowprice','$nums','$url')";
//	echo ($sql);
	//执行查询语句
	$conn->query("SET NAMES utf8");
	$res=$conn->query($sql);
//	echo $res;
	
	if($res){
		echo '插入成功';
	}else{
		echo '失败';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>