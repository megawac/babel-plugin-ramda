import {add, map as map1} from 'ramda';

let map = () => {};
let mapper = map(map1(add(1)));

mapper([1, 2, 3]);
