"use strict";

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof2(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _typeof2(obj) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e14 = exports.e13 = exports.e10 = exports.e9 = exports.e8 = exports.e7 = exports.e6 = exports.e5 = exports.in = exports.i3 = exports.var = exports.a = exports.i0 = undefined;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var _x3, _x4, _y, _y2, _4, _5, _var2, _var3, _6, _7, _in2, _proto__, _proto__2;

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _templateObject = _taggedTemplateLiteral(["a"], ["a"]),
    _templateObject2 = _taggedTemplateLiteral(["0", "2"], ["0", "2"]);

var _module = require("module");

Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module[key];
    }
  });
});
Object.defineProperty(exports, "i0", {
  enumerable: true,
  get: function get() {
    return _module.i0;
  }
});
Object.defineProperty(exports, "a", {
  enumerable: true,
  get: function get() {
    return _module.i1;
  }
});
Object.defineProperty(exports, "var", {
  enumerable: true,
  get: function get() {
    return _module.i2;
  }
});
exports.e11 = e11;
exports.e12 = e12;
exports.default = e16;

var i1 = _interopRequireWildcard(_module);

var i5 = _interopRequireWildcard(_module);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof2(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof2(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var _marked = /*#__PURE__*/_regeneratorRuntime().mark(e12),
    _marked2 = /*#__PURE__*/_regeneratorRuntime().mark(g0); // https://github.com/michaelficarra/everything.js/blob/master/es2015-module.js

/* this file contains all grammatical productions in ECMA-262 edition 5.1 ** * **/


exports.i3 = _module.a;
exports.in = i5.default;
var e5 = exports.e5 = undefined,
    e6 = exports.e6 = 0;
var e7 = exports.e7 = void 0,
    e8 = exports.e8 = 0;
var e9 = exports.e9 = 0,
    e10 = exports.e10 = 0;

function e11() {}

function e12() {
  return _regeneratorRuntime().wrap(function e12$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var e13 = exports.e13 = function e13() {
  _classCallCheck(this, e13);
};

var e14 = exports.e14 = function (_e) {
  _inherits(e14, _e);

  function e14() {
    _classCallCheck(this, e14);

    return _possibleConstructorReturn(this, (e14.__proto__ || Object.getPrototypeOf(e14)).apply(this, arguments));
  }

  return e14;
}(e15);

function e16() {} // Unfortunately (for us), we can only have a single default export.

/*
export default function (){}
export default function* i16(){}
export default function* (){}
export default class i17 {}
export default class i18 extends i19 {}
export default class {}
export default x = 0;
export default 0;
export default (0, 1);
*/
// whitespace


tab: for (;;) {
  break tab;
}

verticalTab: for (;;) {
  break verticalTab;
}

formFeed: for (;;) {
  break formFeed;
}

space: for (;;) {
  break space;
}

nbsp: for (;;) {
  break nbsp;
}

bom: for (;;) {
  break bom;
} // line terminators


lineFeed: 0;

0;

carriageReturn: 0;

0;

carriageReturnLineFeed: 0;

0;

lineSeparator: 0;

0;

paragraphSeparator: 0;

0; // identifier names

var $, _, x, 䩶, x$, x_, x0, x󠇕, xa, x0, x0a, x0123456789, qwertyuiopasdfghjklzxcvbnm, QWERTYUIOPASDFGHJKLZXCVBNM; // a representative sample of ID_Start and ID_Continue


var 䩶, x󠇕, œ一, ǻ둘, ɤ〩, φ, ﬁⅷ, ユニコード, x‌‍;
var letx = void 0;

var _2 = 0,
    _3 = _slicedToArray(_2, 1),
    xx = _3[0];

var constx = 0;
{
  var _x = void 0;

  var y = 0;
  var z = 0;
}
null;
true;
false;
0;
1234567890;
0.;
0.00;
10.00;
.0;
.00;
0e0;
0E0;
0.e0;
0.00e+0;
.00e-0;
0x0;
0X0;
0x0123456789abcdefABCDEF;
0;
0;
1;
2;
170;
0;
0;
342391;
2e308;
"";
"'";
"\'\"\\\b\f\n\r\t\v\0";
"\0";
"\x01\x23\x45\x67\x89\xAB\xCD\xEF\xab\xcd\xef";
"\u0123\u4567\u89AB\uCDEF\xAB\uCDEF";
"\uD834\uDF06\u2603\u03C6 \uD83D\uDCA9\uD834\uDF06\u2603\u03C6 \uD834\uDF06\u2603\u03C6";
"\
";
'';
'"';
'\'\"\\\b\f\n\r\t\v\0';
'\0';
'\x01\x23\x45\x67\x89\xAB\xCD\xEF\xab\xcd\xef';
"\u0123\u4567\u89AB\uCDEF\xAB\uCDEF";
"\uD834\uDF06\u2603\u03C6 \uD83D\uDCA9 \uD834\uDF06\u2603\u03C6 \uD834\uDF06\u2603\u03C6";
'\
';
/x/;
/|/;
/|||/;
/^$\b\B/;
/(?=(?!(?:(.))))/;
/a.\f\n\r\t\v\0\[\-\/\\\x00\u0000\uD834\uDF06/;
/(?:\uD834\uDF06)/;
/\d\D\s\S\w\W/;
/\ca\cb\cc\cd\ce\cf\cg\ch\ci\cj\ck\cl\cm\cn\co\cp\cq\cr\cs\ct\cu\cv\cw\cx\cy\cz/;
/\cA\cB\cC\cD\cE\cF\cG\cH\cI\cJ\cK\cL\cM\cN\cO\cP\cQ\cR\cS\cT\cU\cV\cW\cX\cY\cZ/;
/[a-z-]/;
/[^\b\-^]/;
/[/\]\\]/;
/./i;
/./g;
/./m;
/./igm;
/.*/;
/.*?/;
/.+/;
/.+?/;
/.?/;
/.??/;
/.{0}/;
/.{0,}/;
/.{0,0}/;
"a";
"" + 0;
"0" + (0, 1) + "2";
"0" + ("1" + 2 + "3") + "4";
"`";
"a${b";
"\0\n\n\n\n";
undefined;
x;
[];
[,];
[0];
[0];
[, 0];
[0, 0];
[0, 0];
[0,, 0];
[,,];
({});
({
  x: x
});
({
  x: 0
});
({
  x: 0,
  y: 0
});
({
  x: 0
});
({
  'x': 0,
  "y": 0,
  in: 0
});
var _ref6 = {
  0: 0
};

_defineProperty(_ref6, "0", 0);

_defineProperty(_ref6, "0", 0);

_defineProperty(_ref6, "0", 0);

_defineProperty(_ref6, "0", 0);

_defineProperty(_ref6, "0", 0);

_defineProperty(_ref6, 0, 0);

_x3 = "x";
var _mutatorMap = {};
_mutatorMap[_x3] = _mutatorMap[_x3] || {};

_mutatorMap[_x3].get = function () {};

_x4 = "x";
_mutatorMap[_x4] = _mutatorMap[_x4] || {};

_mutatorMap[_x4].set = function (a) {};

_y = 'y';
_mutatorMap[_y] = _mutatorMap[_y] || {};

_mutatorMap[_y].get = function () {};

_y2 = "y";
_mutatorMap[_y2] = _mutatorMap[_y2] || {};

_mutatorMap[_y2].set = function (a) {};

_4 = "0";
_mutatorMap[_4] = _mutatorMap[_4] || {};

_mutatorMap[_4].get = function () {};

_5 = "0";
_mutatorMap[_5] = _mutatorMap[_5] || {};

_mutatorMap[_5].set = function (a) {};

_var2 = "var";
_mutatorMap[_var2] = _mutatorMap[_var2] || {};

_mutatorMap[_var2].get = function () {};

_var3 = "var";
_mutatorMap[_var3] = _mutatorMap[_var3] || {};

_mutatorMap[_var3].set = function (a) {};

_6 = 0;
_mutatorMap[_6] = _mutatorMap[_6] || {};

_mutatorMap[_6].get = function () {};

_7 = 0;
_mutatorMap[_7] = _mutatorMap[_7] || {};

_mutatorMap[_7].set = function (a) {};

_defineProperty(_ref6, 1, function _() {});

_defineProperty(_ref6, "a", function a() {});

_defineProperty(_ref6, 'b', function b() {});

_defineProperty(_ref6, "c", function c() {});

_defineProperty(_ref6, "0", function _() {});

_defineProperty(_ref6, .1, function _() {});

_defineProperty(_ref6, 1., function _() {});

_defineProperty(_ref6, 1e1, function _() {});

_defineProperty(_ref6, "var", function _var(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var _ref = arguments[2];

  var _ref3 = _toArray(_ref),
      c = _ref3[0],
      _ref3$ = _ref3[2],
      d = _ref3$ === undefined ? 0 : _ref3$,
      e = _ref3.slice(3);

  var _ref2 = arguments[3];
  var f = _ref2.f,
      h = _ref2.g,
      _ref2$i = _ref2.i,
      i = _ref2$i === undefined ? 0 : _ref2$i,
      _ref2$i2 = _ref2.i,
      j = _ref2$i2 === undefined ? 0 : _ref2$i2;
});

_in2 = "in";
_mutatorMap[_in2] = _mutatorMap[_in2] || {};

_mutatorMap[_in2].set = function (_ref4) {
  var _ref5 = _toArray(_ref4),
      a = _ref5[0],
      _ref5$ = _ref5[1],
      b = _ref5$ === undefined ? 0 : _ref5$,
      _ref5$2 = _toArray(_ref5[2]),
      c = _ref5$2[0],
      _ref5$2$ = _ref5$2[2],
      d = _ref5$2$ === undefined ? 0 : _ref5$2$,
      e = _ref5$2.slice(3),
      _ref5$3 = _ref5[3],
      f = _ref5$3.f,
      h = _ref5$3.g,
      _ref5$3$i = _ref5$3.i,
      i = _ref5$3$i === undefined ? 0 : _ref5$3$i,
      _ref5$3$i2 = _ref5$3.i,
      j = _ref5$3$i2 === undefined ? 0 : _ref5$3$i2,
      k = _ref5.slice(4);
};

_defineProperty(_ref6, "d", /*#__PURE__*/_regeneratorRuntime().mark(function d() {
  return _regeneratorRuntime().wrap(function d$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  }, d, this);
}));

_defineProperty(_ref6, 'e', /*#__PURE__*/_regeneratorRuntime().mark(function e() {
  return _regeneratorRuntime().wrap(function e$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  }, e, this);
}));

_defineProperty(_ref6, "f", /*#__PURE__*/_regeneratorRuntime().mark(function f() {
  return _regeneratorRuntime().wrap(function f$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case "end":
          return _context4.stop();
      }
    }
  }, f, this);
}));

