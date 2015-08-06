'use strict';

var _ramdaSrcMap = require('ramda/src/map');

var _ramdaSrcMap2 = _interopRequireDefault(_ramdaSrcMap);

var _ramdaSrcAdd = require('ramda/src/add');

var _ramdaSrcAdd2 = _interopRequireDefault(_ramdaSrcAdd);

var _ramdaSrcTake = require('ramda/src/take');

var _ramdaSrcTake2 = _interopRequireDefault(_ramdaSrcTake);

var _ramdaSrcReject = require('ramda/src/reject');

var _ramdaSrcReject2 = _interopRequireDefault(_ramdaSrcReject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var mapper = (0, _ramdaSrcMap2['default'])((0, _ramdaSrcAdd2['default'])(1));
var result = mapper([1, 2, 3]);
(0, _ramdaSrcTake2['default'])(1, (0, _ramdaSrcReject2['default'])(Boolean, result));