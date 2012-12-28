{capture name="wrapper"}
<script type="text/javascript" src="http://malsup.github.com/jquery.cycle.all.js"></script>
<script type="text/javascript">
	$.fn.cycle.defaults.timeout = 3000;
	$(document).ready(function(){
		$(".dl_banner").backstretch("/sta/images/dl_bg.jpg");
		$('.slide').each(function() {
			$('.slide').cycle({
				fx: 'scrollRight',
				pager: $('.slide_point ul'),
				pagerAnchorBuilder: function(i, slide) {
					return '<li></li>';
				},
				activePagerClass: 'cur'
			});
		});
	});
</script>
<div class="dl_content">
	<div class="black_div"></div>
	<div class="dl_banner">
    	<div class="dl_w1000">
            <div class="dl_phone">
                <div class="slide">
                    <img src="/sta/images/dl_slide_1.jpg">
                    <img src="/sta/images/dl_slide_2.jpg">
                    <img src="/sta/images/dl_slide_3.jpg">
                    <img src="/sta/images/dl_slide_4.jpg">
                    <img src="/sta/images/dl_slide_5.jpg">
                </div>
                <div class="slide_point"><ul></ul></div>
            </div>
            <!--<div class="dl_explain"><strong>自在游走，时刻记录，<br /></strong><span>随行收集你遇见的美好...</span></strong></div>-->
            <div class="dl_explain">随行记录  收集美好  自在分享</div>
            <div class="dl_button"><a href="http://apkd.wowpad.cn/ltapp/xianzong.apk"><img src="/sta/images/dl_button.png"></a><span><strong style="color:#000;font-weight: bold;">仙踪</strong> (v1.0,  2012-11-06)</span></div>
        </div>
	</div>
    <div class="dl_w1000">
        <div class="dl_intro"><p><strong>《仙踪》</strong></p><p>移动随行记录应用。用照片、文字、声音形成随笔小记，自动匹配时间、位置信息，让故事绘声绘色，让分享时时刻刻。</p></div>
        <div class="dl_line"></div>
        <div class="dl_wli">
            <div class="fur">
                <div class="dl_edit dl_icon"></div>
                <div class="dl_cnt">
                    <span class="title">美好瞬间  随手记录</span><br/>
                    <span class="list">
						瞬间美景，只言片语，点滴心情<br/>
						照下来、记下来、录下来
                    </span>
                </div>
            </div>
            <div class="fur">
                <div class="dl_plan dl_icon"></div>
                <div class="dl_cnt">
                    <span class="title">自动整理和排序</span><br/>
                    <span class="list">
						按拍摄时间排序，可利用碎片时间随时、多次编辑
                    </span>
                </div>
            </div>
            <div class="fur">
                <div class="dl_local dl_icon"></div>
                <div class="dl_cnt">
                    <span class="title">GPS定位，足迹留痕</span><br/>
                    <span class="list">
						根据位置信息串连行程，让足迹满足成就感
                    </span>
                </div>
            </div>
            <div class="fur">
                <div class="dl_share dl_icon"></div>
                <div class="dl_cnt">
                    <span class="title">与好友分享</span><br/>
                    <span class="list">
						独乐不如众乐，让好友随时分享你的心情
                    </span>
                </div>
            </div>
        </div>
	</div>
</div>
{/capture}

{include file="lib/wrapper.tpl" pageid="download"}
