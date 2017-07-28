'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _resetState = require('../resetState');

var _resetState2 = _interopRequireDefault(_resetState);

var _fieldValue = require('../fieldValue');

describe('resetState', function () {
  it('should return empty if no values', function () {
    _expect2['default'](_resetState2['default']({})).toEqual({});
  });

  it('should reset simple values', function () {
    var result = _resetState2['default']({
      foo: _fieldValue.makeFieldValue({
        initial: 'dog',
        value: 'cat'
      }),
      bar: _fieldValue.makeFieldValue({
        initial: 'rat',
        value: 'pig'
      }),
      baz: _fieldValue.makeFieldValue({
        initial: 'hog',
        value: 'bun'
      })
    });
    _expect2['default'](result).toBeA('object').toEqual({
      foo: {
        initial: 'dog',
        value: 'dog'
      },
      bar: {
        initial: 'rat',
        value: 'rat'
      },
      baz: {
        initial: 'hog',
        value: 'hog'
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.bar)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.baz)).toBe(true);
  });

  it('should reset deep values', function () {
    var result = _resetState2['default']({
      foo: {
        bar: _fieldValue.makeFieldValue({
          initial: 'dog',
          value: 'cat'
        })
      },
      baz: {
        chad: _fieldValue.makeFieldValue({
          initial: 'fun',
          value: 'bun'
        }),
        chaz: _fieldValue.makeFieldValue({
          value: 'shouldbesettoundefined'
        })
      }
    });
    _expect2['default'](result).toBeA('object').toEqual({
      foo: {
        bar: {
          initial: 'dog',
          value: 'dog'
        }
      },
      baz: {
        chad: {
          initial: 'fun',
          value: 'fun'
        },
        chaz: {}
      }
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo.bar)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.baz.chad)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.baz.chaz)).toBe(true);
  });

  it('should reset array values', function () {
    var result = _resetState2['default']({
      foo: [_fieldValue.makeFieldValue({
        initial: 'cat',
        value: 'dog'
      }), _fieldValue.makeFieldValue({
        initial: 'rat',
        value: 'pig'
      }), _fieldValue.makeFieldValue({
        value: 'shouldbesettoundefined'
      })]
    });
    _expect2['default'](result).toBeA('object').toEqual({
      foo: [{
        initial: 'cat',
        value: 'cat'
      }, {
        initial: 'rat',
        value: 'rat'
      }, {}]
    });
    _expect2['default'](_fieldValue.isFieldValue(result.foo[0])).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.foo[1])).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.foo[2])).toBe(true);
  });

  it('should reset deep array values with key "value"', function () {
    var result = _resetState2['default']({
      myValues: [{
        value: _fieldValue.makeFieldValue({
          initial: 'cat',
          value: 'rat'
        })
      }, {
        value: _fieldValue.makeFieldValue({
          initial: 'pig',
          value: 'hog'
        })
      }]
    });
    _expect2['default'](result).toBeA('object').toEqual({
      myValues: [{
        value: {
          initial: 'cat',
          value: 'cat'
        }
      }, {
        value: {
          initial: 'pig',
          value: 'pig'
        }
      }]
    });
    _expect2['default'](_fieldValue.isFieldValue(result.myValues[0].value)).toBe(true);
    _expect2['default'](_fieldValue.isFieldValue(result.myValues[1].value)).toBe(true);
  });

  it('should allow an array to be empty', function () {
    var result = _resetState2['default']({
      foo: []
    });
    _expect2['default'](result).toBeA('object').toEqual({ foo: [] });
  });
});