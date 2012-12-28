<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script>
            function cl()
			{
				var browserName = navigator.appName;
				if (browserName=="Netscape") 
				{
					var opened=window.open('about:blank','_self');
					opened.close();
				}
				else if(browserName=="Opera")
				{
					window.opener=null;
					window.open('','_self');
					window.close();
				}
				else
				{
					if (browserName == "Microsoft Internet Explorer")
					{
						window.opener = "whocares";
						window.opener = null;
						window.open('', '_top');
						window.close();
					}
				}
			}
        </script>
        <script>
            {if $close}
			try { //客户端调用
				snsapp.close();
			}
			catch (e) {}
			cl();
            {elseif $window}
            window.opener.location = '{$url}';
            window.opener=null;
            window.open('','_self');
            window.close();
            {else}
            window.location = '{$url}';
            {/if}
        </script>
    </head>
	<body>
	关闭
	</body>

</html>
