<?php 
require_once 'login.php';
class order extends Login {
	private $order_status = array(
			'0' => '关闭',
			'1' => '等待分配客服',
			'2' => '等待客服回访',
			'3' => '等待客服反馈',
			'4' => '线路已确认,等待签约',
			'5' => '已签约,等待出行',
			'6' => '正在旅行',
			'7' => '旅行结束',
			'98' => '订单完毕',
			'99' => '用户撤单',
			);
	function __construct(){ //{{{
		parent::__construct();
		parent::check_login();
		$this->load->database();
		$this->smarty->assign('page_id', 'order');
	}	//}}}

	public function index() {	//	{{{
		$sql = "select N.*,C.username from (select O.*,U.name from ".NEW_ORDER_TABLE." as O join ".NEW_USER_TABLE." as U on O.user=U.id) as N left join ".CUSTOM_SERVICE_TABLE." as C on C.id=N.server_last_alloted order by N.number desc";
		$data['orders'] = $this->db->query($sql)->result_array();
		$data['count'] = $this->db->query($sql)->num_rows();
		$data['order_status'] = $this->order_status;
		$this->smarty->view('order/list.tpl', $data);
	}	//	}}}

	public function edit($id) {	//{{{
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$post = array(
					'order_id' => $id,
					'operator' => $_SESSION['username'],
					'status' => $this->_post('status'),
					'call_back' => $this->_post('call_back'),
					'memo' => $this->_post('memo'),
				);
			if ($post['status'] == '3') {
				$post['partner_id'] = $this->_post('partner_id');
			}
			$this->db
				->where(array('id' => $id))
				->update('new_order', array('status' => $post['status']));
			$this->db
				->insert('order_logs', $post);
			$this->dispose_order($id, $post['status']);
			return redirect("/order/edit/{$id}");
		}
		else {
			if(!$id) redirect('/order/');
			$sql_get_order = "select O.*,U.name from ".NEW_ORDER_TABLE." as O, ".NEW_USER_TABLE." as U where O.user=U.id and O.id={$id} order by number desc";
			$sql_get_logs = "select L.*,P.title as title from ".ORDER_LOGS_TABLE." as L left join ".PARTNER_TABLE." as P on (L.partner_id = P.id) where L.order_id = {$id} order by L.created_at desc";
			$data = array(
						'order' => $this->db->query($sql_get_order)->row_array(),
						'partners' => self::_get_partners(),
						'logs' => $this->db->query($sql_get_logs)->result_array(),
					);
			$data['last_log'] = isset($data['logs'][0]) ? $data['logs'][0] : array();
			$data['order_status'] = $this->order_status;
			$this->smarty->view('order/edit.tpl', $data);
		}
	}	//}}}

	private function _get_partners() {	//{{{
		$sql = "select * from ".PARTNER_TABLE." where status = 1";
		$partners = $this->db->query($sql)->result_array();
		$data = array();
		foreach($partners as $partner){
			$data[] = array(
					'id' => $partner['id'],
					'name' => $partner['title'],
				);
		}
		return $data;
	}	//}}}

	private function dispose_order($order_id, $status) {	//{{{
		$user_id = parent::get_user_id();
		$status_url = "http://www.in1001.com/admin/add_order_status?order={$order_id}&status={$status}";
		$dispose_url = "http://www.in1001.com/admin/dispose_order?id={$order_id}&server={$user_id}";
		$status_result = json_decode(file_get_contents($status_url), true);
		$this->dispose_api($status_url);
		$this->dispose_api($dispose_url);
	}	//}}}

	private function dispose_api($url){	//{{{
		$result = json_decode(file_get_contents($url), true);
		if($result['status'] != '1'){
			echo "error, api_url : ".$url.", msg : ".http_build_query($result);
			exit;
		}
	}	//}}}

}
