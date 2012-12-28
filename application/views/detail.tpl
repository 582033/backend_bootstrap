{capture name="wrapper"}
	<script type="text/javascript">
		$(function() {
			var galleries = $('.ad-gallery').adGallery();
		});
		$(document).ready(function(){	
			$(".bg img").hover(function(){
				$(this).parent().find(".description").show();
				},function(){
        		$(this).parent().find(".description").hide();
			});
			$(".bg .info").hover(function(){
				$(this).parent().find(".description").show();
				},function(){
        		$(this).parent().find(".description").hide();
			});
			$(".description").hover(function(){
				$(this).parent().find(".description").show();
				},function(){
        		$(this).parent().find(".description").hide();
			});		
			$(".posttext").textareaAutoHeight({ maxHeight:100 });
			notext="快速发表您的回复";
			$(".posttext").focus(function(){
				$(this).parent().find("button").show();
				if ($(this).text()==notext){
					$(this).text("");
					$(this).css("color","#000");
				}
			});
			$(".posttext").blur(function(){
				$(this).parent().find("button").hide();
				if ($(this).text().length==0){
					$(this).text(notext);
					$(this).css("color","#999");
				}
			});
			$(function(){
				function countByteLength(str, cnCharByteLen)
				{
					var reCnChar = /[^\x00-\xff]/g;
					var cn = str.match(reCnChar);
					var cn_len = 0;
					if(cn){
						cn_len = cn.length * --cnCharByteLen;
					}
					return str.length + cn_len;
				}
				$('#post_comment').keyup(function(){
					var max_cnt = 300;//最大字符数
					var post_cnt = countByteLength($.trim($(this).val()), 1);
					$('#comment_max_cnt').text(max_cnt - post_cnt);
					if(max_cnt <= post_cnt){
						$('#comment_max_cnt').css('color','red');
						$('#post_comment').val($('#post_comment').val().substr(0, max_cnt));
					} else {
						$('#comment_max_cnt').css('color','#009933');
					}
				});
			});
		});
    </script>
<div class="nav_container">
	<div class="nav">
		<a href="/">首页</a>&nbsp;&gt;&nbsp;<a href="/{$list_type}/{$cid}">{$detail.city_name}</a>&gt;{$detail.name}
    </div>
