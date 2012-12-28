function dialog(title,inner,dialogWidth){

	boxAutoHtml = "<div id='diglogBox' style='position:absolute; z-index:9999999;'><table class='boxAuto'>"
	+ "<tr><td class='tl'></td><td class='tc'></td><td class='tr'></td></tr>"
	+ "<tr><td width='auto' colspan='3'>"
	+ "<table><tr><td class='tcl'></td><td class='tcc'>"
	+"<dl>"
	+"<dt style='height:50px; line-height:50px; font-size:18px; text-align:center; font-weight:bold; position:relative; border-bottom:1px solid #999; color:#6a89b0;font-family:\"Microsoft YaHei\",SimHei,\"LiHei Pro Medium\";'><span id='diglogTitle'>移除</span><img class='close' alt='关闭' title='关闭' src='/sta/images/icon/icon_close.png' onclick='javascript:dialog()' style=' cursor:pointer;position:absolute;right:5px;top:0px;' /></dt>"
	+"<dd id='diglogInner'></dd>"
	+"</dl>"
	
	+ "</td><td class='tcr'></td></tr></table>"
	+ "</td></tr>"
	+ "<tr><td class='bl'></td><td class='bc'></td><td class='br'></td>"
	+ "</tr>"
	+ "</table></div>"
	+"<iframe class='dialogBg' style='background:transparent; width:100%; height:100%; position:absolute; left:0; top:0; z-index:99999;'></iframe>"
+ "<div class='dialogBg' style='background:#000; FILTER:alpha(opacity=60); opacity:0.6; -moz-opacity:0.6; width:100%; height:100%; position:absolute; left:0; top:0; z-index:999999;'></div>";


	if ($("#diglogBox").length<1){
		$('body').append(boxAutoHtml);
		$("#diglogBox #diglogTitle").html(title);
		$("#diglogBox #diglogInner").html($(inner).html());
		$('#diglogBox').width(dialogWidth+"px");
		$('#diglogBox table').height($('#diglogBox').height()-15+"px");
		boxWidth=$('#diglogBox').width()-20+"px";
		$('#diglogBox .tc').width(boxWidth);
		$('#diglogBox .bc').width(boxWidth);
		$("#diglogBox").css({"left":"50%","margin-left":"-"+(dialogWidth/2)+"px"});
		windowHeight=$(window).height()/2;
		dialogHeight=$("#diglogBox").height()/2;
		$(".dialogBg").height($(window).height()+  $(window).scrollTop() + "px");
		$("#diglogBox").css("top",windowHeight-dialogHeight + $(window).scrollTop() +"px");
		$("body").css("overflow","hidden");
	}else{
		$("#diglogBox").remove();
		$(".dialogBg").remove();
		$("body").css("overflow","auto");
	}
}

