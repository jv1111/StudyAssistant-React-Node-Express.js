var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, t) => () => (
    t || (e((t = { exports: {} }).exports, t), (e = null)),
    t.exports
  ),
  s = (e, n) => {
    let r = {};
    for (var i in e) t(r, i, { get: e[i], enumerable: !0 });
    return (n || t(r, Symbol.toStringTag, { value: `Module` }), r);
  },
  c = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
        ((d = c[l]),
          !a.call(e, d) &&
            d !== o &&
            t(e, d, {
              get: ((e) => i[e]).bind(null, d),
              enumerable: !(s = n(i, d)) || s.enumerable,
            }));
    return e;
  },
  l = (n, r, o) => (
    (o = n == null ? {} : e(i(n))),
    c(
      r || !n || !n.__esModule || !a.call(n, `default`)
        ? t(o, `default`, { value: n, enumerable: !0 })
        : o,
      n,
    )
  );
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      (t.credentials =
        e.crossOrigin === `use-credentials`
          ? `include`
          : e.crossOrigin === `anonymous`
            ? `omit`
            : `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var u = o((e) => {
    var t = Symbol.for(`react.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.provider`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.iterator;
    function p(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (f && e[f]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var m = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      h = Object.assign,
      g = {};
    function _(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m));
    }
    ((_.prototype.isReactComponent = {}),
      (_.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `setState(...): takes an object of state variables to update or a function which returns an object of state variables.`,
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (_.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }));
    function v() {}
    v.prototype = _.prototype;
    function y(e, t, n) {
      ((this.props = e),
        (this.context = t),
        (this.refs = g),
        (this.updater = n || m));
    }
    var b = (y.prototype = new v());
    ((b.constructor = y), h(b, _.prototype), (b.isPureReactComponent = !0));
    var x = Array.isArray,
      S = Object.prototype.hasOwnProperty,
      C = { current: null },
      w = { key: !0, ref: !0, __self: !0, __source: !0 };
    function T(e, n, r) {
      var i,
        a = {},
        o = null,
        s = null;
      if (n != null)
        for (i in (n.ref !== void 0 && (s = n.ref),
        n.key !== void 0 && (o = `` + n.key),
        n))
          S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
      var c = arguments.length - 2;
      if (c === 1) a.children = r;
      else if (1 < c) {
        for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
        a.children = l;
      }
      if (e && e.defaultProps)
        for (i in ((c = e.defaultProps), c)) a[i] === void 0 && (a[i] = c[i]);
      return {
        $$typeof: t,
        type: e,
        key: o,
        ref: s,
        props: a,
        _owner: C.current,
      };
    }
    function E(e, n) {
      return {
        $$typeof: t,
        type: e.type,
        key: n,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function D(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    function O(e) {
      var t = { "=": `=0`, ":": `=2` };
      return (
        `$` +
        e.replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    var k = /\/+/g;
    function A(e, t) {
      return typeof e == `object` && e && e.key != null
        ? O(`` + e.key)
        : t.toString(36);
    }
    function j(e, r, i, a, o) {
      var s = typeof e;
      (s === `undefined` || s === `boolean`) && (e = null);
      var c = !1;
      if (e === null) c = !0;
      else
        switch (s) {
          case `string`:
          case `number`:
            c = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                c = !0;
            }
        }
      if (c)
        return (
          (c = e),
          (o = o(c)),
          (e = a === `` ? `.` + A(c, 0) : a),
          x(o)
            ? ((i = ``),
              e != null && (i = e.replace(k, `$&/`) + `/`),
              j(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (D(o) &&
                (o = E(
                  o,
                  i +
                    (!o.key || (c && c.key === o.key)
                      ? ``
                      : (`` + o.key).replace(k, `$&/`) + `/`) +
                    e,
                )),
              r.push(o)),
          1
        );
      if (((c = 0), (a = a === `` ? `.` : a + `:`), x(e)))
        for (var l = 0; l < e.length; l++) {
          s = e[l];
          var u = a + A(s, l);
          c += j(s, r, i, u, o);
        }
      else if (((u = p(e)), typeof u == `function`))
        for (e = u.call(e), l = 0; !(s = e.next()).done;)
          ((s = s.value), (u = a + A(s, l++)), (c += j(s, r, i, u, o)));
      else if (s === `object`)
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`,
          )
        );
      return c;
    }
    function M(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        j(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function N(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (t) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = t));
            },
            function (t) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = t));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var P = { current: null },
      F = { transition: null },
      ee = {
        ReactCurrentDispatcher: P,
        ReactCurrentBatchConfig: F,
        ReactCurrentOwner: C,
      };
    function te() {
      throw Error(`act(...) is not supported in production builds of React.`);
    }
    ((e.Children = {
      map: M,
      forEach: function (e, t, n) {
        M(
          e,
          function () {
            t.apply(this, arguments);
          },
          n,
        );
      },
      count: function (e) {
        var t = 0;
        return (
          M(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          M(e, function (e) {
            return e;
          }) || []
        );
      },
      only: function (e) {
        if (!D(e))
          throw Error(
            `React.Children.only expected to receive a single React element child.`,
          );
        return e;
      },
    }),
      (e.Component = _),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = y),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ee),
      (e.act = te),
      (e.cloneElement = function (e, n, r) {
        if (e == null)
          throw Error(
            `React.cloneElement(...): The argument must be a React element, but you passed ` +
              e +
              `.`,
          );
        var i = h({}, e.props),
          a = e.key,
          o = e.ref,
          s = e._owner;
        if (n != null) {
          if (
            (n.ref !== void 0 && ((o = n.ref), (s = C.current)),
            n.key !== void 0 && (a = `` + n.key),
            e.type && e.type.defaultProps)
          )
            var c = e.type.defaultProps;
          for (l in n)
            S.call(n, l) &&
              !w.hasOwnProperty(l) &&
              (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
        }
        var l = arguments.length - 2;
        if (l === 1) i.children = r;
        else if (1 < l) {
          c = Array(l);
          for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
          i.children = c;
        }
        return {
          $$typeof: t,
          type: e.type,
          key: a,
          ref: o,
          props: i,
          _owner: s,
        };
      }),
      (e.createContext = function (e) {
        return (
          (e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
          }),
          (e.Provider = { $$typeof: o, _context: e }),
          (e.Consumer = e)
        );
      }),
      (e.createElement = T),
      (e.createFactory = function (e) {
        var t = T.bind(null, e);
        return ((t.type = e), t);
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: c, render: e };
      }),
      (e.isValidElement = D),
      (e.lazy = function (e) {
        return { $$typeof: d, _payload: { _status: -1, _result: e }, _init: N };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = F.transition;
        F.transition = {};
        try {
          e();
        } finally {
          F.transition = t;
        }
      }),
      (e.unstable_act = te),
      (e.useCallback = function (e, t) {
        return P.current.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return P.current.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e) {
        return P.current.useDeferredValue(e);
      }),
      (e.useEffect = function (e, t) {
        return P.current.useEffect(e, t);
      }),
      (e.useId = function () {
        return P.current.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return P.current.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return P.current.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return P.current.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return P.current.useMemo(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return P.current.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return P.current.useRef(e);
      }),
      (e.useState = function (e) {
        return P.current.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return P.current.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return P.current.useTransition();
      }),
      (e.version = `18.3.1`));
  }),
  d = o((e, t) => {
    t.exports = u();
  }),
  f = l(d()),
  p = o((e) => {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      a: for (; 0 < n;) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
        else break a;
      }
    }
    function n(e) {
      return e.length === 0 ? null : e[0];
    }
    function r(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
          var s = 2 * (r + 1) - 1,
            c = e[s],
            l = s + 1,
            u = e[l];
          if (0 > i(c, n))
            l < a && 0 > i(u, c)
              ? ((e[r] = u), (e[l] = n), (r = l))
              : ((e[r] = c), (e[s] = n), (r = s));
          else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
          else break a;
        }
      }
      return t;
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n === 0 ? e.id - t.id : n;
    }
    if (
      typeof performance == `object` &&
      typeof performance.now == `function`
    ) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var c = [],
      l = [],
      u = 1,
      d = null,
      f = 3,
      p = !1,
      m = !1,
      h = !1,
      g = typeof setTimeout == `function` ? setTimeout : null,
      _ = typeof clearTimeout == `function` ? clearTimeout : null,
      v = typeof setImmediate < `u` ? setImmediate : null;
    typeof navigator < `u` &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function y(e) {
      for (var i = n(l); i !== null;) {
        if (i.callback === null) r(l);
        else if (i.startTime <= e)
          (r(l), (i.sortIndex = i.expirationTime), t(c, i));
        else break;
        i = n(l);
      }
    }
    function b(e) {
      if (((h = !1), y(e), !m)) {
        if (n(c) !== null) ((m = !0), M(x));
        else {
          var t = n(l);
          t !== null && N(b, t.startTime - e);
        }
      }
    }
    function x(t, i) {
      ((m = !1), h && ((h = !1), _(w), (w = -1)), (p = !0));
      var a = f;
      try {
        for (
          y(i), d = n(c);
          d !== null && (!(d.expirationTime > i) || (t && !D()));
        ) {
          var o = d.callback;
          if (typeof o == `function`) {
            ((d.callback = null), (f = d.priorityLevel));
            var s = o(d.expirationTime <= i);
            ((i = e.unstable_now()),
              typeof s == `function` ? (d.callback = s) : d === n(c) && r(c),
              y(i));
          } else r(c);
          d = n(c);
        }
        if (d !== null) var u = !0;
        else {
          var g = n(l);
          (g !== null && N(b, g.startTime - i), (u = !1));
        }
        return u;
      } finally {
        ((d = null), (f = a), (p = !1));
      }
    }
    var S = !1,
      C = null,
      w = -1,
      T = 5,
      E = -1;
    function D() {
      return !(e.unstable_now() - E < T);
    }
    function O() {
      if (C !== null) {
        var t = e.unstable_now();
        E = t;
        var n = !0;
        try {
          n = C(!0, t);
        } finally {
          n ? k() : ((S = !1), (C = null));
        }
      } else S = !1;
    }
    var k;
    if (typeof v == `function`)
      k = function () {
        v(O);
      };
    else if (typeof MessageChannel < `u`) {
      var A = new MessageChannel(),
        j = A.port2;
      ((A.port1.onmessage = O),
        (k = function () {
          j.postMessage(null);
        }));
    } else
      k = function () {
        g(O, 0);
      };
    function M(e) {
      ((C = e), S || ((S = !0), k()));
    }
    function N(t, n) {
      w = g(function () {
        t(e.unstable_now());
      }, n);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        m || p || ((m = !0), M(x));
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
            )
          : (T = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(c);
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = f;
        }
        var n = f;
        f = t;
        try {
          return e();
        } finally {
          f = n;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = f;
        f = e;
        try {
          return t();
        } finally {
          f = n;
        }
      }),
      (e.unstable_scheduleCallback = function (r, i, a) {
        var o = e.unstable_now();
        switch (
          (typeof a == `object` && a
            ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
            : (a = o),
          r)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 1073741823;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (s = a + s),
          (r = {
            id: u++,
            callback: i,
            priorityLevel: r,
            startTime: a,
            expirationTime: s,
            sortIndex: -1,
          }),
          a > o
            ? ((r.sortIndex = a),
              t(l, r),
              n(c) === null &&
                r === n(l) &&
                (h ? (_(w), (w = -1)) : (h = !0), N(b, a - o)))
            : ((r.sortIndex = s), t(c, r), m || p || ((m = !0), M(x))),
          r
        );
      }),
      (e.unstable_shouldYield = D),
      (e.unstable_wrapCallback = function (e) {
        var t = f;
        return function () {
          var n = f;
          f = t;
          try {
            return e.apply(this, arguments);
          } finally {
            f = n;
          }
        };
      }));
  }),
  m = o((e, t) => {
    t.exports = p();
  }),
  h = o((e) => {
    var t = d(),
      n = m();
    function r(e) {
      for (
        var t = `https://reactjs.org/docs/error-decoder.html?invariant=` + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += `&args[]=` + encodeURIComponent(arguments[n]);
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    var i = new Set(),
      a = {};
    function o(e, t) {
      (s(e, t), s(e + `Capture`, t));
    }
    function s(e, t) {
      for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
    }
    var c = !(
        typeof window > `u` ||
        window.document === void 0 ||
        window.document.createElement === void 0
      ),
      l = Object.prototype.hasOwnProperty,
      u =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      f = {},
      p = {};
    function h(e) {
      return l.call(p, e)
        ? !0
        : l.call(f, e)
          ? !1
          : u.test(e)
            ? (p[e] = !0)
            : ((f[e] = !0), !1);
    }
    function g(e, t, n, r) {
      if (n !== null && n.type === 0) return !1;
      switch (typeof t) {
        case `function`:
        case `symbol`:
          return !0;
        case `boolean`:
          return r
            ? !1
            : n === null
              ? ((e = e.toLowerCase().slice(0, 5)),
                e !== `data-` && e !== `aria-`)
              : !n.acceptsBooleans;
        default:
          return !1;
      }
    }
    function _(e, t, n, r) {
      if (t == null || g(e, t, n, r)) return !0;
      if (r) return !1;
      if (n !== null)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return !1 === t;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function v(e, t, n, r, i, a, o) {
      ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = a),
        (this.removeEmptyString = o));
    }
    var y = {};
    (`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`
      .split(` `)
      .forEach(function (e) {
        y[e] = new v(e, 0, !1, e, null, !1, !1);
      }),
      [
        [`acceptCharset`, `accept-charset`],
        [`className`, `class`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
      ].forEach(function (e) {
        var t = e[0];
        y[t] = new v(t, 1, !1, e[1], null, !1, !1);
      }),
      [`contentEditable`, `draggable`, `spellCheck`, `value`].forEach(
        function (e) {
          y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
        },
      ),
      [
        `autoReverse`,
        `externalResourcesRequired`,
        `focusable`,
        `preserveAlpha`,
      ].forEach(function (e) {
        y[e] = new v(e, 2, !1, e, null, !1, !1);
      }),
      `allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`
        .split(` `)
        .forEach(function (e) {
          y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
        }),
      [`checked`, `multiple`, `muted`, `selected`].forEach(function (e) {
        y[e] = new v(e, 3, !0, e, null, !1, !1);
      }),
      [`capture`, `download`].forEach(function (e) {
        y[e] = new v(e, 4, !1, e, null, !1, !1);
      }),
      [`cols`, `rows`, `size`, `span`].forEach(function (e) {
        y[e] = new v(e, 6, !1, e, null, !1, !1);
      }),
      [`rowSpan`, `start`].forEach(function (e) {
        y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
      }));
    var b = /[\-:]([a-z])/g;
    function x(e) {
      return e[1].toUpperCase();
    }
    (`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`
      .split(` `)
      .forEach(function (e) {
        var t = e.replace(b, x);
        y[t] = new v(t, 1, !1, e, null, !1, !1);
      }),
      `xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`
        .split(` `)
        .forEach(function (e) {
          var t = e.replace(b, x);
          y[t] = new v(t, 1, !1, e, `http://www.w3.org/1999/xlink`, !1, !1);
        }),
      [`xml:base`, `xml:lang`, `xml:space`].forEach(function (e) {
        var t = e.replace(b, x);
        y[t] = new v(
          t,
          1,
          !1,
          e,
          `http://www.w3.org/XML/1998/namespace`,
          !1,
          !1,
        );
      }),
      [`tabIndex`, `crossOrigin`].forEach(function (e) {
        y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
      }),
      (y.xlinkHref = new v(
        `xlinkHref`,
        1,
        !1,
        `xlink:href`,
        `http://www.w3.org/1999/xlink`,
        !0,
        !1,
      )),
      [`src`, `href`, `action`, `formAction`].forEach(function (e) {
        y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
      }));
    function S(e, t, n, r) {
      var i = y.hasOwnProperty(t) ? y[t] : null;
      (i === null
        ? r ||
          !(2 < t.length) ||
          (t[0] !== `o` && t[0] !== `O`) ||
          (t[1] !== `n` && t[1] !== `N`)
        : i.type !== 0) &&
        (_(t, n, i, r) && (n = null),
        r || i === null
          ? h(t) &&
            (n === null ? e.removeAttribute(t) : e.setAttribute(t, `` + n))
          : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? i.type !== 3 && `` : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                ? e.removeAttribute(t)
                : ((i = i.type),
                  (n = i === 3 || (i === 4 && !0 === n) ? `` : `` + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      w = Symbol.for(`react.element`),
      T = Symbol.for(`react.portal`),
      E = Symbol.for(`react.fragment`),
      D = Symbol.for(`react.strict_mode`),
      O = Symbol.for(`react.profiler`),
      k = Symbol.for(`react.provider`),
      A = Symbol.for(`react.context`),
      j = Symbol.for(`react.forward_ref`),
      M = Symbol.for(`react.suspense`),
      N = Symbol.for(`react.suspense_list`),
      P = Symbol.for(`react.memo`),
      F = Symbol.for(`react.lazy`),
      ee = Symbol.for(`react.offscreen`),
      te = Symbol.iterator;
    function I(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (te && e[te]) || e[`@@iterator`]),
          typeof e == `function` ? e : null);
    }
    var L = Object.assign,
      R;
    function z(e) {
      if (R === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          R = (t && t[1]) || ``;
        }
      return (
        `
` +
        R +
        e
      );
    }
    var ne = !1;
    function re(e, t) {
      if (!e || ne) return ``;
      ne = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t) {
          if (
            ((t = function () {
              throw Error();
            }),
            Object.defineProperty(t.prototype, "props", {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == `object` && Reflect.construct)
          ) {
            try {
              Reflect.construct(t, []);
            } catch (e) {
              var r = e;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (e) {
              r = e;
            }
            e.call(t.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (e) {
            r = e;
          }
          e();
        }
      } catch (t) {
        if (t && r && typeof t.stack == `string`) {
          for (
            var i = t.stack.split(`
`),
              a = r.stack.split(`
`),
              o = i.length - 1,
              s = a.length - 1;
            1 <= o && 0 <= s && i[o] !== a[s];
          )
            s--;
          for (; 1 <= o && 0 <= s; o--, s--)
            if (i[o] !== a[s]) {
              if (o !== 1 || s !== 1)
                do
                  if ((o--, s--, 0 > s || i[o] !== a[s])) {
                    var c =
                      `
` + i[o].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        c.includes(`<anonymous>`) &&
                        (c = c.replace(`<anonymous>`, e.displayName)),
                      c
                    );
                  }
                while (1 <= o && 0 <= s);
              break;
            }
        }
      } finally {
        ((ne = !1), (Error.prepareStackTrace = n));
      }
      return (e = e ? e.displayName || e.name : ``) ? z(e) : ``;
    }
    function ie(e) {
      switch (e.tag) {
        case 5:
          return z(e.type);
        case 16:
          return z(`Lazy`);
        case 13:
          return z(`Suspense`);
        case 19:
          return z(`SuspenseList`);
        case 0:
        case 2:
        case 15:
          return ((e = re(e.type, !1)), e);
        case 11:
          return ((e = re(e.type.render, !1)), e);
        case 1:
          return ((e = re(e.type, !0)), e);
        default:
          return ``;
      }
    }
    function ae(e) {
      if (e == null) return null;
      if (typeof e == `function`) return e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case E:
          return `Fragment`;
        case T:
          return `Portal`;
        case O:
          return `Profiler`;
        case D:
          return `StrictMode`;
        case M:
          return `Suspense`;
        case N:
          return `SuspenseList`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case A:
            return (e.displayName || `Context`) + `.Consumer`;
          case k:
            return (e._context.displayName || `Context`) + `.Provider`;
          case j:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case P:
            return (
              (t = e.displayName || null),
              t === null ? ae(e.type) || `Memo` : t
            );
          case F:
            ((t = e._payload), (e = e._init));
            try {
              return ae(e(t));
            } catch {}
        }
      return null;
    }
    function oe(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return `Cache`;
        case 9:
          return (t.displayName || `Context`) + `.Consumer`;
        case 10:
          return (t._context.displayName || `Context`) + `.Provider`;
        case 18:
          return `DehydratedFragment`;
        case 11:
          return (
            (e = t.render),
            (e = e.displayName || e.name || ``),
            t.displayName || (e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)
          );
        case 7:
          return `Fragment`;
        case 5:
          return t;
        case 4:
          return `Portal`;
        case 3:
          return `Root`;
        case 6:
          return `Text`;
        case 16:
          return ae(t);
        case 8:
          return t === D ? `StrictMode` : `Mode`;
        case 22:
          return `Offscreen`;
        case 12:
          return `Profiler`;
        case 21:
          return `Scope`;
        case 13:
          return `Suspense`;
        case 19:
          return `SuspenseList`;
        case 25:
          return `TracingMarker`;
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == `function`) return t.displayName || t.name || null;
          if (typeof t == `string`) return t;
      }
      return null;
    }
    function se(e) {
      switch (typeof e) {
        case `boolean`:
        case `number`:
        case `string`:
        case `undefined`:
          return e;
        case `object`:
          return e;
        default:
          return ``;
      }
    }
    function B(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === `input` &&
        (t === `checkbox` || t === `radio`)
      );
    }
    function ce(e) {
      var t = B(e) ? `checked` : `value`,
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = `` + e[t];
      if (
        !e.hasOwnProperty(t) &&
        n !== void 0 &&
        typeof n.get == `function` &&
        typeof n.set == `function`
      ) {
        var i = n.get,
          a = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              ((r = `` + e), a.call(this, e));
            },
          }),
          Object.defineProperty(e, t, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (e) {
              r = `` + e;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function le(e) {
      e._valueTracker ||= ce(e);
    }
    function ue(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = ``;
      return (
        e && (r = B(e) ? (e.checked ? `true` : `false`) : e.value),
        (e = r),
        e !== n && (t.setValue(e), !0)
      );
    }
    function de(e) {
      if (((e ||= typeof document < `u` ? document : void 0), e === void 0))
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function fe(e, t) {
      var n = t.checked;
      return L({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function pe(e, t) {
      var n = t.defaultValue == null ? `` : t.defaultValue,
        r = t.checked == null ? t.defaultChecked : t.checked;
      ((n = se(t.value == null ? n : t.value)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            t.type === `checkbox` || t.type === `radio`
              ? t.checked != null
              : t.value != null,
        }));
    }
    function me(e, t) {
      ((t = t.checked), t != null && S(e, `checked`, t, !1));
    }
    function he(e, t) {
      me(e, t);
      var n = se(t.value),
        r = t.type;
      if (n != null)
        r === `number`
          ? ((n === 0 && e.value === ``) || e.value != n) && (e.value = `` + n)
          : e.value !== `` + n && (e.value = `` + n);
      else if (r === `submit` || r === `reset`) {
        e.removeAttribute(`value`);
        return;
      }
      (t.hasOwnProperty(`value`)
        ? _e(e, t.type, n)
        : t.hasOwnProperty(`defaultValue`) && _e(e, t.type, se(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked));
    }
    function ge(e, t, n) {
      if (t.hasOwnProperty(`value`) || t.hasOwnProperty(`defaultValue`)) {
        var r = t.type;
        if (!(
          (r !== `submit` && r !== `reset`) ||
          (t.value !== void 0 && t.value !== null)
        ))
          return;
        ((t = `` + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((n = e.name),
        n !== `` && (e.name = ``),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== `` && (e.name = n));
    }
    function _e(e, t, n) {
      (t !== `number` || de(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = `` + e._wrapperState.initialValue)
          : e.defaultValue !== `` + n && (e.defaultValue = `` + n));
    }
    var ve = Array.isArray;
    function ye(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty(`$` + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0));
      } else {
        for (n = `` + se(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function be(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
      return L({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: `` + e._wrapperState.initialValue,
      });
    }
    function V(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(r(92));
          if (ve(n)) {
            if (1 < n.length) throw Error(r(93));
            n = n[0];
          }
          t = n;
        }
        ((t ??= ``), (n = t));
      }
      e._wrapperState = { initialValue: se(n) };
    }
    function xe(e, t) {
      var n = se(t.value),
        r = se(t.defaultValue);
      (n != null &&
        ((n = `` + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = `` + r));
    }
    function Se(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== `` &&
        t !== null &&
        (e.value = t);
    }
    function Ce(e) {
      switch (e) {
        case `svg`:
          return `http://www.w3.org/2000/svg`;
        case `math`:
          return `http://www.w3.org/1998/Math/MathML`;
        default:
          return `http://www.w3.org/1999/xhtml`;
      }
    }
    function we(e, t) {
      return e == null || e === `http://www.w3.org/1999/xhtml`
        ? Ce(t)
        : e === `http://www.w3.org/2000/svg` && t === `foreignObject`
          ? `http://www.w3.org/1999/xhtml`
          : e;
    }
    var Te,
      Ee = (function (e) {
        return typeof MSApp < `u` && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, i);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== `http://www.w3.org/2000/svg` || `innerHTML` in e)
          e.innerHTML = t;
        else {
          for (
            Te ||= document.createElement(`div`),
              Te.innerHTML = `<svg>` + t.valueOf().toString() + `</svg>`,
              t = Te.firstChild;
            e.firstChild;
          )
            e.removeChild(e.firstChild);
          for (; t.firstChild;) e.appendChild(t.firstChild);
        }
      });
    function De(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Oe = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      ke = [`Webkit`, `ms`, `Moz`, `O`];
    Object.keys(Oe).forEach(function (e) {
      ke.forEach(function (t) {
        ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Oe[t] = Oe[e]));
      });
    });
    function Ae(e, t, n) {
      return t == null || typeof t == `boolean` || t === ``
        ? ``
        : n ||
            typeof t != `number` ||
            t === 0 ||
            (Oe.hasOwnProperty(e) && Oe[e])
          ? (`` + t).trim()
          : t + `px`;
    }
    function je(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf(`--`) === 0,
            i = Ae(n, t[n], r);
          (n === `float` && (n = `cssFloat`),
            r ? e.setProperty(n, i) : (e[n] = i));
        }
    }
    var Me = L(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      },
    );
    function Ne(e, t) {
      if (t) {
        if (Me[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(r(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(r(60));
          if (
            typeof t.dangerouslySetInnerHTML != `object` ||
            !(`__html` in t.dangerouslySetInnerHTML)
          )
            throw Error(r(61));
        }
        if (t.style != null && typeof t.style != `object`) throw Error(r(62));
      }
    }
    function Pe(e, t) {
      if (e.indexOf(`-`) === -1) return typeof t.is == `string`;
      switch (e) {
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          return !1;
        default:
          return !0;
      }
    }
    var Fe = null;
    function Ie(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Le = null,
      Re = null,
      ze = null;
    function Be(e) {
      if ((e = Ii(e))) {
        if (typeof Le != `function`) throw Error(r(280));
        var t = e.stateNode;
        t && ((t = Ri(t)), Le(e.stateNode, e.type, t));
      }
    }
    function Ve(e) {
      Re ? (ze ? ze.push(e) : (ze = [e])) : (Re = e);
    }
    function He() {
      if (Re) {
        var e = Re,
          t = ze;
        if (((ze = Re = null), Be(e), t))
          for (e = 0; e < t.length; e++) Be(t[e]);
      }
    }
    function Ue(e, t) {
      return e(t);
    }
    function We() {}
    var Ge = !1;
    function Ke(e, t, n) {
      if (Ge) return e(t, n);
      Ge = !0;
      try {
        return Ue(e, t, n);
      } finally {
        ((Ge = !1), (Re !== null || ze !== null) && (We(), He()));
      }
    }
    function qe(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var i = Ri(n);
      if (i === null) return null;
      n = i[t];
      a: switch (t) {
        case `onClick`:
        case `onClickCapture`:
        case `onDoubleClick`:
        case `onDoubleClickCapture`:
        case `onMouseDown`:
        case `onMouseDownCapture`:
        case `onMouseMove`:
        case `onMouseMoveCapture`:
        case `onMouseUp`:
        case `onMouseUpCapture`:
        case `onMouseEnter`:
          ((i = !i.disabled) ||
            ((e = e.type),
            (i =
              e !== `button` &&
              e !== `input` &&
              e !== `select` &&
              e !== `textarea`)),
            (e = !i));
          break a;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != `function`) throw Error(r(231, t, typeof n));
      return n;
    }
    var Je = !1;
    if (c)
      try {
        var Ye = {};
        (Object.defineProperty(Ye, "passive", {
          get: function () {
            Je = !0;
          },
        }),
          window.addEventListener(`test`, Ye, Ye),
          window.removeEventListener(`test`, Ye, Ye));
      } catch {
        Je = !1;
      }
    function Xe(e, t, n, r, i, a, o, s, c) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, l);
      } catch (e) {
        this.onError(e);
      }
    }
    var Ze = !1,
      Qe = null,
      $e = !1,
      et = null,
      tt = {
        onError: function (e) {
          ((Ze = !0), (Qe = e));
        },
      };
    function nt(e, t, n, r, i, a, o, s, c) {
      ((Ze = !1), (Qe = null), Xe.apply(tt, arguments));
    }
    function rt(e, t, n, i, a, o, s, c, l) {
      if ((nt.apply(this, arguments), Ze)) {
        if (Ze) {
          var u = Qe;
          ((Ze = !1), (Qe = null));
        } else throw Error(r(198));
        $e || (($e = !0), (et = u));
      }
    }
    function it(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return;) t = t.return;
      else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function at(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function ot(e) {
      if (it(e) !== e) throw Error(r(188));
    }
    function st(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = it(e)), t === null)) throw Error(r(188));
        return t === e ? e : null;
      }
      for (var n = e, i = t; ;) {
        var a = n.return;
        if (a === null) break;
        var o = a.alternate;
        if (o === null) {
          if (((i = a.return), i !== null)) {
            n = i;
            continue;
          }
          break;
        }
        if (a.child === o.child) {
          for (o = a.child; o;) {
            if (o === n) return (ot(a), e);
            if (o === i) return (ot(a), t);
            o = o.sibling;
          }
          throw Error(r(188));
        }
        if (n.return !== i.return) ((n = a), (i = o));
        else {
          for (var s = !1, c = a.child; c;) {
            if (c === n) {
              ((s = !0), (n = a), (i = o));
              break;
            }
            if (c === i) {
              ((s = !0), (i = a), (n = o));
              break;
            }
            c = c.sibling;
          }
          if (!s) {
            for (c = o.child; c;) {
              if (c === n) {
                ((s = !0), (n = o), (i = a));
                break;
              }
              if (c === i) {
                ((s = !0), (i = o), (n = a));
                break;
              }
              c = c.sibling;
            }
            if (!s) throw Error(r(189));
          }
        }
        if (n.alternate !== i) throw Error(r(190));
      }
      if (n.tag !== 3) throw Error(r(188));
      return n.stateNode.current === n ? e : t;
    }
    function ct(e) {
      return ((e = st(e)), e === null ? null : lt(e));
    }
    function lt(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null;) {
        var t = lt(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var ut = n.unstable_scheduleCallback,
      dt = n.unstable_cancelCallback,
      ft = n.unstable_shouldYield,
      pt = n.unstable_requestPaint,
      mt = n.unstable_now,
      ht = n.unstable_getCurrentPriorityLevel,
      gt = n.unstable_ImmediatePriority,
      _t = n.unstable_UserBlockingPriority,
      vt = n.unstable_NormalPriority,
      yt = n.unstable_LowPriority,
      bt = n.unstable_IdlePriority,
      xt = null,
      St = null;
    function Ct(e) {
      if (St && typeof St.onCommitFiberRoot == `function`)
        try {
          St.onCommitFiberRoot(xt, e, void 0, (e.current.flags & 128) == 128);
        } catch {}
    }
    var wt = Math.clz32 ? Math.clz32 : Dt,
      Tt = Math.log,
      Et = Math.LN2;
    function Dt(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Tt(e) / Et) | 0)) | 0);
    }
    var Ot = 64,
      kt = 4194304;
    function At(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function jt(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        i = e.suspendedLanes,
        a = e.pingedLanes,
        o = n & 268435455;
      if (o !== 0) {
        var s = o & ~i;
        s === 0 ? ((a &= o), a !== 0 && (r = At(a))) : (r = At(s));
      } else ((o = n & ~i), o === 0 ? a !== 0 && (r = At(a)) : (r = At(o)));
      if (r === 0) return 0;
      if (
        t !== 0 &&
        t !== r &&
        (t & i) === 0 &&
        ((i = r & -r), (a = t & -t), i >= a || (i === 16 && a & 4194240))
      )
        return t;
      if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t;)
          ((n = 31 - wt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
      return r;
    }
    function Mt(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Nt(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          i = e.expirationTimes,
          a = e.pendingLanes;
        0 < a;
      ) {
        var o = 31 - wt(a),
          s = 1 << o,
          c = i[o];
        (c === -1
          ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Mt(s, t))
          : c <= t && (e.expiredLanes |= s),
          (a &= ~s));
      }
    }
    function Pt(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e === 0 ? (e & 1073741824 ? 1073741824 : 0) : e
      );
    }
    function Ft() {
      var e = Ot;
      return ((Ot <<= 1), !(Ot & 4194240) && (Ot = 64), e);
    }
    function It(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Lt(e, t, n) {
      ((e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - wt(t)),
        (e[t] = n));
    }
    function Rt(e, t) {
      var n = e.pendingLanes & ~t;
      ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements));
      var r = e.eventTimes;
      for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - wt(n),
          a = 1 << i;
        ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a));
      }
    }
    function zt(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n;) {
        var r = 31 - wt(n),
          i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
      }
    }
    var H = 0;
    function Bt(e) {
      return (
        (e &= -e),
        1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var Vt,
      Ht,
      Ut,
      Wt,
      Gt,
      Kt = !1,
      qt = [],
      Jt = null,
      Yt = null,
      Xt = null,
      Zt = new Map(),
      Qt = new Map(),
      $t = [],
      en =
        `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(
          ` `,
        );
    function tn(e, t) {
      switch (e) {
        case `focusin`:
        case `focusout`:
          Jt = null;
          break;
        case `dragenter`:
        case `dragleave`:
          Yt = null;
          break;
        case `mouseover`:
        case `mouseout`:
          Xt = null;
          break;
        case `pointerover`:
        case `pointerout`:
          Zt.delete(t.pointerId);
          break;
        case `gotpointercapture`:
        case `lostpointercapture`:
          Qt.delete(t.pointerId);
      }
    }
    function nn(e, t, n, r, i, a) {
      return e === null || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [i],
          }),
          t !== null && ((t = Ii(t)), t !== null && Ht(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
    }
    function rn(e, t, n, r, i) {
      switch (t) {
        case `focusin`:
          return ((Jt = nn(Jt, e, t, n, r, i)), !0);
        case `dragenter`:
          return ((Yt = nn(Yt, e, t, n, r, i)), !0);
        case `mouseover`:
          return ((Xt = nn(Xt, e, t, n, r, i)), !0);
        case `pointerover`:
          var a = i.pointerId;
          return (Zt.set(a, nn(Zt.get(a) || null, e, t, n, r, i)), !0);
        case `gotpointercapture`:
          return (
            (a = i.pointerId),
            Qt.set(a, nn(Qt.get(a) || null, e, t, n, r, i)),
            !0
          );
      }
      return !1;
    }
    function an(e) {
      var t = Fi(e.target);
      if (t !== null) {
        var n = it(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = at(n)), t !== null)) {
              ((e.blockedOn = t),
                Gt(e.priority, function () {
                  Ut(n);
                }));
              return;
            }
          } else if (
            t === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function on(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length;) {
        var n = _n(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ((Fe = r), n.target.dispatchEvent(r), (Fe = null));
        } else return ((t = Ii(n)), t !== null && Ht(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function sn(e, t, n) {
      on(e) && n.delete(t);
    }
    function cn() {
      ((Kt = !1),
        Jt !== null && on(Jt) && (Jt = null),
        Yt !== null && on(Yt) && (Yt = null),
        Xt !== null && on(Xt) && (Xt = null),
        Zt.forEach(sn),
        Qt.forEach(sn));
    }
    function ln(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Kt ||
          ((Kt = !0),
          n.unstable_scheduleCallback(n.unstable_NormalPriority, cn)));
    }
    function un(e) {
      function t(t) {
        return ln(t, e);
      }
      if (0 < qt.length) {
        ln(qt[0], e);
        for (var n = 1; n < qt.length; n++) {
          var r = qt[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        Jt !== null && ln(Jt, e),
          Yt !== null && ln(Yt, e),
          Xt !== null && ln(Xt, e),
          Zt.forEach(t),
          Qt.forEach(t),
          n = 0;
        n < $t.length;
        n++
      )
        ((r = $t[n]), r.blockedOn === e && (r.blockedOn = null));
      for (; 0 < $t.length && ((n = $t[0]), n.blockedOn === null);)
        (an(n), n.blockedOn === null && $t.shift());
    }
    var dn = C.ReactCurrentBatchConfig,
      fn = !0;
    function pn(e, t, n, r) {
      var i = H,
        a = dn.transition;
      dn.transition = null;
      try {
        ((H = 1), hn(e, t, n, r));
      } finally {
        ((H = i), (dn.transition = a));
      }
    }
    function mn(e, t, n, r) {
      var i = H,
        a = dn.transition;
      dn.transition = null;
      try {
        ((H = 4), hn(e, t, n, r));
      } finally {
        ((H = i), (dn.transition = a));
      }
    }
    function hn(e, t, n, r) {
      if (fn) {
        var i = _n(e, t, n, r);
        if (i === null) (si(e, t, r, gn, n), tn(e, r));
        else if (rn(i, e, t, n, r)) r.stopPropagation();
        else if ((tn(e, r), t & 4 && -1 < en.indexOf(e))) {
          for (; i !== null;) {
            var a = Ii(i);
            if (
              (a !== null && Vt(a),
              (a = _n(e, t, n, r)),
              a === null && si(e, t, r, gn, n),
              a === i)
            )
              break;
            i = a;
          }
          i !== null && r.stopPropagation();
        } else si(e, t, r, null, n);
      }
    }
    var gn = null;
    function _n(e, t, n, r) {
      if (((gn = null), (e = Ie(r)), (e = Fi(e)), e !== null)) {
        if (((t = it(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = at(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
      return ((gn = e), null);
    }
    function vn(e) {
      switch (e) {
        case `cancel`:
        case `click`:
        case `close`:
        case `contextmenu`:
        case `copy`:
        case `cut`:
        case `auxclick`:
        case `dblclick`:
        case `dragend`:
        case `dragstart`:
        case `drop`:
        case `focusin`:
        case `focusout`:
        case `input`:
        case `invalid`:
        case `keydown`:
        case `keypress`:
        case `keyup`:
        case `mousedown`:
        case `mouseup`:
        case `paste`:
        case `pause`:
        case `play`:
        case `pointercancel`:
        case `pointerdown`:
        case `pointerup`:
        case `ratechange`:
        case `reset`:
        case `resize`:
        case `seeked`:
        case `submit`:
        case `touchcancel`:
        case `touchend`:
        case `touchstart`:
        case `volumechange`:
        case `change`:
        case `selectionchange`:
        case `textInput`:
        case `compositionstart`:
        case `compositionend`:
        case `compositionupdate`:
        case `beforeblur`:
        case `afterblur`:
        case `beforeinput`:
        case `blur`:
        case `fullscreenchange`:
        case `focus`:
        case `hashchange`:
        case `popstate`:
        case `select`:
        case `selectstart`:
          return 1;
        case `drag`:
        case `dragenter`:
        case `dragexit`:
        case `dragleave`:
        case `dragover`:
        case `mousemove`:
        case `mouseout`:
        case `mouseover`:
        case `pointermove`:
        case `pointerout`:
        case `pointerover`:
        case `scroll`:
        case `toggle`:
        case `touchmove`:
        case `wheel`:
        case `mouseenter`:
        case `mouseleave`:
        case `pointerenter`:
        case `pointerleave`:
          return 4;
        case `message`:
          switch (ht()) {
            case gt:
              return 1;
            case _t:
              return 4;
            case vt:
            case yt:
              return 16;
            case bt:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var yn = null,
      bn = null,
      xn = null;
    function Sn() {
      if (xn) return xn;
      var e,
        t = bn,
        n = t.length,
        r,
        i = `value` in yn ? yn.value : yn.textContent,
        a = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e;
      for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
      return (xn = i.slice(e, 1 < r ? 1 - r : void 0));
    }
    function Cn(e) {
      var t = e.keyCode;
      return (
        `charCode` in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function U() {
      return !0;
    }
    function wn() {
      return !1;
    }
    function Tn(e) {
      function t(t, n, r, i, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented == null
              ? !1 === i.returnValue
              : i.defaultPrevented
          )
            ? U
            : wn),
          (this.isPropagationStopped = wn),
          this
        );
      }
      return (
        L(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != `unknown` && (e.returnValue = !1),
              (this.isDefaultPrevented = U));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
              (this.isPropagationStopped = U));
          },
          persist: function () {},
          isPersistent: U,
        }),
        t
      );
    }
    var En = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      W = Tn(En),
      Dn = L({}, En, { view: 0, detail: 0 }),
      On = Tn(Dn),
      kn,
      An,
      jn,
      Mn = L({}, Dn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Hn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return `movementX` in e
            ? e.movementX
            : (e !== jn &&
                (jn && e.type === `mousemove`
                  ? ((kn = e.screenX - jn.screenX),
                    (An = e.screenY - jn.screenY))
                  : (An = kn = 0),
                (jn = e)),
              kn);
        },
        movementY: function (e) {
          return `movementY` in e ? e.movementY : An;
        },
      }),
      Nn = Tn(Mn),
      G = Tn(L({}, Mn, { dataTransfer: 0 })),
      Pn = Tn(L({}, Dn, { relatedTarget: 0 })),
      Fn = Tn(
        L({}, En, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      ),
      In = Tn(
        L({}, En, {
          clipboardData: function (e) {
            return `clipboardData` in e
              ? e.clipboardData
              : window.clipboardData;
          },
        }),
      ),
      Ln = Tn(L({}, En, { data: 0 })),
      Rn = {
        Esc: `Escape`,
        Spacebar: ` `,
        Left: `ArrowLeft`,
        Up: `ArrowUp`,
        Right: `ArrowRight`,
        Down: `ArrowDown`,
        Del: `Delete`,
        Win: `OS`,
        Menu: `ContextMenu`,
        Apps: `ContextMenu`,
        Scroll: `ScrollLock`,
        MozPrintableKey: `Unidentified`,
      },
      zn = {
        8: `Backspace`,
        9: `Tab`,
        12: `Clear`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        19: `Pause`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        45: `Insert`,
        46: `Delete`,
        112: `F1`,
        113: `F2`,
        114: `F3`,
        115: `F4`,
        116: `F5`,
        117: `F6`,
        118: `F7`,
        119: `F8`,
        120: `F9`,
        121: `F10`,
        122: `F11`,
        123: `F12`,
        144: `NumLock`,
        145: `ScrollLock`,
        224: `Meta`,
      },
      Bn = {
        Alt: `altKey`,
        Control: `ctrlKey`,
        Meta: `metaKey`,
        Shift: `shiftKey`,
      };
    function Vn(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = Bn[e])
          ? !!t[e]
          : !1;
    }
    function Hn() {
      return Vn;
    }
    var Un = Tn(
        L({}, Dn, {
          key: function (e) {
            if (e.key) {
              var t = Rn[e.key] || e.key;
              if (t !== `Unidentified`) return t;
            }
            return e.type === `keypress`
              ? ((e = Cn(e)), e === 13 ? `Enter` : String.fromCharCode(e))
              : e.type === `keydown` || e.type === `keyup`
                ? zn[e.keyCode] || `Unidentified`
                : ``;
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Hn,
          charCode: function (e) {
            return e.type === `keypress` ? Cn(e) : 0;
          },
          keyCode: function (e) {
            return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
          },
          which: function (e) {
            return e.type === `keypress`
              ? Cn(e)
              : e.type === `keydown` || e.type === `keyup`
                ? e.keyCode
                : 0;
          },
        }),
      ),
      Wn = Tn(
        L({}, Mn, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        }),
      ),
      Gn = Tn(
        L({}, Dn, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: Hn,
        }),
      ),
      Kn = Tn(L({}, En, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })),
      qn = Tn(
        L({}, Mn, {
          deltaX: function (e) {
            return `deltaX` in e
              ? e.deltaX
              : `wheelDeltaX` in e
                ? -e.wheelDeltaX
                : 0;
          },
          deltaY: function (e) {
            return `deltaY` in e
              ? e.deltaY
              : `wheelDeltaY` in e
                ? -e.wheelDeltaY
                : `wheelDelta` in e
                  ? -e.wheelDelta
                  : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
      ),
      Jn = [9, 13, 27, 32],
      Yn = c && `CompositionEvent` in window,
      Xn = null;
    c && `documentMode` in document && (Xn = document.documentMode);
    var Zn = c && `TextEvent` in window && !Xn,
      Qn = c && (!Yn || (Xn && 8 < Xn && 11 >= Xn)),
      $n = ` `,
      er = !1;
    function tr(e, t) {
      switch (e) {
        case `keyup`:
          return Jn.indexOf(t.keyCode) !== -1;
        case `keydown`:
          return t.keyCode !== 229;
        case `keypress`:
        case `mousedown`:
        case `focusout`:
          return !0;
        default:
          return !1;
      }
    }
    function nr(e) {
      return (
        (e = e.detail),
        typeof e == `object` && `data` in e ? e.data : null
      );
    }
    var rr = !1;
    function ir(e, t) {
      switch (e) {
        case `compositionend`:
          return nr(t);
        case `keypress`:
          return t.which === 32 ? ((er = !0), $n) : null;
        case `textInput`:
          return ((e = t.data), e === $n && er ? null : e);
        default:
          return null;
      }
    }
    function ar(e, t) {
      if (rr)
        return e === `compositionend` || (!Yn && tr(e, t))
          ? ((e = Sn()), (xn = bn = yn = null), (rr = !1), e)
          : null;
      switch (e) {
        case `paste`:
          return null;
        case `keypress`:
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case `compositionend`:
          return Qn && t.locale !== `ko` ? null : t.data;
        default:
          return null;
      }
    }
    var or = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function sr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === `input` ? !!or[e.type] : t === `textarea`;
    }
    function cr(e, t, n, r) {
      (Ve(r),
        (t = li(t, `onChange`)),
        0 < t.length &&
          ((n = new W(`onChange`, `change`, null, n, r)),
          e.push({ event: n, listeners: t })));
    }
    var lr = null,
      ur = null;
    function dr(e) {
      ni(e, 0);
    }
    function fr(e) {
      if (ue(Li(e))) return e;
    }
    function pr(e, t) {
      if (e === `change`) return t;
    }
    var mr = !1;
    if (c) {
      var hr;
      if (c) {
        var gr = `oninput` in document;
        if (!gr) {
          var _r = document.createElement(`div`);
          (_r.setAttribute(`oninput`, `return;`),
            (gr = typeof _r.oninput == `function`));
        }
        hr = gr;
      } else hr = !1;
      mr = hr && (!document.documentMode || 9 < document.documentMode);
    }
    function vr() {
      lr && (lr.detachEvent(`onpropertychange`, yr), (ur = lr = null));
    }
    function yr(e) {
      if (e.propertyName === `value` && fr(ur)) {
        var t = [];
        (cr(t, ur, e, Ie(e)), Ke(dr, t));
      }
    }
    function br(e, t, n) {
      e === `focusin`
        ? (vr(), (lr = t), (ur = n), lr.attachEvent(`onpropertychange`, yr))
        : e === `focusout` && vr();
    }
    function xr(e) {
      if (e === `selectionchange` || e === `keyup` || e === `keydown`)
        return fr(ur);
    }
    function Sr(e, t) {
      if (e === `click`) return fr(t);
    }
    function Cr(e, t) {
      if (e === `input` || e === `change`) return fr(t);
    }
    function wr(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var Tr = typeof Object.is == `function` ? Object.is : wr;
    function Er(e, t) {
      if (Tr(e, t)) return !0;
      if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!l.call(t, i) || !Tr(e[i], t[i])) return !1;
      }
      return !0;
    }
    function Dr(e) {
      for (; e && e.firstChild;) e = e.firstChild;
      return e;
    }
    function Or(e, t) {
      var n = Dr(e);
      e = 0;
      for (var r; n;) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return { node: n, offset: t - e };
          e = r;
        }
        a: {
          for (; n;) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break a;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Dr(n);
      }
    }
    function kr(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? kr(e, t.parentNode)
              : `contains` in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function Ar() {
      for (var e = window, t = de(); t instanceof e.HTMLIFrameElement;) {
        try {
          var n = typeof t.contentWindow.location.href == `string`;
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = de(e.document);
      }
      return t;
    }
    function jr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === `input` &&
          (e.type === `text` ||
            e.type === `search` ||
            e.type === `tel` ||
            e.type === `url` ||
            e.type === `password`)) ||
          t === `textarea` ||
          e.contentEditable === `true`)
      );
    }
    function Mr(e) {
      var t = Ar(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (
        t !== n &&
        n &&
        n.ownerDocument &&
        kr(n.ownerDocument.documentElement, n)
      ) {
        if (r !== null && jr(n)) {
          if (
            ((t = r.start),
            (e = r.end),
            e === void 0 && (e = t),
            `selectionStart` in n)
          )
            ((n.selectionStart = t),
              (n.selectionEnd = Math.min(e, n.value.length)));
          else if (
            ((e =
              ((t = n.ownerDocument || document) && t.defaultView) || window),
            e.getSelection)
          ) {
            e = e.getSelection();
            var i = n.textContent.length,
              a = Math.min(r.start, i);
            ((r = r.end === void 0 ? a : Math.min(r.end, i)),
              !e.extend && a > r && ((i = r), (r = a), (a = i)),
              (i = Or(n, a)));
            var o = Or(n, r);
            i &&
              o &&
              (e.rangeCount !== 1 ||
                e.anchorNode !== i.node ||
                e.anchorOffset !== i.offset ||
                e.focusNode !== o.node ||
                e.focusOffset !== o.offset) &&
              ((t = t.createRange()),
              t.setStart(i.node, i.offset),
              e.removeAllRanges(),
              a > r
                ? (e.addRange(t), e.extend(o.node, o.offset))
                : (t.setEnd(o.node, o.offset), e.addRange(t)));
          }
        }
        for (t = [], e = n; (e = e.parentNode);)
          e.nodeType === 1 &&
            t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
          typeof n.focus == `function` && n.focus(), n = 0;
          n < t.length;
          n++
        )
          ((e = t[n]),
            (e.element.scrollLeft = e.left),
            (e.element.scrollTop = e.top));
      }
    }
    var Nr = c && `documentMode` in document && 11 >= document.documentMode,
      Pr = null,
      Fr = null,
      Ir = null,
      Lr = !1;
    function Rr(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Lr ||
        Pr == null ||
        Pr !== de(r) ||
        ((r = Pr),
        `selectionStart` in r && jr(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = (
              (r.ownerDocument && r.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (Ir && Er(Ir, r)) ||
          ((Ir = r),
          (r = li(Fr, `onSelect`)),
          0 < r.length &&
            ((t = new W(`onSelect`, `select`, null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = Pr))));
    }
    function zr(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n[`Webkit` + e] = `webkit` + t),
        (n[`Moz` + e] = `moz` + t),
        n
      );
    }
    var Br = {
        animationend: zr(`Animation`, `AnimationEnd`),
        animationiteration: zr(`Animation`, `AnimationIteration`),
        animationstart: zr(`Animation`, `AnimationStart`),
        transitionend: zr(`Transition`, `TransitionEnd`),
      },
      Vr = {},
      Hr = {};
    c &&
      ((Hr = document.createElement(`div`).style),
      `AnimationEvent` in window ||
        (delete Br.animationend.animation,
        delete Br.animationiteration.animation,
        delete Br.animationstart.animation),
      `TransitionEvent` in window || delete Br.transitionend.transition);
    function Ur(e) {
      if (Vr[e]) return Vr[e];
      if (!Br[e]) return e;
      var t = Br[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Hr) return (Vr[e] = t[n]);
      return e;
    }
    var Wr = Ur(`animationend`),
      Gr = Ur(`animationiteration`),
      Kr = Ur(`animationstart`),
      qr = Ur(`transitionend`),
      Jr = new Map(),
      Yr =
        `abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
          ` `,
        );
    function Xr(e, t) {
      (Jr.set(e, t), o(t, [e]));
    }
    for (var Zr = 0; Zr < Yr.length; Zr++) {
      var Qr = Yr[Zr];
      Xr(Qr.toLowerCase(), `on` + (Qr[0].toUpperCase() + Qr.slice(1)));
    }
    (Xr(Wr, `onAnimationEnd`),
      Xr(Gr, `onAnimationIteration`),
      Xr(Kr, `onAnimationStart`),
      Xr(`dblclick`, `onDoubleClick`),
      Xr(`focusin`, `onFocus`),
      Xr(`focusout`, `onBlur`),
      Xr(qr, `onTransitionEnd`),
      s(`onMouseEnter`, [`mouseout`, `mouseover`]),
      s(`onMouseLeave`, [`mouseout`, `mouseover`]),
      s(`onPointerEnter`, [`pointerout`, `pointerover`]),
      s(`onPointerLeave`, [`pointerout`, `pointerover`]),
      o(
        `onChange`,
        `change click focusin focusout input keydown keyup selectionchange`.split(
          ` `,
        ),
      ),
      o(
        `onSelect`,
        `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
          ` `,
        ),
      ),
      o(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]),
      o(
        `onCompositionEnd`,
        `compositionend focusout keydown keypress keyup mousedown`.split(` `),
      ),
      o(
        `onCompositionStart`,
        `compositionstart focusout keydown keypress keyup mousedown`.split(` `),
      ),
      o(
        `onCompositionUpdate`,
        `compositionupdate focusout keydown keypress keyup mousedown`.split(
          ` `,
        ),
      ));
    var $r =
        `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
          ` `,
        ),
      ei = new Set(
        `cancel close invalid load scroll toggle`.split(` `).concat($r),
      );
    function ti(e, t, n) {
      var r = e.type || `unknown-event`;
      ((e.currentTarget = n), rt(r, t, void 0, e), (e.currentTarget = null));
    }
    function ni(e, t) {
      t = !!(t & 4);
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event;
        r = r.listeners;
        a: {
          var a = void 0;
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var s = r[o],
                c = s.instance,
                l = s.currentTarget;
              if (((s = s.listener), c !== a && i.isPropagationStopped()))
                break a;
              (ti(i, s, l), (a = c));
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((s = r[o]),
                (c = s.instance),
                (l = s.currentTarget),
                (s = s.listener),
                c !== a && i.isPropagationStopped())
              )
                break a;
              (ti(i, s, l), (a = c));
            }
        }
      }
      if ($e) throw ((e = et), ($e = !1), (et = null), e);
    }
    function K(e, t) {
      var n = t[Mi];
      n === void 0 && (n = t[Mi] = new Set());
      var r = e + `__bubble`;
      n.has(r) || (oi(t, e, 2, !1), n.add(r));
    }
    function ri(e, t, n) {
      var r = 0;
      (t && (r |= 4), oi(n, e, r, t));
    }
    var ii = `_reactListening` + Math.random().toString(36).slice(2);
    function ai(e) {
      if (!e[ii]) {
        ((e[ii] = !0),
          i.forEach(function (t) {
            t !== `selectionchange` &&
              (ei.has(t) || ri(t, !1, e), ri(t, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[ii] || ((t[ii] = !0), ri(`selectionchange`, !1, t));
      }
    }
    function oi(e, t, n, r) {
      switch (vn(t)) {
        case 1:
          var i = pn;
          break;
        case 4:
          i = mn;
          break;
        default:
          i = hn;
      }
      ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !Je ||
          (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) ||
          (i = !0),
        r
          ? i === void 0
            ? e.addEventListener(t, n, !0)
            : e.addEventListener(t, n, { capture: !0, passive: i })
          : i === void 0
            ? e.addEventListener(t, n, !1)
            : e.addEventListener(t, n, { passive: i }));
    }
    function si(e, t, n, r, i) {
      var a = r;
      if (!(t & 1) && !(t & 2) && r !== null)
        a: for (;;) {
          if (r === null) return;
          var o = r.tag;
          if (o === 3 || o === 4) {
            var s = r.stateNode.containerInfo;
            if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
            if (o === 4)
              for (o = r.return; o !== null;) {
                var c = o.tag;
                if (
                  (c === 3 || c === 4) &&
                  ((c = o.stateNode.containerInfo),
                  c === i || (c.nodeType === 8 && c.parentNode === i))
                )
                  return;
                o = o.return;
              }
            for (; s !== null;) {
              if (((o = Fi(s)), o === null)) return;
              if (((c = o.tag), c === 5 || c === 6)) {
                r = a = o;
                continue a;
              }
              s = s.parentNode;
            }
          }
          r = r.return;
        }
      Ke(function () {
        var r = a,
          i = Ie(n),
          o = [];
        a: {
          var s = Jr.get(e);
          if (s !== void 0) {
            var c = W,
              l = e;
            switch (e) {
              case `keypress`:
                if (Cn(n) === 0) break a;
              case `keydown`:
              case `keyup`:
                c = Un;
                break;
              case `focusin`:
                ((l = `focus`), (c = Pn));
                break;
              case `focusout`:
                ((l = `blur`), (c = Pn));
                break;
              case `beforeblur`:
              case `afterblur`:
                c = Pn;
                break;
              case `click`:
                if (n.button === 2) break a;
              case `auxclick`:
              case `dblclick`:
              case `mousedown`:
              case `mousemove`:
              case `mouseup`:
              case `mouseout`:
              case `mouseover`:
              case `contextmenu`:
                c = Nn;
                break;
              case `drag`:
              case `dragend`:
              case `dragenter`:
              case `dragexit`:
              case `dragleave`:
              case `dragover`:
              case `dragstart`:
              case `drop`:
                c = G;
                break;
              case `touchcancel`:
              case `touchend`:
              case `touchmove`:
              case `touchstart`:
                c = Gn;
                break;
              case Wr:
              case Gr:
              case Kr:
                c = Fn;
                break;
              case qr:
                c = Kn;
                break;
              case `scroll`:
                c = On;
                break;
              case `wheel`:
                c = qn;
                break;
              case `copy`:
              case `cut`:
              case `paste`:
                c = In;
                break;
              case `gotpointercapture`:
              case `lostpointercapture`:
              case `pointercancel`:
              case `pointerdown`:
              case `pointermove`:
              case `pointerout`:
              case `pointerover`:
              case `pointerup`:
                c = Wn;
            }
            var u = !!(t & 4),
              d = !u && e === `scroll`,
              f = u ? (s === null ? null : s + `Capture`) : s;
            u = [];
            for (var p = r, m; p !== null;) {
              m = p;
              var h = m.stateNode;
              if (
                (m.tag === 5 &&
                  h !== null &&
                  ((m = h),
                  f !== null &&
                    ((h = qe(p, f)), h != null && u.push(ci(p, h, m)))),
                d)
              )
                break;
              p = p.return;
            }
            0 < u.length &&
              ((s = new c(s, l, null, n, i)),
              o.push({ event: s, listeners: u }));
          }
        }
        if (!(t & 7)) {
          a: {
            if (
              ((s = e === `mouseover` || e === `pointerover`),
              (c = e === `mouseout` || e === `pointerout`),
              s &&
                n !== Fe &&
                (l = n.relatedTarget || n.fromElement) &&
                (Fi(l) || l[ji]))
            )
              break a;
            if (
              (c || s) &&
              ((s =
                i.window === i
                  ? i
                  : (s = i.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              c
                ? ((l = n.relatedTarget || n.toElement),
                  (c = r),
                  (l = l ? Fi(l) : null),
                  l !== null &&
                    ((d = it(l)), l !== d || (l.tag !== 5 && l.tag !== 6)) &&
                    (l = null))
                : ((c = null), (l = r)),
              c !== l)
            ) {
              if (
                ((u = Nn),
                (h = `onMouseLeave`),
                (f = `onMouseEnter`),
                (p = `mouse`),
                (e === `pointerout` || e === `pointerover`) &&
                  ((u = Wn),
                  (h = `onPointerLeave`),
                  (f = `onPointerEnter`),
                  (p = `pointer`)),
                (d = c == null ? s : Li(c)),
                (m = l == null ? s : Li(l)),
                (s = new u(h, p + `leave`, c, n, i)),
                (s.target = d),
                (s.relatedTarget = m),
                (h = null),
                Fi(i) === r &&
                  ((u = new u(f, p + `enter`, l, n, i)),
                  (u.target = m),
                  (u.relatedTarget = d),
                  (h = u)),
                (d = h),
                c && l)
              )
                b: {
                  for (u = c, f = l, p = 0, m = u; m; m = ui(m)) p++;
                  for (m = 0, h = f; h; h = ui(h)) m++;
                  for (; 0 < p - m;) ((u = ui(u)), p--);
                  for (; 0 < m - p;) ((f = ui(f)), m--);
                  for (; p--;) {
                    if (u === f || (f !== null && u === f.alternate)) break b;
                    ((u = ui(u)), (f = ui(f)));
                  }
                  u = null;
                }
              else u = null;
              (c !== null && di(o, s, c, u, !1),
                l !== null && d !== null && di(o, d, l, u, !0));
            }
          }
          a: {
            if (
              ((s = r ? Li(r) : window),
              (c = s.nodeName && s.nodeName.toLowerCase()),
              c === `select` || (c === `input` && s.type === `file`))
            )
              var g = pr;
            else if (sr(s)) {
              if (mr) g = Cr;
              else {
                g = xr;
                var _ = br;
              }
            } else
              (c = s.nodeName) &&
                c.toLowerCase() === `input` &&
                (s.type === `checkbox` || s.type === `radio`) &&
                (g = Sr);
            if ((g &&= g(e, r))) {
              cr(o, g, n, i);
              break a;
            }
            (_ && _(e, s, r),
              e === `focusout` &&
                (_ = s._wrapperState) &&
                _.controlled &&
                s.type === `number` &&
                _e(s, `number`, s.value));
          }
          switch (((_ = r ? Li(r) : window), e)) {
            case `focusin`:
              (sr(_) || _.contentEditable === `true`) &&
                ((Pr = _), (Fr = r), (Ir = null));
              break;
            case `focusout`:
              Ir = Fr = Pr = null;
              break;
            case `mousedown`:
              Lr = !0;
              break;
            case `contextmenu`:
            case `mouseup`:
            case `dragend`:
              ((Lr = !1), Rr(o, n, i));
              break;
            case `selectionchange`:
              if (Nr) break;
            case `keydown`:
            case `keyup`:
              Rr(o, n, i);
          }
          var v;
          if (Yn)
            b: {
              switch (e) {
                case `compositionstart`:
                  var y = `onCompositionStart`;
                  break b;
                case `compositionend`:
                  y = `onCompositionEnd`;
                  break b;
                case `compositionupdate`:
                  y = `onCompositionUpdate`;
                  break b;
              }
              y = void 0;
            }
          else
            rr
              ? tr(e, n) && (y = `onCompositionEnd`)
              : e === `keydown` &&
                n.keyCode === 229 &&
                (y = `onCompositionStart`);
          (y &&
            (Qn &&
              n.locale !== `ko` &&
              (rr || y !== `onCompositionStart`
                ? y === `onCompositionEnd` && rr && (v = Sn())
                : ((yn = i),
                  (bn = `value` in yn ? yn.value : yn.textContent),
                  (rr = !0))),
            (_ = li(r, y)),
            0 < _.length &&
              ((y = new Ln(y, e, null, n, i)),
              o.push({ event: y, listeners: _ }),
              v ? (y.data = v) : ((v = nr(n)), v !== null && (y.data = v)))),
            (v = Zn ? ir(e, n) : ar(e, n)) &&
              ((r = li(r, `onBeforeInput`)),
              0 < r.length &&
                ((i = new Ln(`onBeforeInput`, `beforeinput`, null, n, i)),
                o.push({ event: i, listeners: r }),
                (i.data = v))));
        }
        ni(o, t);
      });
    }
    function ci(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function li(e, t) {
      for (var n = t + `Capture`, r = []; e !== null;) {
        var i = e,
          a = i.stateNode;
        (i.tag === 5 &&
          a !== null &&
          ((i = a),
          (a = qe(e, n)),
          a != null && r.unshift(ci(e, a, i)),
          (a = qe(e, t)),
          a != null && r.push(ci(e, a, i))),
          (e = e.return));
      }
      return r;
    }
    function ui(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function di(e, t, n, r, i) {
      for (var a = t._reactName, o = []; n !== null && n !== r;) {
        var s = n,
          c = s.alternate,
          l = s.stateNode;
        if (c !== null && c === r) break;
        (s.tag === 5 &&
          l !== null &&
          ((s = l),
          i
            ? ((c = qe(n, a)), c != null && o.unshift(ci(n, c, s)))
            : i || ((c = qe(n, a)), c != null && o.push(ci(n, c, s)))),
          (n = n.return));
      }
      o.length !== 0 && e.push({ event: t, listeners: o });
    }
    var fi = /\r\n?/g,
      pi = /\u0000|\uFFFD/g;
    function mi(e) {
      return (typeof e == `string` ? e : `` + e)
        .replace(
          fi,
          `
`,
        )
        .replace(pi, ``);
    }
    function hi(e, t, n) {
      if (((t = mi(t)), mi(e) !== t && n)) throw Error(r(425));
    }
    function gi() {}
    var _i = null,
      vi = null;
    function yi(e, t) {
      return (
        e === `textarea` ||
        e === `noscript` ||
        typeof t.children == `string` ||
        typeof t.children == `number` ||
        (typeof t.dangerouslySetInnerHTML == `object` &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var bi = typeof setTimeout == `function` ? setTimeout : void 0,
      xi = typeof clearTimeout == `function` ? clearTimeout : void 0,
      Si = typeof Promise == `function` ? Promise : void 0,
      Ci =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : Si === void 0
            ? bi
            : function (e) {
                return Si.resolve(null).then(e).catch(wi);
              };
    function wi(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Ti(e, t) {
      var n = t,
        r = 0;
      do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8)) {
          if (((n = i.data), n === `/$`)) {
            if (r === 0) {
              (e.removeChild(i), un(t));
              return;
            }
            r--;
          } else (n !== `$` && n !== `$?` && n !== `$!`) || r++;
        }
        n = i;
      } while (n);
      un(t);
    }
    function Ei(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (((t = e.data), t === `$` || t === `$!` || t === `$?`)) break;
          if (t === `/$`) return null;
        }
      }
      return e;
    }
    function Di(e) {
      e = e.previousSibling;
      for (var t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === `$` || n === `$!` || n === `$?`) {
            if (t === 0) return e;
            t--;
          } else n === `/$` && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var Oi = Math.random().toString(36).slice(2),
      ki = `__reactFiber$` + Oi,
      Ai = `__reactProps$` + Oi,
      ji = `__reactContainer$` + Oi,
      Mi = `__reactEvents$` + Oi,
      Ni = `__reactListeners$` + Oi,
      Pi = `__reactHandles$` + Oi;
    function Fi(e) {
      var t = e[ki];
      if (t) return t;
      for (var n = e.parentNode; n;) {
        if ((t = n[ji] || n[ki])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = Di(e); e !== null;) {
              if ((n = e[ki])) return n;
              e = Di(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function Ii(e) {
      return (
        (e = e[ki] || e[ji]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function Li(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(r(33));
    }
    function Ri(e) {
      return e[Ai] || null;
    }
    var zi = [],
      Bi = -1;
    function Vi(e) {
      return { current: e };
    }
    function Hi(e) {
      0 > Bi || ((e.current = zi[Bi]), (zi[Bi] = null), Bi--);
    }
    function Ui(e, t) {
      (Bi++, (zi[Bi] = e.current), (e.current = t));
    }
    var Wi = {},
      Gi = Vi(Wi),
      Ki = Vi(!1),
      qi = Wi;
    function Ji(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Wi;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {},
        a;
      for (a in n) i[a] = t[a];
      return (
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
      );
    }
    function Yi(e) {
      return ((e = e.childContextTypes), e != null);
    }
    function Xi() {
      (Hi(Ki), Hi(Gi));
    }
    function Zi(e, t, n) {
      if (Gi.current !== Wi) throw Error(r(168));
      (Ui(Gi, t), Ui(Ki, n));
    }
    function Qi(e, t, n) {
      var i = e.stateNode;
      if (((t = t.childContextTypes), typeof i.getChildContext != `function`))
        return n;
      for (var a in ((i = i.getChildContext()), i))
        if (!(a in t)) throw Error(r(108, oe(e) || `Unknown`, a));
      return L({}, n, i);
    }
    function $i(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          Wi),
        (qi = Gi.current),
        Ui(Gi, e),
        Ui(Ki, Ki.current),
        !0
      );
    }
    function ea(e, t, n) {
      var i = e.stateNode;
      if (!i) throw Error(r(169));
      (n
        ? ((e = Qi(e, t, qi)),
          (i.__reactInternalMemoizedMergedChildContext = e),
          Hi(Ki),
          Hi(Gi),
          Ui(Gi, e))
        : Hi(Ki),
        Ui(Ki, n));
    }
    var ta = null,
      na = !1,
      ra = !1;
    function ia(e) {
      ta === null ? (ta = [e]) : ta.push(e);
    }
    function aa(e) {
      ((na = !0), ia(e));
    }
    function oa() {
      if (!ra && ta !== null) {
        ra = !0;
        var e = 0,
          t = H;
        try {
          var n = ta;
          for (H = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          ((ta = null), (na = !1));
        } catch (t) {
          throw (ta !== null && (ta = ta.slice(e + 1)), ut(gt, oa), t);
        } finally {
          ((H = t), (ra = !1));
        }
      }
      return null;
    }
    var sa = [],
      ca = 0,
      la = null,
      ua = 0,
      da = [],
      fa = 0,
      pa = null,
      ma = 1,
      ha = ``;
    function ga(e, t) {
      ((sa[ca++] = ua), (sa[ca++] = la), (la = e), (ua = t));
    }
    function _a(e, t, n) {
      ((da[fa++] = ma), (da[fa++] = ha), (da[fa++] = pa), (pa = e));
      var r = ma;
      e = ha;
      var i = 32 - wt(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - wt(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        ((a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          (ma = (1 << (32 - wt(t) + i)) | (n << i) | r),
          (ha = a + e));
      } else ((ma = (1 << a) | (n << i) | r), (ha = e));
    }
    function va(e) {
      e.return !== null && (ga(e, 1), _a(e, 1, 0));
    }
    function ya(e) {
      for (; e === la;)
        ((la = sa[--ca]), (sa[ca] = null), (ua = sa[--ca]), (sa[ca] = null));
      for (; e === pa;)
        ((pa = da[--fa]),
          (da[fa] = null),
          (ha = da[--fa]),
          (da[fa] = null),
          (ma = da[--fa]),
          (da[fa] = null));
    }
    var ba = null,
      xa = null,
      Sa = !1,
      Ca = null;
    function wa(e, t) {
      var n = ql(5, null, null, 0);
      ((n.elementType = `DELETED`),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
    }
    function Ta(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null &&
              ((e.stateNode = t), (ba = e), (xa = Ei(t.firstChild)), !0)
          );
        case 6:
          return (
            (t = e.pendingProps === `` || t.nodeType !== 3 ? null : t),
            t !== null && ((e.stateNode = t), (ba = e), (xa = null), !0)
          );
        case 13:
          return (
            (t = t.nodeType === 8 ? t : null),
            t !== null &&
              ((n = pa === null ? null : { id: ma, overflow: ha }),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = ql(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (ba = e),
              (xa = null),
              !0)
          );
        default:
          return !1;
      }
    }
    function Ea(e) {
      return !!(e.mode & 1) && !(e.flags & 128);
    }
    function Da(e) {
      if (Sa) {
        var t = xa;
        if (t) {
          var n = t;
          if (!Ta(e, t)) {
            if (Ea(e)) throw Error(r(418));
            t = Ei(n.nextSibling);
            var i = ba;
            t && Ta(e, t)
              ? wa(i, n)
              : ((e.flags = (e.flags & -4097) | 2), (Sa = !1), (ba = e));
          }
        } else {
          if (Ea(e)) throw Error(r(418));
          ((e.flags = (e.flags & -4097) | 2), (Sa = !1), (ba = e));
        }
      }
    }
    function Oa(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
      )
        e = e.return;
      ba = e;
    }
    function ka(e) {
      if (e !== ba) return !1;
      if (!Sa) return (Oa(e), (Sa = !0), !1);
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== `head` && t !== `body` && !yi(e.type, e.memoizedProps))),
        (t &&= xa))
      ) {
        if (Ea(e)) throw (Aa(), Error(r(418)));
        for (; t;) (wa(e, t), (t = Ei(t.nextSibling)));
      }
      if ((Oa(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(r(317));
        a: {
          for (e = e.nextSibling, t = 0; e;) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === `/$`) {
                if (t === 0) {
                  xa = Ei(e.nextSibling);
                  break a;
                }
                t--;
              } else (n !== `$` && n !== `$!` && n !== `$?`) || t++;
            }
            e = e.nextSibling;
          }
          xa = null;
        }
      } else xa = ba ? Ei(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Aa() {
      for (var e = xa; e;) e = Ei(e.nextSibling);
    }
    function ja() {
      ((xa = ba = null), (Sa = !1));
    }
    function Ma(e) {
      Ca === null ? (Ca = [e]) : Ca.push(e);
    }
    var Na = C.ReactCurrentBatchConfig;
    function Pa(e, t, n) {
      if (
        ((e = n.ref),
        e !== null && typeof e != `function` && typeof e != `object`)
      ) {
        if (n._owner) {
          if (((n = n._owner), n)) {
            if (n.tag !== 1) throw Error(r(309));
            var i = n.stateNode;
          }
          if (!i) throw Error(r(147, e));
          var a = i,
            o = `` + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == `function` &&
            t.ref._stringRef === o
            ? t.ref
            : ((t = function (e) {
                var t = a.refs;
                e === null ? delete t[o] : (t[o] = e);
              }),
              (t._stringRef = o),
              t);
        }
        if (typeof e != `string`) throw Error(r(284));
        if (!n._owner) throw Error(r(290, e));
      }
      return e;
    }
    function Fa(e, t) {
      throw (
        (e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === `[object Object]`
              ? `object with keys {` + Object.keys(t).join(`, `) + `}`
              : e,
          ),
        )
      );
    }
    function Ia(e) {
      var t = e._init;
      return t(e._payload);
    }
    function La(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; r !== null;) (t(n, r), (r = r.sibling));
        return null;
      }
      function i(e, t) {
        for (e = new Map(); t !== null;)
          (t.key === null ? e.set(t.index, t) : e.set(t.key, t),
            (t = t.sibling));
        return e;
      }
      function a(e, t) {
        return ((e = Xl(e, t)), (e.index = 0), (e.sibling = null), e);
      }
      function o(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              r === null
                ? ((t.flags |= 2), n)
                : ((r = r.index), r < n ? ((t.flags |= 2), n) : r))
            : ((t.flags |= 1048576), n)
        );
      }
      function s(t) {
        return (e && t.alternate === null && (t.flags |= 2), t);
      }
      function c(e, t, n, r) {
        return t === null || t.tag !== 6
          ? ((t = $l(n, e.mode, r)), (t.return = e), t)
          : ((t = a(t, n)), (t.return = e), t);
      }
      function l(e, t, n, r) {
        var i = n.type;
        return i === E
          ? d(e, t, n.props.children, r, n.key)
          : t !== null &&
              (t.elementType === i ||
                (typeof i == `object` &&
                  i &&
                  i.$$typeof === F &&
                  Ia(i) === t.type))
            ? ((r = a(t, n.props)), (r.ref = Pa(e, t, n)), (r.return = e), r)
            : ((r = Zl(n.type, n.key, n.props, null, e.mode, r)),
              (r.ref = Pa(e, t, n)),
              (r.return = e),
              r);
      }
      function u(e, t, n, r) {
        return t === null ||
          t.tag !== 4 ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = eu(n, e.mode, r)), (t.return = e), t)
          : ((t = a(t, n.children || [])), (t.return = e), t);
      }
      function d(e, t, n, r, i) {
        return t === null || t.tag !== 7
          ? ((t = Ql(n, e.mode, r, i)), (t.return = e), t)
          : ((t = a(t, n)), (t.return = e), t);
      }
      function f(e, t, n) {
        if ((typeof t == `string` && t !== ``) || typeof t == `number`)
          return ((t = $l(`` + t, e.mode, n)), (t.return = e), t);
        if (typeof t == `object` && t) {
          switch (t.$$typeof) {
            case w:
              return (
                (n = Zl(t.type, t.key, t.props, null, e.mode, n)),
                (n.ref = Pa(e, null, t)),
                (n.return = e),
                n
              );
            case T:
              return ((t = eu(t, e.mode, n)), (t.return = e), t);
            case F:
              var r = t._init;
              return f(e, r(t._payload), n);
          }
          if (ve(t) || I(t))
            return ((t = Ql(t, e.mode, n, null)), (t.return = e), t);
          Fa(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var i = t === null ? null : t.key;
        if ((typeof n == `string` && n !== ``) || typeof n == `number`)
          return i === null ? c(e, t, `` + n, r) : null;
        if (typeof n == `object` && n) {
          switch (n.$$typeof) {
            case w:
              return n.key === i ? l(e, t, n, r) : null;
            case T:
              return n.key === i ? u(e, t, n, r) : null;
            case F:
              return ((i = n._init), p(e, t, i(n._payload), r));
          }
          if (ve(n) || I(n)) return i === null ? d(e, t, n, r, null) : null;
          Fa(e, n);
        }
        return null;
      }
      function m(e, t, n, r, i) {
        if ((typeof r == `string` && r !== ``) || typeof r == `number`)
          return ((e = e.get(n) || null), c(t, e, `` + r, i));
        if (typeof r == `object` && r) {
          switch (r.$$typeof) {
            case w:
              return (
                (e = e.get(r.key === null ? n : r.key) || null),
                l(t, e, r, i)
              );
            case T:
              return (
                (e = e.get(r.key === null ? n : r.key) || null),
                u(t, e, r, i)
              );
            case F:
              var a = r._init;
              return m(e, t, n, a(r._payload), i);
          }
          if (ve(r) || I(r))
            return ((e = e.get(n) || null), d(t, e, r, i, null));
          Fa(t, r);
        }
        return null;
      }
      function h(r, a, s, c) {
        for (
          var l = null, u = null, d = a, h = (a = 0), g = null;
          d !== null && h < s.length;
          h++
        ) {
          d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
          var _ = p(r, d, s[h], c);
          if (_ === null) {
            d === null && (d = g);
            break;
          }
          (e && d && _.alternate === null && t(r, d),
            (a = o(_, a, h)),
            u === null ? (l = _) : (u.sibling = _),
            (u = _),
            (d = g));
        }
        if (h === s.length) return (n(r, d), Sa && ga(r, h), l);
        if (d === null) {
          for (; h < s.length; h++)
            ((d = f(r, s[h], c)),
              d !== null &&
                ((a = o(d, a, h)),
                u === null ? (l = d) : (u.sibling = d),
                (u = d)));
          return (Sa && ga(r, h), l);
        }
        for (d = i(r, d); h < s.length; h++)
          ((g = m(d, r, h, s[h], c)),
            g !== null &&
              (e &&
                g.alternate !== null &&
                d.delete(g.key === null ? h : g.key),
              (a = o(g, a, h)),
              u === null ? (l = g) : (u.sibling = g),
              (u = g)));
        return (
          e &&
            d.forEach(function (e) {
              return t(r, e);
            }),
          Sa && ga(r, h),
          l
        );
      }
      function g(a, s, c, l) {
        var u = I(c);
        if (typeof u != `function`) throw Error(r(150));
        if (((c = u.call(c)), c == null)) throw Error(r(151));
        for (
          var d = (u = null), h = s, g = (s = 0), _ = null, v = c.next();
          h !== null && !v.done;
          g++, v = c.next()
        ) {
          h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
          var y = p(a, h, v.value, l);
          if (y === null) {
            h === null && (h = _);
            break;
          }
          (e && h && y.alternate === null && t(a, h),
            (s = o(y, s, g)),
            d === null ? (u = y) : (d.sibling = y),
            (d = y),
            (h = _));
        }
        if (v.done) return (n(a, h), Sa && ga(a, g), u);
        if (h === null) {
          for (; !v.done; g++, v = c.next())
            ((v = f(a, v.value, l)),
              v !== null &&
                ((s = o(v, s, g)),
                d === null ? (u = v) : (d.sibling = v),
                (d = v)));
          return (Sa && ga(a, g), u);
        }
        for (h = i(a, h); !v.done; g++, v = c.next())
          ((v = m(h, a, g, v.value, l)),
            v !== null &&
              (e &&
                v.alternate !== null &&
                h.delete(v.key === null ? g : v.key),
              (s = o(v, s, g)),
              d === null ? (u = v) : (d.sibling = v),
              (d = v)));
        return (
          e &&
            h.forEach(function (e) {
              return t(a, e);
            }),
          Sa && ga(a, g),
          u
        );
      }
      function _(e, r, i, o) {
        if (
          (typeof i == `object` &&
            i &&
            i.type === E &&
            i.key === null &&
            (i = i.props.children),
          typeof i == `object` && i)
        ) {
          switch (i.$$typeof) {
            case w:
              a: {
                for (var c = i.key, l = r; l !== null;) {
                  if (l.key === c) {
                    if (((c = i.type), c === E)) {
                      if (l.tag === 7) {
                        (n(e, l.sibling),
                          (r = a(l, i.props.children)),
                          (r.return = e),
                          (e = r));
                        break a;
                      }
                    } else if (
                      l.elementType === c ||
                      (typeof c == `object` &&
                        c &&
                        c.$$typeof === F &&
                        Ia(c) === l.type)
                    ) {
                      (n(e, l.sibling),
                        (r = a(l, i.props)),
                        (r.ref = Pa(e, l, i)),
                        (r.return = e),
                        (e = r));
                      break a;
                    }
                    n(e, l);
                    break;
                  }
                  (t(e, l), (l = l.sibling));
                }
                i.type === E
                  ? ((r = Ql(i.props.children, e.mode, o, i.key)),
                    (r.return = e),
                    (e = r))
                  : ((o = Zl(i.type, i.key, i.props, null, e.mode, o)),
                    (o.ref = Pa(e, r, i)),
                    (o.return = e),
                    (e = o));
              }
              return s(e);
            case T:
              a: {
                for (l = i.key; r !== null;) {
                  if (r.key === l) {
                    if (
                      r.tag === 4 &&
                      r.stateNode.containerInfo === i.containerInfo &&
                      r.stateNode.implementation === i.implementation
                    ) {
                      (n(e, r.sibling),
                        (r = a(r, i.children || [])),
                        (r.return = e),
                        (e = r));
                      break a;
                    }
                    n(e, r);
                    break;
                  }
                  (t(e, r), (r = r.sibling));
                }
                ((r = eu(i, e.mode, o)), (r.return = e), (e = r));
              }
              return s(e);
            case F:
              return ((l = i._init), _(e, r, l(i._payload), o));
          }
          if (ve(i)) return h(e, r, i, o);
          if (I(i)) return g(e, r, i, o);
          Fa(e, i);
        }
        return (typeof i == `string` && i !== ``) || typeof i == `number`
          ? ((i = `` + i),
            r !== null && r.tag === 6
              ? (n(e, r.sibling), (r = a(r, i)), (r.return = e), (e = r))
              : (n(e, r), (r = $l(i, e.mode, o)), (r.return = e), (e = r)),
            s(e))
          : n(e, r);
      }
      return _;
    }
    var Ra = La(!0),
      za = La(!1),
      Ba = Vi(null),
      Va = null,
      Ha = null,
      Ua = null;
    function Wa() {
      Ua = Ha = Va = null;
    }
    function q(e) {
      var t = Ba.current;
      (Hi(Ba), (e._currentValue = t));
    }
    function Ga(e, t, n) {
      for (; e !== null;) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) === t
            ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
            : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function Ka(e, t) {
      ((Va = e),
        (Ua = Ha = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          ((e.lanes & t) !== 0 && (Ps = !0), (e.firstContext = null)));
    }
    function qa(e) {
      var t = e._currentValue;
      if (Ua !== e) {
        if (((e = { context: e, memoizedValue: t, next: null }), Ha === null)) {
          if (Va === null) throw Error(r(308));
          ((Ha = e), (Va.dependencies = { lanes: 0, firstContext: e }));
        } else Ha = Ha.next = e;
      }
      return t;
    }
    var Ja = null;
    function Ya(e) {
      Ja === null ? (Ja = [e]) : Ja.push(e);
    }
    function Xa(e, t, n, r) {
      var i = t.interleaved;
      return (
        i === null ? ((n.next = n), Ya(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        Za(e, r)
      );
    }
    function Za(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
        ((e.childLanes |= t),
          (n = e.alternate),
          n !== null && (n.childLanes |= t),
          (n = e),
          (e = e.return));
      return n.tag === 3 ? n.stateNode : null;
    }
    var Qa = !1;
    function $a(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function eo(e, t) {
      ((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          }));
    }
    function to(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function no(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), Q & 2)) {
        var i = r.pending;
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          Za(e, n)
        );
      }
      return (
        (i = r.interleaved),
        i === null ? ((t.next = t), Ya(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        Za(e, n)
      );
    }
    function ro(e, t, n) {
      if (((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194240))) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), zt(e, n));
      }
    }
    function io(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          a = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null,
            };
            (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
          } while (n !== null);
          a === null ? (i = a = t) : (a = a.next = t);
        } else i = a = t;
        ((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: a,
          shared: r.shared,
          effects: r.effects,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    function ao(e, t, n, r) {
      var i = e.updateQueue;
      Qa = !1;
      var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending;
      if (s !== null) {
        i.shared.pending = null;
        var c = s,
          l = c.next;
        ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
        var u = e.alternate;
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== o &&
            (s === null ? (u.firstBaseUpdate = l) : (s.next = l),
            (u.lastBaseUpdate = c)));
      }
      if (a !== null) {
        var d = i.baseState;
        ((o = 0), (u = l = c = null), (s = a));
        do {
          var f = s.lane,
            p = s.eventTime;
          if ((r & f) === f) {
            u !== null &&
              (u = u.next =
                {
                  eventTime: p,
                  lane: 0,
                  tag: s.tag,
                  payload: s.payload,
                  callback: s.callback,
                  next: null,
                });
            a: {
              var m = e,
                h = s;
              switch (((f = t), (p = n), h.tag)) {
                case 1:
                  if (((m = h.payload), typeof m == `function`)) {
                    d = m.call(p, d, f);
                    break a;
                  }
                  d = m;
                  break a;
                case 3:
                  m.flags = (m.flags & -65537) | 128;
                case 0:
                  if (
                    ((m = h.payload),
                    (f = typeof m == `function` ? m.call(p, d, f) : m),
                    f == null)
                  )
                    break a;
                  d = L({}, d, f);
                  break a;
                case 2:
                  Qa = !0;
              }
            }
            s.callback !== null &&
              s.lane !== 0 &&
              ((e.flags |= 64),
              (f = i.effects),
              f === null ? (i.effects = [s]) : f.push(s));
          } else
            ((p = {
              eventTime: p,
              lane: f,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            }),
              u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
              (o |= f));
          if (((s = s.next), s === null)) {
            if (((s = i.shared.pending), s === null)) break;
            ((f = s),
              (s = f.next),
              (f.next = null),
              (i.lastBaseUpdate = f),
              (i.shared.pending = null));
          }
        } while (1);
        if (
          (u === null && (c = d),
          (i.baseState = c),
          (i.firstBaseUpdate = l),
          (i.lastBaseUpdate = u),
          (t = i.shared.interleaved),
          t !== null)
        ) {
          i = t;
          do ((o |= i.lane), (i = i.next));
          while (i !== t);
        } else a === null && (i.shared.lanes = 0);
        ((Yc |= o), (e.lanes = o), (e.memoizedState = d));
      }
    }
    function oo(e, t, n) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var i = e[t],
            a = i.callback;
          if (a !== null) {
            if (((i.callback = null), (i = n), typeof a != `function`))
              throw Error(r(191, a));
            a.call(i);
          }
        }
    }
    var so = {},
      co = Vi(so),
      lo = Vi(so),
      uo = Vi(so);
    function fo(e) {
      if (e === so) throw Error(r(174));
      return e;
    }
    function po(e, t) {
      switch ((Ui(uo, t), Ui(lo, e), Ui(co, so), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : we(null, ``);
          break;
        default:
          ((e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = we(t, e)));
      }
      (Hi(co), Ui(co, t));
    }
    function mo() {
      (Hi(co), Hi(lo), Hi(uo));
    }
    function ho(e) {
      fo(uo.current);
      var t = fo(co.current),
        n = we(t, e.type);
      t !== n && (Ui(lo, e), Ui(co, n));
    }
    function go(e) {
      lo.current === e && (Hi(co), Hi(lo));
    }
    var _o = Vi(0);
    function vo(e) {
      for (var t = e; t !== null;) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (
            n !== null &&
            ((n = n.dehydrated),
            n === null || n.data === `$?` || n.data === `$!`)
          )
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var yo = [];
    function bo() {
      for (var e = 0; e < yo.length; e++)
        yo[e]._workInProgressVersionPrimary = null;
      yo.length = 0;
    }
    var xo = C.ReactCurrentDispatcher,
      So = C.ReactCurrentBatchConfig,
      Co = 0,
      wo = null,
      J = null,
      To = null,
      Eo = !1,
      Do = !1,
      Oo = 0,
      ko = 0;
    function Ao() {
      throw Error(r(321));
    }
    function jo(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!Tr(e[n], t[n])) return !1;
      return !0;
    }
    function Mo(e, t, n, i, a, o) {
      if (
        ((Co = o),
        (wo = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (xo.current = e === null || e.memoizedState === null ? hs : gs),
        (e = n(i, a)),
        Do)
      ) {
        o = 0;
        do {
          if (((Do = !1), (Oo = 0), 25 <= o)) throw Error(r(301));
          ((o += 1),
            (To = J = null),
            (t.updateQueue = null),
            (xo.current = _s),
            (e = n(i, a)));
        } while (Do);
      }
      if (
        ((xo.current = ms),
        (t = J !== null && J.next !== null),
        (Co = 0),
        (To = J = wo = null),
        (Eo = !1),
        t)
      )
        throw Error(r(300));
      return e;
    }
    function No() {
      var e = Oo !== 0;
      return ((Oo = 0), e);
    }
    function Po() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (
        To === null ? (wo.memoizedState = To = e) : (To = To.next = e),
        To
      );
    }
    function Fo() {
      if (J === null) {
        var e = wo.alternate;
        e = e === null ? null : e.memoizedState;
      } else e = J.next;
      var t = To === null ? wo.memoizedState : To.next;
      if (t !== null) ((To = t), (J = e));
      else {
        if (e === null) throw Error(r(310));
        ((J = e),
          (e = {
            memoizedState: J.memoizedState,
            baseState: J.baseState,
            baseQueue: J.baseQueue,
            queue: J.queue,
            next: null,
          }),
          To === null ? (wo.memoizedState = To = e) : (To = To.next = e));
      }
      return To;
    }
    function Io(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function Lo(e) {
      var t = Fo(),
        n = t.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = e;
      var i = J,
        a = i.baseQueue,
        o = n.pending;
      if (o !== null) {
        if (a !== null) {
          var s = a.next;
          ((a.next = o.next), (o.next = s));
        }
        ((i.baseQueue = a = o), (n.pending = null));
      }
      if (a !== null) {
        ((o = a.next), (i = i.baseState));
        var c = (s = null),
          l = null,
          u = o;
        do {
          var d = u.lane;
          if ((Co & d) === d)
            (l !== null &&
              (l = l.next =
                {
                  lane: 0,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                }),
              (i = u.hasEagerState ? u.eagerState : e(i, u.action)));
          else {
            var f = {
              lane: d,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            };
            (l === null ? ((c = l = f), (s = i)) : (l = l.next = f),
              (wo.lanes |= d),
              (Yc |= d));
          }
          u = u.next;
        } while (u !== null && u !== o);
        (l === null ? (s = i) : (l.next = c),
          Tr(i, t.memoizedState) || (Ps = !0),
          (t.memoizedState = i),
          (t.baseState = s),
          (t.baseQueue = l),
          (n.lastRenderedState = i));
      }
      if (((e = n.interleaved), e !== null)) {
        a = e;
        do ((o = a.lane), (wo.lanes |= o), (Yc |= o), (a = a.next));
        while (a !== e);
      } else a === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function Ro(e) {
      var t = Fo(),
        n = t.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = e;
      var i = n.dispatch,
        a = n.pending,
        o = t.memoizedState;
      if (a !== null) {
        n.pending = null;
        var s = (a = a.next);
        do ((o = e(o, s.action)), (s = s.next));
        while (s !== a);
        (Tr(o, t.memoizedState) || (Ps = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (n.lastRenderedState = o));
      }
      return [o, i];
    }
    function zo() {}
    function Bo(e, t) {
      var n = wo,
        i = Fo(),
        a = t(),
        o = !Tr(i.memoizedState, a);
      if (
        (o && ((i.memoizedState = a), (Ps = !0)),
        (i = i.queue),
        Qo(Uo.bind(null, n, i, e), [e]),
        i.getSnapshot !== t || o || (To !== null && To.memoizedState.tag & 1))
      ) {
        if (
          ((n.flags |= 2048),
          qo(9, Ho.bind(null, n, i, a, t), void 0, null),
          Hc === null)
        )
          throw Error(r(349));
        Co & 30 || Vo(n, t, a);
      }
      return a;
    }
    function Vo(e, t, n) {
      ((e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = wo.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (wo.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function Ho(e, t, n, r) {
      ((t.value = n), (t.getSnapshot = r), Wo(t) && Go(e));
    }
    function Uo(e, t, n) {
      return n(function () {
        Wo(t) && Go(e);
      });
    }
    function Wo(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Tr(e, n);
      } catch {
        return !0;
      }
    }
    function Go(e) {
      var t = Za(e, 1);
      t !== null && hl(t, e, 1, -1);
    }
    function Ko(e) {
      var t = Po();
      return (
        typeof e == `function` && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Io,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = us.bind(null, wo, e)),
        [t.memoizedState, e]
      );
    }
    function qo(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = wo.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (wo.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function Jo() {
      return Fo().memoizedState;
    }
    function Yo(e, t, n, r) {
      var i = Po();
      ((wo.flags |= e),
        (i.memoizedState = qo(1 | t, n, void 0, r === void 0 ? null : r)));
    }
    function Xo(e, t, n, r) {
      var i = Fo();
      r = r === void 0 ? null : r;
      var a = void 0;
      if (J !== null) {
        var o = J.memoizedState;
        if (((a = o.destroy), r !== null && jo(r, o.deps))) {
          i.memoizedState = qo(t, n, a, r);
          return;
        }
      }
      ((wo.flags |= e), (i.memoizedState = qo(1 | t, n, a, r)));
    }
    function Zo(e, t) {
      return Yo(8390656, 8, e, t);
    }
    function Qo(e, t) {
      return Xo(2048, 8, e, t);
    }
    function $o(e, t) {
      return Xo(4, 2, e, t);
    }
    function es(e, t) {
      return Xo(4, 4, e, t);
    }
    function ts(e, t) {
      if (typeof t == `function`)
        return (
          (e = e()),
          t(e),
          function () {
            t(null);
          }
        );
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function ns(e, t, n) {
      return (
        (n = n == null ? null : n.concat([e])),
        Xo(4, 4, ts.bind(null, t, e), n)
      );
    }
    function rs() {}
    function is(e, t) {
      var n = Fo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && jo(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function as(e, t) {
      var n = Fo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && jo(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function os(e, t, n) {
      return Co & 21
        ? (Tr(n, t) ||
            ((n = Ft()), (wo.lanes |= n), (Yc |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (Ps = !0)),
          (e.memoizedState = n));
    }
    function ss(e, t) {
      var n = H;
      ((H = n !== 0 && 4 > n ? n : 4), e(!0));
      var r = So.transition;
      So.transition = {};
      try {
        (e(!1), t());
      } finally {
        ((H = n), (So.transition = r));
      }
    }
    function cs() {
      return Fo().memoizedState;
    }
    function ls(e, t, n) {
      var r = ml(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        ds(e))
      )
        fs(t, n);
      else if (((n = Xa(e, t, n, r)), n !== null)) {
        var i = pl();
        (hl(n, e, r, i), ps(n, t, r));
      }
    }
    function us(e, t, n) {
      var r = ml(e),
        i = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (ds(e)) fs(t, i);
      else {
        var a = e.alternate;
        if (
          e.lanes === 0 &&
          (a === null || a.lanes === 0) &&
          ((a = t.lastRenderedReducer), a !== null)
        )
          try {
            var o = t.lastRenderedState,
              s = a(o, n);
            if (((i.hasEagerState = !0), (i.eagerState = s), Tr(s, o))) {
              var c = t.interleaved;
              (c === null
                ? ((i.next = i), Ya(t))
                : ((i.next = c.next), (c.next = i)),
                (t.interleaved = i));
              return;
            }
          } catch {}
        ((n = Xa(e, t, i, r)),
          n !== null && ((i = pl()), hl(n, e, r, i), ps(n, t, r)));
      }
    }
    function ds(e) {
      var t = e.alternate;
      return e === wo || (t !== null && t === wo);
    }
    function fs(e, t) {
      Do = Eo = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t));
    }
    function ps(e, t, n) {
      if (n & 4194240) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), zt(e, n));
      }
    }
    var ms = {
        readContext: qa,
        useCallback: Ao,
        useContext: Ao,
        useEffect: Ao,
        useImperativeHandle: Ao,
        useInsertionEffect: Ao,
        useLayoutEffect: Ao,
        useMemo: Ao,
        useReducer: Ao,
        useRef: Ao,
        useState: Ao,
        useDebugValue: Ao,
        useDeferredValue: Ao,
        useTransition: Ao,
        useMutableSource: Ao,
        useSyncExternalStore: Ao,
        useId: Ao,
        unstable_isNewReconciler: !1,
      },
      hs = {
        readContext: qa,
        useCallback: function (e, t) {
          return ((Po().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: qa,
        useEffect: Zo,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = n == null ? null : n.concat([e])),
            Yo(4194308, 4, ts.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Yo(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Yo(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Po();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = Po();
          return (
            (t = n === void 0 ? t : n(t)),
            (r.memoizedState = r.baseState = t),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }),
            (r.queue = e),
            (e = e.dispatch = ls.bind(null, wo, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Po();
          return ((e = { current: e }), (t.memoizedState = e));
        },
        useState: Ko,
        useDebugValue: rs,
        useDeferredValue: function (e) {
          return (Po().memoizedState = e);
        },
        useTransition: function () {
          var e = Ko(!1),
            t = e[0];
          return ((e = ss.bind(null, e[1])), (Po().memoizedState = e), [t, e]);
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var i = wo,
            a = Po();
          if (Sa) {
            if (n === void 0) throw Error(r(407));
            n = n();
          } else {
            if (((n = t()), Hc === null)) throw Error(r(349));
            Co & 30 || Vo(i, t, n);
          }
          a.memoizedState = n;
          var o = { value: n, getSnapshot: t };
          return (
            (a.queue = o),
            Zo(Uo.bind(null, i, o, e), [e]),
            (i.flags |= 2048),
            qo(9, Ho.bind(null, i, o, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = Po(),
            t = Hc.identifierPrefix;
          if (Sa) {
            var n = ha,
              r = ma;
            ((n = (r & ~(1 << (32 - wt(r) - 1))).toString(32) + n),
              (t = `:` + t + `R` + n),
              (n = Oo++),
              0 < n && (t += `H` + n.toString(32)),
              (t += `:`));
          } else ((n = ko++), (t = `:` + t + `r` + n.toString(32) + `:`));
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      gs = {
        readContext: qa,
        useCallback: is,
        useContext: qa,
        useEffect: Qo,
        useImperativeHandle: ns,
        useInsertionEffect: $o,
        useLayoutEffect: es,
        useMemo: as,
        useReducer: Lo,
        useRef: Jo,
        useState: function () {
          return Lo(Io);
        },
        useDebugValue: rs,
        useDeferredValue: function (e) {
          return os(Fo(), J.memoizedState, e);
        },
        useTransition: function () {
          return [Lo(Io)[0], Fo().memoizedState];
        },
        useMutableSource: zo,
        useSyncExternalStore: Bo,
        useId: cs,
        unstable_isNewReconciler: !1,
      },
      _s = {
        readContext: qa,
        useCallback: is,
        useContext: qa,
        useEffect: Qo,
        useImperativeHandle: ns,
        useInsertionEffect: $o,
        useLayoutEffect: es,
        useMemo: as,
        useReducer: Ro,
        useRef: Jo,
        useState: function () {
          return Ro(Io);
        },
        useDebugValue: rs,
        useDeferredValue: function (e) {
          var t = Fo();
          return J === null ? (t.memoizedState = e) : os(t, J.memoizedState, e);
        },
        useTransition: function () {
          return [Ro(Io)[0], Fo().memoizedState];
        },
        useMutableSource: zo,
        useSyncExternalStore: Bo,
        useId: cs,
        unstable_isNewReconciler: !1,
      };
    function vs(e, t) {
      if (e && e.defaultProps) {
        for (var n in ((t = L({}, t)), (e = e.defaultProps), e))
          t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    function ys(e, t, n, r) {
      ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : L({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var bs = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? it(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = pl(),
          i = ml(e),
          a = to(r, i);
        ((a.payload = t),
          n != null && (a.callback = n),
          (t = no(e, a, i)),
          t !== null && (hl(t, e, i, r), ro(t, e, i)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = pl(),
          i = ml(e),
          a = to(r, i);
        ((a.tag = 1),
          (a.payload = t),
          n != null && (a.callback = n),
          (t = no(e, a, i)),
          t !== null && (hl(t, e, i, r), ro(t, e, i)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = pl(),
          r = ml(e),
          i = to(n, r);
        ((i.tag = 2),
          t != null && (i.callback = t),
          (t = no(e, i, r)),
          t !== null && (hl(t, e, r, n), ro(t, e, r)));
      },
    };
    function xs(e, t, n, r, i, a, o) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == `function`
          ? e.shouldComponentUpdate(r, a, o)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Er(n, r) || !Er(i, a)
            : !0
      );
    }
    function Ss(e, t, n) {
      var r = !1,
        i = Wi,
        a = t.contextType;
      return (
        typeof a == `object` && a
          ? (a = qa(a))
          : ((i = Yi(t) ? qi : Gi.current),
            (r = t.contextTypes),
            (a = (r = r != null) ? Ji(e, i) : Wi)),
        (t = new t(n, a)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = bs),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = i),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        t
      );
    }
    function Cs(e, t, n, r) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == `function` &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == `function` &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && bs.enqueueReplaceState(t, t.state, null));
    }
    function ws(e, t, n, r) {
      var i = e.stateNode;
      ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), $a(e));
      var a = t.contextType;
      (typeof a == `object` && a
        ? (i.context = qa(a))
        : ((a = Yi(t) ? qi : Gi.current), (i.context = Ji(e, a))),
        (i.state = e.memoizedState),
        (a = t.getDerivedStateFromProps),
        typeof a == `function` && (ys(e, t, a, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == `function` ||
          typeof i.getSnapshotBeforeUpdate == `function` ||
          (typeof i.UNSAFE_componentWillMount != `function` &&
            typeof i.componentWillMount != `function`) ||
          ((t = i.state),
          typeof i.componentWillMount == `function` && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == `function` &&
            i.UNSAFE_componentWillMount(),
          t !== i.state && bs.enqueueReplaceState(i, i.state, null),
          ao(e, n, i, r),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == `function` && (e.flags |= 4194308));
    }
    function Ts(e, t) {
      try {
        var n = ``,
          r = t;
        do ((n += ie(r)), (r = r.return));
        while (r);
        var i = n;
      } catch (e) {
        i =
          `
Error generating stack: ` +
          e.message +
          `
` +
          e.stack;
      }
      return { value: e, source: t, stack: i, digest: null };
    }
    function Es(e, t, n) {
      return { value: e, source: null, stack: n ?? null, digest: t ?? null };
    }
    function Ds(e, t) {
      try {
        console.error(t.value);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    var Os = typeof WeakMap == `function` ? WeakMap : Map;
    function ks(e, t, n) {
      ((n = to(-1, n)), (n.tag = 3), (n.payload = { element: null }));
      var r = t.value;
      return (
        (n.callback = function () {
          (rl || ((rl = !0), (il = r)), Ds(e, t));
        }),
        n
      );
    }
    function As(e, t, n) {
      ((n = to(-1, n)), (n.tag = 3));
      var r = e.type.getDerivedStateFromError;
      if (typeof r == `function`) {
        var i = t.value;
        ((n.payload = function () {
          return r(i);
        }),
          (n.callback = function () {
            Ds(e, t);
          }));
      }
      var a = e.stateNode;
      return (
        a !== null &&
          typeof a.componentDidCatch == `function` &&
          (n.callback = function () {
            (Ds(e, t),
              typeof r != `function` &&
                (al === null ? (al = new Set([this])) : al.add(this)));
            var n = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: n === null ? `` : n,
            });
          }),
        n
      );
    }
    function js(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new Os();
        var i = new Set();
        r.set(t, i);
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
      i.has(n) || (i.add(n), (e = Bl.bind(null, e, t, n)), t.then(e, e));
    }
    function Y(e) {
      do {
        var t;
        if (
          ((t = e.tag === 13) &&
            ((t = e.memoizedState), (t = t === null || t.dehydrated !== null)),
          t)
        )
          return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function Ms(e, t, n, r, i) {
      return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
              (n.flags |= 131072),
              (n.flags &= -52805),
              n.tag === 1 &&
                (n.alternate === null
                  ? (n.tag = 17)
                  : ((t = to(-1, 1)), (t.tag = 2), no(n, t, 1))),
              (n.lanes |= 1)),
          e);
    }
    var Ns = C.ReactCurrentOwner,
      Ps = !1;
    function Fs(e, t, n, r) {
      t.child = e === null ? za(t, null, n, r) : Ra(t, e.child, n, r);
    }
    function Is(e, t, n, r, i) {
      n = n.render;
      var a = t.ref;
      return (
        Ka(t, i),
        (r = Mo(e, t, n, r, a, i)),
        (n = No()),
        e !== null && !Ps
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~i),
            nc(e, t, i))
          : (Sa && n && va(t), (t.flags |= 1), Fs(e, t, r, i), t.child)
      );
    }
    function Ls(e, t, n, r, i) {
      if (e === null) {
        var a = n.type;
        return typeof a == `function` &&
          !Jl(a) &&
          a.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = a), Rs(e, t, a, r, i))
          : ((e = Zl(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((a = e.child), (e.lanes & i) === 0)) {
        var o = a.memoizedProps;
        if (
          ((n = n.compare),
          (n = n === null ? Er : n),
          n(o, r) && e.ref === t.ref)
        )
          return nc(e, t, i);
      }
      return (
        (t.flags |= 1),
        (e = Xl(a, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function Rs(e, t, n, r, i) {
      if (e !== null) {
        var a = e.memoizedProps;
        if (Er(a, r) && e.ref === t.ref) {
          if (((Ps = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
            e.flags & 131072 && (Ps = !0);
          else return ((t.lanes = e.lanes), nc(e, t, i));
        }
      }
      return Vs(e, t, n, r, i);
    }
    function zs(e, t, n) {
      var r = t.pendingProps,
        i = r.children,
        a = e === null ? null : e.memoizedState;
      if (r.mode === `hidden`) {
        if (!(t.mode & 1))
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            Ui(Kc, Gc),
            (Gc |= n));
        else {
          if (!(n & 1073741824))
            return (
              (e = a === null ? n : a.baseLanes | n),
              (t.lanes = t.childLanes = 1073741824),
              (t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null,
              }),
              (t.updateQueue = null),
              Ui(Kc, Gc),
              (Gc |= e),
              null
            );
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = a === null ? n : a.baseLanes),
            Ui(Kc, Gc),
            (Gc |= r));
        }
      } else
        (a === null
          ? (r = n)
          : ((r = a.baseLanes | n), (t.memoizedState = null)),
          Ui(Kc, Gc),
          (Gc |= r));
      return (Fs(e, t, i, n), t.child);
    }
    function Bs(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function Vs(e, t, n, r, i) {
      var a = Yi(n) ? qi : Gi.current;
      return (
        (a = Ji(t, a)),
        Ka(t, i),
        (n = Mo(e, t, n, r, a, i)),
        (r = No()),
        e !== null && !Ps
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~i),
            nc(e, t, i))
          : (Sa && r && va(t), (t.flags |= 1), Fs(e, t, n, i), t.child)
      );
    }
    function Hs(e, t, n, r, i) {
      if (Yi(n)) {
        var a = !0;
        $i(t);
      } else a = !1;
      if ((Ka(t, i), t.stateNode === null))
        (tc(e, t), Ss(t, n, r), ws(t, n, r, i), (r = !0));
      else if (e === null) {
        var o = t.stateNode,
          s = t.memoizedProps;
        o.props = s;
        var c = o.context,
          l = n.contextType;
        typeof l == `object` && l
          ? (l = qa(l))
          : ((l = Yi(n) ? qi : Gi.current), (l = Ji(t, l)));
        var u = n.getDerivedStateFromProps,
          d =
            typeof u == `function` ||
            typeof o.getSnapshotBeforeUpdate == `function`;
        (d ||
          (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
            typeof o.componentWillReceiveProps != `function`) ||
          ((s !== r || c !== l) && Cs(t, o, r, l)),
          (Qa = !1));
        var f = t.memoizedState;
        ((o.state = f),
          ao(t, r, o, i),
          (c = t.memoizedState),
          s !== r || f !== c || Ki.current || Qa
            ? (typeof u == `function` &&
                (ys(t, n, u, r), (c = t.memoizedState)),
              (s = Qa || xs(t, n, s, r, f, c, l))
                ? (d ||
                    (typeof o.UNSAFE_componentWillMount != `function` &&
                      typeof o.componentWillMount != `function`) ||
                    (typeof o.componentWillMount == `function` &&
                      o.componentWillMount(),
                    typeof o.UNSAFE_componentWillMount == `function` &&
                      o.UNSAFE_componentWillMount()),
                  typeof o.componentDidMount == `function` &&
                    (t.flags |= 4194308))
                : (typeof o.componentDidMount == `function` &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = c)),
              (o.props = r),
              (o.state = c),
              (o.context = l),
              (r = s))
            : (typeof o.componentDidMount == `function` && (t.flags |= 4194308),
              (r = !1)));
      } else {
        ((o = t.stateNode),
          eo(e, t),
          (s = t.memoizedProps),
          (l = t.type === t.elementType ? s : vs(t.type, s)),
          (o.props = l),
          (d = t.pendingProps),
          (f = o.context),
          (c = n.contextType),
          typeof c == `object` && c
            ? (c = qa(c))
            : ((c = Yi(n) ? qi : Gi.current), (c = Ji(t, c))));
        var p = n.getDerivedStateFromProps;
        ((u =
          typeof p == `function` ||
          typeof o.getSnapshotBeforeUpdate == `function`) ||
          (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
            typeof o.componentWillReceiveProps != `function`) ||
          ((s !== d || f !== c) && Cs(t, o, r, c)),
          (Qa = !1),
          (f = t.memoizedState),
          (o.state = f),
          ao(t, r, o, i));
        var m = t.memoizedState;
        s !== d || f !== m || Ki.current || Qa
          ? (typeof p == `function` && (ys(t, n, p, r), (m = t.memoizedState)),
            (l = Qa || xs(t, n, l, r, f, m, c) || !1)
              ? (u ||
                  (typeof o.UNSAFE_componentWillUpdate != `function` &&
                    typeof o.componentWillUpdate != `function`) ||
                  (typeof o.componentWillUpdate == `function` &&
                    o.componentWillUpdate(r, m, c),
                  typeof o.UNSAFE_componentWillUpdate == `function` &&
                    o.UNSAFE_componentWillUpdate(r, m, c)),
                typeof o.componentDidUpdate == `function` && (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate == `function` &&
                  (t.flags |= 1024))
              : (typeof o.componentDidUpdate != `function` ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate != `function` ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = m)),
            (o.props = r),
            (o.state = m),
            (o.context = c),
            (r = l))
          : (typeof o.componentDidUpdate != `function` ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != `function` ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return Us(e, t, n, r, a, i);
    }
    function Us(e, t, n, r, i, a) {
      Bs(e, t);
      var o = !!(t.flags & 128);
      if (!r && !o) return (i && ea(t, n, !1), nc(e, t, a));
      ((r = t.stateNode), (Ns.current = t));
      var s =
        o && typeof n.getDerivedStateFromError != `function`
          ? null
          : r.render();
      return (
        (t.flags |= 1),
        e !== null && o
          ? ((t.child = Ra(t, e.child, null, a)), (t.child = Ra(t, null, s, a)))
          : Fs(e, t, s, a),
        (t.memoizedState = r.state),
        i && ea(t, n, !0),
        t.child
      );
    }
    function Ws(e) {
      var t = e.stateNode;
      (t.pendingContext
        ? Zi(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Zi(e, t.context, !1),
        po(e, t.containerInfo));
    }
    function Gs(e, t, n, r, i) {
      return (ja(), Ma(i), (t.flags |= 256), Fs(e, t, n, r), t.child);
    }
    var Ks = { dehydrated: null, treeContext: null, retryLane: 0 };
    function qs(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function Js(e, t, n) {
      var r = t.pendingProps,
        i = _o.current,
        a = !1,
        o = !!(t.flags & 128),
        s;
      if (
        ((s = o) ||
          (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)),
        s
          ? ((a = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (i |= 1),
        Ui(_o, i & 1),
        e === null)
      )
        return (
          Da(t),
          (e = t.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)
            ? ((t.lanes = t.mode & 1 ? (e.data === `$!` ? 8 : 1073741824) : 1),
              null)
            : ((o = r.children),
              (e = r.fallback),
              a
                ? ((r = t.mode),
                  (a = t.child),
                  (o = { mode: `hidden`, children: o }),
                  !(r & 1) && a !== null
                    ? ((a.childLanes = 0), (a.pendingProps = o))
                    : (a = $(o, r, 0, null)),
                  (e = Ql(e, r, n, null)),
                  (a.return = t),
                  (e.return = t),
                  (a.sibling = e),
                  (t.child = a),
                  (t.child.memoizedState = qs(n)),
                  (t.memoizedState = Ks),
                  e)
                : Ys(t, o))
        );
      if (
        ((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null))
      )
        return Zs(e, t, o, r, s, i, n);
      if (a) {
        ((a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling));
        var c = { mode: `hidden`, children: r.children };
        return (
          !(o & 1) && t.child !== i
            ? ((r = t.child),
              (r.childLanes = 0),
              (r.pendingProps = c),
              (t.deletions = null))
            : ((r = Xl(i, c)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
          s === null
            ? ((a = Ql(a, o, n, null)), (a.flags |= 2))
            : (a = Xl(s, a)),
          (a.return = t),
          (r.return = t),
          (r.sibling = a),
          (t.child = r),
          (r = a),
          (a = t.child),
          (o = e.child.memoizedState),
          (o =
            o === null
              ? qs(n)
              : {
                  baseLanes: o.baseLanes | n,
                  cachePool: null,
                  transitions: o.transitions,
                }),
          (a.memoizedState = o),
          (a.childLanes = e.childLanes & ~n),
          (t.memoizedState = Ks),
          r
        );
      }
      return (
        (a = e.child),
        (e = a.sibling),
        (r = Xl(a, { mode: `visible`, children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
          ((n = t.deletions),
          n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
      );
    }
    function Ys(e, t) {
      return (
        (t = $({ mode: `visible`, children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Xs(e, t, n, r) {
      return (
        r !== null && Ma(r),
        Ra(t, e.child, null, n),
        (e = Ys(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function Zs(e, t, n, i, a, o, s) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (i = Es(Error(r(422)))), Xs(e, t, s, i))
          : t.memoizedState === null
            ? ((o = i.fallback),
              (a = t.mode),
              (i = $({ mode: `visible`, children: i.children }, a, 0, null)),
              (o = Ql(o, a, s, null)),
              (o.flags |= 2),
              (i.return = t),
              (o.return = t),
              (i.sibling = o),
              (t.child = i),
              t.mode & 1 && Ra(t, e.child, null, s),
              (t.child.memoizedState = qs(s)),
              (t.memoizedState = Ks),
              o)
            : ((t.child = e.child), (t.flags |= 128), null);
      if (!(t.mode & 1)) return Xs(e, t, s, null);
      if (a.data === `$!`) {
        if (((i = a.nextSibling && a.nextSibling.dataset), i)) var c = i.dgst;
        return (
          (i = c),
          (o = Error(r(419))),
          (i = Es(o, i, void 0)),
          Xs(e, t, s, i)
        );
      }
      if (((c = (s & e.childLanes) !== 0), Ps || c)) {
        if (((i = Hc), i !== null)) {
          switch (s & -s) {
            case 4:
              a = 2;
              break;
            case 16:
              a = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              a = 32;
              break;
            case 536870912:
              a = 268435456;
              break;
            default:
              a = 0;
          }
          ((a = (a & (i.suspendedLanes | s)) === 0 ? a : 0),
            a !== 0 &&
              a !== o.retryLane &&
              ((o.retryLane = a), Za(e, a), hl(i, e, a, -1)));
        }
        return (kl(), (i = Es(Error(r(421)))), Xs(e, t, s, i));
      }
      return a.data === `$?`
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = Hl.bind(null, e)),
          (a._reactRetry = t),
          null)
        : ((e = o.treeContext),
          (xa = Ei(a.nextSibling)),
          (ba = t),
          (Sa = !0),
          (Ca = null),
          e !== null &&
            ((da[fa++] = ma),
            (da[fa++] = ha),
            (da[fa++] = pa),
            (ma = e.id),
            (ha = e.overflow),
            (pa = t)),
          (t = Ys(t, i.children)),
          (t.flags |= 4096),
          t);
    }
    function Qs(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      (r !== null && (r.lanes |= t), Ga(e.return, t, n));
    }
    function $s(e, t, n, r, i) {
      var a = e.memoizedState;
      a === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
          })
        : ((a.isBackwards = t),
          (a.rendering = null),
          (a.renderingStartTime = 0),
          (a.last = r),
          (a.tail = n),
          (a.tailMode = i));
    }
    function ec(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail;
      if ((Fs(e, t, r.children, n), (r = _o.current), r & 2))
        ((r = (r & 1) | 2), (t.flags |= 128));
      else {
        if (e !== null && e.flags & 128)
          a: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Qs(e, n, t);
            else if (e.tag === 19) Qs(e, n, t);
            else if (e.child !== null) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break a;
            for (; e.sibling === null;) {
              if (e.return === null || e.return === t) break a;
              e = e.return;
            }
            ((e.sibling.return = e.return), (e = e.sibling));
          }
        r &= 1;
      }
      if ((Ui(_o, r), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (i) {
          case `forwards`:
            for (n = t.child, i = null; n !== null;)
              ((e = n.alternate),
                e !== null && vo(e) === null && (i = n),
                (n = n.sibling));
            ((n = i),
              n === null
                ? ((i = t.child), (t.child = null))
                : ((i = n.sibling), (n.sibling = null)),
              $s(t, !1, i, n, a));
            break;
          case `backwards`:
            for (n = null, i = t.child, t.child = null; i !== null;) {
              if (((e = i.alternate), e !== null && vo(e) === null)) {
                t.child = i;
                break;
              }
              ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
            }
            $s(t, !0, n, null, a);
            break;
          case `together`:
            $s(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function tc(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function nc(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Yc |= t.lanes),
        (n & t.childLanes) === 0)
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(r(153));
      if (t.child !== null) {
        for (
          e = t.child, n = Xl(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;
        )
          ((e = e.sibling),
            (n = n.sibling = Xl(e, e.pendingProps)),
            (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function rc(e, t, n) {
      switch (t.tag) {
        case 3:
          (Ws(t), ja());
          break;
        case 5:
          ho(t);
          break;
        case 1:
          Yi(t.type) && $i(t);
          break;
        case 4:
          po(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            i = t.memoizedProps.value;
          (Ui(Ba, r._currentValue), (r._currentValue = i));
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated === null
              ? (n & t.child.childLanes) === 0
                ? (Ui(_o, _o.current & 1),
                  (e = nc(e, t, n)),
                  e === null ? null : e.sibling)
                : Js(e, t, n)
              : (Ui(_o, _o.current & 1), (t.flags |= 128), null);
          Ui(_o, _o.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
            if (r) return ec(e, t, n);
            t.flags |= 128;
          }
          if (
            ((i = t.memoizedState),
            i !== null &&
              ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            Ui(_o, _o.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return ((t.lanes = 0), zs(e, t, n));
      }
      return nc(e, t, n);
    }
    var ic = function (e, t) {
        for (var n = t.child; n !== null;) {
          if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
          else if (n.tag !== 4 && n.child !== null) {
            ((n.child.return = n), (n = n.child));
            continue;
          }
          if (n === t) break;
          for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return;
          }
          ((n.sibling.return = n.return), (n = n.sibling));
        }
      },
      X = function (e, t, n, r) {
        var i = e.memoizedProps;
        if (i !== r) {
          ((e = t.stateNode), fo(co.current));
          var o = null;
          switch (n) {
            case `input`:
              ((i = fe(e, i)), (r = fe(e, r)), (o = []));
              break;
            case `select`:
              ((i = L({}, i, { value: void 0 })),
                (r = L({}, r, { value: void 0 })),
                (o = []));
              break;
            case `textarea`:
              ((i = be(e, i)), (r = be(e, r)), (o = []));
              break;
            default:
              typeof i.onClick != `function` &&
                typeof r.onClick == `function` &&
                (e.onclick = gi);
          }
          Ne(n, r);
          var s;
          for (u in ((n = null), i))
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null) {
              if (u === `style`) {
                var c = i[u];
                for (s in c) c.hasOwnProperty(s) && ((n ||= {}), (n[s] = ``));
              } else
                u !== `dangerouslySetInnerHTML` &&
                  u !== `children` &&
                  u !== `suppressContentEditableWarning` &&
                  u !== `suppressHydrationWarning` &&
                  u !== `autoFocus` &&
                  (a.hasOwnProperty(u) ? (o ||= []) : (o ||= []).push(u, null));
            }
          for (u in r) {
            var l = r[u];
            if (
              ((c = i?.[u]),
              r.hasOwnProperty(u) && l !== c && (l != null || c != null))
            ) {
              if (u === `style`) {
                if (c) {
                  for (s in c)
                    !c.hasOwnProperty(s) ||
                      (l && l.hasOwnProperty(s)) ||
                      ((n ||= {}), (n[s] = ``));
                  for (s in l)
                    l.hasOwnProperty(s) &&
                      c[s] !== l[s] &&
                      ((n ||= {}), (n[s] = l[s]));
                } else (n || ((o ||= []), o.push(u, n)), (n = l));
              } else
                u === `dangerouslySetInnerHTML`
                  ? ((l = l ? l.__html : void 0),
                    (c = c ? c.__html : void 0),
                    l != null && c !== l && (o ||= []).push(u, l))
                  : u === `children`
                    ? (typeof l != `string` && typeof l != `number`) ||
                      (o ||= []).push(u, `` + l)
                    : u !== `suppressContentEditableWarning` &&
                      u !== `suppressHydrationWarning` &&
                      (a.hasOwnProperty(u)
                        ? (l != null && u === `onScroll` && K(`scroll`, e),
                          o || c === l || (o = []))
                        : (o ||= []).push(u, l));
            }
          }
          n && (o ||= []).push(`style`, n);
          var u = o;
          (t.updateQueue = u) && (t.flags |= 4);
        }
      },
      ac = function (e, t, n, r) {
        n !== r && (t.flags |= 4);
      };
    function oc(e, t) {
      if (!Sa)
        switch (e.tailMode) {
          case `hidden`:
            t = e.tail;
            for (var n = null; t !== null;)
              (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case `collapsed`:
            n = e.tail;
            for (var r = null; n !== null;)
              (n.alternate !== null && (r = n), (n = n.sibling));
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function sc(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var i = e.child; i !== null;)
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 14680064),
            (r |= i.flags & 14680064),
            (i.return = e),
            (i = i.sibling));
      else
        for (i = e.child; i !== null;)
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling));
      return ((e.subtreeFlags |= r), (e.childLanes = n), t);
    }
    function cc(e, t, n) {
      var i = t.pendingProps;
      switch ((ya(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (sc(t), null);
        case 1:
          return (Yi(t.type) && Xi(), sc(t), null);
        case 3:
          return (
            (i = t.stateNode),
            mo(),
            Hi(Ki),
            Hi(Gi),
            bo(),
            i.pendingContext &&
              ((i.context = i.pendingContext), (i.pendingContext = null)),
            (e === null || e.child === null) &&
              (ka(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Ca !== null && (yl(Ca), (Ca = null)))),
            sc(t),
            null
          );
        case 5:
          go(t);
          var o = fo(uo.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            (X(e, t, n, i, o),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
          else {
            if (!i) {
              if (t.stateNode === null) throw Error(r(166));
              return (sc(t), null);
            }
            if (((e = fo(co.current)), ka(t))) {
              ((i = t.stateNode), (n = t.type));
              var s = t.memoizedProps;
              switch (((i[ki] = t), (i[Ai] = s), (e = !!(t.mode & 1)), n)) {
                case `dialog`:
                  (K(`cancel`, i), K(`close`, i));
                  break;
                case `iframe`:
                case `object`:
                case `embed`:
                  K(`load`, i);
                  break;
                case `video`:
                case `audio`:
                  for (o = 0; o < $r.length; o++) K($r[o], i);
                  break;
                case `source`:
                  K(`error`, i);
                  break;
                case `img`:
                case `image`:
                case `link`:
                  (K(`error`, i), K(`load`, i));
                  break;
                case `details`:
                  K(`toggle`, i);
                  break;
                case `input`:
                  (pe(i, s), K(`invalid`, i));
                  break;
                case `select`:
                  ((i._wrapperState = { wasMultiple: !!s.multiple }),
                    K(`invalid`, i));
                  break;
                case `textarea`:
                  (V(i, s), K(`invalid`, i));
              }
              for (var c in (Ne(n, s), (o = null), s))
                if (s.hasOwnProperty(c)) {
                  var l = s[c];
                  c === `children`
                    ? typeof l == `string`
                      ? i.textContent !== l &&
                        (!0 !== s.suppressHydrationWarning &&
                          hi(i.textContent, l, e),
                        (o = [`children`, l]))
                      : typeof l == `number` &&
                        i.textContent !== `` + l &&
                        (!0 !== s.suppressHydrationWarning &&
                          hi(i.textContent, l, e),
                        (o = [`children`, `` + l]))
                    : a.hasOwnProperty(c) &&
                      l != null &&
                      c === `onScroll` &&
                      K(`scroll`, i);
                }
              switch (n) {
                case `input`:
                  (le(i), ge(i, s, !0));
                  break;
                case `textarea`:
                  (le(i), Se(i));
                  break;
                case `select`:
                case `option`:
                  break;
                default:
                  typeof s.onClick == `function` && (i.onclick = gi);
              }
              ((i = o), (t.updateQueue = i), i !== null && (t.flags |= 4));
            } else {
              ((c = o.nodeType === 9 ? o : o.ownerDocument),
                e === `http://www.w3.org/1999/xhtml` && (e = Ce(n)),
                e === `http://www.w3.org/1999/xhtml`
                  ? n === `script`
                    ? ((e = c.createElement(`div`)),
                      (e.innerHTML = `<script><\/script>`),
                      (e = e.removeChild(e.firstChild)))
                    : typeof i.is == `string`
                      ? (e = c.createElement(n, { is: i.is }))
                      : ((e = c.createElement(n)),
                        n === `select` &&
                          ((c = e),
                          i.multiple
                            ? (c.multiple = !0)
                            : i.size && (c.size = i.size)))
                  : (e = c.createElementNS(e, n)),
                (e[ki] = t),
                (e[Ai] = i),
                ic(e, t, !1, !1),
                (t.stateNode = e));
              a: {
                switch (((c = Pe(n, i)), n)) {
                  case `dialog`:
                    (K(`cancel`, e), K(`close`, e), (o = i));
                    break;
                  case `iframe`:
                  case `object`:
                  case `embed`:
                    (K(`load`, e), (o = i));
                    break;
                  case `video`:
                  case `audio`:
                    for (o = 0; o < $r.length; o++) K($r[o], e);
                    o = i;
                    break;
                  case `source`:
                    (K(`error`, e), (o = i));
                    break;
                  case `img`:
                  case `image`:
                  case `link`:
                    (K(`error`, e), K(`load`, e), (o = i));
                    break;
                  case `details`:
                    (K(`toggle`, e), (o = i));
                    break;
                  case `input`:
                    (pe(e, i), (o = fe(e, i)), K(`invalid`, e));
                    break;
                  case `option`:
                    o = i;
                    break;
                  case `select`:
                    ((e._wrapperState = { wasMultiple: !!i.multiple }),
                      (o = L({}, i, { value: void 0 })),
                      K(`invalid`, e));
                    break;
                  case `textarea`:
                    (V(e, i), (o = be(e, i)), K(`invalid`, e));
                    break;
                  default:
                    o = i;
                }
                for (s in (Ne(n, o), (l = o), l))
                  if (l.hasOwnProperty(s)) {
                    var u = l[s];
                    s === `style`
                      ? je(e, u)
                      : s === `dangerouslySetInnerHTML`
                        ? ((u = u ? u.__html : void 0), u != null && Ee(e, u))
                        : s === `children`
                          ? typeof u == `string`
                            ? (n !== `textarea` || u !== ``) && De(e, u)
                            : typeof u == `number` && De(e, `` + u)
                          : s !== `suppressContentEditableWarning` &&
                            s !== `suppressHydrationWarning` &&
                            s !== `autoFocus` &&
                            (a.hasOwnProperty(s)
                              ? u != null && s === `onScroll` && K(`scroll`, e)
                              : u != null && S(e, s, u, c));
                  }
                switch (n) {
                  case `input`:
                    (le(e), ge(e, i, !1));
                    break;
                  case `textarea`:
                    (le(e), Se(e));
                    break;
                  case `option`:
                    i.value != null &&
                      e.setAttribute(`value`, `` + se(i.value));
                    break;
                  case `select`:
                    ((e.multiple = !!i.multiple),
                      (s = i.value),
                      s == null
                        ? i.defaultValue != null &&
                          ye(e, !!i.multiple, i.defaultValue, !0)
                        : ye(e, !!i.multiple, s, !1));
                    break;
                  default:
                    typeof o.onClick == `function` && (e.onclick = gi);
                }
                switch (n) {
                  case `button`:
                  case `input`:
                  case `select`:
                  case `textarea`:
                    i = !!i.autoFocus;
                    break a;
                  case `img`:
                    i = !0;
                    break a;
                  default:
                    i = !1;
                }
              }
              i && (t.flags |= 4);
            }
            t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
          }
          return (sc(t), null);
        case 6:
          if (e && t.stateNode != null) ac(e, t, e.memoizedProps, i);
          else {
            if (typeof i != `string` && t.stateNode === null)
              throw Error(r(166));
            if (((n = fo(uo.current)), fo(co.current), ka(t))) {
              if (
                ((i = t.stateNode),
                (n = t.memoizedProps),
                (i[ki] = t),
                (s = i.nodeValue !== n) && ((e = ba), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    hi(i.nodeValue, n, !!(e.mode & 1));
                    break;
                  case 5:
                    !0 !== e.memoizedProps.suppressHydrationWarning &&
                      hi(i.nodeValue, n, !!(e.mode & 1));
                }
              s && (t.flags |= 4);
            } else
              ((i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i)),
                (i[ki] = t),
                (t.stateNode = i));
          }
          return (sc(t), null);
        case 13:
          if (
            (Hi(_o),
            (i = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (Sa && xa !== null && t.mode & 1 && !(t.flags & 128))
              (Aa(), ja(), (t.flags |= 98560), (s = !1));
            else if (((s = ka(t)), i !== null && i.dehydrated !== null)) {
              if (e === null) {
                if (!s) throw Error(r(318));
                if (
                  ((s = t.memoizedState),
                  (s = s === null ? null : s.dehydrated),
                  !s)
                )
                  throw Error(r(317));
                s[ki] = t;
              } else
                (ja(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4));
              (sc(t), (s = !1));
            } else (Ca !== null && (yl(Ca), (Ca = null)), (s = !0));
            if (!s) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = n), t)
            : ((i = i !== null),
              i !== (e !== null && e.memoizedState !== null) &&
                i &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || _o.current & 1 ? qc === 0 && (qc = 3) : kl())),
              t.updateQueue !== null && (t.flags |= 4),
              sc(t),
              null);
        case 4:
          return (
            mo(),
            e === null && ai(t.stateNode.containerInfo),
            sc(t),
            null
          );
        case 10:
          return (q(t.type._context), sc(t), null);
        case 17:
          return (Yi(t.type) && Xi(), sc(t), null);
        case 19:
          if ((Hi(_o), (s = t.memoizedState), s === null)) return (sc(t), null);
          if (((i = !!(t.flags & 128)), (c = s.rendering), c === null)) {
            if (i) oc(s, !1);
            else {
              if (qc !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null;) {
                  if (((c = vo(e)), c !== null)) {
                    for (
                      t.flags |= 128,
                        oc(s, !1),
                        i = c.updateQueue,
                        i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                        t.subtreeFlags = 0,
                        i = n,
                        n = t.child;
                      n !== null;
                    )
                      ((s = n),
                        (e = i),
                        (s.flags &= 14680066),
                        (c = s.alternate),
                        c === null
                          ? ((s.childLanes = 0),
                            (s.lanes = e),
                            (s.child = null),
                            (s.subtreeFlags = 0),
                            (s.memoizedProps = null),
                            (s.memoizedState = null),
                            (s.updateQueue = null),
                            (s.dependencies = null),
                            (s.stateNode = null))
                          : ((s.childLanes = c.childLanes),
                            (s.lanes = c.lanes),
                            (s.child = c.child),
                            (s.subtreeFlags = 0),
                            (s.deletions = null),
                            (s.memoizedProps = c.memoizedProps),
                            (s.memoizedState = c.memoizedState),
                            (s.updateQueue = c.updateQueue),
                            (s.type = c.type),
                            (e = c.dependencies),
                            (s.dependencies =
                              e === null
                                ? null
                                : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext,
                                  })),
                        (n = n.sibling));
                    return (Ui(_o, (_o.current & 1) | 2), t.child);
                  }
                  e = e.sibling;
                }
              s.tail !== null &&
                mt() > tl &&
                ((t.flags |= 128), (i = !0), oc(s, !1), (t.lanes = 4194304));
            }
          } else {
            if (!i) {
              if (((e = vo(c)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (i = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  oc(s, !0),
                  s.tail === null &&
                    s.tailMode === `hidden` &&
                    !c.alternate &&
                    !Sa)
                )
                  return (sc(t), null);
              } else
                2 * mt() - s.renderingStartTime > tl &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (i = !0), oc(s, !1), (t.lanes = 4194304));
            }
            s.isBackwards
              ? ((c.sibling = t.child), (t.child = c))
              : ((n = s.last),
                n === null ? (t.child = c) : (n.sibling = c),
                (s.last = c));
          }
          return s.tail === null
            ? (sc(t), null)
            : ((t = s.tail),
              (s.rendering = t),
              (s.tail = t.sibling),
              (s.renderingStartTime = mt()),
              (t.sibling = null),
              (n = _o.current),
              Ui(_o, i ? (n & 1) | 2 : n & 1),
              t);
        case 22:
        case 23:
          return (
            Tl(),
            (i = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== i && (t.flags |= 8192),
            i && t.mode & 1
              ? Gc & 1073741824 &&
                (sc(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : sc(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function lc(e, t) {
      switch ((ya(t), t.tag)) {
        case 1:
          return (
            Yi(t.type) && Xi(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            mo(),
            Hi(Ki),
            Hi(Gi),
            bo(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return (go(t), null);
        case 13:
          if (
            (Hi(_o), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(r(340));
            ja();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return (Hi(_o), null);
        case 4:
          return (mo(), null);
        case 10:
          return (q(t.type._context), null);
        case 22:
        case 23:
          return (Tl(), null);
        case 24:
          return null;
        default:
          return null;
      }
    }
    var uc = !1,
      dc = !1,
      fc = typeof WeakSet == `function` ? WeakSet : Set,
      Z = null;
    function pc(e, t) {
      var n = e.ref;
      if (n !== null) {
        if (typeof n == `function`)
          try {
            n(null);
          } catch (n) {
            zl(e, t, n);
          }
        else n.current = null;
      }
    }
    function mc(e, t, n) {
      try {
        n();
      } catch (n) {
        zl(e, t, n);
      }
    }
    var hc = !1;
    function gc(e, t) {
      if (((_i = fn), (e = Ar()), jr(e))) {
        if (`selectionStart` in e)
          var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          a: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var i = n.getSelection && n.getSelection();
            if (i && i.rangeCount !== 0) {
              n = i.anchorNode;
              var a = i.anchorOffset,
                o = i.focusNode;
              i = i.focusOffset;
              try {
                (n.nodeType, o.nodeType);
              } catch {
                n = null;
                break a;
              }
              var s = 0,
                c = -1,
                l = -1,
                u = 0,
                d = 0,
                f = e,
                p = null;
              b: for (;;) {
                for (
                  var m;
                  f !== n || (a !== 0 && f.nodeType !== 3) || (c = s + a),
                    f !== o || (i !== 0 && f.nodeType !== 3) || (l = s + i),
                    f.nodeType === 3 && (s += f.nodeValue.length),
                    (m = f.firstChild) !== null;
                )
                  ((p = f), (f = m));
                for (;;) {
                  if (f === e) break b;
                  if (
                    (p === n && ++u === a && (c = s),
                    p === o && ++d === i && (l = s),
                    (m = f.nextSibling) !== null)
                  )
                    break;
                  ((f = p), (p = f.parentNode));
                }
                f = m;
              }
              n = c === -1 || l === -1 ? null : { start: c, end: l };
            } else n = null;
          }
        n ||= { start: 0, end: 0 };
      } else n = null;
      for (
        vi = { focusedElem: e, selectionRange: n }, fn = !1, Z = t;
        Z !== null;
      )
        if (((t = Z), (e = t.child), t.subtreeFlags & 1028 && e !== null))
          ((e.return = t), (Z = e));
        else
          for (; Z !== null;) {
            t = Z;
            try {
              var h = t.alternate;
              if (t.flags & 1024)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (h !== null) {
                      var g = h.memoizedProps,
                        _ = h.memoizedState,
                        v = t.stateNode;
                      v.__reactInternalSnapshotBeforeUpdate =
                        v.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? g : vs(t.type, g),
                          _,
                        );
                    }
                    break;
                  case 3:
                    var y = t.stateNode.containerInfo;
                    y.nodeType === 1
                      ? (y.textContent = ``)
                      : y.nodeType === 9 &&
                        y.documentElement &&
                        y.removeChild(y.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(r(163));
                }
            } catch (e) {
              zl(t, t.return, e);
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (Z = e));
              break;
            }
            Z = t.return;
          }
      return ((h = hc), (hc = !1), h);
    }
    function _c(e, t, n) {
      var r = t.updateQueue;
      if (((r = r === null ? null : r.lastEffect), r !== null)) {
        var i = (r = r.next);
        do {
          if ((i.tag & e) === e) {
            var a = i.destroy;
            ((i.destroy = void 0), a !== void 0 && mc(t, n, a));
          }
          i = i.next;
        } while (i !== r);
      }
    }
    function vc(e, t) {
      if (
        ((t = t.updateQueue),
        (t = t === null ? null : t.lastEffect),
        t !== null)
      ) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function yc(e) {
      var t = e.ref;
      if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
          case 5:
            e = n;
            break;
          default:
            e = n;
        }
        typeof t == `function` ? t(e) : (t.current = e);
      }
    }
    function bc(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), bc(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[ki],
            delete t[Ai],
            delete t[Mi],
            delete t[Ni],
            delete t[Pi])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    function xc(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Sc(e) {
      a: for (;;) {
        for (; e.sibling === null;) {
          if (e.return === null || xc(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Cc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? n.nodeType === 8
              ? n.parentNode.insertBefore(e, t)
              : n.insertBefore(e, t)
            : (n.nodeType === 8
                ? ((t = n.parentNode), t.insertBefore(e, n))
                : ((t = n), t.appendChild(e)),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = gi)));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Cc(e, t, n), e = e.sibling; e !== null;)
          (Cc(e, t, n), (e = e.sibling));
    }
    function wc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (wc(e, t, n), e = e.sibling; e !== null;)
          (wc(e, t, n), (e = e.sibling));
    }
    var Tc = null,
      Ec = !1;
    function Dc(e, t, n) {
      for (n = n.child; n !== null;) (Oc(e, t, n), (n = n.sibling));
    }
    function Oc(e, t, n) {
      if (St && typeof St.onCommitFiberUnmount == `function`)
        try {
          St.onCommitFiberUnmount(xt, n);
        } catch {}
      switch (n.tag) {
        case 5:
          dc || pc(n, t);
        case 6:
          var r = Tc,
            i = Ec;
          ((Tc = null),
            Dc(e, t, n),
            (Tc = r),
            (Ec = i),
            Tc !== null &&
              (Ec
                ? ((e = Tc),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(n)
                    : e.removeChild(n))
                : Tc.removeChild(n.stateNode)));
          break;
        case 18:
          Tc !== null &&
            (Ec
              ? ((e = Tc),
                (n = n.stateNode),
                e.nodeType === 8
                  ? Ti(e.parentNode, n)
                  : e.nodeType === 1 && Ti(e, n),
                un(e))
              : Ti(Tc, n.stateNode));
          break;
        case 4:
          ((r = Tc),
            (i = Ec),
            (Tc = n.stateNode.containerInfo),
            (Ec = !0),
            Dc(e, t, n),
            (Tc = r),
            (Ec = i));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !dc &&
            ((r = n.updateQueue),
            r !== null && ((r = r.lastEffect), r !== null))
          ) {
            i = r = r.next;
            do {
              var a = i,
                o = a.destroy;
              ((a = a.tag),
                o !== void 0 && (a & 2 || a & 4) && mc(n, t, o),
                (i = i.next));
            } while (i !== r);
          }
          Dc(e, t, n);
          break;
        case 1:
          if (
            !dc &&
            (pc(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == `function`)
          )
            try {
              ((r.props = n.memoizedProps),
                (r.state = n.memoizedState),
                r.componentWillUnmount());
            } catch (e) {
              zl(n, t, e);
            }
          Dc(e, t, n);
          break;
        case 21:
          Dc(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((dc = (r = dc) || n.memoizedState !== null),
              Dc(e, t, n),
              (dc = r))
            : Dc(e, t, n);
          break;
        default:
          Dc(e, t, n);
      }
    }
    function kc(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        (n === null && (n = e.stateNode = new fc()),
          t.forEach(function (t) {
            var r = Ul.bind(null, e, t);
            n.has(t) || (n.add(t), t.then(r, r));
          }));
      }
    }
    function Ac(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var a = n[i];
          try {
            var o = e,
              s = t,
              c = s;
            a: for (; c !== null;) {
              switch (c.tag) {
                case 5:
                  ((Tc = c.stateNode), (Ec = !1));
                  break a;
                case 3:
                  ((Tc = c.stateNode.containerInfo), (Ec = !0));
                  break a;
                case 4:
                  ((Tc = c.stateNode.containerInfo), (Ec = !0));
                  break a;
              }
              c = c.return;
            }
            if (Tc === null) throw Error(r(160));
            (Oc(o, s, a), (Tc = null), (Ec = !1));
            var l = a.alternate;
            (l !== null && (l.return = null), (a.return = null));
          } catch (e) {
            zl(a, t, e);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) (jc(t, e), (t = t.sibling));
    }
    function jc(e, t) {
      var n = e.alternate,
        i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Ac(t, e), Mc(e), i & 4)) {
            try {
              (_c(3, e, e.return), vc(3, e));
            } catch (t) {
              zl(e, e.return, t);
            }
            try {
              _c(5, e, e.return);
            } catch (t) {
              zl(e, e.return, t);
            }
          }
          break;
        case 1:
          (Ac(t, e), Mc(e), i & 512 && n !== null && pc(n, n.return));
          break;
        case 5:
          if (
            (Ac(t, e),
            Mc(e),
            i & 512 && n !== null && pc(n, n.return),
            e.flags & 32)
          ) {
            var a = e.stateNode;
            try {
              De(a, ``);
            } catch (t) {
              zl(e, e.return, t);
            }
          }
          if (i & 4 && ((a = e.stateNode), a != null)) {
            var o = e.memoizedProps,
              s = n === null ? o : n.memoizedProps,
              c = e.type,
              l = e.updateQueue;
            if (((e.updateQueue = null), l !== null))
              try {
                (c === `input` &&
                  o.type === `radio` &&
                  o.name != null &&
                  me(a, o),
                  Pe(c, s));
                var u = Pe(c, o);
                for (s = 0; s < l.length; s += 2) {
                  var d = l[s],
                    f = l[s + 1];
                  d === `style`
                    ? je(a, f)
                    : d === `dangerouslySetInnerHTML`
                      ? Ee(a, f)
                      : d === `children`
                        ? De(a, f)
                        : S(a, d, f, u);
                }
                switch (c) {
                  case `input`:
                    he(a, o);
                    break;
                  case `textarea`:
                    xe(a, o);
                    break;
                  case `select`:
                    var p = a._wrapperState.wasMultiple;
                    a._wrapperState.wasMultiple = !!o.multiple;
                    var m = o.value;
                    m == null
                      ? p !== !!o.multiple &&
                        (o.defaultValue == null
                          ? ye(a, !!o.multiple, o.multiple ? [] : ``, !1)
                          : ye(a, !!o.multiple, o.defaultValue, !0))
                      : ye(a, !!o.multiple, m, !1);
                }
                a[Ai] = o;
              } catch (t) {
                zl(e, e.return, t);
              }
          }
          break;
        case 6:
          if ((Ac(t, e), Mc(e), i & 4)) {
            if (e.stateNode === null) throw Error(r(162));
            ((a = e.stateNode), (o = e.memoizedProps));
            try {
              a.nodeValue = o;
            } catch (t) {
              zl(e, e.return, t);
            }
          }
          break;
        case 3:
          if (
            (Ac(t, e),
            Mc(e),
            i & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              un(t.containerInfo);
            } catch (t) {
              zl(e, e.return, t);
            }
          break;
        case 4:
          (Ac(t, e), Mc(e));
          break;
        case 13:
          (Ac(t, e),
            Mc(e),
            (a = e.child),
            a.flags & 8192 &&
              ((o = a.memoizedState !== null),
              (a.stateNode.isHidden = o),
              !o ||
                (a.alternate !== null && a.alternate.memoizedState !== null) ||
                (el = mt())),
            i & 4 && kc(e));
          break;
        case 22:
          if (
            ((d = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((dc = (u = dc) || d), Ac(t, e), (dc = u)) : Ac(t, e),
            Mc(e),
            i & 8192)
          ) {
            if (
              ((u = e.memoizedState !== null),
              (e.stateNode.isHidden = u) && !d && e.mode & 1)
            )
              for (Z = e, d = e.child; d !== null;) {
                for (f = Z = d; Z !== null;) {
                  switch (((p = Z), (m = p.child), p.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      _c(4, p, p.return);
                      break;
                    case 1:
                      pc(p, p.return);
                      var h = p.stateNode;
                      if (typeof h.componentWillUnmount == `function`) {
                        ((i = p), (n = p.return));
                        try {
                          ((t = i),
                            (h.props = t.memoizedProps),
                            (h.state = t.memoizedState),
                            h.componentWillUnmount());
                        } catch (e) {
                          zl(i, n, e);
                        }
                      }
                      break;
                    case 5:
                      pc(p, p.return);
                      break;
                    case 22:
                      if (p.memoizedState !== null) {
                        Ic(f);
                        continue;
                      }
                  }
                  m === null ? Ic(f) : ((m.return = p), (Z = m));
                }
                d = d.sibling;
              }
            a: for (d = null, f = e; ;) {
              if (f.tag === 5) {
                if (d === null) {
                  d = f;
                  try {
                    ((a = f.stateNode),
                      u
                        ? ((o = a.style),
                          typeof o.setProperty == `function`
                            ? o.setProperty(`display`, `none`, `important`)
                            : (o.display = `none`))
                        : ((c = f.stateNode),
                          (l = f.memoizedProps.style),
                          (s =
                            l != null && l.hasOwnProperty(`display`)
                              ? l.display
                              : null),
                          (c.style.display = Ae(`display`, s))));
                  } catch (t) {
                    zl(e, e.return, t);
                  }
                }
              } else if (f.tag === 6) {
                if (d === null)
                  try {
                    f.stateNode.nodeValue = u ? `` : f.memoizedProps;
                  } catch (t) {
                    zl(e, e.return, t);
                  }
              } else if (
                ((f.tag !== 22 && f.tag !== 23) ||
                  f.memoizedState === null ||
                  f === e) &&
                f.child !== null
              ) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === e) break a;
              for (; f.sibling === null;) {
                if (f.return === null || f.return === e) break a;
                (d === f && (d = null), (f = f.return));
              }
              (d === f && (d = null),
                (f.sibling.return = f.return),
                (f = f.sibling));
            }
          }
          break;
        case 19:
          (Ac(t, e), Mc(e), i & 4 && kc(e));
          break;
        case 21:
          break;
        default:
          (Ac(t, e), Mc(e));
      }
    }
    function Mc(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          a: {
            for (var n = e.return; n !== null;) {
              if (xc(n)) {
                var i = n;
                break a;
              }
              n = n.return;
            }
            throw Error(r(160));
          }
          switch (i.tag) {
            case 5:
              var a = i.stateNode;
              (i.flags & 32 && (De(a, ``), (i.flags &= -33)), wc(e, Sc(e), a));
              break;
            case 3:
            case 4:
              var o = i.stateNode.containerInfo;
              Cc(e, Sc(e), o);
              break;
            default:
              throw Error(r(161));
          }
        } catch (t) {
          zl(e, e.return, t);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Nc(e, t, n) {
      ((Z = e), Pc(e, t, n));
    }
    function Pc(e, t, n) {
      for (var r = !!(e.mode & 1); Z !== null;) {
        var i = Z,
          a = i.child;
        if (i.tag === 22 && r) {
          var o = i.memoizedState !== null || uc;
          if (!o) {
            var s = i.alternate,
              c = (s !== null && s.memoizedState !== null) || dc;
            s = uc;
            var l = dc;
            if (((uc = o), (dc = c) && !l))
              for (Z = i; Z !== null;)
                ((o = Z),
                  (c = o.child),
                  (o.tag === 22 && o.memoizedState !== null) || c === null
                    ? Lc(i)
                    : ((c.return = o), (Z = c)));
            for (; a !== null;) ((Z = a), Pc(a, t, n), (a = a.sibling));
            ((Z = i), (uc = s), (dc = l));
          }
          Fc(e, t, n);
        } else
          i.subtreeFlags & 8772 && a !== null
            ? ((a.return = i), (Z = a))
            : Fc(e, t, n);
      }
    }
    function Fc(e) {
      for (; Z !== null;) {
        var t = Z;
        if (t.flags & 8772) {
          var n = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  dc || vc(5, t);
                  break;
                case 1:
                  var i = t.stateNode;
                  if (t.flags & 4 && !dc) {
                    if (n === null) i.componentDidMount();
                    else {
                      var a =
                        t.elementType === t.type
                          ? n.memoizedProps
                          : vs(t.type, n.memoizedProps);
                      i.componentDidUpdate(
                        a,
                        n.memoizedState,
                        i.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  }
                  var o = t.updateQueue;
                  o !== null && oo(t, o, i);
                  break;
                case 3:
                  var s = t.updateQueue;
                  if (s !== null) {
                    if (((n = null), t.child !== null))
                      switch (t.child.tag) {
                        case 5:
                          n = t.child.stateNode;
                          break;
                        case 1:
                          n = t.child.stateNode;
                      }
                    oo(t, s, n);
                  }
                  break;
                case 5:
                  var c = t.stateNode;
                  if (n === null && t.flags & 4) {
                    n = c;
                    var l = t.memoizedProps;
                    switch (t.type) {
                      case `button`:
                      case `input`:
                      case `select`:
                      case `textarea`:
                        l.autoFocus && n.focus();
                        break;
                      case `img`:
                        l.src && (n.src = l.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (t.memoizedState === null) {
                    var u = t.alternate;
                    if (u !== null) {
                      var d = u.memoizedState;
                      if (d !== null) {
                        var f = d.dehydrated;
                        f !== null && un(f);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(r(163));
              }
            dc || (t.flags & 512 && yc(t));
          } catch (e) {
            zl(t, t.return, e);
          }
        }
        if (t === e) {
          Z = null;
          break;
        }
        if (((n = t.sibling), n !== null)) {
          ((n.return = t.return), (Z = n));
          break;
        }
        Z = t.return;
      }
    }
    function Ic(e) {
      for (; Z !== null;) {
        var t = Z;
        if (t === e) {
          Z = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          ((n.return = t.return), (Z = n));
          break;
        }
        Z = t.return;
      }
    }
    function Lc(e) {
      for (; Z !== null;) {
        var t = Z;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                vc(4, t);
              } catch (e) {
                zl(t, n, e);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == `function`) {
                var i = t.return;
                try {
                  r.componentDidMount();
                } catch (e) {
                  zl(t, i, e);
                }
              }
              var a = t.return;
              try {
                yc(t);
              } catch (e) {
                zl(t, a, e);
              }
              break;
            case 5:
              var o = t.return;
              try {
                yc(t);
              } catch (e) {
                zl(t, o, e);
              }
          }
        } catch (e) {
          zl(t, t.return, e);
        }
        if (t === e) {
          Z = null;
          break;
        }
        var s = t.sibling;
        if (s !== null) {
          ((s.return = t.return), (Z = s));
          break;
        }
        Z = t.return;
      }
    }
    var Rc = Math.ceil,
      zc = C.ReactCurrentDispatcher,
      Bc = C.ReactCurrentOwner,
      Vc = C.ReactCurrentBatchConfig,
      Q = 0,
      Hc = null,
      Uc = null,
      Wc = 0,
      Gc = 0,
      Kc = Vi(0),
      qc = 0,
      Jc = null,
      Yc = 0,
      Xc = 0,
      Zc = 0,
      Qc = null,
      $c = null,
      el = 0,
      tl = 1 / 0,
      nl = null,
      rl = !1,
      il = null,
      al = null,
      ol = !1,
      sl = null,
      cl = 0,
      ll = 0,
      ul = null,
      dl = -1,
      fl = 0;
    function pl() {
      return Q & 6 ? mt() : dl === -1 ? (dl = mt()) : dl;
    }
    function ml(e) {
      return e.mode & 1
        ? Q & 2 && Wc !== 0
          ? Wc & -Wc
          : Na.transition === null
            ? ((e = H),
              e === 0
                ? ((e = window.event), (e = e === void 0 ? 16 : vn(e.type)), e)
                : e)
            : (fl === 0 && (fl = Ft()), fl)
        : 1;
    }
    function hl(e, t, n, i) {
      if (50 < ll) throw ((ll = 0), (ul = null), Error(r(185)));
      (Lt(e, n, i),
        (!(Q & 2) || e !== Hc) &&
          (e === Hc && (!(Q & 2) && (Xc |= n), qc === 4 && xl(e, Wc)),
          gl(e, i),
          n === 1 &&
            Q === 0 &&
            !(t.mode & 1) &&
            ((tl = mt() + 500), na && oa())));
    }
    function gl(e, t) {
      var n = e.callbackNode;
      Nt(e, t);
      var r = jt(e, e === Hc ? Wc : 0);
      if (r === 0)
        (n !== null && dt(n),
          (e.callbackNode = null),
          (e.callbackPriority = 0));
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && dt(n), t === 1))
          (e.tag === 0 ? aa(Sl.bind(null, e)) : ia(Sl.bind(null, e)),
            Ci(function () {
              !(Q & 6) && oa();
            }),
            (n = null));
        else {
          switch (Bt(r)) {
            case 1:
              n = gt;
              break;
            case 4:
              n = _t;
              break;
            case 16:
              n = vt;
              break;
            case 536870912:
              n = bt;
              break;
            default:
              n = vt;
          }
          n = Gl(n, _l.bind(null, e));
        }
        ((e.callbackPriority = t), (e.callbackNode = n));
      }
    }
    function _l(e, t) {
      if (((dl = -1), (fl = 0), Q & 6)) throw Error(r(327));
      var n = e.callbackNode;
      if (Ll() && e.callbackNode !== n) return null;
      var i = jt(e, e === Hc ? Wc : 0);
      if (i === 0) return null;
      if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = Al(e, i);
      else {
        t = i;
        var a = Q;
        Q |= 2;
        var o = Ol();
        (Hc !== e || Wc !== t) && ((nl = null), (tl = mt() + 500), El(e, t));
        do
          try {
            Ml();
            break;
          } catch (t) {
            Dl(e, t);
          }
        while (1);
        (Wa(),
          (zc.current = o),
          (Q = a),
          Uc === null ? ((Hc = null), (Wc = 0), (t = qc)) : (t = 0));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((a = Pt(e)), a !== 0 && ((i = a), (t = vl(e, a)))),
          t === 1)
        )
          throw ((n = Jc), El(e, 0), xl(e, i), gl(e, mt()), n);
        if (t === 6) xl(e, i);
        else {
          if (
            ((a = e.current.alternate),
            !(i & 30) &&
              !bl(a) &&
              ((t = Al(e, i)),
              t === 2 && ((o = Pt(e)), o !== 0 && ((i = o), (t = vl(e, o)))),
              t === 1))
          )
            throw ((n = Jc), El(e, 0), xl(e, i), gl(e, mt()), n);
          switch (((e.finishedWork = a), (e.finishedLanes = i), t)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 2:
              Fl(e, $c, nl);
              break;
            case 3:
              if (
                (xl(e, i),
                (i & 130023424) === i && ((t = el + 500 - mt()), 10 < t))
              ) {
                if (jt(e, 0) !== 0) break;
                if (((a = e.suspendedLanes), (a & i) !== i)) {
                  (pl(), (e.pingedLanes |= e.suspendedLanes & a));
                  break;
                }
                e.timeoutHandle = bi(Fl.bind(null, e, $c, nl), t);
                break;
              }
              Fl(e, $c, nl);
              break;
            case 4:
              if ((xl(e, i), (i & 4194240) === i)) break;
              for (t = e.eventTimes, a = -1; 0 < i;) {
                var s = 31 - wt(i);
                ((o = 1 << s), (s = t[s]), s > a && (a = s), (i &= ~o));
              }
              if (
                ((i = a),
                (i = mt() - i),
                (i =
                  (120 > i
                    ? 120
                    : 480 > i
                      ? 480
                      : 1080 > i
                        ? 1080
                        : 1920 > i
                          ? 1920
                          : 3e3 > i
                            ? 3e3
                            : 4320 > i
                              ? 4320
                              : 1960 * Rc(i / 1960)) - i),
                10 < i)
              ) {
                e.timeoutHandle = bi(Fl.bind(null, e, $c, nl), i);
                break;
              }
              Fl(e, $c, nl);
              break;
            case 5:
              Fl(e, $c, nl);
              break;
            default:
              throw Error(r(329));
          }
        }
      }
      return (gl(e, mt()), e.callbackNode === n ? _l.bind(null, e) : null);
    }
    function vl(e, t) {
      var n = Qc;
      return (
        e.current.memoizedState.isDehydrated && (El(e, t).flags |= 256),
        (e = Al(e, t)),
        e !== 2 && ((t = $c), ($c = n), t !== null && yl(t)),
        e
      );
    }
    function yl(e) {
      $c === null ? ($c = e) : $c.push.apply($c, e);
    }
    function bl(e) {
      for (var t = e; ;) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var i = n[r],
                a = i.getSnapshot;
              i = i.value;
              try {
                if (!Tr(a(), i)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
          ((n.return = t), (t = n));
        else {
          if (t === e) break;
          for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function xl(e, t) {
      for (
        t &= ~Zc,
          t &= ~Xc,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;
      ) {
        var n = 31 - wt(t),
          r = 1 << n;
        ((e[n] = -1), (t &= ~r));
      }
    }
    function Sl(e) {
      if (Q & 6) throw Error(r(327));
      Ll();
      var t = jt(e, 0);
      if (!(t & 1)) return (gl(e, mt()), null);
      var n = Al(e, t);
      if (e.tag !== 0 && n === 2) {
        var i = Pt(e);
        i !== 0 && ((t = i), (n = vl(e, i)));
      }
      if (n === 1) throw ((n = Jc), El(e, 0), xl(e, t), gl(e, mt()), n);
      if (n === 6) throw Error(r(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Fl(e, $c, nl),
        gl(e, mt()),
        null
      );
    }
    function Cl(e, t) {
      var n = Q;
      Q |= 1;
      try {
        return e(t);
      } finally {
        ((Q = n), Q === 0 && ((tl = mt() + 500), na && oa()));
      }
    }
    function wl(e) {
      sl !== null && sl.tag === 0 && !(Q & 6) && Ll();
      var t = Q;
      Q |= 1;
      var n = Vc.transition,
        r = H;
      try {
        if (((Vc.transition = null), (H = 1), e)) return e();
      } finally {
        ((H = r), (Vc.transition = n), (Q = t), !(Q & 6) && oa());
      }
    }
    function Tl() {
      ((Gc = Kc.current), Hi(Kc));
    }
    function El(e, t) {
      ((e.finishedWork = null), (e.finishedLanes = 0));
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), xi(n)), Uc !== null))
        for (n = Uc.return; n !== null;) {
          var r = n;
          switch ((ya(r), r.tag)) {
            case 1:
              ((r = r.type.childContextTypes), r != null && Xi());
              break;
            case 3:
              (mo(), Hi(Ki), Hi(Gi), bo());
              break;
            case 5:
              go(r);
              break;
            case 4:
              mo();
              break;
            case 13:
              Hi(_o);
              break;
            case 19:
              Hi(_o);
              break;
            case 10:
              q(r.type._context);
              break;
            case 22:
            case 23:
              Tl();
          }
          n = n.return;
        }
      if (
        ((Hc = e),
        (Uc = e = Xl(e.current, null)),
        (Wc = Gc = t),
        (qc = 0),
        (Jc = null),
        (Zc = Xc = Yc = 0),
        ($c = Qc = null),
        Ja !== null)
      ) {
        for (t = 0; t < Ja.length; t++)
          if (((n = Ja[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var i = r.next,
              a = n.pending;
            if (a !== null) {
              var o = a.next;
              ((a.next = i), (r.next = o));
            }
            n.pending = r;
          }
        Ja = null;
      }
      return e;
    }
    function Dl(e, t) {
      do {
        var n = Uc;
        try {
          if ((Wa(), (xo.current = ms), Eo)) {
            for (var i = wo.memoizedState; i !== null;) {
              var a = i.queue;
              (a !== null && (a.pending = null), (i = i.next));
            }
            Eo = !1;
          }
          if (
            ((Co = 0),
            (To = J = wo = null),
            (Do = !1),
            (Oo = 0),
            (Bc.current = null),
            n === null || n.return === null)
          ) {
            ((qc = 1), (Jc = t), (Uc = null));
            break;
          }
          a: {
            var o = e,
              s = n.return,
              c = n,
              l = t;
            if (
              ((t = Wc),
              (c.flags |= 32768),
              typeof l == `object` && l && typeof l.then == `function`)
            ) {
              var u = l,
                d = c,
                f = d.tag;
              if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                var p = d.alternate;
                p
                  ? ((d.updateQueue = p.updateQueue),
                    (d.memoizedState = p.memoizedState),
                    (d.lanes = p.lanes))
                  : ((d.updateQueue = null), (d.memoizedState = null));
              }
              var m = Y(s);
              if (m !== null) {
                ((m.flags &= -257),
                  Ms(m, s, c, o, t),
                  m.mode & 1 && js(o, u, t),
                  (t = m),
                  (l = u));
                var h = t.updateQueue;
                if (h === null) {
                  var g = new Set();
                  (g.add(l), (t.updateQueue = g));
                } else h.add(l);
                break a;
              }
              if (!(t & 1)) {
                (js(o, u, t), kl());
                break a;
              }
              l = Error(r(426));
            } else if (Sa && c.mode & 1) {
              var _ = Y(s);
              if (_ !== null) {
                (!(_.flags & 65536) && (_.flags |= 256),
                  Ms(_, s, c, o, t),
                  Ma(Ts(l, c)));
                break a;
              }
            }
            ((o = l = Ts(l, c)),
              qc !== 4 && (qc = 2),
              Qc === null ? (Qc = [o]) : Qc.push(o),
              (o = s));
            do {
              switch (o.tag) {
                case 3:
                  ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                  var v = ks(o, l, t);
                  io(o, v);
                  break a;
                case 1:
                  c = l;
                  var y = o.type,
                    b = o.stateNode;
                  if (
                    !(o.flags & 128) &&
                    (typeof y.getDerivedStateFromError == `function` ||
                      (b !== null &&
                        typeof b.componentDidCatch == `function` &&
                        (al === null || !al.has(b))))
                  ) {
                    ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                    var x = As(o, c, t);
                    io(o, x);
                    break a;
                  }
              }
              o = o.return;
            } while (o !== null);
          }
          Pl(n);
        } catch (e) {
          ((t = e), Uc === n && n !== null && (Uc = n = n.return));
          continue;
        }
        break;
      } while (1);
    }
    function Ol() {
      var e = zc.current;
      return ((zc.current = ms), e === null ? ms : e);
    }
    function kl() {
      ((qc === 0 || qc === 3 || qc === 2) && (qc = 4),
        Hc === null || (!(Yc & 268435455) && !(Xc & 268435455)) || xl(Hc, Wc));
    }
    function Al(e, t) {
      var n = Q;
      Q |= 2;
      var i = Ol();
      (Hc !== e || Wc !== t) && ((nl = null), El(e, t));
      do
        try {
          jl();
          break;
        } catch (t) {
          Dl(e, t);
        }
      while (1);
      if ((Wa(), (Q = n), (zc.current = i), Uc !== null)) throw Error(r(261));
      return ((Hc = null), (Wc = 0), qc);
    }
    function jl() {
      for (; Uc !== null;) Nl(Uc);
    }
    function Ml() {
      for (; Uc !== null && !ft();) Nl(Uc);
    }
    function Nl(e) {
      var t = Wl(e.alternate, e, Gc);
      ((e.memoizedProps = e.pendingProps),
        t === null ? Pl(e) : (Uc = t),
        (Bc.current = null));
    }
    function Pl(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((n = lc(n, t)), n !== null)) {
            ((n.flags &= 32767), (Uc = n));
            return;
          }
          if (e !== null)
            ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
          else {
            ((qc = 6), (Uc = null));
            return;
          }
        } else if (((n = cc(n, t, Gc)), n !== null)) {
          Uc = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Uc = t;
          return;
        }
        Uc = t = e;
      } while (t !== null);
      qc === 0 && (qc = 5);
    }
    function Fl(e, t, n) {
      var r = H,
        i = Vc.transition;
      try {
        ((Vc.transition = null), (H = 1), Il(e, t, n, r));
      } finally {
        ((Vc.transition = i), (H = r));
      }
      return null;
    }
    function Il(e, t, n, i) {
      do Ll();
      while (sl !== null);
      if (Q & 6) throw Error(r(327));
      n = e.finishedWork;
      var a = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(r(177));
      ((e.callbackNode = null), (e.callbackPriority = 0));
      var o = n.lanes | n.childLanes;
      if (
        (Rt(e, o),
        e === Hc && ((Uc = Hc = null), (Wc = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
          ol ||
          ((ol = !0),
          Gl(vt, function () {
            return (Ll(), null);
          })),
        (o = !!(n.flags & 15990)),
        n.subtreeFlags & 15990 || o)
      ) {
        ((o = Vc.transition), (Vc.transition = null));
        var s = H;
        H = 1;
        var c = Q;
        ((Q |= 4),
          (Bc.current = null),
          gc(e, n),
          jc(n, e),
          Mr(vi),
          (fn = !!_i),
          (vi = _i = null),
          (e.current = n),
          Nc(n, e, a),
          pt(),
          (Q = c),
          (H = s),
          (Vc.transition = o));
      } else e.current = n;
      if (
        (ol && ((ol = !1), (sl = e), (cl = a)),
        (o = e.pendingLanes),
        o === 0 && (al = null),
        Ct(n.stateNode, i),
        gl(e, mt()),
        t !== null)
      )
        for (i = e.onRecoverableError, n = 0; n < t.length; n++)
          ((a = t[n]),
            i(a.value, { componentStack: a.stack, digest: a.digest }));
      if (rl) throw ((rl = !1), (e = il), (il = null), e);
      return (
        cl & 1 && e.tag !== 0 && Ll(),
        (o = e.pendingLanes),
        o & 1 ? (e === ul ? ll++ : ((ll = 0), (ul = e))) : (ll = 0),
        oa(),
        null
      );
    }
    function Ll() {
      if (sl !== null) {
        var e = Bt(cl),
          t = Vc.transition,
          n = H;
        try {
          if (((Vc.transition = null), (H = 16 > e ? 16 : e), sl === null))
            var i = !1;
          else {
            if (((e = sl), (sl = null), (cl = 0), Q & 6)) throw Error(r(331));
            var a = Q;
            for (Q |= 4, Z = e.current; Z !== null;) {
              var o = Z,
                s = o.child;
              if (Z.flags & 16) {
                var c = o.deletions;
                if (c !== null) {
                  for (var l = 0; l < c.length; l++) {
                    var u = c[l];
                    for (Z = u; Z !== null;) {
                      var d = Z;
                      switch (d.tag) {
                        case 0:
                        case 11:
                        case 15:
                          _c(8, d, o);
                      }
                      var f = d.child;
                      if (f !== null) ((f.return = d), (Z = f));
                      else
                        for (; Z !== null;) {
                          d = Z;
                          var p = d.sibling,
                            m = d.return;
                          if ((bc(d), d === u)) {
                            Z = null;
                            break;
                          }
                          if (p !== null) {
                            ((p.return = m), (Z = p));
                            break;
                          }
                          Z = m;
                        }
                    }
                  }
                  var h = o.alternate;
                  if (h !== null) {
                    var g = h.child;
                    if (g !== null) {
                      h.child = null;
                      do {
                        var _ = g.sibling;
                        ((g.sibling = null), (g = _));
                      } while (g !== null);
                    }
                  }
                  Z = o;
                }
              }
              if (o.subtreeFlags & 2064 && s !== null)
                ((s.return = o), (Z = s));
              else
                b: for (; Z !== null;) {
                  if (((o = Z), o.flags & 2048))
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        _c(9, o, o.return);
                    }
                  var v = o.sibling;
                  if (v !== null) {
                    ((v.return = o.return), (Z = v));
                    break b;
                  }
                  Z = o.return;
                }
            }
            var y = e.current;
            for (Z = y; Z !== null;) {
              s = Z;
              var b = s.child;
              if (s.subtreeFlags & 2064 && b !== null)
                ((b.return = s), (Z = b));
              else
                b: for (s = y; Z !== null;) {
                  if (((c = Z), c.flags & 2048))
                    try {
                      switch (c.tag) {
                        case 0:
                        case 11:
                        case 15:
                          vc(9, c);
                      }
                    } catch (e) {
                      zl(c, c.return, e);
                    }
                  if (c === s) {
                    Z = null;
                    break b;
                  }
                  var x = c.sibling;
                  if (x !== null) {
                    ((x.return = c.return), (Z = x));
                    break b;
                  }
                  Z = c.return;
                }
            }
            if (
              ((Q = a),
              oa(),
              St && typeof St.onPostCommitFiberRoot == `function`)
            )
              try {
                St.onPostCommitFiberRoot(xt, e);
              } catch {}
            i = !0;
          }
          return i;
        } finally {
          ((H = n), (Vc.transition = t));
        }
      }
      return !1;
    }
    function Rl(e, t, n) {
      ((t = Ts(n, t)),
        (t = ks(e, t, 1)),
        (e = no(e, t, 1)),
        (t = pl()),
        e !== null && (Lt(e, 1, t), gl(e, t)));
    }
    function zl(e, t, n) {
      if (e.tag === 3) Rl(e, e, n);
      else
        for (; t !== null;) {
          if (t.tag === 3) {
            Rl(t, e, n);
            break;
          }
          if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == `function` ||
              (typeof r.componentDidCatch == `function` &&
                (al === null || !al.has(r)))
            ) {
              ((e = Ts(n, e)),
                (e = As(t, e, 1)),
                (t = no(t, e, 1)),
                (e = pl()),
                t !== null && (Lt(t, 1, e), gl(t, e)));
              break;
            }
          }
          t = t.return;
        }
    }
    function Bl(e, t, n) {
      var r = e.pingCache;
      (r !== null && r.delete(t),
        (t = pl()),
        (e.pingedLanes |= e.suspendedLanes & n),
        Hc === e &&
          (Wc & n) === n &&
          (qc === 4 || (qc === 3 && (Wc & 130023424) === Wc && 500 > mt() - el)
            ? El(e, 0)
            : (Zc |= n)),
        gl(e, t));
    }
    function Vl(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = kt), (kt <<= 1), !(kt & 130023424) && (kt = 4194304))
          : (t = 1));
      var n = pl();
      ((e = Za(e, t)), e !== null && (Lt(e, t, n), gl(e, n)));
    }
    function Hl(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), Vl(e, n));
    }
    function Ul(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode,
            a = e.memoizedState;
          a !== null && (n = a.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        default:
          throw Error(r(314));
      }
      (i !== null && i.delete(t), Vl(e, n));
    }
    var Wl = function (e, t, n) {
      if (e !== null) {
        if (e.memoizedProps !== t.pendingProps || Ki.current) Ps = !0;
        else {
          if ((e.lanes & n) === 0 && !(t.flags & 128))
            return ((Ps = !1), rc(e, t, n));
          Ps = !!(e.flags & 131072);
        }
      } else ((Ps = !1), Sa && t.flags & 1048576 && _a(t, ua, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var i = t.type;
          (tc(e, t), (e = t.pendingProps));
          var a = Ji(t, Gi.current);
          (Ka(t, n), (a = Mo(null, t, i, e, a, n)));
          var o = No();
          return (
            (t.flags |= 1),
            typeof a == `object` &&
            a &&
            typeof a.render == `function` &&
            a.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                Yi(i) ? ((o = !0), $i(t)) : (o = !1),
                (t.memoizedState =
                  a.state !== null && a.state !== void 0 ? a.state : null),
                $a(t),
                (a.updater = bs),
                (t.stateNode = a),
                (a._reactInternals = t),
                ws(t, i, e, n),
                (t = Us(null, t, i, !0, o, n)))
              : ((t.tag = 0),
                Sa && o && va(t),
                Fs(null, t, a, n),
                (t = t.child)),
            t
          );
        case 16:
          i = t.elementType;
          a: {
            switch (
              (tc(e, t),
              (e = t.pendingProps),
              (a = i._init),
              (i = a(i._payload)),
              (t.type = i),
              (a = t.tag = Yl(i)),
              (e = vs(i, e)),
              a)
            ) {
              case 0:
                t = Vs(null, t, i, e, n);
                break a;
              case 1:
                t = Hs(null, t, i, e, n);
                break a;
              case 11:
                t = Is(null, t, i, e, n);
                break a;
              case 14:
                t = Ls(null, t, i, vs(i.type, e), n);
                break a;
            }
            throw Error(r(306, i, ``));
          }
          return t;
        case 0:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : vs(i, a)),
            Vs(e, t, i, a, n)
          );
        case 1:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : vs(i, a)),
            Hs(e, t, i, a, n)
          );
        case 3:
          a: {
            if ((Ws(t), e === null)) throw Error(r(387));
            ((i = t.pendingProps),
              (o = t.memoizedState),
              (a = o.element),
              eo(e, t),
              ao(t, i, null, n));
            var s = t.memoizedState;
            if (((i = s.element), o.isDehydrated)) {
              if (
                ((o = {
                  element: i,
                  isDehydrated: !1,
                  cache: s.cache,
                  pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                  transitions: s.transitions,
                }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                t.flags & 256)
              ) {
                ((a = Ts(Error(r(423)), t)), (t = Gs(e, t, i, n, a)));
                break a;
              }
              if (i !== a) {
                ((a = Ts(Error(r(424)), t)), (t = Gs(e, t, i, n, a)));
                break a;
              }
              for (
                xa = Ei(t.stateNode.containerInfo.firstChild),
                  ba = t,
                  Sa = !0,
                  Ca = null,
                  n = za(t, null, i, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            } else {
              if ((ja(), i === a)) {
                t = nc(e, t, n);
                break a;
              }
              Fs(e, t, i, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            ho(t),
            e === null && Da(t),
            (i = t.type),
            (a = t.pendingProps),
            (o = e === null ? null : e.memoizedProps),
            (s = a.children),
            yi(i, a) ? (s = null) : o !== null && yi(i, o) && (t.flags |= 32),
            Bs(e, t),
            Fs(e, t, s, n),
            t.child
          );
        case 6:
          return (e === null && Da(t), null);
        case 13:
          return Js(e, t, n);
        case 4:
          return (
            po(t, t.stateNode.containerInfo),
            (i = t.pendingProps),
            e === null ? (t.child = Ra(t, null, i, n)) : Fs(e, t, i, n),
            t.child
          );
        case 11:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : vs(i, a)),
            Is(e, t, i, a, n)
          );
        case 7:
          return (Fs(e, t, t.pendingProps, n), t.child);
        case 8:
          return (Fs(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (Fs(e, t, t.pendingProps.children, n), t.child);
        case 10:
          a: {
            if (
              ((i = t.type._context),
              (a = t.pendingProps),
              (o = t.memoizedProps),
              (s = a.value),
              Ui(Ba, i._currentValue),
              (i._currentValue = s),
              o !== null)
            ) {
              if (Tr(o.value, s)) {
                if (o.children === a.children && !Ki.current) {
                  t = nc(e, t, n);
                  break a;
                }
              } else
                for (o = t.child, o !== null && (o.return = t); o !== null;) {
                  var c = o.dependencies;
                  if (c !== null) {
                    s = o.child;
                    for (var l = c.firstContext; l !== null;) {
                      if (l.context === i) {
                        if (o.tag === 1) {
                          ((l = to(-1, n & -n)), (l.tag = 2));
                          var u = o.updateQueue;
                          if (u !== null) {
                            u = u.shared;
                            var d = u.pending;
                            (d === null
                              ? (l.next = l)
                              : ((l.next = d.next), (d.next = l)),
                              (u.pending = l));
                          }
                        }
                        ((o.lanes |= n),
                          (l = o.alternate),
                          l !== null && (l.lanes |= n),
                          Ga(o.return, n, t),
                          (c.lanes |= n));
                        break;
                      }
                      l = l.next;
                    }
                  } else if (o.tag === 10)
                    s = o.type === t.type ? null : o.child;
                  else if (o.tag === 18) {
                    if (((s = o.return), s === null)) throw Error(r(341));
                    ((s.lanes |= n),
                      (c = s.alternate),
                      c !== null && (c.lanes |= n),
                      Ga(s, n, t),
                      (s = o.sibling));
                  } else s = o.child;
                  if (s !== null) s.return = o;
                  else
                    for (s = o; s !== null;) {
                      if (s === t) {
                        s = null;
                        break;
                      }
                      if (((o = s.sibling), o !== null)) {
                        ((o.return = s.return), (s = o));
                        break;
                      }
                      s = s.return;
                    }
                  o = s;
                }
            }
            (Fs(e, t, a.children, n), (t = t.child));
          }
          return t;
        case 9:
          return (
            (a = t.type),
            (i = t.pendingProps.children),
            Ka(t, n),
            (a = qa(a)),
            (i = i(a)),
            (t.flags |= 1),
            Fs(e, t, i, n),
            t.child
          );
        case 14:
          return (
            (i = t.type),
            (a = vs(i, t.pendingProps)),
            (a = vs(i.type, a)),
            Ls(e, t, i, a, n)
          );
        case 15:
          return Rs(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : vs(i, a)),
            tc(e, t),
            (t.tag = 1),
            Yi(i) ? ((e = !0), $i(t)) : (e = !1),
            Ka(t, n),
            Ss(t, i, a),
            ws(t, i, a, n),
            Us(null, t, i, !0, e, n)
          );
        case 19:
          return ec(e, t, n);
        case 22:
          return zs(e, t, n);
      }
      throw Error(r(156, t.tag));
    };
    function Gl(e, t) {
      return ut(e, t);
    }
    function Kl(e, t, n, r) {
      ((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function ql(e, t, n, r) {
      return new Kl(e, t, n, r);
    }
    function Jl(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function Yl(e) {
      if (typeof e == `function`) return +!!Jl(e);
      if (e != null) {
        if (((e = e.$$typeof), e === j)) return 11;
        if (e === P) return 14;
      }
      return 2;
    }
    function Xl(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = ql(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Zl(e, t, n, i, a, o) {
      var s = 2;
      if (((i = e), typeof e == `function`)) Jl(e) && (s = 1);
      else if (typeof e == `string`) s = 5;
      else
        a: switch (e) {
          case E:
            return Ql(n.children, a, o, t);
          case D:
            ((s = 8), (a |= 8));
            break;
          case O:
            return (
              (e = ql(12, n, t, a | 2)),
              (e.elementType = O),
              (e.lanes = o),
              e
            );
          case M:
            return (
              (e = ql(13, n, t, a)),
              (e.elementType = M),
              (e.lanes = o),
              e
            );
          case N:
            return (
              (e = ql(19, n, t, a)),
              (e.elementType = N),
              (e.lanes = o),
              e
            );
          case ee:
            return $(n, a, o, t);
          default:
            if (typeof e == `object` && e)
              switch (e.$$typeof) {
                case k:
                  s = 10;
                  break a;
                case A:
                  s = 9;
                  break a;
                case j:
                  s = 11;
                  break a;
                case P:
                  s = 14;
                  break a;
                case F:
                  ((s = 16), (i = null));
                  break a;
              }
            throw Error(r(130, e == null ? e : typeof e, ``));
        }
      return (
        (t = ql(s, n, t, a)),
        (t.elementType = e),
        (t.type = i),
        (t.lanes = o),
        t
      );
    }
    function Ql(e, t, n, r) {
      return ((e = ql(7, e, r, t)), (e.lanes = n), e);
    }
    function $(e, t, n, r) {
      return (
        (e = ql(22, e, r, t)),
        (e.elementType = ee),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function $l(e, t, n) {
      return ((e = ql(6, e, null, t)), (e.lanes = n), e);
    }
    function eu(e, t, n) {
      return (
        (t = ql(4, e.children === null ? [] : e.children, e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function tu(e, t, n, r, i) {
      ((this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
          this.pingCache =
          this.current =
          this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = It(0)),
        (this.expirationTimes = It(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = It(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null));
    }
    function nu(e, t, n, r, i, a, o, s, c) {
      return (
        (e = new tu(e, t, n, s, c)),
        t === 1 ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
        (a = ql(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (a.memoizedState = {
          element: r,
          isDehydrated: n,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        $a(a),
        e
      );
    }
    function ru(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: T,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function iu(e) {
      if (!e) return Wi;
      e = e._reactInternals;
      a: {
        if (it(e) !== e || e.tag !== 1) throw Error(r(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break a;
            case 1:
              if (Yi(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(r(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (Yi(n)) return Qi(e, n, t);
      }
      return t;
    }
    function au(e, t, n, r, i, a, o, s, c) {
      return (
        (e = nu(n, r, !0, e, i, a, o, s, c)),
        (e.context = iu(null)),
        (n = e.current),
        (r = pl()),
        (i = ml(n)),
        (a = to(r, i)),
        (a.callback = t ?? null),
        no(n, a, i),
        (e.current.lanes = i),
        Lt(e, i, r),
        gl(e, r),
        e
      );
    }
    function ou(e, t, n, r) {
      var i = t.current,
        a = pl(),
        o = ml(i);
      return (
        (n = iu(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = to(a, o)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = no(i, t, o)),
        e !== null && (hl(e, i, o, a), ro(e, i, o)),
        o
      );
    }
    function su(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function cu(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function lu(e, t) {
      (cu(e, t), (e = e.alternate) && cu(e, t));
    }
    function uu() {
      return null;
    }
    var du =
      typeof reportError == `function`
        ? reportError
        : function (e) {
            console.error(e);
          };
    function fu(e) {
      this._internalRoot = e;
    }
    ((pu.prototype.render = fu.prototype.render =
      function (e) {
        var t = this._internalRoot;
        if (t === null) throw Error(r(409));
        ou(e, t, null, null);
      }),
      (pu.prototype.unmount = fu.prototype.unmount =
        function () {
          var e = this._internalRoot;
          if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            (wl(function () {
              ou(null, e, null, null);
            }),
              (t[ji] = null));
          }
        }));
    function pu(e) {
      this._internalRoot = e;
    }
    pu.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Wt();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < $t.length && t !== 0 && t < $t[n].priority; n++);
        ($t.splice(n, 0, e), n === 0 && an(e));
      }
    };
    function mu(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function hu(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== ` react-mount-point-unstable `))
      );
    }
    function gu() {}
    function _u(e, t, n, r, i) {
      if (i) {
        if (typeof r == `function`) {
          var a = r;
          r = function () {
            var e = su(o);
            a.call(e);
          };
        }
        var o = au(t, r, e, 0, null, !1, !1, ``, gu);
        return (
          (e._reactRootContainer = o),
          (e[ji] = o.current),
          ai(e.nodeType === 8 ? e.parentNode : e),
          wl(),
          o
        );
      }
      for (; (i = e.lastChild);) e.removeChild(i);
      if (typeof r == `function`) {
        var s = r;
        r = function () {
          var e = su(c);
          s.call(e);
        };
      }
      var c = nu(e, 0, !1, null, null, !1, !1, ``, gu);
      return (
        (e._reactRootContainer = c),
        (e[ji] = c.current),
        ai(e.nodeType === 8 ? e.parentNode : e),
        wl(function () {
          ou(t, c, n, r);
        }),
        c
      );
    }
    function vu(e, t, n, r, i) {
      var a = n._reactRootContainer;
      if (a) {
        var o = a;
        if (typeof i == `function`) {
          var s = i;
          i = function () {
            var e = su(o);
            s.call(e);
          };
        }
        ou(t, o, e, i);
      } else o = _u(n, t, e, i, r);
      return su(o);
    }
    ((Vt = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = At(t.pendingLanes);
            n !== 0 &&
              (zt(t, n | 1),
              gl(t, mt()),
              !(Q & 6) && ((tl = mt() + 500), oa()));
          }
          break;
        case 13:
          (wl(function () {
            var t = Za(e, 1);
            t !== null && hl(t, e, 1, pl());
          }),
            lu(e, 1));
      }
    }),
      (Ht = function (e) {
        if (e.tag === 13) {
          var t = Za(e, 134217728);
          (t !== null && hl(t, e, 134217728, pl()), lu(e, 134217728));
        }
      }),
      (Ut = function (e) {
        if (e.tag === 13) {
          var t = ml(e),
            n = Za(e, t);
          (n !== null && hl(n, e, t, pl()), lu(e, t));
        }
      }),
      (Wt = function () {
        return H;
      }),
      (Gt = function (e, t) {
        var n = H;
        try {
          return ((H = e), t());
        } finally {
          H = n;
        }
      }),
      (Le = function (e, t, n) {
        switch (t) {
          case `input`:
            if ((he(e, n), (t = n.name), n.type === `radio` && t != null)) {
              for (n = e; n.parentNode;) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  `input[name=` + JSON.stringify(`` + t) + `][type="radio"]`,
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var i = n[t];
                if (i !== e && i.form === e.form) {
                  var a = Ri(i);
                  if (!a) throw Error(r(90));
                  (ue(i), he(i, a));
                }
              }
            }
            break;
          case `textarea`:
            xe(e, n);
            break;
          case `select`:
            ((t = n.value), t != null && ye(e, !!n.multiple, t, !1));
        }
      }),
      (Ue = Cl),
      (We = wl));
    var yu = { usingClientEntryPoint: !1, Events: [Ii, Li, Ri, Ve, He, Cl] },
      bu = {
        findFiberByHostInstance: Fi,
        bundleType: 0,
        version: `18.3.1`,
        rendererPackageName: `react-dom`,
      },
      xu = {
        bundleType: bu.bundleType,
        version: bu.version,
        rendererPackageName: bu.rendererPackageName,
        rendererConfig: bu.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: C.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return ((e = ct(e)), e === null ? null : e.stateNode);
        },
        findFiberByHostInstance: bu.findFiberByHostInstance || uu,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: `18.3.1-next-f1338f8080-20240426`,
      };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
      var Su = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Su.isDisabled && Su.supportsFiber)
        try {
          ((xt = Su.inject(xu)), (St = Su));
        } catch {}
    }
    ((e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yu),
      (e.createPortal = function (e, t) {
        var n =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!mu(t)) throw Error(r(200));
        return ru(e, t, null, n);
      }),
      (e.createRoot = function (e, t) {
        if (!mu(e)) throw Error(r(299));
        var n = !1,
          i = ``,
          a = du;
        return (
          t != null &&
            (!0 === t.unstable_strictMode && (n = !0),
            t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (a = t.onRecoverableError)),
          (t = nu(e, 1, !1, null, null, n, !1, i, a)),
          (e[ji] = t.current),
          ai(e.nodeType === 8 ? e.parentNode : e),
          new fu(t)
        );
      }),
      (e.findDOMNode = function (e) {
        if (e == null) return null;
        if (e.nodeType === 1) return e;
        var t = e._reactInternals;
        if (t === void 0)
          throw typeof e.render == `function`
            ? Error(r(188))
            : ((e = Object.keys(e).join(`,`)), Error(r(268, e)));
        return ((e = ct(t)), (e = e === null ? null : e.stateNode), e);
      }),
      (e.flushSync = function (e) {
        return wl(e);
      }),
      (e.hydrate = function (e, t, n) {
        if (!hu(t)) throw Error(r(200));
        return vu(null, e, t, !0, n);
      }),
      (e.hydrateRoot = function (e, t, n) {
        if (!mu(e)) throw Error(r(405));
        var i = (n != null && n.hydratedSources) || null,
          a = !1,
          o = ``,
          s = du;
        if (
          (n != null &&
            (!0 === n.unstable_strictMode && (a = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
          (t = au(t, null, e, 1, n ?? null, a, !1, o, s)),
          (e[ji] = t.current),
          ai(e),
          i)
        )
          for (e = 0; e < i.length; e++)
            ((n = i[e]),
              (a = n._getVersion),
              (a = a(n._source)),
              t.mutableSourceEagerHydrationData == null
                ? (t.mutableSourceEagerHydrationData = [n, a])
                : t.mutableSourceEagerHydrationData.push(n, a));
        return new pu(t);
      }),
      (e.render = function (e, t, n) {
        if (!hu(t)) throw Error(r(200));
        return vu(null, e, t, !1, n);
      }),
      (e.unmountComponentAtNode = function (e) {
        if (!hu(e)) throw Error(r(40));
        return e._reactRootContainer
          ? (wl(function () {
              vu(null, null, e, !1, function () {
                ((e._reactRootContainer = null), (e[ji] = null));
              });
            }),
            !0)
          : !1;
      }),
      (e.unstable_batchedUpdates = Cl),
      (e.unstable_renderSubtreeIntoContainer = function (e, t, n, i) {
        if (!hu(n)) throw Error(r(200));
        if (e == null || e._reactInternals === void 0) throw Error(r(38));
        return vu(e, t, n, !1, i);
      }),
      (e.version = `18.3.1-next-f1338f8080-20240426`));
  }),
  g = o((e, t) => {
    function n() {
      if (!(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
      ))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = h()));
  }),
  _ = l(
    o((e) => {
      var t = g();
      ((e.createRoot = t.createRoot), (e.hydrateRoot = t.hydrateRoot));
    })(),
  );
function v(e) {
  var t = [...arguments].slice(1);
  throw Error(
    `[Immer] minified error nr: ` +
      e +
      (t.length
        ? ` ` +
          t
            .map(function (e) {
              return `'` + e + `'`;
            })
            .join(`,`)
        : ``) +
      `. Find the full error at: https://bit.ly/3cXEKWf`,
  );
}
function y(e) {
  return !!e && !!e[V];
}
function b(e) {
  return (
    !!e &&
    ((function (e) {
      if (!e || typeof e != `object`) return !1;
      var t = Object.getPrototypeOf(e);
      if (t === null) return !0;
      var n = Object.hasOwnProperty.call(t, `constructor`) && t.constructor;
      return (
        n === Object ||
        (typeof n == `function` && Function.toString.call(n) === xe)
      );
    })(e) ||
      Array.isArray(e) ||
      !!e[be] ||
      !!e.constructor?.[be] ||
      D(e) ||
      O(e))
  );
}
function x(e, t, n) {
  (n === void 0 && (n = !1),
    S(e) === 0
      ? (n ? Object.keys : Se)(e).forEach(function (r) {
          (n && typeof r == `symbol`) || t(r, e[r], e);
        })
      : e.forEach(function (n, r) {
          return t(r, n, e);
        }));
}
function S(e) {
  var t = e[V];
  return t
    ? t.i > 3
      ? t.i - 4
      : t.i
    : Array.isArray(e)
      ? 1
      : D(e)
        ? 2
        : O(e)
          ? 3
          : 0;
}
function C(e, t) {
  return S(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function w(e, t) {
  return S(e) === 2 ? e.get(t) : e[t];
}
function T(e, t, n) {
  var r = S(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function E(e, t) {
  return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function D(e) {
  return ge && e instanceof Map;
}
function O(e) {
  return _e && e instanceof Set;
}
function k(e) {
  return e.o || e.t;
}
function A(e) {
  if (Array.isArray(e)) return Array.prototype.slice.call(e);
  var t = Ce(e);
  delete t[V];
  for (var n = Se(t), r = 0; r < n.length; r++) {
    var i = n[r],
      a = t[i];
    (!1 === a.writable && ((a.writable = !0), (a.configurable = !0)),
      (a.get || a.set) &&
        (t[i] = {
          configurable: !0,
          writable: !0,
          enumerable: a.enumerable,
          value: e[i],
        }));
  }
  return Object.create(Object.getPrototypeOf(e), t);
}
function j(e, t) {
  return (
    t === void 0 && (t = !1),
    N(e) ||
      y(e) ||
      !b(e) ||
      (S(e) > 1 && (e.set = e.add = e.clear = e.delete = M),
      Object.freeze(e),
      t &&
        x(
          e,
          function (e, t) {
            return j(t, !0);
          },
          !0,
        )),
    e
  );
}
function M() {
  v(2);
}
function N(e) {
  return typeof e != `object` || !e || Object.isFrozen(e);
}
function P(e) {
  var t = we[e];
  return (t || v(18, e), t);
}
function F(e, t) {
  we[e] || (we[e] = t);
}
function ee() {
  return me;
}
function te(e, t) {
  t && (P(`Patches`), (e.u = []), (e.s = []), (e.v = t));
}
function I(e) {
  (L(e), e.p.forEach(z), (e.p = null));
}
function L(e) {
  e === me && (me = e.l);
}
function R(e) {
  return (me = { p: [], l: me, h: e, m: !0, _: 0 });
}
function z(e) {
  var t = e[V];
  t.i === 0 || t.i === 1 ? t.j() : (t.g = !0);
}
function ne(e, t) {
  t._ = t.p.length;
  var n = t.p[0],
    r = e !== void 0 && e !== n;
  return (
    t.h.O || P(`ES5`).S(t, e, r),
    r
      ? (n[V].P && (I(t), v(4)),
        b(e) && ((e = re(t, e)), t.l || ae(t, e)),
        t.u && P(`Patches`).M(n[V].t, e, t.u, t.s))
      : (e = re(t, n, [])),
    I(t),
    t.u && t.v(t.u, t.s),
    e === ye ? void 0 : e
  );
}
function re(e, t, n) {
  if (N(t)) return t;
  var r = t[V];
  if (!r)
    return (
      x(
        t,
        function (i, a) {
          return ie(e, r, t, i, a, n);
        },
        !0,
      ),
      t
    );
  if (r.A !== e) return t;
  if (!r.P) return (ae(e, r.t, !0), r.t);
  if (!r.I) {
    ((r.I = !0), r.A._--);
    var i = r.i === 4 || r.i === 5 ? (r.o = A(r.k)) : r.o,
      a = i,
      o = !1;
    (r.i === 3 && ((a = new Set(i)), i.clear(), (o = !0)),
      x(a, function (t, a) {
        return ie(e, r, i, t, a, n, o);
      }),
      ae(e, i, !1),
      n && e.u && P(`Patches`).N(r, n, e.u, e.s));
  }
  return r.o;
}
function ie(e, t, n, r, i, a, o) {
  if (y(i)) {
    var s = re(e, i, a && t && t.i !== 3 && !C(t.R, r) ? a.concat(r) : void 0);
    if ((T(n, r, s), !y(s))) return;
    e.m = !1;
  } else o && n.add(i);
  if (b(i) && !N(i)) {
    if (!e.h.D && e._ < 1) return;
    (re(e, i), (t && t.A.l) || ae(e, i));
  }
}
function ae(e, t, n) {
  (n === void 0 && (n = !1), !e.l && e.h.D && e.m && j(t, n));
}
function oe(e, t) {
  var n = e[V];
  return (n ? k(n) : e)[t];
}
function se(e, t) {
  if (t in e)
    for (var n = Object.getPrototypeOf(e); n;) {
      var r = Object.getOwnPropertyDescriptor(n, t);
      if (r) return r;
      n = Object.getPrototypeOf(n);
    }
}
function B(e) {
  e.P || ((e.P = !0), e.l && B(e.l));
}
function ce(e) {
  e.o ||= A(e.t);
}
function le(e, t, n) {
  var r = D(t)
    ? P(`MapSet`).F(t, n)
    : O(t)
      ? P(`MapSet`).T(t, n)
      : e.O
        ? (function (e, t) {
            var n = Array.isArray(e),
              r = {
                i: +!!n,
                A: t ? t.A : ee(),
                P: !1,
                I: !1,
                R: {},
                l: t,
                t: e,
                k: null,
                o: null,
                j: null,
                C: !1,
              },
              i = r,
              a = Te;
            n && ((i = [r]), (a = Ee));
            var o = Proxy.revocable(i, a),
              s = o.revoke,
              c = o.proxy;
            return ((r.k = c), (r.j = s), c);
          })(t, n)
        : P(`ES5`).J(t, n);
  return ((n ? n.A : ee()).p.push(r), r);
}
function ue(e) {
  return (
    y(e) || v(22, e),
    (function e(t) {
      if (!b(t)) return t;
      var n,
        r = t[V],
        i = S(t);
      if (r) {
        if (!r.P && (r.i < 4 || !P(`ES5`).K(r))) return r.t;
        ((r.I = !0), (n = de(t, i)), (r.I = !1));
      } else n = de(t, i);
      return (
        x(n, function (t, i) {
          (r && w(r.t, t) === i) || T(n, t, e(i));
        }),
        i === 3 ? new Set(n) : n
      );
    })(e)
  );
}
function de(e, t) {
  switch (t) {
    case 2:
      return new Map(e);
    case 3:
      return Array.from(e);
  }
  return A(e);
}
function fe() {
  function e(e, t) {
    var n = i[e];
    return (
      n
        ? (n.enumerable = t)
        : (i[e] = n =
            {
              configurable: !0,
              enumerable: t,
              get: function () {
                var t = this[V];
                return Te.get(t, e);
              },
              set: function (t) {
                var n = this[V];
                Te.set(n, e, t);
              },
            }),
      n
    );
  }
  function t(e) {
    for (var t = e.length - 1; t >= 0; t--) {
      var i = e[t][V];
      if (!i.P)
        switch (i.i) {
          case 5:
            r(i) && B(i);
            break;
          case 4:
            n(i) && B(i);
        }
    }
  }
  function n(e) {
    for (var t = e.t, n = e.k, r = Se(n), i = r.length - 1; i >= 0; i--) {
      var a = r[i];
      if (a !== V) {
        var o = t[a];
        if (o === void 0 && !C(t, a)) return !0;
        var s = n[a],
          c = s && s[V];
        if (c ? c.t !== o : !E(s, o)) return !0;
      }
    }
    var l = !!t[V];
    return r.length !== Se(t).length + +!l;
  }
  function r(e) {
    var t = e.k;
    if (t.length !== e.t.length) return !0;
    var n = Object.getOwnPropertyDescriptor(t, t.length - 1);
    if (n && !n.get) return !0;
    for (var r = 0; r < t.length; r++) if (!t.hasOwnProperty(r)) return !0;
    return !1;
  }
  var i = {};
  F(`ES5`, {
    J: function (t, n) {
      var r = Array.isArray(t),
        i = (function (t, n) {
          if (t) {
            for (var r = Array(n.length), i = 0; i < n.length; i++)
              Object.defineProperty(r, `` + i, e(i, !0));
            return r;
          }
          var a = Ce(n);
          delete a[V];
          for (var o = Se(a), s = 0; s < o.length; s++) {
            var c = o[s];
            a[c] = e(c, t || !!a[c].enumerable);
          }
          return Object.create(Object.getPrototypeOf(n), a);
        })(r, t),
        a = {
          i: r ? 5 : 4,
          A: n ? n.A : ee(),
          P: !1,
          I: !1,
          R: {},
          l: n,
          t,
          k: i,
          o: null,
          g: !1,
          C: !1,
        };
      return (Object.defineProperty(i, V, { value: a, writable: !0 }), i);
    },
    S: function (e, n, i) {
      i
        ? y(n) && n[V].A === e && t(e.p)
        : (e.u &&
            (function e(t) {
              if (t && typeof t == `object`) {
                var n = t[V];
                if (n) {
                  var i = n.t,
                    a = n.k,
                    o = n.R,
                    s = n.i;
                  if (s === 4)
                    (x(a, function (t) {
                      t !== V &&
                        (i[t] !== void 0 || C(i, t)
                          ? o[t] || e(a[t])
                          : ((o[t] = !0), B(n)));
                    }),
                      x(i, function (e) {
                        a[e] !== void 0 || C(a, e) || ((o[e] = !1), B(n));
                      }));
                  else if (s === 5) {
                    if ((r(n) && (B(n), (o.length = !0)), a.length < i.length))
                      for (var c = a.length; c < i.length; c++) o[c] = !1;
                    else for (var l = i.length; l < a.length; l++) o[l] = !0;
                    for (
                      var u = Math.min(a.length, i.length), d = 0;
                      d < u;
                      d++
                    )
                      (a.hasOwnProperty(d) || (o[d] = !0),
                        o[d] === void 0 && e(a[d]));
                  }
                }
              }
            })(e.p[0]),
          t(e.p));
    },
    K: function (e) {
      return e.i === 4 ? n(e) : r(e);
    },
  });
}
var pe,
  me,
  he = typeof Symbol < `u` && typeof Symbol(`x`) == `symbol`,
  ge = typeof Map < `u`,
  _e = typeof Set < `u`,
  ve = typeof Proxy < `u` && Proxy.revocable !== void 0 && typeof Reflect < `u`,
  ye = he
    ? Symbol.for(`immer-nothing`)
    : (((pe = {})[`immer-nothing`] = !0), pe),
  be = he ? Symbol.for(`immer-draftable`) : `__$immer_draftable`,
  V = he ? Symbol.for(`immer-state`) : `__$immer_state`,
  xe = `` + Object.prototype.constructor,
  Se =
    typeof Reflect < `u` && Reflect.ownKeys
      ? Reflect.ownKeys
      : Object.getOwnPropertySymbols === void 0
        ? Object.getOwnPropertyNames
        : function (e) {
            return Object.getOwnPropertyNames(e).concat(
              Object.getOwnPropertySymbols(e),
            );
          },
  Ce =
    Object.getOwnPropertyDescriptors ||
    function (e) {
      var t = {};
      return (
        Se(e).forEach(function (n) {
          t[n] = Object.getOwnPropertyDescriptor(e, n);
        }),
        t
      );
    },
  we = {},
  Te = {
    get: function (e, t) {
      if (t === V) return e;
      var n = k(e);
      if (!C(n, t))
        return (function (e, t, n) {
          var r = se(t, n);
          return r ? (`value` in r ? r.value : r.get?.call(e.k)) : void 0;
        })(e, n, t);
      var r = n[t];
      return e.I || !b(r)
        ? r
        : r === oe(e.t, t)
          ? (ce(e), (e.o[t] = le(e.A.h, r, e)))
          : r;
    },
    has: function (e, t) {
      return t in k(e);
    },
    ownKeys: function (e) {
      return Reflect.ownKeys(k(e));
    },
    set: function (e, t, n) {
      var r = se(k(e), t);
      if (r?.set) return (r.set.call(e.k, n), !0);
      if (!e.P) {
        var i = oe(k(e), t),
          a = i?.[V];
        if (a && a.t === n) return ((e.o[t] = n), (e.R[t] = !1), !0);
        if (E(n, i) && (n !== void 0 || C(e.t, t))) return !0;
        (ce(e), B(e));
      }
      return (
        (e.o[t] === n && (n !== void 0 || t in e.o)) ||
          (Number.isNaN(n) && Number.isNaN(e.o[t])) ||
          ((e.o[t] = n), (e.R[t] = !0)),
        !0
      );
    },
    deleteProperty: function (e, t) {
      return (
        oe(e.t, t) !== void 0 || t in e.t
          ? ((e.R[t] = !1), ce(e), B(e))
          : delete e.R[t],
        e.o && delete e.o[t],
        !0
      );
    },
    getOwnPropertyDescriptor: function (e, t) {
      var n = k(e),
        r = Reflect.getOwnPropertyDescriptor(n, t);
      return (
        r && {
          writable: !0,
          configurable: e.i !== 1 || t !== `length`,
          enumerable: r.enumerable,
          value: n[t],
        }
      );
    },
    defineProperty: function () {
      v(11);
    },
    getPrototypeOf: function (e) {
      return Object.getPrototypeOf(e.t);
    },
    setPrototypeOf: function () {
      v(12);
    },
  },
  Ee = {};
(x(Te, function (e, t) {
  Ee[e] = function () {
    return ((arguments[0] = arguments[0][0]), t.apply(this, arguments));
  };
}),
  (Ee.deleteProperty = function (e, t) {
    return Ee.set.call(this, e, t, void 0);
  }),
  (Ee.set = function (e, t, n) {
    return Te.set.call(this, e[0], t, n, e[0]);
  }));
var De = new ((function () {
    function e(e) {
      var t = this;
      ((this.O = ve),
        (this.D = !0),
        (this.produce = function (e, n, r) {
          if (typeof e == `function` && typeof n != `function`) {
            var i = n;
            n = e;
            var a = t;
            return function (e) {
              var t = this;
              e === void 0 && (e = i);
              var r = [...arguments].slice(1);
              return a.produce(e, function (e) {
                var i;
                return (i = n).call.apply(i, [t, e].concat(r));
              });
            };
          }
          var o;
          if (
            (typeof n != `function` && v(6),
            r !== void 0 && typeof r != `function` && v(7),
            b(e))
          ) {
            var s = R(t),
              c = le(t, e, void 0),
              l = !0;
            try {
              ((o = n(c)), (l = !1));
            } finally {
              l ? I(s) : L(s);
            }
            return typeof Promise < `u` && o instanceof Promise
              ? o.then(
                  function (e) {
                    return (te(s, r), ne(e, s));
                  },
                  function (e) {
                    throw (I(s), e);
                  },
                )
              : (te(s, r), ne(o, s));
          }
          if (!e || typeof e != `object`) {
            if (
              ((o = n(e)) === void 0 && (o = e),
              o === ye && (o = void 0),
              t.D && j(o, !0),
              r)
            ) {
              var u = [],
                d = [];
              (P(`Patches`).M(e, o, u, d), r(u, d));
            }
            return o;
          }
          v(21, e);
        }),
        (this.produceWithPatches = function (e, n) {
          if (typeof e == `function`)
            return function (n) {
              var r = [...arguments].slice(1);
              return t.produceWithPatches(n, function (t) {
                return e.apply(void 0, [t].concat(r));
              });
            };
          var r,
            i,
            a = t.produce(e, n, function (e, t) {
              ((r = e), (i = t));
            });
          return typeof Promise < `u` && a instanceof Promise
            ? a.then(function (e) {
                return [e, r, i];
              })
            : [a, r, i];
        }),
        typeof e?.useProxies == `boolean` && this.setUseProxies(e.useProxies),
        typeof e?.autoFreeze == `boolean` && this.setAutoFreeze(e.autoFreeze));
    }
    var t = e.prototype;
    return (
      (t.createDraft = function (e) {
        (b(e) || v(8), y(e) && (e = ue(e)));
        var t = R(this),
          n = le(this, e, void 0);
        return ((n[V].C = !0), L(t), n);
      }),
      (t.finishDraft = function (e, t) {
        var n = (e && e[V]).A;
        return (te(n, t), ne(void 0, n));
      }),
      (t.setAutoFreeze = function (e) {
        this.D = e;
      }),
      (t.setUseProxies = function (e) {
        (e && !ve && v(20), (this.O = e));
      }),
      (t.applyPatches = function (e, t) {
        var n;
        for (n = t.length - 1; n >= 0; n--) {
          var r = t[n];
          if (r.path.length === 0 && r.op === `replace`) {
            e = r.value;
            break;
          }
        }
        n > -1 && (t = t.slice(n + 1));
        var i = P(`Patches`).$;
        return y(e)
          ? i(e, t)
          : this.produce(e, function (e) {
              return i(e, t);
            });
      }),
      e
    );
  })())(),
  Oe = De.produce;
(De.produceWithPatches.bind(De),
  De.setAutoFreeze.bind(De),
  De.setUseProxies.bind(De),
  De.applyPatches.bind(De),
  De.createDraft.bind(De),
  De.finishDraft.bind(De));
function ke(e) {
  "@babel/helpers - typeof";
  return (
    (ke =
      typeof Symbol == `function` && typeof Symbol.iterator == `symbol`
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == `function` &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? `symbol`
              : typeof e;
          }),
    ke(e)
  );
}
function Ae(e, t) {
  if (ke(e) != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (ke(r) != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function je(e) {
  var t = Ae(e, `string`);
  return ke(t) == `symbol` ? t : t + ``;
}
function Me(e, t, n) {
  return (
    (t = je(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Ne(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    (t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function Pe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] == null ? {} : arguments[t];
    t % 2
      ? Ne(Object(n), !0).forEach(function (t) {
          Me(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Ne(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function Fe(e) {
  return (
    `Minified Redux error #` +
    e +
    `; visit https://redux.js.org/Errors?code=` +
    e +
    ` for the full message or use the non-minified dev environment for full errors. `
  );
}
var Ie = (function () {
    return (typeof Symbol == `function` && Symbol.observable) || `@@observable`;
  })(),
  Le = function () {
    return Math.random().toString(36).substring(7).split(``).join(`.`);
  },
  Re = {
    INIT: `@@redux/INIT` + Le(),
    REPLACE: `@@redux/REPLACE` + Le(),
    PROBE_UNKNOWN_ACTION: function () {
      return `@@redux/PROBE_UNKNOWN_ACTION` + Le();
    },
  };
function ze(e) {
  if (typeof e != `object` || !e) return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null;)
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function Be(e, t, n) {
  var r;
  if (
    (typeof t == `function` && typeof n == `function`) ||
    (typeof n == `function` && typeof arguments[3] == `function`)
  )
    throw Error(Fe(0));
  if (
    (typeof t == `function` && n === void 0 && ((n = t), (t = void 0)),
    n !== void 0)
  ) {
    if (typeof n != `function`) throw Error(Fe(1));
    return n(Be)(e, t);
  }
  if (typeof e != `function`) throw Error(Fe(2));
  var i = e,
    a = t,
    o = [],
    s = o,
    c = !1;
  function l() {
    s === o && (s = o.slice());
  }
  function u() {
    if (c) throw Error(Fe(3));
    return a;
  }
  function d(e) {
    if (typeof e != `function`) throw Error(Fe(4));
    if (c) throw Error(Fe(5));
    var t = !0;
    return (
      l(),
      s.push(e),
      function () {
        if (t) {
          if (c) throw Error(Fe(6));
          ((t = !1), l());
          var n = s.indexOf(e);
          (s.splice(n, 1), (o = null));
        }
      }
    );
  }
  function f(e) {
    if (!ze(e)) throw Error(Fe(7));
    if (e.type === void 0) throw Error(Fe(8));
    if (c) throw Error(Fe(9));
    try {
      ((c = !0), (a = i(a, e)));
    } finally {
      c = !1;
    }
    for (var t = (o = s), n = 0; n < t.length; n++) {
      var r = t[n];
      r();
    }
    return e;
  }
  function p(e) {
    if (typeof e != `function`) throw Error(Fe(10));
    ((i = e), f({ type: Re.REPLACE }));
  }
  function m() {
    var e,
      t = d;
    return (
      (e = {
        subscribe: function (e) {
          if (typeof e != `object` || !e) throw Error(Fe(11));
          function n() {
            e.next && e.next(u());
          }
          return (n(), { unsubscribe: t(n) });
        },
      }),
      (e[Ie] = function () {
        return this;
      }),
      e
    );
  }
  return (
    f({ type: Re.INIT }),
    (r = { dispatch: f, subscribe: d, getState: u, replaceReducer: p }),
    (r[Ie] = m),
    r
  );
}
function Ve(e) {
  Object.keys(e).forEach(function (t) {
    var n = e[t];
    if (n(void 0, { type: Re.INIT }) === void 0) throw Error(Fe(12));
    if (n(void 0, { type: Re.PROBE_UNKNOWN_ACTION() }) === void 0)
      throw Error(Fe(13));
  });
}
function He(e) {
  for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
    var i = t[r];
    typeof e[i] == `function` && (n[i] = e[i]);
  }
  var a = Object.keys(n),
    o;
  try {
    Ve(n);
  } catch (e) {
    o = e;
  }
  return function (e, t) {
    if ((e === void 0 && (e = {}), o)) throw o;
    for (var r = !1, i = {}, s = 0; s < a.length; s++) {
      var c = a[s],
        l = n[c],
        u = e[c],
        d = l(u, t);
      if (d === void 0) throw (t && t.type, Error(Fe(14)));
      ((i[c] = d), (r ||= d !== u));
    }
    return ((r ||= a.length !== Object.keys(e).length), r ? i : e);
  };
}
function Ue() {
  var e = [...arguments];
  return e.length === 0
    ? function (e) {
        return e;
      }
    : e.length === 1
      ? e[0]
      : e.reduce(function (e, t) {
          return function () {
            return e(t.apply(void 0, arguments));
          };
        });
}
function We() {
  var e = [...arguments];
  return function (t) {
    return function () {
      var n = t.apply(void 0, arguments),
        r = function () {
          throw Error(Fe(15));
        },
        i = {
          getState: n.getState,
          dispatch: function () {
            return r.apply(void 0, arguments);
          },
        },
        a = e.map(function (e) {
          return e(i);
        });
      return (
        (r = Ue.apply(void 0, a)(n.dispatch)),
        Pe(Pe({}, n), {}, { dispatch: r })
      );
    };
  };
}
function Ge(e) {
  return function (t) {
    var n = t.dispatch,
      r = t.getState;
    return function (t) {
      return function (i) {
        return typeof i == `function` ? i(n, r, e) : t(i);
      };
    };
  };
}
var Ke = Ge();
Ke.withExtraArgument = Ge;
var qe = (function () {
    var e = function (t, n) {
      return (
        (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          }),
        e(t, n)
      );
    };
    return function (t, n) {
      if (typeof n != `function` && n !== null)
        throw TypeError(
          `Class extends value ` + String(n) + ` is not a constructor or null`,
        );
      e(t, n);
      function r() {
        this.constructor = t;
      }
      t.prototype =
        n === null ? Object.create(n) : ((r.prototype = n.prototype), new r());
    };
  })(),
  Je = function (e, t) {
    var n = {
        label: 0,
        sent: function () {
          if (a[0] & 1) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      },
      r,
      i,
      a,
      o;
    return (
      (o = { next: s(0), throw: s(1), return: s(2) }),
      typeof Symbol == `function` &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function s(e) {
      return function (t) {
        return c([e, t]);
      };
    }
    function c(o) {
      if (r) throw TypeError(`Generator is already executing.`);
      for (; n;)
        try {
          if (
            ((r = 1),
            i &&
              (a =
                o[0] & 2
                  ? i.return
                  : o[0]
                    ? i.throw || ((a = i.return) && a.call(i), 0)
                    : i.next) &&
              !(a = a.call(i, o[1])).done)
          )
            return a;
          switch (((i = 0), a && (o = [o[0] & 2, a.value]), o[0])) {
            case 0:
            case 1:
              a = o;
              break;
            case 4:
              return (n.label++, { value: o[1], done: !1 });
            case 5:
              (n.label++, (i = o[1]), (o = [0]));
              continue;
            case 7:
              ((o = n.ops.pop()), n.trys.pop());
              continue;
            default:
              if (
                ((a = n.trys),
                !(a = a.length > 0 && a[a.length - 1]) &&
                  (o[0] === 6 || o[0] === 2))
              ) {
                n = 0;
                continue;
              }
              if (o[0] === 3 && (!a || (o[1] > a[0] && o[1] < a[3]))) {
                n.label = o[1];
                break;
              }
              if (o[0] === 6 && n.label < a[1]) {
                ((n.label = a[1]), (a = o));
                break;
              }
              if (a && n.label < a[2]) {
                ((n.label = a[2]), n.ops.push(o));
                break;
              }
              (a[2] && n.ops.pop(), n.trys.pop());
              continue;
          }
          o = t.call(e, n);
        } catch (e) {
          ((o = [6, e]), (i = 0));
        } finally {
          r = a = 0;
        }
      if (o[0] & 5) throw o[1];
      return { value: o[0] ? o[1] : void 0, done: !0 };
    }
  },
  Ye = function (e, t) {
    for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
    return e;
  },
  Xe = Object.defineProperty,
  Ze = Object.defineProperties,
  Qe = Object.getOwnPropertyDescriptors,
  $e = Object.getOwnPropertySymbols,
  et = Object.prototype.hasOwnProperty,
  tt = Object.prototype.propertyIsEnumerable,
  nt = function (e, t, n) {
    return t in e
      ? Xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n);
  },
  rt = function (e, t) {
    for (var n in (t ||= {})) et.call(t, n) && nt(e, n, t[n]);
    if ($e)
      for (var r = 0, i = $e(t); r < i.length; r++) {
        var n = i[r];
        tt.call(t, n) && nt(e, n, t[n]);
      }
    return e;
  },
  it = function (e, t) {
    return Ze(e, Qe(t));
  },
  at = function (e, t, n) {
    return new Promise(function (r, i) {
      var a = function (e) {
          try {
            s(n.next(e));
          } catch (e) {
            i(e);
          }
        },
        o = function (e) {
          try {
            s(n.throw(e));
          } catch (e) {
            i(e);
          }
        },
        s = function (e) {
          return e.done ? r(e.value) : Promise.resolve(e.value).then(a, o);
        };
      s((n = n.apply(e, t)).next());
    });
  },
  ot =
    typeof window < `u` && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (arguments.length !== 0)
            return typeof arguments[0] == `object`
              ? Ue
              : Ue.apply(null, arguments);
        };
typeof window < `u` &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__;
function st(e) {
  if (typeof e != `object` || !e) return !1;
  var t = Object.getPrototypeOf(e);
  if (t === null) return !0;
  for (var n = t; Object.getPrototypeOf(n) !== null;)
    n = Object.getPrototypeOf(n);
  return t === n;
}
function ct(e, t) {
  function n() {
    var n = [...arguments];
    if (t) {
      var r = t.apply(void 0, n);
      if (!r) throw Error(`prepareAction did not return an object`);
      return rt(
        rt({ type: e, payload: r.payload }, `meta` in r && { meta: r.meta }),
        `error` in r && { error: r.error },
      );
    }
    return { type: e, payload: n[0] };
  }
  return (
    (n.toString = function () {
      return `` + e;
    }),
    (n.type = e),
    (n.match = function (t) {
      return t.type === e;
    }),
    n
  );
}
var lt = (function (e) {
    qe(t, e);
    function t() {
      var n = [...arguments],
        r = e.apply(this, n) || this;
      return (Object.setPrototypeOf(r, t.prototype), r);
    }
    return (
      Object.defineProperty(t, Symbol.species, {
        get: function () {
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.concat = function () {
        var t = [...arguments];
        return e.prototype.concat.apply(this, t);
      }),
      (t.prototype.prepend = function () {
        var e = [...arguments];
        return e.length === 1 && Array.isArray(e[0])
          ? new (t.bind.apply(t, Ye([void 0], e[0].concat(this))))()
          : new (t.bind.apply(t, Ye([void 0], e.concat(this))))();
      }),
      t
    );
  })(Array),
  ut = (function (e) {
    qe(t, e);
    function t() {
      var n = [...arguments],
        r = e.apply(this, n) || this;
      return (Object.setPrototypeOf(r, t.prototype), r);
    }
    return (
      Object.defineProperty(t, Symbol.species, {
        get: function () {
          return t;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.concat = function () {
        var t = [...arguments];
        return e.prototype.concat.apply(this, t);
      }),
      (t.prototype.prepend = function () {
        var e = [...arguments];
        return e.length === 1 && Array.isArray(e[0])
          ? new (t.bind.apply(t, Ye([void 0], e[0].concat(this))))()
          : new (t.bind.apply(t, Ye([void 0], e.concat(this))))();
      }),
      t
    );
  })(Array);
function dt(e) {
  return b(e) ? Oe(e, function () {}) : e;
}
function ft(e) {
  return typeof e == `boolean`;
}
function pt() {
  return function (e) {
    return mt(e);
  };
}
function mt(e) {
  e === void 0 && (e = {});
  var t = e.thunk,
    n = t === void 0 || t;
  (e.immutableCheck, e.serializableCheck, e.actionCreatorCheck);
  var r = new lt();
  return (
    n && (ft(n) ? r.push(Ke) : r.push(Ke.withExtraArgument(n.extraArgument))),
    r
  );
}
var ht = !0;
function gt(e) {
  var t = pt(),
    n = e || {},
    r = n.reducer,
    i = r === void 0 ? void 0 : r,
    a = n.middleware,
    o = a === void 0 ? t() : a,
    s = n.devTools,
    c = s === void 0 || s,
    l = n.preloadedState,
    u = l === void 0 ? void 0 : l,
    d = n.enhancers,
    f = d === void 0 ? void 0 : d,
    p;
  if (typeof i == `function`) p = i;
  else if (st(i)) p = He(i);
  else
    throw Error(
      `"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers`,
    );
  var m = o;
  if (typeof m == `function` && ((m = m(t)), !ht && !Array.isArray(m)))
    throw Error(
      `when using a middleware builder function, an array of middleware must be returned`,
    );
  if (
    !ht &&
    m.some(function (e) {
      return typeof e != `function`;
    })
  )
    throw Error(
      `each middleware provided to configureStore must be a function`,
    );
  var h = We.apply(void 0, m),
    g = Ue;
  c && (g = ot(rt({ trace: !ht }, typeof c == `object` && c)));
  var _ = new ut(h),
    v = _;
  Array.isArray(f) ? (v = Ye([h], f)) : typeof f == `function` && (v = f(_));
  var y = g.apply(void 0, v);
  return Be(p, u, y);
}
function _t(e) {
  var t = {},
    n = [],
    r,
    i = {
      addCase: function (e, n) {
        var r = typeof e == `string` ? e : e.type;
        if (!r)
          throw Error(
            "`builder.addCase` cannot be called with an empty action type",
          );
        if (r in t)
          throw Error(
            "`builder.addCase` cannot be called with two reducers for the same action type",
          );
        return ((t[r] = n), i);
      },
      addMatcher: function (e, t) {
        return (n.push({ matcher: e, reducer: t }), i);
      },
      addDefaultCase: function (e) {
        return ((r = e), i);
      },
    };
  return (e(i), [t, n, r]);
}
function vt(e) {
  return typeof e == `function`;
}
function yt(e, t, n, r) {
  n === void 0 && (n = []);
  var i = typeof t == `function` ? _t(t) : [t, n, r],
    a = i[0],
    o = i[1],
    s = i[2],
    c;
  if (vt(e))
    c = function () {
      return dt(e());
    };
  else {
    var l = dt(e);
    c = function () {
      return l;
    };
  }
  function u(e, t) {
    e === void 0 && (e = c());
    var n = Ye(
      [a[t.type]],
      o
        .filter(function (e) {
          var n = e.matcher;
          return n(t);
        })
        .map(function (e) {
          return e.reducer;
        }),
    );
    return (
      n.filter(function (e) {
        return !!e;
      }).length === 0 && (n = [s]),
      n.reduce(function (e, n) {
        if (n) {
          if (y(e)) {
            var r = n(e, t);
            return r === void 0 ? e : r;
          }
          if (b(e))
            return Oe(e, function (e) {
              return n(e, t);
            });
          var r = n(e, t);
          if (r === void 0) {
            if (e === null) return e;
            throw Error(
              `A case reducer on a non-draftable value must not return undefined`,
            );
          }
          return r;
        }
        return e;
      }, e)
    );
  }
  return ((u.getInitialState = c), u);
}
function bt(e, t) {
  return e + `/` + t;
}
function xt(e) {
  var t = e.name;
  if (!t) throw Error("`name` is a required option for createSlice");
  var n =
      typeof e.initialState == `function` ? e.initialState : dt(e.initialState),
    r = e.reducers || {},
    i = Object.keys(r),
    a = {},
    o = {},
    s = {};
  i.forEach(function (e) {
    var n = r[e],
      i = bt(t, e),
      c,
      l;
    (`reducer` in n ? ((c = n.reducer), (l = n.prepare)) : (c = n),
      (a[e] = c),
      (o[i] = c),
      (s[e] = l ? ct(i, l) : ct(i)));
  });
  function c() {
    var t =
        typeof e.extraReducers == `function`
          ? _t(e.extraReducers)
          : [e.extraReducers],
      r = t[0],
      i = r === void 0 ? {} : r,
      a = t[1],
      s = a === void 0 ? [] : a,
      c = t[2],
      l = c === void 0 ? void 0 : c,
      u = rt(rt({}, i), o);
    return yt(n, function (e) {
      for (var t in u) e.addCase(t, u[t]);
      for (var n = 0, r = s; n < r.length; n++) {
        var i = r[n];
        e.addMatcher(i.matcher, i.reducer);
      }
      l && e.addDefaultCase(l);
    });
  }
  var l;
  return {
    name: t,
    reducer: function (e, t) {
      return ((l ||= c()), l(e, t));
    },
    actions: s,
    caseReducers: a,
    getInitialState: function () {
      return ((l ||= c()), l.getInitialState());
    },
  };
}
var St = `ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW`,
  Ct = function (e) {
    e === void 0 && (e = 21);
    for (var t = ``, n = e; n--;) t += St[(Math.random() * 64) | 0];
    return t;
  },
  wt = [`name`, `message`, `stack`, `code`],
  Tt = (function () {
    function e(e, t) {
      ((this.payload = e), (this.meta = t));
    }
    return e;
  })(),
  Et = (function () {
    function e(e, t) {
      ((this.payload = e), (this.meta = t));
    }
    return e;
  })(),
  Dt = function (e) {
    if (typeof e == `object` && e) {
      for (var t = {}, n = 0, r = wt; n < r.length; n++) {
        var i = r[n];
        typeof e[i] == `string` && (t[i] = e[i]);
      }
      return t;
    }
    return { message: String(e) };
  };
(function () {
  function e(e, t, n) {
    var r = ct(e + `/fulfilled`, function (e, t, n, r) {
        return {
          payload: e,
          meta: it(rt({}, r || {}), {
            arg: n,
            requestId: t,
            requestStatus: `fulfilled`,
          }),
        };
      }),
      i = ct(e + `/pending`, function (e, t, n) {
        return {
          payload: void 0,
          meta: it(rt({}, n || {}), {
            arg: t,
            requestId: e,
            requestStatus: `pending`,
          }),
        };
      }),
      a = ct(e + `/rejected`, function (e, t, r, i, a) {
        return {
          payload: i,
          error: ((n && n.serializeError) || Dt)(e || `Rejected`),
          meta: it(rt({}, a || {}), {
            arg: r,
            requestId: t,
            rejectedWithValue: !!i,
            requestStatus: `rejected`,
            aborted: e?.name === `AbortError`,
            condition: e?.name === `ConditionError`,
          }),
        };
      }),
      o =
        typeof AbortController < `u`
          ? AbortController
          : (function () {
              function e() {
                this.signal = {
                  aborted: !1,
                  addEventListener: function () {},
                  dispatchEvent: function () {
                    return !1;
                  },
                  onabort: function () {},
                  removeEventListener: function () {},
                  reason: void 0,
                  throwIfAborted: function () {},
                };
              }
              return ((e.prototype.abort = function () {}), e);
            })();
    function s(e) {
      return function (s, c, l) {
        var u = n?.idGenerator ? n.idGenerator(e) : Ct(),
          d = new o(),
          f;
        function p(e) {
          ((f = e), d.abort());
        }
        var m = (function () {
          return at(this, null, function () {
            var o, m, h, g, _;
            return Je(this, function (v) {
              switch (v.label) {
                case 0:
                  return (
                    v.trys.push([0, 4, , 5]),
                    (m = n?.condition?.call(n, e, { getState: c, extra: l })),
                    kt(m) ? [4, m] : [3, 2]
                  );
                case 1:
                  ((m = v.sent()), (v.label = 2));
                case 2:
                  if (m === !1 || d.signal.aborted)
                    throw {
                      name: `ConditionError`,
                      message: `Aborted due to condition callback returning false.`,
                    };
                  return (
                    (h = new Promise(function (e, t) {
                      return d.signal.addEventListener(`abort`, function () {
                        return t({
                          name: `AbortError`,
                          message: f || `Aborted`,
                        });
                      });
                    })),
                    s(
                      i(
                        u,
                        e,
                        n?.getPendingMeta?.call(
                          n,
                          { requestId: u, arg: e },
                          { getState: c, extra: l },
                        ),
                      ),
                    ),
                    [
                      4,
                      Promise.race([
                        h,
                        Promise.resolve(
                          t(e, {
                            dispatch: s,
                            getState: c,
                            extra: l,
                            requestId: u,
                            signal: d.signal,
                            abort: p,
                            rejectWithValue: function (e, t) {
                              return new Tt(e, t);
                            },
                            fulfillWithValue: function (e, t) {
                              return new Et(e, t);
                            },
                          }),
                        ).then(function (t) {
                          if (t instanceof Tt) throw t;
                          return t instanceof Et
                            ? r(t.payload, u, e, t.meta)
                            : r(t, u, e);
                        }),
                      ]),
                    ]
                  );
                case 3:
                  return ((o = v.sent()), [3, 5]);
                case 4:
                  return (
                    (g = v.sent()),
                    (o =
                      g instanceof Tt
                        ? a(null, u, e, g.payload, g.meta)
                        : a(g, u, e)),
                    [3, 5]
                  );
                case 5:
                  return (
                    (_ =
                      n &&
                      !n.dispatchConditionRejection &&
                      a.match(o) &&
                      o.meta.condition),
                    _ || s(o),
                    [2, o]
                  );
              }
            });
          });
        })();
        return Object.assign(m, {
          abort: p,
          requestId: u,
          arg: e,
          unwrap: function () {
            return m.then(Ot);
          },
        });
      };
    }
    return Object.assign(s, {
      pending: i,
      rejected: a,
      fulfilled: r,
      typePrefix: e,
    });
  }
  return (
    (e.withTypes = function () {
      return e;
    }),
    e
  );
})();
function Ot(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
function kt(e) {
  return typeof e == `object` && !!e && typeof e.then == `function`;
}
var At = `listener`,
  jt = `completed`,
  Mt = `cancelled`;
(`` + Mt, `` + jt, At + `` + Mt, At + `` + jt);
var Nt = `listenerMiddleware`;
(ct(Nt + `/add`),
  ct(Nt + `/removeAll`),
  ct(Nt + `/remove`),
  typeof queueMicrotask == `function` &&
    queueMicrotask.bind(
      typeof window < `u` ? window : typeof global < `u` ? global : globalThis,
    ),
  typeof window < `u` &&
    window.requestAnimationFrame &&
    window.requestAnimationFrame,
  fe());
var Pt = xt({
    name: `auth`,
    initialState: { loggedIn: !1, user: {} },
    reducers: {
      login: (e, t) => {
        (console.log(`login slice`), (e.loggedIn = !0), (e.user = t.payload));
      },
      logout: (e) => {
        (console.log(`logout slice`), (e.loggedIn = !1), (e.user = {}));
      },
    },
  }),
  { login: Ft, logout: It } = Pt.actions,
  Lt = Pt.reducer,
  Rt = gt({ reducer: { auth: Lt } }),
  zt = o((e) => {
    var t = d();
    function n(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var r = typeof Object.is == `function` ? Object.is : n,
      i = t.useState,
      a = t.useEffect,
      o = t.useLayoutEffect,
      s = t.useDebugValue;
    function c(e, t) {
      var n = t(),
        r = i({ inst: { value: n, getSnapshot: t } }),
        c = r[0].inst,
        u = r[1];
      return (
        o(
          function () {
            ((c.value = n), (c.getSnapshot = t), l(c) && u({ inst: c }));
          },
          [e, n, t],
        ),
        a(
          function () {
            return (
              l(c) && u({ inst: c }),
              e(function () {
                l(c) && u({ inst: c });
              })
            );
          },
          [e],
        ),
        s(n),
        n
      );
    }
    function l(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !r(e, n);
      } catch {
        return !0;
      }
    }
    function u(e, t) {
      return t();
    }
    var f =
      typeof window > `u` ||
      window.document === void 0 ||
      window.document.createElement === void 0
        ? u
        : c;
    e.useSyncExternalStore =
      t.useSyncExternalStore === void 0 ? f : t.useSyncExternalStore;
  }),
  H = o((e, t) => {
    t.exports = zt();
  }),
  Bt = o((e) => {
    var t = d(),
      n = H();
    function r(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var i = typeof Object.is == `function` ? Object.is : r,
      a = n.useSyncExternalStore,
      o = t.useRef,
      s = t.useEffect,
      c = t.useMemo,
      l = t.useDebugValue;
    e.useSyncExternalStoreWithSelector = function (e, t, n, r, u) {
      var d = o(null);
      if (d.current === null) {
        var f = { hasValue: !1, value: null };
        d.current = f;
      } else f = d.current;
      d = c(
        function () {
          function e(e) {
            if (!a) {
              if (((a = !0), (o = e), (e = r(e)), u !== void 0 && f.hasValue)) {
                var t = f.value;
                if (u(t, e)) return (s = t);
              }
              return (s = e);
            }
            if (((t = s), i(o, e))) return t;
            var n = r(e);
            return u !== void 0 && u(t, n) ? ((o = e), t) : ((o = e), (s = n));
          }
          var a = !1,
            o,
            s,
            c = n === void 0 ? null : n;
          return [
            function () {
              return e(t());
            },
            c === null
              ? void 0
              : function () {
                  return e(c());
                },
          ];
        },
        [t, n, r, u],
      );
      var p = a(e, d[0], d[1]);
      return (
        s(
          function () {
            ((f.hasValue = !0), (f.value = p));
          },
          [p],
        ),
        l(p),
        p
      );
    };
  }),
  Vt = o((e, t) => {
    t.exports = Bt();
  }),
  Ht = H(),
  Ut = Vt(),
  Wt = l(g());
function Gt(e) {
  e();
}
var Kt = Gt,
  qt = (e) => (Kt = e),
  Jt = () => Kt,
  Yt = Symbol.for(`react-redux-context`),
  Xt = typeof globalThis < `u` ? globalThis : {};
function Zt() {
  if (!f.createContext) return {};
  let e = Xt[Yt] ?? (Xt[Yt] = new Map()),
    t = e.get(f.createContext);
  return (t || ((t = f.createContext(null)), e.set(f.createContext, t)), t);
}
var Qt = Zt();
function $t(e = Qt) {
  return function () {
    return (0, f.useContext)(e);
  };
}
var en = $t(),
  tn = () => {
    throw Error(`uSES not initialized!`);
  },
  nn = (e) => {
    tn = e;
  },
  rn = (e, t) => e === t;
function an(e = Qt) {
  let t = e === Qt ? en : $t(e);
  return function (e, n = {}) {
    let {
        equalityFn: r = rn,
        stabilityCheck: i = void 0,
        noopCheck: a = void 0,
      } = typeof n == `function` ? { equalityFn: n } : n,
      {
        store: o,
        subscription: s,
        getServerState: c,
        stabilityCheck: l,
        noopCheck: u,
      } = t();
    (0, f.useRef)(!0);
    let d = (0, f.useCallback)(
        {
          [e.name](t) {
            return e(t);
          },
        }[e.name],
        [e, l, i],
      ),
      p = tn(s.addNestedSub, o.getState, c || o.getState, d, r);
    return ((0, f.useDebugValue)(p), p);
  };
}
var on = an();
function sn() {
  return (
    (sn = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    sn.apply(null, arguments)
  );
}
function cn(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var ln = o((e) => {
    var t = typeof Symbol == `function` && Symbol.for,
      n = t ? Symbol.for(`react.element`) : 60103,
      r = t ? Symbol.for(`react.portal`) : 60106,
      i = t ? Symbol.for(`react.fragment`) : 60107,
      a = t ? Symbol.for(`react.strict_mode`) : 60108,
      o = t ? Symbol.for(`react.profiler`) : 60114,
      s = t ? Symbol.for(`react.provider`) : 60109,
      c = t ? Symbol.for(`react.context`) : 60110,
      l = t ? Symbol.for(`react.async_mode`) : 60111,
      u = t ? Symbol.for(`react.concurrent_mode`) : 60111,
      d = t ? Symbol.for(`react.forward_ref`) : 60112,
      f = t ? Symbol.for(`react.suspense`) : 60113,
      p = t ? Symbol.for(`react.suspense_list`) : 60120,
      m = t ? Symbol.for(`react.memo`) : 60115,
      h = t ? Symbol.for(`react.lazy`) : 60116,
      g = t ? Symbol.for(`react.block`) : 60121,
      _ = t ? Symbol.for(`react.fundamental`) : 60117,
      v = t ? Symbol.for(`react.responder`) : 60118,
      y = t ? Symbol.for(`react.scope`) : 60119;
    function b(e) {
      if (typeof e == `object` && e) {
        var t = e.$$typeof;
        switch (t) {
          case n:
            switch (((e = e.type), e)) {
              case l:
              case u:
              case i:
              case o:
              case a:
              case f:
                return e;
              default:
                switch (((e &&= e.$$typeof), e)) {
                  case c:
                  case d:
                  case h:
                  case m:
                  case s:
                    return e;
                  default:
                    return t;
                }
            }
          case r:
            return t;
        }
      }
    }
    function x(e) {
      return b(e) === u;
    }
    ((e.AsyncMode = l),
      (e.ConcurrentMode = u),
      (e.ContextConsumer = c),
      (e.ContextProvider = s),
      (e.Element = n),
      (e.ForwardRef = d),
      (e.Fragment = i),
      (e.Lazy = h),
      (e.Memo = m),
      (e.Portal = r),
      (e.Profiler = o),
      (e.StrictMode = a),
      (e.Suspense = f),
      (e.isAsyncMode = function (e) {
        return x(e) || b(e) === l;
      }),
      (e.isConcurrentMode = x),
      (e.isContextConsumer = function (e) {
        return b(e) === c;
      }),
      (e.isContextProvider = function (e) {
        return b(e) === s;
      }),
      (e.isElement = function (e) {
        return typeof e == `object` && !!e && e.$$typeof === n;
      }),
      (e.isForwardRef = function (e) {
        return b(e) === d;
      }),
      (e.isFragment = function (e) {
        return b(e) === i;
      }),
      (e.isLazy = function (e) {
        return b(e) === h;
      }),
      (e.isMemo = function (e) {
        return b(e) === m;
      }),
      (e.isPortal = function (e) {
        return b(e) === r;
      }),
      (e.isProfiler = function (e) {
        return b(e) === o;
      }),
      (e.isStrictMode = function (e) {
        return b(e) === a;
      }),
      (e.isSuspense = function (e) {
        return b(e) === f;
      }),
      (e.isValidElementType = function (e) {
        return (
          typeof e == `string` ||
          typeof e == `function` ||
          e === i ||
          e === u ||
          e === o ||
          e === a ||
          e === f ||
          e === p ||
          (typeof e == `object` &&
            !!e &&
            (e.$$typeof === h ||
              e.$$typeof === m ||
              e.$$typeof === s ||
              e.$$typeof === c ||
              e.$$typeof === d ||
              e.$$typeof === _ ||
              e.$$typeof === v ||
              e.$$typeof === y ||
              e.$$typeof === g))
        );
      }),
      (e.typeOf = b));
  }),
  un = o((e, t) => {
    t.exports = ln();
  }),
  dn = o((e, t) => {
    var n = un(),
      r = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      i = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0,
      },
      a = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      },
      o = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0,
      },
      s = {};
    ((s[n.ForwardRef] = a), (s[n.Memo] = o));
    function c(e) {
      return n.isMemo(e) ? o : s[e.$$typeof] || r;
    }
    var l = Object.defineProperty,
      u = Object.getOwnPropertyNames,
      d = Object.getOwnPropertySymbols,
      f = Object.getOwnPropertyDescriptor,
      p = Object.getPrototypeOf,
      m = Object.prototype;
    function h(e, t, n) {
      if (typeof t != `string`) {
        if (m) {
          var r = p(t);
          r && r !== m && h(e, r, n);
        }
        var a = u(t);
        d && (a = a.concat(d(t)));
        for (var o = c(e), s = c(t), g = 0; g < a.length; ++g) {
          var _ = a[g];
          if (!i[_] && !(n && n[_]) && !(s && s[_]) && !(o && o[_])) {
            var v = f(t, _);
            try {
              l(e, _, v);
            } catch {}
          }
        }
      }
      return e;
    }
    t.exports = h;
  }),
  fn = o((e) => {}),
  pn = o((e, t) => {
    t.exports = fn();
  }),
  mn = l(dn());
pn();
function hn() {
  let e = Jt(),
    t = null,
    n = null;
  return {
    clear() {
      ((t = null), (n = null));
    },
    notify() {
      e(() => {
        let e = t;
        for (; e;) (e.callback(), (e = e.next));
      });
    },
    get() {
      let e = [],
        n = t;
      for (; n;) (e.push(n), (n = n.next));
      return e;
    },
    subscribe(e) {
      let r = !0,
        i = (n = { callback: e, next: null, prev: n });
      return (
        i.prev ? (i.prev.next = i) : (t = i),
        function () {
          !r ||
            t === null ||
            ((r = !1),
            i.next ? (i.next.prev = i.prev) : (n = i.prev),
            i.prev ? (i.prev.next = i.next) : (t = i.next));
        }
      );
    },
  };
}
var gn = { notify() {}, get: () => [] };
function _n(e, t) {
  let n,
    r = gn,
    i = 0,
    a = !1;
  function o(e) {
    u();
    let t = r.subscribe(e),
      n = !1;
    return () => {
      n || ((n = !0), t(), d());
    };
  }
  function s() {
    r.notify();
  }
  function c() {
    m.onStateChange && m.onStateChange();
  }
  function l() {
    return a;
  }
  function u() {
    (i++, n || ((n = t ? t.addNestedSub(c) : e.subscribe(c)), (r = hn())));
  }
  function d() {
    (i--, n && i === 0 && (n(), (n = void 0), r.clear(), (r = gn)));
  }
  function f() {
    a || ((a = !0), u());
  }
  function p() {
    a && ((a = !1), d());
  }
  let m = {
    addNestedSub: o,
    notifyNestedSubs: s,
    handleChangeWrapper: c,
    isSubscribed: l,
    trySubscribe: f,
    tryUnsubscribe: p,
    getListeners: () => r,
  };
  return m;
}
var vn =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0
    ? f.useLayoutEffect
    : f.useEffect;
function yn({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: i = `once`,
  noopCheck: a = `once`,
}) {
  let o = f.useMemo(
      () => ({
        store: e,
        subscription: _n(e),
        getServerState: r ? () => r : void 0,
        stabilityCheck: i,
        noopCheck: a,
      }),
      [e, r, i, a],
    ),
    s = f.useMemo(() => e.getState(), [e]);
  vn(() => {
    let { subscription: t } = o;
    return (
      (t.onStateChange = t.notifyNestedSubs),
      t.trySubscribe(),
      s !== e.getState() && t.notifyNestedSubs(),
      () => {
        (t.tryUnsubscribe(), (t.onStateChange = void 0));
      }
    );
  }, [o, s]);
  let c = t || Qt;
  return f.createElement(c.Provider, { value: o }, n);
}
function bn(e = Qt) {
  let t = e === Qt ? en : $t(e);
  return function () {
    let { store: e } = t();
    return e;
  };
}
var xn = bn();
function Sn(e = Qt) {
  let t = e === Qt ? xn : bn(e);
  return function () {
    return t().dispatch;
  };
}
var Cn = Sn();
(nn(Ut.useSyncExternalStoreWithSelector),
  Ht.useSyncExternalStore,
  qt(Wt.unstable_batchedUpdates));
function U() {
  return (
    (U = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    U.apply(null, arguments)
  );
}
var wn;
(function (e) {
  ((e.Pop = `POP`), (e.Push = `PUSH`), (e.Replace = `REPLACE`));
})((wn ||= {}));
var Tn = `popstate`;
function En(e) {
  e === void 0 && (e = {});
  function t(e, t) {
    let { pathname: n, search: r, hash: i } = e.location;
    return An(
      ``,
      { pathname: n, search: r, hash: i },
      (t.state && t.state.usr) || null,
      (t.state && t.state.key) || `default`,
    );
  }
  function n(e, t) {
    return typeof t == `string` ? t : jn(t);
  }
  return Nn(t, n, null, e);
}
function W(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function Dn(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t);
    try {
      throw Error(t);
    } catch {}
  }
}
function On() {
  return Math.random().toString(36).substr(2, 8);
}
function kn(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function An(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    U(
      { pathname: typeof e == `string` ? e : e.pathname, search: ``, hash: `` },
      typeof t == `string` ? Mn(t) : t,
      { state: n, key: (t && t.key) || r || On() },
    )
  );
}
function jn(e) {
  let { pathname: t = `/`, search: n = ``, hash: r = `` } = e;
  return (
    n && n !== `?` && (t += n.charAt(0) === `?` ? n : `?` + n),
    r && r !== `#` && (t += r.charAt(0) === `#` ? r : `#` + r),
    t
  );
}
function Mn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf(`#`);
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf(`?`);
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function Nn(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = wn.Pop,
    c = null,
    l = u();
  l ?? ((l = 0), o.replaceState(U({}, o.state, { idx: l }), ``));
  function u() {
    return (o.state || { idx: null }).idx;
  }
  function d() {
    s = wn.Pop;
    let e = u(),
      t = e == null ? null : e - l;
    ((l = e), c && c({ action: s, location: h.location, delta: t }));
  }
  function f(e, t) {
    s = wn.Push;
    let r = An(h.location, e, t);
    (n && n(r, e), (l = u() + 1));
    let d = kn(r, l),
      f = h.createHref(r);
    try {
      o.pushState(d, ``, f);
    } catch (e) {
      if (e instanceof DOMException && e.name === `DataCloneError`) throw e;
      i.location.assign(f);
    }
    a && c && c({ action: s, location: h.location, delta: 1 });
  }
  function p(e, t) {
    s = wn.Replace;
    let r = An(h.location, e, t);
    (n && n(r, e), (l = u()));
    let i = kn(r, l),
      d = h.createHref(r);
    (o.replaceState(i, ``, d),
      a && c && c({ action: s, location: h.location, delta: 0 }));
  }
  function m(e) {
    let t = i.location.origin === `null` ? i.location.href : i.location.origin,
      n = typeof e == `string` ? e : jn(e);
    return (
      (n = n.replace(/ $/, `%20`)),
      W(
        t,
        `No window.location.(origin|href) available to create URL for href: ` +
          n,
      ),
      new URL(n, t)
    );
  }
  let h = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(e) {
      if (c) throw Error(`A history only accepts one active listener`);
      return (
        i.addEventListener(Tn, d),
        (c = e),
        () => {
          (i.removeEventListener(Tn, d), (c = null));
        }
      );
    },
    createHref(e) {
      return t(i, e);
    },
    createURL: m,
    encodeLocation(e) {
      let t = m(e);
      return { pathname: t.pathname, search: t.search, hash: t.hash };
    },
    push: f,
    replace: p,
    go(e) {
      return o.go(e);
    },
  };
  return h;
}
var G;
(function (e) {
  ((e.data = `data`),
    (e.deferred = `deferred`),
    (e.redirect = `redirect`),
    (e.error = `error`));
})((G ||= {}));
var Pn = new Set([`lazy`, `caseSensitive`, `path`, `id`, `index`, `children`]);
function Fn(e) {
  return e.index === !0;
}
function In(e, t, n, r) {
  return (
    n === void 0 && (n = []),
    r === void 0 && (r = {}),
    e.map((e, i) => {
      let a = [...n, String(i)],
        o = typeof e.id == `string` ? e.id : a.join(`-`);
      if (
        (W(
          e.index !== !0 || !e.children,
          `Cannot specify children on an index route`,
        ),
        W(
          !r[o],
          `Found a route id collision on id "` +
            o +
            `".  Route id's must be globally unique within Data Router usages`,
        ),
        Fn(e))
      ) {
        let n = U({}, e, t(e), { id: o });
        return ((r[o] = n), n);
      }
      {
        let n = U({}, e, t(e), { id: o, children: void 0 });
        return (
          (r[o] = n),
          e.children && (n.children = In(e.children, t, a, r)),
          n
        );
      }
    })
  );
}
function Ln(e, t, n) {
  return (n === void 0 && (n = `/`), Rn(e, t, n, !1));
}
function Rn(e, t, n, r) {
  let i = nr((typeof t == `string` ? Mn(t) : t).pathname || `/`, n);
  if (i == null) return null;
  let a = Bn(e);
  Hn(a);
  let o = null,
    s = tr(i);
  for (let e = 0; o == null && e < a.length; ++e) o = Qn(a[e], s, r);
  return o;
}
function zn(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return { id: n.id, pathname: r, params: i, data: t[n.id], handle: n.handle };
}
function Bn(e, t, n, r) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ``));
  let i = (e, i, a) => {
    let o = {
      relativePath: a === void 0 ? e.path || `` : a,
      caseSensitive: e.caseSensitive === !0,
      childrenIndex: i,
      route: e,
    };
    o.relativePath.startsWith(`/`) &&
      (W(
        o.relativePath.startsWith(r),
        `Absolute route path "` +
          o.relativePath +
          `" nested under path ` +
          (`"` + r + `" is not valid. An absolute child route path `) +
          `must start with the combined path of all its parent routes.`,
      ),
      (o.relativePath = o.relativePath.slice(r.length)));
    let s = fr([r, o.relativePath]),
      c = n.concat(o);
    (e.children &&
      e.children.length > 0 &&
      (W(
        e.index !== !0,
        `Index routes must not have child routes. Please remove ` +
          (`all child routes from route path "` + s + `".`),
      ),
      Bn(e.children, t, c, s)),
      !(e.path == null && !e.index) &&
        t.push({ path: s, score: Xn(s, e.index), routesMeta: c }));
  };
  return (
    e.forEach((e, t) => {
      var n;
      if (e.path === `` || !((n = e.path) != null && n.includes(`?`))) i(e, t);
      else for (let n of Vn(e.path)) i(e, t, n);
    }),
    t
  );
}
function Vn(e) {
  let t = e.split(`/`);
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``);
  if (r.length === 0) return i ? [a, ``] : [a];
  let o = Vn(r.join(`/`)),
    s = [];
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  );
}
function Hn(e) {
  e.sort((e, t) =>
    e.score === t.score
      ? Zn(
          e.routesMeta.map((e) => e.childrenIndex),
          t.routesMeta.map((e) => e.childrenIndex),
        )
      : t.score - e.score,
  );
}
var Un = /^:[\w-]+$/,
  Wn = 3,
  Gn = 2,
  Kn = 1,
  qn = 10,
  Jn = -2,
  Yn = (e) => e === `*`;
function Xn(e, t) {
  let n = e.split(`/`),
    r = n.length;
  return (
    n.some(Yn) && (r += Jn),
    t && (r += Gn),
    n
      .filter((e) => !Yn(e))
      .reduce((e, t) => e + (Un.test(t) ? Wn : t === `` ? Kn : qn), r)
  );
}
function Zn(e, t) {
  return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function Qn(e, t, n) {
  n === void 0 && (n = !1);
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = [];
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = $n(
        { path: s.relativePath, caseSensitive: s.caseSensitive, end: c },
        l,
      ),
      d = s.route;
    if (
      (!u &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (u = $n(
          { path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 },
          l,
        )),
      !u)
    )
      return null;
    (Object.assign(i, u.params),
      o.push({
        params: i,
        pathname: fr([a, u.pathname]),
        pathnameBase: pr(fr([a, u.pathnameBase])),
        route: d,
      }),
      u.pathnameBase !== `/` && (a = fr([a, u.pathnameBase])));
  }
  return o;
}
function $n(e, t) {
  typeof e == `string` && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = er(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1);
  return {
    params: r.reduce((e, t, n) => {
      let { paramName: r, isOptional: i } = t;
      if (r === `*`) {
        let e = s[n] || ``;
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`);
      }
      let c = s[n];
      return ((e[r] = i && !c ? void 0 : (c || ``).replace(/%2F/g, `/`)), e);
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function er(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Dn(
      e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
      `Route path "` +
        e +
        `" will be treated as if it were ` +
        (`"` + e.replace(/\*$/, `/*`) + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        (`please change the route path to "` + e.replace(/\*$/, `/*`) + `".`),
    ));
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (e, t, n) => (
            r.push({ paramName: t, isOptional: n != null }),
            n ? `/?([^\\/]+)?` : `/([^\\/]+)`
          ),
        );
  return (
    e.endsWith(`*`)
      ? (r.push({ paramName: `*` }),
        (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  );
}
function tr(e) {
  try {
    return e
      .split(`/`)
      .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
      .join(`/`);
  } catch (t) {
    return (
      Dn(
        !1,
        `The URL path "` +
          e +
          `" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ` +
          (`encoding (` + t + `).`),
      ),
      e
    );
  }
}
function nr(e, t) {
  if (t === `/`) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== `/` ? null : e.slice(n) || `/`;
}
var rr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  ir = (e) => rr.test(e);
function ar(e, t) {
  t === void 0 && (t = `/`);
  let {
      pathname: n,
      search: r = ``,
      hash: i = ``,
    } = typeof e == `string` ? Mn(e) : e,
    a;
  if (n) {
    if (ir(n)) a = n;
    else {
      if (n.includes(`//`)) {
        let e = n;
        ((n = dr(n)),
          Dn(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ` +
              (e + ` -> ` + n),
          ));
      }
      a = n.startsWith(`/`) ? or(n.substring(1), `/`) : or(n, t);
    }
  } else a = t;
  return { pathname: a, search: mr(r), hash: hr(i) };
}
function or(e, t) {
  let n = t.replace(/\/+$/, ``).split(`/`);
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e);
    }),
    n.length > 1 ? n.join(`/`) : `/`
  );
}
function sr(e, t, n, r) {
  return (
    `Cannot include a '` +
    e +
    `' character in a manually specified ` +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      `].  Please separate it out to the `) +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    `a string in <Link to="..."> and the router will parse it for you.`
  );
}
function cr(e) {
  return e.filter(
    (e, t) => t === 0 || (e.route.path && e.route.path.length > 0),
  );
}
function lr(e, t) {
  let n = cr(e);
  return t
    ? n.map((e, t) => (t === n.length - 1 ? e.pathname : e.pathnameBase))
    : n.map((e) => e.pathnameBase);
}
function ur(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == `string`
    ? (i = Mn(e))
    : ((i = U({}, e)),
      W(
        !i.pathname || !i.pathname.includes(`?`),
        sr(`?`, `pathname`, `search`, i),
      ),
      W(
        !i.pathname || !i.pathname.includes(`#`),
        sr(`#`, `pathname`, `hash`, i),
      ),
      W(!i.search || !i.search.includes(`#`), sr(`#`, `search`, `hash`, i)));
  let a = e === `` || i.pathname === ``,
    o = a ? `/` : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let e = t.length - 1;
    if (!r && o.startsWith(`..`)) {
      let t = o.split(`/`);
      for (; t[0] === `..`;) (t.shift(), --e);
      i.pathname = t.join(`/`);
    }
    s = e >= 0 ? t[e] : `/`;
  }
  let c = ar(i, s),
    l = o && o !== `/` && o.endsWith(`/`),
    u = (a || o === `.`) && n.endsWith(`/`);
  return (!c.pathname.endsWith(`/`) && (l || u) && (c.pathname += `/`), c);
}
var dr = (e) => e.replace(/\/\/+/g, `/`),
  fr = (e) => dr(e.join(`/`)),
  pr = (e) => e.replace(/\/+$/, ``).replace(/^\/*/, `/`),
  mr = (e) => (!e || e === `?` ? `` : e.startsWith(`?`) ? e : `?` + e),
  hr = (e) => (!e || e === `#` ? `` : e.startsWith(`#`) ? e : `#` + e),
  gr = class {
    constructor(e, t, n, r) {
      (r === void 0 && (r = !1),
        (this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n));
    }
  };
function _r(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  );
}
var vr = [`post`, `put`, `patch`, `delete`],
  yr = new Set(vr),
  br = [`get`, ...vr],
  xr = new Set(br),
  Sr = new Set([301, 302, 303, 307, 308]),
  Cr = new Set([307, 308]),
  wr = {
    state: `idle`,
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Tr = {
    state: `idle`,
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Er = { state: `unblocked`, proceed: void 0, reset: void 0, location: void 0 },
  Dr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Or = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  kr = `remix-router-transitions`;
function Ar(e) {
  let t = e.window ? e.window : typeof window < `u` ? window : void 0,
    n =
      t !== void 0 &&
      t.document !== void 0 &&
      t.document.createElement !== void 0,
    r = !n;
  W(
    e.routes.length > 0,
    `You must provide a non-empty routes array to createRouter`,
  );
  let i;
  if (e.mapRouteProperties) i = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let t = e.detectErrorBoundary;
    i = (e) => ({ hasErrorBoundary: t(e) });
  } else i = Or;
  let a = {},
    o = In(e.routes, i, void 0, a),
    s,
    c = e.basename || `/`,
    l = e.dataStrategy || Ur,
    u = e.patchRoutesOnNavigation,
    d = U(
      {
        v7_fetcherPersist: !1,
        v7_normalizeFormMethod: !1,
        v7_partialHydration: !1,
        v7_prependBasename: !1,
        v7_relativeSplatPath: !1,
        v7_skipActionErrorRevalidation: !1,
      },
      e.future,
    ),
    f = null,
    p = new Set(),
    m = null,
    h = null,
    g = null,
    _ = e.hydrationData != null,
    v = Ln(o, e.history.location, c),
    y = !1,
    b = null;
  if (v == null && !u) {
    let t = ri(404, { pathname: e.history.location.pathname }),
      { matches: n, route: r } = K(o);
    ((v = n), (b = { [r.id]: t }));
  }
  v &&
    !e.hydrationData &&
    Ve(v, o, e.history.location.pathname).active &&
    (v = null);
  let x;
  if (!v) {
    if (((x = !1), (v = []), d.v7_partialHydration)) {
      let t = Ve(null, o, e.history.location.pathname);
      t.active && t.matches && ((y = !0), (v = t.matches));
    }
  } else if (v.some((e) => e.route.lazy)) x = !1;
  else if (!v.some((e) => e.route.loader)) x = !0;
  else if (d.v7_partialHydration) {
    let t = e.hydrationData ? e.hydrationData.loaderData : null,
      n = e.hydrationData ? e.hydrationData.errors : null;
    if (n) {
      let e = v.findIndex((e) => n[e.route.id] !== void 0);
      x = v.slice(0, e + 1).every((e) => !Ir(e.route, t, n));
    } else x = v.every((e) => !Ir(e.route, t, n));
  } else x = e.hydrationData != null;
  let S,
    C = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: v,
      initialized: x,
      navigation: wr,
      restoreScrollPosition: e.hydrationData == null && null,
      preventScrollReset: !1,
      revalidation: `idle`,
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || b,
      fetchers: new Map(),
      blockers: new Map(),
    },
    w = wn.Pop,
    T = !1,
    E,
    D = !1,
    O = new Map(),
    k = null,
    A = !1,
    j = !1,
    M = [],
    N = new Set(),
    P = new Map(),
    F = 0,
    ee = -1,
    te = new Map(),
    I = new Set(),
    L = new Map(),
    R = new Map(),
    z = new Set(),
    ne = new Map(),
    re = new Map(),
    ie;
  function ae() {
    if (
      ((f = e.history.listen((t) => {
        let { action: n, location: r, delta: i } = t;
        if (ie) {
          (ie(), (ie = void 0));
          return;
        }
        Dn(
          re.size === 0 || i != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let a = Pe({
          currentLocation: C.location,
          nextLocation: r,
          historyAction: n,
        });
        if (a && i != null) {
          let t = new Promise((e) => {
            ie = e;
          });
          (e.history.go(i * -1),
            Ne(a, {
              state: `blocked`,
              location: r,
              proceed() {
                (Ne(a, {
                  state: `proceeding`,
                  proceed: void 0,
                  reset: void 0,
                  location: r,
                }),
                  t.then(() => e.history.go(i)));
              },
              reset() {
                let e = new Map(C.blockers);
                (e.set(a, Er), B({ blockers: e }));
              },
            }));
          return;
        }
        return de(n, r);
      })),
      n)
    ) {
      Di(t, O);
      let e = () => Oi(t, O);
      (t.addEventListener(`pagehide`, e),
        (k = () => t.removeEventListener(`pagehide`, e)));
    }
    return (
      C.initialized || de(wn.Pop, C.location, { initialHydration: !0 }),
      S
    );
  }
  function oe() {
    (f && f(),
      k && k(),
      p.clear(),
      E && E.abort(),
      C.fetchers.forEach((e, t) => Te(t)),
      C.blockers.forEach((e, t) => Me(t)));
  }
  function se(e) {
    return (p.add(e), () => p.delete(e));
  }
  function B(e, t) {
    (t === void 0 && (t = {}), (C = U({}, C, e)));
    let n = [],
      r = [];
    (d.v7_fetcherPersist &&
      C.fetchers.forEach((e, t) => {
        e.state === `idle` && (z.has(t) ? r.push(t) : n.push(t));
      }),
      z.forEach((e) => {
        !C.fetchers.has(e) && !P.has(e) && r.push(e);
      }),
      [...p].forEach((e) =>
        e(C, {
          deletedFetchers: r,
          viewTransitionOpts: t.viewTransitionOpts,
          flushSync: t.flushSync === !0,
        }),
      ),
      d.v7_fetcherPersist
        ? (n.forEach((e) => C.fetchers.delete(e)), r.forEach((e) => Te(e)))
        : r.forEach((e) => z.delete(e)));
  }
  function ce(t, n, r) {
    let { flushSync: i } = r === void 0 ? {} : r,
      a =
        C.actionData != null &&
        C.navigation.formMethod != null &&
        hi(C.navigation.formMethod) &&
        C.navigation.state === `loading` &&
        t.state?._isRedirect !== !0,
      c;
    c = n.actionData
      ? Object.keys(n.actionData).length > 0
        ? n.actionData
        : null
      : a
        ? C.actionData
        : null;
    let l = n.loaderData
        ? ei(C.loaderData, n.loaderData, n.matches || [], n.errors)
        : C.loaderData,
      u = C.blockers;
    u.size > 0 && ((u = new Map(u)), u.forEach((e, t) => u.set(t, Er)));
    let d =
      T === !0 ||
      (C.navigation.formMethod != null &&
        hi(C.navigation.formMethod) &&
        t.state?._isRedirect !== !0);
    ((s &&= ((o = s), void 0)),
      A ||
        w === wn.Pop ||
        (w === wn.Push
          ? e.history.push(t, t.state)
          : w === wn.Replace && e.history.replace(t, t.state)));
    let f;
    if (w === wn.Pop) {
      let e = O.get(C.location.pathname);
      e && e.has(t.pathname)
        ? (f = { currentLocation: C.location, nextLocation: t })
        : O.has(t.pathname) &&
          (f = { currentLocation: t, nextLocation: C.location });
    } else if (D) {
      let e = O.get(C.location.pathname);
      (e
        ? e.add(t.pathname)
        : ((e = new Set([t.pathname])), O.set(C.location.pathname, e)),
        (f = { currentLocation: C.location, nextLocation: t }));
    }
    (B(
      U({}, n, {
        actionData: c,
        loaderData: l,
        historyAction: w,
        location: t,
        initialized: !0,
        navigation: wr,
        revalidation: `idle`,
        restoreScrollPosition: Be(t, n.matches || C.matches),
        preventScrollReset: d,
        blockers: u,
      }),
      { viewTransitionOpts: f, flushSync: i === !0 },
    ),
      (w = wn.Pop),
      (T = !1),
      (D = !1),
      (A = !1),
      (j = !1),
      (M = []));
  }
  async function le(t, n) {
    if (typeof t == `number`) {
      e.history.go(t);
      return;
    }
    let r = Mr(
        C.location,
        C.matches,
        c,
        d.v7_prependBasename,
        t,
        d.v7_relativeSplatPath,
        n?.fromRouteId,
        n?.relative,
      ),
      {
        path: i,
        submission: a,
        error: o,
      } = Nr(d.v7_normalizeFormMethod, !1, r, n),
      s = C.location,
      l = An(C.location, i, n && n.state);
    l = U({}, l, e.history.encodeLocation(l));
    let u = n && n.replace != null ? n.replace : void 0,
      f = wn.Push;
    u === !0
      ? (f = wn.Replace)
      : u === !1 ||
        (a != null &&
          hi(a.formMethod) &&
          a.formAction === C.location.pathname + C.location.search &&
          (f = wn.Replace));
    let p =
        n && `preventScrollReset` in n ? n.preventScrollReset === !0 : void 0,
      m = (n && n.flushSync) === !0,
      h = Pe({ currentLocation: s, nextLocation: l, historyAction: f });
    if (h) {
      Ne(h, {
        state: `blocked`,
        location: l,
        proceed() {
          (Ne(h, {
            state: `proceeding`,
            proceed: void 0,
            reset: void 0,
            location: l,
          }),
            le(t, n));
        },
        reset() {
          let e = new Map(C.blockers);
          (e.set(h, Er), B({ blockers: e }));
        },
      });
      return;
    }
    return await de(f, l, {
      submission: a,
      pendingError: o,
      preventScrollReset: p,
      replace: n && n.replace,
      enableViewTransition: n && n.viewTransition,
      flushSync: m,
    });
  }
  function ue() {
    if (
      (xe(),
      B({ revalidation: `loading` }),
      C.navigation.state !== `submitting`)
    ) {
      if (C.navigation.state === `idle`) {
        de(C.historyAction, C.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      de(w || C.historyAction, C.navigation.location, {
        overrideNavigation: C.navigation,
        enableViewTransition: D === !0,
      });
    }
  }
  async function de(t, n, r) {
    (E && E.abort(),
      (E = null),
      (w = t),
      (A = (r && r.startUninterruptedRevalidation) === !0),
      ze(C.location, C.matches),
      (T = (r && r.preventScrollReset) === !0),
      (D = (r && r.enableViewTransition) === !0));
    let i = s || o,
      a = r && r.overrideNavigation,
      l =
        r != null &&
        r.initialHydration &&
        C.matches &&
        C.matches.length > 0 &&
        !y
          ? C.matches
          : Ln(i, n, c),
      u = (r && r.flushSync) === !0;
    if (
      l &&
      C.initialized &&
      !j &&
      oi(C.location, n) &&
      !(r && r.submission && hi(r.submission.formMethod))
    ) {
      ce(n, { matches: l }, { flushSync: u });
      return;
    }
    let d = Ve(l, i, n.pathname);
    if ((d.active && d.matches && (l = d.matches), !l)) {
      let { error: e, notFoundMatches: t, route: r } = Fe(n.pathname);
      ce(
        n,
        { matches: t, loaderData: {}, errors: { [r.id]: e } },
        { flushSync: u },
      );
      return;
    }
    E = new AbortController();
    let f = Yr(e.history, n, E.signal, r && r.submission),
      p;
    if (r && r.pendingError)
      p = [ni(l).route.id, { type: G.error, error: r.pendingError }];
    else if (r && r.submission && hi(r.submission.formMethod)) {
      let t = await fe(f, n, r.submission, l, d.active, {
        replace: r.replace,
        flushSync: u,
      });
      if (t.shortCircuited) return;
      if (t.pendingActionResult) {
        let [e, r] = t.pendingActionResult;
        if (li(r) && _r(r.error) && r.error.status === 404) {
          ((E = null),
            ce(n, {
              matches: t.matches,
              loaderData: {},
              errors: { [e]: r.error },
            }));
          return;
        }
      }
      ((l = t.matches || l),
        (p = t.pendingActionResult),
        (a = Si(n, r.submission)),
        (u = !1),
        (d.active = !1),
        (f = Yr(e.history, f.url, f.signal)));
    }
    let {
      shortCircuited: m,
      matches: h,
      loaderData: g,
      errors: _,
    } = await pe(
      f,
      n,
      l,
      d.active,
      a,
      r && r.submission,
      r && r.fetcherSubmission,
      r && r.replace,
      r && r.initialHydration === !0,
      u,
      p,
    );
    m ||
      ((E = null),
      ce(n, U({ matches: h || l }, ti(p), { loaderData: g, errors: _ })));
  }
  async function fe(t, n, r, i, a, o) {
    if (
      (o === void 0 && (o = {}),
      xe(),
      B({ navigation: Ci(n, r) }, { flushSync: o.flushSync === !0 }),
      a)
    ) {
      let e = await He(i, n.pathname, t.signal);
      if (e.type === `aborted`) return { shortCircuited: !0 };
      if (e.type === `error`) {
        let t = ni(e.partialMatches).route.id;
        return {
          matches: e.partialMatches,
          pendingActionResult: [t, { type: G.error, error: e.error }],
        };
      }
      if (e.matches) i = e.matches;
      else {
        let { notFoundMatches: e, error: t, route: r } = Fe(n.pathname);
        return {
          matches: e,
          pendingActionResult: [r.id, { type: G.error, error: t }],
        };
      }
    }
    let s,
      l = bi(i, n);
    if (!l.route.action && !l.route.lazy)
      s = {
        type: G.error,
        error: ri(405, {
          method: t.method,
          pathname: n.pathname,
          routeId: l.route.id,
        }),
      };
    else if (
      ((s = (await be(`action`, C, t, [l], i, null))[l.route.id]),
      t.signal.aborted)
    )
      return { shortCircuited: !0 };
    if (ui(s)) {
      let n;
      return (
        (n =
          o && o.replace != null
            ? o.replace
            : Jr(
                s.response.headers.get(`Location`),
                new URL(t.url),
                c,
                e.history,
              ) ===
              C.location.pathname + C.location.search),
        await ye(t, s, !0, { submission: r, replace: n }),
        { shortCircuited: !0 }
      );
    }
    if (ci(s)) throw ri(400, { type: `defer-action` });
    if (li(s)) {
      let e = ni(i, l.route.id);
      return (
        (o && o.replace) !== !0 && (w = wn.Push),
        { matches: i, pendingActionResult: [e.route.id, s] }
      );
    }
    return { matches: i, pendingActionResult: [l.route.id, s] };
  }
  async function pe(t, n, r, i, a, l, u, f, p, m, h) {
    let g = a || Si(n, l),
      _ = l || u || xi(g),
      v = !A && (!d.v7_partialHydration || !p);
    if (i) {
      if (v) {
        let e = me(h);
        B(U({ navigation: g }, e === void 0 ? {} : { actionData: e }), {
          flushSync: m,
        });
      }
      let e = await He(r, n.pathname, t.signal);
      if (e.type === `aborted`) return { shortCircuited: !0 };
      if (e.type === `error`) {
        let t = ni(e.partialMatches).route.id;
        return {
          matches: e.partialMatches,
          loaderData: {},
          errors: { [t]: e.error },
        };
      }
      if (e.matches) r = e.matches;
      else {
        let { error: e, notFoundMatches: t, route: r } = Fe(n.pathname);
        return { matches: t, loaderData: {}, errors: { [r.id]: e } };
      }
    }
    let y = s || o,
      [b, x] = Fr(
        e.history,
        C,
        r,
        _,
        n,
        d.v7_partialHydration && p === !0,
        d.v7_skipActionErrorRevalidation,
        j,
        M,
        N,
        z,
        L,
        I,
        y,
        c,
        h,
      );
    if (
      (Ie(
        (e) =>
          !(r && r.some((t) => t.route.id === e)) ||
          (b && b.some((t) => t.route.id === e)),
      ),
      (ee = ++F),
      b.length === 0 && x.length === 0)
    ) {
      let e = ke();
      return (
        ce(
          n,
          U(
            {
              matches: r,
              loaderData: {},
              errors: h && li(h[1]) ? { [h[0]]: h[1].error } : null,
            },
            ti(h),
            e ? { fetchers: new Map(C.fetchers) } : {},
          ),
          { flushSync: m },
        ),
        { shortCircuited: !0 }
      );
    }
    if (v) {
      let e = {};
      if (!i) {
        e.navigation = g;
        let t = me(h);
        t !== void 0 && (e.actionData = t);
      }
      (x.length > 0 && (e.fetchers = he(x)), B(e, { flushSync: m }));
    }
    x.forEach((e) => {
      (De(e.key), e.controller && P.set(e.key, e.controller));
    });
    let S = () => x.forEach((e) => De(e.key));
    E && E.signal.addEventListener(`abort`, S);
    let { loaderResults: w, fetcherResults: T } = await V(C, r, b, x, t);
    if (t.signal.aborted) return { shortCircuited: !0 };
    (E && E.signal.removeEventListener(`abort`, S),
      x.forEach((e) => P.delete(e.key)));
    let D = ii(w);
    if (D)
      return (
        await ye(t, D.result, !0, { replace: f }),
        { shortCircuited: !0 }
      );
    if (((D = ii(T)), D))
      return (
        I.add(D.key),
        await ye(t, D.result, !0, { replace: f }),
        { shortCircuited: !0 }
      );
    let { loaderData: O, errors: k } = $r(C, r, w, h, x, T, ne);
    (ne.forEach((e, t) => {
      e.subscribe((n) => {
        (n || e.done) && ne.delete(t);
      });
    }),
      d.v7_partialHydration && p && C.errors && (k = U({}, C.errors, k)));
    let te = ke(),
      R = Ae(ee),
      re = te || R || x.length > 0;
    return U(
      { matches: r, loaderData: O, errors: k },
      re ? { fetchers: new Map(C.fetchers) } : {},
    );
  }
  function me(e) {
    if (e && !li(e[1])) return { [e[0]]: e[1].data };
    if (C.actionData)
      return Object.keys(C.actionData).length === 0 ? null : C.actionData;
  }
  function he(e) {
    return (
      e.forEach((e) => {
        let t = C.fetchers.get(e.key),
          n = wi(void 0, t ? t.data : void 0);
        C.fetchers.set(e.key, n);
      }),
      new Map(C.fetchers)
    );
  }
  function ge(e, t, n, i) {
    if (r)
      throw Error(
        `router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.`,
      );
    De(e);
    let a = (i && i.flushSync) === !0,
      l = s || o,
      u = Mr(
        C.location,
        C.matches,
        c,
        d.v7_prependBasename,
        n,
        d.v7_relativeSplatPath,
        t,
        i?.relative,
      ),
      f = Ln(l, u, c),
      p = Ve(f, l, u);
    if ((p.active && p.matches && (f = p.matches), !f)) {
      Ce(e, t, ri(404, { pathname: u }), { flushSync: a });
      return;
    }
    let {
      path: m,
      submission: h,
      error: g,
    } = Nr(d.v7_normalizeFormMethod, !0, u, i);
    if (g) {
      Ce(e, t, g, { flushSync: a });
      return;
    }
    let _ = bi(f, m),
      v = (i && i.preventScrollReset) === !0;
    if (h && hi(h.formMethod)) {
      _e(e, t, m, _, f, p.active, a, v, h);
      return;
    }
    (L.set(e, { routeId: t, path: m }), ve(e, t, m, _, f, p.active, a, v, h));
  }
  async function _e(t, n, r, i, a, l, u, f, p) {
    (xe(), L.delete(t));
    function m(e) {
      return (
        !e.route.action &&
        !e.route.lazy &&
        (Ce(t, n, ri(405, { method: p.formMethod, pathname: r, routeId: n }), {
          flushSync: u,
        }),
        !0)
      );
    }
    if (!l && m(i)) return;
    Se(t, Ti(p, C.fetchers.get(t)), { flushSync: u });
    let h = new AbortController(),
      g = Yr(e.history, r, h.signal, p);
    if (l) {
      let e = await He(a, new URL(g.url).pathname, g.signal, t);
      if (e.type === `aborted`) return;
      if (e.type === `error`) {
        Ce(t, n, e.error, { flushSync: u });
        return;
      }
      if (!e.matches) {
        Ce(t, n, ri(404, { pathname: r }), { flushSync: u });
        return;
      }
      if (((a = e.matches), (i = bi(a, r)), m(i))) return;
    }
    P.set(t, h);
    let _ = F,
      v = (await be(`action`, C, g, [i], a, t))[i.route.id];
    if (g.signal.aborted) {
      P.get(t) === h && P.delete(t);
      return;
    }
    if (d.v7_fetcherPersist && z.has(t)) {
      if (ui(v) || li(v)) {
        Se(t, Ei(void 0));
        return;
      }
    } else {
      if (ui(v)) {
        if ((P.delete(t), ee > _)) {
          Se(t, Ei(void 0));
          return;
        }
        return (
          I.add(t),
          Se(t, wi(p)),
          ye(g, v, !1, { fetcherSubmission: p, preventScrollReset: f })
        );
      }
      if (li(v)) {
        Ce(t, n, v.error);
        return;
      }
    }
    if (ci(v)) throw ri(400, { type: `defer-action` });
    let y = C.navigation.location || C.location,
      b = Yr(e.history, y, h.signal),
      x = s || o,
      S =
        C.navigation.state === `idle`
          ? C.matches
          : Ln(x, C.navigation.location, c);
    W(S, `Didn't find any matches after fetcher action`);
    let T = ++F;
    te.set(t, T);
    let D = wi(p, v.data);
    C.fetchers.set(t, D);
    let [O, k] = Fr(
      e.history,
      C,
      S,
      p,
      y,
      !1,
      d.v7_skipActionErrorRevalidation,
      j,
      M,
      N,
      z,
      L,
      I,
      x,
      c,
      [i.route.id, v],
    );
    (k
      .filter((e) => e.key !== t)
      .forEach((e) => {
        let t = e.key,
          n = C.fetchers.get(t),
          r = wi(void 0, n ? n.data : void 0);
        (C.fetchers.set(t, r), De(t), e.controller && P.set(t, e.controller));
      }),
      B({ fetchers: new Map(C.fetchers) }));
    let A = () => k.forEach((e) => De(e.key));
    h.signal.addEventListener(`abort`, A);
    let { loaderResults: R, fetcherResults: re } = await V(C, S, O, k, b);
    if (h.signal.aborted) return;
    (h.signal.removeEventListener(`abort`, A),
      te.delete(t),
      P.delete(t),
      k.forEach((e) => P.delete(e.key)));
    let ie = ii(R);
    if (ie) return ye(b, ie.result, !1, { preventScrollReset: f });
    if (((ie = ii(re)), ie))
      return (I.add(ie.key), ye(b, ie.result, !1, { preventScrollReset: f }));
    let { loaderData: ae, errors: oe } = $r(C, S, R, void 0, k, re, ne);
    if (C.fetchers.has(t)) {
      let e = Ei(v.data);
      C.fetchers.set(t, e);
    }
    (Ae(T),
      C.navigation.state === `loading` && T > ee
        ? (W(w, `Expected pending action`),
          E && E.abort(),
          ce(C.navigation.location, {
            matches: S,
            loaderData: ae,
            errors: oe,
            fetchers: new Map(C.fetchers),
          }))
        : (B({
            errors: oe,
            loaderData: ei(C.loaderData, ae, S, oe),
            fetchers: new Map(C.fetchers),
          }),
          (j = !1)));
  }
  async function ve(t, n, r, i, a, o, s, c, l) {
    let u = C.fetchers.get(t);
    Se(t, wi(l, u ? u.data : void 0), { flushSync: s });
    let d = new AbortController(),
      f = Yr(e.history, r, d.signal);
    if (o) {
      let e = await He(a, new URL(f.url).pathname, f.signal, t);
      if (e.type === `aborted`) return;
      if (e.type === `error`) {
        Ce(t, n, e.error, { flushSync: s });
        return;
      }
      if (e.matches) ((a = e.matches), (i = bi(a, r)));
      else {
        Ce(t, n, ri(404, { pathname: r }), { flushSync: s });
        return;
      }
    }
    P.set(t, d);
    let p = F,
      m = (await be(`loader`, C, f, [i], a, t))[i.route.id];
    if (
      (ci(m) && (m = (await vi(m, f.signal, !0)) || m),
      P.get(t) === d && P.delete(t),
      !f.signal.aborted)
    ) {
      if (z.has(t)) {
        Se(t, Ei(void 0));
        return;
      }
      if (ui(m)) {
        if (ee > p) {
          Se(t, Ei(void 0));
          return;
        }
        (I.add(t), await ye(f, m, !1, { preventScrollReset: c }));
        return;
      }
      if (li(m)) {
        Ce(t, n, m.error);
        return;
      }
      (W(!ci(m), `Unhandled fetcher deferred data`), Se(t, Ei(m.data)));
    }
  }
  async function ye(r, i, a, o) {
    let {
      submission: s,
      fetcherSubmission: l,
      preventScrollReset: u,
      replace: d,
    } = o === void 0 ? {} : o;
    i.response.headers.has(`X-Remix-Revalidate`) && (j = !0);
    let f = i.response.headers.get(`Location`);
    (W(f, `Expected a Location header on the redirect Response`),
      (f = Jr(f, new URL(r.url), c, e.history)));
    let p = An(C.location, f, { _isRedirect: !0 });
    if (n) {
      let n = !1;
      if (i.response.headers.has(`X-Remix-Reload-Document`)) n = !0;
      else if (Dr.test(f)) {
        let r = e.history.createURL(f);
        n = r.origin !== t.location.origin || nr(r.pathname, c) == null;
      }
      if (n) {
        d ? t.location.replace(f) : t.location.assign(f);
        return;
      }
    }
    E = null;
    let m =
        d === !0 || i.response.headers.has(`X-Remix-Replace`)
          ? wn.Replace
          : wn.Push,
      { formMethod: h, formAction: g, formEncType: _ } = C.navigation;
    !s && !l && h && g && _ && (s = xi(C.navigation));
    let v = s || l;
    Cr.has(i.response.status) && v && hi(v.formMethod)
      ? await de(m, p, {
          submission: U({}, v, { formAction: f }),
          preventScrollReset: u || T,
          enableViewTransition: a ? D : void 0,
        })
      : await de(m, p, {
          overrideNavigation: Si(p, s),
          fetcherSubmission: l,
          preventScrollReset: u || T,
          enableViewTransition: a ? D : void 0,
        });
  }
  async function be(e, t, n, r, o, s) {
    let u,
      f = {};
    try {
      u = await Wr(l, e, t, n, r, o, s, a, i);
    } catch (e) {
      return (
        r.forEach((t) => {
          f[t.route.id] = { type: G.error, error: e };
        }),
        f
      );
    }
    for (let [e, t] of Object.entries(u))
      if (si(t)) {
        let r = t.result;
        f[e] = {
          type: G.redirect,
          response: qr(r, n, e, o, c, d.v7_relativeSplatPath),
        };
      } else f[e] = await Kr(t);
    return f;
  }
  async function V(t, n, r, i, a) {
    let o = t.matches,
      s = be(`loader`, t, a, r, n, null),
      c = Promise.all(
        i.map(async (n) => {
          if (n.matches && n.match && n.controller) {
            let r = (
              await be(
                `loader`,
                t,
                Yr(e.history, n.path, n.controller.signal),
                [n.match],
                n.matches,
                n.key,
              )
            )[n.match.route.id];
            return { [n.key]: r };
          }
          return Promise.resolve({
            [n.key]: { type: G.error, error: ri(404, { pathname: n.path }) },
          });
        }),
      ),
      l = await s,
      u = (await c).reduce((e, t) => Object.assign(e, t), {});
    return (
      await Promise.all([gi(n, l, a.signal, o, t.loaderData), _i(n, u, i)]),
      { loaderResults: l, fetcherResults: u }
    );
  }
  function xe() {
    ((j = !0),
      M.push(...Ie()),
      L.forEach((e, t) => {
        (P.has(t) && N.add(t), De(t));
      }));
  }
  function Se(e, t, n) {
    (n === void 0 && (n = {}),
      C.fetchers.set(e, t),
      B(
        { fetchers: new Map(C.fetchers) },
        { flushSync: (n && n.flushSync) === !0 },
      ));
  }
  function Ce(e, t, n, r) {
    r === void 0 && (r = {});
    let i = ni(C.matches, t);
    (Te(e),
      B(
        { errors: { [i.route.id]: n }, fetchers: new Map(C.fetchers) },
        { flushSync: (r && r.flushSync) === !0 },
      ));
  }
  function we(e) {
    return (
      R.set(e, (R.get(e) || 0) + 1),
      z.has(e) && z.delete(e),
      C.fetchers.get(e) || Tr
    );
  }
  function Te(e) {
    let t = C.fetchers.get(e);
    (P.has(e) && !(t && t.state === `loading` && te.has(e)) && De(e),
      L.delete(e),
      te.delete(e),
      I.delete(e),
      d.v7_fetcherPersist && z.delete(e),
      N.delete(e),
      C.fetchers.delete(e));
  }
  function Ee(e) {
    let t = (R.get(e) || 0) - 1;
    (t <= 0
      ? (R.delete(e), z.add(e), d.v7_fetcherPersist || Te(e))
      : R.set(e, t),
      B({ fetchers: new Map(C.fetchers) }));
  }
  function De(e) {
    let t = P.get(e);
    t && (t.abort(), P.delete(e));
  }
  function Oe(e) {
    for (let t of e) {
      let e = Ei(we(t).data);
      C.fetchers.set(t, e);
    }
  }
  function ke() {
    let e = [],
      t = !1;
    for (let n of I) {
      let r = C.fetchers.get(n);
      (W(r, `Expected fetcher: ` + n),
        r.state === `loading` && (I.delete(n), e.push(n), (t = !0)));
    }
    return (Oe(e), t);
  }
  function Ae(e) {
    let t = [];
    for (let [n, r] of te)
      if (r < e) {
        let e = C.fetchers.get(n);
        (W(e, `Expected fetcher: ` + n),
          e.state === `loading` && (De(n), te.delete(n), t.push(n)));
      }
    return (Oe(t), t.length > 0);
  }
  function je(e, t) {
    let n = C.blockers.get(e) || Er;
    return (re.get(e) !== t && re.set(e, t), n);
  }
  function Me(e) {
    (C.blockers.delete(e), re.delete(e));
  }
  function Ne(e, t) {
    let n = C.blockers.get(e) || Er;
    W(
      (n.state === `unblocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `proceeding`) ||
        (n.state === `blocked` && t.state === `unblocked`) ||
        (n.state === `proceeding` && t.state === `unblocked`),
      `Invalid blocker state transition: ` + n.state + ` -> ` + t.state,
    );
    let r = new Map(C.blockers);
    (r.set(e, t), B({ blockers: r }));
  }
  function Pe(e) {
    let { currentLocation: t, nextLocation: n, historyAction: r } = e;
    if (re.size === 0) return;
    re.size > 1 && Dn(!1, `A router only supports one blocker at a time`);
    let i = Array.from(re.entries()),
      [a, o] = i[i.length - 1],
      s = C.blockers.get(a);
    if (
      !(s && s.state === `proceeding`) &&
      o({ currentLocation: t, nextLocation: n, historyAction: r })
    )
      return a;
  }
  function Fe(e) {
    let t = ri(404, { pathname: e }),
      { matches: n, route: r } = K(s || o);
    return (Ie(), { notFoundMatches: n, route: r, error: t });
  }
  function Ie(e) {
    let t = [];
    return (
      ne.forEach((n, r) => {
        (!e || e(r)) && (n.cancel(), t.push(r), ne.delete(r));
      }),
      t
    );
  }
  function Le(e, t, n) {
    if (((m = e), (g = t), (h = n || null), !_ && C.navigation === wr)) {
      _ = !0;
      let e = Be(C.location, C.matches);
      e != null && B({ restoreScrollPosition: e });
    }
    return () => {
      ((m = null), (g = null), (h = null));
    };
  }
  function Re(e, t) {
    return (
      (h &&
        h(
          e,
          t.map((e) => zn(e, C.loaderData)),
        )) ||
      e.key
    );
  }
  function ze(e, t) {
    if (m && g) {
      let n = Re(e, t);
      m[n] = g();
    }
  }
  function Be(e, t) {
    if (m) {
      let n = Re(e, t),
        r = m[n];
      if (typeof r == `number`) return r;
    }
    return null;
  }
  function Ve(e, t, n) {
    if (u) {
      if (!e) return { active: !0, matches: Rn(t, n, c, !0) || [] };
      if (Object.keys(e[0].params).length > 0)
        return { active: !0, matches: Rn(t, n, c, !0) };
    }
    return { active: !1, matches: null };
  }
  async function He(e, t, n, r) {
    if (!u) return { type: `success`, matches: e };
    let l = e;
    for (;;) {
      let e = s == null,
        d = s || o,
        f = a;
      try {
        await u({
          signal: n,
          path: t,
          matches: l,
          fetcherKey: r,
          patch: (e, t) => {
            n.aborted || Br(e, t, d, f, i);
          },
        });
      } catch (e) {
        return { type: `error`, error: e, partialMatches: l };
      } finally {
        e && !n.aborted && (o = [...o]);
      }
      if (n.aborted) return { type: `aborted` };
      let p = Ln(d, t, c);
      if (p) return { type: `success`, matches: p };
      let m = Rn(d, t, c, !0);
      if (
        !m ||
        (l.length === m.length &&
          l.every((e, t) => e.route.id === m[t].route.id))
      )
        return { type: `success`, matches: null };
      l = m;
    }
  }
  function Ue(e) {
    ((a = {}), (s = In(e, i, void 0, a)));
  }
  function We(e, t) {
    let n = s == null;
    (Br(e, t, s || o, a, i), n && ((o = [...o]), B({})));
  }
  return (
    (S = {
      get basename() {
        return c;
      },
      get future() {
        return d;
      },
      get state() {
        return C;
      },
      get routes() {
        return o;
      },
      get window() {
        return t;
      },
      initialize: ae,
      subscribe: se,
      enableScrollRestoration: Le,
      navigate: le,
      fetch: ge,
      revalidate: ue,
      createHref: (t) => e.history.createHref(t),
      encodeLocation: (t) => e.history.encodeLocation(t),
      getFetcher: we,
      deleteFetcher: Ee,
      dispose: oe,
      getBlocker: je,
      deleteBlocker: Me,
      patchRoutes: We,
      _internalFetchControllers: P,
      _internalActiveDeferreds: ne,
      _internalSetRoutes: Ue,
    }),
    S
  );
}
function jr(e) {
  return (
    e != null &&
    ((`formData` in e && e.formData != null) ||
      (`body` in e && e.body !== void 0))
  );
}
function Mr(e, t, n, r, i, a, o, s) {
  let c, l;
  if (o) {
    c = [];
    for (let e of t)
      if ((c.push(e), e.route.id === o)) {
        l = e;
        break;
      }
  } else ((c = t), (l = t[t.length - 1]));
  let u = ur(i || `.`, lr(c, a), nr(e.pathname, n) || e.pathname, s === `path`);
  if (
    (i ?? ((u.search = e.search), (u.hash = e.hash)),
    (i == null || i === `` || i === `.`) && l)
  ) {
    let e = yi(u.search);
    if (l.route.index && !e)
      u.search = u.search ? u.search.replace(/^\?/, `?index&`) : `?index`;
    else if (!l.route.index && e) {
      let e = new URLSearchParams(u.search),
        t = e.getAll(`index`);
      (e.delete(`index`),
        t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      u.search = n ? `?` + n : ``;
    }
  }
  return (
    r &&
      n !== `/` &&
      (u.pathname = u.pathname === `/` ? n : fr([n, u.pathname])),
    jn(u)
  );
}
function Nr(e, t, n, r) {
  if (!r || !jr(r)) return { path: n };
  if (r.formMethod && !mi(r.formMethod))
    return { path: n, error: ri(405, { method: r.formMethod }) };
  let i = () => ({ path: n, error: ri(400, { type: `invalid-body` }) }),
    a = r.formMethod || `get`,
    o = e ? a.toUpperCase() : a.toLowerCase(),
    s = ai(n);
  if (r.body !== void 0) {
    if (r.formEncType === `text/plain`) {
      if (!hi(o)) return i();
      let e =
        typeof r.body == `string`
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce((e, t) => {
                let [n, r] = t;
                return (
                  `` +
                  e +
                  n +
                  `=` +
                  r +
                  `
`
                );
              }, ``)
            : String(r.body);
      return {
        path: n,
        submission: {
          formMethod: o,
          formAction: s,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: e,
        },
      };
    }
    if (r.formEncType === `application/json`) {
      if (!hi(o)) return i();
      try {
        let e = typeof r.body == `string` ? JSON.parse(r.body) : r.body;
        return {
          path: n,
          submission: {
            formMethod: o,
            formAction: s,
            formEncType: r.formEncType,
            formData: void 0,
            json: e,
            text: void 0,
          },
        };
      } catch {
        return i();
      }
    }
  }
  W(
    typeof FormData == `function`,
    `FormData is not available in this environment`,
  );
  let c, l;
  if (r.formData) ((c = Xr(r.formData)), (l = r.formData));
  else if (r.body instanceof FormData) ((c = Xr(r.body)), (l = r.body));
  else if (r.body instanceof URLSearchParams) ((c = r.body), (l = Zr(c)));
  else if (r.body == null) ((c = new URLSearchParams()), (l = new FormData()));
  else
    try {
      ((c = new URLSearchParams(r.body)), (l = Zr(c)));
    } catch {
      return i();
    }
  let u = {
    formMethod: o,
    formAction: s,
    formEncType: (r && r.formEncType) || `application/x-www-form-urlencoded`,
    formData: l,
    json: void 0,
    text: void 0,
  };
  if (hi(u.formMethod)) return { path: n, submission: u };
  let d = Mn(n);
  return (
    t && d.search && yi(d.search) && c.append(`index`, ``),
    (d.search = `?` + c),
    { path: jn(d), submission: u }
  );
}
function Pr(e, t, n) {
  n === void 0 && (n = !1);
  let r = e.findIndex((e) => e.route.id === t);
  return r >= 0 ? e.slice(0, n ? r + 1 : r) : e;
}
function Fr(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
  let g = h ? (li(h[1]) ? h[1].error : h[1].data) : void 0,
    _ = e.createURL(t.location),
    v = e.createURL(i),
    y = n;
  a && t.errors
    ? (y = Pr(n, Object.keys(t.errors)[0], !0))
    : h && li(h[1]) && (y = Pr(n, h[0]));
  let b = h ? h[1].statusCode : void 0,
    x = o && b && b >= 400,
    S = y.filter((e, n) => {
      let { route: i } = e;
      if (i.lazy) return !0;
      if (i.loader == null) return !1;
      if (a) return Ir(i, t.loaderData, t.errors);
      if (Lr(t.loaderData, t.matches[n], e) || c.some((t) => t === e.route.id))
        return !0;
      let o = t.matches[n],
        l = e;
      return zr(
        e,
        U(
          {
            currentUrl: _,
            currentParams: o.params,
            nextUrl: v,
            nextParams: l.params,
          },
          r,
          {
            actionResult: g,
            actionStatus: b,
            defaultShouldRevalidate: x
              ? !1
              : s ||
                _.pathname + _.search === v.pathname + v.search ||
                _.search !== v.search ||
                Rr(o, l),
          },
        ),
      );
    }),
    C = [];
  return (
    d.forEach((e, i) => {
      if (a || !n.some((t) => t.route.id === e.routeId) || u.has(i)) return;
      let o = Ln(p, e.path, m);
      if (!o) {
        C.push({
          key: i,
          routeId: e.routeId,
          path: e.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let c = t.fetchers.get(i),
        d = bi(o, e.path),
        h = !1;
      (f.has(i)
        ? (h = !1)
        : l.has(i)
          ? (l.delete(i), (h = !0))
          : (h =
              c && c.state !== `idle` && c.data === void 0
                ? s
                : zr(
                    d,
                    U(
                      {
                        currentUrl: _,
                        currentParams: t.matches[t.matches.length - 1].params,
                        nextUrl: v,
                        nextParams: n[n.length - 1].params,
                      },
                      r,
                      {
                        actionResult: g,
                        actionStatus: b,
                        defaultShouldRevalidate: !x && s,
                      },
                    ),
                  )),
        h &&
          C.push({
            key: i,
            routeId: e.routeId,
            path: e.path,
            matches: o,
            match: d,
            controller: new AbortController(),
          }));
    }),
    [S, C]
  );
}
function Ir(e, t, n) {
  if (e.lazy) return !0;
  if (!e.loader) return !1;
  let r = t != null && t[e.id] !== void 0,
    i = n != null && n[e.id] !== void 0;
  return !r && i
    ? !1
    : (typeof e.loader == `function` && e.loader.hydrate === !0) || (!r && !i);
}
function Lr(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    i = e[n.route.id] === void 0;
  return r || i;
}
function Rr(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith(`*`) && e.params[`*`] !== t.params[`*`])
  );
}
function zr(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == `boolean`) return n;
  }
  return t.defaultShouldRevalidate;
}
function Br(e, t, n, r, i) {
  let a;
  if (e) {
    let t = r[e];
    (W(t, `No route found to patch children into: routeId = ` + e),
      (t.children ||= []),
      (a = t.children));
  } else a = n;
  let o = In(
    t.filter((e) => !a.some((t) => Vr(e, t))),
    i,
    [e || `_`, `patch`, String(a?.length || `0`)],
    r,
  );
  a.push(...o);
}
function Vr(e, t) {
  return `id` in e && `id` in t && e.id === t.id
    ? !0
    : e.index !== t.index ||
        e.path !== t.path ||
        e.caseSensitive !== t.caseSensitive
      ? !1
      : ((!e.children || e.children.length === 0) &&
          (!t.children || t.children.length === 0)) ||
        e.children.every((e, n) => t.children?.some((t) => Vr(e, t)));
}
async function Hr(e, t, n) {
  if (!e.lazy) return;
  let r = await e.lazy();
  if (!e.lazy) return;
  let i = n[e.id];
  W(i, `No route found in manifest`);
  let a = {};
  for (let e in r) {
    let t = i[e] !== void 0 && e !== `hasErrorBoundary`;
    (Dn(
      !t,
      `Route "` +
        i.id +
        `" has a static property "` +
        e +
        `" defined but its lazy function is also returning a value for this property. ` +
        (`The lazy route property "` + e + `" will be ignored.`),
    ),
      !t && !Pn.has(e) && (a[e] = r[e]));
  }
  (Object.assign(i, a), Object.assign(i, U({}, t(i), { lazy: void 0 })));
}
async function Ur(e) {
  let { matches: t } = e,
    n = t.filter((e) => e.shouldLoad);
  return (await Promise.all(n.map((e) => e.resolve()))).reduce(
    (e, t, r) => Object.assign(e, { [n[r].route.id]: t }),
    {},
  );
}
async function Wr(e, t, n, r, i, a, o, s, c, l) {
  let u = a.map((e) => (e.route.lazy ? Hr(e.route, c, s) : void 0)),
    d = await e({
      matches: a.map((e, n) => {
        let a = u[n],
          o = i.some((t) => t.route.id === e.route.id);
        return U({}, e, {
          shouldLoad: o,
          resolve: async (n) => (
            n &&
              r.method === `GET` &&
              (e.route.lazy || e.route.loader) &&
              (o = !0),
            o
              ? Gr(t, r, e, a, n, l)
              : Promise.resolve({ type: G.data, result: void 0 })
          ),
        });
      }),
      request: r,
      params: a[0].params,
      fetcherKey: o,
      context: l,
    });
  try {
    await Promise.all(u);
  } catch {}
  return d;
}
async function Gr(e, t, n, r, i, a) {
  let o,
    s,
    c = (r) => {
      let o,
        c = new Promise((e, t) => (o = t));
      ((s = () => o()), t.signal.addEventListener(`abort`, s));
      let l = (i) =>
          typeof r == `function`
            ? r(
                { request: t, params: n.params, context: a },
                ...(i === void 0 ? [] : [i]),
              )
            : Promise.reject(
                Error(
                  `You cannot call the handler for a route which defines a boolean ` +
                    (`"` + e + `" [routeId: ` + n.route.id + `]`),
                ),
              ),
        u = (async () => {
          try {
            return { type: `data`, result: await (i ? i((e) => l(e)) : l()) };
          } catch (e) {
            return { type: `error`, result: e };
          }
        })();
      return Promise.race([u, c]);
    };
  try {
    let i = n.route[e];
    if (r) {
      if (i) {
        let e,
          [t] = await Promise.all([
            c(i).catch((t) => {
              e = t;
            }),
            r,
          ]);
        if (e !== void 0) throw e;
        o = t;
      } else if ((await r, (i = n.route[e]), i)) o = await c(i);
      else if (e === `action`) {
        let e = new URL(t.url),
          r = e.pathname + e.search;
        throw ri(405, { method: t.method, pathname: r, routeId: n.route.id });
      } else return { type: G.data, result: void 0 };
    } else if (i) o = await c(i);
    else {
      let e = new URL(t.url);
      throw ri(404, { pathname: e.pathname + e.search });
    }
    W(
      o.result !== void 0,
      `You defined ` +
        (e === `action` ? `an action` : `a loader`) +
        ` for route ` +
        (`"` +
          n.route.id +
          `" but didn't return anything from your \`` +
          e +
          "` ") +
        "function. Please return a value or `null`.",
    );
  } catch (e) {
    return { type: G.error, result: e };
  } finally {
    s && t.signal.removeEventListener(`abort`, s);
  }
  return o;
}
async function Kr(e) {
  let { result: t, type: n } = e;
  if (pi(t)) {
    let e;
    try {
      let n = t.headers.get(`Content-Type`);
      e =
        n && /\bapplication\/json\b/.test(n)
          ? t.body == null
            ? null
            : await t.json()
          : await t.text();
    } catch (e) {
      return { type: G.error, error: e };
    }
    return n === G.error
      ? {
          type: G.error,
          error: new gr(t.status, t.statusText, e),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: G.data, data: e, statusCode: t.status, headers: t.headers };
  }
  if (n === G.error) {
    if (di(t)) {
      var r;
      if (t.data instanceof Error) {
        var i;
        return {
          type: G.error,
          error: t.data,
          statusCode: t.init?.status,
          headers:
            (i = t.init) != null && i.headers
              ? new Headers(t.init.headers)
              : void 0,
        };
      }
      return {
        type: G.error,
        error: new gr(t.init?.status || 500, void 0, t.data),
        statusCode: _r(t) ? t.status : void 0,
        headers:
          (r = t.init) != null && r.headers
            ? new Headers(t.init.headers)
            : void 0,
      };
    }
    return { type: G.error, error: t, statusCode: _r(t) ? t.status : void 0 };
  }
  if (fi(t))
    return {
      type: G.deferred,
      deferredData: t,
      statusCode: t.init?.status,
      headers: t.init?.headers && new Headers(t.init.headers),
    };
  if (di(t)) {
    var a;
    return {
      type: G.data,
      data: t.data,
      statusCode: t.init?.status,
      headers:
        (a = t.init) != null && a.headers
          ? new Headers(t.init.headers)
          : void 0,
    };
  }
  return { type: G.data, data: t };
}
function qr(e, t, n, r, i, a) {
  let o = e.headers.get(`Location`);
  if (
    (W(
      o,
      `Redirects returned/thrown from loaders/actions must have a Location header`,
    ),
    !Dr.test(o))
  ) {
    let s = r.slice(0, r.findIndex((e) => e.route.id === n) + 1);
    ((o = Mr(new URL(t.url), s, i, !0, o, a)), e.headers.set(`Location`, o));
  }
  return e;
}
function Jr(e, t, n, r) {
  let i = [
    `about:`,
    `blob:`,
    `chrome:`,
    `chrome-untrusted:`,
    `content:`,
    `data:`,
    `devtools:`,
    `file:`,
    `filesystem:`,
    `javascript:`,
  ];
  if (Dr.test(e)) {
    let r = e,
      a = r.startsWith(`//`) ? new URL(t.protocol + r) : new URL(r);
    if (i.includes(a.protocol)) throw Error(`Invalid redirect location`);
    let o = nr(a.pathname, n) != null;
    if (a.origin === t.origin && o) return dr(a.pathname) + a.search + a.hash;
  }
  try {
    let t = r.createURL(e);
    if (i.includes(t.protocol)) throw Error(`Invalid redirect location`);
  } catch {}
  return e;
}
function Yr(e, t, n, r) {
  let i = e.createURL(ai(t)).toString(),
    a = { signal: n };
  if (r && hi(r.formMethod)) {
    let { formMethod: e, formEncType: t } = r;
    ((a.method = e.toUpperCase()),
      t === `application/json`
        ? ((a.headers = new Headers({ "Content-Type": t })),
          (a.body = JSON.stringify(r.json)))
        : (a.body =
            t === `text/plain`
              ? r.text
              : t === `application/x-www-form-urlencoded` && r.formData
                ? Xr(r.formData)
                : r.formData));
  }
  return new Request(i, a);
}
function Xr(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == `string` ? r : r.name);
  return t;
}
function Zr(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function Qr(e, t, n, r, i) {
  let a = {},
    o = null,
    s,
    c = !1,
    l = {},
    u = n && li(n[1]) ? n[1].error : void 0;
  return (
    e.forEach((n) => {
      if (!(n.route.id in t)) return;
      let d = n.route.id,
        f = t[d];
      if (
        (W(!ui(f), `Cannot handle redirect results in processLoaderData`),
        li(f))
      ) {
        let t = f.error;
        if ((u !== void 0 && ((t = u), (u = void 0)), (o ||= {}), i)) o[d] = t;
        else {
          let n = ni(e, d);
          o[n.route.id] ?? (o[n.route.id] = t);
        }
        ((a[d] = void 0),
          c || ((c = !0), (s = _r(f.error) ? f.error.status : 500)),
          f.headers && (l[d] = f.headers));
      } else
        ci(f)
          ? (r.set(d, f.deferredData),
            (a[d] = f.deferredData.data),
            f.statusCode != null &&
              f.statusCode !== 200 &&
              !c &&
              (s = f.statusCode),
            f.headers && (l[d] = f.headers))
          : ((a[d] = f.data),
            f.statusCode && f.statusCode !== 200 && !c && (s = f.statusCode),
            f.headers && (l[d] = f.headers));
    }),
    u !== void 0 && n && ((o = { [n[0]]: u }), (a[n[0]] = void 0)),
    { loaderData: a, errors: o, statusCode: s || 200, loaderHeaders: l }
  );
}
function $r(e, t, n, r, i, a, o) {
  let { loaderData: s, errors: c } = Qr(t, n, r, o, !1);
  return (
    i.forEach((t) => {
      let { key: n, match: r, controller: i } = t,
        o = a[n];
      if (
        (W(o, `Did not find corresponding fetcher result`),
        !(i && i.signal.aborted))
      ) {
        if (li(o)) {
          let t = ni(e.matches, r?.route.id);
          ((c && c[t.route.id]) || (c = U({}, c, { [t.route.id]: o.error })),
            e.fetchers.delete(n));
        } else if (ui(o)) W(!1, `Unhandled fetcher revalidation redirect`);
        else if (ci(o)) W(!1, `Unhandled fetcher deferred data`);
        else {
          let t = Ei(o.data);
          e.fetchers.set(n, t);
        }
      }
    }),
    { loaderData: s, errors: c }
  );
}
function ei(e, t, n, r) {
  let i = U({}, t);
  for (let a of n) {
    let n = a.route.id;
    if (
      (t.hasOwnProperty(n)
        ? t[n] !== void 0 && (i[n] = t[n])
        : e[n] !== void 0 && a.route.loader && (i[n] = e[n]),
      r && r.hasOwnProperty(n))
    )
      break;
  }
  return i;
}
function ti(e) {
  return e
    ? li(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function ni(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((e) => e.route.id === t) + 1) : [...e])
      .reverse()
      .find((e) => e.route.hasErrorBoundary === !0) || e[0]
  );
}
function K(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((e) => e.index || !e.path || e.path === `/`) || {
          id: `__shim-error-route__`,
        };
  return {
    matches: [{ params: {}, pathname: ``, pathnameBase: ``, route: t }],
    route: t,
  };
}
function ri(e, t) {
  let {
      pathname: n,
      routeId: r,
      method: i,
      type: a,
      message: o,
    } = t === void 0 ? {} : t,
    s = `Unknown Server Error`,
    c = `Unknown @remix-run/router error`;
  return (
    e === 400
      ? ((s = `Bad Request`),
        i && n && r
          ? (c =
              `You made a ` +
              i +
              ` request to "` +
              n +
              `" but ` +
              ('did not provide a `loader` for route "' + r + `", `) +
              `so there is no way to handle the request.`)
          : a === `defer-action`
            ? (c = `defer() is not supported in actions`)
            : a === `invalid-body` && (c = `Unable to encode submission body`))
      : e === 403
        ? ((s = `Forbidden`),
          (c = `Route "` + r + `" does not match URL "` + n + `"`))
        : e === 404
          ? ((s = `Not Found`), (c = `No route matches URL "` + n + `"`))
          : e === 405 &&
            ((s = `Method Not Allowed`),
            i && n && r
              ? (c =
                  `You made a ` +
                  i.toUpperCase() +
                  ` request to "` +
                  n +
                  `" but ` +
                  ('did not provide an `action` for route "' + r + `", `) +
                  `so there is no way to handle the request.`)
              : i && (c = `Invalid request method "` + i.toUpperCase() + `"`)),
    new gr(e || 500, s, Error(c), !0)
  );
}
function ii(e) {
  let t = Object.entries(e);
  for (let e = t.length - 1; e >= 0; e--) {
    let [n, r] = t[e];
    if (ui(r)) return { key: n, result: r };
  }
}
function ai(e) {
  let t = typeof e == `string` ? Mn(e) : e;
  return jn(U({}, t, { hash: `` }));
}
function oi(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ``
      ? t.hash !== ``
      : e.hash === t.hash || t.hash !== ``;
}
function si(e) {
  return pi(e.result) && Sr.has(e.result.status);
}
function ci(e) {
  return e.type === G.deferred;
}
function li(e) {
  return e.type === G.error;
}
function ui(e) {
  return (e && e.type) === G.redirect;
}
function di(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `type` in e &&
    `data` in e &&
    `init` in e &&
    e.type === `DataWithResponseInit`
  );
}
function fi(e) {
  let t = e;
  return (
    t &&
    typeof t == `object` &&
    typeof t.data == `object` &&
    typeof t.subscribe == `function` &&
    typeof t.cancel == `function` &&
    typeof t.resolveData == `function`
  );
}
function pi(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.headers == `object` &&
    e.body !== void 0
  );
}
function mi(e) {
  return xr.has(e.toLowerCase());
}
function hi(e) {
  return yr.has(e.toLowerCase());
}
async function gi(e, t, n, r, i) {
  let a = Object.entries(t);
  for (let o = 0; o < a.length; o++) {
    let [s, c] = a[o],
      l = e.find((e) => e?.route.id === s);
    if (!l) continue;
    let u = r.find((e) => e.route.id === l.route.id),
      d = u != null && !Rr(u, l) && (i && i[l.route.id]) !== void 0;
    ci(c) &&
      d &&
      (await vi(c, n, !1).then((e) => {
        e && (t[s] = e);
      }));
  }
}
async function _i(e, t, n) {
  for (let r = 0; r < n.length; r++) {
    let { key: i, routeId: a, controller: o } = n[r],
      s = t[i];
    e.find((e) => e?.route.id === a) &&
      ci(s) &&
      (W(
        o,
        `Expected an AbortController for revalidating fetcher deferred result`,
      ),
      await vi(s, o.signal, !0).then((e) => {
        e && (t[i] = e);
      }));
  }
}
async function vi(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: G.data, data: e.deferredData.unwrappedData };
      } catch (e) {
        return { type: G.error, error: e };
      }
    return { type: G.data, data: e.deferredData.data };
  }
}
function yi(e) {
  return new URLSearchParams(e).getAll(`index`).some((e) => e === ``);
}
function bi(e, t) {
  let n = typeof t == `string` ? Mn(t).search : t.search;
  if (e[e.length - 1].route.index && yi(n || ``)) return e[e.length - 1];
  let r = cr(e);
  return r[r.length - 1];
}
function xi(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: i,
    formData: a,
    json: o,
  } = e;
  if (!(!t || !n || !r)) {
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: i,
      };
    if (a != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: a,
        json: void 0,
        text: void 0,
      };
    if (o !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: o,
        text: void 0,
      };
  }
}
function Si(e, t) {
  return t
    ? {
        state: `loading`,
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: `loading`,
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function Ci(e, t) {
  return {
    state: `submitting`,
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function wi(e, t) {
  return e
    ? {
        state: `loading`,
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: `loading`,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function Ti(e, t) {
  return {
    state: `submitting`,
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function Ei(e) {
  return {
    state: `idle`,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function Di(e, t) {
  try {
    let n = e.sessionStorage.getItem(kr);
    if (n) {
      let e = JSON.parse(n);
      for (let [n, r] of Object.entries(e || {}))
        r && Array.isArray(r) && t.set(n, new Set(r || []));
    }
  } catch {}
}
function Oi(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [e, r] of t) n[e] = [...r];
    try {
      e.sessionStorage.setItem(kr, JSON.stringify(n));
    } catch (e) {
      Dn(
        !1,
        `Failed to save applied view transitions in sessionStorage (` +
          e +
          `).`,
      );
    }
  }
}
function ki() {
  return (
    (ki = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ki.apply(null, arguments)
  );
}
var Ai = f.createContext(null),
  ji = f.createContext(null),
  Mi = f.createContext(null),
  Ni = f.createContext(null),
  Pi = f.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Fi = f.createContext(null);
function Ii(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  !Li() && W(!1);
  let { basename: r, navigator: i } = f.useContext(Mi),
    { hash: a, pathname: o, search: s } = Gi(e, { relative: n }),
    c = o;
  return (
    r !== `/` && (c = o === `/` ? r : fr([r, o])),
    i.createHref({ pathname: c, search: s, hash: a })
  );
}
function Li() {
  return f.useContext(Ni) != null;
}
function Ri() {
  return (!Li() && W(!1), f.useContext(Ni).location);
}
function zi(e) {
  f.useContext(Mi).static || f.useLayoutEffect(e);
}
function Bi() {
  let { isDataRoute: e } = f.useContext(Pi);
  return e ? aa() : Vi();
}
function Vi() {
  !Li() && W(!1);
  let e = f.useContext(Ai),
    { basename: t, future: n, navigator: r } = f.useContext(Mi),
    { matches: i } = f.useContext(Pi),
    { pathname: a } = Ri(),
    o = JSON.stringify(lr(i, n.v7_relativeSplatPath)),
    s = f.useRef(!1);
  return (
    zi(() => {
      s.current = !0;
    }),
    f.useCallback(
      function (n, i) {
        if ((i === void 0 && (i = {}), !s.current)) return;
        if (typeof n == `number`) {
          r.go(n);
          return;
        }
        let c = ur(n, JSON.parse(o), a, i.relative === `path`);
        (e == null &&
          t !== `/` &&
          (c.pathname = c.pathname === `/` ? t : fr([t, c.pathname])),
          (i.replace ? r.replace : r.push)(c, i.state, i));
      },
      [t, r, o, a, e],
    )
  );
}
var Hi = f.createContext(null);
function Ui(e) {
  let t = f.useContext(Pi).outlet;
  return t && f.createElement(Hi.Provider, { value: e }, t);
}
function Wi() {
  let { matches: e } = f.useContext(Pi),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Gi(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = f.useContext(Mi),
    { matches: i } = f.useContext(Pi),
    { pathname: a } = Ri(),
    o = JSON.stringify(lr(i, r.v7_relativeSplatPath));
  return f.useMemo(() => ur(e, JSON.parse(o), a, n === `path`), [e, o, a, n]);
}
function Ki(e, t, n, r) {
  !Li() && W(!1);
  let { navigator: i } = f.useContext(Mi),
    { matches: a } = f.useContext(Pi),
    o = a[a.length - 1],
    s = o ? o.params : {};
  o && o.pathname;
  let c = o ? o.pathnameBase : `/`;
  o && o.route;
  let l = Ri(),
    u;
  if (t) {
    let e = typeof t == `string` ? Mn(t) : t;
    (!(c === `/` || e.pathname?.startsWith(c)) && W(!1), (u = e));
  } else u = l;
  let d = u.pathname || `/`,
    p = d;
  if (c !== `/`) {
    let e = c.replace(/^\//, ``).split(`/`);
    p = `/` + d.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`);
  }
  let m = Ln(e, { pathname: p }),
    h = Zi(
      m &&
        m.map((e) =>
          Object.assign({}, e, {
            params: Object.assign({}, s, e.params),
            pathname: fr([
              c,
              i.encodeLocation
                ? i.encodeLocation(e.pathname).pathname
                : e.pathname,
            ]),
            pathnameBase:
              e.pathnameBase === `/`
                ? c
                : fr([
                    c,
                    i.encodeLocation
                      ? i.encodeLocation(e.pathnameBase).pathname
                      : e.pathnameBase,
                  ]),
          }),
        ),
      a,
      n,
      r,
    );
  return t && h
    ? f.createElement(
        Ni.Provider,
        {
          value: {
            location: ki(
              {
                pathname: `/`,
                search: ``,
                hash: ``,
                state: null,
                key: `default`,
              },
              u,
            ),
            navigationType: wn.Pop,
          },
        },
        h,
      )
    : h;
}
function qi() {
  let e = ia(),
    t = _r(e)
      ? e.status + ` ` + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null;
  return f.createElement(
    f.Fragment,
    null,
    f.createElement(`h2`, null, `Unexpected Application Error!`),
    f.createElement(`h3`, { style: { fontStyle: `italic` } }, t),
    n
      ? f.createElement(
          `pre`,
          {
            style: {
              padding: `0.5rem`,
              backgroundColor: `rgba(200,200,200, 0.5)`,
            },
          },
          n,
        )
      : null,
    null,
  );
}
var Ji = f.createElement(qi, null),
  Yi = class extends f.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      console.error(
        `React Router caught the following error during render`,
        e,
        t,
      );
    }
    render() {
      return this.state.error === void 0
        ? this.props.children
        : f.createElement(
            Pi.Provider,
            { value: this.props.routeContext },
            f.createElement(Fi.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          );
    }
  };
function Xi(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = f.useContext(Ai);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    f.createElement(Pi.Provider, { value: t }, r)
  );
}
function Zi(e, t, n, r) {
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let a = e,
    o = n?.errors;
  if (o != null) {
    let e = a.findIndex((e) => e.route.id && o?.[e.route.id] !== void 0);
    (!(e >= 0) && W(!1), (a = a.slice(0, Math.min(a.length, e + 1))));
  }
  let s = !1,
    c = -1;
  if (n && r && r.v7_partialHydration)
    for (let e = 0; e < a.length; e++) {
      let t = a[e];
      if (
        ((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (c = e),
        t.route.id)
      ) {
        let { loaderData: e, errors: r } = n,
          i =
            t.route.loader &&
            e[t.route.id] === void 0 &&
            (!r || r[t.route.id] === void 0);
        if (t.route.lazy || i) {
          ((s = !0), (a = c >= 0 ? a.slice(0, c + 1) : [a[0]]));
          break;
        }
      }
    }
  return a.reduceRight((e, r, i) => {
    let l,
      u = !1,
      d = null,
      p = null;
    n &&
      ((l = o && r.route.id ? o[r.route.id] : void 0),
      (d = r.route.errorElement || Ji),
      s &&
        (c < 0 && i === 0
          ? (sa(
              `route-fallback`,
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (u = !0),
            (p = null))
          : c === i &&
            ((u = !0), (p = r.route.hydrateFallbackElement || null))));
    let m = t.concat(a.slice(0, i + 1)),
      h = () => {
        let t;
        return (
          (t = l
            ? d
            : u
              ? p
              : r.route.Component
                ? f.createElement(r.route.Component, null)
                : r.route.element
                  ? r.route.element
                  : e),
          f.createElement(Xi, {
            match: r,
            routeContext: { outlet: e, matches: m, isDataRoute: n != null },
            children: t,
          })
        );
      };
    return n && (r.route.ErrorBoundary || r.route.errorElement || i === 0)
      ? f.createElement(Yi, {
          location: n.location,
          revalidation: n.revalidation,
          component: d,
          error: l,
          children: h(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var Qi = (function (e) {
    return (
      (e.UseBlocker = `useBlocker`),
      (e.UseRevalidator = `useRevalidator`),
      (e.UseNavigateStable = `useNavigate`),
      e
    );
  })(Qi || {}),
  $i = (function (e) {
    return (
      (e.UseBlocker = `useBlocker`),
      (e.UseLoaderData = `useLoaderData`),
      (e.UseActionData = `useActionData`),
      (e.UseRouteError = `useRouteError`),
      (e.UseNavigation = `useNavigation`),
      (e.UseRouteLoaderData = `useRouteLoaderData`),
      (e.UseMatches = `useMatches`),
      (e.UseRevalidator = `useRevalidator`),
      (e.UseNavigateStable = `useNavigate`),
      (e.UseRouteId = `useRouteId`),
      e
    );
  })($i || {});
function ea(e) {
  let t = f.useContext(Ai);
  return (!t && W(!1), t);
}
function ta(e) {
  let t = f.useContext(ji);
  return (!t && W(!1), t);
}
function na(e) {
  let t = f.useContext(Pi);
  return (!t && W(!1), t);
}
function ra(e) {
  let t = na(e),
    n = t.matches[t.matches.length - 1];
  return (!n.route.id && W(!1), n.route.id);
}
function ia() {
  let e = f.useContext(Fi),
    t = ta($i.UseRouteError),
    n = ra($i.UseRouteError);
  return e === void 0 ? t.errors?.[n] : e;
}
function aa() {
  let { router: e } = ea(Qi.UseNavigateStable),
    t = ra($i.UseNavigateStable),
    n = f.useRef(!1);
  return (
    zi(() => {
      n.current = !0;
    }),
    f.useCallback(
      function (r, i) {
        (i === void 0 && (i = {}),
          n.current &&
            (typeof r == `number`
              ? e.navigate(r)
              : e.navigate(r, ki({ fromRouteId: t }, i))));
      },
      [e, t],
    )
  );
}
var oa = {};
function sa(e, t, n) {
  !t && !oa[e] && (oa[e] = !0);
}
var ca = (e, t, n) => (
  `` +
    t +
    ("You can use the `" + e + "` future flag to opt-in early. ") +
    (`For more information, see ` + n + `.`),
  void 0
);
function la(e, t) {
  (e?.v7_startTransition === void 0 &&
    ca(
      `v7_startTransition`,
      "React Router will begin wrapping state updates in `React.startTransition` in v7",
      `https://reactrouter.com/v6/upgrading/future#v7_starttransition`,
    ),
    e?.v7_relativeSplatPath === void 0 &&
      (!t || t.v7_relativeSplatPath === void 0) &&
      ca(
        `v7_relativeSplatPath`,
        `Relative route resolution within Splat routes is changing in v7`,
        `https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath`,
      ),
    t &&
      (t.v7_fetcherPersist === void 0 &&
        ca(
          `v7_fetcherPersist`,
          `The persistence behavior of fetchers is changing in v7`,
          `https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist`,
        ),
      t.v7_normalizeFormMethod === void 0 &&
        ca(
          `v7_normalizeFormMethod`,
          "Casing of `formMethod` fields is being normalized to uppercase in v7",
          `https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod`,
        ),
      t.v7_partialHydration === void 0 &&
        ca(
          `v7_partialHydration`,
          "`RouterProvider` hydration behavior is changing in v7",
          `https://reactrouter.com/v6/upgrading/future#v7_partialhydration`,
        ),
      t.v7_skipActionErrorRevalidation === void 0 &&
        ca(
          `v7_skipActionErrorRevalidation`,
          "The revalidation behavior after 4xx/5xx `action` responses is changing in v7",
          `https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation`,
        )));
}
function ua(e) {
  let { to: t, replace: n, state: r, relative: i } = e;
  !Li() && W(!1);
  let { future: a, static: o } = f.useContext(Mi),
    { matches: s } = f.useContext(Pi),
    { pathname: c } = Ri(),
    l = Bi(),
    u = ur(t, lr(s, a.v7_relativeSplatPath), c, i === `path`),
    d = JSON.stringify(u);
  return (
    f.useEffect(
      () => l(JSON.parse(d), { replace: n, state: r, relative: i }),
      [l, d, i, n, r],
    ),
    null
  );
}
function da(e) {
  return Ui(e.context);
}
function fa(e) {
  let {
    basename: t = `/`,
    children: n = null,
    location: r,
    navigationType: i = wn.Pop,
    navigator: a,
    static: o = !1,
    future: s,
  } = e;
  Li() && W(!1);
  let c = t.replace(/^\/*/, `/`),
    l = f.useMemo(
      () => ({
        basename: c,
        navigator: a,
        static: o,
        future: ki({ v7_relativeSplatPath: !1 }, s),
      }),
      [c, s, a, o],
    );
  typeof r == `string` && (r = Mn(r));
  let {
      pathname: u = `/`,
      search: d = ``,
      hash: p = ``,
      state: m = null,
      key: h = `default`,
    } = r,
    g = f.useMemo(() => {
      let e = nr(u, c);
      return e == null
        ? null
        : {
            location: { pathname: e, search: d, hash: p, state: m, key: h },
            navigationType: i,
          };
    }, [c, u, d, p, m, h, i]);
  return g == null
    ? null
    : f.createElement(
        Mi.Provider,
        { value: l },
        f.createElement(Ni.Provider, { children: n, value: g }),
      );
}
var pa = (function (e) {
  return (
    (e[(e.pending = 0)] = `pending`),
    (e[(e.success = 1)] = `success`),
    (e[(e.error = 2)] = `error`),
    e
  );
})(pa || {});
(new Promise(() => {}), f.Component);
function ma(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: f.createElement(e.Component),
        Component: void 0,
      }),
    e.HydrateFallback &&
      Object.assign(t, {
        hydrateFallbackElement: f.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: f.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
function ha() {
  return (
    (ha = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    ha.apply(null, arguments)
  );
}
function ga(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
function _a(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function va(e, t) {
  return e.button === 0 && (!t || t === `_self`) && !_a(e);
}
var ya = [
    `onClick`,
    `relative`,
    `reloadDocument`,
    `replace`,
    `state`,
    `target`,
    `to`,
    `preventScrollReset`,
    `viewTransition`,
  ],
  ba = [
    `aria-current`,
    `caseSensitive`,
    `className`,
    `end`,
    `style`,
    `to`,
    `viewTransition`,
    `children`,
  ],
  xa = `6`;
try {
  window.__reactRouterVersion = xa;
} catch {}
function Sa(e, t) {
  return Ar({
    basename: t?.basename,
    future: ha({}, t?.future, { v7_prependBasename: !0 }),
    history: En({ window: t?.window }),
    hydrationData: t?.hydrationData || Ca(),
    routes: e,
    mapRouteProperties: ma,
    dataStrategy: t?.dataStrategy,
    patchRoutesOnNavigation: t?.patchRoutesOnNavigation,
    window: t?.window,
  }).initialize();
}
function Ca() {
  let e = window?.__staticRouterHydrationData;
  return (e && e.errors && (e = ha({}, e, { errors: wa(e.errors) })), e);
}
function wa(e) {
  if (!e) return null;
  let t = Object.entries(e),
    n = {};
  for (let [e, r] of t)
    if (r && r.__type === `RouteErrorResponse`)
      n[e] = new gr(r.status, r.statusText, r.data, r.internal === !0);
    else if (r && r.__type === `Error`) {
      if (r.__subType) {
        let t = window[r.__subType];
        if (typeof t == `function`)
          try {
            let i = new t(r.message);
            ((i.stack = ``), (n[e] = i));
          } catch {}
      }
      if (n[e] == null) {
        let t = Error(r.message);
        ((t.stack = ``), (n[e] = t));
      }
    } else n[e] = r;
  return n;
}
var Ta = f.createContext({ isTransitioning: !1 }),
  Ea = f.createContext(new Map()),
  Da = f.startTransition,
  Oa = Wt.flushSync;
function ka(e) {
  Da ? Da(e) : e();
}
function Aa(e) {
  Oa ? Oa(e) : e();
}
var ja = class {
  constructor() {
    ((this.status = `pending`),
      (this.promise = new Promise((e, t) => {
        ((this.resolve = (t) => {
          this.status === `pending` && ((this.status = `resolved`), e(t));
        }),
          (this.reject = (e) => {
            this.status === `pending` && ((this.status = `rejected`), t(e));
          }));
      })));
  }
};
function Ma(e) {
  let { fallbackElement: t, router: n, future: r } = e,
    [i, a] = f.useState(n.state),
    [o, s] = f.useState(),
    [c, l] = f.useState({ isTransitioning: !1 }),
    [u, d] = f.useState(),
    [p, m] = f.useState(),
    [h, g] = f.useState(),
    _ = f.useRef(new Map()),
    { v7_startTransition: v } = r || {},
    y = f.useCallback(
      (e) => {
        v ? ka(e) : e();
      },
      [v],
    ),
    b = f.useCallback(
      (e, t) => {
        let { deletedFetchers: r, flushSync: i, viewTransitionOpts: o } = t;
        (e.fetchers.forEach((e, t) => {
          e.data !== void 0 && _.current.set(t, e.data);
        }),
          r.forEach((e) => _.current.delete(e)));
        let c =
          n.window == null ||
          n.window.document == null ||
          typeof n.window.document.startViewTransition != `function`;
        if (!o || c) {
          i ? Aa(() => a(e)) : y(() => a(e));
          return;
        }
        if (i) {
          Aa(() => {
            (p && (u && u.resolve(), p.skipTransition()),
              l({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: o.currentLocation,
                nextLocation: o.nextLocation,
              }));
          });
          let t = n.window.document.startViewTransition(() => {
            Aa(() => a(e));
          });
          (t.finished.finally(() => {
            Aa(() => {
              (d(void 0), m(void 0), s(void 0), l({ isTransitioning: !1 }));
            });
          }),
            Aa(() => m(t)));
          return;
        }
        p
          ? (u && u.resolve(),
            p.skipTransition(),
            g({
              state: e,
              currentLocation: o.currentLocation,
              nextLocation: o.nextLocation,
            }))
          : (s(e),
            l({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: o.currentLocation,
              nextLocation: o.nextLocation,
            }));
      },
      [n.window, p, u, _, y],
    );
  (f.useLayoutEffect(() => n.subscribe(b), [n, b]),
    f.useEffect(() => {
      c.isTransitioning && !c.flushSync && d(new ja());
    }, [c]),
    f.useEffect(() => {
      if (u && o && n.window) {
        let e = o,
          t = u.promise,
          r = n.window.document.startViewTransition(async () => {
            (y(() => a(e)), await t);
          });
        (r.finished.finally(() => {
          (d(void 0), m(void 0), s(void 0), l({ isTransitioning: !1 }));
        }),
          m(r));
      }
    }, [y, o, u, n.window]),
    f.useEffect(() => {
      u && o && i.location.key === o.location.key && u.resolve();
    }, [u, p, i.location, o]),
    f.useEffect(() => {
      !c.isTransitioning &&
        h &&
        (s(h.state),
        l({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: h.currentLocation,
          nextLocation: h.nextLocation,
        }),
        g(void 0));
    }, [c.isTransitioning, h]),
    f.useEffect(() => {}, []));
  let x = f.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (e) => n.navigate(e),
        push: (e, t, r) =>
          n.navigate(e, {
            state: t,
            preventScrollReset: r?.preventScrollReset,
          }),
        replace: (e, t, r) =>
          n.navigate(e, {
            replace: !0,
            state: t,
            preventScrollReset: r?.preventScrollReset,
          }),
      }),
      [n],
    ),
    S = n.basename || `/`,
    C = f.useMemo(
      () => ({ router: n, navigator: x, static: !1, basename: S }),
      [n, x, S],
    ),
    w = f.useMemo(
      () => ({ v7_relativeSplatPath: n.future.v7_relativeSplatPath }),
      [n.future.v7_relativeSplatPath],
    );
  return (
    f.useEffect(() => la(r, n.future), [r, n.future]),
    f.createElement(
      f.Fragment,
      null,
      f.createElement(
        Ai.Provider,
        { value: C },
        f.createElement(
          ji.Provider,
          { value: i },
          f.createElement(
            Ea.Provider,
            { value: _.current },
            f.createElement(
              Ta.Provider,
              { value: c },
              f.createElement(
                fa,
                {
                  basename: S,
                  location: i.location,
                  navigationType: i.historyAction,
                  navigator: x,
                  future: w,
                },
                i.initialized || n.future.v7_partialHydration
                  ? f.createElement(Na, {
                      routes: n.routes,
                      future: n.future,
                      state: i,
                    })
                  : t,
              ),
            ),
          ),
        ),
      ),
      null,
    )
  );
}
var Na = f.memo(Pa);
function Pa(e) {
  let { routes: t, future: n, state: r } = e;
  return Ki(t, void 0, r, n);
}
var Fa =
    typeof window < `u` &&
    window.document !== void 0 &&
    window.document.createElement !== void 0,
  Ia = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  La = f.forwardRef(function (e, t) {
    let {
        onClick: n,
        relative: r,
        reloadDocument: i,
        replace: a,
        state: o,
        target: s,
        to: c,
        preventScrollReset: l,
        viewTransition: u,
      } = e,
      d = ga(e, ya),
      { basename: p } = f.useContext(Mi),
      m,
      h = !1;
    if (typeof c == `string` && Ia.test(c) && ((m = c), Fa))
      try {
        let e = new URL(window.location.href),
          t = c.startsWith(`//`) ? new URL(e.protocol + c) : new URL(c),
          n = nr(t.pathname, p);
        t.origin === e.origin && n != null
          ? (c = n + t.search + t.hash)
          : (h = !0);
      } catch {}
    let g = Ii(c, { relative: r }),
      _ = Ha(c, {
        replace: a,
        state: o,
        target: s,
        preventScrollReset: l,
        relative: r,
        viewTransition: u,
      });
    function v(e) {
      (n && n(e), e.defaultPrevented || _(e));
    }
    return f.createElement(
      `a`,
      ha({}, d, { href: m || g, onClick: h || i ? n : v, ref: t, target: s }),
    );
  }),
  Ra = f.forwardRef(function (e, t) {
    let {
        "aria-current": n = `page`,
        caseSensitive: r = !1,
        className: i = ``,
        end: a = !1,
        style: o,
        to: s,
        viewTransition: c,
        children: l,
      } = e,
      u = ga(e, ba),
      d = Gi(s, { relative: u.relative }),
      p = Ri(),
      m = f.useContext(ji),
      { navigator: h, basename: g } = f.useContext(Mi),
      _ = m != null && Ua(d) && c === !0,
      v = h.encodeLocation ? h.encodeLocation(d).pathname : d.pathname,
      y = p.pathname,
      b =
        m && m.navigation && m.navigation.location
          ? m.navigation.location.pathname
          : null;
    (r ||
      ((y = y.toLowerCase()),
      (b = b ? b.toLowerCase() : null),
      (v = v.toLowerCase())),
      b && g && (b = nr(b, g) || b));
    let x = v !== `/` && v.endsWith(`/`) ? v.length - 1 : v.length,
      S = y === v || (!a && y.startsWith(v) && y.charAt(x) === `/`),
      C =
        b != null &&
        (b === v || (!a && b.startsWith(v) && b.charAt(v.length) === `/`)),
      w = { isActive: S, isPending: C, isTransitioning: _ },
      T = S ? n : void 0,
      E;
    E =
      typeof i == `function`
        ? i(w)
        : [
            i,
            S ? `active` : null,
            C ? `pending` : null,
            _ ? `transitioning` : null,
          ]
            .filter(Boolean)
            .join(` `);
    let D = typeof o == `function` ? o(w) : o;
    return f.createElement(
      La,
      ha({}, u, {
        "aria-current": T,
        className: E,
        ref: t,
        style: D,
        to: s,
        viewTransition: c,
      }),
      typeof l == `function` ? l(w) : l,
    );
  }),
  za;
(function (e) {
  ((e.UseScrollRestoration = `useScrollRestoration`),
    (e.UseSubmit = `useSubmit`),
    (e.UseSubmitFetcher = `useSubmitFetcher`),
    (e.UseFetcher = `useFetcher`),
    (e.useViewTransitionState = `useViewTransitionState`));
})((za ||= {}));
var Ba;
(function (e) {
  ((e.UseFetcher = `useFetcher`),
    (e.UseFetchers = `useFetchers`),
    (e.UseScrollRestoration = `useScrollRestoration`));
})((Ba ||= {}));
function Va(e) {
  let t = f.useContext(Ai);
  return (!t && W(!1), t);
}
function Ha(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: a,
      relative: o,
      viewTransition: s,
    } = t === void 0 ? {} : t,
    c = Bi(),
    l = Ri(),
    u = Gi(e, { relative: o });
  return f.useCallback(
    (t) => {
      if (va(t, n)) {
        t.preventDefault();
        let n = r === void 0 ? jn(l) === jn(u) : r;
        c(e, {
          replace: n,
          state: i,
          preventScrollReset: a,
          relative: o,
          viewTransition: s,
        });
      }
    },
    [l, c, u, r, i, n, e, a, o, s],
  );
}
function Ua(e, t) {
  t === void 0 && (t = {});
  let n = f.useContext(Ta);
  n ?? W(!1);
  let { basename: r } = Va(za.useViewTransitionState),
    i = Gi(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let a = nr(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = nr(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return $n(i.pathname, o) != null || $n(i.pathname, a) != null;
}
var Wa = o((e) => {
    var t = d(),
      n = Symbol.for(`react.element`),
      r = Symbol.for(`react.fragment`),
      i = Object.prototype.hasOwnProperty,
      a =
        t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      o = { key: !0, ref: !0, __self: !0, __source: !0 };
    function s(e, t, r) {
      var s,
        c = {},
        l = null,
        u = null;
      for (s in (r !== void 0 && (l = `` + r),
      t.key !== void 0 && (l = `` + t.key),
      t.ref !== void 0 && (u = t.ref),
      t))
        i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
      if (e && e.defaultProps)
        for (s in ((t = e.defaultProps), t)) c[s] === void 0 && (c[s] = t[s]);
      return {
        $$typeof: n,
        type: e,
        key: l,
        ref: u,
        props: c,
        _owner: a.current,
      };
    }
    ((e.Fragment = r), (e.jsx = s), (e.jsxs = s));
  }),
  q = o((e, t) => {
    t.exports = Wa();
  })(),
  Ga = ({ title: e = `Nothing here yet`, description: t }) =>
    (0, q.jsxs)(`div`, {
      className: `empty-state`,
      role: `status`,
      children: [
        (0, q.jsx)(`h2`, { children: e }),
        t && (0, q.jsx)(`p`, { children: t }),
      ],
    }),
  Ka = ({ subject: e }) =>
    (0, q.jsxs)(La, {
      to: `quiz/${e._id}`,
      className: `subject-card`,
      children: [
        (0, q.jsxs)(`div`, {
          className: `subject-card-header`,
          children: [
            (0, q.jsx)(`h2`, { children: e._id }),
            (0, q.jsx)(`span`, { children: `Subject` }),
          ],
        }),
        (0, q.jsx)(`hr`, {}),
        (0, q.jsx)(`p`, { children: `View quizzes for this subject` }),
      ],
    }),
  qa = o((e, t) => {
    t.exports = `SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED`;
  }),
  Ja = o((e, t) => {
    var n = qa();
    function r() {}
    function i() {}
    ((i.resetWarningCache = r),
      (t.exports = function () {
        function e(e, t, r, i, a, o) {
          if (o !== n) {
            var s = Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types",
            );
            throw ((s.name = `Invariant Violation`), s);
          }
        }
        e.isRequired = e;
        function t() {
          return e;
        }
        var a = {
          array: e,
          bigint: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: i,
          resetWarningCache: r,
        };
        return ((a.PropTypes = a), a);
      }));
  }),
  Ya = l(
    o((e, t) => {
      t.exports = Ja()();
    })(),
  ),
  Xa = [`color`, `size`, `title`, `className`];
function Za() {
  return (
    (Za = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Za.apply(null, arguments)
  );
}
function Qa(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = $a(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      ((n = a[r]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (i[n] = e[n]));
  }
  return i;
}
function $a(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var eo = (0, f.forwardRef)(function (e, t) {
  var n = e.color,
    r = n === void 0 ? `currentColor` : n,
    i = e.size,
    a = i === void 0 ? `1em` : i,
    o = e.title,
    s = o === void 0 ? null : o,
    c = e.className,
    l = c === void 0 ? `` : c,
    u = Qa(e, Xa);
  return f.createElement(
    `svg`,
    Za(
      {
        ref: t,
        xmlns: `http://www.w3.org/2000/svg`,
        viewBox: `0 0 16 16`,
        width: a,
        height: a,
        fill: r,
        className: [`bi`, `bi-check-circle`, l].filter(Boolean).join(` `),
      },
      u,
    ),
    s ? f.createElement(`title`, null, s) : null,
    f.createElement(`path`, {
      d: `M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16`,
    }),
    f.createElement(`path`, {
      d: `m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05`,
    }),
  );
});
eo.propTypes = {
  color: Ya.default.string,
  size: Ya.default.oneOfType([Ya.default.string, Ya.default.number]),
  title: Ya.default.string,
  className: Ya.default.string,
};
var to = [`color`, `size`, `title`, `className`];
function no() {
  return (
    (no = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    no.apply(null, arguments)
  );
}
function ro(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = io(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      ((n = a[r]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (i[n] = e[n]));
  }
  return i;
}
function io(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var ao = (0, f.forwardRef)(function (e, t) {
  var n = e.color,
    r = n === void 0 ? `currentColor` : n,
    i = e.size,
    a = i === void 0 ? `1em` : i,
    o = e.title,
    s = o === void 0 ? null : o,
    c = e.className,
    l = c === void 0 ? `` : c,
    u = ro(e, to);
  return f.createElement(
    `svg`,
    no(
      {
        ref: t,
        xmlns: `http://www.w3.org/2000/svg`,
        viewBox: `0 0 16 16`,
        width: a,
        height: a,
        fill: r,
        className: [`bi`, `bi-search`, l].filter(Boolean).join(` `),
      },
      u,
    ),
    s ? f.createElement(`title`, null, s) : null,
    f.createElement(`path`, {
      d: `M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0`,
    }),
  );
});
ao.propTypes = {
  color: Ya.default.string,
  size: Ya.default.oneOfType([Ya.default.string, Ya.default.number]),
  title: Ya.default.string,
  className: Ya.default.string,
};
var oo = [`color`, `size`, `title`, `className`];
function so() {
  return (
    (so = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    so.apply(null, arguments)
  );
}
function co(e, t) {
  if (e == null) return {};
  var n,
    r,
    i = lo(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++)
      ((n = a[r]),
        t.indexOf(n) === -1 &&
          {}.propertyIsEnumerable.call(e, n) &&
          (i[n] = e[n]));
  }
  return i;
}
function lo(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
var uo = (0, f.forwardRef)(function (e, t) {
  var n = e.color,
    r = n === void 0 ? `currentColor` : n,
    i = e.size,
    a = i === void 0 ? `1em` : i,
    o = e.title,
    s = o === void 0 ? null : o,
    c = e.className,
    l = c === void 0 ? `` : c,
    u = co(e, oo);
  return f.createElement(
    `svg`,
    so(
      {
        ref: t,
        xmlns: `http://www.w3.org/2000/svg`,
        viewBox: `0 0 16 16`,
        width: a,
        height: a,
        fill: r,
        className: [`bi`, `bi-x-circle`, l].filter(Boolean).join(` `),
      },
      u,
    ),
    s ? f.createElement(`title`, null, s) : null,
    f.createElement(`path`, {
      d: `M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16`,
    }),
    f.createElement(`path`, {
      d: `M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708`,
    }),
  );
});
uo.propTypes = {
  color: Ya.default.string,
  size: Ya.default.oneOfType([Ya.default.string, Ya.default.number]),
  title: Ya.default.string,
  className: Ya.default.string,
};
var fo = ({ value: e, onChange: t, placeholder: n = `Search...` }) =>
    (0, q.jsxs)(`div`, {
      className: `search-input`,
      children: [
        (0, q.jsx)(ao, { "aria-hidden": `true` }),
        (0, q.jsx)(`input`, {
          type: `search`,
          name: `search`,
          placeholder: n,
          value: e,
          onChange: t,
          "aria-label": `Search subjects`,
        }),
      ],
    }),
  po = (e, t = 600) => {
    let [n, r] = (0, f.useState)(e);
    return (
      (0, f.useEffect)(() => {
        let n = setTimeout(() => {
          r(e);
        }, t);
        return () => {
          clearTimeout(n);
        };
      }, [e, t]),
      n
    );
  },
  mo = {},
  ho = (e, t, n, r = mo) => {
    let [i, a] = (0, f.useState)(!0),
      [o, s] = (0, f.useState)(0);
    return (
      (0, f.useEffect)(() => {
        (async () => {
          a(!0);
          let i = await n({ ...r, searchVal: t, skipCount: o });
          (e((e) => (o === 0 ? i : [...e, ...i])), a(!1));
        })();
      }, [n, t, o, e, r]),
      { isLoading: i, setSkipCount: s }
    );
  };
function go(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
var { toString: _o } = Object.prototype,
  { getPrototypeOf: vo } = Object,
  { iterator: yo, toStringTag: bo } = Symbol,
  xo = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  So = (e, t) => {
    let n = e,
      r = [];
    for (; n != null && n !== Object.prototype;) {
      if (r.indexOf(n) !== -1) return !1;
      if ((r.push(n), xo(n, t))) return !0;
      n = vo(n);
    }
    return !1;
  },
  Co = (e, t) => (e != null && So(e, t) ? e[t] : void 0),
  wo = ((e) => (t) => {
    let n = _o.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  J = (e) => ((e = e.toLowerCase()), (t) => wo(t) === e),
  To = (e) => (t) => typeof t === e,
  { isArray: Eo } = Array,
  Do = To(`undefined`);
function Oo(e) {
  return (
    e !== null &&
    !Do(e) &&
    e.constructor !== null &&
    !Do(e.constructor) &&
    Mo(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
var ko = J(`ArrayBuffer`);
function Ao(e) {
  let t;
  return (
    (t =
      typeof ArrayBuffer < `u` && ArrayBuffer.isView
        ? ArrayBuffer.isView(e)
        : e && e.buffer && ko(e.buffer)),
    t
  );
}
var jo = To(`string`),
  Mo = To(`function`),
  No = To(`number`),
  Po = (e) => typeof e == `object` && !!e,
  Fo = (e) => e === !0 || e === !1,
  Io = (e) => {
    if (!Po(e)) return !1;
    let t = vo(e);
    return (
      (t === null || t === Object.prototype || vo(t) === null) &&
      !So(e, bo) &&
      !So(e, yo)
    );
  },
  Lo = (e) => {
    if (!Po(e) || Oo(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Ro = J(`Date`),
  zo = J(`File`),
  Bo = (e) => !!(e && e.uri !== void 0),
  Vo = (e) => e && e.getParts !== void 0,
  Ho = J(`Blob`),
  Uo = J(`FileList`),
  Wo = J(`Set`),
  Go = (e) => Po(e) && Mo(e.pipe);
function Ko() {
  return typeof globalThis < `u`
    ? globalThis
    : typeof self < `u`
      ? self
      : typeof window < `u`
        ? window
        : typeof global < `u`
          ? global
          : {};
}
var qo = Ko(),
  Jo = qo.FormData === void 0 ? void 0 : qo.FormData,
  Yo = (e) => {
    if (!e) return !1;
    if (Jo && e instanceof Jo) return !0;
    let t = vo(e);
    if (!t || t === Object.prototype || !Mo(e.append)) return !1;
    let n = wo(e);
    return (
      n === `formdata` ||
      (n === `object` && Mo(e.toString) && e.toString() === `[object FormData]`)
    );
  },
  Xo = J(`URLSearchParams`),
  [Zo, Qo, $o, es] = [`ReadableStream`, `Request`, `Response`, `Headers`].map(
    J,
  ),
  ts = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ``);
function ns(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e == null) return;
  let r, i;
  if ((typeof e != `object` && (e = [e]), Eo(e)))
    for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    if (Oo(e)) return;
    let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      a = i.length,
      o;
    for (r = 0; r < a; r++) ((o = i[r]), t.call(null, e[o], o, e));
  }
}
function rs(e, t) {
  if (Oo(e)) return null;
  t = t.toLowerCase();
  let n = Object.keys(e),
    r = n.length,
    i;
  for (; r-- > 0;) if (((i = n[r]), t === i.toLowerCase())) return i;
  return null;
}
var is =
    typeof globalThis < `u`
      ? globalThis
      : typeof self < `u`
        ? self
        : typeof window < `u`
          ? window
          : global,
  as = (e) => !Do(e) && e !== is;
function os(...e) {
  let { caseless: t, skipUndefined: n } = (as(this) && this) || {},
    r = {},
    i = (e, i) => {
      if (i === `__proto__` || i === `constructor` || i === `prototype`) return;
      let a = (t && typeof i == `string` && rs(r, i)) || i,
        o = xo(r, a) ? r[a] : void 0;
      Io(o) && Io(e)
        ? (r[a] = os(o, e))
        : Io(e)
          ? (r[a] = os({}, e))
          : Eo(e)
            ? (r[a] = e.slice())
            : (!n || !Do(e)) && (r[a] = e);
    };
  for (let t = 0, n = e.length; t < n; t++) {
    let n = e[t];
    if (!n || Oo(n) || (ns(n, i), typeof n != `object` || Eo(n))) continue;
    let r = Object.getOwnPropertySymbols(n);
    for (let e = 0; e < r.length; e++) {
      let t = r[e];
      vs.call(n, t) && i(n[t], t);
    }
  }
  return r;
}
var ss = (e, t, n, { allOwnKeys: r } = {}) => (
    ns(
      t,
      (t, r) => {
        n && Mo(t)
          ? Object.defineProperty(e, r, {
              __proto__: null,
              value: go(t, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, r, {
              __proto__: null,
              value: t,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: r },
    ),
    e
  ),
  cs = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  ls = (e, t, n, r) => {
    ((e.prototype = Object.create(t.prototype, r)),
      Object.defineProperty(e.prototype, "constructor", {
        __proto__: null,
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", {
        __proto__: null,
        value: t.prototype,
      }),
      n && Object.assign(e.prototype, n));
  },
  us = (e, t, n, r) => {
    let i,
      a,
      o,
      s = {};
    if (((t ||= {}), e == null)) return t;
    do {
      for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0;)
        ((o = i[a]),
          (!r || r(o, e, t)) && !s[o] && ((t[o] = e[o]), (s[o] = !0)));
      e = n !== !1 && vo(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  ds = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    let r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  fs = (e) => {
    if (!e) return null;
    if (Eo(e)) return e;
    let t = e.length;
    if (!No(t)) return null;
    let n = Array(t);
    for (; t-- > 0;) n[t] = e[t];
    return n;
  },
  ps = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < `u` && vo(Uint8Array)),
  ms = (e, t) => {
    let n = (e && e[yo]).call(e),
      r;
    for (; (r = n.next()) && !r.done;) {
      let n = r.value;
      t.call(e, n[0], n[1]);
    }
  },
  hs = (e, t) => {
    let n,
      r = [];
    for (; (n = e.exec(t)) !== null;) r.push(n);
    return r;
  },
  gs = J(`HTMLFormElement`),
  _s = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
      return t.toUpperCase() + n;
    }),
  { propertyIsEnumerable: vs } = Object.prototype,
  ys = J(`RegExp`),
  bs = (e, t) => {
    let n = Object.getOwnPropertyDescriptors(e),
      r = {};
    (ns(n, (n, i) => {
      let a;
      (a = t(n, i, e)) !== !1 && (r[i] = a || n);
    }),
      Object.defineProperties(e, r));
  },
  xs = (e) => {
    bs(e, (t, n) => {
      if (Mo(e) && [`arguments`, `caller`, `callee`].includes(n)) return !1;
      let r = e[n];
      if (Mo(r)) {
        if (((t.enumerable = !1), `writable` in t)) {
          t.writable = !1;
          return;
        }
        t.set ||= () => {
          throw Error(`Can not rewrite read-only method '` + n + `'`);
        };
      }
    });
  },
  Ss = (e, t) => {
    let n = {},
      r = (e) => {
        e.forEach((e) => {
          n[e] = !0;
        });
      };
    return (Eo(e) ? r(e) : r(String(e).split(t)), n);
  },
  Cs = () => {},
  ws = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Ts(e) {
  return !!(e && Mo(e.append) && e[bo] === `FormData` && e[yo]);
}
var Es = (e) => {
    let t = new WeakSet(),
      n = (e) => {
        if (Po(e)) {
          if (t.has(e)) return;
          if (Oo(e)) return e;
          if (!(`toJSON` in e)) {
            t.add(e);
            let r;
            if (Wo(e)) {
              r = [];
              for (let t of e) {
                let e = n(t);
                !Do(e) && r.push(e);
              }
            } else
              ((r = Eo(e) ? [] : {}),
                ns(e, (e, t) => {
                  let i = n(e);
                  !Do(i) && (r[t] = i);
                }));
            return (t.delete(e), r);
          }
        }
        return e;
      };
    return n(e);
  },
  Ds = J(`AsyncFunction`),
  Os = (e) => e && (Po(e) || Mo(e)) && Mo(e.then) && Mo(e.catch),
  ks = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((e, t) => (
            is.addEventListener(
              `message`,
              ({ source: n, data: r }) => {
                n === is && r === e && t.length && t.shift()();
              },
              !1,
            ),
            (n) => {
              (t.push(n), is.postMessage(e, `*`));
            }
          ))(`axios@${Math.random()}`, [])
        : (e) => setTimeout(e))(
    typeof setImmediate == `function`,
    Mo(is.postMessage),
  ),
  As =
    typeof queueMicrotask < `u`
      ? queueMicrotask.bind(is)
      : (typeof process < `u` && process.nextTick) || ks,
  js = (e) => e != null && Mo(e[yo]),
  Y = {
    isArray: Eo,
    isArrayBuffer: ko,
    isBuffer: Oo,
    isFormData: Yo,
    isArrayBufferView: Ao,
    isString: jo,
    isNumber: No,
    isBoolean: Fo,
    isObject: Po,
    isPlainObject: Io,
    isEmptyObject: Lo,
    isReadableStream: Zo,
    isRequest: Qo,
    isResponse: $o,
    isHeaders: es,
    isUndefined: Do,
    isDate: Ro,
    isFile: zo,
    isReactNativeBlob: Bo,
    isReactNative: Vo,
    isBlob: Ho,
    isRegExp: ys,
    isFunction: Mo,
    isStream: Go,
    isURLSearchParams: Xo,
    isTypedArray: ps,
    isFileList: Uo,
    forEach: ns,
    merge: os,
    extend: ss,
    trim: ts,
    stripBOM: cs,
    inherits: ls,
    toFlatObject: us,
    kindOf: wo,
    kindOfTest: J,
    endsWith: ds,
    toArray: fs,
    forEachEntry: ms,
    matchAll: hs,
    isHTMLForm: gs,
    hasOwnProperty: xo,
    hasOwnProp: xo,
    hasOwnInPrototypeChain: So,
    getSafeProp: Co,
    reduceDescriptors: bs,
    freezeMethods: xs,
    toObjectSet: Ss,
    toCamelCase: _s,
    noop: Cs,
    toFiniteNumber: ws,
    findKey: rs,
    global: is,
    isContextDefined: as,
    isSpecCompliantForm: Ts,
    toJSONObject: Es,
    isAsyncFn: Ds,
    isThenable: Os,
    setImmediate: ks,
    asap: As,
    isIterable: js,
    isSafeIterable: (e) => e != null && So(e, yo) && js(e),
  },
  Ms = Y.toObjectSet([
    `age`,
    `authorization`,
    `content-length`,
    `content-type`,
    `etag`,
    `expires`,
    `from`,
    `host`,
    `if-modified-since`,
    `if-unmodified-since`,
    `last-modified`,
    `location`,
    `max-forwards`,
    `proxy-authorization`,
    `referer`,
    `retry-after`,
    `user-agent`,
  ]),
  Ns = (e) => {
    let t = {},
      n,
      r,
      i;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (e) {
            ((i = e.indexOf(`:`)),
              (n = e.substring(0, i).trim().toLowerCase()),
              (r = e.substring(i + 1).trim()));
            let a = Y.hasOwnProp(t, n);
            !n ||
              (a && Y.hasOwnProp(Ms, n)) ||
              (n === `set-cookie`
                ? a
                  ? t[n].push(r)
                  : (t[n] = [r])
                : (t[n] = a ? t[n] + `, ` + r : r));
          }),
      t
    );
  };
function Ps(e) {
  let t = 0,
    n = e.length;
  for (; t < n;) {
    let n = e.charCodeAt(t);
    if (n !== 9 && n !== 32) break;
    t += 1;
  }
  for (; n > t;) {
    let t = e.charCodeAt(n - 1);
    if (t !== 9 && t !== 32) break;
    --n;
  }
  return t === 0 && n === e.length ? e : e.slice(t, n);
}
var Fs = RegExp(`[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+`, `g`),
  Is = RegExp(`[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+`, `g`);
function Ls(e, t) {
  return Y.isArray(e) ? e.map((e) => Ls(e, t)) : Ps(String(e).replace(t, ``));
}
var Rs = (e) => Ls(e, Fs),
  zs = (e) => Ls(e, Is);
function Bs(e) {
  let t = Object.create(null);
  return (
    Y.forEach(e.toJSON(), (e, n) => {
      t[n] = zs(e);
    }),
    t
  );
}
var Vs = Symbol(`internals`);
function Hs(e) {
  return e && String(e).trim().toLowerCase();
}
function Us(e) {
  return e === !1 || e == null ? e : Y.isArray(e) ? e.map(Us) : Rs(String(e));
}
function Ws(e) {
  let t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,
    r;
  for (; (r = n.exec(e));) t[r[1]] = r[2];
  return t;
}
var Gs = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Ks(e) {
  let t = 0,
    n = e.length;
  for (; t < n;) {
    let n = e.charCodeAt(t);
    if (n !== 9 && n !== 32) break;
    t += 1;
  }
  for (; n > t;) {
    let t = e.charCodeAt(n - 1);
    if (t !== 9 && t !== 32) break;
    --n;
  }
  return t === 0 && n === e.length ? e : e.slice(t, n);
}
function qs(e) {
  let t = e.length - 1;
  if (t < 1 || e.charCodeAt(0) !== 34 || e.charCodeAt(t) !== 34) return e;
  let n = ``;
  for (let r = 1; r < t; r++) {
    let i = e.charCodeAt(r);
    if (i === 34 || (i === 92 && ((r += 1), r >= t))) return e;
    n += e[r];
  }
  return n;
}
function Js(e) {
  let t = Object.create(null),
    n = String(e),
    r = 0,
    i = !1,
    a = !1;
  function o(e) {
    let i = Ks(n.slice(r, e)),
      a = i.indexOf(`=`);
    if (a < 1) return;
    let o = Ks(i.slice(0, a));
    if (!Gs.test(o)) return;
    let s = o.toLowerCase();
    if (s === `__proto__` || s === `constructor` || s === `prototype`) return;
    let c = Ks(i.slice(a + 1));
    t[s] = qs(c);
  }
  for (let e = 0; e < n.length; e++) {
    let t = n.charCodeAt(e);
    i
      ? a
        ? (a = !1)
        : t === 92
          ? (a = !0)
          : t === 34 && (i = !1)
      : t === 34
        ? (i = !0)
        : (t === 44 || t === 59) && (o(e), (r = e + 1));
  }
  return (o(n.length), t);
}
var Ys = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Xs(e, t, n, r, i) {
  if (Y.isFunction(r)) return r.call(this, t, n);
  if ((i && (t = n), Y.isString(t))) {
    if (Y.isString(r)) return t.indexOf(r) !== -1;
    if (Y.isRegExp(r)) return r.test(t);
  }
}
function Zs(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function Qs(e, t) {
  let n = Y.toCamelCase(` ` + t);
  [`get`, `set`, `has`].forEach((r) => {
    Object.defineProperty(e, r + n, {
      __proto__: null,
      value: function (e, n, i) {
        return this[r].call(this, t, e, n, i);
      },
      configurable: !0,
    });
  });
}
var $s = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    let r = this;
    function i(e, t, n) {
      let i = Hs(t);
      if (!i) return;
      let a = Y.findKey(r, i);
      (!a || r[a] === void 0 || n === !0 || (n === void 0 && r[a] !== !1)) &&
        (r[a || t] = Us(e));
    }
    let a = (e, t) => Y.forEach(e, (e, n) => i(e, n, t));
    if (Y.isPlainObject(e) || e instanceof this.constructor) a(e, t);
    else if (Y.isString(e) && (e = e.trim()) && !Ys(e)) a(Ns(e), t);
    else if (Y.isObject(e) && Y.isSafeIterable(e)) {
      let n = Object.create(null),
        r,
        i;
      for (let t of e) {
        if (!Y.isArray(t))
          throw TypeError(`Object iterator must return a key-value pair`);
        ((i = t[0]),
          Y.hasOwnProp(n, i)
            ? ((r = n[i]), (n[i] = Y.isArray(r) ? [...r, t[1]] : [r, t[1]]))
            : (n[i] = t[1]));
      }
      a(n, t);
    } else e != null && i(t, e, n);
    return this;
  }
  get(e, t) {
    if (((e = Hs(e)), e)) {
      let n = Y.findKey(this, e);
      if (n) {
        let e = this[n];
        if (!t) return e;
        if (t === !0) return Ws(e);
        if (Y.isFunction(t)) return t.call(this, e, n);
        if (Y.isRegExp(t)) return t.exec(e);
        throw TypeError(`parser must be boolean|regexp|function`);
      }
    }
  }
  has(e, t) {
    if (((e = Hs(e)), e)) {
      let n = Y.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || Xs(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    let n = this,
      r = !1;
    function i(e) {
      if (((e = Hs(e)), e)) {
        let i = Y.findKey(n, e);
        i && (!t || Xs(n, n[i], i, t)) && (delete n[i], (r = !0));
      }
    }
    return (Y.isArray(e) ? e.forEach(i) : i(e), r);
  }
  clear(e) {
    let t = Object.keys(this),
      n = t.length,
      r = !1;
    for (; n--;) {
      let i = t[n];
      (!e || Xs(this, this[i], i, e, !0)) && (delete this[i], (r = !0));
    }
    return r;
  }
  normalize(e) {
    let t = this,
      n = {};
    return (
      Y.forEach(this, (r, i) => {
        let a = Y.findKey(n, i);
        if (a) {
          ((t[a] = Us(r)), delete t[i]);
          return;
        }
        let o = e ? Zs(i) : String(i).trim();
        (o !== i && delete t[i], (t[o] = Us(r)), (n[o] = !0));
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    let t = Object.create(null);
    return (
      Y.forEach(this, (n, r) => {
        n != null && n !== !1 && (t[r] = e && Y.isArray(n) ? n.join(`, `) : n);
      }),
      t
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + `: ` + t).join(`
`);
  }
  getSetCookie() {
    let e = this.get(`set-cookie`);
    return Y.isArray(e) ? e : e == null || e === !1 ? [] : [e];
  }
  get [Symbol.toStringTag]() {
    return `AxiosHeaders`;
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static parseParameters(e) {
    return Js(e);
  }
  static concat(e, ...t) {
    let n = new this(e);
    return (t.forEach((e) => n.set(e)), n);
  }
  static accessor(e) {
    let t = (this[Vs] = this[Vs] = { accessors: {} }).accessors,
      n = this.prototype;
    function r(e) {
      let r = Hs(e);
      t[r] || (Qs(n, e), (t[r] = !0));
    }
    return (Y.isArray(e) ? e.forEach(r) : r(e), this);
  }
};
($s.accessor([
  `Content-Type`,
  `Content-Length`,
  `Accept`,
  `Accept-Encoding`,
  `User-Agent`,
  `Authorization`,
]),
  Y.reduceDescriptors($s.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
      get: () => e,
      set(e) {
        this[n] = e;
      },
    };
  }),
  Y.freezeMethods($s));
var ec = `[REDACTED ****]`;
function tc(e) {
  if (Y.hasOwnProp(e, `toJSON`)) return !0;
  let t = Object.getPrototypeOf(e);
  for (; t && t !== Object.prototype;) {
    if (Y.hasOwnProp(t, `toJSON`)) return !0;
    t = Object.getPrototypeOf(t);
  }
  return !1;
}
function nc(e, t) {
  let n = new Set(t.map((e) => String(e).toLowerCase())),
    r = [],
    i = (e) => {
      if (typeof e != `object` || !e || Y.isBuffer(e)) return e;
      if (r.indexOf(e) !== -1) return;
      (e instanceof $s && (e = e.toJSON()), r.push(e));
      let t;
      if (Y.isArray(e))
        ((t = []),
          e.forEach((e, n) => {
            let r = i(e);
            Y.isUndefined(r) || (t[n] = r);
          }));
      else {
        if (!Y.isPlainObject(e) && tc(e)) return (r.pop(), e);
        t = Object.create(null);
        for (let [r, a] of Object.entries(e)) {
          let e = n.has(r.toLowerCase()) ? ec : i(a);
          Y.isUndefined(e) || (t[r] = e);
        }
      }
      return (r.pop(), t);
    };
  return i(e);
}
function rc(e) {
  try {
    return String(e);
  } catch {
    return ``;
  }
}
function ic(e) {
  return (
    e.errors
      .map((e) => {
        try {
          return e && e.message ? rc(e.message) : rc(e);
        } catch {
          return ``;
        }
      })
      .filter(Boolean)
      .join(`; `) ||
    e.name ||
    `AggregateError`
  );
}
var X = class e extends Error {
  static from(t, n, r, i, a, o) {
    let s = t.message;
    !s && Y.isArray(t.errors) && t.errors.length && (s = ic(t));
    let c = new e(s, n || t.code, r, i, a);
    return (
      Object.defineProperty(c, "cause", {
        __proto__: null,
        value: t,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      (c.name = t.name),
      t.status != null && c.status == null && (c.status = t.status),
      o && Object.assign(c, o),
      c
    );
  }
  constructor(e, t, n, r, i) {
    (super(e),
      Object.defineProperty(this, "message", {
        __proto__: null,
        value: e,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = `AxiosError`),
      (this.isAxiosError = !0),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      i && ((this.response = i), (this.status = i.status)));
  }
  toJSON() {
    let e = this.config,
      t = e && Y.hasOwnProp(e, `redact`) ? e.redact : void 0,
      n = Y.isArray(t) && t.length > 0 ? nc(e, t) : Y.toJSONObject(e);
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: n,
      code: this.code,
      status: this.status,
    };
  }
};
((X.ERR_BAD_OPTION_VALUE = `ERR_BAD_OPTION_VALUE`),
  (X.ERR_BAD_OPTION = `ERR_BAD_OPTION`),
  (X.ECONNABORTED = `ECONNABORTED`),
  (X.ETIMEDOUT = `ETIMEDOUT`),
  (X.ECONNREFUSED = `ECONNREFUSED`),
  (X.ERR_NETWORK = `ERR_NETWORK`),
  (X.ERR_FR_TOO_MANY_REDIRECTS = `ERR_FR_TOO_MANY_REDIRECTS`),
  (X.ERR_DEPRECATED = `ERR_DEPRECATED`),
  (X.ERR_BAD_RESPONSE = `ERR_BAD_RESPONSE`),
  (X.ERR_BAD_REQUEST = `ERR_BAD_REQUEST`),
  (X.ERR_CANCELED = `ERR_CANCELED`),
  (X.ERR_NOT_SUPPORT = `ERR_NOT_SUPPORT`),
  (X.ERR_INVALID_URL = `ERR_INVALID_URL`),
  (X.ERR_FORM_DATA_DEPTH_EXCEEDED = `ERR_FORM_DATA_DEPTH_EXCEEDED`));
function ac(e) {
  return Y.isPlainObject(e) || Y.isArray(e);
}
function oc(e) {
  return Y.endsWith(e, `[]`) ? e.slice(0, -2) : e;
}
function sc(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (e, t) {
          return ((e = oc(e)), !n && t ? `[` + e + `]` : e);
        })
        .join(n ? `.` : ``)
    : t;
}
function cc(e) {
  return Y.isArray(e) && !e.some(ac);
}
var lc = Y.toFlatObject(Y, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function uc(e, t, n) {
  if (!Y.isObject(e)) throw TypeError(`target must be an object`);
  ((t ||= new FormData()),
    (n = Y.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (e, t) {
        return !Y.isUndefined(t[e]);
      },
    )));
  let r = n.metaTokens,
    i = n.visitor || m,
    a = n.dots,
    o = n.indexes,
    s = n.Blob || (typeof Blob < `u` && Blob),
    c = n.maxDepth === void 0 ? 100 : n.maxDepth,
    l = s && Y.isSpecCompliantForm(t),
    u = [];
  if (!Y.isFunction(i)) throw TypeError(`visitor must be a function`);
  function d(e) {
    if (e === null) return ``;
    if (Y.isDate(e)) return e.toISOString();
    if (Y.isBoolean(e)) return e.toString();
    if (!l && Y.isBlob(e))
      throw new X(`Blob is not supported. Use a Buffer instead.`);
    if (Y.isArrayBuffer(e) || Y.isTypedArray(e)) {
      if (l && typeof s == `function`) return new s([e]);
      throw new X(
        `Blob is not supported. Use a Buffer instead.`,
        X.ERR_NOT_SUPPORT,
      );
    }
    return e;
  }
  function f(e) {
    if (e > c)
      throw new X(
        `Object is too deeply nested (` + e + ` levels). Max depth: ` + c,
        X.ERR_FORM_DATA_DEPTH_EXCEEDED,
      );
  }
  function p(e, t) {
    if (c === 1 / 0) return JSON.stringify(e);
    let n = [];
    return JSON.stringify(e, function (e, r) {
      if (!Y.isObject(r)) return r;
      for (; n.length && n[n.length - 1] !== this;) n.pop();
      return (n.push(r), f(t + n.length - 1), r);
    });
  }
  function m(e, n, i) {
    let s = e;
    if (Y.isReactNative(t) && Y.isReactNativeBlob(e))
      return (t.append(sc(i, n, a), d(e)), !1);
    if (e && !i && typeof e == `object`) {
      if (Y.endsWith(n, `{}`)) ((n = r ? n : n.slice(0, -2)), (e = p(e, 1)));
      else if (
        (Y.isArray(e) && cc(e)) ||
        ((Y.isFileList(e) || Y.endsWith(n, `[]`)) && (s = Y.toArray(e)))
      )
        return (
          (n = oc(n)),
          s.forEach(function (e, r) {
            !(Y.isUndefined(e) || e === null) &&
              t.append(
                o === !0 ? sc([n], r, a) : o === null ? n : n + `[]`,
                d(e),
              );
          }),
          !1
        );
    }
    return ac(e) ? !0 : (t.append(sc(i, n, a), d(e)), !1);
  }
  let h = Object.assign(lc, {
    defaultVisitor: m,
    convertValue: d,
    isVisitable: ac,
  });
  function g(e, n, r = 0) {
    if (!Y.isUndefined(e)) {
      if ((f(r), u.indexOf(e) !== -1))
        throw Error(`Circular reference detected in ` + n.join(`.`));
      (u.push(e),
        Y.forEach(e, function (e, a) {
          (!(Y.isUndefined(e) || e === null) &&
            i.call(t, e, Y.isString(a) ? a.trim() : a, n, h)) === !0 &&
            g(e, n ? n.concat(a) : [a], r + 1);
        }),
        u.pop());
    }
  }
  if (!Y.isObject(e)) throw TypeError(`data must be an object`);
  return (g(e), t);
}
function dc(e) {
  let t = {
    "!": `%21`,
    "'": `%27`,
    "(": `%28`,
    ")": `%29`,
    "~": `%7E`,
    "%20": `+`,
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20/g, function (e) {
    return t[e];
  });
}
function fc(e, t) {
  ((this._pairs = []), e && uc(e, this, t));
}
var Z = fc.prototype;
((Z.append = function (e, t) {
  this._pairs.push([e, t]);
}),
  (Z.toString = function (e) {
    let t = e ? (t) => e.call(this, t, dc) : dc;
    return this._pairs
      .map(function (e) {
        return t(e[0]) + `=` + t(e[1]);
      }, ``)
      .join(`&`);
  }));
function pc(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, `:`)
    .replace(/%24/g, `$`)
    .replace(/%2C/gi, `,`)
    .replace(/%20/g, `+`);
}
function mc(e, t, n) {
  if (!t) return e;
  e ||= ``;
  let r = Y.isFunction(n) ? { serialize: n } : n,
    i = Y.getSafeProp(r, `encode`) || pc,
    a = Y.getSafeProp(r, `serialize`),
    o;
  if (
    ((o = a
      ? a(t, r)
      : Y.isURLSearchParams(t)
        ? t.toString()
        : new fc(t, r).toString(i)),
    o)
  ) {
    let t = e.indexOf(`#`);
    (t !== -1 && (e = e.slice(0, t)),
      (e += (e.indexOf(`?`) === -1 ? `?` : `&`) + o));
  }
  return e;
}
var hc = class {
    constructor() {
      this.handlers = [];
    }
    use(e, t, n) {
      return (
        this.handlers.push({
          fulfilled: e,
          rejected: t,
          synchronous: n ? n.synchronous : !1,
          runWhen: n ? n.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(e) {
      this.handlers[e] && (this.handlers[e] = null);
    }
    clear() {
      this.handlers &&= [];
    }
    forEach(e) {
      Y.forEach(this.handlers, function (t) {
        t !== null && e(t);
      });
    }
  },
  gc = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
    advertiseZstdAcceptEncoding: !1,
    validateStatusUndefinedResolves: !0,
  },
  _c = {
    isBrowser: !0,
    classes: {
      URLSearchParams: typeof URLSearchParams < `u` ? URLSearchParams : fc,
      FormData: typeof FormData < `u` ? FormData : null,
      Blob: typeof Blob < `u` ? Blob : null,
    },
    protocols: [`http`, `https`, `file`, `blob`, `url`, `data`],
  },
  vc = s({
    hasBrowserEnv: () => yc,
    hasStandardBrowserEnv: () => xc,
    hasStandardBrowserWebWorkerEnv: () => Sc,
    navigator: () => bc,
    origin: () => Cc,
  }),
  yc = typeof window < `u` && typeof document < `u`,
  bc = (typeof navigator == `object` && navigator) || void 0,
  xc =
    yc &&
    (!bc || [`ReactNative`, `NativeScript`, `NS`].indexOf(bc.product) < 0),
  Sc =
    typeof WorkerGlobalScope < `u` &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == `function`,
  Cc = (yc && window.location.href) || `http://localhost`,
  wc = { ...vc, ..._c };
function Tc(e, t) {
  return uc(e, new wc.classes.URLSearchParams(), {
    visitor: function (e, t, n, r) {
      return wc.isNode && Y.isBuffer(e)
        ? (this.append(t, e.toString(`base64`)), !1)
        : r.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
var Ec = 100;
function Dc(e) {
  if (e > Ec)
    throw new X(
      `FormData field is too deeply nested (` +
        e +
        ` levels). Max depth: ` +
        Ec,
      X.ERR_FORM_DATA_DEPTH_EXCEEDED,
    );
}
function Oc(e) {
  let t = [],
    n = /[^.[\]]+|\[([^.[\]]*)]/g,
    r;
  for (; (r = n.exec(e)) !== null;)
    (Dc(t.length), t.push(r[0] === `[]` ? `` : r[1] || r[0]));
  return t;
}
function kc(e) {
  let t = {},
    n = Object.keys(e),
    r,
    i = n.length,
    a;
  for (r = 0; r < i; r++) ((a = n[r]), (t[a] = e[a]));
  return t;
}
function Ac(e) {
  function t(e, n, r, i) {
    Dc(i);
    let a = e[i++];
    if (a === `__proto__`) return !0;
    let o = Number.isFinite(+a),
      s = i >= e.length;
    return (
      (a = !a && Y.isArray(r) ? r.length : a),
      s
        ? (Y.hasOwnProp(r, a)
            ? (r[a] = Y.isArray(r[a]) ? r[a].concat(n) : [r[a], n])
            : (r[a] = n),
          !o)
        : ((!Y.hasOwnProp(r, a) || !Y.isObject(r[a])) && (r[a] = []),
          t(e, n, r[a], i) && Y.isArray(r[a]) && (r[a] = kc(r[a])),
          !o)
    );
  }
  if (Y.isFormData(e) && Y.isFunction(e.entries)) {
    let n = {};
    return (
      Y.forEachEntry(e, (e, r) => {
        t(Oc(e), r, n, 0);
      }),
      n
    );
  }
  return null;
}
var jc = (e, t) => (e != null && Y.hasOwnProp(e, t) ? e[t] : void 0);
function Mc(e, t, n) {
  if (Y.isString(e))
    try {
      return ((t || JSON.parse)(e), Y.trim(e));
    } catch (e) {
      if (e.name !== `SyntaxError`) throw e;
    }
  return (n || JSON.stringify)(e);
}
var Nc = {
  transitional: gc,
  adapter: [`xhr`, `http`, `fetch`],
  transformRequest: [
    function (e, t) {
      let n = t.getContentType() || ``,
        r = n.indexOf(`application/json`) > -1,
        i = Y.isObject(e);
      if ((i && Y.isHTMLForm(e) && (e = new FormData(e)), Y.isFormData(e)))
        return r ? JSON.stringify(Ac(e)) : e;
      if (
        Y.isArrayBuffer(e) ||
        Y.isBuffer(e) ||
        Y.isStream(e) ||
        Y.isFile(e) ||
        Y.isBlob(e) ||
        Y.isReadableStream(e)
      )
        return e;
      if (Y.isArrayBufferView(e)) return e.buffer;
      if (Y.isURLSearchParams(e))
        return (
          t.setContentType(
            `application/x-www-form-urlencoded;charset=utf-8`,
            !1,
          ),
          e.toString()
        );
      let a;
      if (i) {
        let t = jc(this, `formSerializer`);
        if (n.indexOf(`application/x-www-form-urlencoded`) > -1)
          return Tc(e, t).toString();
        if ((a = Y.isFileList(e)) || n.indexOf(`multipart/form-data`) > -1) {
          let n = jc(this, `env`),
            r = n && n.FormData;
          return uc(a ? { "files[]": e } : e, r && new r(), t);
        }
      }
      return i || r ? (t.setContentType(`application/json`, !1), Mc(e)) : e;
    },
  ],
  transformResponse: [
    function (e) {
      let t = jc(this, `transitional`) || Nc.transitional,
        n = t && t.forcedJSONParsing,
        r = jc(this, `responseType`),
        i = r === `json`;
      if (Y.isResponse(e) || Y.isReadableStream(e)) return e;
      if (e && Y.isString(e) && ((n && !r) || i)) {
        let n = !(t && t.silentJSONParsing) && i;
        try {
          return JSON.parse(e, jc(this, `parseReviver`));
        } catch (e) {
          if (n)
            throw e.name === `SyntaxError`
              ? X.from(e, X.ERR_BAD_RESPONSE, this, null, jc(this, `response`))
              : e;
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: `XSRF-TOKEN`,
  xsrfHeaderName: `X-XSRF-TOKEN`,
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: wc.classes.FormData, Blob: wc.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: `application/json, text/plain, */*`,
      "Content-Type": void 0,
    },
  },
};
Y.forEach([`delete`, `get`, `head`, `post`, `put`, `patch`, `query`], (e) => {
  Nc.headers[e] = {};
});
function Pc(e, t) {
  let n = this || Nc,
    r = t || n,
    i = $s.from(r.headers),
    a = r.data;
  return (
    Y.forEach(e, function (e) {
      a = e.call(n, a, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    a
  );
}
function Fc(e) {
  return !!(e && e.__CANCEL__);
}
var Ic = class extends X {
  constructor(e, t, n) {
    (super(e ?? `canceled`, X.ERR_CANCELED, t, n),
      (this.name = `CanceledError`),
      (this.__CANCEL__ = !0));
  }
};
function Lc(e, t, n) {
  let r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new X(
          `Request failed with status code ` + n.status,
          n.status >= 400 && n.status < 500
            ? X.ERR_BAD_REQUEST
            : X.ERR_BAD_RESPONSE,
          n.config,
          n.request,
          n,
        ),
      );
}
function Rc(e) {
  let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
  return (t && t[1]) || ``;
}
function zc(e, t) {
  e ||= 10;
  let n = Array(e),
    r = Array(e),
    i = 0,
    a = 0,
    o;
  return (
    (t = t === void 0 ? 1e3 : t),
    function (s) {
      let c = Date.now(),
        l = r[a];
      ((o ||= c), (n[i] = s), (r[i] = c));
      let u = a,
        d = 0;
      for (; u !== i;) ((d += n[u++]), (u %= e));
      if (((i = (i + 1) % e), i === a && (a = (a + 1) % e), c - o < t)) return;
      let f = l && c - l;
      return f ? Math.round((d * 1e3) / f) : void 0;
    }
  );
}
function Bc(e, t) {
  let n = 0,
    r = 1e3 / t,
    i,
    a,
    o = (t, r = Date.now()) => {
      ((n = r), (i = null), (a &&= (clearTimeout(a), null)), e(...t));
    };
  return [
    (...e) => {
      let t = Date.now(),
        s = t - n;
      s >= r
        ? o(e, t)
        : ((i = e),
          (a ||= setTimeout(() => {
            ((a = null), o(i));
          }, r - s)));
    },
    () => i && o(i),
  ];
}
var Vc = (e, t, n = 3) => {
    let r = 0,
      i = zc(50, 250);
    return Bc((n) => {
      if (!n || typeof n.loaded != `number`) return;
      let a = n.loaded,
        o = n.lengthComputable ? n.total : void 0,
        s = Math.max(0, o == null ? a : Math.min(a, o)),
        c = Math.max(0, s - r),
        l = i(c);
      ((r = Math.max(r, s)),
        e({
          loaded: s,
          total: o,
          progress: o ? s / o : void 0,
          bytes: c,
          rate: l || void 0,
          estimated: l && o ? (o - s) / l : void 0,
          event: n,
          lengthComputable: o != null,
          [t ? `download` : `upload`]: !0,
        }));
    }, n);
  },
  Q = (e, t) => {
    let n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  Hc =
    (e, t = Y.asap) =>
    (...n) =>
      t(() => e(...n)),
  Uc = wc.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, wc.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(wc.origin),
        wc.navigator && /(msie|trident)/i.test(wc.navigator.userAgent),
      )
    : () => !0,
  Wc = wc.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, i, a, o) {
          if (typeof document > `u`) return;
          let s = [`${e}=${encodeURIComponent(t)}`];
          (Y.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`),
            Y.isString(r) && s.push(`path=${r}`),
            Y.isString(i) && s.push(`domain=${i}`),
            a === !0 && s.push(`secure`),
            Y.isString(o) && s.push(`SameSite=${o}`),
            (document.cookie = s.join(`; `)));
        },
        read(e) {
          if (typeof document > `u`) return null;
          let t = document.cookie.split(`;`);
          for (let n = 0; n < t.length; n++) {
            let r = t[n].replace(/^\s+/, ``),
              i = r.indexOf(`=`);
            if (i !== -1 && r.slice(0, i) === e)
              try {
                return decodeURIComponent(r.slice(i + 1));
              } catch {
                return r.slice(i + 1);
              }
          }
          return null;
        },
        remove(e) {
          this.write(e, ``, Date.now() - 864e5, `/`);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Gc(e) {
  return typeof e == `string` && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Kc(e, t) {
  if (!t) return e;
  let n = e.length;
  for (; n > 0 && e.charCodeAt(n - 1) === 47;) n--;
  return e.slice(0, n) + `/` + t.replace(/^\/+/, ``);
}
var qc = /^https?:(?!\/\/)/i,
  Jc = /[\t\n\r]/g;
function Yc(e) {
  let t = 0;
  for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
  return e.slice(t);
}
function Xc(e) {
  return Yc(e).replace(Jc, ``);
}
function Zc(e) {
  return (
    e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (e, t, n = ``) => `${t}${n}${ec}`)
  );
}
function Qc(e) {
  let t = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${ec}@`),
    n = t.indexOf(`#`),
    r = (n === -1 ? t : t.slice(0, n)).replace(
      /([?&][^=&#]*=)[^&#]*/g,
      `$1${ec}`,
    );
  return n === -1 ? r : `${r}#${Zc(t.slice(n + 1))}`;
}
function $c(e, t) {
  if (typeof e == `string`) {
    let n = Xc(e);
    if (qc.test(n))
      throw new X(
        `Invalid URL ${JSON.stringify(Qc(n))}: missing "//" after protocol`,
        X.ERR_INVALID_URL,
        t,
      );
  }
}
function el(e, t, n, r) {
  $c(t, r);
  let i = !Gc(t);
  return e && (i || n === !1) ? ($c(e, r), Kc(e, t)) : t;
}
var tl = (e) => (e instanceof $s ? { ...e } : e),
  nl = (e) =>
    Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor
      ? Object.keys(e).concat(
          Object.getOwnPropertySymbols(e).filter(
            (t) => Object.getOwnPropertyDescriptor(e, t).enumerable,
          ),
        )
      : Object.keys(e);
function rl(e, t) {
  ((e ||= {}), (t ||= {}));
  let n = Object.create(null);
  Object.defineProperty(n, "hasOwnProperty", {
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0,
  });
  function r(e, t, n, r) {
    return Y.isPlainObject(e) && Y.isPlainObject(t)
      ? Y.merge.call({ caseless: r }, e, t)
      : Y.isPlainObject(t)
        ? Y.merge({}, t)
        : Y.isArray(t)
          ? t.slice()
          : t;
  }
  function i(e, t, n, i) {
    if (!Y.isUndefined(t)) return r(e, t, n, i);
    if (!Y.isUndefined(e)) return r(void 0, e, n, i);
  }
  function a(e, t) {
    if (!Y.isUndefined(t)) return r(void 0, t);
  }
  function o(e, t) {
    if (!Y.isUndefined(t)) return r(void 0, t);
    if (!Y.isUndefined(e)) return r(void 0, e);
  }
  function s(n) {
    let r = Y.hasOwnProp(t, `transitional`) ? t.transitional : void 0;
    if (!Y.isUndefined(r)) {
      if (Y.isPlainObject(r)) {
        if (Y.hasOwnProp(r, n)) return r[n];
      } else return;
    }
    let i = Y.hasOwnProp(e, `transitional`) ? e.transitional : void 0;
    if (Y.isPlainObject(i) && Y.hasOwnProp(i, n)) return i[n];
  }
  function c(n, i, a) {
    if (Y.hasOwnProp(t, a)) return r(n, i);
    if (Y.hasOwnProp(e, a)) return r(void 0, n);
  }
  let l = {
    url: a,
    method: a,
    data: a,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    allowedSocketPaths: o,
    responseEncoding: o,
    validateStatus: c,
    headers: (e, t, n) => i(tl(e), tl(t), n, !0),
  };
  return (
    Y.forEach(nl({ ...e, ...t }), function (r) {
      if (r === `__proto__` || r === `constructor` || r === `prototype`) return;
      let a = Y.hasOwnProp(l, r) ? l[r] : i,
        o = a(
          Y.hasOwnProp(e, r) ? e[r] : void 0,
          Y.hasOwnProp(t, r) ? t[r] : void 0,
          r,
        );
      (Y.isUndefined(o) && a !== c) || (n[r] = o);
    }),
    Y.hasOwnProp(t, `validateStatus`) &&
      Y.isUndefined(t.validateStatus) &&
      s(`validateStatusUndefinedResolves`) === !1 &&
      (Y.hasOwnProp(e, `validateStatus`)
        ? (n.validateStatus = r(void 0, e.validateStatus))
        : delete n.validateStatus),
    n
  );
}
var il = [`content-type`, `content-length`];
function al(e, t, n) {
  if (n !== `content-only`) {
    e.set(t);
    return;
  }
  Object.entries(t || {}).forEach(([t, n]) => {
    il.includes(t.toLowerCase()) && e.set(t, n);
  });
}
var ol = (e) =>
  encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) =>
    String.fromCharCode(parseInt(t, 16)),
  );
function sl(e) {
  let t = rl({}, e),
    n = (e) => (Y.hasOwnProp(t, e) ? t[e] : void 0),
    r = n(`data`),
    i = n(`withXSRFToken`),
    a = n(`xsrfHeaderName`),
    o = n(`xsrfCookieName`),
    s = n(`headers`),
    c = n(`auth`),
    l = n(`baseURL`),
    u = n(`allowAbsoluteUrls`),
    d = n(`url`);
  if (
    ((t.headers = s = $s.from(s)),
    (t.url = mc(el(l, d, u, t), n(`params`), n(`paramsSerializer`))),
    c)
  ) {
    let t = Y.getSafeProp(c, `username`) || ``,
      n = Y.getSafeProp(c, `password`) || ``;
    try {
      s.set(`Authorization`, `Basic ` + btoa(t + `:` + (n ? ol(n) : ``)));
    } catch (t) {
      throw X.from(t, X.ERR_BAD_OPTION_VALUE, e);
    }
  }
  if (
    (Y.isFormData(r) &&
      (wc.hasStandardBrowserEnv ||
      wc.hasStandardBrowserWebWorkerEnv ||
      Y.isReactNative(r)
        ? s.setContentType(void 0)
        : Y.isFunction(r.getHeaders) &&
          al(s, r.getHeaders(), n(`formDataHeaderPolicy`))),
    wc.hasStandardBrowserEnv &&
      (Y.isFunction(i) && (i = i(t)), i === !0 || (i == null && Uc(t.url))))
  ) {
    let e = a && o && Wc.read(o);
    e && s.set(a, e);
  }
  return t;
}
var cl =
    typeof XMLHttpRequest < `u` &&
    function (e) {
      return new Promise(function (t, n) {
        let r = sl(e),
          i = r.data,
          a = $s.from(r.headers).normalize(),
          { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r,
          l,
          u,
          d,
          f,
          p;
        function m() {
          (f && f(),
            p && p(),
            r.cancelToken && r.cancelToken.unsubscribe(l),
            r.signal && r.signal.removeEventListener(`abort`, l));
        }
        let h = new XMLHttpRequest();
        (h.open(r.method.toUpperCase(), r.url, !0), (h.timeout = r.timeout));
        function g() {
          if (!h) return;
          let r = $s.from(
            `getAllResponseHeaders` in h && h.getAllResponseHeaders(),
          );
          (Lc(
            function (e) {
              (t(e), m());
            },
            function (e) {
              (n(e), m());
            },
            {
              data:
                !o || o === `text` || o === `json`
                  ? h.responseText
                  : h.response,
              status: h.status,
              statusText: h.statusText,
              headers: r,
              config: e,
              request: h,
            },
          ),
            (h = null));
        }
        (`onloadend` in h
          ? (h.onloadend = g)
          : (h.onreadystatechange = function () {
              !h ||
                h.readyState !== 4 ||
                (h.status === 0 &&
                  !(h.responseURL && h.responseURL.startsWith(`file:`))) ||
                setTimeout(g);
            }),
          (h.onabort = function () {
            h &&=
              (n(new X(`Request aborted`, X.ECONNABORTED, e, h)), m(), null);
          }),
          (h.onerror = function (t) {
            let r = new X(
              t && t.message ? t.message : `Network Error`,
              X.ERR_NETWORK,
              e,
              h,
            );
            ((r.event = t || null), n(r), m(), (h = null));
          }),
          (h.ontimeout = function () {
            let t = r.timeout
                ? `timeout of ` + r.timeout + `ms exceeded`
                : `timeout exceeded`,
              i = r.transitional || gc;
            (r.timeoutErrorMessage && (t = r.timeoutErrorMessage),
              n(
                new X(
                  t,
                  i.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED,
                  e,
                  h,
                ),
              ),
              m(),
              (h = null));
          }),
          i === void 0 && a.setContentType(null),
          `setRequestHeader` in h &&
            Y.forEach(Bs(a), function (e, t) {
              h.setRequestHeader(t, e);
            }),
          Y.isUndefined(r.withCredentials) ||
            (h.withCredentials = !!r.withCredentials),
          o && o !== `json` && (h.responseType = r.responseType),
          c && (([d, p] = Vc(c, !0)), h.addEventListener(`progress`, d)),
          s &&
            h.upload &&
            (([u, f] = Vc(s)),
            h.upload.addEventListener(`progress`, u),
            h.upload.addEventListener(`loadend`, f)),
          (r.cancelToken || r.signal) &&
            ((l = (t) => {
              h &&=
                (n(!t || t.type ? new Ic(null, e, h) : t),
                h.abort(),
                m(),
                null);
            }),
            r.cancelToken && r.cancelToken.subscribe(l),
            r.signal &&
              (r.signal.aborted
                ? l()
                : r.signal.addEventListener(`abort`, l))));
        let _ = Rc(r.url);
        if (_ && !wc.protocols.includes(_)) {
          (n(new X(`Unsupported protocol ` + _ + `:`, X.ERR_BAD_REQUEST, e)),
            m());
          return;
        }
        h.send(i || null);
      });
    },
  ll = (e, t) => {
    if (((e = e ? e.filter(Boolean) : []), !t && !e.length)) return;
    let n = new AbortController(),
      r = !1,
      i = function (e) {
        if (!r) {
          ((r = !0), o());
          let t = e instanceof Error ? e : this.reason;
          n.abort(
            t instanceof X ? t : new Ic(t instanceof Error ? t.message : t),
          );
        }
      },
      a =
        t &&
        setTimeout(() => {
          ((a = null), i(new X(`timeout of ${t}ms exceeded`, X.ETIMEDOUT)));
        }, t),
      o = () => {
        e &&=
          (a && clearTimeout(a),
          (a = null),
          e.forEach((e) => {
            e.unsubscribe
              ? e.unsubscribe(i)
              : e.removeEventListener(`abort`, i);
          }),
          null);
      };
    e.forEach((e) => {
      if (!r) {
        if (e.aborted) {
          i.call(e);
          return;
        }
        e.addEventListener(`abort`, i, { once: !0 });
      }
    });
    let { signal: s } = n;
    return ((s.unsubscribe = () => Y.asap(o)), s);
  },
  ul = function* (e, t) {
    let n = e.byteLength;
    if (!t || n < t) {
      yield e;
      return;
    }
    let r = 0,
      i;
    for (; r < n;) ((i = r + t), yield e.slice(r, i), (r = i));
  },
  dl = async function* (e, t) {
    for await (let n of fl(e)) yield* ul(n, t);
  },
  fl = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    let t = e.getReader();
    try {
      for (;;) {
        let { done: e, value: n } = await t.read();
        if (e) break;
        yield n;
      }
    } finally {
      await t.cancel();
    }
  },
  pl = (e, t, n, r) => {
    let i = dl(e, t),
      a = 0,
      o,
      s = (e) => {
        o || ((o = !0), r && r(e));
      };
    return new ReadableStream(
      {
        async pull(e) {
          try {
            let { done: t, value: r } = await i.next();
            if (t) {
              (s(), e.close());
              return;
            }
            let o = r.byteLength;
            (n && n((a += o)), e.enqueue(new Uint8Array(r)));
          } catch (e) {
            throw (s(e), e);
          }
        },
        cancel(e) {
          return (s(e), i.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  ml = (e) =>
    (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102),
  hl = (e, t, n) =>
    t + 2 < n && ml(e.charCodeAt(t + 1)) && ml(e.charCodeAt(t + 2)),
  gl = (e) => (e <= 57 ? e - 48 : (e & 223) - 55),
  _l = (e) =>
    (e >= 65 && e <= 90) ||
    (e >= 97 && e <= 122) ||
    (e >= 48 && e <= 57) ||
    e === 43 ||
    e === 47 ||
    e === 45 ||
    e === 95,
  vl = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32,
  yl = (e) => {
    let t = Math.floor(e / 4),
      n = e % 4;
    return t * 3 + (n === 2 ? 1 : n === 3 ? 2 : 0);
  },
  bl = (e) => {
    let t = e.length,
      n = 0;
    return (
      t > 0 &&
        e.charCodeAt(t - 1) === 61 &&
        (n++, t > 1 && e.charCodeAt(t - 2) === 61 && n++),
      Math.floor(((t - n) * 3) / 4)
    );
  },
  xl = (e) => {
    let t = e.length,
      n = 0,
      r = 0,
      i = !1;
    for (let a = 0; a < t; a++) {
      let o = e.charCodeAt(a);
      if (
        (o === 37 &&
          hl(e, a, t) &&
          ((o = gl(e.charCodeAt(a + 1)) * 16 + gl(e.charCodeAt(a + 2))),
          (a += 2)),
        !vl(o))
      ) {
        if (o === 61) {
          r++;
          continue;
        }
        if (!_l(o) || r > 0) {
          i = !0;
          continue;
        }
        n++;
      }
    }
    return i || r > 2 || (r > 0 && (n + r) % 4 != 0) || n % 4 == 1
      ? bl(e)
      : yl(n);
  },
  Sl = (e, t) => {
    if (!e || typeof e != `string` || !e.startsWith(`data:`)) return 0;
    let n = e.indexOf(`,`);
    if (n < 0) return 0;
    let r = e.slice(5, n),
      i = e.slice(n + 1);
    if (/;base64/i.test(r)) return t(i);
    let a = 0;
    for (let e = 0, t = i.length; e < t; e++) {
      let n = i.charCodeAt(e);
      if (n === 37 && hl(i, e, t)) ((a += 1), (e += 2));
      else if (n < 128) a += 1;
      else if (n < 2048) a += 2;
      else if (n >= 55296 && n <= 56319 && e + 1 < t) {
        let t = i.charCodeAt(e + 1);
        t >= 56320 && t <= 57343 ? ((a += 4), e++) : (a += 3);
      } else a += 3;
    }
    return a;
  };
function Cl(e) {
  let t = typeof e == `string` ? e.indexOf(`#`) : -1;
  return Sl(t === -1 ? e : e.slice(0, t), xl);
}
var wl = `1.19.0`,
  Tl = 65536,
  { isFunction: El } = Y,
  Dl = (e) =>
    encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) =>
      String.fromCharCode(parseInt(t, 16)),
    ),
  Ol = (e) => {
    if (!Y.isString(e)) return e;
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  },
  kl = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Al = (e) => {
    let t = e.indexOf(`://`),
      n = e;
    return (
      t !== -1 && (n = n.slice(t + 3)),
      n.includes(`@`) || n.includes(`:`)
    );
  },
  jl = (e) => {
    let t = Y.global !== void 0 && Y.global !== null ? Y.global : globalThis,
      { ReadableStream: n, TextEncoder: r } = t;
    e = Y.merge.call(
      { skipUndefined: !0 },
      { Request: t.Request, Response: t.Response },
      e,
    );
    let { fetch: i, Request: a, Response: o } = e,
      s = i ? El(i) : typeof fetch == `function`,
      c = El(a),
      l = El(o);
    if (!s) return !1;
    let u = s && El(n),
      d =
        s &&
        (typeof r == `function`
          ? (
              (e) => (t) =>
                e.encode(t)
            )(new r())
          : async (e) => new Uint8Array(await new a(e).arrayBuffer())),
      f =
        c &&
        u &&
        kl(() => {
          let e = !1,
            t = new a(wc.origin, {
              body: new n(),
              method: `POST`,
              get duplex() {
                return ((e = !0), `half`);
              },
            }),
            r = t.headers.has(`Content-Type`);
          return (t.body != null && t.body.cancel(), e && !r);
        }),
      p = l && u && kl(() => Y.isReadableStream(new o(``).body)),
      m = { stream: p && ((e) => e.body) };
    s &&
      [`text`, `arrayBuffer`, `blob`, `formData`, `stream`].forEach((e) => {
        !m[e] &&
          (m[e] = (t, n) => {
            let r = t && t[e];
            if (r) return r.call(t);
            throw new X(
              `Response type '${e}' is not supported`,
              X.ERR_NOT_SUPPORT,
              n,
            );
          });
      });
    let h = async (e) => {
        if (e == null) return 0;
        if (Y.isBlob(e)) return e.size;
        if (Y.isSpecCompliantForm(e))
          return (
            await new a(wc.origin, { method: `POST`, body: e }).arrayBuffer()
          ).byteLength;
        if (Y.isArrayBufferView(e) || Y.isArrayBuffer(e)) return e.byteLength;
        if ((Y.isURLSearchParams(e) && (e += ``), Y.isString(e)))
          return (await d(e)).byteLength;
      },
      g = async (e, t) => Y.toFiniteNumber(e.getContentLength()) ?? h(t);
    return async (e) => {
      let {
          url: t,
          method: n,
          data: s,
          signal: l,
          cancelToken: d,
          timeout: _,
          onDownloadProgress: v,
          onUploadProgress: y,
          responseType: b,
          headers: x,
          withCredentials: S = `same-origin`,
          fetchOptions: C,
          maxContentLength: w,
          maxBodyLength: T,
        } = sl(e),
        E = Y.isNumber(w) && w > -1,
        D = Y.isNumber(T) && T > -1,
        O = (t) => (Y.hasOwnProp(e, t) ? e[t] : void 0),
        k = i || fetch;
      b = b ? (b + ``).toLowerCase() : `text`;
      let A = ll([l, d && d.toAbortSignal()], _),
        j = null,
        M =
          A &&
          A.unsubscribe &&
          (() => {
            A.unsubscribe();
          }),
        N,
        P = null,
        F = () =>
          new X(
            `Request body larger than maxBodyLength limit`,
            X.ERR_BAD_REQUEST,
            e,
            j,
          );
      try {
        let i,
          l = O(`auth`);
        if (
          (l &&
            (i = {
              username: Y.getSafeProp(l, `username`) || ``,
              password: Y.getSafeProp(l, `password`) || ``,
            }),
          Al(t))
        ) {
          let e = new URL(t, wc.origin);
          (!i &&
            (e.username || e.password) &&
            (i = { username: Ol(e.username), password: Ol(e.password) }),
            (e.username || e.password) &&
              ((e.username = ``), (e.password = ``), (t = e.href)));
        }
        if (
          (i &&
            (x.delete(`authorization`),
            x.set(
              `Authorization`,
              `Basic ` +
                btoa(Dl((i.username || ``) + `:` + (i.password || ``))),
            )),
          E && typeof t == `string` && t.startsWith(`data:`) && Cl(t) > w)
        )
          throw new X(
            `maxContentLength size of ` + w + ` exceeded`,
            X.ERR_BAD_RESPONSE,
            e,
            j,
          );
        if (D && n !== `get` && n !== `head`) {
          let e = await h(s);
          if (typeof e == `number` && isFinite(e) && ((N = e), e > T))
            throw F();
        }
        let d = D && (Y.isReadableStream(s) || Y.isStream(s)),
          _ = (e, t, n) =>
            pl(
              e,
              Tl,
              (e) => {
                if (D && e > T) throw (P = F());
                t && t(e);
              },
              n,
            );
        if (f && n !== `get` && n !== `head` && (y || d)) {
          if (((N ??= await g(x, s)), N !== 0 || d)) {
            let e = new a(t, { method: `POST`, body: s, duplex: `half` }),
              n;
            if (
              (Y.isFormData(s) &&
                (n = e.headers.get(`content-type`)) &&
                x.setContentType(n),
              e.body)
            ) {
              let [t, n] = (y && Q(N, Vc(Hc(y)))) || [];
              s = _(e.body, t, n);
            }
          }
        } else if (d && !c && u && n !== `get` && n !== `head`) s = _(s);
        else if (d && c && !f && n !== `get` && n !== `head`)
          throw new X(
            `Stream request bodies are not supported by the current fetch implementation`,
            X.ERR_NOT_SUPPORT,
            e,
            j,
          );
        Y.isString(S) || (S = S ? `include` : `omit`);
        let ee = c && `credentials` in a.prototype;
        if (Y.isFormData(s)) {
          let e = x.getContentType();
          e &&
            /^multipart\/form-data/i.test(e) &&
            !/boundary=/i.test(e) &&
            x.delete(`content-type`);
        }
        x.set(`User-Agent`, `axios/` + wl, !1);
        let te = {
          ...C,
          signal: A,
          method: n.toUpperCase(),
          headers: Bs(x.normalize()),
          body: s,
          duplex: `half`,
          credentials: ee ? S : void 0,
        };
        j = c && new a(t, te);
        let I = await (c ? k(j, C) : k(t, te)),
          L = $s.from(I.headers);
        if (E) {
          let t = Y.toFiniteNumber(L.getContentLength());
          if (t != null && t > w)
            throw new X(
              `maxContentLength size of ` + w + ` exceeded`,
              X.ERR_BAD_RESPONSE,
              e,
              j,
            );
        }
        let R = p && (b === `stream` || b === `response`);
        if (p && I.body && (v || E || (R && M))) {
          let t = {};
          [`status`, `statusText`, `headers`].forEach((e) => {
            t[e] = I[e];
          });
          let n = Y.toFiniteNumber(L.getContentLength()),
            [r, i] = (v && Q(n, Vc(Hc(v), !0))) || [],
            a = 0;
          I = new o(
            pl(
              I.body,
              Tl,
              (t) => {
                if (E && ((a = t), a > w))
                  throw new X(
                    `maxContentLength size of ` + w + ` exceeded`,
                    X.ERR_BAD_RESPONSE,
                    e,
                    j,
                  );
                r && r(t);
              },
              () => {
                (i && i(), M && M());
              },
            ),
            t,
          );
        }
        b ||= `text`;
        let z = await m[Y.findKey(m, b) || `text`](I, e);
        if (E && !p && !R) {
          let t;
          if (
            (z != null &&
              (typeof z.byteLength == `number`
                ? (t = z.byteLength)
                : typeof z.size == `number`
                  ? (t = z.size)
                  : typeof z == `string` &&
                    (t =
                      typeof r == `function`
                        ? new r().encode(z).byteLength
                        : z.length)),
            typeof t == `number` && t > w)
          )
            throw new X(
              `maxContentLength size of ` + w + ` exceeded`,
              X.ERR_BAD_RESPONSE,
              e,
              j,
            );
        }
        return (
          !R && M && M(),
          await new Promise((t, n) => {
            Lc(t, n, {
              data: z,
              headers: $s.from(I.headers),
              status: I.status,
              statusText: I.statusText,
              config: e,
              request: j,
            });
          })
        );
      } catch (t) {
        if ((M && M(), A && A.aborted && A.reason instanceof X)) {
          let n = A.reason;
          throw (
            (n.config = e),
            j && (n.request = j),
            t !== n &&
              Object.defineProperty(n, "cause", {
                __proto__: null,
                value: t,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              }),
            n
          );
        }
        if (P) throw (j && !P.request && (P.request = j), P);
        if (t instanceof X) throw (j && !t.request && (t.request = j), t);
        if (
          t &&
          t.name === `TypeError` &&
          /Load failed|fetch/i.test(t.message)
        ) {
          let n = new X(`Network Error`, X.ERR_NETWORK, e, j, t && t.response);
          throw (
            Object.defineProperty(n, "cause", {
              __proto__: null,
              value: t.cause || t,
              writable: !0,
              enumerable: !1,
              configurable: !0,
            }),
            n
          );
        }
        throw X.from(t, t && t.code, e, j, t && t.response);
      }
    };
  },
  Ml = new Map(),
  Nl = (e) => {
    let t = (e && e.env) || {},
      { fetch: n, Request: r, Response: i } = t,
      a = [r, i, n],
      o = a.length,
      s,
      c,
      l = Ml;
    for (; o--;)
      ((s = a[o]),
        (c = l.get(s)),
        c === void 0 && l.set(s, (c = o ? new Map() : jl(t))),
        (l = c));
    return c;
  };
Nl();
var Pl = { http: null, xhr: cl, fetch: { get: Nl } };
Y.forEach(Pl, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { __proto__: null, value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { __proto__: null, value: t });
  }
});
var Fl = (e) => `- ${e}`,
  Il = (e) => Y.isFunction(e) || e === null || e === !1;
function Ll(e, t) {
  e = Y.isArray(e) ? e : [e];
  let { length: n } = e,
    r,
    i,
    a = {};
  for (let o = 0; o < n; o++) {
    r = e[o];
    let n;
    if (
      ((i = r),
      !Il(r) && ((i = Pl[(n = String(r)).toLowerCase()]), i === void 0))
    )
      throw new X(`Unknown adapter '${n}'`);
    if (i && (Y.isFunction(i) || (i = i.get(t)))) break;
    a[n || `#` + o] = i;
  }
  if (!i) {
    let e = Object.entries(a).map(
      ([e, t]) =>
        `adapter ${e} ` +
        (t === !1
          ? `is not supported by the environment`
          : `is not available in the build`),
    );
    throw new X(
      `There is no suitable adapter to dispatch the request ` +
        (n
          ? e.length > 1
            ? `since :
` +
              e.map(Fl).join(`
`)
            : ` ` + Fl(e[0])
          : `as no adapter specified`),
      X.ERR_NOT_SUPPORT,
    );
  }
  return i;
}
var Rl = { getAdapter: Ll, adapters: Pl };
function zl(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ic(null, e);
}
function Bl(e) {
  return (
    zl(e),
    (e.headers = $s.from(e.headers)),
    (e.data = Pc.call(e, e.transformRequest)),
    [`post`, `put`, `patch`].indexOf(e.method) !== -1 &&
      e.headers.setContentType(`application/x-www-form-urlencoded`, !1),
    Rl.getAdapter(
      e.adapter || Nc.adapter,
      e,
    )(e).then(
      function (t) {
        (zl(e), (e.response = t));
        try {
          t.data = Pc.call(e, e.transformResponse, t);
        } finally {
          delete e.response;
        }
        return ((t.headers = $s.from(t.headers)), t);
      },
      function (t) {
        if (!Fc(t) && (zl(e), t && t.response)) {
          e.response = t.response;
          try {
            t.response.data = Pc.call(e, e.transformResponse, t.response);
          } finally {
            delete e.response;
          }
          t.response.headers = $s.from(t.response.headers);
        }
        return Promise.reject(t);
      },
    )
  );
}
var Vl = {};
[`object`, `boolean`, `number`, `function`, `string`, `symbol`].forEach(
  (e, t) => {
    Vl[e] = function (n) {
      return typeof n === e || `a` + (t < 1 ? `n ` : ` `) + e;
    };
  },
);
var Hl = {};
((Vl.transitional = function (e, t, n) {
  function r(e, t) {
    return (
      `[Axios v` +
      wl +
      `] Transitional option '` +
      e +
      `'` +
      t +
      (n ? `. ` + n : ``)
    );
  }
  return (n, i, a) => {
    if (e === !1)
      throw new X(
        r(i, ` has been removed` + (t ? ` in ` + t : ``)),
        X.ERR_DEPRECATED,
      );
    return (
      t &&
        !Hl[i] &&
        ((Hl[i] = !0),
        console.warn(
          r(
            i,
            ` has been deprecated since v` +
              t +
              ` and will be removed in the near future`,
          ),
        )),
      !e || e(n, i, a)
    );
  };
}),
  (Vl.spelling = function (e) {
    return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
  }));
function Ul(e, t, n) {
  if (typeof e != `object` || !e)
    throw new X(`options must be an object`, X.ERR_BAD_OPTION_VALUE);
  let r = Object.keys(e),
    i = r.length;
  for (; i-- > 0;) {
    let a = r[i],
      o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
    if (o) {
      let t = e[a],
        n = t === void 0 || o(t, a, e);
      if (n !== !0)
        throw new X(`option ` + a + ` must be ` + n, X.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new X(`Unknown option ` + a, X.ERR_BAD_OPTION);
  }
}
var Wl = { assertOptions: Ul, validators: Vl },
  Gl = Wl.validators,
  Kl = class {
    constructor(e) {
      ((this.defaults = e || {}),
        (this.interceptors = { request: new hc(), response: new hc() }));
    }
    async request(e, t) {
      try {
        return await this._request(e, t);
      } catch (e) {
        if (e instanceof Error) {
          let t = {};
          Error.captureStackTrace ? Error.captureStackTrace(t) : (t = Error());
          let n = (() => {
            if (!t.stack) return ``;
            let e = t.stack.indexOf(`
`);
            return e === -1 ? `` : t.stack.slice(e + 1);
          })();
          try {
            if (!e.stack) e.stack = n;
            else if (n) {
              let t = n.indexOf(`
`),
                r =
                  t === -1
                    ? -1
                    : n.indexOf(
                        `
`,
                        t + 1,
                      ),
                i = r === -1 ? `` : n.slice(r + 1);
              String(e.stack).endsWith(i) ||
                (e.stack +=
                  `
` + n);
            }
          } catch {}
        }
        throw e;
      }
    }
    _request(e, t) {
      (typeof e == `string` ? ((t ||= {}), (t.url = e)) : (t = e || {}),
        (t = rl(this.defaults, t)));
      let { transitional: n, paramsSerializer: r, headers: i } = t;
      (n !== void 0 &&
        Wl.assertOptions(
          n,
          {
            silentJSONParsing: Gl.transitional(Gl.boolean),
            forcedJSONParsing: Gl.transitional(Gl.boolean),
            clarifyTimeoutError: Gl.transitional(Gl.boolean),
            legacyInterceptorReqResOrdering: Gl.transitional(Gl.boolean),
            advertiseZstdAcceptEncoding: Gl.transitional(Gl.boolean),
            validateStatusUndefinedResolves: Gl.transitional(Gl.boolean),
          },
          !1,
        ),
        r != null &&
          (Y.isFunction(r)
            ? (t.paramsSerializer = { serialize: r })
            : Wl.assertOptions(
                r,
                { encode: Gl.function, serialize: Gl.function },
                !0,
              )),
        t.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls === void 0
            ? (t.allowAbsoluteUrls = !0)
            : (t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)),
        Wl.assertOptions(
          t,
          {
            baseUrl: Gl.spelling(`baseURL`),
            withXsrfToken: Gl.spelling(`withXSRFToken`),
          },
          !0,
        ),
        (t.method = (t.method || this.defaults.method || `get`).toLowerCase()));
      let a = i && Y.merge(i.common, i[t.method]);
      (i &&
        Y.forEach(
          [`delete`, `get`, `head`, `post`, `put`, `patch`, `query`, `common`],
          (e) => {
            delete i[e];
          },
        ),
        (t.headers = $s.concat(a, i)));
      let o = [],
        s = !0;
      this.interceptors.request.forEach(function (e) {
        if (typeof e.runWhen == `function` && e.runWhen(t) === !1) return;
        s &&= e.synchronous;
        let n = t.transitional || gc;
        n && n.legacyInterceptorReqResOrdering
          ? o.unshift(e.fulfilled, e.rejected)
          : o.push(e.fulfilled, e.rejected);
      });
      let c = [];
      this.interceptors.response.forEach(function (e) {
        c.push(e.fulfilled, e.rejected);
      });
      let l,
        u = 0,
        d;
      if (!s) {
        let e = [Bl.bind(this), void 0];
        for (
          e.unshift(...o), e.push(...c), d = e.length, l = Promise.resolve(t);
          u < d;
        )
          l = l.then(e[u++], e[u++]);
        return l;
      }
      d = o.length;
      let f = t;
      for (; u < d;) {
        let e = o[u++],
          t = o[u++];
        try {
          f = e ? e(f) : f;
        } catch (e) {
          if (!t) {
            l = Promise.reject(e);
            break;
          }
          try {
            let n = t.call(this, e);
            Y.isThenable(n) &&
              (l = Promise.resolve(n).then(() => Bl.call(this, f)));
          } catch (e) {
            l = Promise.reject(e);
          }
          break;
        }
      }
      if (!l)
        try {
          l = Bl.call(this, f);
        } catch (e) {
          l = Promise.reject(e);
        }
      for (u = 0, d = c.length; u < d;) l = l.then(c[u++], c[u++]);
      return l;
    }
    getUri(e) {
      return (
        (e = rl(this.defaults, e)),
        mc(
          el(e.baseURL, e.url, e.allowAbsoluteUrls, e),
          e.params,
          e.paramsSerializer,
        )
      );
    }
  };
(Y.forEach([`delete`, `get`, `head`, `options`], function (e) {
  Kl.prototype[e] = function (t, n) {
    return this.request(
      rl(n || {}, {
        method: e,
        url: t,
        data: n && Y.hasOwnProp(n, `data`) ? n.data : void 0,
      }),
    );
  };
}),
  Y.forEach([`post`, `put`, `patch`, `query`], function (e) {
    function t(t) {
      return function (n, r, i) {
        return this.request(
          rl(i || {}, {
            method: e,
            headers: t ? { "Content-Type": `multipart/form-data` } : {},
            url: n,
            data: r,
          }),
        );
      };
    }
    ((Kl.prototype[e] = t()),
      e !== `query` && (Kl.prototype[e + `Form`] = t(!0)));
  }));
var ql = class e {
  constructor(e) {
    if (typeof e != `function`) throw TypeError(`executor must be a function.`);
    let t;
    this.promise = new Promise(function (e) {
      t = e;
    });
    let n = this;
    (this.promise.then((e) => {
      if (!n._listeners) return;
      let t = n._listeners.length;
      for (; t-- > 0;) n._listeners[t](e);
      n._listeners = null;
    }),
      (this.promise.then = (e) => {
        let t,
          r = new Promise((e) => {
            (n.subscribe(e), (t = e));
          }).then(e);
        return (
          (r.cancel = function () {
            n.unsubscribe(t);
          }),
          r
        );
      }),
      e(function (e, r, i) {
        n.reason || ((n.reason = new Ic(e, r, i)), t(n.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    let t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    let e = new AbortController(),
      t = (t) => {
        e.abort(t);
      };
    return (
      this.subscribe(t),
      (e.signal.unsubscribe = () => this.unsubscribe(t)),
      e.signal
    );
  }
  static source() {
    let t;
    return {
      token: new e(function (e) {
        t = e;
      }),
      cancel: t,
    };
  }
};
function Jl(e) {
  return function (t) {
    return e.apply(null, t);
  };
}
function Yl(e) {
  return Y.isObject(e) && e.isAxiosError === !0;
}
var Xl = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerReturnsAnUnknownError: 520,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(Xl).forEach(([e, t]) => {
  Xl[t] = e;
});
function Zl(e) {
  let t = new Kl(e),
    n = go(Kl.prototype.request, t);
  return (
    Y.extend(n, Kl.prototype, t, { allOwnKeys: !0 }),
    Y.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (t) {
      return Zl(rl(e, t));
    }),
    n
  );
}
var Ql = Zl(Nc);
((Ql.Axios = Kl),
  (Ql.CanceledError = Ic),
  (Ql.CancelToken = ql),
  (Ql.isCancel = Fc),
  (Ql.VERSION = wl),
  (Ql.toFormData = uc),
  (Ql.AxiosError = X),
  (Ql.Cancel = Ql.CanceledError),
  (Ql.all = function (e) {
    return Promise.all(e);
  }),
  (Ql.spread = Jl),
  (Ql.isAxiosError = Yl),
  (Ql.mergeConfig = rl),
  (Ql.AxiosHeaders = $s),
  (Ql.formToJSON = (e) => Ac(Y.isHTMLForm(e) ? new FormData(e) : e)),
  (Ql.getAdapter = Rl.getAdapter),
  (Ql.HttpStatusCode = Xl),
  (Ql.default = Ql));
var $ = Ql.create({ baseURL: `http://localhost:5000`, withCredentials: !0 }),
  $l = async (e, t, n) =>
    (await $.put(`/quiz/create`, { subject: e, quizName: t, items: n })).data,
  eu = async ({ searchVal: e, skipCount: t }) =>
    (
      await $.get(`/quiz/subjectsList`, {
        params: { searchQuery: e, skipCount: t },
      })
    ).data,
  tu = async ({ subject: e, searchVal: t, skipCount: n }) =>
    (
      await $.get(`/quiz/quizList`, {
        params: { subject: e, searchQuery: t, skipCount: n },
      })
    ).data,
  nu = async (e) =>
    (await $.get(`/quiz/startQuiz`, { params: { quizId: e } })).data,
  ru = async (e, t) =>
    (await $.put(`/quiz/submitAnswer`, { questionId: e, answer: t })).data,
  iu = async (e) => (await $.put(`/quiz/saveRecord`, { quizId: e })).data,
  au = async ({ searchVal: e, skipCount: t }) =>
    (await $.get(`/quiz/records`, { params: { searchQuery: e, skipCount: t } }))
      .data,
  ou = async (e) =>
    (await $.get(`/quiz/record`, { params: { recordId: e } })).data,
  su = async (e, t, n) =>
    (await $.put(`/quiz/saveData`, { key: e, data: t, quizId: n })).data,
  cu = async (e, t) =>
    (await $.get(`/quiz/savedData`, { params: { key: e, quizId: t } })).data,
  lu = async (e, t) =>
    (await $.delete(`/quiz/savedData`, { params: { key: e, quizId: t } })).data,
  uu = async (e) =>
    (await $.get(`/quiz/items`, { params: { quizId: e } })).data,
  du = async (e, t, n, r) =>
    (
      await $.put(`/quiz/update`, {
        quizId: e,
        subject: t,
        quizName: n,
        items: r,
      })
    ).data,
  fu = async (e) => (await $.put(`/quiz/pdf`, { quizId: e })).data,
  pu = async (e) =>
    (await $.get(`/quiz/pdf`, { params: { pdfId: e }, responseType: `blob` }))
      .data,
  mu = async (e) =>
    (await $.delete(`/quiz/file`, { params: { filePath: e } })).data,
  hu = async (e, t, n) => {
    let { offsetHeight: r, scrollTop: i, scrollHeight: a } = e.target;
    r + i >= a && n(t?.length);
  },
  gu = () => {
    let [e, t] = (0, f.useState)([]),
      [n, r] = (0, f.useState)(``),
      { isLoading: i, setSkipCount: a } = ho(t, po(n, 400), eu);
    return {
      subjects: e,
      isLoading: i,
      searchInput: n,
      handleSearch: (e) => {
        r(e.target.value);
      },
      handleScroll: (t) => {
        hu(t, e, a);
      },
    };
  },
  _u = () =>
    (0, q.jsx)(`div`, {
      children: (0, q.jsx)(`h1`, { children: `Loading...` }),
    }),
  vu = () => {
    let {
      subjects: e,
      isLoading: t,
      searchInput: n,
      handleSearch: r,
      handleScroll: i,
    } = gu();
    return t
      ? (0, q.jsx)(_u, {})
      : (0, q.jsxs)(`section`, {
          className: `list-page`,
          "aria-labelledby": `subjects-title`,
          children: [
            (0, q.jsxs)(`header`, {
              className: `list-page-header`,
              children: [
                (0, q.jsxs)(`div`, {
                  children: [
                    (0, q.jsx)(`h1`, {
                      id: `subjects-title`,
                      className: `list-page-title`,
                      children: `Subjects`,
                    }),
                    (0, q.jsx)(`p`, {
                      className: `list-page-description`,
                      children: `Browse your quiz subjects`,
                    }),
                  ],
                }),
                (0, q.jsx)(fo, {
                  value: n,
                  onChange: r,
                  placeholder: `Search subjects...`,
                }),
              ],
            }),
            e.length > 0
              ? (0, q.jsx)(`ul`, {
                  className: `list-page-grid`,
                  onScroll: i,
                  children: e.map((e) =>
                    (0, q.jsx)(
                      `li`,
                      { children: (0, q.jsx)(Ka, { subject: e }) },
                      e._id,
                    ),
                  ),
                })
              : (0, q.jsx)(Ga, {
                  title: `No subjects found`,
                  description: `There are no subjects matching your search.`,
                }),
          ],
        });
  },
  yu = () => (0, q.jsx)(vu, {}),
  bu = ({ children: e }) =>
    (0, q.jsx)(`div`, { className: `auth-card`, children: e }),
  xu = function (e) {
    return Su(e) && !Cu(e);
  };
function Su(e) {
  return !!e && typeof e == `object`;
}
function Cu(e) {
  var t = Object.prototype.toString.call(e);
  return t === `[object RegExp]` || t === `[object Date]` || Tu(e);
}
var wu =
  typeof Symbol == `function` && Symbol.for
    ? Symbol.for(`react.element`)
    : 60103;
function Tu(e) {
  return e.$$typeof === wu;
}
function Eu(e) {
  return Array.isArray(e) ? [] : {};
}
function Du(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? Au(Eu(e), e, t) : e;
}
function Ou(e, t, n) {
  return e.concat(t).map(function (e) {
    return Du(e, n);
  });
}
function ku(e, t, n) {
  var r = {};
  return (
    n.isMergeableObject(e) &&
      Object.keys(e).forEach(function (t) {
        r[t] = Du(e[t], n);
      }),
    Object.keys(t).forEach(function (i) {
      r[i] =
        !n.isMergeableObject(t[i]) || !e[i] ? Du(t[i], n) : Au(e[i], t[i], n);
    }),
    r
  );
}
function Au(e, t, n) {
  ((n ||= {}),
    (n.arrayMerge = n.arrayMerge || Ou),
    (n.isMergeableObject = n.isMergeableObject || xu));
  var r = Array.isArray(t);
  return r === Array.isArray(e)
    ? r
      ? n.arrayMerge(e, t, n)
      : ku(e, t, n)
    : Du(t, n);
}
Au.all = function (e, t) {
  if (!Array.isArray(e)) throw Error(`first argument should be an array`);
  return e.reduce(function (e, n) {
    return Au(e, n, t);
  }, {});
};
var ju = Au,
  Mu =
    typeof global == `object` && global && global.Object === Object && global,
  Nu = typeof self == `object` && self && self.Object === Object && self,
  Pu = Mu || Nu || Function(`return this`)(),
  Fu = Pu.Symbol,
  Iu = Object.prototype,
  Lu = Iu.hasOwnProperty,
  Ru = Iu.toString,
  zu = Fu ? Fu.toStringTag : void 0;
function Bu(e) {
  var t = Lu.call(e, zu),
    n = e[zu];
  try {
    e[zu] = void 0;
    var r = !0;
  } catch {}
  var i = Ru.call(e);
  return (r && (t ? (e[zu] = n) : delete e[zu]), i);
}
var Vu = Object.prototype.toString;
function Hu(e) {
  return Vu.call(e);
}
var Uu = `[object Null]`,
  Wu = `[object Undefined]`,
  Gu = Fu ? Fu.toStringTag : void 0;
function Ku(e) {
  return e == null
    ? e === void 0
      ? Wu
      : Uu
    : Gu && Gu in Object(e)
      ? Bu(e)
      : Hu(e);
}
function qu(e, t) {
  return function (n) {
    return e(t(n));
  };
}
var Ju = qu(Object.getPrototypeOf, Object);
function Yu(e) {
  return typeof e == `object` && !!e;
}
var Xu = `[object Object]`,
  Zu = Function.prototype,
  Qu = Object.prototype,
  $u = Zu.toString,
  ed = Qu.hasOwnProperty,
  td = $u.call(Object);
function nd(e) {
  if (!Yu(e) || Ku(e) != Xu) return !1;
  var t = Ju(e);
  if (t === null) return !0;
  var n = ed.call(t, `constructor`) && t.constructor;
  return typeof n == `function` && n instanceof n && $u.call(n) == td;
}
function rd() {
  ((this.__data__ = []), (this.size = 0));
}
function id(e, t) {
  return e === t || (e !== e && t !== t);
}
function ad(e, t) {
  for (var n = e.length; n--;) if (id(e[n][0], t)) return n;
  return -1;
}
var od = Array.prototype.splice;
function sd(e) {
  var t = this.__data__,
    n = ad(t, e);
  return n < 0
    ? !1
    : (n == t.length - 1 ? t.pop() : od.call(t, n, 1), --this.size, !0);
}
function cd(e) {
  var t = this.__data__,
    n = ad(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function ld(e) {
  return ad(this.__data__, e) > -1;
}
function ud(e, t) {
  var n = this.__data__,
    r = ad(n, e);
  return (r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this);
}
function dd(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
((dd.prototype.clear = rd),
  (dd.prototype.delete = sd),
  (dd.prototype.get = cd),
  (dd.prototype.has = ld),
  (dd.prototype.set = ud));
function fd() {
  ((this.__data__ = new dd()), (this.size = 0));
}
function pd(e) {
  var t = this.__data__,
    n = t.delete(e);
  return ((this.size = t.size), n);
}
function md(e) {
  return this.__data__.get(e);
}
function hd(e) {
  return this.__data__.has(e);
}
function gd(e) {
  var t = typeof e;
  return e != null && (t == `object` || t == `function`);
}
var _d = `[object AsyncFunction]`,
  vd = `[object Function]`,
  yd = `[object GeneratorFunction]`,
  bd = `[object Proxy]`;
function xd(e) {
  if (!gd(e)) return !1;
  var t = Ku(e);
  return t == vd || t == yd || t == _d || t == bd;
}
var Sd = Pu[`__core-js_shared__`],
  Cd = (function () {
    var e = /[^.]+$/.exec((Sd && Sd.keys && Sd.keys.IE_PROTO) || ``);
    return e ? `Symbol(src)_1.` + e : ``;
  })();
function wd(e) {
  return !!Cd && Cd in e;
}
var Td = Function.prototype.toString;
function Ed(e) {
  if (e != null) {
    try {
      return Td.call(e);
    } catch {}
    try {
      return e + ``;
    } catch {}
  }
  return ``;
}
var Dd = /[\\^$.*+?()[\]{}|]/g,
  Od = /^\[object .+?Constructor\]$/,
  kd = Function.prototype,
  Ad = Object.prototype,
  jd = kd.toString,
  Md = Ad.hasOwnProperty,
  Nd = RegExp(
    `^` +
      jd
        .call(Md)
        .replace(Dd, `\\$&`)
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          `$1.*?`,
        ) +
      `$`,
  );
function Pd(e) {
  return !gd(e) || wd(e) ? !1 : (xd(e) ? Nd : Od).test(Ed(e));
}
function Fd(e, t) {
  return e?.[t];
}
function Id(e, t) {
  var n = Fd(e, t);
  return Pd(n) ? n : void 0;
}
var Ld = Id(Pu, `Map`),
  Rd = Id(Object, `create`);
function zd() {
  ((this.__data__ = Rd ? Rd(null) : {}), (this.size = 0));
}
function Bd(e) {
  var t = this.has(e) && delete this.__data__[e];
  return ((this.size -= +!!t), t);
}
var Vd = `__lodash_hash_undefined__`,
  Hd = Object.prototype.hasOwnProperty;
function Ud(e) {
  var t = this.__data__;
  if (Rd) {
    var n = t[e];
    return n === Vd ? void 0 : n;
  }
  return Hd.call(t, e) ? t[e] : void 0;
}
var Wd = Object.prototype.hasOwnProperty;
function Gd(e) {
  var t = this.__data__;
  return Rd ? t[e] !== void 0 : Wd.call(t, e);
}
var Kd = `__lodash_hash_undefined__`;
function qd(e, t) {
  var n = this.__data__;
  return (
    (this.size += +!this.has(e)),
    (n[e] = Rd && t === void 0 ? Kd : t),
    this
  );
}
function Jd(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
((Jd.prototype.clear = zd),
  (Jd.prototype.delete = Bd),
  (Jd.prototype.get = Ud),
  (Jd.prototype.has = Gd),
  (Jd.prototype.set = qd));
function Yd() {
  ((this.size = 0),
    (this.__data__ = {
      hash: new Jd(),
      map: new (Ld || dd)(),
      string: new Jd(),
    }));
}
function Xd(e) {
  var t = typeof e;
  return t == `string` || t == `number` || t == `symbol` || t == `boolean`
    ? e !== `__proto__`
    : e === null;
}
function Zd(e, t) {
  var n = e.__data__;
  return Xd(t) ? n[typeof t == `string` ? `string` : `hash`] : n.map;
}
function Qd(e) {
  var t = Zd(this, e).delete(e);
  return ((this.size -= +!!t), t);
}
function $d(e) {
  return Zd(this, e).get(e);
}
function ef(e) {
  return Zd(this, e).has(e);
}
function tf(e, t) {
  var n = Zd(this, e),
    r = n.size;
  return (n.set(e, t), (this.size += n.size == r ? 0 : 1), this);
}
function nf(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n;) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
((nf.prototype.clear = Yd),
  (nf.prototype.delete = Qd),
  (nf.prototype.get = $d),
  (nf.prototype.has = ef),
  (nf.prototype.set = tf));
var rf = 200;
function af(e, t) {
  var n = this.__data__;
  if (n instanceof dd) {
    var r = n.__data__;
    if (!Ld || r.length < rf - 1)
      return (r.push([e, t]), (this.size = ++n.size), this);
    n = this.__data__ = new nf(r);
  }
  return (n.set(e, t), (this.size = n.size), this);
}
function of(e) {
  var t = (this.__data__ = new dd(e));
  this.size = t.size;
}
((of.prototype.clear = fd),
  (of.prototype.delete = pd),
  (of.prototype.get = md),
  (of.prototype.has = hd),
  (of.prototype.set = af));
function sf(e, t) {
  for (
    var n = -1, r = e == null ? 0 : e.length;
    ++n < r && t(e[n], n, e) !== !1;
  );
  return e;
}
var cf = (function () {
  try {
    var e = Id(Object, `defineProperty`);
    return (e({}, ``, {}), e);
  } catch {}
})();
function lf(e, t, n) {
  t == `__proto__` && cf
    ? cf(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
    : (e[t] = n);
}
var uf = Object.prototype.hasOwnProperty;
function df(e, t, n) {
  var r = e[t];
  (!(uf.call(e, t) && id(r, n)) || (n === void 0 && !(t in e))) && lf(e, t, n);
}
function ff(e, t, n, r) {
  var i = !n;
  n ||= {};
  for (var a = -1, o = t.length; ++a < o;) {
    var s = t[a],
      c = r ? r(n[s], e[s], s, n, e) : void 0;
    (c === void 0 && (c = e[s]), i ? lf(n, s, c) : df(n, s, c));
  }
  return n;
}
function pf(e, t) {
  for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
  return r;
}
var mf = `[object Arguments]`;
function hf(e) {
  return Yu(e) && Ku(e) == mf;
}
var gf = Object.prototype,
  _f = gf.hasOwnProperty,
  vf = gf.propertyIsEnumerable,
  yf = hf(
    (function () {
      return arguments;
    })(),
  )
    ? hf
    : function (e) {
        return Yu(e) && _f.call(e, `callee`) && !vf.call(e, `callee`);
      },
  bf = Array.isArray;
function xf() {
  return !1;
}
var Sf = typeof exports == `object` && exports && !exports.nodeType && exports,
  Cf = Sf && typeof module == `object` && module && !module.nodeType && module,
  wf = Cf && Cf.exports === Sf ? Pu.Buffer : void 0,
  Tf = (wf ? wf.isBuffer : void 0) || xf,
  Ef = 9007199254740991,
  Df = /^(?:0|[1-9]\d*)$/;
function Of(e, t) {
  var n = typeof e;
  return (
    (t ??= Ef),
    !!t &&
      (n == `number` || (n != `symbol` && Df.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  );
}
var kf = 9007199254740991;
function Af(e) {
  return typeof e == `number` && e > -1 && e % 1 == 0 && e <= kf;
}
var jf = `[object Arguments]`,
  Mf = `[object Array]`,
  Nf = `[object Boolean]`,
  Pf = `[object Date]`,
  Ff = `[object Error]`,
  If = `[object Function]`,
  Lf = `[object Map]`,
  Rf = `[object Number]`,
  zf = `[object Object]`,
  Bf = `[object RegExp]`,
  Vf = `[object Set]`,
  Hf = `[object String]`,
  Uf = `[object WeakMap]`,
  Wf = `[object ArrayBuffer]`,
  Gf = `[object DataView]`,
  Kf = `[object Float32Array]`,
  qf = `[object Float64Array]`,
  Jf = `[object Int8Array]`,
  Yf = `[object Int16Array]`,
  Xf = `[object Int32Array]`,
  Zf = `[object Uint8Array]`,
  Qf = `[object Uint8ClampedArray]`,
  $f = `[object Uint16Array]`,
  ep = `[object Uint32Array]`,
  tp = {};
((tp[Kf] =
  tp[qf] =
  tp[Jf] =
  tp[Yf] =
  tp[Xf] =
  tp[Zf] =
  tp[Qf] =
  tp[$f] =
  tp[ep] =
    !0),
  (tp[jf] =
    tp[Mf] =
    tp[Wf] =
    tp[Nf] =
    tp[Gf] =
    tp[Pf] =
    tp[Ff] =
    tp[If] =
    tp[Lf] =
    tp[Rf] =
    tp[zf] =
    tp[Bf] =
    tp[Vf] =
    tp[Hf] =
    tp[Uf] =
      !1));
function np(e) {
  return Yu(e) && Af(e.length) && !!tp[Ku(e)];
}
function rp(e) {
  return function (t) {
    return e(t);
  };
}
var ip = typeof exports == `object` && exports && !exports.nodeType && exports,
  ap = ip && typeof module == `object` && module && !module.nodeType && module,
  op = ap && ap.exports === ip && Mu.process,
  sp = (function () {
    try {
      return (
        (ap && ap.require && ap.require(`util`).types) ||
        (op && op.binding && op.binding(`util`))
      );
    } catch {}
  })(),
  cp = sp && sp.isTypedArray,
  lp = cp ? rp(cp) : np,
  up = Object.prototype.hasOwnProperty;
function dp(e, t) {
  var n = bf(e),
    r = !n && yf(e),
    i = !n && !r && Tf(e),
    a = !n && !r && !i && lp(e),
    o = n || r || i || a,
    s = o ? pf(e.length, String) : [],
    c = s.length;
  for (var l in e)
    (t || up.call(e, l)) &&
      !(
        o &&
        (l == `length` ||
          (i && (l == `offset` || l == `parent`)) ||
          (a && (l == `buffer` || l == `byteLength` || l == `byteOffset`)) ||
          Of(l, c))
      ) &&
      s.push(l);
  return s;
}
var fp = Object.prototype;
function pp(e) {
  var t = e && e.constructor;
  return e === ((typeof t == `function` && t.prototype) || fp);
}
var mp = qu(Object.keys, Object),
  hp = Object.prototype.hasOwnProperty;
function gp(e) {
  if (!pp(e)) return mp(e);
  var t = [];
  for (var n in Object(e)) hp.call(e, n) && n != `constructor` && t.push(n);
  return t;
}
function _p(e) {
  return e != null && Af(e.length) && !xd(e);
}
function vp(e) {
  return _p(e) ? dp(e) : gp(e);
}
function yp(e, t) {
  return e && ff(t, vp(t), e);
}
function bp(e) {
  var t = [];
  if (e != null) for (var n in Object(e)) t.push(n);
  return t;
}
var xp = Object.prototype.hasOwnProperty;
function Sp(e) {
  if (!gd(e)) return bp(e);
  var t = pp(e),
    n = [];
  for (var r in e) (r == `constructor` && (t || !xp.call(e, r))) || n.push(r);
  return n;
}
function Cp(e) {
  return _p(e) ? dp(e, !0) : Sp(e);
}
function wp(e, t) {
  return e && ff(t, Cp(t), e);
}
var Tp = typeof exports == `object` && exports && !exports.nodeType && exports,
  Ep = Tp && typeof module == `object` && module && !module.nodeType && module,
  Dp = Ep && Ep.exports === Tp ? Pu.Buffer : void 0,
  Op = Dp ? Dp.allocUnsafe : void 0;
function kp(e, t) {
  if (t) return e.slice();
  var n = e.length,
    r = Op ? Op(n) : new e.constructor(n);
  return (e.copy(r), r);
}
function Ap(e, t) {
  var n = -1,
    r = e.length;
  for (t ||= Array(r); ++n < r;) t[n] = e[n];
  return t;
}
function jp(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
    var o = e[n];
    t(o, n, e) && (a[i++] = o);
  }
  return a;
}
function Mp() {
  return [];
}
var Np = Object.prototype.propertyIsEnumerable,
  Pp = Object.getOwnPropertySymbols,
  Fp = Pp
    ? function (e) {
        return e == null
          ? []
          : ((e = Object(e)),
            jp(Pp(e), function (t) {
              return Np.call(e, t);
            }));
      }
    : Mp;
function Ip(e, t) {
  return ff(e, Fp(e), t);
}
function Lp(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
  return e;
}
var Rp = Object.getOwnPropertySymbols
  ? function (e) {
      for (var t = []; e;) (Lp(t, Fp(e)), (e = Ju(e)));
      return t;
    }
  : Mp;
function zp(e, t) {
  return ff(e, Rp(e), t);
}
function Bp(e, t, n) {
  var r = t(e);
  return bf(e) ? r : Lp(r, n(e));
}
function Vp(e) {
  return Bp(e, vp, Fp);
}
function Hp(e) {
  return Bp(e, Cp, Rp);
}
var Up = Id(Pu, `DataView`),
  Wp = Id(Pu, `Promise`),
  Gp = Id(Pu, `Set`),
  Kp = Id(Pu, `WeakMap`),
  qp = `[object Map]`,
  Jp = `[object Object]`,
  Yp = `[object Promise]`,
  Xp = `[object Set]`,
  Zp = `[object WeakMap]`,
  Qp = `[object DataView]`,
  $p = Ed(Up),
  em = Ed(Ld),
  tm = Ed(Wp),
  nm = Ed(Gp),
  rm = Ed(Kp),
  im = Ku;
((Up && im(new Up(new ArrayBuffer(1))) != Qp) ||
  (Ld && im(new Ld()) != qp) ||
  (Wp && im(Wp.resolve()) != Yp) ||
  (Gp && im(new Gp()) != Xp) ||
  (Kp && im(new Kp()) != Zp)) &&
  (im = function (e) {
    var t = Ku(e),
      n = t == Jp ? e.constructor : void 0,
      r = n ? Ed(n) : ``;
    if (r)
      switch (r) {
        case $p:
          return Qp;
        case em:
          return qp;
        case tm:
          return Yp;
        case nm:
          return Xp;
        case rm:
          return Zp;
      }
    return t;
  });
var am = im,
  om = Object.prototype.hasOwnProperty;
function sm(e) {
  var t = e.length,
    n = new e.constructor(t);
  return (
    t &&
      typeof e[0] == `string` &&
      om.call(e, `index`) &&
      ((n.index = e.index), (n.input = e.input)),
    n
  );
}
var cm = Pu.Uint8Array;
function lm(e) {
  var t = new e.constructor(e.byteLength);
  return (new cm(t).set(new cm(e)), t);
}
function um(e, t) {
  var n = t ? lm(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var dm = /\w*$/;
function fm(e) {
  var t = new e.constructor(e.source, dm.exec(e));
  return ((t.lastIndex = e.lastIndex), t);
}
var pm = Fu ? Fu.prototype : void 0,
  mm = pm ? pm.valueOf : void 0;
function hm(e) {
  return mm ? Object(mm.call(e)) : {};
}
function gm(e, t) {
  var n = t ? lm(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var _m = `[object Boolean]`,
  vm = `[object Date]`,
  ym = `[object Map]`,
  bm = `[object Number]`,
  xm = `[object RegExp]`,
  Sm = `[object Set]`,
  Cm = `[object String]`,
  wm = `[object Symbol]`,
  Tm = `[object ArrayBuffer]`,
  Em = `[object DataView]`,
  Dm = `[object Float32Array]`,
  Om = `[object Float64Array]`,
  km = `[object Int8Array]`,
  Am = `[object Int16Array]`,
  jm = `[object Int32Array]`,
  Mm = `[object Uint8Array]`,
  Nm = `[object Uint8ClampedArray]`,
  Pm = `[object Uint16Array]`,
  Fm = `[object Uint32Array]`;
function Im(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case Tm:
      return lm(e);
    case _m:
    case vm:
      return new r(+e);
    case Em:
      return um(e, n);
    case Dm:
    case Om:
    case km:
    case Am:
    case jm:
    case Mm:
    case Nm:
    case Pm:
    case Fm:
      return gm(e, n);
    case ym:
      return new r();
    case bm:
    case Cm:
      return new r(e);
    case xm:
      return fm(e);
    case Sm:
      return new r();
    case wm:
      return hm(e);
  }
}
var Lm = Object.create,
  Rm = (function () {
    function e() {}
    return function (t) {
      if (!gd(t)) return {};
      if (Lm) return Lm(t);
      e.prototype = t;
      var n = new e();
      return ((e.prototype = void 0), n);
    };
  })();
function zm(e) {
  return typeof e.constructor == `function` && !pp(e) ? Rm(Ju(e)) : {};
}
var Bm = `[object Map]`;
function Vm(e) {
  return Yu(e) && am(e) == Bm;
}
var Hm = sp && sp.isMap,
  Um = Hm ? rp(Hm) : Vm,
  Wm = `[object Set]`;
function Gm(e) {
  return Yu(e) && am(e) == Wm;
}
var Km = sp && sp.isSet,
  qm = Km ? rp(Km) : Gm,
  Jm = 1,
  Ym = 2,
  Xm = 4,
  Zm = `[object Arguments]`,
  Qm = `[object Array]`,
  $m = `[object Boolean]`,
  eh = `[object Date]`,
  th = `[object Error]`,
  nh = `[object Function]`,
  rh = `[object GeneratorFunction]`,
  ih = `[object Map]`,
  ah = `[object Number]`,
  oh = `[object Object]`,
  sh = `[object RegExp]`,
  ch = `[object Set]`,
  lh = `[object String]`,
  uh = `[object Symbol]`,
  dh = `[object WeakMap]`,
  fh = `[object ArrayBuffer]`,
  ph = `[object DataView]`,
  mh = `[object Float32Array]`,
  hh = `[object Float64Array]`,
  gh = `[object Int8Array]`,
  _h = `[object Int16Array]`,
  vh = `[object Int32Array]`,
  yh = `[object Uint8Array]`,
  bh = `[object Uint8ClampedArray]`,
  xh = `[object Uint16Array]`,
  Sh = `[object Uint32Array]`,
  Ch = {};
((Ch[Zm] =
  Ch[Qm] =
  Ch[fh] =
  Ch[ph] =
  Ch[$m] =
  Ch[eh] =
  Ch[mh] =
  Ch[hh] =
  Ch[gh] =
  Ch[_h] =
  Ch[vh] =
  Ch[ih] =
  Ch[ah] =
  Ch[oh] =
  Ch[sh] =
  Ch[ch] =
  Ch[lh] =
  Ch[uh] =
  Ch[yh] =
  Ch[bh] =
  Ch[xh] =
  Ch[Sh] =
    !0),
  (Ch[th] = Ch[nh] = Ch[dh] = !1));
function wh(e, t, n, r, i, a) {
  var o,
    s = t & Jm,
    c = t & Ym,
    l = t & Xm;
  if ((n && (o = i ? n(e, r, i, a) : n(e)), o !== void 0)) return o;
  if (!gd(e)) return e;
  var u = bf(e);
  if (u) {
    if (((o = sm(e)), !s)) return Ap(e, o);
  } else {
    var d = am(e),
      f = d == nh || d == rh;
    if (Tf(e)) return kp(e, s);
    if (d == oh || d == Zm || (f && !i)) {
      if (((o = c || f ? {} : zm(e)), !s))
        return c ? zp(e, wp(o, e)) : Ip(e, yp(o, e));
    } else {
      if (!Ch[d]) return i ? e : {};
      o = Im(e, d, s);
    }
  }
  a ||= new of();
  var p = a.get(e);
  if (p) return p;
  (a.set(e, o),
    qm(e)
      ? e.forEach(function (r) {
          o.add(wh(r, t, n, r, e, a));
        })
      : Um(e) &&
        e.forEach(function (r, i) {
          o.set(i, wh(r, t, n, i, e, a));
        }));
  var m = u ? void 0 : (l ? (c ? Hp : Vp) : c ? Cp : vp)(e);
  return (
    sf(m || e, function (r, i) {
      (m && ((i = r), (r = e[i])), df(o, i, wh(r, t, n, i, e, a)));
    }),
    o
  );
}
var Th = 1,
  Eh = 4;
function Dh(e) {
  return wh(e, Th | Eh);
}
var Oh = l(
    o((e, t) => {
      var n = Array.isArray,
        r = Object.keys,
        i = Object.prototype.hasOwnProperty,
        a = typeof Element < `u`;
      function o(e, t) {
        if (e === t) return !0;
        if (e && t && typeof e == `object` && typeof t == `object`) {
          var s = n(e),
            c = n(t),
            l,
            u,
            d;
          if (s && c) {
            if (((u = e.length), u != t.length)) return !1;
            for (l = u; l-- !== 0;) if (!o(e[l], t[l])) return !1;
            return !0;
          }
          if (s != c) return !1;
          var f = e instanceof Date,
            p = t instanceof Date;
          if (f != p) return !1;
          if (f && p) return e.getTime() == t.getTime();
          var m = e instanceof RegExp,
            h = t instanceof RegExp;
          if (m != h) return !1;
          if (m && h) return e.toString() == t.toString();
          var g = r(e);
          if (((u = g.length), u !== r(t).length)) return !1;
          for (l = u; l-- !== 0;) if (!i.call(t, g[l])) return !1;
          if (a && e instanceof Element && t instanceof Element) return e === t;
          for (l = u; l-- !== 0;)
            if (((d = g[l]), !(d === `_owner` && e.$$typeof) && !o(e[d], t[d])))
              return !1;
          return !0;
        }
        return e !== e && t !== t;
      }
      t.exports = function (e, t) {
        try {
          return o(e, t);
        } catch (e) {
          if (
            (e.message && e.message.match(/stack|recursion/i)) ||
            e.number === -2146828260
          )
            return (
              console.warn(
                `Warning: react-fast-compare does not handle circular references.`,
                e.name,
                e.message,
              ),
              !1
            );
          throw e;
        }
      };
    })(),
  ),
  kh = 4;
function Ah(e) {
  return wh(e, kh);
}
function jh(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r;)
    i[n] = t(e[n], n, e);
  return i;
}
var Mh = `[object Symbol]`;
function Nh(e) {
  return typeof e == `symbol` || (Yu(e) && Ku(e) == Mh);
}
var Ph = `Expected a function`;
function Fh(e, t) {
  if (typeof e != `function` || (t != null && typeof t != `function`))
    throw TypeError(Ph);
  var n = function () {
    var r = arguments,
      i = t ? t.apply(this, r) : r[0],
      a = n.cache;
    if (a.has(i)) return a.get(i);
    var o = e.apply(this, r);
    return ((n.cache = a.set(i, o) || a), o);
  };
  return ((n.cache = new (Fh.Cache || nf)()), n);
}
Fh.Cache = nf;
var Ih = 500;
function Lh(e) {
  var t = Fh(e, function (e) {
      return (n.size === Ih && n.clear(), e);
    }),
    n = t.cache;
  return t;
}
var Rh =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  zh = /\\(\\)?/g,
  Bh = Lh(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(``),
      e.replace(Rh, function (e, n, r, i) {
        t.push(r ? i.replace(zh, `$1`) : n || e);
      }),
      t
    );
  }),
  Vh = 1 / 0;
function Hh(e) {
  if (typeof e == `string` || Nh(e)) return e;
  var t = e + ``;
  return t == `0` && 1 / e == -Vh ? `-0` : t;
}
var Uh = 1 / 0,
  Wh = Fu ? Fu.prototype : void 0,
  Gh = Wh ? Wh.toString : void 0;
function Kh(e) {
  if (typeof e == `string`) return e;
  if (bf(e)) return jh(e, Kh) + ``;
  if (Nh(e)) return Gh ? Gh.call(e) : ``;
  var t = e + ``;
  return t == `0` && 1 / e == -Uh ? `-0` : t;
}
function qh(e) {
  return e == null ? `` : Kh(e);
}
function Jh(e) {
  return bf(e) ? jh(e, Hh) : Nh(e) ? [e] : Ap(Bh(qh(e)));
}
function Yh() {
  return (
    (Yh =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    Yh.apply(this, arguments)
  );
}
function Xh(e, t) {
  ((e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    (e.__proto__ = t));
}
function Zh(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++)
    ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
  return n;
}
function Qh(e) {
  if (e === void 0)
    throw ReferenceError(
      `this hasn't been initialised - super() hasn't been called`,
    );
  return e;
}
var $h = (0, f.createContext)(void 0);
$h.displayName = `FormikContext`;
var eg = $h.Provider,
  tg = $h.Consumer;
function ng() {
  return (0, f.useContext)($h);
}
var rg = function (e) {
    return Array.isArray(e) && e.length === 0;
  },
  ig = function (e) {
    return typeof e == `function`;
  },
  ag = function (e) {
    return typeof e == `object` && !!e;
  },
  og = function (e) {
    return String(Math.floor(Number(e))) === e;
  },
  sg = function (e) {
    return Object.prototype.toString.call(e) === `[object String]`;
  },
  cg = function (e) {
    return f.Children.count(e) === 0;
  },
  lg = function (e) {
    return ag(e) && ig(e.then);
  };
function ug(e, t, n, r) {
  r === void 0 && (r = 0);
  for (var i = Jh(t); e && r < i.length;) e = e[i[r++]];
  return (r !== i.length && !e) || e === void 0 ? n : e;
}
function dg(e, t, n) {
  for (var r = Ah(e), i = r, a = 0, o = Jh(t); a < o.length - 1; a++) {
    var s = o[a],
      c = ug(e, o.slice(0, a + 1));
    if (c && (ag(c) || Array.isArray(c))) i = i[s] = Ah(c);
    else {
      var l = o[a + 1];
      i = i[s] = og(l) && Number(l) >= 0 ? [] : {};
    }
  }
  return (a === 0 ? e : i)[o[a]] === n
    ? e
    : (n === void 0 ? delete i[o[a]] : (i[o[a]] = n),
      a === 0 && n === void 0 && delete r[o[a]],
      r);
}
function fg(e, t, n, r) {
  (n === void 0 && (n = new WeakMap()), r === void 0 && (r = {}));
  for (var i = 0, a = Object.keys(e); i < a.length; i++) {
    var o = a[i],
      s = e[o];
    ag(s)
      ? n.get(s) ||
        (n.set(s, !0), (r[o] = Array.isArray(s) ? [] : {}), fg(s, t, n, r[o]))
      : (r[o] = t);
  }
  return r;
}
function pg(e, t) {
  switch (t.type) {
    case `SET_VALUES`:
      return Yh({}, e, { values: t.payload });
    case `SET_TOUCHED`:
      return Yh({}, e, { touched: t.payload });
    case `SET_ERRORS`:
      return (0, Oh.default)(e.errors, t.payload)
        ? e
        : Yh({}, e, { errors: t.payload });
    case `SET_STATUS`:
      return Yh({}, e, { status: t.payload });
    case `SET_ISSUBMITTING`:
      return Yh({}, e, { isSubmitting: t.payload });
    case `SET_ISVALIDATING`:
      return Yh({}, e, { isValidating: t.payload });
    case `SET_FIELD_VALUE`:
      return Yh({}, e, {
        values: dg(e.values, t.payload.field, t.payload.value),
      });
    case `SET_FIELD_TOUCHED`:
      return Yh({}, e, {
        touched: dg(e.touched, t.payload.field, t.payload.value),
      });
    case `SET_FIELD_ERROR`:
      return Yh({}, e, {
        errors: dg(e.errors, t.payload.field, t.payload.value),
      });
    case `RESET_FORM`:
      return Yh({}, e, t.payload);
    case `SET_FORMIK_STATE`:
      return t.payload(e);
    case `SUBMIT_ATTEMPT`:
      return Yh({}, e, {
        touched: fg(e.values, !0),
        isSubmitting: !0,
        submitCount: e.submitCount + 1,
      });
    case `SUBMIT_FAILURE`:
      return Yh({}, e, { isSubmitting: !1 });
    case `SUBMIT_SUCCESS`:
      return Yh({}, e, { isSubmitting: !1 });
    default:
      return e;
  }
}
var mg = {},
  hg = {};
function gg(e) {
  var t = e.validateOnChange,
    n = t === void 0 || t,
    r = e.validateOnBlur,
    i = r === void 0 || r,
    a = e.validateOnMount,
    o = a !== void 0 && a,
    s = e.isInitialValid,
    c = e.enableReinitialize,
    l = c !== void 0 && c,
    u = e.onSubmit,
    d = Zh(e, [
      `validateOnChange`,
      `validateOnBlur`,
      `validateOnMount`,
      `isInitialValid`,
      `enableReinitialize`,
      `onSubmit`,
    ]),
    p = Yh(
      {
        validateOnChange: n,
        validateOnBlur: i,
        validateOnMount: o,
        onSubmit: u,
      },
      d,
    ),
    m = (0, f.useRef)(p.initialValues),
    h = (0, f.useRef)(p.initialErrors || mg),
    g = (0, f.useRef)(p.initialTouched || hg),
    _ = (0, f.useRef)(p.initialStatus),
    v = (0, f.useRef)(!1),
    y = (0, f.useRef)({});
  (0, f.useEffect)(function () {
    return (
      (v.current = !0),
      function () {
        v.current = !1;
      }
    );
  }, []);
  var b = (0, f.useState)(0)[1],
    x = (0, f.useRef)({
      values: Dh(p.initialValues),
      errors: Dh(p.initialErrors) || mg,
      touched: Dh(p.initialTouched) || hg,
      status: Dh(p.initialStatus),
      isSubmitting: !1,
      isValidating: !1,
      submitCount: 0,
    }),
    S = x.current,
    C = (0, f.useCallback)(function (e) {
      var t = x.current;
      ((x.current = pg(t, e)),
        t !== x.current &&
          b(function (e) {
            return e + 1;
          }));
    }, []),
    w = (0, f.useCallback)(
      function (e, t) {
        return new Promise(function (n, r) {
          var i = p.validate(e, t);
          i == null
            ? n(mg)
            : lg(i)
              ? i.then(
                  function (e) {
                    n(e || mg);
                  },
                  function (e) {
                    r(e);
                  },
                )
              : n(i);
        });
      },
      [p.validate],
    ),
    T = (0, f.useCallback)(
      function (e, t) {
        var n = p.validationSchema,
          r = ig(n) ? n(t) : n,
          i = t && r.validateAt ? r.validateAt(t, e) : yg(e, r);
        return new Promise(function (e, t) {
          i.then(
            function () {
              e(mg);
            },
            function (n) {
              n.name === `ValidationError` ? e(vg(n)) : t(n);
            },
          );
        });
      },
      [p.validationSchema],
    ),
    E = (0, f.useCallback)(function (e, t) {
      return new Promise(function (n) {
        return n(y.current[e].validate(t));
      });
    }, []),
    D = (0, f.useCallback)(
      function (e) {
        var t = Object.keys(y.current).filter(function (e) {
            return ig(y.current[e].validate);
          }),
          n =
            t.length > 0
              ? t.map(function (t) {
                  return E(t, ug(e, t));
                })
              : [Promise.resolve(`DO_NOT_DELETE_YOU_WILL_BE_FIRED`)];
        return Promise.all(n).then(function (e) {
          return e.reduce(function (e, n, r) {
            return (
              n === `DO_NOT_DELETE_YOU_WILL_BE_FIRED` ||
                (n && (e = dg(e, t[r], n))),
              e
            );
          }, {});
        });
      },
      [E],
    ),
    O = (0, f.useCallback)(
      function (e) {
        return Promise.all([
          D(e),
          p.validationSchema ? T(e) : {},
          p.validate ? w(e) : {},
        ]).then(function (e) {
          var t = e[0],
            n = e[1],
            r = e[2];
          return ju.all([t, n, r], { arrayMerge: xg });
        });
      },
      [p.validate, p.validationSchema, D, w, T],
    ),
    k = Tg(function (e) {
      return (
        e === void 0 && (e = S.values),
        C({ type: `SET_ISVALIDATING`, payload: !0 }),
        O(e).then(function (e) {
          return (
            v.current &&
              (C({ type: `SET_ISVALIDATING`, payload: !1 }),
              C({ type: `SET_ERRORS`, payload: e })),
            e
          );
        })
      );
    });
  (0, f.useEffect)(
    function () {
      o &&
        v.current === !0 &&
        (0, Oh.default)(m.current, p.initialValues) &&
        k(m.current);
    },
    [o, k],
  );
  var A = (0, f.useCallback)(
    function (e) {
      var t = e && e.values ? e.values : m.current,
        n =
          e && e.errors
            ? e.errors
            : h.current
              ? h.current
              : p.initialErrors || {},
        r =
          e && e.touched
            ? e.touched
            : g.current
              ? g.current
              : p.initialTouched || {},
        i = e && e.status ? e.status : _.current ? _.current : p.initialStatus;
      ((m.current = t), (h.current = n), (g.current = r), (_.current = i));
      var a = function () {
        C({
          type: `RESET_FORM`,
          payload: {
            isSubmitting: !!e && !!e.isSubmitting,
            errors: n,
            touched: r,
            status: i,
            values: t,
            isValidating: !!e && !!e.isValidating,
            submitCount:
              e && e.submitCount && typeof e.submitCount == `number`
                ? e.submitCount
                : 0,
          },
        });
      };
      if (p.onReset) {
        var o = p.onReset(S.values, ce);
        lg(o) ? o.then(a) : a();
      } else a();
    },
    [p.initialErrors, p.initialStatus, p.initialTouched, p.onReset],
  );
  ((0, f.useEffect)(
    function () {
      v.current === !0 &&
        !(0, Oh.default)(m.current, p.initialValues) &&
        l &&
        ((m.current = p.initialValues), A(), o && k(m.current));
    },
    [l, p.initialValues, A, o, k],
  ),
    (0, f.useEffect)(
      function () {
        l &&
          v.current === !0 &&
          !(0, Oh.default)(h.current, p.initialErrors) &&
          ((h.current = p.initialErrors || mg),
          C({ type: `SET_ERRORS`, payload: p.initialErrors || mg }));
      },
      [l, p.initialErrors],
    ),
    (0, f.useEffect)(
      function () {
        l &&
          v.current === !0 &&
          !(0, Oh.default)(g.current, p.initialTouched) &&
          ((g.current = p.initialTouched || hg),
          C({ type: `SET_TOUCHED`, payload: p.initialTouched || hg }));
      },
      [l, p.initialTouched],
    ),
    (0, f.useEffect)(
      function () {
        l &&
          v.current === !0 &&
          !(0, Oh.default)(_.current, p.initialStatus) &&
          ((_.current = p.initialStatus),
          C({ type: `SET_STATUS`, payload: p.initialStatus }));
      },
      [l, p.initialStatus, p.initialTouched],
    ));
  var j = Tg(function (e) {
      if (y.current[e] && ig(y.current[e].validate)) {
        var t = ug(S.values, e),
          n = y.current[e].validate(t);
        return lg(n)
          ? (C({ type: `SET_ISVALIDATING`, payload: !0 }),
            n
              .then(function (e) {
                return e;
              })
              .then(function (t) {
                (C({
                  type: `SET_FIELD_ERROR`,
                  payload: { field: e, value: t },
                }),
                  C({ type: `SET_ISVALIDATING`, payload: !1 }));
              }))
          : (C({ type: `SET_FIELD_ERROR`, payload: { field: e, value: n } }),
            Promise.resolve(n));
      }
      return p.validationSchema
        ? (C({ type: `SET_ISVALIDATING`, payload: !0 }),
          T(S.values, e)
            .then(function (e) {
              return e;
            })
            .then(function (t) {
              (C({
                type: `SET_FIELD_ERROR`,
                payload: { field: e, value: ug(t, e) },
              }),
                C({ type: `SET_ISVALIDATING`, payload: !1 }));
            }))
        : Promise.resolve();
    }),
    M = (0, f.useCallback)(function (e, t) {
      var n = t.validate;
      y.current[e] = { validate: n };
    }, []),
    N = (0, f.useCallback)(function (e) {
      delete y.current[e];
    }, []),
    P = Tg(function (e, t) {
      return (
        C({ type: `SET_TOUCHED`, payload: e }),
        (t === void 0 ? i : t) ? k(S.values) : Promise.resolve()
      );
    }),
    F = (0, f.useCallback)(function (e) {
      C({ type: `SET_ERRORS`, payload: e });
    }, []),
    ee = Tg(function (e, t) {
      var r = ig(e) ? e(S.values) : e;
      return (
        C({ type: `SET_VALUES`, payload: r }),
        (t === void 0 ? n : t) ? k(r) : Promise.resolve()
      );
    }),
    te = (0, f.useCallback)(function (e, t) {
      C({ type: `SET_FIELD_ERROR`, payload: { field: e, value: t } });
    }, []),
    I = Tg(function (e, t, r) {
      var i = ig(t) ? t(ug(S.values, e)) : t;
      return (
        C({ type: `SET_FIELD_VALUE`, payload: { field: e, value: i } }),
        (r === void 0 ? n : r) ? k(dg(S.values, e, i)) : Promise.resolve()
      );
    }),
    L = (0, f.useCallback)(
      function (e, t) {
        var n = t,
          r = e,
          i;
        if (!sg(e)) {
          e.persist && e.persist();
          var a = e.target ? e.target : e.currentTarget,
            o = a.type,
            s = a.name,
            c = a.id,
            l = a.value,
            u = a.checked;
          a.outerHTML;
          var d = a.options,
            f = a.multiple;
          ((n = t || s || c),
            (r = /number|range/.test(o)
              ? ((i = parseFloat(l)), isNaN(i) ? `` : i)
              : /checkbox/.test(o)
                ? Cg(ug(S.values, n), u, l)
                : d && f
                  ? Sg(d)
                  : l));
        }
        n && I(n, r);
      },
      [I, S.values],
    ),
    R = Tg(function (e) {
      if (sg(e))
        return function (t) {
          return L(t, e);
        };
      L(e);
    }),
    z = Tg(function (e, t, n) {
      return (
        t === void 0 && (t = !0),
        C({ type: `SET_FIELD_TOUCHED`, payload: { field: e, value: t } }),
        (n === void 0 ? i : n) ? k(S.values) : Promise.resolve()
      );
    }),
    ne = (0, f.useCallback)(
      function (e, t) {
        e.persist && e.persist();
        var n = e.target,
          r = n.name,
          i = n.id;
        (n.outerHTML, z(t || r || i, !0));
      },
      [z],
    ),
    re = Tg(function (e) {
      if (sg(e))
        return function (t) {
          return ne(t, e);
        };
      ne(e);
    }),
    ie = (0, f.useCallback)(function (e) {
      ig(e)
        ? C({ type: `SET_FORMIK_STATE`, payload: e })
        : C({
            type: `SET_FORMIK_STATE`,
            payload: function () {
              return e;
            },
          });
    }, []),
    ae = (0, f.useCallback)(function (e) {
      C({ type: `SET_STATUS`, payload: e });
    }, []),
    oe = (0, f.useCallback)(function (e) {
      C({ type: `SET_ISSUBMITTING`, payload: e });
    }, []),
    se = Tg(function () {
      return (
        C({ type: `SUBMIT_ATTEMPT` }),
        k().then(function (e) {
          var t = e instanceof Error;
          if (!t && Object.keys(e).length === 0) {
            var n;
            try {
              if (((n = le()), n === void 0)) return;
            } catch (e) {
              throw e;
            }
            return Promise.resolve(n)
              .then(function (e) {
                return (v.current && C({ type: `SUBMIT_SUCCESS` }), e);
              })
              .catch(function (e) {
                if (v.current) throw (C({ type: `SUBMIT_FAILURE` }), e);
              });
          }
          if (v.current && (C({ type: `SUBMIT_FAILURE` }), t)) throw e;
        })
      );
    }),
    B = Tg(function (e) {
      (e && e.preventDefault && ig(e.preventDefault) && e.preventDefault(),
        e && e.stopPropagation && ig(e.stopPropagation) && e.stopPropagation(),
        se().catch(function (e) {
          console.warn(
            `Warning: An unhandled error was caught from submitForm()`,
            e,
          );
        }));
    }),
    ce = {
      resetForm: A,
      validateForm: k,
      validateField: j,
      setErrors: F,
      setFieldError: te,
      setFieldTouched: z,
      setFieldValue: I,
      setStatus: ae,
      setSubmitting: oe,
      setTouched: P,
      setValues: ee,
      setFormikState: ie,
      submitForm: se,
    },
    le = Tg(function () {
      return u(S.values, ce);
    }),
    ue = Tg(function (e) {
      (e && e.preventDefault && ig(e.preventDefault) && e.preventDefault(),
        e && e.stopPropagation && ig(e.stopPropagation) && e.stopPropagation(),
        A());
    }),
    de = (0, f.useCallback)(
      function (e) {
        return {
          value: ug(S.values, e),
          error: ug(S.errors, e),
          touched: !!ug(S.touched, e),
          initialValue: ug(m.current, e),
          initialTouched: !!ug(g.current, e),
          initialError: ug(h.current, e),
        };
      },
      [S.errors, S.touched, S.values],
    ),
    fe = (0, f.useCallback)(
      function (e) {
        return {
          setValue: function (t, n) {
            return I(e, t, n);
          },
          setTouched: function (t, n) {
            return z(e, t, n);
          },
          setError: function (t) {
            return te(e, t);
          },
        };
      },
      [I, z, te],
    ),
    pe = (0, f.useCallback)(
      function (e) {
        var t = ag(e),
          n = t ? e.name : e,
          r = ug(S.values, n),
          i = { name: n, value: r, onChange: R, onBlur: re };
        if (t) {
          var a = e.type,
            o = e.value,
            s = e.as,
            c = e.multiple;
          a === `checkbox`
            ? o === void 0
              ? (i.checked = !!r)
              : ((i.checked = !!(Array.isArray(r) && ~r.indexOf(o))),
                (i.value = o))
            : a === `radio`
              ? ((i.checked = r === o), (i.value = o))
              : s === `select` &&
                c &&
                ((i.value = i.value || []), (i.multiple = !0));
        }
        return i;
      },
      [re, R, S.values],
    ),
    me = (0, f.useMemo)(
      function () {
        return !(0, Oh.default)(m.current, S.values);
      },
      [m.current, S.values],
    ),
    he = (0, f.useMemo)(
      function () {
        return s === void 0 || me
          ? S.errors && Object.keys(S.errors).length === 0
          : s !== !1 && ig(s)
            ? s(p)
            : s;
      },
      [s, me, S.errors, p],
    );
  return Yh({}, S, {
    initialValues: m.current,
    initialErrors: h.current,
    initialTouched: g.current,
    initialStatus: _.current,
    handleBlur: re,
    handleChange: R,
    handleReset: ue,
    handleSubmit: B,
    resetForm: A,
    setErrors: F,
    setFormikState: ie,
    setFieldTouched: z,
    setFieldValue: I,
    setFieldError: te,
    setStatus: ae,
    setSubmitting: oe,
    setTouched: P,
    setValues: ee,
    submitForm: se,
    validateForm: k,
    validateField: j,
    isValid: he,
    dirty: me,
    unregisterField: N,
    registerField: M,
    getFieldProps: pe,
    getFieldMeta: de,
    getFieldHelpers: fe,
    validateOnBlur: i,
    validateOnChange: n,
    validateOnMount: o,
  });
}
function _g(e) {
  var t = gg(e),
    n = e.component,
    r = e.children,
    i = e.render,
    a = e.innerRef;
  return (
    (0, f.useImperativeHandle)(a, function () {
      return t;
    }),
    (0, f.createElement)(
      eg,
      { value: t },
      n
        ? (0, f.createElement)(n, t)
        : i
          ? i(t)
          : r
            ? ig(r)
              ? r(t)
              : cg(r)
                ? null
                : f.Children.only(r)
            : null,
    )
  );
}
function vg(e) {
  var t = {};
  if (e.inner) {
    if (e.inner.length === 0) return dg(t, e.path, e.message);
    for (
      var n = e.inner,
        r = Array.isArray(n),
        i = 0,
        n = r ? n : n[Symbol.iterator]();
      ;
    ) {
      var a;
      if (r) {
        if (i >= n.length) break;
        a = n[i++];
      } else {
        if (((i = n.next()), i.done)) break;
        a = i.value;
      }
      var o = a;
      ug(t, o.path) || (t = dg(t, o.path, o.message));
    }
  }
  return t;
}
function yg(e, t, n, r) {
  n === void 0 && (n = !1);
  var i = bg(e);
  return t[n ? `validateSync` : `validate`](i, {
    abortEarly: !1,
    context: r || i,
  });
}
function bg(e) {
  var t = Array.isArray(e) ? [] : {};
  for (var n in e)
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      var r = String(n);
      t[r] =
        Array.isArray(e[r]) === !0
          ? e[r].map(function (e) {
              return Array.isArray(e) === !0 || nd(e)
                ? bg(e)
                : e === ``
                  ? void 0
                  : e;
            })
          : nd(e[r])
            ? bg(e[r])
            : e[r] === ``
              ? void 0
              : e[r];
    }
  return t;
}
function xg(e, t, n) {
  var r = e.slice();
  return (
    t.forEach(function (t, i) {
      r[i] === void 0
        ? (r[i] =
            n.clone !== !1 && n.isMergeableObject(t)
              ? ju(Array.isArray(t) ? [] : {}, t, n)
              : t)
        : n.isMergeableObject(t)
          ? (r[i] = ju(e[i], t, n))
          : e.indexOf(t) === -1 && r.push(t);
    }),
    r
  );
}
function Sg(e) {
  return Array.from(e)
    .filter(function (e) {
      return e.selected;
    })
    .map(function (e) {
      return e.value;
    });
}
function Cg(e, t, n) {
  if (typeof e == `boolean`) return !!t;
  var r = [],
    i = !1,
    a = -1;
  if (Array.isArray(e)) ((r = e), (a = e.indexOf(n)), (i = a >= 0));
  else if (!n || n == `true` || n == `false`) return !!t;
  return t && n && !i
    ? r.concat(n)
    : i
      ? r.slice(0, a).concat(r.slice(a + 1))
      : r;
}
var wg =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0
    ? f.useLayoutEffect
    : f.useEffect;
function Tg(e) {
  var t = (0, f.useRef)(e);
  return (
    wg(function () {
      t.current = e;
    }),
    (0, f.useCallback)(function () {
      var e = [...arguments];
      return t.current.apply(void 0, e);
    }, [])
  );
}
function Eg(e) {
  var t = ng(),
    n = t.getFieldProps,
    r = t.getFieldMeta,
    i = t.getFieldHelpers,
    a = t.registerField,
    o = t.unregisterField,
    s = ag(e) ? e : { name: e },
    c = s.name,
    l = s.validate;
  (0, f.useEffect)(
    function () {
      return (
        c && a(c, { validate: l }),
        function () {
          c && o(c);
        }
      );
    },
    [a, o, c, l],
  );
  var u = (0, f.useMemo)(
    function () {
      return i(c);
    },
    [i, c],
  );
  return [n(s), r(c), u];
}
var Dg = (0, f.forwardRef)(function (e, t) {
  var n = e.action,
    r = Zh(e, [`action`]),
    i = n ?? `#`,
    a = ng(),
    o = a.handleReset,
    s = a.handleSubmit;
  return (0, f.createElement)(
    `form`,
    Yh({ onSubmit: s, ref: t, onReset: o, action: i }, r),
  );
});
Dg.displayName = `Form`;
function Og(e) {
  var t = function (t) {
      return (0, f.createElement)(tg, null, function (n) {
        return (0, f.createElement)(e, Yh({}, t, { formik: n }));
      });
    },
    n =
      e.displayName ||
      e.name ||
      (e.constructor && e.constructor.name) ||
      `Component`;
  return (
    (t.WrappedComponent = e),
    (t.displayName = `FormikConnect(` + n + `)`),
    (0, mn.default)(t, e)
  );
}
var kg = function (e, t, n) {
    var r = Ng(e),
      i = r[t];
    return (r.splice(t, 1), r.splice(n, 0, i), r);
  },
  Ag = function (e, t, n) {
    var r = Ng(e),
      i = r[t];
    return ((r[t] = r[n]), (r[n] = i), r);
  },
  jg = function (e, t, n) {
    var r = Ng(e);
    return (r.splice(t, 0, n), r);
  },
  Mg = function (e, t, n) {
    var r = Ng(e);
    return ((r[t] = n), r);
  },
  Ng = function (e) {
    if (!e) return [];
    if (Array.isArray(e)) return [].concat(e);
    var t = Object.keys(e)
      .map(function (e) {
        return parseInt(e);
      })
      .reduce(function (e, t) {
        return t > e ? t : e;
      }, 0);
    return Array.from(Yh({}, e, { length: t + 1 }));
  },
  Pg = function (e, t) {
    var n = typeof e == `function` ? e : t;
    return function (e) {
      return Array.isArray(e) || ag(e) ? n(Ng(e)) : e;
    };
  },
  Fg = (function (e) {
    Xh(t, e);
    function t(t) {
      var n = e.call(this, t) || this;
      return (
        (n.updateArrayField = function (e, t, r) {
          var i = n.props,
            a = i.name,
            o = i.formik.setFormikState;
          o(function (n) {
            var i = Pg(r, e),
              o = Pg(t, e),
              s = dg(n.values, a, e(ug(n.values, a))),
              c = r ? i(ug(n.errors, a)) : void 0,
              l = t ? o(ug(n.touched, a)) : void 0;
            return (
              rg(c) && (c = void 0),
              rg(l) && (l = void 0),
              Yh({}, n, {
                values: s,
                errors: r ? dg(n.errors, a, c) : n.errors,
                touched: t ? dg(n.touched, a, l) : n.touched,
              })
            );
          });
        }),
        (n.push = function (e) {
          return n.updateArrayField(
            function (t) {
              return [].concat(Ng(t), [Dh(e)]);
            },
            !1,
            !1,
          );
        }),
        (n.handlePush = function (e) {
          return function () {
            return n.push(e);
          };
        }),
        (n.swap = function (e, t) {
          return n.updateArrayField(
            function (n) {
              return Ag(n, e, t);
            },
            !0,
            !0,
          );
        }),
        (n.handleSwap = function (e, t) {
          return function () {
            return n.swap(e, t);
          };
        }),
        (n.move = function (e, t) {
          return n.updateArrayField(
            function (n) {
              return kg(n, e, t);
            },
            !0,
            !0,
          );
        }),
        (n.handleMove = function (e, t) {
          return function () {
            return n.move(e, t);
          };
        }),
        (n.insert = function (e, t) {
          return n.updateArrayField(
            function (n) {
              return jg(n, e, t);
            },
            function (t) {
              return jg(t, e, null);
            },
            function (t) {
              return jg(t, e, null);
            },
          );
        }),
        (n.handleInsert = function (e, t) {
          return function () {
            return n.insert(e, t);
          };
        }),
        (n.replace = function (e, t) {
          return n.updateArrayField(
            function (n) {
              return Mg(n, e, t);
            },
            !1,
            !1,
          );
        }),
        (n.handleReplace = function (e, t) {
          return function () {
            return n.replace(e, t);
          };
        }),
        (n.unshift = function (e) {
          var t = -1;
          return (
            n.updateArrayField(
              function (n) {
                var r = n ? [e].concat(n) : [e];
                return ((t = r.length), r);
              },
              function (e) {
                return e ? [null].concat(e) : [null];
              },
              function (e) {
                return e ? [null].concat(e) : [null];
              },
            ),
            t
          );
        }),
        (n.handleUnshift = function (e) {
          return function () {
            return n.unshift(e);
          };
        }),
        (n.handleRemove = function (e) {
          return function () {
            return n.remove(e);
          };
        }),
        (n.handlePop = function () {
          return function () {
            return n.pop();
          };
        }),
        (n.remove = n.remove.bind(Qh(n))),
        (n.pop = n.pop.bind(Qh(n))),
        n
      );
    }
    var n = t.prototype;
    return (
      (n.componentDidUpdate = function (e) {
        this.props.validateOnChange &&
          this.props.formik.validateOnChange &&
          !(0, Oh.default)(
            ug(e.formik.values, e.name),
            ug(this.props.formik.values, this.props.name),
          ) &&
          this.props.formik.validateForm(this.props.formik.values);
      }),
      (n.remove = function (e) {
        var t;
        return (
          this.updateArrayField(
            function (n) {
              var r = n ? Ng(n) : [];
              return (
                (t ||= r[e]),
                ig(r.splice) && r.splice(e, 1),
                ig(r.every) &&
                r.every(function (e) {
                  return e === void 0;
                })
                  ? []
                  : r
              );
            },
            !0,
            !0,
          ),
          t
        );
      }),
      (n.pop = function () {
        var e;
        return (
          this.updateArrayField(
            function (t) {
              var n = t.slice();
              return ((e ||= n && n.pop && n.pop()), n);
            },
            !0,
            !0,
          ),
          e
        );
      }),
      (n.render = function () {
        var e = {
            push: this.push,
            pop: this.pop,
            swap: this.swap,
            move: this.move,
            insert: this.insert,
            replace: this.replace,
            unshift: this.unshift,
            remove: this.remove,
            handlePush: this.handlePush,
            handlePop: this.handlePop,
            handleSwap: this.handleSwap,
            handleMove: this.handleMove,
            handleInsert: this.handleInsert,
            handleReplace: this.handleReplace,
            handleUnshift: this.handleUnshift,
            handleRemove: this.handleRemove,
          },
          t = this.props,
          n = t.component,
          r = t.render,
          i = t.children,
          a = t.name,
          o = t.formik,
          s = Zh(o, [`validate`, `validationSchema`]),
          c = Yh({}, e, { form: s, name: a });
        return n
          ? (0, f.createElement)(n, c)
          : r
            ? r(c)
            : i
              ? typeof i == `function`
                ? i(c)
                : cg(i)
                  ? null
                  : f.Children.only(i)
              : null;
      }),
      t
    );
  })(f.Component);
Fg.defaultProps = { validateOnChange: !0 };
var Ig = Og(
    (function (e) {
      Xh(t, e);
      function t() {
        return e.apply(this, arguments) || this;
      }
      var n = t.prototype;
      return (
        (n.shouldComponentUpdate = function (e) {
          return (
            ug(this.props.formik.errors, this.props.name) !==
              ug(e.formik.errors, this.props.name) ||
            ug(this.props.formik.touched, this.props.name) !==
              ug(e.formik.touched, this.props.name) ||
            Object.keys(this.props).length !== Object.keys(e).length
          );
        }),
        (n.render = function () {
          var e = this.props,
            t = e.component,
            n = e.formik,
            r = e.render,
            i = e.children,
            a = e.name,
            o = Zh(e, [`component`, `formik`, `render`, `children`, `name`]),
            s = ug(n.touched, a),
            c = ug(n.errors, a);
          return s && c
            ? r
              ? ig(r)
                ? r(c)
                : null
              : i
                ? ig(i)
                  ? i(c)
                  : null
                : t
                  ? (0, f.createElement)(t, o, c)
                  : c
            : null;
        }),
        t
      );
    })(f.Component),
  ),
  Lg = ({ label: e, ...t }) => {
    let [n, r] = Eg(t);
    return (0, q.jsxs)(`div`, {
      className: `form-field`,
      children: [
        (0, q.jsx)(`input`, {
          id: n.name,
          placeholder: e,
          required: !0,
          ...t,
          ...n,
        }),
        r.touched &&
          r.error &&
          (0, q.jsx)(Ig, {
            component: `p`,
            name: n.name,
            className: `error-message`,
          }),
      ],
    });
  },
  Rg = `/assets/google-signin-BaaBHchA.png`,
  zg = async (e, t) => {
    try {
      return (await $.post(`/auth/login`, { usernameOrEmail: e, password: t }))
        .data;
    } catch (e) {
      return {
        success: !1,
        message: e.response?.data?.message || `Login failed`,
      };
    }
  },
  Bg = async (e) => {
    try {
      return (await $.post(`/auth/register`, e)).data;
    } catch (e) {
      return {
        success: !1,
        message: e.response?.data?.message || `Registration failed`,
      };
    }
  },
  Vg = async () => {
    try {
      return (await $.get(`/auth/me`)).data;
    } catch (e) {
      return {
        success: !1,
        message: e.response?.data?.message || `Failed to get user`,
      };
    }
  },
  Hg = async () => {
    try {
      return (await $.post(`/auth/logout`)).data;
    } catch (e) {
      return {
        success: !1,
        message: e.response?.data?.message || `Logout failed`,
      };
    }
  },
  Ug = ({ onSignUp: e }) => {
    let t = Cn();
    return (0, q.jsx)(_g, {
      initialValues: { usernameOrEmail: ``, password: `` },
      onSubmit: async (e, { setSubmitting: n, setStatus: r }) => {
        try {
          r(``);
          let n = await zg(e.usernameOrEmail, e.password);
          if (!n.success) {
            (console.log(`error: `, n.success), r(n.message));
            return;
          }
          t(Ft(n.user));
        } finally {
          n(!1);
        }
      },
      children: ({ isSubmitting: t, status: n }) =>
        (0, q.jsxs)(Dg, {
          className: `auth-form`,
          children: [
            (0, q.jsxs)(`div`, {
              className: `text-center mb-4`,
              children: [
                (0, q.jsx)(`span`, {
                  className: `form-eyebrow`,
                  children: `WELCOME BACK`,
                }),
                (0, q.jsx)(`h2`, {
                  className: `form-title`,
                  children: `Sign in`,
                }),
                (0, q.jsx)(`p`, {
                  className: `form-description`,
                  children: `Sign in to continue to your RevBot account.`,
                }),
              ],
            }),
            (0, q.jsxs)(`div`, {
              className: `d-grid gap-3`,
              children: [
                (0, q.jsx)(Lg, {
                  type: `text`,
                  name: `usernameOrEmail`,
                  label: `Username or Email`,
                }),
                (0, q.jsx)(Lg, {
                  type: `password`,
                  name: `password`,
                  label: `Password`,
                }),
                (0, q.jsx)(`div`, {
                  className: `text-end`,
                  children: (0, q.jsx)(`a`, {
                    href: `http://localhost:5173/auth/forgotPass`,
                    className: `auth-link`,
                    children: `Forgot password?`,
                  }),
                }),
                n &&
                  (0, q.jsx)(`p`, {
                    className: `error-message text-center mb-0`,
                    children: n,
                  }),
                (0, q.jsx)(`button`, {
                  className: `btn btn-primary auth-submit`,
                  type: `submit`,
                  disabled: t,
                  children: t ? `Logging in...` : `Login`,
                }),
                (0, q.jsx)(`div`, {
                  className: `auth-divider`,
                  children: (0, q.jsx)(`span`, { children: `OR` }),
                }),
                (0, q.jsxs)(`a`, {
                  href: `http://localhost:5173/auth/google`,
                  className: `google-button`,
                  children: [
                    (0, q.jsx)(`img`, { src: Rg, alt: `` }),
                    (0, q.jsx)(`span`, { children: `Continue with Google` }),
                  ],
                }),
                (0, q.jsxs)(`p`, {
                  className: `auth-switch text-center mb-0`,
                  children: [
                    `Don't have an account?`,
                    ` `,
                    (0, q.jsx)(`button`, {
                      type: `button`,
                      className: `auth-link-button`,
                      disabled: t,
                      onClick: e,
                      children: `Sign up`,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    });
  },
  Wg = o((e, t) => {
    function n(e) {
      ((this._maxSize = e), this.clear());
    }
    ((n.prototype.clear = function () {
      ((this._size = 0), (this._values = Object.create(null)));
    }),
      (n.prototype.get = function (e) {
        return this._values[e];
      }),
      (n.prototype.set = function (e, t) {
        return (
          this._size >= this._maxSize && this.clear(),
          e in this._values || this._size++,
          (this._values[e] = t)
        );
      }));
    var r = /[^.^\]^[]+|(?=\[\]|\.\.)/g,
      i = /^\d+$/,
      a = /^\d/,
      o = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,
      s = /^\s*(['"]?)(.*?)(\1)\s*$/,
      c = 512,
      l = new n(c),
      u = new n(c),
      d = new n(c);
    t.exports = {
      Cache: n,
      split: p,
      normalizePath: f,
      setter: function (e) {
        var t = f(e);
        return (
          u.get(e) ||
          u.set(e, function (e, n) {
            for (var r = 0, i = t.length, a = e; r < i - 1;) {
              var o = t[r];
              if (o === `__proto__` || o === `constructor` || o === `prototype`)
                return e;
              a = a[t[r++]];
            }
            a[t[r]] = n;
          })
        );
      },
      getter: function (e, t) {
        var n = f(e);
        return (
          d.get(e) ||
          d.set(e, function (e) {
            for (var r = 0, i = n.length; r < i;)
              if (e != null || !t) e = e[n[r++]];
              else return;
            return e;
          })
        );
      },
      join: function (e) {
        return e.reduce(function (e, t) {
          return e + (h(t) || i.test(t) ? `[` + t + `]` : (e ? `.` : ``) + t);
        }, ``);
      },
      forEach: function (e, t, n) {
        m(Array.isArray(e) ? e : p(e), t, n);
      },
    };
    function f(e) {
      return (
        l.get(e) ||
        l.set(
          e,
          p(e).map(function (e) {
            return e.replace(s, `$2`);
          }),
        )
      );
    }
    function p(e) {
      return e.match(r) || [``];
    }
    function m(e, t, n) {
      var r = e.length,
        i,
        a,
        o,
        s;
      for (a = 0; a < r; a++)
        ((i = e[a]),
          i &&
            (v(i) && (i = `"` + i + `"`),
            (s = h(i)),
            (o = !s && /^\d+$/.test(i)),
            t.call(n, i, s, o, a, e)));
    }
    function h(e) {
      return (
        typeof e == `string` && e && [`'`, `"`].indexOf(e.charAt(0)) !== -1
      );
    }
    function g(e) {
      return e.match(a) && !e.match(i);
    }
    function _(e) {
      return o.test(e);
    }
    function v(e) {
      return !h(e) && (g(e) || _(e));
    }
  }),
  Gg = o((e, t) => {
    var n =
        /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,
      r = (e) => e.match(n) || [],
      i = (e) => e[0].toUpperCase() + e.slice(1),
      a = (e, t) => r(e).join(t).toLowerCase(),
      o = (e) =>
        r(e).reduce(
          (e, t) =>
            `${e}${e ? t[0].toUpperCase() + t.slice(1).toLowerCase() : t.toLowerCase()}`,
          ``,
        );
    t.exports = {
      words: r,
      upperFirst: i,
      camelCase: o,
      pascalCase: (e) => i(o(e)),
      snakeCase: (e) => a(e, `_`),
      kebabCase: (e) => a(e, `-`),
      sentenceCase: (e) => i(a(e, ` `)),
      titleCase: (e) => r(e).map(i).join(` `),
    };
  }),
  Kg = o((e, t) => {
    ((t.exports = function (e) {
      return n(r(e), e);
    }),
      (t.exports.array = n));
    function n(e, t) {
      var n = e.length,
        r = Array(n),
        o = {},
        s = n,
        c = i(t),
        l = a(e);
      for (
        t.forEach(function (e) {
          if (!l.has(e[0]) || !l.has(e[1]))
            throw Error(
              `Unknown node. There is an unknown node in the supplied edges.`,
            );
        });
        s--;
      )
        o[s] || u(e[s], s, new Set());
      return r;
      function u(e, t, i) {
        if (i.has(e)) {
          var a;
          try {
            a = `, node was:` + JSON.stringify(e);
          } catch {
            a = ``;
          }
          throw Error(`Cyclic dependency` + a);
        }
        if (!l.has(e))
          throw Error(
            `Found unknown node. Make sure to provided all involved nodes. Unknown node: ` +
              JSON.stringify(e),
          );
        if (!o[t]) {
          o[t] = !0;
          var s = c.get(e) || new Set();
          if (((s = Array.from(s)), (t = s.length))) {
            i.add(e);
            do {
              var d = s[--t];
              u(d, l.get(d), i);
            } while (t);
            i.delete(e);
          }
          r[--n] = e;
        }
      }
    }
    function r(e) {
      for (var t = new Set(), n = 0, r = e.length; n < r; n++) {
        var i = e[n];
        (t.add(i[0]), t.add(i[1]));
      }
      return Array.from(t);
    }
    function i(e) {
      for (var t = new Map(), n = 0, r = e.length; n < r; n++) {
        var i = e[n];
        (t.has(i[0]) || t.set(i[0], new Set()),
          t.has(i[1]) || t.set(i[1], new Set()),
          t.get(i[0]).add(i[1]));
      }
      return t;
    }
    function a(e) {
      for (var t = new Map(), n = 0, r = e.length; n < r; n++) t.set(e[n], n);
      return t;
    }
  }),
  qg = Wg(),
  Jg = Gg(),
  Yg = l(Kg()),
  Xg = Object.prototype.toString,
  Zg = Error.prototype.toString,
  Qg = RegExp.prototype.toString,
  $g = typeof Symbol < `u` ? Symbol.prototype.toString : () => ``,
  e_ = /^Symbol\((.*)\)(.*)$/;
function t_(e) {
  return e == +e ? (e === 0 && 1 / e < 0 ? `-0` : `` + e) : `NaN`;
}
function n_(e, t = !1) {
  if (e == null || e === !0 || e === !1) return `` + e;
  let n = typeof e;
  if (n === `number`) return t_(e);
  if (n === `string`) return t ? `"${e}"` : e;
  if (n === `function`) return `[Function ` + (e.name || `anonymous`) + `]`;
  if (n === `symbol`) return $g.call(e).replace(e_, `Symbol($1)`);
  let r = Xg.call(e).slice(8, -1);
  return r === `Date`
    ? isNaN(e.getTime())
      ? `` + e
      : e.toISOString(e)
    : r === `Error` || e instanceof Error
      ? `[` + Zg.call(e) + `]`
      : r === `RegExp`
        ? Qg.call(e)
        : null;
}
function r_(e, t) {
  let n = n_(e, t);
  return n === null
    ? JSON.stringify(
        e,
        function (e, n) {
          let r = n_(this[e], t);
          return r === null ? n : r;
        },
        2,
      )
    : n;
}
function i_(e) {
  return e == null ? [] : [].concat(e);
}
var a_,
  o_,
  s_,
  c_ = /\$\{\s*(\w+)\s*\}/g;
a_ = Symbol.toStringTag;
var l_ = class {
  constructor(e, t, n, r) {
    ((this.name = void 0),
      (this.message = void 0),
      (this.value = void 0),
      (this.path = void 0),
      (this.type = void 0),
      (this.params = void 0),
      (this.errors = void 0),
      (this.inner = void 0),
      (this[a_] = `Error`),
      (this.name = `ValidationError`),
      (this.value = t),
      (this.path = n),
      (this.type = r),
      (this.errors = []),
      (this.inner = []),
      i_(e).forEach((e) => {
        if (u_.isError(e)) {
          this.errors.push(...e.errors);
          let t = e.inner.length ? e.inner : [e];
          this.inner.push(...t);
        } else this.errors.push(e);
      }),
      (this.message =
        this.errors.length > 1
          ? `${this.errors.length} errors occurred`
          : this.errors[0]));
  }
};
((o_ = Symbol.hasInstance), (s_ = Symbol.toStringTag));
var u_ = class e extends Error {
    static formatError(e, t) {
      let n = t.label || t.path || `this`;
      return (
        (t = Object.assign({}, t, { path: n, originalPath: t.path })),
        typeof e == `string`
          ? e.replace(c_, (e, n) => r_(t[n]))
          : typeof e == `function`
            ? e(t)
            : e
      );
    }
    static isError(e) {
      return e && e.name === `ValidationError`;
    }
    constructor(t, n, r, i, a) {
      let o = new l_(t, n, r, i);
      if (a) return o;
      (super(),
        (this.value = void 0),
        (this.path = void 0),
        (this.type = void 0),
        (this.params = void 0),
        (this.errors = []),
        (this.inner = []),
        (this[s_] = `Error`),
        (this.name = o.name),
        (this.message = o.message),
        (this.type = o.type),
        (this.value = o.value),
        (this.path = o.path),
        (this.errors = o.errors),
        (this.inner = o.inner),
        Error.captureStackTrace && Error.captureStackTrace(this, e));
    }
    static [o_](e) {
      return l_[Symbol.hasInstance](e) || super[Symbol.hasInstance](e);
    }
  },
  d_ = {
    default: "${path} is invalid",
    required: "${path} is a required field",
    defined: "${path} must be defined",
    notNull: "${path} cannot be null",
    oneOf: "${path} must be one of the following values: ${values}",
    notOneOf: "${path} must not be one of the following values: ${values}",
    notType: ({ path: e, type: t, value: n, originalValue: r }) => {
      let i =
        r != null && r !== n ? ` (cast from the value \`${r_(r, !0)}\`).` : `.`;
      return t === `mixed`
        ? `${e} must match the configured type. The validated value was: \`${r_(n, !0)}\`` +
            i
        : `${e} must be a \`${t}\` type, but the final value was: \`${r_(n, !0)}\`` +
            i;
    },
  },
  f_ = {
    length: "${path} must be exactly ${length} characters",
    min: "${path} must be at least ${min} characters",
    max: "${path} must be at most ${max} characters",
    matches: '${path} must match the following: "${regex}"',
    email: "${path} must be a valid email",
    url: "${path} must be a valid URL",
    uuid: "${path} must be a valid UUID",
    datetime: "${path} must be a valid ISO date-time",
    datetime_precision:
      "${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits",
    datetime_offset:
      '${path} must be a valid ISO date-time with UTC "Z" timezone',
    trim: "${path} must be a trimmed string",
    lowercase: "${path} must be a lowercase string",
    uppercase: "${path} must be a upper case string",
  },
  p_ = {
    min: "${path} must be greater than or equal to ${min}",
    max: "${path} must be less than or equal to ${max}",
    lessThan: "${path} must be less than ${less}",
    moreThan: "${path} must be greater than ${more}",
    positive: "${path} must be a positive number",
    negative: "${path} must be a negative number",
    integer: "${path} must be an integer",
  },
  m_ = {
    min: "${path} field must be later than ${min}",
    max: "${path} field must be at earlier than ${max}",
  },
  h_ = { isValue: "${path} field must be ${value}" },
  g_ = {
    noUnknown: "${path} field has unspecified keys: ${unknown}",
    exact: "${path} object contains unknown properties: ${properties}",
  },
  __ = {
    min: "${path} field must have at least ${min} items",
    max: "${path} field must have less than or equal to ${max} items",
    length: "${path} must have ${length} items",
  },
  v_ = {
    notType: (e) => {
      let { path: t, value: n, spec: r } = e,
        i = r.types.length;
      if (Array.isArray(n)) {
        if (n.length < i)
          return `${t} tuple value has too few items, expected a length of ${i} but got ${n.length} for value: \`${r_(n, !0)}\``;
        if (n.length > i)
          return `${t} tuple value has too many items, expected a length of ${i} but got ${n.length} for value: \`${r_(n, !0)}\``;
      }
      return u_.formatError(d_.notType, e);
    },
  };
Object.assign(Object.create(null), {
  mixed: d_,
  string: f_,
  number: p_,
  date: m_,
  object: g_,
  array: __,
  boolean: h_,
  tuple: v_,
});
var y_ = (e) => e && e.__isYupSchema__,
  b_ = class e {
    static fromOptions(t, n) {
      if (!n.then && !n.otherwise)
        throw TypeError(
          "either `then:` or `otherwise:` is required for `when()` conditions",
        );
      let { is: r, then: i, otherwise: a } = n,
        o = typeof r == `function` ? r : (...e) => e.every((e) => e === r);
      return new e(t, (e, t) => (o(...e) ? i : a)?.(t) ?? t);
    }
    constructor(e, t) {
      ((this.fn = void 0), (this.refs = e), (this.refs = e), (this.fn = t));
    }
    resolve(e, t) {
      let n = this.refs.map((e) => e.getValue(t?.value, t?.parent, t?.context)),
        r = this.fn(n, e, t);
      if (r === void 0 || r === e) return e;
      if (!y_(r)) throw TypeError(`conditions must return a schema object`);
      return r.resolve(t);
    }
  },
  x_ = { context: `$`, value: `.` };
function S_(e, t) {
  return new C_(e, t);
}
var C_ = class {
  constructor(e, t = {}) {
    if (
      ((this.key = void 0),
      (this.isContext = void 0),
      (this.isValue = void 0),
      (this.isSibling = void 0),
      (this.path = void 0),
      (this.getter = void 0),
      (this.map = void 0),
      typeof e != `string`)
    )
      throw TypeError(`ref must be a string, got: ` + e);
    if (((this.key = e.trim()), e === ``))
      throw TypeError(`ref must be a non-empty string`);
    ((this.isContext = this.key[0] === x_.context),
      (this.isValue = this.key[0] === x_.value),
      (this.isSibling = !this.isContext && !this.isValue));
    let n = this.isContext ? x_.context : this.isValue ? x_.value : ``;
    ((this.path = this.key.slice(n.length)),
      (this.getter = this.path && (0, qg.getter)(this.path, !0)),
      (this.map = t.map));
  }
  getValue(e, t, n) {
    let r = this.isContext ? n : this.isValue ? e : t;
    return (
      this.getter && (r = this.getter(r || {})),
      this.map && (r = this.map(r)),
      r
    );
  }
  cast(e, t) {
    return this.getValue(e, t?.parent, t?.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return { type: `ref`, key: this.key };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(e) {
    return e && e.__isYupRef;
  }
};
C_.prototype.__isYupRef = !0;
var w_ = (e) => e == null;
function T_(e) {
  function t(
    { value: t, path: n = ``, options: r, originalValue: i, schema: a },
    o,
    s,
  ) {
    let { name: c, test: l, params: u, message: d, skipAbsent: f } = e,
      {
        parent: p,
        context: m,
        abortEarly: h = a.spec.abortEarly,
        disableStackTrace: g = a.spec.disableStackTrace,
      } = r,
      _ = { value: t, parent: p, context: m };
    function v(e = {}) {
      let r = E_(
          Object.assign(
            {
              value: t,
              originalValue: i,
              label: a.spec.label,
              path: e.path || n,
              spec: a.spec,
              disableStackTrace: e.disableStackTrace || g,
            },
            u,
            e.params,
          ),
          _,
        ),
        o = new u_(
          u_.formatError(e.message || d, r),
          t,
          r.path,
          e.type || c,
          r.disableStackTrace,
        );
      return ((o.params = r), o);
    }
    let y = h ? o : s,
      b = {
        path: n,
        parent: p,
        type: c,
        from: r.from,
        createError: v,
        resolve(e) {
          return D_(e, _);
        },
        options: r,
        originalValue: i,
        schema: a,
      },
      x = (e) => {
        u_.isError(e) ? y(e) : e ? s(null) : y(v());
      },
      S = (e) => {
        u_.isError(e) ? y(e) : o(e);
      };
    if (f && w_(t)) return x(!0);
    let C;
    try {
      if (((C = l.call(b, t, b)), typeof C?.then == `function`)) {
        if (r.sync)
          throw Error(
            `Validation test of type: "${b.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`,
          );
        return Promise.resolve(C).then(x, S);
      }
    } catch (e) {
      S(e);
      return;
    }
    x(C);
  }
  return ((t.OPTIONS = e), t);
}
function E_(e, t) {
  if (!e) return e;
  for (let n of Object.keys(e)) e[n] = D_(e[n], t);
  return e;
}
function D_(e, t) {
  return C_.isRef(e) ? e.getValue(t.value, t.parent, t.context) : e;
}
function O_(e, t, n, r = n) {
  let i, a, o;
  return t
    ? ((0, qg.forEach)(t, (s, c, l) => {
        let u = c ? s.slice(1, s.length - 1) : s;
        e = e.resolve({ context: r, parent: i, value: n });
        let d = e.type === `tuple`,
          f = l ? parseInt(u, 10) : 0;
        if (e.innerType || d) {
          if (d && !l)
            throw Error(
              `Yup.reach cannot implicitly index into a tuple type. the path part "${o}" must contain an index to the tuple element, e.g. "${o}[0]"`,
            );
          if (n && f >= n.length)
            throw Error(
              `Yup.reach cannot resolve an array item at index: ${s}, in the path: ${t}. because there is no value at that index. `,
            );
          ((i = n), (n &&= n[f]), (e = d ? e.spec.types[f] : e.innerType));
        }
        if (!l) {
          if (!e.fields || !e.fields[u])
            throw Error(
              `The schema does not contain the path: ${t}. (failed at: ${o} which is a type: "${e.type}")`,
            );
          ((i = n), (n &&= n[u]), (e = e.fields[u]));
        }
        ((a = u), (o = c ? `[` + s + `]` : `.` + s));
      }),
      { schema: e, parent: i, parentPath: a })
    : { parent: i, parentPath: t, schema: e };
}
var k_ = class e extends Set {
  describe() {
    let e = [];
    for (let t of this.values()) e.push(C_.isRef(t) ? t.describe() : t);
    return e;
  }
  resolveAll(e) {
    let t = [];
    for (let n of this.values()) t.push(e(n));
    return t;
  }
  clone() {
    return new e(this.values());
  }
  merge(e, t) {
    let n = this.clone();
    return (e.forEach((e) => n.add(e)), t.forEach((e) => n.delete(e)), n);
  }
};
function A_(e, t = new Map()) {
  if (y_(e) || !e || typeof e != `object`) return e;
  if (t.has(e)) return t.get(e);
  let n;
  if (e instanceof Date) ((n = new Date(e.getTime())), t.set(e, n));
  else if (e instanceof RegExp) ((n = new RegExp(e)), t.set(e, n));
  else if (Array.isArray(e)) {
    ((n = Array(e.length)), t.set(e, n));
    for (let r = 0; r < e.length; r++) n[r] = A_(e[r], t);
  } else if (e instanceof Map) {
    ((n = new Map()), t.set(e, n));
    for (let [r, i] of e.entries()) n.set(r, A_(i, t));
  } else if (e instanceof Set) {
    ((n = new Set()), t.set(e, n));
    for (let r of e) n.add(A_(r, t));
  } else if (e instanceof Object) {
    ((n = {}), t.set(e, n));
    for (let [r, i] of Object.entries(e)) n[r] = A_(i, t);
  } else throw Error(`Unable to clone ${e}`);
  return n;
}
function j_(e) {
  if (!(e != null && e.length)) return;
  let t = [],
    n = ``,
    r = !1,
    i = !1;
  for (let a = 0; a < e.length; a++) {
    let o = e[a];
    if (o === `[` && !i) {
      ((n &&= (t.push(...n.split(`.`).filter(Boolean)), ``)), (r = !0));
      continue;
    }
    if (o === `]` && !i) {
      ((n &&=
        (/^\d+$/.test(n) ? t.push(n) : t.push(n.replace(/^"|"$/g, ``)), ``)),
        (r = !1));
      continue;
    }
    if (o === `"`) {
      i = !i;
      continue;
    }
    if (o === `.` && !r && !i) {
      n &&= (t.push(n), ``);
      continue;
    }
    n += o;
  }
  return (n && t.push(...n.split(`.`).filter(Boolean)), t);
}
function M_(e, t) {
  let n = t ? `${t}.${e.path}` : e.path;
  return e.errors.map((e) => ({ message: e, path: j_(n) }));
}
function N_(e, t) {
  var n;
  if (!((n = e.inner) != null && n.length) && e.errors.length) return M_(e, t);
  let r = t ? `${t}.${e.path}` : e.path;
  return e.inner.flatMap((e) => N_(e, r));
}
var P_ = class {
  constructor(e) {
    ((this.type = void 0),
      (this.deps = []),
      (this.tests = void 0),
      (this.transforms = void 0),
      (this.conditions = []),
      (this._mutate = void 0),
      (this.internalTests = {}),
      (this._whitelist = new k_()),
      (this._blacklist = new k_()),
      (this.exclusiveTests = Object.create(null)),
      (this._typeCheck = void 0),
      (this.spec = void 0),
      (this.tests = []),
      (this.transforms = []),
      this.withMutation(() => {
        this.typeError(d_.notType);
      }),
      (this.type = e.type),
      (this._typeCheck = e.check),
      (this.spec = Object.assign(
        {
          strip: !1,
          strict: !1,
          abortEarly: !0,
          recursive: !0,
          disableStackTrace: !1,
          nullable: !1,
          optional: !0,
          coerce: !0,
        },
        e?.spec,
      )),
      this.withMutation((e) => {
        e.nonNullable();
      }));
  }
  get _type() {
    return this.type;
  }
  clone(e) {
    if (this._mutate) return (e && Object.assign(this.spec, e), this);
    let t = Object.create(Object.getPrototypeOf(this));
    return (
      (t.type = this.type),
      (t._typeCheck = this._typeCheck),
      (t._whitelist = this._whitelist.clone()),
      (t._blacklist = this._blacklist.clone()),
      (t.internalTests = Object.assign({}, this.internalTests)),
      (t.exclusiveTests = Object.assign({}, this.exclusiveTests)),
      (t.deps = [...this.deps]),
      (t.conditions = [...this.conditions]),
      (t.tests = [...this.tests]),
      (t.transforms = [...this.transforms]),
      (t.spec = A_(Object.assign({}, this.spec, e))),
      t
    );
  }
  label(e) {
    let t = this.clone();
    return ((t.spec.label = e), t);
  }
  meta(...e) {
    if (e.length === 0) return this.spec.meta;
    let t = this.clone();
    return ((t.spec.meta = Object.assign(t.spec.meta || {}, e[0])), t);
  }
  withMutation(e) {
    let t = this._mutate;
    this._mutate = !0;
    let n = e(this);
    return ((this._mutate = t), n);
  }
  concat(e) {
    if (!e || e === this) return this;
    if (e.type !== this.type && this.type !== `mixed`)
      throw TypeError(
        `You cannot \`concat()\` schema's of different types: ${this.type} and ${e.type}`,
      );
    let t = this,
      n = e.clone();
    return (
      (n.spec = Object.assign({}, t.spec, n.spec)),
      (n.internalTests = Object.assign({}, t.internalTests, n.internalTests)),
      (n._whitelist = t._whitelist.merge(e._whitelist, e._blacklist)),
      (n._blacklist = t._blacklist.merge(e._blacklist, e._whitelist)),
      (n.tests = t.tests),
      (n.exclusiveTests = t.exclusiveTests),
      n.withMutation((t) => {
        e.tests.forEach((e) => {
          t.test(e.OPTIONS);
        });
      }),
      (n.transforms = [...t.transforms, ...n.transforms]),
      n
    );
  }
  isType(e) {
    return e == null
      ? !!(
          (this.spec.nullable && e === null) ||
          (this.spec.optional && e === void 0)
        )
      : this._typeCheck(e);
  }
  resolve(e) {
    let t = this;
    if (t.conditions.length) {
      let n = t.conditions;
      ((t = t.clone()),
        (t.conditions = []),
        (t = n.reduce((t, n) => n.resolve(t, e), t)),
        (t = t.resolve(e)));
    }
    return t;
  }
  resolveOptions(e) {
    return Object.assign({}, e, {
      from: e.from || [],
      strict: e.strict ?? this.spec.strict,
      abortEarly: e.abortEarly ?? this.spec.abortEarly,
      recursive: e.recursive ?? this.spec.recursive,
      disableStackTrace: e.disableStackTrace ?? this.spec.disableStackTrace,
    });
  }
  cast(e, t = {}) {
    let n = this.resolve(Object.assign({}, t, { value: e })),
      r = t.assert === `ignore-optionality`,
      i = n._cast(e, t);
    if (t.assert !== !1 && !n.isType(i)) {
      if (r && w_(i)) return i;
      let a = r_(e),
        o = r_(i);
      throw TypeError(
        `The value of ${t.path || `field`} could not be cast to a value that satisfies the schema type: "${n.type}". \n\nattempted value: ${a} \n` +
          (o === a ? `` : `result of cast: ${o}`),
      );
    }
    return i;
  }
  _cast(e, t) {
    let n =
      e === void 0
        ? e
        : this.transforms.reduce((n, r) => r.call(this, n, e, this, t), e);
    return (n === void 0 && (n = this.getDefault(t)), n);
  }
  _validate(e, t = {}, n, r) {
    let { path: i, originalValue: a = e, strict: o = this.spec.strict } = t,
      s = e;
    o || (s = this._cast(s, Object.assign({ assert: !1 }, t)));
    let c = [];
    for (let e of Object.values(this.internalTests)) e && c.push(e);
    this.runTests(
      { path: i, value: s, originalValue: a, options: t, tests: c },
      n,
      (e) => {
        if (e.length) return r(e, s);
        this.runTests(
          {
            path: i,
            value: s,
            originalValue: a,
            options: t,
            tests: this.tests,
          },
          n,
          r,
        );
      },
    );
  }
  runTests(e, t, n) {
    let r = !1,
      { tests: i, value: a, originalValue: o, path: s, options: c } = e,
      l = (e) => {
        r || ((r = !0), t(e, a));
      },
      u = (e) => {
        r || ((r = !0), n(e, a));
      },
      d = i.length,
      f = [];
    if (!d) return u([]);
    let p = { value: a, originalValue: o, path: s, options: c, schema: this };
    for (let e = 0; e < i.length; e++) {
      let t = i[e];
      t(p, l, function (e) {
        (e && (Array.isArray(e) ? f.push(...e) : f.push(e)), --d <= 0 && u(f));
      });
    }
  }
  asNestedTest({
    key: e,
    index: t,
    parent: n,
    parentPath: r,
    originalParent: i,
    options: a,
  }) {
    let o = e ?? t;
    if (o == null)
      throw TypeError("Must include `key` or `index` for nested validations");
    let s = typeof o == `number`,
      c = n[o],
      l = Object.assign({}, a, {
        strict: !0,
        parent: n,
        value: c,
        originalValue: i[o],
        key: void 0,
        [s ? `index` : `key`]: o,
        path:
          s || o.includes(`.`)
            ? `${r || ``}[${s ? o : `"${o}"`}]`
            : (r ? `${r}.` : ``) + e,
      });
    return (e, t, n) => this.resolve(l)._validate(c, l, t, n);
  }
  validate(e, t) {
    let n = this.resolve(Object.assign({}, t, { value: e })),
      r = t?.disableStackTrace ?? n.spec.disableStackTrace;
    return new Promise((i, a) =>
      n._validate(
        e,
        t,
        (e, t) => {
          (u_.isError(e) && (e.value = t), a(e));
        },
        (e, t) => {
          e.length ? a(new u_(e, t, void 0, void 0, r)) : i(t);
        },
      ),
    );
  }
  validateSync(e, t) {
    let n = this.resolve(Object.assign({}, t, { value: e })),
      r,
      i = t?.disableStackTrace ?? n.spec.disableStackTrace;
    return (
      n._validate(
        e,
        Object.assign({}, t, { sync: !0 }),
        (e, t) => {
          throw (u_.isError(e) && (e.value = t), e);
        },
        (t, n) => {
          if (t.length) throw new u_(t, e, void 0, void 0, i);
          r = n;
        },
      ),
      r
    );
  }
  isValid(e, t) {
    return this.validate(e, t).then(
      () => !0,
      (e) => {
        if (u_.isError(e)) return !1;
        throw e;
      },
    );
  }
  isValidSync(e, t) {
    try {
      return (this.validateSync(e, t), !0);
    } catch (e) {
      if (u_.isError(e)) return !1;
      throw e;
    }
  }
  _getDefault(e) {
    let t = this.spec.default;
    return t == null ? t : typeof t == `function` ? t.call(this, e) : A_(t);
  }
  getDefault(e) {
    return this.resolve(e || {})._getDefault(e);
  }
  default(e) {
    return arguments.length === 0
      ? this._getDefault()
      : this.clone({ default: e });
  }
  strict(e = !0) {
    return this.clone({ strict: e });
  }
  nullability(e, t) {
    let n = this.clone({ nullable: e });
    return (
      (n.internalTests.nullable = T_({
        message: t,
        name: `nullable`,
        test(e) {
          return e !== null || this.schema.spec.nullable;
        },
      })),
      n
    );
  }
  optionality(e, t) {
    let n = this.clone({ optional: e });
    return (
      (n.internalTests.optionality = T_({
        message: t,
        name: `optionality`,
        test(e) {
          return e !== void 0 || this.schema.spec.optional;
        },
      })),
      n
    );
  }
  optional() {
    return this.optionality(!0);
  }
  defined(e = d_.defined) {
    return this.optionality(!1, e);
  }
  nullable() {
    return this.nullability(!0);
  }
  nonNullable(e = d_.notNull) {
    return this.nullability(!1, e);
  }
  required(e = d_.required) {
    return this.clone().withMutation((t) => t.nonNullable(e).defined(e));
  }
  notRequired() {
    return this.clone().withMutation((e) => e.nullable().optional());
  }
  transform(e) {
    let t = this.clone();
    return (t.transforms.push(e), t);
  }
  test(...e) {
    let t;
    if (
      ((t =
        e.length === 1
          ? typeof e[0] == `function`
            ? { test: e[0] }
            : e[0]
          : e.length === 2
            ? { name: e[0], test: e[1] }
            : { name: e[0], message: e[1], test: e[2] }),
      t.message === void 0 && (t.message = d_.default),
      typeof t.test != `function`)
    )
      throw TypeError("`test` is a required parameters");
    let n = this.clone(),
      r = T_(t),
      i = t.exclusive || (t.name && n.exclusiveTests[t.name] === !0);
    if (t.exclusive && !t.name)
      throw TypeError(
        "Exclusive tests must provide a unique `name` identifying the test",
      );
    return (
      t.name && (n.exclusiveTests[t.name] = !!t.exclusive),
      (n.tests = n.tests.filter(
        (e) =>
          !(
            e.OPTIONS.name === t.name &&
            (i || e.OPTIONS.test === r.OPTIONS.test)
          ),
      )),
      n.tests.push(r),
      n
    );
  }
  when(e, t) {
    !Array.isArray(e) && typeof e != `string` && ((t = e), (e = `.`));
    let n = this.clone(),
      r = i_(e).map((e) => new C_(e));
    return (
      r.forEach((e) => {
        e.isSibling && n.deps.push(e.key);
      }),
      n.conditions.push(
        typeof t == `function` ? new b_(r, t) : b_.fromOptions(r, t),
      ),
      n
    );
  }
  typeError(e) {
    let t = this.clone();
    return (
      (t.internalTests.typeError = T_({
        message: e,
        name: `typeError`,
        skipAbsent: !0,
        test(e) {
          return this.schema._typeCheck(e)
            ? !0
            : this.createError({ params: { type: this.schema.type } });
        },
      })),
      t
    );
  }
  oneOf(e, t = d_.oneOf) {
    let n = this.clone();
    return (
      e.forEach((e) => {
        (n._whitelist.add(e), n._blacklist.delete(e));
      }),
      (n.internalTests.whiteList = T_({
        message: t,
        name: `oneOf`,
        skipAbsent: !0,
        test(e) {
          let t = this.schema._whitelist,
            n = t.resolveAll(this.resolve);
          return n.includes(e)
            ? !0
            : this.createError({
                params: { values: Array.from(t).join(`, `), resolved: n },
              });
        },
      })),
      n
    );
  }
  notOneOf(e, t = d_.notOneOf) {
    let n = this.clone();
    return (
      e.forEach((e) => {
        (n._blacklist.add(e), n._whitelist.delete(e));
      }),
      (n.internalTests.blacklist = T_({
        message: t,
        name: `notOneOf`,
        test(e) {
          let t = this.schema._blacklist,
            n = t.resolveAll(this.resolve);
          return (
            !n.includes(e) ||
            this.createError({
              params: { values: Array.from(t).join(`, `), resolved: n },
            })
          );
        },
      })),
      n
    );
  }
  strip(e = !0) {
    let t = this.clone();
    return ((t.spec.strip = e), t);
  }
  describe(e) {
    let t = (e ? this.resolve(e) : this).clone(),
      { label: n, meta: r, optional: i, nullable: a } = t.spec;
    return {
      meta: r,
      label: n,
      optional: i,
      nullable: a,
      default: t.getDefault(e),
      type: t.type,
      oneOf: t._whitelist.describe(),
      notOneOf: t._blacklist.describe(),
      tests: t.tests
        .filter(
          (e, t, n) =>
            n.findIndex((t) => t.OPTIONS.name === e.OPTIONS.name) === t,
        )
        .map((t) => {
          let n =
            t.OPTIONS.params && e
              ? E_(Object.assign({}, t.OPTIONS.params), e)
              : t.OPTIONS.params;
          return { name: t.OPTIONS.name, params: n };
        }),
    };
  }
  get "~standard"() {
    let e = this;
    return {
      version: 1,
      vendor: `yup`,
      async validate(t) {
        try {
          return { value: await e.validate(t, { abortEarly: !1 }) };
        } catch (e) {
          if (e instanceof u_) return { issues: N_(e) };
          throw e;
        }
      },
    };
  }
};
P_.prototype.__isYupSchema__ = !0;
for (let e of [`validate`, `validateSync`])
  P_.prototype[`${e}At`] = function (t, n, r = {}) {
    let { parent: i, parentPath: a, schema: o } = O_(this, t, n, r.context);
    return o[e](i && i[a], Object.assign({}, r, { parent: i, path: t }));
  };
for (let e of [`equals`, `is`]) P_.prototype[e] = P_.prototype.oneOf;
for (let e of [`not`, `nope`]) P_.prototype[e] = P_.prototype.notOneOf;
var F_ = () => !0;
((class extends P_ {
  constructor(e) {
    super(
      typeof e == `function`
        ? { type: `mixed`, check: e }
        : Object.assign({ type: `mixed`, check: F_ }, e),
    );
  }
}).prototype,
  class extends P_ {
    constructor() {
      (super({
        type: `boolean`,
        check(e) {
          return (
            e instanceof Boolean && (e = e.valueOf()),
            typeof e == `boolean`
          );
        },
      }),
        this.withMutation(() => {
          this.transform((e, t) => {
            if (this.spec.coerce && !this.isType(e)) {
              if (/^(true|1)$/i.test(String(e))) return !0;
              if (/^(false|0)$/i.test(String(e))) return !1;
            }
            return e;
          });
        }));
    }
    isTrue(e = h_.isValue) {
      return this.test({
        message: e,
        name: `is-value`,
        exclusive: !0,
        params: { value: `true` },
        test(e) {
          return w_(e) || e === !0;
        },
      });
    }
    isFalse(e = h_.isValue) {
      return this.test({
        message: e,
        name: `is-value`,
        exclusive: !0,
        params: { value: `false` },
        test(e) {
          return w_(e) || e === !1;
        },
      });
    }
    default(e) {
      return super.default(e);
    }
    defined(e) {
      return super.defined(e);
    }
    optional() {
      return super.optional();
    }
    required(e) {
      return super.required(e);
    }
    notRequired() {
      return super.notRequired();
    }
    nullable() {
      return super.nullable();
    }
    nonNullable(e) {
      return super.nonNullable(e);
    }
    strip(e) {
      return super.strip(e);
    }
  }.prototype);
var I_ =
  /^(\d{4}|[+-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{1,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;
function L_(e) {
  let t = R_(e);
  if (!t) return Date.parse ? Date.parse(e) : NaN;
  if (t.z === void 0 && t.plusMinus === void 0)
    return new Date(
      t.year,
      t.month,
      t.day,
      t.hour,
      t.minute,
      t.second,
      t.millisecond,
    ).valueOf();
  let n = 0;
  return (
    t.z !== `Z` &&
      t.plusMinus !== void 0 &&
      ((n = t.hourOffset * 60 + t.minuteOffset),
      t.plusMinus === `+` && (n = 0 - n)),
    Date.UTC(
      t.year,
      t.month,
      t.day,
      t.hour,
      t.minute + n,
      t.second,
      t.millisecond,
    )
  );
}
function R_(e) {
  let t = I_.exec(e);
  return t
    ? {
        year: z_(t[1]),
        month: z_(t[2], 1) - 1,
        day: z_(t[3], 1),
        hour: z_(t[4]),
        minute: z_(t[5]),
        second: z_(t[6]),
        millisecond: t[7] ? z_(t[7].substring(0, 3)) : 0,
        precision: t[7]?.length ?? void 0,
        z: t[8] || void 0,
        plusMinus: t[9] || void 0,
        hourOffset: z_(t[10]),
        minuteOffset: z_(t[11]),
      }
    : null;
}
function z_(e, t = 0) {
  return Number(e) || t;
}
var B_ =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  V_ =
    /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
  H_ =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
  U_ = RegExp(
    `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`,
  ),
  W_ = (e) => w_(e) || e === e.trim(),
  G_ = {}.toString();
function K_() {
  return new q_();
}
var q_ = class extends P_ {
  constructor() {
    (super({
      type: `string`,
      check(e) {
        return (e instanceof String && (e = e.valueOf()), typeof e == `string`);
      },
    }),
      this.withMutation(() => {
        this.transform((e, t) => {
          if (!this.spec.coerce || this.isType(e) || Array.isArray(e)) return e;
          let n = e != null && e.toString ? e.toString() : e;
          return n === G_ ? e : n;
        });
      }));
  }
  required(e) {
    return super
      .required(e)
      .withMutation((t) =>
        t.test({
          message: e || d_.required,
          name: `required`,
          skipAbsent: !0,
          test: (e) => !!e.length,
        }),
      );
  }
  notRequired() {
    return super
      .notRequired()
      .withMutation(
        (e) => (
          (e.tests = e.tests.filter((e) => e.OPTIONS.name !== `required`)),
          e
        ),
      );
  }
  length(e, t = f_.length) {
    return this.test({
      message: t,
      name: `length`,
      exclusive: !0,
      params: { length: e },
      skipAbsent: !0,
      test(t) {
        return t.length === this.resolve(e);
      },
    });
  }
  min(e, t = f_.min) {
    return this.test({
      message: t,
      name: `min`,
      exclusive: !0,
      params: { min: e },
      skipAbsent: !0,
      test(t) {
        return t.length >= this.resolve(e);
      },
    });
  }
  max(e, t = f_.max) {
    return this.test({
      name: `max`,
      exclusive: !0,
      message: t,
      params: { max: e },
      skipAbsent: !0,
      test(t) {
        return t.length <= this.resolve(e);
      },
    });
  }
  matches(e, t) {
    let n = !1,
      r,
      i;
    return (
      t &&
        (typeof t == `object`
          ? ({ excludeEmptyString: n = !1, message: r, name: i } = t)
          : (r = t)),
      this.test({
        name: i || `matches`,
        message: r || f_.matches,
        params: { regex: e },
        skipAbsent: !0,
        test: (t) => (t === `` && n) || t.search(e) !== -1,
      })
    );
  }
  email(e = f_.email) {
    return this.matches(B_, {
      name: `email`,
      message: e,
      excludeEmptyString: !0,
    });
  }
  url(e = f_.url) {
    return this.matches(V_, {
      name: `url`,
      message: e,
      excludeEmptyString: !0,
    });
  }
  uuid(e = f_.uuid) {
    return this.matches(H_, {
      name: `uuid`,
      message: e,
      excludeEmptyString: !1,
    });
  }
  datetime(e) {
    let t = ``,
      n,
      r;
    return (
      e &&
        (typeof e == `object`
          ? ({
              message: t = ``,
              allowOffset: n = !1,
              precision: r = void 0,
            } = e)
          : (t = e)),
      this.matches(U_, {
        name: `datetime`,
        message: t || f_.datetime,
        excludeEmptyString: !0,
      })
        .test({
          name: `datetime_offset`,
          message: t || f_.datetime_offset,
          params: { allowOffset: n },
          skipAbsent: !0,
          test: (e) => {
            if (!e || n) return !0;
            let t = R_(e);
            return t ? !!t.z : !1;
          },
        })
        .test({
          name: `datetime_precision`,
          message: t || f_.datetime_precision,
          params: { precision: r },
          skipAbsent: !0,
          test: (e) => {
            if (!e || r == null) return !0;
            let t = R_(e);
            return t ? t.precision === r : !1;
          },
        })
    );
  }
  ensure() {
    return this.default(``).transform((e) => (e === null ? `` : e));
  }
  trim(e = f_.trim) {
    return this.transform((e) => (e == null ? e : e.trim())).test({
      message: e,
      name: `trim`,
      test: W_,
    });
  }
  lowercase(e = f_.lowercase) {
    return this.transform((e) => (w_(e) ? e : e.toLowerCase())).test({
      message: e,
      name: `string_case`,
      exclusive: !0,
      skipAbsent: !0,
      test: (e) => w_(e) || e === e.toLowerCase(),
    });
  }
  uppercase(e = f_.uppercase) {
    return this.transform((e) => (w_(e) ? e : e.toUpperCase())).test({
      message: e,
      name: `string_case`,
      exclusive: !0,
      skipAbsent: !0,
      test: (e) => w_(e) || e === e.toUpperCase(),
    });
  }
};
K_.prototype = q_.prototype;
var J_ = (e) => e != +e;
(class extends P_ {
  constructor() {
    (super({
      type: `number`,
      check(e) {
        return (
          e instanceof Number && (e = e.valueOf()),
          typeof e == `number` && !J_(e)
        );
      },
    }),
      this.withMutation(() => {
        this.transform((e, t) => {
          if (!this.spec.coerce) return e;
          let n = e;
          if (typeof n == `string`) {
            if (((n = n.replace(/\s/g, ``)), n === ``)) return NaN;
            n = +n;
          }
          return this.isType(n) || n === null ? n : parseFloat(n);
        });
      }));
  }
  min(e, t = p_.min) {
    return this.test({
      message: t,
      name: `min`,
      exclusive: !0,
      params: { min: e },
      skipAbsent: !0,
      test(t) {
        return t >= this.resolve(e);
      },
    });
  }
  max(e, t = p_.max) {
    return this.test({
      message: t,
      name: `max`,
      exclusive: !0,
      params: { max: e },
      skipAbsent: !0,
      test(t) {
        return t <= this.resolve(e);
      },
    });
  }
  lessThan(e, t = p_.lessThan) {
    return this.test({
      message: t,
      name: `max`,
      exclusive: !0,
      params: { less: e },
      skipAbsent: !0,
      test(t) {
        return t < this.resolve(e);
      },
    });
  }
  moreThan(e, t = p_.moreThan) {
    return this.test({
      message: t,
      name: `min`,
      exclusive: !0,
      params: { more: e },
      skipAbsent: !0,
      test(t) {
        return t > this.resolve(e);
      },
    });
  }
  positive(e = p_.positive) {
    return this.moreThan(0, e);
  }
  negative(e = p_.negative) {
    return this.lessThan(0, e);
  }
  integer(e = p_.integer) {
    return this.test({
      name: `integer`,
      message: e,
      skipAbsent: !0,
      test: (e) => Number.isInteger(e),
    });
  }
  truncate() {
    return this.transform((e) => (w_(e) ? e : e | 0));
  }
  round(e) {
    let t = [`ceil`, `floor`, `round`, `trunc`];
    if (((e = e?.toLowerCase() || `round`), e === `trunc`))
      return this.truncate();
    if (t.indexOf(e.toLowerCase()) === -1)
      throw TypeError(`Only valid options for round() are: ` + t.join(`, `));
    return this.transform((t) => (w_(t) ? t : Math[e](t)));
  }
}).prototype;
var Y_ = new Date(``),
  X_ = (e) => Object.prototype.toString.call(e) === `[object Date]`,
  Z_ = class e extends P_ {
    constructor() {
      (super({
        type: `date`,
        check(e) {
          return X_(e) && !isNaN(e.getTime());
        },
      }),
        this.withMutation(() => {
          this.transform((t, n) =>
            !this.spec.coerce || this.isType(t) || t === null
              ? t
              : ((t = L_(t)), isNaN(t) ? e.INVALID_DATE : new Date(t)),
          );
        }));
    }
    prepareParam(e, t) {
      let n;
      if (C_.isRef(e)) n = e;
      else {
        let r = this.cast(e);
        if (!this._typeCheck(r))
          throw TypeError(
            `\`${t}\` must be a Date or a value that can be \`cast()\` to a Date`,
          );
        n = r;
      }
      return n;
    }
    min(e, t = m_.min) {
      let n = this.prepareParam(e, `min`);
      return this.test({
        message: t,
        name: `min`,
        exclusive: !0,
        params: { min: e },
        skipAbsent: !0,
        test(e) {
          return e >= this.resolve(n);
        },
      });
    }
    max(e, t = m_.max) {
      let n = this.prepareParam(e, `max`);
      return this.test({
        message: t,
        name: `max`,
        exclusive: !0,
        params: { max: e },
        skipAbsent: !0,
        test(e) {
          return e <= this.resolve(n);
        },
      });
    }
  };
((Z_.INVALID_DATE = Y_), Z_.prototype);
function Q_(e, t = []) {
  let n = [],
    r = new Set(),
    i = new Set(t.map(([e, t]) => `${e}-${t}`));
  function a(e, t) {
    let a = (0, qg.split)(e)[0];
    (r.add(a), i.has(`${t}-${a}`) || n.push([t, a]));
  }
  for (let t of Object.keys(e)) {
    let n = e[t];
    (r.add(t),
      C_.isRef(n) && n.isSibling
        ? a(n.path, t)
        : y_(n) && `deps` in n && n.deps.forEach((e) => a(e, t)));
  }
  return Yg.default.array(Array.from(r), n).reverse();
}
function $_(e, t) {
  let n = 1 / 0;
  return (
    e.some((e, r) => {
      var i;
      if ((i = t.path) != null && i.includes(e)) return ((n = r), !0);
    }),
    n
  );
}
function ev(e) {
  return (t, n) => $_(e, t) - $_(e, n);
}
var tv = (e, t, n) => {
  if (typeof e != `string`) return e;
  let r = e;
  try {
    r = JSON.parse(e);
  } catch {}
  return n.isType(r) ? r : e;
};
function nv(e) {
  if (`fields` in e) {
    let t = {};
    for (let [n, r] of Object.entries(e.fields)) t[n] = nv(r);
    return e.setFields(t);
  }
  if (e.type === `array`) {
    let t = e.optional();
    return ((t.innerType &&= nv(t.innerType)), t);
  }
  return e.type === `tuple`
    ? e.optional().clone({ types: e.spec.types.map(nv) })
    : `optional` in e
      ? e.optional()
      : e;
}
var rv = (e, t) => {
    let n = [...(0, qg.normalizePath)(t)];
    if (n.length === 1) return n[0] in e;
    let r = n.pop(),
      i = (0, qg.getter)((0, qg.join)(n), !0)(e);
    return !!(i && r in i);
  },
  iv = (e) => Object.prototype.toString.call(e) === `[object Object]`;
function av(e, t) {
  let n = Object.keys(e.fields);
  return Object.keys(t).filter((e) => n.indexOf(e) === -1);
}
var ov = ev([]);
function sv(e) {
  return new cv(e);
}
var cv = class extends P_ {
  constructor(e) {
    (super({
      type: `object`,
      check(e) {
        return iv(e) || typeof e == `function`;
      },
    }),
      (this.fields = Object.create(null)),
      (this._sortErrors = ov),
      (this._nodes = []),
      (this._excludedEdges = []),
      this.withMutation(() => {
        e && this.shape(e);
      }));
  }
  _cast(e, t = {}) {
    let n = super._cast(e, t);
    if (n === void 0) return this.getDefault(t);
    if (!this._typeCheck(n)) return n;
    let r = this.fields,
      i = t.stripUnknown ?? this.spec.noUnknown,
      a = [].concat(
        this._nodes,
        Object.keys(n).filter((e) => !this._nodes.includes(e)),
      ),
      o = {},
      s = Object.assign({}, t, {
        parent: o,
        __validating: t.__validating || !1,
      }),
      c = !1;
    for (let e of a) {
      let a = r[e],
        l = e in n,
        u = n[e];
      if (a) {
        let r;
        ((s.path = (t.path ? `${t.path}.` : ``) + e),
          (a = a.resolve({ value: u, context: t.context, parent: o })));
        let i = a instanceof P_ ? a.spec : void 0,
          l = i?.strict;
        if (i != null && i.strip) {
          c ||= e in n;
          continue;
        }
        ((r = !t.__validating || !l ? a.cast(u, s) : u),
          r !== void 0 && (o[e] = r));
      } else l && !i && (o[e] = u);
      (l !== e in o || o[e] !== u) && (c = !0);
    }
    return c ? o : n;
  }
  _validate(e, t = {}, n, r) {
    let {
      from: i = [],
      originalValue: a = e,
      recursive: o = this.spec.recursive,
    } = t;
    ((t.from = [{ schema: this, value: a }, ...i]),
      (t.__validating = !0),
      (t.originalValue = a),
      super._validate(e, t, n, (e, i) => {
        if (!o || !iv(i)) {
          r(e, i);
          return;
        }
        a ||= i;
        let s = [];
        for (let e of this._nodes) {
          let n = this.fields[e];
          !n ||
            C_.isRef(n) ||
            s.push(
              n.asNestedTest({
                options: t,
                key: e,
                parent: i,
                parentPath: t.path,
                originalParent: a,
              }),
            );
        }
        this.runTests(
          { tests: s, value: i, originalValue: a, options: t },
          n,
          (t) => {
            r(t.sort(this._sortErrors).concat(e), i);
          },
        );
      }));
  }
  clone(e) {
    let t = super.clone(e);
    return (
      (t.fields = Object.assign({}, this.fields)),
      (t._nodes = this._nodes),
      (t._excludedEdges = this._excludedEdges),
      (t._sortErrors = this._sortErrors),
      t
    );
  }
  concat(e) {
    let t = super.concat(e),
      n = t.fields;
    for (let [e, t] of Object.entries(this.fields)) {
      let r = n[e];
      n[e] = r === void 0 ? t : r;
    }
    return t.withMutation((t) =>
      t.setFields(n, [...this._excludedEdges, ...e._excludedEdges]),
    );
  }
  _getDefault(e) {
    if (`default` in this.spec) return super._getDefault(e);
    if (!this._nodes.length) return;
    let t = {};
    return (
      this._nodes.forEach((n) => {
        var r;
        let i = this.fields[n],
          a = e;
        ((r = a) != null &&
          r.value &&
          (a = Object.assign({}, a, { parent: a.value, value: a.value[n] })),
          (t[n] = i && `getDefault` in i ? i.getDefault(a) : void 0));
      }),
      t
    );
  }
  setFields(e, t) {
    let n = this.clone();
    return (
      (n.fields = e),
      (n._nodes = Q_(e, t)),
      (n._sortErrors = ev(Object.keys(e))),
      t && (n._excludedEdges = t),
      n
    );
  }
  shape(e, t = []) {
    return this.clone().withMutation((n) => {
      let r = n._excludedEdges;
      return (
        t.length &&
          (Array.isArray(t[0]) || (t = [t]), (r = [...n._excludedEdges, ...t])),
        n.setFields(Object.assign(n.fields, e), r)
      );
    });
  }
  partial() {
    let e = {};
    for (let [t, n] of Object.entries(this.fields))
      e[t] =
        `optional` in n && n.optional instanceof Function ? n.optional() : n;
    return this.setFields(e);
  }
  deepPartial() {
    return nv(this);
  }
  pick(e) {
    let t = {};
    for (let n of e) this.fields[n] && (t[n] = this.fields[n]);
    return this.setFields(
      t,
      this._excludedEdges.filter(([t, n]) => e.includes(t) && e.includes(n)),
    );
  }
  omit(e) {
    let t = [];
    for (let n of Object.keys(this.fields)) e.includes(n) || t.push(n);
    return this.pick(t);
  }
  from(e, t, n) {
    let r = (0, qg.getter)(e, !0);
    return this.transform((i) => {
      if (!i) return i;
      let a = i;
      return (
        rv(i, e) &&
          ((a = Object.assign({}, i)), n || delete a[e], (a[t] = r(i))),
        a
      );
    });
  }
  json() {
    return this.transform(tv);
  }
  exact(e) {
    return this.test({
      name: `exact`,
      exclusive: !0,
      message: e || g_.exact,
      test(e) {
        if (e == null) return !0;
        let t = av(this.schema, e);
        return (
          t.length === 0 ||
          this.createError({ params: { properties: t.join(`, `) } })
        );
      },
    });
  }
  stripUnknown() {
    return this.clone({ noUnknown: !0 });
  }
  noUnknown(e = !0, t = g_.noUnknown) {
    typeof e != `boolean` && ((t = e), (e = !0));
    let n = this.test({
      name: `noUnknown`,
      exclusive: !0,
      message: t,
      test(t) {
        if (t == null) return !0;
        let n = av(this.schema, t);
        return (
          !e ||
          n.length === 0 ||
          this.createError({ params: { unknown: n.join(`, `) } })
        );
      },
    });
    return ((n.spec.noUnknown = e), n);
  }
  unknown(e = !0, t = g_.noUnknown) {
    return this.noUnknown(!e, t);
  }
  transformKeys(e) {
    return this.transform((t) => {
      if (!t) return t;
      let n = {};
      for (let r of Object.keys(t)) n[e(r)] = t[r];
      return n;
    });
  }
  camelCase() {
    return this.transformKeys(Jg.camelCase);
  }
  snakeCase() {
    return this.transformKeys(Jg.snakeCase);
  }
  constantCase() {
    return this.transformKeys((e) => (0, Jg.snakeCase)(e).toUpperCase());
  }
  describe(e) {
    let t = (e ? this.resolve(e) : this).clone(),
      n = super.describe(e);
    n.fields = {};
    for (let [i, a] of Object.entries(t.fields)) {
      var r;
      let t = e;
      ((r = t) != null &&
        r.value &&
        (t = Object.assign({}, t, { parent: t.value, value: t.value[i] })),
        (n.fields[i] = a.describe(t)));
    }
    return n;
  }
};
((sv.prototype = cv.prototype),
  class extends P_ {
    constructor(e) {
      (super({
        type: `array`,
        spec: { types: e },
        check(e) {
          return Array.isArray(e);
        },
      }),
        (this.innerType = void 0),
        (this.innerType = e));
    }
    _cast(e, t) {
      let n = super._cast(e, t);
      if (!this._typeCheck(n) || !this.innerType) return n;
      let r = !1,
        i = n.map((e, i) => {
          let a = this.innerType.cast(
            e,
            Object.assign({}, t, {
              path: `${t.path || ``}[${i}]`,
              parent: n,
              originalValue: e,
              value: e,
              index: i,
            }),
          );
          return (a !== e && (r = !0), a);
        });
      return r ? i : n;
    }
    _validate(e, t = {}, n, r) {
      let i = this.innerType,
        a = t.recursive ?? this.spec.recursive;
      (t.originalValue != null && t.originalValue,
        super._validate(e, t, n, (o, s) => {
          if (!a || !i || !this._typeCheck(s)) {
            r(o, s);
            return;
          }
          let c = Array(s.length);
          for (let n = 0; n < s.length; n++)
            c[n] = i.asNestedTest({
              options: t,
              index: n,
              parent: s,
              parentPath: t.path,
              originalParent: t.originalValue ?? e,
            });
          this.runTests(
            {
              value: s,
              tests: c,
              originalValue: t.originalValue ?? e,
              options: t,
            },
            n,
            (e) => r(e.concat(o), s),
          );
        }));
    }
    clone(e) {
      let t = super.clone(e);
      return ((t.innerType = this.innerType), t);
    }
    json() {
      return this.transform(tv);
    }
    concat(e) {
      let t = super.concat(e);
      return (
        (t.innerType = this.innerType),
        e.innerType &&
          (t.innerType = t.innerType
            ? t.innerType.concat(e.innerType)
            : e.innerType),
        t
      );
    }
    of(e) {
      let t = this.clone();
      if (!y_(e))
        throw TypeError(
          "`array.of()` sub-schema must be a valid yup schema not: " + r_(e),
        );
      return (
        (t.innerType = e),
        (t.spec = Object.assign({}, t.spec, { types: e })),
        t
      );
    }
    length(e, t = __.length) {
      return this.test({
        message: t,
        name: `length`,
        exclusive: !0,
        params: { length: e },
        skipAbsent: !0,
        test(t) {
          return t.length === this.resolve(e);
        },
      });
    }
    min(e, t) {
      return (
        (t ||= __.min),
        this.test({
          message: t,
          name: `min`,
          exclusive: !0,
          params: { min: e },
          skipAbsent: !0,
          test(t) {
            return t.length >= this.resolve(e);
          },
        })
      );
    }
    max(e, t) {
      return (
        (t ||= __.max),
        this.test({
          message: t,
          name: `max`,
          exclusive: !0,
          params: { max: e },
          skipAbsent: !0,
          test(t) {
            return t.length <= this.resolve(e);
          },
        })
      );
    }
    ensure() {
      return this.default(() => []).transform((e, t) =>
        this._typeCheck(e) ? e : t == null ? [] : [].concat(t),
      );
    }
    compact(e) {
      let t = e ? (t, n, r) => !e(t, n, r) : (e) => !!e;
      return this.transform((e) => (e == null ? e : e.filter(t)));
    }
    describe(e) {
      let t = (e ? this.resolve(e) : this).clone(),
        n = super.describe(e);
      if (t.innerType) {
        var r;
        let i = e;
        ((r = i) != null &&
          r.value &&
          (i = Object.assign({}, i, { parent: i.value, value: i.value[0] })),
          (n.innerType = t.innerType.describe(i)));
      }
      return n;
    }
  }.prototype,
  class extends P_ {
    constructor(e) {
      (super({
        type: `tuple`,
        spec: { types: e },
        check(e) {
          let t = this.spec.types;
          return Array.isArray(e) && e.length === t.length;
        },
      }),
        this.withMutation(() => {
          this.typeError(v_.notType);
        }));
    }
    _cast(e, t) {
      let { types: n } = this.spec,
        r = super._cast(e, t);
      if (!this._typeCheck(r)) return r;
      let i = !1,
        a = n.map((e, n) => {
          let a = e.cast(
            r[n],
            Object.assign({}, t, {
              path: `${t.path || ``}[${n}]`,
              parent: r,
              originalValue: r[n],
              value: r[n],
              index: n,
            }),
          );
          return (a !== r[n] && (i = !0), a);
        });
      return i ? a : r;
    }
    _validate(e, t = {}, n, r) {
      let i = this.spec.types;
      super._validate(e, t, n, (a, o) => {
        if (!this._typeCheck(o)) {
          r(a, o);
          return;
        }
        let s = [];
        for (let [n, r] of i.entries())
          s[n] = r.asNestedTest({
            options: t,
            index: n,
            parent: o,
            parentPath: t.path,
            originalParent: t.originalValue ?? e,
          });
        this.runTests(
          {
            value: o,
            tests: s,
            originalValue: t.originalValue ?? e,
            options: t,
          },
          n,
          (e) => r(e.concat(a), o),
        );
      });
    }
    describe(e) {
      let t = (e ? this.resolve(e) : this).clone(),
        n = super.describe(e);
      return (
        (n.innerType = t.spec.types.map((t, n) => {
          var r;
          let i = e;
          return (
            (r = i) != null &&
              r.value &&
              (i = Object.assign({}, i, {
                parent: i.value,
                value: i.value[n],
              })),
            t.describe(i)
          );
        })),
        n
      );
    }
  }.prototype);
var lv = sv().shape({
    username: K_()
      .min(3, `Username must be at least 3 characters`)
      .required(`Username is required`),
    password: K_()
      .min(8, `Password must be at least 8 characters`)
      .matches(/[A-Z]/, `Password must contain at least one uppercase`)
      .matches(/[a-z]/, `Password must contain at least one lowercase`)
      .matches(
        /(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]/,
        `Password must be alphanumeric`,
      )
      .required(`Password is required`),
  }),
  uv = () => {
    let e = Cn();
    return (0, q.jsx)(_g, {
      initialValues: { username: ``, password: `` },
      validationSchema: lv,
      onSubmit: async (t, { setSubmitting: n, setStatus: r }) => {
        try {
          let n = await Bg(t);
          if (!n.success) {
            r(n.message);
            return;
          }
          e(Ft(n.user));
        } finally {
          n(!1);
        }
      },
      children: ({ isSubmitting: e, status: t }) =>
        (0, q.jsxs)(Dg, {
          className: `auth-form`,
          children: [
            (0, q.jsxs)(`div`, {
              className: `text-center mb-4`,
              children: [
                (0, q.jsx)(`span`, {
                  className: `form-eyebrow`,
                  children: `GET STARTED`,
                }),
                (0, q.jsx)(`h2`, {
                  className: `form-title`,
                  children: `Create account`,
                }),
                (0, q.jsx)(`p`, {
                  className: `form-description`,
                  children: `Create your RevBot account to start making quizzes.`,
                }),
              ],
            }),
            (0, q.jsxs)(`div`, {
              className: `d-grid gap-3`,
              children: [
                (0, q.jsx)(Lg, {
                  type: `text`,
                  name: `username`,
                  label: `Username`,
                }),
                (0, q.jsx)(Lg, {
                  type: `password`,
                  name: `password`,
                  label: `Password`,
                }),
                t &&
                  (0, q.jsx)(`p`, {
                    className: `error-message text-center mb-0`,
                    children: t,
                  }),
                (0, q.jsx)(`button`, {
                  className: `btn btn-primary auth-submit`,
                  type: `submit`,
                  disabled: e,
                  children: e ? `Creating account...` : `Create account`,
                }),
              ],
            }),
          ],
        }),
    });
  },
  dv = ({ isOpen: e, onClose: t, children: n }) =>
    e
      ? (0, q.jsx)(`div`, {
          className: `modal-backdrop-custom`,
          role: `presentation`,
          onMouseDown: t,
          children: (0, q.jsxs)(`div`, {
            className: `modal-dialog-custom`,
            role: `dialog`,
            "aria-modal": `true`,
            onMouseDown: (e) => e.stopPropagation(),
            children: [
              (0, q.jsx)(`button`, {
                type: `button`,
                className: `modal-close`,
                onClick: t,
                "aria-label": `Close`,
                children: `×`,
              }),
              n,
            ],
          }),
        })
      : null,
  fv = () => {
    let [e, t] = (0, f.useState)(!1);
    return (0, q.jsxs)(q.Fragment, {
      children: [
        (0, q.jsxs)(`div`, {
          className: `row align-items-center justify-content-center g-5 min-vh-75`,
          children: [
            (0, q.jsx)(`section`, {
              className: `col-12 col-lg-7`,
              "aria-labelledby": `app-title`,
              children: (0, q.jsxs)(`div`, {
                className: `auth-intro`,
                children: [
                  (0, q.jsx)(`span`, {
                    className: `auth-eyebrow`,
                    children: `QUIZ MAKING MADE SIMPLE`,
                  }),
                  (0, q.jsxs)(`h1`, {
                    id: `app-title`,
                    className: `auth-title`,
                    children: [`Rev`, (0, q.jsx)(`span`, { children: `Bot` })],
                  }),
                  (0, q.jsx)(`p`, {
                    className: `auth-description`,
                    children: `Create multiple-choice quizzes from your own questions and answers. RevBot automatically generates and grades quizzes, making it easier to prepare assessments quickly.`,
                  }),
                  (0, q.jsxs)(`div`, {
                    className: `auth-features`,
                    children: [
                      (0, q.jsxs)(`div`, {
                        className: `auth-feature`,
                        children: [
                          (0, q.jsx)(`span`, {
                            className: `auth-feature-icon`,
                            children: `✦`,
                          }),
                          (0, q.jsxs)(`div`, {
                            children: [
                              (0, q.jsx)(`strong`, {
                                children: `Generate quizzes`,
                              }),
                              (0, q.jsx)(`p`, {
                                children: `Turn your questions into ready-to-use quizzes.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, q.jsxs)(`div`, {
                        className: `auth-feature`,
                        children: [
                          (0, q.jsx)(`span`, {
                            className: `auth-feature-icon`,
                            children: `✓`,
                          }),
                          (0, q.jsxs)(`div`, {
                            children: [
                              (0, q.jsx)(`strong`, {
                                children: `Automatic grading`,
                              }),
                              (0, q.jsx)(`p`, {
                                children: `Get your results without checking every answer.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, q.jsx)(`section`, {
              className: `col-12 col-md-8 col-lg-5`,
              "aria-label": `Login`,
              children: (0, q.jsx)(bu, {
                children: (0, q.jsx)(Ug, { onSignUp: () => t(!0) }),
              }),
            }),
          ],
        }),
        (0, q.jsx)(dv, {
          isOpen: e,
          onClose: () => t(!1),
          children: (0, q.jsx)(bu, { children: (0, q.jsx)(uv, {}) }),
        }),
      ],
    });
  },
  pv = ({ isAllowed: e, redirectPath: t }) =>
    e ? (0, q.jsx)(da, {}) : (0, q.jsx)(ua, { to: t, replace: !0 }),
  mv,
  hv = (e, t) => {
    (clearTimeout(mv),
      (mv = setTimeout(() => {
        (console.log(`searching`), e(t));
      }, 500)));
  },
  gv = ({ children: e, search: t, title: n, setSearchVal: r }) => {
    let i = (e) => {
        hv(r, e.target.value);
      },
      a = `${n.toLowerCase().replace(/\s+/g, `-`)}-title`;
    return (0, q.jsxs)(`section`, {
      className: `item-container`,
      "aria-labelledby": a,
      children: [
        (0, q.jsxs)(`header`, {
          className: `item-container-header`,
          children: [
            (0, q.jsx)(`div`, {
              children: (0, q.jsx)(`h2`, { id: a, children: n }),
            }),
            t &&
              (0, q.jsxs)(`div`, {
                className: `item-container-search`,
                children: [
                  (0, q.jsx)(ao, { "aria-hidden": `true` }),
                  (0, q.jsxs)(`label`, {
                    htmlFor: `${a}-search`,
                    className: `visually-hidden`,
                    children: [`Search `, n],
                  }),
                  (0, q.jsx)(`input`, {
                    id: `${a}-search`,
                    type: `search`,
                    name: `search`,
                    placeholder: `Search ${n}...`,
                    onChange: i,
                  }),
                ],
              }),
          ],
        }),
        (0, q.jsx)(`div`, { className: `item-container-content`, children: e }),
      ],
    });
  },
  _v = (e, t, n, r, i) => {
    (0, f.useEffect)(() => {
      (async () => {
        let a = await cu(e, i);
        if (a) {
          let { items: e, subject: i, quizName: o } = a.data;
          (t(e), n(i), r(o));
        }
      })();
    }, [e, i, t, r, n]);
  },
  vv,
  yv = (e, t, n) => {
    (clearTimeout(vv),
      (vv = setTimeout(() => {
        su(e, t, n);
      }, 1e3)));
  },
  bv = () => {
    let [e, t] = (0, f.useState)(xv),
      [n, r] = (0, f.useState)(``),
      [i, a] = (0, f.useState)(``),
      o = (0, f.useRef)(null),
      s = Bi();
    _v(`createQuiz`, t, r, a);
    let c = () => {
        let n = [...e, { question: ``, answer: `` }];
        (t(n),
          setTimeout(() => {
            o.current && (o.current.scrollTop = o.current.scrollHeight);
          }, 10));
      },
      l = (r) => {
        let a = [...e];
        (a.splice(r, 1),
          t(a),
          yv(`createQuiz`, { items: a, subject: n, quizName: i }));
      },
      u = (r, a) => {
        let o = e.map((e, t) =>
          t === a ? { ...e, [r.target.name]: r.target.value } : e,
        );
        (t(o), yv(`createQuiz`, { items: o, subject: n, quizName: i }));
      };
    return (0, q.jsxs)(`section`, {
      className: `create-quiz`,
      children: [
        (0, q.jsxs)(`header`, {
          className: `create-quiz-header`,
          children: [
            (0, q.jsx)(`span`, {
              className: `form-eyebrow`,
              children: `QUIZ BUILDER`,
            }),
            (0, q.jsx)(`h1`, {
              className: `create-quiz-title`,
              children: `Create Quiz`,
            }),
            (0, q.jsx)(`p`, {
              className: `create-quiz-description`,
              children: `Create a quiz by providing the basic information and adding questions.`,
            }),
          ],
        }),
        (0, q.jsxs)(`form`, {
          className: `create-quiz-form`,
          autoComplete: `off`,
          onSubmit: async (t) => {
            t.preventDefault();
            let r = await $l(n, i, e);
            if (r.error) {
              alert(r.error);
              return;
            }
            (await lu(`createQuiz`), s(`/`));
          },
          children: [
            (0, q.jsxs)(`section`, {
              className: `create-quiz-card`,
              "aria-labelledby": `quiz-info-title`,
              children: [
                (0, q.jsx)(`header`, {
                  className: `create-quiz-card-header`,
                  children: (0, q.jsxs)(`div`, {
                    children: [
                      (0, q.jsx)(`h2`, {
                        id: `quiz-info-title`,
                        children: `Quiz Information`,
                      }),
                      (0, q.jsx)(`p`, {
                        children: `Provide the basic details for your quiz.`,
                      }),
                    ],
                  }),
                }),
                (0, q.jsxs)(`div`, {
                  className: `row g-3`,
                  children: [
                    (0, q.jsx)(`div`, {
                      className: `col-12 col-md-6`,
                      children: (0, q.jsxs)(`div`, {
                        className: `form-field`,
                        children: [
                          (0, q.jsx)(`label`, {
                            htmlFor: `subject`,
                            children: `Subject`,
                          }),
                          (0, q.jsx)(`input`, {
                            id: `subject`,
                            type: `text`,
                            name: `subject`,
                            value: n,
                            placeholder: `e.g. Mathematics`,
                            onChange: (t) => {
                              (r(t.target.value),
                                yv(`createQuiz`, {
                                  items: e,
                                  subject: t.target.value,
                                  quizName: i,
                                }));
                            },
                            required: !0,
                          }),
                        ],
                      }),
                    }),
                    (0, q.jsx)(`div`, {
                      className: `col-12 col-md-6`,
                      children: (0, q.jsxs)(`div`, {
                        className: `form-field`,
                        children: [
                          (0, q.jsx)(`label`, {
                            htmlFor: `quizName`,
                            children: `Quiz Name`,
                          }),
                          (0, q.jsx)(`input`, {
                            id: `quizName`,
                            type: `text`,
                            name: `quizName`,
                            value: i,
                            placeholder: `e.g. Algebra Quiz`,
                            onChange: (t) => {
                              (a(t.target.value),
                                yv(`createQuiz`, {
                                  items: e,
                                  subject: n,
                                  quizName: t.target.value,
                                }));
                            },
                            required: !0,
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, q.jsxs)(gv, {
              search: !1,
              title: `Questions`,
              children: [
                (0, q.jsx)(`div`, {
                  className: `question-list`,
                  ref: o,
                  children: e.map((t, n) =>
                    (0, q.jsxs)(
                      `article`,
                      {
                        className: `question-card`,
                        children: [
                          (0, q.jsxs)(`header`, {
                            className: `question-card-header`,
                            children: [
                              (0, q.jsxs)(`div`, {
                                children: [
                                  (0, q.jsxs)(`span`, {
                                    className: `question-number`,
                                    children: [`QUESTION `, n + 1],
                                  }),
                                  (0, q.jsxs)(`h3`, {
                                    children: [`Question `, n + 1],
                                  }),
                                ],
                              }),
                              (0, q.jsx)(`button`, {
                                type: `button`,
                                className: `btn btn-danger`,
                                onClick: () => l(n),
                                disabled: e.length <= 3,
                                title:
                                  e.length <= 3
                                    ? `A quiz must contain at least 3 questions`
                                    : `Delete question`,
                                children: `Delete`,
                              }),
                            ],
                          }),
                          (0, q.jsxs)(`div`, {
                            className: `question-card-body`,
                            children: [
                              (0, q.jsxs)(`div`, {
                                className: `form-field`,
                                children: [
                                  (0, q.jsx)(`label`, {
                                    htmlFor: `question-${n}`,
                                    children: `Question`,
                                  }),
                                  (0, q.jsx)(`textarea`, {
                                    id: `question-${n}`,
                                    rows: `4`,
                                    name: `question`,
                                    required: !0,
                                    placeholder: `Enter your question...`,
                                    value: t.question,
                                    onChange: (e) => u(e, n),
                                  }),
                                ],
                              }),
                              (0, q.jsxs)(`div`, {
                                className: `form-field`,
                                children: [
                                  (0, q.jsx)(`label`, {
                                    htmlFor: `answer-${n}`,
                                    children: `Answer`,
                                  }),
                                  (0, q.jsx)(`input`, {
                                    id: `answer-${n}`,
                                    type: `text`,
                                    name: `answer`,
                                    required: !0,
                                    placeholder: `Enter the correct answer...`,
                                    value: t.answer,
                                    onChange: (e) => u(e, n),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      n,
                    ),
                  ),
                }),
                (0, q.jsx)(`footer`, {
                  className: `question-list-footer`,
                  children: (0, q.jsx)(`button`, {
                    type: `button`,
                    className: `btn btn-secondary`,
                    onClick: c,
                    children: `+ Add Question`,
                  }),
                }),
              ],
            }),
            (0, q.jsx)(`footer`, {
              className: `create-quiz-actions`,
              children: (0, q.jsx)(`button`, {
                type: `submit`,
                className: `btn btn-primary`,
                children: `Create Quiz`,
              }),
            }),
          ],
        }),
      ],
    });
  },
  xv = [
    { question: ``, answer: `` },
    { question: ``, answer: `` },
    { question: ``, answer: `` },
  ],
  Sv = () =>
    (0, q.jsx)(`div`, {
      className: `create-quiz-page`,
      children: (0, q.jsx)(bv, {}),
    }),
  Cv = o((e, t) => {
    (function (t, n) {
      typeof define == `function` && define.amd
        ? define([], n)
        : e === void 0
          ? (n(), (t.FileSaver = { exports: {} }.exports))
          : n();
    })(e, function () {
      function e(e, t) {
        return (
          t === void 0
            ? (t = { autoBom: !1 })
            : typeof t != `object` &&
              (console.warn(
                `Deprecated: Expected third argument to be a object`,
              ),
              (t = { autoBom: !t })),
          t.autoBom &&
          /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
            e.type,
          )
            ? new Blob([`﻿`, e], { type: e.type })
            : e
        );
      }
      function n(e, t, n) {
        var r = new XMLHttpRequest();
        (r.open(`GET`, e),
          (r.responseType = `blob`),
          (r.onload = function () {
            s(r.response, t, n);
          }),
          (r.onerror = function () {
            console.error(`could not download file`);
          }),
          r.send());
      }
      function r(e) {
        var t = new XMLHttpRequest();
        t.open(`HEAD`, e, !1);
        try {
          t.send();
        } catch {}
        return 200 <= t.status && 299 >= t.status;
      }
      function i(e) {
        try {
          e.dispatchEvent(new MouseEvent(`click`));
        } catch {
          var t = document.createEvent(`MouseEvents`);
          (t.initMouseEvent(
            `click`,
            !0,
            !0,
            window,
            0,
            0,
            0,
            80,
            20,
            !1,
            !1,
            !1,
            !1,
            0,
            null,
          ),
            e.dispatchEvent(t));
        }
      }
      var a =
          typeof window == `object` && window.window === window
            ? window
            : typeof self == `object` && self.self === self
              ? self
              : typeof global == `object` && global.global === global
                ? global
                : void 0,
        o =
          a.navigator &&
          /Macintosh/.test(navigator.userAgent) &&
          /AppleWebKit/.test(navigator.userAgent) &&
          !/Safari/.test(navigator.userAgent),
        s =
          a.saveAs ||
          (typeof window != `object` || window !== a
            ? function () {}
            : `download` in HTMLAnchorElement.prototype && !o
              ? function (e, t, o) {
                  var s = a.URL || a.webkitURL,
                    c = document.createElement(`a`);
                  ((t = t || e.name || `download`),
                    (c.download = t),
                    (c.rel = `noopener`),
                    typeof e == `string`
                      ? ((c.href = e),
                        c.origin === location.origin
                          ? i(c)
                          : r(c.href)
                            ? n(e, t, o)
                            : i(c, (c.target = `_blank`)))
                      : ((c.href = s.createObjectURL(e)),
                        setTimeout(function () {
                          s.revokeObjectURL(c.href);
                        }, 4e4),
                        setTimeout(function () {
                          i(c);
                        }, 0)));
                }
              : `msSaveOrOpenBlob` in navigator
                ? function (t, a, o) {
                    if (((a = a || t.name || `download`), typeof t != `string`))
                      navigator.msSaveOrOpenBlob(e(t, o), a);
                    else if (r(t)) n(t, a, o);
                    else {
                      var s = document.createElement(`a`);
                      ((s.href = t),
                        (s.target = `_blank`),
                        setTimeout(function () {
                          i(s);
                        }));
                    }
                  }
                : function (e, t, r, i) {
                    if (
                      ((i ||= open(``, `_blank`)),
                      i &&
                        (i.document.title = i.document.body.innerText =
                          `downloading...`),
                      typeof e == `string`)
                    )
                      return n(e, t, r);
                    var s = e.type === `application/octet-stream`,
                      c = /constructor/i.test(a.HTMLElement) || a.safari,
                      l = /CriOS\/[\d]+/.test(navigator.userAgent);
                    if ((l || (s && c) || o) && typeof FileReader < `u`) {
                      var u = new FileReader();
                      ((u.onloadend = function () {
                        var e = u.result;
                        ((e = l
                          ? e
                          : e.replace(/^data:[^;]*;/, `data:attachment/file;`)),
                          i ? (i.location.href = e) : (location = e),
                          (i = null));
                      }),
                        u.readAsDataURL(e));
                    } else {
                      var d = a.URL || a.webkitURL,
                        f = d.createObjectURL(e);
                      (i ? (i.location = f) : (location.href = f),
                        (i = null),
                        setTimeout(function () {
                          d.revokeObjectURL(f);
                        }, 4e4));
                    }
                  });
      ((a.saveAs = s.saveAs = s), t !== void 0 && (t.exports = s));
    });
  })(),
  wv = ({ quiz: e, onSelect: t, onDownload: n }) => {
    let r = Bi();
    return (0, q.jsxs)(`article`, {
      className: `quiz-card`,
      children: [
        (0, q.jsx)(`header`, {
          className: `quiz-card-header`,
          children: (0, q.jsxs)(`div`, {
            children: [
              (0, q.jsx)(`h2`, { children: e.quizName }),
              (0, q.jsx)(`span`, { children: `Quiz` }),
            ],
          }),
        }),
        (0, q.jsx)(`hr`, {}),
        (0, q.jsxs)(`p`, { children: [`Number of items: `, e.numberOfItems] }),
        (0, q.jsxs)(`div`, {
          className: `quiz-card-actions`,
          children: [
            (0, q.jsx)(`button`, {
              type: `button`,
              className: `btn btn-primary`,
              onClick: () => t(e._id),
              children: `Start quiz`,
            }),
            (0, q.jsx)(`button`, {
              type: `button`,
              className: `btn btn-secondary`,
              onClick: () => r(`/quiz/update/${e._id}`),
              children: `Update`,
            }),
            (0, q.jsx)(`button`, {
              type: `button`,
              className: `btn btn-secondary`,
              onClick: (t) => n(t, e._id),
              children: `Download PDF`,
            }),
          ],
        }),
      ],
    });
  },
  Tv = ({ selectingType: e, quizId: t, onClose: n }) => {
    let r = Bi(),
      i = (e) => {
        (e === `multipleChoice` && r(t), e === `enumeration` && r(`enum/${t}`));
      };
    return e
      ? (0, q.jsxs)(`section`, {
          "aria-labelledby": `quiz-type-title`,
          children: [
            (0, q.jsx)(`h2`, {
              id: `quiz-type-title`,
              children: `Select quiz type`,
            }),
            (0, q.jsxs)(`div`, {
              children: [
                (0, q.jsx)(`button`, {
                  type: `button`,
                  onClick: () => i(`multipleChoice`),
                  children: `Multiple choices`,
                }),
                (0, q.jsx)(`button`, {
                  type: `button`,
                  onClick: () => i(`enumeration`),
                  children: `Enumeration`,
                }),
                (0, q.jsx)(`button`, {
                  type: `button`,
                  onClick: n,
                  children: `Cancel`,
                }),
              ],
            }),
          ],
        })
      : null;
  },
  Ev = () => {
    let { subject: e } = Wi(),
      [t, n] = (0, f.useState)([]),
      [r, i] = (0, f.useState)(``),
      { isLoading: a, setSkipCount: o } = ho(
        n,
        po(r, 400),
        tu,
        (0, f.useMemo)(() => ({ subject: e }), [e]),
      );
    return {
      quizzes: t,
      isLoading: a,
      searchInput: r,
      handleSearch: (e) => {
        i(e.target.value);
      },
      handleScroll: (e) => {
        hu(e, t, o);
      },
    };
  },
  Dv = () => {
    let {
        quizzes: e,
        isLoading: t,
        searchInput: n,
        handleSearch: r,
        handleScroll: i,
      } = Ev(),
      [a, o] = (0, f.useState)(null),
      s = (e) => {
        o(e);
      },
      c = () => {
        o(null);
      },
      l = async (e, t) => {
        e.stopPropagation();
        let n = await fu(t),
          r = await pu(n.pdfName);
        ((0, Cv.saveAs)(r, n.pdfName), await mu(n.path));
      };
    return t
      ? (0, q.jsx)(_u, {})
      : (0, q.jsxs)(`section`, {
          className: `list-page`,
          "aria-labelledby": `quiz-list-title`,
          children: [
            (0, q.jsxs)(`header`, {
              className: `list-page-header`,
              children: [
                (0, q.jsxs)(`div`, {
                  children: [
                    (0, q.jsx)(`h1`, {
                      id: `quiz-list-title`,
                      className: `list-page-title`,
                      children: `Quizzes`,
                    }),
                    (0, q.jsx)(`p`, {
                      className: `list-page-description`,
                      children: `Choose a quiz to get started`,
                    }),
                  ],
                }),
                (0, q.jsx)(fo, {
                  value: n,
                  onChange: r,
                  placeholder: `Search quizzes...`,
                }),
              ],
            }),
            e.length > 0
              ? (0, q.jsx)(`ul`, {
                  className: `list-page-grid`,
                  onScroll: i,
                  children: e.map((e) =>
                    (0, q.jsx)(
                      `li`,
                      {
                        children: (0, q.jsx)(wv, {
                          quiz: e,
                          onSelect: s,
                          onDownload: l,
                        }),
                      },
                      e._id,
                    ),
                  ),
                })
              : (0, q.jsx)(Ga, {
                  title: `No quizzes found`,
                  description: `There are no quizzes matching your search.`,
                }),
            (0, q.jsx)(Tv, {
              selectingType: a !== null,
              quizId: a,
              onClose: c,
            }),
          ],
        });
  },
  Ov = () => (0, q.jsx)(Dv, {}),
  kv = (e, t) => {
    let [n, r] = (0, f.useState)(!0),
      [i, a] = (0, f.useState)(!1),
      [o, s] = (0, f.useState)({});
    return (
      (0, f.useEffect)(() => {
        (async () => {
          let t = await nu(e);
          (s(t), t.quizEnded && a(!0), r(!1));
        })();
      }, [t, e]),
      { isLoading: n, item: o, quizEnded: i }
    );
  },
  Av = () => {
    let [e, t] = (0, f.useState)(0),
      { quizId: n } = Wi(),
      { isLoading: r, item: i, quizEnded: a } = kv(n, e),
      [o, s] = (0, f.useState)(!1),
      [c, l] = (0, f.useState)(!1),
      [u, d] = (0, f.useState)(``),
      [p, m] = (0, f.useState)(!1),
      h = (0, f.useRef)([]),
      g = Bi(),
      _ = async (n, r, i) => {
        m(!0);
        let a = await ru(r, n);
        if (a.error) return alert(`error`);
        a.correct
          ? (h.current[i].classList.add(`bgCorrect`),
            h.current[i].classList.add(`text-white`),
            l(!0),
            setTimeout(() => {
              (h.current[i].classList.remove(`bgCorrect`),
                h.current[i].classList.remove(`text-white`),
                t(e + 1),
                m(!1),
                l(!1));
            }, 1500))
          : (d(a.correctAns), s(!0));
      };
    return a
      ? ((async () => {
          let e = await iu(n);
          await g(`/quiz/records/${e._id}`);
        })(),
        ``)
      : r
        ? (0, q.jsx)(_u, {})
        : (0, q.jsx)(`main`, {
            className: `quiz-play-page`,
            children: (0, q.jsxs)(`section`, {
              className: `quiz-play`,
              "aria-labelledby": `quiz-play-title`,
              children: [
                (0, q.jsxs)(`header`, {
                  className: `quiz-play-header`,
                  children: [
                    (0, q.jsxs)(`div`, {
                      children: [
                        (0, q.jsx)(`span`, {
                          className: `form-eyebrow`,
                          children: `QUIZ IN PROGRESS`,
                        }),
                        (0, q.jsx)(`h1`, {
                          id: `quiz-play-title`,
                          children: i.quizName,
                        }),
                        (0, q.jsx)(`p`, { children: i.subject }),
                      ],
                    }),
                    (0, q.jsxs)(`dl`, {
                      className: `quiz-stats`,
                      children: [
                        (0, q.jsxs)(`div`, {
                          children: [
                            (0, q.jsx)(`dt`, { children: `Score` }),
                            (0, q.jsx)(`dd`, { children: i.score }),
                          ],
                        }),
                        (0, q.jsxs)(`div`, {
                          children: [
                            (0, q.jsx)(`dt`, { children: `Question` }),
                            (0, q.jsxs)(`dd`, {
                              children: [
                                i.questionNumber,
                                ` `,
                                (0, q.jsxs)(`span`, {
                                  children: [`/ `, i.numberOfItems],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, q.jsx)(`div`, {
                  className: `quiz-progress`,
                  "aria-label": `Question ${i.questionNumber} of ${i.numberOfItems}`,
                  children: (0, q.jsx)(`span`, {
                    style: {
                      width: `${(i.questionNumber / i.numberOfItems) * 100}%`,
                    },
                  }),
                }),
                (0, q.jsxs)(`section`, {
                  className: `quiz-question-panel`,
                  "aria-labelledby": `question-title`,
                  children: [
                    o &&
                      (0, q.jsx)(jv, {
                        correctAns: u,
                        setShowCorrectAnsPopup: s,
                        setNumAnswered: t,
                        setDisableSubmittion: m,
                      }),
                    (0, q.jsxs)(`header`, {
                      className: `quiz-question-header`,
                      children: [
                        (0, q.jsxs)(`span`, {
                          children: [`QUESTION `, i.questionNumber],
                        }),
                        c &&
                          (0, q.jsx)(`strong`, {
                            className: `quiz-correct-feedback`,
                            "aria-live": `polite`,
                            children: `Correct!`,
                          }),
                      ],
                    }),
                    (0, q.jsx)(`h2`, {
                      id: `question-title`,
                      className: `quiz-question-text`,
                      children: i.question,
                    }),
                    (0, q.jsx)(`div`, {
                      className: `quiz-choices`,
                      "aria-label": `Answer choices`,
                      children: i.choices.map((e, t) =>
                        e
                          ? (0, q.jsx)(
                              `button`,
                              {
                                type: `button`,
                                className: `quiz-choice`,
                                ref: (e) => {
                                  h.current[t] = e;
                                },
                                onClick: () => _(e, i._id, t),
                                disabled: p,
                                children: e,
                              },
                              t,
                            )
                          : null,
                      ),
                    }),
                  ],
                }),
              ],
            }),
          });
  },
  jv = ({
    correctAns: e,
    setShowCorrectAnsPopup: t,
    setNumAnswered: n,
    setDisableSubmittion: r,
  }) =>
    (0, q.jsx)(`div`, {
      className: `quiz-answer-modal`,
      role: `presentation`,
      children: (0, q.jsxs)(`section`, {
        className: `quiz-answer-modal-card`,
        role: `dialog`,
        "aria-modal": `true`,
        "aria-labelledby": `incorrect-answer-title`,
        children: [
          (0, q.jsx)(`span`, {
            className: `form-eyebrow`,
            children: `KEEP GOING`,
          }),
          (0, q.jsx)(`h2`, {
            id: `incorrect-answer-title`,
            children: `Incorrect answer`,
          }),
          (0, q.jsx)(`p`, {
            className: `quiz-answer-modal-label`,
            children: `The correct answer is`,
          }),
          (0, q.jsx)(`p`, {
            className: `quiz-answer-modal-value`,
            children: e,
          }),
          (0, q.jsx)(`button`, {
            type: `button`,
            className: `btn btn-primary`,
            onClick: () => {
              (n((e) => e + 1), t(!1), r(!1));
            },
            children: `Next question`,
          }),
        ],
      }),
    }),
  Mv = ({ record: e, onSelect: t }) =>
    (0, q.jsxs)(`article`, {
      className: `record-card`,
      role: `button`,
      tabIndex: 0,
      onClick: () => t(e._id),
      onKeyDown: (n) => {
        (n.key === `Enter` || n.key === ` `) && (n.preventDefault(), t(e._id));
      },
      children: [
        (0, q.jsxs)(`header`, {
          className: `record-card-header`,
          children: [
            (0, q.jsxs)(`div`, {
              children: [
                (0, q.jsx)(`span`, {
                  className: `record-card-type`,
                  children: `QUIZ RECORD`,
                }),
                (0, q.jsx)(`h2`, { children: e.quizName }),
              ],
            }),
            (0, q.jsx)(`time`, { children: e.date }),
          ],
        }),
        (0, q.jsxs)(`dl`, {
          className: `record-card-stats`,
          children: [
            (0, q.jsxs)(`div`, {
              children: [
                (0, q.jsx)(`dt`, { children: `Score` }),
                (0, q.jsx)(`dd`, { children: e.score }),
              ],
            }),
            (0, q.jsxs)(`div`, {
              children: [
                (0, q.jsx)(`dt`, { children: `Questions` }),
                (0, q.jsx)(`dd`, { children: e.numberOfItems }),
              ],
            }),
          ],
        }),
      ],
    }),
  Nv = () => {
    let [e, t] = (0, f.useState)([]),
      [n, r] = (0, f.useState)(``),
      { isLoading: i, setSkipCount: a } = ho(t, po(n, 400), au);
    return {
      records: e,
      isLoading: i,
      searchInput: n,
      handleSearch: (e) => {
        r(e.target.value);
      },
      handleScroll: (t) => {
        hu(t, e, a);
      },
    };
  },
  Pv = () => {
    let {
        records: e,
        isLoading: t,
        searchInput: n,
        handleSearch: r,
        handleScroll: i,
      } = Nv(),
      a = Bi();
    return t
      ? (0, q.jsx)(_u, {})
      : (0, q.jsxs)(`section`, {
          className: `records-list`,
          "aria-labelledby": `records-title`,
          children: [
            (0, q.jsxs)(`header`, {
              className: `records-list-header`,
              children: [
                (0, q.jsxs)(`div`, {
                  children: [
                    (0, q.jsx)(`span`, {
                      className: `form-eyebrow`,
                      children: `QUIZ HISTORY`,
                    }),
                    (0, q.jsx)(`h1`, {
                      id: `records-title`,
                      children: `Records`,
                    }),
                    (0, q.jsx)(`p`, {
                      children: `Review your previous quiz results.`,
                    }),
                  ],
                }),
                (0, q.jsx)(fo, {
                  value: n,
                  onChange: r,
                  placeholder: `Search records...`,
                }),
              ],
            }),
            e.length > 0
              ? (0, q.jsx)(`div`, {
                  className: `records-grid`,
                  onScroll: i,
                  children: e.map((e) =>
                    (0, q.jsx)(Mv, { record: e, onSelect: (e) => a(e) }, e._id),
                  ),
                })
              : (0, q.jsx)(Ga, {
                  title: `No records found`,
                  description: `Complete a quiz to see its results here.`,
                }),
          ],
        });
  },
  Fv = () =>
    (0, q.jsx)(`div`, {
      className: `records-page`,
      children: (0, q.jsx)(Pv, {}),
    }),
  Iv = (e) => {
    let [t, n] = (0, f.useState)(!0),
      [r, i] = (0, f.useState)([]);
    return (
      (0, f.useEffect)(() => {
        (async () => {
          let t = await ou(e);
          (i(t), n(!1));
        })();
      }, [e]),
      { isLoading: t, record: r }
    );
  },
  Lv = ({ children: e, record: t }) => {
    let n = on((e) => e.auth),
      r = t.items.length;
    return (0, q.jsxs)(`section`, {
      className: `record-preview`,
      "aria-labelledby": `record-preview-title`,
      children: [
        (0, q.jsxs)(`header`, {
          className: `record-preview-header`,
          children: [
            (0, q.jsxs)(`div`, {
              children: [
                (0, q.jsx)(`span`, {
                  className: `form-eyebrow`,
                  children: `QUIZ REVIEW`,
                }),
                (0, q.jsx)(`h1`, {
                  id: `record-preview-title`,
                  children: t.quizName,
                }),
                (0, q.jsx)(`p`, { children: t.subject }),
              ],
            }),
            (0, q.jsxs)(`dl`, {
              className: `record-preview-stats`,
              children: [
                (0, q.jsxs)(`div`, {
                  children: [
                    (0, q.jsx)(`dt`, { children: `Score` }),
                    (0, q.jsxs)(`dd`, {
                      children: [
                        t.score,
                        ` `,
                        (0, q.jsxs)(`span`, { children: [`/ `, r] }),
                      ],
                    }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  children: [
                    (0, q.jsx)(`dt`, { children: `Completed` }),
                    (0, q.jsx)(`dd`, { children: t.date }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  children: [
                    (0, q.jsx)(`dt`, { children: `Student` }),
                    (0, q.jsx)(`dd`, { children: n.user.username }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, q.jsx)(`div`, { className: `record-preview-body`, children: e }),
      ],
    });
  },
  Rv = ({ record: e }) =>
    (0, q.jsxs)(`section`, {
      className: `record-items`,
      "aria-labelledby": `answer-review-title`,
      children: [
        (0, q.jsxs)(`header`, {
          className: `record-items-header`,
          children: [
            (0, q.jsx)(`h2`, {
              id: `answer-review-title`,
              children: `Answer review`,
            }),
            (0, q.jsx)(`p`, {
              children: `Review your answers and see which questions you got right.`,
            }),
          ],
        }),
        (0, q.jsx)(`div`, {
          className: `record-questions`,
          children: e.items.map((e, t) => {
            let n = e.correct;
            return (0, q.jsxs)(
              `article`,
              {
                className: `record-question ${n ? `record-question-correct` : `record-question-incorrect`}`,
                children: [
                  (0, q.jsxs)(`header`, {
                    className: `record-question-header`,
                    children: [
                      (0, q.jsxs)(`div`, {
                        className: `record-question-status`,
                        children: [
                          n
                            ? (0, q.jsx)(eo, { className: `correct-icon` })
                            : (0, q.jsx)(uo, { className: `incorrect-icon` }),
                          (0, q.jsxs)(`span`, {
                            className: `record-question-number`,
                            children: [`Question `, t + 1],
                          }),
                        ],
                      }),
                      (0, q.jsx)(`span`, {
                        className: `record-result ${n ? `correct-answer` : `incorrect-answer`}`,
                        children: n ? `Correct` : `Incorrect`,
                      }),
                    ],
                  }),
                  (0, q.jsxs)(`div`, {
                    className: `record-question-body`,
                    children: [
                      (0, q.jsx)(`p`, {
                        className: `record-question-text`,
                        children: e.question,
                      }),
                      (0, q.jsxs)(`div`, {
                        className: `record-answers`,
                        children: [
                          (0, q.jsxs)(`div`, {
                            className: `record-answer`,
                            children: [
                              (0, q.jsx)(`span`, {
                                className: `record-answer-label`,
                                children: `Your answer`,
                              }),
                              (0, q.jsx)(`span`, {
                                className: `record-answer-value ${n ? `correct-answer` : `incorrect-answer`}`,
                                children: e.userAnswer,
                              }),
                            ],
                          }),
                          !n &&
                            (0, q.jsxs)(`div`, {
                              className: `record-answer`,
                              children: [
                                (0, q.jsx)(`span`, {
                                  className: `record-answer-label`,
                                  children: `Correct answer`,
                                }),
                                (0, q.jsx)(`span`, {
                                  className: `record-answer-value correct-answer`,
                                  children: e.answer,
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              t,
            );
          }),
        }),
      ],
    }),
  zv = () => {
    let { recordId: e } = Wi(),
      { isLoading: t, record: n } = Iv(e);
    return t
      ? (0, q.jsx)(_u, {})
      : (0, q.jsx)(`div`, {
          className: `record-page`,
          children: (0, q.jsx)(Lv, {
            record: n,
            children: (0, q.jsx)(Rv, { record: n }),
          }),
        });
  },
  Bv = async (e) => (await $.post(`/user/changePass`, e)).data,
  Vv = async (e) => (await $.post(`/user/changeProfileImg`, e)).data,
  Hv = async () => (await $.get(`/user/profileImg`)).data,
  Uv = async (e) => (await $.put(`/user/email`, { newEmail: e })).data,
  Wv = async (e, t) =>
    (await $.put(`/user/verifyEmail`, { userId: e, token: t })).data,
  Gv = async (e) =>
    (await $.put(`/user/sendResetPassRequest`, { email: e })).data,
  Kv = async (e, t, n) =>
    (await $.put(`/user/verifyToken`, { userId: e, token: t, type: n })).data,
  qv = async (e, t) =>
    (await $.put(`/user/resetPass`, { userId: e, newPassword: t })).data,
  Jv = `/assets/profile-sFOibm1o.png`,
  Yv = () => {
    let [e, t] = (0, f.useState)();
    (0, f.useEffect)(() => {
      (async () => {
        let e = await Hv();
        t(e.url);
      })();
    }, []);
    let n = (e) => {
        let n = e.target.files[0],
          i = new FileReader();
        ((i.onload = (e) => {
          t(e.target.result);
        }),
          i.readAsDataURL(n),
          r(n));
      },
      r = async (e) => {
        let t = new FormData();
        (t.append(`image`, e), Vv(t));
      };
    return (0, q.jsxs)(`div`, {
      className: `profileImage`,
      children: [
        (0, q.jsx)(`label`, {
          className: `imageInput`,
          htmlFor: `imageInput`,
          children: (0, q.jsx)(`div`, {
            className: `imgFrame`,
            children: (0, q.jsx)(`img`, { src: e || Jv, alt: `Profile` }),
          }),
        }),
        (0, q.jsx)(`input`, {
          id: `imageInput`,
          type: `file`,
          accept: `image/*`,
          name: `image`,
          style: { display: `none` },
          onChange: n,
        }),
      ],
    });
  },
  Xv = sv().shape({
    oldPassword: K_().required(`Old password is required`),
    newPassword: K_()
      .min(8, `Password must be at least 8 characters`)
      .matches(/[A-Z]/, `Password must contain at least one uppercase`)
      .matches(/[a-z]/, `Password must contain at least one lowercase`)
      .matches(
        /(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]/,
        `Password must be alphanumeric`,
      )
      .required(`Password is required`),
    confirmPassword: K_()
      .oneOf([S_(`newPassword`), null], `Passwords must match`)
      .required(`Confirm password is required`),
  }),
  Zv = () => {
    let e = { oldPassword: ``, newPassword: ``, confirmPassword: `` },
      t = async (e, t) => {
        let n = await Bv(e);
        if (n.error) return alert(n.error);
        (alert(`password changed`), t());
      };
    return (0, q.jsx)(_g, {
      initialValues: e,
      validationSchema: Xv,
      onSubmit: async (e, { setSubmitting: n, resetForm: r }) => {
        (await t(e, r), n(!1));
      },
      children: ({ isSubmitting: e }) =>
        (0, q.jsxs)(Dg, {
          className: `changePassForm`,
          children: [
            (0, q.jsx)(`label`, {
              className: `formTitle fw-bold`,
              children: `Change password`,
            }),
            (0, q.jsx)(Lg, {
              type: `password`,
              name: `oldPassword`,
              label: `Old password`,
            }),
            (0, q.jsx)(Lg, {
              type: `password`,
              name: `newPassword`,
              label: `New password`,
            }),
            (0, q.jsx)(Lg, {
              type: `password`,
              name: `confirmPassword`,
              label: `Confirm password`,
            }),
            (0, q.jsx)(`button`, {
              className: `btn-primary mt-2`,
              type: `submit`,
              disabled: e,
              children: `Change password`,
            }),
          ],
        }),
    });
  },
  Qv = ({ label: e, name: t, ...n }) => {
    let r = n.id || t;
    return (0, q.jsx)(`div`, {
      className: `form-field`,
      children: (0, q.jsx)(`input`, {
        id: r,
        name: t,
        placeholder: e,
        required: !0,
        ...n,
      }),
    });
  },
  $v = ({ email: e }) => {
    let [t, n] = (0, f.useState)(``),
      [r, i] = (0, f.useState)(``),
      [a, o] = (0, f.useState)(!1),
      s = async (e) => {
        (e.preventDefault(), o(!0));
        let n = await Uv(t);
        (n.error &&
          (i(n.error),
          setTimeout(() => {
            i(``);
          }, 5e3)),
          n.success && alert(`Email request sent`),
          setTimeout(() => {
            o(!1);
          }, 5e3));
      };
    return e
      ? (0, q.jsxs)(`form`, {
          className: `emailForm`,
          onSubmit: s,
          children: [
            (0, q.jsxs)(`div`, {
              className: `formTitle`,
              children: [
                (0, q.jsx)(`label`, {
                  className: `formTitle fw-bold`,
                  children: `Email`,
                }),
                (0, q.jsx)(`label`, { className: `errorMessage`, children: r }),
              ],
            }),
            (0, q.jsx)(Qv, {
              type: `email`,
              onChange: (e) => n(e.target.value),
              value: t,
              placeholder: e,
            }),
            (0, q.jsx)(`label`, { className: `errorMessage`, children: r }),
            (0, q.jsx)(`button`, {
              type: `submit`,
              className: `btn-primary mt-2`,
              disabled: a,
              children: `Change email`,
            }),
          ],
        })
      : (0, q.jsxs)(`form`, {
          className: `emailForm`,
          onSubmit: s,
          children: [
            (0, q.jsxs)(`div`, {
              className: `formTitle`,
              children: [
                (0, q.jsx)(`label`, {
                  className: `formTitle fw-bold`,
                  children: `Email`,
                }),
                (0, q.jsx)(`label`, { className: `errorMessage`, children: r }),
              ],
            }),
            (0, q.jsx)(Qv, {
              type: `email`,
              label: `Email`,
              value: t,
              onChange: (e) => n(e.target.value),
            }),
            (0, q.jsx)(`button`, {
              type: `submit`,
              disabled: a,
              className: `btn-primary`,
              children: `Add new email`,
            }),
          ],
        });
  },
  ey = () => {
    let e = on((e) => e.auth.user);
    return (0, q.jsxs)(`div`, {
      className: `profilePage container`,
      children: [
        (0, q.jsxs)(`div`, {
          className: `top`,
          children: [
            (0, q.jsxs)(`div`, {
              className: `profile`,
              children: [
                (0, q.jsx)(Yv, {}),
                (0, q.jsx)(`label`, {
                  className: `bold`,
                  children: e.username,
                }),
              ],
            }),
            (0, q.jsx)(`div`, { className: `line` }),
          ],
        }),
        (0, q.jsxs)(`div`, {
          className: `bottom`,
          children: [(0, q.jsx)(Zv, {}), (0, q.jsx)($v, { email: e.email })],
        }),
      ],
    });
  },
  ty = () => {
    let [e, t] = (0, f.useState)(!0),
      [n, r] = (0, f.useState)(!1),
      { userId: i, token: a } = Wi();
    return (
      (0, f.useEffect)(() => {
        (async () => {
          ((await Wv(i, a)).success ? r(!0) : r(!1), t(!1));
        })();
      }, [a, i]),
      e
        ? (0, q.jsx)(_u, {})
        : (0, q.jsx)(`div`, {
            className: `validation-page container`,
            children: n
              ? (0, q.jsx)(`h1`, {
                  children: `Your email is verified successfully`,
                })
              : (0, q.jsx)(`h1`, { children: `Invalid link` }),
          })
    );
  },
  ny = () => {
    let [e, t] = (0, f.useState)(``),
      [n, r] = (0, f.useState)(!1),
      [i, a] = (0, f.useState)(``);
    return (0, q.jsx)(`div`, {
      className: `forgotPassPage page`,
      children: (0, q.jsxs)(`form`, {
        className: `forgotPassForm`,
        onSubmit: async (t) => {
          (t.preventDefault(), r(!0), a(``));
          try {
            let t = await Gv(e);
            if (t.error) {
              a(t.error);
              return;
            }
            t.success && alert(`Password reset email sent`);
          } finally {
            r(!1);
          }
        },
        children: [
          (0, q.jsx)(`p`, {
            className: `description`,
            children: `A password reset link will be sent to your email.`,
          }),
          (0, q.jsx)(Qv, {
            type: `email`,
            name: `email`,
            label: `Enter your email`,
            value: e,
            onChange: (e) => t(e.target.value),
          }),
          (0, q.jsx)(`button`, {
            className: `btn-primary mt-1 w-100`,
            type: `submit`,
            disabled: n,
            children: n ? `Sending...` : `Send request`,
          }),
          i && (0, q.jsx)(`p`, { className: `errorMessage`, children: i }),
        ],
      }),
    });
  },
  ry = sv().shape({
    newPassword: K_()
      .min(8, `Password must be at least 8 characters`)
      .matches(/[A-Z]/, `Password must contain at least one uppercase`)
      .matches(/[a-z]/, `Password must contain at least one lowercase`)
      .matches(
        /(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]/,
        `Password must be alphanumeric`,
      )
      .required(`Password is required`),
    confirmPassword: K_()
      .oneOf([S_(`newPassword`), null], `Passwords must match`)
      .required(`Confirm password is required`),
  }),
  iy = () => {
    let [e, t] = (0, f.useState)(!0),
      [n, r] = (0, f.useState)(!1),
      { userId: i, token: a } = Wi();
    return (
      (0, f.useEffect)(() => {
        (async () => {
          ((await Kv(i, a, `resetPass`)).success ? r(!0) : r(!1), t(!1));
        })();
      }, [a, i]),
      e
        ? (0, q.jsx)(_u, {})
        : (0, q.jsx)(`div`, {
            className: `resetPassPage page container`,
            children: n
              ? (0, q.jsx)(ay, {})
              : (0, q.jsx)(`h1`, { children: `Invalid link` }),
          })
    );
  },
  ay = () => {
    let e = Bi(),
      { userId: t } = Wi(),
      n = { newPassword: ``, confirmPassword: `` },
      r = async (t) => {
        let n = await qv(t.userId, t.newPassword);
        (n.success && e(`/`), n.error && alert(n.error));
      };
    return (0, q.jsx)(_g, {
      initialValues: n,
      validationSchema: ry,
      onSubmit: async (e, { setSubmitting: n }) => {
        ((e.userId = t), await r(e), n(!1));
      },
      children: ({ isSubmitting: e }) =>
        (0, q.jsxs)(Dg, {
          className: `resetPassform`,
          children: [
            (0, q.jsx)(Lg, {
              type: `password`,
              name: `newPassword`,
              label: `newPassword`,
            }),
            (0, q.jsx)(Lg, {
              type: `password`,
              name: `confirmPassword`,
              label: `confirmPassword`,
            }),
            (0, q.jsx)(`button`, {
              className: `btn-primary`,
              disabled: e,
              type: `submit`,
              children: `Reset password`,
            }),
          ],
        }),
    });
  },
  oy = () => {
    let [e, t] = (0, f.useState)(0),
      { quizId: n } = Wi(),
      { isLoading: r, item: i, quizEnded: a } = kv(n, e),
      [o, s] = (0, f.useState)(!1),
      [c, l] = (0, f.useState)(!1),
      [u, d] = (0, f.useState)(``),
      [p, m] = (0, f.useState)(!1),
      [h, g] = (0, f.useState)(``),
      _ = (0, f.useRef)([]),
      v = async (n, r) => {
        (console.log(n), console.log(r));
        let i = await ru(r, n);
        if (i.error) return alert(`error`);
        i.correct
          ? (m(!0),
            _.current.classList.add(`bgCorrect`),
            _.current.classList.add(`text-white`),
            l(!0),
            setTimeout(() => {
              (_.current.classList.remove(`bgCorrect`),
                _.current.classList.remove(`text-white`),
                t(e + 1),
                m(!1),
                l(!1),
                g(``));
            }, 1500))
          : (d(i.correctAns), s(!0));
      };
    return a
      ? (iu(n), (0, q.jsx)(q.Fragment, { children: `END` }))
      : r
        ? (0, q.jsx)(_u, {})
        : (0, q.jsx)(`div`, {
            className: `quizPage container`,
            children: (0, q.jsxs)(`div`, {
              className: `itemContainer`,
              children: [
                (0, q.jsxs)(`div`, {
                  className: `topDescription `,
                  children: [
                    (0, q.jsxs)(`div`, {
                      className: `d-flex justify-content-between`,
                      children: [
                        (0, q.jsxs)(`div`, {
                          className: `left d-grid`,
                          children: [
                            (0, q.jsxs)(`label`, {
                              className: `fw-bold`,
                              children: [
                                `Subject: `,
                                (0, q.jsx)(`label`, {
                                  className: `fw-normal`,
                                  children: i.subject,
                                }),
                              ],
                            }),
                            (0, q.jsxs)(`label`, {
                              className: `fw-bold`,
                              children: [
                                `Quiz Name:`,
                                ` `,
                                (0, q.jsx)(`label`, {
                                  className: `fw-normal`,
                                  children: i.quizName,
                                }),
                                ` `,
                              ],
                            }),
                          ],
                        }),
                        (0, q.jsxs)(`div`, {
                          className: `right d-grid`,
                          children: [
                            (0, q.jsxs)(`label`, {
                              className: `fw-bold`,
                              children: [
                                `Score: `,
                                (0, q.jsx)(`label`, {
                                  className: `fw-normal`,
                                  children: i.score,
                                }),
                              ],
                            }),
                            (0, q.jsxs)(`label`, {
                              className: `fw-bold`,
                              children: [
                                `Number Of Items:`,
                                ` `,
                                (0, q.jsx)(`label`, {
                                  className: `fw-normal`,
                                  children: i.numberOfItems,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, q.jsx)(`div`, { className: `line` }),
                  ],
                }),
                (0, q.jsxs)(`div`, {
                  className: `itemPanel position-relative`,
                  children: [
                    o &&
                      (0, q.jsx)(sy, {
                        correctAns: u,
                        setShowCorrectAnsPopup: s,
                        setNumAnswered: t,
                        setUserAnswer: g,
                      }),
                    (0, q.jsxs)(`div`, {
                      className: `itemBox`,
                      style: { height: `250px`, overflow: `auto` },
                      children: [
                        (0, q.jsxs)(`div`, {
                          className: `d-flex justify-content-between`,
                          children: [
                            (0, q.jsxs)(`label`, {
                              className: `itemName`,
                              children: [`Question# `, i.questionNumber, ` `],
                            }),
                            c &&
                              (0, q.jsx)(`label`, {
                                className: `lblCorrect fw-bold`,
                                children: `Correct!`,
                              }),
                          ],
                        }),
                        (0, q.jsx)(`div`, { className: `line` }),
                        (0, q.jsx)(`div`, {
                          className: `p-2`,
                          children: (0, q.jsx)(`p`, { children: i.question }),
                        }),
                      ],
                    }),
                    (0, q.jsx)(`input`, {
                      type: `text`,
                      placeholder: `Answer`,
                      className: `inputController ps-1 w-100 mt-1`,
                      name: `answer`,
                      value: h,
                      onChange: (e) => g(e.target.value),
                    }),
                    (0, q.jsx)(`button`, {
                      ref: _,
                      className: `btn-primary w-100 mt-1`,
                      disabled: p,
                      onClick: () => v(h, i._id),
                      children: `Submit`,
                    }),
                  ],
                }),
              ],
            }),
          });
  },
  sy = ({
    correctAns: e,
    setShowCorrectAnsPopup: t,
    setNumAnswered: n,
    setUserAnswer: r,
  }) =>
    (0, q.jsx)(`div`, {
      className: `popupBlocker`,
      children: (0, q.jsxs)(`div`, {
        className: `correctAnsPopup`,
        children: [
          (0, q.jsx)(`label`, {
            className: `fw-bold text-danger`,
            children: `Incorrect answer`,
          }),
          (0, q.jsx)(`div`, { className: `line` }),
          (0, q.jsx)(`label`, {
            className: `fw-bold`,
            children: `Correct Answer:`,
          }),
          (0, q.jsx)(`p`, { className: `lblCorrect`, children: e }),
          (0, q.jsx)(`button`, {
            onClick: () => {
              (n((e) => e + 1), t(!1), r(``));
            },
            children: `Ok`,
          }),
        ],
      }),
    }),
  cy = (e, t, n, r) => {
    let [i, a] = (0, f.useState)(!0);
    return (
      (0, f.useEffect)(() => {
        (async () => {
          let i = await uu(e);
          (r(i.items), t(i.subject), n(i.quizName), a(!1));
        })();
      }, [e, r, n, t]),
      { isLoading: i }
    );
  },
  ly = () => {
    let { quizId: e } = Wi(),
      [t, n] = (0, f.useState)(``),
      [r, i] = (0, f.useState)(``),
      [a, o] = (0, f.useState)([]);
    cy(e, n, i, o);
    let s = (0, f.useRef)(null),
      c = Bi();
    _v(`updateQuiz`, o, n, i, e);
    let l = () => {
        let e = { question: ``, answer: `` };
        (o([...a, e]),
          setTimeout(() => {
            s.current.scrollTop = s.current.scrollHeight;
          }, 10));
      },
      u = (n) => {
        let i = [...a];
        (i.splice(n, 1),
          o(i),
          yv(`updateQuiz`, { items: i, subject: t, quizName: r }, e));
      },
      d = (n, i) => {
        let s = a.map((e, t) =>
          t === i ? { ...e, [n.target.name]: n.target.value } : e,
        );
        (o(s), yv(`updateQuiz`, { items: s, subject: t, quizName: r }, e));
      },
      p = async (n) => {
        n.preventDefault();
        let i = await du(e, t, r, a);
        if (i.error) return alert(i.error);
        (await lu(`updateQuiz`, e), c(`/quiz/${t}`));
      };
    return (0, q.jsxs)(`form`, {
      autoComplete: `off`,
      onSubmit: (e) => p(e),
      children: [
        (0, q.jsx)(`label`, {
          className: `text-white mid-size-title`,
          children: `Update quiz`,
        }),
        (0, q.jsxs)(`div`, {
          style: { width: `250px`, color: `white` },
          children: [
            (0, q.jsx)(Qv, {
              type: `text`,
              label: `Subject`,
              name: `subject`,
              value: t,
              onChange: (t) => {
                (n(t.target.value),
                  yv(
                    `updateQuiz`,
                    { items: a, subject: t.target.value, quizName: r },
                    e,
                  ));
              },
            }),
            (0, q.jsx)(Qv, {
              type: `text`,
              label: `Quiz Name`,
              name: `quizName`,
              value: r,
              onChange: (n) => {
                (i(n.target.value),
                  yv(
                    `updateQuiz`,
                    { items: a, subject: t, quizName: n.target.value },
                    e,
                  ));
              },
            }),
          ],
        }),
        (0, q.jsx)(gv, {
          search: !1,
          title: `Questions`,
          children: (0, q.jsxs)(`div`, {
            className: `itemsList`,
            ref: s,
            children: [
              a.map((e, t) =>
                (0, q.jsxs)(
                  `div`,
                  {
                    className: `itemBox`,
                    children: [
                      (0, q.jsx)(`button`, {
                        className: `deleteQuestion`,
                        type: `button`,
                        onClick: () => u(t),
                        disabled: a.length <= 3,
                        children: `-`,
                      }),
                      (0, q.jsxs)(`div`, {
                        className: `question`,
                        children: [
                          (0, q.jsxs)(`label`, {
                            children: [`Question `, t + 1],
                          }),
                          (0, q.jsx)(`textarea`, {
                            rows: `4`,
                            className: `inputController`,
                            name: `question`,
                            required: `required`,
                            value: e.question,
                            onChange: (e) => d(e, t),
                          }),
                        ],
                      }),
                      (0, q.jsxs)(`div`, {
                        className: `answer`,
                        children: [
                          (0, q.jsx)(`label`, { children: `Answer` }),
                          (0, q.jsx)(`input`, {
                            className: `inputController`,
                            type: `text`,
                            name: `answer`,
                            required: `required`,
                            value: e.answer,
                            onChange: (e) => d(e, t),
                          }),
                        ],
                      }),
                    ],
                  },
                  t,
                ),
              ),
              (0, q.jsx)(`div`, {
                className: `innerButton`,
                children: (0, q.jsx)(`button`, {
                  type: `button`,
                  className: `btn-secondary`,
                  onClick: l,
                  children: `+`,
                }),
              }),
            ],
          }),
        }),
        (0, q.jsx)(`button`, {
          className: `btn-primary mt-1`,
          style: { width: `200px` },
          children: `Update`,
        }),
      ],
    });
  },
  uy = {
    HomePage: yu,
    AuthPage: fv,
    ProtectedRoute: pv,
    LoadingPage: _u,
    CreateQuizPage: Sv,
    QuizzesPage: Ov,
    QuizPage: Av,
    RecordsPage: Fv,
    RecordPage: zv,
    ProfilePage: ey,
    VerifyEmailPage: ty,
    ForgotPassPage: ny,
    ResetPassPage: iy,
    EnumQuizPage: oy,
    UpdateQuizPage: () =>
      (0, q.jsx)(`div`, {
        className: `updateQuizPage container`,
        children: (0, q.jsx)(ly, {}),
      }),
  },
  dy = () => {
    let [e, t] = (0, f.useState)(!0),
      n = Cn(),
      r = on((e) => e.auth);
    return (
      (0, f.useEffect)(() => {
        (async () => {
          try {
            let e = await Vg();
            e.success ? n(Ft(e.user)) : n(It());
          } catch {
            n(It());
          } finally {
            t(!1);
          }
        })();
      }, [n]),
      { isLoading: e, auth: r }
    );
  },
  fy = ({ requireAuth: e = !0 }) => {
    let { auth: t } = dy();
    return e && !t.loggedIn
      ? (0, q.jsx)(ua, { to: `/auth`, replace: !0 })
      : !e && t.loggedIn
        ? (0, q.jsx)(ua, { to: `/`, replace: !0 })
        : (0, q.jsx)(da, {});
  },
  py = o((e, t) => {
    (function () {
      var e = {}.hasOwnProperty;
      function n() {
        for (var e = ``, t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          n && (e = i(e, r(n)));
        }
        return e;
      }
      function r(t) {
        if (typeof t == `string` || typeof t == `number`) return t;
        if (typeof t != `object`) return ``;
        if (Array.isArray(t)) return n.apply(null, t);
        if (
          t.toString !== Object.prototype.toString &&
          !t.toString.toString().includes(`[native code]`)
        )
          return t.toString();
        var r = ``;
        for (var a in t) e.call(t, a) && t[a] && (r = i(r, a));
        return r;
      }
      function i(e, t) {
        return t ? (e ? e + ` ` + t : e + t) : e;
      }
      t !== void 0 && t.exports
        ? ((n.default = n), (t.exports = n))
        : typeof define == `function` &&
            typeof define.amd == `object` &&
            define.amd
          ? define(`classnames`, [], function () {
              return n;
            })
          : (window.classNames = n);
    })();
  });
o((e, t) => {
  t.exports = function (e, t, n, r, i, a, o, s) {
    if (!e) {
      var c;
      if (t === void 0)
        c = Error(
          `Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.`,
        );
      else {
        var l = [n, r, i, a, o, s],
          u = 0;
        ((c = Error(
          t.replace(/%s/g, function () {
            return l[u++];
          }),
        )),
          (c.name = `Invariant Violation`));
      }
      throw ((c.framesToPop = 1), c);
    }
  };
})();
function my(e) {
  return `default` + e.charAt(0).toUpperCase() + e.substr(1);
}
function hy(e) {
  var t = gy(e, `string`);
  return typeof t == `symbol` ? t : String(t);
}
function gy(e, t) {
  if (typeof e != `object` || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || `default`);
    if (typeof r != `object`) return r;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t === `string` ? String : Number)(e);
}
function _y(e, t, n) {
  var r = (0, f.useRef)(e !== void 0),
    i = (0, f.useState)(t),
    a = i[0],
    o = i[1],
    s = e !== void 0,
    c = r.current;
  return (
    (r.current = s),
    !s && c && a !== t && o(t),
    [
      s ? e : a,
      (0, f.useCallback)(
        function (e) {
          var t = [...arguments].slice(1);
          (n && n.apply(void 0, [e].concat(t)), o(e));
        },
        [n],
      ),
    ]
  );
}
function vy(e, t) {
  return Object.keys(t).reduce(function (n, r) {
    var i,
      a = n,
      o = a[my(r)],
      s = a[r],
      c = cn(a, [my(r), r].map(hy)),
      l = t[r],
      u = _y(s, o, e[l]),
      d = u[0],
      f = u[1];
    return sn({}, c, ((i = {}), (i[r] = d), (i[l] = f), i));
  }, e);
}
function yy(e, t) {
  return (
    (yy = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    yy(e, t)
  );
}
function by(e, t) {
  ((e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    yy(e, t));
}
var xy = f.createContext({
    prefixes: {},
    breakpoints: [`xxl`, `xl`, `lg`, `md`, `sm`, `xs`],
    minBreakpoint: `xs`,
  }),
  { Consumer: Sy, Provider: Cy } = xy;
function wy(e, t) {
  let { prefixes: n } = (0, f.useContext)(xy);
  return e || n[t] || t;
}
function Ty() {
  let { dir: e } = (0, f.useContext)(xy);
  return e === `rtl`;
}
function Ey(e) {
  return (e && e.ownerDocument) || document;
}
function Dy(e) {
  var t = Ey(e);
  return (t && t.defaultView) || window;
}
function Oy(e, t) {
  return Dy(e).getComputedStyle(e, t);
}
var ky = /([A-Z])/g;
function Ay(e) {
  return e.replace(ky, `-$1`).toLowerCase();
}
var jy = /^ms-/;
function My(e) {
  return Ay(e).replace(jy, `-ms-`);
}
var Ny =
  /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function Py(e) {
  return !!(e && Ny.test(e));
}
function Fy(e, t) {
  var n = ``,
    r = ``;
  if (typeof t == `string`)
    return e.style.getPropertyValue(My(t)) || Oy(e).getPropertyValue(My(t));
  (Object.keys(t).forEach(function (i) {
    var a = t[i];
    !a && a !== 0
      ? e.style.removeProperty(My(i))
      : Py(i)
        ? (r += i + `(` + a + `) `)
        : (n += My(i) + `: ` + a + `;`);
  }),
    r && (n += `transform: ` + r + `;`),
    (e.style.cssText += `;` + n));
}
var Iy = { disabled: !1 },
  Ly = f.createContext(null),
  Ry = function (e) {
    return e.scrollTop;
  },
  zy = `unmounted`,
  By = `exited`,
  Vy = `entering`,
  Hy = `entered`,
  Uy = `exiting`,
  Wy = (function (e) {
    by(t, e);
    function t(t, n) {
      var r = e.call(this, t, n) || this,
        i = n,
        a = i && !i.isMounting ? t.enter : t.appear,
        o;
      return (
        (r.appearStatus = null),
        t.in
          ? a
            ? ((o = By), (r.appearStatus = Vy))
            : (o = Hy)
          : (o = t.unmountOnExit || t.mountOnEnter ? zy : By),
        (r.state = { status: o }),
        (r.nextCallback = null),
        r
      );
    }
    t.getDerivedStateFromProps = function (e, t) {
      return e.in && t.status === `unmounted` ? { status: By } : null;
    };
    var n = t.prototype;
    return (
      (n.componentDidMount = function () {
        this.updateStatus(!0, this.appearStatus);
      }),
      (n.componentDidUpdate = function (e) {
        var t = null;
        if (e !== this.props) {
          var n = this.state.status;
          this.props.in
            ? n !== `entering` && n !== `entered` && (t = Vy)
            : (n === `entering` || n === `entered`) && (t = Uy);
        }
        this.updateStatus(!1, t);
      }),
      (n.componentWillUnmount = function () {
        this.cancelNextCallback();
      }),
      (n.getTimeouts = function () {
        var e = this.props.timeout,
          t = (n = r = e),
          n,
          r;
        return (
          e != null &&
            typeof e != `number` &&
            ((t = e.exit),
            (n = e.enter),
            (r = e.appear === void 0 ? n : e.appear)),
          { exit: t, enter: n, appear: r }
        );
      }),
      (n.updateStatus = function (e, t) {
        if ((e === void 0 && (e = !1), t !== null)) {
          if ((this.cancelNextCallback(), t === `entering`)) {
            if (this.props.unmountOnExit || this.props.mountOnEnter) {
              var n = this.props.nodeRef
                ? this.props.nodeRef.current
                : Wt.findDOMNode(this);
              n && Ry(n);
            }
            this.performEnter(e);
          } else this.performExit();
        } else
          this.props.unmountOnExit &&
            this.state.status === `exited` &&
            this.setState({ status: zy });
      }),
      (n.performEnter = function (e) {
        var t = this,
          n = this.props.enter,
          r = this.context ? this.context.isMounting : e,
          i = this.props.nodeRef ? [r] : [Wt.findDOMNode(this), r],
          a = i[0],
          o = i[1],
          s = this.getTimeouts(),
          c = r ? s.appear : s.enter;
        if ((!e && !n) || Iy.disabled) {
          this.safeSetState({ status: Hy }, function () {
            t.props.onEntered(a);
          });
          return;
        }
        (this.props.onEnter(a, o),
          this.safeSetState({ status: Vy }, function () {
            (t.props.onEntering(a, o),
              t.onTransitionEnd(c, function () {
                t.safeSetState({ status: Hy }, function () {
                  t.props.onEntered(a, o);
                });
              }));
          }));
      }),
      (n.performExit = function () {
        var e = this,
          t = this.props.exit,
          n = this.getTimeouts(),
          r = this.props.nodeRef ? void 0 : Wt.findDOMNode(this);
        if (!t || Iy.disabled) {
          this.safeSetState({ status: By }, function () {
            e.props.onExited(r);
          });
          return;
        }
        (this.props.onExit(r),
          this.safeSetState({ status: Uy }, function () {
            (e.props.onExiting(r),
              e.onTransitionEnd(n.exit, function () {
                e.safeSetState({ status: By }, function () {
                  e.props.onExited(r);
                });
              }));
          }));
      }),
      (n.cancelNextCallback = function () {
        this.nextCallback !== null &&
          (this.nextCallback.cancel(), (this.nextCallback = null));
      }),
      (n.safeSetState = function (e, t) {
        ((t = this.setNextCallback(t)), this.setState(e, t));
      }),
      (n.setNextCallback = function (e) {
        var t = this,
          n = !0;
        return (
          (this.nextCallback = function (r) {
            n && ((n = !1), (t.nextCallback = null), e(r));
          }),
          (this.nextCallback.cancel = function () {
            n = !1;
          }),
          this.nextCallback
        );
      }),
      (n.onTransitionEnd = function (e, t) {
        this.setNextCallback(t);
        var n = this.props.nodeRef
            ? this.props.nodeRef.current
            : Wt.findDOMNode(this),
          r = e == null && !this.props.addEndListener;
        if (!n || r) {
          setTimeout(this.nextCallback, 0);
          return;
        }
        if (this.props.addEndListener) {
          var i = this.props.nodeRef
              ? [this.nextCallback]
              : [n, this.nextCallback],
            a = i[0],
            o = i[1];
          this.props.addEndListener(a, o);
        }
        e != null && setTimeout(this.nextCallback, e);
      }),
      (n.render = function () {
        var e = this.state.status;
        if (e === `unmounted`) return null;
        var t = this.props,
          n = t.children;
        (t.in,
          t.mountOnEnter,
          t.unmountOnExit,
          t.appear,
          t.enter,
          t.exit,
          t.timeout,
          t.addEndListener,
          t.onEnter,
          t.onEntering,
          t.onEntered,
          t.onExit,
          t.onExiting,
          t.onExited,
          t.nodeRef);
        var r = cn(t, [
          `children`,
          `in`,
          `mountOnEnter`,
          `unmountOnExit`,
          `appear`,
          `enter`,
          `exit`,
          `timeout`,
          `addEndListener`,
          `onEnter`,
          `onEntering`,
          `onEntered`,
          `onExit`,
          `onExiting`,
          `onExited`,
          `nodeRef`,
        ]);
        return f.createElement(
          Ly.Provider,
          { value: null },
          typeof n == `function`
            ? n(e, r)
            : f.cloneElement(f.Children.only(n), r),
        );
      }),
      t
    );
  })(f.Component);
((Wy.contextType = Ly), (Wy.propTypes = {}));
function Gy() {}
((Wy.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Gy,
  onEntering: Gy,
  onEntered: Gy,
  onExit: Gy,
  onExiting: Gy,
  onExited: Gy,
}),
  (Wy.UNMOUNTED = zy),
  (Wy.EXITED = By),
  (Wy.ENTERING = Vy),
  (Wy.ENTERED = Hy),
  (Wy.EXITING = Uy));
function Ky(e) {
  return e.code === `Escape` || e.keyCode === 27;
}
function qy() {
  let e = `18.3.1`.split(`.`);
  return { major: +e[0], minor: +e[1], patch: +e[2] };
}
function Jy(e) {
  if (!e || typeof e == `function`) return null;
  let { major: t } = qy();
  return t >= 19 ? e.props.ref : e.ref;
}
var Yy = !!(
    typeof window < `u` &&
    window.document &&
    window.document.createElement
  ),
  Xy = !1,
  Zy = !1;
try {
  var Qy = {
    get passive() {
      return (Xy = !0);
    },
    get once() {
      return (Zy = Xy = !0);
    },
  };
  Yy &&
    (window.addEventListener(`test`, Qy, Qy),
    window.removeEventListener(`test`, Qy, !0));
} catch {}
function $y(e, t, n, r) {
  if (r && typeof r != `boolean` && !Zy) {
    var i = r.once,
      a = r.capture,
      o = n;
    (!Zy &&
      i &&
      ((o =
        n.__once ||
        function e(r) {
          (this.removeEventListener(t, e, a), n.call(this, r));
        }),
      (n.__once = o)),
      e.addEventListener(t, o, Xy ? r : a));
  }
  e.addEventListener(t, n, r);
}
function eb(e, t, n, r) {
  var i = r && typeof r != `boolean` ? r.capture : r;
  (e.removeEventListener(t, n, i),
    n.__once && e.removeEventListener(t, n.__once, i));
}
function tb(e, t, n, r) {
  return (
    $y(e, t, n, r),
    function () {
      eb(e, t, n, r);
    }
  );
}
function nb(e, t, n, r) {
  if ((n === void 0 && (n = !1), r === void 0 && (r = !0), e)) {
    var i = document.createEvent(`HTMLEvents`);
    (i.initEvent(t, n, r), e.dispatchEvent(i));
  }
}
function rb(e) {
  var t = Fy(e, `transitionDuration`) || ``,
    n = t.indexOf(`ms`) === -1 ? 1e3 : 1;
  return parseFloat(t) * n;
}
function ib(e, t, n) {
  n === void 0 && (n = 5);
  var r = !1,
    i = setTimeout(function () {
      r || nb(e, `transitionend`, !0);
    }, t + n),
    a = tb(
      e,
      `transitionend`,
      function () {
        r = !0;
      },
      { once: !0 },
    );
  return function () {
    (clearTimeout(i), a());
  };
}
function ab(e, t, n, r) {
  n ??= rb(e) || 0;
  var i = ib(e, n, r),
    a = tb(e, `transitionend`, t);
  return function () {
    (i(), a());
  };
}
function ob(e, t) {
  let n = Fy(e, t) || ``,
    r = n.indexOf(`ms`) === -1 ? 1e3 : 1;
  return parseFloat(n) * r;
}
function sb(e, t) {
  let n = ab(
    e,
    (r) => {
      r.target === e && (n(), t(r));
    },
    ob(e, `transitionDuration`) + ob(e, `transitionDelay`),
  );
}
function cb(...e) {
  return e
    .filter((e) => e != null)
    .reduce((e, t) => {
      if (typeof t != `function`)
        throw Error(
          `Invalid Argument Type, must only provide functions, undefined, or null.`,
        );
      return e === null
        ? t
        : function (...n) {
            (e.apply(this, n), t.apply(this, n));
          };
    }, null);
}
function lb(e) {
  e.offsetHeight;
}
var ub = (e) =>
  !e || typeof e == `function`
    ? e
    : (t) => {
        e.current = t;
      };
function db(e, t) {
  let n = ub(e),
    r = ub(t);
  return (e) => {
    (n && n(e), r && r(e));
  };
}
function fb(e, t) {
  return (0, f.useMemo)(() => db(e, t), [e, t]);
}
function pb(e) {
  return e && `setState` in e ? Wt.findDOMNode(e) : (e ?? null);
}
var mb = f.forwardRef(
  (
    {
      onEnter: e,
      onEntering: t,
      onEntered: n,
      onExit: r,
      onExiting: i,
      onExited: a,
      addEndListener: o,
      children: s,
      childRef: c,
      ...l
    },
    u,
  ) => {
    let d = (0, f.useRef)(null),
      p = fb(d, c),
      m = (e) => {
        p(pb(e));
      },
      h = (e) => (t) => {
        e && d.current && e(d.current, t);
      },
      g = (0, f.useCallback)(h(e), [e]),
      _ = (0, f.useCallback)(h(t), [t]),
      v = (0, f.useCallback)(h(n), [n]),
      y = (0, f.useCallback)(h(r), [r]),
      b = (0, f.useCallback)(h(i), [i]),
      x = (0, f.useCallback)(h(a), [a]),
      S = (0, f.useCallback)(h(o), [o]);
    return (0, q.jsx)(Wy, {
      ref: u,
      ...l,
      onEnter: g,
      onEntered: v,
      onEntering: _,
      onExit: y,
      onExited: x,
      onExiting: b,
      addEndListener: S,
      nodeRef: d,
      children:
        typeof s == `function`
          ? (e, t) => s(e, { ...t, ref: m })
          : f.cloneElement(s, { ref: m }),
    });
  },
);
mb.displayName = `TransitionWrapper`;
var hb = l(py()),
  gb = {
    height: [`marginTop`, `marginBottom`],
    width: [`marginLeft`, `marginRight`],
  };
function _b(e, t) {
  let n = t[`offset${e[0].toUpperCase()}${e.slice(1)}`],
    r = gb[e];
  return n + parseInt(Fy(t, r[0]), 10) + parseInt(Fy(t, r[1]), 10);
}
var vb = {
    [By]: `collapse`,
    [Uy]: `collapsing`,
    [Vy]: `collapsing`,
    [Hy]: `collapse show`,
  },
  yb = f.forwardRef(
    (
      {
        onEnter: e,
        onEntering: t,
        onEntered: n,
        onExit: r,
        onExiting: i,
        className: a,
        children: o,
        dimension: s = `height`,
        in: c = !1,
        timeout: l = 300,
        mountOnEnter: u = !1,
        unmountOnExit: d = !1,
        appear: p = !1,
        getDimensionValue: m = _b,
        ...h
      },
      g,
    ) => {
      let _ = typeof s == `function` ? s() : s,
        v = (0, f.useMemo)(
          () =>
            cb((e) => {
              e.style[_] = `0`;
            }, e),
          [_, e],
        ),
        y = (0, f.useMemo)(
          () =>
            cb((e) => {
              let t = `scroll${_[0].toUpperCase()}${_.slice(1)}`;
              e.style[_] = `${e[t]}px`;
            }, t),
          [_, t],
        ),
        b = (0, f.useMemo)(
          () =>
            cb((e) => {
              e.style[_] = null;
            }, n),
          [_, n],
        ),
        x = (0, f.useMemo)(
          () =>
            cb((e) => {
              ((e.style[_] = `${m(_, e)}px`), lb(e));
            }, r),
          [r, m, _],
        ),
        S = (0, f.useMemo)(
          () =>
            cb((e) => {
              e.style[_] = null;
            }, i),
          [_, i],
        );
      return (0, q.jsx)(mb, {
        ref: g,
        addEndListener: sb,
        ...h,
        "aria-expanded": h.role ? c : null,
        onEnter: v,
        onEntering: y,
        onEntered: b,
        onExit: x,
        onExiting: S,
        childRef: Jy(o),
        in: c,
        timeout: l,
        mountOnEnter: u,
        unmountOnExit: d,
        appear: p,
        children: (e, t) =>
          f.cloneElement(o, {
            ...t,
            className: (0, hb.default)(
              a,
              o.props.className,
              vb[e],
              _ === `width` && `collapse-horizontal`,
            ),
          }),
      });
    },
  );
yb.displayName = `Collapse`;
function bb(e) {
  let t = (0, f.useRef)(e);
  return (
    (0, f.useEffect)(() => {
      t.current = e;
    }, [e]),
    t
  );
}
function xb(e) {
  let t = bb(e);
  return (0, f.useCallback)(
    function (...e) {
      return t.current && t.current(...e);
    },
    [t],
  );
}
var Sb = (e) =>
  f.forwardRef((t, n) =>
    (0, q.jsx)(`div`, {
      ...t,
      ref: n,
      className: (0, hb.default)(t.className, e),
    }),
  );
function Cb() {
  return (0, f.useState)(null);
}
function wb(e) {
  let t = (0, f.useRef)(e);
  return (
    (0, f.useEffect)(() => {
      t.current = e;
    }, [e]),
    t
  );
}
function Tb(e) {
  let t = wb(e);
  return (0, f.useCallback)(
    function (...e) {
      return t.current && t.current(...e);
    },
    [t],
  );
}
function Eb(e, t, n, r = !1) {
  let i = Tb(n);
  (0, f.useEffect)(() => {
    let n = typeof e == `function` ? e() : e;
    return (n.addEventListener(t, i, r), () => n.removeEventListener(t, i, r));
  }, [e]);
}
function Db() {
  let e = (0, f.useRef)(!0),
    t = (0, f.useRef)(() => e.current);
  return (
    (0, f.useEffect)(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      [],
    ),
    t.current
  );
}
function Ob(e) {
  let t = (0, f.useRef)(null);
  return (
    (0, f.useEffect)(() => {
      t.current = e;
    }),
    t.current
  );
}
var kb =
    typeof global < `u` &&
    global.navigator &&
    global.navigator.product === `ReactNative`,
  Ab = typeof document < `u` || kb ? f.useLayoutEffect : f.useEffect,
  jb = [`as`, `disabled`];
function Mb(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Nb(e) {
  return !e || e.trim() === `#`;
}
function Pb({
  tagName: e,
  disabled: t,
  href: n,
  target: r,
  rel: i,
  role: a,
  onClick: o,
  tabIndex: s = 0,
  type: c,
}) {
  e ||= n != null || r != null || i != null ? `a` : `button`;
  let l = { tagName: e };
  if (e === `button`) return [{ type: c || `button`, disabled: t }, l];
  let u = (r) => {
    if (((t || (e === `a` && Nb(n))) && r.preventDefault(), t)) {
      r.stopPropagation();
      return;
    }
    o?.(r);
  };
  return (
    e === `a` && ((n ||= `#`), t && (n = void 0)),
    [
      {
        role: a ?? `button`,
        disabled: void 0,
        tabIndex: t ? void 0 : s,
        href: n,
        target: e === `a` ? r : void 0,
        "aria-disabled": t || void 0,
        rel: e === `a` ? i : void 0,
        onClick: u,
        onKeyDown: (e) => {
          e.key === ` ` && (e.preventDefault(), u(e));
        },
      },
      l,
    ]
  );
}
var Fb = f.forwardRef((e, t) => {
  let { as: n, disabled: r } = e,
    i = Mb(e, jb),
    [a, { tagName: o }] = Pb(Object.assign({ tagName: n, disabled: r }, i));
  return (0, q.jsx)(o, Object.assign({}, i, a, { ref: t }));
});
Fb.displayName = `Button`;
var Ib = [`onKeyDown`];
function Lb(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Rb(e) {
  return !e || e.trim() === `#`;
}
var zb = f.forwardRef((e, t) => {
  let { onKeyDown: n } = e,
    r = Lb(e, Ib),
    [i] = Pb(Object.assign({ tagName: `a` }, r)),
    a = Tb((e) => {
      (i.onKeyDown(e), n?.(e));
    });
  return Rb(r.href) || r.role === `button`
    ? (0, q.jsx)(`a`, Object.assign({ ref: t }, r, i, { onKeyDown: a }))
    : (0, q.jsx)(`a`, Object.assign({ ref: t }, r, { onKeyDown: n }));
});
zb.displayName = `Anchor`;
var Bb = { [Vy]: `show`, [Hy]: `show` },
  Vb = f.forwardRef(
    (
      {
        className: e,
        children: t,
        transitionClasses: n = {},
        onEnter: r,
        ...i
      },
      a,
    ) => {
      let o = {
          in: !1,
          timeout: 300,
          mountOnEnter: !1,
          unmountOnExit: !1,
          appear: !1,
          ...i,
        },
        s = (0, f.useCallback)(
          (e, t) => {
            (lb(e), r?.(e, t));
          },
          [r],
        );
      return (0, q.jsx)(mb, {
        ref: a,
        addEndListener: sb,
        ...o,
        onEnter: s,
        childRef: Jy(t),
        children: (r, i) =>
          f.cloneElement(t, {
            ...i,
            className: (0, hb.default)(
              `fade`,
              e,
              t.props.className,
              Bb[r],
              n[r],
            ),
          }),
      });
    },
  );
Vb.displayName = `Fade`;
var Hb = {
    "aria-label": Ya.default.string,
    onClick: Ya.default.func,
    variant: Ya.default.oneOf([`white`]),
  },
  Ub = f.forwardRef(
    ({ className: e, variant: t, "aria-label": n = `Close`, ...r }, i) =>
      (0, q.jsx)(`button`, {
        ref: i,
        type: `button`,
        className: (0, hb.default)(`btn-close`, t && `btn-close-${t}`, e),
        "aria-label": n,
        ...r,
      }),
  );
((Ub.displayName = `CloseButton`), (Ub.propTypes = Hb));
var Wb = f.forwardRef(
  (
    {
      as: e,
      bsPrefix: t,
      variant: n = `primary`,
      size: r,
      active: i = !1,
      disabled: a = !1,
      className: o,
      ...s
    },
    c,
  ) => {
    let l = wy(t, `btn`),
      [u, { tagName: d }] = Pb({ tagName: e, disabled: a, ...s });
    return (0, q.jsx)(d, {
      ...u,
      ...s,
      ref: c,
      disabled: a,
      className: (0, hb.default)(
        o,
        l,
        i && `active`,
        n && `${l}-${n}`,
        r && `${l}-${r}`,
        s.href && a && `disabled`,
      ),
    });
  },
);
Wb.displayName = `Button`;
var Gb = f.createContext(null);
Gb.displayName = `CardHeaderContext`;
var Kb = f.forwardRef(
  ({ bsPrefix: e, fluid: t = !1, as: n = `div`, className: r, ...i }, a) => {
    let o = wy(e, `container`),
      s = typeof t == `string` ? `-${t}` : `-fluid`;
    return (0, q.jsx)(n, {
      ref: a,
      ...i,
      className: (0, hb.default)(r, t ? `${o}${s}` : o),
    });
  },
);
Kb.displayName = `Container`;
var qb = Function.prototype.bind.call(Function.prototype.call, [].slice);
function Jb(e, t) {
  return qb(e.querySelectorAll(t));
}
function Yb(e, t, n) {
  let r = (0, f.useRef)(e !== void 0),
    [i, a] = (0, f.useState)(t),
    o = e !== void 0,
    s = r.current;
  return (
    (r.current = o),
    !o && s && i !== t && a(t),
    [
      o ? e : i,
      (0, f.useCallback)(
        (...e) => {
          let [t, ...r] = e,
            i = n?.(t, ...r);
          return (a(t), i);
        },
        [n],
      ),
    ]
  );
}
function Xb() {
  let [, e] = (0, f.useReducer)((e) => e + 1, 0);
  return e;
}
var Zb = f.createContext(null),
  Qb = Object.prototype.hasOwnProperty;
function $b(e, t, n) {
  for (n of e.keys()) if (ex(n, t)) return n;
}
function ex(e, t) {
  var n, r, i;
  if (e === t) return !0;
  if (e && t && (n = e.constructor) === t.constructor) {
    if (n === Date) return e.getTime() === t.getTime();
    if (n === RegExp) return e.toString() === t.toString();
    if (n === Array) {
      if ((r = e.length) === t.length) for (; r-- && ex(e[r], t[r]););
      return r === -1;
    }
    if (n === Set) {
      if (e.size !== t.size) return !1;
      for (r of e)
        if (
          ((i = r),
          (i && typeof i == `object` && ((i = $b(t, i)), !i)) || !t.has(i))
        )
          return !1;
      return !0;
    }
    if (n === Map) {
      if (e.size !== t.size) return !1;
      for (r of e)
        if (
          ((i = r[0]),
          (i && typeof i == `object` && ((i = $b(t, i)), !i)) ||
            !ex(r[1], t.get(i)))
        )
          return !1;
      return !0;
    }
    if (n === ArrayBuffer) ((e = new Uint8Array(e)), (t = new Uint8Array(t)));
    else if (n === DataView) {
      if ((r = e.byteLength) === t.byteLength)
        for (; r-- && e.getInt8(r) === t.getInt8(r););
      return r === -1;
    }
    if (ArrayBuffer.isView(e)) {
      if ((r = e.byteLength) === t.byteLength) for (; r-- && e[r] === t[r];);
      return r === -1;
    }
    if (!n || typeof e == `object`) {
      for (n in ((r = 0), e))
        if (
          (Qb.call(e, n) && ++r && !Qb.call(t, n)) ||
          !(n in t) ||
          !ex(e[n], t[n])
        )
          return !1;
      return Object.keys(t).length === r;
    }
  }
  return e !== e && t !== t;
}
function tx(e) {
  let t = Db();
  return [
    e[0],
    (0, f.useCallback)(
      (n) => {
        if (t()) return e[1](n);
      },
      [t, e[1]],
    ),
  ];
}
var nx = `bottom`,
  rx = `right`,
  ix = `left`,
  ax = `auto`,
  ox = [`top`, nx, rx, ix],
  sx = `start`,
  cx = `clippingParents`,
  lx = `viewport`,
  ux = `popper`,
  dx = `reference`,
  fx = ox.reduce(function (e, t) {
    return e.concat([t + `-` + sx, t + `-end`]);
  }, []),
  px = [].concat(ox, [ax]).reduce(function (e, t) {
    return e.concat([t, t + `-` + sx, t + `-end`]);
  }, []),
  mx = [
    `beforeRead`,
    `read`,
    `afterRead`,
    `beforeMain`,
    `main`,
    `afterMain`,
    `beforeWrite`,
    `write`,
    `afterWrite`,
  ];
function hx(e) {
  return e.split(`-`)[0];
}
function gx(e) {
  if (e == null) return window;
  if (e.toString() !== `[object Window]`) {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function _x(e) {
  return e instanceof gx(e).Element || e instanceof Element;
}
function vx(e) {
  return e instanceof gx(e).HTMLElement || e instanceof HTMLElement;
}
function yx(e) {
  return typeof ShadowRoot > `u`
    ? !1
    : e instanceof gx(e).ShadowRoot || e instanceof ShadowRoot;
}
var bx = Math.max,
  xx = Math.min,
  Sx = Math.round;
function Cx() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (e) {
          return e.brand + `/` + e.version;
        })
        .join(` `)
    : navigator.userAgent;
}
function wx() {
  return !/^((?!chrome|android).)*safari/i.test(Cx());
}
function Tx(e, t, n) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  var r = e.getBoundingClientRect(),
    i = 1,
    a = 1;
  t &&
    vx(e) &&
    ((i = (e.offsetWidth > 0 && Sx(r.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && Sx(r.height) / e.offsetHeight) || 1));
  var o = (_x(e) ? gx(e) : window).visualViewport,
    s = !wx() && n,
    c = (r.left + (s && o ? o.offsetLeft : 0)) / i,
    l = (r.top + (s && o ? o.offsetTop : 0)) / a,
    u = r.width / i,
    d = r.height / a;
  return {
    width: u,
    height: d,
    top: l,
    right: c + u,
    bottom: l + d,
    left: c,
    x: c,
    y: l,
  };
}
function Ex(e) {
  var t = Tx(e),
    n = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
  );
}
function Dx(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && yx(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ox(e) {
  return e ? (e.nodeName || ``).toLowerCase() : null;
}
function kx(e) {
  return gx(e).getComputedStyle(e);
}
function Ax(e) {
  return [`table`, `td`, `th`].indexOf(Ox(e)) >= 0;
}
function jx(e) {
  return ((_x(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function Mx(e) {
  return Ox(e) === `html`
    ? e
    : e.assignedSlot || e.parentNode || (yx(e) ? e.host : null) || jx(e);
}
function Nx(e) {
  return !vx(e) || kx(e).position === `fixed` ? null : e.offsetParent;
}
function Px(e) {
  var t = /firefox/i.test(Cx());
  if (/Trident/i.test(Cx()) && vx(e) && kx(e).position === `fixed`) return null;
  var n = Mx(e);
  for (yx(n) && (n = n.host); vx(n) && [`html`, `body`].indexOf(Ox(n)) < 0;) {
    var r = kx(n);
    if (
      r.transform !== `none` ||
      r.perspective !== `none` ||
      r.contain === `paint` ||
      [`transform`, `perspective`].indexOf(r.willChange) !== -1 ||
      (t && r.willChange === `filter`) ||
      (t && r.filter && r.filter !== `none`)
    )
      return n;
    n = n.parentNode;
  }
  return null;
}
function Fx(e) {
  for (var t = gx(e), n = Nx(e); n && Ax(n) && kx(n).position === `static`;)
    n = Nx(n);
  return n &&
    (Ox(n) === `html` || (Ox(n) === `body` && kx(n).position === `static`))
    ? t
    : n || Px(e) || t;
}
function Ix(e) {
  return [`top`, `bottom`].indexOf(e) >= 0 ? `x` : `y`;
}
function Lx(e, t, n) {
  return bx(e, xx(t, n));
}
function Rx(e, t, n) {
  var r = Lx(e, t, n);
  return r > n ? n : r;
}
function zx() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Bx(e) {
  return Object.assign({}, zx(), e);
}
function Vx(e, t) {
  return t.reduce(function (t, n) {
    return ((t[n] = e), t);
  }, {});
}
var Hx = function (e, t) {
  return (
    (e =
      typeof e == `function`
        ? e(Object.assign({}, t.rects, { placement: t.placement }))
        : e),
    Bx(typeof e == `number` ? Vx(e, ox) : e)
  );
};
function Ux(e) {
  var t,
    n = e.state,
    r = e.name,
    i = e.options,
    a = n.elements.arrow,
    o = n.modifiersData.popperOffsets,
    s = hx(n.placement),
    c = Ix(s),
    l = [`left`, `right`].indexOf(s) >= 0 ? `height` : `width`;
  if (!(!a || !o)) {
    var u = Hx(i.padding, n),
      d = Ex(a),
      f = c === `y` ? `top` : ix,
      p = c === `y` ? nx : rx,
      m =
        n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l],
      h = o[c] - n.rects.reference[c],
      g = Fx(a),
      _ = g ? (c === `y` ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
      v = m / 2 - h / 2,
      y = u[f],
      b = _ - d[l] - u[p],
      x = _ / 2 - d[l] / 2 + v,
      S = Lx(y, x, b),
      C = c;
    n.modifiersData[r] = ((t = {}), (t[C] = S), (t.centerOffset = S - x), t);
  }
}
function Wx(e) {
  var t = e.state,
    n = e.options.element,
    r = n === void 0 ? `[data-popper-arrow]` : n;
  r != null &&
    ((typeof r == `string` && ((r = t.elements.popper.querySelector(r)), !r)) ||
      (Dx(t.elements.popper, r) && (t.elements.arrow = r)));
}
var Gx = {
  name: `arrow`,
  enabled: !0,
  phase: `main`,
  fn: Ux,
  effect: Wx,
  requires: [`popperOffsets`],
  requiresIfExists: [`preventOverflow`],
};
function Kx(e) {
  return e.split(`-`)[1];
}
var qx = { top: `auto`, right: `auto`, bottom: `auto`, left: `auto` };
function Jx(e, t) {
  var n = e.x,
    r = e.y,
    i = t.devicePixelRatio || 1;
  return { x: Sx(n * i) / i || 0, y: Sx(r * i) / i || 0 };
}
function Yx(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    i = e.placement,
    a = e.variation,
    o = e.offsets,
    s = e.position,
    c = e.gpuAcceleration,
    l = e.adaptive,
    u = e.roundOffsets,
    d = e.isFixed,
    f = o.x,
    p = f === void 0 ? 0 : f,
    m = o.y,
    h = m === void 0 ? 0 : m,
    g = typeof u == `function` ? u({ x: p, y: h }) : { x: p, y: h };
  ((p = g.x), (h = g.y));
  var _ = o.hasOwnProperty(`x`),
    v = o.hasOwnProperty(`y`),
    y = ix,
    b = `top`,
    x = window;
  if (l) {
    var S = Fx(n),
      C = `clientHeight`,
      w = `clientWidth`;
    if (
      (S === gx(n) &&
        ((S = jx(n)),
        kx(S).position !== `static` &&
          s === `absolute` &&
          ((C = `scrollHeight`), (w = `scrollWidth`))),
      (S = S),
      i === `top` || ((i === `left` || i === `right`) && a === `end`))
    ) {
      b = nx;
      var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
      ((h -= T - r.height), (h *= c ? 1 : -1));
    }
    if (i === `left` || ((i === `top` || i === `bottom`) && a === `end`)) {
      y = rx;
      var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
      ((p -= E - r.width), (p *= c ? 1 : -1));
    }
  }
  var D = Object.assign({ position: s }, l && qx),
    O = u === !0 ? Jx({ x: p, y: h }, gx(n)) : { x: p, y: h };
  if (((p = O.x), (h = O.y), c)) {
    var k;
    return Object.assign(
      {},
      D,
      ((k = {}),
      (k[b] = v ? `0` : ``),
      (k[y] = _ ? `0` : ``),
      (k.transform =
        (x.devicePixelRatio || 1) <= 1
          ? `translate(` + p + `px, ` + h + `px)`
          : `translate3d(` + p + `px, ` + h + `px, 0)`),
      k),
    );
  }
  return Object.assign(
    {},
    D,
    ((t = {}),
    (t[b] = v ? h + `px` : ``),
    (t[y] = _ ? p + `px` : ``),
    (t.transform = ``),
    t),
  );
}
function Xx(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    i = r === void 0 || r,
    a = n.adaptive,
    o = a === void 0 || a,
    s = n.roundOffsets,
    c = s === void 0 || s,
    l = {
      placement: hx(t.placement),
      variation: Kx(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: i,
      isFixed: t.options.strategy === `fixed`,
    };
  (t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Yx(
        Object.assign({}, l, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: o,
          roundOffsets: c,
        }),
      ),
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Yx(
          Object.assign({}, l, {
            offsets: t.modifiersData.arrow,
            position: `absolute`,
            adaptive: !1,
            roundOffsets: c,
          }),
        ),
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    })));
}
var Zx = {
    name: `computeStyles`,
    enabled: !0,
    phase: `beforeWrite`,
    fn: Xx,
    data: {},
  },
  Qx = { passive: !0 };
function $x(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    i = r.scroll,
    a = i === void 0 || i,
    o = r.resize,
    s = o === void 0 || o,
    c = gx(t.elements.popper),
    l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      l.forEach(function (e) {
        e.addEventListener(`scroll`, n.update, Qx);
      }),
    s && c.addEventListener(`resize`, n.update, Qx),
    function () {
      (a &&
        l.forEach(function (e) {
          e.removeEventListener(`scroll`, n.update, Qx);
        }),
        s && c.removeEventListener(`resize`, n.update, Qx));
    }
  );
}
var eS = {
    name: `eventListeners`,
    enabled: !0,
    phase: `write`,
    fn: function () {},
    effect: $x,
    data: {},
  },
  tS = { left: `right`, right: `left`, bottom: `top`, top: `bottom` };
function nS(e) {
  return e.replace(/left|right|bottom|top/g, function (e) {
    return tS[e];
  });
}
var rS = { start: `end`, end: `start` };
function iS(e) {
  return e.replace(/start|end/g, function (e) {
    return rS[e];
  });
}
function aS(e) {
  var t = gx(e);
  return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function oS(e) {
  return Tx(jx(e)).left + aS(e).scrollLeft;
}
function sS(e, t) {
  var n = gx(e),
    r = jx(e),
    i = n.visualViewport,
    a = r.clientWidth,
    o = r.clientHeight,
    s = 0,
    c = 0;
  if (i) {
    ((a = i.width), (o = i.height));
    var l = wx();
    (l || (!l && t === `fixed`)) && ((s = i.offsetLeft), (c = i.offsetTop));
  }
  return { width: a, height: o, x: s + oS(e), y: c };
}
function cS(e) {
  var t = jx(e),
    n = aS(e),
    r = e.ownerDocument?.body,
    i = bx(
      t.scrollWidth,
      t.clientWidth,
      r ? r.scrollWidth : 0,
      r ? r.clientWidth : 0,
    ),
    a = bx(
      t.scrollHeight,
      t.clientHeight,
      r ? r.scrollHeight : 0,
      r ? r.clientHeight : 0,
    ),
    o = -n.scrollLeft + oS(e),
    s = -n.scrollTop;
  return (
    kx(r || t).direction === `rtl` &&
      (o += bx(t.clientWidth, r ? r.clientWidth : 0) - i),
    { width: i, height: a, x: o, y: s }
  );
}
function lS(e) {
  var t = kx(e),
    n = t.overflow,
    r = t.overflowX,
    i = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + r);
}
function uS(e) {
  return [`html`, `body`, `#document`].indexOf(Ox(e)) >= 0
    ? e.ownerDocument.body
    : vx(e) && lS(e)
      ? e
      : uS(Mx(e));
}
function dS(e, t) {
  t === void 0 && (t = []);
  var n = uS(e),
    r = n === e.ownerDocument?.body,
    i = gx(n),
    a = r ? [i].concat(i.visualViewport || [], lS(n) ? n : []) : n,
    o = t.concat(a);
  return r ? o : o.concat(dS(Mx(a)));
}
function fS(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function pS(e, t) {
  var n = Tx(e, !1, t === `fixed`);
  return (
    (n.top += e.clientTop),
    (n.left += e.clientLeft),
    (n.bottom = n.top + e.clientHeight),
    (n.right = n.left + e.clientWidth),
    (n.width = e.clientWidth),
    (n.height = e.clientHeight),
    (n.x = n.left),
    (n.y = n.top),
    n
  );
}
function mS(e, t, n) {
  return t === `viewport` ? fS(sS(e, n)) : _x(t) ? pS(t, n) : fS(cS(jx(e)));
}
function hS(e) {
  var t = dS(Mx(e)),
    n = [`absolute`, `fixed`].indexOf(kx(e).position) >= 0 && vx(e) ? Fx(e) : e;
  return _x(n)
    ? t.filter(function (e) {
        return _x(e) && Dx(e, n) && Ox(e) !== `body`;
      })
    : [];
}
function gS(e, t, n, r) {
  var i = t === `clippingParents` ? hS(e) : [].concat(t),
    a = [].concat(i, [n]),
    o = a[0],
    s = a.reduce(
      function (t, n) {
        var i = mS(e, n, r);
        return (
          (t.top = bx(i.top, t.top)),
          (t.right = xx(i.right, t.right)),
          (t.bottom = xx(i.bottom, t.bottom)),
          (t.left = bx(i.left, t.left)),
          t
        );
      },
      mS(e, o, r),
    );
  return (
    (s.width = s.right - s.left),
    (s.height = s.bottom - s.top),
    (s.x = s.left),
    (s.y = s.top),
    s
  );
}
function _S(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    i = r ? hx(r) : null,
    a = r ? Kx(r) : null,
    o = t.x + t.width / 2 - n.width / 2,
    s = t.y + t.height / 2 - n.height / 2,
    c;
  switch (i) {
    case `top`:
      c = { x: o, y: t.y - n.height };
      break;
    case nx:
      c = { x: o, y: t.y + t.height };
      break;
    case rx:
      c = { x: t.x + t.width, y: s };
      break;
    case ix:
      c = { x: t.x - n.width, y: s };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var l = i ? Ix(i) : null;
  if (l != null) {
    var u = l === `y` ? `height` : `width`;
    switch (a) {
      case sx:
        c[l] = c[l] - (t[u] / 2 - n[u] / 2);
        break;
      case `end`:
        c[l] = c[l] + (t[u] / 2 - n[u] / 2);
    }
  }
  return c;
}
function vS(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    i = r === void 0 ? e.placement : r,
    a = n.strategy,
    o = a === void 0 ? e.strategy : a,
    s = n.boundary,
    c = s === void 0 ? cx : s,
    l = n.rootBoundary,
    u = l === void 0 ? lx : l,
    d = n.elementContext,
    f = d === void 0 ? ux : d,
    p = n.altBoundary,
    m = p !== void 0 && p,
    h = n.padding,
    g = h === void 0 ? 0 : h,
    _ = Bx(typeof g == `number` ? Vx(g, ox) : g),
    v = f === `popper` ? dx : ux,
    y = e.rects.popper,
    b = e.elements[m ? v : f],
    x = gS(_x(b) ? b : b.contextElement || jx(e.elements.popper), c, u, o),
    S = Tx(e.elements.reference),
    C = _S({ reference: S, element: y, strategy: `absolute`, placement: i }),
    w = fS(Object.assign({}, y, C)),
    T = f === `popper` ? w : S,
    E = {
      top: x.top - T.top + _.top,
      bottom: T.bottom - x.bottom + _.bottom,
      left: x.left - T.left + _.left,
      right: T.right - x.right + _.right,
    },
    D = e.modifiersData.offset;
  if (f === `popper` && D) {
    var O = D[i];
    Object.keys(E).forEach(function (e) {
      var t = [`right`, `bottom`].indexOf(e) >= 0 ? 1 : -1,
        n = [`top`, `bottom`].indexOf(e) >= 0 ? `y` : `x`;
      E[e] += O[n] * t;
    });
  }
  return E;
}
function yS(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    i = n.boundary,
    a = n.rootBoundary,
    o = n.padding,
    s = n.flipVariations,
    c = n.allowedAutoPlacements,
    l = c === void 0 ? px : c,
    u = Kx(r),
    d = u
      ? s
        ? fx
        : fx.filter(function (e) {
            return Kx(e) === u;
          })
      : ox,
    f = d.filter(function (e) {
      return l.indexOf(e) >= 0;
    });
  f.length === 0 && (f = d);
  var p = f.reduce(function (t, n) {
    return (
      (t[n] = vS(e, { placement: n, boundary: i, rootBoundary: a, padding: o })[
        hx(n)
      ]),
      t
    );
  }, {});
  return Object.keys(p).sort(function (e, t) {
    return p[e] - p[t];
  });
}
function bS(e) {
  if (hx(e) === `auto`) return [];
  var t = nS(e);
  return [iS(e), t, iS(t)];
}
function xS(e) {
  var t = e.state,
    n = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var i = n.mainAxis,
        a = i === void 0 || i,
        o = n.altAxis,
        s = o === void 0 || o,
        c = n.fallbackPlacements,
        l = n.padding,
        u = n.boundary,
        d = n.rootBoundary,
        f = n.altBoundary,
        p = n.flipVariations,
        m = p === void 0 || p,
        h = n.allowedAutoPlacements,
        g = t.options.placement,
        _ = hx(g) === g,
        v = c || (_ || !m ? [nS(g)] : bS(g)),
        y = [g].concat(v).reduce(function (e, n) {
          return e.concat(
            hx(n) === `auto`
              ? yS(t, {
                  placement: n,
                  boundary: u,
                  rootBoundary: d,
                  padding: l,
                  flipVariations: m,
                  allowedAutoPlacements: h,
                })
              : n,
          );
        }, []),
        b = t.rects.reference,
        x = t.rects.popper,
        S = new Map(),
        C = !0,
        w = y[0],
        T = 0;
      T < y.length;
      T++
    ) {
      var E = y[T],
        D = hx(E),
        O = Kx(E) === sx,
        k = [`top`, nx].indexOf(D) >= 0,
        A = k ? `width` : `height`,
        j = vS(t, {
          placement: E,
          boundary: u,
          rootBoundary: d,
          altBoundary: f,
          padding: l,
        }),
        M = k ? (O ? rx : ix) : O ? nx : `top`;
      b[A] > x[A] && (M = nS(M));
      var N = nS(M),
        P = [];
      if (
        (a && P.push(j[D] <= 0),
        s && P.push(j[M] <= 0, j[N] <= 0),
        P.every(function (e) {
          return e;
        }))
      ) {
        ((w = E), (C = !1));
        break;
      }
      S.set(E, P);
    }
    if (C)
      for (
        var F = m ? 3 : 1,
          ee = function (e) {
            var t = y.find(function (t) {
              var n = S.get(t);
              if (n)
                return n.slice(0, e).every(function (e) {
                  return e;
                });
            });
            if (t) return ((w = t), `break`);
          },
          te = F;
        te > 0 && ee(te) !== `break`;
        te--
      );
    t.placement !== w &&
      ((t.modifiersData[r]._skip = !0), (t.placement = w), (t.reset = !0));
  }
}
var SS = {
  name: `flip`,
  enabled: !0,
  phase: `main`,
  fn: xS,
  requiresIfExists: [`offset`],
  data: { _skip: !1 },
};
function CS(e, t, n) {
  return (
    n === void 0 && (n = { x: 0, y: 0 }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x,
    }
  );
}
function wS(e) {
  return [`top`, rx, nx, ix].some(function (t) {
    return e[t] >= 0;
  });
}
function TS(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    i = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    o = vS(t, { elementContext: `reference` }),
    s = vS(t, { altBoundary: !0 }),
    c = CS(o, r),
    l = CS(s, i, a),
    u = wS(c),
    d = wS(l);
  ((t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: l,
    isReferenceHidden: u,
    hasPopperEscaped: d,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": u,
      "data-popper-escaped": d,
    })));
}
var ES = {
  name: `hide`,
  enabled: !0,
  phase: `main`,
  requiresIfExists: [`preventOverflow`],
  fn: TS,
};
function DS(e, t, n) {
  var r = hx(e),
    i = [`left`, `top`].indexOf(r) >= 0 ? -1 : 1,
    a = typeof n == `function` ? n(Object.assign({}, t, { placement: e })) : n,
    o = a[0],
    s = a[1];
  return (
    (o ||= 0),
    (s = (s || 0) * i),
    [`left`, `right`].indexOf(r) >= 0 ? { x: s, y: o } : { x: o, y: s }
  );
}
function OS(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    i = n.offset,
    a = i === void 0 ? [0, 0] : i,
    o = px.reduce(function (e, n) {
      return ((e[n] = DS(n, t.rects, a)), e);
    }, {}),
    s = o[t.placement],
    c = s.x,
    l = s.y;
  (t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c),
    (t.modifiersData.popperOffsets.y += l)),
    (t.modifiersData[r] = o));
}
var kS = {
  name: `offset`,
  enabled: !0,
  phase: `main`,
  requires: [`popperOffsets`],
  fn: OS,
};
function AS(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = _S({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: `absolute`,
    placement: t.placement,
  });
}
var jS = {
  name: `popperOffsets`,
  enabled: !0,
  phase: `read`,
  fn: AS,
  data: {},
};
function MS(e) {
  return e === `x` ? `y` : `x`;
}
function NS(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    i = n.mainAxis,
    a = i === void 0 || i,
    o = n.altAxis,
    s = o !== void 0 && o,
    c = n.boundary,
    l = n.rootBoundary,
    u = n.altBoundary,
    d = n.padding,
    f = n.tether,
    p = f === void 0 || f,
    m = n.tetherOffset,
    h = m === void 0 ? 0 : m,
    g = vS(t, { boundary: c, rootBoundary: l, padding: d, altBoundary: u }),
    _ = hx(t.placement),
    v = Kx(t.placement),
    y = !v,
    b = Ix(_),
    x = MS(b),
    S = t.modifiersData.popperOffsets,
    C = t.rects.reference,
    w = t.rects.popper,
    T =
      typeof h == `function`
        ? h(Object.assign({}, t.rects, { placement: t.placement }))
        : h,
    E =
      typeof T == `number`
        ? { mainAxis: T, altAxis: T }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
    D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    O = { x: 0, y: 0 };
  if (S) {
    if (a) {
      var k = b === `y` ? `top` : ix,
        A = b === `y` ? nx : rx,
        j = b === `y` ? `height` : `width`,
        M = S[b],
        N = M + g[k],
        P = M - g[A],
        F = p ? -w[j] / 2 : 0,
        ee = v === `start` ? C[j] : w[j],
        te = v === `start` ? -w[j] : -C[j],
        I = t.elements.arrow,
        L = p && I ? Ex(I) : { width: 0, height: 0 },
        R = t.modifiersData[`arrow#persistent`]
          ? t.modifiersData[`arrow#persistent`].padding
          : zx(),
        z = R[k],
        ne = R[A],
        re = Lx(0, C[j], L[j]),
        ie = y ? C[j] / 2 - F - re - z - E.mainAxis : ee - re - z - E.mainAxis,
        ae = y
          ? -C[j] / 2 + F + re + ne + E.mainAxis
          : te + re + ne + E.mainAxis,
        oe = t.elements.arrow && Fx(t.elements.arrow),
        se = oe ? (b === `y` ? oe.clientTop || 0 : oe.clientLeft || 0) : 0,
        B = D?.[b] ?? 0,
        ce = M + ie - B - se,
        le = M + ae - B,
        ue = Lx(p ? xx(N, ce) : N, M, p ? bx(P, le) : P);
      ((S[b] = ue), (O[b] = ue - M));
    }
    if (s) {
      var de = b === `x` ? `top` : ix,
        fe = b === `x` ? nx : rx,
        pe = S[x],
        me = x === `y` ? `height` : `width`,
        he = pe + g[de],
        ge = pe - g[fe],
        _e = [`top`, ix].indexOf(_) !== -1,
        ve = D?.[x] ?? 0,
        ye = _e ? he : pe - C[me] - w[me] - ve + E.altAxis,
        be = _e ? pe + C[me] + w[me] - ve - E.altAxis : ge,
        V = p && _e ? Rx(ye, pe, be) : Lx(p ? ye : he, pe, p ? be : ge);
      ((S[x] = V), (O[x] = V - pe));
    }
    t.modifiersData[r] = O;
  }
}
var PS = {
  name: `preventOverflow`,
  enabled: !0,
  phase: `main`,
  fn: NS,
  requiresIfExists: [`offset`],
};
function FS(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function IS(e) {
  return e === gx(e) || !vx(e) ? aS(e) : FS(e);
}
function LS(e) {
  var t = e.getBoundingClientRect(),
    n = Sx(t.width) / e.offsetWidth || 1,
    r = Sx(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function RS(e, t, n) {
  n === void 0 && (n = !1);
  var r = vx(t),
    i = vx(t) && LS(t),
    a = jx(t),
    o = Tx(e, i, n),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (r || (!r && !n)) &&
      ((Ox(t) !== `body` || lS(a)) && (s = IS(t)),
      vx(t)
        ? ((c = Tx(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
        : a && (c.x = oS(a))),
    {
      x: o.left + s.scrollLeft - c.x,
      y: o.top + s.scrollTop - c.y,
      width: o.width,
      height: o.height,
    }
  );
}
function zS(e) {
  var t = new Map(),
    n = new Set(),
    r = [];
  e.forEach(function (e) {
    t.set(e.name, e);
  });
  function i(e) {
    (n.add(e.name),
      []
        .concat(e.requires || [], e.requiresIfExists || [])
        .forEach(function (e) {
          if (!n.has(e)) {
            var r = t.get(e);
            r && i(r);
          }
        }),
      r.push(e));
  }
  return (
    e.forEach(function (e) {
      n.has(e.name) || i(e);
    }),
    r
  );
}
function BS(e) {
  var t = zS(e);
  return mx.reduce(function (e, n) {
    return e.concat(
      t.filter(function (e) {
        return e.phase === n;
      }),
    );
  }, []);
}
function VS(e) {
  var t;
  return function () {
    return (
      (t ||= new Promise(function (n) {
        Promise.resolve().then(function () {
          ((t = void 0), n(e()));
        });
      })),
      t
    );
  };
}
function HS(e) {
  var t = e.reduce(function (e, t) {
    var n = e[t.name];
    return (
      (e[t.name] = n
        ? Object.assign({}, n, t, {
            options: Object.assign({}, n.options, t.options),
            data: Object.assign({}, n.data, t.data),
          })
        : t),
      e
    );
  }, {});
  return Object.keys(t).map(function (e) {
    return t[e];
  });
}
var US = { placement: `bottom`, modifiers: [], strategy: `absolute` };
function WS() {
  return ![...arguments].some(function (e) {
    return !(e && typeof e.getBoundingClientRect == `function`);
  });
}
function GS(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    i = t.defaultOptions,
    a = i === void 0 ? US : i;
  return function (e, t, n) {
    n === void 0 && (n = a);
    var i = {
        placement: `bottom`,
        orderedModifiers: [],
        options: Object.assign({}, US, a),
        modifiersData: {},
        elements: { reference: e, popper: t },
        attributes: {},
        styles: {},
      },
      o = [],
      s = !1,
      c = {
        state: i,
        setOptions: function (n) {
          var o = typeof n == `function` ? n(i.options) : n;
          (u(),
            (i.options = Object.assign({}, a, i.options, o)),
            (i.scrollParents = {
              reference: _x(e)
                ? dS(e)
                : e.contextElement
                  ? dS(e.contextElement)
                  : [],
              popper: dS(t),
            }));
          var s = BS(HS([].concat(r, i.options.modifiers)));
          return (
            (i.orderedModifiers = s.filter(function (e) {
              return e.enabled;
            })),
            l(),
            c.update()
          );
        },
        forceUpdate: function () {
          if (!s) {
            var e = i.elements,
              t = e.reference,
              n = e.popper;
            if (WS(t, n)) {
              ((i.rects = {
                reference: RS(t, Fx(n), i.options.strategy === `fixed`),
                popper: Ex(n),
              }),
                (i.reset = !1),
                (i.placement = i.options.placement),
                i.orderedModifiers.forEach(function (e) {
                  return (i.modifiersData[e.name] = Object.assign({}, e.data));
                }));
              for (var r = 0; r < i.orderedModifiers.length; r++) {
                if (i.reset === !0) {
                  ((i.reset = !1), (r = -1));
                  continue;
                }
                var a = i.orderedModifiers[r],
                  o = a.fn,
                  l = a.options,
                  u = l === void 0 ? {} : l,
                  d = a.name;
                typeof o == `function` &&
                  (i = o({ state: i, options: u, name: d, instance: c }) || i);
              }
            }
          }
        },
        update: VS(function () {
          return new Promise(function (e) {
            (c.forceUpdate(), e(i));
          });
        }),
        destroy: function () {
          (u(), (s = !0));
        },
      };
    if (!WS(e, t)) return c;
    c.setOptions(n).then(function (e) {
      !s && n.onFirstUpdate && n.onFirstUpdate(e);
    });
    function l() {
      i.orderedModifiers.forEach(function (e) {
        var t = e.name,
          n = e.options,
          r = n === void 0 ? {} : n,
          a = e.effect;
        if (typeof a == `function`) {
          var s = a({ state: i, name: t, instance: c, options: r });
          o.push(s || function () {});
        }
      });
    }
    function u() {
      (o.forEach(function (e) {
        return e();
      }),
        (o = []));
    }
    return c;
  };
}
var KS = GS({ defaultModifiers: [ES, jS, Zx, eS, kS, SS, PS, Gx] }),
  qS = [`enabled`, `placement`, `strategy`, `modifiers`];
function JS(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var YS = {
    name: `applyStyles`,
    enabled: !1,
    phase: `afterWrite`,
    fn: () => void 0,
  },
  XS = {
    name: `ariaDescribedBy`,
    enabled: !0,
    phase: `afterWrite`,
    effect:
      ({ state: e }) =>
      () => {
        let { reference: t, popper: n } = e.elements;
        if (`removeAttribute` in t) {
          let e = (t.getAttribute(`aria-describedby`) || ``)
            .split(`,`)
            .filter((e) => e.trim() !== n.id);
          e.length
            ? t.setAttribute(`aria-describedby`, e.join(`,`))
            : t.removeAttribute(`aria-describedby`);
        }
      },
    fn: ({ state: e }) => {
      let { popper: t, reference: n } = e.elements,
        r = t.getAttribute(`role`)?.toLowerCase();
      if (t.id && r === `tooltip` && `setAttribute` in n) {
        let e = n.getAttribute(`aria-describedby`);
        if (e && e.split(`,`).indexOf(t.id) !== -1) return;
        n.setAttribute(`aria-describedby`, e ? `${e},${t.id}` : t.id);
      }
    },
  },
  ZS = [];
function QS(e, t, n = {}) {
  let {
      enabled: r = !0,
      placement: i = `bottom`,
      strategy: a = `absolute`,
      modifiers: o = ZS,
    } = n,
    s = JS(n, qS),
    c = (0, f.useRef)(o),
    l = (0, f.useRef)(),
    u = (0, f.useCallback)(() => {
      var e;
      (e = l.current) == null || e.update();
    }, []),
    d = (0, f.useCallback)(() => {
      var e;
      (e = l.current) == null || e.forceUpdate();
    }, []),
    [p, m] = tx(
      (0, f.useState)({
        placement: i,
        update: u,
        forceUpdate: d,
        attributes: {},
        styles: { popper: {}, arrow: {} },
      }),
    ),
    h = (0, f.useMemo)(
      () => ({
        name: `updateStateModifier`,
        enabled: !0,
        phase: `write`,
        requires: [`computeStyles`],
        fn: ({ state: e }) => {
          let t = {},
            n = {};
          (Object.keys(e.elements).forEach((r) => {
            ((t[r] = e.styles[r]), (n[r] = e.attributes[r]));
          }),
            m({
              state: e,
              styles: t,
              attributes: n,
              update: u,
              forceUpdate: d,
              placement: e.placement,
            }));
        },
      }),
      [u, d, m],
    ),
    g = (0, f.useMemo)(
      () => (ex(c.current, o) || (c.current = o), c.current),
      [o],
    );
  return (
    (0, f.useEffect)(() => {
      !l.current ||
        !r ||
        l.current.setOptions({
          placement: i,
          strategy: a,
          modifiers: [...g, h, YS],
        });
    }, [a, i, h, r, g]),
    (0, f.useEffect)(() => {
      if (!(!r || e == null || t == null))
        return (
          (l.current = KS(
            e,
            t,
            Object.assign({}, s, {
              placement: i,
              strategy: a,
              modifiers: [...g, XS, h],
            }),
          )),
          () => {
            l.current != null &&
              (l.current.destroy(),
              (l.current = void 0),
              m((e) =>
                Object.assign({}, e, {
                  attributes: {},
                  styles: { popper: {} },
                }),
              ));
          }
        );
    }, [r, e, t]),
    p
  );
}
function $S(e, t) {
  if (e.contains) return e.contains(t);
  if (e.compareDocumentPosition)
    return e === t || !!(e.compareDocumentPosition(t) & 16);
}
var eC = l(
    o((e, t) => {
      t.exports = function () {};
    })(),
  ),
  tC = () => {};
function nC(e) {
  return e.button === 0;
}
function rC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
var iC = (e) => e && (`current` in e ? e.current : e),
  aC = { click: `mousedown`, mouseup: `mousedown`, pointerup: `pointerdown` };
function oC(e, t = tC, { disabled: n, clickTrigger: r = `click` } = {}) {
  let i = (0, f.useRef)(!1),
    a = (0, f.useRef)(!1),
    o = (0, f.useCallback)(
      (t) => {
        let n = iC(e);
        ((0, eC.default)(
          !!n,
          `ClickOutside captured a close event but does not have a ref to compare it to. useClickOutside(), should be passed a ref that resolves to a DOM node`,
        ),
          (i.current = !n || rC(t) || !nC(t) || !!$S(n, t.target) || a.current),
          (a.current = !1));
      },
      [e],
    ),
    s = Tb((t) => {
      let n = iC(e);
      n && $S(n, t.target) ? (a.current = !0) : (a.current = !1);
    }),
    c = Tb((e) => {
      i.current || t(e);
    });
  (0, f.useEffect)(() => {
    if (n || e == null) return;
    let t = Ey(iC(e)),
      i = t.defaultView || window,
      a = i.event ?? i.parent?.event,
      l = null;
    aC[r] && (l = tb(t, aC[r], s, !0));
    let u = tb(t, r, o, !0),
      d = tb(t, r, (e) => {
        if (e === a) {
          a = void 0;
          return;
        }
        c(e);
      }),
      f = [];
    return (
      `ontouchstart` in t.documentElement &&
        (f = [].slice.call(t.body.children).map((e) => tb(e, `mousemove`, tC))),
      () => {
        (l?.(), u(), d(), f.forEach((e) => e()));
      }
    );
  }, [e, n, r, o, s, c]);
}
function sC(e) {
  let t = {};
  return Array.isArray(e)
    ? (e?.forEach((e) => {
        t[e.name] = e;
      }),
      t)
    : e || t;
}
function cC(e = {}) {
  return Array.isArray(e)
    ? e
    : Object.keys(e).map((t) => ((e[t].name = t), e[t]));
}
function lC({
  enabled: e,
  enableEvents: t,
  placement: n,
  flip: r,
  offset: i,
  fixed: a,
  containerPadding: o,
  arrowElement: s,
  popperConfig: c = {},
}) {
  let l = sC(c.modifiers);
  return Object.assign({}, c, {
    placement: n,
    enabled: e,
    strategy: a ? `fixed` : c.strategy,
    modifiers: cC(
      Object.assign({}, l, {
        eventListeners: { enabled: t, options: l.eventListeners?.options },
        preventOverflow: Object.assign({}, l.preventOverflow, {
          options: o
            ? Object.assign({ padding: o }, l.preventOverflow?.options)
            : l.preventOverflow?.options,
        }),
        offset: { options: Object.assign({ offset: i }, l.offset?.options) },
        arrow: Object.assign({}, l.arrow, {
          enabled: !!s,
          options: Object.assign({}, l.arrow?.options, { element: s }),
        }),
        flip: Object.assign({ enabled: !!r }, l.flip),
      }),
    ),
  });
}
var uC = [`children`, `usePopper`];
function dC(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var fC = () => {};
function pC(e = {}) {
  let t = (0, f.useContext)(Zb),
    [n, r] = Cb(),
    i = (0, f.useRef)(!1),
    {
      flip: a,
      offset: o,
      rootCloseEvent: s,
      fixed: c = !1,
      placement: l,
      popperConfig: u = {},
      enableEventListeners: d = !0,
      usePopper: p = !!t,
    } = e,
    m = t?.show == null ? !!e.show : t.show;
  m && !i.current && (i.current = !0);
  let h = (e) => {
      t?.toggle(!1, e);
    },
    { placement: g, setMenu: _, menuElement: v, toggleElement: y } = t || {},
    b = QS(
      y,
      v,
      lC({
        placement: l || g || `bottom-start`,
        enabled: p,
        enableEvents: d ?? m,
        offset: o,
        flip: a,
        fixed: c,
        arrowElement: n,
        popperConfig: u,
      }),
    ),
    x = Object.assign(
      { ref: _ || fC, "aria-labelledby": y?.id },
      b.attributes.popper,
      { style: b.styles.popper },
    ),
    S = {
      show: m,
      placement: g,
      hasShown: i.current,
      toggle: t?.toggle,
      popper: p ? b : null,
      arrowProps: p
        ? Object.assign({ ref: r }, b.attributes.arrow, {
            style: b.styles.arrow,
          })
        : {},
    };
  return (oC(v, h, { clickTrigger: s, disabled: !m }), [x, S]);
}
function mC(e) {
  let { children: t, usePopper: n = !0 } = e,
    r = dC(e, uC),
    [i, a] = pC(Object.assign({}, r, { usePopper: n }));
  return (0, q.jsx)(q.Fragment, { children: t(i, a) });
}
mC.displayName = `DropdownMenu`;
var hC = { prefix: String(Math.round(Math.random() * 1e10)), current: 0 },
  gC = f.createContext(hC),
  _C = f.createContext(!1);
typeof window < `u` && window.document && window.document.createElement;
var vC = new WeakMap();
function yC(e = !1) {
  let t = (0, f.useContext)(gC),
    n = (0, f.useRef)(null);
  if (n.current === null && !e) {
    let e =
      f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner
        ?.current;
    if (e) {
      let n = vC.get(e);
      n == null
        ? vC.set(e, { id: t.current, state: e.memoizedState })
        : e.memoizedState !== n.state && ((t.current = n.id), vC.delete(e));
    }
    n.current = ++t.current;
  }
  return n.current;
}
function bC(e) {
  let t = (0, f.useContext)(gC),
    n = yC(!!e),
    r = `react-aria${t.prefix}`;
  return e || `${r}-${n}`;
}
function xC(e) {
  let t = f.useId(),
    [n] = (0, f.useState)(EC()),
    r = n ? `react-aria` : `react-aria${hC.prefix}`;
  return e || `${r}-${t}`;
}
var SC = typeof f.useId == `function` ? xC : bC;
function CC() {
  return !1;
}
function wC() {
  return !0;
}
function TC(e) {
  return () => {};
}
function EC() {
  return typeof f.useSyncExternalStore == `function`
    ? f.useSyncExternalStore(TC, CC, wC)
    : (0, f.useContext)(_C);
}
var DC = (e) => e.getAttribute(`role`)?.toLowerCase() === `menu`,
  OC = () => {};
function kC() {
  let e = SC(),
    {
      show: t = !1,
      toggle: n = OC,
      setToggle: r,
      menuElement: i,
    } = (0, f.useContext)(Zb) || {},
    a = (0, f.useCallback)(
      (e) => {
        n(!t, e);
      },
      [t, n],
    ),
    o = { id: e, ref: r || OC, onClick: a, "aria-expanded": !!t };
  return (i && DC(i) && (o[`aria-haspopup`] = !0), [o, { show: t, toggle: n }]);
}
function AC({ children: e }) {
  let [t, n] = kC();
  return (0, q.jsx)(q.Fragment, { children: e(t, n) });
}
AC.displayName = `DropdownToggle`;
var jC = f.createContext(null),
  MC = (e, t = null) => (e == null ? t || null : String(e)),
  NC = f.createContext(null);
NC.displayName = `NavContext`;
var PC = `data-rr-ui-`,
  FC = `rrUi`;
function IC(e) {
  return `${PC}${e}`;
}
function LC(e) {
  return `${FC}${e}`;
}
var RC = [`eventKey`, `disabled`, `onClick`, `active`, `as`];
function zC(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function BC({ key: e, href: t, active: n, disabled: r, onClick: i }) {
  let a = (0, f.useContext)(jC),
    { activeKey: o } = (0, f.useContext)(NC) || {},
    s = MC(e, t),
    c = n == null && e != null ? MC(o) === s : n;
  return [
    {
      onClick: Tb((e) => {
        r || (i?.(e), a && !e.isPropagationStopped() && a(s, e));
      }),
      "aria-disabled": r || void 0,
      "aria-selected": c,
      [IC(`dropdown-item`)]: ``,
    },
    { isActive: c },
  ];
}
var VC = f.forwardRef((e, t) => {
  let { eventKey: n, disabled: r, onClick: i, active: a, as: o = Fb } = e,
    s = zC(e, RC),
    [c] = BC({ key: n, href: s.href, disabled: r, onClick: i, active: a });
  return (0, q.jsx)(o, Object.assign({}, s, { ref: t }, c));
});
VC.displayName = `DropdownItem`;
var HC = (0, f.createContext)(Yy ? window : void 0);
HC.Provider;
function UC() {
  return (0, f.useContext)(HC);
}
function WC() {
  let e = Xb(),
    t = (0, f.useRef)(null);
  return [
    t,
    (0, f.useCallback)(
      (n) => {
        ((t.current = n), e());
      },
      [e],
    ),
  ];
}
function GC({
  defaultShow: e,
  show: t,
  onSelect: n,
  onToggle: r,
  itemSelector: i = `* [${IC(`dropdown-item`)}]`,
  focusFirstItemOnShow: a,
  placement: o = `bottom-start`,
  children: s,
}) {
  let c = UC(),
    [l, u] = Yb(t, e, r),
    [d, p] = WC(),
    m = d.current,
    [h, g] = WC(),
    _ = h.current,
    v = Ob(l),
    y = (0, f.useRef)(null),
    b = (0, f.useRef)(!1),
    x = (0, f.useContext)(jC),
    S = (0, f.useCallback)(
      (e, t, n = t?.type) => {
        u(e, { originalEvent: t, source: n });
      },
      [u],
    ),
    C = Tb((e, t) => {
      (n?.(e, t), S(!1, t, `select`), t.isPropagationStopped() || x?.(e, t));
    }),
    w = (0, f.useMemo)(
      () => ({
        toggle: S,
        placement: o,
        show: l,
        menuElement: m,
        toggleElement: _,
        setMenu: p,
        setToggle: g,
      }),
      [S, o, l, m, _, p, g],
    );
  m && v && !l && (b.current = m.contains(m.ownerDocument.activeElement));
  let T = Tb(() => {
      _ && _.focus && _.focus();
    }),
    E = Tb(() => {
      let e = y.current,
        t = a;
      if (
        ((t ??= d.current && DC(d.current) ? `keyboard` : !1),
        t === !1 || (t === `keyboard` && !/^key.+$/.test(e)))
      )
        return;
      let n = Jb(d.current, i)[0];
      n && n.focus && n.focus();
    });
  ((0, f.useEffect)(() => {
    l ? E() : b.current && ((b.current = !1), T());
  }, [l, b, T, E]),
    (0, f.useEffect)(() => {
      y.current = null;
    }));
  let D = (e, t) => {
    if (!d.current) return null;
    let n = Jb(d.current, i),
      r = n.indexOf(e) + t;
    return ((r = Math.max(0, Math.min(r, n.length))), n[r]);
  };
  return (
    Eb(
      (0, f.useCallback)(() => c.document, [c]),
      `keydown`,
      (e) => {
        let { key: t } = e,
          n = e.target,
          r = d.current?.contains(n),
          i = h.current?.contains(n);
        if (
          (/input|textarea/i.test(n.tagName) &&
            (t === ` ` ||
              (t !== `Escape` && r) ||
              (t === `Escape` && n.type === `search`))) ||
          (!r && !i) ||
          (t === `Tab` && (!d.current || !l))
        )
          return;
        y.current = e.type;
        let a = { originalEvent: e, source: e.type };
        switch (t) {
          case `ArrowUp`: {
            let t = D(n, -1);
            (t && t.focus && t.focus(), e.preventDefault());
            return;
          }
          case `ArrowDown`:
            if ((e.preventDefault(), !l)) u(!0, a);
            else {
              let e = D(n, 1);
              e && e.focus && e.focus();
            }
            return;
          case `Tab`:
            $y(
              n.ownerDocument,
              `keyup`,
              (e) => {
                var t;
                ((e.key === `Tab` && !e.target) ||
                  !((t = d.current) != null && t.contains(e.target))) &&
                  u(!1, a);
              },
              { once: !0 },
            );
            break;
          case `Escape`:
            (t === `Escape` && (e.preventDefault(), e.stopPropagation()),
              u(!1, a));
        }
      },
    ),
    (0, q.jsx)(jC.Provider, {
      value: C,
      children: (0, q.jsx)(Zb.Provider, { value: w, children: s }),
    })
  );
}
((GC.displayName = `Dropdown`),
  (GC.Menu = mC),
  (GC.Toggle = AC),
  (GC.Item = VC));
var KC = f.createContext({});
KC.displayName = `DropdownContext`;
var qC = f.forwardRef(
  (
    { className: e, bsPrefix: t, as: n = `hr`, role: r = `separator`, ...i },
    a,
  ) => (
    (t = wy(t, `dropdown-divider`)),
    (0, q.jsx)(n, { ref: a, className: (0, hb.default)(e, t), role: r, ...i })
  ),
);
qC.displayName = `DropdownDivider`;
var JC = f.forwardRef(
  (
    { className: e, bsPrefix: t, as: n = `div`, role: r = `heading`, ...i },
    a,
  ) => (
    (t = wy(t, `dropdown-header`)),
    (0, q.jsx)(n, { ref: a, className: (0, hb.default)(e, t), role: r, ...i })
  ),
);
JC.displayName = `DropdownHeader`;
var YC = f.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      eventKey: n,
      disabled: r = !1,
      onClick: i,
      active: a,
      as: o = zb,
      ...s
    },
    c,
  ) => {
    let l = wy(e, `dropdown-item`),
      [u, d] = BC({ key: n, href: s.href, disabled: r, onClick: i, active: a });
    return (0, q.jsx)(o, {
      ...s,
      ...u,
      ref: c,
      className: (0, hb.default)(t, l, d.isActive && `active`, r && `disabled`),
    });
  },
);
YC.displayName = `DropdownItem`;
var XC = f.forwardRef(
  ({ className: e, bsPrefix: t, as: n = `span`, ...r }, i) => (
    (t = wy(t, `dropdown-item-text`)),
    (0, q.jsx)(n, { ref: i, className: (0, hb.default)(e, t), ...r })
  ),
);
XC.displayName = `DropdownItemText`;
var ZC =
    typeof global < `u` &&
    global.navigator &&
    global.navigator.product === `ReactNative`,
  QC = typeof document < `u` || ZC ? f.useLayoutEffect : f.useEffect,
  $C = f.createContext(null);
$C.displayName = `InputGroupContext`;
var ew = f.createContext(null);
ew.displayName = `NavbarContext`;
function tw(e, t) {
  return e;
}
function nw(e, t, n) {
  let r = n ? `top-end` : `top-start`,
    i = n ? `top-start` : `top-end`,
    a = n ? `bottom-end` : `bottom-start`,
    o = n ? `bottom-start` : `bottom-end`,
    s = n ? `right-start` : `left-start`,
    c = n ? `right-end` : `left-end`,
    l = n ? `left-start` : `right-start`,
    u = n ? `left-end` : `right-end`,
    d = e ? o : a;
  return (
    t === `up`
      ? (d = e ? i : r)
      : t === `end`
        ? (d = e ? u : l)
        : t === `start`
          ? (d = e ? c : s)
          : t === `down-centered`
            ? (d = `bottom`)
            : t === `up-centered` && (d = `top`),
    d
  );
}
var rw = f.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      align: n,
      rootCloseEvent: r,
      flip: i = !0,
      show: a,
      renderOnMount: o,
      as: s = `div`,
      popperConfig: c,
      variant: l,
      ...u
    },
    d,
  ) => {
    let p = !1,
      m = (0, f.useContext)(ew),
      h = wy(e, `dropdown-menu`),
      { align: g, drop: _, isRTL: v } = (0, f.useContext)(KC);
    n ||= g;
    let y = (0, f.useContext)($C),
      b = [];
    if (n) {
      if (typeof n == `object`) {
        let e = Object.keys(n);
        if (e.length) {
          let t = e[0],
            r = n[t];
          ((p = r === `start`), b.push(`${h}-${t}-${r}`));
        }
      } else n === `end` && (p = !0);
    }
    let x = nw(p, _, v),
      [S, { hasShown: C, popper: w, show: T, toggle: E }] = pC({
        flip: i,
        rootCloseEvent: r,
        show: a,
        usePopper: !m && b.length === 0,
        offset: [0, 2],
        popperConfig: c,
        placement: x,
      });
    if (
      ((S.ref = fb(tw(d, `DropdownMenu`), S.ref)),
      QC(() => {
        T && w?.update();
      }, [T]),
      !C && !o && !y)
    )
      return null;
    typeof s != `string` &&
      ((S.show = T), (S.close = () => E?.(!1)), (S.align = n));
    let D = u.style;
    return (
      w != null &&
        w.placement &&
        ((D = { ...u.style, ...S.style }), (u[`x-placement`] = w.placement)),
      (0, q.jsx)(s, {
        ...u,
        ...S,
        style: D,
        ...((b.length || m) && { "data-bs-popper": `static` }),
        className: (0, hb.default)(
          t,
          h,
          T && `show`,
          p && `${h}-end`,
          l && `${h}-${l}`,
          ...b,
        ),
      })
    );
  },
);
rw.displayName = `DropdownMenu`;
var iw = f.forwardRef(
  (
    { bsPrefix: e, split: t, className: n, childBsPrefix: r, as: i = Wb, ...a },
    o,
  ) => {
    let s = wy(e, `dropdown-toggle`),
      c = (0, f.useContext)(Zb);
    r !== void 0 && (a.bsPrefix = r);
    let [l] = kC();
    return (
      (l.ref = fb(l.ref, tw(o, `DropdownToggle`))),
      (0, q.jsx)(i, {
        className: (0, hb.default)(n, s, t && `${s}-split`, c?.show && `show`),
        ...l,
        ...a,
      })
    );
  },
);
iw.displayName = `DropdownToggle`;
var aw = f.forwardRef((e, t) => {
  let {
      bsPrefix: n,
      drop: r = `down`,
      show: i,
      className: a,
      align: o = `start`,
      onSelect: s,
      onToggle: c,
      focusFirstItemOnShow: l,
      as: u = `div`,
      navbar: d,
      autoClose: p = !0,
      ...m
    } = vy(e, { show: `onToggle` }),
    h = (0, f.useContext)($C),
    g = wy(n, `dropdown`),
    _ = Ty(),
    v = (e) =>
      p === !1
        ? e === `click`
        : p === `inside`
          ? e !== `rootClose`
          : p !== `outside` || e !== `select`,
    y = xb((e, t) => {
      var n;
      ((n = t.originalEvent) != null &&
        (n = n.target) != null &&
        n.classList.contains(`dropdown-toggle`) &&
        t.source === `mousedown`) ||
        (t.originalEvent.currentTarget === document &&
          (t.source !== `keydown` || t.originalEvent.key === `Escape`) &&
          (t.source = `rootClose`),
        v(t.source) && c?.(e, t));
    }),
    b = nw(o === `end`, r, _),
    x = (0, f.useMemo)(() => ({ align: o, drop: r, isRTL: _ }), [o, r, _]),
    S = {
      down: g,
      "down-centered": `${g}-center`,
      up: `dropup`,
      "up-centered": `dropup-center dropup`,
      end: `dropend`,
      start: `dropstart`,
    };
  return (0, q.jsx)(KC.Provider, {
    value: x,
    children: (0, q.jsx)(GC, {
      placement: b,
      show: i,
      onSelect: s,
      onToggle: y,
      focusFirstItemOnShow: l,
      itemSelector: `.${g}-item:not(.disabled):not(:disabled)`,
      children: h
        ? m.children
        : (0, q.jsx)(u, {
            ...m,
            ref: t,
            className: (0, hb.default)(a, i && `show`, S[r]),
          }),
    }),
  });
});
aw.displayName = `Dropdown`;
var ow = Object.assign(aw, {
    Toggle: iw,
    Menu: rw,
    Item: YC,
    ItemText: XC,
    Divider: qC,
    Header: JC,
  }),
  sw = (e) =>
    !e || typeof e == `function`
      ? e
      : (t) => {
          e.current = t;
        };
function cw(e, t) {
  let n = sw(e),
    r = sw(t);
  return (e) => {
    (n && n(e), r && r(e));
  };
}
function lw(e, t) {
  return (0, f.useMemo)(() => cw(e, t), [e, t]);
}
var uw = f.createContext(null),
  dw = [`as`, `active`, `eventKey`];
function fw(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function pw({ key: e, onClick: t, active: n, id: r, role: i, disabled: a }) {
  let o = (0, f.useContext)(jC),
    s = (0, f.useContext)(NC),
    c = (0, f.useContext)(uw),
    l = n,
    u = { role: i };
  if (s) {
    !i && s.role === `tablist` && (u.role = `tab`);
    let t = s.getControllerId(e ?? null),
      a = s.getControlledId(e ?? null);
    ((u[IC(`event-key`)] = e),
      (u.id = t || r),
      (l = n == null && e != null ? s.activeKey === e : n),
      (l ||
        (!(c != null && c.unmountOnExit) && !(c != null && c.mountOnEnter))) &&
        (u[`aria-controls`] = a));
  }
  return (
    u.role === `tab` &&
      ((u[`aria-selected`] = l),
      l || (u.tabIndex = -1),
      a && ((u.tabIndex = -1), (u[`aria-disabled`] = !0))),
    (u.onClick = Tb((n) => {
      a || (t?.(n), e != null && o && !n.isPropagationStopped() && o(e, n));
    })),
    [u, { isActive: l }]
  );
}
var mw = f.forwardRef((e, t) => {
  let { as: n = Fb, active: r, eventKey: i } = e,
    a = fw(e, dw),
    [o, s] = pw(Object.assign({ key: MC(i, a.href), active: r }, a));
  return (
    (o[IC(`active`)] = s.isActive),
    (0, q.jsx)(n, Object.assign({}, a, o, { ref: t }))
  );
});
mw.displayName = `NavItem`;
var hw = [`as`, `onSelect`, `activeKey`, `role`, `onKeyDown`];
function gw(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var _w = () => {},
  vw = IC(`event-key`),
  yw = f.forwardRef((e, t) => {
    let { as: n = `div`, onSelect: r, activeKey: i, role: a, onKeyDown: o } = e,
      s = gw(e, hw),
      c = Xb(),
      l = (0, f.useRef)(!1),
      u = (0, f.useContext)(jC),
      d = (0, f.useContext)(uw),
      p,
      m;
    d &&
      ((a ||= `tablist`),
      (i = d.activeKey),
      (p = d.getControlledId),
      (m = d.getControllerId));
    let h = (0, f.useRef)(null),
      g = (e) => {
        let t = h.current;
        if (!t) return null;
        let n = Jb(t, `[${vw}]:not([aria-disabled=true])`),
          r = t.querySelector(`[aria-selected=true]`);
        if (!r || r !== document.activeElement) return null;
        let i = n.indexOf(r);
        if (i === -1) return null;
        let a = i + e;
        return (a >= n.length && (a = 0), a < 0 && (a = n.length - 1), n[a]);
      },
      _ = (e, t) => {
        e != null && (r?.(e, t), u?.(e, t));
      },
      v = (e) => {
        if ((o?.(e), !d)) return;
        let t;
        switch (e.key) {
          case `ArrowLeft`:
          case `ArrowUp`:
            t = g(-1);
            break;
          case `ArrowRight`:
          case `ArrowDown`:
            t = g(1);
            break;
          default:
            return;
        }
        t &&
          (e.preventDefault(),
          _(t.dataset[LC(`EventKey`)] || null, e),
          (l.current = !0),
          c());
      };
    (0, f.useEffect)(() => {
      (h.current &&
        l.current &&
        h.current.querySelector(`[${vw}][aria-selected=true]`)?.focus(),
        (l.current = !1));
    });
    let y = lw(t, h);
    return (0, q.jsx)(jC.Provider, {
      value: _,
      children: (0, q.jsx)(NC.Provider, {
        value: {
          role: a,
          activeKey: MC(i),
          getControlledId: p || _w,
          getControllerId: m || _w,
        },
        children: (0, q.jsx)(
          n,
          Object.assign({}, s, { onKeyDown: v, ref: y, role: a }),
        ),
      }),
    });
  });
yw.displayName = `Nav`;
var bw = Object.assign(yw, { Item: mw });
function xw(e) {
  e === void 0 && (e = Ey());
  try {
    var t = e.activeElement;
    return !t || !t.nodeName ? null : t;
  } catch {
    return e.body;
  }
}
function Sw(e) {
  let t = (0, f.useRef)(e);
  return ((t.current = e), t);
}
function Cw(e) {
  let t = Sw(e);
  (0, f.useEffect)(() => () => t.current(), []);
}
function ww(e = document) {
  let t = e.defaultView;
  return Math.abs(t.innerWidth - e.documentElement.clientWidth);
}
var Tw = IC(`modal-open`),
  Ew = class {
    constructor({
      ownerDocument: e,
      handleContainerOverflow: t = !0,
      isRTL: n = !1,
    } = {}) {
      ((this.handleContainerOverflow = t),
        (this.isRTL = n),
        (this.modals = []),
        (this.ownerDocument = e));
    }
    getScrollbarWidth() {
      return ww(this.ownerDocument);
    }
    getElement() {
      return (this.ownerDocument || document).body;
    }
    setModalAttributes(e) {}
    removeModalAttributes(e) {}
    setContainerStyle(e) {
      let t = { overflow: `hidden` },
        n = this.isRTL ? `paddingLeft` : `paddingRight`,
        r = this.getElement();
      ((e.style = { overflow: r.style.overflow, [n]: r.style[n] }),
        e.scrollBarWidth &&
          (t[n] = `${parseInt(Fy(r, n) || `0`, 10) + e.scrollBarWidth}px`),
        r.setAttribute(Tw, ``),
        Fy(r, t));
    }
    reset() {
      [...this.modals].forEach((e) => this.remove(e));
    }
    removeContainerStyle(e) {
      let t = this.getElement();
      (t.removeAttribute(Tw), Object.assign(t.style, e.style));
    }
    add(e) {
      let t = this.modals.indexOf(e);
      return t !== -1 ||
        ((t = this.modals.length),
        this.modals.push(e),
        this.setModalAttributes(e),
        t !== 0)
        ? t
        : ((this.state = {
            scrollBarWidth: this.getScrollbarWidth(),
            style: {},
          }),
          this.handleContainerOverflow && this.setContainerStyle(this.state),
          t);
    }
    remove(e) {
      let t = this.modals.indexOf(e);
      t !== -1 &&
        (this.modals.splice(t, 1),
        !this.modals.length &&
          this.handleContainerOverflow &&
          this.removeContainerStyle(this.state),
        this.removeModalAttributes(e));
    }
    isTopModal(e) {
      return !!this.modals.length && this.modals[this.modals.length - 1] === e;
    }
  },
  Dw = (e, t) =>
    Yy
      ? e == null
        ? (t || Ey()).body
        : (typeof e == `function` && (e = e()),
          e && `current` in e && (e = e.current),
          e && (`nodeType` in e || e.getBoundingClientRect) ? e : null)
      : null;
function Ow(e, t) {
  let n = UC(),
    [r, i] = (0, f.useState)(() => Dw(e, n?.document));
  if (!r) {
    let t = Dw(e);
    t && i(t);
  }
  return (
    (0, f.useEffect)(() => {
      t && r && t(r);
    }, [t, r]),
    (0, f.useEffect)(() => {
      let t = Dw(e);
      t !== r && i(t);
    }, [e, r]),
    r
  );
}
function kw({
  children: e,
  in: t,
  onExited: n,
  mountOnEnter: r,
  unmountOnExit: i,
}) {
  let a = (0, f.useRef)(null),
    o = (0, f.useRef)(t),
    s = Tb(n);
  (0, f.useEffect)(() => {
    t ? (o.current = !0) : s(a.current);
  }, [t, s]);
  let c = lw(a, Jy(e)),
    l = (0, f.cloneElement)(e, { ref: c });
  return t ? l : i || (!o.current && r) ? null : l;
}
var Aw = [
  `onEnter`,
  `onEntering`,
  `onEntered`,
  `onExit`,
  `onExiting`,
  `onExited`,
  `addEndListener`,
  `children`,
];
function jw(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Mw(e) {
  let {
      onEnter: t,
      onEntering: n,
      onEntered: r,
      onExit: i,
      onExiting: a,
      onExited: o,
      addEndListener: s,
      children: c,
    } = e,
    l = jw(e, Aw),
    u = (0, f.useRef)(null),
    d = lw(u, Jy(c)),
    p = (e) => (t) => {
      e && u.current && e(u.current, t);
    },
    m = (0, f.useCallback)(p(t), [t]),
    h = (0, f.useCallback)(p(n), [n]),
    g = (0, f.useCallback)(p(r), [r]),
    _ = (0, f.useCallback)(p(i), [i]),
    v = (0, f.useCallback)(p(a), [a]),
    y = (0, f.useCallback)(p(o), [o]),
    b = (0, f.useCallback)(p(s), [s]);
  return Object.assign(
    {},
    l,
    { nodeRef: u },
    t && { onEnter: m },
    n && { onEntering: h },
    r && { onEntered: g },
    i && { onExit: _ },
    a && { onExiting: v },
    o && { onExited: y },
    s && { addEndListener: b },
    {
      children:
        typeof c == `function`
          ? (e, t) => c(e, Object.assign({}, t, { ref: d }))
          : (0, f.cloneElement)(c, { ref: d }),
    },
  );
}
var Nw = [`component`];
function Pw(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var Fw = f.forwardRef((e, t) => {
  let { component: n } = e,
    r = Mw(Pw(e, Nw));
  return (0, q.jsx)(n, Object.assign({ ref: t }, r));
});
function Iw({ in: e, onTransition: t }) {
  let n = (0, f.useRef)(null),
    r = (0, f.useRef)(!0),
    i = Tb(t);
  return (
    Ab(() => {
      if (!n.current) return;
      let t = !1;
      return (
        i({ in: e, element: n.current, initial: r.current, isStale: () => t }),
        () => {
          t = !0;
        }
      );
    }, [e, i]),
    Ab(
      () => (
        (r.current = !1),
        () => {
          r.current = !0;
        }
      ),
      [],
    ),
    n
  );
}
function Lw({ children: e, in: t, onExited: n, onEntered: r, transition: i }) {
  let [a, o] = (0, f.useState)(!t);
  t && a && o(!1);
  let s = lw(
    Iw({
      in: !!t,
      onTransition: (e) => {
        Promise.resolve(i(e)).then(
          () => {
            e.isStale() ||
              (e.in ? r?.(e.element, e.initial) : (o(!0), n?.(e.element)));
          },
          (t) => {
            throw (e.in || o(!0), t);
          },
        );
      },
    }),
    Jy(e),
  );
  return a && !t ? null : (0, f.cloneElement)(e, { ref: s });
}
function Rw(e, t, n) {
  return e
    ? (0, q.jsx)(Fw, Object.assign({}, n, { component: e }))
    : t
      ? (0, q.jsx)(Lw, Object.assign({}, n, { transition: t }))
      : (0, q.jsx)(kw, Object.assign({}, n));
}
var zw =
  `show.role.className.style.children.backdrop.keyboard.onBackdropClick.onEscapeKeyDown.transition.runTransition.backdropTransition.runBackdropTransition.autoFocus.enforceFocus.restoreFocus.restoreFocusOptions.renderDialog.renderBackdrop.manager.container.onShow.onHide.onExit.onExited.onExiting.onEnter.onEntering.onEntered`.split(
    `.`,
  );
function Bw(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
var Vw;
function Hw(e) {
  return ((Vw ||= new Ew({ ownerDocument: e?.document })), Vw);
}
function Uw(e) {
  let t = UC(),
    n = e || Hw(t),
    r = (0, f.useRef)({ dialog: null, backdrop: null });
  return Object.assign(r.current, {
    add: () => n.add(r.current),
    remove: () => n.remove(r.current),
    isTopModal: () => n.isTopModal(r.current),
    setDialogRef: (0, f.useCallback)((e) => {
      r.current.dialog = e;
    }, []),
    setBackdropRef: (0, f.useCallback)((e) => {
      r.current.backdrop = e;
    }, []),
  });
}
var Ww = (0, f.forwardRef)((e, t) => {
  let {
      show: n = !1,
      role: r = `dialog`,
      className: i,
      style: a,
      children: o,
      backdrop: s = !0,
      keyboard: c = !0,
      onBackdropClick: l,
      onEscapeKeyDown: u,
      transition: d,
      runTransition: p,
      backdropTransition: m,
      runBackdropTransition: h,
      autoFocus: g = !0,
      enforceFocus: _ = !0,
      restoreFocus: v = !0,
      restoreFocusOptions: y,
      renderDialog: b,
      renderBackdrop: x = (e) => (0, q.jsx)(`div`, Object.assign({}, e)),
      manager: S,
      container: C,
      onShow: w,
      onHide: T = () => {},
      onExit: E,
      onExited: D,
      onExiting: O,
      onEnter: k,
      onEntering: A,
      onEntered: j,
    } = e,
    M = Bw(e, zw),
    N = UC(),
    P = Ow(C),
    F = Uw(S),
    ee = Db(),
    te = Ob(n),
    [I, L] = (0, f.useState)(!n),
    R = (0, f.useRef)(null);
  ((0, f.useImperativeHandle)(t, () => F, [F]),
    Yy && !te && n && (R.current = xw(N?.document)),
    n && I && L(!1));
  let z = Tb(() => {
      if (
        (F.add(),
        (se.current = tb(document, `keydown`, ae)),
        (oe.current = tb(document, `focus`, () => setTimeout(re), !0)),
        w && w(),
        g)
      ) {
        let e = xw(F.dialog?.ownerDocument ?? N?.document);
        F.dialog &&
          e &&
          !$S(F.dialog, e) &&
          ((R.current = e), F.dialog.focus());
      }
    }),
    ne = Tb(() => {
      if (
        (F.remove(),
        se.current == null || se.current(),
        oe.current == null || oe.current(),
        v)
      ) {
        var e;
        ((e = R.current) == null || e.focus == null || e.focus(y),
          (R.current = null));
      }
    });
  ((0, f.useEffect)(() => {
    !n || !P || z();
  }, [n, P, z]),
    (0, f.useEffect)(() => {
      I && ne();
    }, [I, ne]),
    Cw(() => {
      ne();
    }));
  let re = Tb(() => {
      if (!_ || !ee() || !F.isTopModal()) return;
      let e = xw(N?.document);
      F.dialog && e && !$S(F.dialog, e) && F.dialog.focus();
    }),
    ie = Tb((e) => {
      e.target === e.currentTarget && (l?.(e), s === !0 && T());
    }),
    ae = Tb((e) => {
      c && Ky(e) && F.isTopModal() && (u?.(e), e.defaultPrevented || T());
    }),
    oe = (0, f.useRef)(),
    se = (0, f.useRef)(),
    B = (...e) => {
      (L(!0), D?.(...e));
    };
  if (!P) return null;
  let ce = Object.assign(
      { role: r, ref: F.setDialogRef, "aria-modal": r === `dialog` || void 0 },
      M,
      { style: a, className: i, tabIndex: -1 },
    ),
    le = b
      ? b(ce)
      : (0, q.jsx)(
          `div`,
          Object.assign({}, ce, {
            children: f.cloneElement(o, { role: `document` }),
          }),
        );
  le = Rw(d, p, {
    unmountOnExit: !0,
    mountOnEnter: !0,
    appear: !0,
    in: !!n,
    onExit: E,
    onExiting: O,
    onExited: B,
    onEnter: k,
    onEntering: A,
    onEntered: j,
    children: le,
  });
  let ue = null;
  return (
    s &&
      ((ue = x({ ref: F.setBackdropRef, onClick: ie })),
      (ue = Rw(m, h, {
        in: !!n,
        appear: !0,
        mountOnEnter: !0,
        unmountOnExit: !0,
        children: ue,
      }))),
    (0, q.jsx)(q.Fragment, {
      children: Wt.createPortal(
        (0, q.jsxs)(q.Fragment, { children: [ue, le] }),
        P,
      ),
    })
  );
});
Ww.displayName = `Modal`;
var Gw = Object.assign(Ww, { Manager: Ew });
function Kw(e, t) {
  return e.classList
    ? !!t && e.classList.contains(t)
    : (` ` + (e.className.baseVal || e.className) + ` `).indexOf(
        ` ` + t + ` `,
      ) !== -1;
}
function qw(e, t) {
  e.classList
    ? e.classList.add(t)
    : Kw(e, t) ||
      (typeof e.className == `string`
        ? (e.className = e.className + ` ` + t)
        : e.setAttribute(
            `class`,
            ((e.className && e.className.baseVal) || ``) + ` ` + t,
          ));
}
function Jw(e, t) {
  return e
    .replace(RegExp(`(^|\\s)` + t + `(?:\\s|$)`, `g`), `$1`)
    .replace(/\s+/g, ` `)
    .replace(/^\s*|\s*$/g, ``);
}
function Yw(e, t) {
  e.classList
    ? e.classList.remove(t)
    : typeof e.className == `string`
      ? (e.className = Jw(e.className, t))
      : e.setAttribute(
          `class`,
          Jw((e.className && e.className.baseVal) || ``, t),
        );
}
var Xw = {
    FIXED_CONTENT: `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`,
    STICKY_CONTENT: `.sticky-top`,
    NAVBAR_TOGGLER: `.navbar-toggler`,
  },
  Zw = class extends Ew {
    adjustAndStore(e, t, n) {
      let r = t.style[e];
      ((t.dataset[e] = r), Fy(t, { [e]: `${parseFloat(Fy(t, e)) + n}px` }));
    }
    restore(e, t) {
      let n = t.dataset[e];
      n !== void 0 && (delete t.dataset[e], Fy(t, { [e]: n }));
    }
    setContainerStyle(e) {
      super.setContainerStyle(e);
      let t = this.getElement();
      if ((qw(t, `modal-open`), !e.scrollBarWidth)) return;
      let n = this.isRTL ? `paddingLeft` : `paddingRight`,
        r = this.isRTL ? `marginLeft` : `marginRight`;
      (Jb(t, Xw.FIXED_CONTENT).forEach((t) =>
        this.adjustAndStore(n, t, e.scrollBarWidth),
      ),
        Jb(t, Xw.STICKY_CONTENT).forEach((t) =>
          this.adjustAndStore(r, t, -e.scrollBarWidth),
        ),
        Jb(t, Xw.NAVBAR_TOGGLER).forEach((t) =>
          this.adjustAndStore(r, t, e.scrollBarWidth),
        ));
    }
    removeContainerStyle(e) {
      super.removeContainerStyle(e);
      let t = this.getElement();
      Yw(t, `modal-open`);
      let n = this.isRTL ? `paddingLeft` : `paddingRight`,
        r = this.isRTL ? `marginLeft` : `marginRight`;
      (Jb(t, Xw.FIXED_CONTENT).forEach((e) => this.restore(n, e)),
        Jb(t, Xw.STICKY_CONTENT).forEach((e) => this.restore(r, e)),
        Jb(t, Xw.NAVBAR_TOGGLER).forEach((e) => this.restore(r, e)));
    }
  },
  Qw;
function $w(e) {
  return ((Qw ||= new Zw(e)), Qw);
}
var eT = f.createContext({ onHide() {} }),
  tT = f.forwardRef(
    (
      {
        closeLabel: e = `Close`,
        closeVariant: t,
        closeButton: n = !1,
        onHide: r,
        children: i,
        ...a
      },
      o,
    ) => {
      let s = (0, f.useContext)(eT),
        c = xb(() => {
          (s?.onHide(), r?.());
        });
      return (0, q.jsxs)(`div`, {
        ref: o,
        ...a,
        children: [
          i,
          n && (0, q.jsx)(Ub, { "aria-label": e, variant: t, onClick: c }),
        ],
      });
    },
  );
tT.displayName = `AbstractModalHeader`;
var nT = f.forwardRef(
  ({ className: e, bsPrefix: t, as: n = `div`, ...r }, i) => (
    (t = wy(t, `nav-item`)),
    (0, q.jsx)(n, { ref: i, className: (0, hb.default)(e, t), ...r })
  ),
);
nT.displayName = `NavItem`;
var rT = f.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      as: n = zb,
      active: r,
      eventKey: i,
      disabled: a = !1,
      ...o
    },
    s,
  ) => {
    e = wy(e, `nav-link`);
    let [c, l] = pw({ key: MC(i, o.href), active: r, disabled: a, ...o });
    return (0, q.jsx)(n, {
      ...o,
      ...c,
      ref: s,
      disabled: a,
      className: (0, hb.default)(t, e, a && `disabled`, l.isActive && `active`),
    });
  },
);
rT.displayName = `NavLink`;
var iT = f.forwardRef((e, t) => {
  let {
      as: n = `div`,
      bsPrefix: r,
      variant: i,
      fill: a = !1,
      justify: o = !1,
      navbar: s,
      navbarScroll: c,
      className: l,
      activeKey: u,
      ...d
    } = vy(e, { activeKey: `onSelect` }),
    p = wy(r, `nav`),
    m,
    h,
    g = !1,
    _ = (0, f.useContext)(ew),
    v = (0, f.useContext)(Gb);
  return (
    _
      ? ((m = _.bsPrefix), (g = s ?? !0))
      : v && ({ cardHeaderBsPrefix: h } = v),
    (0, q.jsx)(bw, {
      as: n,
      ref: t,
      activeKey: u,
      className: (0, hb.default)(l, {
        [p]: !g,
        [`${m}-nav`]: g,
        [`${m}-nav-scroll`]: g && c,
        [`${h}-${i}`]: !!h,
        [`${p}-${i}`]: !!i,
        [`${p}-fill`]: a,
        [`${p}-justified`]: o,
      }),
      ...d,
    })
  );
});
iT.displayName = `Nav`;
var aT = Object.assign(iT, { Item: nT, Link: rT }),
  oT = f.forwardRef(({ bsPrefix: e, className: t, as: n, ...r }, i) => {
    e = wy(e, `navbar-brand`);
    let a = n || (r.href ? `a` : `span`);
    return (0, q.jsx)(a, { ...r, ref: i, className: (0, hb.default)(t, e) });
  });
oT.displayName = `NavbarBrand`;
var sT = f.forwardRef(({ children: e, bsPrefix: t, ...n }, r) => {
  t = wy(t, `navbar-collapse`);
  let i = (0, f.useContext)(ew);
  return (0, q.jsx)(yb, {
    in: !!(i && i.expanded),
    ...n,
    children: (0, q.jsx)(`div`, { ref: r, className: t, children: e }),
  });
});
sT.displayName = `NavbarCollapse`;
var cT = f.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      children: n,
      label: r = `Toggle navigation`,
      as: i = `button`,
      onClick: a,
      ...o
    },
    s,
  ) => {
    e = wy(e, `navbar-toggler`);
    let { onToggle: c, expanded: l } = (0, f.useContext)(ew) || {},
      u = xb((e) => {
        (a && a(e), c && c());
      });
    return (
      i === `button` && (o.type = `button`),
      (0, q.jsx)(i, {
        ...o,
        ref: s,
        onClick: u,
        "aria-label": r,
        className: (0, hb.default)(t, e, !l && `collapsed`),
        children: n || (0, q.jsx)(`span`, { className: `${e}-icon` }),
      })
    );
  },
);
cT.displayName = `NavbarToggle`;
var lT = new WeakMap(),
  uT = (e, t) => {
    if (!e || !t) return;
    let n = lT.get(t) || new Map();
    lT.set(t, n);
    let r = n.get(e);
    return (
      r || ((r = t.matchMedia(e)), (r.refCount = 0), n.set(r.media, r)),
      r
    );
  };
function dT(e, t = typeof window > `u` ? void 0 : window) {
  let n = uT(e, t),
    [r, i] = (0, f.useState)(() => (n ? n.matches : !1));
  return (
    QC(() => {
      let n = uT(e, t);
      if (!n) return i(!1);
      let r = lT.get(t),
        a = () => {
          i(n.matches);
        };
      return (
        n.refCount++,
        n.addListener(a),
        a(),
        () => {
          (n.removeListener(a),
            n.refCount--,
            n.refCount <= 0 && r?.delete(n.media),
            (n = void 0));
        }
      );
    }, [e]),
    r
  );
}
function fT(e) {
  let t = Object.keys(e);
  function n(e, t) {
    return e === t ? t : e ? `${e} and ${t}` : t;
  }
  function r(e) {
    return t[Math.min(t.indexOf(e) + 1, t.length - 1)];
  }
  function i(t) {
    let n = e[r(t)];
    return (
      (n = typeof n == `number` ? `${n - 0.2}px` : `calc(${n} - 0.2px)`),
      `(max-width: ${n})`
    );
  }
  function a(t) {
    let n = e[t];
    return (typeof n == `number` && (n = `${n}px`), `(min-width: ${n})`);
  }
  function o(e, t, r) {
    let o;
    return (
      typeof e == `object`
        ? ((o = e), (r = t), (t = !0))
        : ((t ||= !0), (o = { [e]: t })),
      dT(
        (0, f.useMemo)(
          () =>
            Object.entries(o).reduce(
              (e, [t, r]) => (
                (r === `up` || r === !0) && (e = n(e, a(t))),
                (r === `down` || r === !0) && (e = n(e, i(t))),
                e
              ),
              ``,
            ),
          [JSON.stringify(o)],
        ),
        r,
      )
    );
  }
  return o;
}
var pT = fT({ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }),
  mT = f.forwardRef(
    ({ className: e, bsPrefix: t, as: n = `div`, ...r }, i) => (
      (t = wy(t, `offcanvas-body`)),
      (0, q.jsx)(n, { ref: i, className: (0, hb.default)(e, t), ...r })
    ),
  );
mT.displayName = `OffcanvasBody`;
var hT = { [Vy]: `show`, [Hy]: `show` },
  gT = f.forwardRef(
    (
      {
        bsPrefix: e,
        className: t,
        children: n,
        in: r = !1,
        mountOnEnter: i = !1,
        unmountOnExit: a = !1,
        appear: o = !1,
        ...s
      },
      c,
    ) => (
      (e = wy(e, `offcanvas`)),
      (0, q.jsx)(mb, {
        ref: c,
        addEndListener: sb,
        in: r,
        mountOnEnter: i,
        unmountOnExit: a,
        appear: o,
        ...s,
        childRef: Jy(n),
        children: (r, i) =>
          f.cloneElement(n, {
            ...i,
            className: (0, hb.default)(
              t,
              n.props.className,
              (r === `entering` || r === `exiting`) && `${e}-toggling`,
              hT[r],
            ),
          }),
      })
    ),
  );
gT.displayName = `OffcanvasToggling`;
var _T = f.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      closeLabel: n = `Close`,
      closeButton: r = !1,
      ...i
    },
    a,
  ) => (
    (e = wy(e, `offcanvas-header`)),
    (0, q.jsx)(tT, {
      ref: a,
      ...i,
      className: (0, hb.default)(t, e),
      closeLabel: n,
      closeButton: r,
    })
  ),
);
_T.displayName = `OffcanvasHeader`;
var vT = Sb(`h5`),
  yT = f.forwardRef(
    ({ className: e, bsPrefix: t, as: n = vT, ...r }, i) => (
      (t = wy(t, `offcanvas-title`)),
      (0, q.jsx)(n, { ref: i, className: (0, hb.default)(e, t), ...r })
    ),
  );
yT.displayName = `OffcanvasTitle`;
function bT(e) {
  return (0, q.jsx)(gT, { ...e });
}
function xT(e) {
  return (0, q.jsx)(Vb, { ...e });
}
var ST = f.forwardRef(
  (
    {
      bsPrefix: e,
      className: t,
      children: n,
      "aria-labelledby": r,
      placement: i = `start`,
      responsive: a,
      show: o = !1,
      backdrop: s = !0,
      keyboard: c = !0,
      scroll: l = !1,
      onEscapeKeyDown: u,
      onShow: d,
      onHide: p,
      container: m,
      autoFocus: h = !0,
      enforceFocus: g = !0,
      restoreFocus: _ = !0,
      restoreFocusOptions: v,
      onEntered: y,
      onExit: b,
      onExiting: x,
      onEnter: S,
      onEntering: C,
      onExited: w,
      backdropClassName: T,
      manager: E,
      renderStaticNode: D = !1,
      ...O
    },
    k,
  ) => {
    let A = (0, f.useRef)();
    e = wy(e, `offcanvas`);
    let [j, M] = (0, f.useState)(!1),
      N = xb(p),
      P = pT(a || `xs`, `up`);
    (0, f.useEffect)(() => {
      M(a ? o && !P : o);
    }, [o, a, P]);
    let F = (0, f.useMemo)(() => ({ onHide: N }), [N]);
    function ee() {
      return (
        E ||
        (l
          ? ((A.current ||= new Zw({ handleContainerOverflow: !1 })), A.current)
          : $w())
      );
    }
    let te = (e, ...t) => {
        (e && (e.style.visibility = `visible`), S?.(e, ...t));
      },
      I = (e, ...t) => {
        (e && (e.style.visibility = ``), w?.(...t));
      },
      L = (0, f.useCallback)(
        (t) =>
          (0, q.jsx)(`div`, {
            ...t,
            className: (0, hb.default)(`${e}-backdrop`, T),
          }),
        [T, e],
      ),
      R = (o) =>
        (0, q.jsx)(`div`, {
          ...o,
          ...O,
          className: (0, hb.default)(t, a ? `${e}-${a}` : e, `${e}-${i}`),
          "aria-labelledby": r,
          children: n,
        });
    return (0, q.jsxs)(q.Fragment, {
      children: [
        !j && (a || D) && R({}),
        (0, q.jsx)(eT.Provider, {
          value: F,
          children: (0, q.jsx)(Gw, {
            show: j,
            ref: k,
            backdrop: s,
            container: m,
            keyboard: c,
            autoFocus: h,
            enforceFocus: g && !l,
            restoreFocus: _,
            restoreFocusOptions: v,
            onEscapeKeyDown: u,
            onShow: d,
            onHide: N,
            onEnter: te,
            onEntering: C,
            onEntered: y,
            onExit: b,
            onExiting: x,
            onExited: I,
            manager: ee(),
            transition: bT,
            backdropTransition: xT,
            renderBackdrop: L,
            renderDialog: R,
          }),
        }),
      ],
    });
  },
);
ST.displayName = `Offcanvas`;
var CT = Object.assign(ST, { Body: mT, Header: _T, Title: yT }),
  wT = f.forwardRef(({ onHide: e, ...t }, n) => {
    let r = (0, f.useContext)(ew),
      i = xb(() => {
        (r == null || r.onToggle == null || r.onToggle(), e?.());
      });
    return (0, q.jsx)(CT, {
      ref: n,
      show: !!(r != null && r.expanded),
      ...t,
      renderStaticNode: !0,
      onHide: i,
    });
  });
wT.displayName = `NavbarOffcanvas`;
var TT = f.forwardRef(
  ({ className: e, bsPrefix: t, as: n = `span`, ...r }, i) => (
    (t = wy(t, `navbar-text`)),
    (0, q.jsx)(n, { ref: i, className: (0, hb.default)(e, t), ...r })
  ),
);
TT.displayName = `NavbarText`;
var ET = f.forwardRef((e, t) => {
  let {
      bsPrefix: n,
      expand: r = !0,
      variant: i = `light`,
      bg: a,
      fixed: o,
      sticky: s,
      className: c,
      as: l = `nav`,
      expanded: u,
      onToggle: d,
      onSelect: p,
      collapseOnSelect: m = !1,
      ...h
    } = vy(e, { expanded: `onToggle` }),
    g = wy(n, `navbar`),
    _ = (0, f.useCallback)(
      (...e) => {
        (p?.(...e), m && u && d?.(!1));
      },
      [p, m, u, d],
    );
  h.role === void 0 && l !== `nav` && (h.role = `navigation`);
  let v = `${g}-expand`;
  typeof r == `string` && (v = `${v}-${r}`);
  let y = (0, f.useMemo)(
    () => ({ onToggle: () => d?.(!u), bsPrefix: g, expanded: !!u, expand: r }),
    [g, u, r, d],
  );
  return (0, q.jsx)(ew.Provider, {
    value: y,
    children: (0, q.jsx)(jC.Provider, {
      value: _,
      children: (0, q.jsx)(l, {
        ref: t,
        ...h,
        className: (0, hb.default)(
          c,
          g,
          r && v,
          i && `${g}-${i}`,
          a && `bg-${a}`,
          s && `sticky-${s}`,
          o && `fixed-${o}`,
        ),
      }),
    }),
  });
});
ET.displayName = `Navbar`;
var DT = Object.assign(ET, {
    Brand: oT,
    Collapse: sT,
    Offcanvas: wT,
    Text: TT,
    Toggle: cT,
  }),
  OT = f.forwardRef(
    (
      {
        id: e,
        title: t,
        children: n,
        bsPrefix: r,
        className: i,
        rootCloseEvent: a,
        menuRole: o,
        disabled: s,
        active: c,
        renderMenuOnMount: l,
        menuVariant: u,
        ...d
      },
      f,
    ) => {
      let p = wy(void 0, `nav-item`);
      return (0, q.jsxs)(ow, {
        ref: f,
        ...d,
        className: (0, hb.default)(i, p),
        children: [
          (0, q.jsx)(ow.Toggle, {
            id: e,
            eventKey: null,
            active: c,
            disabled: s,
            childBsPrefix: r,
            as: rT,
            children: t,
          }),
          (0, q.jsx)(ow.Menu, {
            role: o,
            renderOnMount: l,
            rootCloseEvent: a,
            variant: u,
            children: n,
          }),
        ],
      });
    },
  );
OT.displayName = `NavDropdown`;
var kT = Object.assign(OT, {
  Item: ow.Item,
  ItemText: ow.ItemText,
  Divider: ow.Divider,
  Header: ow.Header,
});
function AT() {
  let e = Cn();
  return (0, q.jsx)(DT, {
    expand: `lg`,
    className: `glass-navbar`,
    children: (0, q.jsxs)(Kb, {
      children: [
        (0, q.jsxs)(DT.Brand, {
          as: La,
          to: `/`,
          className: `navbar-brand-custom`,
          children: [`Rev`, (0, q.jsx)(`span`, { children: `-Bot` })],
        }),
        (0, q.jsx)(DT.Toggle, {
          "aria-controls": `main-navigation`,
          className: `navbar-toggle-custom`,
        }),
        (0, q.jsxs)(DT.Collapse, {
          id: `main-navigation`,
          children: [
            (0, q.jsxs)(aT, {
              className: `navbar-nav-custom`,
              children: [
                (0, q.jsx)(aT.Link, {
                  as: Ra,
                  to: `/`,
                  className: `navbar-link`,
                  children: `Home`,
                }),
                (0, q.jsx)(aT.Link, {
                  as: Ra,
                  to: `/quiz/create`,
                  className: `navbar-link`,
                  children: `Create quiz`,
                }),
                (0, q.jsx)(aT.Link, {
                  as: Ra,
                  to: `/quiz/records`,
                  className: `navbar-link`,
                  children: `Records`,
                }),
              ],
            }),
            (0, q.jsx)(aT, {
              className: `ms-auto`,
              children: (0, q.jsxs)(kT, {
                title: `Account`,
                id: `account-dropdown`,
                align: `end`,
                className: `navbar-account`,
                children: [
                  (0, q.jsx)(kT.Item, {
                    as: Ra,
                    to: `/profile`,
                    children: `Profile`,
                  }),
                  (0, q.jsx)(kT.Divider, {}),
                  (0, q.jsx)(kT.Item, {
                    as: `button`,
                    onClick: async () => {
                      (await Hg()).success && e(It());
                    },
                    children: `Logout`,
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
var jT = Sa([
  {
    element: (0, q.jsx)(fy, {}),
    children: [
      {
        element: (0, q.jsx)(
          () =>
            (0, q.jsxs)(q.Fragment, {
              children: [
                (0, q.jsx)(AT, {}),
                (0, q.jsx)(`main`, { children: (0, q.jsx)(da, {}) }),
              ],
            }),
          {},
        ),
        children: [
          { path: `/`, element: (0, q.jsx)(uy.HomePage, {}) },
          { path: `/profile`, element: (0, q.jsx)(uy.ProfilePage, {}) },
          {
            path: `/quiz`,
            children: [
              { path: `create`, element: (0, q.jsx)(uy.CreateQuizPage, {}) },
              {
                path: `update/:quizId`,
                element: (0, q.jsx)(uy.UpdateQuizPage, {}),
              },
              { path: `records`, element: (0, q.jsx)(uy.RecordsPage, {}) },
              {
                path: `records/:recordId`,
                element: (0, q.jsx)(uy.RecordPage, {}),
              },
              { path: `:subject`, element: (0, q.jsx)(uy.QuizzesPage, {}) },
              {
                path: `:subject/:quizId`,
                element: (0, q.jsx)(uy.QuizPage, {}),
              },
              {
                path: `:subject/enum/:quizId`,
                element: (0, q.jsx)(uy.EnumQuizPage, {}),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: (0, q.jsx)(fy, { requireAuth: !1 }),
    children: [
      {
        element: (0, q.jsx)(
          () =>
            (0, q.jsx)(`main`, {
              className: `auth-layout`,
              children: (0, q.jsx)(`div`, {
                className: `container py-5`,
                children: (0, q.jsx)(da, {}),
              }),
            }),
          {},
        ),
        children: [
          { path: `/auth`, element: (0, q.jsx)(uy.AuthPage, {}) },
          {
            path: `/auth/forgotPass`,
            element: (0, q.jsx)(uy.ForgotPassPage, {}),
          },
          {
            path: `/verification/resetPassword/:userId/:token`,
            element: (0, q.jsx)(uy.ResetPassPage, {}),
          },
        ],
      },
    ],
  },
  {
    path: `/verification/verifyEmail/:userId/:token`,
    element: (0, q.jsx)(uy.VerifyEmailPage, {}),
  },
]);
function MT() {
  let { isLoading: e } = dy();
  return e
    ? (0, q.jsx)(`div`, {
        className: `App`,
        children: (0, q.jsx)(uy.LoadingPage, {}),
      })
    : (0, q.jsx)(`div`, {
        className: `App`,
        children: (0, q.jsx)(Ma, { router: jT }),
      });
}
_.createRoot(document.getElementById(`root`)).render(
  (0, q.jsx)(yn, { store: Rt, children: (0, q.jsx)(MT, {}) }),
);
