import path from 'path';
import ramda, {contains, keys} from 'ramda';

export let methods = keys(ramda);

export default function resolveModule(name) {

  for (var category in methods) {
    if (contains(name, methods)) {
      return path.join('ramda/src', name);
    }
  }
  throw new Error(`lodash method ${name} was not in known modules
    Please file a bug if it's my fault https://github.com/megawac/babel-plugin-lodash/issues
  `);
};
