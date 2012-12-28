{capture name="wrapper"}
<script>
	_CITY_ID = {$city.id};
</script>
<div class="info_review">
	<div class="top">
		<div>{$city.name}</div>
		<input id="city_cid" type="hidden" value="{$city.id}">
		<input id="list_type" type="hidden" value="{$list_type}">
	</div>
	<div class="bgcover">
		<div class="container">
			{if $top_attraction}
			<div class="box bigbox">
				<div class="topborder"></div>
				<div class="content">
					<h2>探索参考价格: ￥<font>{$top_attraction.total_price}</font></h2>
					<p>机票预测(往返价格)：￥<font>{$top_attraction.flight_prices.total_price}/每人</font></p>
					<p>景点门票：￥<font>{$top_attraction.price}/每人</font></p>
					<p><b>{$top_attraction.name}</b>：</p>
					<p>{$top_attraction.intro|truncate:80:"..."}</p>
					<p><span class="havetogo"><font>{$top_attraction.wishes_count}</font>人想去</span> <span class="havepost"><font>{$top_attraction.beentos_count}</font>人已去过</span></p>
					<a href="javascript:void(0)" class="add" data-uid="{$top_attraction.uid}" data-id="{$top_attraction.id}" data-type="{$top_attraction.type}" data-city_id="{$top_attraction.city_id}" data-name="{$top_attraction.name}" data-city_name="{$top_attraction.city_name}" data-cover="{$top_attraction.cover}">加入清单</a>
					<a href="/attraction/{$top_attraction.city_id}/detail/{$top_attraction.id}" class="view">查看详情</a>
				</div>
				<div class="bottomborder"></div>
			</div>
			{/if}
			<div class="box smallbox">
				<div class="topborder"></div>
				<div class="content">
					<div class="contrl">
						{include file="lib/choose_city.tpl" choose_label="出发地" choose_class="from_city"}
						<script>
							var city_flights = {$flights};
							var city_trains = {$trains};
							function open_url (type){
								var from_city = $('.input_target').val();
								var to_city = "{$to_city}";
								var from_fts = get_flight_data(from_city);
								var to_fts = get_flight_data(to_city);
								if (type == 'flights'){
									url = "http://flights.ctrip.com/booking/"+from_fts+"-"+to_fts+"---d-adu-1/?dayoffset=0&sendticketcity="+escape(to_city)+"&dcityname1="+escape(from_city)+"&acityname1="+escape(to_city);
								}
								else{
									url = "http://trains.ctrip.com/TrainBooking/Search.aspx?from="+city_trains[from_city]+"&to="+city_trains[to_city]+"&day=3&number=&fromCn="+escape(from_city)+"&toCn="+escape(to_city); 	
								}
								return url;
							}
							$(function(){
								$(".air").click(function(){
									window.open(open_url('flights'));
								});
								$(".train").click(function(){
									window.open(open_url('trains'));
								});
							});
							function get_flight_data (name){
								for (flight in city_flights){
									if (city_flights[flight]['display'] == name){
										return city_flights[flight]['data'];
									}
								} 
							}
						</script>
						<a target="_BLANK" href="javascript:void(0);" class="air">查询机票价格</a>
						<a target="_BLANK" href="javascript:void(0);" class="train">查询火车价格</a>
					</div>
					<div class="text">
						注明:您可以通过此处预订和查询交通票务,也可以在规划线路时选择。
					</div>
				</div>
				<div class="bottomborder"></div>
			</div>
		</div>

		{include file="lib/dreamming.tpl"}
    	</div><!-- bgcover end -->
		<div class="bottom">
			<div><span>434234</span>人看过</div>
		</div>
</div>
<div class="select_point">
    <div class="container">
        <ul class="menu">
            <li class="sel"><a href="javascript:void(0);" class="sight">景点</a><input type="hidden" value="attraction"></li>
            <li><a href="javascript:void(0);" class="hotel">住宿</a><input type="hidden" value="hotel"></li>
            <li><a href="javascript:void(0);" class="restaurant">餐饮</a><input type="hidden" value="restaurant"></li>
<!--
            <li><a href="javascript:void(0);" class="shop"><input type="hidden" value="shop">购物</a></li>
-->
        </ul>
		
		<div class="rightBox">
			{include file="lib/choose_city.tpl" choose_label="目的地" choose_class="to_city"}
        </div>
		<span></span>
    </div>
</div>

{include file="lib/foodbar.tpl"}

<div class="main clearfix">
    <div class="places w750 clearfix">
		{include file="lib/places.tpl"}
    </div>
</div>
{/capture}

{include file="lib/wrapper.tpl" pageid="places"}
