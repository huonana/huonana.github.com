<?php
header('Content-Type: text/html; charset=utf-8');
/*
	Author:strive
	use_description:
		ajax:
		
		获取页数:
		qq_list.php?act=getPageCount
		return {error:0, msg:4}
		
		获取某一页数据
		qq_list.php?act=get&n=1
		return {error:0, msg:[{title:'xxx'},{}....]}
		
		发表评论
		qq_list.php?act=sendMsg&nickName=xxx&content=xxx
		return {error:1, msg:'xxx', time:xxx};
		
		获取评论的总页数
		qq_list.php?act=getSendPageCount
		return {error:0, count:1}
		
		获取某一页的评论
		qq_list.php?act=getSendPage&n=1
		
		
		
	*服务器的给客户端的时间单位是秒
		
*/

@mysql_connect('localhost','root','') or @mysql_connect('localhost','root','admin') or die('数据库连接失败');
mysql_query("set names 'utf8'");
mysql_query('CREATE DATABASE znsnew_qqList');
mysql_select_db('znsnew_qqList');

mysql_query("CREATE TABLE  `book` (
 `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
 `article_name` VARCHAR( 50 ) NOT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1");
mysql_query("CREATE TABLE  `apply` (
 `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
 `nickName` VARCHAR( 50 ) NOT NULL ,
 `content` VARCHAR( 128 ) NOT NULL ,
 `time` VARCHAR( 50 ) NOT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1");

mysql_query("INSERT INTO `book` VALUES (1, '第1章 楔子，冥婚')          " );
mysql_query("INSERT INTO `book` VALUES (2, ' 第2章 穿越遭乞丐羞辱')     " );
mysql_query("INSERT INTO `book` VALUES (3, '第3章 乞丐儿们')            " );
mysql_query("INSERT INTO `book` VALUES (4, '第4章 这不知廉耻的女人！')  " );
mysql_query("INSERT INTO `book` VALUES (5, '第5章 接踵而来的浪潮')      " );
mysql_query("INSERT INTO `book` VALUES (6, '第6章 大惊失色')            " );
mysql_query("INSERT INTO `book` VALUES (7, '第7章 还不给压压惊')        " );
mysql_query("INSERT INTO `book` VALUES (8, '第8章 我不疯')              " );
mysql_query("INSERT INTO `book` VALUES (9, '第9章 打的吐血')            " );
mysql_query("INSERT INTO `book` VALUES (10, '第10章 你以为王妃好当吗？')" );
mysql_query("INSERT INTO `book` VALUES (11, '第11章 没大脑')            " );
mysql_query("INSERT INTO `book` VALUES (12, '第12章 狼狈为奸')          " );
mysql_query("INSERT INTO `book` VALUES (13, '第13章 群鬼缠身')          " );
mysql_query("INSERT INTO `book` VALUES (14, '第14章 小鬼吓人')          " );
mysql_query("INSERT INTO `book` VALUES (15, '第15章 我要你的人')        " );
mysql_query("INSERT INTO `book` VALUES (16, '第16章 想跑？')            " );
mysql_query("INSERT INTO `book` VALUES (17, '第17章 跪下，还敢反抗？')  " );
mysql_query("INSERT INTO `book` VALUES (18, '第18章 看我反抗不反抗？')  " );
mysql_query("INSERT INTO `book` VALUES (19, ' 第19章 反抗给你看！')     " );
mysql_query("INSERT INTO `book` VALUES (20, '第20章 你这个狐狸精')      " );
mysql_query("INSERT INTO `book` VALUES (21, '第21章 让我收了你')        " );
mysql_query("INSERT INTO `book` VALUES (22, '第22章 该死的小贱人')      " );
mysql_query("INSERT INTO `book` VALUES (23, '第23章 别吓坏她了')        " );
mysql_query("INSERT INTO `book` VALUES (24, '第24章 闭门五天')          " );
mysql_query("INSERT INTO `book` VALUES (25, ' 第25章 让你给钱，天经地义')");
mysql_query("INSERT INTO `book` VALUES (26, '第26章 你这个贪财鬼')      " );
mysql_query("INSERT INTO `book` VALUES (27, ' 第27章 被欺负了')         " );
mysql_query("INSERT INTO `book` VALUES (28, ' 第28章 保护到底')         " );
mysql_query("INSERT INTO `book` VALUES (29, '第29章 那是一个秘密')      " );
mysql_query("INSERT INTO `book` VALUES (30, '第30章 被带绿帽了')        " );
mysql_query("INSERT INTO `book` VALUES (31, '第31章 不要丢下我')        " );
mysql_query("INSERT INTO `book` VALUES (32, '第32章 是死人用的')        " );
mysql_query("INSERT INTO `book` VALUES (33, '第33章 奇门遁甲之术')      " );
mysql_query("INSERT INTO `book` VALUES (34, '第34章 小心，会弄伤你的')  " );
mysql_query("INSERT INTO `book` VALUES (35, '第35章 亲了你')            " );
mysql_query("INSERT INTO `book` VALUES (36, ' 第36章 疼不疼？')         " );
mysql_query("INSERT INTO `book` VALUES (37, '第37章 坐毛驴车')          " );
mysql_query("INSERT INTO `book` VALUES (38, '第38章 食指大动')          " );
mysql_query("INSERT INTO `book` VALUES (39, '第39章 吃了他')            " );
mysql_query("INSERT INTO `book` VALUES (40, '第40章 你不是爹妈生的吗？')" );
mysql_query("INSERT INTO `book` VALUES (41, '第41章 吓坏了没？')        " );
mysql_query("INSERT INTO `book` VALUES (42, ' 第42章 割了舌头')         " );
mysql_query("INSERT INTO `book` VALUES (43, '第43章 白疼他了')          " );
mysql_query("INSERT INTO `book` VALUES (44, '第44章 逆女，大逆不道')    " );
mysql_query("INSERT INTO `book` VALUES (45, '第45章 你想让我死？我让你...')");
mysql_query("INSERT INTO `book` VALUES (46, ' 第46章 深明大义')         " );
mysql_query("INSERT INTO `book` VALUES (47, '第47章 要钱没有，要命一条')" );
mysql_query("INSERT INTO `book` VALUES (48, '第48章 爹补偿你')          " );
mysql_query("INSERT INTO `book` VALUES (49, '第49章 你的存在')          " );
mysql_query("INSERT INTO `book` VALUES (50, '第50章 做人难，做鬼更难')  " );
mysql_query("INSERT INTO `book` VALUES (51, '第51章 你好乖哦')  " );


$page_size=10;
$page_size2=3;
$act=@$_GET['act'];
$cb=@$_GET['cb'];
$n=@(int)$_GET['n'];

function echo_str($str){
	global $cb;
	if(strlen($cb)){
		die($cb.'('.$str.')'); 	
	}else{
		die($str);	
	}	
}
switch($act){
	case 'getPageCount':
		$sql="SELECT count(*) FROM book";
		$res=mysql_fetch_row(mysql_query($sql));
		$count=ceil($res[0]/$page_size);
		echo_str('{"error":0, msg:'.$count.'}');
		break;
	case 'get':
		$s=($n-1)*$page_size;
		$sql="SELECT * FROM book order by id asc LIMIT {$s},{$page_size}";
		$res=mysql_query($sql);
		while($row=mysql_fetch_row($res)){
			$data[]=array(
				'title' => $row[1],
				'ID' => $row[0]
			);	
		}
		if($data){
			echo_str('{"error":0, msg:'.json_encode($data).'}');
		}else{
			echo_str('{"error":0, msg:"暂无数据"}');	
		}
		break;
	case 'sendMsg':
		$nickName=@$_GET['nickName'];
		$content=@$_GET['content'];
		
		if($nickName=='' || $content==''){
			echo_str('{"error":1, msg:"内容不能为空"}');	
		}else{
			$sql="INSERT INTO  `znsnew_qqlist`.`apply` (
				`id` ,
				`nickName` ,
				`content` ,
				`time`
				)
				VALUES (
				NULL ,  '".$nickName."',  '".$content."', ".time()."
				)";
			mysql_query($sql);
			echo_str('{"error":0, msg:"发表评论成功", time:'.time().'}');		
		}
		break;
	case 'getSendPageCount':
		$res=mysql_fetch_row(mysql_query("SELECT count(*) FROM apply"));
		$count=ceil($res[0]/$page_size2);
		
		echo_str('{"error":0, count:'.$count.'}');
		break;	
	case 'getSendPage':
		$s=($n-1)*$page_size2;
		$sql="SELECT * FROM apply order by time desc LIMIT {$s},{$page_size2}";
		$res=mysql_query($sql);
		while($row=mysql_fetch_row($res)){
			$data[]=array(
				'nickName' => $row[1],
				'content' => $row[2],
				'pic'	=> $row[3],
				'time' => $row[4]
			);	
		}
		if($data){
			echo_str('{"error":0, msg:'.json_encode($data).'}');
		}else{
			echo_str('{"error":0, msg:"暂无数据"}');	
		}
		break;
}

?>