_defineProperty(_ref6, 2, /*#__PURE__*/_regeneratorRuntime().mark(function _() {
  return _regeneratorRuntime().wrap(function _$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
        case "end":
          return _context5.stop();
      }
    }
  }, _, this);
}));

_defineProperty(_ref6, .2, /*#__PURE__*/_regeneratorRuntime().mark(function _() {
  return _regeneratorRuntime().wrap(function _$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
        case "end":
          return _context6.stop();
      }
    }
  }, _, this);
}));

_defineProperty(_ref6, 3., /*#__PURE__*/_regeneratorRuntime().mark(function _() {
  return _regeneratorRuntime().wrap(function _$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
        case "end":
          return _context7.stop();
      }
    }
  }, _, this);
}));

_defineProperty(_ref6, 2e2, /*#__PURE__*/_regeneratorRuntime().mark(function _() {
  return _regeneratorRuntime().wrap(function _$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
        case "end":
          return _context8.stop();
      }
    }
  }, _, this);
}));

_defineProperty(_ref6, "in", /*#__PURE__*/_regeneratorRuntime().mark(function _in() {
  return _regeneratorRuntime().wrap(function _in$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
        case "end":
          return _context9.stop();
      }
    }
  }, _in, this);
}));

_defineEnumerableProperties(_ref6, _mutatorMap);

