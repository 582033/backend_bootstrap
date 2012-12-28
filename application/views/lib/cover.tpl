		<dl id="container"  class="full {$place_type} clearfix masonry">
			{include file="lib/target_main.tpl"}
			{foreach $items as $item}
            <dd class="point clearfix">
				<div class="bg">
					<a href="{if $cover_style == 'cities'}/attraction/{$item.city_id}?id={$item.id}"{else}/{$list_type}/{$item.city_id}/detail/{$item.id}" target="_blank"{/if}>
					<img width="215px" height="153px" src="{if $item.cover}{$item.cover}{else}/sta/images/default_pic.png{/if}" />
					<div class="info">
						<span class="name">{$item.name|truncate:14:'':true}</span>
					</div>
					<div class="description">
						<div class="white_bg"></div>
						<div class="enter_info">
							<h3>
							{if $list_type == 'restaurant'}
								{if $item.recommend_foods!=''}网友推荐菜{else}暂无网友推荐菜{/if}
							{else}
								{$item.name}
							{/if}
							</h3>
							<p>
								{if $list_type == 'restaurant'}
								{$item.recommend_foods|truncate:130:'...':true}
								{else}
								{$item.intro|truncate:130:'...':true}
								{/if}
							</p>
							{if $cover_style != 'cities'}
                            <span>
                            <button class="remove" data-uid="{$item.uid}" data-id="{$item.id}" data-type="{$item.type}" data-city_id="{$item.city_id}" data-name="{$item.name}" data-city_name="{$item.city_name}" data-cover="{$item.cover}">加入清单</button>
                            <button class="got{if $item.type=='attraction' && $item.gone} got_ed{/if}" data-id="{$item.id}">去过</button>
                            <button class="want{if $item.type=='attraction' && $item.want} want_ed{/if}" data-id="{$item.id}">想去</button>
                            </span>
							{/if}
						</div>
					</div>
					<div class="stat">
						{if $cover_style == 'cities'}
						<span class="use"><b>{$item.uses_count}</b>人使用</span>
						<span class="view">￥<b>{$item.total_price}</b></span>
						{else}
						<span class="use"><b>{$item.wishes_count}</b>人想去</span>
						<span class="view"><i class="icon"></i><b>{$item.beentos_count}</b>人去过</span>
						{/if}
					</div>


<!--
					{if $cover_style != 'cities'}
					<dl class="clearfix">
						<dd class="gray clearfix">
							<img src="/sta/images/temp/user_small.png" alt="" class="userpic" />
							<p><a href="#">曹宇</a>喜欢<a href="#">上海</a></p>
						</dd>
						<dd class="clearfix">
							<img src="/sta/images/temp/user_small.png" alt="" class="userpic" />
							<p>asddsa</p>
						</dd>
						<dd class="post">
							<textarea class="posttext">快速发表您的评论</textarea>
							<span></span>
							<button type="submit"><img src="/sta/images/btn_bg6.png" alt="" /></button>
						</dd>
					</dl>
					{/if}
-->

				</a>
				</div>
				<div class="bottom"></div>
			</dd>
			{/foreach}
		</dl>
