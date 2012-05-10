function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_lib3_msg"], {
 toString$0: function() {
  if (this._lib3_msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._lib3_msg);
  }
  return t0;
 },
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_lib3_numberOfDeleted", "_lib3_numberOfEntries", "_lib3_loadLimit", "_lib3_values", "_lib3_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._lib3_probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._lib3_keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(f, 1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    var key = $.index(this._lib3_keys, i);
    if (key !== (void 0) && key !== $.CTC4) {
      f.$call$2(key, $.index(this._lib3_values, i));
    }
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._lib3_keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        var key = $.index(this._lib3_keys, i);
        if (key !== (void 0) && key !== $.CTC4) {
          f.$call$2(key, $.index(this._lib3_values, i));
        }
        i = i + 1;
      }
  }
 },
 get$length: function() {
  return this._lib3_numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._lib3_numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._lib3_probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._lib3_values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._lib3_ensureCapacity$0();
  var index = this._lib3_probeForAdding$1(key);
  if ($.index(this._lib3_keys, index) === (void 0) || $.index(this._lib3_keys, index) === $.CTC4) {
    this._lib3_numberOfEntries = $.add(this._lib3_numberOfEntries, 1);
  }
  $.indexSet(this._lib3_keys, index, key);
  $.indexSet(this._lib3_values, index, value);
 },
 clear$0: function() {
  this._lib3_numberOfEntries = 0;
  this._lib3_numberOfDeleted = 0;
  var length$ = $.get$length(this._lib3_keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    $.indexSet(this._lib3_keys, i, (void 0));
    $.indexSet(this._lib3_values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      this._lib3_numberOfEntries = 0;
      this._lib3_numberOfDeleted = 0;
      var length$ = $.get$length(this._lib3_keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        $.indexSet(this._lib3_keys, i, (void 0));
        $.indexSet(this._lib3_values, i, (void 0));
        i = i + 1;
      }
  }
 },
 _lib3_grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._lib3_keys);
  if (typeof capacity !== 'number') return this._lib3_grow$1$bailout(newCapacity, 1, capacity);
  this._lib3_loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._lib3_keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._lib3_grow$1$bailout(newCapacity, 2, capacity, oldKeys);
  var oldValues = this._lib3_values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._lib3_grow$1$bailout(newCapacity, 3, capacity, oldKeys, oldValues);
  this._lib3_keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._lib3_values = t0;
  for (var i = 0; i < capacity; i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC4) {
      continue;
    }
    var t3 = oldValues.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t4 = oldValues[i];
    var newIndex = this._lib3_probeForAdding$1(t2);
    $.indexSet(this._lib3_keys, newIndex, t2);
    $.indexSet(this._lib3_values, newIndex, t4);
  }
  this._lib3_numberOfDeleted = 0;
 },
 _lib3_grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      break;
    case 3:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._lib3_keys);
    case 1:
      state = 0;
      this._lib3_loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._lib3_keys;
    case 2:
      state = 0;
      var oldValues = this._lib3_values;
    case 3:
      state = 0;
      this._lib3_keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._lib3_values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC4) {
            break c$0;
          }
          var value = $.index(oldValues, i);
          var newIndex = this._lib3_probeForAdding$1(key);
          $.indexSet(this._lib3_keys, newIndex, key);
          $.indexSet(this._lib3_values, newIndex, value);
        }
        i = i + 1;
      }
      this._lib3_numberOfDeleted = 0;
  }
 },
 _lib3_ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._lib3_numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._lib3_loadLimit)) {
    this._lib3_grow$1($.mul($.get$length(this._lib3_keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._lib3_keys), newNumberOfEntries), this._lib3_numberOfDeleted);
  if ($.gtB(this._lib3_numberOfDeleted, numberOfFree)) {
    this._lib3_grow$1($.get$length(this._lib3_keys));
  }
 },
 _lib3_probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib3_keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    numberOfProbes0 = numberOfProbes;
    hash0 = hash;
    var existingKey = $.index(this._lib3_keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes1 = numberOfProbes + 1;
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._lib3_keys));
    numberOfProbes0 = numberOfProbes1;
    hash0 = hash1;
  }
 },
 _lib3_probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib3_keys));
  if (hash !== (hash | 0)) return this._lib3_probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    numberOfProbes0 = numberOfProbes;
    hash1 = hash0;
    insertionIndex0 = insertionIndex;
    var existingKey = $.index(this._lib3_keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        insertionIndex0 = insertionIndex;
        if ($.ltB(insertionIndex, 0) && $.CTC4 === existingKey) {
          insertionIndex0 = hash0;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._lib3_keys));
    numberOfProbes0 = numberOfProbes1;
    hash1 = hash2;
  }
 },
 _lib3_probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._lib3_keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var numberOfProbes0 = numberOfProbes;
        var hash1 = hash0;
        var insertionIndex0 = insertionIndex;
        var existingKey = $.index(this._lib3_keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            insertionIndex0 = insertionIndex;
            if ($.ltB(insertionIndex, 0) && $.CTC4 === existingKey) {
              insertionIndex0 = hash0;
            }
            var numberOfProbes1 = numberOfProbes + 1;
          }
        }
        var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._lib3_keys));
        numberOfProbes0 = numberOfProbes1;
        hash1 = hash2;
        numberOfProbes = numberOfProbes0;
        hash0 = hash1;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._lib3_numberOfEntries = 0;
  this._lib3_numberOfDeleted = 0;
  this._lib3_loadLimit = $._computeLoadLimit(8);
  this._lib3_keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._lib3_values = t0;
 },
 is$Map: true,
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_lib3_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._lib3_backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib3_backingMap);
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._lib3_backingMap, new $.Closure6(t0));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure5(this));
 },
 contains$1: function(value) {
  return this._lib3_backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._lib3_backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._lib3_backingMap);
 },
 HashSetImplementation$0: function() {
  this._lib3_backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; },
});

Isolate.$defineClass("HashSetIterator", "Object", ["_lib3_nextValidIndex", "_lib3_entries"], {
 _lib3_advance$0: function() {
  var length$ = $.get$length(this._lib3_entries);
  if (typeof length$ !== 'number') return this._lib3_advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t0 = $.add(this._lib3_nextValidIndex, 1);
    this._lib3_nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    }
    entry = $.index(this._lib3_entries, this._lib3_nextValidIndex);
  } while (entry === (void 0) || entry === $.CTC4);
 },
 _lib3_advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._lib3_entries);
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t0 = $.add(this._lib3_nextValidIndex, 1);
        this._lib3_nextValidIndex = t0;
        if ($.geB(t0, length$)) {
          break;
        }
        entry = $.index(this._lib3_entries, this._lib3_nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC4)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var res = $.index(this._lib3_entries, this._lib3_nextValidIndex);
  this._lib3_advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._lib3_nextValidIndex, $.get$length(this._lib3_entries))) {
    return false;
  }
  if ($.index(this._lib3_entries, this._lib3_nextValidIndex) === $.CTC4) {
    this._lib3_advance$0();
  }
  return $.lt(this._lib3_nextValidIndex, $.get$length(this._lib3_entries));
 },
 HashSetIterator$1: function(set_) {
  this._lib3_advance$0();
 },
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_lib3_length", "_lib3_buffer"], {
 toString$0: function() {
  if ($.get$length(this._lib3_buffer) === 0) {
    return '';
  }
  if ($.get$length(this._lib3_buffer) === 1) {
    return $.index(this._lib3_buffer, 0);
  }
  var result = $.concatAll(this._lib3_buffer);
  $.clear(this._lib3_buffer);
  $.add$1(this._lib3_buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._lib3_buffer = t0;
  this._lib3_length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t0 = $.iterator(objects); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._lib3_buffer, str);
  this._lib3_length = $.add(this._lib3_length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._lib3_length === 0;
 },
 get$length: function() {
  return this._lib3_length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 },
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._lib3_AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true,
});

