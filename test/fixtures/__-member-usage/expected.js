"use strict";

var _2 = _interopRequireDefault(require("ramda/src/__"));

var _curry2 = _interopRequireDefault(require("ramda/src/curry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = (0, _curry2.default)(function add(a, b, c, d) {
  return a + b + c + d;
})(_2.default, _2.default, 2, _2.default);