import R from 'ramda';
import {map} from 'ramda';

let result = map(function() {}, [1, 2, 3]);
let result2 = map(function() {}, []);
let result3 = R.map(function() {}, []);
let result4 = R.map(function() {}, []);
