function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  if (this._msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._msg);
  }
  return t0;
 }
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    var key = $.index(this._keys, i);
    var t0 = !(key === (void 0));
    if (t0) {
      var t1 = !(key === $.CTC5);
    } else {
      t1 = t0;
    }
    if (t1) {
      f.$call$2(key, $.index(this._values, i));
    } else {
    }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  } else {
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t0 = $.index(this._keys, index) === (void 0);
  if (!t0) {
    var t1 = $.index(this._keys, index) === $.CTC5;
  } else {
    t1 = t0;
  }
  if (t1) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  } else {
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 1, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, oldKeys, capacity, oldValues);
  this._keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; $.ltB(i, capacity); i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    var t3 = t2 === (void 0);
    if (!t3) {
      var t4 = t2 === $.CTC5;
    } else {
      t4 = t3;
    }
    if (t4) {
      continue;
    } else {
    }
    var t5 = oldValues.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var t6 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t6);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      oldKeys = env1;
      break;
    case 2:
      oldKeys = env0;
      capacity = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 1:
      state = 0;
      var oldValues = this._values;
    case 2:
      state = 0;
      this._keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          var t1 = key === (void 0);
          if (!t1) {
            var t2 = key === $.CTC5;
          } else {
            t2 = t1;
          }
          if (t2) {
            break c$0;
          } else {
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  } else {
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  } else {
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    } else {
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    } else {
      var numberOfProbes1 = numberOfProbes + 1;
    }
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var existingKey = $.index(this._keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      } else {
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        var t0 = $.ltB(insertionIndex, 0);
        if (t0) {
          var t1 = $.CTC5 === existingKey;
        } else {
          t1 = t0;
        }
        if (t1) {
          var insertionIndex0 = hash0;
        } else {
          insertionIndex0 = insertionIndex;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var existingKey = $.index(this._keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          } else {
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            var t0 = $.ltB(insertionIndex, 0);
            if (t0) {
              var t1 = $.CTC5 === existingKey;
            } else {
              t1 = t0;
            }
            if (t1) {
              var insertionIndex0 = hash0;
            } else {
              insertionIndex0 = insertionIndex;
            }
            var numberOfProbes0 = numberOfProbes + 1;
          }
        }
        var hash1 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
        var numberOfProbes1 = numberOfProbes0;
        var hash2 = hash1;
        numberOfProbes = numberOfProbes1;
        hash0 = hash2;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure7(t0));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    } else {
    }
    entry = $.index(this._entries, this._nextValidIndex);
    var t1 = entry === (void 0);
    if (!t1) {
      var t2 = entry === $.CTC5;
    } else {
      t2 = t1;
    }
  } while (t2);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  } else {
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC5) {
    this._advance$0();
  } else {
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  } else {
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  } else {
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  var t0 = str === (void 0);
  if (!t0) {
    var t1 = $.isEmpty(str) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return this;
  } else {
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  } else {
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    } else {
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  } else {
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure8", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib2_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  } else {
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    } else {
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      } else {
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("BadNumberFormatException", "Object", ["_s"], {
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.stringToString(this._s) + '\'';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("Example", "Object", ["mvMatrixStack", "mvMatrix", "pMatrix", "lastTime", "cubeAngle", "moonAngle", "moonVertexIndexBuffernumItems", "moonVertexIndexBufferitemSize", "moonVertexPositionBuffernumItems", "moonVertexPositionBufferitemSize", "moonVertexTextureCoordBuffernumItems", "moonVertexTextureCoordBufferitemSize", "moonVertexNormalBuffernumItems", "moonVertexNormalBufferitemSize", "cubeVertexIndexBuffernumItems", "cubeVertexIndexBufferitemSize", "cubeVertexTextureCoordBuffernumItems", "cubeVertexTextureCoordBufferitemSize", "cubeVertexNormalBuffernumItems", "cubeVertexNormalBufferitemSize", "cubeVertexPositionBuffernumItems", "cubeVertexPositionBufferitemSize", "moonVertexIndexBuffer", "moonVertexTextureCoordBuffer", "moonVertexNormalBuffer", "moonVertexPositionBuffer", "cubeVertexIndexBuffer", "cubeVertexTextureCoordBuffer", "cubeVertexNormalBuffer", "cubeVertexPositionBuffer", "crateTexture?", "moonTexture?", "pointLightingColorUniform", "pointLightingLocationUniform", "ambientColorUniform", "useLightingUniform", "samplerUniform", "nMatrixUniform", "mvMatrixUniform", "pMatrixUniform", "vertexNormalAttribute", "textureCoordAttribute", "vertexPositionAttribute", "shaderProgram", "viewportHeight", "viewportWidth", "gl?", "canvas"], {
 init$0: function() {
  this.canvas = $.document().query$1('#lesson12-canvas');
  this.gl = $.getWebGLContext(this.canvas);
  var t0 = this.canvas;
  var t1 = typeof t0 === 'object' && t0.is$CanvasElement();
  var t2 = !t1;
  if (t1) {
    var t3 = this.gl;
    var t4 = !((typeof t3 === 'object') && t3.is$WebGLRenderingContext());
  } else {
    t4 = t2;
  }
  if (t4) {
    throw $.captureStackTrace('failed to load canvas');
  } else {
  }
  this.viewportWidth = this.canvas.get$width();
  this.viewportHeight = this.canvas.get$height();
  this.pMatrix = $.Matrix4$0();
  this.mvMatrix = $.Matrix4$0();
  this.mvMatrixStack = $.List((void 0));
  this._initShaders$0();
  this._initBuffers$0();
  this._initTexture$0();
  this.gl.clearColor$4(0.0, 0.0, 0.0, 1.0);
  this.gl.enable$1(2929);
  $.print('done init()');
  $.window().webkitRequestAnimationFrame$1(this.get$_tick());
 },
 _tick$1: function(time) {
  this._drawScene$0();
  this._animate$1(time);
  $.window().webkitRequestAnimationFrame$1(this.get$_tick());
 },
 get$_tick: function() { return new $.Closure9(this); },
 _animate$1: function(timeNow) {
  if (!$.eqB(this.lastTime, 0)) {
    var elapsed = $.toDouble($.sub(timeNow, this.lastTime));
    this.moonAngle = $.add(this.moonAngle, $.mul(0.05, elapsed));
    this.cubeAngle = $.add(this.cubeAngle, $.mul(0.05, elapsed));
  } else {
  }
  this.lastTime = timeNow;
 },
 _drawScene$0: function() {
  this.gl.viewport$4(0, 0, this.viewportWidth, this.viewportHeight);
  this.gl.clear$1(16640);
  $.perspective(45, $.div(this.viewportWidth, this.viewportHeight), 0.1, 100.0, this.pMatrix);
  var lighting = $.document().query$1('#lighting').get$checked();
  var t0 = this.gl;
  var t1 = this.useLightingUniform;
  var t2 = lighting === true;
  if (t2) {
    var t3 = 1;
  } else {
    t3 = 0;
  }
  t0.uniform1i$2(t1, t3);
  if (t2) {
    this.gl.uniform3f$4(this.ambientColorUniform, $.parseDouble($.document().query$1('#ambientR').get$value()), $.parseDouble($.document().query$1('#ambientG').get$value()), $.parseDouble($.document().query$1('#ambientB').get$value()));
    this.gl.uniform3f$4(this.pointLightingLocationUniform, $.parseDouble($.document().query$1('#lightPositionX').get$value()), $.parseDouble($.document().query$1('#lightPositionY').get$value()), $.parseDouble($.document().query$1('#lightPositionZ').get$value()));
    this.gl.uniform3f$4(this.pointLightingColorUniform, $.parseDouble($.document().query$1('#pointR').get$value()), $.parseDouble($.document().query$1('#pointG').get$value()), $.parseDouble($.document().query$1('#pointB').get$value()));
  } else {
  }
  this.mvMatrix.identity$0();
  this.mvMatrix.translate$1($.Vector3$fromList$1([0.0, 0.0, -20.0]));
  this.mvPushMatrix$0();
  this.mvMatrix.rotate$2(this.degToRad$1(this.moonAngle), $.Vector3$fromValues$3(0.0, 1.0, 0.0));
  this.mvMatrix.translate$1($.Vector3$fromList$1([5.0, 0.0, 0.0]));
  this.gl.activeTexture$1(33984);
  this.gl.bindTexture$2(3553, this.moonTexture);
  this.gl.uniform1i$2(this.samplerUniform, 0);
  this.gl.bindBuffer$2(34962, this.moonVertexPositionBuffer);
  this.gl.vertexAttribPointer$6(this.vertexPositionAttribute, this.moonVertexPositionBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34962, this.moonVertexTextureCoordBuffer);
  this.gl.vertexAttribPointer$6(this.textureCoordAttribute, this.moonVertexTextureCoordBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34962, this.moonVertexNormalBuffer);
  this.gl.vertexAttribPointer$6(this.vertexNormalAttribute, this.moonVertexNormalBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34963, this.moonVertexIndexBuffer);
  this._setMatrixUniforms$0();
  this.gl.drawElements$4(4, this.moonVertexIndexBuffernumItems, 5123, 0);
  this.mvPopMatrix$0();
  this.mvPushMatrix$0();
  this.mvMatrix.rotate$2(this.degToRad$1(this.cubeAngle), $.Vector3$fromValues$3(0.0, 1.0, 0.0));
  this.mvMatrix.translate$1($.Vector3$fromList$1([5.0, 0.0, 0.0]));
  this.gl.bindBuffer$2(34962, this.cubeVertexPositionBuffer);
  this.gl.vertexAttribPointer$6(this.vertexPositionAttribute, this.cubeVertexPositionBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34962, this.cubeVertexNormalBuffer);
  this.gl.vertexAttribPointer$6(this.vertexNormalAttribute, this.cubeVertexNormalBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34962, this.cubeVertexTextureCoordBuffer);
  this.gl.vertexAttribPointer$6(this.textureCoordAttribute, this.cubeVertexTextureCoordBufferitemSize, 5126, false, 0, 0);
  this.gl.activeTexture$1(33984);
  this.gl.bindTexture$2(3553, this.crateTexture);
  this.gl.uniform1i$2(this.samplerUniform, 0);
  this.gl.bindBuffer$2(34963, this.cubeVertexIndexBuffer);
  this._setMatrixUniforms$0();
  this.gl.drawElements$4(4, this.cubeVertexIndexBuffernumItems, 5123, 0);
  this.mvPopMatrix$0();
 },
 _setMatrixUniforms$0: function() {
  this.gl.uniformMatrix4fv$3(this.pMatrixUniform, false, this.pMatrix.get$array());
  this.gl.uniformMatrix4fv$3(this.mvMatrixUniform, false, this.mvMatrix.get$array());
  var normalMatrix = $.Matrix3$0();
  this.mvMatrix.toInverseMat3$1(normalMatrix);
  var normalMatrix0 = normalMatrix;
  normalMatrix0.transpose$0();
  this.gl.uniformMatrix3fv$3(this.nMatrixUniform, false, normalMatrix0.get$array());
 },
 _initTexture$0: function() {
  var t0 = ({});
  this.moonTexture = this.gl.createTexture$0();
  t0.moonTextureImage_1 = $.ImageElement((void 0), (void 0), (void 0));
  $.add$1(t0.moonTextureImage_1.get$on().get$load(), new $.Closure5(this, t0));
  t0.moonTextureImage_1.set$src('moon.gif');
  this.crateTexture = this.gl.createTexture$0();
  t0.crateTextureImage_2 = $.ImageElement((void 0), (void 0), (void 0));
  $.add$1(t0.crateTextureImage_2.get$on().get$load(), new $.Closure6(this, t0));
  t0.crateTextureImage_2.set$src('crate.gif');
 },
 _initBuffers$0: function() {
  this.cubeVertexPositionBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.cubeVertexPositionBuffer);
  var vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
  this.gl.bufferData$3(34962, $.Float32Array$fromList(vertices), 35044);
  this.cubeVertexPositionBufferitemSize = 3;
  this.cubeVertexPositionBuffernumItems = 24;
  this.cubeVertexNormalBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.cubeVertexNormalBuffer);
  var vertexNormals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
  this.gl.bufferData$3(34962, $.Float32Array$fromList(vertexNormals), 35044);
  this.cubeVertexNormalBufferitemSize = 3;
  this.cubeVertexNormalBuffernumItems = 24;
  this.cubeVertexTextureCoordBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.cubeVertexTextureCoordBuffer);
  var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
  this.gl.bufferData$3(34962, $.Float32Array$fromList(textureCoords), 35044);
  this.cubeVertexTextureCoordBufferitemSize = 2;
  this.cubeVertexTextureCoordBuffernumItems = 24;
  this.cubeVertexIndexBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34963, this.cubeVertexIndexBuffer);
  var cubeVertexIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  this.gl.bufferData$3(34963, $.Uint16Array$fromList(cubeVertexIndices), 35044);
  this.cubeVertexIndexBufferitemSize = 1;
  this.cubeVertexIndexBuffernumItems = 36;
  var vertexPositionData = [];
  var normalData = [];
  var textureCoordData = [];
  for (var latNumber = 0; latNumber <= 30; latNumber = latNumber + 1) {
    var theta = latNumber * 3.141592653589793 / 30;
    var sinTheta = $.sin(theta);
    if (typeof sinTheta !== 'number') return this._initBuffers$0$bailout(1, theta, vertexPositionData, normalData, textureCoordData, latNumber, sinTheta);
    var cosTheta = $.cos(theta);
    if (typeof cosTheta !== 'number') return this._initBuffers$0$bailout(2, normalData, textureCoordData, sinTheta, vertexPositionData, latNumber, cosTheta);
    var t0 = latNumber / 30;
    var t1 = 2 * cosTheta;
    var v = 1 - t0;
    for (var longNumber = 0; longNumber <= 30; longNumber = longNumber + 1) {
      var phi = longNumber * 2 * 3.141592653589793 / 30;
      var sinPhi = $.sin(phi);
      var x = $.mul($.cos(phi), sinTheta);
      var z = $.mul(sinPhi, sinTheta);
      var u = 1 - longNumber / 30;
      $.add$1(normalData, x);
      $.add$1(normalData, cosTheta);
      $.add$1(normalData, z);
      $.add$1(textureCoordData, u);
      $.add$1(textureCoordData, v);
      $.add$1(vertexPositionData, $.mul(2, x));
      $.add$1(vertexPositionData, t1);
      $.add$1(vertexPositionData, $.mul(2, z));
    }
  }
  var indexData = [];
  for (var latNumber0 = 0; latNumber0 < 30; latNumber0 = latNumber0 + 1) {
    var t2 = latNumber0 * 31;
    for (var longNumber0 = 0; longNumber0 < 30; longNumber0 = longNumber0 + 1) {
      var first = t2 + longNumber0;
      var second = first + 30 + 1;
      $.add$1(indexData, first);
      $.add$1(indexData, second);
      var t3 = first + 1;
      $.add$1(indexData, t3);
      $.add$1(indexData, second);
      $.add$1(indexData, second + 1);
      $.add$1(indexData, t3);
    }
  }
  this.moonVertexNormalBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.moonVertexNormalBuffer);
  this.gl.bufferData$3(34962, $.Float32Array$fromList(normalData), 35044);
  this.moonVertexNormalBufferitemSize = 3;
  this.moonVertexNormalBuffernumItems = $.toInt(normalData.length / 3);
  this.moonVertexTextureCoordBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.moonVertexTextureCoordBuffer);
  this.gl.bufferData$3(34962, $.Float32Array$fromList(textureCoordData), 35044);
  this.moonVertexTextureCoordBufferitemSize = 2;
  this.moonVertexTextureCoordBuffernumItems = $.toInt(textureCoordData.length / 2);
  this.moonVertexPositionBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.moonVertexPositionBuffer);
  this.gl.bufferData$3(34962, $.Float32Array$fromList(vertexPositionData), 35044);
  this.moonVertexPositionBufferitemSize = 3;
  this.moonVertexPositionBuffernumItems = $.toInt(vertexPositionData.length / 3);
  this.moonVertexIndexBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34963, this.moonVertexIndexBuffer);
  this.gl.bufferData$3(34963, $.Uint16Array$fromList(indexData), 35040);
  this.moonVertexIndexBufferitemSize = 1;
  this.moonVertexIndexBuffernumItems = indexData.length;
 },
 _initBuffers$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      theta = env0;
      vertexPositionData = env1;
      normalData = env2;
      textureCoordData = env3;
      latNumber = env4;
      sinTheta = env5;
      break;
    case 2:
      normalData = env0;
      textureCoordData = env1;
      sinTheta = env2;
      vertexPositionData = env3;
      latNumber = env4;
      cosTheta = env5;
      break;
  }
  switch (state) {
    case 0:
      this.cubeVertexPositionBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34962, this.cubeVertexPositionBuffer);
      var vertices = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
      this.gl.bufferData$3(34962, $.Float32Array$fromList(vertices), 35044);
      this.cubeVertexPositionBufferitemSize = 3;
      this.cubeVertexPositionBuffernumItems = 24;
      this.cubeVertexNormalBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34962, this.cubeVertexNormalBuffer);
      var vertexNormals = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0];
      this.gl.bufferData$3(34962, $.Float32Array$fromList(vertexNormals), 35044);
      this.cubeVertexNormalBufferitemSize = 3;
      this.cubeVertexNormalBuffernumItems = 24;
      this.cubeVertexTextureCoordBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34962, this.cubeVertexTextureCoordBuffer);
      var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
      this.gl.bufferData$3(34962, $.Float32Array$fromList(textureCoords), 35044);
      this.cubeVertexTextureCoordBufferitemSize = 2;
      this.cubeVertexTextureCoordBuffernumItems = 24;
      this.cubeVertexIndexBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34963, this.cubeVertexIndexBuffer);
      var cubeVertexIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
      this.gl.bufferData$3(34963, $.Uint16Array$fromList(cubeVertexIndices), 35044);
      this.cubeVertexIndexBufferitemSize = 1;
      this.cubeVertexIndexBuffernumItems = 36;
      var vertexPositionData = [];
      var normalData = [];
      var textureCoordData = [];
      var latNumber = 0;
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(latNumber <= 30)) break L0;
            var theta = latNumber * 3.141592653589793 / 30;
            var sinTheta = $.sin(theta);
          case 1:
            state = 0;
            var cosTheta = $.cos(theta);
          case 2:
            state = 0;
            var v = 1 - latNumber / 30;
            var longNumber = 0;
            L1: while (true) {
              if (!(longNumber <= 30)) break L1;
              var phi = longNumber * 2 * 3.141592653589793 / 30;
              var sinPhi = $.sin(phi);
              var x = $.mul($.cos(phi), sinTheta);
              var z = $.mul(sinPhi, sinTheta);
              var u = 1 - longNumber / 30;
              $.add$1(normalData, x);
              $.add$1(normalData, cosTheta);
              $.add$1(normalData, z);
              $.add$1(textureCoordData, u);
              $.add$1(textureCoordData, v);
              $.add$1(vertexPositionData, $.mul(2, x));
              $.add$1(vertexPositionData, $.mul(2, cosTheta));
              $.add$1(vertexPositionData, $.mul(2, z));
              longNumber = longNumber + 1;
            }
            latNumber = latNumber + 1;
        }
      }
      var indexData = [];
      var t0 = 30 + 1;
      var latNumber0 = 0;
      L2: while (true) {
        if (!(latNumber0 < 30)) break L2;
        var t1 = latNumber0 * t0;
        var longNumber0 = 0;
        L3: while (true) {
          if (!(longNumber0 < 30)) break L3;
          var first = t1 + longNumber0;
          var second = first + 30 + 1;
          $.add$1(indexData, first);
          $.add$1(indexData, second);
          var t2 = first + 1;
          $.add$1(indexData, t2);
          $.add$1(indexData, second);
          $.add$1(indexData, second + 1);
          $.add$1(indexData, t2);
          longNumber0 = longNumber0 + 1;
        }
        latNumber0 = latNumber0 + 1;
      }
      this.moonVertexNormalBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34962, this.moonVertexNormalBuffer);
      this.gl.bufferData$3(34962, $.Float32Array$fromList(normalData), 35044);
      this.moonVertexNormalBufferitemSize = 3;
      this.moonVertexNormalBuffernumItems = $.toInt(normalData.length / 3);
      this.moonVertexTextureCoordBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34962, this.moonVertexTextureCoordBuffer);
      this.gl.bufferData$3(34962, $.Float32Array$fromList(textureCoordData), 35044);
      this.moonVertexTextureCoordBufferitemSize = 2;
      this.moonVertexTextureCoordBuffernumItems = $.toInt(textureCoordData.length / 2);
      this.moonVertexPositionBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34962, this.moonVertexPositionBuffer);
      this.gl.bufferData$3(34962, $.Float32Array$fromList(vertexPositionData), 35044);
      this.moonVertexPositionBufferitemSize = 3;
      this.moonVertexPositionBuffernumItems = $.toInt(vertexPositionData.length / 3);
      this.moonVertexIndexBuffer = this.gl.createBuffer$0();
      this.gl.bindBuffer$2(34963, this.moonVertexIndexBuffer);
      this.gl.bufferData$3(34963, $.Uint16Array$fromList(indexData), 35040);
      this.moonVertexIndexBufferitemSize = 1;
      this.moonVertexIndexBuffernumItems = indexData.length;
  }
 },
 _initShaders$0: function() {
  var fragmentShader = this._getShader$2(this.gl, '#shader-fs');
  var vertexShader = this._getShader$2(this.gl, '#shader-vs');
  this.shaderProgram = this.gl.createProgram$0();
  this.gl.attachShader$2(this.shaderProgram, vertexShader);
  this.gl.attachShader$2(this.shaderProgram, fragmentShader);
  this.gl.linkProgram$1(this.shaderProgram);
  if (this.gl.getProgramParameter$2(this.shaderProgram, 35714) !== true) {
    throw $.captureStackTrace('Could not initialise shaders');
  } else {
  }
  this.gl.useProgram$1(this.shaderProgram);
  this.vertexPositionAttribute = this.gl.getAttribLocation$2(this.shaderProgram, 'aVertexPosition');
  this.gl.enableVertexAttribArray$1(this.vertexPositionAttribute);
  this.textureCoordAttribute = this.gl.getAttribLocation$2(this.shaderProgram, 'aTextureCoord');
  this.gl.enableVertexAttribArray$1(this.textureCoordAttribute);
  this.vertexNormalAttribute = this.gl.getAttribLocation$2(this.shaderProgram, 'aVertexNormal');
  this.gl.enableVertexAttribArray$1(this.vertexNormalAttribute);
  this.pMatrixUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uPMatrix');
  this.mvMatrixUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uMVMatrix');
  this.nMatrixUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uNMatrix');
  this.samplerUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uSampler');
  this.useLightingUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uUseLighting');
  this.ambientColorUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uAmbientColor');
  this.pointLightingLocationUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uPointLightingLocation');
  this.pointLightingColorUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uPointLightingColor');
 },
 degToRad$1: function(degrees) {
  return $.div($.mul(degrees, 3.141592653589793), 180);
 },
 mvPopMatrix$0: function() {
  if (!$.eqB($.get$length(this.mvMatrixStack), 0)) {
    this.mvMatrix = $.removeLast(this.mvMatrixStack);
  } else {
  }
 },
 mvPushMatrix$0: function() {
  var c = this.mvMatrix.clone$0();
  $.add$1(this.mvMatrixStack, c);
 },
 _getShader$2: function(g, id) {
  return $.createShaderFromScriptElement(g, id);
 }
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_EventsImpl", "Object", ["_ptr"], {
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_type", "_ptr"], {
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._list, start, rangeLength));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_ptr"], {
 get$load: function() {
  return this._get$1('load');
 }
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("Matrix4", "Object", ["_dest"], {
 toString$0: function() {
  return $.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add('[', $.index(this._dest, 0)) + ', ', $.index(this._dest, 1)) + ', ', $.index(this._dest, 2)) + ', ', $.index(this._dest, 3)) + '\n' + '  ', $.index(this._dest, 4)) + ', ', $.index(this._dest, 5)) + ', ', $.index(this._dest, 6)) + ', ', $.index(this._dest, 7)) + '\n' + '  ', $.index(this._dest, 8)) + ', ', $.index(this._dest, 9)) + ', ', $.index(this._dest, 10)) + ', ', $.index(this._dest, 11)) + '\n' + '  ', $.index(this._dest, 12)) + ', ', $.index(this._dest, 13)) + ', ', $.index(this._dest, 14)) + ', ', $.index(this._dest, 15)) + ']';
 },
 rotate$3: function(angle, axis, dest) {
  var x = $.index(axis, 0);
  var y = $.index(axis, 1);
  var z = $.index(axis, 2);
  var len = $.sqrt($.add($.add($.mul(x, x), $.mul(y, y)), $.mul(z, z)));
  if (0 === len) {
    return;
  } else {
  }
  if (!$.eqB(len, 1)) {
    var len0 = $.div(1, len);
    var x0 = $.mul(x, len0);
    var y0 = $.mul(y, len0);
    var z0 = $.mul(z, len0);
    var y1 = y0;
    var z1 = z0;
    var x1 = x0;
  } else {
    y1 = y;
    z1 = z;
    x1 = x;
  }
  var s = $.sin(angle);
  var c = $.cos(angle);
  var t = $.sub(1, c);
  var a00 = $.index(this._dest, 0);
  var a01 = $.index(this._dest, 1);
  var a02 = $.index(this._dest, 2);
  var a03 = $.index(this._dest, 3);
  var a10 = $.index(this._dest, 4);
  var a11 = $.index(this._dest, 5);
  var a12 = $.index(this._dest, 6);
  var a13 = $.index(this._dest, 7);
  var a20 = $.index(this._dest, 8);
  var a21 = $.index(this._dest, 9);
  var a22 = $.index(this._dest, 10);
  var a23 = $.index(this._dest, 11);
  var b00 = $.add($.mul($.mul(x1, x1), t), c);
  var b01 = $.add($.mul($.mul(y1, x1), t), $.mul(z1, s));
  var b02 = $.sub($.mul($.mul(z1, x1), t), $.mul(y1, s));
  var b10 = $.sub($.mul($.mul(x1, y1), t), $.mul(z1, s));
  var b11 = $.add($.mul($.mul(y1, y1), t), c);
  var b12 = $.add($.mul($.mul(z1, y1), t), $.mul(x1, s));
  var b20 = $.add($.mul($.mul(x1, z1), t), $.mul(y1, s));
  var b21 = $.sub($.mul($.mul(y1, z1), t), $.mul(x1, s));
  var b22 = $.add($.mul($.mul(z1, z1), t), c);
  if ((void 0) === dest) {
    var out = this._dest;
  } else {
    $.indexSet(dest, 12, $.index(this._dest, 12));
    $.indexSet(dest, 13, $.index(this._dest, 13));
    $.indexSet(dest, 14, $.index(this._dest, 14));
    $.indexSet(dest, 15, $.index(this._dest, 15));
    out = dest;
  }
  $.indexSet(out, 0, $.add($.add($.mul(a00, b00), $.mul(a10, b01)), $.mul(a20, b02)));
  $.indexSet(out, 1, $.add($.add($.mul(a01, b00), $.mul(a11, b01)), $.mul(a21, b02)));
  $.indexSet(out, 2, $.add($.add($.mul(a02, b00), $.mul(a12, b01)), $.mul(a22, b02)));
  $.indexSet(out, 3, $.add($.add($.mul(a03, b00), $.mul(a13, b01)), $.mul(a23, b02)));
  $.indexSet(out, 4, $.add($.add($.mul(a00, b10), $.mul(a10, b11)), $.mul(a20, b12)));
  $.indexSet(out, 5, $.add($.add($.mul(a01, b10), $.mul(a11, b11)), $.mul(a21, b12)));
  $.indexSet(out, 6, $.add($.add($.mul(a02, b10), $.mul(a12, b11)), $.mul(a22, b12)));
  $.indexSet(out, 7, $.add($.add($.mul(a03, b10), $.mul(a13, b11)), $.mul(a23, b12)));
  $.indexSet(out, 8, $.add($.add($.mul(a00, b20), $.mul(a10, b21)), $.mul(a20, b22)));
  $.indexSet(out, 9, $.add($.add($.mul(a01, b20), $.mul(a11, b21)), $.mul(a21, b22)));
  $.indexSet(out, 10, $.add($.add($.mul(a02, b20), $.mul(a12, b21)), $.mul(a22, b22)));
  $.indexSet(out, 11, $.add($.add($.mul(a03, b20), $.mul(a13, b21)), $.mul(a23, b22)));
 },
 rotate$2: function(angle,axis) {
  return this.rotate$3(angle,axis,(void 0))
},
 translate$2: function(vec, dest) {
  var x = $.index(vec, 0);
  var y = $.index(vec, 1);
  var z = $.index(vec, 2);
  if ((void 0) === dest) {
    $.indexSet(this._dest, 12, $.add($.add($.add($.mul($.index(this._dest, 0), x), $.mul($.index(this._dest, 4), y)), $.mul($.index(this._dest, 8), z)), $.index(this._dest, 12)));
    $.indexSet(this._dest, 13, $.add($.add($.add($.mul($.index(this._dest, 1), x), $.mul($.index(this._dest, 5), y)), $.mul($.index(this._dest, 9), z)), $.index(this._dest, 13)));
    $.indexSet(this._dest, 14, $.add($.add($.add($.mul($.index(this._dest, 2), x), $.mul($.index(this._dest, 6), y)), $.mul($.index(this._dest, 10), z)), $.index(this._dest, 14)));
    $.indexSet(this._dest, 15, $.add($.add($.add($.mul($.index(this._dest, 3), x), $.mul($.index(this._dest, 7), y)), $.mul($.index(this._dest, 11), z)), $.index(this._dest, 15)));
  } else {
    var a00 = $.index(this._dest, 0);
    var a01 = $.index(this._dest, 1);
    var a02 = $.index(this._dest, 2);
    var a03 = $.index(this._dest, 3);
    var a10 = $.index(this._dest, 4);
    var a11 = $.index(this._dest, 5);
    var a12 = $.index(this._dest, 6);
    var a13 = $.index(this._dest, 7);
    var a20 = $.index(this._dest, 8);
    var a21 = $.index(this._dest, 9);
    var a22 = $.index(this._dest, 10);
    var a23 = $.index(this._dest, 11);
    $.indexSet(dest, 0, a00);
    $.indexSet(dest, 1, a01);
    $.indexSet(dest, 2, a02);
    $.indexSet(dest, 3, a03);
    $.indexSet(dest, 4, a10);
    $.indexSet(dest, 5, a11);
    $.indexSet(dest, 6, a12);
    $.indexSet(dest, 7, a13);
    $.indexSet(dest, 8, a20);
    $.indexSet(dest, 9, a21);
    $.indexSet(dest, 10, a22);
    $.indexSet(dest, 11, a23);
    $.indexSet(dest, 12, $.add($.add($.add($.mul(a00, x), $.mul(a10, y)), $.mul(a20, z)), $.index(this._dest, 12)));
    $.indexSet(dest, 13, $.add($.add($.add($.mul(a01, x), $.mul(a11, y)), $.mul(a21, z)), $.index(this._dest, 13)));
    $.indexSet(dest, 14, $.add($.add($.add($.mul(a02, x), $.mul(a12, y)), $.mul(a22, z)), $.index(this._dest, 14)));
    $.indexSet(dest, 15, $.add($.add($.add($.mul(a03, x), $.mul(a13, y)), $.mul(a23, z)), $.index(this._dest, 15)));
  }
 },
 translate$1: function(vec) {
  return this.translate$2(vec,(void 0))
},
 toInverseMat3$1: function(dest) {
  var a00 = $.index(this._dest, 0);
  var a01 = $.index(this._dest, 1);
  var a02 = $.index(this._dest, 2);
  var a10 = $.index(this._dest, 4);
  var a11 = $.index(this._dest, 5);
  var a12 = $.index(this._dest, 6);
  var a20 = $.index(this._dest, 8);
  var a21 = $.index(this._dest, 9);
  var a22 = $.index(this._dest, 10);
  var b01 = $.sub($.mul(a22, a11), $.mul(a12, a21));
  var b11 = $.add($.mul($.neg(a22), a10), $.mul(a12, a20));
  var b21 = $.sub($.mul(a21, a10), $.mul(a11, a20));
  var d = $.add($.add($.mul(a00, b01), $.mul(a01, b11)), $.mul(a02, b21));
  if (0 === d) {
    return;
  } else {
    var t0 = (void 0) === dest;
  }
  var id = $.div(1, d);
  if (t0) {
    var dest0 = $.Matrix3$0();
  } else {
    dest0 = dest;
  }
  $.indexSet(dest0, 0, $.mul(b01, id));
  $.indexSet(dest0, 1, $.mul($.add($.mul($.neg(a22), a01), $.mul(a02, a21)), id));
  $.indexSet(dest0, 2, $.mul($.sub($.mul(a12, a01), $.mul(a02, a11)), id));
  $.indexSet(dest0, 3, $.mul(b11, id));
  $.indexSet(dest0, 4, $.mul($.sub($.mul(a22, a00), $.mul(a02, a20)), id));
  $.indexSet(dest0, 5, $.mul($.add($.mul($.neg(a12), a00), $.mul(a02, a10)), id));
  $.indexSet(dest0, 6, $.mul(b21, id));
  $.indexSet(dest0, 7, $.mul($.add($.mul($.neg(a21), a00), $.mul(a01, a20)), id));
  $.indexSet(dest0, 8, $.mul($.sub($.mul(a11, a00), $.mul(a01, a10)), id));
  return dest0;
 },
 identity$0: function() {
  $.indexSet(this._dest, 0, 1);
  $.indexSet(this._dest, 1, 0);
  $.indexSet(this._dest, 2, 0);
  $.indexSet(this._dest, 3, 0);
  $.indexSet(this._dest, 4, 0);
  $.indexSet(this._dest, 5, 1);
  $.indexSet(this._dest, 6, 0);
  $.indexSet(this._dest, 7, 0);
  $.indexSet(this._dest, 8, 0);
  $.indexSet(this._dest, 9, 0);
  $.indexSet(this._dest, 10, 1);
  $.indexSet(this._dest, 11, 0);
  $.indexSet(this._dest, 12, 0);
  $.indexSet(this._dest, 13, 0);
  $.indexSet(this._dest, 14, 0);
  $.indexSet(this._dest, 15, 1);
 },
 clone$0: function() {
  return $.Matrix4$fromFloat32Array$1($.getRange(this._dest, 0, $.get$length(this._dest)));
 },
 get$array: function() {
  return this._dest;
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._dest, index, value);
  return value;
 },
 operator$index$1: function(index) {
  return $.index(this._dest, index);
 },
 Matrix4$0: function() {
  this._dest = $.Float32Array(16);
 },
 Matrix4$fromFloat32Array$1: function(list) {
  if (!$.eqB($.get$length(list), 16)) {
    throw $.captureStackTrace($.ExceptionImplementation$1('Matrix4.fromList requires Float32Array of exactly 16 items (' + $.stringToString($.get$length(list)) + ' given)'));
  } else {
  }
  this._dest = list;
 }
});

