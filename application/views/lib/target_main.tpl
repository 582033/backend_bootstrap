{if $top_food}
{if $place_type == 'restaurant'}
<li class="bigFood">
	<div class="food01" style="position: relative; z-index: 0; background-image: none; background-position: initial initial; background-repeat: initial initial;">
		<script type="text/javascript">
			$(".food01").backstretch("{$top_food.cover}");
		</script><div class="backstretch" style="left: 0px; top: 0px; overflow: hidden; margin: 0px; padding: 0px; height: 352px; width: 490px; z-index: -999998; position: absolute;"><img style="position: absolute; margin: 0px; padding: 0px; border: none; width: 528px; height: 352px; max-width: none; z-index: -999999; top: 0px; left: -19px;" src="/sta/images/temp/foodList/bigFood.jpg"></div>
		<p>
			<strong>{$top_food.name}</strong>
			<span>{$top_food.intro}</span>
		</p>
	</div>
</li>
{/if}
{/if}