Isolate.$defineClass("MatchImplementation", "Object", ["_lib3_groups", "_lib3_end", "_lib3_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._lib3_groups, index);
 },
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_lib3_str", "_lib3_re"], {
 iterator$0: function() {
  return $._lib3_AllMatchesIterator$2(this._lib3_re, this._lib3_str);
 },
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_lib3_done", "_lib3_next", "_lib3_str", "_lib3_re"], {
 hasNext$0: function() {
  if (this._lib3_done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._lib3_next)) {
      return true;
    }
  }
  this._lib3_next = this._lib3_re.firstMatch$1(this._lib3_str);
  if ($.eqNullB(this._lib3_next)) {
    this._lib3_done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var next = this._lib3_next;
  this._lib3_next = (void 0);
  return next;
 },
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 },
});

Isolate.$defineClass("Closure7", "Object", [], {
 toString$0: function() {
  return 'Closure';
 },
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib5_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 },
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_lib2_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._lib2_index);
 },
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_lib2_existingArgumentNames", "_lib2_arguments", "_lib2_functionName", "_lib2_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._lib2_arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    }
    sb.add$1($.index(this._lib2_arguments, i));
  }
  if (this._lib2_existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._lib2_functionName) + '\'\nReceiver: ' + $.stringToString(this._lib2_receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._lib2_existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      }
      sb0.add$1($.index(this._lib2_existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._lib2_functionName) + '\'\nReceiver: ' + $.stringToString(this._lib2_receiver) + '\nTried calling: ' + $.stringToString(this._lib2_functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._lib2_functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 },
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 },
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_lib2_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._lib2_arg);
 },
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 },
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
 },
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 },
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_lib2_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._lib2_message);
 },
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_lib2_errmsg", "_lib2_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._lib2_pattern) + '\' \'' + $.stringToString(this._lib2_errmsg) + '\'';
 },
});

Isolate.$defineClass("Lesson05", "Object", [], {
 run$0: function() {
  $.example$0().Init$0();
 },
});

Isolate.$defineClass("example", "Object", ["lastTime", "rCube", "rPyramid", "cubeVertexIndexBuffernumItems", "cubeVertexIndexBufferitemSize", "cubeVertexColorBuffernumItems", "cubeVertexColorBufferitemSize", "cubeVertexPositionBuffernumItems", "cubeVertexPositionBufferitemSize", "pyramidVertexColorBuffernumItems", "pyramidVertexColorBufferitemSize", "pyramidVertexPositionBuffernumItems", "pyramidVertexPositionBufferitemSize", "cubeVertexIndexBuffer", "cubeVertexColorBuffer", "cubeVertexPositionBuffer", "pyramidVertexColorBuffer", "pyramidVertexPositionBuffer", "mvMatrixStack", "mvMatrix", "pMatrix", "mvMatrixUniform", "pMatrixUniform", "vertexColorAttribute", "vertexPositionAttribute", "shaderProgram", "vertexShader", "fragmentShader", "vertexShaderSource", "fragmentShaderSource", "gl", "canvas"], {
 Init$0: function() {
  this.mvMatrixStack = [];
  this.canvas = $.document().getElementById$1('canvas');
  this.gl = this.canvas.getContext$1('experimental-webgl');
  this.gl.viewport$4(0, 0, this.canvas.get$width(), this.canvas.get$height());
  this._lib_createShaders$0();
  this._lib_createBuffers$0();
  this.gl.clearColor$4(0.0, 0.0, 0.0, 1.0);
  this.gl.enable$1(2929);
  this._lib_tick$1(0);
 },
 _lib_animate$0: function() {
  this.rPyramid = $.add(this.rPyramid, 90);
  this.rCube = $.sub(this.rCube, 75);
 },
 _lib_drawScene$0: function() {
  this.gl.viewport$4(0, 0, this.canvas.get$width(), this.canvas.get$height());
  this.gl.clear$1(16640);
  this.pMatrix = $.perspective(45.0, $.div(this.canvas.get$width(), this.canvas.get$height()), 0.1, 100.0);
  this.mvMatrix = $.translation($.Vector3$3(-1.5, 0.0, -8.0));
  this._lib_mvPushMatrix$0();
  this.mvMatrix = $.mul(this.mvMatrix, $.rotation(this._lib_degToRad$1(this.rPyramid), $.Vector3$3(0.0, 1.0, 0.0)));
  this.gl.bindBuffer$2(34962, this.pyramidVertexPositionBuffer);
  this.gl.vertexAttribPointer$6(this.vertexPositionAttribute, this.pyramidVertexPositionBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34962, this.pyramidVertexColorBuffer);
  this.gl.vertexAttribPointer$6(this.vertexColorAttribute, this.pyramidVertexColorBufferitemSize, 5126, false, 0, 0);
  this._lib_setMatrixUniforms$0();
  this.gl.drawArrays$3(4, 0, this.pyramidVertexPositionBuffernumItems);
  this._lib_mvPopMatrix$0();
  this.mvMatrix = $.mul(this.mvMatrix, $.translation($.Vector3$3(3.0, 0.0, 0.0)));
  this._lib_mvPushMatrix$0();
  this.mvMatrix = $.mul(this.mvMatrix, $.rotation(this._lib_degToRad$1(this.rCube), $.Vector3$3(1.0, 1.0, 1.0)));
  this.gl.bindBuffer$2(34962, this.cubeVertexPositionBuffer);
  this.gl.vertexAttribPointer$6(this.vertexPositionAttribute, this.cubeVertexPositionBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34962, this.cubeVertexColorBuffer);
  this.gl.vertexAttribPointer$6(this.vertexColorAttribute, this.cubeVertexColorBufferitemSize, 5126, false, 0, 0);
  this.gl.bindBuffer$2(34963, this.cubeVertexIndexBuffer);
  this._lib_setMatrixUniforms$0();
  this.gl.drawElements$4(4, this.cubeVertexIndexBuffernumItems, 5123, 0);
  this._lib_mvPopMatrix$0();
 },
 _lib_mvPopMatrix$0: function() {
  if (!$.eqB($.get$length(this.mvMatrixStack), 0)) {
    this.mvMatrix = $.removeLast(this.mvMatrixStack);
  }
 },
 _lib_mvPushMatrix$0: function() {
  var c = $.mul(this.mvMatrix, $.identity());
  $.add$1(this.mvMatrixStack, c);
 },
 _lib_setMatrixUniforms$0: function() {
  this.gl.uniformMatrix4fv$3(this.pMatrixUniform, false, this.pMatrix.get$buf());
  this.gl.uniformMatrix4fv$3(this.mvMatrixUniform, false, this.mvMatrix.get$buf());
 },
 _lib_degToRad$1: function(degrees) {
  return $.div($.mul(degrees, 3.141592653589793), 180);
 },
 _lib_tick$1: function(t) {
  $.window().webkitRequestAnimationFrame$1(this.get$_lib_tick());
  this._lib_drawScene$0();
  this._lib_animate$0();
 },
 get$_lib_tick: function() { return new $.Closure8(this); },
 _lib_createBuffers$0: function() {
  this.pyramidVertexPositionBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.pyramidVertexPositionBuffer);
  var vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 1.0, 0.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 0.0, 1.0, 0.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 0.0, 1.0, 0.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0];
  this.gl.bufferData$3(34962, $.Float32Array$fromList(vertices), 35044);
  this.pyramidVertexPositionBufferitemSize = 3;
  this.pyramidVertexPositionBuffernumItems = 12;
  this.pyramidVertexColorBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.pyramidVertexColorBuffer);
  var colors = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0];
  this.gl.bufferData$3(34962, $.Float32Array$fromList(colors), 35044);
  this.pyramidVertexColorBufferitemSize = 4;
  this.pyramidVertexColorBuffernumItems = 12;
  this.cubeVertexPositionBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.cubeVertexPositionBuffer);
  var vertices0 = [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0];
  this.gl.bufferData$3(34962, $.Float32Array$fromList(vertices0), 35044);
  this.cubeVertexPositionBufferitemSize = 3;
  this.cubeVertexPositionBuffernumItems = 24;
  this.cubeVertexColorBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34962, this.cubeVertexColorBuffer);
  var colors0 = [[1.0, 0.0, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [1.0, 0.5, 0.5, 1.0], [1.0, 0.0, 1.0, 1.0], [0.0, 0.0, 1.0, 1.0]];
  var unpackedColors = [];
  for (var t0 = $.iterator(colors0); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    for (var j = 0; j < 4; j = j + 1) {
      $.addAll(unpackedColors, t1);
    }
  }
  this.gl.bufferData$3(34962, $.Float32Array$fromList(unpackedColors), 35044);
  this.cubeVertexColorBufferitemSize = 4;
  this.cubeVertexColorBuffernumItems = 24;
  this.cubeVertexIndexBuffer = this.gl.createBuffer$0();
  this.gl.bindBuffer$2(34963, this.cubeVertexIndexBuffer);
  var cubeVertexIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
  this.gl.bufferData$3(34963, $.Uint16Array$fromList(cubeVertexIndices), 35044);
  this.cubeVertexIndexBufferitemSize = 1;
  this.cubeVertexIndexBuffernumItems = 36;
 },
 _lib_createShaders$0: function() {
  this.fragmentShaderSource = '    precision mediump float;\n\n    varying vec4 vColor;\n\n    void main(void) {\n        gl_FragColor = vColor;\n    }\n    ';
  this.vertexShaderSource = ' \n    attribute vec3 aVertexPosition;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n\n    varying vec4 vColor;\n\n    void main(void) {\n        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n        vColor = aVertexColor;\n    }';
  this.fragmentShader = this.gl.createShader$1(35632);
  this.vertexShader = this.gl.createShader$1(35633);
  this.gl.shaderSource$2(this.fragmentShader, this.fragmentShaderSource);
  this.gl.compileShader$1(this.fragmentShader);
  this.gl.shaderSource$2(this.vertexShader, this.vertexShaderSource);
  this.gl.compileShader$1(this.vertexShader);
  this.shaderProgram = this.gl.createProgram$0();
  this.gl.attachShader$2(this.shaderProgram, this.vertexShader);
  this.gl.attachShader$2(this.shaderProgram, this.fragmentShader);
  this.gl.linkProgram$1(this.shaderProgram);
  this.gl.useProgram$1(this.shaderProgram);
  this.vertexPositionAttribute = this.gl.getAttribLocation$2(this.shaderProgram, 'aVertexPosition');
  this.gl.enableVertexAttribArray$1(this.vertexPositionAttribute);
  this.vertexColorAttribute = this.gl.getAttribLocation$2(this.shaderProgram, 'aVertexColor');
  this.gl.enableVertexAttribArray$1(this.vertexColorAttribute);
  this.pMatrixUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uPMatrix');
  this.mvMatrixUniform = this.gl.getUniformLocation$2(this.shaderProgram, 'uMVMatrix');
 },
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib4_length", "_lib4_pos", "_lib4_array"], {
 hasNext$0: function() {
  return $.gt(this._lib4_length, this._lib4_pos);
 },
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var t0 = this._lib4_array;
  var t1 = this._lib4_pos;
  this._lib4_pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._lib4_array), this._lib4_pos);
 },
});

