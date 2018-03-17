'use strict';

var _2 = require('ramda/src/__');

var _3 = _interopRequireDefault(_2);

var _curry2 = require('ramda/src/curry');

var _curry3 = _interopRequireDefault(_curry2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = (0, _curry3.default)(function add(a, b, c, d) {
    return a + b + c + d;
})(_3.default, _3.default, 2, _3.default);
