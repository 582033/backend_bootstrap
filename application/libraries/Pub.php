<?php
class Pub {
	/*Get configure string or array from config file
	 * path eg: file.topkey.nextkey.nextkey
	 *@param string $path
	 */
function conf($path){
	$path=trim($path,'.');
	if(strlen($path)==0){
		throw new exception("Illage config para");
	}
	static $allconfig=array();
	$arrpath=explode('.',$path);
	//get config file name($cfn)
	$cfn=array_shift($arrpath);

	if(!array_key_exists($cfn,$allconfig)){
		//it seems that this config file has not been loaded
		$conffilepath='application/config/'.$cfn.'.php';
		if(is_readable($conffilepath)){
			//get include file
			$allconfig[$cfn]=include $conffilepath;
			$arrret=$allconfig[$cfn];
		}
		else{
			throw new exception('config file include error');
		}
	}
	else{
		//it looks that this config file has been loaded already
		$arrret=$allconfig[$cfn];
	}
	//step into to get config array
	foreach($arrpath as $k => $v)
	{
		if(array_key_exists($v,$arrret)){
			$arrret=$arrret[$v];
		}
		else{
			throw new exception('key '.$v.'  doesnot exist  ');
		}
	}

	return $arrret;

}
	/* parse var form input array,if there has a key  a => b ,then $a = b
	 * This function also get variable from  $_GET
	 * @param array $arr_input
	 */
	function get_req_vars( array $arr_input){
			$ret = array();
		foreach($arr_input as $k => $v){
			if(isset($_GET[$k])&&strlen($_GET[$k])){

				$ret[$k] = $k.'='.$_GET[$k];
			
			}
			else{

				$ret[$k] = $k.'='.$v;
			
			}

		}
		return  implode('&',$ret);
		
		}
	/*将数据库或自定义数组转成div,可选是否是顶部需要高亮
	 *@param array $arr 
	 *@param boolean $isheader
	 */
	function arr_2div($arr,$isheader=FALSE,$innore = array()){
		$ret = '';
		//judge whether one-dimensional or two-dimensional
		if(count($arr) == count($arr,COUNT_RECURSIVE)){
			if($isheader){
			$ret .='<tr bgcolor="#EEF5DE">';
			}
			else{
			$ret .='<tr>';
			}

			foreach($arr as $k => $v){
				$ret .='<td width="100">'.$v.'</td>';
			}
			$ret .='</tr>';
		}
		else{
			foreach($arr as $ka => $va){
					$ret .='<tr>';
				foreach($va as $kb => $vb){
					if(!in_array($kb,$innore)){
					$ret .='<td width="100">'.$vb.'</td>';
					}
				}
					$ret .='</tr>';
			}
		}


		return $ret;
	}



	/*function to  add some menus such as checkbox ,edit and  del
	 * Just for slotlist index 
	 * @param array $arr_ipt
	 */
	function arr_add_menu($arr_ipt){
		$type_map = array(
			'image' =>'图片',
			'elem' =>'元素',
			'maga' =>'杂志',
			'text' =>'文本',
			
			);
		foreach($arr_ipt as $k =>$v){
			$mode_word = !$v['mode'] ? '手动模式' :'自动模式';
			$arr_ipt[$k]['type'] = $type_map[$arr_ipt[$k]['type']];
			$arr_ipt[$k]['mode'] = '<a class="thickbox slotlist" href = "/slotlist/switchmode/'.$v['id'].'" >'.$mode_word.'</a>';
			$arr_ipt[$k]['showall'] ='<a href = "/slotlist/edit/'.$v['id'].'/m" >('.$arr_ipt[$k]['adnumm'].'个)编辑</a>';
			$arr_ipt[$k]['showrand'] ='<a href = "/slotlist/edit/'.$v['id'].'/a">('.$arr_ipt[$k]['adnuma'].'个)编辑</a>';
			$arr_ipt[$k]['edit'] ='<a href = "/slotlist/edit/'.$v['id'].'" class="thickbox slotlist"><font color="gray">查看</font></a>';
			$arr_ipt[$k]['del'] ='<a href = "/slotlist/del/'.$v['id'].'" class="thickbox slotlist"><font color="gray">删除</font></a>';
		
		}
		return $arr_ipt;
	}
	/*
	 * 添加对杂志列表操作的列
	 * */
	function mag_add_action($maglist){
		foreach ($maglist as $k => $v){
			$maglist[$k][] = "<a href = '/mag/edit/".$v['magazine_id']."' class='thickbox mag_edit' >编辑</a>";
			$maglist[$k][] = "<a href = '/mag/del_one/".$v['magazine_id']."' class='thickbox mag_del' >删除</a>";
			if ($maglist[$k]['onoffdel'] == '已上线'){
				$maglist[$k][] = "<a href = '/mag/onoffdel/".$v['magazine_id']."' class='thickbox' >下线</a>";
			}else{
				$maglist[$k][] = "<a href = '/mag/onoffdel/".$v['magazine_id']."' class='thickbox' >上线</a>";
			}
			$maglist[$k][] = "<input type='checkbox' style='width:20px;height:20px;' name='".$v['magazine_id']."' class='choose_del' />";
			$maglist[$k][] = "<input type='checkbox' style='width:20px;height:20px;' name='".$v['magazine_id']."' class='choose_onoff' />";
			$maglist[$k][] = "<a href = '/mag/gen_apk/".$v['magazine_id']."' class='thickbox mag_apk' >生成APK</a>";
		}
		return $maglist;
	}
	
