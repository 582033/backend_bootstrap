{capture name='wrapper'}
<script>
	$(document).ready(function(){
		var partner = $('div#partner');
		$('select[name="status"]').change(function(){
			console.log(this.value);
			if(this.value == '3'){
				partner.show();
			}
			else {
				partner.hide();
			}
		});
	});
</script>
</head>

<body>

	<div class='container well'>
	<div>
		<table border="0" cellpadding="3" cellspacing="1" class='table table-bordered table-striped'>
			<tr>
				<td>订单</td>
				<td><a href='http://www.in1001.com/plan/{$order.plan}/printpreview?order_id={$order.number}'>{$order.number}</a></td>
				<td>紧急度</td>
				<td></td>
				<td>线路ID</td>
				<td>{$order.plan}</td>
			</tr>
			<tr>
				<td>下单日期</td>
				<td>{date('Y-m-d H:m:s', $order.time_created)}</td>
				<td>用户名</td>
				<td>{$order.name}</td>
				<td>出发地</td>
				<td></td>
			</tr>
			<tr>
				<td>出发日期</td>
				<td>{date('Y-m-d', $order.time_depart)}</td>
				<td>人数</td>
				<td>{$order.count_person}</td>
				<td>天数</td>
				<td>{$order.count_day}</td>
			</tr>
			<tr>
				<td>联系人</td>
				<td>{$order.linkman}</td>
				<td>联系电话</td>
				<td>{$order.contact}</td>
				<td>目的地</td>
				<td></td>
			</tr>
			<tr>
				<td>所需服务</td>
				<td colspan='5'>
				{if $order.is_need_guide eq '1'}导游{/if}&nbsp;
				{if $order.is_need_return_ticket eq '1'}机票{/if}&nbsp;
				{if $order.is_need_hotel eq '1'}住宿{/if}&nbsp;
				{if $order.is_need_car_renting_service eq '1'}包车{/if}&nbsp;
				{if $order.is_need_restaurant eq '1'}餐饮{/if}&nbsp;
				</td>
			</tr>
			<tr>
				<td>状态</td>
				<td colspan='5'>{$order_status[$order.status]}</td>
			</tr>
			<tr>
				<td>备注</td>
				<td colspan='5'>{if $order.memo == ''}无{else}{$order.memo}{/if}</td>
			</tr>
			<tr>
				<td>服务商</td>
				<td colspan='5'></td>
			</tr>
		</table>
	</div>
	<form class='form-horizontal' action='' method='POST'>
	<div class='control-group'>
		<label>状态:</label>
		<select name='status'>
			{html_options options=$order_status selected=$order.status}
		</select>
	</div>
	<div class='control-group' id='partner' {if $order.status != '3'} style='display:none'{/if}>
		<label>分配服务商:</label>
		<select name='partner_id'>
			{foreach $partners as $partner}
			<option value='{$partner['id']}' {if $last_log.partner_id eq $partner['id']}selected='selected'{/if}>{$partner['name']}</option>
			{/foreach}
		</select>
	</div>
	<div class='control-group'>
		<label>电话回呼:</label>
		&nbsp; &nbsp; 
		是 <input type='radio' value='1' name='call_back'>
		&nbsp; &nbsp;
		否 <input type='radio' value='0' name='call_back' checked />
	</div>
	<div class='control-group'>
		<label>备注:</label>
		<textarea name='memo' rows='5'>{$last_log.memo}</textarea>
	</div>
	<div class='control-group'>
		<label>
			<input class='btn btn-primary' type='submit' value='提交'>
		</label>
	</div>
	</form>
	</div>
	<div class='container' style='margin-top:50px'>
		<h5>操作日志</h5>
		<table class='table table-hover'>
			<tr>
				<td>时间:</td>
				<td>客服:</td>
				<td>状态改为:</td>
				<td>分配旅行社:</td>
				<td>电话回呼:</td>
				<td>备注:</td>
			</tr>
			{foreach $logs as $log}
			<tr>
				<td>{$log.created_at}</td>
				<td>{$log.operator}</td>
				<td>{$order_status[$log.status]}</td>
				<td>{$log.title}</td>
				<td>{if $log.call_back eq '0'}否{else}是{/if}</td>
				<td>{if $log.memo}{$log.memo}{else}无{/if}</td>
			</tr>
			{/foreach}
		</table>
	</div>
{/capture}
{include file='index.tpl' page_id='order'}
