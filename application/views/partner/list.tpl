{capture name="wrapper"}
<div class='well' style='width:80%; margin:auto'>
<div style='margin-bottom:10px'><input class='btn btn-primary' type='button' onclick='open_url()' value='新增合作商'></div>
<table border="0" cellpadding="3" cellspacing="1" class='table table-bordered table-striped table-hover'>
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
		<td><input class='btn' type='button' onclick='open_url({$partner.id})' value='编辑'></td>
	</tr>
	{/foreach}

</table>
</div>
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
{/capture}
{include file='index.tpl' page_id='partner'}
