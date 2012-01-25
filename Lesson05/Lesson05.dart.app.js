//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
Object.defineProperty(Object.prototype, '$index', { value: function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(Array.prototype, '$index', { value: function(i) { 
  return this[i]; 
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(String.prototype, '$index', { value: function(i) { 
  return this[i]; 
}, enumerable: false, writable: true, configurable: true});
function $wrap_call$1(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $mul(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x * y : x.$mul(y);
}
function $sub(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x - y : x.$sub(y);
}
Object.defineProperty(Object.prototype, '$typeNameOf', { value: function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype, "get$typeName", { value: Object.prototype.$typeNameOf, enumerable: false, writable: true, configurable: true});
// ********** Code for Object **************
Object.defineProperty(Object.prototype, "noSuchMethod", { value: function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "addAll$1", { value: function($0) {
  return this.noSuchMethod$2("addAll", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "hasNext$0", { value: function() {
  return this.noSuchMethod$2("hasNext", []);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "iterator$0", { value: function() {
  return this.noSuchMethod$2("iterator", []);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "next$0", { value: function() {
  return this.noSuchMethod$2("next", []);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "noSuchMethod$2", { value: function($0, $1) {
  return this.noSuchMethod($0, $1);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "toString$0", { value: function() {
  return this.toString();
}, enumerable: false, writable: true, configurable: true });
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
}
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  sb.add("]");
  return ("NoSuchMethodException - receiver: '" + this._receiver + "' ") + ("function name: '" + this._functionName + "' arguments: [" + sb + "]");
}
NoSuchMethodException.prototype.toString$0 = NoSuchMethodException.prototype.toString;
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
ObjectNotClosureException.prototype.toString$0 = ObjectNotClosureException.prototype.toString;
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
StackOverflowException.prototype.toString$0 = StackOverflowException.prototype.toString;
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
NullPointerException.prototype.toString$0 = NullPointerException.prototype.toString;
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
NoMoreElementsException.prototype.toString$0 = NoMoreElementsException.prototype.toString;
// ********** Code for Math **************
// ********** Code for Strings **************
function Strings() {}
Strings.join = function(strings, separator) {
  return StringBase.join(strings, separator);
}
// ********** Code for top level **************
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
Object.defineProperty(ListFactory.prototype, "get$length", { value: function() { return this.length; }, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "set$length", { value: function(value) { return this.length = value; }, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "add", { value: function(value) {
  this.push(value);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "addAll", { value: function(collection) {
  for (var $$i = collection.iterator$0(); $$i.hasNext$0(); ) {
    var item = $$i.next$0();
    this.add(item);
  }
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "clear", { value: function() {
  this.set$length((0));
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "removeLast", { value: function() {
  return this.pop();
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "iterator", { value: function() {
  return new ListIterator(this);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "addAll$1", { value: ListFactory.prototype.addAll, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "iterator$0", { value: ListFactory.prototype.iterator, enumerable: false, writable: true, configurable: true });
ListFactory_E = ListFactory;
ListFactory_dart_core_String = ListFactory;
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._array.$index(this._pos++);
}
ListIterator.prototype.hasNext$0 = ListIterator.prototype.hasNext;
ListIterator.prototype.next$0 = ListIterator.prototype.next;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.abs = function() {
  'use strict'; return Math.abs(this);
}
NumImplementation.prototype.toStringAsPrecision = function(precision) {
  'use strict'; return this.toPrecision(precision)
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString$0();
  if (str == null || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator$0(); $$i.hasNext$0(); ) {
    var obj = $$i.next$0();
    this.add(obj);
  }
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.addAll$1 = StringBufferImpl.prototype.addAll;
StringBufferImpl.prototype.toString$0 = StringBufferImpl.prototype.toString;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = s + separator + strings.$index(i);
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
// ********** Code for _Worker **************
// ********** Code for top level **************
//  ********** Library dom **************
// ********** Code for dom_Window **************
// ********** Code for dom_AbstractWorker **************
// ********** Code for dom_ArrayBuffer **************
// ********** Code for dom_ArrayBufferView **************
// ********** Code for dom_Attr **************
// ********** Code for dom_AudioBuffer **************
// ********** Code for dom_AudioBufferSourceNode **************
// ********** Code for dom_AudioChannelMerger **************
// ********** Code for dom_AudioChannelSplitter **************
// ********** Code for dom_AudioContext **************
// ********** Code for dom_AudioDestinationNode **************
// ********** Code for dom_AudioGain **************
// ********** Code for dom_AudioGainNode **************
// ********** Code for dom_AudioListener **************
// ********** Code for dom_AudioNode **************
// ********** Code for dom_AudioPannerNode **************
// ********** Code for dom_AudioParam **************
// ********** Code for dom_AudioProcessingEvent **************
// ********** Code for dom_AudioSourceNode **************
// ********** Code for dom_BarInfo **************
// ********** Code for dom_BeforeLoadEvent **************
// ********** Code for dom_BiquadFilterNode **************
// ********** Code for dom_Blob **************
// ********** Code for dom_CDATASection **************
// ********** Code for dom_CSSCharsetRule **************
// ********** Code for dom_CSSFontFaceRule **************
// ********** Code for dom_CSSImportRule **************
// ********** Code for dom_CSSMediaRule **************
// ********** Code for dom_CSSPageRule **************
// ********** Code for dom_CSSPrimitiveValue **************
// ********** Code for dom_CSSRule **************
// ********** Code for dom_CSSRuleList **************
// ********** Code for dom_CSSStyleDeclaration **************
// ********** Code for dom_CSSStyleRule **************
// ********** Code for dom_CSSStyleSheet **************
// ********** Code for dom_CSSUnknownRule **************
// ********** Code for dom_CSSValue **************
// ********** Code for dom_CSSValueList **************
// ********** Code for dom_CanvasGradient **************
// ********** Code for dom_CanvasPattern **************
// ********** Code for dom_CanvasPixelArray **************
// ********** Code for dom_CanvasRenderingContext **************
// ********** Code for dom_CanvasRenderingContext2D **************
// ********** Code for dom_CharacterData **************
// ********** Code for dom_ClientRect **************
// ********** Code for dom_ClientRectList **************
// ********** Code for dom_Clipboard **************
// ********** Code for dom_CloseEvent **************
// ********** Code for dom_Comment **************
// ********** Code for dom_CompositionEvent **************
// ********** Code for Console **************
Console = (typeof console == 'undefined' ? {} : console);
// ********** Code for dom_ConvolverNode **************
// ********** Code for dom_Coordinates **************
// ********** Code for dom_Counter **************
// ********** Code for dom_Crypto **************
// ********** Code for dom_CustomEvent **************
// ********** Code for dom_DOMApplicationCache **************
// ********** Code for dom_DOMException **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      Object.defineProperty(proto, name,
        { value: method, enumerable: false, writable: true, 
        configurable: true });
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  Object.defineProperty(Object.prototype, name, { value: $dynamicBind,
      enumerable: false, writable: true, configurable: true});
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];

function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$dynamic("toString$0").DOMException = function() {
  return this.toString();
};
// ********** Code for dom_DOMFileSystem **************
// ********** Code for dom_DOMFileSystemSync **************
// ********** Code for dom_DOMFormData **************
// ********** Code for dom_DOMImplementation **************
// ********** Code for dom_DOMMimeType **************
// ********** Code for dom_DOMMimeTypeArray **************
// ********** Code for dom_DOMParser **************
// ********** Code for dom_DOMPlugin **************
// ********** Code for dom_DOMPluginArray **************
// ********** Code for dom_DOMSelection **************
$dynamic("toString$0").DOMSelection = function() {
  return this.toString();
};
// ********** Code for dom_DOMSettableTokenList **************
// ********** Code for dom_DOMTokenList **************
$dynamic("toString$0").DOMTokenList = function() {
  return this.toString();
};
// ********** Code for dom_DOMURL **************
// ********** Code for dom_DOMWindow **************
// ********** Code for dom_DataTransferItem **************
// ********** Code for dom_DataTransferItemList **************
// ********** Code for dom_DataView **************
// ********** Code for dom_Database **************
// ********** Code for dom_DatabaseSync **************
// ********** Code for dom_DedicatedWorkerContext **************
// ********** Code for dom_DelayNode **************
// ********** Code for dom_DeviceMotionEvent **************
// ********** Code for dom_DeviceOrientationEvent **************
// ********** Code for dom_DirectoryEntry **************
// ********** Code for dom_DirectoryEntrySync **************
// ********** Code for dom_DirectoryReader **************
// ********** Code for dom_DirectoryReaderSync **************
// ********** Code for dom_Document **************
// ********** Code for dom_DocumentFragment **************
// ********** Code for dom_DocumentType **************
// ********** Code for dom_DynamicsCompressorNode **************
// ********** Code for dom_Element **************
// ********** Code for dom_ElementTimeControl **************
// ********** Code for dom_ElementTraversal **************
// ********** Code for dom_Entity **************
// ********** Code for dom_EntityReference **************
// ********** Code for dom_Entry **************
// ********** Code for dom_EntryArray **************
// ********** Code for dom_EntryArraySync **************
// ********** Code for dom_EntrySync **************
// ********** Code for dom_ErrorEvent **************
// ********** Code for dom_Event **************
// ********** Code for dom_EventException **************
$dynamic("toString$0").EventException = function() {
  return this.toString();
};
// ********** Code for dom_EventSource **************
// ********** Code for dom_EventTarget **************
// ********** Code for dom_File **************
// ********** Code for dom_FileEntry **************
// ********** Code for dom_FileEntrySync **************
// ********** Code for dom_FileError **************
// ********** Code for dom_FileException **************
$dynamic("toString$0").FileException = function() {
  return this.toString();
};
// ********** Code for dom_FileList **************
// ********** Code for dom_FileReader **************
// ********** Code for dom_FileReaderSync **************
// ********** Code for dom_FileWriter **************
// ********** Code for dom_FileWriterSync **************
// ********** Code for dom_Float32Array **************
var dom_Float32Array = {};
dom_Float32Array.Float32Array$factory = function(length) {
  return dom_Float32Array._construct(length);
}
dom_Float32Array.Float32Array$fromList$factory = function(list) {
  return dom_Float32Array._construct(list);
}
dom_Float32Array._construct = function(arg) {
  return new Float32Array(arg);
}
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("set$length").Float32Array = function(value) { return this.length = value; };
// ********** Code for dom_Float64Array **************
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("set$length").Float64Array = function(value) { return this.length = value; };
// ********** Code for dom_Geolocation **************
// ********** Code for dom_Geoposition **************
// ********** Code for dom_HTMLAllCollection **************
// ********** Code for dom_HTMLAnchorElement **************
$dynamic("toString$0").HTMLAnchorElement = function() {
  return this.toString();
};
// ********** Code for dom_HTMLAppletElement **************
// ********** Code for dom_HTMLAreaElement **************
// ********** Code for dom_HTMLAudioElement **************
// ********** Code for dom_HTMLBRElement **************
// ********** Code for dom_HTMLBaseElement **************
// ********** Code for dom_HTMLBaseFontElement **************
// ********** Code for dom_HTMLBodyElement **************
// ********** Code for dom_HTMLButtonElement **************
// ********** Code for dom_HTMLCanvasElement **************
// ********** Code for dom_HTMLCollection **************
// ********** Code for dom_HTMLDListElement **************
// ********** Code for dom_HTMLDataListElement **************
// ********** Code for dom_HTMLDetailsElement **************
// ********** Code for dom_HTMLDirectoryElement **************
// ********** Code for dom_HTMLDivElement **************
// ********** Code for dom_HTMLDocument **************
// ********** Code for dom_HTMLElement **************
// ********** Code for dom_HTMLEmbedElement **************
// ********** Code for dom_HTMLFieldSetElement **************
// ********** Code for dom_HTMLFontElement **************
// ********** Code for dom_HTMLFormElement **************
// ********** Code for dom_HTMLFrameElement **************
// ********** Code for dom_HTMLFrameSetElement **************
// ********** Code for dom_HTMLHRElement **************
// ********** Code for dom_HTMLHeadElement **************
// ********** Code for dom_HTMLHeadingElement **************
// ********** Code for dom_HTMLHtmlElement **************
// ********** Code for dom_HTMLIFrameElement **************
// ********** Code for dom_HTMLImageElement **************
// ********** Code for dom_HTMLInputElement **************
// ********** Code for dom_HTMLIsIndexElement **************
// ********** Code for dom_HTMLKeygenElement **************
// ********** Code for dom_HTMLLIElement **************
// ********** Code for dom_HTMLLabelElement **************
// ********** Code for dom_HTMLLegendElement **************
// ********** Code for dom_HTMLLinkElement **************
// ********** Code for dom_HTMLMapElement **************
// ********** Code for dom_HTMLMarqueeElement **************
// ********** Code for dom_HTMLMediaElement **************
// ********** Code for dom_HTMLMenuElement **************
// ********** Code for dom_HTMLMetaElement **************
// ********** Code for dom_HTMLMeterElement **************
// ********** Code for dom_HTMLModElement **************
// ********** Code for dom_HTMLOListElement **************
// ********** Code for dom_HTMLObjectElement **************
// ********** Code for dom_HTMLOptGroupElement **************
// ********** Code for dom_HTMLOptionElement **************
// ********** Code for dom_HTMLOptionsCollection **************
// ********** Code for dom_HTMLOutputElement **************
// ********** Code for dom_HTMLParagraphElement **************
// ********** Code for dom_HTMLParamElement **************
// ********** Code for dom_HTMLPreElement **************
// ********** Code for dom_HTMLProgressElement **************
// ********** Code for dom_HTMLPropertiesCollection **************
// ********** Code for dom_HTMLQuoteElement **************
// ********** Code for dom_HTMLScriptElement **************
// ********** Code for dom_HTMLSelectElement **************
// ********** Code for dom_HTMLSourceElement **************
// ********** Code for dom_HTMLSpanElement **************
// ********** Code for dom_HTMLStyleElement **************
// ********** Code for dom_HTMLTableCaptionElement **************
// ********** Code for dom_HTMLTableCellElement **************
// ********** Code for dom_HTMLTableColElement **************
// ********** Code for dom_HTMLTableElement **************
// ********** Code for dom_HTMLTableRowElement **************
// ********** Code for dom_HTMLTableSectionElement **************
// ********** Code for dom_HTMLTextAreaElement **************
// ********** Code for dom_HTMLTitleElement **************
// ********** Code for dom_HTMLTrackElement **************
// ********** Code for dom_HTMLUListElement **************
// ********** Code for dom_HTMLUnknownElement **************
// ********** Code for dom_HTMLVideoElement **************
// ********** Code for dom_HashChangeEvent **************
// ********** Code for dom_HighPass2FilterNode **************
// ********** Code for dom_History **************
// ********** Code for dom_IDBAny **************
// ********** Code for dom_IDBCursor **************
// ********** Code for dom_IDBCursorWithValue **************
// ********** Code for dom_IDBDatabase **************
// ********** Code for dom_IDBDatabaseError **************
// ********** Code for dom_IDBDatabaseException **************
$dynamic("toString$0").IDBDatabaseException = function() {
  return this.toString();
};
// ********** Code for dom_IDBFactory **************
// ********** Code for dom_IDBIndex **************
// ********** Code for dom_IDBKey **************
// ********** Code for dom_IDBKeyRange **************
// ********** Code for dom_IDBObjectStore **************
// ********** Code for dom_IDBRequest **************
// ********** Code for dom_IDBTransaction **************
// ********** Code for dom_IDBVersionChangeEvent **************
// ********** Code for dom_IDBVersionChangeRequest **************
// ********** Code for dom_ImageData **************
// ********** Code for dom_InjectedScriptHost **************
// ********** Code for dom_InspectorFrontendHost **************
// ********** Code for dom_Int16Array **************
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("set$length").Int16Array = function(value) { return this.length = value; };
// ********** Code for dom_Int32Array **************
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("set$length").Int32Array = function(value) { return this.length = value; };
// ********** Code for dom_Int8Array **************
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("set$length").Int8Array = function(value) { return this.length = value; };
// ********** Code for dom_JavaScriptAudioNode **************
// ********** Code for dom_JavaScriptCallFrame **************
// ********** Code for dom_KeyboardEvent **************
// ********** Code for dom_Location **************
$dynamic("toString$0").Location = function() {
  return this.toString();
};
// ********** Code for dom_LowPass2FilterNode **************
// ********** Code for dom_MediaController **************
// ********** Code for dom_MediaElementAudioSourceNode **************
// ********** Code for dom_MediaError **************
// ********** Code for dom_MediaList **************
// ********** Code for dom_MediaQueryList **************
// ********** Code for dom_MediaQueryListListener **************
// ********** Code for dom_MemoryInfo **************
// ********** Code for dom_MessageChannel **************
// ********** Code for dom_MessageEvent **************
// ********** Code for dom_MessagePort **************
// ********** Code for dom_Metadata **************
// ********** Code for dom_MouseEvent **************
// ********** Code for dom_MutationCallback **************
// ********** Code for dom_MutationEvent **************
// ********** Code for dom_MutationRecord **************
// ********** Code for dom_NamedNodeMap **************
// ********** Code for dom_Navigator **************
// ********** Code for dom_Node **************
// ********** Code for dom_NodeFilter **************
// ********** Code for dom_NodeIterator **************
// ********** Code for dom_NodeList **************
// ********** Code for dom_NodeSelector **************
// ********** Code for dom_Notation **************
// ********** Code for dom_Notification **************
// ********** Code for dom_NotificationCenter **************
// ********** Code for dom_OESStandardDerivatives **************
// ********** Code for dom_OESTextureFloat **************
// ********** Code for dom_OESVertexArrayObject **************
// ********** Code for dom_OfflineAudioCompletionEvent **************
// ********** Code for dom_OperationNotAllowedException **************
$dynamic("toString$0").OperationNotAllowedException = function() {
  return this.toString();
};
// ********** Code for dom_OverflowEvent **************
// ********** Code for dom_PageTransitionEvent **************
// ********** Code for dom_Performance **************
// ********** Code for dom_PerformanceNavigation **************
// ********** Code for dom_PerformanceTiming **************
// ********** Code for dom_PointerLock **************
// ********** Code for dom_PopStateEvent **************
// ********** Code for dom_PositionError **************
// ********** Code for dom_ProcessingInstruction **************
// ********** Code for dom_ProgressEvent **************
// ********** Code for dom_RGBColor **************
// ********** Code for dom_Range **************
$dynamic("toString$0").Range = function() {
  return this.toString();
};
// ********** Code for dom_RangeException **************
$dynamic("toString$0").RangeException = function() {
  return this.toString();
};
// ********** Code for dom_RealtimeAnalyserNode **************
// ********** Code for dom_Rect **************
// ********** Code for dom_SQLError **************
// ********** Code for dom_SQLException **************
// ********** Code for dom_SQLResultSet **************
// ********** Code for dom_SQLResultSetRowList **************
// ********** Code for dom_SQLTransaction **************
// ********** Code for dom_SQLTransactionSync **************
// ********** Code for dom_SVGAElement **************
// ********** Code for dom_SVGAltGlyphDefElement **************
// ********** Code for dom_SVGAltGlyphElement **************
// ********** Code for dom_SVGAltGlyphItemElement **************
// ********** Code for dom_SVGAngle **************
// ********** Code for dom_SVGAnimateColorElement **************
// ********** Code for dom_SVGAnimateElement **************
// ********** Code for dom_SVGAnimateMotionElement **************
// ********** Code for dom_SVGAnimateTransformElement **************
// ********** Code for dom_SVGAnimatedAngle **************
// ********** Code for dom_SVGAnimatedBoolean **************
// ********** Code for dom_SVGAnimatedEnumeration **************
// ********** Code for dom_SVGAnimatedInteger **************
// ********** Code for dom_SVGAnimatedLength **************
// ********** Code for dom_SVGAnimatedLengthList **************
// ********** Code for dom_SVGAnimatedNumber **************
// ********** Code for dom_SVGAnimatedNumberList **************
// ********** Code for dom_SVGAnimatedPreserveAspectRatio **************
// ********** Code for dom_SVGAnimatedRect **************
// ********** Code for dom_SVGAnimatedString **************
// ********** Code for dom_SVGAnimatedTransformList **************
// ********** Code for dom_SVGAnimationElement **************
// ********** Code for dom_SVGCircleElement **************
// ********** Code for dom_SVGClipPathElement **************
// ********** Code for dom_SVGColor **************
// ********** Code for dom_SVGComponentTransferFunctionElement **************
// ********** Code for dom_SVGCursorElement **************
// ********** Code for dom_SVGDefsElement **************
// ********** Code for dom_SVGDescElement **************
// ********** Code for dom_SVGDocument **************
// ********** Code for dom_SVGElement **************
// ********** Code for dom_SVGElementInstance **************
// ********** Code for dom_SVGElementInstanceList **************
// ********** Code for dom_SVGEllipseElement **************
// ********** Code for dom_SVGException **************
$dynamic("toString$0").SVGException = function() {
  return this.toString();
};
// ********** Code for dom_SVGExternalResourcesRequired **************
// ********** Code for dom_SVGFEBlendElement **************
// ********** Code for dom_SVGFEColorMatrixElement **************
// ********** Code for dom_SVGFEComponentTransferElement **************
// ********** Code for dom_SVGFECompositeElement **************
// ********** Code for dom_SVGFEConvolveMatrixElement **************
// ********** Code for dom_SVGFEDiffuseLightingElement **************
// ********** Code for dom_SVGFEDisplacementMapElement **************
// ********** Code for dom_SVGFEDistantLightElement **************
// ********** Code for dom_SVGFEDropShadowElement **************
// ********** Code for dom_SVGFEFloodElement **************
// ********** Code for dom_SVGFEFuncAElement **************
// ********** Code for dom_SVGFEFuncBElement **************
// ********** Code for dom_SVGFEFuncGElement **************
// ********** Code for dom_SVGFEFuncRElement **************
// ********** Code for dom_SVGFEGaussianBlurElement **************
// ********** Code for dom_SVGFEImageElement **************
// ********** Code for dom_SVGFEMergeElement **************
// ********** Code for dom_SVGFEMergeNodeElement **************
// ********** Code for dom_SVGFEMorphologyElement **************
// ********** Code for dom_SVGFEOffsetElement **************
// ********** Code for dom_SVGFEPointLightElement **************
// ********** Code for dom_SVGFESpecularLightingElement **************
// ********** Code for dom_SVGFESpotLightElement **************
// ********** Code for dom_SVGFETileElement **************
// ********** Code for dom_SVGFETurbulenceElement **************
// ********** Code for dom_SVGFilterElement **************
// ********** Code for dom_SVGFilterPrimitiveStandardAttributes **************
// ********** Code for dom_SVGFitToViewBox **************
// ********** Code for dom_SVGFontElement **************
// ********** Code for dom_SVGFontFaceElement **************
// ********** Code for dom_SVGFontFaceFormatElement **************
// ********** Code for dom_SVGFontFaceNameElement **************
// ********** Code for dom_SVGFontFaceSrcElement **************
// ********** Code for dom_SVGFontFaceUriElement **************
// ********** Code for dom_SVGForeignObjectElement **************
// ********** Code for dom_SVGGElement **************
// ********** Code for dom_SVGGlyphElement **************
// ********** Code for dom_SVGGlyphRefElement **************
// ********** Code for dom_SVGGradientElement **************
// ********** Code for dom_SVGHKernElement **************
// ********** Code for dom_SVGImageElement **************
// ********** Code for dom_SVGLangSpace **************
// ********** Code for dom_SVGLength **************
// ********** Code for dom_SVGLengthList **************
// ********** Code for dom_SVGLineElement **************
// ********** Code for dom_SVGLinearGradientElement **************
// ********** Code for dom_SVGLocatable **************
// ********** Code for dom_SVGMPathElement **************
// ********** Code for dom_SVGMarkerElement **************
// ********** Code for dom_SVGMaskElement **************
// ********** Code for dom_SVGMatrix **************
// ********** Code for dom_SVGMetadataElement **************
// ********** Code for dom_SVGMissingGlyphElement **************
// ********** Code for dom_SVGNumber **************
// ********** Code for dom_SVGNumberList **************
// ********** Code for dom_SVGPaint **************
// ********** Code for dom_SVGPathElement **************
// ********** Code for dom_SVGPathSeg **************
// ********** Code for dom_SVGPathSegArcAbs **************
// ********** Code for dom_SVGPathSegArcRel **************
// ********** Code for dom_SVGPathSegClosePath **************
// ********** Code for dom_SVGPathSegCurvetoCubicAbs **************
// ********** Code for dom_SVGPathSegCurvetoCubicRel **************
// ********** Code for dom_SVGPathSegCurvetoCubicSmoothAbs **************
// ********** Code for dom_SVGPathSegCurvetoCubicSmoothRel **************
// ********** Code for dom_SVGPathSegCurvetoQuadraticAbs **************
// ********** Code for dom_SVGPathSegCurvetoQuadraticRel **************
// ********** Code for dom_SVGPathSegCurvetoQuadraticSmoothAbs **************
// ********** Code for dom_SVGPathSegCurvetoQuadraticSmoothRel **************
// ********** Code for dom_SVGPathSegLinetoAbs **************
// ********** Code for dom_SVGPathSegLinetoHorizontalAbs **************
// ********** Code for dom_SVGPathSegLinetoHorizontalRel **************
// ********** Code for dom_SVGPathSegLinetoRel **************
// ********** Code for dom_SVGPathSegLinetoVerticalAbs **************
// ********** Code for dom_SVGPathSegLinetoVerticalRel **************
// ********** Code for dom_SVGPathSegList **************
// ********** Code for dom_SVGPathSegMovetoAbs **************
// ********** Code for dom_SVGPathSegMovetoRel **************
// ********** Code for dom_SVGPatternElement **************
// ********** Code for dom_SVGPoint **************
// ********** Code for dom_SVGPointList **************
// ********** Code for dom_SVGPolygonElement **************
// ********** Code for dom_SVGPolylineElement **************
// ********** Code for dom_SVGPreserveAspectRatio **************
// ********** Code for dom_SVGRadialGradientElement **************
// ********** Code for dom_SVGRect **************
// ********** Code for dom_SVGRectElement **************
// ********** Code for dom_SVGRenderingIntent **************
// ********** Code for dom_SVGSVGElement **************
// ********** Code for dom_SVGScriptElement **************
// ********** Code for dom_SVGSetElement **************
// ********** Code for dom_SVGStopElement **************
// ********** Code for dom_SVGStringList **************
// ********** Code for dom_SVGStylable **************
// ********** Code for dom_SVGStyleElement **************
// ********** Code for dom_SVGSwitchElement **************
// ********** Code for dom_SVGSymbolElement **************
// ********** Code for dom_SVGTRefElement **************
// ********** Code for dom_SVGTSpanElement **************
// ********** Code for dom_SVGTests **************
// ********** Code for dom_SVGTextContentElement **************
// ********** Code for dom_SVGTextElement **************
// ********** Code for dom_SVGTextPathElement **************
// ********** Code for dom_SVGTextPositioningElement **************
// ********** Code for dom_SVGTitleElement **************
// ********** Code for dom_SVGTransform **************
// ********** Code for dom_SVGTransformList **************
// ********** Code for dom_SVGTransformable **************
// ********** Code for dom_SVGURIReference **************
// ********** Code for dom_SVGUnitTypes **************
// ********** Code for dom_SVGUseElement **************
// ********** Code for dom_SVGVKernElement **************
// ********** Code for dom_SVGViewElement **************
// ********** Code for dom_SVGViewSpec **************
// ********** Code for dom_SVGZoomAndPan **************
// ********** Code for dom_SVGZoomEvent **************
// ********** Code for dom_Screen **************
// ********** Code for dom_ScriptProfile **************
// ********** Code for dom_ScriptProfileNode **************
// ********** Code for dom_SharedWorker **************
// ********** Code for dom_SharedWorkercontext **************
// ********** Code for dom_SpeechInputEvent **************
// ********** Code for dom_SpeechInputResult **************
// ********** Code for dom_SpeechInputResultList **************
// ********** Code for dom_Storage **************
// ********** Code for dom_StorageEvent **************
// ********** Code for dom_StorageInfo **************
// ********** Code for dom_StyleMedia **************
// ********** Code for dom_StyleSheet **************
// ********** Code for dom_StyleSheetList **************
// ********** Code for dom_Text **************
// ********** Code for dom_TextEvent **************
// ********** Code for dom_TextMetrics **************
// ********** Code for dom_TextTrack **************
// ********** Code for dom_TextTrackCue **************
// ********** Code for dom_TextTrackCueList **************
// ********** Code for dom_TextTrackList **************
// ********** Code for dom_TimeRanges **************
// ********** Code for dom_Touch **************
// ********** Code for dom_TouchEvent **************
// ********** Code for dom_TouchList **************
// ********** Code for dom_TrackEvent **************
// ********** Code for dom_TreeWalker **************
// ********** Code for dom_UIEvent **************
// ********** Code for dom_Uint16Array **************
var dom_Uint16Array = {};
dom_Uint16Array.Uint16Array$fromList$factory = function(list) {
  return dom_Uint16Array._construct(list);
}
dom_Uint16Array._construct = function(arg) {
  return new Uint16Array(arg);
}
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("set$length").Uint16Array = function(value) { return this.length = value; };
// ********** Code for dom_Uint32Array **************
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("set$length").Uint32Array = function(value) { return this.length = value; };
// ********** Code for dom_Uint8Array **************
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("set$length").Uint8Array = function(value) { return this.length = value; };
// ********** Code for dom_ValidityState **************
// ********** Code for dom_WaveShaperNode **************
// ********** Code for dom_WebGLActiveInfo **************
// ********** Code for dom_WebGLBuffer **************
// ********** Code for dom_WebGLCompressedTextures **************
// ********** Code for dom_WebGLContextAttributes **************
// ********** Code for dom_WebGLContextEvent **************
// ********** Code for dom_WebGLDebugRendererInfo **************
// ********** Code for dom_WebGLDebugShaders **************
// ********** Code for dom_WebGLFramebuffer **************
// ********** Code for dom_WebGLLoseContext **************
// ********** Code for dom_WebGLProgram **************
// ********** Code for dom_WebGLRenderbuffer **************
// ********** Code for dom_WebGLRenderingContext **************
// ********** Code for dom_WebGLShader **************
// ********** Code for dom_WebGLTexture **************
// ********** Code for dom_WebGLUniformLocation **************
// ********** Code for dom_WebGLVertexArrayObjectOES **************
// ********** Code for dom_WebKitAnimation **************
// ********** Code for dom_WebKitAnimationEvent **************
// ********** Code for dom_WebKitAnimationList **************
// ********** Code for dom_WebKitBlobBuilder **************
// ********** Code for dom_WebKitCSSFilterValue **************
// ********** Code for dom_WebKitCSSKeyframeRule **************
// ********** Code for dom_WebKitCSSKeyframesRule **************
// ********** Code for dom_WebKitCSSMatrix **************
$dynamic("toString$0").WebKitCSSMatrix = function() {
  return this.toString();
};
// ********** Code for dom_WebKitCSSTransformValue **************
// ********** Code for dom_WebKitMutationObserver **************
// ********** Code for dom_WebKitNamedFlow **************
// ********** Code for dom_WebKitPoint **************
// ********** Code for dom_WebKitTransitionEvent **************
// ********** Code for dom_WebSocket **************
// ********** Code for dom_WheelEvent **************
// ********** Code for dom_Worker **************
// ********** Code for dom_WorkerContext **************
// ********** Code for dom_WorkerLocation **************
$dynamic("toString$0").WorkerLocation = function() {
  return this.toString();
};
// ********** Code for dom_WorkerNavigator **************
// ********** Code for dom_XMLHttpRequest **************
// ********** Code for dom_XMLHttpRequestException **************
$dynamic("toString$0").XMLHttpRequestException = function() {
  return this.toString();
};
// ********** Code for dom_XMLHttpRequestProgressEvent **************
// ********** Code for dom_XMLHttpRequestUpload **************
// ********** Code for dom_XMLSerializer **************
// ********** Code for dom_XPathEvaluator **************
// ********** Code for dom_XPathException **************
$dynamic("toString$0").XPathException = function() {
  return this.toString();
};
// ********** Code for dom_XPathExpression **************
// ********** Code for dom_XPathNSResolver **************
// ********** Code for dom_XPathResult **************
// ********** Code for dom_XSLTProcessor **************
// ********** Code for _Collections **************
function _Collections() {}
// ********** Code for _VariableSizeListIterator_T **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(_VariableSizeListIterator_T, _VariableSizeListIterator);
function _VariableSizeListIterator_T() {}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator_T);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
_FixedSizeListIterator.prototype.hasNext$0 = _FixedSizeListIterator.prototype.hasNext;
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._dom_array.$index(this._dom_pos++);
}
_VariableSizeListIterator.prototype.hasNext$0 = _VariableSizeListIterator.prototype.hasNext;
_VariableSizeListIterator.prototype.next$0 = _VariableSizeListIterator.prototype.next;
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library matrix **************
// ********** Code for ZeroLengthVectorException **************
function ZeroLengthVectorException() {

}
// ********** Code for Vector3 **************
function Vector3(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
Vector3.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}
Vector3.prototype.normalize = function() {
  var len = this.magnitude();
  if (len == (0.0)) {
    $throw(new ZeroLengthVectorException());
  }
  return new Vector3(this.x / len, this.y / len, this.z / len);
}
Vector3.prototype.$sub = function(other) {
  return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
}
Vector3.prototype.toString = function() {
  return ("Vector3(" + this.x + "," + this.y + "," + this.z + ")");
}
Vector3.prototype.toString$0 = Vector3.prototype.toString;
// ********** Code for Matrix4 **************
function Matrix4() {
  this.buf = dom_Float32Array.Float32Array$factory((16));
}
Matrix4.rc = function(row, col) {
  return row + col * (4);
}
Matrix4.prototype.set$m00 = function(m) {
  this.buf[Matrix4.rc((0), (0))] = m;
}
Matrix4.prototype.set$m01 = function(m) {
  this.buf[Matrix4.rc((0), (1))] = m;
}
Matrix4.prototype.set$m02 = function(m) {
  this.buf[Matrix4.rc((0), (2))] = m;
}
Matrix4.prototype.set$m03 = function(m) {
  this.buf[Matrix4.rc((0), (3))] = m;
}
Matrix4.prototype.set$m10 = function(m) {
  this.buf[Matrix4.rc((1), (0))] = m;
}
Matrix4.prototype.set$m11 = function(m) {
  this.buf[Matrix4.rc((1), (1))] = m;
}
Matrix4.prototype.set$m12 = function(m) {
  this.buf[Matrix4.rc((1), (2))] = m;
}
Matrix4.prototype.set$m13 = function(m) {
  this.buf[Matrix4.rc((1), (3))] = m;
}
Matrix4.prototype.set$m20 = function(m) {
  this.buf[Matrix4.rc((2), (0))] = m;
}
Matrix4.prototype.set$m21 = function(m) {
  this.buf[Matrix4.rc((2), (1))] = m;
}
Matrix4.prototype.set$m22 = function(m) {
  this.buf[Matrix4.rc((2), (2))] = m;
}
Matrix4.prototype.set$m23 = function(m) {
  this.buf[Matrix4.rc((2), (3))] = m;
}
Matrix4.prototype.set$m32 = function(m) {
  this.buf[Matrix4.rc((3), (2))] = m;
}
Matrix4.prototype.set$m33 = function(m) {
  this.buf[Matrix4.rc((3), (3))] = m;
}
Matrix4.prototype.toString = function() {
  var rows = new Array();
  for (var row = (0);
   row < (4); row++) {
    var items = new Array();
    for (var col = (0);
     col < (4); col++) {
      var v = this.buf[Matrix4.rc(row, col)];
      if (v.abs() < (0.0)) {
        v = (0.0);
      }
      var display = null;
      try {
        display = v.toStringAsPrecision((4));
      } catch (e) {
        e = _toDartException(e);
        display = v.toString$0();
      }
      items.add(display);
    }
    rows.add(("| " + Strings.join(items, ", ") + " |"));
  }
  return ("Matrix4:\n" + Strings.join(rows, "\n"));
}
Matrix4.identity = function() {
  var m = new Matrix4();
  m.set$m00((1.0));
  m.set$m11((1.0));
  m.set$m22((1.0));
  m.set$m33((1.0));
  return m;
}
Matrix4.rotation = function(degrees, axis) {
  var radians = degrees / (180.0) * (3.141593);
  axis = axis.normalize();
  var x = axis.x;
  var y = axis.y;
  var z = axis.z;
  var s = Math.sin(radians);
  var c = Math.cos(radians);
  var t = (1) - c;
  var m = new Matrix4();
  m.set$m00(x * x * t + c);
  m.set$m10(x * y * t + z * s);
  m.set$m20(x * z * t - y * s);
  m.set$m01(x * y * t - z * s);
  m.set$m11(y * y * t + c);
  m.set$m21(y * z * t + x * s);
  m.set$m02(x * z * t + y * s);
  m.set$m12(y * z * t - x * s);
  m.set$m22(z * z * t + c);
  m.set$m33((1.0));
  return m;
}
Matrix4.translation = function(v) {
  var m = Matrix4.identity();
  m.set$m03(v.x);
  m.set$m13(v.y);
  m.set$m23(v.z);
  return m;
}
Matrix4.prototype.$mul = function(matrixB) {
  var $0;
  var matrixC = new Matrix4();
  var bufA = this.buf;
  var bufB = matrixB.buf;
  var bufC = matrixC.buf;
  for (var row = (0);
   row < (4); row++) {
    for (var col = (0);
     col < (4); col++) {
      for (var i = (0);
       i < (4); i++) {
        bufC[($0 = Matrix4.rc(row, col))] = bufC[$0] + (bufA[Matrix4.rc(row, i)] * bufB[Matrix4.rc(i, col)]);
      }
    }
  }
  return matrixC;
}
Matrix4.perspective = function(fovyDegrees, aspectRatio, zNear, zFar) {
  var yTop = Math.tan(fovyDegrees * (3.141593) / (180.0) / (2.0)) * zNear;
  var xRight = aspectRatio * yTop;
  var zDepth = zFar - zNear;
  var m = new Matrix4();
  m.set$m00(zNear / xRight);
  m.set$m11(zNear / yTop);
  m.set$m22(-(zFar + zNear) / zDepth);
  m.set$m23(-((2) * zNear * zFar) / zDepth);
  m.set$m32((-1));
  return m;
}
Matrix4.prototype.toString$0 = Matrix4.prototype.toString;
// ********** Code for top level **************
//  ********** Library Lesson05 **************
// ********** Code for Lesson05 **************
function Lesson05() {

}
Lesson05.prototype.run = function() {
  new example().Init();
}
// ********** Code for example **************
function example() {
  this.rPyramid = (0);
  this.rCube = (0);
}
example.prototype._createShaders = function() {
  this.fragmentShaderSource = "    precision mediump float;\n\n    varying vec4 vColor;\n\n    void main(void) {\n        gl_FragColor = vColor;\n    }\n    ";
  this.vertexShaderSource = " \n    attribute vec3 aVertexPosition;\n    attribute vec4 aVertexColor;\n\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n\n    varying vec4 vColor;\n\n    void main(void) {\n        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n        vColor = aVertexColor;\n    }";
  this.fragmentShader = this.gl.createShader((35632));
  this.vertexShader = this.gl.createShader((35633));
  this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);
  this.gl.compileShader(this.fragmentShader);
  this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
  this.gl.compileShader(this.vertexShader);
  var shaderProgram = this.gl.createProgram();
  this.gl.attachShader(shaderProgram, this.vertexShader);
  this.gl.attachShader(shaderProgram, this.fragmentShader);
  this.gl.linkProgram(shaderProgram);
  this.gl.useProgram(shaderProgram);
  this.vertexPositionAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexPosition");
  this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
  this.vertexColorAttribute = this.gl.getAttribLocation(shaderProgram, "aVertexColor");
  this.gl.enableVertexAttribArray(this.vertexColorAttribute);
  this.pMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uPMatrix");
  this.mvMatrixUniform = this.gl.getUniformLocation(shaderProgram, "uMVMatrix");
}
example.prototype._createBuffers = function() {
  this.pyramidVertexPositionBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34962), this.pyramidVertexPositionBuffer);
  var vertices = [(0.0), (1.0), (0.0), (-1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (0.0), (1.0), (0.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (-1.0), (0.0), (1.0), (0.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (-1.0), (0.0), (1.0), (0.0), (-1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0)];
  this.gl.bufferData((34962), dom_Float32Array.Float32Array$fromList$factory(vertices), (35044));
  this.pyramidVertexPositionBufferitemSize = (3);
  this.pyramidVertexPositionBuffernumItems = (12);
  this.pyramidVertexColorBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34962), this.pyramidVertexColorBuffer);
  var colors = [(1.0), (0.0), (0.0), (1.0), (0.0), (1.0), (0.0), (1.0), (0.0), (0.0), (1.0), (1.0), (1.0), (0.0), (0.0), (1.0), (0.0), (0.0), (1.0), (1.0), (0.0), (1.0), (0.0), (1.0), (1.0), (0.0), (0.0), (1.0), (0.0), (1.0), (0.0), (1.0), (0.0), (0.0), (1.0), (1.0), (1.0), (0.0), (0.0), (1.0), (0.0), (0.0), (1.0), (1.0), (0.0), (1.0), (0.0), (1.0)];
  this.gl.bufferData((34962), dom_Float32Array.Float32Array$fromList$factory(colors), (35044));
  this.pyramidVertexColorBufferitemSize = (4);
  this.pyramidVertexColorBuffernumItems = (12);
  this.cubeVertexPositionBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34962), this.cubeVertexPositionBuffer);
  vertices = [(-1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (1.0), (1.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (-1.0), (1.0), (1.0), (1.0), (1.0), (1.0), (1.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (-1.0), (1.0), (-1.0), (1.0), (-1.0), (-1.0), (1.0), (1.0), (-1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (1.0), (1.0), (1.0), (-1.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (-1.0)];
  this.gl.bufferData((34962), dom_Float32Array.Float32Array$fromList$factory(vertices), (35044));
  this.cubeVertexPositionBufferitemSize = (3);
  this.cubeVertexPositionBuffernumItems = (24);
  this.cubeVertexColorBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34962), this.cubeVertexColorBuffer);
  colors = [[(1.0), (0.0), (0.0), (1.0)], [(1.0), (1.0), (0.0), (1.0)], [(0.0), (1.0), (0.0), (1.0)], [(1.0), (0.5), (0.5), (1.0)], [(1.0), (0.0), (1.0), (1.0)], [(0.0), (0.0), (1.0), (1.0)]];
  var unpackedColors = [];
  for (var $$i = colors.iterator$0(); $$i.hasNext$0(); ) {
    var i = $$i.next$0();
    for (var j = (0);
     j < (4); j = $add(j, (1))) {
      unpackedColors.addAll$1(i);
    }
  }
  this.gl.bufferData((34962), dom_Float32Array.Float32Array$fromList$factory(unpackedColors), (35044));
  this.cubeVertexColorBufferitemSize = (4);
  this.cubeVertexColorBuffernumItems = (24);
  this.cubeVertexIndexBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34963), this.cubeVertexIndexBuffer);
  var cubeVertexIndices = [(0), (1), (2), (0), (2), (3), (4), (5), (6), (4), (6), (7), (8), (9), (10), (8), (10), (11), (12), (13), (14), (12), (14), (15), (16), (17), (18), (16), (18), (19), (20), (21), (22), (20), (22), (23)];
  this.gl.bufferData((34963), dom_Uint16Array.Uint16Array$fromList$factory(cubeVertexIndices), (35044));
  this.cubeVertexIndexBufferitemSize = (1);
  this.cubeVertexIndexBuffernumItems = (36);
}
example.prototype._tick = function(t) {
  get$window().webkitRequestAnimationFrame($wrap_call$1(this.get$_tick()), this.canvas);
  this._drawScene();
  this._animate();
}
example.prototype.get$_tick = function() {
  return this._tick.bind(this);
}
example.prototype._degToRad = function(degrees) {
  return $mul(degrees, (3.141593)) / (180);
}
example.prototype._setMatrixUniforms = function() {
  this.gl.uniformMatrix4fv(this.pMatrixUniform, false, this.pMatrix.buf);
  this.gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.mvMatrix.buf);
}
example.prototype._mvPushMatrix = function() {
  var c = this.mvMatrix.$mul(Matrix4.identity());
  this.mvMatrixStack.add(c);
}
example.prototype._mvPopMatrix = function() {
  if (this.mvMatrixStack.get$length() != (0)) {
    this.mvMatrix = this.mvMatrixStack.removeLast();
  }
}
example.prototype._drawScene = function() {
  this.gl.viewport((0), (0), this.canvas.width, this.canvas.height);
  this.gl.clear((16640));
  this.pMatrix = Matrix4.perspective((45.0), this.canvas.width / this.canvas.height, (0.1), (100.0));
  this.mvMatrix = Matrix4.translation(new Vector3((-1.5), (0.0), (-8.0)));
  this._mvPushMatrix();
  this.mvMatrix = this.mvMatrix.$mul(Matrix4.rotation(this._degToRad(this.rPyramid), new Vector3((0), (1), (0))));
  this.gl.bindBuffer((34962), this.pyramidVertexPositionBuffer);
  this.gl.vertexAttribPointer(this.vertexPositionAttribute, this.pyramidVertexPositionBufferitemSize, (5126), false, (0), (0));
  this.gl.bindBuffer((34962), this.pyramidVertexColorBuffer);
  this.gl.vertexAttribPointer(this.vertexColorAttribute, this.pyramidVertexColorBufferitemSize, (5126), false, (0), (0));
  this._setMatrixUniforms();
  this.gl.drawArrays((4), (0), this.pyramidVertexPositionBuffernumItems);
  this._mvPopMatrix();
  this.mvMatrix = this.mvMatrix.$mul(Matrix4.translation(new Vector3((3.0), (0.0), (0.0))));
  this._mvPushMatrix();
  this.mvMatrix = this.mvMatrix.$mul(Matrix4.rotation(this._degToRad(this.rCube), new Vector3((1), (1), (1))));
  this.gl.bindBuffer((34962), this.cubeVertexPositionBuffer);
  this.gl.vertexAttribPointer(this.vertexPositionAttribute, this.cubeVertexPositionBufferitemSize, (5126), false, (0), (0));
  this.gl.bindBuffer((34962), this.cubeVertexColorBuffer);
  this.gl.vertexAttribPointer(this.vertexColorAttribute, this.cubeVertexColorBufferitemSize, (5126), false, (0), (0));
  this.gl.bindBuffer((34963), this.cubeVertexIndexBuffer);
  this._setMatrixUniforms();
  this.gl.drawElements((4), this.cubeVertexIndexBuffernumItems, (5123), (0));
  this._mvPopMatrix();
}
example.prototype._animate = function() {
  this.rPyramid = $add(this.rPyramid, (90));
  this.rCube = $sub(this.rCube, (75));
}
example.prototype.Init = function() {
  this.mvMatrixStack = [];
  this.canvas = get$document().getElementById("canvas");
  this.gl = this.canvas.getContext("experimental-webgl");
  this.gl.viewport((0), (0), this.canvas.width, this.canvas.height);
  this._createShaders();
  this._createBuffers();
  this.gl.clearColor((0.0), (0.0), (0.0), (1.0));
  this.gl.enable((2929));
  this._tick((0));
}
// ********** Code for top level **************
function main() {
  new Lesson05().run();
}
// 24 dynamic types.
// 25 types
// 1 !leaf
(function(){
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
}
var const$0000 = Object.create(NoMoreElementsException.prototype, {});
$static_init();
main();
