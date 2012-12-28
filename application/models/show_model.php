<?php
class Show_Model extends mag_db {
	
	const TABLE_NAME = 'plan';
	
	public function get($id) {
		$id = (int)$id;
		if (!$id) return false;
		$sql = 'SELECT * FROM '.self::TABLE_NAME.' WHERE id='.$id;
		$result = $this->db->query($sql)->row_array();

		return $this->populatePlan($result);
	}
	public function getPlanDays($id){
		return  $this->db->get_where('plan_day',array('book_id'=>$id))->result_array();
	
	}


	public function getPlanTraces($id){
		return  $this->db->get_where('plan_day_trace',array('book_id'=>$id))->result_array();

	
	}
	
	public function getPlanDayTrace($id) {
		$id = (int)$id;
		if (!$id) return false;
		$sql = 'SELECT * FROM `plan_day_trace` WHERE id='.$id;
		return $this->db->query($sql)->row_array();
	}
	public function getDetailPlan($id) {
		$planData = $this->get($id);
		if(!$planData) return false;
		$sql = 'SELECT * FROM plan_day WHERE book_id='.$id.' ORDER BY day_order ASC';
		$tempDayData = $this->db->query($sql)->result_array();
		$planDayTraceData = $planDayData = $planDayIds = array();
		if($tempDayData) {
			$planDayData = $this->populatePlanDay($tempDayData,true);
			foreach ($planDayData AS $k=>$v) {
				$planDayData[$k]['events'] = array();
				$planDayData[$k]['trans'] = array();
				$planDayData[$k]['cTrans'] = array();
				$planDayData[$k]['locations'] = array();
				$planDayData[$k]['scenes'] = array();
				$planDayIds[$v['id']] = $k;
			}
			//print_r($planDayData);die;
		}
		if($planDayIds) {
			$sql='SELECT * FROM plan_day_trace WHERE book_id='.$id.' ORDER BY travel_order ASC';
			$tempDayData = $this->db->query($sql)->result_array();
			if ($tempDayData) {
				$planDayTraceData = $this->populatePlanDayTrace($tempDayData,true);
				foreach ($planDayTraceData AS $k=>$v) {
					//$planDayData[$planDayIds[$v['dayId']]]
					switch ($v['typeId']) {
						case 3:
						case 4:
						case 16:
						case 17:
							if(isset($v['extends']) && $v['extends']) {
								$v['visitHours'] = isset($v['extends']['visit_hours'])?$v['extends']['visit_hours']:'';
								$v['locationName'] = isset($v['extends']['location_name'])?$v['extends']['location_name']:'';
								$v['summary'] = isset($v['extends']['summary'])?$v['extends']['summary']:array();
								unset($v['extends']);
							}
							break;
						default:
							break;
					}
					$planDayData[$planDayIds[$v['dayId']]]['locations'][] = $v;
				}
			}
		}
		$planData['days'] = $planDayData;
		return $planData;
	}
	
	public function delPlanDayTrace($id) {
		$id = (int)$id;
		if(!$id) return false;
		$sql = 'DELETE FROM `plan_day_trace` WHERE id='.$id;
		$this->db->query($sql);
		return true;
	}
	public function deleteDay($bookId,$dayId) {
		$bookId = (int)$bookId;
		$dayId = (int)$dayId;
		if(!$bookId || !$dayId) return false;
		$sql = 'DELETE FROM `plan_day` WHERE id='.$dayId;
		$this->db->query($sql);
		$sql = 'DELETE FROM `plan_day_trace` WHERE book_id='.$bookId.' AND book_day_id='.$dayId;
		$this->db->query($sql);
		return true;
	}
	
	public function populatePlan(&$data,$a = false) {
		function changePlan(&$r,$d) {
			if(isset($d['id'])) $r['id'] = $d['id'];
			if(isset($d['title'])) $r['title'] = $d['title'];
			if(isset($d['user_id'])) $r['userId'] = $d['user_id'];
			if(isset($d['activity'])) $r['activity'] = $d['activity'];
			if(isset($d['aitivity_id'])) $r['aitivityId'] = $d['aitivity_id'];
			if(isset($d['alias_city_name'])) $r['aliasCityName'] = $d['alias_city_name'];
			if(isset($d['area'])) $r['area'] = $d['area'];
			if(isset($d['book_text'])) $r['bookText'] = $d['book_text'];
			if(isset($d['c_time'])) $r['cTime'] = $d['c_time'];
			if(isset($d['city_id'])) $r['cityId'] = $d['city_id'];
			if(isset($d['city_infos'])) $r['cityInfos'] = json_decode($d['city_infos'],true);
			if(isset($d['client_id'])) $r['clientId'] = $d['client_id'];
			if(isset($d['content'])) $r['content'] = $d['content'];
			if(isset($d['core_province'])) $r['coreProvince'] = $d['core_province'];
			if(isset($d['day_count'])) $r['dayCount'] = $d['day_count'];
			if(isset($d['dest_name'])) $r['destName'] = $d['dest_name'];
			if(isset($d['download_num'])) $r['downloadNum'] = $d['download_num'];
			if(isset($d['email'])) $r['email'] = $d['email'];
			if(isset($d['id_key'])) $r['idKey'] = $d['id_key'];
			if(isset($d['image_url'])) $r['imageUrl'] = $d['image_url'];
			if(isset($d['integral'])) $r['integral'] = $d['integral'];
			if(isset($d['ip'])) $r['ip'] = $d['ip'];
			if(isset($d['label_name'])) $r['labelName'] = $d['label_name'];
			if(isset($d['location_names'])) $r['locationNames'] = json_decode($d['location_names'],true);
			if(isset($d['memo'])) $r['memo'] = $d['memo'];
			if(isset($d['mms_url'])) $r['mmsUrl'] = $d['mms_url'];
			if(isset($d['online'])) $r['online'] = $d['online'];
			if(isset($d['paper_content'])) $r['paperContent'] = $d['paper_content'];
			if(isset($d['pdf_url'])) $r['pdfUrl'] = $d['pdf_url'];
			if(isset($d['permit'])) $r['permit'] = $d['permit'];
			if(isset($d['phone_number'])) $r['phoneNumber'] = $d['phone_number'];
			if(isset($d['prize'])) $r['prize'] = $d['prize'];
			if(isset($d['prize_id'])) $r['prizeId'] = $d['prize_id'];
			if(isset($d['publish'])) $r['publish'] = $d['publish'];
			if(isset($d['publish_num'])) $r['publishNum'] = $d['publish_num'];
			if(isset($d['score'])) $r['score'] = $d['score'];
			if(isset($d['source'])) $r['source'] = $d['source'];
			if(isset($d['source_book_id'])) $r['sourceBookId'] = $d['source_book_id'];
			if(isset($d['start_time'])) $r['startTime'] = $d['start_time'];
			if(isset($d['status'])) $r['status'] = $d['status'];
			if(isset($d['temp_user_id'])) $r['tempUserId'] = $d['temp_user_id'];
			if(isset($d['u_time'])) $r['uTime'] = $d['u_time'];
			if(isset($d['user_name'])) $r['userName'] = $d['user_name'];
			if(isset($d['word_url'])) $r['wordUrl'] = $d['word_url'];
		}
		$return = array();
		if (!$a) {
			changePlan($return,$data);
		}
		else {
			foreach ($data AS $key=>$v) {
				$return[$key] = array();
				changePlan($return[$key],$v);
			}
		}
		return $return;
	}
	