Isolate.$defineClass("Matrix3", "Object", ["_dest"], {
 transpose$1: function(dest) {
  if ($.eqNullB(dest)) {
    var a01 = $.index(this._dest, 1);
    var a02 = $.index(this._dest, 2);
    var a12 = $.index(this._dest, 5);
    $.indexSet(this._dest, 1, $.index(this._dest, 3));
    $.indexSet(this._dest, 2, $.index(this._dest, 6));
    $.indexSet(this._dest, 3, a01);
    $.indexSet(this._dest, 5, $.index(this._dest, 7));
    $.indexSet(this._dest, 6, a02);
    $.indexSet(this._dest, 7, a12);
  } else {
    $.indexSet(dest, 0, $.index(this._dest, 0));
    $.indexSet(dest, 1, $.index(this._dest, 3));
    $.indexSet(dest, 2, $.index(this._dest, 6));
    $.indexSet(dest, 3, $.index(this._dest, 1));
    $.indexSet(dest, 4, $.index(this._dest, 4));
    $.indexSet(dest, 5, $.index(this._dest, 7));
    $.indexSet(dest, 6, $.index(this._dest, 2));
    $.indexSet(dest, 7, $.index(this._dest, 5));
    $.indexSet(dest, 8, $.index(this._dest, 8));
  }
 },
 transpose$0: function() {
  return this.transpose$1((void 0))
},
 get$array: function() {
  return this._dest;
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._dest, index, value);
  return value;
 },
 operator$index$1: function(index) {
  return $.index(this._dest, index);
 },
 Matrix3$0: function() {
  this._dest = $.Float32Array(9);
 }
});