	/*
	 * 添加对评论列表操作的列
	 * */
	 function comment_add_action($comment_list){
		foreach ($comment_list as $k => $v){
			$comment_list[$k][] = "<a href= '/comment/del/".$v['user_comment_id']."' class='thickbox comment_del'>删除</a>";
		}
		return $comment_list;
	 }
	
	/*
	 * 添加对渠道列表操作的列
	 * */
	 function channel_add_action($channel_list){
		foreach ($channel_list as $k => $v){
			$channel_list[$k][] = "<a href= '/channel/del/".$v['channel_id']."' class='thickbox comment_del'>删除</a>";
		}
		return $channel_list;
	 }

	 function apk_add_action($apk_list){
		foreach ($apk_list as $k => $v){
			$apk_list[$k][] = "<a href= '/apk/del/".$v['apk_id']."/".$v['magazine_id']."/".$v['channel_id']."' class='thickbox apk_del'>删除</a>";
			$apk_list[$k][] = "<a href= 'http://bychannel.in1001.com/".$v['channel_id']."/".$v['magazine_id']."_".$v['channel_id'].".apk"."'class='apk_del'>下载</a>";
		}
		return $apk_list;
	 }

	/* join some confirm or warning message
	 * @param string $msgctt
	 * @param boolean $highlight
	 */
	function warnmsg($msgctt,$highlight = FALSE){
		$ret = '<span  style="font-size:28px">';
		$ret .= $highlight ? '<font color="red">':'';
		$ret .= $msgctt;
		$ret .= $highlight ? '</font>':'';
		$ret .= '</span>';
		return $ret;
	
	}


	
	/*
	 * html select ,return code of a html select element 
	 * @param array $input
	 * @param string $name
	 * @param string $sled
	 * @return string $ret
	 */
	static function html_select(array $input,$name,$sled=''){
		$ret='';
			$ret.='<select name="'.$name.'">';
		foreach($input as $k=>$v){
			$tmp_def = $sled  == $k ? 'selected="selected"':'';
			$ret.='<option value="'.$k.'" '.$tmp_def.'>'.$v.'</option>';

		}
		$ret.='</select>';
		return $ret;
	}
	
	
	static function mag_html_select(array $input,$name,$sled=''){
		$ret='';
			$ret.='<select name="'.$name.'">';
		foreach($input as $k=>$v){
			$tmp_def = $sled  == $v ? 'selected="selected"':'';
			$ret.='<option value="'.$v.'" '.$tmp_def.'>'.$v.'</option>';

		}
		$ret.='</select>';
		return $ret;
	}