Isolate.$defineClass("ZeroLengthVectorException", "Object", [], {
});

Isolate.$defineClass("Vector3", "Object", ["z?", "y?", "x?"], {
 toString$0: function() {
  return 'Vector3(' + $.stringToString(this.x) + ',' + $.stringToString(this.y) + ',' + $.stringToString(this.z) + ')';
 },
 operator$sub$1: function(other) {
  return $.Vector3$3($.sub(this.x, other.get$x()), $.sub(this.y, other.get$y()), $.sub(this.z, other.get$z()));
 },
 operator$negate$0: function() {
  return $.Vector3$3($.neg(this.x), $.neg(this.y), $.neg(this.z));
 },
 normalize$0: function() {
  var len = this.magnitude$0();
  if ($.eqB(len, 0.0)) {
    throw $.captureStackTrace($.ZeroLengthVectorException$0());
  }
  return $.Vector3$3($.div(this.x, len), $.div(this.y, len), $.div(this.z, len));
 },
 magnitude$0: function() {
  return $.sqrt($.add($.add($.mul(this.x, this.x), $.mul(this.y, this.y)), $.mul(this.z, this.z)));
 },
});

Isolate.$defineClass("Matrix4", "Object", ["buf?"], {
 operator$mul$1: function(matrixB) {
  var matrixC = $.Matrix4$0();
  var bufA = this.buf;
  if (typeof bufA !== 'string' && (typeof bufA !== 'object'||bufA.constructor !== Array)) return this.operator$mul$1$bailout(matrixB, 1, matrixC, bufA);
  var bufB = matrixB.get$buf();
  if (typeof bufB !== 'string' && (typeof bufB !== 'object'||bufB.constructor !== Array)) return this.operator$mul$1$bailout(matrixB, 2, bufA, matrixC, bufB);
  var bufC = matrixC.buf;
  if (typeof bufC !== 'object'||bufC.constructor !== Array||!!bufC.immutable$list) return this.operator$mul$1$bailout(matrixB, 3, bufA, bufB, matrixC, bufC);
  for (var row = 0; row < 4; row = row + 1) {
    for (var col = 0; col < 4; col = col + 1) {
      for (var i = 0; i < 4; i = i + 1) {
        var t0 = $.rc(row, col);
        var t1 = $.rc(row, i);
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        var t2 = bufA.length;
        if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
        var t3 = bufA[t1];
        var t4 = $.rc(i, col);
        if (t4 !== (t4 | 0)) throw $.iae(t4);
        var t5 = bufB.length;
        if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
        var t6 = $.mul(t3, bufB[t4]);
        if (t0 !== (t0 | 0)) throw $.iae(t0);
        var t7 = bufC.length;
        if (t0 < 0 || t0 >= t7) throw $.ioore(t0);
        var t8 = $.add(bufC[t0], t6);
        var t9 = bufC.length;
        if (t0 < 0 || t0 >= t9) throw $.ioore(t0);
        bufC[t0] = t8;
      }
    }
  }
  return matrixC;
 },
 operator$mul$1$bailout: function(matrixB, state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      matrixC = env0;
      bufA = env1;
      break;
    case 2:
      bufA = env0;
      matrixC = env1;
      bufB = env2;
      break;
    case 3:
      bufA = env0;
      bufB = env1;
      matrixC = env2;
      bufC = env3;
      break;
  }
  switch (state) {
    case 0:
      var matrixC = $.Matrix4$0();
      var bufA = this.buf;
    case 1:
      state = 0;
      var bufB = matrixB.get$buf();
    case 2:
      state = 0;
      var bufC = matrixC.buf;
    case 3:
      state = 0;
      var row = 0;
      L0: while (true) {
        if (!(row < 4)) break L0;
        var col = 0;
        L1: while (true) {
          if (!(col < 4)) break L1;
          var i = 0;
          L2: while (true) {
            if (!(i < 4)) break L2;
            var t0 = $.rc(row, col);
            var t1 = $.mul($.index(bufA, $.rc(row, i)), $.index(bufB, $.rc(i, col)));
            $.indexSet(bufC, t0, $.add($.index(bufC, t0), t1));
            i = i + 1;
          }
          col = col + 1;
        }
        row = row + 1;
      }
      return matrixC;
  }
 },
 toString$0: function() {
  var rows = $.List((void 0));
  for (var row = 0; row < 4; row = row + 1) {
    var items = $.List((void 0));
    for (var col = 0; col < 4; col = col + 1) {
      var v = $.index(this.buf, $.rc(row, col));
      if ($.ltB($.abs(v), 1e-16)) {
        var v = 0.0;
      }
      var display = (void 0);
      try {
        var display = $.toStringAsPrecision(v, 4);
      }catch (t0) {
        $.unwrapException(t0);
        var display = $.toString(v);
      }
      items.push(display);
    }
    rows.push('| ' + $.stringToString($.join(items, ', ')) + ' |');
  }
  return 'Matrix4:\n' + $.stringToString($.join(rows, '\n'));
 },
 set$m33: function(m) {
  $.indexSet(this.buf, $.rc(3, 3), m);
 },
 set$m32: function(m) {
  $.indexSet(this.buf, $.rc(3, 2), m);
 },
 set$m23: function(m) {
  $.indexSet(this.buf, $.rc(2, 3), m);
 },
 set$m22: function(m) {
  $.indexSet(this.buf, $.rc(2, 2), m);
 },
 set$m21: function(m) {
  $.indexSet(this.buf, $.rc(2, 1), m);
 },
 set$m20: function(m) {
  $.indexSet(this.buf, $.rc(2, 0), m);
 },
 set$m13: function(m) {
  $.indexSet(this.buf, $.rc(1, 3), m);
 },
 set$m12: function(m) {
  $.indexSet(this.buf, $.rc(1, 2), m);
 },
 set$m11: function(m) {
  $.indexSet(this.buf, $.rc(1, 1), m);
 },
 set$m10: function(m) {
  $.indexSet(this.buf, $.rc(1, 0), m);
 },
 set$m03: function(m) {
  $.indexSet(this.buf, $.rc(0, 3), m);
 },
 set$m02: function(m) {
  $.indexSet(this.buf, $.rc(0, 2), m);
 },
 set$m01: function(m) {
  $.indexSet(this.buf, $.rc(0, 1), m);
 },
 set$m00: function(m) {
  $.indexSet(this.buf, $.rc(0, 0), m);
 },
});

