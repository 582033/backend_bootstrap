<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="{$pageinfo.page_description}">
	{if $pageid=='places'}
	<meta name="msapplication-window" content="width=1550;height=768" />
	{/if}
    <meta name="keywords" content="{$pageinfo.page_keyword}">
	<title>{$pageinfo.page_title}</title>
	<!--[if lt IE 9]>
		<script src="http://static.tukeq.com/common/js/html5.js"></script>
		<script src="http://sta.in1001.com/lib/json2.js"></script>
	<![endif]-->
	{if !empty($pageinfo.include_cssjs)}
		{foreach from=$pageinfo.include_cssjs item=cssjs}
	{$cssjs}	
		{/foreach}
	{/if}
    <!--[if IE 6]>
    <script src="sta/vendor/js/belatedPNG_0.0.8a-min.js"></script>
    <script type="text/javascript">
        DD_belatedPNG.fix('.png');
    </script>
    <![endif]-->
	{if $pageid=='places'}
    <!--[if lt IE 9]><link href="/sta/style/slider_ie9.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
    <!--[if lt IE 7]><link href="/sta/style/slider_ie6ie7.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
    <!--[if lt IE 9]><script src="/sta/vendor/js/html5_ie9.js" type="text/javascript"></script><![endif]-->
	{/if}
	{if isset($js_params)}
	<script>js_params = {$js_params};</script>
	{/if}
</head>
<body id="{$pageid}" class="{$pageclass}">
{include file="lib/lib_head.tpl"}
{$smarty.capture.wrapper}
<!-- footer start -->
<div class="footer">
	<div class="footer_inner">
        <div class="inner">
            <a href="#">关于我们</a>|
            <a href="#">商务合作</a>|
            <a href="#">法律声明</a>|
            <a href="#">帮助</a>|
            <a href="#">更多</a>
        </div>
        <div class="copyright">&copy;2012  京ICP备09034412号</div>
    </div><!-- footer_inner end -->
</div>
<!-- footer end -->
</body>
</html>