Isolate.$defineClass("Vector3", "Object", ["_unprojectVec", "_unprojectMat", "_items"], {
 toString$0: function() {
  return $.add($.add($.add('[', $.index(this._items, 0)) + ', ', $.index(this._items, 1)) + ', ', $.index(this._items, 2)) + ']';
 },
 length$0: function() {
  var x = $.index(this._items, 0);
  var y = $.index(this._items, 1);
  var z = $.index(this._items, 2);
  return $.sqrt($.add($.add($.mul(x, x), $.mul(y, y)), $.mul(z, z)));
 },
 get$length: function() { return new $.Closure11(this); },
 add$2: function(vec2, dest) {
  if ((void 0) === dest) {
    var t0 = this._items;
    var t1 = $.index(vec2, 0);
    $.indexSet(t0, 0, $.add($.index(t0, 0), t1));
    var t2 = this._items;
    var t3 = $.index(vec2, 1);
    $.indexSet(t2, 1, $.add($.index(t2, 1), t3));
    var t4 = this._items;
    var t5 = $.index(vec2, 2);
    $.indexSet(t4, 2, $.add($.index(t4, 2), t5));
  } else {
    $.indexSet(dest, 0, $.add($.index(this._items, 0), $.index(vec2, 0)));
    $.indexSet(dest, 1, $.add($.index(this._items, 1), $.index(vec2, 1)));
    $.indexSet(dest, 2, $.add($.index(this._items, 2), $.index(vec2, 2)));
  }
 },
 add$1: function(vec2) {
  return this.add$2(vec2,(void 0))
},
 get$array: function() {
  return this._items;
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._items, index, value);
  return value;
 },
 operator$index$1: function(index) {
  return $.index(this._items, index);
 },
 Vector3$fromValues$3: function(x, y, z) {
  this._items = $.Float32Array(3);
  $.indexSet(this._items, 0, x);
  $.indexSet(this._items, 1, y);
  $.indexSet(this._items, 2, z);
 },
 Vector3$fromList$1: function(list) {
  this._items = $.Float32Array$fromList(list);
 }
});

