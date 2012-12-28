 /*
 MIT License - http://www.opensource.org/licenses/mit-license.php

 For usage and examples, visit:
 http://timeago.yarp.com/

 Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
*/
 /*(function(b) {
    function f(a) {
        var c = a || window.event, f = [].slice.call(arguments, 1), p = 0, t = 0, m = 0, a = b.event.fix(c);
        a.type = "mousewheel";
        c.wheelDelta && (p = c.wheelDelta / 120);
        c.detail && (p = -c.detail / 3);
        m = p;
        void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (m = 0, t = -1 * p);
        void 0 !== c.wheelDeltaY && (m = c.wheelDeltaY / 120);
        void 0 !== c.wheelDeltaX && (t = -1 * c.wheelDeltaX / 120);
        f.unshift(a, p, t, m);
        return (b.event.dispatch || b.event.handle).apply(this, f)
    }
    var a = ["DOMMouseScroll", "mousewheel"];
    if (b.event.fixHooks)
        for (var c = a.length; c; )
            b.event.fixHooks[a[--c]] = 
            b.event.mouseHooks;
    b.event.special.mousewheel = {setup: function() {
            if (this.addEventListener)
                for (var b = a.length; b; )
                    this.addEventListener(a[--b], f, !1);
            else
                this.onmousewheel = f
        },teardown: function() {
            if (this.removeEventListener)
                for (var b = a.length; b; )
                    this.removeEventListener(a[--b], f, !1);
            else
                this.onmousewheel = null
        }};
    b.fn.extend({mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }})
})(jQuery);*/
(function() {
 	function b(a, c, d) {
 		if (a === c) return 0 !== a || 1 / a == 1 / c;
 		if (null == a || null == c) return a === c;
 		a._chain && (a = a._wrapped);
 		c._chain && (c = c._wrapped);
 		if (a.isEqual && o.isFunction(a.isEqual)) return a.isEqual(c);
 		if (c.isEqual && o.isFunction(c.isEqual)) return c.isEqual(a);
 		var i = t.call(a);
 		if (i != t.call(c)) return !1;
 		switch (i) {
 		case "[object String]":
 			return a == "" + c;
 		case "[object Number]":
 			return a != +a ? c != +c : 0 == a ? 1 / a == 1 / c : a == +c;
 		case "[object Date]":
 		case "[object Boolean]":
 			return +a == +c;
 		case "[object RegExp]":
 			return a.source == c.source && a.global == c.global && a.multiline == c.multiline && a.ignoreCase == c.ignoreCase
 		}
 		if ("object" != typeof a || "object" != typeof c) return !1;
 		for (var l = d.length; l--;)
 		if (d[l] == a) return !0;
 		d.push(a);
 		var l = 0,
 			f = !0;
 		if ("[object Array]" == i) {
 			if (l = a.length, f = l == c.length) for (; l-- && (f = l in a == l in c && b(a[l], c[l], d)););
 		} else {
 			if ("constructor" in a != "constructor" in c || a.constructor != c.constructor) return !1;
 			for (var j in a)
 			if (o.has(a, j) && (l++, !(f = o.has(c, j) && b(a[j], c[j], d)))) break;
 			if (f) {
 				for (j in c)
 				if (o.has(c, j) && !l--) break;
 				f = !l
 			}
 		}
 		d.pop();
 		return f
 	}
 	var f = this,
 		a = f._,
 		c = {}, d = Array.prototype,
 		j = Object.prototype,
 		k = d.slice,
 		p = d.unshift,
 		t = j.toString,
 		m = j.hasOwnProperty,
 		n = d.forEach,
 		u = d.map,
 		r = d.reduce,
 		y = d.reduceRight,
 		x = d.filter,
 		q = d.every,
 		w = d.some,
 		D = d.indexOf,
 		C = d.lastIndexOf,
 		j = Array.isArray,
 		E = Object.keys,
 		F = Function.prototype.bind,
 		o = function(a) {
 			return new N(a)
 		};
 	"undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = o), exports._ = o) : f._ = o;
 	o.VERSION = "1.3.3";
 	var B = o.each = o.forEach = function(a,
 	b, d) {
 		if (null != a) if (n && a.forEach === n) a.forEach(b, d);
 		else if (a.length === +a.length) for (var i = 0, l = a.length; i < l && !(i in a && b.call(d, a[i], i, a) === c); i++);
 		else for (i in a)
 		if (o.has(a, i) && b.call(d, a[i], i, a) === c) break
 	};
 	o.map = o.collect = function(a, b, c) {
 		var d = [];
 		if (null == a) return d;
 		if (u && a.map === u) return a.map(b, c);
 		B(a, function(a, i, l) {
 			d[d.length] = b.call(c, a, i, l)
 		});
 		a.length === +a.length && (d.length = a.length);
 		return d
 	};
 	o.reduce = o.foldl = o.inject = function(a, b, c, d) {
 		var i = 2 < arguments.length;
 		null == a && (a = []);
 		if (r && a.reduce === r) return d && (b = o.bind(b, d)), i ? a.reduce(b, c) : a.reduce(b);
 		B(a, function(a, l, f) {
 			i ? c = b.call(d, c, a, l, f) : (c = a, i = !0)
 		});
 		if (!i) throw new TypeError("Reduce of empty array with no initial value");
 		return c
 	};
 	o.reduceRight = o.foldr = function(a, b, c, d) {
 		var i = 2 < arguments.length;
 		null == a && (a = []);
 		if (y && a.reduceRight === y) return d && (b = o.bind(b, d)), i ? a.reduceRight(b, c) : a.reduceRight(b);
 		var l = o.toArray(a).reverse();
 		d && !i && (b = o.bind(b, d));
 		return i ? o.reduce(l, b, c, d) : o.reduce(l, b)
 	};
 	o.find = o.detect = function(a, b, c) {
 		var d;
 		K(a, function(a,
 		i, l) {
 			if (b.call(c, a, i, l)) return d = a, !0
 		});
 		return d
 	};
 	o.filter = o.select = function(a, b, c) {
 		var d = [];
 		if (null == a) return d;
 		if (x && a.filter === x) return a.filter(b, c);
 		B(a, function(a, i, l) {
 			b.call(c, a, i, l) && (d[d.length] = a)
 		});
 		return d
 	};
 	o.reject = function(a, b, c) {
 		var d = [];
 		if (null == a) return d;
 		B(a, function(a, i, l) {
 			b.call(c, a, i, l) || (d[d.length] = a)
 		});
 		return d
 	};
 	o.every = o.all = function(a, b, d) {
 		var i = !0;
 		if (null == a) return i;
 		if (q && a.every === q) return a.every(b, d);
 		B(a, function(a, l, f) {
 			if (!(i = i && b.call(d, a, l, f))) return c
 		});
 		return !!i
 	};
 	var K = o.some = o.any = function(a, b, d) {
 		b || (b = o.identity);
 		var i = !1;
 		if (null == a) return i;
 		if (w && a.some === w) return a.some(b, d);
 		B(a, function(a, l, f) {
 			if (i || (i = b.call(d, a, l, f))) return c
 		});
 		return !!i
 	};
 	o.include = o.contains = function(a, b) {
 		return null == a ? !1 : D && a.indexOf === D ? -1 != a.indexOf(b) : K(a, function(a) {
 			return a === b
 		})
 	};
 	o.invoke = function(a, b) {
 		var c = k.call(arguments, 2);
 		return o.map(a, function(a) {
 			return (o.isFunction(b) ? b || a : a[b]).apply(a, c)
 		})
 	};
 	o.pluck = function(a, b) {
 		return o.map(a, function(a) {
 			return a[b]
 		})
 	};
 	o.max = function(a,
 	b, c) {
 		if (!b && o.isArray(a) && a[0] === +a[0]) return Math.max.apply(Math, a);
 		if (!b && o.isEmpty(a)) return -Infinity;
 		var d = {
 			computed: -Infinity
 		};
 		B(a, function(a, i, l) {
 			i = b ? b.call(c, a, i, l) : a;
 			i >= d.computed && (d = {
 				value: a,
 				computed: i
 			})
 		});
 		return d.value
 	};
 	o.min = function(a, b, c) {
 		if (!b && o.isArray(a) && a[0] === +a[0]) return Math.min.apply(Math, a);
 		if (!b && o.isEmpty(a)) return Infinity;
 		var d = {
 			computed: Infinity
 		};
 		B(a, function(a, i, l) {
 			i = b ? b.call(c, a, i, l) : a;
 			i < d.computed && (d = {
 				value: a,
 				computed: i
 			})
 		});
 		return d.value
 	};
 	o.shuffle = function(a) {
 		var b = [],
 			c;
 		B(a, function(a, d) {
 			c = Math.floor(Math.random() * (d + 1));
 			b[d] = b[c];
 			b[c] = a
 		});
 		return b
 	};
 	o.sortBy = function(a, b, c) {
 		var d = o.isFunction(b) ? b : function(a) {
 				return a[b]
 			};
 		return o.pluck(o.map(a, function(a, b, i) {
 			return {
 				value: a,
 				criteria: d.call(c, a, b, i)
 			}
 		}).sort(function(a, b) {
 			var c = a.criteria,
 				d = b.criteria;
 			return void 0 === c ? 1 : void 0 === d ? -1 : c < d ? -1 : c > d ? 1 : 0
 		}), "value")
 	};
 	o.groupBy = function(a, b) {
 		var c = {}, d = o.isFunction(b) ? b : function(a) {
 				return a[b]
 			};
 		B(a, function(a, b) {
 			var i = d(a, b);
 			(c[i] || (c[i] = [])).push(a)
 		});
 		return c
 	};
 	o.sortedIndex = function(a, b, c) {
 		c || (c = o.identity);
 		for (var d = 0, i = a.length; d < i;) {
 			var l = d + i >> 1;
 			c(a[l]) < c(b) ? d = l + 1 : i = l
 		}
 		return d
 	};
 	o.toArray = function(a) {
 		return !a ? [] : o.isArray(a) || o.isArguments(a) ? k.call(a) : a.toArray && o.isFunction(a.toArray) ? a.toArray() : o.values(a)
 	};
 	o.size = function(a) {
 		return o.isArray(a) ? a.length : o.keys(a).length
 	};
 	o.first = o.head = o.take = function(a, b, c) {
 		return null != b && !c ? k.call(a, 0, b) : a[0]
 	};
 	o.initial = function(a, b, c) {
 		return k.call(a, 0, a.length - (null == b || c ? 1 : b))
 	};
 	o.last = function(a, b, c) {
 		return null != b && !c ? k.call(a, Math.max(a.length - b, 0)) : a[a.length - 1]
 	};
 	o.rest = o.tail = function(a, b, c) {
 		return k.call(a, null == b || c ? 1 : b)
 	};
 	o.compact = function(a) {
 		return o.filter(a, function(a) {
 			return !!a
 		})
 	};
 	o.flatten = function(a, b) {
 		return o.reduce(a, function(a, c) {
 			if (o.isArray(c)) return a.concat(b ? c : o.flatten(c));
 			a[a.length] = c;
 			return a
 		}, [])
 	};
 	o.without = function(a) {
 		return o.difference(a, k.call(arguments, 1))
 	};
 	o.uniq = o.unique = function(a, b, c) {
 		var c = c ? o.map(a, c) : a,
 			d = [];
 		3 > a.length && (b = !0);
 		o.reduce(c, function(c, i, l) {
 			if (b ? o.last(c) !== i || !c.length : !o.include(c, i)) c.push(i), d.push(a[l]);
 			return c
 		}, []);
 		return d
 	};
 	o.union = function() {
 		return o.uniq(o.flatten(arguments, !0))
 	};
 	o.intersection = o.intersect = function(a) {
 		var b = k.call(arguments, 1);
 		return o.filter(o.uniq(a), function(a) {
 			return o.every(b, function(b) {
 				return 0 <= o.indexOf(b, a)
 			})
 		})
 	};
 	o.difference = function(a) {
 		var b = o.flatten(k.call(arguments, 1), !0);
 		return o.filter(a, function(a) {
 			return !o.include(b, a)
 		})
 	};
 	o.zip = function() {
 		for (var a = k.call(arguments), b = o.max(o.pluck(a, "length")), c = Array(b), d = 0; d < b; d++)
 		c[d] = o.pluck(a, "" + d);
 		return c
 	};
 	o.indexOf = function(a, b, c) {
 		if (null == a) return -1;
 		var d;
 		if (c) return c = o.sortedIndex(a, b), a[c] === b ? c : -1;
 		if (D && a.indexOf === D) return a.indexOf(b);
 		c = 0;
 		for (d = a.length; c < d; c++)
 		if (c in a && a[c] === b) return c;
 		return -1
 	};
 	o.lastIndexOf = function(a, b) {
 		if (null == a) return -1;
 		if (C && a.lastIndexOf === C) return a.lastIndexOf(b);
 		for (var c = a.length; c--;)
 		if (c in a && a[c] === b) return c;
 		return -1
 	};
 	o.range = function(a, b, c) {
 		1 >= arguments.length && (b = a || 0, a = 0);
 		for (var c = arguments[2] || 1, d = Math.max(Math.ceil((b - a) / c), 0), i = 0, l = Array(d); i < d;)
 		l[i++] = a, a += c;
 		return l
 	};
 	var I = function() {};
 	o.bind = function(a, b) {
 		var c, d;
 		if (a.bind === F && F) return F.apply(a, k.call(arguments, 1));
 		if (!o.isFunction(a)) throw new TypeError;
 		d = k.call(arguments, 2);
 		return c = function() {
 			if (!(this instanceof c)) return a.apply(b, d.concat(k.call(arguments)));
 			I.prototype = a.prototype;
 			var i = new I,
 				l = a.apply(i, d.concat(k.call(arguments)));
 			return Object(l) === l ? l : i
 		}
 	};
 	o.bindAll = function(a) {
 		var b = k.call(arguments, 1);
 		0 == b.length && (b = o.functions(a));
 		B(b, function(b) {
 			a[b] = o.bind(a[b], a)
 		});
 		return a
 	};
 	o.memoize = function(a, b) {
 		var c = {};
 		b || (b = o.identity);
 		return function() {
 			var d = b.apply(this, arguments);
 			return o.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
 		}
 	};
 	o.delay = function(a, b) {
 		var c = k.call(arguments, 2);
 		return setTimeout(function() {
 			return a.apply(null, c)
 		}, b)
 	};
 	o.defer = function(a) {
 		return o.delay.apply(o, [a, 1].concat(k.call(arguments, 1)))
 	};
 	o.throttle = function(a, b) {
 		var c, d, i, l, f, j, k = o.debounce(function() {
 			f = l = !1
 		}, b);
 		return function() {
 			c = this;
 			d = arguments;
 			i || (i = setTimeout(function() {
 				i = null;
 				f && a.apply(c, d);
 				k()
 			}, b));
 			l ? f = !0 : j = a.apply(c, d);
 			k();
 			l = !0;
 			return j
 		}
 	};
 	o.debounce = function(a, b, c) {
 		var d;
 		return function() {
 			var i = this,
 				l = arguments;
 			c && !d && a.apply(i, l);
 			clearTimeout(d);
 			d = setTimeout(function() {
 				d = null;
 				c || a.apply(i, l)
 			}, b)
 		}
 	};
 	o.once = function(a) {
 		var b = !1,
 			c;
 		return function() {
 			if (b) return c;
 			b = !0;
 			return c = a.apply(this, arguments)
 		}
 	};
 	o.wrap = function(a, b) {
 		return function() {
 			var c = [a].concat(k.call(arguments, 0));
 			return b.apply(this, c)
 		}
 	};
 	o.compose = function() {
 		var a = arguments;
 		return function() {
 			for (var b = arguments, c = a.length - 1; 0 <= c; c--)
 			b = [a[c].apply(this, b)];
 			return b[0]
 		}
 	};
 	o.after = function(a, b) {
 		return 0 >= a ? b() : function() {
 			if (1 > --a) return b.apply(this, arguments)
 		}
 	};
 	o.keys = E || function(a) {
 		if (a !== Object(a)) throw new TypeError("Invalid object");
 		var b = [],
 			c;
 		for (c in a)
 		o.has(a, c) && (b[b.length] = c);
 		return b
 	};
 	o.values = function(a) {
 		return o.map(a, o.identity)
 	};
 	o.functions = o.methods = function(a) {
 		var b = [],
 			c;
 		for (c in a)
 		o.isFunction(a[c]) && b.push(c);
 		return b.sort()
 	};
 	o.extend = function(a) {
 		B(k.call(arguments, 1), function(b) {
 			for (var c in b)
 			a[c] = b[c]
 		});
 		return a
 	};
 	o.pick = function(a) {
 		var b = {};
 		B(o.flatten(k.call(arguments, 1)), function(c) {
 			c in a && (b[c] = a[c])
 		});
 		return b
 	};
 	o.defaults = function(a) {
 		B(k.call(arguments, 1), function(b) {
 			for (var c in b)
 			null == a[c] && (a[c] = b[c])
 		});
 		return a
 	};
 	o.clone = function(a) {
 		return !o.isObject(a) ? a : o.isArray(a) ? a.slice() : o.extend({}, a)
 	};
 	o.tap = function(a, b) {
 		b(a);
 		return a
 	};
 	o.isEqual = function(a, c) {
 		return b(a, c, [])
 	};
 	o.isEmpty = function(a) {
 		if (null == a) return !0;
 		if (o.isArray(a) || o.isString(a)) return 0 === a.length;
 		for (var b in a)
 		if (o.has(a,
 		b)) return !1;
 		return !0
 	};
 	o.isElement = function(a) {
 		return !!(a && 1 == a.nodeType)
 	};
 	o.isArray = j || function(a) {
 		return "[object Array]" == t.call(a)
 	};
 	o.isObject = function(a) {
 		return a === Object(a)
 	};
 	o.isArguments = function(a) {
 		return "[object Arguments]" == t.call(a)
 	};
 	o.isArguments(arguments) || (o.isArguments = function(a) {
 		return !(!a || !o.has(a, "callee"))
 	});
 	o.isFunction = function(a) {
 		return "[object Function]" == t.call(a)
 	};
 	o.isString = function(a) {
 		return "[object String]" == t.call(a)
 	};
 	o.isNumber = function(a) {
 		return "[object Number]" == t.call(a)
 	};
 	o.isFinite = function(a) {
 		return o.isNumber(a) && isFinite(a)
 	};
 	o.isNaN = function(a) {
 		return a !== a
 	};
 	o.isBoolean = function(a) {
 		return !0 === a || !1 === a || "[object Boolean]" == t.call(a)
 	};
 	o.isDate = function(a) {
 		return "[object Date]" == t.call(a)
 	};
 	o.isRegExp = function(a) {
 		return "[object RegExp]" == t.call(a)
 	};
 	o.isNull = function(a) {
 		return null === a
 	};
 	o.isUndefined = function(a) {
 		return void 0 === a
 	};
 	o.has = function(a, b) {
 		return m.call(a, b)
 	};
 	o.noConflict = function() {
 		f._ = a;
 		return this
 	};
 	o.identity = function(a) {
 		return a
 	};
 	o.times = function(a, b, c) {
 		for (var d = 0; d < a; d++)
 		b.call(c, d)
 	};
 	o.escape = function(a) {
 		return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
 	};
 	o.result = function(a, b) {
 		if (null == a) return null;
 		var c = a[b];
 		return o.isFunction(c) ? c.call(a) : c
 	};
 	o.mixin = function(a) {
 		B(o.functions(a), function(b) {
 			var c = o[b] = a[b];
 			N.prototype[b] = function() {
 				var a = k.call(arguments);
 				p.call(a, this._wrapped);
 				return V(c.apply(o, a), this._chain)
 			}
 		})
 	};
 	var l = 0;
 	o.uniqueId = function(a) {
 		var b = l++;
 		return a ? a + b : b
 	};
 	o.templateSettings = {
 		evaluate: /<%([\s\S]+?)%>/g,
 		interpolate: /<%=([\s\S]+?)%>/g,
 		escape: /<%-([\s\S]+?)%>/g
 	};
 	var v = /.^/,
 		i = {
 			"\\": "\\",
 			"'": "'",
 			r: "\r",
 			n: "\n",
 			t: "\t",
 			u2028: "\u2028",
 			u2029: "\u2029"
 		}, L;
 	for (L in i)
 	i[i[L]] = L;
 	var A = /\\|'|\r|\n|\t|\u2028|\u2029/g,
 		O = /\\(\\|'|r|n|t|u2028|u2029)/g,
 		Q = function(a) {
 			return a.replace(O, function(a, b) {
 				return i[b]
 			})
 		};
 	o.template = function(a, b, c) {
 		c = o.defaults(c || {}, o.templateSettings);
 		a = "__p+='" + a.replace(A, function(a) {
 			return "\\" + i[a]
 		}).replace(c.escape || v, function(a, b) {
 			return "'+\n_.escape(" + Q(b) + ")+\n'"
 		}).replace(c.interpolate || v, function(a, b) {
 			return "'+\n(" + Q(b) + ")+\n'"
 		}).replace(c.evaluate || v, function(a, b) {
 			return "';\n" + Q(b) + "\n;__p+='"
 		}) + "';\n";
 		c.variable || (a = "with(obj||{}){\n" + a + "}\n");
 		var a = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + a + "return __p;\n",
 			d = new Function(c.variable || "obj", "_", a);
 		if (b) return d(b, o);
 		b = function(a) {
 			return d.call(this, a, o)
 		};
 		b.source = "function(" + (c.variable || "obj") + "){\n" + a + "}";
 		return b
 	};
 	o.chain = function(a) {
 		return o(a).chain()
 	};
 	var N = function(a) {
 		this._wrapped = a
 	};
 	o.prototype = N.prototype;
 	var V = function(a, b) {
 		return b ? o(a).chain() : a
 	};
 	o.mixin(o);
 	B("pop push reverse shift sort splice unshift".split(" "), function(a) {
 		var b = d[a];
 		N.prototype[a] = function() {
 			var c = this._wrapped;
 			b.apply(c, arguments);
 			var d = c.length;
 			(a == "shift" || a == "splice") && d === 0 && delete c[0];
 			return V(c, this._chain)
 		}
 	});
 	B(["concat", "join", "slice"], function(a) {
 		var b = d[a];
 		N.prototype[a] = function() {
 			return V(b.apply(this._wrapped, arguments),
 			this._chain)
 		}
 	});
 	N.prototype.chain = function() {
 		this._chain = !0;
 		return this
 	};
 	N.prototype.value = function() {
 		return this._wrapped
 	}
 }).call(this);
 (function() {
 	var b = this,
 		f = b.Backbone,
 		a = Array.prototype.slice,
 		c = Array.prototype.splice,
 		d;
 	d = "undefined" !== typeof exports ? exports : b.Backbone = {};
 	d.VERSION = "0.9.2";
 	var j = b._;
 	!j && "undefined" !== typeof require && (j = require("underscore"));
 	var k = b.jQuery || b.Zepto || b.ender;
 	d.setDomLibrary = function(a) {
 		k = a
 	};
 	d.noConflict = function() {
 		b.Backbone = f;
 		return this
 	};
 	d.emulateHTTP = !1;
 	d.emulateJSON = !1;
 	var p = /\s+/,
 		t = d.Events = {
 			on: function(a, b, c) {
 				var d, f, j, k, m;
 				if (!b) return this;
 				a = a.split(p);
 				for (d = this._callbacks || (this._callbacks = {}); f = a.shift();)
 				j = (m = d[f]) ? m.tail : {}, j.next = k = {}, j.context = c, j.callback = b, d[f] = {
 					tail: k,
 					next: m ? m.next : j
 				};
 				return this
 			},
 			off: function(a, b, c) {
 				var d, f, k, m, n, o;
 				if (f = this._callbacks) {
 					if (!a && !b && !c) return delete this._callbacks, this;
 					for (a = a ? a.split(p) : j.keys(f); d = a.shift();)
 					if (k = f[d], delete f[d], k && (b || c)) for (m = k.tail;
 					(k = k.next) !== m;)
 					if (n = k.callback, o = k.context, b && n !== b || c && o !== c) this.on(d, n, o);
 					return this
 				}
 			},
 			trigger: function(b) {
 				var c, d, f, j, k, m;
 				if (!(f = this._callbacks)) return this;
 				k = f.all;
 				b = b.split(p);
 				for (m = a.call(arguments, 1); c = b.shift();) {
 					if (d = f[c]) for (j = d.tail;
 					(d = d.next) !== j;)
 					d.callback.apply(d.context || this, m);
 					if (d = k) {
 						j = d.tail;
 						for (c = [c].concat(m);
 						(d = d.next) !== j;)
 						d.callback.apply(d.context || this, c)
 					}
 				}
 				return this
 			}
 		};
 	t.bind = t.on;
 	t.unbind = t.off;
 	var m = d.Model = function(a, b) {
 		var c;
 		a || (a = {});
 		b && b.parse && (a = this.parse(a));
 		if (c = K(this, "defaults")) a = j.extend({}, c, a);
 		b && b.collection && (this.collection = b.collection);
 		this.attributes = {};
 		this._escapedAttributes = {};
 		this.cid = j.uniqueId("c");
 		this.changed = {};
 		this._silent = {};
 		this._pending = {};
 		this.set(a, {
 			silent: !0
 		});
 		this.changed = {};
 		this._silent = {};
 		this._pending = {};
 		this._previousAttributes = j.clone(this.attributes);
 		this.initialize.apply(this, arguments)
 	};
 	j.extend(m.prototype, t, {
 		changed: null,
 		_silent: null,
 		_pending: null,
 		idAttribute: "id",
 		initialize: function() {},
 		toJSON: function() {
 			return j.clone(this.attributes)
 		},
 		get: function(a) {
 			return this.attributes[a]
 		},
 		escape: function(a) {
 			var b;
 			if (b = this._escapedAttributes[a]) return b;
 			b = this.get(a);
 			return this._escapedAttributes[a] = j.escape(null == b ? "" : "" + b)
 		},
 		has: function(a) {
 			return null != this.get(a)
 		},
 		set: function(a, b, c) {
 			var d, f;
 			j.isObject(a) || null == a ? (d = a, c = b) : (d = {}, d[a] = b);
 			c || (c = {});
 			if (!d) return this;
 			d instanceof m && (d = d.attributes);
 			if (c.unset) for (f in d)
 			d[f] = void 0;
 			if (!this._validate(d, c)) return !1;
 			this.idAttribute in d && (this.id = d[this.idAttribute]);
 			var b = c.changes = {}, k = this.attributes,
 				n = this._escapedAttributes,
 				p = this._previousAttributes || {};
 			for (f in d) {
 				a = d[f];
 				if (!j.isEqual(k[f], a) || c.unset && j.has(k, f)) delete n[f], (c.silent ? this._silent : b)[f] = !0;
 				c.unset ? delete k[f] : k[f] = a;
 				!j.isEqual(p[f], a) || j.has(k, f) != j.has(p, f) ? (this.changed[f] = a, c.silent || (this._pending[f] = !0)) : (delete this.changed[f], delete this._pending[f])
 			}
 			c.silent || this.change(c);
 			return this
 		},
 		unset: function(a, b) {
 			(b || (b = {})).unset = !0;
 			return this.set(a, null, b)
 		},
 		clear: function(a) {
 			(a || (a = {})).unset = !0;
 			return this.set(j.clone(this.attributes), a)
 		},
 		fetch: function(a) {
 			var a = a ? j.clone(a) : {}, b = this,
 				c = a.success;
 			a.success = function(d, f, j) {
 				if (!b.set(b.parse(d, j), a)) return !1;
 				c && c(b, d)
 			};
 			a.error = d.wrapError(a.error, b, a);
 			return (this.sync || d.sync).call(this, "read", this, a)
 		},
 		save: function(a, b, c) {
 			var f, k;
 			j.isObject(a) || null == a ? (f = a, c = b) : (f = {}, f[a] = b);
 			c = c ? j.clone(c) : {};
 			if (c.wait) {
 				if (!this._validate(f, c)) return !1;
 				k = j.clone(this.attributes)
 			}
 			a = j.extend({}, c, {
 				silent: !0
 			});
 			if (f && !this.set(f, c.wait ? a : c)) return !1;
 			var m = this,
 				n = c.success;
 			c.success = function(a, b, d) {
 				b = m.parse(a, d);
 				if (c.wait) {
 					delete c.wait;
 					b = j.extend(f || {}, b)
 				}
 				if (!m.set(b, c)) return false;
 				n ? n(m, a) : m.trigger("sync", m, a, c)
 			};
 			c.error = d.wrapError(c.error,
 			m, c);
 			b = this.isNew() ? "create" : "update";
 			b = (this.sync || d.sync).call(this, b, this, c);
 			c.wait && this.set(k, a);
 			return b
 		},
 		destroy: function(a) {
 			var a = a ? j.clone(a) : {}, b = this,
 				c = a.success,
 				f = function() {
 					b.trigger("destroy", b, b.collection, a)
 				};
 			if (this.isNew()) return f(), !1;
 			a.success = function(d) {
 				a.wait && f();
 				c ? c(b, d) : b.trigger("sync", b, d, a)
 			};
 			a.error = d.wrapError(a.error, b, a);
 			var k = (this.sync || d.sync).call(this, "delete", this, a);
 			a.wait || f();
 			return k
 		},
 		url: function() {
 			var a = K(this, "urlRoot") || K(this.collection, "url") || I();
 			return this.isNew() ? a : a + ("/" == a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
 		},
 		parse: function(a) {
 			return a
 		},
 		clone: function() {
 			return new this.constructor(this.attributes)
 		},
 		isNew: function() {
 			return null == this.id
 		},
 		change: function(a) {
 			a || (a = {});
 			var b = this._changing;
 			this._changing = !0;
 			for (var c in this._silent)
 			this._pending[c] = !0;
 			var d = j.extend({}, a.changes, this._silent);
 			this._silent = {};
 			for (c in d)
 			this.trigger("change:" + c, this, this.get(c), a);
 			if (b) return this;
 			for (; !j.isEmpty(this._pending);) {
 				this._pending = {};
 				this.trigger("change", this, a);
 				for (c in this.changed)!this._pending[c] && !this._silent[c] && delete this.changed[c];
 				this._previousAttributes = j.clone(this.attributes)
 			}
 			this._changing = !1;
 			return this
 		},
 		hasChanged: function(a) {
 			return !arguments.length ? !j.isEmpty(this.changed) : j.has(this.changed, a)
 		},
 		changedAttributes: function(a) {
 			if (!a) return this.hasChanged() ? j.clone(this.changed) : !1;
 			var b, c = !1,
 				d = this._previousAttributes,
 				f;
 			for (f in a)
 			if (!j.isEqual(d[f], b = a[f]))
 			(c || (c = {}))[f] = b;
 			return c
 		},
 		previous: function(a) {
 			return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[a]
 		},
 		previousAttributes: function() {
 			return j.clone(this._previousAttributes)
 		},
 		isValid: function() {
 			return !this.validate(this.attributes)
 		},
 		_validate: function(a, b) {
 			if (b.silent || !this.validate) return !0;
 			var a = j.extend({}, this.attributes, a),
 				c = this.validate(a, b);
 			if (!c) return !0;
 			b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b);
 			return !1
 		}
 	});
 	var n = d.Collection = function(a, b) {
 		b || (b = {});
 		b.model && (this.model = b.model);
 		b.comparator && (this.comparator = b.comparator);
 		this._reset();
 		this.initialize.apply(this, arguments);
 		a && this.reset(a, {
 			silent: !0,
 			parse: b.parse
 		})
 	};
 	j.extend(n.prototype, t, {
 		model: m,
 		initialize: function() {},
 		toJSON: function(a) {
 			return this.map(function(b) {
 				return b.toJSON(a)
 			})
 		},
 		add: function(a, b) {
 			var d, f, k, m, n, p = {}, o = {}, r = [];
 			b || (b = {});
 			a = j.isArray(a) ? a.slice() : [a];
 			d = 0;
 			for (f = a.length; d < f; d++) {
 				if (!(k = a[d] = this._prepareModel(a[d], b))) throw Error("Can't add an invalid model to a collection");
 				m = k.cid;
 				n = k.id;
 				p[m] || this._byCid[m] || null != n && (o[n] || this._byId[n]) ? r.push(d) : p[m] = o[n] = k
 			}
 			for (d = r.length; d--;)
 			a.splice(r[d], 1);
 			d = 0;
 			for (f = a.length; d < f; d++)
 			(k = a[d]).on("all", this._onModelEvent, this), this._byCid[k.cid] = k, null != k.id && (this._byId[k.id] = k);
 			this.length += f;
 			c.apply(this.models, [null != b.at ? b.at : this.models.length, 0].concat(a));
 			this.comparator && this.sort({
 				silent: !0
 			});
 			if (b.silent) return this;
 			d = 0;
 			for (f = this.models.length; d < f; d++)
 			if (p[(k = this.models[d]).cid]) b.index = d, k.trigger("add", k, this, b);
 			return this
 		},
 		remove: function(a, b) {
 			var c, d, f, k;
 			b || (b = {});
 			a = j.isArray(a) ? a.slice() : [a];
 			c = 0;
 			for (d = a.length; c < d; c++)
 			if (k = this.getByCid(a[c]) || this.get(a[c])) delete this._byId[k.id], delete this._byCid[k.cid], f = this.indexOf(k), this.models.splice(f, 1), this.length--, b.silent || (b.index = f, k.trigger("remove", k, this, b)), this._removeReference(k);
 			return this
 		},
 		push: function(a, b) {
 			a = this._prepareModel(a, b);
 			this.add(a, b);
 			return a
 		},
 		pop: function(a) {
 			var b = this.at(this.length - 1);
 			this.remove(b, a);
 			return b
 		},
 		unshift: function(a, b) {
 			a = this._prepareModel(a, b);
 			this.add(a, j.extend({
 				at: 0
 			}, b));
 			return a
 		},
 		shift: function(a) {
 			var b = this.at(0);
 			this.remove(b, a);
 			return b
 		},
 		get: function(a) {
 			return null == a ? void 0 : this._byId[null != a.id ? a.id : a]
 		},
 		getByCid: function(a) {
 			return a && this._byCid[a.cid || a]
 		},
 		at: function(a) {
 			return this.models[a]
 		},
 		where: function(a) {
 			return j.isEmpty(a) ? [] : this.filter(function(b) {
 				for (var c in a)
 				if (a[c] !== b.get(c)) return !1;
 				return !0
 			})
 		},
 		sort: function(a) {
 			a || (a = {});
 			if (!this.comparator) throw Error("Cannot sort a set without a comparator");
 			var b = j.bind(this.comparator, this);
 			1 == this.comparator.length ? this.models = this.sortBy(b) : this.models.sort(b);
 			a.silent || this.trigger("reset", this, a);
 			return this
 		},
 		pluck: function(a) {
 			return j.map(this.models, function(b) {
 				return b.get(a)
 			})
 		},
 		reset: function(a, b) {
 			a || (a = []);
 			b || (b = {});
 			for (var c = 0, d = this.models.length; c < d; c++)
 			this._removeReference(this.models[c]);
 			this._reset();
 			this.add(a, j.extend({
 				silent: !0
 			}, b));
 			b.silent || this.trigger("reset", this, b);
 			return this
 		},
 		fetch: function(a) {
 			a = a ? j.clone(a) : {};
 			void 0 === a.parse && (a.parse = !0);
 			var b = this,
 				c = a.success;
 			a.success = function(d,
 			f, j) {
 				b[a.add ? "add" : "reset"](b.parse(d, j), a);
 				c && c(b, d)
 			};
 			a.error = d.wrapError(a.error, b, a);
 			return (this.sync || d.sync).call(this, "read", this, a)
 		},
 		create: function(a, b) {
 			var c = this,
 				b = b ? j.clone(b) : {}, a = this._prepareModel(a, b);
 			if (!a) return !1;
 			b.wait || c.add(a, b);
 			var d = b.success;
 			b.success = function(f, j) {
 				b.wait && c.add(f, b);
 				d ? d(f, j) : f.trigger("sync", a, j, b)
 			};
 			a.save(null, b);
 			return a
 		},
 		parse: function(a) {
 			return a
 		},
 		chain: function() {
 			return j(this.models).chain()
 		},
 		_reset: function() {
 			this.length = 0;
 			this.models = [];
 			this._byId = {};
 			this._byCid = {}

 		},
 		_prepareModel: function(a, b) {
 			b || (b = {});
 			a instanceof m ? a.collection || (a.collection = this) : (b.collection = this, a = new this.model(a, b), a._validate(a.attributes, b) || (a = !1));
 			return a
 		},
 		_removeReference: function(a) {
 			this == a.collection && delete a.collection;
 			a.off("all", this._onModelEvent, this)
 		},
 		_onModelEvent: function(a, b, c, d) {
 			("add" == a || "remove" == a) && c != this || ("destroy" == a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this,
 			arguments))
 		}
 	});
 	j.each("forEach each map reduce reduceRight find detect filter select reject every all some any include contains invoke max min sortBy sortedIndex toArray size first initial rest last without indexOf shuffle lastIndexOf isEmpty groupBy".split(" "), function(a) {
 		n.prototype[a] = function() {
 			return j[a].apply(j, [this.models].concat(j.toArray(arguments)))
 		}
 	});
 	var u = d.Router = function(a) {
 		a || (a = {});
 		a.routes && (this.routes = a.routes);
 		this._bindRoutes();
 		this.initialize.apply(this, arguments)
 	}, r = /:\w+/g,
 		y = /\*\w+/g,
 		x = /[-[\]{}()+?.,\\^$|#\s]/g;
 	j.extend(u.prototype, t, {
 		initialize: function() {},
 		route: function(a, b, c) {
 			d.history || (d.history = new q);
 			j.isRegExp(a) || (a = this._routeToRegExp(a));
 			c || (c = this[b]);
 			d.history.route(a, j.bind(function(f) {
 				f = this._extractParameters(a, f);
 				c && c.apply(this, f);
 				this.trigger.apply(this, ["route:" + b].concat(f));
 				d.history.trigger("route", this, b, f)
 			}, this));
 			return this
 		},
 		navigate: function(a, b) {
 			d.history.navigate(a, b)
 		},
 		_bindRoutes: function() {
 			if (this.routes) {
 				var a = [],
 					b;
 				for (b in this.routes)
 				a.unshift([b,
 				this.routes[b]]);
 				b = 0;
 				for (var c = a.length; b < c; b++)
 				this.route(a[b][0], a[b][1], this[a[b][1]])
 			}
 		},
 		_routeToRegExp: function(a) {
 			a = a.replace(x, "\\$&").replace(r, "([^/]+)").replace(y, "(.*?)");
 			return RegExp("^" + a + "$")
 		},
 		_extractParameters: function(a, b) {
 			return a.exec(b).slice(1)
 		}
 	});
 	var q = d.History = function() {
 		this.handlers = [];
 		j.bindAll(this, "checkUrl")
 	}, w = /^[#\/]/,
 		D = /msie [\w.]+/;
 	q.started = !1;
 	j.extend(q.prototype, t, {
 		interval: 50,
 		getHash: function(a) {
 			return (a = (a ? a.location : window.location).href.match(/#(.*)$/)) ? a[1] : ""
 		},
 		getFragment: function(a, b) {
 			if (null == a) if (this._hasPushState || b) {
 				var a = window.location.pathname,
 					c = window.location.search;
 				c && (a += c)
 			} else a = this.getHash();
 			a.indexOf(this.options.root) || (a = a.substr(this.options.root.length));
 			return a.replace(w, "")
 		},
 		start: function(a) {
 			if (q.started) throw Error("Backbone.history has already been started");
 			q.started = !0;
 			this.options = j.extend({}, {
 				root: "/"
 			}, this.options, a);
 			this._wantsHashChange = !1 !== this.options.hashChange;
 			this._wantsPushState = !! this.options.pushState;
 			this._hasPushState = !(!this.options.pushState || !window.history || !window.history.pushState);
 			var a = this.getFragment(),
 				b = document.documentMode;
 			if (b = D.exec(navigator.userAgent.toLowerCase()) && (!b || 7 >= b)) this.iframe = k('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(a);
 			this._hasPushState ? k(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !b ? k(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl,
 			this.interval));
 			this.fragment = a;
 			a = window.location;
 			b = a.pathname == this.options.root;
 			if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
 			this._wantsPushState && (this._hasPushState && b && a.hash) && (this.fragment = this.getHash().replace(w, ""), window.history.replaceState({}, document.title, a.protocol + "//" + a.host + this.options.root + this.fragment));
 			if (!this.options.silent) return this.loadUrl()
 		},
 		stop: function() {
 			k(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
 			clearInterval(this._checkUrlInterval);
 			q.started = !1
 		},
 		route: function(a, b) {
 			this.handlers.unshift({
 				route: a,
 				callback: b
 			})
 		},
 		checkUrl: function() {
 			var a = this.getFragment();
 			a == this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
 			if (a == this.fragment) return !1;
 			this.iframe && this.navigate(a);
 			this.loadUrl() || this.loadUrl(this.getHash())
 		},
 		loadUrl: function(a) {
 			var b = this.fragment = this.getFragment(a);
 			return j.any(this.handlers,

 			function(a) {
 				if (a.route.test(b)) return a.callback(b), !0
 			})
 		},
 		navigate: function(a, b) {
 			if (!q.started) return !1;
 			if (!b || !0 === b) b = {
 				trigger: b
 			};
 			var c = (a || "").replace(w, "");
 			this.fragment != c && (this._hasPushState ? (0 != c.indexOf(this.options.root) && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a))
 		},
 		_updateHash: function(a, b, c) {
 			c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
 		}
 	});
 	var C = d.View = function(a) {
 		this.cid = j.uniqueId("view");
 		this._configure(a || {});
 		this._ensureElement();
 		this.initialize.apply(this, arguments);
 		this.delegateEvents()
 	}, E = /^(\S+)\s*(.*)$/,
 		F = "model collection el id attributes className tagName".split(" ");
 	j.extend(C.prototype, t, {
 		tagName: "div",
 		$: function(a) {
 			return this.$el.find(a)
 		},
 		initialize: function() {},
 		render: function() {
 			return this
 		},
 		remove: function() {
 			this.$el.remove();
 			return this
 		},
 		make: function(a, b, c) {
 			a = document.createElement(a);
 			b && k(a).attr(b);
 			c && k(a).html(c);
 			return a
 		},
 		setElement: function(a, b) {
 			this.$el && this.undelegateEvents();
 			this.$el = a instanceof k ? a : k(a);
 			this.el = this.$el[0];
 			!1 !== b && this.delegateEvents();
 			return this
 		},
 		delegateEvents: function(a) {
 			if (a || (a = K(this, "events"))) {
 				this.undelegateEvents();
 				for (var b in a) {
 					var c = a[b];
 					j.isFunction(c) || (c = this[a[b]]);
 					if (!c) throw Error('Method "' + a[b] + '" does not exist');
 					var d = b.match(E),
 						f = d[1],
 						d = d[2],
 						c = j.bind(c, this),
 						f = f + (".delegateEvents" + this.cid);
 					"" === d ? this.$el.bind(f, c) : this.$el.delegate(d, f, c)
 				}
 			}
 		},
 		undelegateEvents: function() {
 			this.$el.unbind(".delegateEvents" + this.cid)
 		},
 		_configure: function(a) {
 			this.options && (a = j.extend({}, this.options, a));
 			for (var b = 0, c = F.length; b < c; b++) {
 				var d = F[b];
 				a[d] && (this[d] = a[d])
 			}
 			this.options = a
 		},
 		_ensureElement: function() {
 			if (this.el) this.setElement(this.el, !1);
 			else {
 				var a = K(this, "attributes") || {};
 				this.id && (a.id = this.id);
 				this.className && (a["class"] = this.className);
 				this.setElement(this.make(this.tagName, a), !1)
 			}
 		}
 	});
 	m.extend = n.extend = u.extend = C.extend = function(a, b) {
 		var c = this,
 			d;
 		d = a && a.hasOwnProperty("constructor") ? a.constructor : function() {
 			c.apply(this, arguments)
 		};
 		j.extend(d, c);
 		B.prototype = c.prototype;
 		d.prototype = new B;
 		a && j.extend(d.prototype, a);
 		b && j.extend(d, b);
 		d.prototype.constructor = d;
 		d.__super__ = c.prototype;
 		d.extend = this.extend;
 		return d
 	};
 	var o = {
 		create: "POST",
 		update: "PUT",
 		"delete": "DELETE",
 		read: "GET"
 	};
 	d.sync = function(a, b, c) {
 		var f = o[a];
 		c || (c = {});
 		var m = {
 			type: f,
 			dataType: "json"
 		};
 		c.url || (m.url = K(b, "url") || I());
 		if (!c.data && b && ("create" == a || "update" == a)) m.contentType = "application/json", m.data = JSON.stringify(b.toJSON());
 		d.emulateJSON && (m.contentType = "application/x-www-form-urlencoded", m.data = m.data ? {
 			model: m.data
 		} : {});
 		if (d.emulateHTTP && ("PUT" === f || "DELETE" === f)) d.emulateJSON && (m.data._method = f), m.type = "POST", m.beforeSend = function(a) {
 			a.setRequestHeader("X-HTTP-Method-Override",
 			f)
 		};
 		"GET" !== m.type && !d.emulateJSON && (m.processData = !1);
 		return k.ajax(j.extend(m, c))
 	};
 	d.wrapError = function(a, b, c) {
 		return function(d, f) {
 			f = d === b ? f : d;
 			a ? a(b, f, c) : b.trigger("error", b, f, c)
 		}
 	};
 	var B = function() {}, K = function(a, b) {
 		return !a || !a[b] ? null : j.isFunction(a[b]) ? a[b]() : a[b]
 	}, I = function() {
 		throw Error('A "url" property or function must be specified');
 	}
 }).call(this);
 DEBUG = !1;
 window.console || (window.console = {
 	info: function() {}
 });

 function isMobileDevice() {
 	return /(mobile|iphone|ipad|android)/gi.test(navigator.appVersion)
 }

 function setElementUnselectable(b, f) {
 	if (b.nodeType == 1) {
 		var a = b.tagName.toUpperCase();
 		a !== "TEXTAREA" && a !== "INPUT" && b.setAttribute("unselectable", f)
 	}
 	for (a = b.firstChild; a;) {
 		setElementUnselectable(a, f);
 		a = a.nextSibling
 	}
 }

 function setUnselectable(b, f) {
 	var a = $(b),
 		c = a[0],
 		d = {}, j = $.support.cssAttrCheck("userSelect");
 	if (j) {
 		d[j] = f == "on" ? "none" : "text";
 		a.css(d)
 	} else setElementUnselectable(c, f)
 }

 function scaleImage(b, f, a, c) {
 	return c > a ? scaleHeight(b, f, a, c) : c / a < f / b ? scaleWidth(b, f, a, c) : scaleHeight(b, f, a, c)
 }

 function scaleHeight(b, f, a, c) {
 	a = Math.ceil(b / a * c);
 	if (a < f) {
 		a = f;
 		b = "auto"
 	}
 	return {
 		top: -parseInt((a - f) / 5 * 2),
 		left: 0,
 		height: a,
 		width: b
 	}
 }

 function scaleWidth(b, f, a, c) {
 	a = Math.ceil(f / c * a);
 	if (a < b) {
 		a = b;
 		f = "auto"
 	}
 	return {
 		top: 0,
 		left: -parseInt((a - b) / 2),
 		width: a,
 		height: f
 	}
 }
 Date.now || (Date.now = function() {
 	return +new Date
 });
 (function(b, f) {
 	f.support.placeholder = false;
 	test = b.createElement("input");
 	if ("placeholder" in test) f.support.placeholder = true;
 	var a = {};
 	f.extend(f.support, {
 		cssAttrCheck: function(c) {
 			if (!c) return c;
 			if (a[c]) return a[c];
 			var d = b.createElement("div"),
 				f = ["Webkit", "Moz", "O", "ms"];
 			if (d.style[c] === void 0) {
 				for (var k = 0, p = f.length, t; k < p; k++) {
 					t = f[k] + c.replace(/\w/, function(a) {
 						return a.toUpperCase()
 					});
 					if (d.style[t] !== void 0) {
 						a[c] = t;
 						return a[c]
 					}
 				}
 				return false
 			}
 			a[c] = c.replace(/([A-Z])/g, "-$1");
 			return c
 		},
 		positionFixed: function() {
 			var a = true,
 				b;
 			return function() {
 				if (!b) {
 					var j = f('<div style="position:fixed;left:-9999px;top:-9999px">');
 					f("body").append(j);
 					j.offset().left >= 0 && (a = false);
 					j.remove();
 					b = true
 				}
 				return a
 			}
 		}(),
 		positionfullSize: function() {
 			var a = true,
 				b;
 			return function() {
 				if (!b) {
 					var j = f('<div style="position:absolute;left:-9999px;top:-9999px;width:50px;height:50px;"></div>'),
 						k = f('<div style="position:absolute;left:0;right:0;top:0;bottom:0;"></div>');
 					j.append(k);
 					f("body").append(j);
 					k.height() != 50 && (a = false);
 					j.remove();
 					b = true
 				}
 				return a
 			}
 		}(),
 		minHeight: function() {
 			var a, b = true;
 			return function() {
 				if (!a) {
 					var j = f("<div>").css("min-height", "50px").appendTo("body");
 					j.height() !== 50 && (b = false);
 					a = true;
 					j.remove()
 				}
 				return b
 			}
 		}()
 	});
 	f.extend(f.fn, {
 		getPadding: function() {
 			if (!this.length) return false;
 			var a = this.eq(0),
 				b = parseInt(a.css("padding-top")),
 				f = parseInt(a.css("padding-bottom")),
 				k = parseInt(a.css("padding-left")),
 				a = parseInt(a.css("padding-right"));
 			isNaN(b) && (b = 0);
 			isNaN(f) && (f = 0);
 			isNaN(k) && (k = 0);
 			isNaN(a) && (a = 0);
 			return {
 				top: b,
 				right: a,
 				bottom: f,
 				left: k
 			}
 		},
 		lineHeight: function() {
 			if (!this.length) return false;
 			var a = this.eq(0),
 				b = parseInt(a.css("font-size")),
 				a = a.css("line-height");
 			isNaN(b) && (b = 14);
 			return a = a.indexOf("px") != -1 ? parseInt(a) : b * (a - 0)
 		},
 		lineLimit: function(a) {
 			a && this.each(function() {
 				var b = f(this),
 					j = b.lineHeight(),
 					k = b.height(),
 					j = j * a;
 				k > j && b.height(Math.floor(j))
 			})
 		}
 	});
 	f.extend({
 		timeParse: function(a) {
 			a = Date.parse(a);
 			if (!a) return "";
 			var b = (+new Date - a) / 1E3;
 			if (b < 60) return "\u521a\u521a";
 			if (b < 3600) return Math.floor(b / 60) + "\u5206\u949f\u524d";
 			if (b < 86400) return Math.floor(b / 3600) + "\u5c0f\u65f6\u524d";
 			if (b < 1296E3) return Math.floor(b / 86400) + "\u5929\u524d";
 			a = new Date(a);
 			return a.getFullYear() + "/" + f.pad(a.getMonth() + 1, 2) + "/" + f.pad(a.getDate(), 2) + " " + f.pad(a.getHours(), 2) + ":" + f.pad(a.getMinutes(), 2)
 		},
 		clearTimer: function(a) {
 			clearInterval(a);
 			clearTimeout(a);
 			return null
 		},
 		pad: function(a, b) {
 			for (var f = a.toString().length; f < b;) {
 				a = "0" + a;
 				f++
 			}
 			return a.toString()
 		},
 		isClickInside: function(a, d) {
 			if (!a || a.nodeType !== 1 || !d || d.nodeType !== 1) throw Error("target or elm undefined");
 			var j = f(a),
 				k = false;
 			if (a === d) k = true;
 			else {
 				if (this === b.body) return false;
 				j.parents().each(function() {
 					if (this === b.body) return k = false;
 					if (this === d) {
 						k = true;
 						return false
 					}
 				})
 			}
 			return k
 		},
 		rnd: function(a, b) {
 			return Math.floor((b - a) * Math.random() + a)
 		},
 		isString: function(a) {
 			return typeof a === "string"
 		},
 		isNotEmptyString: function(a) {
 			return f.isString(a) && a !== ""
 		},
 		getByteLen: function(a) {
 			if (!a) return 0;
 			var b = a.match(/[^\x00-\xff]/ig);
 			return a.length + (b == null ? 0 : b.length)
 		},
 		getChsLen: function(a) {
 			if (!a) return 0;
 			var b = a.match(/[^\x00-\xff]/ig);
 			return a.length * 0.5 + (b == null ? 0 : b.length * 0.5)
 		},
 		substr: function(a, b) {
 			if (!a) return "";
 			for (var f = /[^\x00-\xff]/ig, k = 0, p = "", t = 0; t < a.length; t++) {
 				var m = a.charAt(t),
 					k = m.match(f) ? k + 2 : k + 1;
 				if (k > b) break;
 				p = p + m
 			}
 			return p
 		},
 		clonePlainObject: function() {
 			function a(b) {
 				if (!f.isPlainObject(b)) return b;
 				var j = {}, k;
 				for (k in b)
 				j[k] = a(b[k]);
 				return j
 			}
 			return a
 		}(),
 		isEmail: function(a) {
 			return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(a)
 		},
 		Cookie: {
 			get: function(a) {
 				var d, j;
 				if (f.isNotEmptyString(a) && (j = b.cookie.match("(?:^| )" + a + "(?:(?:=([^;]*))|;|$)"))) d = j[1] ? decodeURIComponent(j[1]) : "";
 				return d
 			},
 			set: function(a, d, j, k, p) {
 				a = a + "=" + encodeURIComponent(d);
 				if (typeof j === "number") {
 					d = new Date;
 					d.setTime(d.getTime() + j * 864E5);
 					a = a + ("; expires=" + d.toUTCString())
 				}
 				f.isNotEmptyString(k) && (a = a + ("; domain=" + k));
 				f.isNotEmptyString(p) && (a = a + ("; path=" + p));
 				b.cookie = a
 			}
 		},
 		log: function() {
 			if (!DEBUG) return function() {};
 			var a;
 			return function() {
 				if (window.console) console.info(arguments);
 				else {
 					a || (a = f("<textarea>").css({
 						position: "absolute",
 						bottom: 0,
 						width: "100%",
 						height: 100,
 						left: 0,
 						overflow: "auto",
 						margin: 0,
 						padding: 0,
 						border: "1px solid #DDD",
 						background: "#f3f3f3",
 						zIndex: 99999
 					}).appendTo("body"));
 					for (var b = arguments, j = a.val(), k = 0, p = b.length; k < p; k++)
 					j = j + (b[k] + " , ");
 					a.val(j + "\r\n")
 				}
 			}
 		}()
 	});
 	f.fn.moveCursorToEnd = function() {
 		if (this.length === 0) return this;
 		var a = this[0],
 			d = a.value.length;
 		this.val(this.val()).focus();
 		if (b.selection) {
 			a = a.createTextRange();
 			a.moveStart("character", d);
 			a.collapse();
 			a.select()
 		} else if (typeof a.selectionStart == "number" && typeof a.selectionEnd == "number") a.selectionStart = a.selectionEnd = d;
 		return this
 	};
 	f.fn.fixPosition = function() {
 		if (!f.browser.msie || f.browser.version != "6.0") return this;
 		this.each(function() {
 			var a = f(this),
 				b = a.css("position");
 			if (b === "fixed" || b === "absolute") {
 				var j = a.parent(),
 					b = j.width(),
 					j = j.height(),
 					k = parseInt(a.css("top")),
 					p = parseInt(a.css("right")),
 					t = parseInt(a.css("bottom")),
 					m = parseInt(a.css("left"));
 				a.css({
 					width: b - m - p,
 					height: j - k - t
 				})
 			}
 		})
 	}
 })(document, jQuery);
 (function() {
 	var b = "ontouchstart" in window;
 	$.fn.touchClick = function(f, a) {
 		if (typeof f !== "string") {
 			a = f;
 			f = null
 		}
 		var c = null,
 			d = null,
 			j = null,
 			k = null;
 		if (b) {
 			this.on("touchstart", f, function(a) {
 				a = a.originalEvent.touches[0];
 				c = a.pageX;
 				d = a.pageY
 			});
 			this.on("touchmove", f, function(a) {
 				a = a.originalEvent.touches[0];
 				j = a.pageX;
 				k = a.pageY
 			});
 			this.on("touchend", f, function(b) {
 				j === null && (j = c);
 				k === null && (k = d);
 				c !== null && (d !== null && c === j && d === k) && a.call(this, b);
 				c = d = j = k = null
 			})
 		} else this.on("click", f, a);
 		return this
 	}
 })();
 jQuery.easing.jswing = jQuery.easing.swing;
 jQuery.extend(jQuery.easing, {
 	def: "easeOutQuad",
 	swing: function(b, f, a, c, d) {
 		return jQuery.easing[jQuery.easing.def](b, f, a, c, d)
 	},
 	easeInQuad: function(b, f, a, c, d) {
 		return c * (f = f / d) * f + a
 	},
 	easeOutQuad: function(b, f, a, c, d) {
 		return -c * (f = f / d) * (f - 2) + a
 	},
 	easeInOutQuad: function(b, f, a, c, d) {
 		return (f = f / (d / 2)) < 1 ? c / 2 * f * f + a : -c / 2 * (--f * (f - 2) - 1) + a
 	},
 	easeInCubic: function(b, f, a, c, d) {
 		return c * (f = f / d) * f * f + a
 	},
 	easeOutCubic: function(b, f, a, c, d) {
 		return c * ((f = f / d - 1) * f * f + 1) + a
 	},
 	easeInOutCubic: function(b, f, a, c, d) {
 		return (f = f / (d / 2)) < 1 ? c / 2 * f * f * f + a : c / 2 * ((f = f - 2) * f * f + 2) + a
 	},
 	easeInQuart: function(b, f, a, c, d) {
 		return c * (f = f / d) * f * f * f + a
 	},
 	easeOutQuart: function(b, f, a, c, d) {
 		return -c * ((f = f / d - 1) * f * f * f - 1) + a
 	},
 	easeInOutQuart: function(b, f, a, c, d) {
 		return (f = f / (d / 2)) < 1 ? c / 2 * f * f * f * f + a : -c / 2 * ((f = f - 2) * f * f * f - 2) + a
 	},
 	easeInQuint: function(b, f, a, c, d) {
 		return c * (f = f / d) * f * f * f * f + a
 	},
 	easeOutQuint: function(b, f, a, c, d) {
 		return c * ((f = f / d - 1) * f * f * f * f + 1) + a
 	},
 	easeInOutQuint: function(b, f, a, c, d) {
 		return (f = f / (d / 2)) < 1 ? c / 2 * f * f * f * f * f + a : c / 2 * ((f = f - 2) * f * f * f * f + 2) + a
 	},
 	easeInSine: function(b, f, a, c, d) {
 		return -c * Math.cos(f / d * (Math.PI / 2)) + c + a
 	},
 	easeOutSine: function(b, f, a, c, d) {
 		return c * Math.sin(f / d * (Math.PI / 2)) + a
 	},
 	easeInOutSine: function(b, f, a, c, d) {
 		return -c / 2 * (Math.cos(Math.PI * f / d) - 1) + a
 	},
 	easeInExpo: function(b, f, a, c, d) {
 		return f == 0 ? a : c * Math.pow(2, 10 * (f / d - 1)) + a
 	},
 	easeOutExpo: function(b, f, a, c, d) {
 		return f == d ? a + c : c * (-Math.pow(2, - 10 * f / d) + 1) + a
 	},
 	easeInOutExpo: function(b, f, a, c, d) {
 		return f == 0 ? a : f == d ? a + c : (f = f / (d / 2)) < 1 ? c / 2 * Math.pow(2, 10 * (f - 1)) + a : c / 2 * (-Math.pow(2, - 10 * --f) + 2) + a
 	},
 	easeInCirc: function(b, f, a, c, d) {
 		return -c * (Math.sqrt(1 - (f = f / d) * f) - 1) + a
 	},
 	easeOutCirc: function(b, f, a, c, d) {
 		return c * Math.sqrt(1 - (f = f / d - 1) * f) + a
 	},
 	easeInOutCirc: function(b, f, a, c, d) {
 		return (f = f / (d / 2)) < 1 ? -c / 2 * (Math.sqrt(1 - f * f) - 1) + a : c / 2 * (Math.sqrt(1 - (f = f - 2) * f) + 1) + a
 	},
 	easeInElastic: function(b, f, a, c, d) {
 		var b = 1.70158,
 			j = 0,
 			k = c;
 		if (f == 0) return a;
 		if ((f = f / d) == 1) return a + c;
 		j || (j = d * 0.3);
 		if (k < Math.abs(c)) {
 			k = c;
 			b = j / 4
 		} else b = j / (2 * Math.PI) * Math.asin(c / k);
 		return -(k * Math.pow(2, 10 * (f = f - 1)) * Math.sin((f * d - b) * 2 * Math.PI / j)) + a
 	},
 	easeOutElastic: function(b, f, a, c, d) {
 		var b = 1.70158,
 			j = 0,
 			k = c;
 		if (f == 0) return a;
 		if ((f = f / d) == 1) return a + c;
 		j || (j = d * 0.3);
 		if (k < Math.abs(c)) {
 			k = c;
 			b = j / 4
 		} else b = j / (2 * Math.PI) * Math.asin(c / k);
 		return k * Math.pow(2, - 10 * f) * Math.sin((f * d - b) * 2 * Math.PI / j) + c + a
 	},
 	easeInOutElastic: function(b, f, a, c, d) {
 		var b = 1.70158,
 			j = 0,
 			k = c;
 		if (f == 0) return a;
 		if ((f = f / (d / 2)) == 2) return a + c;
 		j || (j = d * 0.3 * 1.5);
 		if (k < Math.abs(c)) {
 			k = c;
 			b = j / 4
 		} else b = j / (2 * Math.PI) * Math.asin(c / k);
 		return f < 1 ? -0.5 * k * Math.pow(2, 10 * (f = f - 1)) * Math.sin((f * d - b) * 2 * Math.PI / j) + a : k * Math.pow(2, - 10 * (f = f - 1)) * Math.sin((f * d - b) * 2 * Math.PI / j) * 0.5 + c + a
 	},
 	easeInBack: function(b, f, a, c, d, j) {
 		j == void 0 && (j = 1.70158);
 		return c * (f = f / d) * f * ((j + 1) * f - j) + a
 	},
 	easeOutBack: function(b, f, a, c, d, j) {
 		j == void 0 && (j = 1.70158);
 		return c * ((f = f / d - 1) * f * ((j + 1) * f + j) + 1) + a
 	},
 	easeInOutBack: function(b, f, a, c, d, j) {
 		j == void 0 && (j = 1.70158);
 		return (f = f / (d / 2)) < 1 ? c / 2 * f * f * (((j = j * 1.525) + 1) * f - j) + a : c / 2 * ((f = f - 2) * f * (((j = j * 1.525) + 1) * f + j) + 2) + a
 	},
 	easeInBounce: function(b, f, a, c, d) {
 		return c - jQuery.easing.easeOutBounce(b, d - f, 0, c, d) + a
 	},
 	easeOutBounce: function(b, f, a, c, d) {
 		return (f = f / d) < 1 / 2.75 ? c * 7.5625 * f * f + a : f < 2 / 2.75 ? c * (7.5625 * (f = f - 1.5 / 2.75) * f + 0.75) + a : f < 2.5 / 2.75 ? c * (7.5625 * (f = f - 2.25 / 2.75) * f + 0.9375) + a : c * (7.5625 * (f = f - 2.625 / 2.75) * f + 0.984375) + a
 	},
 	easeInOutBounce: function(b, f, a, c, d) {
 		return f < d / 2 ? jQuery.easing.easeInBounce(b, f * 2, 0, c, d) * 0.5 + a : jQuery.easing.easeOutBounce(b, f * 2 - d, 0, c, d) * 0.5 + c * 0.5 + a
 	}
 });
 var KeyEventListener = function() {
 	var b, f = {}, a = [],
 		c;
 	return {
 		bind: function(d, j) {
 			if (!c) {
 				$(document).keydown(function(c) {
 					clearTimeout(b);
 					a.push(c.keyCode);
 					if (c = f[a.join(",")]) {
 						c();
 						a = []
 					} else b = setTimeout(function() {
 						a = []
 					}, 500)
 				});
 				c = true
 			}
 			f[d] = j
 		}
 	}
 }();
 (function(b, f) {
 	var a = f(b),
 		c, d;
 	f("*").on("mousemove keydown scroll", function() {
 		clearTimeout(c);
 		c = setTimeout(function() {
 			a.trigger("useridle");
 			d = true
 		}, 6E4);
 		if (d) {
 			d = false;
 			a.trigger("userpresent")
 		}
 	})
 })(window, jQuery);
 (function(b, f) {
 	function a() {
 		var a = t.length,
 			b = 0;
 		setTimeout(function() {
 			for (; b < a; b++)
 			t[b].call(j)
 		}, 20)
 	}
 	var c = f(b),
 		d = isMobileDevice(),
 		j = {
 			measure: function() {
 				var a = d ? b.innerWidth : c.width(),
 					f = d ? b.innerHeight : c.height();
 				if (d) for (var k = document.getElementsByTagName("meta"), m = k.length, p = 0; p < m; p++) {
 					var t = k[p];
 					if (t.getAttribute("name") == "viewport") {
 						t.setAttribute("content", "width = " + a + ",maximum-scale=1,user-scalable=no");
 						break
 					}
 				}
 				j.width = a;
 				j.height = f
 			}
 		};
 	j.measure();
 	f(document).ready(function() {
 		j.measure()
 	});
 	var k,
 	p, t = [],
 		m = {
 			add: function(b) {
 				if (!k) {
 					c.resize(function() {
 						clearTimeout(p);
 						p = setTimeout(a, 100)
 					});
 					k = true
 				}
 				a: {
 					for (var d = t.length, f = 0; f < d; f++)
 					if (b === t[f]) break a;
 					t.push(b)
 				}
 			}
 		};
 	m.add(function() {
 		j.measure()
 	});
 	b.WindowResizeListener = m;
 	b.WindowSize = j
 })(window, jQuery);
 (function(b) {
 	function f() {
 		var d;
 		d = b(this);
 		if (!d.data("timeago")) {
 			var f = c.datetime(d);
 			d.data("timeago", {
 				datetime: f
 			});
 			b.trim(d.text()).length > 0 && (!c.isTime(d) || d.attr("title"))
 		}
 		d = d.data("timeago");
 		isNaN(d.datetime) || b(this).text(a(d.datetime));
 		return this
 	}

 	function a(a) {
 		return c.inWords((new Date).getTime() - a.getTime())
 	}
 	b.timeago = function(c) {
 		return c instanceof Date ? a(c) : typeof c === "string" ? a(b.timeago.parse(c)) : typeof c === "number" ? a(new Date(c)) : a(b.timeago.datetime(c))
 	};
 	var c = b.timeago;
 	b.extend(b.timeago, {
 		settings: {
 			refreshMillis: 6E4,
 			allowFuture: true,
 			strings: {
 				prefixAgo: null,
 				prefixFromNow: null,
 				suffixAgo: "\u524d",
 				suffixFromNow: "",
 				seconds: "\u521a\u521a",
 				minute: "1\u5206\u949f",
 				minutes: "%d\u5206\u949f",
 				hour: "1\u5c0f\u65f6",
 				hours: "%d\u5c0f\u65f6",
 				day: "1\u5929",
 				days: "%d\u5929",
 				month: "1\u4e2a\u6708",
 				months: "%d\u6708",
 				year: "1\u5e74",
 				years: "%d\u5e74",
 				wordSeparator: "",
 				numbers: []
 			}
 		},
 		inWords: function(a) {
 			function c(j, m) {
 				return (b.isFunction(j) ? j(m, a) : j).replace(/%d/i, f.numbers && f.numbers[m] || m || 1)
 			}
 			var f = this.settings.strings,
 				p = f.prefixAgo,
 				t = f.suffixAgo;
 			if (this.settings.allowFuture && a < 0) {
 				p = f.prefixFromNow;
 				t = f.suffixFromNow
 			}
 			var m = Math.abs(a) / 1E3,
 				n = m / 60,
 				u = n / 60,
 				r = u / 24,
 				y = r / 365,
 				m = m < 45 && c(f.seconds, Math.round(m)) || m < 90 && c(f.minute, 1) || n < 45 && c(f.minutes, Math.round(n)) || n < 90 && c(f.hour, 1) || u < 24 && c(f.hours, Math.round(u)) || u < 42 && c(f.day, 1) || r < 30 && c(f.days, Math.round(r)) || r < 45 && c(f.month, 1) || r < 365 && c(f.months, Math.round(r / 30)) || y < 1.5 && c(f.year, 1) || c(f.years, Math.round(y));
 			return m === f.seconds ? f.seconds : b.trim([p, m, t].join(f.wordSeparator === void 0 ? " " : f.wordSeparator))
 		},
 		parse: function(a) {
 			a = b.trim(a);
 			a = a.replace(/\.\d\d\d+/, "");
 			a = a.replace(/-/, "/").replace(/-/, "/");
 			a = a.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
 			return new Date(a)
 		},
 		datetime: function(a) {
 			a = c.isTime(a) ? b(a).attr("datetime") : b(a).attr("rel");
 			return c.parse(a)
 		},
 		isTime: function(a) {
 			return b(a).get(0).tagName.toLowerCase() === "time"
 		}
 	});
 	b.fn.timeago = function() {
 		this.each(f);
 		return this
 	};
 	document.createElement("abbr");
 	document.createElement("time")
 })(jQuery);
 (function(b) {
 	var f = "hidden",
 		a = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
 		c = b('<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;">')[0];
 	c.setAttribute("oninput", "return");
 	if (b.isFunction(c.oninput) || "onpropertychange" in c) {
 		b(c).css("lineHeight", "99px");
 		b(c).css("lineHeight") === "99px" && a.push("lineHeight");
 		b.fn.autosize = function(c) {
 			return this.each(function() {
 				function j() {
 					var a, b;
 					if (!u) {
 						u = true;
 						t.value = k.value;
 						t.style.overflowY = k.style.overflowY;
 						t.style.width = p.css("width");
 						t.scrollTop = 0;
 						t.scrollTop = 9E4;
 						a = t.scrollTop;
 						b = f;
 						if (a > n) {
 							a = n;
 							b = "scroll"
 						} else a < m && (a = m);
 						k.style.overflowY = b;
 						k.style.height = a + x + "px";
 						setTimeout(function() {
 							u = false
 						}, 1)
 					}
 				}
 				var k = this,
 					p = b(k),
 					t, m = p.height(),
 					n = parseInt(p.css("maxHeight"), 10),
 					u, r = a.length,
 					y, x = 0;
 				if (p.css("box-sizing") === "border-box" || p.css("-moz-box-sizing") === "border-box" || p.css("-webkit-box-sizing") === "border-box") x = p.outerHeight() - p.height();
 				if (!p.data("mirror") && !p.data("ismirror")) {
 					t = b('<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;">').data("ismirror", true).addClass(c || "autosizejs")[0];
 					y = p.css("resize") === "none" ? "none" : "horizontal";
 					p.data("mirror", b(t)).css({
 						overflow: f,
 						overflowY: f,
 						wordWrap: "break-word",
 						resize: y
 					});
 					for (n = n && n > 0 ? n : 9E4; r--;)
 					t.style[a[r]] = p.css(a[r]);
 					b("body").append(t);
 					"onpropertychange" in k ? "oninput" in k ? k.oninput = k.onkeyup = j : k.onpropertychange = j : k.oninput = j;
 					b(window).resize(j);
 					p.bind("autosize", j);
 					p.text(p.text());
 					j()
 				}
 			})
 		}
 	} else b.fn.autosize = function() {
 		return this
 	}
 })(jQuery);
 (function(b, f) {
 	var a;
 	b.rails = a = {
 		linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
 		inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
 		formSubmitSelector: "form",
 		formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
 		disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
 		enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
 		requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
 		fileInputSelector: "input:file",
 		linkDisableSelector: "a[data-disable-with]",
 		CSRFProtection: function(a) {
 			var d = b('meta[name="csrf-token"]').attr("content");
 			d && a.setRequestHeader("X-CSRF-Token", d)
 		},
 		fire: function(a, d, f) {
 			d = b.Event(d);
 			a.trigger(d, f);
 			return d.result !== false
 		},
 		confirm: function(a) {
 			return confirm(a)
 		},
 		ajax: function(a) {
 			return b.ajax(a)
 		},
 		href: function(a) {
 			return a.attr("href")
 		},
 		handleRemote: function(c) {
 			var d,
 			j, k, p, t;
 			if (a.fire(c, "ajax:before")) {
 				p = c.data("cross-domain") || null;
 				t = c.data("type") || b.ajaxSettings && b.ajaxSettings.dataType;
 				if (c.is("form")) {
 					d = c.attr("method");
 					j = c.attr("action");
 					k = c.serializeArray();
 					var m = c.data("ujs:submit-button");
 					if (m) {
 						k.push(m);
 						c.data("ujs:submit-button", null)
 					}
 				} else if (c.is(a.inputChangeSelector)) {
 					d = c.data("method");
 					j = c.data("url");
 					k = c.serialize();
 					c.data("params") && (k = k + "&" + c.data("params"))
 				} else {
 					d = c.data("method");
 					j = a.href(c);
 					k = c.data("params") || null
 				}
 				d = {
 					type: d || "GET",
 					data: k,
 					dataType: t,
 					crossDomain: p,
 					beforeSend: function(b, d) {
 						d.dataType === f && b.setRequestHeader("accept", "*/*;q=0.5, " + d.accepts.script);
 						return a.fire(c, "ajax:beforeSend", [b, d])
 					},
 					success: function(a, b, d) {
 						c.trigger("ajax:success", [a, b, d])
 					},
 					complete: function(a, b) {
 						c.trigger("ajax:complete", [a, b])
 					},
 					error: function(a, b, d) {
 						c.trigger("ajax:error", [a, b, d])
 					}
 				};
 				if (j) d.url = j;
 				return a.ajax(d)
 			}
 			return false
 		},
 		handleMethod: function(c) {
 			var d = a.href(c),
 				j = c.data("method"),
 				c = c.attr("target"),
 				k = b("meta[name=csrf-token]").attr("content"),
 				p = b("meta[name=csrf-param]").attr("content"),
 				d = b('<form method="post" action="' + d + '"></form>'),
 				j = '<input name="_method" value="' + j + '" type="hidden" />';
 			p !== f && k !== f && (j = j + ('<input name="' + p + '" value="' + k + '" type="hidden" />'));
 			c && d.attr("target", c);
 			d.hide().append(j).appendTo("body");
 			d.submit()
 		},
 		disableFormElements: function(c) {
 			c.find(a.disableSelector).each(function() {
 				var a = b(this),
 					c = a.is("button") ? "html" : "val";
 				a.data("ujs:enable-with", a[c]());
 				a[c](a.data("disable-with"));
 				a.prop("disabled", true)
 			})
 		},
 		enableFormElements: function(c) {
 			c.find(a.enableSelector).each(function() {
 				var a = b(this),
 					c = a.is("button") ? "html" : "val";
 				if (a.data("ujs:enable-with")) a[c](a.data("ujs:enable-with"));
 				a.prop("disabled", false)
 			})
 		},
 		allowAction: function(b) {
 			var d = b.data("confirm"),
 				f = false,
 				k;
 			if (!d) return true;
 			if (a.fire(b, "confirm")) {
 				f = a.confirm(d);
 				k = a.fire(b, "confirm:complete", [f])
 			}
 			return f && k
 		},
 		blankInputs: function(a, d, f) {
 			var k = b(),
 				p;
 			a.find(d || "input,textarea").each(function() {
 				p = b(this);
 				if (f ? p.val() : !p.val()) k = k.add(p)
 			});
 			return k.length ? k : false
 		},
 		nonBlankInputs: function(b, d) {
 			return a.blankInputs(b, d, true)
 		},
 		stopEverything: function(a) {
 			b(a.target).trigger("ujs:everythingStopped");
 			a.stopImmediatePropagation();
 			return false
 		},
 		callFormSubmitBindings: function(a, d) {
 			var j = a.data("events"),
 				k = true;
 			j !== f && j.submit !== f && b.each(j.submit, function(a, b) {
 				if (typeof b.handler === "function") return k = b.handler(d)
 			});
 			return k
 		},
 		disableElement: function(b) {
 			b.data("ujs:enable-with", b.html());
 			b.html(b.data("disable-with"));
 			b.bind("click.railsDisable", function(b) {
 				return a.stopEverything(b)
 			})
 		},
 		enableElement: function(a) {
 			if (a.data("ujs:enable-with") !== f) {
 				a.html(a.data("ujs:enable-with"));
 				a.data("ujs:enable-with", false)
 			}
 			a.unbind("click.railsDisable")
 		}
 	};
 	b.ajaxPrefilter(function(b, d, f) {
 		b.crossDomain || a.CSRFProtection(f)
 	});
 	b(document).delegate(a.linkDisableSelector, "ajax:complete", function() {
 		a.enableElement(b(this))
 	});
 	b(document).delegate(a.linkClickSelector, "click.rails", function(c) {
 		var d = b(this),
 			j = d.data("method"),
 			k = d.data("params");
 		if (!a.allowAction(d)) return a.stopEverything(c);
 		d.is(a.linkDisableSelector) && a.disableElement(d);
 		if (d.data("remote") !== f) {
 			if ((c.metaKey || c.ctrlKey) && (!j || j === "GET") && !k) return true;
 			a.handleRemote(d) === false && a.enableElement(d);
 			return false
 		}
 		if (d.data("method")) {
 			a.handleMethod(d);
 			return false
 		}
 	});
 	b(document).delegate(a.inputChangeSelector, "change.rails", function(c) {
 		var d = b(this);
 		if (!a.allowAction(d)) return a.stopEverything(c);
 		a.handleRemote(d);
 		return false
 	});
 	b(document).delegate(a.formSubmitSelector, "submit.rails", function(c) {
 		var d = b(this),
 			j = d.data("remote") !== f,
 			k = a.blankInputs(d,
 			a.requiredInputSelector),
 			p = a.nonBlankInputs(d, a.fileInputSelector);
 		if (!a.allowAction(d) || k && d.attr("novalidate") == f && a.fire(d, "ajax:aborted:required", [k])) return a.stopEverything(c);
 		if (j) {
 			if (p) return a.fire(d, "ajax:aborted:file", [p]);
 			if (!b.support.submitBubbles && b().jquery < "1.7" && a.callFormSubmitBindings(d, c) === false) return a.stopEverything(c);
 			a.handleRemote(d);
 			return false
 		}
 		setTimeout(function() {
 			a.disableFormElements(d)
 		}, 13)
 	});
 	b(document).delegate(a.formInputClickSelector, "click.rails", function(c) {
 		var d = b(this);
 		if (!a.allowAction(d)) return a.stopEverything(c);
 		c = (c = d.attr("name")) ? {
 			name: c,
 			value: d.val()
 		} : null;
 		d.closest("form").data("ujs:submit-button", c)
 	});
 	b(document).delegate(a.formSubmitSelector, "ajax:beforeSend.rails", function(c) {
 		this == c.target && a.disableFormElements(b(this))
 	});
 	b(document).delegate(a.formSubmitSelector, "ajax:complete.rails", function(c) {
 		this == c.target && a.enableFormElements(b(this))
 	})
 })(jQuery);
 (function() {
 	function b() {
 		this.returnValue = false
 	}

 	function f() {
 		this.cancelBubble = true
 	}
 	var a = 0,
 		c = [],
 		d = {}, j = {}, k = {
 			"<": "lt",
 			">": "gt",
 			"&": "amp",
 			'"': "quot",
 			"'": "#39"
 		}, p = /[<>&\"\']/g,
 		t = window.setTimeout,
 		m = {}, n, u = "application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe".split(/,/),
 		r, y, x;
 	for (r = 0; r < u.length; r = r + 2) {
 		x = u[r + 1].split(/ /);
 		for (y = 0; y < x.length; y++)
 		j[x[y]] = u[r]
 	}
 	u = navigator;
 	r = u.userAgent;
 	x = u.vendor;
 	var q;
 	q = (y = /WebKit/.test(r)) && x.indexOf("Apple") !== -1;
 	x = window.opera && window.opera.buildNumber;
 	var u = {
 		windows: navigator.platform.indexOf("Win") !== -1,
 		ie: !y && !x && /MSIE/gi.test(r) && /Explorer/gi.test(u.appName),
 		webkit: y,
 		gecko: !y && /Gecko/.test(r),
 		safari: q,
 		opera: !! x
 	}, w = {
 		VERSION: "@@version@@",
 		STOPPED: 1,
 		STARTED: 2,
 		QUEUED: 1,
 		UPLOADING: 2,
 		FAILED: 4,
 		DONE: 5,
 		GENERIC_ERROR: -100,
 		HTTP_ERROR: -200,
 		IO_ERROR: -300,
 		SECURITY_ERROR: -400,
 		INIT_ERROR: -500,
 		FILE_SIZE_ERROR: -600,
 		FILE_EXTENSION_ERROR: -601,
 		IMAGE_FORMAT_ERROR: -700,
 		IMAGE_MEMORY_ERROR: -701,
 		IMAGE_DIMENSIONS_ERROR: -702,
 		mimeTypes: j,
 		ua: u,
 		typeOf: function(a) {
 			return {}.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
 		},
 		extend: function(a) {
 			w.each(arguments, function(b, c) {
 				c > 0 && w.each(b, function(b, c) {
 					a[c] = b
 				})
 			});
 			return a
 		},
 		cleanName: function(a) {
 			var b, c;
 			c = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"];
 			for (b = 0; b < c.length; b = b + 2)
 			a = a.replace(c[b], c[b + 1]);
 			a = a.replace(/\s+/g, "_");
 			return a = a.replace(/[^a-z0-9_\-\.]+/gi, "")
 		},
 		addRuntime: function(a, b) {
 			b.name = a;
 			c[a] = b;
 			c.push(b);
 			return b
 		},
 		guid: function() {
 			var b = (new Date).getTime().toString(32),
 				c;
 			for (c = 0; c < 5; c++)
 			b = b + Math.floor(Math.random() * 65535).toString(32);
 			return (w.guidPrefix || "p") + b + (a++).toString(32)
 		},
 		buildUrl: function(a,
 		b) {
 			var c = "";
 			w.each(b, function(a, b) {
 				c = c + ((c ? "&" : "") + encodeURIComponent(b) + "=" + encodeURIComponent(a))
 			});
 			c && (a = a + ((a.indexOf("?") > 0 ? "&" : "?") + c));
 			return a
 		},
 		each: function(a, b) {
 			var c, d;
 			if (a) {
 				c = a.length;
 				if (c === void 0) for (d in a) {
 					if (a.hasOwnProperty(d) && b(a[d], d) === false) break
 				} else for (d = 0; d < c; d++)
 				if (b(a[d], d) === false) break
 			}
 		},
 		formatSize: function(a) {
 			return a === void 0 || /\D/.test(a) ? w.translate("N/A") : a > 1073741824 ? Math.round(a / 1073741824, 1) + " GB" : a > 1048576 ? Math.round(a / 1048576, 1) + " MB" : a > 1024 ? Math.round(a / 1024,
 			1) + " KB" : a + " b"
 		},
 		getPos: function(a, b) {
 			function c(a) {
 				var b, d = 0;
 				b = 0;
 				if (a) {
 					b = a.getBoundingClientRect();
 					a = k.compatMode === "CSS1Compat" ? k.documentElement : k.body;
 					d = b.left + a.scrollLeft;
 					b = b.top + a.scrollTop
 				}
 				return {
 					x: d,
 					y: b
 				}
 			}
 			var d = 0,
 				f = 0,
 				j, k = document,
 				b = b || k.body;
 			if (a && a.getBoundingClientRect && navigator.userAgent.indexOf("MSIE") > 0 && k.documentMode < 8) {
 				d = c(a);
 				f = c(b);
 				return {
 					x: d.x - f.x,
 					y: d.y - f.y
 				}
 			}
 			for (j = a; j && j != b && j.nodeType;) {
 				d = d + (j.offsetLeft || 0);
 				f = f + (j.offsetTop || 0);
 				j = j.offsetParent
 			}
 			for (j = a.parentNode; j && j != b && j.nodeType;) {
 				d = d - (j.scrollLeft || 0);
 				f = f - (j.scrollTop || 0);
 				j = j.parentNode
 			}
 			return {
 				x: d,
 				y: f
 			}
 		},
 		getSize: function(a) {
 			return {
 				w: a.offsetWidth || a.clientWidth,
 				h: a.offsetHeight || a.clientHeight
 			}
 		},
 		parseSize: function(a) {
 			var b;
 			if (typeof a == "string") {
 				a = /^([0-9]+)([mgk]?)$/.exec(a.toLowerCase().replace(/[^0-9mkg]/g, ""));
 				b = a[2];
 				a = +a[1];
 				b == "g" && (a = a * 1073741824);
 				b == "m" && (a = a * 1048576);
 				b == "k" && (a = a * 1024)
 			}
 			return a
 		},
 		xmlEncode: function(a) {
 			return a ? ("" + a).replace(p, function(a) {
 				return k[a] ? "&" + k[a] + ";" : a
 			}) : a
 		},
 		toArray: function(a) {
 			var b, c = [];
 			for (b = 0; b < a.length; b++)
 			c[b] = a[b];
 			return c
 		},
 		inArray: function(a, b) {
 			if (b) {
 				if (Array.prototype.indexOf) return Array.prototype.indexOf.call(b, a);
 				for (var c = 0, d = b.length; c < d; c++)
 				if (b[c] === a) return c
 			}
 			return -1
 		},
 		addI18n: function(a) {
 			return w.extend(d, a)
 		},
 		translate: function(a) {
 			return d[a] || a
 		},
 		isEmptyObj: function(a) {
 			if (a === void 0) return true;
 			for (var b in a)
 			return false;
 			return true
 		},
 		hasClass: function(a, b) {
 			return a.className == "" ? false : RegExp("(^|\\s+)" + b + "(\\s+|$)").test(a.className)
 		},
 		addClass: function(a, b) {
 			if (!w.hasClass(a,
 			b)) a.className = a.className == "" ? b : a.className.replace(/\s+$/, "") + " " + b
 		},
 		removeClass: function(a, b) {
 			a.className = a.className.replace(RegExp("(^|\\s+)" + b + "(\\s+|$)"), function(a, b, c) {
 				return b === " " && c === " " ? " " : ""
 			})
 		},
 		getStyle: function(a, b) {
 			if (a.currentStyle) return a.currentStyle[b];
 			if (window.getComputedStyle) return window.getComputedStyle(a, null)[b]
 		},
 		addEvent: function(a, c, d, j) {
 			var k, c = c.toLowerCase();
 			n === void 0 && (n = "Plupload_" + w.guid());
 			if (a.addEventListener) {
 				k = d;
 				a.addEventListener(c, k, false)
 			} else if (a.attachEvent) {
 				k = function() {
 					var a = window.event;
 					if (!a.target) a.target = a.srcElement;
 					a.preventDefault = b;
 					a.stopPropagation = f;
 					d(a)
 				};
 				a.attachEvent("on" + c, k)
 			}
 			a[n] === void 0 && (a[n] = w.guid());
 			m.hasOwnProperty(a[n]) || (m[a[n]] = {});
 			a = m[a[n]];
 			a.hasOwnProperty(c) || (a[c] = []);
 			a[c].push({
 				func: k,
 				orig: d,
 				key: j
 			})
 		},
 		removeEvent: function(a, b, c) {
 			var d, f;
 			typeof c == "function" ? d = c : f = c;
 			b = b.toLowerCase();
 			if (a[n] && m[a[n]] && m[a[n]][b]) {
 				for (var c = m[a[n]][b], j = c.length - 1; j >= 0; j--)
 				if (c[j].key === f || c[j].orig === d) {
 					a.removeEventListener ? a.removeEventListener(b,
 					c[j].func, false) : a.detachEvent && a.detachEvent("on" + b, c[j].func);
 					c[j].orig = null;
 					c[j].func = null;
 					c.splice(j, 1);
 					if (d !== void 0) break
 				}
 				c.length || delete m[a[n]][b];
 				if (w.isEmptyObj(m[a[n]])) {
 					delete m[a[n]];
 					try {
 						delete a[n]
 					} catch (k) {
 						a[n] = void 0
 					}
 				}
 			}
 		},
 		removeAllEvents: function(a, b) {
 			a[n] !== void 0 && a[n] && w.each(m[a[n]], function(c, d) {
 				w.removeEvent(a, d, b)
 			})
 		},
 		Uploader: function(a) {
 			function b() {
 				var a, c = 0,
 					d;
 				if (this.state == w.STARTED) {
 					for (d = 0; d < k.length; d++)
 					if (!a && k[d].status == w.QUEUED) {
 						a = k[d];
 						a.status = w.UPLOADING;
 						this.trigger("BeforeUpload",
 						a) && this.trigger("UploadFile", a)
 					} else c++;
 					if (c == k.length) {
 						this.stop();
 						this.trigger("UploadComplete", k)
 					}
 				}
 			}

 			function d() {
 				var a, b;
 				j.reset();
 				for (a = 0; a < k.length; a++) {
 					b = k[a];
 					if (b.size !== void 0) {
 						j.size = j.size + b.size;
 						j.loaded = j.loaded + b.loaded
 					} else j.size = void 0;
 					b.status == w.DONE ? j.uploaded++ : b.status == w.FAILED ? j.failed++ : j.queued++
 				}
 				if (j.size === void 0) j.percent = k.length > 0 ? Math.ceil(j.uploaded / k.length * 100) : 0;
 				else {
 					j.bytesPerSec = Math.ceil(j.loaded / ((+new Date - m || 1) / 1E3));
 					j.percent = j.size > 0 ? Math.ceil(j.loaded / j.size * 100) : 0
 				}
 			}
 			var f = {}, j, k = [],
 				m, n = false;
 			j = new w.QueueProgress;
 			a = w.extend({
 				chunk_size: 0,
 				multipart: true,
 				multi_selection: true,
 				file_data_name: "file",
 				filters: []
 			}, a);
 			w.extend(this, {
 				state: w.STOPPED,
 				runtime: "",
 				features: {},
 				files: k,
 				settings: a,
 				total: j,
 				id: w.guid(),
 				init: function() {
 					function f() {
 						var a = n[p++],
 							b, c, d;
 						if (a) {
 							b = a.getFeatures();
 							if (c = j.settings.required_features) {
 								c = c.split(",");
 								for (d = 0; d < c.length; d++)
 								if (!b[c[d]]) {
 									f();
 									return
 								}
 							}
 							a.init(j, function(c) {
 								if (c && c.success) {
 									j.features = b;
 									j.runtime = a.name;
 									j.trigger("Init", {
 										runtime: a.name
 									});
 									j.trigger("PostInit");
 									j.refresh()
 								} else f()
 							})
 						} else j.trigger("Error", {
 							code: w.INIT_ERROR,
 							message: w.translate("Init error.")
 						})
 					}
 					var j = this,
 						i, n, p = 0,
 						r;
 					typeof a.preinit == "function" ? a.preinit(j) : w.each(a.preinit, function(a, b) {
 						j.bind(b, a)
 					});
 					a.page_url = a.page_url || document.location.pathname.replace(/\/[^\/]+$/g, "/");
 					if (!/^(\w+:\/\/|\/)/.test(a.url)) a.url = a.page_url + a.url;
 					a.chunk_size = w.parseSize(a.chunk_size);
 					a.max_file_size = w.parseSize(a.max_file_size);
 					j.bind("FilesAdded", function(b, c) {
 						var d,
 						i, f = 0,
 							m;
 						if ((d = a.filters) && d.length) {
 							m = [];
 							w.each(d, function(a) {
 								w.each(a.extensions.split(/,/), function(a) {
 									/^\s*\*\s*$/.test(a) ? m.push("\\.*") : m.push("\\." + a.replace(RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"))
 								})
 							});
 							m = RegExp(m.join("|") + "$", "i")
 						}
 						for (d = 0; d < c.length; d++) {
 							i = c[d];
 							i.loaded = 0;
 							i.percent = 0;
 							i.status = w.QUEUED;
 							if (m && !m.test(i.name)) b.trigger("Error", {
 								code: w.FILE_EXTENSION_ERROR,
 								message: w.translate("File extension error."),
 								file: i
 							});
 							else if (i.size !== void 0 && i.size > a.max_file_size) b.trigger("Error", {
 								code: w.FILE_SIZE_ERROR,
 								message: w.translate("File size error."),
 								file: i
 							});
 							else {
 								k.push(i);
 								f++
 							}
 						}
 						if (f) t(function() {
 							j.trigger("QueueChanged");
 							j.refresh()
 						}, 1);
 						else return false
 					});
 					a.unique_names && j.bind("UploadFile", function(a, b) {
 						var c = b.name.match(/\.([^.]+)$/),
 							d = "tmp";
 						c && (d = c[1]);
 						b.target_name = b.id + "." + d
 					});
 					j.bind("UploadProgress", function(a, b) {
 						b.percent = b.size > 0 ? Math.ceil(b.loaded / b.size * 100) : 100;
 						d()
 					});
 					j.bind("StateChanged", function(a) {
 						if (a.state == w.STARTED) m = +new Date;
 						else if (a.state == w.STOPPED) for (i = a.files.length - 1; i >= 0; i--)
 						if (a.files[i].status == w.UPLOADING) {
 							a.files[i].status = w.QUEUED;
 							d()
 						}
 					});
 					j.bind("QueueChanged", d);
 					j.bind("Error", function(a, c) {
 						if (c.file) {
 							c.file.status = w.FAILED;
 							d();
 							a.state == w.STARTED && t(function() {
 								b.call(j)
 							}, 1)
 						}
 					});
 					j.bind("FileUploaded", function(a, c) {
 						c.status = w.DONE;
 						c.loaded = c.size;
 						a.trigger("UploadProgress", c);
 						t(function() {
 							b.call(j)
 						}, 1)
 					});
 					if (a.runtimes) {
 						n = [];
 						r = a.runtimes.split(/\s?,\s?/);
 						for (i = 0; i < r.length; i++)
 						c[r[i]] && n.push(c[r[i]])
 					} else n = c;
 					f();
 					typeof a.init == "function" ? a.init(j) : w.each(a.init, function(a, b) {
 						j.bind(b, a)
 					})
 				},
 				refresh: function() {
 					this.trigger("Refresh")
 				},
 				start: function() {
 					if (k.length && this.state != w.STARTED) {
 						this.state = w.STARTED;
 						this.trigger("StateChanged");
 						b.call(this)
 					}
 				},
 				stop: function() {
 					if (this.state != w.STOPPED) {
 						this.state = w.STOPPED;
 						this.trigger("CancelUpload");
 						this.trigger("StateChanged")
 					}
 				},
 				disableBrowse: function(a) {
 					n = a !== void 0 ? a : true;
 					this.trigger("DisableBrowse", n)
 				},
 				getFile: function(a) {
 					var b;
 					for (b = k.length - 1; b >= 0; b--)
 					if (k[b].id === a) return k[b]
 				},
 				removeFile: function(a) {
 					var b;
 					console.info("rm", a);
 					for (b = k.length - 1; b >= 0; b--)
 					if (k[b].id === a.id) return this.splice(b, 1)[0]
 				},
 				splice: function(a, b) {
 					var c;
 					c = k.splice(a === void 0 ? 0 : a, b === void 0 ? k.length : b);
 					this.trigger("FilesRemoved", c);
 					this.trigger("QueueChanged");
 					return c
 				},
 				trigger: function(a) {
 					var b = f[a.toLowerCase()],
 						c, d;
 					if (b) {
 						d = Array.prototype.slice.call(arguments);
 						d[0] = this;
 						for (c = 0; c < b.length; c++)
 						if (b[c].func.apply(b[c].scope, d) === false) return false
 					}
 					return true
 				},
 				hasEventListener: function(a) {
 					return !!f[a.toLowerCase()]
 				},
 				bind: function(a,
 				b, c) {
 					var d, a = a.toLowerCase();
 					d = f[a] || [];
 					d.push({
 						func: b,
 						scope: c || this
 					});
 					f[a] = d
 				},
 				unbind: function(a, b) {
 					var a = a.toLowerCase(),
 						c = f[a],
 						d;
 					if (c) {
 						if (b !== void 0) for (d = c.length - 1; d >= 0; d--) {
 							if (c[d].func === b) {
 								c.splice(d, 1);
 								break
 							}
 						} else c = [];
 						c.length || delete f[a]
 					}
 				},
 				unbindAll: function() {
 					var a = this;
 					w.each(f, function(b, c) {
 						a.unbind(c)
 					})
 				},
 				destroy: function() {
 					this.stop();
 					this.trigger("Destroy");
 					this.unbindAll()
 				}
 			})
 		},
 		File: function(a, b, c) {
 			this.id = a;
 			this.name = b;
 			this.size = c;
 			this.status = this.percent = this.loaded = 0
 		},
 		Runtime: function() {
 			this.getFeatures = function() {};
 			this.init = function() {}
 		},
 		QueueProgress: function() {
 			var a = this;
 			a.size = 0;
 			a.loaded = 0;
 			a.uploaded = 0;
 			a.failed = 0;
 			a.queued = 0;
 			a.percent = 0;
 			a.bytesPerSec = 0;
 			a.reset = function() {
 				a.size = a.loaded = a.uploaded = a.failed = a.queued = a.percent = a.bytesPerSec = 0
 			}
 		},
 		runtimes: {}
 	};
 	window.plupload = w
 })();
 (function(b, f, a) {
 	var c = {}, d = {};
 	a.flash = {
 		trigger: function(a, b, d) {
 			setTimeout(function() {
 				var f = c[a];
 				f && f.trigger("Flash:" + b, d)
 			}, 0)
 		}
 	};
 	a.runtimes.Flash = a.addRuntime("flash", {
 		getFeatures: function() {
 			return {
 				jpgresize: true,
 				pngresize: true,
 				maxWidth: 8091,
 				maxHeight: 8091,
 				chunks: true,
 				progress: true,
 				multipart: true,
 				multi_selection: true
 			}
 		},
 		init: function(b, k) {
 			function p() {
 				return f.getElementById(b.id + "_flash")
 			}

 			function t() {
 				n++ > 5E3 ? k({
 					success: false
 				}) : d[b.id] === false && setTimeout(t, 1)
 			}
 			var m, n = 0,
 				u = f.body;
 			try {
 				m = navigator.plugins["Shockwave Flash"];
 				m = m.description
 			} catch (r) {
 				try {
 					m = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
 				} catch (y) {
 					m = "0.0"
 				}
 			}
 			m = m.match(/\d+/g);
 			if (parseFloat(m[0] + "." + m[1]) < 10) k({
 				success: false
 			});
 			else {
 				d[b.id] = false;
 				c[b.id] = b;
 				f.getElementById(b.settings.browse_button);
 				m = f.createElement("div");
 				m.id = b.id + "_flash_container";
 				a.extend(m.style, {
 					position: "absolute",
 					top: "0px",
 					background: b.settings.shim_bgcolor || "transparent",
 					zIndex: 99,
 					width: "100%",
 					height: "100%"
 				});
 				m.className = "plupload flash";
 				if (b.settings.container) {
 					u = f.getElementById(b.settings.container);
 					if (a.getStyle(u, "position") === "static") u.style.position = "relative"
 				}
 				u.appendChild(m);
 				var x, q;
 				x = '<object id="' + b.id + '_flash" type="application/x-shockwave-flash" data="' + b.settings.flash_swf_url + '" ';
 				a.ua.ie && (x = x + 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ');
 				x = x + ('width="100%" height="100%" style="outline:0"><param name="movie" value="' + b.settings.flash_swf_url + '" /><param name="flashvars" value="id=' + escape(b.id) + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>');
 				if (a.ua.ie) {
 					q = f.createElement("div");
 					m.appendChild(q);
 					q.outerHTML = x
 				} else m.innerHTML = x;
 				t();
 				m = null;
 				b.bind("Destroy", function(b) {
 					a.removeAllEvents(f.body, b.id);
 					delete d[b.id];
 					delete c[b.id];
 					(b = f.getElementById(b.id + "_flash_container")) && u.removeChild(b)
 				});
 				b.bind("Flash:Init", function() {
 					var c = {};

 					try {
 						p().setFileFilters(b.settings.filters, b.settings.multi_selection)
 					} catch (m) {
 						k({
 							success: false
 						});
 						return
 					}
 					if (!d[b.id]) {
 						d[b.id] = true;
 						b.bind("UploadFile", function(d, f) {
 							var k = d.settings,
 								m = b.settings.resize || {};
 							p().uploadFile(c[f.id],
 							k.url, {
 								name: f.target_name || f.name,
 								mime: a.mimeTypes[f.name.replace(/^.+\.([^.]+)/, "$1").toLowerCase()] || "application/octet-stream",
 								chunk_size: k.chunk_size,
 								width: m.width,
 								height: m.height,
 								quality: m.quality,
 								multipart: k.multipart,
 								multipart_params: k.multipart_params || {},
 								file_data_name: k.file_data_name,
 								format: /\.(jpg|jpeg)$/i.test(f.name) ? "jpg" : "png",
 								headers: k.headers,
 								urlstream_upload: k.urlstream_upload
 							})
 						});
 						b.bind("CancelUpload", function() {
 							p().cancelUpload()
 						});
 						b.bind("Flash:UploadProcess", function(b, d) {
 							var f = b.getFile(c[d.id]);
 							if (f.status != a.FAILED) {
 								f.loaded = d.loaded;
 								f.size = d.size;
 								b.trigger("UploadProgress", f)
 							}
 						});
 						b.bind("Flash:UploadChunkComplete", function(b, d) {
 							var f = b.getFile(c[d.id]);
 							b.trigger("ChunkUploaded", f, {
 								chunk: d.chunk,
 								chunks: d.chunks,
 								response: d.text
 							});
 							f.status !== a.FAILED && b.state !== a.STOPPED && p().uploadNextChunk();
 							if (d.chunk == d.chunks - 1) {
 								f.status = a.DONE;
 								b.trigger("FileUploaded", f, {
 									response: d.text
 								})
 							}
 						});
 						b.bind("Flash:SelectFiles", function(d, f) {
 							var k, m, n = [],
 								p;
 							for (m = 0; m < f.length; m++) {
 								k = f[m];
 								p = a.guid();
 								c[p] = k.id;
 								c[k.id] = p;
 								n.push(new a.File(p, k.name, k.size))
 							}
 							n.length && b.trigger("FilesAdded", n)
 						});
 						b.bind("Flash:SecurityError", function(d, f) {
 							b.trigger("Error", {
 								code: a.SECURITY_ERROR,
 								message: a.translate("Security error."),
 								details: f.message,
 								file: b.getFile(c[f.id])
 							})
 						});
 						b.bind("Flash:GenericError", function(d, f) {
 							b.trigger("Error", {
 								code: a.GENERIC_ERROR,
 								message: a.translate("Generic error."),
 								details: f.message,
 								file: b.getFile(c[f.id])
 							})
 						});
 						b.bind("Flash:IOError", function(d, f) {
 							b.trigger("Error", {
 								code: a.IO_ERROR,
 								message: a.translate("IO error."),
 								details: f.message,
 								file: b.getFile(c[f.id])
 							})
 						});
 						b.bind("Flash:ImageError", function(d, f) {
 							b.trigger("Error", {
 								code: parseInt(f.code, 10),
 								message: a.translate("Image error."),
 								file: b.getFile(c[f.id])
 							})
 						});
 						b.bind("Flash:StageEvent:rollOver", function(c) {
 							var d;
 							d = f.getElementById(b.settings.browse_button);
 							c = c.settings.browse_button_hover;
 							d && c && a.addClass(d, c)
 						});
 						b.bind("Flash:StageEvent:rollOut", function(c) {
 							var d;
 							d = f.getElementById(b.settings.browse_button);
 							c = c.settings.browse_button_hover;
 							d && c && a.removeClass(d, c)
 						});
 						b.bind("Flash:StageEvent:mouseDown", function(c) {
 							var d, k;
 							d = f.getElementById(b.settings.browse_button);
 							k = c.settings.browse_button_active;
 							if (d && k) {
 								a.addClass(d, k);
 								a.addEvent(f.body, "mouseup", function() {
 									a.removeClass(d, k)
 								}, c.id)
 							}
 						});
 						b.bind("Flash:StageEvent:mouseUp", function(c) {
 							var d;
 							d = f.getElementById(b.settings.browse_button);
 							c = c.settings.browse_button_active;
 							d && c && a.removeClass(d, c)
 						});
 						b.bind("Flash:ExifData", function(a, d) {
 							b.trigger("ExifData", b.getFile(c[d.id]), d.data)
 						});
 						b.bind("Flash:GpsData", function(a, d) {
 							b.trigger("GpsData", b.getFile(c[d.id]), d.data)
 						});
 						b.bind("QueueChanged", function() {
 							b.refresh()
 						});
 						b.bind("FilesRemoved", function(a, b) {
 							var d;
 							for (d = 0; d < b.length; d++)
 							p().removeFile(c[b[d].id])
 						});
 						b.bind("StateChanged", function() {
 							b.refresh()
 						});
 						b.bind("Refresh", function(c) {
 							var d, k;
 							p().setFileFilters(b.settings.filters, b.settings.multi_selection);
 							if (d = f.getElementById(c.settings.browse_button)) {
 								k = a.getPos(d, f.getElementById(c.settings.container));
 								d = a.getSize(d);
 								a.extend(f.getElementById(c.id + "_flash_container").style, {
 									top: k.y + "px",
 									left: k.x + "px",
 									width: d.w + "px",
 									height: d.h + "px"
 								})
 							}
 						});
 						b.bind("DisableBrowse", function(a, b) {
 							p().disableBrowse(b)
 						});
 						k({
 							success: true
 						})
 					}
 				})
 			}
 		}
 	})
 })(window, document, plupload);
 (function(b) {
 	var f, a, c, d, j, k, p, t, m, n, u = 0,
 		r = {}, y = [],
 		x = 0,
 		q = {}, w = [],
 		D = null,
 		C = new Image,
 		E = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
 		F = /[^\.]\.(swf)\s*$/i,
 		o, B = 1,
 		K = 0,
 		I = "",
 		l, v, i = false,
 		L = b.extend(b("<div/>")[0], {
 			prop: 0
 		}),
 		A = b.browser.msie && b.browser.version < 7 && !window.XMLHttpRequest,
 		O = function() {
 			a.hide();
 			C.onerror = C.onload = null;
 			D && D.abort();
 			f.empty()
 		}, Q = function() {
 			if (false === r.onError(y, u, r)) {
 				a.hide();
 				i = false
 			} else {
 				r.titleShow = false;
 				r.width = "auto";
 				r.height = "auto";
 				f.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
 				V()
 			}
 		}, N = function() {
 			var c = y[u],
 				d, m, l, n, p, o;
 			O();
 			r = b.extend({}, b.fn.fancybox.defaults, typeof b(c).data("fancybox") == "undefined" ? r : b(c).data("fancybox"));
 			o = r.onStart(y, u, r);
 			if (o === false) i = false;
 			else {
 				typeof o == "object" && (r = b.extend(r, o));
 				l = r.title || (c.nodeName ? b(c).attr("title") : c.title) || "";
 				if (c.nodeName && !r.orig) r.orig = b(c).children("img:first").length ? b(c).children("img:first") : b(c);
 				l === "" && (r.orig && r.titleFromAlt) && (l = r.orig.attr("alt"));
 				d = r.href || (c.nodeName ? b(c).attr("href") : c.href) || null;
 				if (/^(?:javascript)/i.test(d) || d == "#") d = null;
 				if (r.type) {
 					m = r.type;
 					if (!d) d = r.content
 				} else r.content ? m = "html" : d && (m = d.match(E) ? "image" : d.match(F) ? "swf" : b(c).hasClass("iframe") ? "iframe" : d.indexOf("#") === 0 ? "inline" : "ajax");
 				if (m) {
 					if (m == "inline") {
 						c = d.substr(d.indexOf("#"));
 						m = b(c).length > 0 ? "inline" : "ajax"
 					}
 					r.extraClass ? j.addClass(r.extraClass) : j.removeAttr("class");
 					r.type = m;
 					r.href = d;
 					r.title = l;
 					if (r.autoDimensions) if (r.type == "html" || r.type == "inline" || r.type == "ajax") {
 						r.width = "auto";
 						r.height = "auto"
 					} else r.autoDimensions = false;
 					if (r.modal) {
 						r.overlayShow = true;
 						r.hideOnOverlayClick = false;
 						r.hideOnContentClick = false;
 						r.enableEscapeButton = false;
 						r.showCloseButton = false
 					}
 					r.padding = parseInt(r.padding, 10);
 					r.margin = parseInt(r.margin, 10);
 					f.css("padding", r.padding + r.margin);
 					b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
 						b(this).replaceWith(k.children())
 					});
 					switch (m) {
 					case "html":
 						f.html(r.content);
 						V();
 						break;
 					case "inline":
 						if (b(c).parent().is("#fancybox-content") === true) {
 							i = false;
 							break
 						}
 						b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(c)).bind("fancybox-cleanup",

 						function() {
 							b(this).replaceWith(k.children())
 						}).bind("fancybox-cancel", function() {
 							b(this).replaceWith(f.children())
 						});
 						b(c).appendTo(f);
 						V();
 						break;
 					case "image":
 						i = false;
 						b.fancybox.showActivity();
 						C = new Image;
 						C.onerror = function() {
 							Q()
 						};
 						C.onload = function() {
 							i = true;
 							C.onerror = C.onload = null;
 							r.width = C.width;
 							r.height = C.height;
 							b("<img />").attr({
 								id: "fancybox-img",
 								src: C.src,
 								alt: r.title
 							}).appendTo(f);
 							z()
 						};
 						C.src = d;
 						break;
 					case "swf":
 						r.scrolling = "no";
 						n = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + r.width + '" height="' + r.height + '"><param name="movie" value="' + d + '"></param>';
 						p = "";
 						b.each(r.swf, function(a, b) {
 							n = n + ('<param name="' + a + '" value="' + b + '"></param>');
 							p = p + (" " + a + '="' + b + '"')
 						});
 						n = n + ('<embed src="' + d + '" type="application/x-shockwave-flash" width="' + r.width + '" height="' + r.height + '"' + p + "></embed></object>");
 						f.html(n);
 						V();
 						break;
 					case "ajax":
 						i = false;
 						b.fancybox.showActivity();
 						r.ajax.win = r.ajax.success;
 						D = b.ajax(b.extend({}, r.ajax, {
 							url: d,
 							data: r.ajax.data || {},
 							error: function(a) {
 								a.status > 0 && Q()
 							},
 							success: function(b,
 							c, i) {
 								if ((typeof i == "object" ? i : D).status == 200) {
 									if (typeof r.ajax.win == "function") {
 										o = r.ajax.win(d, b, c, i);
 										if (o === false) {
 											a.hide();
 											return
 										}
 										if (typeof o == "string" || typeof o == "object") b = o
 									}
 									f.html(b);
 									V()
 								}
 							}
 						}));
 						break;
 					case "iframe":
 						z()
 					}
 				} else Q()
 			}
 		}, V = function() {
 			var a = r.width,
 				c = r.height,
 				a = a.toString().indexOf("%") > -1 ? parseInt((b(window).width() - r.margin * 2) * parseFloat(a) / 100, 10) + "px" : a == "auto" ? "auto" : a + "px",
 				c = c.toString().indexOf("%") > -1 ? parseInt((b(window).height() - r.margin * 2) * parseFloat(c) / 100, 10) + "px" : c == "auto" ? "auto" : c + "px";
 			f.wrapInner('<div style="width:' + a + ";height:" + c + ";overflow: " + (r.scrolling == "auto" ? "auto" : r.scrolling == "yes" ? "scroll" : "hidden") + ';position:relative;"></div>');
 			r.width = f.width();
 			r.height = f.height();
 			z()
 		}, z = function() {
 			var o, B;
 			a.hide();
 			if (d.is(":visible") && false === q.onCleanup(w, x, q)) {
 				b.event.trigger("fancybox-cancel");
 				i = false
 			} else {
 				i = true;
 				b(k.add(c)).unbind();
 				b(window).unbind("resize.fb scroll.fb");
 				b(document).unbind("keydown.fb");
 				d.is(":visible") && q.titlePosition !== "outside" && d.css("height",
 				d.height());
 				w = y;
 				x = u;
 				q = r;
 				if (q.overlayShow) {
 					c.css({
 						"background-color": q.overlayColor,
 						opacity: q.overlayOpacity,
 						cursor: q.hideOnOverlayClick ? "pointer" : "auto",
 						height: b(document).height()
 					}).on("mousemove", function(a) {
 						a.stopPropagation();
 						a.preventDefault()
 					});
 					if (!c.is(":visible")) {
 						if (A) b("select:not(#fancybox-tmp select)").filter(function() {
 							return this.style.visibility !== "hidden"
 						}).css({
 							visibility: "hidden"
 						}).one("fancybox-cleanup", function() {
 							this.style.visibility = "inherit"
 						});
 						c.show()
 					}
 				} else c.hide();
 				o = S();
 				var E = {}, z = q.autoScale,
 					F = q.padding * 2;
 				E.width = q.width.toString().indexOf("%") > -1 ? parseInt(o[0] * parseFloat(q.width) / 100, 10) : q.width + F;
 				E.height = q.height.toString().indexOf("%") > -1 ? parseInt(o[1] * parseFloat(q.height) / 100, 10) : q.height + F;
 				if (z && (E.width > o[0] || E.height > o[1])) if (r.type == "image" || r.type == "swf") {
 					z = q.width / q.height;
 					if (E.width > o[0]) {
 						E.width = o[0];
 						E.height = parseInt((E.width - F) / z + F, 10)
 					}
 					if (E.height > o[1]) {
 						E.height = o[1];
 						E.width = parseInt((E.height - F) * z + F, 10)
 					}
 				} else {
 					E.width = Math.min(E.width, o[0]);
 					E.height = Math.min(E.height, o[1])
 				}
 				E.top = parseInt(Math.max(o[3] - 20, o[3] + (o[1] - E.height - 40) * 0.5), 10);
 				E.left = parseInt(Math.max(o[2] - 20, o[2] + (o[0] - E.width - 40) * 0.5), 10);
 				v = E;
 				I = q.title || "";
 				K = 0;
 				t.empty().removeAttr("style").removeClass();
 				if (q.titleShow !== false) if ((I = b.isFunction(q.titleFormat) ? q.titleFormat(I, w, x, q) : I && I.length ? q.titlePosition == "float" ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + I + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + q.titlePosition + '">' + I + "</div>" : false) && I !== "") {
 					t.addClass("fancybox-title-" + q.titlePosition).html(I).appendTo("body").show();
 					switch (q.titlePosition) {
 					case "inside":
 						t.css({
 							width: v.width - q.padding * 2,
 							marginLeft: q.padding,
 							marginRight: q.padding
 						});
 						K = t.outerHeight(true);
 						t.appendTo(j);
 						v.height = v.height + K;
 						break;
 					case "over":
 						t.css({
 							marginLeft: q.padding,
 							width: v.width - q.padding * 2,
 							bottom: q.padding
 						}).appendTo(j);
 						break;
 					case "float":
 						t.css("left", parseInt((t.width() - v.width - 40) / 2, 10) * -1).appendTo(d);
 						break;
 					default:
 						t.css({
 							width: v.width - q.padding * 2,
 							paddingLeft: q.padding,
 							paddingRight: q.padding
 						}).appendTo(d)
 					}
 				}
 				t.hide();
 				if (d.is(":visible")) {
 					b(p.add(m).add(n)).hide();
 					o = d.position();
 					l = {
 						top: o.top,
 						left: o.left,
 						width: d.width(),
 						height: d.height()
 					};
 					B = l.width == v.width && l.height == v.height;
 					k.fadeTo(q.changeFade, 0.3, function() {
 						var a = function() {
 							k.html(f.contents()).fadeTo(q.changeFade, 1, T)
 						};
 						b.event.trigger("fancybox-change");
 						k.empty().removeAttr("filter").css({
 							"border-width": q.padding,
 							width: v.width - q.padding * 2,
 							height: r.autoDimensions ? "auto" : v.height - K - q.padding * 2
 						});
 						if (B) a();
 						else {
 							L.prop = 0;
 							b(L).animate({
 								prop: 1
 							}, {
 								duration: q.changeSpeed,
 								easing: q.easingChange,
 								step: M,
 								complete: a
 							})
 						}
 					})
 				} else {
 					d.removeAttr("style");
 					k.css("border-width", q.padding);
 					if (q.transitionIn == "elastic") {
 						l = ka();
 						k.html(f.contents());
 						d.show();
 						if (q.opacity) v.opacity = 0;
 						L.prop = 0;
 						b(L).animate({
 							prop: 1
 						}, {
 							duration: q.speedIn,
 							easing: q.easingIn,
 							step: M,
 							complete: T
 						})
 					} else {
 						q.titlePosition == "inside" && K > 0 && t.show();
 						k.css({
 							width: v.width - q.padding * 2,
 							height: r.autoDimensions ? "auto" : v.height - K - q.padding * 2
 						}).html(f.contents());
 						d.css(v).fadeIn(q.transitionIn == "none" ? 0 : q.speedIn, T)
 					}
 				}
 			}
 		}, T = function() {
 			if (!b.support.opacity) {
 				k.get(0).style.removeAttribute("filter");
 				d.get(0).style.removeAttribute("filter")
 			}
 			r.autoDimensions && k.css("height", "auto");
 			d.css("height", "auto");
 			I && I.length && t.show();
 			q.showCloseButton && p.show();
 			(q.enableEscapeButton || q.enableKeyboardNav) && b(document).bind("keydown.fb", function(a) {
 				if (a.keyCode == 27 && q.enableEscapeButton) {
 					a.preventDefault();
 					b.fancybox.close()
 				} else if ((a.keyCode == 37 || a.keyCode == 39) && q.enableKeyboardNav && a.target.tagName !== "INPUT" && a.target.tagName !== "TEXTAREA" && a.target.tagName !== "SELECT") {
 					a.preventDefault();
 					b.fancybox[a.keyCode == 37 ? "prev" : "next"]()
 				}
 			});
 			if (q.showNavArrows) {
 				(q.cyclic && w.length > 1 || x !== 0) && m.show();
 				(q.cyclic && w.length > 1 || x != w.length - 1) && n.show()
 			} else {
 				m.hide();
 				n.hide()
 			}
 			q.hideOnContentClick && k.bind("click", b.fancybox.close);
 			q.hideOnOverlayClick && c.bind("click", b.fancybox.close);
 			b(window).bind("resize.fb", b.fancybox.resize);
 			q.centerOnScroll && b(window).bind("scroll.fb",
 			b.fancybox.center);
 			q.type == "iframe" && b('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (b.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + r.scrolling + '" src="' + q.href + '"></iframe>').appendTo(k);
 			d.show();
 			i = false;
 			b.fancybox.center();
 			q.onComplete(w, x, q);
 			var a, f;
 			if (w.length - 1 > x) {
 				a = w[x + 1].href;
 				if (typeof a !== "undefined" && a.match(E)) {
 					f = new Image;
 					f.src = a
 				}
 			}
 			if (x > 0) {
 				a = w[x - 1].href;
 				if (typeof a !== "undefined" && a.match(E)) {
 					f = new Image;
 					f.src = a
 				}
 			}
 		},
 		M = function(a) {
 			var b = {
 				width: parseInt(l.width + (v.width - l.width) * a, 10),
 				height: parseInt(l.height + (v.height - l.height) * a, 10),
 				top: parseInt(l.top + (v.top - l.top) * a, 10),
 				left: parseInt(l.left + (v.left - l.left) * a, 10)
 			};
 			if (typeof v.opacity !== "undefined") b.opacity = a < 0.5 ? 0.5 : a;
 			d.css(b);
 			k.css({
 				width: b.width - q.padding * 2,
 				height: b.height - K * a - q.padding * 2
 			})
 		}, S = function() {
 			return [b(window).width() - q.margin * 2, b(window).height() - q.margin * 2, b(document).scrollLeft() + q.margin, b(document).scrollTop() + q.margin]
 		}, ka = function() {
 			var a = r.orig ? b(r.orig) : false,
 				c = {};
 			if (a && a.length) {
 				c = a.offset();
 				c.top = c.top + (parseInt(a.css("paddingTop"), 10) || 0);
 				c.left = c.left + (parseInt(a.css("paddingLeft"), 10) || 0);
 				c.top = c.top + (parseInt(a.css("border-top-width"), 10) || 0);
 				c.left = c.left + (parseInt(a.css("border-left-width"), 10) || 0);
 				c.width = a.width();
 				c.height = a.height();
 				c = {
 					width: c.width + q.padding * 2,
 					height: c.height + q.padding * 2,
 					top: c.top - q.padding - 20,
 					left: c.left - q.padding - 20
 				}
 			} else {
 				a = S();
 				c = {
 					width: q.padding * 2,
 					height: q.padding * 2,
 					top: parseInt(a[3] + a[1] * 0.5, 10),
 					left: parseInt(a[2] + a[0] * 0.5, 10)
 				}
 			}
 			return c
 		}, sa = function() {
 			if (a.is(":visible")) {
 				b("div", a).css("top", B * -40 + "px");
 				B = (B + 1) % 12
 			} else clearInterval(o)
 		};
 	b.fn.fancybox = function(a) {
 		if (!b(this).length) return this;
 		b(this).data("fancybox", b.extend({}, a, b.metadata ? b(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(a) {
 			a.preventDefault();
 			if (!i) {
 				i = true;
 				b(this).blur();
 				y = [];
 				u = 0;
 				a = b(this).attr("rel") || "";
 				if (!a || a == "" || a === "nofollow") y.push(this);
 				else {
 					y = b("a[rel=" + a + "], area[rel=" + a + "]");
 					u = y.index(this)
 				}
 				N()
 			}
 		});
 		return this
 	};
 	b.fancybox = function(a, c) {
 		var d;
 		if (!i) {
 			i = true;
 			d = typeof c !== "undefined" ? c : {};
 			y = [];
 			u = parseInt(d.index, 10) || 0;
 			if (b.isArray(a)) {
 				for (var f = 0, j = a.length; f < j; f++)
 				typeof a[f] == "object" ? b(a[f]).data("fancybox", b.extend({}, d, a[f])) : a[f] = b({}).data("fancybox", b.extend({
 					content: a[f]
 				}, d));
 				y = jQuery.merge(y, a)
 			} else {
 				typeof a == "object" ? b(a).data("fancybox", b.extend({}, d, a)) : a = b({}).data("fancybox", b.extend({
 					content: a
 				}, d));
 				y.push(a)
 			}
 			if (u > y.length || u < 0) u = 0;
 			N()
 		}
 	};
 	b.fancybox.showActivity = function() {
 		clearInterval(o);
 		a.show();
 		o = setInterval(sa, 66)
 	};
 	b.fancybox.hideActivity = function() {
 		a.hide()
 	};
 	b.fancybox.next = function() {
 		return b.fancybox.pos(x + 1)
 	};
 	b.fancybox.prev = function() {
 		return b.fancybox.pos(x - 1)
 	};
 	b.fancybox.pos = function(a) {
 		if (!i) {
 			a = parseInt(a);
 			y = w;
 			if (a > -1 && a < w.length) {
 				u = a;
 				N()
 			} else if (q.cyclic && w.length > 1) {
 				u = a >= w.length ? 0 : w.length - 1;
 				N()
 			}
 		}
 	};
 	b.fancybox.cancel = function() {
 		if (!i) {
 			i = true;
 			b.event.trigger("fancybox-cancel");
 			O();
 			r.onCancel(y, u, r);
 			i = false
 		}
 	};
 	b.fancybox.close = function() {
 		function a() {
 			c.hide();
 			t.empty().hide();
 			d.hide();
 			b.event.trigger("fancybox-cleanup");
 			k.empty();
 			q.onClosed(w, x, q);
 			w = r = [];
 			x = u = 0;
 			q = r = {};
 			i = false
 		}
 		if (!i && !d.is(":hidden")) {
 			i = true;
 			if (q && false === q.onCleanup(w, x, q)) i = false;
 			else {
 				O();
 				b(p.add(m).add(n)).hide();
 				b(k.add(c)).unbind();
 				b(window).unbind("resize.fb scroll.fb");
 				b(document).unbind("keydown.fb");
 				k.find("iframe").attr("src", A && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank");
 				q.titlePosition !== "inside" && t.empty();
 				d.stop();
 				if (q.transitionOut == "elastic") {
 					l = ka();
 					var f = d.position();
 					v = {
 						top: f.top,
 						left: f.left,
 						width: d.width(),
 						height: d.height()
 					};
 					if (q.opacity) v.opacity = 1;
 					t.empty().hide();
 					L.prop = 1;
 					b(L).animate({
 						prop: 0
 					}, {
 						duration: q.speedOut,
 						easing: q.easingOut,
 						step: M,
 						complete: a
 					})
 				} else d.fadeOut(q.transitionOut == "none" ? 0 : q.speedOut, a)
 			}
 		}
 	};
 	b.fancybox.resize = function() {
 		c.is(":visible") && c.css("height", b(document).height());
 		b.fancybox.center(true)
 	};
 	b.fancybox.center = function(a) {
 		var b, c;
 		if (!i) {
 			c = a === true ? 1 : 0;
 			b = S();
 			if (c || !(d.width() > b[0] || d.height() > b[1])) d.stop().animate({
 				top: parseInt(Math.max(b[3] - 20, b[3] + (b[1] - k.height() - 40) * 0.5 - q.padding)),
 				left: parseInt(Math.max(b[2] - 20, b[2] + (b[0] - k.width() - 40) * 0.5 - q.padding))
 			}, typeof a == "number" ? a : 200)
 		}
 	};
 	b.fancybox.init = function() {
 		if (!b("#fancybox-wrap").length) {
 			b("body").append(f = b('<div id="fancybox-tmp"></div>'), a = b('<div id="fancybox-loading"><div></div></div>'), c = b('<div id="fancybox-overlay"></div>'), d = b('<div id="fancybox-wrap"></div>'));
 			j = b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(d);
 			j.append(k = b('<div id="fancybox-content"></div>'), p = b('<a id="fancybox-close"></a>'), t = b('<div id="fancybox-title"></div>'), m = b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), n = b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
 			p.click(b.fancybox.close);
 			a.click(b.fancybox.cancel);
 			m.click(function(a) {
 				a.preventDefault();
 				b.fancybox.prev()
 			});
 			n.click(function(a) {
 				a.preventDefault();
 				b.fancybox.next()
 			});
 			b.support.opacity || d.addClass("fancybox-ie");
 			if (A) {
 				a.addClass("fancybox-ie6");
 				d.addClass("fancybox-ie6");
 				b('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(j)
 			}
 		}
 	};
 	b.fn.fancybox.defaults = {
 		padding: 10,
 		margin: 40,
 		opacity: false,
 		modal: false,
 		cyclic: false,
 		scrolling: "auto",
 		width: 560,
 		height: 340,
 		autoScale: true,
 		autoDimensions: true,
 		centerOnScroll: false,
 		ajax: {},
 		swf: {
 			wmode: "transparent"
 		},
 		hideOnOverlayClick: true,
 		hideOnContentClick: false,
 		overlayShow: true,
 		overlayOpacity: 0.7,
 		overlayColor: "#000",
 		titleShow: true,
 		titlePosition: "float",
 		titleFormat: null,
 		titleFromAlt: false,
 		transitionIn: "none",
 		transitionOut: "none",
 		speedIn: 300,
 		speedOut: 300,
 		changeSpeed: 100,
 		changeFade: "fast",
 		easingIn: "swing",
 		easingOut: "swing",
 		showCloseButton: true,
 		showNavArrows: true,
 		enableEscapeButton: false,
 		enableKeyboardNav: true,
 		extraClass: "",
 		onStart: function() {},
 		onCancel: function() {},
 		onComplete: function() {},
 		onCleanup: function() {},
 		onClosed: function() {},
 		onError: function() {}
 	};
 	b(document).ready(function() {
 		b.fancybox.init()
 	})
 })(jQuery);
 $.fn.valid = function() {
 	if (!this.length) return true;
 	var b = ["minlen", "maxlen"],
 		f = {
 			minlen: function(a, b) {
 				if (!b) return true;
 				var c = $.getByteLen(a);
 				return !c && b || c < b ? false : true
 			},
 			maxlen: function(a, b) {
 				var c = $.getByteLen(a);
 				return !b || !c ? true : c > b ? false : true
 			}
 		}, a = this.eq(0),
 		c = a.val(),
 		d = true,
 		j = {};
 	$.each(b, function(c) {
 		c = b[c];
 		j[c] = a.attr(c)
 	});
 	$.each(j, function(a, b) {
 		var j = f[a];
 		if (j && !j(c, b)) return d = false
 	});
 	return d
 };
 (function() {
 	var b = {}, f = $(window);
 	$.fn.showErrorTips = function() {
 		this.each(function() {
 			var a = $(this),
 				c = a.data("error-tip"),
 				d;
 			if (c) {
 				var j = a.data("form-error-id");
 				if (!j || j < 1) {
 					j = 1;
 					d = $('<div class="form-tips-error">').text(c).appendTo("body");
 					a.data("form-error-id", j).on("keyup", function() {});
 					b[j] = d
 				} else d = b[j];
 				d.outerWidth();
 				c = d.outerHeight();
 				a = a.offset();
 				f.scrollLeft();
 				f.scrollTop();
 				d.css({
 					position: "absolute",
 					left: a.left,
 					top: a.top - c
 				}).show();
 				setTimeout(function() {
 					d.fadeOut(300)
 				}, 3E3)
 			}
 		});
 		return this
 	};
 	$.fn.textCounter = function() {
 		if (!this.length) return this;
 		this.each(function() {
 			var a = $(this),
 				b = parseInt(a.attr("maxlen")),
 				d, j, k;
 			if (!(isNaN(b) || b <= 0)) {
 				var b = Math.ceil(b / 2),
 					p = a.data("form-info-id");
 				if (!p) {
 					d = $('<div class="form-tips-info" style="width:60px;text-align:center"><span></span>/' + b + "</div>").appendTo("body").data("form-info-id", 1);
 					j = d.find("span");
 					a.on("focus blur", function(p) {
 						clearInterval(k);
 						if (p.type == "focus") {
 							var p = d.outerHeight(),
 								m = d.outerWidth(),
 								n = a.offset(),
 								u = a.outerWidth();
 							f.scrollLeft();
 							f.scrollTop();
 							d.css({
 								position: "absolute",
 								left: n.left + u - m,
 								top: n.top - p
 							}).show();
 							k = setInterval(function() {
 								var f = a.val(),
 									f = Math.ceil($.getChsLen(f));
 								j.text(f);
 								f > b ? d.addClass("form-tips-error") : d.removeClass("form-tips-error")
 							}, 20)
 						} else d.hide()
 					})
 				}
 			}
 		});
 		return this
 	}
 })();
 (function(b, f, a) {
 	var c = Math,
 		d = f.createElement("div").style,
 		j = "ontouchstart" in b,
 		k, p = a(f);
 	"webkitTransform" in d && (k = true);
 	b.ScrollbarBase = Backbone.View.extend({
 		initialize: function(a) {
 			Backbone.View.prototype.initialize.call(this, a);
 			this._scrollPosition = 0;
 			this._init()
 		},
 		_init: function() {
 			var b = this,
 				c, d = b.$el.css({
 					overflow: "hidden",
 					"overflow-y": "hidden"
 				});
 			b.$content = a(".scroller", d);
 			c = b.$bar = a('<div class="scrollbar" unselectable="on"><div class="track" unselectable="on"></div><div class="thumb" unselectable="on"></div></div>');
 			var f = d.css("position");
 			(!f || f === "static") && d.css("position", "relative");
 			f = b.$content.css("position");
 			(!f || f === "static") && b.$content.css("position", "relative");
 			b._onMouseWheel = function(a, c) {
 				b._scroll(c)
 			};
 			d.append(c).bind("mousewheel", b._onMouseWheel);
 			if (j) {
 				var k = null,
 					m = null;
 				b._onTouchMove = function(a) {
 					a.preventDefault();
 					a = a.originalEvent.touches[0];
 					if (k === null) {
 						k = a.pageY;
 						m = a.pageX
 					}
 					b._moveThumb({
 						pageY: k,
 						pageX: m
 					}, {
 						pageY: a.pageY,
 						pageX: a.pageX
 					});
 					k = a.pageY;
 					m = a.pageX
 				};
 				b._onTouchStart = function(a) {
 					a.preventDefault()
 				};
 				b._onTouchEnd = function() {
 					m = k = null
 				};
 				b.$content.on("touchstart", b._onTouchStart).on("touchmove", b._onTouchMove).on("touchend", b._onTouchEnd)
 			}
 			b.$track = a(".track", c).on("click", function(a) {
 				b._onClickTrack(a)
 			});
 			var t;
 			b.$thumb = a(".thumb", c).on("mousedown", function(a) {
 				a.stopPropagation();
 				a.preventDefault();
 				t = a;
 				p.on("mousemove.scroll", function(a) {
 					a.preventDefault();
 					b._moveThumb(a, t);
 					t = a
 				}).on("mouseup.scroll", function() {
 					p.off("mousemove.scroll mouseup.scroll");
 					t = null
 				})
 			});
 			b.refresh()
 		},
 		disable: function() {
 			this.disabled = true;
 			this.scrollTo(0);
 			this.$bar.hide();
 			this.$el.unbind("mousewheel", this._onMouseWheel);
 			this.$content.off("touchstart", this._onTouchStart).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd);
 			return this
 		},
 		_enable: function() {
 			if (this.disabled) {
 				this.disabled = false;
 				this.$bar.show();
 				this.$el.bind("mousewheel", this._onMouseWheel);
 				this.$content.on("touchstart", this._onTouchStart).on("touchmove", this._onTouchMove).on("touchend", this._onTouchEnd)
 			}
 		},
 		isActive: function() {
 			return this._contentWidth > this._wrapperWidth ? true : false
 		},
 		refresh: function(a) {
 			a || (this._contentWidth > this._wrapperWidth ? this._enable() : this.disable());
 			this._maxPosition = this._contentWidth - this._wrapperWidth + this._wrapperPadding;
 			this._thumbWidth = c.floor(this._wrapperWidth / this._contentWidth * this._wrapperWidth);
 			this._maxThumbPosition = this._wrapperWidth - this._thumbWidth;
 			this._positionThumb()
 		},
 		scrollTo: function(a) {
 			this._scrollContent(-a);
 			this._positionThumb();
 			return this
 		},
 		_onClickTrack: function() {},
 		_moveThumb: function() {},
 		_scroll: function(a,
 		b) {
 			var d, f = this._maxPosition;
 			d = b ? this._wrapperWidth : 50;
 			if (a < 0) {
 				d = this._scrollPosition - d;
 				d < -f && (d = -f)
 			} else {
 				d = this._scrollPosition + d;
 				d > 0 && (d = 0)
 			}
 			this.scrollTo(c.abs(d))
 		},
 		_scrollContent: function() {},
 		_positionContent: function() {},
 		_positionThumb: function() {}
 	});
 	ScrollbarBase.need = function() {
 		return !k
 	};
 	var t = ScrollbarBase.extend({
 		initialize: function(a) {
 			ScrollbarBase.prototype.initialize.call(this, a);
 			this.$bar.addClass("scrollbar-h")
 		},
 		_onClickTrack: function(a) {
 			var b = this.$thumb.offset();
 			a.pageX < b.left ? this._scroll(1,
 			true) : this._scroll(-1, true)
 		},
 		_scrollContent: function(a) {
 			this._scrollPosition = a;
 			this.$content.css("left", a)
 		},
 		_moveThumb: function(a, b) {
 			var d = a.pageX - b.pageX,
 				f = this.$thumb.position(),
 				d = c.ceil(c.max(c.min(f.left + d, this._maxThumbPosition), 0));
 			this.$thumb.css("left", d);
 			this._positionContent(d)
 		},
 		_positionContent: function(a) {
 			if (a === void 0) a = this.$thumb.position().left;
 			a = -c.ceil(a / this._maxThumbPosition * this._maxPosition);
 			this._scrollContent(a)
 		},
 		_positionThumb: function() {
 			var a = c.abs(c.min(c.ceil(this._scrollPosition / this._maxPosition * this._maxThumbPosition), this._maxThumbPosition));
 			this.$thumb.css("left", a)
 		},
 		refresh: function(a) {
 			this._wrapperWidth = this.$el.innerWidth();
 			this._wrapperPadding = this._wrapperWidth - this.$el.width();
 			this._contentWidth = this.$content.outerWidth();
 			ScrollbarBase.prototype.refresh.call(this, a);
 			this.$thumb.width(this._thumbWidth);
 			return this
 		}
 	}),
 		m = ScrollbarBase.extend({
 			initialize: function(a) {
 				ScrollbarBase.prototype.initialize.call(this, a);
 				this.$bar.addClass("scrollbar-v")
 			},
 			refresh: function(a) {
 				this._wrapperWidth = this.$el.innerHeight();
 				this._wrapperPadding = this._wrapperWidth - this.$el.height();
 				this._contentWidth = this.$content.height();
 				ScrollbarBase.prototype.refresh.call(this, a);
 				this.$bar.height(this._wrapperWidth);
 				this.$thumb.height(this._thumbWidth);
 				return this
 			},
 			_onClickTrack: function(a) {
 				var b = this.$thumb.offset();
 				a.pageY < b.top ? this._scroll(1, true) : this._scroll(-1, true)
 			},
 			_scrollContent: function(a) {
 				this._scrollPosition = a;
 				this.$content.css("top", a)
 			},
 			_moveThumb: function(a, b) {
 				var d = a.pageY - b.pageY,
 					f = this.$thumb.position(),
 					d = c.ceil(c.max(c.min(f.top + d, this._maxThumbPosition), 0));
 				this.$thumb.css("top", d);
 				this._positionContent(d)
 			},
 			_positionContent: function(a) {
 				if (a === void 0) a = this.$thumb.position().top;
 				a = -c.ceil(a / this._maxThumbPosition * this._maxPosition);
 				this._scrollContent(a)
 			},
 			_positionThumb: function() {
 				var a = c.abs(c.min(c.ceil(this._scrollPosition / this._maxPosition * this._maxThumbPosition), this._maxThumbPosition));
 				this.$thumb.css("top", a)
 			}
 		});
 	a.fn.scrollbar = function(a) {
 		if (!this.length) return this;
 		var a = a || {}, a = a.type || "ver",
 			b = this[0];
 		if (b.scrollbar) return b.scrollbar;
 		a === "hor" ? b.scrollbar = new t({
 			el: b
 		}) : a === "ver" && (b.scrollbar = new m({
 			el: b
 		}));
 		return this
 	}
 })(window, document, jQuery);
 (function(b) {
 	var f;
 	b.fn.textareaAutosize = function(a) {
 		a = a || {};
 		return this.each(function() {
 			var c, d, j, k = b(this);
 			k.focus(function() {
 				f || (f = b('<pre style="position:absolute;left:-9999px;top:0;word-wrap:break-word;height:auto;">').appendTo("body"));
 				c = f.removeAttr("class");
 				a.className && c.addClass(a.className);
 				c.width(k.width());
 				d = setInterval(function() {
 					c.html(k.val());
 					var a = c.height();
 					if (j !== a) {
 						j = a;
 						k.height(j)
 					}
 				}, 30)
 			}).blur(function() {
 				clearInterval(d)
 			})
 		})
 	}
 })(jQuery);
 (function(b) {
 	var f = 0;
 	b.fn.extend({
 		bubbletip: function(a, c) {
 			function d() {
 				var a;
 				if (!y) {
 					y = true;
 					x && q.stop(true, false);
 					m.calculateOnShow && k();
 					if (m.positionAt.match(/^element|body$/i)) if (m.deltaDirection.match(/^up|down$/i)) {
 						x || q.css("top", parseInt(n.top + n.delta) + "px");
 						a = {
 							top: n.top + "px"
 						}
 					} else {
 						x || q.css("left", parseInt(n.left + n.delta) + "px");
 						a = {
 							left: n.left + "px"
 						}
 					} else if (m.deltaDirection.match(/^up|down$/i)) {
 						if (!x) {
 							n.mouseTop = e.pageY + n.top;
 							q.css({
 								top: parseInt(n.mouseTop + n.delta) + "px",
 								left: parseInt(e.pageX - q.width() / 2) + "px"
 							})
 						}
 						a = {
 							top: n.mouseTop + "px"
 						}
 					} else {
 						if (!x) {
 							n.mouseLeft = e.pageX + n.left;
 							q.css({
 								left: parseInt(n.mouseLeft + n.delta) + "px",
 								top: parseInt(e.pageY - q.height() / 2) + "px"
 							})
 						}
 						a = {
 							left: n.left + "px"
 						}
 					}
 					x = false;
 					q.show();
 					q.animate(a, m.animationDuration, m.animationEasing, function() {
 						y = true
 					})
 				}
 			}

 			function j() {
 				var a;
 				y = false;
 				x = true;
 				a = m.positionAt.match(/^element|body$/i) ? m.deltaDirection.match(/^up|down$/i) ? {
 					top: parseInt(n.top - n.delta) + "px"
 				} : {
 					left: parseInt(n.left - n.delta) + "px"
 				} : m.deltaDirection.match(/^up|down$/i) ? {
 					top: parseInt(n.mouseTop - n.delta) + "px"
 				} : {
 					left: parseInt(n.mouseLeft - n.delta) + "px"
 				};
 				q.animate(a, m.animationDuration, m.animationEasing, function() {
 					q.hide();
 					x = false
 				})
 			}

 			function k() {
 				if (m.positionAt.match(/^element$/i)) {
 					var a = m.positionAtElement.offset();
 					if (m.deltaDirection.match(/^up$/i)) {
 						n.top = a.top + m.offsetTop - q.outerHeight();
 						n.left = a.left + m.offsetLeft + (m.positionAtElement.outerWidth() - q.outerWidth()) / 2;
 						n.delta = m.deltaPosition
 					} else if (m.deltaDirection.match(/^down$/i)) {
 						n.top = a.top + m.positionAtElement.outerHeight() + m.offsetTop;
 						n.left = a.left + m.offsetLeft + (m.positionAtElement.outerWidth() - q.outerWidth()) / 2;
 						n.delta = -m.deltaPosition
 					} else if (m.deltaDirection.match(/^left$/i)) {
 						n.top = a.top + m.offsetTop + (m.positionAtElement.outerHeight() - q.outerHeight()) / 2;
 						n.left = a.left + m.offsetLeft - q.outerWidth();
 						n.delta = m.deltaPosition
 					} else if (m.deltaDirection.match(/^right$/i)) {
 						n.top = a.top + m.offsetTop + (m.positionAtElement.outerHeight() - q.outerHeight()) / 2;
 						n.left = a.left + m.positionAtElement.outerWidth() + m.offsetLeft;
 						n.delta = -m.deltaPosition
 					}
 				} else if (m.positionAt.match(/^body$/i)) if (m.deltaDirection.match(/^up|left$/i)) {
 					n.top = m.offsetTop;
 					n.left = m.offsetLeft;
 					n.delta = m.deltaPosition
 				} else {
 					if (m.deltaDirection.match(/^down$/i)) {
 						n.top = parseInt(m.offsetTop + q.outerHeight());
 						n.left = m.offsetLeft
 					} else {
 						n.top = m.offsetTop;
 						n.left = parseInt(m.offsetLeft + q.outerWidth())
 					}
 					n.delta = -m.deltaPosition
 				} else if (m.positionAt.match(/^mouse$/i)) if (m.deltaDirection.match(/^up|left$/i)) {
 					if (m.deltaDirection.match(/^up$/i)) {
 						n.top = -(m.offsetTop + q.outerHeight());
 						n.left = m.offsetLeft
 					} else if (m.deltaDirection.match(/^left$/i)) {
 						n.top = m.offsetTop;
 						n.left = -(m.offsetLeft + q.outerWidth())
 					}
 					n.delta = m.deltaPosition
 				} else {
 					n.top = m.offsetTop;
 					n.left = m.offsetLeft;
 					n.delta = -m.deltaPosition
 				}
 				m.positionAt.match(/^element|body$/i) && q.css({
 					position: "absolute",
 					top: n.top + "px",
 					left: n.left + "px"
 				})
 			}
 			if (b("table.bubbletip #" + b(a).get(0).id).length > 0) return this;
 			var p, t, m, n, u, r, y, x, q, w, D, C;
 			p = b(this);
 			t = b(a);
 			w = f++;
 			m = {
 				positionAt: "element",
 				positionAtElement: p,
 				offsetTop: 0,
 				offsetLeft: 0,
 				deltaPosition: 30,
 				deltaDirection: "up",
 				animationDuration: 250,
 				animationEasing: "swing",
 				bindShow: "mouseover",
 				bindHide: "mouseout",
 				delayShow: 0,
 				delayHide: 500,
 				calculateOnShow: false
 			};
 			c && (m = b.extend(m, c));
 			n = {
 				top: 0,
 				left: 0,
 				delta: 0,
 				mouseTop: 0,
 				mouseLeft: 0,
 				tipHeight: 0,
 				bindShow: (m.bindShow + " ").replace(/ +/g, ".bubbletip" + w),
 				bindHide: (m.bindHide + " ").replace(/ +/g, ".bubbletip" + w),
 				alwayShow: m.alwayShow || false
 			};
 			r = u = null;
 			x = y = false;
 			p.data("bubbletip_tips") ? p.data("bubbletip_tips", b.merge(p.data("bubbletip_tips"), [
 				[t.get(0).id, w]
 			])) : p.data("bubbletip_tips", [
 				[t.get(0).id, w]
 			]);
 			if (!m.positionAt.match(/^element|body|mouse$/i)) m.positionAt = "element";
 			if (!m.deltaDirection.match(/^up|down|left|right$/i)) m.deltaDirection = "up";
 			m.deltaDirection.match(/^up$/i) ? q = b('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td class="bt-top"></td><td class="bt-topright"></td></tr><tr><td class="bt-left"></td><td class="bt-content"></td><td class="bt-right"></td></tr><tr><td class="bt-bottomleft"></td><td><table class="bt-bottom" cellspacing="0" cellpadding="0"><tr><th></th><td><div></div></td><th></th></tr></table></td><td class="bt-bottomright"></td></tr></tbody></table>') : m.deltaDirection.match(/^down$/i) ? q = b('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td><table class="bt-top" cellspacing="0" cellpadding="0"><tr><th></th><td><div></div></td><th></th></tr></table></td><td class="bt-topright"></td></tr><tr><td class="bt-left"></td><td class="bt-content"></td><td class="bt-right"></td></tr><tr><td class="bt-bottomleft"></td><td class="bt-bottom"></td><td class="bt-bottomright"></td></tr></tbody></table>') : m.deltaDirection.match(/^left$/i) ? q = b('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td class="bt-top"></td><td class="bt-topright"></td></tr><tr><td class="bt-left"></td><td class="bt-content"></td><td class="bt-right-tail"><div class="bt-right"></div><div class="bt-right-tail"></div><div class="bt-right"></div></td></tr><tr><td class="bt-bottomleft"></td><td class="bt-bottom"></td><td class="bt-bottomright"></td></tr></tbody></table>') : m.deltaDirection.match(/^right$/i) && (q = b('<table class="bubbletip" cellspacing="0" cellpadding="0"><tbody><tr><td class="bt-topleft"></td><td class="bt-top"></td><td class="bt-topright"></td></tr><tr><td class="bt-left-tail"><div class="bt-left"></div><div class="bt-left-tail"></div><div class="bt-left"></div></td><td class="bt-content"></td><td class="bt-right"></td></tr><tr><td class="bt-bottomleft"></td><td class="bt-bottom"></td><td class="bt-bottomright"></td></tr></tbody></table>'));
 			q.appendTo("body");
 			b(".bt-content", q).append(t);
 			t.show();
 			if (m.deltaDirection.match(/^left|right$/i)) {
 				n.tipHeight = parseInt(t.height() / 2);
 				t.height() % 2 == 1 && n.tipHeight++;
 				n.tipHeight = n.tipHeight < 20 ? 1 : n.tipHeight - 20;
 				m.deltaDirection.match(/^left$/i) ? b("div.bt-right", q).css("height", n.tipHeight + "px") : b("div.bt-left", q).css("height", n.tipHeight + "px")
 			}
 			q.css({
 				width: q.width(),
 				height: q.height()
 			});
 			k();
 			q.hide();
 			b(window).bind("resize.bubbletip" + w, function() {
 				var a = b(window).width(),
 					c = b(window).height();
 				if (!(a === D && c === C)) {
 					D = a;
 					C = c;
 					r && clearTimeout(r);
 					r = setTimeout(function() {
 						k()
 					}, 250)
 				}
 			});
 			n.alwayShow ? d() : b([q.get(0), this.get(0)]).bind(n.bindShow, function() {
 				u && clearTimeout(u);
 				m.delayShow === 0 ? d() : u = setTimeout(function() {
 					d()
 				}, m.delayShow);
 				return false
 			}).bind(n.bindHide, function() {
 				u && clearTimeout(u);
 				m.delayHide === 0 ? j() : u = setTimeout(function() {
 					j()
 				}, m.delayHide);
 				return false
 			});
 			return this
 		},
 		removeBubbletip: function(a) {
 			var c, d = [],
 				f = [],
 				k;
 			c = b.makeArray(b(this).data("bubbletip_tips"));
 			k = b.makeArray(a);
 			for (a = 0; a < k.length; a++)
 			d.push(b(k[a]).get(0).id);
 			for (a = 0; a < c.length; a++)
 			if (d.length == 0 || b.inArray(c[a][0], d) >= 0) {
 				for (k = b("#" + c[a][0]).get(0).parentNode; k.tagName.toLowerCase() != "table";)
 				k = k.parentNode;
 				b("#" + c[a][0]).appendTo("body").hide();
 				b(k).remove();
 				b(this).unbind(".bubbletip" + c[a][1]);
 				b(window).unbind(".bubbletip" + c[a][1])
 			} else f.push(c[a]);
 			b(this).data("bubbletip_tips", f);
 			return this
 		}
 	})
 })(jQuery);
 var FX = {
 	transitionend: "transitionend oTransitionEnd webkitTransitionEnd MSTransitionEnd"
 }, nextFrame = function() {
 	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(b) {
 		return setTimeout(function() {
 			b(Date.now())
 		}, 5)
 	}
 }(),
 	cancelFrame = function() {
 		return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
 	}();
 $.fn.hasPlaceholder = function() {
 	$.support.placeholder || this.each(function() {
 		var b = $(this),
 			f = b.attr("placeholder");
 		b.focus(function() {
 			b.val() == f && b.val("");
 			b.removeClass("has-placeholder")
 		}).blur(function() {
 			b.val() == "" && b.val(f).addClass("has-placeholder")
 		});
 		b.blur()
 	});
 	return this
 };
 $.fn.iPhoneSimulator = function() {
 	if (!this.length) return this;
 	var b = $(".app-content", this),
 		f = b.width(),
 		a = $(".app-slider", b).width() - f,
 		c = $(".app-scroller", this),
 		d = $(".s-thumb", this);
 	c.width();
 	var c = d.width(),
 		j = f - c,
 		k = 1,
 		p = b.scrollLeft(),
 		t = function() {
 			if (p >= a) {
 				p = b.scrollLeft();
 				clearInterval(m)
 			} else {
 				b.scrollLeft(p = p + k);
 				d.css({
 					left: Math.min(Math.ceil(p / a * j), j)
 				})
 			}
 		}, m = setInterval(t, 25);
 	b.on("mouseover", function() {
 		clearInterval(m)
 	}).on("mouseout", function() {
 		if (p == a) {
 			k = -1;
 			b.scrollLeft(p = p + k)
 		} else k = 1;
 		m = setInterval(t,
 		25)
 	});
 	return this
 };
 var getHidder = function() {
 	var b;
 	return function() {
 		if (!b) {
 			b = $("#hider");
 			b.length || (b = $('<div id="hider" style="position:absolute;left:-9999px;top:-9999px;"/>').appendTo("body"))
 		}
 		return b
 	}
 }();
 (function() {
 	var b, f, a, c, d;
 	$.extend({
 		confirm: function(j, k, p) {
 			a = p || {};
 			c = k || null;
 			if (!b) {
 				b = $('<div id="_dialog-confirm" class="dialog-confirm"><div class="message"></div><div class="action"><button class="ok">\u786e\u8ba4</button><button class="cancel">\u53d6\u6d88</button></div></div>').click(function(a) {
 					a.stopPropagation()
 				});
 				getHidder().append(b);
 				f = b.find(".message");
 				d = b.find(".cancel").click(function() {
 					$.fancybox.close()
 				});
 				b.find(".ok").click(function() {
 					c && c(true);
 					$.fancybox.close()
 				});
 				a.btnCancel === false ? d.hide() : d.show()
 			}
 			f.html(j);
 			$.fancybox({
 				padding: 0,
 				showCloseButton: false,
 				hideOnOverlayClick: false,
 				transitionIn: "none",
 				transitionOut: "none",
 				extraClass: "fancybox-confirm",
 				href: "#_dialog-confirm",
 				onClose: function() {
 					c && c(false)
 				}
 			})
 		}
 	})
 })();

 function checkButtonStatus(b, f) {
 	this.val() != "" ? b.removeClass(f).prop("disabled", false) : b.addClass(f).prop("disabled", true)
 }
 $.fn.dropMenu = function() {
 	return this.each(function() {
 		function b(c) {
 			if (!$.isClickInside(c.target, f[0])) {
 				f.removeClass(a);
 				$(document).off("click", b)
 			}
 		}
 		var f = $(this),
 			a = "open";
 		f.find(".ico-arr").click(function() {
 			if (f.hasClass(a)) f.removeClass(a);
 			else {
 				f.addClass(a);
 				$(document).click(b)
 			}
 		})
 	})
 };
 $.rails.allowAction = function(b) {
 	var f = b.data("confirm"),
 		a;
 	if (!f) return true;
 	$.rails.fire(b, "confirm") && $.confirm(f, function(c) {
 		if (a = $.rails.fire(b, "confirm:complete", [c])) {
 			c = $.rails.allowAction;
 			$.rails.allowAction = function() {
 				return true
 			};
 			b.trigger("click");
 			$.rails.allowAction = c
 		}
 	});
 	return false
 };
 $.fn.sideTips = function(b) {
 	var b = $.extend({
 		useAjax: true
 	}, b),
 		f = b.direction || "right";
 	return this.each(function() {
 		var a = $(this),
 			c = a.data("id"),
 			d, j = {}, k = {};
 		d = f === "right" ? a.outerWidth() : a.outerHeight();
 		j[f] = -(d + 15);
 		k[f] = parseInt(a.css(f));
 		a.css(f, j[f]).find(".close").click(function() {
 			a.animate(j, 300);
 			b.useAjax && $.ajax({
 				type: "POST",
 				url: "/util/cookie/" + c
 			})
 		});
 		b.handle && $(b.handle).click(function() {
 			a.animate(k, 300)
 		});
 		b.useAjax && !userCookie(c) && a.animate(k, 300)
 	})
 };
 var open_map_info_window = function() {
 	var b = {};
 	return function(f, a) {
 		if (f) {
 			var c = a.data("user-entry-index"),
 				d = b[c];
 			if (!d) {
 				d = $('<div class="map-info-window">' + $.map(f, function(a) {
 					return a ? "<div>" + a + "</div>" : ""
 				}).join("") + '<i class="close"></i></div>');
 				$(".close", d).click(function() {
 					d.hide()
 				});
 				b[c] = d;
 				$("body").append(d)
 			}
 			c = a.offset().left < WindowSize.width / 2 ? {
 				left: 40,
 				right: "auto"
 			} : {
 				left: "auto",
 				right: 40
 			};
 			d.css(c).show();
 			return d
 		}
 	}
 }(),
 	trip_thumb_gmap_callback = function() {
 		return function() {
 			var b, f;
 			$(".trip-node[data-poi-entry-index]").on("click",

 			function() {
 				var a = $(this),
 					a = Gmaps.map.markers[a.data("poi-entry-index")],
 					c = a.infowindow;
 				b && b.close();
 				f && f.hide();
 				c.open(Gmaps.map.map, a.serviceObject);
 				b = c
 			});
 			$(".trip-node").click(function() {
 				window.parent && parent.$(parent).trigger("dochaschanged", [$(this).data("hash")])
 			});
 			$(".trip-node[data-user-entry-index]").on("click", function() {
 				var a = $(this);
 				b && b.close();
 				f && f.hide();
 				f = open_map_info_window(_G_user_entries_data[a.data("user-entry-index")], a)
 			})
 		}
 	}();

 function userCookie(b) {
 	var f = window._G_current_user_cookie ? window._G_current_user_cookie.split(",") : [];
 	return _.indexOf(f, b) != -1
 }

 function likesZoomIn(b) {
 	$(window).on("note:like", function(a, c) {
 		var d = c.model,
 			f;
 		f = d.get("likes_count") || 0;
 		if (d.get("current_user_like")) {
 			f = {
 				likes_count: Math.max(f - 1, 0),
 				current_user_like: false
 			};
 			var k = b.indexOf(d);
 			$('#my-likes li[data-index="' + k + '"]').remove()
 		} else f = {
 			likes_count: f + 1,
 			current_user_like: true
 		};
 		d.set(f);
 		$.ajax({
 			url: "/trips/" + d.get("trip_id") + "/like",
 			type: "POST",
 			data: {
 				likeable_id: d.get("sid"),
 				likeable_type: TripUtils.noteServerType(c.type)
 			}
 		})
 	});
 	var f = tripshow.View.FullScreenViewer;
 	f.setCollection(b);
 	$("#my-likes a").click(function(a) {
 		a.stopPropagation()
 	});
 	$("#my-likes li").click(function() {
 		var a = $(this).data("index"),
 			a = b.at(a);
 		f.open(a)
 	});
 	$(document).keydown(function(a) {
 		var b = a.keyCode;
 		if (f.isOpened()) switch (b) {
 		case 37:
 			f.prev();
 			break;
 		case 39:
 			f.next();
 			break;
 		case 27:
 			a.preventDefault();
 			f.close();
 			break;
 		case 80:
 			f.isPlaying() ? f.stopPlay() : f.autoPlay();
 			break;
 		case 32:
 			a.preventDefault();
 			f.next()
 		}
 	})
 }
 $.fn.indexBanner = function() {
 	function b() {
 		var b = {
 			display: "block"
 		};
 		WindowSize.width > a ? $.extend(b, {
 			width: WindowSize.width,
 			height: "auto",
 			marginLeft: -Math.floor(WindowSize.width / 2) + "px"
 		}) : $.extend(b, {
 			width: a,
 			height: c,
 			marginLeft: "-800px",
 			marginTop: 0
 		});
 		f.css(b)
 	}
 	var f = this,
 		a = 1600,
 		c = 385;
 	b();
 	WindowResizeListener.add(b);
 	return this
 };
 $.fn.indexAlbums = function() {
 	function b(b, a, c, d) {
 		var j = b.scrollLeft();
 		j == 0 ? c.addClass("disabled") : c.removeClass("disabled");
 		a.width() - j <= b.width() ? d.addClass("disabled") : d.removeClass("disabled")
 	}
 	return this.each(function() {
 		$(this);
 		var f = $(".prev", this),
 			a = $(".next", this),
 			c = $(".scroller", this),
 			d = c.parent(),
 			j;
 		c.width($("article", c).length * 220);
 		b(d, c, f, a);
 		f.click(function() {
 			if (!j) {
 				j = true;
 				d.animate({
 					scrollLeft: "-=660"
 				}, 400, function() {
 					j = false;
 					b(d, c, f, a)
 				})
 			}
 		});
 		a.click(function() {
 			if (!j) {
 				j = true;
 				d.animate({
 					scrollLeft: "+=660"
 				},
 				400, function() {
 					j = false;
 					b(d, c, f, a)
 				})
 			}
 		})
 	})
 };
 (function() {
 	var b = true;
 	try {
 		document.createElement("canvas").getContext("2d")
 	} catch (f) {
 		b = false
 	}
 	$.fn.clock = function() {
 		function a(a, b, f, k) {
 			this.beginPath();
 			this.lineWidth = b;
 			a = a * Math.PI * 2 - Math.PI / 2;
 			this.moveTo(k, k);
 			this.lineTo(k + f * Math.cos(a), k + f * Math.sin(a));
 			this.closePath();
 			this.stroke()
 		}
 		if (!b) return this;
 		this.each(function() {
 			var b = $(this),
 				d = b.text();
 			if (d) try {
 				var d = d.split(":"),
 					f = parseInt(d[0], 10),
 					k = parseInt(d[1], 10),
 					f = ((f > 12 ? f - 12 : f) + k / 60) / 12,
 					k = k / 60,
 					p = document.createElement("canvas"),
 					t = p.getContext("2d");
 				$(p).attr({
 					width: 20,
 					height: 20
 				}).appendTo(b.addClass("has-clock"));
 				t.beginPath();
 				t.lineWidth = 2;
 				t.strokeStyle = "#a8a8a8";
 				t.arc(10, 10, 7, 0, Math.PI * 2, true);
 				t.closePath();
 				t.stroke();
 				a.call(t, f, 2, 4, 10);
 				a.call(t, k, 2, 5, 10)
 			} catch (m) {}
 		});
 		return this
 	}
 })();
 (function(b, f) {
 	var a, c;

 	function d(a, b) {
 		var b = b || {}, c = this,
 			d = $(a),
 			f = $('<div class="dummy">');
 		this.data = b.data || {};
 		this.$dummy = f.appendTo(d);
 		this.options = b;
 		d.on("mousedown", ".ico-remove", function(a) {
 			a.stopPropagation()
 		});
 		d.on("mousedown", ".dbox-item", function(a) {
 			var b = $(this);
 			if (!b.hasClass("is-clone")) {
 				n.onMousedown(c);
 				c.$items = d.find(".dbox-item");
 				b.on("mousemove", function() {
 					c.offset = k(a, b);
 					c.elOffset = d.offset();
 					c.limitMax = {
 						x: d.width() - b.outerWidth(),
 						y: d.height() - b.outerHeight()
 					};
 					c.createDummy(a,
 					b);
 					b.off("mousemove").off("mouseup")
 				}).on("mouseup", function() {
 					b.off("mousemove").off("mouseup")
 				})
 			}
 		});
 		this.$el = d
 	}

 	function j() {
 		function a() {
 			$.each(b.days, function() {
 				this.photos.reLayout()
 			})
 		}
 		var b = this;
 		b.days = {};
 		$(".day:not(.add-day)").each(function() {
 			b.days[this.id] = new o({
 				el: this
 			})
 		});
 		WindowResizeListener.add(a);
 		a()
 	}

 	function k(a, b) {
 		var c = $(b).offset();
 		return {
 			x: a.pageX - c.left,
 			y: a.pageY - c.top
 		}
 	}

 	function p(a, b) {
 		var b = $(b),
 			c = b.outerWidth(),
 			d = b.outerHeight(),
 			f = b.offset();
 		return a.x >= f.left && a.x <= f.left + c && a.y >= f.top && a.y <= f.top + d ? {
 			left: a.x - f.left < c / 2
 		} : false
 	}
 	var t = $(f),
 		m = $(b);
 	d.prototype = {
 		createDummy: function(a, b) {
 			this.clean();
 			var c = b.clone().css("margin", "0").addClass(".is-clone");
 			this.$dummy.empty().append(c).show();
 			this.clickItem = b.css("visibility", "hidden");
 			this.clickItemIndex = this.$items.index(b);
 			this.moveDummy(a)
 		},
 		clean: function() {
 			this.$dummy.hide();
 			if (this.clickItem && this.clickItem.length) {
 				this.clickItem.css("visibility", "visible");
 				this.clickItem = null
 			}
 		},
 		moveDummy: function(a) {
 			var b = a.pageY - this.elOffset.top - this.offset.y,
 				b = {
 					left: Math.min(Math.max(a.pageX - this.elOffset.left - this.offset.x, 0), this.limitMax.x),
 					top: Math.min(Math.max(b, 0), this.limitMax.y)
 				};
 			this.$dummy.css(b);
 			var c = {
 				x: a.pageX,
 				y: a.pageY
 			}, d = this;
 			d.$items.each(function() {
 				var a = $(this),
 					b = p(c, this);
 				if (b) {
 					if (d.clickItem[0] !== this) {
 						b.left ? a.before(d.clickItem) : a.after(d.clickItem);
 						d.$items = d.$el.find(">.dbox-item")
 					}
 					return false
 				}
 			})
 		},
 		onMouseup: function() {
 			if (this.clickItem && this.clickItem.length) {
 				var a = this.$items.index(this.clickItem);
 				this.clickItemIndex != a && this.trigger("statuschange", this, this.clickItem.data("id"), a)
 			}
 			this.clean()
 		}
 	};
 	_.extend(d.prototype, Backbone.Events);
 	var n, u;
 	n = {
 		onMousedown: function(a) {
 			u = a;
 			$(f).on("mousemove", this.onMousemove).on("mouseup", this.onMouseup)
 		},
 		onMouseup: function(a) {
 			$(f).off("mousemove", this.onMousemove).off("mouseup", this.onMouseup);
 			u && u.onMouseup(a)
 		},
 		onMousemove: function(a) {
 			u && u.moveDummy(a)
 		}
 	};
 	var r, y, x, q, w, D, C, E, F;
 	r = {
 		init: function(a) {
 			y = a;
 			t.on("photos:mousedown", function(a, b) {
 				x = b
 			})
 		},
 		onMousedown: function(b) {
 			a = b.clientX;
 			c = b.clientY;
 			t.on("mousemove", this.onMousemove).on("mouseup", this.onMouseup)
 		},
 		onMouseup: function(a) {
 			$(f).off("mousemove", this.onMousemove).off("mouseup", this.onMouseup);
 			$.clearTimer(D);
 			C = false;
 			$.clearTimer(E);
 			F = false;
 			y.clearActive();
 			if (x && x.isMousedown) {
 				y.checkDropInside(a, x);
 				q && q.remove();
 				q = null;
 				x.stopDrag();
 				x.isMousedown = false
 			}
 		},
 		onMousemove: function(d) {
 			if (x && x.isMousedown) {
 				var f = this;
 				Date.now();
 				f.mousemoveEvent = d;
 				if (!q) {
 					if (x) {
 						w = x.clickPos;
 						var j = x.getSelected(),
 							i = x.clickItem,
 							k = [];
 						q = $('<div class="dragger" unselectable="on"><div class="photos-count"></div><div class="mask"></div></div>');
 						q.find(".photos-count").text(j.length + "\u5f20");
 						$.each(j, function(d) {
 							var f, m, l = $('<div class="clone-photo">'),
 								n = $(j[d]).offset();
 							m = $(b);
 							f = n.left - m.scrollLeft();
 							m = n.top - m.scrollTop();
 							n = i[0] === j[d];
 							f = {
 								left: f - a + w.x,
 								top: m - c + w.y,
 								zIndex: n ? 1 : 0
 							};
 							d = $(j[d]).find("img").clone();
 							l.append(d);
 							l.css(f);
 							n ? k.unshift(l) : k.push(l)
 						});
 						$.each(k, function(a) {
 							q.append(k[a])
 						});
 						$("body").append(q);
 						setTimeout(function() {
 							$.each(k, function(a) {
 								var b = {
 									left: 0,
 									top: 0
 								};
 								$.support.cssAttrCheck("transform") ? k[a].css(b) : k[a].animate(b,
 								200)
 							});
 							setTimeout(function() {
 								q && q.addClass("dragger-bundled")
 							}, 100)
 						}, 0)
 					}
 					x.startDrag()
 				}
 				q.css({
 					left: d.pageX - w.x,
 					top: d.pageY - w.y
 				});
 				if (!F) {
 					F = true;
 					$.clearTimer(E);
 					E = setTimeout(function() {
 						E = setInterval(function() {
 							y.insideTest(f.mousemoveEvent)
 						}, 100)
 					}, 1E3)
 				}
 				if (!C) {
 					C = true;
 					$.clearTimer(D);
 					var n = function() {
 						if (q) {
 							var a = WindowSize.height,
 								b = m.scrollTop(),
 								c = q.offset(),
 								d;
 							if (c.top - b < 0) {
 								d = true;
 								$("html,body").animate({
 									scrollTop: "-=" + Math.ceil(a * 0.7)
 								}, {
 									duration: 500
 								})
 							} else if (b + a - c.top < 80) {
 								d = true;
 								$("html,body").animate({
 									scrollTop: "+=" + Math.ceil(a * 0.7)
 								}, {
 									duration: 500
 								})
 							}
 							if (d) {
 								$.clearTimer(D);
 								setTimeout(function() {
 									D = setInterval(n, 1E3)
 								}, 1500)
 							}
 						}
 					};
 					D = setInterval(n, 1E3)
 				}
 			}
 		}
 	};
 	var o = Backbone.View.extend({
 		initialize: function(a) {
 			Backbone.View.prototype.initialize.call(this, a);
 			var b = this;
 			b.defaultNodeId = b.$el.data("default-node-id");
 			b.dayId = b.$el.data("id");
 			b.photos = new B({
 				el: b.$el.find(".photo-list")
 			});
 			b.nodes = new K({
 				el: b.$el.find(".nodes"),
 				dayId: b.dayId
 			});
 			b.nodes.on("node:deleted", function(a, c) {
 				b.photos.unbindNode(c)
 			});
 			b.$body = b.$el.find(".container");
 			b.$el.on("mousedown.dotted", function(a) {
 				var c = $(a.target).parents();
 				if (!c.hasClass("photo") && !c.hasClass("trip-node") && !c.hasClass("header")) {
 					b._photoState = {};
 					$.each(b.photos.children(), function() {
 						var a = $(this);
 						b._photoState[a.data("note-id")] = {
 							$el: a,
 							selected: a.hasClass("selected"),
 							pos: $.extend(a.offset(), {
 								width: a.width(),
 								height: a.height()
 							})
 						}
 					});
 					t.on("mousemove.dotted", function(a) {
 						b._moveDotted(a);
 						b._selectPhoto(a)
 					}).on("mouseup.dotted", function(a) {
 						t.off("mousemove.dotted mousedown.dotted mouseup.dotted");
 						b._hideDotted(a);
 						b._photoState = null
 					});
 					b._showDotted(a)
 				}
 			});
 			b.updateNodeCount()
 		},
 		_rect: function(a, b) {
 			var c = Math.abs(a.x - b.x),
 				d = Math.abs(a.y - b.y);
 			return {
 				left: Math.min(a.x, b.x),
 				top: Math.min(a.y, b.y),
 				width: c,
 				height: d
 			}
 		},
 		_selectPhoto: function(a) {
 			var b = this._rect({
 				x: a.pageX,
 				y: a.pageY
 			}, this._dottedStartPoint);
 			$.each(this._photoState, function() {
 				var a = this.$el,
 					c = this.pos,
 					d;
 				$.each([{
 					x: c.left,
 					y: c.top
 				}, {
 					x: c.left + c.width,
 					y: c.top
 				}, {
 					x: c.left,
 					y: c.top + c.height
 				}, {
 					x: c.left + c.width,
 					y: c.top + c.height
 				}], function() {
 					var a;
 					a = this.x > b.left && this.x < b.left + b.width && this.y > b.top && this.y < b.top + b.height ? true : false;
 					if (a) {
 						d = true;
 						return false
 					}
 				});
 				d ? a.addClass("selected") : a.removeClass("selected")
 			})
 		},
 		_moveDotted: function(a) {
 			a = {
 				x: a.pageX,
 				y: a.pageY
 			};
 			$("#dotted-frame").css(this._rect(a, this._dottedStartPoint))
 		},
 		_hideDotted: function() {
 			$("#dotted-frame").hide().css({
 				top: 0,
 				left: 0,
 				width: 0,
 				height: 0
 			})
 		},
 		_showDotted: function(a) {
 			this._dottedStartPoint = {
 				x: a.pageX,
 				y: a.pageY
 			};
 			$("#dotted-frame").css({
 				left: a.pageX,
 				top: a.pageY
 			}).show()
 		},
 		clearActive: function() {
 			this.$body.removeClass("day-active");
 			this.nodes.clearActive()
 		},
 		insideTest: function(a) {
 			var b = {
 				x: a.pageX,
 				y: a.pageY
 			}, a = this.$body;
 			if (p(b, a)) {
 				b = this.nodes.insideTest(b);
 				b === false ? a.addClass("day-active") : b.addClass("trip-node-active");
 				return true
 			}
 			return false
 		},
 		dropInside: function(a, b) {
 			var c = this.$body,
 				d = {
 					x: a.pageX,
 					y: a.pageY
 				}, f = b.getSelected(),
 				k = b.getSelectedIds();
 			if (p(d, c)) {
 				var j, d = this.nodes.insideTest(d);
 				if (d !== false) {
 					j = true;
 					c = d.data("id");
 					d = d.data("name");

 					if (!c) return false;
 					b.bindNode(c, d) && this.photos.trigger("note:bound", this.dayId,
 					c, k);
 					this.updateNodeCount(true)
 				}
 				if (b !== this.photos) {
 					j || b.unbindNode();
 					this.photos.$el.prepend(f);
 					this.photos.chkPhotos();
 					b.chkPhotos();
 					j || this.photos.trigger("note:bound", this.dayId, this.defaultNodeId, k);
 					this.photos.clearSelected()
 				}
 				j && this.photos.clearSelected();
 				this.photos.stopDrag();
 				return true
 			}
 			return false
 		},
 		updateNodeCount: function(a) {
 			var b = this;
 			this.nodes.getChildren().each(function() {
 				var c = $(this),
 					d = c.data("id"),
 					d = b.photos.photosCount(d),
 					f = c.find(".count"),
 					j = parseInt(f.text());
 				isNaN(j) && (j = 0);
 				d > 0 ? f.text(d + " \u5f20").show() : f.html('<span style="color:#F7002F">\u672a\u5173\u8054\u76f8\u7247</span>').show();
 				if (a) {
 					d = d - j;
 					if (d > 0) {
 						var k = $('<div class="bubble">' + (d > 0 ? "+" : "") + d + "</div>").appendTo(c);
 						d > 0 && k.addClass("bubble-add");
 						k.animate({
 							fontSize: "50px",
 							opacity: 1
 						}, 400).animate({
 							top: "-25px",
 							fontSize: "12px"
 						}, {
 							duration: 300,
 							complete: function() {
 								k.remove()
 							}
 						})
 					}
 				}
 			})
 		}
 	}),
 		B = Backbone.View.extend({
 			initialize: function(a) {
 				Backbone.View.prototype.initialize.call(this, a);
 				var b = this;
 				b.$el.on("mousedown mouseup", ".photo .unbind-note, .photo .ico-remove", function(a) {
 					a.stopPropagation()
 				});
 				b.$el.find(".photo").on("click", ".unbind-note", function(a) {
 					a.stopPropagation();
 					var a = $(a.delegateTarget),
 						c = a.data("note-id");
 					a.find(".node-name span").empty();
 					a.find(".node-name").addClass("hidden");
 					b.trigger("note:unbound", c)
 				}).on("click", ".ico-remove", function(a) {
 					a.stopPropagation();
 					var c = $(a.delegateTarget);
 					$.confirm("\u786e\u8ba4\u5220\u9664\u8fd9\u5f20\u76f8\u7247\uff1f", function(a) {
 						if (a) {
 							a = c.data("note-id");
 							c.remove();
 							b.trigger("note:deleted", a);
 							var a = $("#photo-action .photo-num"),
 								d = a.text() - 0 || 0;
 							a.text(d - 1);
 							$("#photo-action .link-upload").show();
 							$("#photo-action .overload").hide()
 						}
 					})
 				});
 				var c;
 				this.$el.on("mousedown", ".photo", function(a) {
 					var d = $(this),
 						f = a.shiftKey;
 					t.trigger("photos:mousedown", b);
 					b.isMousedown = true;
 					b.clickItem = d;
 					b.clickPos = k(a, d);
 					d.on("mouseup", function() {
 						clearTimeout(c);
 						d.off("mousemove").off("mouseup");
 						b.isMousedown = false;
 						var a = d.data("note-id"),
 							i, j;
 						if (f && b.lastSelectPhotoId > 0) b.$el.find(".photo").removeClass("selected").each(function() {
 							var c = $(this),
 								d = c.data("note-id");
 							if (!i && (d === b.lastSelectPhotoId || d === a) && !(d === b.lastSelectPhotoId && d === a)) {
 								i = true;
 								j = d
 							}
 							if (i) {
 								c.addClass("selected");
 								if (d !== j && (d === b.lastSelectPhotoId || d === a)) return false
 							}
 						});
 						else if (d.hasClass("selected")) {
 							d.removeClass("selected");
 							b.lastSelectPhotoId = 0
 						} else {
 							d.addClass("selected");
 							b.lastSelectPhotoId = a
 						}
 					});
 					clearTimeout(c);
 					c = setTimeout(function() {
 						r.onMousedown(a);
 						d.on("mousemove", function() {
 							d.off("mousemove").off("mouseup");
 							d.hasClass("selected") || d.addClass("selected")
 						})
 					},
 					30)
 				})
 			},
 			children: function() {
 				return this.$(".photo")
 			},
 			photosCount: function(a) {
 				return this.$el.find('.photo[data-node-id="' + a + '"]').length
 			},
 			chkPhotos: function() {
 				this.$el.find(".photo").length ? this.$el.find(".no-photo").hide() : this.$el.find(".no-photo").show()
 			},
 			unbindNode: function(a) {
 				var a = a ? this.$el.find('.photo[data-node-id="' + a + '"]') : this.getSelected(),
 					b = a.length;
 				a.find(".node-name").addClass("hidden").find("span").text("");
 				return b
 			},
 			bindNode: function(a, b) {
 				var c = this.getSelected().attr("data-node-id",
 				a);
 				c.find(".node-name").removeClass("hidden").find("span").text(b);
 				return c.length
 			},
 			clearSelected: function() {
 				this.getSelected().removeClass("selected")
 			},
 			getSelected: function() {
 				return this.$el.find(".selected")
 			},
 			getSelectedIds: function() {
 				var a = [];
 				this.getSelected().each(function() {
 					a.push($(this).data("note-id"))
 				});
 				return a
 			},
 			startDrag: function() {
 				this.isDragging = true;
 				this.getSelected().addClass("mv")
 			},
 			stopDrag: function() {
 				this.isDragging = false;
 				this.$el.find(".photo").removeClass("mv")
 			},
 			reLayout: function() {
 				var a = this.$el.find(".photo");
 				if (a.length) {
 					var b = this.$el.width(),
 						c = a.eq(0).width() + 20,
 						d = Math.floor(b / c);
 					a.css({
 						"margin-left": Math.floor((b - (c - 20) * d) / (d + 1))
 					})
 				}
 			}
 		}),
 		K = Backbone.View.extend({
 			initialize: function(a) {
 				Backbone.View.prototype.initialize.call(this, a);
 				var b = this;
 				this.$addBtn = this.$el.find(".add-node");
 				this.$addBtn.find(".iframe").fancybox({
 					scrolling: "no",
 					padding: 0,
 					width: 700,
 					height: 440,
 					hideOnOverlayClick: false,
 					transitionIn: "none",
 					transitionOut: "none"
 				});
 				this.$el.on("click", ".ico-remove", function() {
 					var a = $(this).parent(".trip-node");
 					$.confirm("\u786e\u8ba4\u5220\u9664\u8fd9\u4e2a\u62cd\u6444\u5730\u70b9\uff1f", function(c) {
 						if (c) {
 							c = a.data("id");
 							b.trigger("node:deleted", b.options.dayId, c);
 							a.remove()
 						}
 					})
 				})
 			},
 			getChildren: function() {
 				return this.$el.find(".trip-node:not(.add-node)")
 			},
 			insideTest: function(a) {
 				var b = false;
 				this.$el.find(".trip-node").each(function() {
 					if (p(a, this)) {
 						b = $(this);
 						return false
 					}
 				});
 				return b
 			},
 			clearActive: function() {
 				this.$el.find(".trip-node").removeClass("trip-node-active")
 			},
 			addNode: function(a) {
 				if (!a || this.$el.find('.trip-node[data-id="' + a.id + '"]').length) return false;
 				this.$addBtn.before('<div class="dbox-item trip-node" unselectable="on" data-id="' + a.id + '" data-name="' + a.name + '"><div class="ico ' + a.type + '"></div><div class="name" unselectable="on">' + a.name + '</div><div class="count" unselectable="on"><span style="color:#F7002F">\u672a\u5173\u8054\u76f8\u7247</span></div><i class="ico-remove"></i><i class="ico-arrow"></i></div>');
 				if (_G_guide) {
 					$(".add-node:first").removeBubbletip([$("#no-node")]);
 					setTimeout(function() {
 						$(".trip-node:not(.add-node):first").bubbletip($("#first-add-node"), {
 							alwayShow: true,
 							deltaDirection: "top"
 						})
 					}, 500);
 					_G_guide = false
 				}
 			}
 		});
 	j.prototype = {
 		checkDropInside: function(a, b) {
 			$.each(this.days, function() {
 				if (this.dropInside(a, b)) return false
 			})
 		},
 		insideTest: function(a) {
 			this.clearActive();
 			$.each(this.days, function() {
 				if (this.insideTest(a)) return false
 			})
 		},
 		clearActive: function() {
 			$.each(this.days, function() {
 				this.clearActive()
 			})
 		},
 		getDay: function(a) {
 			return this.days[a]
 		}
 	};
 	b.tripDaysInit = function(a) {
 		function b() {
 			$(".trip-node:not(.add-node):first").removeBubbletip([$("#first-add-node")])
 		}
 		setUnselectable($("body"), "on");
 		$("body").on("mousedown", "img", function(a) {
 			a.preventDefault()
 		});
 		var c = new j;
 		r.init(c);
 		$.each(c.days, function() {
 			this.photos.on("note:unbound", function(b) {
 				$.ajax({
 					type: "PUT",
 					url: "/trips/" + a + "/notes/" + b + "/unbind"
 				})
 			});
 			this.photos.on("note:deleted", function(b) {
 				$.ajax({
 					type: "DELETE",
 					url: "/trips/" + a + "/notes/" + b
 				})
 			});
 			this.photos.on("note:bound", function(c, d, f) {
 				b();
 				$.ajax({
 					type: "PUT",
 					url: "/trips/" + a + "/trip_days/" + c + "/nodes/" + d + "/bind_notes",
 					data: {
 						note_ids: f
 					}
 				})
 			});
 			this.nodes.on("node:deleted", function(c, d) {
 				b();
 				$.ajax({
 					type: "DELETE",
 					url: "/trips/" + a + "/trip_days/" + c + "/nodes/" + d
 				})
 			})
 		});
 		$(".dbox").each(function() {
 			var b = new d(this),
 				c = $(this).data("id");
 			b.on("statuschange", function(b, d, f) {
 				$.ajax({
 					type: "PUT",
 					url: "/trips/" + a + "/trip_days/" + c + "/nodes/" + d,
 					data: {
 						position: f
 					}
 				})
 			})
 		});
 		$(window).on("node:added", function(a, b, d) {
 			var f = c.getDay("day-" + b);
 			f && $.each(d, function(a) {
 				f.nodes.addNode(d[a])
 			})
 		})
 	}
 })(window,
 document);
 $.fn.tabable = function(b) {
 	b = b || {};
 	this.each(function() {
 		function f(a) {
 			c.removeClass(b.currentClass).eq(a).addClass(b.currentClass);
 			d.hide().eq(a).show()
 		}
 		var a = $(this),
 			c = a.find(b.nav),
 			d = a.find(b.contents);
 		c.each(function(a) {
 			$(this).click(function() {
 				f(a);
 				return false
 			})
 		});
 		f(0)
 	})
 };
 var NodeAddManager;
 (function(b, f) {
 	$(b);
 	$(f);
 	var a, c, d = [];
 	NodeAdderManager = {
 		add: function(a) {
 			d.push(a)
 		},
 		getSelected: function() {
 			var a = [];
 			$.each(d, function() {
 				a = a.concat(this.getSelected())
 			});
 			return a
 		}
 	};
 	$.fn.isNodeAdder = function() {
 		this.each(function() {
 			var a = $(this),
 				b = a.find(".search-panel"),
 				c = !! b.length,
 				d, f = new k({
 					el: a.find(".add-panel"),
 					searchBar: c
 				});
 			if (c) {
 				d = new j({
 					el: b
 				});
 				d.on("node:createnew", function(a) {
 					f.$key.val(a).focus();
 					f.$el.show();
 					b.hide()
 				}).on("node:remove", function(a, b) {
 					f.del(b)
 				});
 				NodeAdderManager.add(d)
 			}
 			NodeAdderManager.add(f);
 			f.on("node:created node:createcancel", function(a) {
 				if (c) {
 					b.show();
 					f.$el.hide();
 					d.hideResult();
 					a && d.insert(0, a)
 				}
 			})
 		});
 		return this
 	};
 	var j = Backbone.View.extend({
 		initialize: function(b) {
 			Backbone.View.prototype.initialize.call(this, b);
 			var d = this,
 				b = this.$el,
 				f = this.$key = b.find(".key"),
 				k = this.$results = b.find(".search-results");
 			this.$searchBar = b.find(".search-bar");
 			this.$nearby = b.find(".nearby");
 			this.$nearbyList = this.$nearby.find(".nearby-list");
 			this.type = b.find('input[name="type"]').val();
 			this.repository = {};
 			this.selected = [];
 			var j = {}, r, y;
 			this.$nearbyList.on("click", ".trip-node", function() {
 				d.add($(this).data("id"))
 			});
 			b.find(".inputer").click(function() {
 				f.focus()
 			});
 			b.on("click", ".added .ico", function() {
 				var a = $(this).parent(),
 					b = a.data("id");
 				b > 0 ? d.del(b) : d.trigger("node:remove", 0, a.data("name"));
 				a.remove()
 			});
 			k.on("click", ".item", function() {
 				$(this).addClass("current");
 				d.selectCurrent()
 			}).on("click", ".create", function() {
 				d.trigger("node:createnew", y);
 				f.val("")
 			});
 			f.keydown(function(a) {
 				switch (a.keyCode) {
 				case 38:
 					d.prevItem();
 					break;
 				case 40:
 					d.nextItem();
 					break;
 				case 13:
 					a.preventDefault();
 					d.selectCurrent();
 					break;
 				case 27:
 					a.preventDefault();
 					a.stopPropagation();
 					f.val("")
 				}
 			}).focus(function() {
 				clearInterval(r);
 				r = setInterval(function() {
 					var b = $.trim(f.val());
 					if (y != b) if (y = b) {
 						d.currentKey = y;
 						if (j[y]) {
 							d.parseData(j[y]);
 							d.positionResults()
 						} else {
 							b = {
 								q: y,
 								entry_type: d.type
 							};
 							if (c && a) {
 								b.last_entry_type = a;
 								b.last_entry_id = c
 							}
 							$.ajax({
 								url: _G_search_url,
 								type: "GET",
 								dataType: "json",
 								data: b,
 								success: function(a) {
 									if (a && a.q) {
 										j[a.q] = a.entries;
 										if (a.q == y) {
 											d.parseData(a.entries);
 											d.positionResults()
 										}
 									}
 								}
 							})
 						}
 					} else d.parseData(null)
 				}, 20)
 			}).blur(function() {
 				clearInterval(r)
 			})
 		},
 		getSelected: function() {
 			var a = [],
 				b = this;
 			$.each(this.selected, function(c) {
 				a.push({
 					entry_type: b.type,
 					entry_id: b.selected[c]
 				})
 			});
 			return a
 		},
 		selectCurrent: function() {
 			var b = this.$results.find(".current");
 			if (b.length) if (b.hasClass("create")) {
 				this.trigger("node:createnew", this.$key.val());
 				this.$key.val("")
 			} else {
 				b = b.data("id");
 				this.add(b);
 				this.hideResult();
 				this.$key.val("");
 				c = b;
 				a = this.type;
 				this.getNearby(b)
 			}
 		},
 		prevItem: function() {
 			var a = this.$results.find("li");
 			if (this.$currentItem) {
 				this.$currentItem.removeClass("current");
 				var b = this.$currentItem.prev();
 				this.$currentItem = b.length ? b.addClass("current") : a.last().addClass("current")
 			} else this.$currentItem = a.last().addClass("current");
 			this._autoScroll()
 		},
 		nextItem: function() {
 			var a = this.$results.find("li");
 			if (this.$currentItem) {
 				this.$currentItem.removeClass("current");
 				var b = this.$currentItem.next();
 				this.$currentItem = b.length ? b.addClass("current") : a.eq(0).addClass("current")
 			} else this.$currentItem = a.eq(0).addClass("current");
 			this._autoScroll()
 		},
 		_autoScroll: function() {
 			var a = this.$currentItem.parent(),
 				b = this.$currentItem.position(),
 				c = a.height(),
 				d = a.scrollTop(),
 				f = this.$currentItem.outerHeight();
 			(b.top < 0 || b.top + f >= c) && a.animate({
 				scrollTop: d + (b.top - c + f)
 			}, {
 				duration: 100
 			})
 		},
 		hideResult: function() {
 			this.$results.hide().find("ul").html("")
 		},
 		add: function(a) {
 			if ((a = this.repository[a]) && _.indexOf(this.selected, a.id) < 0) {
 				this.selected.push(a.id);
 				this.insert(a.id, a.name_zh_cn)
 			}
 		},
 		del: function(a) {
 			this.selected = _.without(this.selected, a)
 		},
 		insert: function(a, b) {
 			this.$key.before('<span data-id="' + (a || 0) + '" data-name="' + b + '" class="added"><span>' + b + '</span><i class="ico"></i></span>')
 		},
 		positionResults: function() {
 			var a = this.$searchBar.outerHeight();
 			this.$results.css({
 				top: a
 			})
 		},
 		parseData: function(a) {
 			if (a) {
 				var b = "",
 					c = this;
 				$.each(a, function() {
 					b = b + ('<li class="item" data-id="' + this.id + '">' + this.name_zh_cn + (this.name_alias ? "(" + this.name_alias + ")" : "") + ", " + this.destination + "</li>");
 					c.repository[this.id] || (c.repository[this.id] = this)
 				});
 				b = b + ('<li class="create">+ \u521b\u5efa \u201c' + this.currentKey + "\u201d</li>");
 				this.$results.show().find("ul").html(b).scrollTop(0)
 			} else this.hideResult()
 		},
 		getNearby: function(a) {
 			var b = this;
 			b.$nearbyList.html("").addClass("loading");
 			b.$nearby.show();
 			$.ajax({
 				url: _G_nearby_url,
 				type: "GET",
 				data: {
 					entry_type: this.type,
 					q: a
 				},
 				success: function(a) {
 					b.parseNearby(a)
 				}
 			})
 		},
 		parseNearby: function(a) {
 			if (a && a.length) {
 				var b = "",
 					c = this;
 				$.each(a, function() {
 					b = b + ('<li class="trip-node" data-id="' + this.id + '"><i class="ico attraction"></i><span class="name">' + this.name_zh_cn + "</span></li>");
 					c.repository[this.id] || (c.repository[this.id] = this)
 				});
 				this.$nearbyList.removeClass("loading").html(b)
 			} else this.$nearby.hide()
 		}
 	}),
 		k = Backbone.View.extend({
 			initialize: function(a) {
 				Backbone.View.prototype.initialize.call(this, a);
 				var b = this,
 					c = this.$el,
 					d = this.$key = c.find("input.key"),
 					f = this.$btnOk = c.find(".ok"),
 					j = this.$btnCancel = c.find(".cancel");
 				this.type = c.find('input[name="type"]').val();
 				this.added = [];
 				if (!a.searchBar) c.on("click", ".added .ico", function() {
 					var a = $(this).parent();
 					a.remove();
 					b.del(a.data("name"))
 				});
 				c.find(".inputer").click(function() {
 					d.focus()
 				});
 				j.click(function() {
 					b.trigger("node:createcancel");
 					d.val("");
 					return false
 				});
 				d.keydown(function(a) {
 					a.keyCode === 13 && b._enter()
 				});
 				f.click(function() {
 					b._enter()
 				})
 			},
 			_enter: function() {
 				var a = this.$key.val();
 				if (a != this.$key.attr("placeholder")) {
 					if ($.getByteLen(a) > 28) {
 						this.$key.showErrorTips();
 						return false
 					}
 					if (a) {
 						this.add(a);
 						this.trigger("node:created", a, this.type)
 					}
 					this.$key.val("")
 				}
 			},
 			getSelected: function() {
 				this._enter();
 				var a = [],
 					b = this;
 				$.each(this.added, function(c) {
 					a.push({
 						user_entry: true,
 						entry_type: b.type,
 						name: b.added[c]
 					})
 				});
 				return a
 			},
 			add: function(a) {
 				if (_.indexOf(this.added, a) < 0) {
 					this.added.push(a);
 					this.options.searchBar || this.$key.before('<span class="added" data-name="' + a + '"><span>' + a + '</span><i class="ico"></i></span>')
 				}
 			},
 			del: function(a) {
 				this.added = _.without(this.added, a)
 			}
 		})
 })(window, document);
 $.fn.score = function(b) {
 	b = b || {};
 	this.each(function() {
 		var f = $(this),
 			a = f.find("a.checked"),
 			c = f.find("a");
 		c.removeClass("checked");
 		b.score > 0 && (a = c.eq(b.score - 1).addClass("checked"));
 		b.receiver && $(b.receiver).val(b.score || 0);
 		if (f.data("score-inited")) return false;
 		c.each(function(c) {
 			var f = $(this);
 			f.on("click", function() {
 				a && a.removeClass("checked");
 				a = f.addClass("checked");
 				b.receiver && $(b.receiver).val(c + 1);
 				return false
 			})
 		});
 		f.data("score-inited", true)
 	});
 	return this
 };
 var TripUnitTest = {
 	validsize: function(b) {
 		return "width" in b && "height" in b && "left" in b && "top" in b
 	}
 }, tripshow = {
 	View: {
 		TripShow: function() {
 			return {
 				init: function() {
 					this.$logo = $(".logo");
 					this.$topMenu = $(".show-top-menu");
 					this.$moreLink = $(".more-travels");
 					this.$header = $(".cover-header");
 					this.$thumb = $("#open-trips")
 				},
 				openMode: function(b) {
 					var f = this;
 					if (f.mode !== b) {
 						switch (b) {
 						case "trainView":
 							$("body").addClass("mode-train-view");
 							$.support.cssAttrCheck("transition") || f.$logo.animate({
 								top: "-=200"
 							}, 300, function() {
 								f.$logo.css({
 									top: "auto",
 									bottom: 12
 								})
 							});
 							break;
 						case "editCoverPhoto":
 							$("body").addClass("edit-cover");
 							if (!$.support.cssAttrCheck("transition")) {
 								this.$logo.animate({
 									top: "-=200"
 								}, 300);
 								this.$topMenu.animate({
 									top: "-=200"
 								}, 300);
 								this.$moreLink.animate({
 									right: "-=500"
 								}, 300);
 								this.$thumb.animate({
 									left: "+=300"
 								}, 300)
 							}
 						}
 						this.mode = b
 					}
 				},
 				closeMode: function(b) {
 					var f = this;
 					switch (b) {
 					case "trainView":
 						$("body").removeClass("mode-train-view");
 						$.support.cssAttrCheck("transition") || f.$logo.animate({
 							bottom: "-=200"
 						}, 300, function() {
 							f.$logo.css({
 								top: 10,
 								bottom: "auto"
 							})
 						});
 						break;
 					case "editCoverPhoto":
 						$("body").removeClass("edit-cover");
 						if (!$.support.cssAttrCheck("transition")) {
 							this.$logo.animate({
 								top: "+=200"
 							}, 300);
 							this.$topMenu.animate({
 								top: "+=200"
 							}, 300);
 							this.$moreLink.animate({
 								right: "+=500"
 							}, 300);
 							this.$thumb.animate({
 								left: "-=300"
 							}, 300)
 						}
 					}
 					this.mode = null
 				}
 			}
 		}()
 	}
 };
 (function(b) {
 	var f = [
 		["\u4eba\u6c11\u5e01", "CNY", "\u5143"],
 		["\u7f8e\u5143", "USD", "\u7f8e\u5143"],
 		["\u6b27\u5143", "EUR", "\u6b27\u5143"],
 		["\u82f1\u9551", "GBP", "\u82f1\u9551"],
 		["\u65e5\u5143", "JPY", "\u65e5\u5143"],
 		["\u6e2f\u5e01", "HKD", "\u6e2f\u5e01"],
 		["\u6cf0\u94e2", "THB", "\u6cf0\u94e2"],
 		["\u97e9\u5143", "KRW", "\u97e9\u5143"],
 		["\u65b0\u53f0\u5e01", "TWD", "\u53f0\u5e01"],
 		["\u65b0\u52a0\u5761\u5143", "SGD", "\u65b0\u5e01"],
 		["\u5362\u5e03", "RUB", "\u5362\u5e03"],
 		["\u6fb3\u5143", "AUD", "\u6fb3\u5143"],
 		["\u65b0\u897f\u5170\u5143", "NZD", "\u7ebd\u5e01"],
 		["\u5370\u5c3c\u76fe", "IDR", "\u5362\u6bd4"],
 		["\u9a6c\u6765\u897f\u4e9a\u5143", "MYR", "MYR"],
 		["\u6fb3\u95e8\u5143", "MOP", "\u8461\u5e01"],
 		["\u745e\u58eb\u6cd5\u90ce", "CHF", "\u745e\u90ce"],
 		["\u5370\u5ea6\u5362\u6bd4", "INR", "\u5362\u6bd4"],
 		["\u5357\u975e\u5170\u7279", "ZAR", "\u5170\u7279"],
 		["\u57c3\u53ca\u9551", "EGP", "\u57c3\u9551"],
 		["\u83f2\u5f8b\u5bbe\u6bd4\u7d22", "PHP", "\u6bd4\u7d22"],
 		["\u963f\u6839\u5ef7\u6bd4\u7d22", "ARS", "\u6bd4\u7d22"],
 		["\u51b0\u5c9b\u514b\u6717", "ISK", "\u514b\u6717"],
 		["\u4e39\u9ea6\u514b\u6717", "DKK", "\u514b\u6717"],
 		["\u798f\u6797", "HUF", "\u798f\u6797"],
 		["\u54e5\u4f26\u6bd4\u4e9a\u6bd4\u7d22", "COP", "\u6bd4\u7d22"],
 		["\u6377\u514b\u514b\u6717", "CZK", "\u514b\u6717"],
 		["\u52a0\u5143", "CAD", "\u52a0\u5143"],
 		["\u80af\u5c3c\u4e9a\u5148\u4ee4", "KES", "\u5148\u4ee4"],
 		["\u96f7\u4e9a\u5c14", "BRL", "BRL"],
 		["\u5217\u4f0a", "RON", "\u5217\u4f0a"],
 		["\u62c9\u83f2\u4e9a", "MVR", "MVR"],
 		["\u58a8\u897f\u54e5\u6bd4\u7d22", "MXN", "\u6bd4\u7d22"],
 		["\u6bdb\u91cc\u6c42\u65af\u5362\u6bd4", "MUR", "\u5362\u6bd4"],
 		["\u5c3c\u6cca\u5c14\u5362\u6bd4", "NPR", "\u5362\u6bd4"],
 		["\u632a\u5a01\u514b\u6717", "NOK", "\u514b\u6717"],
 		["\u745e\u5178\u514b\u6717", "SEK", "\u514b\u6717"],
 		["\u745e\u5c14", "KHR", "\u745e\u5c14"],
 		["\u65af\u91cc\u5170\u5361\u5362\u6bd4", "LKR", "\u5362\u6bd4"],
 		["\u571f\u8033\u5176\u65b0\u91cc\u62c9", "TRY", "\u91cc\u62c9"],
 		["\u65b0\u7d22\u5c14", "PEN", "\u7d22\u5c14"],
 		["\u8d8a\u5357\u76fe", "VND", "\u76fe"],
 		["\u667a\u5229\u6bd4\u7d22", "CLP", "\u6bd4\u7d22"],
 		["\u5179\u7f57\u63d0", "PLN", "PLN"]
 	],
 		a;
 	b.TripUtils = {
 		resizeCount: 0,
 		getNoteHash: function(a) {
 			var b = tripshow.View.Note.NOTE_TYPE,
 				f = false;
 			if (a) {
 				var k = a.model.get("sid");
 				switch (a.type) {
 				case b.DAY:
 					f = "day/" + k;
 					break;
 				case b.NODE:
 					f = "nd/" + k;
 					break;
 				case b.TEXT:
 				case b.PHOTO:
 					f = "nt/" + k;
 					break;
 				case b.THEEND:
 				case b.TIPS:
 					f = "end"
 				}
 			}
 			return f
 		},
 		getPriceLabel: function(a) {
 			switch (a) {
 			case "Attraction":
 				return "\u95e8\u7968";
 			case "Restaurant":
 				return "\u4eba\u5747";
 			case "Hotel":
 				return "\u623f\u95f4"
 			}
 		},
 		PriceCurrencyManager: {
 			lastPriceCurrency: "CNY",
 			optionString: function() {
 				if (!a) {
 					var b = "";
 					$.each(f, function(a) {
 						b = b + ('<option value="' + f[a][1] + '">' + f[a][0] + "</option>")
 					});
 					a = b
 				}
 				return a
 			},
 			getName: function(a) {
 				var b = "";
 				$.each(f, function(j) {
 					j = f[j];
 					if (j[1] === a) {
 						b = j[2] || j[1];
 						return false
 					}
 				});
 				return b
 			}
 		},
 		noteServerType: function(a) {
 			var b = tripshow.View.Note.NOTE_TYPE;
 			switch (a) {
 			case b.PHOTO:
 			case b.TEXT:
 				return "note";
 			case b.NODE:
 				return "node";
 			case b.TIPS:
 				return "tip"
 			}
 			return a
 		}
 	}
 })(window);
 (function(b, f, a) {
 	var c = a(f),
 		d = a(b);
 	a.support.cssAttrCheck("transition");
 	var j = TripUtils.PriceCurrencyManager,
 		k = "ontouchstart" in b,
 		p = window.devicePixelRatio && window.devicePixelRatio > 1;
 	NO_PHOTO_NOTE_WIDTH_RATIO = 12 / 17;
 	NO_PHOTO_FULL_NOTE_MAX_WIDTH = 500;
 	FONT_SIZE_MAX = 36;
 	FONT_SIZE_MIN = 14;
 	textNoteFontSize = screen.width < 1440 ? 14 : screen.width <= 1680 ? 16 : 18;
 	MEMO_TEMPLATE = {
 		price_amount: "<span>{label}{price_amount}{price_currency}</span>",
 		food: "<span>\u63a8\u8350\u7f8e\u98df\uff1a{food}</span>",
 		time: "<span>\u6e38\u89c8{time}{time_unit}</span>"
 	};
 	windowMaxHeight = screen.height - (screen.height - WindowSize.height);
 	View = {};
 	var t = {
 		DAY: "day",
 		NODE: "node",
 		TEXT: "text",
 		PHOTO: "photo",
 		THEEND: "theend",
 		TIPS: "tips"
 	};
 	View.FullNote = Backbone.View.extend({
 		initialize: function(a) {
 			Backbone.View.prototype.initialize.call(this, a);
 			var b = this;
 			this.$content = this.$el.find(".note-content");
 			this._findFooter();
 			this.model.on("change", function(a) {
 				a.hasChanged("likes_count") || a.hasChanged("comments_count") ? b.renderMeta() : b.render()
 			})
 		},
 		_findFooter: function() {
 			var a = this;
 			a.$footer = a.$el.find(".note-footer");
 			a.$like = a.$footer.find(".like").touchClick(function() {
 				d.trigger("note:like", [a])
 			});
 			a.$comment = a.$footer.find(".comment").touchClick(function(b) {
 				var c = a.$comment[0];
 				b.type = "note:comments";
 				b.srcElement = c;
 				d.trigger(b, [a, a.type]);
 				b.stopPropagation()
 			});
 			var b = a.$footer.find("time"),
 				c = a.model.get("datetime");
 			c ? b.text(c).clock() : b.hide()
 		},
 		render: function() {
 			this.renderMeta()
 		},
 		renderMeta: function() {
 			if (this.$like.length) {
 				this.$like.find("span").text(this.model.get("likes_count"));
 				this.$comment.find("span").text(this.model.get("comments_count"));
 				this.model.get("current_user_like") ? this.$like.addClass("liked") : this.$like.removeClass("liked");
 				this.model.get("current_user_comment") ? this.$comment.addClass("commented") : this.$comment.removeClass("commented")
 			}
 		},
 		position: function() {},
 		close: function() {
 			this.$el.hide()
 		}
 	});
 	View.FullDay = View.FullNote.extend({
 		initialize: function(b) {
 			this.$el = a(a("#_tpl_full_note_day").html());
 			this.type = t.DAY;
 			View.FullNote.prototype.initialize.call(this, b)
 		},
 		render: function() {
 			var b = this.$el;
 			a(".day-index", b).text("\u7b2c" + this.model.get("day") + "\u5929");
 			a(".day-date", b).text(this.model.get("trip_date") || "");
 			var c = this.model.get("day_of_week"),
 				b = a(".day-week", b).text(c ? "\u661f\u671f" + c : ""),
 				c = this.model.get("weather");
 			c != void 0 && b.after('<div class="day-weather"><div class="ico-weather-' + c + '"></div>' + this.model.get("temperature") + "</div>")
 		},
 		position: function() {
 			var a = WindowSize.height - 40,
 				b = a / 7 * 5;
 			this.$el.css({
 				left: Math.ceil((WindowSize.width - b) / 2),
 				top: 20,
 				width: b,
 				height: a
 			})
 		}
 	});
 	View.FullTheEnd = View.FullNote.extend({
 		initialize: function(b) {
 			this.$el = a(a("#_tpl_full_theend").html());
 			this.type = t.THEEND;
 			View.FullNote.prototype.initialize.call(this, b)
 		},
 		render: function() {},
 		position: function() {
 			var a = WindowSize.height - 40,
 				b = a / 7 * 5;
 			this.$el.css({
 				left: Math.ceil((WindowSize.width - b) / 2),
 				top: 20,
 				width: b,
 				height: a
 			})
 		}
 	});
 	View.FullPhotoNote = View.FullNote.extend({
 		initialize: function(b) {
 			var c = this;
 			c.type = t.PHOTO;
 			c.$el = a(a("#_tpl_full_note_photo").html());
 			c.$photo = c.$el.find(".photo");
 			c.$description = c.$el.find(".desc");
 			c.$btnSlide = c.$el.find(".slide-up").click(function() {
 				var b = a(this);
 				if (b.hasClass("slide-down")) {
 					c._closeDescription();
 					b.removeClass("slide-down")
 				} else {
 					c._openDescription();
 					b.addClass("slide-down")
 				}
 			});
 			c.photoSrc();
 			c.descriptionFullDisplayed = true;
 			var d = c.model;
 			d.on("change", function() {
 				if (d.hasChanged("photo")) {
 					c.photoSrc();
 					c.$photo.attr("src", c.src)
 				}
 			});
 			View.FullNote.prototype.initialize.call(this, b)
 		},
 		photoSrc: function() {
 			var b = this.model.get("photo"),
 				c = b.src,
 				d = b.width / b.height,
 				f, k = Math.max(WindowSize.height, windowMaxHeight);
 			p && (k = k * 2);
 			a.each([{
 				size: 800,
 				alias: ""
 			}, {
 				size: 1024,
 				alias: "-display_g"
 			}, {
 				size: 1280,
 				alias: "-display_gg"
 			}, {
 				size: 1600,
 				alias: ""
 			}], function(a, b) {
 				if ((d < 1 ? b.size : b.size / d) - k > -20) {
 					f = b.size;
 					c = c + b.alias;
 					return false
 				}
 			});
 			if (f) if (d > 1) {
 				this.photoWidth = f;
 				this.photoHeight = f / d
 			} else {
 				this.photoWidth = f * d;
 				this.photoHeight = f
 			} else {
 				this.photoWidth = b.width;
 				this.photoHeight = b.height
 			}
 			this.src = c
 		},
 		render: function() {
 			var a = this;
 			a.$photo.load(function() {
 				a.$photo.addClass("noloading").off("load")
 			}).attr("src",
 			this.src);
 			var b = this.model.get("description");
 			if (b) {
 				this.$description.find("p").html(b);
 				this.$description.show()
 			} else this.$description.hide();
 			View.FullNote.prototype.render.call(a)
 		},
 		position: function() {
 			var b = WindowSize.width,
 				c = WindowSize.height,
 				d = this.$footer.outerHeight(),
 				f = this.photoWidth,
 				j = this.photoHeight,
 				p = Math.max(b - (k ? 40 : 300), 300),
 				t = c - d - 40;
 			if (f < p && j < t) f = {
 				width: f,
 				height: j
 			};
 			else var w = Math.max(j / t, f / p),
 				f = {
 					width: f / w,
 					height: j / w
 				};
 			f.width = Math.floor(Math.min(f.width, p));
 			f.height = Math.floor(Math.min(f.height,
 			t));
 			this.$photo.css(f);
 			f.height = f.height + d;
 			this.$el.css(a.extend(f, {
 				left: Math.floor((b - f.width) / 2),
 				top: Math.floor((c - f.height) / 2)
 			}));
 			this.descriptionEvent()
 		},
 		descriptionEvent: function() {
 			var b = this,
 				c = this.$description;
 			if (!this._descEventListened && c.is(":visible")) {
 				var d = c.find("p").height(),
 					f = a(".slide-down", c).show();
 				c.addClass("slidable").touchClick(function() {
 					if (b.descriptionFullDisplayed) {
 						c.animate({
 							bottom: 35 - d - 4
 						}, 200, function() {
 							f.addClass("slide-up")
 						});
 						b.descriptionFullDisplayed = false
 					} else {
 						c.animate({
 							bottom: 35
 						},
 						200, function() {
 							f.removeClass("slide-up")
 						});
 						b.descriptionFullDisplayed = true
 					}
 				});
 				this._descEventListened = true
 			} else if (!c.is(":visible")) {
 				c.off("click").removeClass("slidable");
 				this._descEventListened = false
 			}
 		},
 		close: function() {
 			View.FullNote.prototype.close.call(this)
 		}
 	});
 	View.FullTextNote = View.FullNote.extend({
 		initialize: function(b) {
 			this.type = t.TEXT;
 			this.$el = a(a("#_tpl_full_note_text").html());
 			this.$text = this.$el.find(".note-text");
 			this.$textWrapper = this.$text.parent();
 			this.$textWrapper.scrollbar({
 				type: "ver"
 			});
 			View.FullNote.prototype.initialize.call(this, b)
 		},
 		render: function() {
 			var a = this.model.get("description_display") || this.model.get("description");
 			this.$text.html(a);
 			View.FullNote.prototype.render.call(this)
 		},
 		position: function() {
 			var a = WindowSize.width,
 				b = WindowSize.height,
 				c = this.$footer.outerHeight(),
 				b = b - 40,
 				d = Math.ceil(b / 7 * 6),
 				c = b - c;
 			this.$el.css({
 				left: Math.ceil((a - d) / 2),
 				top: 20,
 				width: d,
 				height: b
 			});
 			this.$textWrapper.css({
 				width: d,
 				height: c
 			});
 			var a = this.$text.outerWidth(),
 				f = this.$text.outerHeight();
 			f > c && this.$textWrapper.scrollbar().refresh();
 			this.$text.css({
 				marginLeft: Math.ceil((d - a) * 0.5),
 				marginTop: Math.ceil(Math.max(b - f, 0) * 0.5)
 			})
 		}
 	});
 	View.FullTips = View.FullNote.extend({
 		initialize: function(b) {
 			this.type = t.TIPS;
 			var c = this.$el = a(a("#_tpl_full_tips").html());
 			this.$items = a(".tip-items", c);
 			this.$itemsWrapper = a(".tip-items-wrapper", c);
 			this.$tipsContent = a(".tips-content", c);
 			this.$tipsHeader = a(".tips-header", c);
 			this.$itemsWrapper.scrollbar({
 				type: "ver"
 			});
 			View.FullNote.prototype.initialize.call(this, b)
 		},
 		render: function() {
 			var b = this.model.get("tips") || [],
 				c = "";
 			if (b.length) {
 				a.each(b, function(a) {
 					c = c + ("<li>" + b[a] + "</li>")
 				});
 				this.$items.html(c).show()
 			} else this.$items.hide();
 			View.FullNote.prototype.render.call(this)
 		},
 		position: function() {
 			var a = WindowSize.width,
 				b = WindowSize.height - 40,
 				c = Math.ceil(b * 0.7),
 				d = this.$tipsHeader.height(),
 				f = b - d - 40,
 				k = 0;
 			this.$el.css({
 				left: Math.ceil((a - c) * 0.5),
 				top: 20,
 				width: c,
 				height: b
 			});
 			if (this.$items.is(":visible")) {
 				k = this.$items.height();
 				if (k > f) {
 					this.$itemsWrapper.css({
 						height: f
 					});
 					this.$itemsWrapper.scrollbar().refresh()
 				}
 			}
 			a = Math.min(k,
 			f) + d;
 			this.$tipsContent.css("margin-top", (b - a) * 0.33)
 		}
 	});
 	View.FullNode = View.FullNote.extend({
 		initialize: function(b) {
 			this.type = t.NODE;
 			this.$el = a(a("#_tpl_full_node").html());
 			this.$nodeContent = this.$el.find(".node-content");
 			View.FullNote.prototype.initialize.call(this, b)
 		},
 		render: function() {
 			View.FullNote.prototype.render.call(this);
 			var a = this.model,
 				b = "",
 				c = a.get("entry"),
 				d = a.get("memo");
 			this.$el.find(".ico").addClass("ico-" + c.type.toLowerCase());
 			this.$el.find(".node-name").html(c.name_zh_cn);
 			this.$el.find(".node-name-en").html(c.name_en || "");
 			if (d.price_amount || d.time) {
 				var c = '<div class="memo"><span class="memo-inner">',
 					f = a.get("entry").type;
 				if (d.price_amount) {
 					c = c + MEMO_TEMPLATE.price_amount;
 					c = c.replace("{price_amount}", d.price_amount).replace("{price_currency}", j.getName(d.price_currency)).replace("{label}", TripUtils.getPriceLabel(f))
 				}
 				d.price_amount && d.time && (c = c + '<span class="space">|</span>');
 				if (d.time) {
 					c = c + MEMO_TEMPLATE.time;
 					c = c.replace("{time}", d.time).replace("{time_unit}", d.time_unit && d.time_unit == "day" ? "\u5929" : "\u5c0f\u65f6")
 				}
 				b = b + (c + "</span></div>")
 			}
 			a.get("score") > 0 && (b = b + ('<div class="single-row"><span class="attr">\u6211\u7684\u8bc4\u4ef7\uff1a</span><span class="val"><span class="star-score"><i class="star-score-' + a.get("score") + '"></i></span></span></div>'));
 			a.get("comment") && (b = b + ('<div class="node-description">' + a.get("comment") + "</div>"));
 			this.$nodeContent.css({
 				height: "auto"
 			}).find(".node-info").html(b)
 		},
 		position: function() {
 			var a = WindowSize.width,
 				b = WindowSize.height - 40,
 				c = Math.ceil(b / 7 * 5);
 			this.$el.css({
 				left: Math.ceil((a - c) / 2),
 				top: 20,
 				width: c,
 				height: b
 			});
 			this.$nodeContent.css({
 				width: "auto",
 				height: "auto",
 				marginTop: 0,
 				marginLeft: 0,
 				overflow: "visible"
 			});
 			var d = this.$nodeContent.outerWidth(),
 				a = this.$nodeContent.outerHeight(),
 				d = Math.min(d, c),
 				f = Math.min(a, b),
 				d = Math.min(d, 500),
 				c = {
 					width: d - 40,
 					height: f - 40,
 					marginLeft: Math.ceil((c - d) / 2),
 					marginTop: Math.ceil((b - f) * 0.33)
 				};
 			if (a > b) {
 				c.overflow = "hidden";
 				c.overflowY = "auto"
 			}
 			this.$nodeContent.css(c)
 		}
 	});
 	View.Note = Backbone.View.extend({
 		initialize: function(a) {
 			Backbone.View.prototype.initialize.call(this,
 			a);
 			var b = this,
 				c = this.$el;
 			b._isAuthor = !! a.isAuthor;
 			b._contentPadding = [70, 70];
 			b.top = 0;
 			b.iLeft = 0;
 			b.iTop = 0;
 			b.group = a.group;
 			b.$mask = c.find(".replace-layer");
 			b.$content = c.find(".note-content");
 			b._id = c.attr("id");
 			c.mouseenter(function() {
 				c.addClass("note-hover")
 			}).mouseleave(function() {
 				c.removeClass("note-hover")
 			});
 			b._findFooter();
 			b.model.on("change", function(a) {
 				if (a.hasChanged("likes_count") || a.hasChanged("comments_count")) {
 					b.$like.removeClass("loading");
 					b.renderMeta()
 				} else {
 					b.render();
 					b.resizeContent()
 				}
 			})
 		},
 		needZoomin: function() {
 			var a, b = this,
 				d = this.$content;
 			if (k) d.touchClick(function() {
 				c.trigger("note:zoomin", [b])
 			});
 			else d.on("mousedown", function(f) {
 				a = f;
 				if (f.button < 2) d.on("mouseup.zi", function(f) {
 					d.off("mouseup.zi");
 					a && (Math.abs(a.pageX - f.pageX) <= 2 && Math.abs(a.pageY - f.pageY) <= 2) && c.trigger("note:zoomin", [b]);
 					a = null
 				})
 			})
 		},
 		_findFooter: View.FullNote.prototype._findFooter,
 		renderMeta: View.FullNote.prototype.renderMeta,
 		canEdit: function() {
 			var a = this,
 				b = this.$el;
 			a._canEdit = true;
 			b.find(".edit, .delete, .js-edit, .rotate").on("mousedown, mouseup",

 			function(a) {
 				a.stopPropagation()
 			});
 			b.find(".btn-drag").on("mousedown", function(b) {
 				b.type = "note:drag";
 				c.trigger(b, [a]);
 				b.stopPropagation()
 			});
 			b.find(".edit, .js-edit").on("click", function(b) {
 				b.stopPropagation();
 				c.trigger("note:edit", [a])
 			});
 			b.find(".delete").on("click", function() {
 				c.trigger("note:delete", [a])
 			})
 		},
 		showMask: function() {
 			this.$mask && this.$mask.show()
 		},
 		hideMask: function() {
 			this.$mask && this.$mask.hide()
 		},
 		remove: function() {
 			this.group && this.group.removeNote(this);
 			Backbone.View.prototype.remove.call(this)
 		},
 		setGroup: function(a) {
 			this.group = a
 		},
 		getId: function(a) {
 			var b = this._id;
 			a === "int" && (b = b.split("-")[1]);
 			return b
 		},
 		setPosition: function(a) {
 			var b = this.$el,
 				c = this._sizeCss || {}, a = a + this.iLeft;
 			if (a !== this.left) this.left = c.left = a;
 			b.css(c)
 		},
 		setGroupLayout: function(a) {
 			this._groupLayout = a;
 			this.$el.data("layout", a)
 		},
 		getGroupLayout: function() {
 			if (!this._groupLayout) this._groupLayout = this.$el.data("layout");
 			return this._groupLayout
 		},
 		resizeContent: function() {},
 		resize: function(a) {
 			return this._resize(a)
 		},
 		_resize: function(b) {
 			var c = this,
 				d = b.width,
 				f = b.height || this.$el.height(),
 				k = {}, j;
 			if (this.width !== d) {
 				j = true;
 				this.width = k.width = d
 			}
 			if (this.height !== f) {
 				j = true;
 				this.height = k.height = f
 			}
 			if (this.iTop !== b.top) this.iTop = this.top = k.top = b.top;
 			if (this.iLeft !== b.left) this.iLeft = b.left;
 			if (j) {
 				this.contentHeight = f - this._contentPadding[0];
 				this.contentWidth = d - this._contentPadding[1];
 				this.$content.css({
 					width: this.contentWidth,
 					height: this.contentHeight
 				});
 				setTimeout(function() {
 					c.resizeContent()
 				}, 30)
 			}
 			this._sizeCss = a.isEmptyObject(k) ? null : k;
 			return d
 		},
 		lazyLoad: function() {}
 	});
 	View.Note.NOTE_TYPE = t;
 	View.Note.isNode = function(a) {
 		var b = View.Note.NOTE_TYPE;
 		return a.type === b.DAY || a.type === b.NODE || a.type === b.TIPS || a.type === b.THEEND
 	};
 	View.TheEnd = View.Note.extend({
 		initialize: function(a) {
 			View.Note.prototype.initialize.call(this, a);
 			this.type = t.THEEND
 		},
 		resize: function(a) {
 			if (!a.width) a.width = Math.min(Math.ceil(a.height * NO_PHOTO_NOTE_WIDTH_RATIO), NO_PHOTO_FULL_NOTE_MAX_WIDTH);
 			return View.Note.prototype.resize.call(this, a)
 		}
 	});
 	View.Tips = View.Note.extend({
 		initialize: function(b) {
 			View.Note.prototype.initialize.call(this,
 			b);
 			var c = this,
 				b = c.$el;
 			c.type = "tips";
 			c._contentPadding = [70, 0];
 			c.type = t.TIPS;
 			c.$itemsWrapper = a(".tip-items-wrapper", b).scrollbar({
 				type: "ver"
 			});
 			c.$items = a(".tip-items", b);
 			c.$tipsContent = a(".tips-content", b);
 			c.$header = a(".tips-header", b);
 			if (!k) {
 				var d = c.$itemsWrapper.scrollbar().disable(),
 					f, j = function(a) {
 						a.stopPropagation()
 					};
 				c.$content.mouseenter(function() {
 					clearTimeout(f);
 					f = setTimeout(function() {
 						d.refresh();
 						d.isActive() && c.$itemsWrapper.bind("mousewheel", j)
 					}, 500)
 				}).mouseleave(function() {
 					clearTimeout(f);
 					d.disable();
 					c.$itemsWrapper.unbind("mousewheel", j)
 				})
 			}
 		},
 		getId: function() {
 			return "theend"
 		},
 		resize: function(a) {
 			if (a.height) a.width = Math.min(Math.ceil(a.height * NO_PHOTO_NOTE_WIDTH_RATIO), NO_PHOTO_FULL_NOTE_MAX_WIDTH);
 			return View.Note.prototype.resize.call(this, a)
 		},
 		resizeContent: function() {
 			var a = this,
 				b = a.$itemsWrapper,
 				c, d, f;
 			setTimeout(function() {
 				c = a.$header.height();
 				f = a.$items.height();
 				d = a.contentHeight - c;
 				f > d ? b.css("height", d) : b.css("height", "auto");
 				a.$tipsContent.css("margin-top", (d - Math.min(d, f)) * 0.5);
 				a.$itemsWrapper.scrollbar().refresh(!k)
 			}, 300)
 		},
 		render: function() {
 			var b = this.model.get("tips") || [],
 				c = "";
 			a.each(b, function(a) {
 				c = c + ("<li>" + b[a] + "</li>")
 			});
 			this.$items.html(c)
 		}
 	});
 	View.Day = View.Note.extend({
 		initialize: function(a) {
 			View.Note.prototype.initialize.call(this, a);
 			this.type = t.DAY;
 			this.$daycontent = this.$el.find(".day-content");
 			this.$(".day-weather").length || this.$daycontent.addClass("no-weather")
 		},
 		resize: function(a) {
 			if (!a.width) a.width = Math.min(Math.ceil(a.height * NO_PHOTO_NOTE_WIDTH_RATIO), NO_PHOTO_FULL_NOTE_MAX_WIDTH);
 			View.Note.prototype.resize.call(this, a);
 			return this.width
 		}
 	});
 	View.Node = View.Note.extend({
 		initialize: function(a) {
 			this.type = "node";
 			View.Note.prototype.initialize.call(this, a);
 			this.type = t.NODE;
 			this.$nodeContent = this.$el.find(".node-content")
 		},
 		resizeContent: function() {
 			this.$nodeContent.css("height", "auto");
 			var a = Math.min(this.contentHeight, this.$nodeContent.innerHeight());
 			this.$nodeContent.css({
 				marginTop: Math.ceil((this.contentHeight - a) / 2),
 				height: a
 			});
 			this.height < 465 ? this.$el.addClass("node-s") : this.$el.removeClass("node-s")
 		},
 		resize: View.Day.prototype.resize,
 		render: function() {
 			var a = this.model,
 				b = "",
 				c = a.get("score"),
 				d = a.get("memo"),
 				f = a.get("comment");
 			if (d.price_amount || d.time) {
 				var k = '<div class="memo"><span class="memo-inner">',
 					a = a.get("entry").type;
 				if (d.price_amount) {
 					k = k + MEMO_TEMPLATE.price_amount;
 					k = k.replace("{price_amount}", d.price_amount).replace("{price_currency}", j.getName(d.price_currency)).replace("{label}", TripUtils.getPriceLabel(a))
 				}
 				d.price_amount && d.time && (k = k + '<span class="space">|</span>');
 				if (d.time) {
 					k = k + MEMO_TEMPLATE.time;
 					k = k.replace("{time}", d.time).replace("{time_unit}", d.time_unit && d.time_unit == "day" ? "\u5929" : "\u5c0f\u65f6")
 				}
 				b = b + (k + "</span></div>")
 			}
 			if (f || c > 0) {
 				b = b + '<div class="single-row"><span class="attr">\u6211\u7684\u8bc4\u4ef7\uff1a</span>';
 				c > 0 && (b = b + ('<span class="val"><span class="star-score"><i class="star-score-' + c + '"></i></span></span>'));
 				b = b + "</div>"
 			}
 			f && (b = b + ('<div class="desc">' + f + "</div>"));
 			this.$el.find(".node-info").html(b)
 		}
 	});
 	View.TextNote = View.Note.extend({
 		initialize: function(b) {
 			View.Note.prototype.initialize.call(this,
 			b);
 			var c = this,
 				b = c.$el;
 			c.type = "note";
 			c._contentPadding = [70, 25];
 			c.type = t.TEXT;
 			c.$textContent = a(".text-content", b);
 			c.$textWrapper = a(".text-wrapper", b).scrollbar({
 				type: "ver"
 			});
 			b.mouseenter(function() {
 				c.group.showLayoutToolbar()
 			}).mouseleave(function() {
 				c.group.hideLayoutToolbar()
 			});
 			if (!k) {
 				var d = c.$textWrapper.scrollbar().disable(),
 					f, j = function(a) {
 						a.stopPropagation()
 					};
 				c.$content.mouseenter(function() {
 					clearTimeout(f);
 					f = setTimeout(function() {
 						d.refresh();
 						d.isActive() && c.$textWrapper.bind("mousewheel", j)
 					},
 					500)
 				}).mouseleave(function() {
 					clearTimeout(f);
 					d.disable();
 					c.$textWrapper.unbind("mousewheel", j)
 				})
 			}
 			c.$textContent.css("font-size", textNoteFontSize)
 		},
 		resizeContent: function() {
 			this.$textWrapper.scrollbar().refresh(!k);
 			var a = this.$textContent.height();
 			a <= this.contentHeight ? this.$textContent.css({
 				"margin-top": (this.contentHeight - a) / 2,
 				"margin-left": Math.max((this.contentWidth - this.$textContent.width()) / 2 - 15, 0)
 			}) : this.$textContent.css("margin", 0)
 		},
 		resize: function(a) {
 			if (!a.width) a.width = Math.min(Math.ceil(a.height * NO_PHOTO_NOTE_WIDTH_RATIO), NO_PHOTO_FULL_NOTE_MAX_WIDTH);
 			return View.Note.prototype.resize.call(this, a)
 		},
 		setGroupLayout: function(a) {
 			View.Note.prototype.setGroupLayout.call(this, a);
 			var b = this.$el;
 			a === "full" ? b.addClass("text-full") : b.removeClass("text-full")
 		},
 		render: function() {
 			this.$textContent.html(this.model.get("description_display")).show();
 			this.renderMeta()
 		}
 	});
 	View.PhotoNote = View.Note.extend({
 		initialize: function(b) {
 			View.Note.prototype.initialize.call(this, b);
 			var d = this,
 				b = this.$el;
 			d.type = "note";
 			d._contentPadding = [44, 20];
 			d.type = t.PHOTO;
 			d.$description = a("figcaption", b).on("mousedown", function(a) {
 				a.stopPropagation()
 			});
 			d.$photo = a(".photo", b).on("mousedown mousemove", function(a) {
 				a.preventDefault()
 			});
 			a(".rotate", b).click(function() {
 				c.trigger("photo:rotate", [d])
 			});
 			d.$el.mouseenter(function() {
 				d.group.showLayoutToolbar()
 			}).mouseleave(function() {
 				d.group.hideLayoutToolbar()
 			});
 			d.photoSize();
 			d.needZoomin();
 			var f = d.model;
 			f.on("change", function() {
 				if (f.hasChanged("photo")) {
 					d.src = null;
 					d.photoSize();
 					d.resizeContent();
 					var a = d.$photo.css("visibility", "hidden"),
 						b = a.parent().addClass("pl");
 					a.on("load", function() {
 						a.off("load");
 						b.removeClass("pl");
 						a.css("visibility", "visible")
 					}).attr("src", d.src)
 				}
 			})
 		},
 		photoSize: function() {
 			var a = this.model.get("photo");
 			this.picNaturalWidth = a.width;
 			this.picNaturalHeight = a.height
 		},
 		photoSrc: function(a) {
 			var a = Math.max(a.width, a.height),
 				b = "";
 			p && (a = a * 2);
 			a > 1024 ? b = "" : a > 800 ? b = "" : this._isAuthor || (a <= 500 ? b = "" : a <= 625 && (b = ""));
 			this.src = this.model.get("photo").src + b
 		},
 		resizeContent: function() {
 			this.$photo.parent().css({
 				width: this.contentWidth,
 				height: this.contentHeight
 			});
 			var a = scaleImage(this.contentWidth, this.contentHeight, this.picNaturalWidth, this.picNaturalHeight);
 			this.$photo.css(a);
 			this.src || this.photoSrc(a)
 		},
 		setGroupLayout: function(a) {
 			View.Note.prototype.setGroupLayout.call(this, a);
 			var b = this.$el;
 			a === "full" ? b.addClass("photo-full") : b.removeClass("photo-full")
 		},
 		resize: function(a, b) {
 			var c = WindowSize.width;
 			if (b) {
 				var d = a.height / this.picNaturalHeight * this.picNaturalWidth;
 				a.width = a.width ? a.width > d ? a.width : d : d
 			}
 			if (a.width && a.width >= c) a.width = c * 0.7;
 			a.width = Math.ceil(a.width);
 			return View.Note.prototype.resize.call(this, a)
 		},
 		canEdit: function() {
 			View.Note.prototype.canEdit.call(this);
 			var b = this,
 				d;
 			b.$description.addClass("canedit").on("click", function() {
 				function f() {
 					if (!j.valid()) {
 						j.showErrorTips();
 						return false
 					}
 					d = false;
 					var a = j.val();
 					if (a != k) {
 						b.model.set("description", a);
 						c.trigger("note:edit", [b, a])
 					} else b.render()
 				}
 				if (a("body").hasClass("edit-view") && !d) {
 					d = true;
 					var k = b.model.get("description") || "",
 						j = b.$description.html('<div class="edit-wrapper textarea inset-shadow clearfix"><textarea maxlen="300" data-error-tip="\u6700\u591a150\u5b57">' + k + "</textarea></div>").find("textarea");
 					j.autosize("photo-description-measure").blur(f).on("keydown", function(a) {
 						switch (a.keyCode) {
 						case 13:
 							a.preventDefault();
 							f();
 							break;
 						case 27:
 							d = false;
 							a.preventDefault();
 							b.render()
 						}
 					}).moveCursorToEnd()
 				}
 			})
 		},
 		render: function() {
 			var a = this.model.get("description"),
 				b = this.$description;
 			a ? b.removeClass("nocaption").html("<p>" + a + "</p>") : b.addClass("nocaption").html("<p>\u6dfb\u52a0\u76f8\u7247\u8bf4\u660e</p>");
 			this.renderMeta()
 		},
 		lazyLoad: function() {
 			if (!this.lazyLoaded) {
 				var a = this.$photo;
 				a.on("load", function() {
 					a.off("load");
 					a.parent().removeClass("pl");
 					a.css("visibility", "visible")
 				}).attr("src", this.src);
 				this.lazyLoaded = true
 			}
 		}
 	});
 	b = Backbone.Model.extend({
 		parse: function(a) {
 			a.type = a.day ? "day" : a.memo ? "node" : a.photo ? "photo" : "description" in a ? "text" : a.tips ? "tips" : "theend";
 			return a
 		}
 	});
 	tripshow = a.extend(true, tripshow, {
 		NOTE_CLASSES: {
 			photo: View.PhotoNote,
 			text: View.TextNote,
 			node: View.Node,
 			day: View.Day,
 			theend: View.TheEnd,
 			tips: View.Tips
 		},
 		FULL_NOTE_CLASSES: {
 			text: View.FullTextNote,
 			photo: View.FullPhotoNote,
 			node: View.FullNode,
 			day: View.FullDay,
 			theend: View.FullTheEnd,
 			tips: View.FullTips
 		},
 		View: View,
 		TripsCollection: Backbone.Collection.extend({
 			model: b,
 			prev: function(a) {
 				a = this.indexOf(a);
 				return a === 0 ? false : this.models[a - 1]
 			},
 			next: function(a) {
 				a = this.indexOf(a);
 				return a === this.length - 1 ? false : this.models[a + 1]
 			},
 			getType: function() {}
 		})
 	})
 })(window, document, jQuery);
 (function(b) {
 	b.MiniComments = Backbone.View.extend({
 		initialize: function(b) {
 			Backbone.View.prototype.initialize.call(this, b);
 			var a = this,
 				c = a.$el,
 				d = c.find('input[name="reply_to_id"]');
 			$(".close", c).click(function() {
 				a.close();
 				return false
 			});
 			$(".need-login", c).click(function() {
 				open_sign_in_window();
 				a.note && $(window).trigger("dochaschanged", ["nt/" + a.note.model.get("sid"), true]);
 				return false
 			});
 			a.$reply_to_id = d;
 			a.$posting = c.find(".posting");
 			a.$text = c.find("textarea").autosize("textarea").on("keydown", function(b) {
 				b.stopPropagation();
 				setTimeout(function() {
 					a.$text.val() || d.val("")
 				}, 5);
 				if (b.keyCode === 13) {
 					b.preventDefault();
 					if (!a.$text.valid()) {
 						a.$text.showErrorTips();
 						return false
 					}
 					if (!a.posting) {
 						a.posting = true;
 						a.$posting.show();
 						var b = {
 							text: a.$text.val(),
 							commentable_id: a.noteId,
 							commentable_type: TripUtils.noteServerType(a.type),
 							popup: true
 						}, c = d.val();
 						if (c) b.reply_to_id = c;
 						$.ajax({
 							url: "/trips/" + a.options.tripId + "/comments",
 							type: "POST",
 							data: b,
 							dataType: "html",
 							success: function(b) {
 								a.$list.find("ul").prepend(b);
 								a.$list.find(".nocomment").remove();
 								a.$text.val("");
 								d.val("");
 								a.resize();
 								$(window).trigger("note:commented");
 								b = a.note.model;
 								b.set({
 									current_user_comment: true,
 									comments_count: (b.get("comments_count") || 0) + 1
 								});
 								a.$list.scrollTop(0).find(".time").timeago()
 							},
 							complete: function() {
 								a.posting = false;
 								a.$posting.hide()
 							}
 						})
 					}
 				}
 			}).hasPlaceholder();
 			a.$list = $(".list", c);
 			a.$listWrapper = a.$list.parent().scrollbar({
 				type: "ver"
 			});
 			a.$list.on("click", ".btn-more", function() {
 				a.load();
 				return false
 			}).on("ajax:success", ".delete", function(b, c) {
 				$(this).parent().parent().remove();
 				$(window).trigger("note:commentdeleted");
 				var d = a.note.model,
 					f = {
 						comments_count: d.get("comments_count") - 1
 					};
 				c && !c.current_user_comment && (f.current_user_comment = false);
 				d.set(f);
 				a.$listWrapper.scrollbar().refresh()
 			}).on("click", ".reply", function() {
 				var b = $(this).parents("li");
 				d.val(b.data("id"));
 				a.$text.val("\u56de\u590d " + b.data("username") + "\uff1a").moveCursorToEnd()
 			});
 			a.width = c.outerWidth();
 			a.url = "/trips/" + b.tripId + "/comments?commentable_id="
 		},
 		empty: function() {
 			this.$text.val("").css("height", 15);
 			this.$reply_to_id.val("");

 			this.$list.empty();
 			this.$listWrapper.css({
 				height: "auto"
 			}).scrollbar().scrollTo(0).refresh();
 			this.$el.hide();
 			this.nextId = this.noteId = 0;
 			this.note = this.$src = null;
 			$(document).off("click.comments", this.onClickHandle)
 		},
 		open: function(b, a, c) {
 			this.empty();
 			this.type = c;
 			this.note = a;
 			this.noteId = a.model.get("sid");
 			this._position(b);
 			this.$el.show();
 			this.load();
 			this.$text.focus();
 			this.displayed = true;
 			var d = this;
 			$(document).on("click.comments", function(a) {
 				d.displayed && !$.isClickInside(a.target, d.el) && d.close()
 			})
 		},
 		close: function() {
 			if (this.displayed) {
 				this.displayed = false;
 				this.empty()
 			}
 		},
 		_position: function(b) {
 			if (this.$src || b) {
 				var a;
 				this.$src = a = b ? $(b.srcElement) : this.$src;
 				var b = a.outerWidth(true),
 					c = a.height();
 				a = a.offset();
 				var d = {};
 				d.left = WindowSize.width - a.left < this.width ? a.left - this.width : a.left + b;
 				if (a.top < WindowSize.height / 2) {
 					d.bottom = "auto";
 					d.top = a.top
 				} else {
 					d.top = "auto";
 					d.bottom = WindowSize.height - a.top - c
 				}
 				this.heightLimit = WindowSize.height - 60;
 				this.$el.css(d)
 			}
 		},
 		resize: function() {
 			var b = this.$el.height();
 			b > this.heightLimit && this.$listWrapper.css({
 				height: this.heightLimit - 84
 			}).scrollbar().refresh();
 			var a = this.$el.offset();
 			parseInt(this.$el.css("top")) ? WindowSize.height - (a.top + b) < 20 && this.$el.css({
 				top: "auto",
 				bottom: 20
 			}) : a.top < 40 && this.$el.css({
 				top: 40,
 				bottom: "auto"
 			})
 		},
 		load: function() {
 			if (!this.loading) {
 				this.loading = true;
 				var b = this,
 					a = this.url + this.noteId + "&commentable_type=" + TripUtils.noteServerType(this.type);
 				b.nextId && (a = a + ("&next_id=" + b.nextId));
 				this.$list.addClass("loading");
 				$.ajax({
 					url: a,
 					dataType: "html",
 					success: function(a) {
 						if (b.nextId) {
 							var a = $("<div>" + a + "</div>"),
 								d = a.find("li");
 							b.$list.find("ul").append(d);
 							a.find(".btn-more").length < 1 && b.$list.find(".btn-more").remove()
 						} else b.$list.html(a);
 						b.nextId = b.$list.find("li:last").data("id");
 						b.$list.find(".time").timeago();
 						b.resize()
 					},
 					complete: function() {
 						b.$list.removeClass("loading");
 						b.loading = false
 					}
 				})
 			}
 		}
 	})
 })(tripshow.View);
 (function(b, f, a) {
 	function c(a) {
 		this.coverPhoto = a
 	}
 	var d = $(f),
 		j = Math,
 		b = Backbone.View.extend({
 			initialize: function(a) {
 				Backbone.View.prototype.initialize.call(this, a);
 				this.$loadico = this.$el.find(".load-ico");
 				this.$img = this.$el.find(".img").on("mousedown", function(a) {
 					a.preventDefault()
 				})
 			},
 			setSrc: function(a) {
 				var b = this,
 					c = $('<img style="position:absolute;top:-9999px;left:-9999px;">');
 				b.loaded = false;
 				b.$loadico.show();
 				c.on("load", function() {
 					b.loaded = true;
 					b.$loadico.hide();
 					b._imgWidth = c.width();
 					b._imgHeight = c.height();
 					c.off("load").remove();
 					b.$img.attr("src", a);
 					b.resize();
 					b.trigger("load")
 				}).on("error", function() {
 					b.trigger("load")
 				}).appendTo("body").attr("src", a)
 			},
 			resize: function() {
 				if (this.loaded) {
 					var a = this.$el.width(),
 						b = this.$el.height(),
 						c = scaleImage(a, b, this._imgWidth, this._imgHeight);
 					if (this.$img.data("custom")) {
 						var d = this.$img.position();
 						c.top = Math.max(-(c.height - b), d.top);
 						c.left = Math.max(-(c.width - a), d.left)
 					}
 					this.$img.css(c)
 				} else(a = this.$img.attr("src")) && this.setSrc(a)
 			}
 		});
 	_.extend(c.prototype,
 	Backbone.Events, {
 		checkBtnStatus: function() {
 			var a = this.$listContainer.width(),
 				a = (this.listWidth || 0) - a,
 				b = this.$listContainer.scrollLeft();
 			b == 0 ? this.$btnPrev.addClass("disable") : this.$btnPrev.removeClass("disable");
 			b >= a ? this.$btnNext.addClass("disable") : this.$btnNext.removeClass("disable");
 			return this
 		},
 		openGuide: function() {
 			this.$guide = this.$el.find(".cover-guide").show().appendTo("body");
 			return this
 		},
 		closeGuide: function() {
 			this.$guide && this.$guide.hide()
 		},
 		open: function() {
 			var a = this;
 			if (!a.$el) {
 				var b = $($("#_tpl_coverphoto_editor").html());
 				a.$el = b;
 				a.$listContainer = b.find(".list");
 				a.$list = b.find("ul");
 				$("body").append(b);
 				a.$list.on("click", "li", function() {
 					a.selectedItem && a.selectedItem.removeClass("selected");
 					var b = $(this);
 					a.selectedItem = b.addClass("selected");
 					//a.coverPhoto.setSrc(b.data("src"));
 					a.selectedId = b.data("id");
 					a.closeGuide();
 					a.$btnClose.attr("disabled", false).removeClass("btn-disable")
 				});
 				a.$btnNext = b.find(".next").click(function() {
 					var b = a.$listContainer.width(),
 						b = a.listWidth - b,
 						b = Math.min(a.$listContainer.scrollLeft() + a.$listContainer.width() - 152, b);
 					a.$listContainer.animate({
 						scrollLeft: b
 					}, {
 						duration: 300,
 						complete: function() {
 							a.checkBtnStatus()
 						}
 					})
 				});
 				a.$btnPrev = b.find(".prev").click(function() {
 					a.$listContainer.width();
 					var b = Math.max(a.$listContainer.scrollLeft() - a.$listContainer.width() - 152, 0);
 					a.$listContainer.animate({
 						scrollLeft: b
 					}, {
 						duration: 300,
 						complete: function() {
 							a.checkBtnStatus()
 						}
 					})
 				});
 				a.$btnClose = b.find(".btn").click(function() {
 					$.ajax({
 						url: "/trips/" + _G_trip_id,
 						type: "PUT",
 						data: {
 							"trip[front_cover_photo_id]": a.selectedId,
 							"trip[customize]": a.getCustomPostion()
 						}
 					});
 					a.close()
 				}).attr("disabled", true).addClass("btn-disable");
 				a.height = a.$el.outerHeight();
 				var c = $("#cover"),
 					f = $("#cover-header"),
 					b = $(".drag-handle", f),
 					n = $("#cover-guide-line"),
 					u, r, y, x, q, w, D;
 				a.$header = f;
 				a.$headerWrapper = c;
 				a.$coverImg = $("#cover-img");
 				b.mousedown(function(a) {
 					a.stopPropagation();
 					r = a;
 					x = c.width();
 					q = c.height();
 					w = f.outerWidth();
 					D = f.outerHeight();
 					u = f.position();
 					y = [x - w, q - D - 50];
 					n.css("visibility", "visible");
 					d.on("mousemove.cover", function(a) {
 						var b = a.pageX - r.pageX + u.left,
 							a = a.pageY - r.pageY + u.top,
 							b = j.ceil(j.min(j.max(b, 0), y[0])),
 							a = j.ceil(j.min(j.max(a, 100), y[1]));
 						j.abs(a / WindowSize.height * 100 - 45) < 1 && (a = j.ceil(WindowSize.height * 0.45));
 						f.css({
 							left: b,
 							top: a,
 							right: "auto",
 							bottom: "auto"
 						})
 					}).on("mouseup.cover", function() {
 						n.css("visibility", "hidden");
 						d.off("mousemove.cover mouseup.cover")
 					})
 				})
 			}
 			a.$el.animate({
 				top: 0
 			}, {
 				duration: 200,
 				complete: function() {
 					a.load();
 					a.trigger("opened")
 				}
 			});
 			var C, E, F;
 			d.on("mousedown.coverimg", function(b) {
 				r = b;
 				C = a.$coverImg.position();
 				E = a.$coverImg.width();
 				F = a.$coverImg.height();
 				d.on("mousemove.coverimg", function(b) {
 					var c = b.pageX - r.pageX + C.left,
 						b = b.pageY - r.pageY + C.top,
 						d = j.max(E - WindowSize.width, 0),
 						f = j.max(F - WindowSize.height, 0),
 						b = j.min(j.max(b, - f), 0),
 						c = j.min(j.max(c, - d), 0);
 					a.$coverImg.css({
 						top: b,
 						left: c
 					})
 				}).on("mouseup.coverimg", function() {
 					d.off("mousemove.coverimg mouseup.coverimg")
 				})
 			});
 			return this
 		},
 		getPosition: function(a, b, c) {
 			var d = a.outerWidth(),
 				f = a.outerHeight(),
 				j = b.outerWidth(),
 				b = b.outerHeight(),
 				a = a.position(),
 				r = [],
 				y = a.left / j * 100,
 				x = a.top / b * 100;
 			y > 50 && !c ? r.push("right:" + ((j - a.left - d) / j * 100).toFixed(1) + "%") : r.push("left:" + y.toFixed(1) + "%");
 			x > 50 && !c ? r.push("bottom:" + ((b - a.top - f) / b * 100).toFixed(1) + "%") : r.push("top:" + x.toFixed(1) + "%");
 			return r.join(";")
 		},
 		getCustomPostion: function() {
 			return '{"cover-photo":"' + this.getPosition(this.$coverImg, this.$coverImg.parent(), true) + '", "cover-header":"' + this.getPosition(this.$header, this.$headerWrapper) + '"}'
 		},
 		close: function() {
 			this.$el && this.$el.animate({
 				top: -this.height
 			}, {
 				duration: 200
 			});
 			d.off("mousedown.coverimg");
 			this.closeGuide();
 			this.trigger("closed");
 			return this
 		},
 		load: function() {
 			var a = this;
 			this.data || $.ajax({
 				url: "/trips/" + _G_trip_id + "/photos.json",
 				dataType: "json",
 				type: "GET",
 				success: function(b) {
 					if (b) {
 						a.data = b;
 						a.updateList()
 					}
 				}
 			});
 			return this
 		},
 		updateList: function() {
 			var a = this,
 				b = "";
 			$.each(this.data, function(c) {
 				c = a.data[c];
 				b = b + ("<li" + (c.current ? ' class="selected"' : "") + ' style="background:url(' + c.thumb + ') no-repeat 0 -30px;" data-src="' + c.display + '" data-id="' + c.id + '"><i></i></li>')
 			});
 			a.$list.html(b);
 			var c = this.data.length * 156;
 			a.$list.width(c);
 			a.listWidth = c;
 			a.checkBtnStatus();
 			a.selectedItem = a.$list.find(".selected");
 			a.selectedItem.length && a.$btnClose.attr("disabled", false).removeClass("btn-disable");
 			return this
 		}
 	});
 	a.CoverPhoto = b;
 	a.CoverPhotoEditor = c
 })(window, document, tripshow.View);
 (function() {
 	function b(a, b) {
 		var d = this;
 		d.slider = b;
 		d.$el = $(a);
 		d.nav = new f(d.$el.find(".trips-nav-wrapper"), b);
 		WindowResizeListener.add(function() {
 			d.resize()
 		});
 		d.resize()
 	}

 	function f(a, b) {
 		var d = this,
 			f = $(a);
 		this.$el = f;
 		this.$nav = f.find(".trips-nav");
 		this.$list = f.find(".trips");
 		this.$listWrapper = f.find(".trip-nodes");
 		this.$control = f.find(".trips-cont");
 		this.$controlLeft = f.find(".left").click(function() {
 			d.$listWrapper.animate({
 				scrollLeft: "-=50"
 			}, 200, function() {
 				d._checkControlStatus()
 			})
 		});
 		this.$controlRight = f.find(".right").click(function() {
 			d.$listWrapper.animate({
 				scrollLeft: "+=50"
 			}, 200, function() {
 				d._checkControlStatus()
 			})
 		});
 		this.slider = b;
 		this.children = [];
 		this._createMeasureBox();
 		$.each(b.getChildren(), function() {
 			d.add(this)
 		});
 		this.measure()
 	}
 	b.prototype = {
 		resize: function() {
 			var a = WindowSize.width,
 				b = this.$el,
 				d = a - b.find(".trips-thumb").width() - b.find(".trips-comments").width() - 500;
 			this.nav.resize(d);
 			b.css("left", Math.ceil((a - b.outerWidth()) / 2))
 		}
 	};
 	f.prototype = {
 		_createNode: function(a, b, d) {
 			return $("<a>").text(b).attr({
 				href: a,
 				title: d
 			})
 		},
 		add: function(a) {
 			if (a.layout === "full") {
 				var b = a.getFirstChild(),
 					d = b.type,
 					b = b.model;
 				if (d === tripshow.View.Note.NOTE_TYPE.DAY || d === tripshow.View.Note.NOTE_TYPE.NODE || d === tripshow.View.Note.NOTE_TYPE.THEEND) {
 					var f = $("<div>").addClass("d-" + d),
 						k = this.children[this.children.length - 1];
 					if (d === tripshow.View.Note.NOTE_TYPE.DAY) {
 						this.children.push([f, a, []]);
 						a = b.get("day");
 						f.append(this._createNode("#day/" + b.get("sid"), "D" + a, "\u7b2c" + a + "\u5929"))
 					} else if (d === tripshow.View.Note.NOTE_TYPE.NODE) {
 						k[2].push([f,
 						a]);
 						f.append(this._createNode("#nd/" + b.get("sid"), b.get("entry").name_zh_cn, b.get("entry").name_zh_cn))
 					} else if (d === tripshow.View.Note.NOTE_TYPE.THEEND) {
 						this.children.push([f, a, []]);
 						f.html('<a href="#end" title="\u65c5\u7a0b\u7ed3\u675f">End</a>')
 					}
 					this.$list.append(f);
 					this.$measureBoxContent.append(f.clone())
 				}
 			}
 		},
 		_createMeasureBox: function() {
 			this.$measureBox = $('<div class="trips-measure">');
 			this.$measureBoxContent = $('<div class="inner clearfix">').appendTo(this.$measureBox);
 			$("body").append(this.$measureBox)
 		},
 		measure: function() {
 			this.$list.css("width", this.listWidth = this.$measureBoxContent.outerWidth() + 6);
 			this.$measureBox.remove()
 		},
 		setCurrentStyle: function(a) {
 			var b = this;
 			if (!(this.current && this.current[0] === a[0])) {
 				this.current && this.current.removeClass("current");
 				this.current = a.addClass("current");
 				var a = a.position(),
 					d = this.$listWrapper.scrollLeft(),
 					f = this.listWrapperWidth / 2,
 					k = d + f;
 				if (a.left >= k && d < this.listWidth - this.listWrapperWidth || a.left <= k && d > 0) {
 					a = {
 						scrollLeft: "+=" + (a.left - f)
 					};
 					this.$listWrapper.animate(a,
 					200, function() {
 						b._checkControlStatus()
 					})
 				}
 			}
 		},
 		setCurrent: function(a) {
 			var b = this,
 				d;
 			$.each(b.children, function(f) {
 				var f = b.children[f],
 					k = f[2];
 				if (f[1] === a) {
 					d = f[0];
 					return false
 				}
 				$.each(k, function(b) {
 					if (k[b][1] === a) {
 						d = k[b][0];
 						return false
 					}
 				})
 			});
 			d && b.setCurrentStyle(d)
 		},
 		_disableControl: function() {
 			this.controlEnable = false;
 			this.$nav.addClass("disable-control")
 		},
 		_enableControl: function() {
 			this.controlEnable = true;
 			this.$nav.removeClass("disable-control")
 		},
 		_checkControlStatus: function() {
 			if (this.controlEnable) {
 				var a = this.$listWrapper.scrollLeft();
 				a == 0 ? this.$controlLeft.addClass("left-disable") : this.$controlLeft.removeClass("left-disable");
 				a >= this.listWidth - this.listWrapperWidth ? this.$controlRight.addClass("right-disable") : this.$controlRight.removeClass("right-disable")
 			}
 		},
 		resize: function(a) {
 			if (this.listWidth <= a) {
 				a = this.listWidth;
 				this._disableControl()
 			} else {
 				this._enableControl();
 				this._checkControlStatus()
 			}
 			this.$listWrapper.width(a);
 			this.listWrapperWidth = a
 		}
 	};
 	tripshow.View.TripNav = b
 })();
 var TripEditor = {};
 (function() {
 	var b = TripUtils.PriceCurrencyManager,
 		f, a, c, d;
 	TripEditor.photoRotate = {
 		success: function(b) {
 			a.model.set("photo", b);
 			$.fancybox.close()
 		},
 		open: function(b) {
 			if (!f) {
 				f = $($("#_tpl_photo_rotate").html());
 				d = $('input[name="rotate_type"]', f);
 				c = $("form", f).on("ajax:before", function() {
 					var a = d.val();
 					if (a < 1 || a > 3) {
 						$.fancybox.close();
 						return false
 					}
 				});
 				var i = $(".img", f);
 				i.each(function(a) {
 					var b = $(this);
 					b.click(function() {
 						i.removeClass("selected");
 						b.addClass("selected");
 						d.val(a + 1)
 					})
 				});
 				getHidder().append(f)
 			}
 			a = b;
 			c.attr("action", "/trips/" + _G_trip_id + "/notes/" + a.model.get("sid") + "/rotate");
 			var b = a.model.get("photo"),
 				b = b.width / b.height,
 				j, k;
 			if (b > 1) {
 				j = 140;
 				k = Math.ceil(140 / b)
 			} else {
 				j = Math.ceil(140 * b);
 				k = 140
 			}
 			$(".img", f).removeClass("selected");
 			d.val(0);
 			f.find("img").attr("src", a.src).css({
 				width: j,
 				height: k,
 				margin: 0
 			}).each(function(a) {
 				var b = {};
 				if ($.support.cssAttrCheck("transform")) if (a % 2 === 1) {
 					b["margin-top"] = Math.ceil((140 - k) * 0.5);
 					b["margin-left"] = Math.ceil((140 - j) * 0.5)
 				} else {
 					b["margin-top"] = Math.ceil((140 - j) * 0.5 + (j - k) * 0.5);
 					b["margin-left"] = Math.ceil((140 - k) * 0.5 + (k - j) * 0.5)
 				} else {
 					b["margin-top"] = Math.ceil((140 - (a % 2 === 0 ? j : k)) * 0.5);
 					b["margin-left"] = Math.ceil((140 - (a % 2 === 0 ? k : j)) * 0.5)
 				}
 				$(this).css(b)
 			});
 			$.fancybox({
 				width: 546,
 				padding: 0,
 				href: "#photo-rotate"
 			})
 		}
 	};
 	var j, k, p, t, m;
 	TripEditor.photoEditor = {
 		open: function(a) {
 			if (!j) {
 				j = $($("#_tpl_photo_edit").html());
 				k = j.find(".photo img");
 				p = j.find("textarea").textCounter();
 				t = j.find("form");
 				getHidder().append(j)
 			}
 			m = a;
 			a = m.model;
 			t.attr("action", "/trips/" + _G_trip_id + "/notes/" + a.get("sid"));
 			k.attr("src", m.src);
 			p.val(a.get("description") || "");
 			$.fancybox({
 				padding: 0,
 				autoDimensions: true,
 				href: "#edit-photo",
 				hideOnOverlayClick: false,
 				onComplete: function() {
 					p.focus()
 				}
 			})
 		},
 		success: function(a) {
 			m.model.set({
 				description: a.description
 			});
 			$.fancybox.close()
 		}
 	};
 	var n, u, r, y, x;
 	TripEditor.textEditor = {
 		open: function(a, b) {
 			if (!n) {
 				n = $($("#_tpl_text_edit").html());
 				y = n.find('input[name="target"]');
 				r = n.find("form");
 				method = n.find('input[name="_method"]');
 				x = n.find(".btn-submit");
 				u = n.find("textarea").on("keydown", function() {
 					setTimeout(function() {
 						checkButtonStatus.call(u,
 						x, "btn-submit-disable")
 					}, 30)
 				}).textCounter();
 				getHidder().append(n)
 			}
 			if (b) {
 				r.attr({
 					action: "/trips/" + _G_trip_id + "/notes"
 				});
 				method.val("POST");
 				y.val(b);
 				u.val("")
 			} else {
 				var c = a.model;
 				r.attr({
 					action: "/trips/" + _G_trip_id + "/notes/" + c.get("sid")
 				});

 				method.val("PUT");
 				u.val(c.get("description"))
 			}
 			checkButtonStatus.call(u, x, "btn-submit-disable");
 			$.fancybox({
 				padding: 0,
 				autoDimensions: true,
 				href: "#edit-text",
 				hideOnOverlayClick: false,
 				onComplete: function() {
 					u.focus()
 				}
 			})
 		}
 	};
 	var q, w, D;
 	TripEditor.titleEditor = {
 		open: function() {
 			if (!q) {
 				q = $($("#_tpl_change_title").html());
 				w = q.find('input[name="trip[name]"]');
 				q.find("form");
 				D = w.val();
 				getHidder().append(q)
 			}
 			w.val(D);
 			$.fancybox({
 				padding: 0,
 				scrolling: "no",
 				href: "#edit-title",
 				width: 460,
 				height: 155,
 				hideOnOverlayClick: false,
 				onComplete: function() {
 					w.focus()
 				}
 			})
 		},
 		success: function() {
 			D = w.val();
 			$("#js-cover-title").text(D).css("font-size", Math.floor(Math.max(Math.min(360 / $.getChsLen(D), 48), 36)));
 			$("#back-cover h1").text(D);
 			$.fancybox.close();
 			$(".form-tips-error").hide()
 		}
 	};
 	var C = function() {
 		F.remove();
 		F = o = B = K = null;
 		I = {};
 		$(".form-tips-error").hide()
 	}, E = {
 		Attraction: ["price_amount", "price_currency", "time", "time_unit"],
 		Hotel: ["price_amount", "price_currency"],
 		Restaurant: ["price_amount", "price_currency"],
 		Activity: []
 	}, F, o, B, K, I = {}, l;
 	TripEditor.nodeEditor = {
 		open: function(a) {
 			l = a;
 			var c = l.model;
 			if (!F) {
 				F = $($("#_tpl_edit_node").html());
 				getHidder().append(F)
 			}
 			F.find(".star").score({
 				receiver: F.find('input[name="score"]'),
 				score: c.get("score")
 			});
 			F.find("form").attr({
 				action: "/trips/" + _G_trip_id + "/trip_days/" + c.get("trip_day_id") + "/nodes/" + c.get("sid")
 			});
 			B = F.find('textarea[name="comment"]').textCounter().val(c.get("comment"));
 			K = F.find('textarea[name="tips"]').textCounter().val(c.get("tips"));
 			o = F.find('input[name="score"]');
 			a = c.get("entry");
 			F.find("h3").text(a.name_zh_cn);
 			F.find("h4").text(a.name_en || "");
 			F.find(".address").text(a.address || "");
 			var d = E[a.type];
 			if (d.length) {
 				F.find(".memo").html($("#_tpl_edit_node_" + a.type.toLowerCase()).html());
 				$.each(d, function(a, d) {
 					I[d] = F.find('[name="memo[' + d + ']"]');
 					d === "price_currency" ? F.find('select[name="memo[price_currency]"]').append(b.optionString()).val(c.get("memo")[d] || b.lastPriceCurrency) : I[d].val(c.get("memo")[d] || "")
 				})
 			}
 			F.find('input[name="memo[price_amount]"],input[name="memo[time]"]').keydown(function() {
 				var a = $(this),
 					b = /[^\d\.]/g;
 				setTimeout(function() {
 					var c = a.val();
 					b.test(c) && a.val(c.replace(b, ""))
 				}, 5)
 			});
 			$.fancybox({
 				padding: 0,
 				autoDimensions: true,
 				href: "#edit-node",
 				hideOnOverlayClick: false,
 				onClosed: C
 			})
 		},
 		success: function() {
 			var a = o.val(),
 				c = B.val(),
 				d = K.val(),
 				f = {};
 			I && $.each(I, function(a, c) {
 				f[a] = c.val();
 				if (a == "price_currency") b.lastPriceCurrency = c.val()
 			});
 			l.model.set({
 				score: a,
 				comment: c,
 				tips: d,
 				memo: f
 			});
 			$.fancybox.close()
 		}
 	};
 	var v = function(a) {
 		return '<div class="item"><label>' + (Q + 1) + '\u3001</label><textarea class="textarea" name="trip[tip_attributes][texts][]" maxlen="300" data-error-tip="\u6700\u591a150\u5b57">' + (a ? a : "") + "</textarea></div>"
 	}, i = function(a) {
 		for (var b = "", c = 0; c < a; c++) {
 			b = b + v();
 			Q++
 		}
 		return b
 	}, L, A, O, Q;
 	TripEditor.tipsEditor = {
 		open: function(a) {
 			if (!L) {
 				L = $($("#_tpl_edit_tips").html());
 				L.find("form");
 				A = L.find(".list");
 				getHidder().append(L)
 			}
 			O = a;
 			var a = O.model,
 				b = a.get("tips") || [];
 			$('input[name="trip[tip_attributes][id]"]', L).val(a.get("sid") || "");
 			var c = "",
 				a = b.length;
 			Q = 0;
 			$.each(b, function(a) {
 				c = c + v(b[a]);
 				Q++
 			});
 			(a = 5 - a) && (c = c + i(a));
 			c = c + '<div class="item-add">\u589e\u52a05\u6761</div>';
 			A.html(c);
 			$("textarea", A).autosize("textarea");
 			$(".item-add", A).click(function() {
 				$(this).before(i(5));
 				$("textarea", A).autosize("textarea")
 			});
 			$.fancybox({
 				padding: 0,
 				autoDimensions: true,
 				href: "#edit-tips",
 				height: 540,
 				width: 480,
 				scrolling: "no",
 				hideOnOverlayClick: false
 			})
 		},
 		success: function(a) {
 			a && a.tip && O.model.set({
 				sid: a.tip.id,
 				tips: a.tip.texts
 			});
 			$.fancybox.close()
 		}
 	}
 })();
 (function(b, f) {
 	var a, c, d, j = {}, k, p, t, m, n = tripshow.FULL_NOTE_CLASSES,
 		u = "ontouchstart" in b,
 		r, y, x = {
 			setCollection: function(a) {
 				r = a
 			},
 			isOpened: function() {
 				return d
 			},
 			autoPlay: function() {
 				var a = this;
 				if (!a._autoPlayTimer) {
 					a.next();
 					a._autoPlayTimer = setInterval(function() {
 						if (a.next() === false) a._autoPlayTimer = f.clearTimer(a._autoPlayTimer)
 					}, 5E3)
 				}
 			},
 			stopPlay: function() {
 				this._autoPlayTimer = f.clearTimer(this._autoPlayTimer)
 			},
 			isPlaying: function() {
 				return !!this._autoPlayTimer
 			},
 			next: function() {
 				var a = r.next(y);
 				if (!a) return false;
 				this.open(a);
 				t.removeClass("left-disable");
 				if (!r.next(a)) {
 					m.addClass("right-disable");
 					return false
 				}
 			},
 			prev: function() {
 				var a = r.prev(y);
 				if (!a) return false;
 				this.open(a);
 				m.removeClass("right-disable");
 				if (!r.prev(a)) {
 					t.addClass("left-disable");
 					return false
 				}
 			},
 			open: function(b) {
 				if (b) {
 					if (!c) {
 						k = f("#full-viewer-overlay");
 						p = f("#full-viewer").touchClick(function(a) {
 							a && a.target === this && x.close()
 						});
 						f(".close", p).touchClick(function() {
 							x.close();
 							return false
 						});
 						t = f(".left", p).click(function() {
 							x.prev();
 							return false
 						});
 						m = f(".right", p).click(function() {
 							x.next();
 							return false
 						});
 						if (u) {
 							t.hide();
 							m.hide();
 							var r = null,
 								D = null;
 							p.on("touchstart", function(a) {
 								a.preventDefault();
 								r = a.originalEvent.touches[0].pageX
 							}).on("touchmove", function(a) {
 								a.preventDefault();
 								D = a.originalEvent.touches[0].pageX
 							}).on("touchend", function(a) {
 								a.preventDefault();
 								D === null && (D = r);
 								D - r > 80 ? x.prev() : D - r < -80 && x.next();
 								r = D = null
 							})
 						}
 						c = true
 					}
 					if (!d) {
 						k.show();
 						p.css({
 							height: WindowSize.height,
 							top: f(window).scrollTop()
 						}).show();
 						d = true
 					}
 					a && a.close();
 					var C;
 					C = b.id;
 					var E;
 					if (j[C]) E = j[C];
 					else {
 						E = new(n[b.get("type")])({
 							model: b
 						});
 						E.render();
 						p.append(E.$el);
 						j[C] = E
 					}
 					C = E;
 					C.$el.show();
 					C.position();
 					a && x.trigger("noteshow", b.id);
 					a = C;
 					y = b;
 					this.trigger("open", TripUtils.getNoteHash(C))
 				}
 			},
 			resize: function() {
 				a && a.position()
 			},
 			close: function() {
 				this.stopPlay();
 				if (d) {
 					k.hide();
 					p.hide();
 					a && a.close();
 					a = null;
 					d = false
 				}
 				this.trigger("close")
 			}
 		};
 	_.extend(x, Backbone.Events);
 	tripshow.View.FullScreenViewer = x
 })(window, jQuery);
 (function(b) {
 	b.TrainView = Backbone.View.extend({
 		show: function() {
 			$.support.cssAttrCheck("transition") ? this.$el.css("left", 0) : this.$el.animate({
 				left: 0
 			}, {
 				duration: 200
 			});
 			this.visibility = true;
 			this.trigger("opened")
 		},
 		hide: function() {
 			var b = this;
 			$.support.cssAttrCheck("transition") ? b.$el.on(FX.transitionend, function() {
 				b.$el.off(FX.transitionend);
 				b.trigger("closed")
 			}).css("left", "100%") : b.$el.animate({
 				left: "100%"
 			}, {
 				duration: 200,
 				complete: function() {
 					b.trigger("closed")
 				}
 			});
 			b.visibility = false
 		}
 	})
 })(tripshow.View);
 (function(b, f, a) {
 	function c() {
 		if (this.height < 400) {
 			y = 30;
 			x = 5
 		} else {
 			y = 100;
 			x = 50
 		}
 	}

 	function d(b, c) {
 		var d = this;
 		d.$viewport = a(c).bind("mousewheel", function(a, b) {
 			b || (b = 1);
 			b > 0 ? d.slideLeft(b) : d.slideRight(Math.abs(b))
 		});
 		d.groups = [];
 		d.$el = a(b);
 		d.left = 0;
 		d._currentScrollLeft = 0;
 		d.resizeViewport();
 		d.addTextButtons = {};
 		d.textButtonsVisibility = true;
 		d.dragEvent()
 	}

 	function j(a) {
 		this.notes = [];
 		this.slider = a;
 		this.left = 0
 	}
 	isMobileDevice();
 	var k = "ontouchstart" in b,
 		p = a(b),
 		t = a(f),
 		m = tripshow.View,
 		n = m.FullScreenViewer,
 		u = m.Note.NOTE_TYPE,
 		r = m.TripShow,
 		y = 100,
 		x = 50,
 		q = ["bottomHeavy", "equally", "topHeavy"];
 	c.call(WindowSize);
 	WindowResizeListener.add(c);
 	var w, D = q[a.rnd(0, 2)];
 	w = function(b) {
 		var c, d = q.length,
 			f;
 		if (b === "full" || !b) {
 			b = D;
 			f = true
 		}
 		a.each(q, function(a, i) {
 			if (b === i) {
 				c = q[a === d - 1 ? 0 : a + 1];
 				f && (D = c);
 				return false
 			}
 		});
 		return c
 	};
 	var C, E = function() {
 		if (!o) {
 			o = true;
 			if (F.length) {
 				var b = F.shift();
 				if (b.complete) {
 					var c = b.complete;
 					b.complete = function() {
 						c();
 						o = false;

 						E()
 					}
 				} else b.complete = function() {
 					o = false;
 					E()
 				};
 				var d = b.error;
 				b.error = function() {
 					d && d();
 					a.confirm("\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u540e\u91cd\u8bd5\u3002",

 					function() {
 						location.reload()
 					}, {
 						btnCancel: false
 					})
 				};
 				b = a.extend({
 					timeout: 1E4
 				}, b);
 				a.ajax(b)
 			} else o = false
 		}
 	}, F = [],
 		o;
 	C = {
 		add: function(a) {
 			if (a && a.url) {
 				F.push(a);
 				return this
 			}
 		},
 		run: function() {
 			E();
 			return this
 		}
 	};
 	var B, K = function() {
 		if (l) {
 			L = setTimeout(function() {
 				l.css("left", "-3000px");
 				i = null
 			}, 100);
 			clearTimeout(A)
 		}
 	}, I = function(a) {
 		l.find("span").removeClass("selected");
 		l.find('[data-layout="' + a + '"]').addClass("selected")
 	}, l, v, i, L, A;
 	B = {
 		init: function(b) {
 			v = b;
 			l = a("#layout-toolbar").mouseenter(function() {
 				clearTimeout(L)
 			}).mouseleave(K);
 			a("span", l).click(function() {
 				if (i) {
 					var b = a(this).data("layout");
 					I(b);
 					i.setLayout(b);
 					v.render();
 					var c = i.getFirstChild();
 					C.add({
 						url: "/trips/" + _G_trip_id + "/notes/" + c.getId("int"),
 						type: "PUT",
 						data: {
 							new_layout: b
 						}
 					}).run()
 				}
 			})
 		},
 		show: function(a, b, c) {
 			i !== a && l.css("left", "-3000px");
 			clearTimeout(L);
 			A = setTimeout(function() {
 				i = a;
 				l.find("span").removeClass("selected");
 				l.css({
 					top: v.viewportTop - 40,
 					left: c - v.getScrollLeft(),
 					width: b
 				});
 				I(i.layout);
 				i.getChildren().length > 2 ? l.addClass("layout-toolbar-3") : l.removeClass("layout-toolbar-3")
 			},
 			500)
 		},
 		hide: K
 	};
 	var O, Q, N, V, z, T = false;
 	O = {
 		init: function() {
 			Q = a("#dragdrop-box");
 			N = Q.find(".cloner-content");
 			return this
 		},
 		move: function(a) {
 			Q.css({
 				left: a.x - V / 2,
 				top: a.y - z / 2
 			});
 			return this
 		},
 		setContent: function(a, b) {
 			if (a === "img") {
 				V = 100;
 				z = Math.ceil(100 / b.data("width") * b.data("height"))
 			} else {
 				V = 100;
 				z = 80
 			}
 			N.html(b).css({
 				width: V,
 				height: z
 			});
 			return this
 		},
 		show: function() {
 			Q.css({
 				visibility: "visible",
 				left: 0
 			});
 			T = true;
 			return this
 		},
 		hide: function() {
 			Q.css({
 				visibility: "hidden",
 				left: "-999px"
 			});
 			T = false;
 			return this
 		},
 		getPosition: function() {
 			return T ? Q.position() : false
 		}
 	};
 	var M, S = function() {
 		var a = {
 			visibility: "hidden",
 			left: "-999px"
 		};
 		fa && fa.css(a);
 		ga && ga.css(a)
 	}, ka = function() {
 		S();
 		fa && fa.css({
 			visibility: "visible"
 		})
 	}, sa = function(a) {
 		fa && fa.css({
 			left: a - 4
 		})
 	}, Y, R, ta, fa, ga, ha, ea, la;
 	M = {
 		hideSpacer: S,
 		showSpacer: ka,
 		moveSpacer: sa,
 		init: function(b) {
 			if (!Y) {
 				Y = true;
 				R = b;
 				fa = a("#dragdrop-spacer");
 				ga = a("#dragdrop-spacer-hor")
 			}
 		},
 		reset: function() {
 			ea = null;

 			ha && ha.hideMask();
 			O.hide();
 			S()
 		},
 		clonerCopy: function(b, c) {
 			var d = c.type,
 				f = c.model;
 			if (d === u.PHOTO) {
 				d = f.get("photo");
 				O.setContent("img",
 				a("<img>").attr("src", c.src).data({
 					width: d.width,
 					height: d.height
 				})).show()
 			} else d === u.TEXT && O.setContent("text", f.get("description")).show();
 			this.moveCloner(b)
 		},
 		moveCloner: function(a) {
 			O.move({
 				x: a.pageX,
 				y: a.pageY
 			})
 		},
 		onMousedown: function(b, c) {
 			function d() {
 				var b = O.getPosition(),
 					c;
 				if (b) {
 					if (b.left < 0) {
 						c = true;
 						R.slideRightScreen()
 					} else if (b.left > WindowSize.width - 200) {
 						c = true;
 						R.slideLeftScreen()
 					}
 					if (c) {
 						a.clearTimer(la);
 						setTimeout(function() {
 							la = setInterval(d, 500)
 						}, 1E3)
 					}
 				}
 			}
 			ea = c;
 			this.clonerCopy(b, c);
 			clearInterval(la);
 			la = setInterval(d, 500)
 		},
 		onMousemove: function(a) {
 			var b = this;
 			b._mousemoveEvent = a;
 			b.moveCloner(a);
 			ta || (ta = setInterval(function() {
 				b.checkInsertable(b._mousemoveEvent, function(a, b, c, d) {
 					if (a === false && b === false) S();
 					else if (a === false) {
 						var c = d.width,
 							f = d.group.left;
 						S();
 						ga && ga.css({
 							visibility: "visible",
 							width: c,
 							left: f
 						});
 						ga && ga.css({
 							top: b
 						})
 					} else {
 						ka();
 						sa(a)
 					}
 					if (d && a === false && b === false) {
 						ha = d;
 						d.showMask()
 					} else ha && ha.hideMask()
 				})
 			}, 100));
 			R.textButtonsVisibility && R.hideTextButtons()
 		},
 		onMouseup: function(b, c) {
 			var d = this;
 			a.clearTimer(la);
 			ta = a.clearTimer(ta);
 			d.checkInsertable(b, function(a, b, f, i, k) {
 				var l;
 				if (a !== false || b !== false) {
 					if (f.getChildren().length === 1 && f.getFirstChild() === c) return;
 					c.group.removeNote(c);
 					if (a !== false) {
 						k = f.nextSibling().getFirstChild();
 						a = new j(R);
 						a.add(c);
 						a.checkLayout();
 						i = f.getLastChild();
 						i.$el.after(c.$el);
 						R.insertAfter(f, a);
 						C.add({
 							url: "/trips/" + _G_trip_id + "/notes/" + c.getId("int") + "/move",
 							type: "put",
 							data: {
 								target: k.getId(),
 								position: 0
 							}
 						}).run()
 					} else {
 						f = i.group;
 						a = f.getChildIndexOf(i);
 						f.add(c, k === 1 ? a : a + 1);
 						f.setLayout("equally");
 						k === 1 ? i.$el.before(c.$el) : i.$el.after(c.$el);
 						C.add({
 							url: "/trips/" + _G_trip_id + "/notes/" + c.getId("int") + "/move",
 							type: "put",
 							data: {
 								target: i.getId(),
 								position: k
 							}
 						}).run()
 					}
 					l = true
 				} else if (i && i != c) {
 					d.swapNote(c, i);
 					l = true;
 					C.add({
 						url: "/trips/" + _G_trip_id + "/notes/" + c.getId("int") + "/exchange",
 						type: "put",
 						data: {
 							target: i.getId()
 						}
 					}).run()
 				}
 				if (l) {
 					R.render();
 					R.measureScrollLeft()
 				}
 			});
 			d.reset();
 			R.textButtonsVisibility || R.showTextButtons()
 		},
 		checkInsertable: function(b, c) {
 			var d = b.pageX,
 				f = b.pageY,
 				i = R.getScrollLeft(),
 				j = R.viewportTop,
 				k = 0,
 				l;
 			ha && ha.hideMask();
 			a.each(R.getChildren(), function() {
 				var b = this;
 				k = k + (1 + this.width);
 				var m = k - i,
 					o = m - this.width + 30,
 					n = m - 30;
 				if (d > m - 30 && d < m + 30 && f > j && f < j + R.viewportHeight) {
 					l = true;
 					c && c(k, false, b);
 					return false
 				}
 				if (d > o && d < n) {
 					m = this.getType();
 					if (m === u.DAY || m === u.NODE || m === u.THEEND || m === u.TIPS) return false;
 					l = true;
 					var p, P = this.numChildren(),
 						t = f - j;
 					a.each(this.getChildren(), function(a) {
 						if (P < 3) {
 							var f = this.top + this.height;
 							if (t > -30 && t - this.top < 30) {
 								p = true;
 								ea !== this && c && c(false,
 								this.top, b, this, 1);
 								return false
 							}
 							if (a === P - 1 && t > f - 30 && t < f + 30) {
 								p = true;
 								ea !== this && c && c(false, this.top + this.height - 9, b, this, 2);
 								return false
 							}
 						}
 						a = this.left - i;
 						if (d > a && d < a + this.width && t > this.top && t < this.top + this.height) {
 							ea && ea !== this && c && c(false, false, b, this);
 							p = true;
 							return false
 						}
 					});
 					if (p) return false
 				}
 			});
 			!l && c && c(false, false)
 		},
 		checkReplace: function(b, c, d) {
 			var f = b.pageX,
 				i = b.pageY - R.viewportTop,
 				j = R.getScrollLeft();
 			a.each(c.getChildren(), function() {
 				var a = this.left - j;
 				if (f > a && f < a + this.width && i > this.top && i < this.top + this.height) {
 					(!ea || ea != this) && d && d(false, false, c, this);
 					return false
 				}
 			})
 		},
 		swapNote: function(a, b) {
 			var c = a.group,
 				d = b.group;
 			if (c === d) c.swap(a, b);
 			else {
 				c.replace(b, a);
 				d.replace(a, b)
 			}
 			c = b.$el.next();
 			if (c[0] !== a.$el[0]) {
 				a.$el.prev().after(b.$el);
 				c.before(a.$el)
 			} else {
 				c = b.$el.prev();
 				a.$el.next().before(b.$el);
 				c.after(a.$el)
 			}
 		}
 	};
 	var Ya = {
 		measureHeavy: function(a, b) {
 			var c = Math.ceil(b / 5 * 3),
 				d = {
 					height: c
 				};
 			d.width = a.type === u.TEXT ? c / 3 * 4 : b / 7 * 5;
 			d.width = Math.ceil(d.width);
 			return d
 		},
 		measureLight: function(a, b) {
 			var c = b - Math.ceil(b / 5 * 3) - 1,
 				d = {
 					height: c
 				};
 			d.width = a.type === u.TEXT ? c / 3 * 4 : b / 7 * 5;
 			d.width = Math.ceil(d.width);
 			return d
 		},
 		full: function(a, b) {
 			return a.getChildren()[0].resize({
 				height: b,
 				top: 0,
 				left: 0
 			}, true)
 		},
 		bottomHeavySplit: function(b, c, d) {
 			var b = b.getChildren(),
 				f = b.shift(),
 				i = b.length,
 				j = this.measureLight(f, c),
 				k = a.extend(j, {
 					top: 0,
 					left: 0
 				}),
 				f = f.resize(k, true),
 				l = c - j.height - 1,
 				m, o;
 			if (i > 1) {
 				m = f - 1 * (i - 1);
 				o = Math.floor(m / i)
 			} else o = f;
 			d = 0;
 			a.each(b, function(a) {
 				a = i > 1 ? a == i - 1 ? m - o * (i - 1) : o : o;
 				this.resize({
 					top: c - l,
 					left: d,
 					height: l,
 					width: a
 				});
 				d = d + (1 + a)
 			});
 			return f
 		},
 		topHeavySplit: function(b, c, d) {
 			var b = b.getChildren(),
 				f = b.pop(),
 				i = b.length,
 				j = this.measureLight(f, c),
 				k = c - j.height - 1,
 				c = a.extend(j, {
 					top: c - j.height,
 					left: 0
 				}),
 				c = f.resize(c, true),
 				l, m;
 			if (i > 1) {
 				l = c - 1 * (i - 1);
 				m = Math.floor(l / i)
 			} else m = c;
 			d = 0;
 			a.each(b, function(a) {
 				a = i > 1 ? a == i - 1 ? l - m * (i - 1) : m : m;
 				this.resize({
 					top: 0,
 					left: d,
 					height: k,
 					width: a
 				});
 				d = d + (1 + a)
 			});
 			return c
 		},
 		topHeavy: function(b, c, d) {
 			var b = b.getChildren(),
 				f = b.shift(),
 				i = b.length,
 				j = this.measureHeavy(f, c),
 				k = a.extend(j, {
 					top: 0,
 					left: 0
 				}),
 				f = f.resize(k, true),
 				l = c - j.height - 1,
 				m, o;
 			if (i > 1) {
 				o = f - 1 * (i - 1);
 				m = Math.floor(o / i)
 			} else m = f;
 			d = 0;
 			a.each(b, function(a) {
 				a = i > 1 ? a == i - 1 ? o - m * (i - 1) : m : m;
 				this.resize({
 					top: c - l,
 					left: d,
 					height: l,
 					width: a
 				});
 				d = d + (1 + a)
 			});
 			return f
 		},
 		bottomHeavy: function(b, c) {
 			var d = b.getChildren(),
 				f = d.pop(),
 				i = d.length,
 				j = this.measureHeavy(f, c),
 				k = a.extend(j, {
 					top: c - j.height,
 					left: 0
 				}),
 				f = f.resize(k, true),
 				l = c - j.height - 1,
 				m;
 			if (i > 1) {
 				var j = 1 * (i - 1),
 					o = Math.floor((f - j) / i);
 				m = f - o * (i - 1) - j
 			} else o = f;
 			a.each(d, function(a) {
 				this.resize({
 					top: 0,
 					left: (1 + o) * a,
 					height: l,
 					width: a === i - 1 && m ? m : o
 				})
 			});
 			return f
 		},
 		equally: function(b, c) {
 			var d = b.getChildren();
 			len = d.length;
 			width = 0;
 			h = Math.ceil(c / len);
 			used = 0;
 			width = c / 7 * 5;
 			width = Math.ceil(width);
 			a.each(d, function(a) {
 				var b = {
 					left: 0,
 					height: h,
 					top: (1 + h) * a,
 					width: width
 				};
 				if (a == len - 1) b.height = c - used - 1;
 				used = used + (b.height + 1 * a);
 				a === 0 ? width = this.resize(b, true) : this.resize(b)
 			});
 			return width
 		}
 	};
 	d.prototype = {
 		dragEvent: function() {
 			if (k) {
 				var a = this,
 					b = k ? "touchstart" : "mousedown",
 					c = k ? "touchmove" : "mousemove",
 					d = k ? "touchend" : "mouseup.dragviewport",
 					f = this.$viewport,
 					i = f[0],
 					j, l, m;
 				if (k) {
 					i.addEventListener(b,

 					function(a) {
 						a.preventDefault();
 						l = j = a.touches[0].pageX
 					}, false);
 					i.addEventListener(c, function(b) {
 						b.preventDefault();
 						b = b.touches[0].pageX;
 						a.scrollTo(i.scrollLeft + -(b - l), true, true);
 						l = b;
 						m || (m = Date.now())
 					}, false);
 					i.addEventListener(d, function(b) {
 						b.preventDefault();
 						(b = b.touches && b.touches.length > 0 ? b.touches[0].pageX : l) && Date.now() - m < 250 && (j - b > 50 ? a.slideLeftScreen() : b - j > 50 && a.slideRightScreen());
 						m = null
 					}, false)
 				} else f.on(b, function(b) {
 					b.preventDefault();
 					l = j = b;
 					f.on(c, function(b) {
 						b.preventDefault();
 						a.scrollTo(f[0].scrollLeft + -(b.pageX - l.pageX), true, true);
 						l = b;
 						m || (m = Date.now())
 					});
 					t.on(d, function(b) {
 						f.off(c);
 						t.off(d);
 						Date.now() - m < 250 && (j.pageX - b.pageX > 20 ? a.slideLeftScreen() : b.pageX - j.pageX > 20 && a.slideRightScreen());
 						m = null
 					})
 				})
 			}
 		},
 		add: function(b, c) {
 			a.isArray(b) || (b = [b]);
 			var d = this;
 			c === void 0 ? this.groups = this.groups.concat(b) : a.each(b, function(a) {
 				d.groups.splice(c, 0, b[a])
 			});
 			if (!this.currentGroup) this.currentGroup = this.groups[0]
 		},
 		insertAfter: function(a, b) {
 			var c = this.getChildIndexOf(a);
 			c > -1 && this.add(b, c + 1)
 		},
 		insertBefore: function(a,
 		b) {
 			var c = this.getChildIndexOf(a);
 			c > -1 && this.add(b, c)
 		},
 		remove: function(b) {
 			var c = this;
 			a.each(c.groups, function(a) {
 				if (this === b) {
 					c.groups.splice(a, 1);
 					return false
 				}
 			})
 		},
 		getHeight: function() {
 			return this.viewportHeight
 		},
 		getChildren: function() {
 			return this.groups.concat()
 		},
 		getChildAt: function(a) {
 			return this.groups[a]
 		},
 		getChildIndexOf: function(a) {
 			return _.indexOf(this.groups, a)
 		},
 		findNote: function(b) {
 			var c;
 			a.each(this.getChildren(), function() {
 				if (c = this.findChildren(b)) return false
 			});
 			return c
 		},
 		getNextNote: function(b) {
 			var c,
 			d;
 			a.each(this.getChildren(), function() {
 				if (c) return false;
 				a.each(this.getChildren(), function() {
 					if (d) {
 						c = this;
 						return false
 					}
 					this === b && (d = true)
 				})
 			});
 			return c
 		},
 		getPrevNote: function(b) {
 			var c, d;
 			a.each(this.getChildren(), function() {
 				if (c) return false;
 				a.each(this.getChildren(), function() {
 					if (this === b) {
 						c = d;
 						return false
 					}
 					d = this
 				})
 			});
 			return c
 		},
 		render: function() {
 			var b = 0;
 			a.each(this.getChildren(), function() {
 				var a = this.render(b + 1);
 				b = b + (1 + a)
 			});
 			this.$el.width(b);
 			this.width = b;
 			this.trigger("rendered");
 			this.isEditView && this.relayoutTextButton();
 			this._updateNodeTitle()
 		},
 		relayoutTextButton: function() {
 			var b = this,
 				c = b.addTextButtons,
 				d = this.getChildren(),
 				f = d.length;
 			b._resetTextButton();
 			a.each(d, function(a) {
 				if (a > 0 && a < f - 1) {
 					var d = c["b" + a],
 						i = this;
 					if (!d) {
 						d = c["b" + a] = b._createAddTextButton();
 						b.$viewport.append(d)
 					}
 					d.css("left", i.left - 6).off("click.addtext").on("click.addtext", function(a) {
 						a.stopPropagation();
 						t.trigger("addtext", [i])
 					})
 				}
 			})
 		},
 		showTextButtons: function() {
 			a.each(this.addTextButtons, function() {
 				this.css("visibility", "visible")
 			});
 			this.textButtonsVisibility = true
 		},
 		hideTextButtons: function() {
 			a.each(this.addTextButtons, function() {
 				this.css("visibility", "hidden")
 			});
 			this.textButtonsVisibility = false
 		},
 		_resetTextButton: function() {
 			a.each(this.addTextButtons, function() {
 				this.css("left", "-100px")
 			})
 		},
 		_createAddTextButton: function() {
 			return a('<div class="add-text-btn"></div>')
 		},
 		_findNearestGroup: function(b) {
 			var c = b.getType(),
 				d;
 			c === u.DAY || c === u.NODE ? d = b : a.each(this.getChildren(), function() {
 				var a = this.getType();
 				if (a === u.DAY || a === u.NODE) d = this;
 				if (this === b) return false
 			});
 			return d
 		},
 		setPath: function(a) {
 			this.nav = a;
 			this.setPathCurrent(this.currentGroup)
 		},
 		setPathCurrent: function(a) {
 			if (this.nav) {
 				a = this._findNearestGroup(a);
 				this.nav.setCurrent(a)
 			}
 		},
 		firstVisiable: function() {
 			var b = this.getScrollLeft(),
 				c = 0,
 				d;
 			a.each(this.getChildren(), function() {
 				if (c + this.width >= b) {
 					d = this;
 					return false
 				}
 				c = c + (1 + this.width)
 			});
 			return d
 		},
 		_findCurrentGroup: function() {
 			var b, c = 0,
 				d = this,
 				f = WindowSize.width / 2;
 			a.each(this.getChildren(), function() {
 				if (c + this.width > d._currentScrollLeft + f) {
 					d.currentGroup = b = this;
 					return false
 				}
 				c = c + (1 + this.width)
 			});
 			return b
 		},
 		slideLeftScreen: function() {
 			var b = this._currentScrollLeft + this.viewportWidth;
 			if (!(this._currentScrollLeft >= this.width)) {
 				var c = 0;
 				a.each(this.getChildren(), function() {
 					if (c >= b || c + this.width > b) return false;
 					c = c + (1 + this.width)
 				});
 				this.scrollTo(c)
 			}
 		},
 		slideRightScreen: function() {
 			this.getScrollLeft();
 			if (!(this._currentScrollLeft <= 0)) {
 				var b = this,
 					c = 0;
 				a.each(this.getChildren(), function() {
 					if (c + this.width >= b._currentScrollLeft) {
 						c = c - (b.viewportWidth - this.width - 2);
 						return false
 					}
 					c = c + (1 + this.width)
 				});
 				this.scrollTo(c)
 			}
 		},
 		slideLeft: function(a) {
 			a = Math.min(a || 1, 5);
 			a = this._currentScrollLeft - 150 * a;
 			a < 0 && (a = 0);
 			this.scrollTo(a, true, true)
 		},
 		slideRight: function(a) {
 			a = Math.min(a || 1, 5);
 			this.scrollTo(this._currentScrollLeft + 150 * a, true, true)
 		},
 		scrollTo: function(b, c, d) {
 			var f = this,
 				i = f.$viewport[0];
 			f.trigger("slider:scroll");
 			b < 0 && (b = 0);
 			b > this.width - this.viewportWidth && (b = this.width - this.viewportWidth);
 			if (d) {
 				i.scrollLeft = f._currentScrollLeft = b;
 				f.preload();
 				f._updateNodeTitle();
 				f.setPathCurrent(f._findCurrentGroup())
 			} else {
 				if (c) cancelFrame(f._reqId);
 				else if (this._scrolling) return;
 				this._scrolling = true;
 				var j = Date.now(),
 					k = 0,
 					l = this._currentScrollLeft,
 					m = b - this._currentScrollLeft,
 					o = Math.min(Math.abs(m), 800),
 					n = function(c) {
 						if (c - j >= 10) {
 							k = k + (c - j);
 							f._currentScrollLeft = Math.ceil(a.easing.swing(void 0, k, l, m, o));
 							if (k >= o) {
 								f._currentScrollLeft = b;
 								i.scrollLeft = f._currentScrollLeft;
 								cancelFrame(f._reqId);
 								f._scrolling = false;
 								f.preload();
 								f._updateNodeTitle();
 								f.setPathCurrent(f._findCurrentGroup());
 								return
 							}
 							j = c;
 							i.scrollLeft = f._currentScrollLeft
 						}
 						return nextFrame(n)
 					};
 				f._reqId = nextFrame(n)
 			}
 		},
 		isEnd: function() {
 			return this._currentScrollLeft >= this.width - this.viewportWidth ? true : false
 		},
 		autoPlay: function() {
 			var b = this;
 			if (!b._autoPlayTimer) {
 				b.slideLeftScreen();
 				b._autoPlayTimer = setInterval(function() {
 					b.slideLeftScreen();
 					if (b.isEnd()) b._autoPlayTimer = a.clearTimer(b._autoPlayTimer)
 				}, 5E3)
 			}
 		},
 		stopPlay: function() {
 			this._autoPlayTimer = a.clearTimer(this._autoPlayTimer)
 		},
 		isPlaying: function() {
 			return !!this._autoPlayTimer
 		},
 		_updateNodeTitle: function() {
 			var b, c, d = 0,
 				f = this,
 				i = WindowSize.width / 2;
 			a.each(this.getChildren(), function() {
 				if (this.layout === "full") {
 					var a = this.getFirstChild();
 					if (a.type === u.DAY) {
 						b = a;
 						c = null
 					} else a.type === u.NODE && (c = a)
 				}
 				if (d + this.width > f._currentScrollLeft + i && b) return false;
 				d = d + (1 + this.width)
 			});
 			var j = ""; //"\u7b2c" + b.model.get("day") + "\u5929";
 			c && (j = j + ("\uff1a" + c.model.get("entry").name_zh_cn));
 			a("#nav-board span").text(j)
 		},
 		scrollToGroup: function(a, b) {
 			if (a && a.left !== void 0) {
 				var c = a.left;
 				b && (c = c - (WindowSize.width - a.width) / 2);
 				this.scrollTo(c, true)
 			}
 		},
 		getScrollLeft: function() {
 			return this._currentScrollLeft
 		},
 		measureScrollLeft: function() {
 			var a = this;
 			setTimeout(function() {
 				a._currentScrollLeft = a.$viewport.scrollLeft()
 			}, 500)
 		},
 		resizeViewport: function(a) {
 			var b = WindowSize.height,
 				c = this.$viewport;
 			this.viewportWidth = WindowSize.width;
 			//this.viewportHeight = a ? 300 : Math.ceil(Math.max(200, b - y - x));
 			this.viewportHeight = a ? a : 455;
 			//this.viewportTop = Math.ceil(Math.max(y, (b - this.viewportHeight) / 2));
 			this.viewportTop = 0;
 			a = {
 				height: this.viewportHeight,
 				top: this.viewportTop
 			};
 			c.css("height", a.height).parent().css(a)
 		},
 		openEditView: function() {
 			this.isEditView = true;
 			this.trigger("openeditview");
 			this._textButtonAdded || this.relayoutTextButton()
 		},
 		closeEditView: function() {
 			this.isEditView = false;
 			this.trigger("closeeditview");
 			this.isZoomOut && this.restore()
 		},
 		zoomout: function() {
 			var a = this,
 				b = a.firstVisiable();
 			a.isZoomOut = true;
 			a.resizeViewport(true);
 			a.render();
 			a.trigger("zoomout");
 			setTimeout(function() {
 				a.scrollToGroup(b)
 			}, 5);
 			this.preload()
 		},
 		restore: function() {
 			var a = this,
 				b = a.firstVisiable();
 			a.trigger("restore");
 			a.isZoomOut = false;
 			a.resizeViewport();
 			a.render();
 			setTimeout(function() {
 				a.scrollToGroup(b)
 			},
 			5)
 		},
 		chkAllIsLoaded: function() {
 			if (!this._allLoaded) {
 				var b = true,
 					c;
 				a.each(this.getChildren(), function() {
 					if (c) return false;
 					a.each(this.getChildren(), function() {
 						if (this.type === u.PHOTO && !this.lazyLoaded) {
 							b = false;
 							c = true;
 							return false
 						}
 					})
 				});
 				this._allLoaded = b
 			}
 		},
 		preload: function() {
 			if (!this._allLoaded) {
 				var b = this,
 					c = this.firstVisiable(),
 					d = this.getScrollLeft(),
 					f;
 				a.each(this.getChildren(), function() {
 					this === c && (f = true);
 					if (f) {
 						if (this.left - d >= b.viewportWidth * 2) return false;
 						a.each(this.getChildren(), function() {
 							this.type === u.PHOTO && this.lazyLoad()
 						})
 					}
 				});
 				this.chkAllIsLoaded()
 			}
 		}
 	};
 	_.extend(d.prototype, Backbone.Events);
 	j.prototype = {
 		constructor: j,
 		render: function(a) {
 			var b = this.slider.getHeight(),
 				c = this.layout;
 			this.height = b;
 			this.width = Ya[c](this, b);
 			this.setPosition(a);
 			return this.width
 		},
 		setPosition: function(b) {
 			this.left = b;
 			a.each(this.notes, function() {
 				this.setPosition(b)
 			})
 		},
 		getType: function() {
 			return this.notes[0].type
 		},
 		isEditable: function() {
 			var a = this.notes[0];
 			return a.type === u.PHOTO || a.type === u.TEXT
 		},
 		add: function(b, c) {
 			a.isArray(b) || (b = [b]);
 			var d = this;
 			a.each(b, function(a) {
 				var f = b[a];
 				f.setGroup(d);
 				c === void 0 ? d.notes.push(f) : d.notes.splice(a + c, 0, f)
 			})
 		},
 		numChildren: function() {
 			return this.notes.length
 		},
 		findChildren: function(b) {
 			var c;
 			a.each(this.notes, function() {
 				if (this._id == b) {
 					c = this;
 					return false
 				}
 			});
 			return c
 		},
 		getChildren: function() {
 			return this.notes.concat()
 		},
 		getLastChild: function() {
 			return _.last(this.notes)
 		},
 		getFirstChild: function() {
 			return this.notes[0]
 		},
 		getChildIndexOf: function(a) {
 			return _.indexOf(this.notes, a)
 		},
 		prevSibling: function() {
 			var a = this.slider;
 			return a.getChildAt(a.getChildIndexOf(this) - 1)
 		},
 		nextSibling: function() {
 			var a = this.slider;
 			return a.getChildAt(a.getChildIndexOf(this) + 1)
 		},
 		checkLayout: function() {
 			var a;
 			if (this.notes.length === 1) a = "full";
 			else {
 				a = this.notes[0].getGroupLayout();
 				a == "full" && (a = w(a))
 			}
 			this.setLayout(a)
 		},
 		setLayout: function(b) {
 			this.layout = b;
 			a.each(this.notes, function() {
 				this.setGroupLayout(b)
 			})
 		},
 		swap: function(a, b) {
 			if (a.group === b.group && a.group === this) {
 				var c = this.getChildIndexOf(a),
 					d = this.getChildIndexOf(b);
 				this.notes[c] = b;
 				this.notes[d] = a
 			}
 		},
 		replace: function(a, b) {
 			a.setGroupLayout(this.layout);
 			a.setGroup(this);
 			var c = this.getChildIndexOf(b);
 			this.notes[c] = a
 		},
 		shift: function() {
 			return this.notes.shift()
 		},
 		removeNote: function(a) {
 			var b = this.getChildIndexOf(a);
 			b > -1 && this.notes.splice(b, 1);
 			if (this.notes.length === 0) {
 				this.slider.remove(this);
 				return a
 			}
 			this.checkLayout();
 			return a
 		},
 		join: function(a) {
 			if (this.isEditable()) {
 				var b = a.getGroupLayout();
 				this.add(a);
 				this.setLayout(w(b))
 			}
 		},
 		concat: function(b) {
 			if (b.isEditable()) {
 				var c = this,
 					d = b.getChildren(),
 					f = b.layout;
 				a.each(d, function() {
 					c.add(this)
 				});
 				this.slider.remove(b);
 				this.setLayout(w(f))
 			}
 		},
 		split: function(a) {
 			var b = this.slider.getChildIndexOf(this) + 1;
 			if (a === 0) {
 				var c = this.notes.splice(1, this.notes.length - 1),
 					a = new j(this.slider);
 				a.add(c);
 				a.checkLayout();
 				this.slider.add(a, b)
 			} else {
 				c = this.notes.splice(a, this.notes.length - a);
 				if (c.length > 1) {
 					a = new j(this.slider);
 					a.add(c.splice(1, 1));
 					a.checkLayout();
 					this.slider.add(a, b);
 					a = new j(this.slider);
 					a.add(c);
 					a.checkLayout();
 					this.slider.add(a, b)
 				} else {
 					a = new j(this.slider);
 					a.add(c);
 					a.checkLayout();
 					this.slider.add(a, this.slider.getChildIndexOf(this) + 1)
 				}
 			}
 			this.checkLayout()
 		},
 		showLayoutToolbar: function() {
 			this.slider.isEditView && this.layout !== "full" && B.show(this, this.width, this.left)
 		},
 		hideLayoutToolbar: function() {
 			this.slider.isEditView && B.hide()
 		}
 	};
 	var ua, ba;
 	b.tripShowInit = function() {
 		var c = !! b._G_is_trip_author;
 		ba = new m.CoverPhoto({
 			el: a("#cover-photo")
 		});
 		if (c) {
 			ua = new m.CoverPhotoEditor(ba);
 			ua.on("opened", function() {
 				r.openMode("editCoverPhoto")
 			}).on("closed",

 			function() {
 				r.closeMode("editCoverPhoto");
 				a("body").removeClass("first-view")
 			});
 			a("#set-cover").click(function() {
 				ua.open();
 				return false
 			});
 			a("body").on("ajax:success", "form", function(c, d) {
 				var f = a(this).data("callback");
 				if (b[f]) b[f](d)
 			}).on("ajax:before", "form", function() {
 				var b;
 				a(this).find("input, textarea").each(function() {
 					var c = a(this);
 					if (!c.valid()) {
 						b = false;
 						c.showErrorTips()
 					}
 				});
 				return b
 			}).on("ajax:beforeSend", "form", function() {
 				a.fancybox.showActivity()
 			}).on("ajax:complete", "form", function() {
 				a.fancybox.hideActivity()
 			})
 		}
 		t.ready(function() {
 			r.init();
 			var c = a("html,body");
 			p.on("orientationchange", function() {
 			}, false);
 			a("#trip-comments").fancybox({
 				margin: 0,
 				padding: 0,
 				width: 490,
 				height: 540,
 				type: "iframe",
 				href: "/trips/" + _G_trip_id + "/comments",
 				scrolling: "no",
 				hideOnOverlayClick: false
 			});
 			c.on("keydown keyup", "input, textarea", function(a) {
 				a.keyCode != 27 && a.stopPropagation()
 			});
 			a("#trip-thumb").fancybox({
 				margin: 0,
 				padding: 0,
 				width: 720,
 				height: 540,
 				scrolling: "no",
 				type: "iframe",
 				onClosed: function() {
 					p.trigger("dochaschanged", ["", true])
 				}
 			});
 			a("#link-favorite").on("ajax:success", function() {
 				console.info("favorite");
 				var b = a(this);
 				b.hasClass("favorited") ? b.attr("title", "\u6536\u85cf").removeClass("favorited") : b.attr("title", "\u53d6\u6d88\u6536\u85cf").addClass("favorited")
 			});
 			if (WindowSize.height < 400) {
 				a("#share-bar").hide();
 				a("#top-menu").hide();
 				a("#trips-header").hide()
 			}
 			if (k) {
 				a("#scroll-left").hide();
 				a("#scroll-right").hide();
 				a("#edit-menu").hide()
 			}
 			var f = function(a) {
 				v.visibility || v.show();
 				var b = q.findNote(a);
 				if (b && b.group && b.group.left) q.scrollToGroup(b.group, true);
 				else q.on("rendered", function() {
 					q.scrollToGroup(b.group, true);
 					q.off("rendered", arguments.callee)
 				})
 			}, i = !! b._G_is_trip_author,
 				l = a("body");
 			l.hasClass("js-is-draft");
 			var o, q = new d("#slider", "#viewport"),
 				v = new m.TrainView({
 					el: a("#viewer")
 				}),
 				E = new m.MiniComments({
 					el: a("#comments-mini"),
 					tripId: _G_trip_id
 				}),
 				I = new Backbone.Router({
 					routes: {
 						"nt/:id": "note",
 						"nd/:id": "node",
 						"day/:id": "day",
 						end: "end"
 					}
 				});
 			if (i && !userCookie("tips-ew")) {
 				var y = a('<div id="tips-edit-view" class="tips-edit-view">\u7f16\u8f91\u6a21\u5f0f\u4e0b\u4fee\u6539\u6e38\u8bb0\u8d85\u65b9\u4fbf\u54e6</div>'),
 					w = a("#edit-menu"),
 					K = w.height(),
 					w = w.offset();
 				y.css({
 					top: w.top + K + 8,
 					left: w.left
 				});
 				a("#viewer").append(y);
 				q.on("openeditview", function() {
 					y.remove();
 					a.ajax({
 						type: "POST",
 						url: "/util/cookie/tips-ew"
 					});
 					q.off("openeditview", arguments.callee)
 				})
 			}
 			//n.setCollection(_G_trip_collection);
 			n.setCollection();
 			ba.on("load", function() {
 				ba.off("load");
 				a("#trip-loading").remove();
 				a("#js-trip").addClass("trips-wrapper-visible");
 				if (b._G_is_trip_first_view && b._G_is_trip_author) {
 					ua.open().openGuide();
 					a("body").addClass("first-view")
 				}
 				q.render()
 			});
 			var x, F, A;
 			a("#slider .note").each(function() {
 				var b = a(this),
 					c = b.data("group"),
 					d = b.data("type");
 				d === u.THEEND && _G_trip_collection.add({
 					id: "theend",
 					sid: 0,
 					type: "theend"
 				});
 				b = new tripshow.NOTE_CLASSES[d]({
 					el: b,
 					model: _G_trip_collection.get(b.attr("id")),
 					inited: true,
 					isAuthor: i
 				});
 				i && b.canEdit();
 				if (m.Note.isNode(b) || c != x) {
 					A && A.checkLayout();
 					F = new j(q);
 					F.add(b);
 					q.add(F);
 					A = F
 				} else F.add(b);
 				x = c
 			});
 			A && A.checkLayout();
 			x = F = A = null;
 			v.on("opened", function() {
 				r.openMode("trainView");
 				q.preload();
 				o && q.openEditView()
 			}).on("closed", function() {
 				r.closeMode("trainView");
 				(o = q.isEditView) && q.closeEditView();
 				q.stopPlay()
 			});
 			q.on("slider:scroll", function() {
 				E.close()
 			}).on("openeditview", function() {
 				l.addClass("edit-view");
 				setUnselectable(q.$viewport, "on");
 				a("#tips-edit-view").remove()
 			}).on("closeeditview",

 			function() {
 				l.removeClass("edit-view");
 				setUnselectable(q.$viewport, "off")
 			}).on("zoomout", function() {
 				l.addClass("slider-zoom-out")
 			}).on("restore", function() {
 				l.removeClass("slider-zoom-out")
 			});
 			var z, K = function() {
 				ba.resize();
 				n.resize();
 				if (v.visibility) {
 					q.resizeViewport();
 					q.render()
 				} else {
 					clearTimeout(z);
 					z = setTimeout(function() {
 						q.resizeViewport();
 						q.render()
 					}, 300)
 				}
 				q.preload()
 			};
 			WindowResizeListener.add(K);
 			p.on("orientationchange", K);
 			K = new m.TripNav("#trips-header", q);
 			q.setPath(K.nav);
 			t.on("keydown", function(a) {
 				var b = a.keyCode;
 				if (n.isOpened()) switch (b) {
 				case 37:
 					n.prev();
 					break;
 				case 39:
 					n.next();
 					break;
 				case 27:
 					n.close();
 					break;
 				case 80:
 					n.isPlaying() ? n.stopPlay() : n.autoPlay();
 					break;
 				case 32:
 					n.next()
 				} else if (v.visibility) if (q.isEditView && b === 90) q.isZoomOut || q.zoomout();
 				else if (a.shiftKey && b === 32) q.slideRightScreen();
 				else if (a.metaKey) switch (b) {
 				case 37:
 					q.slideRightScreen();
 					break;
 				case 39:
 					q.slideLeftScreen()
 				} else switch (b) {
 				case 37:
 					q.slideLeft();
 					a.stopPropagation();
 					a.preventDefault();
 					break;
 				case 39:
 					q.slideRight();
 					a.stopPropagation();
 					a.preventDefault();
 					break;
 				case 38:
 				case 33:
 					q.slideRightScreen();
 					break;
 				case 40:
 				case 34:
 				case 32:
 					q.slideLeftScreen();
 					break;
 				case 80:
 					q.isPlaying() ? q.stopPlay() : q.autoPlay()
 				}
 			}).on("note:zoomin", function(a, b) {
 				var c = b.model;
 				c && n.open(c)
 			});
 			a("#scroll-left").click(function() {
 				n.isOpened() ? n.prev() : q.slideRightScreen()
 			});
 			a("#scroll-right").click(function() {
 				n.isOpened() ? n.next() : q.slideLeftScreen()
 			});
 			a("#js-cover-title, #open-trips").click(function() {
 				v.show()
 				$("#js-trip").css("z-index", "9999999");
 			});
 			a("#open-layout").click(function() {
 				q.openEditView()
 			});
 			a("#quit-layout").click(function() {
 				q.closeEditView()
 			});
 			a("#back-cover").click(function() {
 				v.hide();
 				I.navigate("")
 				$("#js-trip").css("z-index", "1");
 			});
 			a("#slider-zoom").click(function() {
 				q.restore()
 			});
 			p.on("dochaschanged", function(a, b, c) {
 				I.navigate(b, {
 					trigger: !c
 				})
 			}).on("note:commented", function() {
 				var b = a("#cover-header .comments-num span"),
 					c = b.text() - 0 + 1;
 				b.text(c);
 				a("#trip-comments span").text(c)
 			}).on("note:commentdeleted", function() {
 				var b = a("#cover-header .comments-num span"),
 					c = b.text() - 0 - 1;
 				b.text(c);
 				a("#trip-comments span").text(c)
 			});
 			n.on("open", function(a) {
 				q.stopPlay();
 				a !== false && I.navigate(a)
 			}).on("close", function() {
 				I.navigate("");
 				q.stopPlay()
 			}).on("noteshow", function(a) {
 				(a = q.findNote(a)) && q.scrollToGroup(a.group, true)
 			});
 			p.on("note:like", function(c, d) {
 				var f = d.model,
 					i;
 				i = f.get("likes_count") || 0;
 				var j = a("#cover-header .liked-num span").text() - 0 || 0;
 				if (f.get("current_user_like")) {
 					i = {
 						likes_count: Math.max(i - 1, 0),
 						current_user_like: false
 					};
 					j = j - 1
 				} else {
 					i = {
 						likes_count: i + 1,
 						current_user_like: true
 					};
 					j = j + 1
 				}
 				if (b._G_user_signed_in) {
 					f.set(i);
 					a("#cover-header .liked-num span").text(Math.max(j,
 					0));
 					a.ajax({
 						url: "/trips/" + _G_trip_id + "/like",
 						type: "POST",
 						data: {
 							likeable_id: f.get("sid"),
 							likeable_type: TripUtils.noteServerType(d.type)
 						}
 					})
 				} else {
 					I.navigate("nt/" + f.get("sid"));
 					open_sign_in_window()
 				}
 			}).on("note:comments", function(a, b, c) {
 				E.open(a, b, c)
 			});
 			if (i) {
 				B.init(q);
 				_G_trip_collection.every(function(a) {
 					if ((a = a.get("memo")) && a.price_currency) {
 						TripUtils.PriceCurrencyManager.lastPriceCurrency = a.price_currency;
 						return false

 					}
 					return true
 				});
 				O.init();
 				M.init(q);
 				b.editTitleCallback = function() {
 					TripEditor.titleEditor.success()
 				};
 				b.editPhotoCallback = function(a) {
 					TripEditor.photoEditor.success(a)
 				};
 				b.editNodeCallback = function() {
 					TripEditor.nodeEditor.success()
 				};
 				b.editTipsCallback = function(a) {
 					TripEditor.tipsEditor.success(a)
 				};
 				b.photoRotateCallback = function(a) {
 					TripEditor.photoRotate.success(a);
 					q.render()
 				};
 				a("#edit-trip-name").click(function(a) {
 					a.stopPropagation();
 					TripEditor.titleEditor.open()
 				});
 				var D = function(a) {
 					M.onMousemove(a)
 				};
 				t.on("addtext", function(c, d) {
 					var f = d.getFirstChild(),
 						i = f.getId();
 					b.textNoteCallback = function(b) {
 						if (b) {
 							b.sid = b.id;
 							b.id = "nt-" + b.id;
 							_G_trip_collection.add(b);
 							var c = a(a("#_tpl_note_text").html()).attr({
 								id: b.id
 							}),
 								b = new tripshow.View.TextNote({
 									el: c,
 									model: _G_trip_collection.get(b.id),
 									isAuthor: true
 								});
 							b.render();
 							b.canEdit();
 							c = new j(q);
 							c.add(b);
 							c.checkLayout();
 							q.insertBefore(d, c);
 							f.$el.before(b.$el);
 							q.render();
 							a.fancybox.close()
 						}
 					};
 					TripEditor.textEditor.open(null, i)
 				}).on("note:drag", function(a, b) {
 					M.onMousedown(a, b);
 					t.on("mousemove", D).on("mouseup", function(a) {
 						t.off("mousemove", D).off("mouseup", arguments.callee);
 						M.onMouseup(a,
 						b)
 					})
 				}).on("note:edit", function(c, d, f) {
 					if (l.hasClass("edit-view")) {
 						c = d.model;
 						switch (d.type) {
 						case u.PHOTO:
 							C.add({
 								url: "/trips/" + _G_trip_id + "/notes/" + d.model.get("sid"),
 								type: "PUT",
 								data: {
 									description: f || ""
 								}
 							}).run();
 							break;
 						case u.TEXT:
 							b.textNoteCallback = function(b) {
 								if (b) {
 									_G_trip_collection.get("nt-" + b.id).set({
 										description: b.description,
 										description_display: b.description_display
 									});
 									a.fancybox.close()
 								}
 							};
 							TripEditor.textEditor.open(d);
 							break;
 						case u.NODE:
 							TripEditor.nodeEditor.open(d, c);
 							break;
 						case u.TIPS:
 							TripEditor.tipsEditor.open(d)
 						}
 					}
 				}).on("note:delete",

 				function(b, c) {
 					a.confirm("\u786e\u8ba4\u5220\u9664\u6b64\u5185\u5bb9\uff1f", function(b) {
 						if (b) {
 							C.add({
 								url: "/trips/" + _G_trip_id + "/notes/" + c.getId("int"),
 								type: "DELETE"
 							}).run();
 							if (c.type === u.PHOTO) {
 								var b = a("#open-trips .photo-count"),
 									d = parseInt(b.text(), 10) || 0;
 								b.text(d - 1 + "\u56fe")
 							}
 							c.remove();
 							q.render()
 						}
 					})
 				}).on("photo:rotate", function(a, b) {
 					TripEditor.photoRotate.open(b)
 				})
 			}
 			I.on("route:note", function(a) {
 				f("nt-" + a)
 			}).on("route:node", function(a) {
 				f("nd-" + a)
 			}).on("route:day", function(a) {
 				f("d-" + a)
 			}).on("route:end",

 			function() {
 				f("theend")
 			});
 			Backbone.history.start();
 			setTimeout(function() {
 				var a = b._G_trip_front_cover_photo;
 				WindowSize.height < 500 && /\.jpg$/.test(a) && (a = a + "");
 				ba.setSrc(a)
 			}, 50)
 		})
 	}
 })(window, document, jQuery);

 function utf8_encode(b) {
 	if (b === null || typeof b === "undefined") return "";
 	var b = b + "",
 		f = "",
 		a, c, d = 0;
 	a = c = 0;
 	for (var d = b.length, j = 0; j < d; j++) {
 		var k = b.charCodeAt(j),
 			p = null;
 		k < 128 ? c++ : p = k > 127 && k < 2048 ? String.fromCharCode(k >> 6 | 192) + String.fromCharCode(k & 63 | 128) : String.fromCharCode(k >> 12 | 224) + String.fromCharCode(k >> 6 & 63 | 128) + String.fromCharCode(k & 63 | 128);
 		if (p !== null) {
 			c > a && (f = f + b.slice(a, c));
 			f = f + p;
 			a = c = j + 1
 		}
 	}
 	c > a && (f = f + b.slice(a, d));
 	return f
 }

 function base64_encode(b) {
 	var f, a, c, d, j = 0,
 		k = 0,
 		p = "",
 		p = [];
 	if (!b) return b;
 	b = utf8_encode(b + "");
 	do {
 		f = b.charCodeAt(j++);
 		a = b.charCodeAt(j++);
 		c = b.charCodeAt(j++);
 		d = f << 16 | a << 8 | c;
 		f = d >> 18 & 63;
 		a = d >> 12 & 63;
 		c = d >> 6 & 63;
 		d = d & 63;
 		p[k++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d)
 	} while (j < b.length);
 	p = p.join("");
 	switch (b.length % 3) {
 	case 1:
 		p = p.slice(0, - 2) + "==";
 		break;
 	case 2:
 		p = p.slice(0, - 1) + "="
 	}
 	return p
 }

 function urlsafe_base64_encode(b) {
 	return base64_encode(b).replace(/\+/g, "-").replace(/\//g, "_")
 }

 function generate_rs_put_path(b, f, a) {
 	a = a || "image/jpeg";
 	return "/rs-put/" + urlsafe_base64_encode(b + ":" + f) + "/mimeType/" + urlsafe_base64_encode(a)
 }
 var NodesEditor;
 (function(b, f, a) {
 	var c, d;

 	function j(b, c) {
 		var c = c || {}, d = this,
 			f = a(b),
 			j = a('<div class="dummy">');
 		this.data = c.data || {};
 		this.$dummy = j.appendTo(f);
 		this.options = c;
 		f.on("mousedown", ".ico-remove", function(a) {
 			a.stopPropagation()
 		});
 		f.on("mousedown", ".dbox-item", function(b) {
 			D.onMousedown(d);
 			d.$items = f.find(".dbox-item");
 			var c = a(this);
 			c.on("mousemove", function() {
 				d.offset = t(b, c);
 				d.elOffset = f.offset();
 				d.limitMax = {
 					x: f.width() - c.outerWidth(),
 					y: f.height() - c.outerHeight()
 				};
 				d.createDummy(b, c);

 				c.off("mousemove").off("mouseup")
 			}).on("mouseup",

 			function() {
 				c.off("mousemove").off("mouseup")
 			})
 		});
 		this.$el = f
 	}

 	function k(b, c) {
 		this.$el = a("#" + b);
 		this.$photoList = this.$el.find(".photo-list");
 		this.$nodes = this.$el.find(".nodes .trip-node");
 		this.dayId = this.$el.data("id");
 		this.options = c;
 		this.resize();
 		this.updateNodeCount();
 		var d = this;
 		this.dbox = new j(this.$el.find(".dbox"), a.extend(c, {
 			data: {
 				dayId: this.dayId
 			}
 		}));
 		this.$el.on("mousedown mouseup", ".photo .unbind-note, .photo .ico-remove", function(a) {
 			a.stopPropagation()
 		});
 		this.$el.on("click", ".photo .unbind-note",

 		function(b) {
 			b.stopPropagation();
 			var b = a(this).parent().parent(".photo"),
 				c = b.data("note-id"),
 				f = d.options.callback.onPhotoUnbindNode;
 			b.find(".node-name span").empty();
 			b.find(".node-name").hide();
 			f && f(c || 0)
 		}).on("click", ".photo .ico-remove", function(b) {
 			b.stopPropagation();
 			var c = a(this).parent(".photo");
 			a.confirm("\u786e\u8ba4\u5220\u9664\u8fd9\u5f20\u76f8\u7247\uff1f", function(b) {
 				if (b) {
 					var b = c.data("note-id"),
 						f = d.options.callback.onRemovePhoto;
 					f && f(b || 0);
 					c.remove();
 					b = a(".photo-list .photo").length;
 					a(".photo-num").text(b);
 					b || a(".btn-gen-trip").addClass("btn-submit-disable")
 				}
 			})
 		}).on("click", ".trip-node .ico-remove", function() {
 			var b = a(this).parent(".trip-node");
 			a.confirm("\u786e\u8ba4\u5220\u9664\u884c\u7a0b\u4e2d\u7684\u8fd9\u4e2a\u4e8b\u4ef6\uff1f", function(a) {
 				if (a) {
 					var a = b.data("id"),
 						c = d.options.callback.onRemoveNode;
 					c && c(d.dayId, a || 0);
 					b.remove();
 					d.nodeDeleted(a)
 				}
 			})
 		}).on("click", ".trip-node", function() {
 			var b = a(this),
 				c = b.data("id"),
 				b = b.data("name");
 			if (c && d.bindNode(c, b)) {
 				(b = d.options.callback.onPhotoBindNode) && b(d.dayId,
 				c, d.getSelectedIds());
 				d.clearSelected()
 			}
 		});
 		this.$el.on("mousedown", ".photo", function(b) {
 			var c = a(this),
 				j = b.shiftKey;
 			a(f).trigger("photogroup:mousedown", d);
 			d.isMousedown = true;
 			d.clickItem = c;
 			d.clickPos = t(b, c);
 			c.on("mouseup", function() {
 				c.off("mousemove").off("mouseup");
 				d.isMousedown = false;
 				var b = c.data("note-id"),
 					f, i;
 				if (j && d.lastSelectPhotoId > 0) d.$photoList.find(".photo").removeClass("selected").each(function() {
 					var c = a(this),
 						j = c.data("note-id");
 					if (!f && (j === d.lastSelectPhotoId || j === b) && !(j === d.lastSelectPhotoId && j === b)) {
 						f = true;
 						i = j
 					}
 					if (f) {
 						c.addClass("selected");
 						if (j !== i && (j === d.lastSelectPhotoId || j === b)) return false
 					}
 				});
 				else if (c.hasClass("selected")) {
 					c.removeClass("selected");
 					d.lastSelectPhotoId = 0
 				} else {
 					c.addClass("selected");
 					d.lastSelectPhotoId = b
 				}
 			}).on("mousemove", function() {
 				c.off("mousemove").off("mouseup");
 				c.hasClass("selected") || c.addClass("selected")
 			});
 			n.onMousedown(b)
 		})
 	}

 	function p(b, c) {
 		var c = a(c),
 			d = c.outerWidth(),
 			f = c.outerHeight(),
 			j = c.offset();
 		return b.x >= j.left && b.x <= j.left + d && b.y >= j.top && b.y <= j.top + f ? {
 			left: b.x - j.left < d / 2
 		} : false
 	}

 	function t(b, c) {
 		var d = a(c).offset();
 		return {
 			x: b.pageX - d.left,
 			y: b.pageY - d.top
 		}
 	}
 	var m = a(b),
 		n, u, r, y, x, q, w;
 	n = {
 		init: function(b) {
 			u = b;
 			a(f).on("photogroup:mousedown", function(a, b) {
 				r = b
 			})
 		},
 		onMousedown: function(b) {
 			c = b.clientX;
 			d = b.clientY;
 			a(f).on("mousemove", this.onMousemove).on("mouseup", this.onMouseup)
 		},
 		onMouseup: function(b) {
 			a(f).off("mousemove", this.onMousemove).off("mouseup", this.onMouseup);
 			clearInterval(q);
 			w = false;
 			if (r && r.isMousedown) {
 				u.checkDropInside(b, r);
 				y && y.remove();
 				y = null;
 				r.stopDrag();
 				r.isMousedown = false
 			}
 		},
 		onMousemove: function(f) {
 			if (r && r.isMousedown) {
 				Date.now();
 				if (!y) {
 					if (r) {
 						x = r.clickPos;
 						var j = r.getSelected(),
 							k = r.clickItem,
 							n = [];
 						y = a('<div class="dragger" unselectable="on"><div class="photos-count"></div><div class="mask"></div></div>');
 						y.find(".photos-count").text(j.length + "\u5f20");
 						a.each(j, function(f) {
 							var l, m, i = a('<div class="clone-photo">'),
 								p = a(j[f]).offset();
 							m = a(b);
 							l = p.left - m.scrollLeft();
 							m = p.top - m.scrollTop();
 							p = k === j[f];
 							l = {
 								left: l - c + x.x,
 								top: m - d + x.y,
 								zIndex: p ? 1 : 0
 							};
 							f = a(j[f]).find("img").clone();
 							i.append(f);
 							i.css(l);
 							p ? n.unshift(i) : n.push(i)
 						});
 						a.each(n, function(a) {
 							y.append(n[a])
 						});
 						a("body").append(y);
 						setTimeout(function() {
 							a.each(n, function(b) {
 								var c = {
 									left: 0,
 									top: 0
 								};
 								a.support.cssAttrCheck("transform") ? n[b].css(c) : n[b].animate(c, {
 									duration: 200
 								})
 							});
 							setTimeout(function() {
 								y && y.addClass("dragger-bundled")
 							}, 100)
 						}, 25)
 					}
 					r.startDrag()
 				}
 				y.css({
 					left: f.pageX - x.x,
 					top: f.pageY - x.y
 				});
 				if (!w) {
 					w = true;
 					clearInterval(q);
 					var p = function() {
 						if (y) {
 							var b = m.height(),
 								c = m.scrollTop(),
 								d = y.offset(),
 								f;
 							if (d.top - c < 0) {
 								f = true;
 								a("html,body").animate({
 									scrollTop: "-=" + Math.ceil(b * 0.7)
 								}, {
 									duration: 500
 								})
 							} else if (c + b - d.top < 80) {
 								f = true;
 								a("html,body").animate({
 									scrollTop: "+=" + Math.ceil(b * 0.7)
 								}, {
 									duration: 500
 								})
 							}
 							if (f) {
 								clearInterval(q);
 								setTimeout(function() {
 									q = setInterval(p, 1E3)
 								}, 1500)
 							}
 						}
 					};
 					q = setInterval(p, 1E3)
 				}
 			}
 		}
 	};
 	NodesEditor = function(b, c) {
 		var d = this,
 			c = a.extend({
 				callback: {}
 			}, c);
 		this.photoGroups = {};
 		b.each(function() {
 			var a = new k(this.id, c);
 			d.photoGroups[this.id] = a
 		});
 		n.init(this);
 		WindowResizeListener.add(function() {
 			a.each(d.photoGroups,

 			function() {
 				this.resize()
 			})
 		});
 		a(window).on("node:added", function(b, c, f) {
 			a.each(f, function(a) {
 				d.addNodeToDay(c, f[a])
 			})
 		})
 	};
 	NodesEditor.prototype = {
 		checkDropInside: function(b, c) {
 			a.each(this.photoGroups, function() {
 				if (this.dropInside(b, c)) return false
 			})
 		},
 		addNodeToDay: function(a, b) {
 			a = "day-" + a;
 			this.photoGroups[a] && this.photoGroups[a].addNode(b)
 		},
 		removeNode: function(a, b) {
 			a = "day-" + a;
 			this.photoGroups[a] && this.photoGroups[a].removeNode(b)
 		}
 	};
 	var D, C;
 	D = {
 		onMousedown: function(b) {
 			C = b;
 			a(f).on("mousemove", this.onMousemove).on("mouseup",
 			this.onMouseup)
 		},
 		onMouseup: function(b) {
 			a(f).off("mousemove", this.onMousemove).off("mouseup", this.onMouseup);
 			C && C.onMouseup(b)
 		},
 		onMousemove: function(a) {
 			C && C.moveDummy(a)
 		}
 	};
 	j.prototype = {
 		createDummy: function(a, b) {
 			var c = b.clone();
 			this.$dummy.empty().append(c.css("margin", "0")).show();
 			this.clickItem = b.css("visibility", "hidden");
 			this.clickItemIndex = this.$items.index(b);
 			this.moveDummy(a)
 		},
 		moveDummy: function(b) {
 			var c = b.pageY - this.elOffset.top - this.offset.y,
 				c = {
 					left: Math.min(Math.max(b.pageX - this.elOffset.left - this.offset.x, 0), this.limitMax.x),
 					top: Math.min(Math.max(c, 0), this.limitMax.y)
 				};
 			this.$dummy.css(c);
 			var d = {
 				x: b.pageX,
 				y: b.pageY
 			}, f = this;
 			f.$items.each(function() {
 				var b = a(this),
 					c = p(d, this);
 				if (c) {
 					if (f.clickItem[0] !== this) {
 						c.left ? b.before(f.clickItem) : b.after(f.clickItem);
 						f.$items = f.$el.find(">.dbox-item")
 					}
 					return false
 				}
 			})
 		},
 		onMouseup: function() {
 			this.$dummy.hide();
 			if (this.clickItem && this.clickItem.length) {
 				this.clickItem.css("visibility", "visible");
 				var a = this.$items.index(this.clickItem);
 				if (this.clickItemIndex != a) {
 					var b = this.options.callback.onNodeStatusChange;
 					b && b.call(this, this.clickItem.data("id"), a)
 				}
 			}
 			this.clickItem = null
 		}
 	};
 	k.prototype.nodeDeleted = function(a) {
 		this.$photoList.find('.photo[data-node-id="' + a + '"]').find(".node-name").hide().find("span").text("")
 	};
 	k.prototype.updateNodeCount = function(b) {
 		var c = this;
 		this.$nodes.each(function() {
 			var d = a(this),
 				f = d.data("id"),
 				f = c.$photoList.find('.photo[data-node-id="' + f + '"]').length,
 				j = d.find(".count"),
 				k = parseInt(j.text());
 			isNaN(k) && (k = 0);
 			f > 0 ? j.text(f + " \u5f20").show() : j.hide();
 			if (b) {
 				f = f - k;
 				if (f > 0) {
 					var l = a('<div class="bubble">' + (f > 0 ? "+" : "") + f + "</div>").appendTo(d);
 					f > 0 && l.addClass("bubble-add");
 					l.animate({
 						fontSize: "50px",
 						opacity: 1
 					}, 400).animate({
 						top: "-25px",
 						fontSize: "12px"
 					}, {
 						duration: 300,
 						complete: function() {
 							l.remove()
 						}
 					})
 				}
 			}
 		})
 	};
 	k.prototype.resize = function() {
 		var a = this.$photoList.find(".photo"),
 			b = this.$photoList.width(),
 			c = a.eq(0).width() + 20;
 		if (a.length) {
 			var d = Math.floor(b / c);
 			a.css({
 				"margin-left": Math.floor((b - (c - 20) * d) / (d + 1))
 			})
 		}
 	};
 	k.prototype.chkPhotos = function() {
 		this.$el.find(".photo").length ? this.$el.find(".no-photo").hide() : this.$el.find(".no-photo").show()
 	};
 	k.prototype.dropInside = function(b, c) {
 		var d = this,
 			f = this.$el,
 			j = {
 				x: b.pageX,
 				y: b.pageY
 			}, k = c.getSelected(),
 			l = c.getSelectedIds(),
 			m = d.options.callback.onPhotoBindNode;
 		if (p(j, f)) {
 			var i;
 			this.$nodes.each(function() {
 				var f = a(this);
 				if (p({
 					x: b.pageX,
 					y: b.pageY
 				}, f)) {
 					var j = f.data("id"),
 						k = f.data("name");
 					if (!j) {
 						f.find(".iframe").click();
 						return false
 					}
 					c.bindNode(j, k) && m && m(d.dayId, j, l);
 					i = true;
 					d.updateNodeCount(true);
 					return false
 				}
 			});
 			if (c !== d) {
 				i || c.unbindNode();
 				d.$photoList.prepend(k);
 				d.chkPhotos();
 				c.chkPhotos();
 				i || m && m(d.dayId, d.$el.data("default-node-id"), l);
 				d.clearSelected()
 			}
 			i && d.clearSelected();
 			d.stopDrag();
 			return true
 		}
 		return false
 	};
 	k.prototype.startDrag = function() {
 		this.isDragging = true;
 		this.getSelected().addClass("mv")
 	};
 	k.prototype.stopDrag = function() {
 		this.isDragging = false;
 		this.$el.find(".photo").removeClass("mv")
 	};
 	k.prototype.getSelected = function() {
 		return this.$el.find(".photo.selected")
 	};
 	k.prototype.getSelectedIds = function() {
 		var b = [];
 		this.getSelected().each(function() {
 			b.push(a(this).data("note-id"))
 		});
 		return b
 	};
 	k.prototype.unbindNode = function() {
 		var a = this.getSelected(),
 			b = a.length;
 		a.find(".node-name").addClass("hidden").find("span").text("");
 		return b
 	};

 	k.prototype.bindNode = function(a, b) {
 		var c = this.getSelected().attr("data-node-id", a);
 		c.find(".node-name").removeClass("hidden").find("span").text(b);
 		return c.length
 	};
 	k.prototype.clearSelected = function() {
 		this.getSelected().removeClass("selected")
 	};
 	k.prototype.addNode = function(a) {
 		if (this.$el.find('.nodes .trip-node[data-id="' + a.id + '"]').length) return false;
 		a = '<div unselectable="on" class="dbox-item trip-node" data-id="' + a.id + '" data-name="' + a.name + '"><div class="ico ' + a.type + '"></div><div class="name">' + a.name + '</div><div class="count"></div><i class="ico-remove"></i><i class="ico-arrow"></i></div>';
 		this.$el.find(".nodes .add-node").before(a);
 		this.$nodes = this.$el.find(".nodes .trip-node")
 	};
 	k.prototype.removeNode = function(a) {
 		this.$el.find('.nodes .trip-node[data-id="' + a + '"]').remove()
 	}
 })(window, document, jQuery);
 $.fn.uploader = function(b, f) {
 	function a(a, b) {
 		this.file = a;
 		this.callback = b || {};
 		this._createEl()
 	}

 	function c(a) {
 		var b = a.files.length,
 			c = Date.now(),
 			d = 12;
 		a.total.uploaded && (d = (c - F) / 1E3 / a.total.uploaded);
 		return b * d
 	}

 	function d(a) {
 		return a && a > 60 ? Math.floor(a / 60) + "\u5206\u949f" + a % 60 + "\u79d2" : "\u4e0d\u52301\u5206\u949f"
 	}

 	function j() {
 		var a = r.find(".timeleft"),
 			b = a.attr("time") - 0,
 			b = b - 1;
 		a.text(d(b)).attr("time", b)
 	}

 	function k(a) {
 		if (plupload.STOPPED != a.state) {
 			var b = Math.floor(c(a) - (Date.now() - F) / 1E3);
 			r.html("\u5df2\u4e0a\u4f20 <i>" + a.total.uploaded + "/" + a.files.length + '</i> \u5f20\u76f8\u7247\uff0c\u9884\u8ba1\u8fd8\u9700 <i class="timeleft" time="' + b + '">' + d(b) + "</i> \u4e0a\u4f20\u5b8c\u6210")
 		}
 	}
 	var p = f.formUrl,
 		t = f.photosCount;
 	a.prototype._createEl = function() {
 		var a = this.file,
 			b = this;
 		if (!this.$el) {
 			var c = $('<li class="clearfix"><div class="filename">' + a.name + '</div><div class="progress-bar"><div class="bar"><span></span></div><div class="status">\u7b49\u5f85\u4e0a\u4f20</div></div></li>');
 			this.$btnDel = c.find(".delete").click(function() {
 				b.callback.delFun && b.callback.delFun(a);
 				c.remove();
 				return false
 			});
 			this.$el = c;
 			this.$progressBar = c.find(".bar");
 			this.$text = this.$progressBar.find("span");
 			this.$status = c.find(".status")
 		}
 		return this.$el
 	};
 	a.prototype.setError = function(a) {
 		this.error = true;
 		this.$progressBar.stop().addClass("error").width("100%");
 		this.$text.text(a)
 	};
 	a.prototype.startUpload = function(a) {
 		this.$status.addClass("hidden");
 		this.$progressBar.addClass("uploading");
 		this.percent = a;
 		this.ani(1E4)
 	};
 	a.prototype.ani = function(a) {
 		var b = this;
 		this.$progressBar.stop().animate({
 			width: this.percent + "%"
 		}, {
 			duration: a,
 			step: function(a) {
 				b.$text.text(a.toFixed(1) + "%")
 			},
 			complete: function() {
 				b.percent == 100 && b.$text.text("\u5df2\u4e0a\u4f20")
 			}
 		})
 	};
 	a.prototype.setProgress = function(a) {
 		if (!this.error) if (a === 0) this.ani(3E4);
 		else if (a === 100) {
 			this.percent = 100;
 			this.ani(200)
 		}
 	};
 	var m = this;
 	$("#uploader .js-uploader-box").html('<div class="filelist-wrapper"><ul id="uploader-filelist" class="filelist"></ul>');
 	var n = $("#uploader-filelist"),
 		u = m.attr("id"),
 		r = $("#upload-status .status"),
 		y = $("#upload-status .btn-next-step"),
 		x = {};
 	n.height();
 	var q = 0,
 		w = 0,
 		D = 0,
 		C, E, F;
 	if (!u) {
 		u = plupload.guid();
 		m.attr("id", u)
 	}
 	var o = new plupload.Uploader($.extend({
 		browse_button: "btn-upload",
 		container: u,
 		drop_element: u + "-filelist"
 	}, b));
 	o.bind("FilesAdded", function(b, c) {
 		var d = $();
 		$.each(c, function(f, j) {
 			var i = new a(j, {
 				delFun: function(a) {
 					b.removeFile(a);
 					delete c[a.id]
 				}
 			});
 			x[j.id] = i;
 			d = d.add(i.$el)
 		});
 		n.append(d);
 		$("#upload-guide").remove()
 	});
 	o.bind("Init", function(a) {
 		m.attr("data-runtime", a.runtime);
 		t >= 128 && $.confirm("\u8be5\u6e38\u8bb0\u5df2\u8fbe\u5230128\u5f20\u76f8\u7247\u4e0a\u9650",

 		function() {
 			window.location.href = p
 		}, {
 			btnCancel: false
 		})
 	});
 	o.bind("Refresh", function(a) {
 		k(a);
 		if (!E && a.total.queued) {
 			a.start();
 			F = Date.now();
 			$.clearTimer(C);
 			C = setInterval(j, 1E3)
 		}
 	});
 	o.bind("Error", function(a, b) {
 		q++;
 		if (b && b.file) {
 			var c = x[b.file.id];
 			if (c) switch (b.code) {
 			case -702:
 				c.setError("\u76f8\u7247\u5bbd\u9ad8\u5927\u4e8e8100px");
 				break;
 			default:
 				c.setError("\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u72b6\u6001")
 			}
 		}
 	});
 	o.bind("BeforeUpload", function(a, b) {
 		if (t >= 128) {
 			E = true;
 			D = a.files.length - a.total.uploaded;
 			$.confirm("\u8be5\u6e38\u8bb0\u5df2\u8fbe\u5230128\u5f20\u76f8\u7247\u4e0a\u9650", null, {
 				btnCancel: false
 			});
 			a.stop();
 			return false
 		}
 		var c = x[b.id],
 			d = $.rnd(75, 99);
 		c && c.startUpload(d);
 		_G_qiniu_key = _G_trip_id + "/" + Date.now() + b.id;
 		o.settings.multipart_params.action = generate_rs_put_path(_G_qiniu_callback ? "TripPhoto" : "DevTripPhoto", _G_qiniu_key + ".jpg");
 		o.settings.multipart_params.params = "key=" + _G_qiniu_key
 	});
 	o.bind("QueueChanged", function(a) {
 		r.removeClass("hidden");
 		k(a)
 	});
 	o.bind("FileUploaded",

 	function(a, b, c) {
 		var a = x[b.id],
 			d;
 		c && (d = $.parseJSON(c.response));
 		if (d && d.result) switch (d.result) {
 		case 1:
 			a && a.setError("\u76f8\u7247\u5bbd\u9ad8\u5c0f\u4e8e400px");
 			w++;
 			q++;
 			break;
 		case 2:
 			a && a.setError("\u8d85\u8fc7128\u5f20");
 			D++;
 			break;
 		case 0:
 			t = t + 1
 		} else t = t + 1;
 		c = $("#uploader");
 		d = c.scrollTop();
 		b = c.height();
 		a = a.$el.position().top;
 		d = d + b / 2;
 		a > d && c.animate({
 			scrollTop: d
 		}, 200);
 		_G_qiniu_callback || $.ajax({
 			type: "POST",
 			url: "/qiniu/callback/" + _G_trip_id,
 			data: {
 				key: _G_qiniu_key
 			},
 			dataType: "json"
 		})
 	});
 	o.bind("StateChanged",

 	function(a) {
 		if (plupload.STOPPED == a.state && a.total.uploaded > 0) if (a.total.queued || q || w || D) {
 			y.show();
 			errorText = "\u4e0a\u4f20\u4e0d\u6210\u529f";
 			q && (errorText = q + "\u5f20\u76f8\u7247" + errorText);
 			D && (errorText = D + "\u5f20\u76f8\u7247\u8d85\u51fa128\u5f20\u76f8\u7247\u4e0a\u9650\uff0c" + errorText);
 			r.text(errorText)
 		} else window.location.href = p
 	});
 	o.bind("UploadProgress", function(a, b) {
 		var c = x[b.id];
 		c && c.setProgress(b.percent);
 		k(a)
 	});
 	o.init();
 	y.click(function() {
 		window.location.href = p;
 		return false
 	});
 	return o
 };

 function swfuploadInit(b, f, a, c) {
 	var f = {
 		runtimes: "flash",
 		max_file_size: "30mb",
 		url: f,
 		flash_swf_url: a,
 		filters: [{
 			title: "\u76f8\u7247",
 			extensions: "jpg,JPG,jpeg,JPEG"
 		}],
 		resize: {
 			width: 1600,
 			height: 1600,
 			quality: 80
 		},
 		multipart_params: {}
 	}, d = $(".add-trip-upload");
 	d.uploader(f, {
 		photosCount: b,
 		formUrl: c
 	});
 	screen.height < 768 && $("#upload-guide").addClass("upload-guide-small");
 	WindowResizeListener.add(function() {
 		var a = $("#btn-upload")[0],
 			b = plupload.getPos(a, d[0]),
 			a = plupload.getSize(a);
 		$(".plupload").css({
 			top: b.y + "px",
 			left: b.x + "px",
 			width: a.w + "px",
 			height: a.h + "px"
 		})
 	})
 }
 (function() {
 	$.fn.isCommentsPopup = function(b) {
 		var b = b || {}, f = window.parent ? parent.document.location.href : "";
 		if (!b.tripId) return this;
 		this.each(function() {
 			var a = $(this),
 				c = a.find(".textarea").textCounter().hasPlaceholder(),
 				d = a.find(".loading"),
 				j = a.find('input[name="reply_to_id"]'),
 				k = a.find('input[name="commentable_type"]'),
 				p = a.find('input[name="commentable_id"]'),
 				t = a.find(".comment-list").scrollbar({
 					type: "ver"
 				});
 			a.find(".success");
 			var m;
 			a.find(".time").timeago();
 			var n, u = t.find("li:last").data("id"),
 				r = a.find(".btn-more").on("click", function() {
 					u && $.ajax({
 						url: "/trips/" + b.tripId + "/comments?next_id=" + u,
 						dataType: "html",
 						success: function(b) {
 							var b = $("<div>" + b + "</div>"),
 								c = b.find("li");
 							t.find("ul").append(c);
 							b.find(".btn-more").length || r.remove();
 							u = t.find("li:last").data("id");
 							a.find(".time").timeago();
 							t.scrollbar().refresh()
 						}
 					});
 					return false
 				});
 			a.on("click", ".reply-image a, .reply-text a", function() {
 				var a = $(this).attr("href").split("#");
 				if (f && f.indexOf(a[0]) > -1) {
 					parent.$(parent).trigger("dochaschanged", [a[1]]);
 					return false
 				}
 				return true
 			});
 			c.focus(function() {
 				clearInterval(n);
 				n = setInterval(function() {
 					if (c.val() === "") {
 						j.val("");
 						p.val("");
 						k.val("")
 					}
 				}, 30)
 			}).blur(function() {
 				clearInterval(n)
 			}).keydown(function(f) {
 				if (f.keyCode === 13) {
 					f.preventDefault();
 					if (!m) {
 						m = true;
 						if (!c.valid()) {
 							m = false;
 							c.showErrorTips();
 							return false
 						}
 						var f = c.val(),
 							n = j.val(),
 							q = p.val(),
 							r = k.val(),
 							f = {
 								text: f
 							};
 						if (n) f.reply_to_id = n;
 						if (q && r) {
 							f.commentable_id = q;
 							f.commentable_type = r
 						}
 						n = function(b) {
 							m = false;
 							c.val("").focus();
 							t.find("ul").prepend(b).find(".nocomment").remove();
 							a.find(".time").timeago();
 							t.scrollbar().refresh().scrollTo(0);
 							b = $("#comments-popup h1 span");
 							b.text(b.text() - 0 + 1);
 							window.parent && parent.$(parent).trigger("note:commented")
 						};
 						q = function() {
 							d.hide()
 						};
 						f = {
 							url: "/trips/" + b.tripId + "/comments",
 							type: "POST",
 							data: f
 						};
 						if (n) f.success = n;
 						if (q) f.complete = q;
 						$.ajax(f)
 					}
 				}
 			});
 			t.on("click", ".reply", function() {
 				var a = $(this).parents("li");
 				j.val(a.data("id"));
 				p.val(a.data("commentable-id"));
 				k.val(a.data("commentable-type"));
 				c.val("\u56de\u590d " + a.data("username") + "\uff1a").moveCursorToEnd()
 			})
 		});
 		return this
 	}
 })();
 var noticePopup = function() {
 	function b() {
 		$.ajax({
 			url: "/notifications",
 			data: {
 				last_id: x
 			},
 			success: function(a) {
 				var a = $("<div>" + a + "</div>"),
 					d = a.find("li"),
 					j;
 				!x && (j = d.filter(".unread").length) > 0 && u.addClass("unread");
 				if (d.length) {
 					u.append(d);
 					$("time", d).timeago()
 				} else x || u.append('<li class="nonotice">\u76ee\u524d\u6ca1\u6709\u6d88\u606f</li>');
 				if (a.find(".btn-more").length) {
 					x = u.find("li:last").data("id");
 					n.css("visibility", "visible").off("click");
 					j ? n.click(function() {
 						f();
 						n.click(b);
 						return false
 					}) : n.click(b)
 				} else !j || j === d.length ? n.css("visibility", "hidden") : n.css("visibility", "visible").off("click").click(function() {
 					f();
 					n.css("visibility", "hidden")
 				});
 				setTimeout(c, 5)
 			},
 			complete: function() {
 				u.removeClass("loading")
 			}
 		});
 		return false
 	}

 	function f() {
 		u.removeClass("unread");
 		c();
 		return false
 	}

 	function a() {
 		r.find("textarea").val("").blur();
 		r.slideUp(function() {
 			y.scrollbar().refresh()
 		});
 		var a = $('<div class="success">\u56de\u590d\u6210\u529f</div>');
 		r.before(a);
 		setTimeout(function() {
 			a.remove()
 		}, 1E3)
 	}

 	function c() {
 		var a = WindowSize.height - w - 52;
 		if (m.height() > a) {
 			t.css("height", a);
 			y.css("height", a - 40).scrollbar().refresh()
 		} else {
 			t.css("height", "auto");
 			y.scrollbar().refresh()
 		}
 	}

 	function d() {
 		$(document).off("click.notice");
 		x = 0;
 		$("body").removeClass("notice-open");
 		p.hide();
 		t.hide();
 		getHidder().append(r);
 		r.find("textarea").val("");
 		u.empty().removeClass("unread");
 		C && D.css("overflow", "auto")
 	}
 	var j, k, p, t, m, n, u, r, y, x, q, w, D = $("html"),
 		C, E, F;
 	return {
 		open: function(f, x) {
 			k || (k = $(f));
 			E || (E = x ? $(x) : $("body"));
 			if (!j) {
 				var K = k.find(".js-n-offset");
 				w = K.offset().top + K.height();
 				p = $('<div class="notice-overlay"></div>');
 				t = $('<div class="notice-popup"><i class="close"></i><div class="notice-inner"><h3>\u6d88\u606f\u4e2d\u5fc3</h3><div class="scroller-wrapper"><div class="comment-list scroller clearfix" id="notice"><ul class="clearfix loading"></ul><div class="btn-more" style="visibility:hidden;">\u52a0\u8f7d\u66f4\u591a\u6d88\u606f...</div></div></div></div></div>').css("top", w);
 				y = $(".scroller-wrapper", t);
 				n = t.find(".btn-more");
 				u = t.find("ul");
 				m = t.find(".notice-inner");
 				r = $('<div class="replyform"><textarea name="text" class="textarea inset-shadow" minlen="1" maxlen="300" data-error-tip="\u6700\u591a150\u5b57"></textarea><div class="c-tip">\u56de\u8f66\u53d1\u8868\u8bc4\u8bba</div><input type="hidden" name="note_id" value=""><input type="hidden" name="reply_to_id" value=""></div>');
 				u.on("ajax:success", 'a[data-method="delete"]', function() {
 					$(this).parents("li").remove()
 				});
 				$(".close", t).click(d);
 				$("textarea", r).autosize().keydown(function(a) {
 					if (a.keyCode === 13) {
 						var b = $(this);
 						a.stopPropagation();
 						a.preventDefault();
 						if (!F) {
 							F = true;
 							if (!b.valid()) {
 								F = false;
 								b.showErrorTips();
 								return false
 							}
 							var a = b.val(),
 								c = q.complete;
 							if (a != "") {
 								q.data.text = a;
 								q.complete = function() {
 									c && c();
 									F = false
 								};
 								$.ajax(q)
 							}
 						}
 					} else if (a.keyCode === 27) {
 						a.stopPropagation();
 						r.find("textarea").val("");
 						r.slideUp()
 					}
 				});
 				u.touchClick(".reply", function() {
 					var b = $(this).parents("li"),
 						d = b.data("trip-id"),
 						f = b.data("comment-id"),
 						i = b.data("commentable-id"),
 						j = b.data("commentable-type"),
 						f = {
 							reply_to_id: f
 						};
 					if (i) {
 						f.commentable_id = i;
 						f.commentable_type = j
 					}
 					q = {
 						url: "/trips/" + d + "/comments",
 						type: "POST",
 						data: f,
 						success: a
 					};
 					r.appendTo(b).slideDown(200, function() {
 						r.find("textarea").val("").focus();
 						c();
 						y.scrollbar().refresh()
 					})
 				}).touchClick(".reply-image a, .reply-text a", function() {
 					var a = $(this).attr("href").split("#"),
 						b = document.location.href;
 					if (b && b.indexOf(a[0]) > -1) {
 						$(window).trigger("dochaschanged", [a[1]]);
 						return false
 					}
 					return true
 				});
 				E.append(p, t);
 				y.scrollbar({
 					type: "ver"
 				});
 				j = 1
 			}
 			u.addClass("loading");
 			b();
 			$("body").addClass("notice-open");
 			p.show();
 			t.show();
 			k.find(".n-count").hide();
 			if (D.css("overflow") != "hidden") {
 				C = true;
 				D.css("overflow", "hidden")
 			}
 			$(document).on("click.notice", function(a) {
 				$.isClickInside(a.target, t[0]) || d()
 			})
 		}
 	}
 }();
 (function() {
 	var b;
 	b = {
 		triggerOldOnload: function() {
 			if (typeof b.oldOnload === "function") return b.oldOnload()
 		},
 		loadMaps: function() {
 			var a, c, d;
 			d = [];
 			for (a in b) {
 				c = a.search(/load/);
 				if (c === -1) {
 					c = "load_" + a;
 					d.push(b[c]())
 				} else d.push(void 0)
 			}
 			return d
 		}
 	};
 	window.Gmaps = b;
 	var f = function() {
 		this.userLocation = this.visibleInfoWindow = this.serviceObject = this.map = null;
 		this.geolocationFailure = function() {
 			return false
 		};
 		this.callback = function() {
 			return false
 		};
 		this.customClusterer = function() {
 			return false
 		};
 		this.infobox = function() {
 			return false
 		};
 		this.jsTemplate = false;
 		this.default_map_options = {
 			id: "map",
 			draggable: true,
 			detect_location: false,
 			center_on_user: false,
 			center_latitude: 0,
 			center_longitude: 0,
 			zoom: 7,
 			maxZoom: null,
 			minZoom: null,
 			auto_adjust: true,
 			auto_zoom: true,
 			bounds: [],
 			raw: {}
 		};
 		this.default_markers_conf = {
 			title: "",
 			picture: "",
 			width: 22,
 			length: 32,
 			draggable: false,
 			do_clustering: false,
 			randomize: false,
 			max_random_distance: 100,
 			list_container: null,
 			offset: 0,
 			raw: {}
 		};
 		this.markers = [];
 		this.boundsObject = null;
 		this.polygons = [];
 		this.polylines = [];
 		this.circles = [];
 		this.markerClusterer = null;
 		this.markerImages = []
 	};
 	f.prototype.initialize = function() {
 		this.map = this.serviceObject = this.createMap();
 		(this.map_options.detect_location === true || this.map_options.center_on_user === true) && this.findUserLocation(this);
 		return this.resetSidebarContent()
 	};
 	f.prototype.findUserLocation = function(a) {
 		var b;
 		if (navigator.geolocation) {
 			b = function(b) {
 				a.userLocation = a.createLatLng(b.coords.latitude, b.coords.longitude);
 				if (a.map_options.center_on_user === true) return a.centerMapOnUser()
 			};
 			return navigator.geolocation.getCurrentPosition(b,

 			function() {
 				return a.geolocationFailure(true)
 			})
 		}
 		return a.geolocationFailure(false)
 	};
 	f.prototype.create_direction = function() {
 		var a, b;
 		a = new google.maps.DirectionsRenderer;
 		b = new google.maps.DirectionsService;
 		a.setMap(this.serviceObject);
 		this.direction_conf.display_panel && a.setPanel(document.getElementById(this.direction_conf.panel_id));
 		a.setOptions({
 			suppressMarkers: false,
 			suppressInfoWindows: false,
 			suppressPolylines: false
 		});
 		return b.route({
 			origin: this.direction_conf.origin,
 			destination: this.direction_conf.destination,
 			waypoints: this.direction_conf.waypoints,
 			optimizeWaypoints: this.direction_conf.optimizeWaypoints,
 			unitSystem: google.maps.DirectionsUnitSystem[this.direction_conf.unitSystem],
 			avoidHighways: this.direction_conf.avoidHighways,
 			avoidTolls: this.direction_conf.avoidTolls,
 			region: this.direction_conf.region,
 			travelMode: google.maps.DirectionsTravelMode[this.direction_conf.travelMode],
 			language: "en"
 		}, function(b, c) {
 			if (c === google.maps.DirectionsStatus.OK) return a.setDirections(b)
 		})
 	};
 	f.prototype.create_circles = function() {
 		var a,
 		b, d, f, k;
 		f = this.circles;
 		k = [];
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			k.push(this.create_circle(a))
 		}
 		return k
 	};
 	f.prototype.create_circle = function(a) {
 		var b;
 		if (a === this.circles[0]) {
 			if (a.strokeColor != null) this.circles_conf.strokeColor = a.strokeColor;
 			if (a.strokeOpacity != null) this.circles_conf.strokeOpacity = a.strokeOpacity;
 			if (a.strokeWeight != null) this.circles_conf.strokeWeight = a.strokeWeight;
 			if (a.fillColor != null) this.circles_conf.fillColor = a.fillColor;
 			if (a.fillOpacity != null) this.circles_conf.fillOpacity = a.fillOpacity
 		}
 		if (a.lat != null && a.lng != null) {
 			b = new google.maps.Circle({
 				center: this.createLatLng(a.lat, a.lng),
 				strokeColor: a.strokeColor || this.circles_conf.strokeColor,
 				strokeOpacity: a.strokeOpacity || this.circles_conf.strokeOpacity,
 				strokeWeight: a.strokeWeight || this.circles_conf.strokeWeight,
 				fillOpacity: a.fillOpacity || this.circles_conf.fillOpacity,
 				fillColor: a.fillColor || this.circles_conf.fillColor,
 				clickable: a.clickable || this.circles_conf.clickable,
 				zIndex: a.zIndex || this.circles_conf.zIndex,
 				radius: a.radius
 			});
 			a.serviceObject = b;
 			return b.setMap(this.serviceObject)
 		}
 	};
 	f.prototype.clear_circles = function() {
 		var a, b, d, f, k;
 		f = this.circles;
 		k = [];
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			k.push(this.clear_circle(a))
 		}
 		return k
 	};
 	f.prototype.clear_circle = function(a) {
 		return a.serviceObject.setMap(null)
 	};
 	f.prototype.hide_circles = function() {
 		var a, b, d, f, k;
 		f = this.circles;
 		k = [];
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			k.push(this.hide_circle(a))
 		}
 		return k
 	};
 	f.prototype.hide_circle = function(a) {
 		return a.serviceObject.setMap(null)
 	};
 	f.prototype.show_circles = function() {
 		var a, b, d;
 		b = this.circles;
 		d = [];
 		a = 0;
 		for (b = b.length; a < b; a++)
 		d.push(this.show_circle(this.circle));
 		return d
 	};
 	f.prototype.show_circle = function(a) {
 		return a.serviceObject.setMap(this.serviceObject)
 	};
 	f.prototype.create_polygons = function() {
 		var a, b, d, f, k;
 		f = this.polygons;
 		k = [];
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			k.push(this.create_polygon(a))
 		}
 		return k
 	};
 	f.prototype.create_polygon = function(a) {
 		var b, d, f, k, p, t, m, n, u, r, y;
 		t = [];
 		r = 0;
 		for (y = a.length; r < y; r++) {
 			p = a[r];
 			k = this.createLatLng(p.lat, p.lng);
 			t.push(k);
 			if (p === a[0]) {
 				m = p.strokeColor || this.polygons_conf.strokeColor;
 				n = p.strokeOpacity || this.polygons_conf.strokeOpacity;
 				u = p.strokeWeight || this.polygons_conf.strokeWeight;
 				d = p.fillColor || this.polygons_conf.fillColor;
 				f = p.fillOpacity || this.polygons_conf.fillOpacity;
 				b = p.clickable || this.polygons_conf.clickable
 			}
 		}
 		b = new google.maps.Polygon({
 			paths: t,
 			strokeColor: m,
 			strokeOpacity: n,
 			strokeWeight: u,
 			fillColor: d,
 			fillOpacity: f,
 			clickable: b,
 			map: this.serviceObject
 		});
 		return a.serviceObject = b
 	};
 	f.prototype.replacePolylines = function(a) {
 		this.destroy_polylines();
 		this.polylines = a;
 		this.create_polylines();
 		return this.adjustMapToBounds()
 	};
 	f.prototype.destroy_polylines = function() {
 		var a, b, d, f;
 		f = this.polylines;
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			a.serviceObject.setMap(null)
 		}
 		return this.polylines = []
 	};
 	f.prototype.create_polylines = function() {
 		var a, b, d, f, k;
 		f = this.polylines;
 		k = [];
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			k.push(this.create_polyline(a))
 		}
 		return k
 	};
 	f.prototype.create_polyline = function(a) {
 		var b, d, f, k, p, t, m, n, u, r, y, x;
 		k = [];
 		u = 0;
 		for (y = a.length; u < y; u++) {
 			d = a[u];
 			if (d.coded_array != null) {
 				d = new google.maps.geometry.encoding.decodePath(d.coded_array);
 				r = 0;
 				for (x = d.length; r < x; r++) {
 					f = d[r];
 					k.push(f)
 				}
 			} else {
 				if (d === a[0]) {
 					p = d.strokeColor || this.polylines_conf.strokeColor;
 					t = d.strokeOpacity || this.polylines_conf.strokeOpacity;
 					m = d.strokeWeight || this.polylines_conf.strokeWeight;
 					b = d.clickable || this.polylines_conf.clickable;
 					n = d.zIndex || this.polylines_conf.zIndex
 				}
 				if (d.lat != null && d.lng != null) {
 					d = this.createLatLng(d.lat, d.lng);
 					k.push(d)
 				}
 			}
 		}
 		b = new google.maps.Polyline({
 			path: k,
 			strokeColor: p,
 			strokeOpacity: t,
 			strokeWeight: m,
 			clickable: b,
 			zIndex: n
 		});
 		a.serviceObject = b;
 		return b.setMap(this.serviceObject)
 	};
 	f.prototype.create_markers = function() {
 		this.createServiceMarkersFromMarkers();
 		return this.clusterize()
 	};
 	f.prototype.createServiceMarkersFromMarkers = function() {
 		var a, b, d, f, k;
 		a = this.markers;
 		d = f = 0;
 		for (k = a.length; f < k; d = ++f)
 		if (this.markers[d].serviceObject == null) {
 			a = this.markers[d].lat;
 			b = this.markers[d].lng;
 			if (this.markers_conf.randomize) {
 				b = this.randomize(a, b);
 				a = b[0];
 				b = b[1]
 			}
 			this.markers[d].serviceObject = this.createMarker({
 				marker_picture: this.markers[d].picture ? this.markers[d].picture : this.markers_conf.picture,
 				marker_width: this.markers[d].width ? this.markers[d].width : this.markers_conf.width,
 				marker_height: this.markers[d].height ? this.markers[d].height : this.markers_conf.length,
 				marker_title: this.markers[d].title ? this.markers[d].title : null,
 				marker_anchor: this.markers[d].marker_anchor ? this.markers[d].marker_anchor : null,
 				shadow_anchor: this.markers[d].shadow_anchor ? this.markers[d].shadow_anchor : null,
 				shadow_picture: this.markers[d].shadow_picture ? this.markers[d].shadow_picture : null,
 				shadow_width: this.markers[d].shadow_width ? this.markers[d].shadow_width : null,
 				shadow_height: this.markers[d].shadow_height ? this.markers[d].shadow_height : null,
 				marker_draggable: this.markers[d].draggable ? this.markers[d].draggable : this.markers_conf.draggable,
 				rich_marker: this.markers[d].rich_marker ? this.markers[d].rich_marker : null,
 				zindex: this.markers[d].zindex ? this.markers[d].zindex : null,
 				Lat: a,
 				Lng: b,
 				index: d
 			});
 			this.createInfoWindow(this.markers[d]);
 			this.createSidebar(this.markers[d])
 		}
 		return this.markers_conf.offset = this.markers.length
 	};
 	f.prototype.createImageAnchorPosition = function(a) {
 		return a === null ? null : this.createPoint(a[0], a[1])
 	};
 	f.prototype.replaceMarkers = function(a) {
 		this.clearMarkers();
 		this.markers = [];
 		this.boundsObject = this.createLatLngBounds();
 		this.resetSidebarContent();
 		this.markers_conf.offset = 0;
 		return this.addMarkers(a)
 	};
 	f.prototype.addMarkers = function(a) {
 		this.markers = this.markers.concat(a);
 		this.create_markers();
 		return this.adjustMapToBounds()
 	};
 	f.prototype.createSidebar = function(a) {
 		var b, d, f, k;
 		if (this.markers_conf.list_container) {
 			k = document.getElementById(this.markers_conf.list_container);
 			f = document.createElement("li");
 			b = document.createElement("a");
 			b.href = "javascript:void(0);";
 			d = a.sidebar != null ? a.sidebar : "Marker";
 			b.innerHTML = d;
 			b.onclick = this.sidebar_element_handler(this, a.serviceObject, "click");
 			f.appendChild(b);
 			return k.appendChild(f)
 		}
 	};
 	f.prototype.sidebar_element_handler = function(a, b, d) {
 		return function() {
 			a.map.panTo(b.position);
 			return google.maps.event.trigger(b, d)
 		}
 	};
 	f.prototype.resetSidebarContent = function() {
 		var a;
 		if (this.markers_conf.list_container !== null) {
 			a = document.getElementById(this.markers_conf.list_container);
 			return a.innerHTML = ""
 		}
 	};
 	f.prototype.adjustMapToBounds = function() {
 		var a, b, d, f, k, p, t;
 		if (this.map_options.auto_adjust || this.map_options.bounds !== null) this.boundsObject = this.createLatLngBounds();
 		if (this.map_options.auto_adjust) {
 			this.extendBoundsWithMarkers();
 			t = this.polylines;
 			d = 0;
 			for (k = t.length; d < k; d++) {
 				a = t[d];
 				b = a.serviceObject.latLngs.getArray()[0].getArray();
 				f = 0;
 				for (p = b.length; f < p; f++) {
 					a = b[f];
 					this.boundsObject.extend(a)
 				}
 			}
 			t = this.polygons;
 			d = 0;
 			for (k = t.length; d < k; d++) {
 				a = t[d];
 				b = a.serviceObject.latLngs.getArray()[0].getArray();
 				f = 0;
 				for (p = b.length; f < p; f++) {
 					a = b[f];
 					this.boundsObject.extend(a)
 				}
 			}
 			t = this.circles;
 			k = 0;
 			for (d = t.length; k < d; k++) {
 				a = t[k];
 				this.boundsObject.extend(a.serviceObject.getBounds().getNorthEast());
 				this.boundsObject.extend(a.serviceObject.getBounds().getSouthWest())
 			}
 		}
 		t = this.map_options.bounds;
 		k = 0;
 		for (d = t.length; k < d; k++) {
 			a = t[k];
 			a = this.createLatLng(a.lat, a.lng);
 			this.boundsObject.extend(a)
 		}
 		if (this.map_options.auto_adjust || this.map_options.bounds.length > 0) {
 			if (this.map_options.auto_zoom) return this.fitBounds();
 			a = this.boundsObject.getCenter();
 			this.map_options.center_latitude = a.lat();
 			this.map_options.center_longitude = a.lng();
 			return this.serviceObject.setCenter(a)
 		}
 	};
 	f.prototype.create_kml = function() {
 		var a, b, d, f, k;
 		f = this.kml;
 		k = [];
 		b = 0;
 		for (d = f.length; b < d; b++) {
 			a = f[b];
 			k.push(a.serviceObject = this.createKmlLayer(a))
 		}
 		return k
 	};
 	f.prototype.exists = function(a) {
 		return a !== "" && typeof a !== "undefined"
 	};
 	f.prototype.randomize = function(a, b) {
 		var d, f;
 		f = this.markers_conf.max_random_distance * this.random();
 		d = this.markers_conf.max_random_distance * this.random();
 		d = parseFloat(a) + 180 / Math.PI * (d / 6378137);
 		f = parseFloat(b) + 90 / Math.PI * (f / 6378137) / Math.cos(a);
 		return [d, f]
 	};
 	f.prototype.mergeObjectWithDefault = function(a, b) {
 		var d, f, k;
 		d = {};
 		for (f in a) {
 			k = a[f];
 			d[f] = k
 		}
 		for (f in b) {
 			k = b[f];
 			d[f] == null && (d[f] = k)
 		}
 		return d
 	};
 	f.prototype.mergeWithDefault = function(a) {
 		this[a] = this.mergeObjectWithDefault(this[a], this["default_" + a]);
 		return true
 	};
 	f.prototype.random = function() {
 		return Math.random() * 2 - 1
 	};
 	this.Gmaps4Rails = f
 }).call(this);
 (function() {
 	var b = {}.hasOwnProperty,
 		f = function() {
 			f.__super__.constructor.apply(this, arguments);
 			this.map_options = {
 				disableDefaultUI: false,
 				disableDoubleClickZoom: false,
 				type: "ROADMAP"
 			};
 			this.markers_conf = {
 				clusterer_gridSize: 50,
 				clusterer_maxZoom: 5,
 				custom_cluster_pictures: null,
 				custom_infowindow_class: null
 			};
 			this.mergeWithDefault("map_options");
 			this.mergeWithDefault("markers_conf");
 			this.kml_options = {
 				clickable: true,
 				preserveViewport: false,
 				suppressInfoWindows: false
 			};
 			this.polygons_conf = {
 				strokeColor: "#FFAA00",
 				strokeOpacity: 0.8,
 				strokeWeight: 2,
 				fillColor: "#000000",
 				fillOpacity: 0.35,
 				clickable: false
 			};
 			this.polylines_conf = {
 				strokeColor: "#FF0000",
 				strokeOpacity: 1,
 				strokeWeight: 2,
 				clickable: false,
 				zIndex: null
 			};
 			this.circles_conf = {
 				fillColor: "#00AAFF",
 				fillOpacity: 0.35,
 				strokeColor: "#FFAA00",
 				strokeOpacity: 0.8,
 				strokeWeight: 2,
 				clickable: false,
 				zIndex: null
 			};
 			this.direction_conf = {
 				panel_id: null,
 				display_panel: false,
 				origin: null,
 				destination: null,
 				waypoints: [],
 				optimizeWaypoints: false,
 				unitSystem: "METRIC",
 				avoidHighways: false,
 				avoidTolls: false,
 				region: null,
 				travelMode: "DRIVING"
 			}
 		}, a = f,
 		c = Gmaps4Rails,
 		d = function() {
 			this.constructor = a
 		}, j;
 	for (j in c)
 	b.call(c, j) && (a[j] = c[j]);
 	d.prototype = c.prototype;
 	a.prototype = new d;
 	a.__super__ = c.prototype;
 	f.prototype.createPoint = function(a, b) {
 		return new google.maps.Point(a, b)
 	};
 	f.prototype.createLatLng = function(a, b) {
 		return new google.maps.LatLng(a, b)
 	};
 	f.prototype.createLatLngBounds = function() {
 		return new google.maps.LatLngBounds
 	};
 	f.prototype.createMap = function() {
 		var a;
 		a = {
 			maxZoom: this.map_options.maxZoom,
 			minZoom: this.map_options.minZoom,
 			zoom: this.map_options.zoom,
 			center: this.createLatLng(this.map_options.center_latitude, this.map_options.center_longitude),
 			mapTypeId: google.maps.MapTypeId[this.map_options.type],
 			mapTypeControl: this.map_options.mapTypeControl,
 			disableDefaultUI: this.map_options.disableDefaultUI,
 			disableDoubleClickZoom: this.map_options.disableDoubleClickZoom,
 			draggable: this.map_options.draggable
 		};
 		a = this.mergeObjectWithDefault(this.map_options.raw, a);
 		return new google.maps.Map(document.getElementById(this.map_options.id), a)
 	};
 	f.prototype.createMarkerImage = function(a, b, c, d, f) {
 		return new google.maps.MarkerImage(a, b, c, d, f)
 	};
 	f.prototype.createSize = function(a, b) {
 		return new google.maps.Size(a, b)
 	};
 	f.prototype.createMarker = function(a) {
 		var b, c, d;
 		c = this.createLatLng(a.Lat, a.Lng);
 		if (a.marker_picture === "" && a.rich_marker === null) {
 			a = {
 				position: c,
 				map: this.serviceObject,
 				title: a.marker_title,
 				draggable: a.marker_draggable,
 				zIndex: a.zindex
 			};
 			a = this.mergeObjectWithDefault(this.markers_conf.raw, a);
 			return new google.maps.Marker(a)
 		}
 		if (a.rich_marker !== null) return new RichMarker({
 			position: c,
 			map: this.serviceObject,
 			draggable: a.marker_draggable,
 			content: a.rich_marker,
 			flat: a.marker_anchor === null ? false : a.marker_anchor[1],
 			anchor: a.marker_anchor === null ? 0 : a.marker_anchor[0],
 			zIndex: a.zindex
 		});
 		b = this.createImageAnchorPosition(a.marker_anchor);
 		d = this.createImageAnchorPosition(a.shadow_anchor);
 		b = this.createOrRetrieveImage(a.marker_picture, a.marker_width, a.marker_height, b);
 		d = this.createOrRetrieveImage(a.shadow_picture, a.shadow_width, a.shadow_height, d);
 		a = {
 			position: c,
 			map: this.serviceObject,
 			icon: b,
 			title: a.marker_title,
 			draggable: a.marker_draggable,
 			shadow: d,
 			zIndex: a.zindex
 		};
 		a = this.mergeObjectWithDefault(this.markers_conf.raw, a);
 		return new google.maps.Marker(a)
 	};
 	f.prototype.includeMarkerImage = function(a, b) {
 		var c, d, f, j;
 		c = f = 0;
 		for (j = a.length; f < j; c = ++f) {
 			d = a[c];
 			if (d.url === b) return c
 		}
 		return false
 	};
 	f.prototype.createOrRetrieveImage = function(a, b, c, d) {
 		var f;
 		if (a === "" || a === null) return null;
 		f = this.includeMarkerImage(this.markerImages, a);
 		switch (f) {
 		case false:
 			a = this.createMarkerImage(a,
 			this.createSize(b, c), null, d, null);
 			this.markerImages.push(a);
 			return a;
 		default:
 			return typeof f === "number" ? this.markerImages[f] : false
 		}
 	};
 	f.prototype.clearMarkers = function() {
 		var a, b, c, d, f;
 		d = this.markers;
 		f = [];
 		b = 0;
 		for (c = d.length; b < c; b++) {
 			a = d[b];
 			f.push(this.clearMarker(a))
 		}
 		return f
 	};
 	f.prototype.showMarkers = function() {
 		var a, b, c, d, f;
 		d = this.markers;
 		f = [];
 		b = 0;
 		for (c = d.length; b < c; b++) {
 			a = d[b];
 			f.push(this.showMarker(a))
 		}
 		return f
 	};
 	f.prototype.hideMarkers = function() {
 		var a, b, c, d, f;
 		d = this.markers;
 		f = [];
 		b = 0;
 		for (c = d.length; b < c; b++) {
 			a = d[b];
 			f.push(this.hideMarker(a))
 		}
 		return f
 	};
 	f.prototype.clearMarker = function(a) {
 		return a.serviceObject.setMap(null)
 	};
 	f.prototype.showMarker = function(a) {
 		return a.serviceObject.setVisible(true)
 	};
 	f.prototype.hideMarker = function(a) {
 		return a.serviceObject.setVisible(false)
 	};
 	f.prototype.extendBoundsWithMarkers = function() {
 		var a, b, c, d, f;
 		d = this.markers;
 		f = [];
 		b = 0;
 		for (c = d.length; b < c; b++) {
 			a = d[b];
 			f.push(this.boundsObject.extend(a.serviceObject.position))
 		}
 		return f
 	};
 	f.prototype.createClusterer = function(a) {
 		return new MarkerClusterer(this.serviceObject,
 		a, {
 			maxZoom: this.markers_conf.clusterer_maxZoom,
 			gridSize: this.markers_conf.clusterer_gridSize,
 			styles: this.customClusterer()
 		})
 	};
 	f.prototype.clearClusterer = function() {
 		return this.markerClusterer.clearMarkers()
 	};
 	f.prototype.clusterize = function() {
 		var a, b, c, d, f;
 		if (this.markers_conf.do_clustering === true) {
 			this.markerClusterer !== null && this.clearClusterer();
 			b = [];
 			f = this.markers;
 			c = 0;
 			for (d = f.length; c < d; c++) {
 				a = f[c];
 				b.push(a.serviceObject)
 			}
 			return this.markerClusterer = this.createClusterer(b)
 		}
 	};
 	f.prototype.createInfoWindow = function(a) {
 		var b;
 		if (typeof this.jsTemplate === "function" || a.description != null) {
 			if (typeof this.jsTemplate === "function") a.description = this.jsTemplate(a);
 			if (this.markers_conf.custom_infowindow_class !== null) {
 				b = document.createElement("div");
 				b.setAttribute("class", this.markers_conf.custom_infowindow_class);
 				b.innerHTML = a.description;
 				a.infowindow = new InfoBox(this.infobox(b))
 			} else a.infowindow = new google.maps.InfoWindow({
 				content: a.description
 			});
 			return google.maps.event.addListener(a.serviceObject, "click",
 			this.openInfoWindow(this, a.infowindow, a.serviceObject))
 		}
 	};
 	f.prototype.openInfoWindow = function(a, b, c) {
 		return function() {
 			a.visibleInfoWindow !== null && a.visibleInfoWindow.close();
 			b.open(a.serviceObject, c);
 			return a.visibleInfoWindow = b
 		}
 	};
 	f.prototype.createKmlLayer = function(a) {
 		var b;
 		b = a.options || {};
 		b = this.mergeObjectWithDefault(b, this.kml_options);
 		a = new google.maps.KmlLayer(a.url, b);
 		a.setMap(this.serviceObject);
 		return a
 	};
 	f.prototype.fitBounds = function() {
 		if (!this.boundsObject.isEmpty()) return this.serviceObject.fitBounds(this.boundsObject)
 	};
 	f.prototype.centerMapOnUser = function() {
 		return this.serviceObject.setCenter(this.userLocation)
 	};
 	this.Gmaps4RailsGoogle = f
 }).call(this);
 (function() {
 	window.SocialShareButton = {
 		openUrl: function(b) {
 			window.open(b);
 			return false
 		},
 		share: function(b) {
 			var f, a, c;
 			f = $(b).data("site");
 			a = encodeURIComponent($(b).parent().data("title").replace("|SUB|", $(b).data("substitute")));
 			b = encodeURIComponent($(b).parent().data("img"));
 			c = encodeURIComponent(location.href);
 			switch (f) {
 			case "weibo":
 				SocialShareButton.openUrl("http://v.t.sina.com.cn/share/share.php?url=" + c + "&pic=" + b + "&title=" + a + "&content=utf-8");
 				break;
 			case "twitter":
 				SocialShareButton.openUrl("https://twitter.com/home?status=" + a + ": " + c);
 				break;
 			case "douban":
 				SocialShareButton.openUrl("http://www.douban.com/recommend/?url=" + c + "&title=" + a + "&image=" + b);
 				break;
 			case "facebook":
 				SocialShareButton.openUrl("http://www.facebook.com/sharer.php?t=" + a + "&u=" + c);
 				break;
 			case "qq":
 				SocialShareButton.openUrl("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + c + "&title=" + a + "&pics=" + b);
 				break;
 			case "tqq":
 				SocialShareButton.openUrl("http://share.v.t.qq.com/index.php?c=share&a=index&url=" + c + "&title=" + a + "&pic=" + b);
 				break;
 			case "baidu":
 				SocialShareButton.openUrl("http://apps.hi.baidu.com/share/?url=" + c + "&title=" + a + "&content=");
 				break;
 			case "kaixin001":
 				SocialShareButton.openUrl("http://www.kaixin001.com/rest/records.php?url=" + c + "&content=" + a + "&style=11&pic=" + b);
 				break;
 			case "renren":
 				SocialShareButton.openUrl("http://widget.renren.com/dialog/share?resourceUrl=" + c + "&title=" + a + "&description=");
 				break;
 			case "google_plus":
 				SocialShareButton.openUrl("https://plus.google.com/share?url=" + c + "&t=" + a)
 			}
 			return false
 		}
 	}
 }).call(this);

 function BestInPlaceEditor(b) {
 	this.element = b;
 	this.initOptions();
 	this.bindForm();
 	this.initNil();
 	jQuery(this.activator).bind("click", {
 		editor: this
 	}, this.clickHandler)
 }
 BestInPlaceEditor.prototype = {
 	activate: function() {
 		var b = "",
 			b = this.isNil ? "" : this.original_content ? this.original_content : this.element.html();
 		this.oldValue = this.isNil ? "-" : this.element.html();
 		this.display_value = b;
 		jQuery(this.activator).unbind("click", this.clickHandler);
 		this.activateForm();
 		this.element.trigger(jQuery.Event("best_in_place:activate"))
 	},
 	abort: function() {
 		this.isNil ? this.element.html(this.nil) : this.element.html(this.oldValue);
 		jQuery(this.activator).bind("click", {
 			editor: this
 		}, this.clickHandler);
 		this.element.trigger(jQuery.Event("best_in_place:abort"));
 		this.element.trigger(jQuery.Event("best_in_place:deactivate"))
 	},
 	abortIfConfirm: function() {
 		confirm("Are you sure you want to discard your changes?") && this.abort()
 	},
 	update: function() {
 		var b = this;
 		if (this.formType in {
 			input: 1,
 			textarea: 1
 		} && this.getValue() == this.oldValue) {
 			this.abort();
 			return true
 		}
 		this.isNil = false;
 		b.ajax({
 			type: "post",
 			dataType: "text",
 			data: b.requestData(),
 			success: function(a) {
 				b.loadSuccessCallback(a)
 			},
 			error: function(a, c) {
 				b.loadErrorCallback(a,
 				c)
 			}
 		});
 		if (this.formType == "select") {
 			var f = this.getValue();
 			jQuery.each(this.values, function(a, c) {
 				f == c[0] && b.element.html(c[1])
 			})
 		} else this.formType == "checkbox" ? b.element.html(this.getValue() ? this.values[1] : this.values[0]) : b.element.html(this.getValue() != "" ? this.getValue() : this.nil);
 		b.element.trigger(jQuery.Event("best_in_place:update"))
 	},
 	activateForm: function() {
 		alert("The form was not properly initialized. activateForm is unbound")
 	},
 	initOptions: function() {
 		var b = this;
 		b.element.parents().each(function() {
 			b.url = b.url || jQuery(this).attr("data-url");
 			b.collection = b.collection || jQuery(this).attr("data-collection");
 			b.formType = b.formType || jQuery(this).attr("data-type");
 			b.objectName = b.objectName || jQuery(this).attr("data-object");
 			b.attributeName = b.attributeName || jQuery(this).attr("data-attribute");
 			b.activator = b.activator || jQuery(this).attr("data-activator");
 			b.okButton = b.okButton || jQuery(this).attr("data-ok-button");
 			b.cancelButton = b.cancelButton || jQuery(this).attr("data-cancel-button");
 			b.nil = b.nil || jQuery(this).attr("data-nil");
 			b.inner_class = b.inner_class || jQuery(this).attr("data-inner-class");
 			b.html_attrs = b.html_attrs || jQuery(this).attr("data-html-attrs");
 			b.original_content = b.original_content || jQuery(this).attr("data-original-content")
 		});
 		b.element.parents().each(function() {
 			var f = this.id.match(/^(\w+)_(\d+)$/i);
 			if (f) b.objectName = b.objectName || f[1]
 		});
 		b.url = b.element.attr("data-url") || b.url || document.location.pathname;
 		b.collection = b.element.attr("data-collection") || b.collection;
 		b.formType = b.element.attr("data-type") || b.formtype || "input";
 		b.objectName = b.element.attr("data-object") || b.objectName;
 		b.attributeName = b.element.attr("data-attribute") || b.attributeName;
 		b.activator = b.element.attr("data-activator") || b.element;
 		b.okButton = b.element.attr("data-ok-button") || b.okButton;
 		b.cancelButton = b.element.attr("data-cancel-button") || b.cancelButton;
 		b.nil = b.element.attr("data-nil") || b.nil || "-";
 		b.inner_class = b.element.attr("data-inner-class") || b.inner_class || null;
 		b.html_attrs = b.element.attr("data-html-attrs") || b.html_attrs;
 		b.original_content = b.element.attr("data-original-content") || b.original_content;
 		b.sanitize = b.element.attr("data-sanitize") ? b.element.attr("data-sanitize") == "true" : true;
 		if ((b.formType == "select" || b.formType == "checkbox") && b.collection !== null) b.values = jQuery.parseJSON(b.collection)
 	},
 	bindForm: function() {
 		this.activateForm = BestInPlaceEditor.forms[this.formType].activateForm;
 		this.getValue = BestInPlaceEditor.forms[this.formType].getValue
 	},
 	initNil: function() {
 		if (this.element.html() == "") {
 			this.isNil = true;
 			this.element.html(this.nil)
 		}
 	},
 	getValue: function() {
 		alert("The form was not properly initialized. getValue is unbound")
 	},
 	sanitizeValue: function(b) {
 		if (this.sanitize) {
 			var f = document.createElement("DIV");
 			f.innerHTML = b;
 			b = jQuery.trim(f.textContent || f.innerText).replace(/"/g, "&quot;")
 		}
 		return jQuery.trim(b)
 	},
 	requestData: function() {
 		csrf_token = jQuery("meta[name=csrf-token]").attr("content");
 		csrf_param = jQuery("meta[name=csrf-param]").attr("content");
 		var b;
 		b = "_method=put" + ("&" + this.objectName + "[" + this.attributeName + "]=" + encodeURIComponent(this.getValue()));
 		csrf_param !== void 0 && csrf_token !== void 0 && (b = b + ("&" + csrf_param + "=" + encodeURIComponent(csrf_token)));
 		return b
 	},
 	ajax: function(b) {
 		b.url = this.url;
 		b.beforeSend = function(b) {
 			b.setRequestHeader("Accept", "application/json")
 		};
 		return jQuery.ajax(b)
 	},
 	loadSuccessCallback: function(b) {
 		var f = jQuery.parseJSON(jQuery.trim(b));
 		if (f != null && f.hasOwnProperty("display_as")) {
 			this.element.attr("data-original-content", this.element.html());
 			this.original_content = this.element.html();
 			this.element.html(f.display_as)
 		}
 		this.element.trigger(jQuery.Event("ajax:success"),
 		b);
 		jQuery(this.activator).bind("click", {
 			editor: this
 		}, this.clickHandler);
 		this.element.trigger(jQuery.Event("best_in_place:deactivate"))
 	},
 	loadErrorCallback: function(b) {
 		this.element.html(this.oldValue);
 		jQuery.each(jQuery.parseJSON(b.responseText), function(b, a) {
 			typeof a == "object" && (a = b + " " + a.toString());
 			jQuery("<span class='flash-error'></span>").html(a).purr()
 		});
 		this.element.trigger(jQuery.Event("ajax:error"));
 		jQuery(this.activator).bind("click", {
 			editor: this
 		}, this.clickHandler);
 		this.element.trigger(jQuery.Event("best_in_place:deactivate"))
 	},
 	clickHandler: function(b) {
 		b.preventDefault();
 		b.data.editor.activate()
 	},
 	setHtmlAttributes: function() {
 		var b = this.element.find(this.formType),
 			f = jQuery.parseJSON(this.html_attrs),
 			a;
 		for (a in f)
 		b.attr(a, f[a])
 	}
 };
 BestInPlaceEditor.forms = {
 	input: {
 		activateForm: function() {
 			var b;
 			b = '<form class="form_in_place" action="javascript:void(0)" style="display:inline;">' + ('<input type="text" name="' + this.attributeName + '" value="' + this.sanitizeValue(this.display_value) + '"');
 			this.inner_class != null && (b = b + (' class="' + this.inner_class + '"'));
 			b = b + ">";
 			this.okButton && (b = b + ('<input type="submit" value="' + this.okButton + '" />'));
 			this.cancelButton && (b = b + ('<input type="button" value="' + this.cancelButton + '" />'));
 			this.element.html(b + "</form>");
 			this.setHtmlAttributes();
 			this.element.find("input[type='text']")[0].select();
 			this.element.find("form").bind("submit", {
 				editor: this
 			}, BestInPlaceEditor.forms.input.submitHandler);
 			this.cancelButton && this.element.find("input[type='button']").bind("click", {
 				editor: this
 			}, BestInPlaceEditor.forms.input.cancelButtonHandler);
 			this.element.find("input[type='text']").bind("blur", {
 				editor: this
 			}, BestInPlaceEditor.forms.input.inputBlurHandler);
 			this.element.find("input[type='text']").bind("keyup", {
 				editor: this
 			},
 			BestInPlaceEditor.forms.input.keyupHandler);
 			this.blurTimer = null;
 			this.userClicked = false
 		},
 		getValue: function() {
 			return this.sanitizeValue(this.element.find("input").val())
 		},
 		inputBlurHandler: function(b) {
 			b.data.editor.okButton ? b.data.editor.blurTimer = setTimeout(function() {
 				b.data.editor.userClicked || b.data.editor.abort()
 			}, 500) : b.data.editor.cancelButton ? b.data.editor.blurTimer = setTimeout(function() {
 				b.data.editor.userClicked || b.data.editor.update()
 			}, 500) : b.data.editor.update()
 		},
 		submitHandler: function(b) {
 			b.data.editor.userClicked = true;
 			clearTimeout(b.data.editor.blurTimer);
 			b.data.editor.update()
 		},
 		cancelButtonHandler: function(b) {
 			b.data.editor.userClicked = true;
 			clearTimeout(b.data.editor.blurTimer);
 			b.data.editor.abort();
 			b.stopPropagation()
 		},
 		keyupHandler: function(b) {
 			b.keyCode == 27 && b.data.editor.abort()
 		}
 	},
 	date: {
 		activateForm: function() {
 			var b = this,
 				f;
 			f = '<form class="form_in_place" action="javascript:void(0)" style="display:inline;">' + ('<input type="text" name="' + this.attributeName + '" value="' + this.sanitizeValue(this.display_value) + '"');
 			this.inner_class != null && (f = f + (' class="' + this.inner_class + '"'));
 			this.element.html(f + "></form>");
 			this.setHtmlAttributes();
 			this.element.find("input")[0].select();
 			this.element.find("form").bind("submit", {
 				editor: this
 			}, BestInPlaceEditor.forms.input.submitHandler);
 			this.element.find("input").bind("keyup", {
 				editor: this
 			}, BestInPlaceEditor.forms.input.keyupHandler);
 			this.element.find("input").datepicker({
 				onClose: function() {
 					b.update()
 				}
 			}).datepicker("show")
 		},
 		getValue: function() {
 			return this.sanitizeValue(this.element.find("input").val())

 		},
 		submitHandler: function(b) {
 			b.data.editor.update()
 		},
 		keyupHandler: function(b) {
 			b.keyCode == 27 && b.data.editor.abort()
 		}
 	},
 	select: {
 		activateForm: function() {
 			var b = "<form action='javascript:void(0)' style='display:inline;'><select>",
 				f = "",
 				a = this.oldValue;
 			jQuery.each(this.values, function(c, d) {
 				f = d[1] == a ? "selected='selected'" : "";
 				b = b + ("<option value='" + d[0] + "' " + f + ">" + d[1] + "</option>")
 			});
 			b = b + "</select></form>";
 			this.element.html(b);
 			this.setHtmlAttributes();
 			this.element.find("select").bind("change", {
 				editor: this
 			}, BestInPlaceEditor.forms.select.blurHandler);
 			this.element.find("select").bind("blur", {
 				editor: this
 			}, BestInPlaceEditor.forms.select.blurHandler);
 			this.element.find("select").bind("keyup", {
 				editor: this
 			}, BestInPlaceEditor.forms.select.keyupHandler);
 			this.element.find("select")[0].focus()
 		},
 		getValue: function() {
 			return this.sanitizeValue(this.element.find("select").val())
 		},
 		blurHandler: function(b) {
 			b.data.editor.update()
 		},
 		keyupHandler: function(b) {
 			b.keyCode == 27 && b.data.editor.abort()
 		}
 	},
 	checkbox: {
 		activateForm: function() {
 			this.element.html(Boolean(this.oldValue != this.values[1]) ? this.values[1] : this.values[0]);
 			this.setHtmlAttributes();
 			this.update()
 		},
 		getValue: function() {
 			return Boolean(this.element.html() == this.values[1])
 		}
 	},
 	textarea: {
 		activateForm: function() {
 			width = this.element.css("width");
 			height = this.element.css("height");
 			var b;
 			b = '<form action="javascript:void(0)" style="display:inline;"><textarea>' + this.sanitizeValue(this.display_value);
 			b = b + "</textarea>";
 			this.okButton && (b = b + ('<input type="submit" value="' + this.okButton + '" />'));
 			this.cancelButton && (b = b + ('<input type="button" value="' + this.cancelButton + '" />'));
 			this.element.html(b + "</form>");
 			this.setHtmlAttributes();
 			jQuery(this.element.find("textarea")[0]).css({
 				"min-width": width,
 				"min-height": height
 			});
 			jQuery(this.element.find("textarea")[0]).elastic();
 			this.element.find("textarea")[0].focus();
 			this.element.find("form").bind("submit", {
 				editor: this
 			}, BestInPlaceEditor.forms.textarea.submitHandler);
 			this.cancelButton && this.element.find("input[type='button']").bind("click", {
 				editor: this
 			}, BestInPlaceEditor.forms.textarea.cancelButtonHandler);
 			this.element.find("textarea").bind("blur", {
 				editor: this
 			}, BestInPlaceEditor.forms.textarea.blurHandler);
 			this.element.find("textarea").bind("keyup", {
 				editor: this
 			}, BestInPlaceEditor.forms.textarea.keyupHandler);
 			this.blurTimer = null;
 			this.userClicked = false
 		},
 		getValue: function() {
 			return this.sanitizeValue(this.element.find("textarea").val())
 		},
 		blurHandler: function(b) {
 			b.data.editor.okButton ? b.data.editor.blurTimer = setTimeout(function() {
 				b.data.editor.userClicked || b.data.editor.abortIfConfirm()
 			}, 500) : b.data.editor.cancelButton ? b.data.editor.blurTimer = setTimeout(function() {
 				b.data.editor.userClicked || b.data.editor.update()
 			}, 500) : b.data.editor.update()
 		},
 		submitHandler: function(b) {
 			b.data.editor.userClicked = true;
 			clearTimeout(b.data.editor.blurTimer);
 			b.data.editor.update()
 		},
 		cancelButtonHandler: function(b) {
 			b.data.editor.userClicked = true;
 			clearTimeout(b.data.editor.blurTimer);
 			b.data.editor.abortIfConfirm();
 			b.stopPropagation()

 		},
 		keyupHandler: function(b) {
 			b.keyCode == 27 && b.data.editor.abortIfConfirm()
 		}
 	}
 };
 jQuery.fn.best_in_place = function() {
 	function b(b) {
 		if (!b.data("bestInPlaceEditor")) {
 			b.data("bestInPlaceEditor", new BestInPlaceEditor(b));
 			return true
 		}
 	}
 	jQuery(this.context).delegate(this.selector, "click", function() {
 		var f = jQuery(this);
 		b(f) && f.click()
 	});
 	this.each(function() {
 		b(jQuery(this))
 	});
 	return this
 };
 (function(b) {
 	b.fn.extend({
 		elastic: function() {
 			var f = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontSize", "lineHeight", "fontFamily", "width", "fontWeight"];
 			return this.each(function() {
 				function a(a, b) {
 					curratedHeight = Math.floor(parseInt(a, 10));
 					d.height() != curratedHeight && d.css({
 						height: curratedHeight + "px",
 						overflow: b
 					})
 				}

 				function c() {
 					var b = d.val().replace(/&/g, "&amp;").replace(/  /g, "&nbsp;").replace(/<|>/g, "&gt;").replace(/\n/g, "<br />"),
 						c = j.html().replace(/<br>/ig, "<br />");
 					if (b + "&nbsp;" != c) {
 						j.html(b + "&nbsp;");
 						if (Math.abs(j.height() + k - d.height()) > 3) {
 							b = j.height() + k;
 							b >= t ? a(t, "auto") : b <= p ? a(p, "hidden") : a(b, "hidden")
 						}
 					}
 				}
 				if (this.type != "textarea") return false;
 				var d = b(this),
 					j = b("<div />").css({
 						position: "absolute",
 						display: "none",
 						"word-wrap": "break-word"
 					}),
 					k = parseInt(d.css("line-height"), 10) || parseInt(d.css("font-size"), "10"),
 					p = parseInt(d.css("height"), 10) || k * 3,
 					t = parseInt(d.css("max-height"), 10) || Number.MAX_VALUE,
 					m = 0;
 				if (t < 0) t = Number.MAX_VALUE;
 				j.appendTo(d.parent());
 				for (m = f.length; m--;)
 				j.css(f[m].toString(),
 				d.css(f[m].toString()));
 				d.css({
 					overflow: "hidden"
 				});
 				d.bind("keyup change cut paste", function() {
 					c()
 				});
 				d.bind("blur", function() {
 					j.height() < t && (j.height() > p ? d.height(j.height()) : d.height(p))
 				});
 				d.live("input paste", function() {
 					setTimeout(c, 250)
 				});
 				c()
 			})
 		}
 	})
 })(jQuery);
 (function(b) {
 	b.fn.zclip = function(f) {
 		if (typeof f == "object" && !f.length) {
 			var a = b.extend({
 				path: "ZeroClipboard.swf",
 				copy: null,
 				beforeCopy: null,
 				afterCopy: null,
 				clickAfter: true,
 				setHandCursor: true,
 				setCSSEffects: true
 			}, f);
 			return this.each(function() {
 				var c = b(this);
 				if (c.is(":visible") && (typeof a.copy == "string" || b.isFunction(a.copy))) {
 					ZeroClipboard.setMoviePath(a.path);
 					var d = new ZeroClipboard.Client;
 					b.isFunction(a.copy) && c.bind("zClip_copy", a.copy);
 					b.isFunction(a.beforeCopy) && c.bind("zClip_beforeCopy", a.beforeCopy);
 					b.isFunction(a.afterCopy) && c.bind("zClip_afterCopy", a.afterCopy);
 					d.setHandCursor(a.setHandCursor);
 					d.setCSSEffects(a.setCSSEffects);
 					d.addEventListener("mouseOver", function() {
 						c.trigger("mouseenter")
 					});
 					d.addEventListener("mouseOut", function() {
 						c.trigger("mouseleave")
 					});
 					d.addEventListener("mouseDown", function() {
 						c.trigger("mousedown");
 						b.isFunction(a.copy) ? d.setText(c.triggerHandler("zClip_copy")) : d.setText(a.copy);
 						b.isFunction(a.beforeCopy) && c.trigger("zClip_beforeCopy")
 					});
 					d.addEventListener("complete",

 					function(d, f) {
 						if (b.isFunction(a.afterCopy)) c.trigger("zClip_afterCopy");
 						else {
 							f.length > 500 && (f = f.substr(0, 500) + "...\n\n(" + (f.length - 500) + " characters not shown)");
 							c.removeClass("hover");
 							alert("Copied text to clipboard:\n\n " + f)
 						}
 						a.clickAfter && c.trigger("click")
 					});
 					d.glue(c[0], c.parent()[0]);
 					b(window).bind("load resize", function() {
 						d.reposition()
 					})
 				}
 			})
 		}
 		if (typeof f == "string") return this.each(function() {
 			var a = b(this);
 			f = f.toLowerCase();
 			var d = a.data("zclipId"),
 				d = b("#" + d + ".zclip");
 			if (f == "remove") {
 				d.remove();
 				a.removeClass("active hover")
 			} else if (f == "hide") {
 				d.hide();
 				a.removeClass("active hover")
 			} else f == "show" && d.show()
 		})
 	}
 })(jQuery);
 var ZeroClipboard = {
 	version: "1.0.7",
 	clients: {},
 	moviePath: "ZeroClipboard.swf",
 	nextId: 1,
 	$: function(b) {
 		typeof b == "string" && (b = document.getElementById(b));
 		if (!b.addClass) {
 			b.hide = function() {
 				this.style.display = "none"
 			};
 			b.show = function() {
 				this.style.display = ""
 			};
 			b.addClass = function(b) {
 				this.removeClass(b);
 				this.className = this.className + (" " + b)
 			};
 			b.removeClass = function(b) {
 				for (var a = this.className.split(/\s+/), c = -1, d = 0; d < a.length; d++)
 				if (a[d] == b) {
 					c = d;
 					d = a.length
 				}
 				if (c > -1) {
 					a.splice(c, 1);
 					this.className = a.join(" ")
 				}
 				return this
 			};
 			b.hasClass = function(b) {
 				return !!this.className.match(RegExp("\\s*" + b + "\\s*"))
 			}
 		}
 		return b
 	},
 	setMoviePath: function(b) {
 		this.moviePath = b
 	},
 	dispatch: function(b, f, a) {
 		(b = this.clients[b]) && b.receiveEvent(f, a)
 	},
 	register: function(b, f) {
 		this.clients[b] = f
 	},
 	getDOMObjectPosition: function(b, f) {
 		var a = {
 			left: 0,
 			top: 0,
 			width: b.width ? b.width : b.offsetWidth,
 			height: b.height ? b.height : b.offsetHeight
 		};
 		if (b && b != f) {
 			a.left = a.left + b.offsetLeft;
 			a.top = a.top + b.offsetTop
 		}
 		return a
 	},
 	Client: function(b) {
 		this.handlers = {};
 		this.id = ZeroClipboard.nextId++;
 		this.movieId = "ZeroClipboardMovie_" + this.id;
 		ZeroClipboard.register(this.id, this);
 		b && this.glue(b)
 	}
 };
 ZeroClipboard.Client.prototype = {
 	id: 0,
 	ready: !1,
 	movie: null,
 	clipText: "",
 	handCursorEnabled: !0,
 	cssEffects: !0,
 	handlers: null,
 	glue: function(b, f, a) {
 		this.domElement = ZeroClipboard.$(b);
 		b = 99;
 		this.domElement.style.zIndex && (b = parseInt(this.domElement.style.zIndex, 10) + 1);
 		typeof f == "string" ? f = ZeroClipboard.$(f) : typeof f == "undefined" && (f = document.getElementsByTagName("body")[0]);
 		var c = ZeroClipboard.getDOMObjectPosition(this.domElement, f);
 		this.div = document.createElement("div");
 		this.div.className = "zclip";
 		this.div.id = "zclip-" + this.movieId;
 		$(this.domElement).data("zclipId", "zclip-" + this.movieId);
 		var d = this.div.style;
 		d.position = "absolute";
 		d.left = "" + c.left + "px";
 		d.top = "" + c.top + "px";
 		d.width = "" + c.width + "px";
 		d.height = "" + c.height + "px";
 		d.zIndex = b;
 		if (typeof a == "object") for (addedStyle in a)
 		d[addedStyle] = a[addedStyle];
 		f.appendChild(this.div);
 		this.div.innerHTML = this.getHTML(c.width, c.height)
 	},
 	getHTML: function(b, f) {
 		var a = "",
 			c = "id=" + this.id + "&width=" + b + "&height=" + f;
 		if (navigator.userAgent.match(/MSIE/)) var d = location.href.match(/^https/i) ? "https://" : "http://",
 			a = a + ('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + d + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + b + '" height="' + f + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + c + '"/><param name="wmode" value="transparent"/></object>');
 		else a = a + ('<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + b + '" height="' + f + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + c + '" wmode="transparent" />');
 		return a
 	},
 	hide: function() {
 		if (this.div) this.div.style.left = "-2000px"
 	},
 	show: function() {
 		this.reposition()
 	},
 	destroy: function() {
 		if (this.domElement && this.div) {
 			this.hide();
 			this.div.innerHTML = "";
 			var b = document.getElementsByTagName("body")[0];
 			try {
 				b.removeChild(this.div)
 			} catch (f) {}
 			this.div = this.domElement = null
 		}
 	},
 	reposition: function(b) {
 		if (b)
 		(this.domElement = ZeroClipboard.$(b)) || this.hide();
 		if (this.domElement && this.div) {
 			var b = ZeroClipboard.getDOMObjectPosition(this.domElement),
 				f = this.div.style;
 			f.left = "" + b.left + "px";
 			f.top = "" + b.top + "px"
 		}
 	},
 	setText: function(b) {
 		this.clipText = b;
 		this.ready && this.movie.setText(b)
 	},
 	addEventListener: function(b, f) {
 		b = b.toString().toLowerCase().replace(/^on/, "");
 		this.handlers[b] || (this.handlers[b] = []);
 		this.handlers[b].push(f)
 	},
 	setHandCursor: function(b) {
 		this.handCursorEnabled = b;
 		this.ready && this.movie.setHandCursor(b)
 	},
 	setCSSEffects: function(b) {
 		this.cssEffects = !! b
 	},
 	receiveEvent: function(b, f) {
 		b = b.toString().toLowerCase().replace(/^on/, "");
 		switch (b) {
 		case "load":
 			this.movie = document.getElementById(this.movieId);
 			if (!this.movie) {
 				var a = this;
 				setTimeout(function() {
 					a.receiveEvent("load",
 					null)
 				}, 1);
 				return
 			}
 			if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
 				a = this;
 				setTimeout(function() {
 					a.receiveEvent("load", null)
 				}, 100);
 				this.ready = true;
 				return
 			}
 			this.ready = true;
 			try {
 				this.movie.setText(this.clipText)
 			} catch (c) {}
 			try {
 				this.movie.setHandCursor(this.handCursorEnabled)
 			} catch (d) {}
 			break;
 		case "mouseover":
 			if (this.domElement && this.cssEffects) {
 				this.domElement.addClass("hover");
 				this.recoverActive && this.domElement.addClass("active")
 			}
 			break;
 		case "mouseout":
 			if (this.domElement && this.cssEffects) {
 				this.recoverActive = false;
 				if (this.domElement.hasClass("active")) {
 					this.domElement.removeClass("active");
 					this.recoverActive = true
 				}
 				this.domElement.removeClass("hover")
 			}
 			break;
 		case "mousedown":
 			this.domElement && this.cssEffects && this.domElement.addClass("active");
 			break;
 		case "mouseup":
 			if (this.domElement && this.cssEffects) {
 				this.domElement.removeClass("active");
 				this.recoverActive = false
 			}
 		}
 		if (this.handlers[b]) for (var j = 0, k = this.handlers[b].length; j < k; j++) {
 			var p = this.handlers[b][j];
 			if (typeof p == "function") p(this,
 			f);
 			else if (typeof p == "object" && p.length == 2) p[0][p[1]](this, f);
 			else if (typeof p == "string") window[p](this, f)
 		}
 	}
 };
 (function() {
 	if ($.browser.msie && $.browser.version < 7) {
 		document.write('<div class="ie6-notsupported"><div id="logo" class="logo-l"></div><div class="broswer-update"><div class="a-broswer"><a class="chrome" href="http://www.google.cn/chrome/intl/zh-CN/landing_chrome.html" target="_blank">\u8c37\u6b4c\u6d4f\u89c8\u5668</a><a class="ie" href="" target="_blank">\u5347\u7ea7IE</a></div></div></div>');
 		$("html,body").css({
 			width: "100%",
 			height: "100%",
 			overflow: "hidden"
 		});
 		$("#logo").css("top", (WindowSize.height - 306) / 4 - 36);
 		navigator.userAgent.indexOf("Windows NT 6.1") > -1 ? $(".ie").attr("href", "http://dl.pconline.com.cn/download/60835.html") : $(".ie").attr("href", "http://dl.pconline.com.cn/html_2/1/104/id=49581&pn=0.html")
 	}
 })();
 $(function() {
 	var b = $("body"),
 		f = $("#flash-notice,#flash-error,#flash-alert"),
 		a;
 	if (f.length) {
 		a = f.width();
 		f.css("margin-left", - a / 2);
 		setTimeout(function() {
 			f.fadeOut(200, function() {
 				f.remove();
 				f = null
 			})
 		}, 2E3)
 	}
 	$("button").prop("hidefocus", true).attr("hidefocus", "true");
 	b.append('<div class="g-preload"><i class="l1"></i><i class="l2"></i></div>');
 	var c, d = $("#new-notice"),
 		j = function() {
 			$.get("/notifications.json", function(a) {
 				a && a.unread_count > 0 ? d.text(a.unread_count).removeClass("hidden") : d.addClass("hidden")
 			}, "json")
 		};
 	if (d.length > 0) {
 		c = setInterval(j, 6E4);
 		$(window).on("useridle", function() {
 			clearInterval(c);
 			c = setInterval(j, 12E5)
 		}).on("userpresent", function() {
 			clearInterval(c);
 			c = setInterval(j, 6E4)
 		})
 	}
 });