	public function populatePlanDay(&$data,$a = false) {
		function changePlanDay(&$r,$d) {
			if(isset($d['id'])) $r['id'] = $d['id'];
			if(isset($d['book_id'])) $r['bookId'] = $d['book_id'];
			if(isset($d['c_time'])) $r['cTime'] = $d['c_time'];
			if(isset($d['client_id'])) $r['activity'] = $d['client_id'];
			if(isset($d['day_order'])) $r['dayOrder'] = $d['day_order'];
			if(isset($d['day_text'])) $r['dayText'] = $d['day_text'];
			if(isset($d['houses'])) $r['houses'] = json_decode($d['houses'],true);
			if(isset($d['scenes'])) $r['scenes'] = json_decode($d['scenes'],true);
			if(isset($d['user_elements'])) $r['userElements'] = json_decode($d['user_elements'],true);
		}
		$return = array();
		if (!$a) {
			changePlanDay($return,$data);
		}
		else {
			foreach ($data AS $key=>$v) {
				$return[$key] = array();
				changePlanDay($return[$key],$v);
			}
		}
		return $return;
	}
	public function populatePlanDayTrace(&$data,$a = false) {
		function changePlanDayTrace(&$r,$d) {
			if(isset($d['abrord'])) $r['abroad'] = (bool)$d['abroad'];
			if(isset($d['area'])) $r['area'] = $d['area'];
			if(isset($d['c_time'])) $r['cTime'] = $d['c_time'];
			if(isset($d['city_id'])) $r['cityId'] = $d['city_id'];
			if(isset($d['city_name'])) $r['cityName'] = $d['city_name'];
			if(isset($d['client_id'])) $r['clientId'] = $d['client_id'];
			if(isset($d['command'])) $r['command'] = $d['command'];
			if(isset($d['book_day_id'])) $r['dayId'] = $d['book_day_id'];
			if(isset($d['detail'])) $r['detail'] = $d['detail'];
			if(isset($d['edit'])) $r['edit'] = (bool)$d['edit'];
			if(isset($d['end_time'])) $r['endTime'] = $d['end_time'];
			if(isset($d['id'])) $r['id'] = $d['id'];
			if(isset($d['image'])) $r['image'] = $d['image'];
			if(isset($d['image_url'])) $r['imageUrl'] = $d['image_url'];
			if(isset($d['lat'])) $r['lat'] = $d['lat'];
			if(isset($d['lng'])) $r['lng'] = $d['lng'];
			if(isset($d['location_id'])) $r['locationId'] = $d['location_id'];
			if(isset($d['location_name'])) $r['locationName'] = $d['location_name'];
			if(isset($d['memo'])) $r['memo'] = $d['memo'];
			if(isset($d['phone_number'])) $r['phoneNumber'] = $d['phone_number'];
			if(isset($d['remind_time'])) $r['remindTime'] = $d['remind_time'];
			if(isset($d['send'])) $r['send'] = (bool)$d['send'];
			if(isset($d['send_time'])) $r['sendTime'] = $d['send_time'];
			if(isset($d['send_time2'])) $r['sendTime2'] = $d['send_time2'];
			if(isset($d['short_district'])) $r['shortDistrict'] = $d['short_district'];
			if(isset($d['sms_content'])) $r['smsContent'] = $d['sms_content'];
			//if(isset($d['summary'])) $r['summary'] = json_decode($d['summary'],true);
			if(isset($d['time_type'])) $r['timeType'] = $d['time_type'];
			if(isset($d['travel_order'])) $r['travelOrder'] = $d['travel_order'];
			if(isset($d['type_id'])) $r['typeId'] = $d['type_id'];
			if(isset($d['extends'])) $r['extends'] = json_decode($d['extends'],true);
		}
		$return = array();
		if (!$a) {
			changePlanDayTrace($return,$data);
		}
		else {
			foreach ($data AS $key=>$v) {
				$return[$key] = array();
				changePlanDayTrace($return[$key],$v);
			}
		}
		return $return;
	}

}
