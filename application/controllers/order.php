<?php 
require_once 'login.php';
class order extends Login {
	private $order_status = array(
			'0' => '关闭',
			'2' => '等待分配服务商',
			'3' => '等待服务商响应',
			'4' => '完成',
			);
	function __construct(){ //{{{
		parent::__construct();
		parent::check_login();
		$this->load->database();
		$this->smarty->assign('page_id', 'order');
	}	//}}}

	public function index() {	//	{{{
		$sql = "select O.*,U.name from new_order as O, new_user as U where O.user=U.id order by number desc";
		$data['orders'] = $this->db->query($sql)->result_array();
		$data['count'] = $this->db->query($sql)->num_rows();
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
			return redirect("/order/edit/{$id}");
		}
		else {
			if(!$id) redirect('/order/');
			$sql_get_order = "select O.*,U.name from new_order as O, new_user as U where O.user=U.id and O.id={$id} order by number desc";
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
		$sql = "select * from partner";
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
}
