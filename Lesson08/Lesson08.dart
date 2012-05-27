#import("dart:html");
#import('utils/webglUtils.dart');
#import('gl-matrix-dart/gl-matrix.dart');
#source("example.dart");


void main() {
  print("starting lesson08");
  new example().init();
  print("done loading");  
}

void show(String message) {
  document.query('#status').innerHTML = message;
}