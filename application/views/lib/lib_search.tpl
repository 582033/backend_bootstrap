{if $items}
<div class="w850">
	<dl class="wrapper_right">
		{if $items[$placetype]['items']}
		{foreach $items[$placetype]['items'] as $item}
		<dd class="point clearfix">
			<div class="bg">
				<a href="/{$item.type}/{$item.city_id}/detail/{$item.id}">
					<img src="{$item.cover}" />
					<div class="description">
						<div class="white_bg"></div>
						<div class="view"></div>
					</div>
				</a>
				<div class="stat">
					<span><a href="/{$item.type}/{$item.city_id}?id={$item.id}">{$item.city_name|truncate:"10":""}</a>&nbsp;&nbsp;|&nbsp;&nbsp;{$item.name|truncate:"12":""}</span>
				</div>
				<div><button class="remove" data-id="{$item.id}" data-type="{$item.type}" data-city_id="{$item.city_id}" data-name="{$item.name}" data-city_name="{$item.city_name}" data-cover="{$item.cover}">加入清单</button></div>
			</div><!-- bg end -->
		</dd>
		{/foreach}
		{else}
			<div class="no_result title">暂无关于"<span>{$search_keywords}</span>"的{$placetypes[$placetype]}</div>
		{/if}
	</dl>
	{$pagelist}
</div>
{/if}
