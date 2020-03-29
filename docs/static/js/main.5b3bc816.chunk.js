(this['webpackJsonpresizable-assesment'] =
  this['webpackJsonpresizable-assesment'] || []).push([
  [0],
  {
    14: function (e, n, t) {
      e.exports = t(22);
    },
    19: function (e, n, t) {},
    22: function (e, n, t) {
      'use strict';
      t.r(n);
      var r = t(0),
        i = t.n(r),
        o = t(7),
        a = t.n(o),
        c = (t(19), t(1)),
        u = t(2),
        l = t(5),
        d = t(8),
        s = t(9),
        f = t.n(s),
        m = function (e) {
          return 'row' === e ? 'width' : 'height';
        };
      function v() {
        var e = Object(c.a)(['\n  height: 100%;\n  width: 100%;\n\n  ', ';\n']);
        return (
          (v = function () {
            return e;
          }),
          e
        );
      }
      function b() {
        var e = Object(c.a)([
          "\n  content: 'tableton';\n  height: 1px;\n\n  ",
          ':hover & {\n    border-top: 2px dashed #a9418b;\n  }\n',
        ]);
        return (
          (b = function () {
            return e;
          }),
          e
        );
      }
      function h() {
        var e = Object(c.a)([
          '\n  width: 1px;\n\n  ',
          ':hover & {\n    border-left: 2px dashed #a9418b;\n  }\n',
        ]);
        return (
          (h = function () {
            return e;
          }),
          e
        );
      }
      function p() {
        var e = Object(c.a)([
          '\n  position: absolute;\n  z-index: 1000;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n\n  ',
          ';\n',
        ]);
        return (
          (p = function () {
            return e;
          }),
          e
        );
      }
      function g() {
        var e = Object(c.a)([
          '\n  cursor: row-resize;\n  height: ',
          ';\n  top: calc(',
          ' / 2 * -1);\n  flex-direction: column;\n',
        ]);
        return (
          (g = function () {
            return e;
          }),
          e
        );
      }
      function x() {
        var e = Object(c.a)([
          '\n  cursor: col-resize;\n  width: ',
          ';\n  left: calc(',
          ' / 2 * -1);\n  flex-direction: row;\n',
        ]);
        return (
          (x = function () {
            return e;
          }),
          e
        );
      }
      function w() {
        var e = Object(c.a)([
          '\n  position: relative;\n  overflow: visible;\n  width: 100%;\n  height: 100%;\n  ',
          ': 0;\n',
        ]);
        return (
          (w = function () {
            return e;
          }),
          e
        );
      }
      var E = u.b.div(w(), function (e) {
          var n = e.direction;
          return m(n);
        }),
        z = Object(u.a)(x(), '10px', '10px'),
        O = Object(u.a)(g(), '10px', '10px'),
        j = u.b.div(p(), function (e) {
          return 'column' === e.direction ? O : z;
        }),
        C = Object(u.a)(h(), j),
        S = Object(u.a)(b(), j),
        y = u.b.div(v(), function (e) {
          return 'column' === e.direction ? S : C;
        }),
        k = function (e) {
          var n = e.index,
            t = e.onMouseDown,
            r = e.direction,
            o = e.BarComponent,
            a = i.a.useCallback(
              function (e) {
                t(e, n);
              },
              [t, n]
            ),
            c = void 0 !== o ? o : y;
          return i.a.createElement(
            E,
            { direction: r, onMouseDown: a },
            i.a.createElement(
              j,
              { direction: r },
              i.a.createElement(c, { direction: r })
            )
          );
        },
        B = function (e, n, t, r) {
          var i = e.box[t] - r,
            o = n.box[t] + r;
          (e.minSize && e.minSize > i) ||
            (n.minSize && n.minSize > o) ||
            ((e.node.style[t] = ''.concat(i, 'px')),
            (n.node.style[t] = ''.concat(o, 'px')));
        };
      function D() {
        var e = Object(c.a)([
          '\n  position: relative;\n  display: flex;\n  flex-direction: ',
          ';\n  width: 100%;\n  height: 100%;\n',
        ]);
        return (
          (D = function () {
            return e;
          }),
          e
        );
      }
      var M = function (e, n) {
          var t = e.reduce(function (e, n) {
            return e + n;
          }, 0);
          return e.map(function (e) {
            return (1 / t) * e * n;
          });
        },
        N = u.b.div(D(), function (e) {
          return e.direction;
        }),
        R = function (e) {
          var n = e.direction,
            t = void 0 === n ? 'row' : n,
            r = e.children,
            o = e.className,
            a = e.id,
            c = e.GutterComponent,
            u = f()(),
            s = Object(l.a)(u, 2),
            v = s[0],
            b = s[1],
            h = i.a.useState([]),
            p = Object(l.a)(h, 2),
            g = p[0],
            x = p[1],
            w = i.a.useRef({ length: 0, size: null }),
            E = b[m(t)];
          i.a.useEffect(
            function () {
              var e = w.current,
                n = i.a.Children.count(r);
              (w.current = { length: n, size: E }),
                (function (e, n, t, r, o) {
                  var a = !1,
                    c = !1,
                    u = i.a.Children.count(t);
                  if (
                    (e.size !== n && ((a = !0), (c = !e.size)),
                    e.length !== u && ((c = !0), (a = !0)),
                    a)
                  ) {
                    var l = null;
                    if (c) {
                      var d = n / i.a.Children.count(t);
                      l = i.a.Children.map(t, function () {
                        return d;
                      });
                    } else l = M(r, n);
                    l && JSON.stringify(l) !== JSON.stringify(r) && o(l);
                  }
                })(e, E, r, g, x);
            },
            [a, E, r, g, x]
          );
          var z = (function (e, n) {
              var t = i.a.useRef(null),
                r = i.a.useCallback(
                  function (n) {
                    n.preventDefault();
                    var r = t.current;
                    if (r) {
                      var i = n.screenX,
                        o = n.screenY,
                        a = r.before,
                        c = r.after;
                      if ('row' === e) {
                        var u = r.x - i;
                        B(a, c, 'width', u);
                      } else {
                        var l = r.y - o;
                        B(a, c, 'height', l);
                      }
                    }
                  },
                  [e]
                ),
                o = i.a.useCallback(
                  function (e) {
                    var r = t.current;
                    if (r) {
                      t.current = null;
                      var i = r.index,
                        o = r.after,
                        a = r.before.node.getBoundingClientRect(),
                        c = o.node.getBoundingClientRect();
                      n({ beforeBox: a, afterBox: c, index: i });
                    }
                  },
                  [n]
                ),
                a = i.a.useCallback(function (e, n) {
                  var r = (function (e) {
                      if (e) {
                        var n = e.nextElementSibling,
                          t = e.previousElementSibling;
                        if (n && t) return { after: n, before: t };
                      }
                      return {};
                    })(e.currentTarget),
                    i = r.before,
                    o = r.after;
                  if (i && o) {
                    var a = i.getBoundingClientRect(),
                      c = o.getBoundingClientRect();
                    t.current = {
                      x: e.screenX,
                      y: e.screenY,
                      before: {
                        box: a,
                        node: i,
                        minSize: Number(i.getAttribute('data-min-size')) || 50,
                      },
                      after: {
                        box: c,
                        node: o,
                        minSize: Number(o.getAttribute('data-min-size')) || 50,
                      },
                      index: n,
                    };
                  }
                }, []);
              return (
                i.a.useEffect(
                  function () {
                    return (
                      document.addEventListener('mousemove', r, !1),
                      document.addEventListener('mouseup', o, !1),
                      function () {
                        document.removeEventListener('mousemove', r, !1),
                          document.removeEventListener('mouseup', o, !1);
                      }
                    );
                  },
                  [r, o]
                ),
                { onMouseDown: a }
              );
            })(
              t,
              (function (e, n, t) {
                var r = m(e);
                return i.a.useCallback(
                  function (e) {
                    var i = e.beforeBox,
                      o = e.afterBox,
                      a = e.index;
                    (n[a - 1] = i[r]), (n[a] = o[r]), t(n);
                  },
                  [r, n, t]
                );
              })(t, g, x)
            ).onMouseDown,
            O = (function (e, n, t, r, o) {
              var a = m(e);
              return i.a.Children.map(n, function (n, c) {
                var u = t[c] || 0,
                  l = { 'data-min-size': void 0 };
                if (i.a.isValidElement(n)) {
                  var s = n.props;
                  s && 'minSize' in s && (l['data-min-size'] = s.minSize);
                }
                return i.a.createElement(
                  i.a.Fragment,
                  { key: c },
                  0 !== c
                    ? i.a.createElement(k, {
                        direction: e,
                        index: c,
                        onMouseDown: r,
                        BarComponent: o,
                      })
                    : null,
                  i.a.createElement(
                    'div',
                    Object.assign({ style: Object(d.a)({}, a, u) }, l),
                    n
                  )
                );
              });
            })(t, r, g, z, c);
          return i.a.createElement(N, { direction: t, className: o }, v, O);
        };
      function q() {
        var e = Object(c.a)([
          '\n  height: 100%;\n  width: 100%;\n  background-color: #c6c6c6;\n',
        ]);
        return (
          (q = function () {
            return e;
          }),
          e
        );
      }
      function L() {
        var e = Object(c.a)(['\n  width: 100vw;\n  height: 100vh;\n']);
        return (
          (L = function () {
            return e;
          }),
          e
        );
      }
      function J() {
        var e = Object(c.a)([
          '\n  background-color: ',
          ';\n  width: 100%;\n  height: 100%;\n  padding: 5px;\n',
        ]);
        return (
          (J = function () {
            return e;
          }),
          e
        );
      }
      var A = u.b.div(J(), function (e) {
          return e.color ? e.color : 'white';
        }),
        G = Object(u.b)(R)(L()),
        W = u.b.div(q());
      var X = function () {
        return i.a.createElement(
          G,
          null,
          i.a.createElement(A, { minSize: 100, color: '#f6d186' }),
          i.a.createElement(
            R,
            { direction: 'column' },
            i.a.createElement(
              A,
              { color: '#fcf7bb' },
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            ),
            i.a.createElement(
              R,
              { id: 'something', GutterComponent: W },
              i.a.createElement(A, { color: '#4baea0' }),
              i.a.createElement(A, { color: '#b6e6bd' }),
              i.a.createElement(A, { color: '#f1f0cf' })
            )
          ),
          i.a.createElement(A, { color: '#f19292' })
        );
      };
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      a.a.render(
        i.a.createElement(i.a.StrictMode, null, i.a.createElement(X, null)),
        document.getElementById('root')
      ),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
  },
  [[14, 1, 2]],
]);
//# sourceMappingURL=main.5b3bc816.chunk.js.map
