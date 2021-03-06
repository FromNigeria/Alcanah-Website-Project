/*!
 * Clamp.js 0.4
 *
 * Copyright 2011, Joseph Schmitt http://reusablebits.com, http://josephschmitt.me
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 */
(function() {
    window.$clamp = function(e, g) {
        var m, k, j, r;

        function s(a, b) {
            if (!n.getComputedStyle) n.getComputedStyle = function(a) {
                this.el = a;
                this.getPropertyValue = function(b) {
                    var c = /(\-([a-z]){1})/g;
                    b == "float" && (b = "styleFloat");
                    c.test(b) && (b = b.replace(c, function(a, b, c) { return c.toUpperCase() }));
                    return a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null
                };
                return this
            };
            return n.getComputedStyle(a, null).getPropertyValue(b)
        }

        function t(a) {
            var a = a || e.clientHeight,
                b = u(e);
            return Math.max(Math.floor(a / b), 0)
        }

        function u(a) {
            var b =
                s(a, "line-height");
            b == "normal" && (b = parseInt(s(a, "font-size")) * 1.2);
            return parseInt(b)
        }

        function l(a) { return a.lastChild.children && a.lastChild.children.length > 0 ? l(Array.prototype.slice.call(a.children).pop()) : !a.lastChild || !a.lastChild.nodeValue || a.lastChild.nodeValue == "" || a.lastChild.nodeValue == "\u2026" ? (a.lastChild.parentNode.removeChild(a.lastChild), l(e)) : a.lastChild }

        function o(a, b) {
            if (b) {
                var d = a.nodeValue.replace(/\u2026/, "");
                c || (f = h.length > 0 ? h.shift() : "", c = d.split(f));
                c.length > 1 ? (p = c.pop(), q(a,
                    c.join(f))) : c = null;
                if (c) {
                    if (e.clientHeight <= b)
                        if (h.length >= 0 && f != "") q(a, c.join(f) + f + p), c = null;
                        else return false
                } else f == "" && (q(a, ""), a = l(e), h = m.slice(0), f = h[0], p = c = null);
                k ? setTimeout(function() { o(a, b) }, k === true ? 10 : k) : o(a, b)
            }
        }

        function q(a, b) { a.nodeValue = b + "\u2026" }
        var g = g || {},
            n = window;
        j = g.clamp || 2;
        r = typeof g.useNativeClamp != "undefined" ? g.useNativeClamp : true;
        m = g.splitOnChars || [".", "-", "\u2013", "\u2014", " "];
        k = g.animate || false;
        var i = e.style,
            w = typeof e.style.webkitLineClamp != "undefined",
            d = j,
            v = d.indexOf &&
            (d.indexOf("px") > -1 || d.indexOf("em") > -1),
            h = m.slice(0),
            f = h[0],
            c, p;
        d == "auto" ? d = t() : v && (d = t(parseInt(d)));
        if (w && r) { if (i.overflow = "hidden", i.textOverflow = "ellipsis", i.webkitBoxOrient = "vertical", i.display = "-webkit-box", i.webkitLineClamp = d, v) i.height = j + "px" } else j = u(e) * d, o(l(e), j)
    }
})();

var toggleSiblings = function(a, b, c, d) {
    $(a).fadeIn('fast');
    $(b).hide();
    $(c).fadeIn('fast');
    $(d).hide();
};

var setupDescriptionBoxToggle = function() {
    $(".j-desc-more").click(function(a) {
        a.preventDefault();
        toggleSiblings(".descriptionExpanded", ".description", ".descToggle", ".descToggleMore");
    });
    $(".j-desc-less").click(function(a) {
        a.preventDefault();
        toggleSiblings(".description", ".descriptionExpanded", ".descToggleMore", ".descToggle");
    });
};

var description = $('.description')[0];

$clamp(description, {
    clamp: 3
});

setupDescriptionBoxToggle();