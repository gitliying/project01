<?php
	//连接数据库
	include 'connect.php';
	//查询语句
	$sql="update goodslist set url='img/imglists/g (1).jpg' where gid='1'";
	//执行查询语句
	$conn->query("SET NAMES utf8");
	$res=$conn->query($sql);
	
	if($res){
		echo '更新成功';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>