Isolate.$defineClass("Closure", "Closure7", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 },
});

Isolate.$defineClass("Closure2", "Closure7", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 },
});

Isolate.$defineClass("Closure3", "Closure7", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 },
});

Isolate.$defineClass("Closure4", "Closure7", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 },
});

Isolate.$defineClass("Closure5", "Closure7", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 },
});

Isolate.$defineClass("Closure6", "Closure7", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 },
});

Isolate.$defineClass("Closure7", "Object", [], {
 toString$0: function() {
  return 'Closure';
 },
});

Isolate.$defineClass('Closure8', 'Closure7', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self._lib_tick$1(arg0);
},
});
$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
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

$._U16 = function(arg) {
  return new Uint16Array(arg);;
};

$.eqB = function(a, b) {
  return $.eq(a, b) === true;
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
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
    startIndex0 = startIndex;
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.isJsArray = function(value) {
  return value !== (void 0) && (value.constructor === Array);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$._lib3_AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.ZeroLengthVectorException$0 = function() {
  return new $.ZeroLengthVectorException();
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
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

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && name$ !== 'Object') {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.ltB = function(a, b) {
  return $.lt(a, b) === true;
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
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
    return $.truncate($.div(a, b));
  }
  return a.operator$tdiv$1(b);
};

$.convertDartClosureToJS = function(closure) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arguments.length, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$._lib4_FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    result0 = result;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    result0 = result + t1;
  }
  return result;
};

