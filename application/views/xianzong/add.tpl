	<style>
	.contents{
		margin:3px auto;
		padding:2px;
		width:604px;
		border:1px solid #ccc;
		text-align:center;
	}
	.contents span{
		float:left;
		width:80px;
		clear:both;
	}
	.contents input {
		width:500px;
	}
	.contents select {
		width:500px;
	}
	.contents button{
		width:60px;
	}
	</style>
	<form action='/xianzong/add/{$id}' method='post'>
	<div class="contents">
		<span>标题:</span><input type='text' name='title' value='{$title}' required />
		<span>副标题:</span><input type='text' name='sub_title' value='{$sub_title}' required />
		<span>ICON:</span><input type='url' name='app_icon_url' value='{$app_icon_url}' required />
		<span>下载连接:</span><input type='url' name='download_url' value='{$download_url}' required />
		<span>权重:</span><input type='number' name='weight' value='{$weight}' required />
		<span>类型:</span>
		<select name='xianzong_type'>
			<option value='android' {if $xianzong_type eq "android"}selected{/if}>ANDROID</option>
			<option value='ios' {if $xianzong_type eq "ios"}selected{/if}>IOS</option>
		</select>
		<button class='btn btn-primary'>确定</button>
	</div>
	</form>
