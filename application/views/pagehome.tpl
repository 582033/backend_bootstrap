{capture name="wrapper"}
<div class="wrapper">
    <div class="choose">
        <div class="container">
			<div class="choose-city-wrapper">
				<div class="choose-city from_city">
					<div class="chooseCity">
						<strong>出发地：</strong>
						<input disabled="disabled" class="input_target" type="text" value="{$from_city}" placeholder="请选择出发地" />
						<button class="target_btn">选择</button>
					</div>
					<div class="chooseCity_popup">
						<ul class="popup">
							{foreach $from_cities as $c}
							<li><a data-city_id="{$c.id}" href="javascript:void(0)">{$c.name}</a></li>
							{/foreach}
						</ul>
					</div><!-- chooseCity_popup end -->
				</div>
			</div>
            
            <ul class="filter">
				{include file="lib/lib_filter.tpl"}
            </ul><!-- filter end -->
        </div><!-- container -->
	</div><!-- choose end -->
	{include file="lib/lib_main.tpl"}
</div><!-- wrapper_banner end -->
<input id="page_total" type="hidden" value="{$page_total}">
<input id="list_page" type="hidden" value="1">
{/capture}

{include file="lib/wrapper.tpl" pageid="index"}