$.Uint16Array$fromList = function(list) {
  return $._U16($.ensureNative(list));
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
  }
  return $dynamicMetadata;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(b, 0)) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    return a >>> b;
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
  var r0 = r;
  if (r === (void 0)) {
    r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  }
  return object;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  var endIndex0 = endIndex;
  if (endIndex === (void 0)) {
    endIndex0 = length$;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure2(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure3(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure4(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.assert = function(condition) {
};

$.translation = function(v) {
  var m = $.identity();
  m.set$m03(v.get$x());
  m.set$m13(v.get$y());
  m.set$m23(v.get$z());
  return m;
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
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, inputTable, result, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.Float32Array = function(length$) {
  return $._F32(length$);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  }
  return a.operator$negate$0();
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
    first0 = first;
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first0 = false;
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
  }
};

$.Vector3$3 = function(x, y, z) {
  return new $.Vector3(z, y, x);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$.example$0 = function() {
  return new $.example((void 0), 0, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.Matrix4$0 = function() {
  return new $.Matrix4($.Float32Array(16));
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.perspective = function(fovyDegrees, aspectRatio, zNear, zFar) {
  var yTop = $.mul($.tan($.div($.div($.mul(fovyDegrees, 3.141592653589793), 180.0), 2.0)), zNear);
  var xRight = $.mul(aspectRatio, yTop);
  var zDepth = $.sub(zFar, zNear);
  var m = $.Matrix4$0();
  m.set$m00($.div(zNear, xRight));
  m.set$m11($.div(zNear, yTop));
  m.set$m22($.div($.neg($.add(zFar, zNear)), zDepth));
  m.set$m23($.div(-$.mul($.mul(2, zNear), zFar), zDepth));
  m.set$m32(-1.0);
  return m;
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

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.identity = function() {
  var m = $.Matrix4$0();
  m.set$m00(1.0);
  m.set$m11(1.0);
  m.set$m22(1.0);
  m.set$m33(1.0);
  return m;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: false, configurable: true});;
};

$.tan = function(x) {
  return $.tan2(x);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.tan2 = function(value) {
  return Math.tan($.checkNum(value));
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (f !== (void 0) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC5)[name$]);
  if (dartMethod !== (void 0)) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.geB = function(a, b) {
  return $.ge(a, b) === true;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return $.indexOf$2(receiver, other, startIndex) !== -1;
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
  if (name$ === (void 0)) {
    var name0 = (object.constructor.toString().match(/^\s*function\s*\$?(\S*)\s*\(/)[1]);
  } else {
    name0 = name$;
    if ($.charCodeAt(name$, 0) === 36) {
      name0 = $.substring$1(name$, 1);
    }
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  }
  return Math.abs(receiver);
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
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

$.add = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    }
  }
  return a.operator$add$1(b);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    if (receiver === 0) {
      var t0 = 1 / receiver < 0;
    } else {
      t0 = receiver < 0;
    }
    return t0;
  } else {
    return receiver.isNegative$0();
  }
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
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
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; hash = hash0, i = i0) {
    hash0 = hash;
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
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

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
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
    if (typeof o === 'object' && !!o.is$Map) {
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
  $.forEach(m, new $.Closure(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.ge = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var method0 = method;
  if (method === (void 0) && $._dynamicMetadata2() !== (void 0)) {
    for (var method1 = method, i = 0; method0 = method1, $.ltB(i, $.get$length($._dynamicMetadata2())); method1 = method2, i = i0) {
      method2 = method1;
      var entry = $.index($._dynamicMetadata2(), i);
      method2 = method1;
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (method3 !== (void 0)) {
          method0 = method3;
          break;
        }
        method2 = method3;
      }
      var i0 = i + 1;
    }
  }
  var method4 = method0;
  if (method0 === (void 0)) {
    method4 = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  var method5 = method4;
  if (method4 === (void 0)) {
    method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$.rc = function(row, col) {
  return $.add(row, $.mul(col, 4));
};

$.getFunctionForTypeNameOf = function() {
  if ((typeof(navigator)) !== 'object') {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC3) === true) {
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
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if ($.truncate(index) !== index) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$.sin = function(x) {
  return $.sin2(x);
};

$.sin2 = function(value) {
  return Math.sin($.checkNum(value));
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.List = function(length$) {
  return $.newList(length$);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.toStringAsPrecision = function(receiver, fractionDigits) {
  if (!(typeof receiver === 'number')) {
    return receiver.toStringAsPrecision$1(fractionDigits);
  }
  $.checkNum(fractionDigits);
  var result = (receiver.toPrecision(fractionDigits));
  if (receiver === 0 && $.isNegative(receiver) === true) {
    return '-' + $.stringToString(result);
  }
  return result;
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
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
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.join = function(strings, separator) {
  return $.join2(strings, separator);
};

$.join2 = function(strings, separator) {
  if (typeof separator !== 'string') return $.join2$bailout(strings, separator,  0);
  $.checkNull(strings);
  $.checkNull(separator);
  for (var t0 = $.iterator(strings), result = '', first = true; t0.hasNext$0() === true; result = result0, first = first0) {
    result0 = result;
    first0 = first;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    var result1 = result;
    if (!first) {
      result1 = result + separator;
    }
    var result2 = result1 + t1;
    result0 = result2;
    first0 = false;
  }
  return result;
};

$.rotation = function(degrees, axis) {
  var radians = $.mul($.div(degrees, 180.0), 3.141592653589793);
  var axis0 = axis.normalize$0();
  var x = axis0.get$x();
  var y = axis0.get$y();
  var z = axis0.get$z();
  var s = $.sin(radians);
  var c = $.cos(radians);
  var t = $.sub(1, c);
  var m = $.Matrix4$0();
  m.set$m00($.add($.mul($.mul(x, x), t), c));
  m.set$m10($.add($.mul($.mul(x, y), t), $.mul(z, s)));
  m.set$m20($.sub($.mul($.mul(x, z), t), $.mul(y, s)));
  m.set$m01($.sub($.mul($.mul(x, y), t), $.mul(z, s)));
  m.set$m11($.add($.mul($.mul(y, y), t), c));
  m.set$m21($.add($.mul($.mul(y, z), t), $.mul(x, s)));
  m.set$m02($.add($.mul($.mul(x, z), t), $.mul(y, s)));
  m.set$m12($.sub($.mul($.mul(y, z), t), $.mul(x, s)));
  m.set$m22($.add($.mul($.mul(z, z), t), c));
  m.set$m33(1.0);
  return m;
};

$.gtB = function(a, b) {
  return $.gt(a, b) === true;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (target !== (void 0)) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.eqNullB = function(a) {
  return $.eqNull(a) === true;
};

$._F32 = function(arg) {
  return new Float32Array(arg);;
};

$.document = function() {
  return document;;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    t1 = length$ < 0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.main = function() {
  $.Lesson05$0().run$0();
};

$.lt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
    if (ex instanceof TypeError) {
      var type = (ex.type);
      var name$ = $.index((ex.arguments), 0);
      if (type === 'property_not_function' || type === 'called_non_callable' || type === 'non_object_property_call' || type === 'non_object_property_load') {
        if (name$ !== (void 0) && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NullPointerException$2((void 0), $.CTC);
        }
      } else {
        if (type === 'undefined_method') {
          if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
            return $.ObjectNotClosureException$0();
          } else {
            return $.NoSuchMethodException$4('', name$, [], (void 0));
          }
        }
      }
    } else {
      if (ex instanceof RangeError) {
        if ($.contains$1((ex.message), 'call stack') === true) {
          return $.StackOverflowException$0();
        }
      }
    }
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_lib3_backingMap().get$_lib3_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.cos2 = function(value) {
  return Math.cos($.checkNum(value));
};

$.cos = function(x) {
  return $.cos2(x);
};

$.Lesson05$0 = function() {
  return new $.Lesson05();
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.sub = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$._lib3_AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
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
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
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
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
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
        var startIndex0 = startIndex;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.join2$bailout = function(strings, separator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.checkNull(strings);
      $.checkNull(separator);
      var t1 = $.iterator(strings);
      var result = '';
      var first = true;
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var result0 = result;
        var first0 = first;
        var t2 = t1.next$0();
        $.checkNull(t2);
        if (!(typeof t2 === 'string')) {
          throw $.captureStackTrace($.IllegalArgumentException$1(t2));
        }
        var result1 = result;
        if (!first) {
          result1 = $.add(result, separator);
        }
        var result2 = result1 + t2;
        result0 = result2;
        first0 = false;
        result = result0;
        first = first0;
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
      t0 = env0;
      result = env1;
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
$.CTC4 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC3 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC5 = new Isolate.$isolateProperties.Object();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$._getTypeNameOf = (void 0);
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
(function() {
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.dynamicFunction('get$length').AudioBuffer = function() { return this.length; };
$.dynamicFunction('get$length').CSSRuleList = function() { return this.length; };
$.dynamicFunction('get$length').CSSStyleDeclaration = function() { return this.length; };
$.dynamicFunction('get$length').CSSValueList = function() { return this.length; };
$.dynamicFunction('get$length').CharacterData = function() { return this.length; };
$.dynamicFunction('get$width').ClientRect = function() { return this.width; };
$.dynamicFunction('get$height').ClientRect = function() { return this.height; };
$.dynamicFunction('get$length').ClientRectList = function() { return this.length; };
_ConsoleJs = (typeof console == 'undefined' ? {} : console);
$.dynamicFunction('normalize$0').ConvolverNode = function() { return this.normalize.$call$0(); };
$.dynamicFunction('toString$0').DOMException = function() {
  return this.toString();
 };
$.dynamicFunction('get$length').DOMMimeTypeArray = function() { return this.length; };
$.dynamicFunction('get$length').DOMPlugin = function() { return this.length; };
$.dynamicFunction('get$length').DOMPluginArray = function() { return this.length; };
$.dynamicFunction('toString$0').DOMSelection = function() {
  return this.toString();
 };
$.dynamicFunction('contains$1').DOMStringList = function(string) {
  return this.contains(string);
 };
$.dynamicFunction('removeLast$0').DOMStringList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').DOMStringList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').DOMStringList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').DOMStringList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').DOMStringList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').DOMStringList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').DOMStringList = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').DOMStringList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').DOMStringList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').DOMStringList = function() { return this.length; };
$.dynamicFunction('is$List2').DOMStringList = function() { return true; };
$.dynamicFunction('is$Collection').DOMStringList = function() { return true; };
$.dynamicFunction('toString$0').DOMTokenList = function() {
  return this.toString();
 };
$.dynamicFunction('contains$1').DOMTokenList = function(token) {
  return this.contains(token);
 };
$.dynamicFunction('add$1').DOMTokenList = function(token) {
  return this.add(token);
 };
$.dynamicFunction('get$length').DOMTokenList = function() { return this.length; };
$.dynamicFunction('webkitRequestAnimationFrame$1').DOMWindow = function(callback) {
  return this.webkitRequestAnimationFrame($.convertDartClosureToJS(callback));
 };
$.dynamicFunction('get$length').DOMWindow = function() { return this.length; };
$.dynamicFunction('clear$0').DataTransferItemList = function() {
  return this.clear();
 };
$.dynamicFunction('add$2').DataTransferItemList = function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 };
$.dynamicFunction('add$1').DataTransferItemList = function(data_OR_file) {
  return this.add(data_OR_file);
};
$.dynamicFunction('get$length').DataTransferItemList = function() { return this.length; };
$.dynamicFunction('getElementById$1').Document = function(elementId) {
  return this.getElementById(elementId);
 };
$.dynamicFunction('get$length').EntryArray = function() { return this.length; };
$.dynamicFunction('get$length').EntryArraySync = function() { return this.length; };
$.dynamicFunction('toString$0').EventException = function() {
  return this.toString();
 };
$.dynamicFunction('toString$0').FileException = function() {
  return this.toString();
 };
$.dynamicFunction('removeLast$0').FileList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').FileList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').FileList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').FileList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').FileList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').FileList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').FileList = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').FileList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').FileList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').FileList = function() { return this.length; };
$.dynamicFunction('is$List2').FileList = function() { return true; };
$.dynamicFunction('is$Collection').FileList = function() { return true; };
$.dynamicFunction('get$length').FileWriter = function() { return this.length; };
$.dynamicFunction('get$length').FileWriterSync = function() { return this.length; };
$.dynamicFunction('removeLast$0').Float32Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Float32Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Float32Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Float32Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Float32Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Float32Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Float32Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Float32Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Float32Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Float32Array = function() { return this.length; };
$.dynamicFunction('is$List2').Float32Array = function() { return true; };
$.dynamicFunction('is$Collection').Float32Array = function() { return true; };
$.dynamicFunction('removeLast$0').Float64Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Float64Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Float64Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Float64Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Float64Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Float64Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Float64Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Float64Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Float64Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Float64Array = function() { return this.length; };
$.dynamicFunction('is$List2').Float64Array = function() { return true; };
$.dynamicFunction('is$Collection').Float64Array = function() { return true; };
$.dynamicFunction('get$length').HTMLAllCollection = function() { return this.length; };
$.dynamicFunction('toString$0').HTMLAnchorElement = function() {
  return this.toString();
 };
$.dynamicFunction('get$width').HTMLAppletElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLAppletElement = function() { return this.height; };
$.dynamicFunction('clear$0').HTMLBRElement = function() { return this.clear.$call$0(); };
$.dynamicFunction('clear$1').HTMLBRElement = function(arg0) { return this.clear.$call$1(arg0); };
$.dynamicFunction('getContext$1').HTMLCanvasElement = function(contextId) {
  return this.getContext(contextId);
 };
$.dynamicFunction('get$width').HTMLCanvasElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLCanvasElement = function() { return this.height; };
$.dynamicFunction('removeLast$0').HTMLCollection = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').HTMLCollection = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').HTMLCollection = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').HTMLCollection = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').HTMLCollection = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').HTMLCollection = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').HTMLCollection = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').HTMLCollection = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').HTMLCollection = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').HTMLCollection = function() { return this.length; };
$.dynamicFunction('is$List2').HTMLCollection = function() { return true; };
$.dynamicFunction('is$Collection').HTMLCollection = function() { return true; };
$.dynamicFunction('clear$0').HTMLDocument = function() {
  return this.clear();
 };
$.dynamicFunction('get$width').HTMLDocument = function() { return this.width; };
$.dynamicFunction('get$height').HTMLDocument = function() { return this.height; };
$.dynamicFunction('get$width').HTMLEmbedElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLEmbedElement = function() { return this.height; };
$.dynamicFunction('get$length').HTMLFormElement = function() { return this.length; };
$.dynamicFunction('get$width').HTMLFrameElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLFrameElement = function() { return this.height; };
$.dynamicFunction('get$width').HTMLHRElement = function() { return this.width; };
$.dynamicFunction('get$width').HTMLIFrameElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLIFrameElement = function() { return this.height; };
$.dynamicFunction('get$y').HTMLImageElement = function() { return this.y; };
$.dynamicFunction('get$x').HTMLImageElement = function() { return this.x; };
$.dynamicFunction('get$width').HTMLImageElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLImageElement = function() { return this.height; };
$.dynamicFunction('get$pattern').HTMLInputElement = function() { return this.pattern; };
$.dynamicFunction('get$width').HTMLMarqueeElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLMarqueeElement = function() { return this.height; };
$.dynamicFunction('get$width').HTMLObjectElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLObjectElement = function() { return this.height; };
$.dynamicFunction('set$length').HTMLOptionsCollection = function(value) {
  this.length = value;;
 };
$.dynamicFunction('get$length').HTMLOptionsCollection = function() {
  return this.length;;
 };
$.dynamicFunction('is$List2').HTMLOptionsCollection = function() { return true; };
$.dynamicFunction('is$Collection').HTMLOptionsCollection = function() { return true; };
$.dynamicFunction('get$width').HTMLPreElement = function() { return this.width; };
$.dynamicFunction('get$length').HTMLSelectElement = function() { return this.length; };
$.dynamicFunction('set$length').HTMLSelectElement = function(v) { this.length = v; };
$.dynamicFunction('get$width').HTMLTableCellElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLTableCellElement = function() { return this.height; };
$.dynamicFunction('get$width').HTMLTableColElement = function() { return this.width; };
$.dynamicFunction('get$width').HTMLTableElement = function() { return this.width; };
$.dynamicFunction('get$width').HTMLVideoElement = function() { return this.width; };
$.dynamicFunction('get$height').HTMLVideoElement = function() { return this.height; };
$.dynamicFunction('get$length').History = function() { return this.length; };
$.dynamicFunction('toString$0').IDBDatabaseException = function() {
  return this.toString();
 };
$.dynamicFunction('clear$0').IDBObjectStore = function() {
  return this.clear();
 };
$.dynamicFunction('add$2').IDBObjectStore = function(value, key) {
  return this.add(value,key);
 };
$.dynamicFunction('add$1').IDBObjectStore = function(value) {
  return this.add(value);
};
$.dynamicFunction('get$width').ImageData = function() { return this.width; };
$.dynamicFunction('get$height').ImageData = function() { return this.height; };
$.dynamicFunction('removeLast$0').Int16Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Int16Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Int16Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Int16Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Int16Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Int16Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Int16Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Int16Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Int16Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Int16Array = function() { return this.length; };
$.dynamicFunction('is$List2').Int16Array = function() { return true; };
$.dynamicFunction('is$Collection').Int16Array = function() { return true; };
$.dynamicFunction('removeLast$0').Int32Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Int32Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Int32Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Int32Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Int32Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Int32Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Int32Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Int32Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Int32Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Int32Array = function() { return this.length; };
$.dynamicFunction('is$List2').Int32Array = function() { return true; };
$.dynamicFunction('is$Collection').Int32Array = function() { return true; };
$.dynamicFunction('removeLast$0').Int8Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Int8Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Int8Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Int8Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Int8Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Int8Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Int8Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Int8Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Int8Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Int8Array = function() { return this.length; };
$.dynamicFunction('is$List2').Int8Array = function() { return true; };
$.dynamicFunction('is$Collection').Int8Array = function() { return true; };
$.dynamicFunction('toString$0').Location = function() {
  return this.toString();
 };
$.dynamicFunction('removeLast$0').MediaList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').MediaList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').MediaList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').MediaList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').MediaList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').MediaList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').MediaList = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').MediaList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').MediaList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').MediaList = function() { return this.length; };
$.dynamicFunction('is$List2').MediaList = function() { return true; };
$.dynamicFunction('is$Collection').MediaList = function() { return true; };
$.dynamicFunction('get$length').MediaStreamList = function() { return this.length; };
$.dynamicFunction('get$length').MediaStreamTrackList = function() { return this.length; };
$.dynamicFunction('get$y').MouseEvent = function() { return this.y; };
$.dynamicFunction('get$x').MouseEvent = function() { return this.x; };
$.dynamicFunction('removeLast$0').NamedNodeMap = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').NamedNodeMap = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').NamedNodeMap = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').NamedNodeMap = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').NamedNodeMap = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').NamedNodeMap = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').NamedNodeMap = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').NamedNodeMap = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').NamedNodeMap = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').NamedNodeMap = function() { return this.length; };
$.dynamicFunction('is$List2').NamedNodeMap = function() { return true; };
$.dynamicFunction('is$Collection').NamedNodeMap = function() { return true; };
$.dynamicFunction('normalize$0').Node = function() {
  return this.normalize();
 };
