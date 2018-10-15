<?php
	//连接数据库
	
	include 'connect.php';
	
	//写插入语句
	$cid=isset($_POST['cid']) ? $_POST['cid'] : '' ;
	$tel=isset($_POST['tel']) ? $_POST['tel'] : '' ;
	$password=isset($_POST['password']) ? $_POST['password'] : '';
//	$sql="insert into reg(tel,password) values(12345678911,123456)";
	$sql="insert into reg(cid,tel,password) values($cid,$tel,$password)";
	
	//执行查询语句
	$conn->query("SET NAMES utf8");
	$res=$conn->query($sql);
	
	
	if($res){
		echo '插入成功';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>