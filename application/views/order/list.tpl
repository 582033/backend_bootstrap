{capture name='wrapper'}
<div class='well' style='width:80%; margin:auto'>
	<table border="0" cellpadding="3" cellspacing="1" class='table table-bordered table-striped table-hover'>
		<tr>
			<td>订单号</td>
			<td>用户名</td>
			<td>下单时间</td><td>联系人</td><td>联系电话</td><td>人数</td>
			<td>天数</td>
			<td>出发日期</td><td>线路id</td>
			<td>所需服务</td>
			<td>有无备注</td>
			<td>状态</td>
			<td>分配客服</td>
			<td>操作</td>
		</tr>
		{foreach $orders as $order}
		<tr>
			<td><a href='http://www.in1001.com/plan/{$order.plan}/printpreview?order_id={$order.number}'>{$order.number}</a></td>
			<td>{$order.name}</td>
			<td>{date('Y-m-d H:m', $order.time_created)}</td>
			<td>{$order.linkman}</td>
			<td>{$order.contact}</td>
			<td>{$order.count_person}</td>
			<td>{$order.count_day}</td>
			<td>{date('Y-m-d', $order.time_depart)}</td>
			<td>{$order.plan}</td>
			<td>
				{if $order.is_need_guide eq '1'}<img src="http://www.in1001.com/static/newstyle/image/icon/guide.png" alt="导游" title="导游">{/if}
				{if $order.is_need_return_ticket eq '1'}<img src="http://www.in1001.com/static/newstyle/image/icon/air.png" alt="往返交通" title="往返交通">{/if}
				{if $order.is_need_hotel eq '1'}<img src="http://www.in1001.com/static/newstyle/image/icon/hotel.png" alt="酒店" title="酒店">{/if}
				{if $order.is_need_car_renting_service eq '1'}<img src="http://www.in1001.com/static/newstyle/image/icon/bus.png" alt="包车" title="包车">{/if}
				{if $order.is_need_restaurant eq '1'}<img src="http://www.in1001.com/static/newstyle/image/icon/food.png" alt="当地餐饮" title="当地餐饮">{/if}
			</td>
			<td>{if $order.memo == ''}无{else}有{/if}</td>
			<td>{$order_status[$order.status]}</td>
			<td>{$order.username}</td>
			<td><input type='button' class='btn {if $order.status > '0' && $order.status < '4'}btn-danger{/if}' value='操作' onclick='location.href="/order/edit/{$order.id}"'></td>
		</tr>
		{/foreach}
	</table>
</div>
{/capture}
{include file='index.tpl' page_id='order'}
