<?php
class Rest_Model extends mag_db {
	
	const TABLE_NAME = 'poi.rest';
	
	public function getByCity($city,$offset=0,$limit=9,$like=null) {
		$sql = 'SELECT * FROM '.self::TABLE_NAME." WHERE id<=6394 
				AND (lgt IS NOT NULL AND lat IS NOT NULL) 
				AND (lgt!='' AND lat!='') AND (lgt!='0' AND lat!='0')"; 
		//if (null !== $like) $sql.= " AND name LIKE '%{$like}%'";
		$sql.= " LIMIT {$offset},{$limit}";
		$result = $this->db->query($sql)->result_array();
		return $result;
	}
	public function getCountByCity($city) {
		$sql = 'SELECT count(*) AS c FROM '.self::TABLE_NAME." WHERE id<=6394
				AND (lgt IS NOT NULL AND lat IS NOT NULL)
				AND (lgt!='' AND lat!='') AND (lgt!='0' AND lat!='0')";
		$result = $this->db->query($sql)->row_array();
		return $result['c'];
	}

}
