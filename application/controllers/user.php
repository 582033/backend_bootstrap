<?php
class User extends MY_Controller {
	private $users_table = 'custom_service';	
	private $username;
	private $passwd;
	protected $user_id;
	protected $user_status;
	private $user_data;

	public function __construct() {
		parent::__construct();
		$this->load->model('auth_db');
	}

	protected function check_user($name, $pwd) {	//{{{
		$where = array('username' => $name, 'passwd' => md5($pwd));
		$row = $this->auth_db->row($this->users_table, $where);
		session_start();
		if ($row) {
			//$this->auth_db->record_logs($name, 'login');//记录登录信息到日志
			$_SESSION['username'] = $name;
			return $row;
		}
		else {
			echo "<script>alert('Username or Password error!');window.history.back(-1);</script>";
			exit;
		}
	}	//}}}

	protected function check_session($url='/') {	//{{{
		session_start();
		if (!$_SESSION['username']) {
			redirect($url);		
		}
		else {
			return $_SESSION['username'];
		}
	}	//}}}

	protected function user_logout($url='/'){	//{{{
		session_start();
		unset($_SESSION['username']);
		redirect($url);	
	}	//}}}

	protected function get_user_id() {	//{{{
		$user_data = $this->user_data;	
		return $user_data['id'];
	}	//}}}

	protected function get_user_status() {	//{{{
		$user_data = $this->user_data;	
		return $user_data['status'];
	}	//}}}
}

