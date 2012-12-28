{capture name="wrapper"}
        <script type="text/javascript">
			$(function() {
				new PlanView({$days});
			});
        </script>
	<style media="print">
		.print_button{
			display:hidden;
		}
	</style>
    
	<div class="route_header">
        <div class="info_bg"></div>
		<a class="print_button" href="javascript:window.print();">打印</a>
        <div class="info">
        	<span>旅行时间：{$plan.plan_info.start_day} 至 {$plan.plan_info.end_day}</span>
			<img src="{$plan.plan_info.author.avatar_url}!50" alt="{$plan.plan_info.author.nickname}" />{$plan.suggested_title}
        </div>
	</div><!-- route_header end -->
    <dl class="route_plan">
		{foreach $plan.days as $day}
    	<dt><span>{$day.daymd.m}月{$day.daymd.d}日</span>第{$day.container + 1}天行程安排:</dt>
		{if $day.activities}
        <dd><div class="MapCanvas_{$day.container} GoogleMap"></div></dd>
		{/if}
		{foreach $day.activities as $i => $ac}
        <dd class="poi">
        	<h3>{$i + 1}.{$ac.place.name}</h3>
           	<p><b>人均：</b>￥{$ac.place.price}</p>
            <p><strong>开放时间：</strong>{$ac.place.opentime}</p>
            <p><strong>简介：</strong>{$ac.place.intro|mbtruncate:140}</p>
        </dd>
		{/foreach}
		{/foreach}
    </dl>
{/capture}
 
{include file="lib/wrapper.tpl"}
