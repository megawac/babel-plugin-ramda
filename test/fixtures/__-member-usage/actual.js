import R from 'ramda';

let result = R.curry(function add(a, b, c, d) {
    return a + b + c + d;
})(R.__, R.__, 2,R.__);
