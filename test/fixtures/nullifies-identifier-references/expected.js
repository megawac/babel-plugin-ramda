'use strict';

var _inc2 = require('ramda/src/inc');

var _inc3 = _interopRequireDefault(_inc2);

var _pipe2 = require('ramda/src/pipe');

var _pipe3 = _interopRequireDefault(_pipe2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// issue #19
var resultA = (0, _pipe3.default)(_inc3.default, _inc3.default)(1);
var resultB = _pipe3.default.apply(null, [_inc3.default, _inc3.default])(1);
var resultC = _pipe3.default.call(null, _inc3.default, _inc3.default)(1);
var resultD = _pipe3.default.apply(null, [_inc3.default, _inc3.default])(1);
