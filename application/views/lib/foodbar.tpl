<div class="restaurantList" style="display:none;"><table class="boxAuto" style="height: 63px;"><tbody><tr><td class="tl" width="10"></td><td class="tc" width="980" style="width: 980px;"></td><td class="tr" width="10"></td></tr><tr><td width="cc" colspan="3"><table style="height: 63px;"><tbody><tr><td class="tcl"></td><td class="tcc" width="996">
	<div class="prevBtn">
        <a class="abtn aleft agrayleft" href="#left">&lt;&lt;</a>
    </div>
    <div class="slide_container scrollcontainer">
	<ul style="width: 1092px; left: 0px;">
    	<li class="sel">
			<img src="/sta/images/temp/foodList/all_food.jpg" alt="全部特色美食" title="全部特色美食">
			<input type="hidden" value="0">
			<span></span>
		</li>
		{foreach $foods as $food}
		<li>
			<img src="http://thumb.wowpad.cn/thumb?size=70x55&fit=s&src={$food.cover}" alt="{$food.name}" title="{$food.name}">
			<input type="hidden" value="{$food.target_id}">
			<span></span>
		</li>
		{/foreach}
    </ul>
    </div>
	<div class="nextBtn">
		<a class="abtn aright" href="#right">&gt;&gt;</a>
    </div>
</td><td class="tcr" width="2"></td></tr></tbody></table></td></tr><tr><td class="bl" width="10"></td><td class="bc" width="980" style="width: 980px;"></td><td class="br" width="10"></td></tr></tbody></table></div>

