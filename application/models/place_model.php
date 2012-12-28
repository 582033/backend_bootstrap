<?php
require_once APPPATH . 'models/db_model.php';

class Place_model extends Db_model {
	function __construct() {
		parent::__construct();
		$this->load->database();
	}
	function get_city($where) {
		return $this->db->get_where('procity', $where)->row_array();
	}
	function get_cities($where, $extra=NULL) {
		$rows = $this->rows('procity', $where, $extra);
		return $rows;
	}
	function get_places($where, $extra=NULL) { // {{{
		$this->db
			->select('P.*, C.id as city_id, C.name as city_name')
			->from('area as P')
			->join('procity as C', 'P.cid = C.id')
			->where($where);
		if ($extra) {
			foreach (array('limit', 'offset', 'orderby') as $fname) {
				if (array_key_exists($fname, $extra)) $this->db->$fname($extra[$fname]);
			}
		}
		$rows = $this->db
			->get()
			->result_array();
		return $this->rows2objs($rows, 'place');
	} // }}}
	function get_place($where) { // {{{
		$objs = $this->get_places($where, array('offset' => 0, 'limit' => 1));
		return $objs[0];
	} // }}}
	function row2place($row) { // {{{
		$place = array(
				"activity_class" => "PlaceActivity",
				"address" => $row['address'],
				"arrival" => '',
				"comments" => array(
					array(
						"author_name" => 'pkufranky',
						"author_slug" => 'pkufranky',
						'author_thumbnail' => "http://tp3.sinaimg.cn/1614424830/50/0/1",
						"content" => 'test comment',
						"photo_name" => "173A892DD4D2471ABB1EAD8E3538FB81.jpg",
					),	
				),
				"description" => $row['abstract'],
				"name_en" => $row['name'],
				"name_zh" => $row['name'],
				"opentime" => $row['opentime'],
				"parent_name_en" => $row['city_name'],
				"parent_name_zh" => $row['city_name'],
				"parent_slug" => $row['city_id'],
				"phone" => $row['phone'],
				"photos" => array($row['image']),
				"place_class" => "Place",
				"price" => $row['price'],
				"slug" => $row['id'],
				"website" => "",
			);

		return $place;
	} // }}}
}
