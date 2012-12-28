function boxAuto(obj,opt){
	
	if( opt == "half"){
		borderWidth=10;
		halfCol=2;
		conerRT="";
		conerRB="";
		halfRight="";
		tcBorder="2";
	}else{
		borderWidth=20;
		halfCol=3;
		conerRT="<td class='tr'></td>";
		conerRB="<td class='br'></td>";
		halfRight="<td class='tcr'></td>";
		tcBorder="4";
	}
	
	boxAutoHtml = "<table class='boxAuto'>"
	+ "<tr><td class='tl'></td><td class='tc'></td>"
	+ conerRT
	+ "</tr>"
	+ "<tr><td width='cc' colspan='"+halfCol+"'>"
	+ "<table><tr><td class='tcl'></td>"
	+ "<td class='tcc'></td>"
	+ halfRight
	+ "</tr></table>"
	+ "</td></tr>"
	+ "<tr><td class='bl'></td><td class='bc'></td>"
	+ conerRB
	+ "</tr>"
	+ "</table>";

	for (i=0;i<$(obj).length;i++){
		thisObj=$(obj+":eq("+i+")");
		boxInnerHtml=thisObj.html();
		thisObj.html(boxAutoHtml);
		thisObj.find('.tcc').html(boxInnerHtml);
		thisObj.find('table').height(thisObj.height()-15+"px");
		boxWidth=thisObj.width()-borderWidth+"px";
		thisObj.find('.tc').width(boxWidth);
		thisObj.find('.bc').width(boxWidth);
		//thisObj.find('.tcc').width(thisObj.width()-tcBorder+"px");
	}
}