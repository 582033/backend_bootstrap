<?php
class Auth_db extends CI_Model {
	
	function __construct() {
		parent::__construct();
		$ci =& get_instance();
		$this->load->database();
		$this->backend_db = $this->db;
		$this->load->library('session');
	}
	
	function record_logs ($username = NULL, $type = NULL){
		$post_uri = $this->uri->segment(2);
		$data = array(
				'username' => $this->session->userdata('username'),
				'log' => $post_uri,
				'created_at' => date('Y-m-d H:i:s', time()),
			);
		if($type == 'login') {
			$data['username'] = $username;
			$data['log'] = 'login';
		}
		if ($post_uri != 'scan_apks') $this->backend_db->insert($this->admincp_logs_table, $data);
	}

	function _get_where ($data){
		$where = array();
		if (isset($data['username']) && $data['username'] != '') {
			$where["username like"] = "%$data[username]%";
		}
		if (isset($data['from_at']) && $data['from_at'] != '') {
			$where['created_at >='] = $data['from_at'];
		}
		if (isset($data['to_at']) && $data['to_at'] != '') {
			$where['created_at <='] = $data['to_at'];
		}
		return $where;
	}
	
	function row($table, $where) {
		$row = $this->backend_db->where($where)->get($table)->row_array();
		return $row;
	}

	function list_row($table, $PageList = NULL, $data = NULL, $order = NULL) {
		if ($PageList) {
			$this->backend_db
				->limit($PageList->PerPageResults)
				->offset($PageList->StartResult);
		}
		$where = $this->_get_where($data);
		$this->backend_db->where($where);
		if ($order) {
			$this->backend_db->order_by($order);
		}
		$rows = $this->backend_db
				->get($table)
				->result_array();
		return $rows;
	}

	function rows($table, $where) {
		$rows = $this->backend_db->where($where)->get($table)->result_array();
		return $rows;
	}

	function update_row($table, $data, $where) {
		$this->backend_db->update($table, $data, $where);
		$this->record_logs();
	}

	function delete_row($table, $where) {
		$this->backend_db->delete($table, $where);
		$this->record_logs();
	}

	function insert_row($table, $data) {
		$this->backend_db->insert($table, $data);
		return $this->backend_db->insert_id();
		$this->record_logs();
	}
	
	function row_total($table, $data = NULL) {
		$where = $this->_get_where($data);
		$this->backend_db->where($where);
		$total = $this->backend_db
				->from($table)
				->count_all_results();
		return $total;
	}

	function row_uri($member, $group, $list, $name) {
		$row = $this->backend_db
			->from("$member as M, $group as G")
			->where("M.name = '$name' and M.group_ids = G.id")
			->get()
			->row_array();
		$ids = explode(",", $row['own_perm']);
		$uri = array();
		foreach ($ids as $id) {
			$result = $this->row($list, array('id' => $id));
			$uri[] = $result['uri'];
		}
		return $uri;
	}

}
