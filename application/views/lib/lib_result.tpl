<b>{$to_price}</b>元预算以内，您可以去： 
{foreach $reachable_cities as $city}
<a href="javascript:void(0);"{if $city.name == $choose_city} class="sel"{/if}>{$city.name}</a>
<input type="hidden" value="{$city.id}" />
{/foreach}
