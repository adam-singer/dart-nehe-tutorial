
class Quat4 {
  
  Float32Array _items;
  
  Quat4() {
    _items = new Float32Array(4);
  }
  
  Quat4.identity() {
    _items = new Float32Array(4);
    _items[0] = 0;
    _items[1] = 0;
    _items[2] = 0;
    _items[3] = 1;
  }
  
  operator [](int index) => _items[index];

  operator []=(int index, double value) => _items[index] = value;

  
  Float32Array get array()      => _items;
  set array(Float32Array array) => _items = array;
  
  
  void identity() {
    _items[0] = 0;
    _items[1] = 0;
    _items[2] = 0;
    _items[3] = 1;
  }
  
  

}
