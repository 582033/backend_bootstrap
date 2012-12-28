		$(function(){
			$("#viewport").height(455);
			$('body').on('mouseenter', ".bg img", function(){
				$(this).parent().find(".description").show();
			}).on('mouseleave', '.bg img', function(){
        		$(this).parent().find(".description").hide();
			});
			$('body').on('mouseenter', ".bg .info", function(){
				$(this).parent().find(".description").show();
			}).on('mouseleave', '.bg .info', function(){
        		$(this).parent().find(".description").hide();
			});
			$('body').on('mouseenter', ".description", function(){
				$(this).parent().find(".description").show();
			}).on('mouseleave', '.description', function(){
        		$(this).parent().find(".description").hide();
			});
			
			
			//$(".w750").height($(".full").height()+20);
			//$(".w750").height($(".w750").height()+20)

			//$(".posttext").textareaAutoHeight({ maxHeight:100 });
			
			notext="快速发表您的评论";
			$(".posttext").focus(function(){
				$(this).parent().find("button").show();
				if ($(this).text()==notext){
					$(this).text("");
					$(this).css("color","#000");
					$(this).parentsUntil("li.point").css("z-index","99");
				}
			});
			$(".posttext").blur(function(){
				$(this).parent().find("button").hide();
				if ($(this).text().length==0){
					$(this).text(notext);
					$(this).css("color","#999");
					$(this).parentsUntil("li.point").css("z-index","1");
				}
			});
		});
/*			
		window.onload = function(){
		  $('.w750 .point').wookmark({
			autoResize: false, // 当浏览器大小改变时是否自动调整
			container: $('.full'), // 父容器，这个要注意的一点是该容器需要有 position: relative 属性。
			offset: 1, // 每个元素之间的距离
			itemWidth: 249, // 每个元素的宽度，瀑布流高度是不限制的，所以只要宽度固定就可以了
			resizeDelay: 50 // 自动调整延迟时间，一般情况下不需要设置，默认的就好了。
		  });
		}
*/

