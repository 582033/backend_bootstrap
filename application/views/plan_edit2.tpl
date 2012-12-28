{capture name="wrapper"}
        <script type="text/javascript">
            $(function () {
              window.editor = new PlanEditor({$plan_json});
              editor.init();
              $(window).unload(function() {
                editor.unload();
              });
            });
        </script>
		<div class="main-content">
			<div id="id-plan-info" class="plan_title"></div>
			<div class="schedule-map-container bigMap"></div>
			<div class="plan">
				<div class="cityChoose"><!-- see schedule-map-info-template --> </div>
				<div class="prevDay">
					<span>&laquo;</span>前一天</div>
				<div class="nextDay">
					<span>&raquo;</span>后一天</div>
				<div class="days">
					<dl class="day"><!-- see day-template --></dl>
				</div>
				<dl class="day dayAdd">
					<dt>+增加一天</dt>
				</dl>
			</div>
		</div>
        <div id='widget-overlay' class='outcast'>
            <div id='widget-city-view' class="widget">
                <div class="types">
                    <div class="tab btn attraction" data-type='attraction'>景点</div>
                    <div class="tab btn hotel" data-type='hotel'>酒店</div>
                    <div class="tab btn restaurant" data-type='restaurant'>餐饮</div>
                </div>
				{include file="lib/choose_city.tpl" choose_label="目的地" choose_class="to_city"}
                <div class="result-frame">
                    <div class="result-container">
                        <div class="results"></div>
                    </div>
                    <div class="page">
                        <div class="prev btn"></div>
                        <div class="next btn"></div>
                    </div>
                </div>
                <div class="close"></div>
            </div>
            <div id="widget-error-blocker" class="widget">
                <p>网络连接不稳定，您的操作将可能无法保存。
                    <br />页面将在
                    <span class="countdown">20</span>秒后自动刷新。
                    <br />
                    <span class="refresh">立即刷新</span>/
                    <span class="cancel">取消</span>
                </p>
                <div class="close"></div>
            </div>
        </div>

        <script type="text/template" id="plan-info-template">
            <div class="width">
                <h2>
                    <span id="title"><%= title %></span>
					<input type="text" name="title" value="<%= title %>" />
                    <img id="id-plan-edit" src="/sta/images/plan/ico_edit.png" />
                </h2>
                <span class="date">
                    <b>出发日期：</b>
                    <img src="/sta/images/plan/ico_calendar.png" />
					<input type="text" readonly="readonly" name="start_day" value="<%= start_day %>" />
                </span>
				<!--
				{if $allow_report_unreasonable}
				<div id="id-plan-report" style="float: left">
					不合理线路: <textarea rows="2" cols="30" placeholder="请输入线路不合理原因"></textarea>
					<span class="btn">报告</span>
				</div>
				{/if}
				-->
                <div class="btn">
                    <button id="id-auto-plan" class="optimize">优化整条线路</button>
                    <!--button class="optimize doing">正在优化线路</button-->
                    <button id="id-preview" class="next">预览</button>
                </div>
            </div>
			<!--
			<div class="autosave-progress"><img src="http://static.tukeq.com/common/img/loading-blue.gif" /><p>操作已保存</p></div>
			-->
        </script>
        <script type="text/template" id="whiteboard-filter-template">
            <% for (var i in filters) { %><li class="<%= filters[i].css_class %>"><a href="#<%= filters[i].slug %>"><%= filters[i].name %></a>
                (<%=filters[i].count %>)
              </li><% } %>
        </script>
		<script type="text/template" id="mini-activity-template">
			<span class="sort"><%= activity.pin_letter %>. </span>
			<%= activity.place.name %>
			<span class="remove" title="移除"></span>
		</script>
		<script type="text/template" id="activity-leg-template">
			<span class="traffic-summary">
				到下一地点<%= leg.distance ? leg.distance.text : '距离未知' %><br />
				乘车<%= leg.duration ? leg.duration.text : '时间未知' %>
				<a href="javescript:void(0)">
					<b class="expand">展开↓</b>
					<b class="collapse">收起↑</b>
				</a>
			</span>
			<div class="traffic-detail">
				<% _.each(leg.steps, function(step) { %>
				<hr />
				<%= step.instructions %>
				<% }); %>
			</div>
		</script>
        <script type="text/template" id="calendar-tab-template">
            <div class="tab btn prev"><div class="arrow">&lt;</div><div class="calendar-day pkg"><% if (day > 0) { %><p class="day-wrap">第<span class="day"><%= day %></span>天</p><% } else { %><p class="day-wrap">&nbsp;</p><% } %><p class="month-wrap"><span class="month"><%= yesterday.getMonth() + 1 %></span>月<span class="date"><%= yesterday.getDate() %></span>日</p></div></div><div class="tab current"><div class="calendar-day pkg"><p class="day-wrap">第<span class="day"><%= ++day %></span>天</p><p class="month-warp"><span class="month"><%= today.getMonth() + 1 %></span>月<span class="date"><%= today.getDate() %></span>日</p></div></div><div class="tab btn next"><div class="calendar-day pkg"><p class="day-wrap">第<span class="day"><%= ++day %></span>天</p><p class="month-wrap"><span class="month"><%= tomorrow.getMonth() + 1 %></span>月<span class="date"><%= tomorrow.getDate() %></span>日</p></div><div class="arrow">&gt;</div></div>
        </script>
        <script type="text/template" id="widget-city-items-template">
			<% if (list.length == 0) { %><div>暂无景点</div><% } %>
			<% _.each(list, function (item) { %>
			<div class="place-item" data-uid="<%= item.uid %>">
				<div class="item-frame"><img src="<%= item.cover %>"/>
					<div class="place-add btn">加入线路</div>
					<div class="place-exists">已加入线路</div>
					<div class="captain">
						<div class="place-name"><p class="name-zh"><%= item.name %></p></div>
						<div class="place-desc"><p class="desc"><%= item.intro %></p></div>
					</div>
				</div>
			</div>
			<% }); %>
        </script>
        <script type="text/template" id="widget-place-inner-template">
			<div class="column-left">
				<div class="info">
					<div class="city">
						<span class="name-zh"><%= place.city_name %></span><br/><span class="name-en"><%= place.city_name %></span>
					</div>
					<div class="place">
						<a href="/place/<%= place.slug %>/" target="_blank"><span class="name-zh"><%= place.name%></span><br/><span class="name-en"><%= place.name%></span></a>
					</div>
					<div class="prev btn"></div>
					<div class="desc"><%= place.desc_short %></div>
				</div>
				<% if (place.comments.length > 0) { %><div class="comment-frame"><h3>来自途客的故事与回忆</h3><div class="comment-collapse"><div class="arrow"></div></div><div class="comment-icon-index"><% var i = 0; _.each(place.comments, function(comment) { %><div data-index="<%= i++ %>"><img src="<%= comment.author_thumbnail %>" title="<%= comment.author_name %>" /></div><% }); %></div><div class="comment-photo-container"><div class="comment-photos"><% _.each(place.comments, function(comment) { %><div class="comment-photo-item"><img src="<%= comment.photo_url %>" title="<%= comment.content %>" /></div><% }); %></div></div><div  class="comment-container"><% _.each(place.comments, function(comment) { %><div class="comment-item"><p><a href="/user/<%= comment.author_slug %>/" target="_blank"><%= comment.author_name %></a>：<%= comment.content %></p></div><% }); %></div></div><% } %>
				<div class="recommendation-frame"><h3>来自朋友的意见</h3>
					<div class="recommendation-container"></div>
					<div class="recommend">
						<label class="label_radio r_on rec">推荐</label><label class="label_radio">不推荐</label><textarea rows="3" placeholder="请输入理由"></textarea><button id="recommend-public">发表</button><span class="message"></span>
					</div>
				</div>
			</div>
			<div class="column-right"><button class="btn place-add">加入线路</button>
				<button class="btn place-recommend" data-recommend='1'>推荐至线路</button>
				<button class="place-exists">已在线路中</button>
				<div class="msg"><span></span></div>
				<ul class="place-info">
					<% _.each(place.tourist_info, function(info) { %><li><h4><%= info.title %>:</h4><p><%= $.trim(info.info) %></p></li><% }); %>
					<li class="note">
						<h4>我的备注</h4><textarea rows="5" placeholder="请输入备注信息，如到达方式，预定号码等"></textarea>
						<button class="btn">保存备注</button><span class="message"></span>
					</li>
				</ul>
			</div>
			<div class="close"></div>
        </script>
        <script type="text/template" id="widget-place-recommendation-template">
            <% _.each(list, function(item) { %><div class="recommendation-item pkg"><div class="portrait"><a href="/user/<%= item.author_slug %>/" target="_blank"><img src="<%= item.author_avatar %>" /></a></div><div class="recommendation-content"><p><a href="/user/<%= item.author_slug %>/" target="_blank"><%= item.author_name %></a><span><% if(! item.recommend) { %>不<% } %>推荐</span></p><p><%=item.content%></p></div></div><% }); %>
        </script>
        <script type="text/template" id="schedule-map-info-template">
			<% _.each(items, function(item) { %>
			<a href="#" data-index="<%=item.index%>" class="<%=item.class%>"><span><%=item.name%>(<%=item.acs_num%>)</span></a>
			<% }); %>
        </script>
		<script type="text/template" id="day-template">
			<dt>
				<a class="del" href="#dialog">删除</a>
				第<span class="day">1</span>天
				<span class="date">2012-01-01</span>
				<span class="open">展开</span>
				<img src="/sta/images/plan/optimize_day.png" class="optimize" />
			</dt>
			<dd>
				<div class="mini">
					<ul class="acs">
						<li class="mini-ac"><!-- mini-activity-template --></li>
					</ul>
				</div>
				<ul class="acs">
					<li class="empty">安排至此</li>
					<li class="ac"><!-- see activity-template --></li>
					<li class="moveTime"><!-- see activity-leg-template --></li>
				</ul>
				<div class="schedule-day-distance">
					本日总时间: <span>0</span>
				</div>
			</dd>
		</script>
{/capture}
 
{include file="lib/wrapper.tpl"}
