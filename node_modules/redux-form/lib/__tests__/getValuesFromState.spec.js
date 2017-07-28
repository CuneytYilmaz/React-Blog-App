'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fieldValue = require('../fieldValue');

var _getValuesFromState = require('../getValuesFromState');

var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

describe('getValuesFromState', function () {
  it('should get simple values from state', function () {
    var state = {
      foo: _fieldValue.makeFieldValue({ value: 'bar' }),
      catLives: _fieldValue.makeFieldValue({ value: 9 }),
      alive: _fieldValue.makeFieldValue({ value: true }),
      value: _fieldValue.makeFieldValue({ value: 'value' })
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: 'bar',
      catLives: 9,
      alive: true,
      value: 'value'
    });
  });

  it('should understand undefined values that have only been touched', function () {
    var state = {
      foo: _fieldValue.makeFieldValue({ value: 'dog', touched: true }),
      bar: _fieldValue.makeFieldValue({ touched: true }),
      baz: _fieldValue.makeFieldValue({ touched: true })
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: 'dog'
    });
  });

  it('should get deep values from state', function () {
    var state = {
      foo: {
        bar: _fieldValue.makeFieldValue({ value: 'baz' })
      },
      lives: {
        cat: _fieldValue.makeFieldValue({ value: 9 })
      },
      alive: _fieldValue.makeFieldValue({ value: true })
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: {
        bar: 'baz'
      },
      lives: {
        cat: 9
      },
      alive: true
    });
  });

  it('should get date values from state', function () {
    var date1 = new Date();
    var date2 = new Date(date1.getTime() + 1);
    var state = {
      time1: {
        value: date1
      },
      time2: {
        value: date2
      }
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      time1: date1,
      time2: date2
    });
  });

  it('should get undefined values from state', function () {
    var state = {
      foo: {
        value: undefined
      },
      bar: {
        value: undefined
      }
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({});
  });

  it('should get null values from state', function () {
    var state = {
      foo: {
        value: null
      },
      bar: {
        value: null
      }
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: null,
      bar: null
    });
  });

  it('should get empty string values from state', function () {
    var state = {
      foo: {
        value: ''
      },
      bar: {
        value: ''
      }
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: '',
      bar: ''
    });
  });

  it('should get array values from state', function () {
    var state = {
      foo: [_fieldValue.makeFieldValue({ value: 'bar' }), _fieldValue.makeFieldValue({ value: 'baz' }), {}],
      alive: _fieldValue.makeFieldValue({ value: true })
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: ['bar', 'baz', undefined],
      alive: true
    });
  });

  it('should allow an array to be empty', function () {
    var state = {
      foo: []
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({ foo: [] });
  });

  it('should get deep array values from state', function () {
    var state = {
      foo: {
        animals: [_fieldValue.makeFieldValue({ value: 'cat' }), _fieldValue.makeFieldValue({ value: 'dog' }), _fieldValue.makeFieldValue({ value: 'rat' })]
      },
      bar: [{
        deeper: {
          value: 42
        }
      }]
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: {
        animals: ['cat', 'dog', 'rat']
      },
      bar: [{ deeper: 42 }]
    });
  });

  it('should ignore values starting with _', function () {
    var state = {
      foo: {
        value: 'dog'
      },
      bar: {
        value: 'cat'
      },
      _someMetaValue: 'rat'
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: 'dog',
      bar: 'cat'
    });
  });

  it('should ignore visited fields without values', function () {
    var state = {
      foo: {
        value: 'dog'
      },
      bar: {
        visited: true
      }
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: 'dog'
    });
  });

  it('should get deep array of objects from state', function () {
    var state = {
      foo: {
        animals: [{ key: _fieldValue.makeFieldValue({ value: 'k1' }), value: _fieldValue.makeFieldValue({ value: 'v1' }) }, { key: _fieldValue.makeFieldValue({ value: 'k2' }), value: _fieldValue.makeFieldValue({ value: 'v2' }) }]
      }
    };
    _expect2['default'](_getValuesFromState2['default'](state)).toBeA('object').toEqual({
      foo: {
        animals: [{ key: 'k1', value: 'v1' }, { key: 'k2', value: 'v2' }]
      }
    });
  });
});