'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _fieldValue = require('../fieldValue');

describe('fieldValue', function () {
  describe('makeFieldValue', function () {
    it('should be okay with non-objects', function () {
      _expect2['default'](_fieldValue.makeFieldValue()).toBe(undefined);
      _expect2['default'](_fieldValue.makeFieldValue(null)).toBe(null);
      _expect2['default'](_fieldValue.makeFieldValue([1, 2])).toEqual([1, 2]);
      _expect2['default'](_fieldValue.makeFieldValue('not an object')).toEqual('not an object');
    });

    it('should return the same object back', function () {
      var someObject = { b: 1 };
      _expect2['default'](_fieldValue.makeFieldValue(someObject)).toBe(someObject);
    });

    it('should not affect deep equal', function () {
      var someObject = { b: 1 };
      _expect2['default'](someObject).toEqual({ b: 1 });
      _fieldValue.makeFieldValue(someObject);
      _expect2['default'](someObject).toEqual({ b: 1 });
    });

    it('should set the field value flag', function () {
      var someObject = { b: 1 };
      _expect2['default'](_fieldValue.isFieldValue(someObject)).toBe(false);
      _fieldValue.makeFieldValue(someObject);
      _expect2['default'](_fieldValue.isFieldValue(someObject)).toBe(true);
    });
  });

  describe('isFieldValue', function () {
    it('should be okay with non-objects', function () {
      _expect2['default'](_fieldValue.isFieldValue()).toBe(false);
      _expect2['default'](_fieldValue.isFieldValue(null)).toBe(false);
      _expect2['default'](_fieldValue.isFieldValue([1, 2])).toBe(false);
      _expect2['default'](_fieldValue.isFieldValue('not an object')).toBe(false);
    });
  });
});