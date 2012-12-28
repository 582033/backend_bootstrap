{capture name="wrapper"}
<div class="nav"><div>个人中心&gt;&gt;我规划的线路</div></div>

<div class="main sight clearfix">
	
	<div class="myinfo">
        <ul>
            <li class="avatar"><img src="{$user.avatar}" width="80px" height="80px" alt="" /></li>
            <li class="intro">
                <span class="name">{$user.nickname}</span>
                <span>{$user.description}</span>
             </li>
			<li class="tab1"><a class="sel" href="/user/{$user.user_id}/planlist">我规划的线路</a></li>
            <li class="tab2"><a href="/user/{$user.user_id}/want">我想去的地方({$gonecount})</a></li>
            <li class="tab3"><a href="/user/{$user.user_id}/gone">我的足迹({$wantcount})</a></li>
        </ul>
		<div class="bottom"></div>
    </div>
    <div class="sideBarBox myhomeRight">
    <dl>
    	<dt>与您用过同样探索模板的用户</dt>
        <dd>
        	<div class="avatar"><a href="#"><img src="/sta/images/temp/user_bg.png" alt="" /></a></div>
            <div class="info">
            	<span class="name"><a href="#">用户名</a></span>
                <span><a href="#">线路：我的新疆喀什之旅</a></span>
            </div>
        </dd>
        <dd>
        	<div class="avatar"><a href="#"><img src="/sta/images/temp/user_bg.png" alt="" /></a></div>
            <div class="info">
            	<span class="name"><a href="#">用户名</a></span>
                <span><a href="#">线路：我的新疆喀什之旅</a></span>
            </div>
        </dd>
        <dd>
        	<div class="avatar"><a href="#"><img src="/sta/images/temp/user_bg.png" alt="" /></a></div>
            <div class="info">
            	<span class="name"><a href="#">用户名</a></span>
                <span><a href="#">线路：我的新疆喀什之旅</a></span>
            </div>
        </dd>
        <dd>
        	<div class="avatar"><a href="#"><img src="/sta/images/temp/user_bg.png" alt="" /></a></div>
            <div class="info">
            	<span class="name"><a href="#">用户名</a></span>
                <span><a href="#">线路：我的新疆喀什之旅</a></span>
            </div>
        </dd>
        <dd>
        	<div class="avatar"><a href="#"><img src="/sta/images/temp/user_bg.png" alt="" /></a></div>
            <div class="info">
            	<span class="name"><a href="#">用户名</a></span>
                <span><a href="#">线路：我的新疆喀什之旅线路：我的新疆喀什之旅线路：我的新疆喀什之旅</a></span>
            </div>
        </dd>
        <dd style="clear:both;"></dd>
    </dl>
    </div>
    <div class="myRoad">
    	<!--<ul>
        	<li class="top clearfix">
            	<div class="day">
	            	<span>30</span>
                    天
                </div>
                <div class="rightInfo">
                <h2>
                    <span><a href="#">编辑</a></span>
                    <a href="#">我的新疆和西北之旅,我的新疆和西北之旅我的新疆和西北之旅我...</a>
                </h2>
                <div class="user">
                	<img src="/sta/images/temp/userhead.png" alt="">
                    由 <a href="#">李超</a> 规划
                </div>
                </div>
            </li>
            <li class="bottom">
            	旅游时间：2012-10-1 至 2012-10-3　　　对应愿望清单：<a href="#">我的愿望清单</a>
                <p class="city clearfix">
		        	<a href="#"><span><font>河北</font></span></a>
		        	<a href="#"><span><font>河北</font></span></a>
		        	<a href="#"><span><font>河北</font></span></a>
                </p>
                <p class="pointNum">
                	<span class="traffic">2</span>
                	<span class="hotel">3</span>
                	<span class="sight">4</span>
                	<span class="restaurant">1</span>
                </p>
    			<span class="time">规划完成时间：2012-9-16 20：16</span>
            </li>
        </ul>-->
		{if $plans}
        {foreach $plans as $item}
    	<ul>
    		<li class="top clearfix">
            	<div class="day">
	            	<span>{$item.days_count}</span>
                    天
                </div>
                <div class="user">
                    <a href="/plan/{$item.id}/view">{$item.title}</a>
                	<img src="{$user['avatar']}" alt="">
                    由 <a href="/user/{$user['user_id']}">{$user['nickname']}</a> 规划
                </div>
                <div class="rightInfo">
                <h2>
                    <span><a href="/plan/{$item.id}/edit">编辑</a><a href="javascript:void(0)" class="delgo" id="{$item.id}" >删除</a></span>
                </h2>
                </div>
            </li>
        	 <li class="bottom">
            	旅游时间：{$item.start_day}　　　<!--对应愿望清单：<a href="#">我的愿望清单</a>-->
                <p class="city clearfix">
					{foreach $item.ext.cities as $city}
		        	<a href="/attraction/{$city.id}"><span><font>{$city.name}</font></span></a>
					{/foreach}
                </p>
                <p class="pointNum">
					{foreach $item.ext.type2count as $type => $count}
					<span class="{$type}">{$count}</span>
					{/foreach}
                </p>
				<span class="time">线路更新时间：{$item.updated_at}</span>
            </li>
        </ul>
        {/foreach}
		{else}
		<div class="nocontent">您还没有线路，请先添加线路。</div>
		{/if}
        {$pagelist}
    </div>
<script>
{literal}
$(".delgo").click(function(){
	id = $(this).attr("id");
	boxAutoHtml = "<div id='dialog-del' class='dialogdel' style='padding:10px;width:300px;heigth:250px;'>" 
           	+ "<p style='text-align:center; font-size:14px; line-height:16px; padding:5px 0;'>是否要删除当前线路？</p>"
		+ "<p style='text-align:center;'><a href='javascript:void(0)' onclick='delPlan("+id+");' style='display:inline-block; width:40px; height:27px; line-height:27px; text-align:center; color:#7e4f2a; background:url(/sta/images/btn_bg4.png) no-repeat left top;font-size:12px;'>确定</a>　　<a href='javascript:void(0)' style='display:inline-block; width:40px; height:27px; line-height:27px; text-align:center; color:#7e4f2a; font-size:12px; background:url(/sta/images/btn_bg4.png) no-repeat left top;' onclick='cancel()'>取消</a></p></div>";
	$(".delgo").colorbox({opacity:0.5, transition:"elastic"});
	$(".delgo").colorbox({html:boxAutoHtml});

});
function cancel(){
	$.colorbox.close();
}
{/literal}
function delPlan(id) {
	$.get(
		'/user/delplan?plan_id='+id+'&user_id={$user["user_id"]}',
		{},
		function(data){
			window.location.href="/user/{$user['user_id']}/planlist";
		},
		'json'
	);	
}
</script>
</div>
{/capture}

{include file="lib/wrapper.tpl" pageid="planlist"}
