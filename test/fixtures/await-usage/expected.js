'use strict';

var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function wrap(fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function _await(value) { return new AwaitValue(value); } }; }();

var getItems = function () {
  var _ref = _asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            i = R.add(i, 5);
            _context.next = 3;
            return i;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getItems() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncIterator(iterable) { if (typeof Symbol === "function") { if (Symbol.asyncIterator) { var method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { return iterable[Symbol.iterator](); } } throw new TypeError("Object is not async iterable"); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var i = 0;


_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 3;
          _iterator = _asyncIterator(getItems());

        case 5:
          _context2.next = 7;
          return _iterator.next();

        case 7:
          _step = _context2.sent;
          _iteratorNormalCompletion = _step.done;
          _context2.next = 11;
          return _step.value;

        case 11:
          _value = _context2.sent;

          if (_iteratorNormalCompletion) {
            _context2.next = 18;
            break;
          }

          item = _value;

          console.log(item);

        case 15:
          _iteratorNormalCompletion = true;
          _context2.next = 5;
          break;

        case 18:
          _context2.next = 24;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2['catch'](3);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 24:
          _context2.prev = 24;
          _context2.prev = 25;

          if (!(!_iteratorNormalCompletion && _iterator.return)) {
            _context2.next = 29;
            break;
          }

          _context2.next = 29;
          return _iterator.return();

        case 29:
          _context2.prev = 29;

          if (!_didIteratorError) {
            _context2.next = 32;
            break;
          }

          throw _iteratorError;

        case 32:
          return _context2.finish(29);

        case 33:
          return _context2.finish(24);

        case 34:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this, [[3, 20, 24, 34], [25,, 29, 33]]);
}))();
