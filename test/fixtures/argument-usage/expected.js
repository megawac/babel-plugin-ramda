'use strict';

var _toUpper2 = require('ramda/src/toUpper');

var _toUpper3 = _interopRequireDefault(_toUpper2);

var _map2 = require('ramda/src/map');

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = (0, _map3.default)(['foo', 'bar', 'baz'], _toUpper3.default);
