import { curry, __ } from 'ramda';

let result = curry(function add(a, b) {
    return a + b;
})(__, 2);