var _ref7 = {
  __proto__: null
};
_proto__ = "__proto__";
var _mutatorMap2 = {};
_mutatorMap2[_proto__] = _mutatorMap2[_proto__] || {};

_mutatorMap2[_proto__].get = function () {};

_proto__2 = "__proto__";
_mutatorMap2[_proto__2] = _mutatorMap2[_proto__2] || {};

_mutatorMap2[_proto__2].set = function (a) {};

_defineEnumerableProperties(_ref7, _mutatorMap2);

var _ref8 = {
  "__proto__": null
};

_ref8["__proto__"] = function __proto__() {};

0..a;
0 .a;
0 .a;
0[0]; // this function makes the NewExpression and CallExpression tests not throw at runtime

x = function f() {
  return f;
};

x[0] = x;
x.a = x;
new x();
new new x()();
new x[0]();
new x.a();
new x[0].a();
new x.a[0]();
new x();
new new x()();
new new x()();
new new x().a();
new new x()[0]();
x();
x()();
x(x);
x(x, x);
x.a().a();
x[0]()[0]();
x().a[0]();
x.apply(undefined, [0, 1].concat([], _toConsumableArray( /*#__PURE__*/_regeneratorRuntime().mark(function f() {
  return _regeneratorRuntime().wrap(function f$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return 2;

        case 2:
          return _context10.abrupt("return", _context10.sent);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  }, f, this);
}))));
x(_templateObject);
x(_templateObject2, 1);
x++;
x--;
delete void _typeof(+-~!x);
++x;
--x;
0 * 0;
0 / 0;
0 % 0;
0 + 0;
0 - 0;
0 << 0;
0 >> 0;
0 >>> 0;
0 < 0;
0 > 0;
0 <= 0;
0 >= 0;
0 instanceof function () {};
0 in {};
0 == 0;
0 != 0;
0 === 0;
0 !== 0;
0 & 0;
0 ^ 0;
0 | 0;
0 && 0;
0 || 0;
0 ? 0 : 0;
0 ? 0 ? 0 : 0 : 0;
0 || 0 ? x = 0 : x = 0;
x = 0;
x *= 0;
x /= 0;
x %= 0;
x += 0;
x -= 0;
x <<= 0;
x >>= 0;
x >>>= 0;
x &= 0;
x ^= 0;
x |= 0;
0, 0;
0, 0, 0;
x = 0, x = 0;
{}
{
  ;
}
{
  0;
}
{
  0;
}
{
  0;
  0;
}
{
  0;
  0;
}
var x0;
var x1, y2;
var x3, y4, z5;
var x6 = 0;
var x7 = 0,
    y8;
