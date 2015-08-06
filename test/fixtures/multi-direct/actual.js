import R from 'ramda';

let mapper = R.map(R.add(1));
let result = mapper([1, 2, 3]);
R.take(1, R.reject(Boolean, result));
