<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3"></script>
<title>完整地图</title>
</head>
<body>
<div class='bigmap' id='bigmap' style='width:750px;height:450px'></div>
<script type="text/javascript">
	var map = new BMap.Map("bigmap");
	var point = new BMap.Point(window.parent.point.lng, window.parent.point.lat);
	var marker = new BMap.Marker(point);  
	map.addOverlay(marker);  
	map.centerAndZoom(point, 15);
	map.addControl(new BMap.NavigationControl());  
	map.addControl(new BMap.ScaleControl());  
	map.addControl(new BMap.OverviewMapControl());  
	map.addControl(new BMap.MapTypeControl());
</script>
</body>
</html>