$.dynamicFunction('contains$1').Node = function(other) {
  return this.contains(other);
 };
$.dynamicFunction('removeLast$0').NodeList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').NodeList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').NodeList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').NodeList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').NodeList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').NodeList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').NodeList = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').NodeList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').NodeList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').NodeList = function() { return this.length; };
$.dynamicFunction('is$List2').NodeList = function() { return true; };
$.dynamicFunction('is$Collection').NodeList = function() { return true; };
$.dynamicFunction('get$tag').Notification = function() { return this.tag; };
$.dynamicFunction('toString$0').OperationNotAllowedException = function() {
  return this.toString();
 };
$.dynamicFunction('toString$0').Range = function() {
  return this.toString();
 };
$.dynamicFunction('toString$0').RangeException = function() {
  return this.toString();
 };
$.dynamicFunction('get$length').SQLResultSetRowList = function() { return this.length; };
$.dynamicFunction('get$y').SVGCursorElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGCursorElement = function() { return this.x; };
$.dynamicFunction('get$length').SVGElementInstanceList = function() { return this.length; };
$.dynamicFunction('toString$0').SVGException = function() {
  return this.toString();
 };
$.dynamicFunction('get$y').SVGFEBlendElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEBlendElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEBlendElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEBlendElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEColorMatrixElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEColorMatrixElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEColorMatrixElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEColorMatrixElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEComponentTransferElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEComponentTransferElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEComponentTransferElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEComponentTransferElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFECompositeElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFECompositeElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFECompositeElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFECompositeElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEConvolveMatrixElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEConvolveMatrixElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEConvolveMatrixElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEConvolveMatrixElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEDiffuseLightingElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEDiffuseLightingElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEDiffuseLightingElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEDiffuseLightingElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEDisplacementMapElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEDisplacementMapElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEDisplacementMapElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEDisplacementMapElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEDropShadowElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEDropShadowElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEDropShadowElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEDropShadowElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEFloodElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEFloodElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEFloodElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEFloodElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEGaussianBlurElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEGaussianBlurElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEGaussianBlurElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEGaussianBlurElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEImageElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEImageElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEImageElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEImageElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEMergeElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEMergeElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEMergeElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEMergeElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEMorphologyElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEMorphologyElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEMorphologyElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEMorphologyElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFEOffsetElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEOffsetElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFEOffsetElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFEOffsetElement = function() { return this.height; };
$.dynamicFunction('get$z').SVGFEPointLightElement = function() { return this.z; };
$.dynamicFunction('get$y').SVGFEPointLightElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFEPointLightElement = function() { return this.x; };
$.dynamicFunction('get$y').SVGFESpecularLightingElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFESpecularLightingElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFESpecularLightingElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFESpecularLightingElement = function() { return this.height; };
$.dynamicFunction('get$z').SVGFESpotLightElement = function() { return this.z; };
$.dynamicFunction('get$y').SVGFESpotLightElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFESpotLightElement = function() { return this.x; };
$.dynamicFunction('get$y').SVGFETileElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFETileElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFETileElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFETileElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFETurbulenceElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFETurbulenceElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFETurbulenceElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFETurbulenceElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFilterElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGFilterElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGFilterElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGFilterElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGFilterPrimitiveStandardAttributes = function() { return this.y; };
$.dynamicFunction('get$x').SVGFilterPrimitiveStandardAttributes = function() { return this.x; };
$.dynamicFunction('get$width').SVGFilterPrimitiveStandardAttributes = function() { return this.width; };
$.dynamicFunction('get$height').SVGFilterPrimitiveStandardAttributes = function() { return this.height; };
$.dynamicFunction('get$y').SVGForeignObjectElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGForeignObjectElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGForeignObjectElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGForeignObjectElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGGlyphRefElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGGlyphRefElement = function() { return this.x; };
$.dynamicFunction('get$y').SVGImageElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGImageElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGImageElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGImageElement = function() { return this.height; };
$.dynamicFunction('clear$0').SVGLengthList = function() {
  return this.clear();
 };
