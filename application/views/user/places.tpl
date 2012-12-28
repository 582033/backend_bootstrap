{capture name="wrapper"}
<div class="nav"><div>个人中心{if $type eq 'want'}&gt;&gt;我想去的地方{else}&gt;&gt;我的足迹{/if}</div></div>
<div class="main sight clearfix">
	
	<div class="myinfo">
        <ul>
            <li class="avatar"><img src="{$user.avatar}" width="80px" height="80px" alt="" /></li>
            <li class="intro">
                <span class="name">{$user.nickname}</span>
                <span>{$user.description}</span>
             </li>
			<li class="tab1"><a href="/user/{$user.user_id}/planlist">我规划的线路</a></li>
            <li class="tab2"><a {if $type=='want'}class="sel"{/if} href="/user/{$user.user_id}/want">我想去的地方({$gonecount})</a></li>
            <li class="tab3"><a {if $type=='gone'}class="sel"{/if} href="/user/{$user.user_id}/gone">我的足迹({$wantcount})</a></li>
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
    <div class="w750 clearfix">
    	<ul class="full clearfix">
		{if $scenices}
    	{foreach $scenices as $item}
            <li class="point clearfix">
				<div class="bg">
					{if $cover_style == 'cities'}
					<a href="/attraction/{$item.city_id}?id={$item.id}">
					{else}
					<a href="/attraction/{$item.city_id}/detail/{$item.id}">
					{/if}
					<img width="215px" height="153px" src="{$item.cover}" />
					<div class="info">
						<span class="name">{$item.name}</span>
					</div>
					<div class="description">
						<div class="white_bg"></div>
						<div class="enter_info">
							<h3>{$item.name}</h3>
							<p>
								{$item.intro|truncate:150:'...':true}
							</p>
							{if $cover_style != 'cities'}
                            <!--<span>
                            <button class="remove" data-id="{$item.id}" data-type="{$item.type}" data-city_id="{$item.city_id}" data-name="{$item.name}" data-city_name="{$item.city_name}" data-cover="{$item.cover}">加入清单</button>
                            <button class="got" data-id="{$item.id}">去过</button>
                            <button class="want" data-id="{$item.id}">想去</button>
                            </span>-->
							{/if}
						</div>
					</div>
					</a>
					<div class="stat">
						<span class="use"><b>{$item.wishes_count}</b>人想去</span>
						<span class="view"><i class="icon"></i><b>{$item.beentos_count}</b>人去过</span>
					</div>
					{if $cover_style != 'cities'}
					{/if}
				</div>
				<div class="bottom"></div>
			</li>
			{/foreach}
			{else}
			<div class="nocontent">您还没有{if $type=='gone'}去过{else}想去{/if}的景点 ，请先添加景点。</div>
			{/if}
    	</ul>
        <!--<ul class="full clearfix">
            <li>
                <div class="bg">
                    <a href="#">
                    <img src="http://media.in1001.com/medialib/itpic/87/30/98/mediums/XKFUPAE3XTIIRC154922.jpg" />
                    <div class="info">
                        <span class="name">上海</span>
                    </div>
                    <div class="description">
                        <div class="white_bg"></div>
                        <div class="enter_info">
                            <h3>上海</h3>
                            <p>石家庄面积1016万平方公里，共45个国家和地区。西临大西洋，北靠北冰洋，南隔地中海和直布罗陀海峡与非洲大陆相望 ，东与亚洲大陆相连。地形以平原为主，大部分为温带海洋性气候，约7.28亿人，约占世</p>
                        </div>
                    </div>
                    </a>
                    <div class="stat">
                        <span class="use"><b>43</b>人使用</span>
                        <span class="view"><i class="icon"></i><b>1003</b>人看过</span>
                    </div>
                </div>
                <div class="bottom"></div>
            </li>
        </ul>-->
        {$pagelist}
    </div>

</div>
{/capture}
 
{include file="lib/wrapper.tpl"}
