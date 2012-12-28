<script>
	$(document).ready(function(){
		var comment_button = '.comment_form input';
		var reply = 'input.reply';
		var form_data = {
					plan_id : {$plan.plan_slug},
					user_id : $.cookie('uid'),
					nickname : $.cookie('nickname'),
				};
		$("body").on("click", comment_button, function(){
			form_data.content = $(comment_button).prev().val();
			if (form_data.content.length < 12) return alert('内容太少');
			$.post('/user/save_comment', form_data, function(result){
				if (result == '201') {
					alert("post ok!");
					$('#cmt').load('/plan/'+{$plan.plan_slug}+'/reload_comments');
				}
				else {
					alert("post error,httpcode is ["+result+"]");
				}
			})
		}).on("click", reply, function(){
			form_data.parentId = $(this).data('commentId');
			$('textarea[name="content"]').focus();
		});
	});
</script>
<div id="cmt">
<form class="comment_form" action="" method="POST" />
<textarea name='content'></textarea>
<input type='button' value='提交'>
</form>
{foreach $comments as $comment}
	{if $comment.parent}
	<ul><li><img src='{$comment.avatar}!50'><span class="nickname">{$comment.nickname}</span>回复{$comment.parent.nickname}:{$comment.content}</li></ul>
	{else}
	<ul><li>{$comment.nickname}:{$comment.content}</li></ul>
	{/if}
	<input type='button' class='reply' data-comment-id='{$comment.id}' value='回复'>
	<br />
	<br />
{/foreach}
</div>
