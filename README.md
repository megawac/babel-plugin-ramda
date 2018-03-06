babel-plugin-ramda [![Build Status](https://travis-ci.org/megawac/babel-plugin-ramda.svg?branch=master)](https://travis-ci.org/megawac/babel-plugin-ramda)
==============

This plugin is a transform to remove unused ramda dependencies, without forcing the user to cherry pick methods manually. This lets you use ramda naturally (aka as documented) without worrying about bundling parts you're not using.

See also [`babel-plugin-lodash`](https://github.com/megawac/babel-plugin-lodash).

#### Example

Converts

```js
import R, {map} from 'ramda';

map(R.add(1), [1, 2, 3]);
```

Roughly to 

```js
import add from 'ramda/src/add';
import map from 'ramda/src/map';

map(add(1), [1, 2, 3]);
```


#### Limitations

- You must be using ES6 imports (both specifiers and default work) to load ramda.

#### FAQ

> I receive `TypeError: The plugin "ramda" didn’t export a Plugin instance`<br>
> or, can I use this plugin with Babel v5?

Babel v5 is no longer supported. Use [v0.1.2](https://github.com/megawac/babel-plugin-ramda/releases/tag/v0.1.2) for support.

#### Usage

###### Via `.babelrc` (Recommended)

```json
{
  "plugins": ["ramda"]
}
```

or
```json
{
  "plugins": [
    ["ramda", {
      "useES": true
    }]
  ]
}
```

to use the new `ramda/es/` path for imports, which is available since Ramda 0.25. This is recommended as it uses ES modules rather than CommonJS. It defaults to `ramda/src/` when omitted.

###### Via CLI

```sh
$ babel --plugins ramda script.js
```

###### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["ramda"]
});
```