Isolate.$defineClass("Closure", "Closure8", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure2", "Closure8", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure3", "Closure8", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure4", "Closure8", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  } else {
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure5", "Closure8", ["this_3", "box_0"], {
 $call$1: function(e) {
  this.this_3.get$gl().pixelStorei$2(37440, 1);
  this.this_3.get$gl().bindTexture$2(3553, this.this_3.get$moonTexture());
  this.this_3.get$gl().texImage2D$6(3553, 0, 6408, 6408, 5121, this.box_0.moonTextureImage_1);
  this.this_3.get$gl().texParameteri$3(3553, 10240, 9729);
  this.this_3.get$gl().texParameteri$3(3553, 10241, 9985);
  this.this_3.get$gl().bindTexture$2(3553, this.this_3.get$moonTexture());
 }
});

Isolate.$defineClass("Closure6", "Closure8", ["this_4", "box_0"], {
 $call$1: function(e) {
  this.this_4.get$gl().pixelStorei$2(37440, 1);
  this.this_4.get$gl().bindTexture$2(3553, this.this_4.get$crateTexture());
  this.this_4.get$gl().texImage2D$6(3553, 0, 6408, 6408, 5121, this.box_0.crateTextureImage_2);
  this.this_4.get$gl().texParameteri$3(3553, 10240, 9729);
  this.this_4.get$gl().texParameteri$3(3553, 10241, 9985);
  this.this_4.get$gl().bindTexture$2(3553, this.this_4.get$crateTexture());
 }
});

