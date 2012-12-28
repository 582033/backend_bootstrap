{capture name="wrapper"}
        <script>
			$(function() {
				new PlanView({$days});
			});
        </script>
        <div class="header_review">
            <div class="info_bg"></div>
            <div class="info">
                <span class="time">旅行时间：{$plan.plan_info.start_day} 至 {$plan.plan_info.end_day}</span>
				<img src="{$plan.plan_info.author.avatar_url}!50" alt="{$plan.plan_info.author.nickname}" />{$plan.suggested_title}
				<span class="plan-price">
					人均预算:机票{$plan.prices.traffic}元+住宿{$plan.prices.hotel}元+门票{$plan.prices.attraction}元+餐饮{$plan.prices.restaurant}元，共计{$plan.prices.total}元（此价格仅供参考，如遇当季相应价格调整，以实际价格为准）
				</span>
			</div>
			<div class="contrl noprint">
				<div class="printBG"></div>
				<div class="printBTN">
					<img src="/sta/images/tongbu.png" alt="" /><br />
					<a href="/plan/{$plan.plan_info.id}/printpreview" target="_blank"><img src="/sta/images/btn_print.png" alt="" /></a><br />
					<!--
					<h2>您创建的其他清单：</h2>
					<a href="#">《我的新疆和西北之旅》</a>
					<a href="#">《我的新疆和西北之旅》</a>
					-->
				</div>
			</div>
        </div>
        <div class="line_view">
            <div class="select_point">
                <div class="container">
                    <ul class="menu">
						{foreach $place_types as $type => $type_cn}
						<li class="{$type}{if $type == $place_type} sel{/if}">
							<a href="/plan/{$plan.plan_info.id}/view{if $type != 'all'}?type={$type}{/if}" class="{$type}">{$type_cn}</a>
                        </li>
						{/foreach}
                    </ul>
					<div class="editarea">
						<a href="javascript:dialog('保存线路','.saveRoad',410);" class="save">保存</a>
						<a href="/plan/{$plan.plan_info.id}/edit" class="backedit">返回编辑</a>
					</div>
                    <span></span>
                </div>
            </div>
        </div>
        <div class="line_view clearfix">
            <dl class="view">
				{foreach $plan.days as $day}
                <dt class="box">
                    <p class="info">
						<span>{$day.daymd.m}月</span>
						<span>{$day.daymd.d}日</span>
                    </p>
                    <p class="viewMap noprint">
					<!--
                        <a href="#">查看地图线路</a>
					-->
                    </p>第<font>{$day.container + 1}</font>天行程安排:
<!--
[
					<span class="noprint"><a href="/plan/{$plan.plan_info.id}/edit">编辑当天线路</a>]</span>
-->
				</dt>
				{if $day.activities}
				<dd class="box"><table class="MapCanvas_{$day.container}" style="height:270px;"></table></dd>
				{/if}
				{foreach $day.activities as $i => $ac}
				<dd class="box{if $ac.is_last} last{/if}">
				{if $ac.place_type == 'jt'}
                    <p class="info jt"></p>
                    <h2>
						<a href="#">{$ac.title}</a>
						<img src="/sta/images/icon/fly.png" alt="" />飞机交通信息
					</h2>
					<p class="row">{$ac.note}</p>
				{else}
					<p class="info {$ac.place_type}"></p>
					<div class="road_point">
						<div class="thumb">
							<a href="{$ac.place.detail_url}" class="thumb">
								<img src="{$ac.place.cover}" alt="" />
							</a>
							<p>
								<!--
								<a href="#"><font>{$ac.place.comments_count}</font>人评价过</a>
								-->
								<strong>￥
									<font>{$ac.place.price}</font>
								</strong>
							</p>
						</div>
						<div class="info">
							<h2>
<!--
								<span class="noprint">
									<a href="#">查看地图位置</a>
								</span>
-->
								<font>{$i + 1}.</font>
								<a href="{$ac.place.detail_url}">{$ac.place.name}</a>
							</h2>
							<p>人均：{$ac.place.price}</p>
							<p>营业时间：{$ac.place.opentime}</p>
							<p>简介：{$ac.place.intro|mbtruncate:140}</p>
						</div>
					</div>
				{/if}
				</dd>
				{/foreach}
				{/foreach}
            </dl>
			{include file='lib/lib_comment.tpl'}
            <div class="right box">
                <dl class="list">
                    <dt>推荐热门景点：</dt>
					{foreach $hot_places as $place}
                    <dd class="bg">
                        <a href="{$place.detail_url}">
							<img src="{$place.cover}" />
                        <div class="info">
							<span class="{$place.type}">{$place.name}</span>
                        </div>
                        <div class="description">
                            <div class="white_bg"></div>
                            <div class="enter_info">
								<h3>{$place.name}</h3>
								<p>{$place.intro|mbtruncate:140}</p>
                            </div>
                        </div>
                    </a>
                        <div class="stat">
                            <span class="use">
								<b>{$place.beentos_count}</b>人已去过</span>
                            <span class="comment">
                                <i class="icon"></i>
								<b>{$place.wishes_count}</b>人想去</span>
                        </div>
                    </dd>
					{/foreach}
                </dl>
            </div>
        </div>
		<div class="saveRoad" style="display:none">
			<div class="saveRoadDialog">
				<p>请输入线路名称</p>
				<form>
					<p><input type="text" value="{$plan.suggested_title}" class="roadname" onclick="this.style.color='#000'" /></p>
					<p>
						<input type="hidden" value="{$plan.plan_info.id}" id="plan_id" />
						<input type="button" value="确定" class="ok" onclick="plan_view.save_plan()" />
						<input type="button" value="取消" onclick="dialog();" class="cancel" />
					</p>
				</form>
			</div>
		</div>
{/capture}
 
{include file="lib/wrapper.tpl"}
