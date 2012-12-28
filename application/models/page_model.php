<?php class page_model {
	
	function get_page_a($uri, $page, $anchor="") {
		$url = strpos($uri, 'javascript:') === FALSE ? "$uri/p/$page" : $uri;
		return "<a href=\"$url\">$anchor</a>";
	}
	function page_list ($uri, $limit, $total, $page, $type=NULL) {	//{{{
		$total_page = $total % $limit == '0' ? floor($total / $limit) : floor($total / $limit) +1;
		if ($total_page <= 1) return "";
		$min = $this->get_min($page, $total_page);
		$max = $this->get_max($page, $total_page);
		$page_list = "";
		if (!$type) $page_list =  "<div class='page_container'>";
		$page_list .=  "
				<ul class='page clearfix'>";
		if($page <= '1'){
			$page_list .= "";
		}
		elseif(($page > 5) and ($total_page >10)){
			$page_list .= "<li class='begin'><a href='javascript:void(0);'></a></li><li class='prev'>" . $this->get_page_a($uri, $page - 1) . "</li><li class='more'>...</li>";
		}
		else {
			$page_list .= "<li class='begin'><a href='javascript:void(0);'></a></li><li class='prev'>" . $this->get_page_a($uri, $page - 1) . "</li>";
		}
		for ($i = $min; $i <= $max; $i++) {
			if ($page == $i)
				$page_list .= "<li class='sel'>" . $this->get_page_a($uri, $i, $i) . "</li>";
			else
				$page_list .= "<li>" . $this->get_page_a($uri, $i, $i) . "</li>";
		}
		if($page >= $total_page){
			$page_list .= "";
		}
		elseif (($total_page - $page > 5) and ($total_page > 10)) {
			$page_list .= "<li class='more'>...</li><li class='next'>" . $this->get_page_a($uri, $page+1) . "</li><li class='end'><a href='javascript:void(0);'></a></li>";
		}
		else {
			$page_list .= "<li class='next'>" . $this->get_page_a($uri, $page+1) . "</li><li class='end'><a href='javascript:void(0);'></a></li>";
		}
		$page_list .= "</ul>"; 
		if (!$type) $page_list .=  "</div>";
		return $page_list;
	}	//}}}

	function get_min($page, $total_page) {	//取最小页{{{
		if ($total_page > 10) {
			$max = $this->get_max($page, $total_page);
			$changes = 5-($max-$page);
			if ($max-$page < 5){
				$min = $page - (4 + $changes);
			}
			else {
				$min = $page - 4;
			}
			if ($min <= 0) {
				$min = 1;
			}
		}
		else{
			$min = 1;
		}
		return $min;
	}	//}}}

	function get_max($page, $total_page) {	//取最大页{{{
		if($total_page > 10) {
			$max = $page + 5;
			if ($max > $total_page) {
				$max = $total_page;
			}
			elseif ($max < 10) {
				$max = 10;
			}
		}
		else {
			$max = $total_page;
		}
		return $max;
	}	//}}}
}
