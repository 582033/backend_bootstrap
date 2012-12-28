(function(a, b, c) { // {{{ qtip 
	function w() {
		w.history = w.history || [], w.history.push(arguments);
		if ("object" == typeof console) var a = console[console.warn ? "warn" : "log"],
			b = a.apply ? a.apply(console, arguments) : a(Array.prototype.slice.call(arguments))
	}
	function x(b) {
		var c;
		if (!b || "object" != typeof b) return e;
		"object" != typeof b.metadata && (b.metadata = {
			type: b.metadata
		});
		if ("content" in b) {
			if ("object" != typeof b.content || b.content.jquery) b.content = {
				text: b.content
			};
			c = b.content.text || e, !a.isFunction(c) && (!c && !c.attr || c.length < 1 || "object" == typeof c && !c.jquery) && (b.content.text = e), "title" in b.content && ("object" != typeof b.content.title && (b.content.title = {
				text: b.content.title
			}), c = b.content.title.text || e, !a.isFunction(c) && (!c && !c.attr || c.length < 1 || "object" == typeof c && !c.jquery) && (b.content.title.text = e))
		}
		return "position" in b && "object" != typeof b.position && (b.position = {
			my: b.position,
			at: b.position
		}), "show" in b && "object" != typeof b.show && (b.show.jquery ? b.show = {
			target: b.show
		} : b.show = {
			event: b.show
		}), "hide" in b && "object" != typeof b.hide && (b.hide.jquery ? b.hide = {
			target: b.hide
		} : b.hide = {
			event: b.hide
		}), "style" in b && "object" != typeof b.style && (b.style = {
			classes: b.style
		}), a.each(h, function() {
			this.sanitize && this.sanitize(b)
		}), b
	}
	function y(c, s, t, w) {
		function H(a) {
			var b = 0,
				c, d = s,
				e = a.split(".");
			while (d = d[e[b++]]) b < e.length && (c = d);
			return [c || s, e.pop()]
		}
		function I() {
			var a = s.style.widget;
			D.toggleClass(l, a).toggleClass(o, !a), F.content.toggleClass(l + "-content", a), F.titlebar && F.titlebar.toggleClass(l + "-header", a), F.button && F.button.toggleClass(k + "-icon", !a)
		}
		function J() {
			F.title && (F.titlebar.remove(), F.titlebar = F.title = F.button = f, y.reposition())
		}
		function K() {
			var b = s.content.title.button,
				c = typeof b == "string",
				d = c ? b : "Close tooltip";
			F.button && F.button.remove(), b.jquery ? F.button = b : F.button = a("<a />", {
				"class": "ui-state-default " + (s.style.widget ? "" : k + "-icon"),
				title: d,
				"aria-label": d
			}).prepend(a("<span />", {
				"class": "ui-icon ui-icon-close",
				html: "&times;"
			})), F.button.appendTo(F.titlebar).attr("role", "button").hover(function(b) {
				a(this).toggleClass("ui-state-hover", b.type === "mouseenter")
			}).click(function(a) {
				return D.hasClass(m) || y.hide(a), e
			}).bind("mousedown keydown mouseup keyup mouseout", function(b) {
				a(this).toggleClass("ui-state-active ui-state-focus", b.type.substr(-4) === "down")
			}), y.redraw()
		}
		function L() {
			var b = A + "-title";
			F.titlebar && J(), F.titlebar = a("<div />", {
				"class": k + "-titlebar " + (s.style.widget ? "ui-widget-header" : "")
			}).append(F.title = a("<div />", {
				id: b,
				"class": k + "-title",
				"aria-atomic": d
			})).insertBefore(F.content), s.content.title.button ? K() : y.rendered && y.redraw()
		}
		function M(a) {
			var b = F.button,
				c = F.title;
			if (!y.rendered) return e;
			a ? (c || L(), K()) : b.remove()
		}
		function N(b, d) {
			var f = F.title;
			if (!y.rendered || !b) return e;
			a.isFunction(b) && (b = b.call(c, G.event, y) || ""), b.jquery && b.length > 0 ? f.empty().append(b.css({
				display: "block"
			})) : f.html(b), y.redraw(), d !== e && y.rendered && D.is(":visible") && y.reposition(G.event)
		}
		function O(b, d) {
			function g(b) {
				function g(f) {
					clearTimeout(y.timers.img[this]), a(this).unbind(E), (c = c.not(this)).length === 0 && (y.redraw(), d !== e && y.reposition(G.event), b())
				}
				var c;
				if ((c = f.find("img:not([height]):not([width])")).length === 0) return g.call(c);
				c.each(function(b, c) {
					(function d() {
						if (c.height && c.width) return g.call(c);
						y.timers.img[c] = setTimeout(d, 1e3)
					})(), a(c).bind("error" + E + " load" + E, g)
				})
			}
			var f = F.content;
			return !y.rendered || !b ? e : (a.isFunction(b) && (b = b.call(c, G.event, y) || ""), b.jquery && b.length > 0 ? f.empty().append(b.css({
				display: "block"
			})) : f.html(b), y.rendered < 0 ? D.queue("fx", g) : (C = 0, g(a.noop)), y)
		}
		function P() {
			function l(a) {
				if (D.hasClass(m)) return e;
				h.show.trigger("qtip-" + t + "-inactive"), clearTimeout(y.timers.show), clearTimeout(y.timers.hide);
				var b = function() {
					y.toggle(d, a)
				};
				s.show.delay > 0 ? y.timers.show = setTimeout(b, s.show.delay) : b()
			}
			function o(b) {
				if (D.hasClass(m)) return e;
				var c = a(b.relatedTarget || b.target),
					d = c.closest(n)[0] === D[0],
					g = c[0] === h.show[0];
				clearTimeout(y.timers.show), clearTimeout(y.timers.hide);
				if (f.target === "mouse" && d || s.hide.fixed && /mouse(out|leave|move)/.test(b.type) && (d || g)) {
					b.preventDefault();
					return
				}
				s.hide.delay > 0 ? y.timers.hide = setTimeout(function() {
					y.hide(b)
				}, s.hide.delay) : y.hide(b)
			}
			function p(a) {
				if (D.hasClass(m)) return e;
				clearTimeout(y.timers.inactive), y.timers.inactive = setTimeout(function() {
					y.hide(a)
				}, s.hide.inactive)
			}
			function r(a) {
				D.is(":visible") && y.reposition(a)
			}
			var f = s.position,
				h = {
					show: s.show.target,
					hide: s.hide.target,
					viewport: a(f.viewport),
					document: a(document),
					window: a(b)
				}, j = {
					show: a.trim("" + s.show.event).split(" "),
					hide: a.trim("" + s.hide.event).split(" ")
				}, k = a.browser.msie && parseInt(a.browser.version, 10) === 6;
			D.bind("mouseenter" + E + " mouseleave" + E, function(a) {
				var b = a.type === "mouseenter";
				b && y.focus(a), D.toggleClass(q, b)
			}), s.hide.fixed && (h.hide = h.hide.add(D), D.bind("mouseover" + E, function() {
				D.hasClass(m) || clearTimeout(y.timers.hide)
			})), /mouse(out|leave)/i.test(s.hide.event) ? s.hide.leave && h.window.bind("mouse" + (s.hide.leave.indexOf("frame") > -1 ? "out" : "leave") + E, function(a) {
				/select|option/.test(a.target) && !a.relatedTarget && y.hide(a)
			}) : /mouse(over|enter)/i.test(s.show.event) && h.hide.bind("mouseleave" + E, function(a) {
				clearTimeout(y.timers.show)
			}), ("" + s.hide.event).indexOf("unfocus") > -1 && h.document.bind("mousedown" + E, function(b) {
				var d = a(b.target),
					e = !D.hasClass(m) && D.is(":visible");
				d.parents(n).length === 0 && d.add(c).length > 1 && y.hide(b)
			}), "number" == typeof s.hide.inactive && (h.show.bind("qtip-" + t + "-inactive", p), a.each(g.inactiveEvents, function(a, b) {
				h.hide.add(F.tooltip).bind(b + E + "-inactive", p)
			})), a.each(j.hide, function(b, c) {
				var d = a.inArray(c, j.show),
					e = a(h.hide);
				d > -1 && e.add(h.show).length === e.length || c === "unfocus" ? (h.show.bind(c + E, function(a) {
					D.is(":visible") ? o(a) : l(a)
				}), delete j.show[d]) : h.hide.bind(c + E, o)
			}), a.each(j.show, function(a, b) {
				h.show.bind(b + E, l)
			}), "number" == typeof s.hide.distance && h.show.bind("mousemove" + E, function(a) {
				var b = G.origin || {}, c = s.hide.distance,
					d = Math.abs;
				(d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && y.hide(a)
			}), f.target === "mouse" && (h.show.bind("mousemove" + E, function(a) {
				i = {
					pageX: a.pageX,
					pageY: a.pageY,
					type: "mousemove"
				}
			}), f.adjust.mouse && (s.hide.event && D.bind("mouseleave" + E, function(a) {
				(a.relatedTarget || a.target) !== h.show[0] && y.hide(a)
			}), h.document.bind("mousemove" + E, function(a) {
				!D.hasClass(m) && D.is(":visible") && y.reposition(a || i)
			}))), (f.adjust.resize || h.viewport.length) && (a.event.special.resize ? h.viewport : h.window).bind("resize" + E, r), (h.viewport.length || k && D.css("position") === "fixed") && h.viewport.bind("scroll" + E, r)
		}
		function Q() {
			var c = [s.show.target[0], s.hide.target[0], y.rendered && F.tooltip[0], s.position.container[0], s.position.viewport[0], b, document];
			y.rendered ? a([]).pushStack(a.grep(c, function(a) {
				return typeof a == "object"
			})).unbind(E) : s.show.target.unbind(E + "-create")
		}
		var y = this,
			z = document.body,
			A = k + "-" + t,
			B = 0,
			C = 0,
			D = a(),
			E = ".qtip-" + t,
			F, G;
		y.id = t, y.rendered = e, y.elements = F = {
			target: c
		}, y.timers = {
			img: {}
		}, y.options = s, y.checks = {}, y.plugins = {}, y.cache = G = {
			event: {},
			target: a(),
			disabled: e,
			attr: w
		}, y.checks.builtin = {
			"^id$": function(b, c, f) {
				var h = f === d ? g.nextid : f,
					i = k + "-" + h;
				h !== e && h.length > 0 && !a("#" + i).length && (D[0].id = i, F.content[0].id = i + "-content", F.title[0].id = i + "-title")
			},
			"^content.text$": function(a, b, c) {
				O(c)
			},
			"^content.title.text$": function(a, b, c) {
				if (!c) return J();
				!F.title && c && L(), N(c)
			},
			"^content.title.button$": function(a, b, c) {
				M(c)
			},
			"^position.(my|at)$": function(a, b, c) {
				"string" == typeof c && (a[b] = new h.Corner(c))
			},
			"^position.container$": function(a, b, c) {
				y.rendered && D.appendTo(c)
			},
			"^show.ready$": function() {
				y.rendered ? y.toggle(d) : y.render(1)
			},
			"^style.classes$": function(b, c, d) {
				a.attr(D[0], "class", k + " qtip ui-helper-reset " + d)
			},
			"^style.widget|content.title": I,
			"^events.(render|show|move|hide|focus|blur)$": function(b, c, d) {
				D[(a.isFunction(d) ? "" : "un") + "bind"]("tooltip" + c, d)
			},
			"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
				var a = s.position;
				D.attr("tracking", a.target === "mouse" && a.adjust.mouse), Q(), P()
			}
		}, a.extend(y, {
			render: function(b) {
				if (y.rendered) return y;
				var f = s.content.title.text,
					g = s.position,
					i = a.Event("tooltiprender");
				return a.attr(c[0], "aria-describedby", A), D = F.tooltip = a("<div/>", {
					id: A,
					"class": k + " qtip ui-helper-reset " + o + " " + s.style.classes,
					width: s.style.width || "",
					tracking: g.target === "mouse" && g.adjust.mouse,
					role: "alert",
					"aria-live": "polite",
					"aria-atomic": e,
					"aria-describedby": A + "-content",
					"aria-hidden": d
				}).toggleClass(m, G.disabled).data("qtip", y).appendTo(s.position.container).append(F.content = a("<div />", {
					"class": k + "-content",
					id: A + "-content",
					"aria-atomic": d
				})), y.rendered = -1, C = 1, f && (L(), N(f)), O(s.content.text, e), y.rendered = d, I(), a.each(s.events, function(b, c) {
					a.isFunction(c) && D.bind(b === "toggle" ? "tooltipshow tooltiphide" : "tooltip" + b, c)
				}), a.each(h, function() {
					this.initialize === "render" && this(y)
				}), P(), D.queue("fx", function(a) {
					i.originalEvent = G.event, D.trigger(i, [y]), C = 0, y.redraw(), (s.show.ready || b) && y.toggle(d, G.event), a()
				}), y
			},
			get: function(a) {
				var b, c;
				switch (a.toLowerCase()) {
				case "dimensions":
					b = {
						height: D.outerHeight(),
						width: D.outerWidth()
					};
					break;
				case "offset":
					b = h.offset(D, s.position.container);
					break;
				default:
					c = H(a.toLowerCase()), b = c[0][c[1]], b = b.precedance ? b.string() : b
				}
				return b
			},
			set: function(b, c) {
				function m(a, b) {
					var c, d, e;
					for (c in k) for (d in k[c]) if (e = (new RegExp(d, "i")).exec(a)) b.push(e), k[c][d].apply(y, b)
				}
				var g = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,
					h = /^content\.(title|attr)|style/i,
					i = e,
					j = e,
					k = y.checks,
					l;
				return "string" == typeof b ? (l = b, b = {}, b[l] = c) : b = a.extend(d, {}, b), a.each(b, function(c, d) {
					var e = H(c.toLowerCase()),
						f;
					f = e[0][e[1]], e[0][e[1]] = "object" == typeof d && d.nodeType ? a(d) : d, b[c] = [e[0], e[1], d, f], i = g.test(c) || i, j = h.test(c) || j
				}), x(s), B = C = 1, a.each(b, m), B = C = 0, D.is(":visible") && y.rendered && (i && y.reposition(s.position.target === "mouse" ? f : G.event), j && y.redraw()), y
			},
			toggle: function(b, c) {
				function q() {
					b ? (a.browser.msie && D[0].style.removeAttribute("filter"), D.css("overflow", "")) : D.css({
						display: "",
						visibility: "",
						opacity: "",
						left: "",
						top: ""
					})
				}
				if (!y.rendered) {
					if (!b) return y;
					y.render(1)
				}
				var g = b ? "show" : "hide",
					h = s[g],
					j = D.is(":visible"),
					k = !c || s[g].target.length < 2 || G.target[0] === c.target,
					l = s.position,
					m = s.content,
					o, p;
				(typeof b).search("boolean|number") && (b = !j);
				if (!D.is(":animated") && j === b && k) return y;
				if (c) {
					if (/over|enter/.test(c.type) && /out|leave/.test(G.event.type) && c.target === s.show.target[0] && D.has(c.relatedTarget).length) return y;
					G.event = a.extend({}, c)
				}
				return p = a.Event("tooltip" + g), p.originalEvent = c ? G.event : f, D.trigger(p, [y, 90]), p.isDefaultPrevented() ? y : (a.attr(D[0], "aria-hidden", !b), b ? (G.origin = a.extend({}, i), y.focus(c), a.isFunction(m.text) && O(m.text, e), a.isFunction(m.title.text) && N(m.title.text, e), !v && l.target === "mouse" && l.adjust.mouse && (a(document).bind("mousemove.qtip", function(a) {
					i = {
						pageX: a.pageX,
						pageY: a.pageY,
						type: "mousemove"
					}
				}), v = d), y.reposition(c), h.solo && a(n, h.solo).not(D).qtip("hide", p)) : (clearTimeout(y.timers.show), delete G.origin, v && !a(n + '[tracking="true"]:visible', h.solo).not(D).length && (a(document).unbind("mousemove.qtip"), v = e), y.blur(c)), k && D.stop(0, 1), h.effect === e ? (D[g](), q.call(D)) : a.isFunction(h.effect) ? (h.effect.call(D, y), D.queue("fx", function(a) {
					q(), a()
				})) : D.fadeTo(90, b ? 1 : 0, q), b && h.target.trigger("qtip-" + t + "-inactive"), y)
			},
			show: function(a) {
				return y.toggle(d, a)
			},
			hide: function(a) {
				return y.toggle(e, a)
			},
			focus: function(b) {
				if (!y.rendered) return y;
				var c = a(n),
					d = parseInt(D[0].style.zIndex, 10),
					e = g.zindex + c.length,
					f = a.extend({}, b),
					h, i;
				return D.hasClass(p) || (i = a.Event("tooltipfocus"), i.originalEvent = f, D.trigger(i, [y, e]), i.isDefaultPrevented() || (d !== e && (c.each(function() {
					this.style.zIndex > d && (this.style.zIndex = this.style.zIndex - 1)
				}), c.filter("." + p).qtip("blur", f)), D.addClass(p)[0].style.zIndex = e)), y
			},
			blur: function(b) {
				var c = a.extend({}, b),
					d;
				return D.removeClass(p), d = a.Event("tooltipblur"), d.originalEvent = c, D.trigger(d, [y]), y
			},
			reposition: function(c, d) {
				if (!y.rendered || B) return y;
				B = 1;
				var f = s.position.target,
					g = s.position,
					j = g.my,
					l = g.at,
					m = g.adjust,
					n = m.method.split(" "),
					o = D.outerWidth(),
					p = D.outerHeight(),
					q = 0,
					r = 0,
					t = a.Event("tooltipmove"),
					u = D.css("position") === "fixed",
					v = g.viewport,
					w = {
						left: 0,
						top: 0
					}, x = y.plugins.tip,
					A = {
						horizontal: n[0],
						vertical: n[1] || n[0],
						left: function(a) {
							var b = A.horizontal === "shift",
								c = v.offset.left + v.scrollLeft,
								d = j.x === "left" ? o : j.x === "right" ? -o : -o / 2,
								e = l.x === "left" ? q : l.x === "right" ? -q : -q / 2,
								f = x && x.size ? x.size.width || 0 : 0,
								g = x && x.corner && x.corner.precedance === "x" && !b ? f : 0,
								h = c - a + g,
								i = a + o - v.width - c + g,
								k = d - (j.precedance === "x" || j.x === j.y ? e : 0),
								n = j.x === "center";
							return b ? (g = x && x.corner.precedance === "y" ? f : 0, k = (j.x === "left" ? 1 : -1) * d - g, w.left += h > 0 ? h : i > 0 ? -i : 0, w.left = Math.max(v.offset.left + (g && x.corner.x === "center" ? x.offset : 0), a - k, Math.min(Math.max(v.offset.left + v.width, a + k), w.left))) : (h > 0 && (j.x !== "left" || i > 0) ? w.left -= k + (n ? 0 : 2 * m.x) : i > 0 && (j.x !== "right" || h > 0) && (w.left -= n ? -k : k + 2 * m.x), w.left !== a && n && (w.left -= m.x), w.left < c && -w.left > i && (w.left = a)), w.left - a
						},
						top: function(a) {
							var b = A.vertical === "shift",
								c = v.offset.top + v.scrollTop,
								d = j.y === "top" ? p : j.y === "bottom" ? -p : -p / 2,
								e = l.y === "top" ? r : l.y === "bottom" ? -r : -r / 2,
								f = x && x.size ? x.size.height || 0 : 0,
								g = x && x.corner && x.corner.precedance === "y" && !b ? f : 0,
								h = c - a + g,
								i = a + p - v.height - c + g,
								k = d - (j.precedance === "y" || j.x === j.y ? e : 0),
								n = j.y === "center";
							return b ? (g = x && x.corner.precedance === "x" ? f : 0, k = (j.y === "top" ? 1 : -1) * d - g, w.top += h > 0 ? h : i > 0 ? -i : 0, w.top = Math.max(v.offset.top + (g && x.corner.x === "center" ? x.offset : 0), a - k, Math.min(Math.max(v.offset.top + v.height, a + k), w.top))) : (h > 0 && (j.y !== "top" || i > 0) ? w.top -= k + (n ? 0 : 2 * m.y) : i > 0 && (j.y !== "bottom" || h > 0) && (w.top -= n ? -k : k + 2 * m.y), w.top !== a && n && (w.top -= m.y), w.top < 0 && -w.top > i && (w.top = a)), w.top - a
						}
					};
				if (a.isArray(f) && f.length === 2) l = {
					x: "left",
					y: "top"
				}, w = {
					left: f[0],
					top: f[1]
				};
				else if (f === "mouse" && (c && c.pageX || G.event.pageX)) l = {
					x: "left",
					y: "top"
				}, c = !c || c.type !== "resize" && c.type !== "scroll" ? c && c.pageX && c.type === "mousemove" ? c : i && (m.mouse || !c || !c.pageX) ? {
					pageX: i.pageX,
					pageY: i.pageY
				} : !m.mouse && G.origin ? G.origin : c : G.event, w = {
					top: c.pageY,
					left: c.pageX
				};
				else {
					f === "event" ? c && c.target && c.type !== "scroll" && c.type !== "resize" ? f = G.target = a(c.target) : f = G.target : G.target = a(f), f = a(f).eq(0);
					if (f.length === 0) return y;
					f[0] === document || f[0] === b ? (q = h.iOS ? b.innerWidth : f.width(), r = h.iOS ? b.innerHeight : f.height(), f[0] === b && (w = {
						top: !u || h.iOS ? (v || f).scrollTop() : 0,
						left: !u || h.iOS ? (v || f).scrollLeft() : 0
					})) : f.is("area") && h.imagemap ? w = h.imagemap(f, l) : f[0].namespaceURI === "http://www.w3.org/2000/svg" && h.svg ? w = h.svg(f, l) : (q = f.outerWidth(), r = f.outerHeight(), w = h.offset(f, g.container, u)), w.offset && (q = w.width, r = w.height, w = w.offset), w.left += l.x === "right" ? q : l.x === "center" ? q / 2 : 0, w.top += l.y === "bottom" ? r : l.y === "center" ? r / 2 : 0
				}
				return w.left += m.x + (j.x === "right" ? -o : j.x === "center" ? -o / 2 : 0), w.top += m.y + (j.y === "bottom" ? -p : j.y === "center" ? -p / 2 : 0), v.jquery && f[0] !== b && f[0] !== z && A.vertical + A.horizontal !== "nonenone" ? (v = {
					elem: v,
					height: v[(v[0] === b ? "h" : "outerH") + "eight"](),
					width: v[(v[0] === b ? "w" : "outerW") + "idth"](),
					scrollLeft: u ? 0 : v.scrollLeft(),
					scrollTop: u ? 0 : v.scrollTop(),
					offset: v.offset() || {
						left: 0,
						top: 0
					}
				}, w.adjusted = {
					left: A.horizontal !== "none" ? A.left(w.left) : 0,
					top: A.vertical !== "none" ? A.top(w.top) : 0
				}) : w.adjusted = {
					left: 0,
					top: 0
				}, D.attr("class", function(b, c) {
					return a.attr(this, "class").replace(/ui-tooltip-pos-\w+/i, "")
				}).addClass(k + "-pos-" + j.abbreviation()), t.originalEvent = a.extend({}, c), D.trigger(t, [y, w, v.elem || v]), t.isDefaultPrevented() ? y : (delete w.adjusted, d === e || isNaN(w.left) || isNaN(w.top) || f === "mouse" || !a.isFunction(g.effect) ? D.css(w) : a.isFunction(g.effect) && (g.effect.call(D, y, a.extend({}, w)), D.queue(function(b) {
					a(this).css({
						opacity: "",
						height: ""
					}), a.browser.msie && this.style.removeAttribute("filter"), b()
				})), B = 0, y)
			},
			redraw: function() {
				if (y.rendered < 1 || C) return y;
				var a = s.position.container,
					b, c, d, e;
				return C = 1, s.style.width ? D.css("width", s.style.width) : (D.css("width", "").addClass(r), c = D.width() + 1, d = D.css("max-width") || "", e = D.css("min-width") || "", b = (d + e).indexOf("%") > -1 ? a.width() / 100 : 0, d = (d.indexOf("%") > -1 ? b : 1) * parseInt(d, 10) || c, e = (e.indexOf("%") > -1 ? b : 1) * parseInt(e, 10) || 0, c = d + e ? Math.min(Math.max(c, e), d) : c, D.css("width", Math.round(c)).removeClass(r)), C = 0, y
			},
			disable: function(b) {
				var c = m;
				return "boolean" != typeof b && (b = !D.hasClass(c) && !G.disabled), y.rendered ? (D.toggleClass(c, b), a.attr(D[0], "aria-disabled", b)) : G.disabled = !! b, y
			},
			enable: function() {
				return y.disable(e)
			},
			destroy: function() {
				var b = c[0],
					d = a.attr(b, u);
				return y.rendered && (D.remove(), a.each(y.plugins, function() {
					this.destroy && this.destroy()
				})), clearTimeout(y.timers.show), clearTimeout(y.timers.hide), Q(), a.removeData(b, "qtip"), d && (a.attr(b, "title", d), c.removeAttr(u)), c.removeAttr("aria-describedby").unbind(".qtip"), delete j[y.id], c
			}
		})
	}
	function z(b, c) {
		var i, j, k, l, m = a(this),
			n = a(document.body),
			o = this === document ? n : m,
			p = m.metadata ? m.metadata(c.metadata) : f,
			q = c.metadata.type === "html5" && p ? p[c.metadata.name] : f,
			r = m.data(c.metadata.name || "qtipopts");
		try {
			r = typeof r == "string" ? (new Function("return " + r))() : r
		} catch (s) {
			w("Unable to parse HTML5 attribute data: " + r)
		}
		l = a.extend(d, {}, g.defaults, c, typeof r == "object" ? x(r) : f, x(q || p)), j = l.position, l.id = b;
		if ("boolean" == typeof l.content.text) {
			k = m.attr(l.content.attr);
			if (l.content.attr === e || !k) return w("Unable to locate content for tooltip! Aborting render of tooltip on element: ", m), e;
			l.content.text = k
		}
		j.container === e && (j.container = n), j.target === e && (j.target = o), l.show.target === e && (l.show.target = o), l.show.solo === d && (l.show.solo = n), l.hide.target === e && (l.hide.target = o), l.position.viewport === d && (l.position.viewport = j.container), j.at = new h.Corner(j.at), j.my = new h.Corner(j.my);
		if (a.data(this, "qtip")) if (l.overwrite) m.qtip("destroy");
		else if (l.overwrite === e) return e;
		return a.attr(this, "title") && (a.attr(this, u, a.attr(this, "title")), this.removeAttribute("title")), i = new y(m, l, b, !! k), a.data(this, "qtip", i), m.bind("remove.qtip", function() {
			i.destroy()
		}), i
	}
	function A(b) {
		var c = this,
			f = b.elements.tooltip,
			g = b.options.content.ajax,
			h = ".qtip-ajax",
			i = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			j = d;
		b.checks.ajax = {
			"^content.ajax": function(a, b, d) {
				b === "ajax" && (g = d), b === "once" ? c.init() : g && g.url ? c.load() : f.unbind(h)
			}
		}, a.extend(c, {
			init: function() {
				return g && g.url && f.unbind(h)[g.once ? "one" : "bind"]("tooltipshow" + h, c.load), c
			},
			load: function(d, h) {
				function n() {
					m && (f.css("visibility", ""), h = e)
				}
				function o(c) {
					l && (c = a("<div/>").append(c.replace(i, "")).find(l)), b.set("content.text", c), n()
				}
				function p(a, c, d) {
					b.set("content.text", c + ": " + d), n()
				}
				if (d && d.isDefaultPrevented()) return c;
				var j = g.url.indexOf(" "),
					k = g.url,
					l, m = g.once && !g.loading && h;
				return m && f.css("visibility", "hidden"), j > -1 && (l = k.substr(j), k = k.substr(0, j)), a.ajax(a.extend({
					success: o,
					error: p,
					context: b
				}, g, {
					url: k
				})), c
			}
		}), c.init()
	}
	function B(a, b, c) {
		var d = Math.ceil(b / 2),
			e = Math.ceil(c / 2),
			f = {
				bottomright: [
					[0, 0],
					[b, c],
					[b, 0]
				],
				bottomleft: [
					[0, 0],
					[b, 0],
					[0, c]
				],
				topright: [
					[0, c],
					[b, 0],
					[b, c]
				],
				topleft: [
					[0, 0],
					[0, c],
					[b, c]
				],
				topcenter: [
					[0, c],
					[d, 0],
					[b, c]
				],
				bottomcenter: [
					[0, 0],
					[b, 0],
					[d, c]
				],
				rightcenter: [
					[0, 0],
					[b, e],
					[0, c]
				],
				leftcenter: [
					[b, 0],
					[b, c],
					[0, e]
				]
			};
		return f.lefttop = f.bottomright, f.righttop = f.bottomleft, f.leftbottom = f.topright, f.rightbottom = f.topleft, f[a.string()]
	}
	function C(b, g) {
		function t(f, g, h, l) {
			if (!k.tip) return;
			var n = a.extend({}, i.corner),
				o = h.adjusted,
				p = b.options.position.adjust.method.split(" "),
				q = p[0],
				r = p[1] || p[0],
				s = {
					left: e,
					top: e,
					x: 0,
					y: 0
				}, t, u = {}, v;
			i.corner.fixed !== d && (q === "shift" && n.precedance === "x" && o.left && n.y !== "center" ? n.precedance = n.precedance === "x" ? "y" : "x" : q === "flip" && o.left && (n.x = n.x === "center" ? o.left > 0 ? "left" : "right" : n.x === "left" ? "right" : "left"), r === "shift" && n.precedance === "y" && o.top && n.x !== "center" ? n.precedance = n.precedance === "y" ? "x" : "y" : r === "flip" && o.top && (n.y = n.y === "center" ? o.top > 0 ? "top" : "bottom" : n.y === "top" ? "bottom" : "top"), n.string() !== m.corner && (m.top !== o.top || m.left !== o.left) && i.update(n, e)), t = i.position(n, o), t.right !== c && (t.left = -t.right), t.bottom !== c && (t.top = -t.bottom), t.user = Math.max(0, j.offset);
			if (s.left = q === "shift" && !! o.left) n.x === "center" ? u["margin-left"] = s.x = t["margin-left"] - o.left : (v = t.right !== c ? [o.left, - t.left] : [-o.left, t.left], (s.x = Math.max(v[0], v[1])) > v[0] && (h.left -= o.left, s.left = e), u[t.right !== c ? "right" : "left"] = s.x);
			if (s.top = r === "shift" && !! o.top) n.y === "center" ? u["margin-top"] = s.y = t["margin-top"] - o.top : (v = t.bottom !== c ? [o.top, - t.top] : [-o.top, t.top], (s.y = Math.max(v[0], v[1])) > v[0] && (h.top -= o.top, s.top = e), u[t.bottom !== c ? "bottom" : "top"] = s.y);
			k.tip.css(u).toggle(!(s.x && s.y || n.x === "center" && s.y || n.y === "center" && s.x)), h.left -= t.left.charAt ? t.user : q !== "shift" || s.top || !s.left && !s.top ? t.left : 0, h.top -= t.top.charAt ? t.user : r !== "shift" || s.left || !s.left && !s.top ? t.top : 0, m.left = o.left, m.top = o.top, m.corner = n.string()
		}
		function u(a, b, c) {
			b = b ? b : a[a.precedance];
			var d = l.hasClass(r),
				e = k.titlebar && a.y === "top",
				f = e ? k.titlebar : k.content,
				g = "border-" + b + "-width",
				h;
			return l.addClass(r), h = parseInt(f.css(g), 10), h = (c ? h || parseInt(l.css(g), 10) : h) || 0, l.toggleClass(r, d), h
		}
		function v(b) {
			var c = k.titlebar && b.y === "top",
				d = c ? k.titlebar : k.content,
				e = a.browser.mozilla,
				f = e ? "-moz-" : a.browser.webkit ? "-webkit-" : "",
				g = b.y + (e ? "" : "-") + b.x,
				h = f + (e ? "border-radius-" + g : "border-" + g + "-radius");
			return parseInt(d.css(h), 10) || parseInt(l.css(h), 10) || 0
		}
		function w(a) {
			var b = a.precedance === "y",
				c = n[b ? "width" : "height"],
				d = n[b ? "height" : "width"],
				e = a.string().indexOf("center") > -1,
				f = c * (e ? .5 : 1),
				g = Math.pow,
				h = Math.round,
				i, j, k, l = Math.sqrt(g(f, 2) + g(d, 2)),
				m = [p / f * l, p / d * l];
			return m[2] = Math.sqrt(g(m[0], 2) - g(p, 2)), m[3] = Math.sqrt(g(m[1], 2) - g(p, 2)), i = l + m[2] + m[3] + (e ? 0 : m[0]), j = i / l, k = [h(j * d), h(j * c)], {
				height: k[b ? 0 : 1],
				width: k[b ? 1 : 0]
			}
		}
		var i = this,
			j = b.options.style.tip,
			k = b.elements,
			l = k.tooltip,
			m = {
				top: 0,
				left: 0,
				corner: ""
			}, n = {
				width: j.width,
				height: j.height
			}, o = {}, p = j.border || 0,
			q = ".qtip-tip",
			s = !! (a("<canvas />")[0] || {}).getContext;
		i.corner = f, i.mimic = f, i.border = p, i.offset = j.offset, i.size = n, b.checks.tip = {
			"^position.my|style.tip.(corner|mimic|border)$": function() {
				i.init() || i.destroy(), b.reposition()
			},
			"^style.tip.(height|width)$": function() {
				n = {
					width: j.width,
					height: j.height
				}, i.create(), i.update(), b.reposition()
			},
			"^content.title.text|style.(classes|widget)$": function() {
				k.tip && i.update()
			}
		}, a.extend(i, {
			init: function() {
				var b = i.detectCorner() && (s || a.browser.msie);
				return b && (i.create(), i.update(), l.unbind(q).bind("tooltipmove" + q, t)), b
			},
			detectCorner: function() {
				var a = j.corner,
					c = b.options.position,
					f = c.at,
					g = c.my.string ? c.my.string() : c.my;
				return a === e || g === e && f === e ? e : (a === d ? i.corner = new h.Corner(g) : a.string || (i.corner = new h.Corner(a), i.corner.fixed = d), i.corner.string() !== "centercenter")
			},
			detectColours: function() {
				var c, d, e, f = k.tip.css({
					backgroundColor: "",
					border: ""
				}),
					g = i.corner,
					h = g[g.precedance],
					m = "border-" + h + "-color",
					p = "border" + h.charAt(0) + h.substr(1) + "Color",
					q = /rgba?\(0, 0, 0(, 0)?\)|transparent/i,
					s = "background-color",
					t = "transparent",
					u = a(document.body).css("color"),
					v = b.elements.content.css("color"),
					w = k.titlebar && (g.y === "top" || g.y === "center" && f.position().top + n.height / 2 + j.offset < k.titlebar.outerHeight(1)),
					x = w ? k.titlebar : k.content;
				l.addClass(r), o.fill = d = f.css(s), o.border = e = f[0].style[p] || l.css(m);
				if (!d || q.test(d)) o.fill = x.css(s) || t, q.test(o.fill) && (o.fill = l.css(s) || d);
				if (!e || q.test(e) || e === u) {
					o.border = x.css(m) || t;
					if (q.test(o.border) || o.border === v) o.border = e
				}
				a("*", f).add(f).css(s, t).css("border", ""), l.removeClass(r)
			},
			create: function() {
				var b = n.width,
					c = n.height,
					d;
				k.tip && k.tip.remove(), k.tip = a("<div />", {
					"class": "ui-tooltip-tip"
				}).css({
					width: b,
					height: c
				}).prependTo(l), s ? a("<canvas />").appendTo(k.tip)[0].getContext("2d").save() : (d = '<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>', k.tip.html(d + d))
			},
			update: function(b, c) {
				var g = k.tip,
					l = g.children(),
					m = n.width,
					q = n.height,
					r = "px solid ",
					t = "px dashed transparent",
					v = j.mimic,
					x = Math.round,
					y, z, A, C, D;
				b || (b = i.corner), v === e ? v = b : (v = new h.Corner(v), v.precedance = b.precedance, v.x === "inherit" ? v.x = b.x : v.y === "inherit" ? v.y = b.y : v.x === v.y && (v[b.precedance] = b[b.precedance])), y = v.precedance, i.detectColours(), o.border !== "transparent" && o.border !== "#123456" ? (p = u(b, f, d), j.border === 0 && p > 0 && (o.fill = o.border), i.border = p = j.border !== d ? j.border : p) : i.border = p = 0, A = B(v, m, q), i.size = D = w(b), g.css(D), b.precedance === "y" ? C = [x(v.x === "left" ? p : v.x === "right" ? D.width - m - p : (D.width - m) / 2), x(v.y === "top" ? D.height - q : 0)] : C = [x(v.x === "left" ? D.width - m : 0), x(v.y === "top" ? p : v.y === "bottom" ? D.height - q - p : (D.height - q) / 2)], s ? (l.attr(D), z = l[0].getContext("2d"), z.restore(), z.save(), z.clearRect(0, 0, 3e3, 3e3), z.translate(C[0], C[1]), z.beginPath(), z.moveTo(A[0][0], A[0][1]), z.lineTo(A[1][0], A[1][1]), z.lineTo(A[2][0], A[2][1]), z.closePath(), z.fillStyle = o.fill, z.strokeStyle = o.border, z.lineWidth = p * 2, z.lineJoin = "miter", z.miterLimit = 100, p && z.stroke(), z.fill()) : (A = "m" + A[0][0] + "," + A[0][1] + " l" + A[1][0] + "," + A[1][1] + " " + A[2][0] + "," + A[2][1] + " xe", C[2] = p && /^(r|b)/i.test(b.string()) ? parseFloat(a.browser.version, 10) === 8 ? 2 : 1 : 0, l.css({
					antialias: "" + (v.string().indexOf("center") > -1),
					left: C[0] - C[2] * Number(y === "x"),
					top: C[1] - C[2] * Number(y === "y"),
					width: m + p,
					height: q + p
				}).each(function(b) {
					var c = a(this);
					c[c.prop ? "prop" : "attr"]({
						coordsize: m + p + " " + (q + p),
						path: A,
						fillcolor: o.fill,
						filled: !! b,
						stroked: !b
					}).css({
						display: p || b ? "block" : "none"
					}), !b && c.html() === "" && c.html('<vml:stroke weight="' + p * 2 + 'px" color="' + o.border + '" miterlimit="1000" joinstyle="miter" ' + ' style="behavior:url(#default#VML); display:inline-block;" />')
				})), c !== e && i.position(b)
			},
			position: function(b) {
				var c = k.tip,
					f = {}, g = Math.max(0, j.offset),
					h, l, m;
				return j.corner === e || !c ? e : (b = b || i.corner, h = b.precedance, l = w(b), m = [b.x, b.y], h === "x" && m.reverse(), a.each(m, function(a, c) {
					var e, i;
					c === "center" ? (e = h === "y" ? "left" : "top", f[e] = "50%", f["margin-" + e] = -Math.round(l[h === "y" ? "width" : "height"] / 2) + g) : (e = u(b, c, d), i = v(b), f[c] = a ? p ? u(b, c) : 0 : g + (i > e ? i : 0))
				}), f[b[h]] -= l[h === "x" ? "width" : "height"], c.css({
					top: "",
					bottom: "",
					left: "",
					right: "",
					margin: ""
				}).css(f), f)
			},
			destroy: function() {
				k.tip && k.tip.remove(), l.unbind(q)
			}
		}), i.init()
	}
	function D(c) {
		var f = this,
			g = c.options.show.modal,
			h = c.elements,
			i = h.tooltip,
			j = "#qtip-overlay",
			k = ".qtipmodal",
			l = k + c.id,
			m = "is-modal-qtip",
			o = a(document.body),
			q;
		c.checks.modal = {
			"^show.modal.(on|blur)$": function() {
				f.init(), h.overlay.toggle(i.is(":visible"))
			}
		}, a.extend(f, {
			init: function() {
				return g.on ? (q = f.create(), i.attr(m, d).unbind(k).unbind(l).bind("tooltipshow" + k + " tooltiphide" + k, function(a, b, c) {
					var d = a.originalEvent;
					d && a.type === "tooltiphide" && /mouse(leave|enter)/.test(d.type) && d.relatedTarget.closest(q[0]).length ? a.preventDefault() : f[a.type.replace("tooltip", "")](a, c)
				}).bind("tooltipfocus" + k, function(a, b, c) {
					q[0].style.zIndex = c
				}).bind("tooltipblur" + k, function(b) {
					a("[" + m + "]:visible").not(i).last().qtip("focus", b)
				}), g.escape && a(b).unbind(l).bind("keydown" + l, function(a) {
					a.keyCode === 27 && i.hasClass(p) && c.hide(a)
				}), g.blur && h.overlay.unbind(l).bind("click" + l, function(a) {
					i.hasClass(p) && c.hide(a)
				}), f) : f
			},
			create: function() {
				var c = a(j);
				return c.length ? (h.overlay = c, c) : (q = h.overlay = a("<div />", {
					id: j.substr(1),
					html: "<div></div>",
					mousedown: function() {
						return e
					}
				}).insertBefore(a(n).last()), a(b).unbind(k).bind("resize" + k, function() {
					q.css({
						height: a(b).height(),
						width: a(b).width()
					})
				}).triggerHandler("resize"), q)
			},
			toggle: function(b, c, h) {
				if (b && b.isDefaultPrevented()) return f;
				var j = g.effect,
					k = c ? "show" : "hide",
					p = q.is(":visible"),
					r = a("[" + m + "]:visible").not(i),
					s;
				return q || (q = f.create()), q.is(":animated") && p === c || !c && r.length ? f : (c ? (q.css({
					left: 0,
					top: 0
				}), q.toggleClass("blurs", g.blur), o.delegate("*", "focusin" + l, function(b) {
					a(b.target).closest(n)[0] !== i[0] && a("a, :input, img", i).add(i).focus()
				})) : o.undelegate("*", "focus" + l), q.stop(d, e), a.isFunction(j) ? j.call(q, c) : j === e ? q[k]() : q.fadeTo(parseInt(h, 10) || 90, c ? 1 : 0, function() {
					c || a(this).hide()
				}), c || q.queue(function(a) {
					q.css({
						left: "",
						top: ""
					}), a()
				}), f)
			},
			show: function(a, b) {
				return f.toggle(a, d, b)
			},
			hide: function(a, b) {
				return f.toggle(a, e, b)
			},
			destroy: function() {
				var d = q;
				return d && (d = a("[" + m + "]").not(i).length < 1, d ? (h.overlay.remove(), a(b).unbind(k)) : h.overlay.unbind(k + c.id), o.undelegate("*", "focus" + l)), i.removeAttr(m).unbind(k)
			}
		}), f.init()
	}
	function E(b) {
		var c = this,
			d = b.elements,
			e = d.tooltip,
			f = ".bgiframe-" + b.id;
		a.extend(c, {
			init: function() {
				d.bgiframe = a('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'), d.bgiframe.appendTo(e), e.bind("tooltipmove" + f, c.adjust)
			},
			adjust: function() {
				var a = b.get("dimensions"),
					c = b.plugins.tip,
					f = d.tip,
					g, h;
				h = parseInt(e.css("border-left-width"), 10) || 0, h = {
					left: -h,
					top: -h
				}, c && f && (g = c.corner.precedance === "x" ? ["width", "left"] : ["height", "top"], h[g[1]] -= f[g[0]]()), d.bgiframe.css(h).css(a)
			},
			destroy: function() {
				d.bgiframe.remove(), e.unbind(f)
			}
		}), c.init()
	}
	"use strict";
	var d = !0,
		e = !1,
		f = null,
		g, h, i, j = {},
		k = "ui-tooltip",
		l = "ui-widget",
		m = "ui-state-disabled",
		n = "div.qtip." + k,
		o = k + "-default",
		p = k + "-focus",
		q = k + "-hover",
		r = k + "-fluid",
		s = "-31000px",
		t = "_replacedByqTip",
		u = "oldtitle",
		v;
	g = a.fn.qtip = function(b, h, i) {
		var j = ("" + b).toLowerCase(),
			k = f,
			l = j === "disable" ? [d] : a.makeArray(arguments).slice(1),
			m = l[l.length - 1],
			n = this[0] ? a.data(this[0], "qtip") : f;
		if (!arguments.length && n || j === "api") return n;
		if ("string" == typeof b) return this.each(function() {
			var b = a.data(this, "qtip");
			if (!b) return d;
			m && m.timeStamp && (b.cache.event = m);
			if (j !== "option" && j !== "options" || !h) b[j] && b[j].apply(b[j], l);
			else {
				if (!a.isPlainObject(h) && i === c) return k = b.get(h), e;
				b.set(h, i)
			}
		}), k !== f ? k : this;
		if ("object" == typeof b || !arguments.length) return n = x(a.extend(d, {}, b)), g.bind.call(this, n, m)
	}, g.bind = function(b, f) {
		return this.each(function(i) {
			function q(b) {
				function d() {
					o.render(typeof b == "object" || k.show.ready), l.show.add(l.hide).unbind(n)
				}
				if (o.cache.disabled) return e;
				o.cache.event = a.extend({}, b), o.cache.target = b ? a(b.target) : [c], k.show.delay > 0 ? (clearTimeout(o.timers.show), o.timers.show = setTimeout(d, k.show.delay), m.show !== m.hide && l.hide.bind(m.hide, function() {
					clearTimeout(o.timers.show)
				})) : d()
			}
			var k, l, m, n, o, p;
			p = a.isArray(b.id) ? b.id[i] : b.id, p = !p || p === e || p.length < 1 || j[p] ? g.nextid++ : j[p] = p, n = ".qtip-" + p + "-create", o = z.call(this, p, b);
			if (o === e) return d;
			k = o.options, a.each(h, function() {
				this.initialize === "initialize" && this(o)
			}), l = {
				show: k.show.target,
				hide: k.hide.target
			}, m = {
				show: a.trim("" + k.show.event).replace(/ /g, n + " ") + n,
				hide: a.trim("" + k.hide.event).replace(/ /g, n + " ") + n
			}, /mouse(over|enter)/i.test(m.show) && !/mouse(out|leave)/i.test(m.hide) && (m.hide += " mouseleave" + n), l.show.bind(m.show, q), (k.show.ready || k.prerender) && q(f)
		})
	}, h = g.plugins = {
		Corner: function(a) {
			a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, "center").toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.precedance = a.charAt(0).search(/^(t|b)/) > -1 ? "y" : "x", this.string = function() {
				return this.precedance === "y" ? this.y + this.x : this.x + this.y
			}, this.abbreviation = function() {
				var a = this.x.substr(0, 1),
					b = this.y.substr(0, 1);
				return a === b ? a : a === "c" || a !== "c" && b !== "c" ? b + a : a + b
			}
		},
		offset: function(c, d, e) {
			function l(a, b) {
				f.left += b * a.scrollLeft(), f.top += b * a.scrollTop()
			}
			var f = c.offset(),
				g = d,
				i = 0,
				j = document.body,
				k;
			if (g) {
				do {
					g.css("position") !== "static" && (k = g[0] === j ? {
						left: parseInt(g.css("left"), 10) || 0,
						top: parseInt(g.css("top"), 10) || 0
					} : g.position(), f.left -= k.left + (parseInt(g.css("borderLeftWidth"), 10) || 0), f.top -= k.top + (parseInt(g.css("borderTopWidth"), 10) || 0), i++);
					if (g[0] === j) break
				} while (g = g.offsetParent());
				(d[0] !== j || i > 1) && l(d, 1), (h.iOS < 4.1 && h.iOS > 3.1 || !h.iOS && e) && l(a(b), - 1)
			}
			return f
		},
		iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".")) || e,
		fn: {
			attr: function(b, c) {
				if (!this.length) return;
				var d = this[0],
					e = "title",
					f = a.data(d, "qtip");
				if (b === e) {
					if (arguments.length < 2) return a.attr(d, u);
					if (typeof f == "object") return f && f.rendered && f.options.content.attr === e && f.cache.attr && f.set("content.text", c), a.fn["attr" + t].apply(this, arguments), a.attr(d, u, a.attr(d, e)), this.removeAttr(e)
				}
			},
			clone: function(b) {
				var c = a([]),
					d = "title",
					e;
				return e = a.fn["clone" + t].apply(this, arguments).filter("[oldtitle]").each(function() {
					a.attr(this, d, a.attr(this, u)), this.removeAttribute(u)
				}).end(), e
			},
			remove: a.ui ? f : function(b, c) {
				a(this).each(function() {
					c || (!b || a.filter(b, [this]).length) && a("*", this).add(this).each(function() {
						a(this).triggerHandler("remove")
					})
				})
			}
		}
	}, a.each(h.fn, function(b, c) {
		if (!c) return d;
		var e = a.fn[b + t] = a.fn[b];
		a.fn[b] = function() {
			return c.apply(this, arguments) || e.apply(this, arguments)
		}
	}), g.version = "nightly", g.nextid = 0, g.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), g.zindex = 15e3, g.defaults = {
		prerender: e,
		id: e,
		overwrite: d,
		content: {
			text: d,
			attr: "title",
			title: {
				text: e,
				button: e
			}
		},
		position: {
			my: "top left",
			at: "bottom right",
			target: e,
			container: e,
			viewport: e,
			adjust: {
				x: 0,
				y: 0,
				mouse: d,
				resize: d,
				method: "flip flip"
			},
			effect: function(b, c, d) {
				a(this).animate(c, {
					duration: 200,
					queue: e
				})
			}
		},
		show: {
			target: e,
			event: "mouseenter",
			effect: d,
			delay: 90,
			solo: e,
			ready: e
		},
		hide: {
			target: e,
			event: "mouseleave",
			effect: d,
			delay: 0,
			fixed: e,
			inactive: e,
			leave: "window",
			distance: e
		},
		style: {
			classes: "",
			widget: e,
			width: e
		},
		events: {
			render: f,
			move: f,
			show: f,
			hide: f,
			toggle: f,
			focus: f,
			blur: f
		}
	}, h.ajax = function(a) {
		var b = a.plugins.ajax;
		return "object" == typeof b ? b : a.plugins.ajax = new A(a)
	}, h.ajax.initialize = "render", h.ajax.sanitize = function(a) {
		var b = a.content,
			c;
		b && "ajax" in b && (c = b.ajax, typeof c != "object" && (c = a.content.ajax = {
			url: c
		}), "boolean" != typeof c.once && c.once && (c.once = !! c.once))
	}, a.extend(d, g.defaults, {
		content: {
			ajax: {
				loading: d,
				once: d
			}
		}
	}), h.imagemap = function(b, c) {
		function l(a, b) {
			var d = 0,
				e = 1,
				f = 1,
				g = 0,
				h = 0,
				i = a.width,
				j = a.height;
			while (i > 0 && j > 0 && e > 0 && f > 0) {
				i = Math.floor(i / 2), j = Math.floor(j / 2), c.x === "left" ? e = i : c.x === "right" ? e = a.width - i : e += Math.floor(i / 2), c.y === "top" ? f = j : c.y === "bottom" ? f = a.height - j : f += Math.floor(j / 2), d = b.length;
				while (d--) {
					if (b.length < 2) break;
					g = b[d][0] - a.offset.left, h = b[d][1] - a.offset.top, (c.x === "left" && g >= e || c.x === "right" && g <= e || c.x === "center" && (g < e || g > a.width - e) || c.y === "top" && h >= f || c.y === "bottom" && h <= f || c.y === "center" && (h < f || h > a.height - f)) && b.splice(d, 1)
				}
			}
			return {
				left: b[0][0],
				top: b[0][1]
			}
		}
		b.jquery || (b = a(b));
		var d = b.attr("shape").toLowerCase(),
			e = b.attr("coords").split(","),
			f = [],
			g = a('img[usemap="#' + b.parent("map").attr("name") + '"]'),
			h = g.offset(),
			i = {
				width: 0,
				height: 0,
				offset: {
					top: 1e10,
					right: 0,
					bottom: 0,
					left: 1e10
				}
			}, j = 0,
			k = 0;
		h.left += Math.ceil((g.outerWidth() - g.width()) / 2), h.top += Math.ceil((g.outerHeight() - g.height()) / 2);
		if (d === "poly") {
			j = e.length;
			while (j--) k = [parseInt(e[--j], 10), parseInt(e[j + 1], 10)], k[0] > i.offset.right && (i.offset.right = k[0]), k[0] < i.offset.left && (i.offset.left = k[0]), k[1] > i.offset.bottom && (i.offset.bottom = k[1]), k[1] < i.offset.top && (i.offset.top = k[1]), f.push(k)
		} else f = a.map(e, function(a) {
			return parseInt(a, 10)
		});
		switch (d) {
		case "rect":
			i = {
				width: Math.abs(f[2] - f[0]),
				height: Math.abs(f[3] - f[1]),
				offset: {
					left: f[0],
					top: f[1]
				}
			};
			break;
		case "circle":
			i = {
				width: f[2] + 2,
				height: f[2] + 2,
				offset: {
					left: f[0],
					top: f[1]
				}
			};
			break;
		case "poly":
			a.extend(i, {
				width: Math.abs(i.offset.right - i.offset.left),
				height: Math.abs(i.offset.bottom - i.offset.top)
			}), c.string() === "centercenter" ? i.offset = {
				left: i.offset.left + i.width / 2,
				top: i.offset.top + i.height / 2
			} : i.offset = l(i, f.slice()), i.width = i.height = 0
		}
		return i.offset.left += h.left, i.offset.top += h.top, i
	}, h.tip = function(a) {
		var b = a.plugins.tip;
		return "object" == typeof b ? b : a.plugins.tip = new C(a)
	}, h.tip.initialize = "render", h.tip.sanitize = function(a) {
		var b = a.style,
			c;
		b && "tip" in b && (c = a.style.tip, typeof c != "object" && (a.style.tip = {
			corner: c
		}), /string|boolean/i.test(typeof c.corner) || (c.corner = d), typeof c.width != "number" && delete c.width, typeof c.height != "number" && delete c.height, typeof c.border != "number" && c.border !== d && delete c.border, typeof c.offset != "number" && delete c.offset)
	}, a.extend(d, g.defaults, {
		style: {
			tip: {
				corner: d,
				mimic: e,
				width: 6,
				height: 6,
				border: d,
				offset: 0
			}
		}
	}), h.svg = function(b, c) {
		var d = a(document),
			e = b[0],
			f = {
				width: 0,
				height: 0,
				offset: {
					top: 1e10,
					left: 1e10
				}
			}, g, h, i, j, k;
		if (e.getBBox && e.parentNode) {
			g = e.getBBox(), h = e.getScreenCTM(), i = e.farthestViewportElement || e;
			if (!i.createSVGPoint) return f;
			j = i.createSVGPoint(), j.x = g.x, j.y = g.y, k = j.matrixTransform(h), f.offset.left = k.x, f.offset.top = k.y, j.x += g.width, j.y += g.height, k = j.matrixTransform(h), f.width = k.x - f.offset.left, f.height = k.y - f.offset.top, f.offset.left += d.scrollLeft(), f.offset.top += d.scrollTop()
		}
		return f
	}, h.modal = function(a) {
		var b = a.plugins.modal;
		return "object" == typeof b ? b : a.plugins.modal = new D(a)
	}, h.modal.initialize = "render", h.modal.sanitize = function(a) {
		a.show && (typeof a.show.modal != "object" ? a.show.modal = {
			on: !! a.show.modal
		} : typeof a.show.modal.on == "undefined" && (a.show.modal.on = d))
	}, a.extend(d, g.defaults, {
		show: {
			modal: {
				on: e,
				effect: d,
				blur: d,
				escape: d
			}
		}
	}), h.bgiframe = function(b) {
		var c = a.browser,
			d = b.plugins.bgiframe;
		return a("select, object").length < 1 || !c.msie || c.version.charAt(0) !== "6" ? e : "object" == typeof d ? d : b.plugins.bgiframe = new E(b)
	}, h.bgiframe.initialize = "render"
})(jQuery, window); // }}}

