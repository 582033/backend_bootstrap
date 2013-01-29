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
	font-size:12px;
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
	<form action='/partner/add/{$id}' method='post'>
	<div class="contents">
		<span>合作商名称:</span><input name='title' value='{$title}' required />
		<span>联系人:</span><input name='outer_contact' value='{$outer_contact}' required />
		<span>电话:</span><input type='phone' name='tel' value='{$tel}' required />
		<span>邮箱:</span><input type='mail' name='mail' value='{$mail}'  />
		<span>本公司联系人:</span><input name='inner_contact' value='{$inner_contact}' required />
		<span>状态:</span>
		<select name='status'>
			<option value='1' {if $status eq "1"}selected{/if}>启用</option>
			<option value='0' {if $status eq "0"}selected{/if}>禁用</option>
		</select>
		<button>确定</button>
	</div>
	</form>
</body>
<html>
