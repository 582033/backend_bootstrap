<?php
class Db_model extends CI_Model {
	function __construct() {
		parent::__construct();
		$this->load->database();
	}

	function save_row($table_name, $row) {
		$id = element('id', $row);
		if ($id) {
			$this->db->update($table_name, $row, array('id' => $id));
		}
		else {
			$this->db->insert($table_name, $row);
			$id = $this->db->insert_id();
		}
		return $id;
	}

	function row($table_name, $where) {
		return $this->db->get_where($table_name, $where)->row_array();
	}

	function rows($table_name, $where, $extra=NULL) {
		$this->db
			->from($table_name)
			->where($where);

		if ($extra) {
			foreach (array('limit', 'offset', 'orderby') as $fname) {
				if (array_key_exists($fname, $extra)) $this->db->$fname($extra[$fname]);
			}
		}

		return $this->db->get()->result_array();
	}

	function rows2objs($db_rows, $obj_name) {
		$rows = array();
		$row2_func = "row2$obj_name";
		foreach ($db_rows as $db_row) {
			$rows[] = $this->$row2_func($db_row);
		}
		return $rows;
	}

	function insert_row($table_name, $data) 	{
		$this->db->insert($table_name, $data);
	}

}

