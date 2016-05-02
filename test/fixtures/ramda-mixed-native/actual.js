import {map, add} from 'ramda';

let mapper = map(add(1));

mapper([1, 2, 3]);

[1, 2, 3].map(a => a + 1);

var obj = {
	map: 1
};

var obj1 = {
	[add]: 2
};