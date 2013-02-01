<?php 
require_once 'login.php';
require_once 'log.php';
class partner extends Login {
	private $partner_table = 'partner';
	function __construct(){
		parent::__construct();
		parent::check_login();
		$this->load->database();
		$this->smarty->assign('page_id', 'partner');
	}
	public function index() {	//	{{{
		$where = array();
		$data['partners'] = $this->db
				->from($this->partner_table)
				->where($where)
				->order_by('created_at desc')
				->get()
				->result_array();
		$this->smarty->view('partner/list.tpl', $data);
	}	//	}}}
	public function add($id=null){	//	{{{
		if($_SERVER['REQUEST_METHOD'] == 'GET'){
			if(!$id) redirect('/partner');
			$data = $this->check_id($id);
			$this->smarty->view('partner/add.tpl', $data);
		}
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$now = date("Y-m-d h:i:s");
			$post = array(
						'title' => $this->input->post('title'),
						'outer_contact' => $this->input->post('outer_contact'),
						'tel' => $this->input->post('tel'),
						'mail' => $this->input->post('mail'),
						//'business_area' => $this->input->post('business_area'),
						'inner_contact' => $this->input->post('inner_contact'),
						'status' => $this->input->post('status'),
					);
			if(!$id){
				$post['created_at'] = $now;
				$this->db
					->insert($this->partner_table, $post);
			}
			else {
				$where = array('id' => $id);
				$this->db
					->where($where)
					->update($this->partner_table, $post);
			}
			redirect('/partner');
		}
	}	//	}}}
	private function check_id($id){	//	{{{
		$where = array('id' => $id);
		$result = $this->db
			->from('partner')
			->where($where)
			->get()
			->row_array();
		return $result;
	}	//	}}}
}
