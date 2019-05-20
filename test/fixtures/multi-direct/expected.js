"use strict";

var _reject2 = _interopRequireDefault(require("ramda/src/reject"));

var _take2 = _interopRequireDefault(require("ramda/src/take"));

var _add2 = _interopRequireDefault(require("ramda/src/add"));

var _map2 = _interopRequireDefault(require("ramda/src/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapper = (0, _map2.default)((0, _add2.default)(1));
var result = mapper([1, 2, 3]);
(0, _take2.default)(1, (0, _reject2.default)(Boolean, result));