$.dynamicFunction('get$y').SVGMaskElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGMaskElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGMaskElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGMaskElement = function() { return this.height; };
$.dynamicFunction('clear$0').SVGNumberList = function() {
  return this.clear();
 };
$.dynamicFunction('get$y').SVGPathSegArcAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegArcAbs = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegArcRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegArcRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoCubicAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoCubicAbs = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoCubicRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoCubicRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoCubicSmoothAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoCubicSmoothAbs = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoCubicSmoothRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoCubicSmoothRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoQuadraticAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoQuadraticAbs = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoQuadraticRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoQuadraticRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoQuadraticSmoothAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoQuadraticSmoothAbs = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegCurvetoQuadraticSmoothRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegCurvetoQuadraticSmoothRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegLinetoAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegLinetoAbs = function() { return this.x; };
$.dynamicFunction('get$x').SVGPathSegLinetoHorizontalAbs = function() { return this.x; };
$.dynamicFunction('get$x').SVGPathSegLinetoHorizontalRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegLinetoRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegLinetoRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegLinetoVerticalAbs = function() { return this.y; };
$.dynamicFunction('get$y').SVGPathSegLinetoVerticalRel = function() { return this.y; };
$.dynamicFunction('clear$0').SVGPathSegList = function() {
  return this.clear();
 };
$.dynamicFunction('get$y').SVGPathSegMovetoAbs = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegMovetoAbs = function() { return this.x; };
$.dynamicFunction('get$y').SVGPathSegMovetoRel = function() { return this.y; };
$.dynamicFunction('get$x').SVGPathSegMovetoRel = function() { return this.x; };
$.dynamicFunction('get$y').SVGPatternElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGPatternElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGPatternElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGPatternElement = function() { return this.height; };
$.dynamicFunction('get$y').SVGPoint = function() { return this.y; };
$.dynamicFunction('get$x').SVGPoint = function() { return this.x; };
$.dynamicFunction('clear$0').SVGPointList = function() {
  return this.clear();
 };
$.dynamicFunction('get$y').SVGRect = function() { return this.y; };
$.dynamicFunction('get$x').SVGRect = function() { return this.x; };
$.dynamicFunction('get$width').SVGRect = function() { return this.width; };
$.dynamicFunction('get$height').SVGRect = function() { return this.height; };
$.dynamicFunction('get$y').SVGRectElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGRectElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGRectElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGRectElement = function() { return this.height; };
$.dynamicFunction('getElementById$1').SVGSVGElement = function(elementId) {
  return this.getElementById(elementId);
 };
$.dynamicFunction('get$y').SVGSVGElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGSVGElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGSVGElement = function() { return this.width; };
$.dynamicFunction('viewport$4').SVGSVGElement = function(arg0, arg1, arg2, arg3) { return this.viewport.$call$4(arg0, arg1, arg2, arg3); };
$.dynamicFunction('get$height').SVGSVGElement = function() { return this.height; };
$.dynamicFunction('clear$0').SVGStringList = function() {
  return this.clear();
 };
$.dynamicFunction('get$y').SVGTextPositioningElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGTextPositioningElement = function() { return this.x; };
$.dynamicFunction('clear$0').SVGTransformList = function() {
  return this.clear();
 };
$.dynamicFunction('get$y').SVGUseElement = function() { return this.y; };
$.dynamicFunction('get$x').SVGUseElement = function() { return this.x; };
$.dynamicFunction('get$width').SVGUseElement = function() { return this.width; };
$.dynamicFunction('get$height').SVGUseElement = function() { return this.height; };
$.dynamicFunction('get$width').Screen = function() { return this.width; };
$.dynamicFunction('get$height').Screen = function() { return this.height; };
$.dynamicFunction('getElementById$1').ShadowRoot = function(elementId) {
  return this.getElementById(elementId);
 };
$.dynamicFunction('get$length').SpeechGrammarList = function() { return this.length; };
$.dynamicFunction('get$length').SpeechInputResultList = function() { return this.length; };
$.dynamicFunction('get$length').SpeechRecognitionResult = function() { return this.length; };
$.dynamicFunction('get$length').SpeechRecognitionResultList = function() { return this.length; };
$.dynamicFunction('clear$0').Storage = function() {
  return this.clear();
 };
$.dynamicFunction('get$length').Storage = function() { return this.length; };
$.dynamicFunction('removeLast$0').StyleSheetList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').StyleSheetList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').StyleSheetList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').StyleSheetList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').StyleSheetList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').StyleSheetList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').StyleSheetList = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').StyleSheetList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').StyleSheetList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').StyleSheetList = function() { return this.length; };
$.dynamicFunction('is$List2').StyleSheetList = function() { return true; };
$.dynamicFunction('is$Collection').StyleSheetList = function() { return true; };
$.dynamicFunction('get$width').TextMetrics = function() { return this.width; };
$.dynamicFunction('get$length').TextTrackCueList = function() { return this.length; };
$.dynamicFunction('get$length').TextTrackList = function() { return this.length; };
$.dynamicFunction('get$length').TimeRanges = function() { return this.length; };
$.dynamicFunction('removeLast$0').TouchList = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').TouchList = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').TouchList = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').TouchList = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').TouchList = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').TouchList = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').TouchList = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').TouchList = function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 };
$.dynamicFunction('operator$index$1').TouchList = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').TouchList = function() { return this.length; };
$.dynamicFunction('is$List2').TouchList = function() { return true; };
$.dynamicFunction('is$Collection').TouchList = function() { return true; };
$.dynamicFunction('removeLast$0').Uint16Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Uint16Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Uint16Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Uint16Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Uint16Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Uint16Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Uint16Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Uint16Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Uint16Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Uint16Array = function() { return this.length; };
$.dynamicFunction('is$List2').Uint16Array = function() { return true; };
$.dynamicFunction('is$Collection').Uint16Array = function() { return true; };
$.dynamicFunction('removeLast$0').Uint32Array = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Uint32Array = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Uint32Array = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Uint32Array = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Uint32Array = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Uint32Array = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Uint32Array = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Uint32Array = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Uint32Array = function(index) {
  return this[index];;
 };
$.dynamicFunction('get$length').Uint32Array = function() { return this.length; };
$.dynamicFunction('is$List2').Uint32Array = function() { return true; };
$.dynamicFunction('is$Collection').Uint32Array = function() { return true; };
$.dynamicFunction('removeLast$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('removeLast$0')) {
    throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
  } else {
    return Object.prototype.removeLast$0.call(this);
  }
 };
$.dynamicFunction('indexOf$2').Uint8Array = function(element, start) {
  if (Object.getPrototypeOf(this).hasOwnProperty('indexOf$2')) {
    return $.indexOf2(this, element, start, $.get$length(this));
  } else {
    return Object.prototype.indexOf$2.call(this, element, start);
  }
 };
$.dynamicFunction('isEmpty$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('isEmpty$0')) {
    return $.eq($.get$length(this), 0);
  } else {
    return Object.prototype.isEmpty$0.call(this);
  }
 };
