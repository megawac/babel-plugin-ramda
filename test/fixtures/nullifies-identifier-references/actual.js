import R from 'ramda';

// issue #19
const resultA = R.pipe(R.inc, R.inc)(1);
const resultB = R.pipe(...[R.inc, R.inc])(1);
const resultC = R.pipe.call(R, R.inc, R.inc)(1);
const resultD = R.pipe.apply(R, [R.inc, R.inc])(1);
