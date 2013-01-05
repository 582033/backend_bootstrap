<?php 
class xianzong extends MY_Controller {
	function __construct(){
		parent::__construct();
		$this->load->database();
		$this->icon_url_host = '/sta/images/xianzong/appicon/';
	}
	public function index($type) {
		$where = array('xianzong_type' => $type);
		$data['apps'] = $this->db
				->from('xianzong_recommend_apps')
				->where($where)
				->order_by('weight desc')
				->get()
				->result_array();
		$this->smarty->view('xianzong/recommend.tpl', $data);
	}
	public function add($id){
		if($_SERVER['REQUEST_METHOD'] == 'GET'){
			if(!$id) redirect('/xianzong');
			$data = $this->check_id($id);
			$this->smarty->view('xianzong/add.tpl', $data);
		}
		if($_SERVER['REQUEST_METHOD'] == 'POST'){
			$now = date("Y-m-d h:i:s");
			$post = array(
						'title' => $this->input->post('title'),
						'sub_title' => $this->input->post('sub_title'),
						'app_icon_url' => $this->input->post('app_icon_url'),
						'download_url' => $this->input->post('download_url'),
						'xianzong_type' => $this->input->post('xianzong_type'),
						'weight' => $this->input->post('weight'),
						'updated_at' => $now,
					);
			if(!$id){
				$post['created_at'] = $now;
				$this->db
					->insert('xianzong_recommend_apps', $post);
			}
			else {
				$where = array('id' => $id);
				$this->db
					->where($where)
					->update('xianzong_recommend_apps', $post);
			}
			redirect('/xianzong/'.$post['xianzong_type']);
		}
	}
	private function check_id($id){
		$where = array('id' => $id);
		$result = $this->db
			->from('xianzong_recommend_apps')
			->where($where)
			->get()
			->row_array();
		return $result;
	}
	public function update_sortby()	{
		$ids = json_decode($this->input->post('ids'));	
		$i = 0;
		foreach($ids as $id){
			$update_data = array('weight' => $i--);
			$where = array('id' => $id);
			$this->db
				->where($where)
				->update('xianzong_recommend_apps', $update_data);
		}
	}
}
