<div class="main">
	<dl id="container"  class="full {$place_type}  clearfix masonry">
		{foreach $items as $item}
		<dd class="point clearfix">
			<div class="bg">
				<a href="/attraction/{$item.city_id}?id={$item.id}" target="_blank">
					<img width="223px" height="187px" src="{if $item.cover}{$item.cover}{else}/sta/images/default_pic.png{/if}" />
					<div class="description">
						<div class="white_bg"></div>
						<div class="enter_info">
							<h3>{$item.name}</h3>
							<p>{$item.intro|truncate:130:'...':true}</p>
						</div>
					</div>
				</a>
				<div class="stat">
					<span><a href="/attraction/{$item.city_id}">{$item.city_name}</a>&nbsp;&nbsp;|&nbsp;&nbsp;{$item.name}</span>
				</div>
			</div><!-- bg end -->
			<div class="bottom"></div>
		</dd>
		{/foreach}
	</dl><!-- full end -->
{$pagelist}
</div><!-- main end -->
