import R, {map, take} from 'ramda';

let mapper = map(R.add(1));
let result = mapper([1, 2, 3]);
take(1, R.reject(Boolean, result));