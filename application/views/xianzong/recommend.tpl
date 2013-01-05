<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.8.3.js"></script>
<script src="/sta/vendor/js/jquery.json-2.3.min.js"></script>
<script src="http://sta.in1001.com/lib/jquery/jquery.colorbox.js"></script>
<script src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>
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
.list{
	clear:both;
	height:75px;	
	padding-right:15px;
	background:url('/sta/images/xianzong/listline.png') repeat-x center bottom;
}
.list img.icon{
	float:left;
	width:57px;
	height:57px;
	margin:9px 10px;
	border:0px #fff solid;
	border-top-left-radius:8px;
	border-top-right-radius:8px;
	border-bottom-left-radius:8px;
	border-bottom-right-radius:8px;
}
.list .content{
	width:210px;
	float:left;
}
.list .content .title{
	float:left;
	margin-top:12px;
	font-size:22px;
	color:#404040;
}
.list .content .sub_title{
	margin-top:8px;
	font-size:14px;
	width:100%;
	color:#535353;
	float:left;
}
.button {
	width:18px;
	height:38px;
	margin-top:18px;
	float:right;
	background:url('/sta/images/xianzong/nor1.png') no-repeat center;
	cursor:pointer;
}
.aa{
	background-color:#73c2c9;
}
</style>
<script>
	$(document).ready(function(){
		$( ".main" ).sortable({
			stop: function( event, ui ) { 
				var ids=[];
				$('input.ids').each(function(){
					var id = $(this).val();
					ids.push(id)	
				});
				console.log($.toJSON(ids));
				post_data = { ids : $.toJSON(ids) };
				$.post( '/xianzong/update_sortby', post_data);
			}
		});

		$('body').on('click', 'div.list', function(){
			id = $(this).find('input[type="hidden"]').val()
			$.colorbox({
				top:'50px',
				opacity: 0.5,
				scrolling: false,
				href:'/xianzong/add/'+id
			});
		});
	});
</script>
</head>
<body>
	<div><input type='button' value='ANDROID' onclick="location.href='/xianzong/android'"><input type='button' value='ios' onclick="location.href='/xianzong/ios'"></div>
	<div class="main">
		{foreach $apps as $app}
		<div class="list">
			<input class='ids' type='hidden' value='{$app.id}'>
			<img class="icon" src='{$app.app_icon_url}' >
			<div class="content">
				<div class="title">{$app.title}</div>
				<div class="sub_title">{$app.sub_title}</div>
			</div>
			<div class="button"></div>
		</div>
		{/foreach}
	</div>
	<div class="list"><input type='button' value='添加新应用'></div>
</body>
<html>