var x9,
    y10 = 0;
var x11 = 0,
    y12 = 0;
;
if (0) ;
if (0) ;else ;

do {} while (0);

0;

do {} while (0);

do {} while (0);

0;

while (0) {}

for (;;) {
  break;
}

for (0; 0; 0) {}

for ((0 in []); 0;) {}

for (var a0;;) {
  break;
}

for (var a1, b2; 0; 0) {}

for (var a3 = 0;;) {
  break;
}

for (var a4 = (0 in []); 0;) {}

for (x in {}) {}

for (var x12 in {}) {}

var _arr = [];

for (var _i = 0; _i < _arr.length; _i++) {
  x = _arr[_i];
}

var _arr2 = [];

for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
  var x13 = _arr2[_i2];
}

for (; 0;) {
  continue;
}

x: for (; 0;) {
  continue x;
}

for (;;) {
  break;
}

x: for (;;) {
  break x;
}

switch (0) {
  case 0:
    break;
}

function f0() {
  return;
}

function f1() {
  return 0;
}

switch (0) {}

switch (0) {
  case 0:
}

switch (0) {
  case 0:
  case 0:
}

switch (0) {
  default:
}

switch (0) {
  case 0:
  default:
  case 0:
}

switch (0) {
  case 0:
    ;
}

switch (0) {
  case 0:
    ;
    ;
}

switch (0) {
  default:
    ;
}

switch (0) {
  default:
    ;
    ;
}

x: ;

x: y: ;

try {
  throw 0;
} catch (x) {}

try {} catch (x) {}

try {} finally {}

try {} catch (x) {} finally {}

debugger;

function f2() {}

function f3(x) {}

function f4(x, y) {}

function f5() {
  function f6() {}
}

{
  var f7 = function f7() {};
}
;

for (; 0;) {
  +function f8() {};
}

0;

do {
  +function f9() {};
} while (0);

function f10(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var _ref9 = arguments[2];

  var _ref11 = _toArray(_ref9),
      c = _ref11[0],
      _ref11$ = _ref11[2],
      d = _ref11$ === undefined ? 0 : _ref11$,
      e = _ref11.slice(3);

  var _ref10 = arguments[3];
  var f = _ref10.f,
      h = _ref10.g,
      _ref10$i = _ref10.i,
      i = _ref10$i === undefined ? 0 : _ref10$i,
      _ref10$i2 = _ref10.i,
      j = _ref10$i2 === undefined ? 0 : _ref10$i2;
}

