"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveModule;

var _ramda = require("ramda");

var _fs = _interopRequireDefault(require("fs"));

var _module = _interopRequireDefault(require("module"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDirectories(srcPath) {
  // Slow synchronous version of https://github.com/megawac/lodash-modularize/blob/master/src/lodashModules.js.
  // Using the paths lodash-cli provides is not an option as they may change version to version =(
  return ['.'].concat(_fs.default.readdirSync(srcPath)).filter(function (filePath) {
    return _fs.default.statSync(_path.default.join(srcPath, filePath)).isDirectory();
  });
}

var _ramdaPath = _path.default.dirname(_module.default._resolveFilename('ramda', (0, _ramda.mergeRight)(new _module.default(), {
  'paths': _module.default._nodeModulePaths(process.cwd())
}))); // ramda folder will be /nodemodules/ramda/dist. We want to remove the dist


var ramdaPath = _ramdaPath.slice(0, _ramdaPath.lastIndexOf('ramda') + 5); // We do not need to change the search path based on useES since src and es are both built from the
// same source in Ramda, and the directories will therefore always have identical contents.


var methods = _fs.default.readdirSync(_path.default.join(ramdaPath, 'src')).filter(function (name) {
  return _path.default.extname(name) === '.js';
}).map(function (name) {
  return _path.default.basename(name, '.js');
});

function resolveModule(useES, name) {
  if ((0, _ramda.includes)(name, methods)) {
    return "ramda/".concat(useES ? 'es' : 'src', "/").concat(name);
  }

  throw new Error("Ramda method ".concat(name, " was not a known function\n    Please file a bug if it's my fault https://github.com/megawac/babel-plugin-ramda/issues\n  "));
}

;