"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "all", {
  enumerable: true,
  get: function get() {
    return _all2.default;
  }
});
Object.defineProperty(exports, "any", {
  enumerable: true,
  get: function get() {
    return _any2.default;
  }
});
Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function get() {
    return _bar.foo;
  }
});
exports.var2 = exports.random = void 0;

var _all2 = _interopRequireDefault(require("ramda/src/all"));

var _any2 = _interopRequireDefault(require("ramda/src/any"));

var _bar = require("bar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var random = 1;
exports.random = random;
var var2 = 2;
exports.var2 = var2;