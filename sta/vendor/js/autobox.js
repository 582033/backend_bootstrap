boxAutoHtml = "<table class='boxAuto'>"
		+ "<tr><td class='tl'></td><td class='tc'></td><td class='tr'></td></tr>"
		+ "<tr><td width='cc' colspan='3'>"
		+ "<table><tr><td class='tcl'></td>"
		+ "<td class='tcc'></td>"
		+ "<td class='tcr'></td></tr></table>"
		+ "</td></tr>"
		+ "<tr><td class='bl'></td><td class='bc'></td><td class='br'></td></tr>"
		+ "</table>";

function boxAuto(obj){
	for (i=0;i<$(obj).length;i++){
		thisObj=$(obj+":eq("+i+")");
		boxInnerHtml=thisObj.html();
		thisObj.html(boxAutoHtml);
		thisObj.find('.tcc').html(boxInnerHtml);
		thisObj.find('table').height(thisObj.height()-15+"px");
		boxWidth=thisObj.width()-20+"px";
		thisObj.find('.tc').width(boxWidth);
		thisObj.find('.bc').width(boxWidth);
	}
}