	function page_list ($uri, $limit, $total, $page ) {	//{{{
		$total_page = $total % $limit == '0' ? floor($total / $limit) : floor($total / $limit) +1;
		if ($total_page <= 1) return "";
		$min = $this->get_min($page, $total_page,$limit);
		$max = $this->get_max($page, $total_page,$limit);
		//echo $min.'------'.$max.'-------'.$page;
			$page_list =  "<p class='pagenav msg_pagenav'>";
				$n_s = 0;
				$page_list .= "<a href='$uri?" . $this->build_url($n_s) . "' class='prav'>首页</a>&nbsp;";
			if ($page > $limit-1) {
				$n_s = (int)$page-(int)$limit;
				$page_list .= "<a href='$uri?" . $this->build_url($n_s) . "' class='prav'>上一页</a>&nbsp;";
			}
			for ($i = $min; $i <= $max; $i++) {
					$n_s = ((int)$i-1)*(int)$limit;
					//echo $page.'---'.$i.'<br>';
				if ($page == (int)($i-1)*(int)$limit)
					$page_list .= "<font color=#ff0000>".($i)."</font>&nbsp;";
				else
					$page_list .= "<a href='$uri?".$this->build_url($n_s)."'><b> ".($i)."</b> </a>&nbsp;";
			}
			if ($page/$limit < $total_page-1) {
				$n_s = (int)$page+(int)$limit;
				$page_list .= "<a href='$uri?".$this->build_url($n_s)."' class='next'>下一页</a>&nbsp;";
			}
			if ($total_page > 10){
				$n_s = ($total_page-1)*$limit;
				$page_list .= "<a href='$uri?".$this->build_url($n_s)."'>尾页</a>&nbsp;";
			}
			$page_list .= "</p>";
		return $page_list;
	}	//}}}

	function get_min($page, $total_page,$limit) {	//取最小页{{{
		if ($total_page > 10) {
			$min = ($page/$limit) - 4;
			if ($min <= 0) {
				$min = 1;
			}
		}
		else{
			$min = 1;
		}
		return $min;
	}	//}}}

	function get_max($page, $total_page,$limit) {	//取最大页{{{
		if($total_page > 10) {
			$max = ($page/$limit)+ 5;
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
	function get_total($page, $total_page,$limit) {	//取最大页{{{
		if($total_page > 10) {
			$max = ($page/$limit)+ 5;
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

	function build_url($start){
		$_GET['start'] = $start;
		return http_build_query($_GET);

	
	}
	//$p = isset($_GET['start']) ? (int)$_GET['start'] : 0;
	//$limit = 10;
	//echo page_list('/page.php',$limit,400,$p);
	/*Function to get controller and function in current session
	 *@return array $ret
	 */
	function get_cf(){
		$arr_ret = explode('/',$_SERVER['PATH_INFO']);
		strlen(@$arr_ret['2'])?null:$arr_ret['2'] = 'index';
		strlen(@$arr_ret['1'])?null:$arr_ret['1'] = 'slotlist';
		return array(
			'c' => $arr_ret['1'],
			'f' => $arr_ret['2'],
			
			);
	
	}
	function goback(){
echo <<<EOT
<html>
	<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="/sta/js/jquery-1.7.2.min.js"/></script>
<script type="text/javascript">
	$(function(){
		setTimeout("window.location='/'",3000);
	})
</script>
</head>
<body> 
<div class="msg">
	<p style="font-size:16px;font-weight:bold;">当前账户 无权限进行此操作！</p>
</div>
<div>
	<p>本页面将在3秒后自动跳转,请稍候</p>
</div>
</body>
</html>

EOT;

exit;
	}

	function array_sort($arr, $keys, $type='asc'){ 
		$keysvalue = $new_array = array();
		foreach ($arr as $k=>$v){
			$keysvalue[$k] = $v[$keys];
		}
		if($type == 'asc'){
			asort($keysvalue);
		}else{
			arsort($keysvalue);
		}
		reset($keysvalue);
		foreach ($keysvalue as $k=>$v){
			$new_array[$k] = $arr[$k];
		}
		return $new_array; 
	}

	function my_scandir($dir){
		$files = array();
		if ( $handle = opendir($dir) ) {
			while ( ($file = readdir($handle)) !== false ) {
				if ( $file != ".." && $file != "." ) {
					if ( is_dir($dir . "/" . $file) ) {
						$files[$file] = scandir($dir . "/" . $file);
					}else {
						$files[] = $file;
					}
				}
			}
		closedir($handle);
		return $files;
		}
	}

}
