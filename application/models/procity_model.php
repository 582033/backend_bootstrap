<?php
class Procity_Model extends mag_db {
	
	const TABLE_NAME = 'procity';
	
	public function getCitys($cityType=null,$offset=0,$limit=9) {
		$sql = 'SELECT * FROM '.self::TABLE_NAME.' WHERE pid!=0 AND lgt IS NOT NULL AND lat IS NOT NULL';
		if(null !== $cityType) {
			$sql.=' AND fetch_type='.(int)$cityType;
		}
		$sql.= ' LIMIT ?,?';
		try {
			$result = $this->db->query($sql,array($offset,$limit))->result_array();
		}
		catch (Exception $e) {
			return false;
		}
		return $result;
	}
	
	public function isCity($city) {
		$sql = 'SELECT * FROM '.self::TABLE_NAME.' WHERE name=? LIMIT 1';
		try {
			$result = $this->db->query($sql,array($city))->result_array();
		}
		catch (Exception $e) {
			return false;
		}
		return $result?true:false;
	}
	
	public function getCityById($id) {
		if(!$id) return false;
		if(is_array($id)) {
			$where = 'id IN ('.implode(',', $id).')';
		}
		else {
			$where = 'id='.$id;
		}
		$sql = 'SELECT * FROM '.self::TABLE_NAME.' WHERE '.$where;
		$result = $this->db->query($sql)->result_array();
		return $result;
	}
	
}
