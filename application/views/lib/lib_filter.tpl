<script type="text/javascript" >
	$(function(){
		function slider2width (value, $min, $max){
			return ( value - $min ) / ( $max - $min ) * 915 + 35; 
		}

		var	$min = {$price_range.min};
		var	$max = {$price_range.max};
		//var $default_price = {$to_price};
		//var value = {$to_price};
		var value = {$to_price} ? {$to_price} : {$price_range.min};
		if ({$to_price} < {$price_range.min})
		{
			value = {$price_range.min};
		}	
		var $price;
		var a = slider2width(value, $min, $max);
		if ($.cookie('to_price')) {
			$price = $.cookie('to_price');
		}
		else {
			$price = {$price_range.min};
		}
		{literal}
		$("#slider").slider({
			value: 0,
			min: $min, 
			max: $max, 
			step: 100,
			slide: function(event, ui) {
				b = slider2width(ui.value, $min, $max); 
				$(".cursor").css('left', b+'px');
				$(".price").css('padding-left', b-5+'px');
				$("li.price").text(ui.value+'元');
				$("li.result b").text(ui.value);
			},
			stop: function(event, ui) {
				home_page.load_places('result');
				home_page.load_places('main');
			}
		});
		{/literal}
	});
</script>
<div id="slider">
	<span class="cursor"><a href="javascript:void(0);"><img src="/sta/images/slide.png" /></a></span>
<li class="tips">拖动预算探索您可以去旅游的地点！</li>
<li class="slide_bg">
	<input class="price_value" type="hidden" value="">
</li>
</div>
<li class="price">{$price_range.min}元</li>
<li class="result">
	{include file="lib/lib_result.tpl"}
</li>
