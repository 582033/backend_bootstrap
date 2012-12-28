function get_color(a) { // {{{
	if (a < 0) return "#bdbda3";
	var b = ["#3c8dc5", "#99c94b", "#f4824c", "#f7c651", "#629111", "#e73946", "#6eb6e8"];
	return b[a % b.length]
} // }}}
function NewDate(a) { // {{{
	var b = a.match(/(\d+)/g);
	return new Date(b[0], b[1] - 1, b[2])
} // }}}
function get_icon_url(pin_letter, bg_color, font_color, d) { // {{{
	d = d || "d_map_pin_letter_withshadow";
	bg_color = bg_color || "3b8def";
	font_color = font_color || "ffffff";
	url = "https://chart.googleapis.com/chart?chst=" + d + "&chld=" + pin_letter + "|" + bg_color + "|" + font_color;
	return 'http://thumb.wowpad.cn/thumb?format=png&src=' + encodeURIComponent(url);
} // }}}
function google_is_defined() { // {{{
	return typeof google != "undefined" && typeof google.maps != "undefined"
} // }}}
function LatLon(a, b, c) { // {{{
	typeof c == "undefined" && (c = 6371), this._lat = typeof a == "number" ? a : typeof a == "string" && a.trim() != "" ? +a : NaN, this._lon = typeof b == "number" ? b : typeof b == "string" && b.trim() != "" ? +b : NaN, this._radius = typeof c == "number" ? c : typeof c == "string" && trim(b) != "" ? +c : NaN
} // }}}
(function(a) { // {{{ jquery plugins
	a.fn.jgrowl = function(b) { // {{{ fn.jgrowl
		return a(this).each(function() {
			function h(b) {
				var c = a(this).data("qtip"),
					d = 5e3;
				if (c.get("show.persistent") === !0) return;
				clearTimeout(c.timer), b.type !== "mouseover" && (c.timer = setTimeout(c.hide, d))
			}
			var c = a(this),
				d = a.extend({
					title: "消息",
					text: "添加成功",
					persistent: !1,
					confirm: !1,
					action: null,
					el: null,
					callback: null
				}, b),
				e;
			if (d.persistent) {
				e = {
					text: d.text,
					title: {
						text: d.title,
						button: !0
					}
				};
				if (d.confirm) {
					var f = '<div style="padding: 5px;"><p>' + d.text + '</p><br/><div style="width:60px;margin:auto;"><a class="tag-button jgrowl-confirm corner-all-5" style="margin-right:10px;" href="#">确认</a></div></div>';
					e.text = f
				}
			} else e = {
				text: d.text
			};
			c.qtip({
				content: e,
				position: {
					my: "top center",
					at: "bottom center",
					viewport: a(window),
					effect: !0
				},
				show: {
					event: !1,
					ready: !0,
					effect: function() {
						a(this).stop(0, 1).fadeIn(400)
					},
					delay: 0,
					solo: !0,
					persistent: d.persistent
				},
				hide: {
					event: "unfocus",
					effect: function(b) {
						a(this).stop(0, 1).fadeOut(400).queue(function() {
							b.destroy()
						})
					}
				},
				style: {
					classes: "corner-all-5 ui-tooltip-light ui-tooltip-shadow",
					tip: !0
				},
				events: {
					render: function(a, b) {
						h.call(b.elements.tooltip, a)
					}
				}
			}).removeData("qtip");
			var g = function(b, c) {
				a(".jgrowl-confirm").bind("click.jgrowl", function() {
					return c.callback(c.el), !1
				})
			};
			a(document).delegate(".qtip.jgrowl", "mouseover mouseout", h), d.confirm && g(c, d)
		})
	}; // }}}
})(jQuery); // }}}
$(function() { // {{{
	$.ajaxSetup({
		cache: false
	});
}); // }}}

// vim: fdm=marker
