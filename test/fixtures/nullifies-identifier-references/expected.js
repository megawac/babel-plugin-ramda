'use strict';

var _inc = require('ramda/src/inc');

var _inc2 = _interopRequireDefault(_inc);

var _pipe = require('ramda/src/pipe');

var _pipe2 = _interopRequireDefault(_pipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// issue #19
var resultA = (0, _pipe2.default)(_inc2.default, _inc2.default)(1);
var resultB = _pipe2.default.apply(null, [_inc2.default, _inc2.default])(1);
var resultC = _pipe2.default.call(null, _inc2.default, _inc2.default)(1);
var resultD = _pipe2.default.apply(null, [_inc2.default, _inc2.default])(1);