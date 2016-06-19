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

var ob2 = {
    rate: add
};

function test(param = map) {
    return param;
}

var test1 = (param2 = add) => add;