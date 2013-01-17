<?php 
class order extends MY_Controller {
	function __construct(){
		parent::__construct();
		$this->load->database();
	}
	public function index() {
		$where = array();
		$data['orders'] = $this->db
				->from('new_order')
				->where($where)
				->order_by('number desc')
				->get()
				->result_array();
		$this->smarty->view('order/list.tpl', $data);
	}
}
