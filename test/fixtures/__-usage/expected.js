'use strict';

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = (0, _curry2.default)(function add(a, b, c, d) {
    return a + b + c + d;
})(_2.default, _2.default, 2, _2.default);
