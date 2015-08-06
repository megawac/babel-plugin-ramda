import {map as map1} from 'ramda';
import {map as map2} from 'ramda';
import R from 'ramda';
import ramda from 'ramda';

let result = map1(function() {}, [1, 2, 3]);
let result2 = map2(function() {}, []);
let result3 = R.map(function() {}, []);
let result4 = ramda.map(function() {}, []);
