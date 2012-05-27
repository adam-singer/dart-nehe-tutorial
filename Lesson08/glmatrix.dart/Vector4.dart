class Vector4 {
  Float32Array dest;
  
  Vector4([Float32Array list]) {
    if(list == null){
      dest = new Float32Array(4);
      return;
    }
    if(list.length != 4){
      dest = new Float32Array(4);
      return;
    }
    dest = list;
  }
  
  int get X() => dest[0];
  void set X(num val) { dest[0] = val;}
  int get Y() => dest[1];
  void set Y(num val) { dest[1] = val;}
  int get Z() => dest[2];
  void set Z(num val) { dest[2] = val;}
  int get W() => dest[3];
  void set W(num val) { dest[3] = val;}
  
}
