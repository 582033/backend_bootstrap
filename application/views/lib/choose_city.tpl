<div class="choose-city {$choose_class}">
	<div class="chooseCity">
		<strong>{$choose_label}：</strong>
		<input disabled="disabled" class="input_target" type="text" value="{if $choose_class == 'from_city'}{$from_city}{else}{$to_city}{/if}" placeholder="请选择{$choose_label}" />
		<button class="target_btn">选择</button>
	</div>
	<div class="chooseCity_popup">
		{if $choose_class == 'from_city'}
		<ul>
			{foreach $from_cities as $c}
			<li><a data-city_id="{$c.id}" href="{if $choose_class == 'to_city'}/attraction/{$c.id}{else}javascript:void(0){/if}">{$c.name}</a></li>
			{/foreach}
		</ul>
		{else}
		{foreach $cities as $cate => $city}
		<ul>
			<h3>{if $cate== '热门城市'}<font color="red">{$cate}</font>{else}{$cate}{/if}&nbsp;|</h3>
			{foreach $city as $c}
			<li><a data-city_id="{$c.id}" href="{if $choose_class == 'to_city'}/attraction/{$c.id}{else}javascript:void(0){/if}">{$c.name}</a></li>
			{/foreach}
		</ul>
		{/foreach}
		{/if}
	</div>
</div>

