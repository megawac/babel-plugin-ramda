import { curry, __ } from 'ramda';

let result = curry(function add(a, b, c, d) {
    return a + b + c + d;
})(__, __, 2,__);
