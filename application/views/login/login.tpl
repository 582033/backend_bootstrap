<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>千夜后台管理</title>
	<link rel="stylesheet" href="/sta/css/bootstrap.min.css">
	<link rel="stylesheet" href="/sta/css/bootstrap-responsive.min.css">
	<script src="/sta/js/jquery-latest.js"></script>
	<script src="/sta/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/sta/css/login.css" />
</head>
<body>
	<div class="video_content_list {if $username}hero-unit{/if}">
	{if $username}
		<h3>用户：<font color='red'>{$username}</font>已登录！</h3>
		<ul>
			
			<li><a href='/partner/'>合作商管理</a></li>
			<li><a href='/xianzong/'>仙踪合作应用管理</a></li>
			<li><a href='/order/'>订单管理</a></li>
		</ul>
		<input class="btn" style="float:right" type="button" onclick="window.location='/login/logout'" value="退出登录">
	{else}
		<form name="form" method="post" action="/login/index" enctype="multipart/form-data">
		<table align="center">
		<tr><td></td><td>&nbsp;&nbsp;<h2>用户登录</h2></td></tr>
		<tr><td>用户名:</td><td><input type="text" name="username" value="" placeholder="用户名" required></td></tr>
		<tr><td>密码:</td><td><input type="password" name="passwd" value="" placeholder="密码" required></td></tr>
		<tr><td></td><td>&nbsp;&nbsp;<input class="btn" type="submit" value="登录"></td></tr>
		</table>
		</form>
	{/if}
</body>
</html>
