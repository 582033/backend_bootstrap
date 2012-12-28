<?php
class Area_Model extends mag_db {
	
	const TABLE_NAME = 'area';
	
	public function getScenes($city,$offset=0,$limit=9,$like=null) {
		$this->load->model('procity_model');
		//蛋疼
		$sql = "SELECT id FROM  `procity` WHERE name='{$city}' LIMIT 1";
		$result = $this->db->query($sql)->result_array();
		if ($result && (int)$result[0]['id'] <=35) {
			$sql = "SELECT id FROM `procity` WHERE pid={$result[0]['id']} ORDER BY id ASC limit 1";
			$result = $this->db->query($sql)->result_array();
		}
		if (!$result) return false;
		$cid = $result[0]['id'];
		$sql = 'SELECT * FROM `area` WHERE cid='.$cid." AND (lgt IS NOT NULL AND lat IS NOT NULL) AND (lgt!='' AND lat!='') AND (lgt!='0' AND lat!='0')"; 
		if (null !== $like) $sql.= " AND name LIKE '%{$like}%'";
		$sql.= " LIMIT {$offset},{$limit}";
		$result = $this->db->query($sql)->result_array();
		return $result;
	}
	public function getScenesCount($city,$like=null) {
		$this->load->model('procity_model');
		//蛋疼
		$sql = "SELECT id FROM  `procity` WHERE name='{$city}' LIMIT 1";
		$result = $this->db->query($sql)->result_array();
		if ($result && (int)$result[0]['id'] <=35) {
			$sql = "SELECT id FROM `procity` WHERE pid={$result[0]['id']} ORDER BY id ASC limit 1";
			$result = $this->db->query($sql)->result_array();
		}
		if (!$result) return false;
		$cid = $result[0]['id'];
		$sql = 'SELECT count(*) AS c FROM `area` WHERE cid='.$cid." AND (lgt IS NOT NULL AND lat IS NOT NULL) AND (lgt!='' AND lat!='') AND (lgt!='0' AND lat!='0')";
		if (null !== $like) $sql.= " AND name LIKE '%{$like}%'";
		$result = $this->db->query($sql)->row_array();
		return $result['c'];
	}
	public function getScenesByArea($lng2,$lat2,$lng1,$lat1,$offset=0,$limit=9) {
		$sql = "SELECT * FROM `area` WHERE  lgt<='{$lng2}' AND lat>='{$lat2}' AND lgt>='{$lng1}' AND lat<='{$lat1}' LIMIT {$offset},{$limit}";
		$result = $this->db->query($sql)->result_array();
		return $result;
	}
	public function getScenesCountByArea($lng2,$lat2,$lng1,$lat1) {
		$sql = "SELECT count(*) AS c FROM `area` WHERE  lgt<='{$lng2}' AND lat>='{$lat2}' AND lgt>='{$lng1}' AND lat<='{$lat1}'";
		$result = $this->db->query($sql)->row_array();
		return $result['c'];
	}
	
	public function searchSenceCity($sence) {
		$sql = "SELECT count(*) AS num,cid,pid FROM area WHERE name LIKE '%{$sence}%'
				AND (lgt IS NOT NULL AND lat IS NOT NULL) AND (lgt!='' AND lat!='') AND (lgt!='0' AND lat!='0') GROUP BY cid HAVING cid>35";
		$result = $this->db->query($sql)->result_array();
		$cids = array();
		foreach ($result AS $v) {
			$cids[$v['cid']] = $v['num'];
		}
		$sql = "SELECT * FROM procity WHERE id IN (".implode(',', array_keys($cids)).") AND name!='郊县' AND name!='市辖区' LIMIT 9";
		$data = array();
		$result = $this->db->query($sql)->result_array();
		foreach($result AS $key=>$value) {
			$result[$key]['num'] = $cids[$value['id']];
		}
		//$sql = "SELECT "
		return $result;
	}
}
