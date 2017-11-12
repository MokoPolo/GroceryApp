// Knockout JavaScript library v2.2.1
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function () {
  function j(w) { throw w; } let m = !0,
    p = null,
    r = !1; function u(w) { return function () { return w; }; } let x = window,
      y = document,
      ga = navigator,
      F = window.jQuery,
      I = void 0;
  function L(w) {
    function ha(a, d, c, e, f) { const g = []; a = b.j(() => { const a = d(c, f) || []; g.length > 0 && (b.a.Ya(M(g), a), e && b.r.K(e, p, [c, a, f])); g.splice(0, g.length); b.a.P(g, a); }, p, { W: a, Ka() { return g.length == 0 || !b.a.X(g[0]); } }); return { M: g, j: a.pa() ? a : I }; } function M(a) { for (;a.length && !b.a.X(a[0]);)a.splice(0, 1); if (a.length > 1) { for (var d = a[0], c = a[a.length - 1], e = [d]; d !== c;) { d = d.nextSibling; if (!d) return; e.push(d); }Array.prototype.splice.apply(a, [0, a.length].concat(e)); } return a; } function S(a, b, c, e, f) {
      let g = Math.min,
        h = Math.max,
        k = [],
        l,
        n = a.length,
        q,
        s = b.length,
        v = s - n || 1,
        G = n + s + 1,
        J,
        A,
        z; for (l = 0; l <= n; l++) { A = J; k.push(J = []); z = g(s, l + v); for (q = h(0, l - 1); q <= z; q++)J[q] = q ? l ? a[l - 1] === b[q - 1] ? A[q - 1] : g(A[q] || G, J[q - 1] || G) + 1 : q + 1 : l + 1; }g = []; h = []; v = []; l = n; for (q = s; l || q;)s = k[l][q] - 1, q && s === k[l][q - 1] ? h.push(g[g.length] = { status: c, value: b[--q], index: q }) : l && s === k[l - 1][q] ? v.push(g[g.length] = { status: e, value: a[--l], index: l }) : (g.push({ status: 'retained', value: b[--q] }), --l); if (h.length && v.length) {
          a = 10 * n; let t; for (b = c = 0; (f || b < a) && (t = h[c]); c++) {
            for (e =
0; k = v[e]; e++) if (t.value === k.value) { t.moved = k.index; k.moved = t.index; v.splice(e, 1); b = e = 0; break; }b += e;
          }
        } return g.reverse();
    } function T(a, d, c, e, f) {
      f = f || {}; var g = a && N(a),
        g = g && g.ownerDocument,
        h = f.templateEngine || O; b.za.vb(c, h, g); c = h.renderTemplate(c, e, f, g); (typeof c.length !== 'number' || c.length > 0 && typeof c[0].nodeType !== 'number') && j(Error('Template engine must return an array of DOM nodes')); g = r; switch (d) {
          case 'replaceChildren':b.e.N(a, c); g = m; break; case 'replaceNode':b.a.Ya(a, c); g = m; break; case 'ignoreTargetNode':break;
          default:j(Error(`Unknown renderMode: ${d}`));
        }g && (U(c, e), f.afterRender && b.r.K(f.afterRender, p, [c, e.$data])); return c;
    } function N(a) { return a.nodeType ? a : a.length > 0 ? a[0] : p; } function U(a, d) {
      if (a.length) {
        let c = a[0],
          e = a[a.length - 1]; V(c, e, (a) => { b.Da(d, a); }); V(c, e, (a) => { b.s.ib(a, [d]); });
      }
    } function V(a, d, c) { let e; for (d = b.e.nextSibling(d); a && (e = a) !== d;)a = b.e.nextSibling(e), (e.nodeType === 1 || e.nodeType === 8) && c(e); } function W(a, d, c) {
      a = b.g.aa(a); for (let e = b.g.Q, f = 0; f < a.length; f++) {
        let g = a[f].key; if (e.hasOwnProperty(g)) {
          const h =
e[g]; typeof h === 'function' ? (g = h(a[f].value)) && j(Error(g)) : h || j(Error(`This template engine does not support the '${g}' binding within its templates`));
        }
      }a = `ko.__tr_ambtns(function($context,$element){return(function(){return{ ${b.g.ba(a)} } })()})`; return c.createJavaScriptEvaluatorBlock(a) + d;
    } function X(a, d, c, e) {
      function f(a) { return function () { return k[a]; }; } function g() { return k; } let h = 0,
        k,
        l; b.j(() => {
          let n = c && c instanceof b.z ? c : new b.z(b.a.d(c)),
            q = n.$data; e && b.eb(a, n); if (k = (typeof d === 'function' ?
d(n, a) : d) || b.J.instance.getBindings(a, n)) {
          if (h === 0) { h = 1; for (var s in k) { var v = b.c[s]; v && a.nodeType === 8 && !b.e.I[s] && j(Error(`The binding '${s}' cannot be used with virtual elements`)); if (v && typeof v.init === 'function' && (v = (0, v.init)(a, f(s), g, q, n)) && v.controlsDescendantBindings)l !== I && j(Error(`Multiple bindings (${l} and ${s}) are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.`)), l = s; }h = 2; } if (h === 2) {
            for (s in k) {
              (v = b.c[s]) && typeof v.update ===
'function' && (0, v.update)(a, f(s), g, q, n);
            }
          }
        }
        }, p, { W: a }); return { Nb: l === I };
    } function Y(a, d, c) {
      let e = m,
        f = d.nodeType === 1; f && b.e.Ta(d); if (f && c || b.J.instance.nodeHasBindings(d))e = X(d, p, a, c).Nb; e && Z(a, d, !f);
    } function Z(a, d, c) { for (let e = b.e.firstChild(d); d = e;)e = b.e.nextSibling(d), Y(a, d, c); } function $(a, b) { const c = aa(a, b); return c ? c.length > 0 ? c[c.length - 1].nextSibling : a.nextSibling : p; } function aa(a, b) {
      for (let c = a, e = 1, f = []; c = c.nextSibling;) { if (H(c) && (e--, e === 0)) return f; f.push(c); B(c) && e++; }b || j(Error(`Cannot find closing comment tag to match: ${
a.nodeValue}`)); return p;
    } function H(a) { return a.nodeType == 8 && (K ? a.text : a.nodeValue).match(ia); } function B(a) { return a.nodeType == 8 && (K ? a.text : a.nodeValue).match(ja); } function P(a, b) { for (let c = p; a != c;)c = a, a = a.replace(ka, (a, c) => b[c]); return a; } function la() {
      let a = [],
    d = []; this.save = function (c, e) { const f = b.a.i(a, c); f >= 0 ? d[f] = e : (a.push(c), d.push(e)); }; this.get = function (c) { c = b.a.i(a, c); return c >= 0 ? d[c] : I; };
    } function ba(a, b, c) {
  function e(e) {
    const g = b(a[e]); switch (typeof g) {
      case 'boolean':case 'number':case 'string':case 'function':f[e] =
g; break; case 'object':case 'undefined':var h = c.get(g); f[e] = h !== I ? h : ba(g, b, c);
    }
  }c = c || new la(); a = b(a); if (!(typeof a === 'object' && a !== p && a !== I && !(a instanceof Date))) return a; var f = a instanceof Array ? [] : {}; c.save(a, f); const g = a; if (g instanceof Array) { for (var h = 0; h < g.length; h++)e(h); typeof g.toJSON === 'function' && e('toJSON'); } else for (h in g)e(h); return f;
} function ca(a, d) {
  if (a) {
    if (a.nodeType == 8) { var c = b.s.Ua(a.nodeValue); c != p && d.push({ sb: a, Fb: c }); } else if (a.nodeType == 1) {
      for (var c = 0, e = a.childNodes, f = e.length; c < f; c++) {
        ca(e[c],
d);
      }
    }
  }
} function Q(a, d, c, e) { b.c[a] = { init(a) { b.a.f.set(a, da, {}); return { controlsDescendantBindings: m }; }, update(a, g, h, k, l) { h = b.a.f.get(a, da); g = b.a.d(g()); k = !c !== !g; const n = !h.Za; if (n || d || k !== h.qb)n && (h.Za = b.a.Ia(b.e.childNodes(a), m)), k ? (n || b.e.N(a, b.a.Ia(h.Za)), b.Ea(e ? e(l, g) : l, a)) : b.e.Y(a), h.qb = k; } }; b.g.Q[a] = r; b.e.I[a] = m; } function ea(a, d, c) { c && d !== b.k.q(a) && b.k.T(a, d); d !== b.k.q(a) && b.r.K(b.a.Ba, p, [a, 'change']); } var b = typeof w !== 'undefined' ? w : {}; b.b = function (a, d) {
  for (var c = a.split('.'), e = b, f = 0; f <
c.length - 1; f++)e = e[c[f]]; e[c[c.length - 1]] = d;
}; b.p = function (a, b, c) { a[b] = c; }; b.version = '2.2.1'; b.b('version', b.version); b.a = new function () {
  function a(a, d) { if (b.a.u(a) !== 'input' || !a.type || d.toLowerCase() != 'click') return r; const c = a.type; return c == 'checkbox' || c == 'radio'; } var d = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
    c = {},
    e = {}; c[/Firefox\/2/i.test(ga.userAgent) ? 'KeyboardEvent' : 'UIEvents'] = ['keyup', 'keydown', 'keypress']; c.MouseEvents = 'click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave'.split(' ');
  for (var f in c) { var g = c[f]; if (g.length) for (let h = 0, k = g.length; h < k; h++)e[g[h]] = f; } var l = { propertychange: m },
    n,
    c = 3; f = y.createElement('div'); for (g = f.getElementsByTagName('i'); f.innerHTML = `\x3c!--[if gt IE ${++c}]><i></i><![endif]--\x3e`, g[0];);n = c > 4 ? c : I; return { Na: ['authenticity_token', /^__RequestVerificationToken(_.*)?$/],
      o(a, b) { for (let d = 0, c = a.length; d < c; d++)b(a[d]); },
      i(a, b) {
        if (typeof Array.prototype.indexOf === 'function') return Array.prototype.indexOf.call(a, b); for (let d = 0, c = a.length; d <
c; d++) if (a[d] === b) return d; return -1;
      },
      lb(a, b, d) { for (let c = 0, e = a.length; c < e; c++) if (b.call(d, a[c])) return a[c]; return p; },
      ga(a, d) { const c = b.a.i(a, d); c >= 0 && a.splice(c, 1); },
      Ga(a) { a = a || []; for (var d = [], c = 0, e = a.length; c < e; c++)b.a.i(d, a[c]) < 0 && d.push(a[c]); return d; },
      V(a, b) { a = a || []; for (var d = [], c = 0, e = a.length; c < e; c++)d.push(b(a[c])); return d; },
      fa(a, b) { a = a || []; for (var d = [], c = 0, e = a.length; c < e; c++)b(a[c]) && d.push(a[c]); return d; },
      P(a, b) {
        if (b instanceof Array) { a.push(...b); } else for (let d = 0, c = b.length; d < c; d++)a.push(b[d]); return a;
      },
      extend(a, b) { if (b) for (const d in b)b.hasOwnProperty(d) && (a[d] = b[d]); return a; },
      ka(a) { for (;a.firstChild;)b.removeNode(a.firstChild); },
      Hb(a) { a = b.a.L(a); for (var d = y.createElement('div'), c = 0, e = a.length; c < e; c++)d.appendChild(b.A(a[c])); return d; },
      Ia(a, d) { for (var c = 0, e = a.length, g = []; c < e; c++) { const f = a[c].cloneNode(m); g.push(d ? b.A(f) : f); } return g; },
      N(a, d) { b.a.ka(a); if (d) for (let c = 0, e = d.length; c < e; c++)a.appendChild(d[c]); },
      Ya(a, d) { const c = a.nodeType ? [a] : a; if (c.length > 0) { for (var e = c[0], g = e.parentNode, f = 0, h = d.length; f < h; f++)g.insertBefore(d[f], e); f = 0; for (h = c.length; f < h; f++)b.removeNode(c[f]); } },
      bb(a, b) { n < 7 ? a.setAttribute('selected', b) : a.selected = b; },
      D(a) { return (a || '').replace(d, ''); },
      Rb(a, d) { for (var c = [], e = (a || '').split(d), f = 0, g = e.length; f < g; f++) { const h = b.a.D(e[f]); h !== '' && c.push(h); } return c; },
      Ob(a, b) { a = a || ''; return b.length > a.length ? r : a.substring(0, b.length) === b; },
      tb(a, b) {
        if (b.compareDocumentPosition) {
          return (b.compareDocumentPosition(a) & 16) ==
16;
        } for (;a != p;) { if (a == b) return m; a = a.parentNode; } return r;
      },
      X(a) { return b.a.tb(a, a.ownerDocument); },
      u(a) { return a && a.tagName && a.tagName.toLowerCase(); },
      n(b, d, c) {
        const e = n && l[d]; if (!e && typeof F !== 'undefined') { if (a(b, d)) { const f = c; c = function (a, b) { const d = this.checked; b && (this.checked = b.nb !== m); f.call(this, a); this.checked = d; }; }F(b).bind(d, c); } else {
          !e && typeof b.addEventListener === 'function' ? b.addEventListener(d, c, r) : typeof b.attachEvent !== 'undefined' ? b.attachEvent(`on${
d}`, (a) => { c.call(b, a); }) : j(Error("Browser doesn't support addEventListener or attachEvent"));
        }
      },
      Ba(b, d) {
        (!b || !b.nodeType) && j(Error('element must be a DOM node when calling triggerEvent')); if (typeof F !== 'undefined') { var c = []; a(b, d) && c.push({ nb: b.checked }); F(b).trigger(d, c); } else {
          typeof y.createEvent === 'function' ? typeof b.dispatchEvent === 'function' ? (c = y.createEvent(e[d] || 'HTMLEvents'), c.initEvent(d, m, m, x, 0, 0, 0, 0, 0, r, r, r, r, 0, b), b.dispatchEvent(c)) : j(Error("The supplied element doesn't support dispatchEvent")) :
typeof b.fireEvent !== 'undefined' ? (a(b, d) && (b.checked = b.checked !== m), b.fireEvent(`on${d}`)) : j(Error("Browser doesn't support triggering events"));
        }
      },
      d(a) { return b.$(a) ? a() : a; },
      ua(a) { return b.$(a) ? a.t() : a; },
      da(a, d, c) {
        if (d) {
          let e = /[\w-]+/g,
            f = a.className.match(e) || []; b.a.o(d.match(e), (a) => { const d = b.a.i(f, a); d >= 0 ? c || f.splice(d, 1) : c && f.push(a); }); a.className = f.join(' ');
        }
      },
      cb(a, d) {
        let c = b.a.d(d); if (c === p || c === I)c = ''; if (a.nodeType === 3)a.data = c; else {
          const e = b.e.firstChild(a);
          !e || e.nodeType != 3 || b.e.nextSibling(e) ? b.e.N(a, [y.createTextNode(c)]) : e.data = c; b.a.wb(a);
        }
      },
      ab(a, b) { a.name = b; if (n <= 7) try { a.mergeAttributes(y.createElement(`<input name='${a.name}'/>`), r); } catch (d) {} },
      wb(a) { n >= 9 && (a = a.nodeType == 1 ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom)); },
      ub(a) { if (n >= 9) { const b = a.style.width; a.style.width = 0; a.style.width = b; } },
      Lb(a, d) { a = b.a.d(a); d = b.a.d(d); for (var c = [], e = a; e <= d; e++)c.push(e); return c; },
      L(a) {
        for (var b = [], d = 0, c = a.length; d <
c; d++)b.push(a[d]); return b;
      },
      Pb: n === 6,
      Qb: n === 7,
      Z: n,
      Oa(a, d) { for (var c = b.a.L(a.getElementsByTagName('input')).concat(b.a.L(a.getElementsByTagName('textarea'))), e = typeof d === 'string' ? function (a) { return a.name === d; } : function (a) { return d.test(a.name); }, f = [], g = c.length - 1; g >= 0; g--)e(c[g]) && f.push(c[g]); return f; },
      Ib(a) { return typeof a === 'string' && (a = b.a.D(a)) ? x.JSON && x.JSON.parse ? x.JSON.parse(a) : (new Function(`return ${a}`))() : p; },
      xa(a, d, c) {
        (typeof JSON === 'undefined' || typeof JSON.stringify === 'undefined') &&
j(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")); return JSON.stringify(b.a.d(a), d, c);
      },
      Jb(a, d, c) {
        c = c || {}; var e = c.params || {},
          f = c.includeFields || this.Na,
          g = a; if (typeof a === 'object' && b.a.u(a) === 'form') for (var g = a.action, h = f.length - 1; h >= 0; h--) for (let k = b.a.Oa(a, f[h]), l = k.length - 1; l >= 0; l--)e[k[l].name] = k[l].value; d = b.a.d(d); const n = y.createElement('form');
        n.style.display = 'none'; n.action = g; n.method = 'post'; for (var w in d)a = y.createElement('input'), a.name = w, a.value = b.a.xa(b.a.d(d[w])), n.appendChild(a); for (w in e)a = y.createElement('input'), a.name = w, a.value = e[w], n.appendChild(a); y.body.appendChild(n); c.submitter ? c.submitter(n) : n.submit(); setTimeout(() => { n.parentNode.removeChild(n); }, 0);
      } };
}(); b.b('utils', b.a); b.b('utils.arrayForEach', b.a.o); b.b('utils.arrayFirst', b.a.lb); b.b('utils.arrayFilter', b.a.fa); b.b('utils.arrayGetDistinctValues', b.a.Ga); b.b('utils.arrayIndexOf',
b.a.i); b.b('utils.arrayMap', b.a.V); b.b('utils.arrayPushAll', b.a.P); b.b('utils.arrayRemoveItem', b.a.ga); b.b('utils.extend', b.a.extend); b.b('utils.fieldsIncludedWithJsonPost', b.a.Na); b.b('utils.getFormFields', b.a.Oa); b.b('utils.peekObservable', b.a.ua); b.b('utils.postJson', b.a.Jb); b.b('utils.parseJson', b.a.Ib); b.b('utils.registerEventHandler', b.a.n); b.b('utils.stringifyJson', b.a.xa); b.b('utils.range', b.a.Lb); b.b('utils.toggleDomNodeCssClass', b.a.da); b.b('utils.triggerEvent', b.a.Ba); b.b('utils.unwrapObservable',
b.a.d); Function.prototype.bind || (Function.prototype.bind = function (a) {
  let b = this,
    c = Array.prototype.slice.call(arguments); a = c.shift(); return function () { return b.apply(a, c.concat(Array.prototype.slice.call(arguments))); };
}); b.a.f = new function () {
  let a = 0,
    d = `__ko__${(new Date()).getTime()}`,
    c = {}; return { get(a, d) { const c = b.a.f.la(a, r); return c === I ? I : c[d]; },
      set(a, d, c) { c === I && b.a.f.la(a, r) === I || (b.a.f.la(a, m)[d] = c); },
      la(b, f) {
        let g = b[d]; if (!g || !(g !== 'null' && c[g])) {
          if (!f) return I; g = b[d] = `ko${
a++}`; c[g] = {};
        } return c[g];
      },
      clear(a) { const b = a[d]; return b ? (delete c[b], a[d] = p, m) : r; } };
}(); b.b('utils.domData', b.a.f); b.b('utils.domData.clear', b.a.f.clear); b.a.F = new function () {
  function a(a, d) { let e = b.a.f.get(a, c); e === I && d && (e = [], b.a.f.set(a, c, e)); return e; } function d(c) { var e = a(c, r); if (e) for (var e = e.slice(0), k = 0; k < e.length; k++)e[k](c); b.a.f.clear(c); typeof F === 'function' && typeof F.cleanData === 'function' && F.cleanData([c]); if (f[c.nodeType]) for (e = c.firstChild; c = e;)e = c.nextSibling, c.nodeType === 8 && d(c); }
  var c = `__ko_domNodeDisposal__${(new Date()).getTime()}`,
    e = { 1: m, 8: m, 9: m },
    f = { 1: m, 9: m }; return { Ca(b, d) { typeof d !== 'function' && j(Error('Callback must be a function')); a(b, m).push(d); }, Xa(d, e) { const f = a(d, r); f && (b.a.ga(f, e), f.length == 0 && b.a.f.set(d, c, I)); }, A(a) { if (e[a.nodeType] && (d(a), f[a.nodeType])) { const c = []; b.a.P(c, a.getElementsByTagName('*')); for (let k = 0, l = c.length; k < l; k++)d(c[k]); } return a; }, removeNode(a) { b.A(a); a.parentNode && a.parentNode.removeChild(a); } };
}(); b.A = b.a.F.A; b.removeNode =
b.a.F.removeNode; b.b('cleanNode', b.A); b.b('removeNode', b.removeNode); b.b('utils.domNodeDisposal', b.a.F); b.b('utils.domNodeDisposal.addDisposeCallback', b.a.F.Ca); b.b('utils.domNodeDisposal.removeDisposeCallback', b.a.F.Xa); b.a.ta = function (a) {
  let d; if (typeof F !== 'undefined') {
    if (F.parseHTML)d = F.parseHTML(a); else if ((d = F.clean([a])) && d[0]) { for (a = d[0]; a.parentNode && a.parentNode.nodeType !== 11;)a = a.parentNode; a.parentNode && a.parentNode.removeChild(a); } else {
      let c = b.a.D(a).toLowerCase(); d = y.createElement('div');
      c = c.match(/^<(thead|tbody|tfoot)/) && [1, '<table>', '</table>'] || !c.indexOf('<tr') && [2, '<table><tbody>', '</tbody></table>'] || (!c.indexOf('<td') || !c.indexOf('<th')) && [3, '<table><tbody><tr>', '</tr></tbody></table>'] || [0, '', '']; a = `ignored<div>${c[1]}${a}${c[2]}</div>`; for (typeof x.innerShiv === 'function' ? d.appendChild(x.innerShiv(a)) : d.innerHTML = a; c[0]--;)d = d.lastChild; d = b.a.L(d.lastChild.childNodes);
    }
  } return d;
}; b.a.ca = function (a, d) {
  b.a.ka(a); d = b.a.d(d); if (d !== p && d !== I) {
    if (typeof d !== 'string' && (d = d.toString()),
typeof F !== 'undefined')F(a).html(d); else for (let c = b.a.ta(d), e = 0; e < c.length; e++)a.appendChild(c[e]);
  }
}; b.b('utils.parseHtmlFragment', b.a.ta); b.b('utils.setHtml', b.a.ca); const R = {}; b.s = { ra(a) { typeof a !== 'function' && j(Error('You can only pass a function to ko.memoization.memoize()')); const b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1); R[b] = a; return `\x3c!--[ko_memo:${b}]--\x3e`; },
  hb(a, b) {
    const c = R[a]; c === I && j(Error(`Couldn't find any memo with ID ${
a}. Perhaps it's already been unmemoized.`)); try { return c.apply(p, b || []), m; } finally { delete R[a]; }
  },
  ib(a, d) {
    const c = []; ca(a, c); for (let e = 0, f = c.length; e < f; e++) {
      let g = c[e].sb,
        h = [g]; d && b.a.P(h, d); b.s.hb(c[e].Fb, h); g.nodeValue = ''; g.parentNode && g.parentNode.removeChild(g);
    }
  },
  Ua(a) { return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : p; } }; b.b('memoization', b.s); b.b('memoization.memoize', b.s.ra); b.b('memoization.unmemoize', b.s.hb); b.b('memoization.parseMemoText', b.s.Ua); b.b('memoization.unmemoizeDomNodeAndDescendants',
b.s.ib); b.Ma = { throttle(a, d) { a.throttleEvaluation = d; let c = p; return b.j({ read: a, write(b) { clearTimeout(c); c = setTimeout(() => { a(b); }, d); } }); }, notify(a, d) { a.equalityComparer = d == 'always' ? u(r) : b.m.fn.equalityComparer; return a; } }; b.b('extenders', b.Ma); b.fb = function (a, d, c) { this.target = a; this.ha = d; this.rb = c; b.p(this, 'dispose', this.B); }; b.fb.prototype.B = function () { this.Cb = m; this.rb(); }; b.S = function () {
  this.w = {}; b.a.extend(this, b.S.fn); b.p(this, 'subscribe', this.ya); b.p(this, 'extend',
this.extend); b.p(this, 'getSubscriptionsCount', this.yb);
}; b.S.fn = { ya(a, d, c) { c = c || 'change'; var e = new b.fb(this, d ? a.bind(d) : a, () => { b.a.ga(this.w[c], e); }); this.w[c] || (this.w[c] = []); this.w[c].push(e); return e; },
  notifySubscribers(a, d) { d = d || 'change'; this.w[d] && b.r.K(function () { b.a.o(this.w[d].slice(0), (b) => { b && b.Cb !== m && b.ha(a); }); }, this); },
  yb() {
    let a = 0,
      b; for (b in this.w) this.w.hasOwnProperty(b) && (a += this.w[b].length); return a;
  },
  extend(a) {
    let d = this; if (a) {
      for (const c in a) {
        const e =
b.Ma[c]; typeof e === 'function' && (d = e(d, a[c]));
      }
    } return d;
  } }; b.Qa = function (a) { return typeof a.ya === 'function' && typeof a.notifySubscribers === 'function'; }; b.b('subscribable', b.S); b.b('isSubscribable', b.Qa); const C = []; b.r = { mb(a) { C.push({ ha: a, La: [] }); }, end() { C.pop(); }, Wa(a) { b.Qa(a) || j(Error('Only subscribable things can act as dependencies')); if (C.length > 0) { const d = C[C.length - 1]; d && !(b.a.i(d.La, a) >= 0) && (d.La.push(a), d.ha(a)); } }, K(a, b, c) { try { return C.push(p), a.apply(b, c || []); } finally { C.pop(); } } };
    const ma = { undefined: m, boolean: m, number: m, string: m }; b.m = function (a) { function d() { if (arguments.length > 0) { if (!d.equalityComparer || !d.equalityComparer(c, arguments[0]))d.H(), c = arguments[0], d.G(); return this; }b.r.Wa(d); return c; } var c = a; b.S.call(d); d.t = function () { return c; }; d.G = function () { d.notifySubscribers(c); }; d.H = function () { d.notifySubscribers(c, 'beforeChange'); }; b.a.extend(d, b.m.fn); b.p(d, 'peek', d.t); b.p(d, 'valueHasMutated', d.G); b.p(d, 'valueWillMutate', d.H); return d; }; b.m.fn = { equalityComparer(a,
      b) { return a === p || typeof a in ma ? a === b : r; } }; const E = b.m.Kb = '__ko_proto__'; b.m.fn[E] = b.m; b.ma = function (a, d) { return a === p || a === I || a[E] === I ? r : a[E] === d ? m : b.ma(a[E], d); }; b.$ = function (a) { return b.ma(a, b.m); }; b.Ra = function (a) { return typeof a === 'function' && a[E] === b.m || typeof a === 'function' && a[E] === b.j && a.zb ? m : r; }; b.b('observable', b.m); b.b('isObservable', b.$); b.b('isWriteableObservable', b.Ra); b.R = function (a) {
        arguments.length == 0 && (a = []); a !== p && (a !== I && !('length' in a)) && j(Error('The argument passed when initializing an observable array must be an array, or null, or undefined.'));
        const d = b.m(a); b.a.extend(d, b.R.fn); return d;
      }; b.R.fn = { remove(a) { for (var b = this.t(), c = [], e = typeof a === 'function' ? a : function (b) { return b === a; }, f = 0; f < b.length; f++) { const g = b[f]; e(g) && (c.length === 0 && this.H(), c.push(g), b.splice(f, 1), f--); }c.length && this.G(); return c; },
        removeAll(a) {
          if (a === I) {
            let d = this.t(),
              c = d.slice(0); this.H(); d.splice(0, d.length); this.G(); return c;
          } return !a ? [] : this.remove(d => b.a.i(a, d) >= 0);
        },
        destroy(a) {
          let b = this.t(),
            c = typeof a === 'function' ? a : function (b) {
              return b ===
a;
            }; this.H(); for (let e = b.length - 1; e >= 0; e--)c(b[e]) && (b[e]._destroy = m); this.G();
        },
        destroyAll(a) { return a === I ? this.destroy(u(m)) : !a ? [] : this.destroy(d => b.a.i(a, d) >= 0); },
        indexOf(a) { const d = this(); return b.a.i(d, a); },
        replace(a, b) { const c = this.indexOf(a); c >= 0 && (this.H(), this.t()[c] = b, this.G()); } }; b.a.o('pop push reverse shift sort splice unshift'.split(' '), (a) => { b.R.fn[a] = function () { let b = this.t(); this.H(); b = b[a](...arguments); this.G(); return b; }; }); b.a.o(['slice'],
(a) => { b.R.fn[a] = function () { const b = this(); return b[a](...arguments); }; }); b.b('observableArray', b.R); b.j = function (a, d, c) {
  function e() { b.a.o(z, (a) => { a.B(); }); z = []; } function f() { const a = h.throttleEvaluation; a && a >= 0 ? (clearTimeout(t), t = setTimeout(g, a)) : g(); } function g() {
    if (!q) {
      if (n && w())A(); else {
        q = m; try {
          const a = b.a.V(z, a => a.target); b.r.mb((c) => { let d; (d = b.a.i(a, c)) >= 0 ? a[d] = I : z.push(c.ya(f)); }); for (var c = s.call(d), e = a.length - 1; e >= 0; e--)a[e] && z.splice(e, 1)[0].B(); n = m; h.notifySubscribers(l,
'beforeChange'); l = c;
        } finally { b.r.end(); }h.notifySubscribers(l); q = r; z.length || A();
      }
    }
  } function h() { if (arguments.length > 0) return typeof v === 'function' ? v.apply(d, arguments) : j(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")), this; n || g(); b.r.Wa(h); return l; } function k() { return !n || z.length > 0; } var l,
    n = r,
    q = r,
    s = a; s && typeof s === 'object' ? (c = s, s = c.read) : (c = c || {}, s || (s = c.read)); typeof s !== 'function' && j(Error('Pass a function that returns the value of the ko.computed'));
  var v = c.write,
    G = c.disposeWhenNodeIsRemoved || c.W || p,
    w = c.disposeWhen || c.Ka || u(r),
    A = e,
    z = [],
    t = p; d || (d = c.owner); h.t = function () { n || g(); return l; }; h.xb = function () { return z.length; }; h.zb = typeof c.write === 'function'; h.B = function () { A(); }; h.pa = k; b.S.call(h); b.a.extend(h, b.j.fn); b.p(h, 'peek', h.t); b.p(h, 'dispose', h.B); b.p(h, 'isActive', h.pa); b.p(h, 'getDependenciesCount', h.xb); c.deferEvaluation !== m && g(); if (G && k()) {
      A = function () { b.a.F.Xa(G, arguments.callee); e(); }; b.a.F.Ca(G, A); var D = w,
        w = function () { return !b.a.X(G) || D(); };
    } return h;
};
    b.Bb = function (a) { return b.ma(a, b.j); }; w = b.m.Kb; b.j[w] = b.m; b.j.fn = {}; b.j.fn[w] = b.j; b.b('dependentObservable', b.j); b.b('computed', b.j); b.b('isComputed', b.Bb); b.gb = function (a) { arguments.length == 0 && j(Error('When calling ko.toJS, pass the object you want to convert.')); return ba(a, (a) => { for (let c = 0; b.$(a) && c < 10; c++)a = a(); return a; }); }; b.toJSON = function (a, d, c) { a = b.gb(a); return b.a.xa(a, d, c); }; b.b('toJS', b.gb); b.b('toJSON', b.toJSON); b.k = { q(a) {
      switch (b.a.u(a)) {
        case 'option':return a.__ko__hasDomDataOptionValue__ ===
m ? b.a.f.get(a, b.c.options.sa) : b.a.Z <= 7 ? a.getAttributeNode('value').specified ? a.value : a.text : a.value; case 'select':return a.selectedIndex >= 0 ? b.k.q(a.options[a.selectedIndex]) : I; default:return a.value;
      }
    },
      T(a, d) {
        switch (b.a.u(a)) {
          case 'option':switch (typeof d) {
            case 'string':b.a.f.set(a, b.c.options.sa, I); '__ko__hasDomDataOptionValue__' in a && delete a.__ko__hasDomDataOptionValue__; a.value = d; break; default:b.a.f.set(a, b.c.options.sa, d), a.__ko__hasDomDataOptionValue__ = m, a.value = typeof d === 'number' ?
d : '';
          } break; case 'select':for (let c = a.options.length - 1; c >= 0; c--) if (b.k.q(a.options[c]) == d) { a.selectedIndex = c; break; } break; default:if (d === p || d === I)d = ''; a.value = d;
        }
      } }; b.b('selectExtensions', b.k); b.b('selectExtensions.readValue', b.k.q); b.b('selectExtensions.writeValue', b.k.T); var ka = /\@ko_token_(\d+)\@/g,
        na = ['true', 'false'],
        oa = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i; b.g = { Q: [],
          aa(a) {
            var d = b.a.D(a); if (d.length < 3) return []; d.charAt(0) === '{' && (d = d.substring(1, d.length - 1)); a = []; for (var c =
p, e, f = 0; f < d.length; f++) {
              var g = d.charAt(f); if (c === p) switch (g) { case '"':case "'":case '/':c = f, e = g; } else if (g == e && d.charAt(f - 1) !== '\\') {
                g = d.substring(c, f + 1); a.push(g); var h = `@ko_token_${a.length - 1}@`,
                d = d.substring(0, c) + h + d.substring(f + 1),
                f = f - (g.length - h.length),
                c = p;
              }
            }e = c = p; for (var k = 0, l = p, f = 0; f < d.length; f++) {
              g = d.charAt(f); if (c === p) switch (g) { case '{':c = f; l = g; e = '}'; break; case '(':c = f; l = g; e = ')'; break; case '[':c = f, l = g, e = ']'; }g === l ? k++ : g === e && (k--, k === 0 && (g = d.substring(c, f + 1), a.push(g), h = `@ko_token_${a.length -
1}@`, d = d.substring(0, c) + h + d.substring(f + 1), f -= g.length - h.length, c = p));
            }e = []; d = d.split(','); c = 0; for (f = d.length; c < f; c++)k = d[c], l = k.indexOf(':'), l > 0 && l < k.length - 1 ? (g = k.substring(l + 1), e.push({ key: P(k.substring(0, l), a), value: P(g, a) })) : e.push({ unknown: P(k, a) }); return e;
          },
          ba(a) {
            let d = typeof a === 'string' ? b.g.aa(a) : a,
              c = []; a = []; for (var e, f = 0; e = d[f]; f++) {
                if (c.length > 0 && c.push(','), e.key) {
                var g; a: { g = e.key; var h = b.a.D(g); switch (h.length && h.charAt(0)) { case "'":case '"':break a; default:g = `'${h}'`; } }e = e.value;
                c.push(g); c.push(':'); c.push(e); e = b.a.D(e); b.a.i(na, b.a.D(e).toLowerCase()) >= 0 ? e = r : (h = e.match(oa), e = h === p ? r : h[1] ? `Object(${h[1]})${h[2]}` : e); e && (a.length > 0 && a.push(', '), a.push(`${g} : function(__ko_value) { ${e} = __ko_value; }`));
              } else e.unknown && c.push(e.unknown);
              } d = c.join(''); a.length > 0 && (d = `${d}, '_ko_property_writers' : { ${a.join('')} } `); return d;
          },
          Eb(a, d) { for (let c = 0; c < a.length; c++) if (b.a.D(a[c].key) == d) return m; return r; },
          ea(a, d, c, e, f) {
            if (!a || !b.Ra(a)) {
              if ((a = d()._ko_property_writers) &&
a[c])a[c](e);
            } else (!f || a.t() !== e) && a(e);
          } }; b.b('expressionRewriting', b.g); b.b('expressionRewriting.bindingRewriteValidators', b.g.Q); b.b('expressionRewriting.parseObjectLiteral', b.g.aa); b.b('expressionRewriting.preProcessBindings', b.g.ba); b.b('jsonExpressionRewriting', b.g); b.b('jsonExpressionRewriting.insertPropertyAccessorsIntoJson', b.g.ba); var K = y.createComment('test').text === '\x3c!--test--\x3e',
            ja = K ? /^\x3c!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\x3e$/ : /^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/,
            ia = K ? /^\x3c!--\s*\/ko\s*--\x3e$/ :
/^\s*\/ko\s*$/,
            pa = { ul: m, ol: m }; b.e = { I: {},
              childNodes(a) { return B(a) ? aa(a) : a.childNodes; },
              Y(a) { if (B(a)) { a = b.e.childNodes(a); for (let d = 0, c = a.length; d < c; d++)b.removeNode(a[d]); } else b.a.ka(a); },
              N(a, d) { if (B(a)) { b.e.Y(a); for (let c = a.nextSibling, e = 0, f = d.length; e < f; e++)c.parentNode.insertBefore(d[e], c); } else b.a.N(a, d); },
              Va(a, b) { B(a) ? a.parentNode.insertBefore(b, a.nextSibling) : a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b); },
              Pa(a, d, c) {
              c ? B(a) ? a.parentNode.insertBefore(d,
c.nextSibling) : c.nextSibling ? a.insertBefore(d, c.nextSibling) : a.appendChild(d) : b.e.Va(a, d);
            },
              firstChild(a) { return !B(a) ? a.firstChild : !a.nextSibling || H(a.nextSibling) ? p : a.nextSibling; },
              nextSibling(a) { B(a) && (a = $(a)); return a.nextSibling && H(a.nextSibling) ? p : a.nextSibling; },
              jb(a) { return (a = B(a)) ? a[1] : p; },
              Ta(a) {
              if (pa[b.a.u(a)]) {
                let d = a.firstChild; if (d) {
              do {
              if (d.nodeType === 1) {
              var c; c = d.firstChild; let e = p; if (c) {
              do {
              if (e)e.push(c); else if (B(c)) { var f = $(c, m); f ? c = f : e = [c]; } else {
                H(c) &&
(e = [c]);
              }
            } while (c = c.nextSibling);
            } if (c = e) { e = d.nextSibling; for (f = 0; f < c.length; f++)e ? a.insertBefore(c[f], e) : a.appendChild(c[f]); }
            }
            } while (d = d.nextSibling);
            }
              }
            } }; b.b('virtualElements', b.e); b.b('virtualElements.allowedBindings', b.e.I); b.b('virtualElements.emptyNode', b.e.Y); b.b('virtualElements.insertAfter', b.e.Pa); b.b('virtualElements.prepend', b.e.Va); b.b('virtualElements.setDomNodeChildren', b.e.N); b.J = function () { this.Ha = {}; }; b.a.extend(b.J.prototype, { nodeHasBindings(a) {
              switch (a.nodeType) {
            case 1:return a.getAttribute('data-bind') !=
p; case 8:return b.e.jb(a) != p; default:return r;
          }
            },
              getBindings(a, b) { const c = this.getBindingsString(a, b); return c ? this.parseBindingsString(c, b, a) : p; },
              getBindingsString(a) { switch (a.nodeType) { case 1:return a.getAttribute('data-bind'); case 8:return b.e.jb(a); default:return p; } },
              parseBindingsString(a, d, c) {
            try {
            let e; if (!(e = this.Ha[a])) {
            let f = this.Ha,
            g,
            h = `with($context){with($data||{}){return{${b.g.ba(a)}}}}`; g = new Function('$context', '$element', h); e = f[a] = g;
          } return e(d, c);
          } catch (k) {
            j(Error(`Unable to parse bindings.\nMessage: ${
k};\nBindings value: ${a}`));
          }
          } }); b.J.instance = new b.J(); b.b('bindingProvider', b.J); b.c = {}; b.z = function (a, d, c) { d ? (b.a.extend(this, d), this.$parentContext = d, this.$parent = d.$data, this.$parents = (d.$parents || []).slice(0), this.$parents.unshift(this.$parent)) : (this.$parents = [], this.$root = a, this.ko = b); this.$data = a; c && (this[c] = a); }; b.z.prototype.createChildContext = function (a, d) { return new b.z(a, this, d); }; b.z.prototype.extend = function (a) { const d = b.a.extend(new b.z(), this); return b.a.extend(d, a); }; b.eb = function (a, d) {
          if (arguments.length ==
2)b.a.f.set(a, '__ko_bindingContext__', d); else return b.a.f.get(a, '__ko_bindingContext__');
        }; b.Fa = function (a, d, c) { a.nodeType === 1 && b.e.Ta(a); return X(a, d, c, m); }; b.Ea = function (a, b) { (b.nodeType === 1 || b.nodeType === 8) && Z(a, b, m); }; b.Da = function (a, b) { b && (b.nodeType !== 1 && b.nodeType !== 8) && j(Error('ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node')); b = b || x.document.body; Y(a, b, m); }; b.ja = function (a) {
        switch (a.nodeType) {
        case 1:case 8:var d = b.eb(a); if (d) return d;
          if (a.parentNode) return b.ja(a.parentNode);
      } return I;
      }; b.pb = function (a) { return (a = b.ja(a)) ? a.$data : I; }; b.b('bindingHandlers', b.c); b.b('applyBindings', b.Da); b.b('applyBindingsToDescendants', b.Ea); b.b('applyBindingsToNode', b.Fa); b.b('contextFor', b.ja); b.b('dataFor', b.pb); const fa = { class: 'className', for: 'htmlFor' }; b.c.attr = { update(a, d) {
      let c = b.a.d(d()) || {},
        e; for (e in c) {
        if (typeof e === 'string') {
          let f = b.a.d(c[e]),
          g = f === r || f === p || f === I; g && a.removeAttribute(e); b.a.Z <= 8 && e in fa ? (e = fa[e], g ? a.removeAttribute(e) :
a[e] = f) : g || a.setAttribute(e, f.toString()); e === 'name' && b.a.ab(a, g ? '' : f.toString());
        }
      }
    } }; b.c.checked = { init(a, d, c) {
      b.a.n(a, 'click', () => {
      let e; if (a.type == 'checkbox')e = a.checked; else if (a.type == 'radio' && a.checked)e = a.value; else return; let f = d(),
        g = b.a.d(f); a.type == 'checkbox' && g instanceof Array ? (e = b.a.i(g, a.value), a.checked && e < 0 ? f.push(a.value) : !a.checked && e >= 0 && f.splice(e, 1)) : b.g.ea(f, c, 'checked', e, m);
    }); a.type == 'radio' && !a.name && b.c.uniqueName.init(a, u(m));
    },
      update(a, d) {
      const c = b.a.d(d());
      a.type == 'checkbox' ? a.checked = c instanceof Array ? b.a.i(c, a.value) >= 0 : c : a.type == 'radio' && (a.checked = a.value == c);
    } }; b.c.css = { update(a, d) { let c = b.a.d(d()); if (typeof c === 'object') for (const e in c) { const f = b.a.d(c[e]); b.a.da(a, e, f); } else c = String(c || ''), b.a.da(a, a.__ko__cssValue, r), a.__ko__cssValue = c, b.a.da(a, c, m); } }; b.c.enable = { update(a, d) { const c = b.a.d(d()); c && a.disabled ? a.removeAttribute('disabled') : !c && !a.disabled && (a.disabled = m); } }; b.c.disable = { update(a, d) { b.c.enable.update(a, () => !b.a.d(d())); } };
    b.c.event = { init(a, d, c, e) {
      let f = d() || {},
        g; for (g in f) {
          (function () {
            const f = g; typeof f === 'string' && b.a.n(a, f, function (a) {
              let g,
                n = d()[f]; if (n) { const q = c(); try { const s = b.a.L(arguments); s.unshift(e); g = n.apply(e, s); } finally { g !== m && (a.preventDefault ? a.preventDefault() : a.returnValue = r); }q[`${f}Bubble`] === r && (a.cancelBubble = m, a.stopPropagation && a.stopPropagation()); }
            });
          }());
        }
    } }; b.c.foreach = { Sa(a) {
      return function () {
        let d = a(),
          c = b.a.ua(d); if (!c || typeof c.length === 'number') return { foreach: d, templateEngine: b.C.oa };
        b.a.d(d); return { foreach: c.data, as: c.as, includeDestroyed: c.includeDestroyed, afterAdd: c.afterAdd, beforeRemove: c.beforeRemove, afterRender: c.afterRender, beforeMove: c.beforeMove, afterMove: c.afterMove, templateEngine: b.C.oa };
      };
    },
      init(a, d) { return b.c.template.init(a, b.c.foreach.Sa(d)); },
      update(a, d, c, e, f) { return b.c.template.update(a, b.c.foreach.Sa(d), c, e, f); } }; b.g.Q.foreach = r; b.e.I.foreach = m; b.c.hasfocus = { init(a, d, c) {
        function e(e) {
          a.__ko_hasfocusUpdating = m; let f = a.ownerDocument; 'activeElement' in
f && (e = f.activeElement === a); f = d(); b.g.ea(f, c, 'hasfocus', e, m); a.__ko_hasfocusUpdating = r;
        } let f = e.bind(p, m),
          g = e.bind(p, r); b.a.n(a, 'focus', f); b.a.n(a, 'focusin', f); b.a.n(a, 'blur', g); b.a.n(a, 'focusout', g);
      },
        update(a, d) { const c = b.a.d(d()); a.__ko_hasfocusUpdating || (c ? a.focus() : a.blur(), b.r.K(b.a.Ba, p, [a, c ? 'focusin' : 'focusout'])); } }; b.c.html = { init() { return { controlsDescendantBindings: m }; }, update(a, d) { b.a.ca(a, d()); } }; var da = '__ko_withIfBindingData'; Q('if'); Q('ifnot', r, m); Q('with', m, r, (a,
  b) => a.createChildContext(b)); b.c.options = { update(a, d, c) {
    b.a.u(a) !== 'select' && j(Error('options binding applies only to SELECT elements')); for (var e = a.length == 0, f = b.a.V(b.a.fa(a.childNodes, a => a.tagName && b.a.u(a) === 'option' && a.selected), a => b.k.q(a) || a.innerText || a.textContent), g = a.scrollTop, h = b.a.d(d()); a.length > 0;)b.A(a.options[0]), a.remove(0); if (h) {
      c = c(); let k = c.optionsIncludeDestroyed; typeof h.length !== 'number' && (h = [h]); if (c.optionsCaption) {
        var l = y.createElement('option');
        b.a.ca(l, c.optionsCaption); b.k.T(l, I); a.appendChild(l);
      }d = 0; for (var n = h.length; d < n; d++) {
        let q = h[d]; if (!q || !q._destroy || k) {
          var l = y.createElement('option'),
            s = function (a, b, c) { const d = typeof b; return d == 'function' ? b(a) : d == 'string' ? a[b] : c; },
            v = s(q, c.optionsValue, q); b.k.T(l, b.a.d(v)); q = s(q, c.optionsText, v); b.a.cb(l, q); a.appendChild(l);
        }
      }h = a.getElementsByTagName('option'); d = k = 0; for (n = h.length; d < n; d++)b.a.i(f, b.k.q(h[d])) >= 0 && (b.a.bb(h[d], m), k++); a.scrollTop = g; e && 'value' in c && ea(a, b.a.ua(c.value), m); b.a.ub(a);
    }
  } };
    b.c.options.sa = '__ko.optionValueDomData__'; b.c.selectedOptions = { init(a, d, c) {
      b.a.n(a, 'change', () => {
        let e = d(),
          f = []; b.a.o(a.getElementsByTagName('option'), (a) => { a.selected && f.push(b.k.q(a)); }); b.g.ea(e, c, 'value', f);
      });
    },
      update(a, d) { b.a.u(a) != 'select' && j(Error('values binding applies only to SELECT elements')); const c = b.a.d(d()); c && typeof c.length === 'number' && b.a.o(a.getElementsByTagName('option'), (a) => { const d = b.a.i(c, b.k.q(a)) >= 0; b.a.bb(a, d); }); } }; b.c.style = { update(a,
        d) {
        let c = b.a.d(d() || {}),
          e; for (e in c) if (typeof e === 'string') { const f = b.a.d(c[e]); a.style[e] = f || ''; }
      } }; b.c.submit = { init(a, d, c, e) {
        typeof d() !== 'function' && j(Error('The value for a submit binding must be a function')); b.a.n(a, 'submit', (b) => {
          let c,
            h = d(); try { c = h.call(e, a); } finally { c !== m && (b.preventDefault ? b.preventDefault() : b.returnValue = r); }
        });
      } }; b.c.text = { update(a, d) { b.a.cb(a, d()); } }; b.e.I.text = m; b.c.uniqueName = { init(a, d) {
        if (d()) {
          const c = `ko_unique_${++b.c.uniqueName.ob}`; b.a.ab(a,
c);
        }
      } }; b.c.uniqueName.ob = 0; b.c.value = { init(a, d, c) {
        function e() {
          h = r; let e = d(),
      f = b.k.q(a); b.g.ea(e, c, 'value', f);
        } var f = ['change'],
    g = c().valueUpdate,
    h = r; g && (typeof g === 'string' && (g = [g]), b.a.P(f, g), f = b.a.Ga(f)); if (b.a.Z && (a.tagName.toLowerCase() == 'input' && a.type == 'text' && a.autocomplete != 'off' && (!a.form || a.form.autocomplete != 'off')) && b.a.i(f, 'propertychange') == -1)b.a.n(a, 'propertychange', () => { h = m; }), b.a.n(a, 'blur', () => { h && e(); }); b.a.o(f, (c) => {
      let d = e; b.a.Ob(c, 'after') && (d = function () {
        setTimeout(e,
0);
      }, c = c.substring(5)); b.a.n(a, c, d);
    });
      },
        update(a, d) {
          let c = b.a.u(a) === 'select',
      e = b.a.d(d()),
      f = b.k.q(a),
      g = e != f; e === 0 && (f !== 0 && f !== '0') && (g = m); g && (f = function () { b.k.T(a, e); }, f(), c && setTimeout(f, 0)); c && a.length > 0 && ea(a, e, r);
        } }; b.c.visible = { update(a, d) {
    let c = b.a.d(d()),
      e = a.style.display != 'none'; c && !e ? a.style.display = '' : !c && e && (a.style.display = 'none');
  } }; b.c.click = { init(a, d, c, e) { return b.c.event.init.call(this, a, () => { const a = {}; a.click = d(); return a; }, c, e); } }; b.v = function () {}; b.v.prototype.renderTemplateSource =
function () { j(Error('Override renderTemplateSource')); }; b.v.prototype.createJavaScriptEvaluatorBlock = function () { j(Error('Override createJavaScriptEvaluatorBlock')); }; b.v.prototype.makeTemplateSource = function (a, d) { if (typeof a === 'string') { d = d || y; const c = d.getElementById(a); c || j(Error(`Cannot find template with ID ${a}`)); return new b.l.h(c); } if (a.nodeType == 1 || a.nodeType == 8) return new b.l.O(a); j(Error(`Unknown template type: ${a}`)); }; b.v.prototype.renderTemplate = function (a, b, c, e) {
  a = this.makeTemplateSource(a, e);
  return this.renderTemplateSource(a, b, c);
}; b.v.prototype.isTemplateRewritten = function (a, b) { return this.allowTemplateRewriting === r ? m : this.makeTemplateSource(a, b).data('isRewritten'); }; b.v.prototype.rewriteTemplate = function (a, b, c) { a = this.makeTemplateSource(a, c); b = b(a.text()); a.text(b); a.data('isRewritten', m); }; b.b('templateEngine', b.v); let qa = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi,
  ra = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g; b.za = { vb(a,
    d, c) { d.isTemplateRewritten(a, c) || d.rewriteTemplate(a, a => b.za.Gb(a, d), c); },
    Gb(a, b) { return a.replace(qa, (a, e, f, g, h, k, l) => W(l, e, b)).replace(ra, (a, e) => W(e, '\x3c!-- ko --\x3e', b)); },
    kb(a) { return b.s.ra((d, c) => { d.nextSibling && b.Fa(d.nextSibling, a, c); }); } }; b.b('__tr_ambtns', b.za.kb); b.l = {}; b.l.h = function (a) { this.h = a; }; b.l.h.prototype.text = function () {
      var a = b.a.u(this.h),
        a = a === 'script' ? 'text' : a === 'textarea' ? 'value' : 'innerHTML'; if (arguments.length == 0) return this.h[a];
      const d = arguments[0]; a === 'innerHTML' ? b.a.ca(this.h, d) : this.h[a] = d;
    }; b.l.h.prototype.data = function (a) { if (arguments.length === 1) return b.a.f.get(this.h, `templateSourceData_${a}`); b.a.f.set(this.h, `templateSourceData_${a}`, arguments[1]); }; b.l.O = function (a) { this.h = a; }; b.l.O.prototype = new b.l.h(); b.l.O.prototype.text = function () { if (arguments.length == 0) { const a = b.a.f.get(this.h, '__ko_anon_template__') || {}; a.Aa === I && a.ia && (a.Aa = a.ia.innerHTML); return a.Aa; }b.a.f.set(this.h, '__ko_anon_template__', { Aa: arguments[0] }); }; b.l.h.prototype.nodes =
function () { if (arguments.length == 0) return (b.a.f.get(this.h, '__ko_anon_template__') || {}).ia; b.a.f.set(this.h, '__ko_anon_template__', { ia: arguments[0] }); }; b.b('templateSources', b.l); b.b('templateSources.domElement', b.l.h); b.b('templateSources.anonymousTemplate', b.l.O); let O; b.wa = function (a) { a != I && !(a instanceof b.v) && j(Error('templateEngine must inherit from ko.templateEngine')); O = a; }; b.va = function (a, d, c, e, f) {
  c = c || {}; (c.templateEngine || O) == I && j(Error('Set a template engine before calling renderTemplate'));
  f = f || 'replaceChildren'; if (e) {
    let g = N(e); return b.j(() => {
      var h = d && d instanceof b.z ? d : new b.z(b.a.d(d)),
        k = typeof a === 'function' ? a(h.$data, h) : a,
        h = T(e, f, k, h, c); f == 'replaceNode' && (e = h, g = N(e));
    }, p, { Ka() { return !g || !b.a.X(g); }, W: g && f == 'replaceNode' ? g.parentNode : g });
  } return b.s.ra((e) => { b.va(a, d, c, e, 'replaceNode'); });
}; b.Mb = function (a, d, c, e, f) {
  function g(a, b) { U(b, k); c.afterRender && c.afterRender(b, a); } function h(d, e) {
    k = f.createChildContext(b.a.d(d), c.as); k.$index = e; const g = typeof a === 'function' ?
a(d, k) : a; return T(p, 'ignoreTargetNode', g, k, c);
  } let k; return b.j(() => { let a = b.a.d(d) || []; typeof a.length === 'undefined' && (a = [a]); a = b.a.fa(a, a => c.includeDestroyed || a === I || a === p || !b.a.d(a._destroy)); b.r.K(b.a.$a, p, [e, a, h, c, g]); }, p, { W: e });
}; b.c.template = { init(a, d) { let c = b.a.d(d()); if (typeof c !== 'string' && !c.name && (a.nodeType == 1 || a.nodeType == 8))c = a.nodeType == 1 ? a.childNodes : b.e.childNodes(a), c = b.a.Hb(c), (new b.l.O(a)).nodes(c); return { controlsDescendantBindings: m }; },
  update(a,
    d, c, e, f) {
    d = b.a.d(d()); c = {}; e = m; let g,
      h = p; typeof d !== 'string' && (c = d, d = c.name, 'if' in c && (e = b.a.d(c.if)), e && 'ifnot' in c && (e = !b.a.d(c.ifnot)), g = b.a.d(c.data)); 'foreach' in c ? h = b.Mb(d || a, e && c.foreach || [], c, a, f) : e ? (f = 'data' in c ? f.createChildContext(g, c.as) : f, h = b.va(d || a, f, c, a)) : b.e.Y(a); f = h; (g = b.a.f.get(a, '__ko__templateComputedDomDataKey__')) && typeof g.B === 'function' && g.B(); b.a.f.set(a, '__ko__templateComputedDomDataKey__', f && f.pa() ? f : I);
  } }; b.g.Q.template = function (a) {
    a = b.g.aa(a); return a.length == 1 && a[0].unknown ||
b.g.Eb(a, 'name') ? p : 'This template engine does not support anonymous templates nested within its templates';
  }; b.e.I.template = m; b.b('setTemplateEngine', b.wa); b.b('renderTemplate', b.va); b.a.Ja = function (a, b, c) { a = a || []; b = b || []; return a.length <= b.length ? S(a, b, 'added', 'deleted', c) : S(b, a, 'deleted', 'added', c); }; b.b('utils.compareArrays', b.a.Ja); b.a.$a = function (a, d, c, e, f) {
    function g(a, b) { t = l[b]; w !== b && (z[a] = t); t.na(w++); M(t.M); s.push(t); A.push(t); } function h(a, c) {
      if (a) {
        for (var d = 0, e = c.length; d < e; d++) {
          c[d] && b.a.o(c[d].M,
(b) => { a(b, d, c[d].U); });
        }
      }
    }d = d || []; e = e || {}; var k = b.a.f.get(a, 'setDomNodeChildrenFromArrayMapping_lastMappingResult') === I,
      l = b.a.f.get(a, 'setDomNodeChildrenFromArrayMapping_lastMappingResult') || [],
      n = b.a.V(l, a => a.U),
      q = b.a.Ja(n, d),
      s = [],
      v = 0,
      w = 0,
      B = [],
      A = []; d = []; for (var z = [], n = [], t, D = 0, C, E; C = q[D]; D++) {
        switch (E = C.moved, C.status) {
        case 'deleted':E === I && (t = l[v], t.j && t.j.B(), B.push(...M(t.M)), e.beforeRemove && (d[D] = t, A.push(t))); v++; break; case 'retained':g(D, v++); break; case 'added':E !== I ?
g(D, E) : (t = { U: C.value, na: b.m(w++) }, s.push(t), A.push(t), k || (n[D] = t));
      }
      }h(e.beforeMove, z); b.a.o(B, e.beforeRemove ? b.A : b.removeNode); for (var D = 0, k = b.e.firstChild(a), H; t = A[D]; D++) { t.M || b.a.extend(t, ha(a, c, t.U, f, t.na)); for (v = 0; q = t.M[v]; k = q.nextSibling, H = q, v++)q !== k && b.e.Pa(a, q, H); !t.Ab && f && (f(t.U, t.M, t.na), t.Ab = m); }h(e.beforeRemove, d); h(e.afterMove, z); h(e.afterAdd, n); b.a.f.set(a, 'setDomNodeChildrenFromArrayMapping_lastMappingResult', s);
  }; b.b('utils.setDomNodeChildrenFromArrayMapping', b.a.$a); b.C = function () {
    this.allowTemplateRewriting =
r;
  }; b.C.prototype = new b.v(); b.C.prototype.renderTemplateSource = function (a) { const d = !(b.a.Z < 9) && a.nodes ? a.nodes() : p; if (d) return b.a.L(d.cloneNode(m).childNodes); a = a.text(); return b.a.ta(a); }; b.C.oa = new b.C(); b.wa(b.C.oa); b.b('nativeTemplateEngine', b.C); b.qa = function () {
    const a = this.Db = (function () { if (typeof F === 'undefined' || !F.tmpl) return 0; try { if (F.tmpl.tag.tmpl.open.toString().indexOf('__') >= 0) return 2; } catch (a) {} return 1; }()); this.renderTemplateSource = function (b, c, e) {
      e = e || {}; a < 2 && j(Error('Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.'));
      let f = b.data('precompiled'); f || (f = b.text() || '', f = F.template(p, `{{ko_with $item.koBindingContext}}${f}{{/ko_with}}`), b.data('precompiled', f)); b = [c.$data]; c = F.extend({ koBindingContext: c }, e.templateOptions); c = F.tmpl(f, b, c); c.appendTo(y.createElement('div')); F.fragments = {}; return c;
    }; this.createJavaScriptEvaluatorBlock = function (a) { return `{{ko_code ((function() { return ${a} })()) }}`; }; this.addTemplate = function (a, b) { y.write(`<script type='text/html' id='${a}'>${b}\x3c/script>`); }; a > 0 && (F.tmpl.tag.ko_code =
{ open: "__.push($1 || '');" }, F.tmpl.tag.ko_with = { open: 'with($1) {', close: '} ' });
  }; b.qa.prototype = new b.v(); w = new b.qa(); w.Db > 0 && b.wa(w); b.b('jqueryTmplTemplateEngine', b.qa);
  } typeof require === 'function' && typeof exports === 'object' && typeof module === 'object' ? L(module.exports || exports) : typeof define === 'function' && define.amd ? define(['exports'], L) : L(x.ko = {}); m;
}());
