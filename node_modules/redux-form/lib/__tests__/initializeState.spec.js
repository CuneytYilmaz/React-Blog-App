'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _initializeState = require('../initializeState');

var _initializeState2 = _interopRequireDefault(_initializeState);

var _fieldValue = require('../fieldValue');

describe('initializeState', function () {
  it('should throw error when no fields passed', function () {
    _expect2['default'](function () {
      return _initializeState2['default']({}, undefined, {});
    }).toThrow(/fields must be passed/);
  });

  it('should return empty if no fields', function () {
    _expect2['default'](_initializeState2['default']({}, [], {})).toEqual({});
  });

  it('should return empty field entries for each field', function () {
    var result = _initializeState2['default']({}, ['foo', 'bar'], {});
    _expect2['default'](result).toEqual({ foo: {}, bar: {} });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.bar)).toBe(true);
  });

  it('should initialize simple field values to state', function () {
    var result = _initializeState2['default']({
      foo: 'bar',
      catLives: 9,
      alive: true
    }, ['foo', 'catLives', 'alive'], {});
    _expect2['default'](result).toBeA('object').toEqual({
      foo: {
        initial: 'bar',
        value: 'bar'
      },
      catLives: {
        initial: 9,
        value: 9
      },
      alive: {
        initial: true,
        value: true
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.catLives)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.alive)).toBe(true);
  });

  it('should initialize deep field values to state', function () {
    var result = _initializeState2['default']({
      foo: {
        bar: 'baz'
      },
      lives: {
        cat: 9
      },
      alive: true
    }, ['foo.bar', 'lives.cat', 'alive'], {});
    _expect2['default'](result).toBeA('object').toEqual({
      foo: {
        bar: {
          initial: 'baz',
          value: 'baz'
        }
      },
      lives: {
        cat: {
          initial: 9,
          value: 9
        }
      },
      alive: {
        initial: true,
        value: true
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(false);
    _expect2['default'](_fieldValue.isFieldValue(result.foo.bar)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.lives)).toBe(false);
    _expect2['default'](_fieldValue.isFieldValue(result.lives.cat)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.alive)).toBe(true);
  });

  it('should initialize array field values to state', function () {
    var result = _initializeState2['default']({
      foo: ['bar', 'baz', undefined],
      alive: true
    }, ['foo[]', 'alive'], {});
    _expect2['default'](result).toBeA('object').toEqual({
      foo: [{
        initial: 'bar',
        value: 'bar'
      }, {
        initial: 'baz',
        value: 'baz'
      }, {}],
      alive: {
        initial: true,
        value: true
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(false);
    _expect2['default'](_fieldValue.isFieldValue(result.foo[0])).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.foo[1])).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.foo[2])).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.alive)).toBe(true);
  });

  it('should be okay with no array value given', function () {
    var result = _initializeState2['default']({
      bar: 42
    }, ['foo[]', 'bar'], {});
    _expect2['default'](result).toBeA('object').toEqual({
      foo: [],
      bar: {
        initial: 42,
        value: 42
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(false);
    _expect2['default'](_fieldValue.isFieldValue(result.bar)).toBe(true);
  });

  it('should allow an array field to be empty', function () {
    var result = _initializeState2['default']({
      foo: []
    }, ['foo[]'], {});
    _expect2['default'](result).toBeA('object').toEqual({ foo: [] });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(false);
  });

  it('should initialize array values to state', function () {
    var result = _initializeState2['default']({
      animals: ['cat', 'dog', 'rat'],
      bar: [{ deeper: 42 }]
    }, ['animals', 'bar'], {});
    _expect2['default'](result).toBeA('object').toEqual({
      animals: {
        initial: ['cat', 'dog', 'rat'],
        value: ['cat', 'dog', 'rat']
      },
      bar: {
        initial: [{ deeper: 42 }],
        value: [{ deeper: 42 }]
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.animals)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.bar)).toBe(true);
  });

  it('should initialize array values to state, changing existing values', function () {
    var result = _initializeState2['default']({
      animals: ['cat', 'dog', 'rat'],
      bar: []
    }, ['animals', 'bar'], {
      animals: {
        value: ['hog', 'pig', 'doe']
      },
      bar: {
        value: [{ deeper: 42 }]
      }
    });
    _expect2['default'](result).toBeA('object').toEqual({
      animals: {
        initial: ['cat', 'dog', 'rat'],
        value: ['cat', 'dog', 'rat']
      },
      bar: {
        initial: [],
        value: []
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.animals)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.bar)).toBe(true);
  });

  it('should initialize object values to state', function () {
    var result = _initializeState2['default']({
      foo: { bar: 'baz' },
      lives: { cat: 9 },
      alive: true
    }, ['foo', 'lives'], {});
    _expect2['default'](result).toBeA('object').toEqual({
      foo: {
        initial: { bar: 'baz' },
        value: { bar: 'baz' }
      },
      lives: {
        initial: { cat: 9 },
        value: { cat: 9 }
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.lives)).toBe(true);
  });
});