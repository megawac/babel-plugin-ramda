import R, { prop as foo } from 'ramda';

function bar(R, prop, foo) {
  R.prop(foo);
  foo;
  foo();
}
function baz() {
  R.prop(foo);
  foo;
  foo();
}
