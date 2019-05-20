"use strict";

var _add2 = _interopRequireDefault(require("ramda/src/add"));

var _map2 = _interopRequireDefault(require("ramda/src/map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapper = (0, _map2.default)((0, _add2.default)(1));
mapper([1, 2, 3]);