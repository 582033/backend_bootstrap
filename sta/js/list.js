function foodClick(target){
	for (i=0;i<=$(target).find("li").length;i++){
		$(target).find("li:eq("+i+")").click(function(){
			$(this).siblings("li").removeClass();
			$(this).addClass("sel");
		});
	}
}
$(".tcc li").click(function(){
	$(this).hide();
});


$(document).ready(function(){
	$.Placeholder.init();
	
//	boxAuto(".restaurantList");
	
	$(".tcc").Xslider({
		unitdisplayed:12,
		numtoMove:1
	});
	foodClick(".tcc");

	$('#viewport').mousewheel(function(event, delta, deltaX, deltaY) {
		event.stopPropagation();
		event.preventDefault();
	});
	var fixWidthPix = 2;
	var fixTopPix = 1;

	if (typeof(js_params.top_attraction) !== 'undefined' && typeof(js_params.top_attraction.cover) !== 'undefined') {
		backstretch_data = js_params.top_attraction.cover;
	}
	else {
		backstretch_data = js_params.city.cover;
	}
	$(".info_review").backstretch(backstretch_data);

	$("#viewport").height(455);
/*
	function showPop(obj,objPop,other){
		$(obj).bind('click', function() {
			var half = $(window).width()/2;
			//$(objPop).toggle();
			if($(this).parent().offset().left <= half){
				if($(objPop).css("display") == "none"){
					$(objPop).css({"left":$(this).parent().offset().left + "px","top":$(this).parent().offset().top+$(this).parent().height() +"px"})
					$(".chooseCity_hl").attr("class","chooseCity");
					$(this).parent().attr("class","chooseCity_hl");
					//$(other).parent().attr("class","chooseCity");
					$(other).hide();
					$(objPop).show();
				}else{
					$(this).parent().attr("class","chooseCity");
					//$(other).parent().attr("class","chooseCity");
					$(other).hide();
					$(objPop).hide();
				}
			}else{
				if($(objPop).css("display") == "none"){
					$(objPop).css({"left":$(this).parent().offset().left +$(this).parent().outerWidth() - $(objPop).outerWidth() + "px","top":$(this).parent().offset().top + $(this).parent().height()+"px"})
					$(".chooseCity_hl").attr("class","chooseCity");
					$(this).parent().attr("class","chooseCity_hl");
					//$(other).parent().attr("class","chooseCity");
					$(other).hide();
					$(objPop).show();
				}else{
					$(this).parent().attr("class","chooseCity");
					//$(other).parent().attr("class","chooseCity");
					$(other).hide();
					$(objPop).hide();
				}
			}
		});
	
	}
	showPop("#target_btn1","#chooseCity_popup1","#chooseCity_popup2");
	showPop("#target_btn2","#chooseCity_popup2","#chooseCity_popup1");
*/
	notext="快速发表您的评论";
	$(".posttext").focus(function(){
		$(this).parent().find("button").show();
		if ($(this).text()==notext){
			$(this).text("");
			$(this).css("color","#000");
			$(this).parentsUntil("li.point").css("z-index","99");
		}
	});
	$(".posttext").blur(function(){
		$(this).parent().find("button").hide();
		if ($(this).text().length==0){
			$(this).text(notext);
			$(this).css("color","#999");
			$(this).parentsUntil("li.point").css("z-index","1");
		}
	});
});
