'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fieldValue = require('./fieldValue');

var isMetaKey = function isMetaKey(key) {
  return key[0] === '_';
};

/**
 * Sets an error on a field deep in the tree, returning a new copy of the state
 */
var setErrors = function setErrors(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var state = _x,
        errors = _x2,
        destKey = _x3;
    _again = false;

    var clear = function clear() {
      if (Array.isArray(state)) {
        return state.map(function (stateItem, index) {
          return setErrors(stateItem, errors && errors[index], destKey);
        });
      }
      if (state && typeof state === 'object') {
        var result = Object.keys(state).reduce(function (accumulator, key) {
          var _extends2;

          return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends2 = {}, _extends2[key] = setErrors(state[key], errors && errors[key], destKey), _extends2));
        }, state);
        if (_fieldValue.isFieldValue(state)) {
          _fieldValue.makeFieldValue(result);
        }
        return result;
      }
      return _fieldValue.makeFieldValue(state);
    };
    if (!errors) {
      if (!state) {
        return state;
      }
      if (state[destKey]) {
        var copy = _extends({}, state);
        delete copy[destKey];
        return _fieldValue.makeFieldValue(copy);
      }
      return clear();
    }
    if (typeof errors === 'string') {
      var _extends3;

      return _fieldValue.makeFieldValue(_extends({}, state, (_extends3 = {}, _extends3[destKey] = errors, _extends3)));
    }
    if (Array.isArray(errors)) {
      if (!state || Array.isArray(state)) {
        var _ret = (function () {
          var copy = (state || []).map(function (stateItem, index) {
            return setErrors(stateItem, errors[index], destKey);
          });
          errors.forEach(function (errorItem, index) {
            return copy[index] = setErrors(copy[index], errorItem, destKey);
          });
          return {
            v: copy
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
      _x = state;
      _x2 = errors[0];
      _x3 = destKey;
      _again = true;
      clear = copy = _extends3 = _ret = undefined;
      continue _function;
      // use first error
    }
    if (_fieldValue.isFieldValue(state)) {
      var _extends4;

      return _fieldValue.makeFieldValue(_extends({}, state, (_extends4 = {}, _extends4[destKey] = errors, _extends4)));
    }
    var errorKeys = Object.keys(errors);
    if (!errorKeys.length && !state) {
      return state;
    }
    return errorKeys.reduce(function (accumulator, key) {
      var _extends5;

      return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends5 = {}, _extends5[key] = setErrors(state && state[key], errors[key], destKey), _extends5));
    }, clear() || {});
  }
};

exports['default'] = setErrors;
module.exports = exports['default'];