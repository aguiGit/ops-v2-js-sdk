'use strict';

function valueOfstring(obj) {
  return obj === null ? null : obj.toString();
}

function isBlank(str) {
  return null === str || str.trim().length === 0;
}

module.exports = {
  stringToByte: function stringToByte(str) {
    var bytes = [];
    var len = void 0,
        c = void 0;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(c >> 18 & 0x07 | 0xF0);
        bytes.push(c >> 12 & 0x3F | 0x80);
        bytes.push(c >> 6 & 0x3F | 0x80);
        bytes.push(c & 0x3F | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(c >> 12 & 0x0F | 0xE0);
        bytes.push(c >> 6 & 0x3F | 0x80);
        bytes.push(c & 0x3F | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(c >> 6 & 0x1F | 0xC0);
        bytes.push(c & 0x3F | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;
  },


  twoDimensionalArray: function twoDimensionalArray(args, types) {
    if (args.length === 0) {
      return null;
    } else if (args.length !== types.length) {
      throw "args number error";
    } else {
      var length = args.length;
      var two = new Array(length);
      var arg = void 0;
      for (var i = 0; i < length; i++) {
        arg = args[i];
        if (arg == null) {
          two[i] = [];
          continue;
        }
        if (typeof arg === 'string') {
          var argStr = arg;
          // 非String类型参数，若传参是空字符串，则赋值为空一维数组，避免数字类型转化异常 -> 空字符串转化为数字
          if (types != null && isBlank(argStr) && 'String' !== types[i]) {
            two[i] = [];
          } else if (types != null && !isBlank(argStr) && types[i].indexOf('[]') >= 0) {
            var arrayArg = eval(argStr);
            if (Array.isArray(arrayArg)) {
              var len = arrayArg.length;
              var result = new Array(len);
              for (var k = 0; k < len; k++) {
                result[k] = valueOfstring(arrayArg[k]);
              }
              two[i] = result;
            } else {
              throw "array arg error";
            }
          } else {
            two[i] = [argStr];
          }
        } else if (Array.isArray(arg)) {
          var _len = arg.length;
          var _result = new Array(_len);
          for (var _k = 0; _k < _len; _k++) {
            _result[_k] = valueOfstring(arg[_k]);
          }
          two[i] = _result;
        } else {
          two[i] = [valueOfstring(arg)];
        }
      }
      return two;
    }
  }
};