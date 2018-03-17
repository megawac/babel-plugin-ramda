import ramda from 'ramda';

let i = 0;
async function* getItems() {
  i = R.add(i, 5);
  yield i;
}

(async function () {
  for await (let item of getItems()) {
    console.log(item)
  }
})();
