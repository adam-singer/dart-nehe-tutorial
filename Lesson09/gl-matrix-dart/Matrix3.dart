class Matrix3 {
  
  Float32Array _dest;
  
  Matrix3() {
    _dest = new Float32Array(9);
  }
  
  Matrix3.fromList(List<num> list) {
    if (list.length != 9) {
      throw new Exception("Matrix4.fromList requires list of exactly 9 items (${list.length} given)");
    }
    _dest = new Float32Array.fromList(list);
  }
  
  Matrix3.fromFloat32Array(Float32Array list) {
    if (list.length != 9) {
      throw new Exception("Matrix4.fromList requires Float32Array of exactly 9 items (${list.length} given)");
    }
    _dest = list;
  }
  
  operator [](int index) => _dest[index];

  operator []=(int index, double value) => _dest[index] = value;

  Float32Array get array()                   => _dest;
  set array(Float32Array array) => _dest = array;
  
  /**
   * Transposes a mat3 (flips the values over the diagonal)
   *
   * @param {mat3} mat mat3 to transpose
   * @param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
   *
   * @param {mat3} dest is specified, mat otherwise
   */
  void transpose([Matrix3 dest]) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (dest == null) {
        var a01 = _dest[1], a02 = _dest[2],
            a12 = _dest[5];

        _dest[1] = _dest[3];
        _dest[2] = _dest[6];
        _dest[3] = a01;
        _dest[5] = _dest[7];
        _dest[6] = a02;
        _dest[7] = a12;
        
    } else {

    dest[0] = _dest[0];
    dest[1] = _dest[3];
    dest[2] = _dest[6];
    dest[3] = _dest[1];
    dest[4] = _dest[4];
    dest[5] = _dest[7];
    dest[6] = _dest[2];
    dest[7] = _dest[5];
    dest[8] = _dest[8];
    
    }   
  }
}