$.dynamicFunction('forEach$1').Uint8Array = function(f) {
  if (Object.getPrototypeOf(this).hasOwnProperty('forEach$1')) {
    return $.forEach3(this, f);
  } else {
    return Object.prototype.forEach$1.call(this, f);
  }
 };
$.dynamicFunction('addAll$1').Uint8Array = function(collection) {
  if (Object.getPrototypeOf(this).hasOwnProperty('addAll$1')) {
    throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
  } else {
    return Object.prototype.addAll$1.call(this, collection);
  }
 };
$.dynamicFunction('add$1').Uint8Array = function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('add$1')) {
    throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
  } else {
    return Object.prototype.add$1.call(this, value);
  }
 };
$.dynamicFunction('iterator$0').Uint8Array = function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('iterator$0')) {
    var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
  } else {
    return Object.prototype.iterator$0.call(this);
  }
 };
$.dynamicFunction('operator$indexSet$2').Uint8Array = function(index, value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('operator$indexSet$2')) {
    this[index] = value;
  } else {
    return Object.prototype.operator$indexSet$2.call(this, index, value);
  }
 };
$.dynamicFunction('operator$index$1').Uint8Array = function(index) {
  if (Object.getPrototypeOf(this).hasOwnProperty('operator$index$1')) {
    return this[index];;
  } else {
    return Object.prototype.operator$index$1.call(this, index);
  }
 };
$.dynamicFunction('get$length').Uint8Array = function() { return this.length; };
$.dynamicFunction('is$List2').Uint8Array = function() { return true; };
$.dynamicFunction('is$Collection').Uint8Array = function() { return true; };
$.dynamicFunction('removeLast$0').Uint8ClampedArray = function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 };
$.dynamicFunction('indexOf$2').Uint8ClampedArray = function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 };
$.dynamicFunction('isEmpty$0').Uint8ClampedArray = function() {
  return $.eq($.get$length(this), 0);
 };
$.dynamicFunction('forEach$1').Uint8ClampedArray = function(f) {
  return $.forEach3(this, f);
 };
$.dynamicFunction('addAll$1').Uint8ClampedArray = function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('add$1').Uint8ClampedArray = function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 };
$.dynamicFunction('iterator$0').Uint8ClampedArray = function() {
  var t0 = $._lib4_FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 };
$.dynamicFunction('operator$indexSet$2').Uint8ClampedArray = function(index, value) {
  this[index] = value;
 };
$.dynamicFunction('operator$index$1').Uint8ClampedArray = function(index) {
  return this[index];;
 };
$.dynamicFunction('is$List2').Uint8ClampedArray = function() { return true; };
$.dynamicFunction('is$Collection').Uint8ClampedArray = function() { return true; };
$.dynamicFunction('viewport$4').WebGLRenderingContext = function(x, y, width, height) {
  return this.viewport(x,y,width,height);
 };
$.dynamicFunction('vertexAttribPointer$6').WebGLRenderingContext = function(indx, size, type, normalized, stride, offset) {
  return this.vertexAttribPointer(indx,size,type,normalized,stride,offset);
 };
$.dynamicFunction('useProgram$1').WebGLRenderingContext = function(program) {
  return this.useProgram(program);
 };
$.dynamicFunction('uniformMatrix4fv$3').WebGLRenderingContext = function(location, transpose, array) {
  return this.uniformMatrix4fv(location,transpose,array);
 };
$.dynamicFunction('shaderSource$2').WebGLRenderingContext = function(shader, string) {
  return this.shaderSource(shader,string);
 };
$.dynamicFunction('linkProgram$1').WebGLRenderingContext = function(program) {
  return this.linkProgram(program);
 };
$.dynamicFunction('getUniformLocation$2').WebGLRenderingContext = function(program, name) {
  return this.getUniformLocation(program,name);
 };
$.dynamicFunction('getAttribLocation$2').WebGLRenderingContext = function(program, name) {
  return this.getAttribLocation(program,name);
 };
$.dynamicFunction('enableVertexAttribArray$1').WebGLRenderingContext = function(index) {
  return this.enableVertexAttribArray(index);
 };
$.dynamicFunction('enable$1').WebGLRenderingContext = function(cap) {
  return this.enable(cap);
 };
$.dynamicFunction('drawElements$4').WebGLRenderingContext = function(mode, count, type, offset) {
  return this.drawElements(mode,count,type,offset);
 };
$.dynamicFunction('drawArrays$3').WebGLRenderingContext = function(mode, first, count) {
  return this.drawArrays(mode,first,count);
 };
$.dynamicFunction('createShader$1').WebGLRenderingContext = function(type) {
  return this.createShader(type);
 };
$.dynamicFunction('createProgram$0').WebGLRenderingContext = function() {
  return this.createProgram();
 };
$.dynamicFunction('createBuffer$0').WebGLRenderingContext = function() {
  return this.createBuffer();
 };
$.dynamicFunction('compileShader$1').WebGLRenderingContext = function(shader) {
  return this.compileShader(shader);
 };
$.dynamicFunction('clearColor$4').WebGLRenderingContext = function(red, green, blue, alpha) {
  return this.clearColor(red,green,blue,alpha);
 };
$.dynamicFunction('clear$1').WebGLRenderingContext = function(mask) {
  return this.clear(mask);
 };
$.dynamicFunction('bufferData$3').WebGLRenderingContext = function(target, data_OR_size, usage) {
  return this.bufferData(target,data_OR_size,usage);
 };
$.dynamicFunction('bindBuffer$2').WebGLRenderingContext = function(target, buffer) {
  return this.bindBuffer(target,buffer);
 };
$.dynamicFunction('attachShader$2').WebGLRenderingContext = function(program, shader) {
  return this.attachShader(program,shader);
 };
$.dynamicFunction('get$length').WebKitAnimationList = function() { return this.length; };
$.dynamicFunction('toString$0').WebKitCSSMatrix = function() {
  return this.toString();
 };
$.dynamicFunction('set$m23').WebKitCSSMatrix = function(v) { this.m23 = v; };
$.dynamicFunction('set$m13').WebKitCSSMatrix = function(v) { this.m13 = v; };
$.dynamicFunction('get$y').WebKitPoint = function() { return this.y; };
$.dynamicFunction('get$x').WebKitPoint = function() { return this.x; };
$.dynamicFunction('get$y').WheelEvent = function() { return this.y; };
$.dynamicFunction('get$x').WheelEvent = function() { return this.x; };
$.dynamicFunction('toString$0').WorkerLocation = function() {
  return this.toString();
 };
$.dynamicFunction('toString$0').XMLHttpRequestException = function() {
  return this.toString();
 };
$.dynamicFunction('toString$0').XPathException = function() {
  return this.toString();
 };
// 154 dynamic classes.
// 275 classes
// 18 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementJs)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_DocumentJs)*/ = 'Document|SVGDocument|HTMLDocument';
  var v2/*class(_CharacterDataJs)*/ = 'CharacterData|Text|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementJs)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['Document', v1/*class(_DocumentJs)*/],
    ['CharacterData', v2/*class(_CharacterDataJs)*/],
    ['Node', [v0/*class(_SVGTextPositioningElementJs)*/,v1/*class(_DocumentJs)*/,v2/*class(_CharacterDataJs)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|Element|SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|DocumentType|DocumentFragment|ShadowRoot|Attr'].join('|')],
    ['CSSValueList', 'CSSValueList|WebKitCSSTransformValue|WebKitCSSFilterValue'],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']];
$.dynamicSetMetadata(table);
})();

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
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "(function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      var len = field.length;
      var lastChar = field[len - 1];
      var needsGetter = false;
      var needsSetter = false;
      switch (lastChar) {
        case '?': needsGetter = true; break;
        case '=': needsGetter = true; // Fall-through.
        case '!': needsSetter = true;
      }
      if (needsGetter || needsSetter) field = field.substring(0, len - 1);
      str += field;
      body += "this." + field + " = " + field + ";\n";
      if (needsGetter) {
        var getterString = "return this." + field + ";";
        prototype["get$" + field] = new Function(getterString);
      }
      if (needsSetter) {
        var setterString = "this." + field + " = v;";
        prototype["set$" + field] = new Function("v", setterString);
      }
    }
    str += ") {" + body + "})";
    constructor = eval(str);
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