Isolate.$defineClass("Closure7", "Closure8", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass('Closure9', 'Closure8', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self._tick$1(arg0); }
});
Isolate.$defineClass('Closure10', 'Closure8', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.load$0(); }
});
Isolate.$defineClass('Closure11', 'Closure8', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.length$0(); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  } else {
  }
  return a.operator$mul$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  } else {
  }
  return Math.floor(receiver);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  } else {
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.Float32Array$fromList = function(list) {
  return $._F32($.ensureNative(list));
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.isInfinite$0();
  } else {
  }
  var t0 = (receiver == Infinity);
  if (!t0) {
    var t1 = (receiver == -Infinity);
  } else {
    t1 = t0;
  }
  return t1;
};

$._U16 = function(arg) {
  return new Uint16Array(arg);;
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b) === true;
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    } else {
    }
  }
  return false;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    } else {
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        var startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.isJsArray = function(value) {
  var t0 = !(value === (void 0));
  if (t0) {
    var t1 = (value.constructor === Array);
  } else {
    t1 = t0;
  }
  return t1;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    var t0 = index < 0;
    if (!t0) {
      var t1 = $.geB(index, $.get$length(a));
    } else {
      t1 = t0;
    }
    if (t1) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  } else {
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  } else {
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.getWebGLContext = function(canvas) {
  return canvas.getContext$1('experimental-webgl');
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  } else {
  }
  return a.operator$ge$1(b);
};

$.ensureNative = function(list) {
  return list;
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.frustum = function(left, right, bottom, top$, near, far, dest) {
  var t0 = (void 0) === dest;
  if (t0) {
    var out = $.Float32Array(16);
  } else {
    out = dest;
  }
  var rl = $.sub(right, left);
  var tb = $.sub(top$, bottom);
  var fn = $.sub(far, near);
  $.indexSet(out, 0, $.div($.mul(near, 2), rl));
  $.indexSet(out, 1, 0);
  $.indexSet(out, 2, 0);
  $.indexSet(out, 3, 0);
  $.indexSet(out, 4, 0);
  $.indexSet(out, 5, $.div($.mul(near, 2), tb));
  $.indexSet(out, 6, 0);
  $.indexSet(out, 7, 0);
  $.indexSet(out, 8, $.div($.add(right, left), rl));
  $.indexSet(out, 9, $.div($.add(top$, bottom), tb));
  $.indexSet(out, 10, $.div($.neg($.add(far, near)), fn));
  $.indexSet(out, 11, -1);
  $.indexSet(out, 12, 0);
  $.indexSet(out, 13, 0);
  $.indexSet(out, 14, $.div($.neg($.mul($.mul(far, near), 2)), fn));
  $.indexSet(out, 15, 0);
  if (t0) {
    var t1 = $.Matrix4$fromFloat32Array$1(out);
  } else {
    t1 = (void 0);
  }
  return t1;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b) === true;
  }
  return t2;
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    } else {
    }
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  } else {
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  } else {
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  } else {
  }
  return name$;
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  } else {
  }
  return a.operator$tdiv$1(b);
};

