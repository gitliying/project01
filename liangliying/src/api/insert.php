<?php
	//连接数据库
	
	include 'connect.php';
	
	//写插入语句
	$cid=isset($_POST['cid']) ? $_POST['cid'] : '' ;
	$tel=isset($_POST['tel']) ? $_POST['tel'] : '' ;
	$password=isset($_POST['pass']) ? $_POST['pass'] : '';
//	$sql="insert into reg(cid,tel,password) values(30,12345678911,123456)";

	$sql="insert into reg(cid,tel,password) values($cid,$tel,$password)";
	//echo ($tel);
	//执行查询语句
	$conn->query("SET NAMES utf8");
	$res=$conn->query($sql);
	
	
	if($res){
		echo '插入成功';
	}else{
		echo '失败';
	}
	
	//关闭连接数据库
	
    $conn->close();//关闭数据库的链接
?>