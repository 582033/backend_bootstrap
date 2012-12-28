
var ids = [23, 24, 25, 26, 27];
var cities=[];
function Circulation(){
	var n = ids.length;
	for (i=0;i<n;i++){
		get_id(ids[i], i, n);
	}
}

function get_id (id, i, n){
	var city_push = function(result){
		cities.push(result);	
		if (i == n-1) console.log(cities);
	}
	$.get( '/test/get?id='+id, city_push); //‘/test/get?id=’获取api数据
}

Circulation();