$.convertDartClosureToJS = function(closure) {
  if (closure === (void 0)) {
    return;
  } else {
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  } else {
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arguments.length, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    var t0 = (typeof(name$)) === 'string';
    if (t0) {
      var t1 = $.isEmpty(name$) !== true;
    } else {
      t1 = t0;
    }
    if (t1) {
      var t2 = !(name$ === 'Object');
    } else {
      t2 = t1;
    }
    if (t2) {
      return name$;
    } else {
    }
  } else {
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  } else {
  }
  $.set$length(receiver, 0);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  } else {
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  } else {
  }
  return name$;
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  } else {
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    var result0 = result + t1;
  }
  return result;
};

$.Uint16Array$fromList = function(list) {
  return $._U16($.ensureNative(list));
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.Matrix4$fromFloat32Array$1 = function(list) {
  var t0 = new $.Matrix4((void 0));
  t0.Matrix4$fromFloat32Array$1(list);
  return t0;
};

$.sqrt = function(x) {
  return $.sqrt2(x);
};

$.sqrt2 = function(value) {
  return Math.sqrt($.checkNum(value));
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  } else {
  }
  return $dynamicMetadata;
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  } else {
  }
  if (0 === length$) {
    return [];
  } else {
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  } else {
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  } else {
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  } else {
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  return receiver.slice(start, end);
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
    var t0 = a0 > 0;
    var t1 = b0 > 31;
    if (t0) {
      if (t1) {
        return 0;
      } else {
      }
      return a0 >>> b0;
    } else {
    }
    if (t1) {
      var b1 = 31;
    } else {
      b1 = b0;
    }
    return (a0 >> b1) >>> 0;
  } else {
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  if (r === (void 0)) {
    var r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  } else {
    r0 = r;
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  } else {
  }
  return object;
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  } else {
  }
  if ($.ltB(start, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  } else {
  }
  var end = $.add(start, length$);
  if ($.gtB(end, a.length)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  } else {
  }
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  } else {
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) {
    var endIndex0 = length$;
  } else {
    endIndex0 = endIndex;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  } else {
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      a[key] = value;
      return;
    } else {
    }
  } else {
  }
  $.indexSet$slow(a, index, value);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure2(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure3(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  } else {
  }
  return a.operator$and$1(b);
};

$.gt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b);
  }
  return t2;
};

$.createShaderFromScriptElement = function(gl, id) {
  var shaderScript = $.document().query$1(id);
  var shaderSource = shaderScript.get$text();
  if ($.eqB(shaderScript.get$type(), 'x-shader/x-vertex')) {
    var shaderType = 35633;
  } else {
    if ($.eqB(shaderScript.get$type(), 'x-shader/x-fragment')) {
    } else {
      throw $.captureStackTrace($.ExceptionImplementation$1('*** Error: unknown shader type'));
    }
    shaderType = 35632;
  }
  return $.loadShader(gl, shaderSource, shaderType);
};

$.assert = function(condition) {
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$.Float32Array = function(length$) {
  return $._F32(length$);
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, result, inputTable, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.Vector3$fromValues$3 = function(x, y, z) {
  var t0 = new $.Vector3((void 0), (void 0), (void 0));
  t0.Vector3$fromValues$3(x, y, z);
  return t0;
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  } else {
  }
  return false;
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a * b);
  } else {
    t2 = $.mul$slow(a, b);
  }
  return t2;
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return res;
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  } else {
  }
  return a.operator$lt$1(b);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  } else {
  }
  return $.contains$2(receiver, other, 0);
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  } else {
  }
  return a.operator$negate$0();
};

