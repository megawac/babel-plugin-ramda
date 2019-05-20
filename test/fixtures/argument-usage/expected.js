"use strict";

var _toUpper2 = _interopRequireDefault(require("ramda/src/toUpper"));

var _map2 = _interopRequireDefault(require("ramda/src/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = (0, _map2.default)(['foo', 'bar', 'baz'], _toUpper2.default);