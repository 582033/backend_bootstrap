	<form action='/partner/add/{$id}' method='post'>
	<table class='table table-striped' style='width:600px'>
		<tr>
			<td>合作商名称:</td><td><input type='text' name='title' value='{$title}' required /></td>
		</tr>
		<tr>
			<td>联系人:</td>
			<td><input type='text' name='outer_contact' value='{$outer_contact}' required /></td>
		</tr>
		<tr>
			<td>电话:</td>
			<td><input type='text' name='tel' value='{$tel}' required /></td>
		</tr>
		<tr>
			<td>邮箱:</td>
			<td><input type='text' name='mail' value='{$mail}'  /></td>
		</tr>
		<tr>
			<td>本公司联系人:</td>
			<td><input type='text' name='inner_contact' value='{$inner_contact}' required /></td>
		</tr>
			<td>状态:</td>
			<td><select name='status'>
				<option value='1' {if $status eq "1"}selected{/if}>启用</option>
				<option value='0' {if $status eq "0"}selected{/if}>禁用</option>
			</select></td>
		</tr>
		<tr>
			<td></td>
			<td><input class='btn btn-primary' type='submit' value='确定'></td>
		</tr>
	</table>
	</form>
