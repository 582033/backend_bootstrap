<div style='float:right;padding-right:20px;margin:2px;'>
	用户名:<font color='red'><b>{$username}</b></font>&nbsp;
	<input class="btn btn-mini btn-info" type="button" onclick="window.location='/login/logout'" value="退出登录">
</div>
<ul class="nav nav-tabs">
  <li {if $page_id eq 'partner'}class='active'{/if}><a href="/partner/">合作商管理</a></li>
  <li {if $page_id eq 'xianzong'}class='active'{/if}><a href="/xianzong/">合作应用管理</a></li>
  <li {if $page_id eq 'order'}class='active'{/if}><a href="/order/">订单管理</a></li>
</ul>
