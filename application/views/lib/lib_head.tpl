<div class="headerw">
<div class="header">
	<input id="img_host" type="hidden" value="{$img_host}" />
	<div class="container">
    	<a href="/" class="logo"><img src="/sta/images/logo.png" alt="" /></a>
        <ul class="menu">
        	<li class="w80"><a {if $pageinfo.pageid eq 'index'}class="sel"{/if} href="/">首页</a></li>
            <li><a href="javascript:void(0);">目的地探索</a>
            	<div class="target_explorer">
                    <!--<h3><span class="hot">热门城市</span>&nbsp;|</h3>-->
					{foreach $cities as $cate => $city}
					<h3>{if $cate== '热门城市'}<span class="hot">{$cate}</span>{else}{$cate}{/if}&nbsp;|</h3>
                    <ul>
						{foreach $city as $c}
						<li><a data-city_id="{$c.id}" href="/attraction/{$c.id}">{$c.name}</a></li>
						{/foreach}
                    </ul>
					{/foreach}
                </div><!-- target_explorer -->
            </li>
            <li><a {if $pageinfo.pageid eq 'download'}class="sel"{/if} href="/download">手机应用</a></li>
        </ul><!-- menu end -->
        
        <div class="wl_switch">
			<span id="add-place" style="float:left">添加</span>
			<div class="wl_toggle">
				<a href="#">我的旅行清单<br />
				城市<b id="city_count">0</b>&nbsp;地点<b id="place_count">0</b></a>
			</div>
        </div><!-- wl_switch -->
        
        <div class="line"></div>
        <div class="user_switch" style="display:none">
        	<a href="#" class="user" title=""><img src="" alt="" style="background-position:center;width: 40px; height: 40px; padding: 0px; border: 1px solid rgb(140, 118, 76); border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px;"/><span style="text-align:center"></span></a>
            <ul>
            	<li><a href="#" class="road">我规划的线路</a></li>
                <li><a href="#" class="want">我想去的地方</a></li>
                <li><a href="#" class="got">我的足迹</a></li>
                <!--<li><a href="#" class="help">关于和帮助</a></li>-->
                <li><a href="{$common.passport_url}/user/signout" class="logout">退出</a></li>
            </ul>
        </div>
        <div class="login"><a class="header-snslogin sina" href="/sns/redirect?snsid=sina&apptype=web&op=1"><img src="/sta/images/login_btn.png" alt="" /></a></div>
        <div class="line"></div>
    </div>
</div><!-- header end -->
<div class="wl_popup">
	<div class="tab-bar">
		<div class="tab-bar-inner clearfix">
			<span class="title ele">旅行清单：</span>
			<ul class="tab city ele">
				<!-- wishlist-city-tab-template -->
			</ul>
			<span class="more ele"><a href="#">&raquo;</a></span>
			<button class="btn_plan ele">规划线路</button>
			<!--<button class="btn_clear ele">移除清单</button>-->
		</div>
	</div>
	<div class="wl">
		<ul class="tab type">
			<!-- wishlist-type-tab-template -->
		</ul>
		<div class="city-places">
			<ul class="list">
				<!-- activity-view-template -->
			</ul>
		</div>
	</div><!-- wl end -->
</div><!-- wl_popup -->
<div class="head_wrapper">
	<div class="top">
    	<ul class="clearfix">
			{if $pageid == 'places'}<li class="sel">{else}<li>{/if}<span>1</span>添加景点到旅行清单</li>
            {if $pageid == 'plan-editor'}<li class="sel">{else}<li>{/if}<span>2</span>自动规划旅行线路</li>
            {if $pageid == 'plan-view'}<li class="sel">{else}<li>{/if}<span>3</span>保存或分享线路</li>
            <li class="search_bar"><form action='/search' method='GET'><input type="text" value="{if $search_keywords}{$search_keywords}{else}搜索景点、酒店、餐饮...{/if}" /><button type="submit"></button></form></li>
            <li class="btn_plan"><button>规划线路</button></li>
        </ul>
    </div><!-- top end -->