$.index$slow = function(a, index) {
  var t0 = typeof a === 'string';
  if (!t0) {
    var t1 = $.isJsArray(a) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
    } else {
    }
    var t2 = $.ltB(index, 0);
    if (!t2) {
      var t3 = $.geB(index, $.get$length(a));
    } else {
      t3 = t2;
    }
    if (t3) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return a[index];
  } else {
  }
  return a.operator$index$1(index);
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    } else {
    }
    $._emitObject(t2, result, visiting);
    var first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  } else {
  }
  return a.operator$sub$1(b);
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  } else {
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length === 0;
  } else {
  }
  return receiver.isEmpty$0();
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.Vector3$fromList$1 = function(list) {
  var t0 = new $.Vector3((void 0), (void 0), (void 0));
  t0.Vector3$fromList$1(list);
  return t0;
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.perspective = function(fovy, aspect, near, far, dest) {
  var top$ = $.mul(near, $.tan($.div($.mul(fovy, 3.141592653589793), 360.0)));
  var right = $.mul(top$, aspect);
  return $.frustum($.neg(right), right, $.neg(top$), top$, near, far, dest);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  } else {
  }
  return receiver.iterator$0();
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.Matrix4$0 = function() {
  var t0 = new $.Matrix4((void 0));
  t0.Matrix4$0();
  return t0;
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toInt$0();
  } else {
  }
  if ($.isNaN(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  } else {
  }
  if ($.isInfinite(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  } else {
  }
  var truncated = $.truncate(receiver);
  if (truncated == -0.0) {
    var t0 = 0;
  } else {
    t0 = truncated;
  }
  return t0;
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.Example$0 = function() {
  return new $.Example((void 0), (void 0), (void 0), 0, 0.0, 180.0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  } else {
  }
  return receiver.add$1(value);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.ImageElement = function(src, height, width) {
  var _e = $._document().$dom_createElement$1('img');
  if (!$.eqNullB(src)) {
    _e.set$src(src);
  } else {
  }
  if (!$.eqNullB(height)) {
    _e.set$height(height);
  } else {
  }
  if (!$.eqNullB(width)) {
    _e.set$width(width);
  } else {
  }
  return _e;
};

$.tan = function(x) {
  return $.tan2(x);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.div = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a / b);
  } else {
    t2 = $.div$slow(a, b);
  }
  return t2;
};

$.tan2 = function(value) {
  return Math.tan($.checkNum(value));
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  var t0 = !(f === (void 0));
  if (t0) {
    var t1 = (!!f.methods);
  } else {
    t1 = t0;
  }
  if (t1) {
    return f.methods;
  } else {
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC6)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  } else {
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.geB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b) === true;
  }
  return t2;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  } else {
  }
  return result;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  if ($.charCodeAt(name$, 0) === 36) {
    var name0 = $.substring$1(name$, 1);
  } else {
    name0 = name$;
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$.add = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a + b);
  } else {
    t2 = $.add$slow(a, b);
  }
  return t2;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    } else {
    }
    return receiver.pop();
  } else {
  }
  return receiver.removeLast$0();
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    } else {
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    } else {
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  } else {
  }
  return a.operator$gt$1(b);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.regExpMakeNative = function(regExp, global) {
  var t0 = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(t0);
  var t1 = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(t1, 'm');
  } else {
  }
  if (ignoreCase === true) {
    $.add$1(t1, 'i');
  } else {
  }
  if (global === true) {
    $.add$1(t1, 'g');
  } else {
  }
  try {
    return new RegExp(t0, $.toString(t1));
  }catch (t2) {
    var t3 = $.unwrapException(t2);
    var t4 = t3;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(t0, (String(t4))));
  }
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  } else {
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  } else {
  }
  return name$;
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  } else {
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  } else {
  }
  if (value === (void 0)) {
    return 'null';
  } else {
  }
  if (typeof value == "function") {
    return 'Closure';
  } else {
  }
  return String(value);
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  } else {
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  } else {
  }
  var length$ = (receiver.length);
  for (var i = 0, hash = 0; i < length$; i = i0, hash = hash0) {
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    var hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  } else {
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  } else {
  }
  return other == receiver.substring(0, length$);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure4(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var t0 = method === (void 0);
  if (t0) {
    var t1 = !($._dynamicMetadata2() === (void 0));
  } else {
    t1 = t0;
  }
  if (t1) {
    for (var method0 = method, i = 0; method1 = method0, $.ltB(i, $.get$length($._dynamicMetadata2())); method0 = method2, i = i0) {
      var entry = $.index($._dynamicMetadata2(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method1 = method3;
          break;
        } else {
        }
        var method2 = method3;
      } else {
        method2 = method0;
      }
      var i0 = i + 1;
    }
  } else {
    method1 = method;
  }
  if (method1 === (void 0)) {
    var method4 = (methods['Object']);
  } else {
    method4 = method1;
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method4 === (void 0)) {
    var method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  } else {
    method5 = method4;
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  } else {
  }
  return nullCheckMethod.apply(obj, arguments$);
  var method1;
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  } else {
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC4) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      return a[key];
    } else {
    }
  } else {
  }
  return $.index$slow(a, index);
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.Matrix3$0 = function() {
  var t0 = new $.Matrix3((void 0));
  t0.Matrix3$0();
  return t0;
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  } else {
  }
  return receiver.toLowerCase();
};

$.sin = function(x) {
  return $.sin2(x);
};

$.sin2 = function(value) {
  return Math.sin($.checkNum(value));
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toDouble$0();
  } else {
  }
  return receiver;
};

$.parseDouble = function(str) {
  return $.parseDouble2(str);
};

$.List = function(length$) {
  return $.newList(length$);
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.parseDouble2 = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  var t0 = ret === 0;
  if (t0) {
    var t1 = $.startsWith(str, '0x') === true;
    if (!t1) {
      var t2 = $.startsWith(str, '0X') === true;
    } else {
      t2 = t1;
    }
  } else {
    t2 = t0;
  }
  if (t2) {
    var ret0 = (parseInt(str));
  } else {
    ret0 = ret;
  }
  var t3 = $.isNaN(ret0) === true;
  if (t3) {
    var t4 = !$.eqB(str, 'NaN');
  } else {
    t4 = t3;
  }
  if (t4) {
    var t5 = !$.eqB(str, '-NaN');
  } else {
    t5 = t4;
  }
  if (t5) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  } else {
  }
  return ret0;
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    } else {
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      } else {
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      } else {
      }
      if (start < 0) {
        return -1;
      } else {
      }
      return receiver.indexOf(element, start);
    } else {
    }
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  } else {
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  } else {
  }
  return a.operator$div$1(b);
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b) === true;
  }
  return t2;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  } else {
  }
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0)) === true;
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$._F32 = function(arg) {
  return new Float32Array(arg);;
};

$.loadShader = function(gl, shaderSource, shaderType) {
  var shader = gl.createShader$1(shaderType);
  gl.shaderSource$2(shader, shaderSource);
  gl.compileShader$1(shader);
  return shader;
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.document = function() {
  return document;;
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      } else {
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
  }
  return a.operator$add$1(b);
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  } else {
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    var t2 = length$ < 0;
  } else {
    t2 = t1;
  }
  if (t2) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.Example$0().init$0();
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.lt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b);
  }
  return t2;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
    if (ex instanceof TypeError) {
      var type = (ex.type);
      var name$ = (ex.arguments ? ex.arguments[0] : "");
      var t0 = $.eqB(type, 'property_not_function');
      if (!t0) {
        var t1 = $.eqB(type, 'called_non_callable');
      } else {
        t1 = t0;
      }
      if (!t1) {
        var t2 = $.eqB(type, 'non_object_property_call');
      } else {
        t2 = t1;
      }
      if (!t2) {
        var t3 = $.eqB(type, 'non_object_property_load');
      } else {
        t3 = t2;
      }
      if (t3) {
        var t4 = typeof name$ === 'string';
        if (t4) {
          var t5 = $.startsWith(name$, '$call$') === true;
        } else {
          t5 = t4;
        }
        if (t5) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NullPointerException$2((void 0), $.CTC);
        }
      } else {
        if ($.eqB(type, 'undefined_method')) {
          var t6 = typeof name$ === 'string';
          if (t6) {
            var t7 = $.startsWith(name$, '$call$') === true;
          } else {
            t7 = t6;
          }
          if (t7) {
            return $.ObjectNotClosureException$0();
          } else {
            return $.NoSuchMethodException$4('', name$, [], (void 0));
          }
        } else {
        }
      }
    } else {
      if (ex instanceof RangeError) {
        var message = (ex.message);
        var t8 = typeof message === 'string';
        if (t8) {
          var t9 = $.contains$1(message, 'call stack') === true;
        } else {
          t9 = t8;
        }
        if (t9) {
          return $.StackOverflowException$0();
        } else {
        }
      } else {
      }
    }
  }
  return ex;
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  } else {
  }
  return Math.ceil(receiver);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  } else {
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.cos2 = function(value) {
  return Math.cos($.checkNum(value));
};

$.cos = function(x) {
  return $.cos2(x);
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$.sub = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a - b);
  } else {
    t2 = $.sub$slow(a, b);
  }
  return t2;
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      } else {
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      } else {
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      } else {
      }
      var i = start;
      L0: while (true) {
        if (!$.ltB(i, end)) break L0;
        $.add$1(accumulator, $.index(a, i));
        i = $.add(i, 1);
      }
      return accumulator;
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        } else {
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            var startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      result = env0;
      t0 = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC3 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC5 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC4 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC6 = new Isolate.$isolateProperties.Object();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$._getTypeNameOf = (void 0);
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$CanvasElement', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$WebGLRenderingContext', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "height="], {
});

