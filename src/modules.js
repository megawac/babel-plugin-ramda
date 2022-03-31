import {contains, mergeRight} from 'ramda';
import fs from 'fs';
import Module from 'module';
import path from 'path';

function getDirectories(srcPath) {
  // Slow synchronous version of https://github.com/megawac/lodash-modularize/blob/master/src/lodashModules.js.
  // Using the paths lodash-cli provides is not an option as they may change version to version =(
  return ['.'].concat(fs.readdirSync(srcPath)).filter(filePath =>
    fs.statSync(path.join(srcPath, filePath)).isDirectory());
}

const _ramdaPath = path.dirname(Module._resolveFilename('ramda', mergeRight(new Module, {
  'paths': Module._nodeModulePaths(process.cwd())
})));

// ramda folder will be /nodemodules/ramda/dist. We want to remove the dist
const ramdaPath = _ramdaPath.slice(0, _ramdaPath.lastIndexOf('ramda') + 5);

// We do not need to change the search path based on useES since src and es are both built from the
// same source in Ramda, and the directories will therefore always have identical contents.
var methods = fs.readdirSync(path.join(ramdaPath, 'src'))
    .filter(name => path.extname(name) == '.js')
    .map(name => path.basename(name, '.js'));

export default function resolveModule(useES, name) {

  for (var category in methods) {
    if (contains(name, methods)) {
      return `ramda/${useES ? 'es' : 'src'}/${name}`;
    }
  }
  throw new Error(`Ramda method ${name} was not a known function
    Please file a bug if it's my fault https://github.com/megawac/babel-plugin-ramda/issues
  `);
};
