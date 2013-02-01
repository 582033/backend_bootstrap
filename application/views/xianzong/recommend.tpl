{capture name='wrapper'}
<style>
a,img,div{
-webkit-tap-highlight-color:rgba(0,0,0,0);
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

		$('body').on('click', 'div.list, .add_app', function(){
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
	<div class='container well' style='margin:auto;margin-bottom:10px;'>
		<input class='btn btn-primary' type='button' value='ANDROID' onclick="location.href='/xianzong/android'">
		<input class='btn btn-primary' type='button' value='ios' onclick="location.href='/xianzong/ios'">
		<input class='add_app btn btn-primary' type='button' value='添加新应用'>
		<p></p>
	</div>
	<div class="container well main">
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
{/capture}
{include file='index.tpl' page_id='xianzong'}