</div>
<div class="main clearfix">
	<div class="wrapper_sidebar">
        <dl class="sidebar_vicinity">
            <dt>地图</dt>
            <dd class="bg">
					<div class="map" id="map"></div>
					<div class="stat"><span class="use" id="bigmap"><a class="bigmap" href="/bigmap">查看完整地图</a></span></div>
					<script type="text/javascript">
						var map = new BMap.Map("map");
						var point = new BMap.Point({$detail.blgt}, {$detail.blat});
						var marker = new BMap.Marker(point);  
						map.addOverlay(marker);  
						map.centerAndZoom(point, 15);
						map.addControl(new BMap.NavigationControl());  
						map.addControl(new BMap.ScaleControl());  
						map.addControl(new BMap.OverviewMapControl());  
						map.addControl(new BMap.MapTypeControl());
						$(document).ready(function(){
							var bigmap_style = "width:800px;height:500px;margin:0 auto";
							{literal}
							$('.bigmap').colorbox({iframe:true, width:"800px", height:"500px", margin:"0 auto"});
							$('.callbacks').colorbox();
							{/literal}
						});
					</script>
            </dd>
        </dl>
		
		{if $near != NULL}
		{foreach $near as $a=>$k}
		{if $near.$a neq NULL}
        <dl class="sidebar_vicinity">
            <dt>附近{$list_type_name[$a]}</dt>
            <dd class="bg">
                <a target="_BLANK" href="/{$a}/{$cid}/detail/{$k['id']}">
                    <img src="{$k['cover']}" />
                    <div class="info">
                        <span class="{if $a == "hotel"}hotel{/if} {if $a=="restaurant"}restaurant{/if} {if $a=="shop"}shop{/if} {if $a=="attraction"}sight{/if}">{$k['name']}</span>
                    </div>
					{if $a != 'restaurant'}
                    <div class="description">
                        <div class="white_bg"></div>
                        <div class="enter_info">
                            <h3>{$k['name']}</h3>
                            <p>{$k['intro']|truncate:80:"..."}</p>
                        </div>
                    </div>
					{/if}
                </a>
				{if $list_type_name[$a] eq '景点'}
                <div class="stat">
					<span class="use"><b>{$k.wishes_count}</b>人想去</span>
					<span class="view" style="float:right;"><i class="icon"></i><b>{$k.beentos_count}</b>人去过</span>
                </div>
				{/if}
            </dd>
        </dl>
		{/if}
		{/foreach}
		{/if}
    </div>
	<div class="wrapper">
    	<div class="wrapper_inner">
            <div id="gallery" class="ad-gallery">
                <div class="ad-image-wrapper" style="z-index:0"></div>
                <div class="ad-nav">
                    <div class="ad-thumbs">
                      <ul class="ad-thumb-list">
						{if !$detail.photos}
                        <li>
                          <a href="http://thumb.wowpad.cn/thumb?size=490x326&zoomin=1&fit=s&src=http://media.in1001.com/medialib/common/default_pic.png">
                            <img src="http://thumb.wowpad.cn/thumb?size=90x60&fit=c&src=&src=http://media.in1001.com/medialib/common/default_pic.png" {$photo}title="" alt="" class="image1">
                          </a>
                        </li>
						{else}
						{foreach $detail.photos as $photo}
                        <li>
                          <a href="http://thumb.wowpad.cn/thumb?size=490x326&zoomin=1&fit=s&{if $detail.type == 'attraction'}cut=b20&{/if}src={$photo}">
                            <img src="http://thumb.wowpad.cn/thumb?size=90x60&fit=c&{if $detail.type == 'attraction'}cut=b20&{/if}src={$photo}" title="" alt="" class="image1">
                          </a>
                        </li>
						{/foreach}
						{/if}
                      </ul>
                    </div>
                </div>
            </div>
            <dl class="info">
            	<dt>{$detail.name}</dt>
				{if $detail.opentime}
                <dd>开放时间：<span>{$detail.opentime|replace:"。":""}</span></dd>
				{/if}
                {if $detail.address}<dd>地址：<span>{$detail.address}</span></dd>{/if}
                <dd>{if $list_type=='hotel'}最低{/if}{if $list_type=='attraction'}门票{/if}{if $list_type=='restaurant'}人均{/if}价格：<span>{$detail.price_desc}</span></dd>
				{if $detail.cate}
                <dd>{$list_type_name[$list_type]}类型：<span>{$detail.cate}</span></dd>
				{/if}
				{if $detail.phone}
                <dd>电话：<span>{$detail.phone}</span></dd>
				{/if}
				{if $detail.best_visit_time}
                <dd>建议游玩季节：<span>{$detail.best_visit_time|replace:"。":""}</span></dd>
                {if $detail.stay_hours}
				<dd>建议游玩时长：<span>{$detail.stay_hours}小时</span></dd>
				{/if}
				{/if}
                <!--<dd>交通：<span></span></dd>-->
				{if $detail.cuisines}
                <dd>特色菜：<span>{$detail.cuisines}</span></dd>
				{/if}
				{if $detail.tags}
                <dd>标签：<span>{$detail.tags}</span></dd>
				{/if}
				<dd><button class="addlist" data-id="{$detail.id}" data-type="{$detail.type}" data-city_id="{$detail.city_id}" data-name="{$detail.name}" data-city_name="{$detail.city_name}" data-cover="{$detail.cover}">加入清单</button>{if $list_type == 'hotel'}<a href="http://www.17u.cn/HotelInfo-{$detail.id}.html" target="_blank"><button>点此订购</button></a>{/if}</dd>
				{if $list_type == 'attraction'}
                <dd><button class="want {if $wantgone.want} want_ed{/if}" data-id="{$detail.id}">想去</button><button class="got{if $wantgone.gone} got_ed{/if}" data-id="{$detail.id}">去过</button></dd>
				{/if}
            </dl>
        <script>
		$(function(){
			$("button.want").click(function(event) {
				var w = new wishList(this,'want');
				w.commit();
			});
			$("button.got").click(function(event) {
				var w = new wishList(this,'gone');
				w.commit();
			});
		});
		</script>
	<script type="text/javascript" src="/sta/vendor/js/jquery.json-2.3.min.js"></script> 
        </div>
    	<div class="bottom clearfix"></div>
    </div>
    <div class="intro">
    	<div class="bg">
			{if $detail.intro}
            <dl>
                <dt>{$list_type_name[$list_type]}简介</dt>
                <dd><p>{$detail.intro}</p></dd>
            </dl>
			{/if}
			{if $detail.recommend_foods}
            <dl>
                <dt>网友推荐</dt>
                <dd><p>{$detail.recommend_foods}</p></dd>
            </dl>
			{/if}
			{if $detail.traffic}
            <dl>
                <dt>交通信息</dt>
                <dd>
				{if is_array($detail.traffic)}
					{if $detail.traffic.local}
                	{foreach $detail.traffic.local as $local}<p>[{$local.name}]{$local.desc}</p>{/foreach}
					{/if}
					{if $detail.traffic.remote}
                	{foreach $detail.traffic.remote as $remote}<p>[{$remote.name}]{$remote.desc}</p>{/foreach}
					{/if}
				{else}
				<p>{$detail.traffic}</p>
				{/if}
                </dd>
            </dl>
			{/if}
			{if $detail.bus != '' or $detail.subway != ''}
            <dl>
                <dt>交通信息</dt>
                <dd>
                	<p>{$detail.bus}{$detail.subway}</p>
                </dd>
            </dl>
			{/if}
			{if $detail.atmosphere}
            <dl>
                <dt>餐厅氛围</dt>
                <dd><p>{$detail.atmosphere}</p></dd>
            </dl>
			{/if}
			{if $detail.feature}
            <dl>
                <dt>{$list_type_name[$list_type]}特色</dt>
                <dd>
                	<p>{$detail.feature}</p>
                </dd>
            </dl>
			{/if}
			{if $detail.culture_history}
            <dl>
                <dt>文化历史与环境</dt>
                <dd>
					{foreach $detail.culture_history as $ch}
                	<p>{if $ch.name}{$ch.name}:{/if}{$ch.desc}<br ></p>
					{/foreach}
                </dd>
            </dl>
			{/if}
			{if $detail.attention}
            <dl>
                <dt>小贴士</dt>
                <dd>
					{foreach $detail.attention as $ch}
                	<p>{if $ch.name}{$ch.name}:{/if}{$ch.desc}<br ></p>
					{/foreach}
                </dd>
            </dl>
			{/if}
<!--
			{include file="lib/comment.tpl"}
-->
        </div>
        <div class="bottom"></div>
    </div>
</div>
{/capture}
 
{include file="lib/wrapper.tpl"}