function f11() {
  "use strict";
}

function f12() {
  'use strict';
}

function f13() {
  "other directive";
}

function f14() {
  'other directive';
}

function f15() {
  "string";
}

function f16() {
  'string';
}

function f17() {
  'string' + 0;
}

function g0(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var _ref12 = arguments[2];

  var _ref14 = _toArray(_ref12),
      c = _ref14[0],
      _ref14$ = _ref14[2],
      d = _ref14$ === undefined ? 0 : _ref14$,
      e = _ref14.slice(3);

  var _ref13 = arguments[3];
  var f = _ref13.f,
      h = _ref13.g,
      _ref13$i = _ref13.i,
      i = _ref13$i === undefined ? 0 : _ref13$i,
      _ref13$i2 = _ref13.i,
      j = _ref13$i2 === undefined ? 0 : _ref13$i2;
  return _regeneratorRuntime().wrap(function g0$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return;

        case 2:
          _context11.next = 4;
          return _context11.sent;

        case 4:
          _context11.next = 6;
          return c = _context11.sent;

        case 6:
          return _context11.delegateYield(b = _context11.sent, "t0", 7);

        case 7:
          return _context11.abrupt("return", a = _context11.t0);

        case 8:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked2, this);
}
/*#__PURE__*/


_regeneratorRuntime().mark(function g1(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var _ref15 = arguments[2];

  var _ref17 = _toArray(_ref15),
      c = _ref17[0],
      _ref17$ = _ref17[2],
      d = _ref17$ === undefined ? 0 : _ref17$,
      e = _ref17.slice(3);

  var _ref16 = arguments[3];
  var f = _ref16.f,
      h = _ref16.g,
      _ref16$i = _ref16.i,
      i = _ref16$i === undefined ? 0 : _ref16$i,
      _ref16$i2 = _ref16.i,
      j = _ref16$i2 === undefined ? 0 : _ref16$i2;
  return _regeneratorRuntime().wrap(function g1$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return;

        case 2:
          _context12.next = 4;
          return _context12.sent;

        case 4:
          _context12.next = 6;
          return c = _context12.sent;

        case 6:
          return _context12.delegateYield(b = _context12.sent, "t0", 7);

        case 7:
          return _context12.abrupt("return", a = _context12.t0);

        case 8:
        case "end":
          return _context12.stop();
      }
    }
  }, g1, this);
})(function () {});

(function (x) {});

(function (x, y) {});

(function () {
  function f() {}
});

(function f() {});

(function f(x) {});

(function f(x, y) {});

(function f() {
  function f() {}
});

(function () {
  return 0;
});

(function () {
  ;
});

(function (x) {
  return x;
});

(function (x) {
  return x = 0;
});

(function (x) {
  return function (y) {
    return x;
  };
});

(function (x) {
  x;
});

(function (x) {
  return {
    x: x
  };
});

(function (x) {
  return x;
});

(function (x) {
  return x;
});

(function (x) {
  return {
    x: x
  };
});

(function (_ref18) {
  var x = _ref18.x;
  return {
    x: x
  };
});

(function (a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var _ref19 = arguments[2];

  var _ref21 = _toArray(_ref19),
      c = _ref21[0],
      _ref21$ = _ref21[2],
      d = _ref21$ === undefined ? 0 : _ref21$,
      e = _ref21.slice(3);

  var _ref20 = arguments[3];
  var f = _ref20.f,
      h = _ref20.g,
      _ref20$i = _ref20.i,
      i = _ref20$i === undefined ? 0 : _ref20$i,
      _ref20$i2 = _ref20.i,
      j = _ref20$i2 === undefined ? 0 : _ref20$i2;
  ;
});

var _ref22 = [0].concat();

a = _ref22[0];
var _ref23 = {};
a = _ref23.a;

try {} catch (_ref24) {
  var _ref25 = _slicedToArray(_ref24, 1);

  var _e2 = _ref25[0];
}

try {} catch (_ref26) {
  var _e3 = _ref26.e;
}

var A = function A() {
  _classCallCheck(this, A);
};

var C = function (_B) {
  _inherits(C, _B);

  function C() {
    _classCallCheck(this, C);

    return _possibleConstructorReturn(this, (C.__proto__ || Object.getPrototypeOf(C)).call(this));
  }

  return C;
}(B);