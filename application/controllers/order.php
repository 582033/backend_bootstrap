<?php 
class order extends MY_Controller {
	function __construct(){
		parent::__construct();
		$this->load->database();
	}
	public function index() {	//	{{{
		$sql = 'select O.*,U.name from new_order as O, new_user as U where O.user=U.id order by number desc';
		$data['orders'] = $this->db->query($sql)->result_array();
		$this->smarty->view('order/list.tpl', $data);
	}	//	}}}
}
