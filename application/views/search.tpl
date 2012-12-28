{capture name="wrapper"}
<div class="main w1000">
	<div class="title">包含"<span>{$search_keywords}</span>"的搜索结果如下：</div>
    <ul class="wrapper_left">
		{foreach $placetypes as $p => $k}
        <li {if $p == $placetype}class="sel"{/if}><a class="{$p} {if $p == $placetype}sel{/if}" href="/search?q={$search_keywords}&placetype={$p}"><span>{$k}</span>({$items[$p]['totalResults']})</a></li>
		{/foreach}
    </ul>
	{include file="lib/lib_search.tpl"}
	<input id="page_total" type="hidden" value="{$page_total}">
	<input id="list_page" type="hidden" value="1">
</div><!-- w1000 end -->
{/capture}

{include file="lib/wrapper.tpl" pageid="search"}