</div>
</div>

<!--提示窗 start-->
	<div id="dialog-del" style="display:none;" class="dialogdel">
			<p style="text-align:center; font-size:14px; line-height:16px; padding:5px 0;">您是否要移除当前目的地清单内的所有内容？</p>
            <p style="text-align:center;"><a href="javascript:void(0)" onclick="collections.clearCurCity();dialog();" style="display:inline-block; width:40px; height:27px; line-height:27px; text-align:center; color:#7e4f2a; background:url(/sta/images/btn_bg4.png) no-repeat left top;font-size:12px;">确定</a>　　<a href="javascript:void(0)" style="display:inline-block; width:40px; height:27px; line-height:27px; text-align:center; color:#7e4f2a; font-size:12px; background:url(/sta/images/btn_bg4.png) no-repeat left top;" onclick="dialog()">取消</a></p>
    </div>
	<div class="tips1" style="display:none;">
    	<div style=" padding:10px; color:#666;">
        	<p style=" font-size:12px; line-height:16px; padding:5px 0;">提示：新建愿望清单后，您的上一个清单将自动保存到您的用户中心<em style="color:#2870ca;">我的愿望清单</em>内，您可以在那里进入您
的上一个清单继续编辑。</p>
            <p style="text-align:center; line-height:16px; padding:5px 0;"><input id="new_collection_name" name="new_collection_name" type="text" value="我的愿望清单（默认）" style="color:#666; font-size:12px;" /></p>
            <p style="text-align:center;"><a href="javascript:void(0)" onclick="collections.newCollection();dialog();" style="display:inline-block; width:40px; height:27px; line-height:27px; text-align:center; color:#7e4f2a; background:url(/sta/images/btn_bg4.png) no-repeat left top;font-size:12px;">确定</a>　　<a href="javascript:void(0)" style="display:inline-block; width:40px; height:27px; line-height:27px; text-align:center; color:#7e4f2a; font-size:12px; background:url(/sta/images/btn_bg4.png) no-repeat left top;" onclick="dialog()">取消</a></p>
        </div>
    </div>
<!--提示窗 end-->

<script type="text/template" id="wishlist-city-tab-template">
	<% _.each(cities_stats, function(cstat) { %>
	<li class="<%= cstat.class_name %>" data-city_id="<%= cstat.city_id %>" data-city_name="<%= cstat.city_name %>">
		<%= cstat.city_name %>
		<b><%= cstat.wp_count %></b>
		<span class="remove"></span>
	</li>
	<% }); %>
</script>
<script type="text/template" id="wishlist-type-tab-template">
	<% _.each(types_stats, function(tstat) { %>
	<li class="<%= tstat.class_name %>" data-place_type="<%= tstat.place_type %>">
		<a href="javascript:void(0)" class="<%= tstat.place_type %>">
			<%= tstat.place_type_name %>
			<b><%= tstat.wp_count %></b>
		</a>
	</li>
	<% }); %>
</script>
<script type="text/template" id="activity-template">
	<div class="moveTip">
		<span></span><b></b>
	</div>
	<span class="remove"></span>
	<div class="title">
		<p class="bg"></p>
		<p class="text">
			<span class="sort"><%= activity.pin_letter %>. </span><%= activity.place.name %>
		</p>
	</div>
	<div class="info">
		<p class="bg"></p>
		<p class="text stay">
			<a href="#">修改</a>
			<span class="stay_hours">建议停留<b><%= activity.stay_hours %></b>小时</span>
			<input name="stay_hours" type="text" value="<%= activity.stay_hours %>" />
		</p>
		<p class="text uses">
			<span class="uses_count">共使用<b><%= activity.uses_count %></b>次</span>
		</p>
	</div>
	<img src="<%= activity.place.cover %>" class="spot" />
</script>