$.$defineNativeClass('Attr', ["value?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('AudioParam', ["value?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 clear$1: function(arg0) { return this.clear.$call$1(arg0); }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLButtonElement', ["value?", "type?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$src: function(value) {
  this.setProperty$3('src', value, '');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 clear$1: function(arg0) { return this.get$clear().$call$1(arg0); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 },
 is$CanvasElement: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "height?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value?"], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDocument', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);;
 },
 query$1: function(selectors) {
  if ($.CTC3.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  } else {
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 get$translate: function() {
  return false;
 },
 translate$1: function(arg0) { return this.get$translate().$call$1(arg0); }
});

$.$defineNativeClass('Element', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 translate$1: function(arg0) { return this.translate.$call$1(arg0); },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "type?", "src!", "height="], {
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?"], {
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "src!", "height?"], {
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["width=", "src!", "height="], {
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value?", "type?", "src!", "pattern?", "height=", "checked?"], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?"], {
});

$.$defineNativeClass('HTMLLIElement', ["value?", "type?"], {
});

$.$defineNativeClass('HTMLLinkElement', ["type?"], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height="], {
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', ["src!"], {
 load$0: function() {
  return this.load();
 },
 get$load: function() { return new $.Closure10(this); },
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMeterElement', ["value?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$text: function() {
  return this.textContent;;
 }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('NodeSelector', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "type?", "height="], {
});

$.$defineNativeClass('OperationNotAllowedException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLOptionElement', ["value?"], {
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value?", "type?"], {
});

$.$defineNativeClass('HTMLParamElement', ["value?", "type?"], {
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
});

$.$defineNativeClass('HTMLProgressElement', ["value?"], {
});

$.$defineNativeClass('RadioNodeList', ["value?"], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAngle', ["value?"], {
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["width?", "height?", "type?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFETileElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["width?", "height?", "type?"], {
});

$.$defineNativeClass('SVGFilterElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGFilterPrimitiveStandardAttributes', ["width?", "height?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGImageElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGLength', ["value?"], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGNumber', ["value?"], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPatternElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGRect', ["width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["width?", "height?"], {
});

$.$defineNativeClass('SVGSVGElement', ["width?", "height?"], {
 viewport$4: function(arg0, arg1, arg2, arg3) { return this.viewport.$call$4(arg0, arg1, arg2, arg3); }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 rotate$2: function(arg0, arg1) { return this.rotate.$call$2(arg0, arg1); }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["width?", "height?"], {
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type?", "src!"], {
});

$.$defineNativeClass('HTMLSelectElement', ["value?", "type?", "length="], {
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type?", "src!"], {
});

$.$defineNativeClass('SpeechGrammar', ["src!"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    } else {
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height="], {
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["value?", "type?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text="], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["src!"], {
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
});

$.$defineNativeClass('WebGLActiveInfo', ["type?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 viewport$4: function(x, y, width, height) {
  return this.viewport(x,y,width,height);
 },
 vertexAttribPointer$6: function(indx, size, type, normalized, stride, offset) {
  return this.vertexAttribPointer(indx,size,type,normalized,stride,offset);
 },
 useProgram$1: function(program) {
  return this.useProgram(program);
 },
 uniformMatrix4fv$3: function(location, transpose, array) {
  return this.uniformMatrix4fv(location,transpose,array);
 },
 uniformMatrix3fv$3: function(location, transpose, array) {
  return this.uniformMatrix3fv(location,transpose,array);
 },
 uniform3f$4: function(location, x, y, z) {
  return this.uniform3f(location,x,y,z);
 },
 uniform1i$2: function(location, x) {
  return this.uniform1i(location,x);
 },
 texParameteri$3: function(target, pname, param) {
  return this.texParameteri(target,pname,param);
 },
 texImage2D$9: function(target, level, internalformat, format_OR_width, height_OR_type, border_OR_canvas_OR_image_OR_pixels_OR_video, format, type, pixels) {
  return this.texImage2D(target,level,internalformat,format_OR_width,height_OR_type,border_OR_canvas_OR_image_OR_pixels_OR_video,format,type,pixels);
 },
 texImage2D$6: function(target,level,internalformat,format_OR_width,height_OR_type,border_OR_canvas_OR_image_OR_pixels_OR_video) {
  return this.texImage2D(target,level,internalformat,format_OR_width,height_OR_type,border_OR_canvas_OR_image_OR_pixels_OR_video);
},
 shaderSource$2: function(shader, string) {
  return this.shaderSource(shader,string);
 },
 pixelStorei$2: function(pname, param) {
  return this.pixelStorei(pname,param);
 },
 linkProgram$1: function(program) {
  return this.linkProgram(program);
 },
 getUniformLocation$2: function(program, name) {
  return this.getUniformLocation(program,name);
 },
 getProgramParameter$2: function(program, pname) {
  return this.getProgramParameter(program,pname);
 },
 getAttribLocation$2: function(program, name) {
  return this.getAttribLocation(program,name);
 },
 enableVertexAttribArray$1: function(index) {
  return this.enableVertexAttribArray(index);
 },
 enable$1: function(cap) {
  return this.enable(cap);
 },
 drawElements$4: function(mode, count, type, offset) {
  return this.drawElements(mode,count,type,offset);
 },
 createTexture$0: function() {
  return this.createTexture();
 },
 createShader$1: function(type) {
  return this.createShader(type);
 },
 createProgram$0: function() {
  return this.createProgram();
 },
 createBuffer$0: function() {
  return this.createBuffer();
 },
 compileShader$1: function(shader) {
  return this.compileShader(shader);
 },
 clearColor$4: function(red, green, blue, alpha) {
  return this.clearColor(red,green,blue,alpha);
 },
 clear$1: function(mask) {
  return this.clear(mask);
 },
 bufferData$3: function(target, data_OR_size, usage) {
  return this.bufferData(target,data_OR_size,usage);
 },
 bindTexture$2: function(target, texture) {
  return this.bindTexture(target,texture);
 },
 bindBuffer$2: function(target, buffer) {
  return this.bindBuffer(target,buffer);
 },
 attachShader$2: function(program, shader) {
  return this.attachShader(program,shader);
 },
 activeTexture$1: function(texture) {
  return this.activeTexture(texture);
 },
 is$WebGLRenderingContext: function() { return true; }
});

$.$defineNativeClass('WebSocket', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMWindow', ["length?"], {
 webkitRequestAnimationFrame$1: function(callback) {
  return this.webkitRequestAnimationFrame($.convertDartClosureToJS(callback));
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 }
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

// 202 dynamic classes.
// 350 classes
// 30 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v2/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v3/*class(_ElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGComponentTransferFunctionElementImpl)*/,v2/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v4/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v5/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v6/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v7/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v8/*class(_NodeImpl)*/ = [v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v9/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v10/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v11/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v11/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['WorkerContext', v7/*class(_WorkerContextImpl)*/],
    ['CSSRule', 'CSSRule|WebKitCSSRegionRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v6/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v5/*class(_DocumentImpl)*/],
    ['DocumentFragment', v4/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v1/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['HTMLMediaElement', v2/*class(_MediaElementImpl)*/],
    ['Element', v3/*class(_ElementImpl)*/],
    ['Event', 'Event|WebGLContextEvent|UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'],
    ['Node', v8/*class(_NodeImpl)*/],
    ['MediaStream', v9/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v10/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v7/*class(_WorkerContextImpl)*/,v8/*class(_NodeImpl)*/,v9/*class(_MediaStreamImpl)*/,v10/*class(_IDBRequestImpl)*/,v11/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
