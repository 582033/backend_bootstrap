<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="/sta/js/jquery-1.8.3.js"></script>
<script src="/sta/js/jquery.json-2.3.min.js"></script>
<script src="/sta/js/jquery.colorbox.js"></script>
<script src="/sta/js/jquery-ui.js"></script>
<link rel="stylesheet" href="/sta/colorbox/colorbox.css" />
<title>无标题文档</title>
<style>
td{ font-size:12px;}
</style>
<script>
function open_url(id){
	$.colorbox({ 
		top:'50px',
		opacity: 0.5,
		scrolling: false,
		href:'/partner/add/'+id
	});
}
</script>
</head>

<body>

<div style='width:1000px; margin:auto'><input type='button' onclick='open_url()' value='新增合作商'></div>
<table border="1px" cellpadding="3" cellspacing="1" width='1000px' align='center'>
	<tr>
		<td>合作商名称</td>
		<td>联系人</td>
		<td>联系人电话</td>
		<td>联系人邮箱</td>
		<td>本公司联系人</td>
		<td>状态</td>
		<td>操作</td>
	</tr>
	{foreach $partners as $partner}
	<tr>
		<td>{$partner.title}</td>
		<td>{$partner.outer_contact}</td>
		<td>{$partner.tel}</td>
		<td>{$partner.mail}</td>
		<td>{$partner.inner_contact}</td>
		<td>{if $partner.status == '1'}启用{else}禁用{/if}</td>
		<td><input type='button' onclick='open_url({$partner.id})' value='编辑'></td>
	</tr>
	{/foreach}

</table>
</body>
</html>

