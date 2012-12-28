<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<script src="/sta/vendor/js/jquery-1.8.2.min.js"></script>
<script src="http://sta.in1001.com/lib/jquery/jquery.colorbox.js"></script>
<link rel="stylesheet" href="/sta/colorbox/colorbox.css" />
<style>
a,img,div{
-webkit-tap-highlight-color:rgba(0,0,0,0);
}
body{
	background-color:#dfdfdd;
	min-width:320px;
	padding:0px;
	margin:0px;
}
.contents{
	margin:3px auto;
	padding:2px;
	width:604px;
	border:1px solid #ccc;
	text-align:center;
}
.contents span{
	float:left;
	width:80px;
	clear:both;
}
.contents input {
	width:500px;
}
.contents select {
	width:500px;
}
.contents button{
	width:60px;
}
</style>
</head>
<body>
	<form action='/xianzong/add/{$id}' method='post'>
	<div class="contents">
		<span>标题:</span><input name='title' value='{$title}' required />
		<span>副标题:</span><input name='sub_title' value='{$sub_title}' required />
		<span>ICON:</span><input type='url' name='app_icon_url' value='{$app_icon_url}' required />
		<span>下载连接:</span><input type='url' name='download_url' value='{$download_url}' required />
		<span>类型:</span>
		<select name='xianzong_type'>
			<option value='android' {if $xianzong_type eq "android"}selected{/if}>ANDROID</option>
			<option value='ios' {if $xianzong_type eq "ios"}selected{/if}>IOS</option>
		</select>
		<button>确定</button>
	</div>
	</form>
</body>
<html>
