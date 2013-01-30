<link rel="stylesheet" type="text/css" href="/sta/css/login.css" />
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>千夜后台管理</title>
	</head>
<body>
	<div class="video_content_list">
	{if $username}
		用户：{$username}已登录！<br />
		<input type="button" onclick="window.location='/login/logout'" value="退出登录"><br/>
		<a href='/partner/'>合作商管理</a><br/>
		<a href='/'>仙踪合作应用管理</a><br/>
		<a href='/order/'>订单管理</a><br/>
	{else}
		<form name="form" method="post" action="/login/index" enctype="multipart/form-data">
		<table align="center">
		<tr><td></td><td>&nbsp;&nbsp;<font size='5'><b>用户登录</b></font></td></tr>
		<tr><td>用户名:</td><td><input type="text" name="username" value=""></td></tr>
		<tr><td>密码:</td><td><input type="passwd" name="passwd" value=""></td></tr>
		<tr><td></td><td>&nbsp;&nbsp;<input type="submit" value="登录"></td></tr>
		</table>
		</form>
	{/if}
	</div>
</body>
</html>
