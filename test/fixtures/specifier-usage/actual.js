import {add, map} from 'ramda';

let mapper = map(add(1));

mapper([1, 2, 3]);
