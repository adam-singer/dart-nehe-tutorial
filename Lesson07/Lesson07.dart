#import('dart:html');
#import('utils/webglUtils.dart');
#import('matrix_client.dart');
#source('example.dart');


void main() {
  print('starting lesson07');
  new example().init();
  print('done loading');
  
}

void show(String message) {
  document.query('#status').innerHTML = message;
}
