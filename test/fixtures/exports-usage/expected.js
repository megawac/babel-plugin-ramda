'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.foo = exports.var2 = exports.random = exports.all = exports.any = undefined;

var _all = require('ramda/src/all');

var _all2 = _interopRequireDefault(_all);

var _any = require('ramda/src/any');

var _any2 = _interopRequireDefault(_any);

var _bar = require('bar');

Object.defineProperty(exports, 'foo', {
    enumerable: true,
    get: function get() {
        return _bar.foo;
    }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.any = _any2.default;
exports.all = _all2.default;


var random = 1;
var var2 = 2;
exports.random = random;
exports.var2 = var2;