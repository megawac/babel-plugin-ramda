'use strict';

var _add2 = require('ramda/src/add');

var _add3 = _interopRequireDefault(_add2);

var _map2 = require('ramda/src/map');

var _map3 = _interopRequireDefault(_map2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapper = (0, _map3.default)((0, _add3.default)(1));

mapper([1, 2, 3]);
