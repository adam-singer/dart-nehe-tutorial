#import('dart:html');
#import('matrix_client.dart');
#source('example.dart');


class Lesson06 {

  Lesson06() {
  }

  void run() {
    new example().Init();
    write("Hello World!");
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    //document.query('#status').innerHTML = message;
    //HTMLLabelElement  l = document.getElementById('status'); //  = message;
    //l.innerText = message;
  }
}

void main() {
  new Lesson06().run();
}
