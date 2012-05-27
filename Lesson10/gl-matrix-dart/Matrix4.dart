
class Matrix4 {
  
  
  Float32Array _dest;
  
  Matrix4() {
    _dest = new Float32Array(16);
  }
  
  Matrix4.fromList(List<num> list) {
    if (list.length != 16) {
      throw new Exception("Matrix4.fromList requires list of exactly 16 items (${list.length} given)");
    }
    _dest = new Float32Array.fromList(list);
  }
  
  Matrix4.fromFloat32Array(Float32Array list) {
    if (list.length != 16) {
      throw new Exception("Matrix4.fromList requires Float32Array of exactly 16 items (${list.length} given)");
    }
    _dest = list;
  }
  
  Matrix4.identity() {
    _dest = new Float32Array(16);
    this.identity();
  }
  
  operator [](int index) => _dest[index];

  operator []=(int index, double value) => _dest[index] = value;
  
  
  Float32Array get array()                   => _dest;
               set array(Float32Array array) => _dest = array;
  
  /**
   * Copies the values of one mat4 to another
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat4} dest mat4 receiving copied values
   *
   * @returns {mat4} dest
   */
  Matrix4 clone() {
    return new Matrix4.fromFloat32Array(_dest.getRange(0, _dest.length)); // copy items
  }
  
  /**
   * Sets a mat4 to an identity matrix
   *
   * @param {mat4} dest mat4 to set
   *
   * @returns {mat4} dest
   */
  void identity() {
      _dest[0] = 1;
      _dest[1] = 0;
      _dest[2] = 0;
      _dest[3] = 0;
      _dest[4] = 0;
      _dest[5] = 1;
      _dest[6] = 0;
      _dest[7] = 0;
      _dest[8] = 0;
      _dest[9] = 0;
      _dest[10] = 1;
      _dest[11] = 0;
      _dest[12] = 0;
      _dest[13] = 0;
      _dest[14] = 0;
      _dest[15] = 1;
  }

  /**
   * Transposes a mat4 (flips the values over the diagonal)
   *
   * @param {mat4} mat mat4 to transpose
   * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
   *
   * @param {mat4} dest is specified, mat otherwise
   */
  void transpose([Matrix4 dest]) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (null == dest) {
      double
          a01 = _dest[1], a02 = _dest[2], a03 = _dest[3],
                          a12 = _dest[6], a13 = _dest[7],
                                          a23 = _dest[11];

      _dest[1]  = _dest[4];
      _dest[2]  = _dest[8];
      _dest[3]  = _dest[12];
      _dest[4]  = a01;
      _dest[6]  = _dest[9];
      _dest[7]  = _dest[13];
      _dest[8]  = a02;
      _dest[9]  = a12;
      _dest[11] = _dest[14];
      _dest[12] = a03;
      _dest[13] = a13;
      _dest[14] = a23;
    } else {
      dest[0]  = _dest[0];
      dest[1]  = _dest[4];
      dest[2]  = _dest[8];
      dest[3]  = _dest[12];
      dest[4]  = _dest[1];
      dest[5]  = _dest[5];
      dest[6]  = _dest[9];
      dest[7]  = _dest[13];
      dest[8]  = _dest[2];
      dest[9]  = _dest[6];
      dest[10] = _dest[10];
      dest[11] = _dest[14];
      dest[12] = _dest[3];
      dest[13] = _dest[7];
      dest[14] = _dest[11];
      dest[15] = _dest[15];
    }
  }

  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} mat mat4 to calculate determinant of
   *
   * @returns {number} determinant of mat
   */
  double determinant() {
    // Cache the matrix values (makes for huge speed increases!)
    double a00 = _dest[0],  a01 = _dest[1],  a02 = _dest[2],  a03 = _dest[3],
           a10 = _dest[4],  a11 = _dest[5],  a12 = _dest[6],  a13 = _dest[7],
           a20 = _dest[8],  a21 = _dest[9],  a22 = _dest[10], a23 = _dest[11],
           a30 = _dest[12], a31 = _dest[13], a32 = _dest[14], a33 = _dest[15];

    return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
            a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
            a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
            a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
            a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
            a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
  }

  /**
   * Calculates the inverse matrix of a mat4
   *
   * @param {mat4} mat mat4 to calculate inverse of
   * @param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat
   *
   * @param {mat4} dest is specified, mat otherwise, null if matrix cannot be inverted
   */
  double inverse([Matrix4 dest]) {
    // Cache the matrix values (makes for huge speed increases!)
    double
        a00 = _dest[0],  a01 = _dest[1],  a02 = _dest[2],  a03 = _dest[3],
        a10 = _dest[4],  a11 = _dest[5],  a12 = _dest[6],  a13 = _dest[7],
        a20 = _dest[8],  a21 = _dest[9],  a22 = _dest[10], a23 = _dest[11],
        a30 = _dest[12], a31 = _dest[13], a32 = _dest[14], a33 = _dest[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
        invDet;

    // Calculate the determinant
    if (0 == d) {
      return null;
    }
    invDet = 1 / d;
    
    var out = (null == dest ? _dest : dest );

    out[0]  = ( a11 * b11 - a12 * b10 + a13 * b09) * invDet;
    out[1]  = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
    out[2]  = ( a31 * b05 - a32 * b04 + a33 * b03) * invDet;
    out[3]  = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
    out[4]  = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
    out[5]  = ( a00 * b11 - a02 * b08 + a03 * b07) * invDet;
    out[6]  = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
    out[7]  = ( a20 * b05 - a22 * b02 + a23 * b01) * invDet;
    out[8]  = ( a10 * b10 - a11 * b08 + a13 * b06) * invDet;
    out[9]  = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
    out[10] = ( a30 * b04 - a31 * b02 + a33 * b00) * invDet;
    out[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
    out[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
    out[13] = ( a00 * b09 - a01 * b07 + a02 * b06) * invDet;
    out[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
    out[15] = ( a20 * b03 - a21 * b01 + a22 * b00) * invDet;
  }

  /**
   * Copies the upper 3x3 elements of a mat4 into another mat4
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat4} [dest] mat4 receiving copied values
   *
   * @returns {mat4} dest is specified, a new mat4 otherwise
   */
  Matrix4 toRotationMat([Matrix4 dest]) {
    //Float32Array list = new Float32Array(16);
    var out = (null == dest ? _dest : dest );

    out[0]  = _dest[0];
    out[1]  = _dest[1];
    out[2]  = _dest[2];
    out[3]  = _dest[3];
    out[4]  = _dest[4];
    out[5]  = _dest[5];
    out[6]  = _dest[6];
    out[7]  = _dest[7];
    out[8]  = _dest[8];
    out[9]  = _dest[9];
    out[10] = _dest[10];
    out[11] = _dest[11];
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
  }

  /**
   * Copies the upper 3x3 elements of a mat4 into a mat3
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat3} [dest] mat3 receiving copied values
   *
   * @returns {mat3} dest is specified, a new mat3 otherwise
   */
  Matrix3 toMat3([Matrix3 dest]) {
    //Float32Array list = new Float32Array(9);
    if (null == dest) {
      dest = new Matrix3();
    }
    
    dest[0] = _dest[0];
    dest[1] = _dest[1];
    dest[2] = _dest[2];
    dest[3] = _dest[4];
    dest[4] = _dest[5];
    dest[5] = _dest[6];
    dest[6] = _dest[8];
    dest[7] = _dest[9];
    dest[8] = _dest[10];

    return dest;
  }

  /**
   * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
   * The resulting matrix is useful for calculating transformed normals
   *
   * Params:
   * @param {mat4} mat mat4 containing values to invert and copy
   * @param {mat3} [dest] mat3 receiving values
   *
   * @returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
   */
  Matrix3 toInverseMat3([Matrix3 dest]) {
    // Cache the matrix values (makes for huge speed increases!)
    double
        a00 = _dest[0], a01 = _dest[1], a02 = _dest[2],
        a10 = _dest[4], a11 = _dest[5], a12 = _dest[6],
        a20 = _dest[8], a21 = _dest[9], a22 = _dest[10],

        b01 =  a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 =  a21 * a10 - a11 * a20,

        d = a00 * b01 + a01 * b11 + a02 * b21,
        id;

    if (0 == d) {
      return null;
    }
    id = 1 / d;

    if (null == dest) {
      dest = new Matrix3();
    }

    dest[0] = b01 * id;
    dest[1] = (-a22 * a01 + a02 * a21) * id;
    dest[2] =  (a12 * a01 - a02 * a11) * id;
    dest[3] = b11 * id;
    dest[4] =  (a22 * a00 - a02 * a20) * id;
    dest[5] = (-a12 * a00 + a02 * a10) * id;
    dest[6] = b21 * id;
    dest[7] = (-a21 * a00 + a01 * a20) * id;
    dest[8] =  (a11 * a00 - a01 * a10) * id;
    
    return dest;
  }

  /**
   * Performs a matrix multiplication
   *
   * @param {mat4} mat First operand
   * @param {mat4} mat2 Second operand
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  void multiply(Matrix4 mat, [Matrix4 dest]) {
    //Float32Array list = new Float32Array(16);
    
    // Cache the matrix values (makes for huge speed increases!)
    double
        a00 = _dest[0],  a01 = _dest[1],  a02 = _dest[2],  a03 = _dest[3],
        a10 = _dest[4],  a11 = _dest[5],  a12 = _dest[6],  a13 = _dest[7],
        a20 = _dest[8],  a21 = _dest[9],  a22 = _dest[10], a23 = _dest[11],
        a30 = _dest[12], a31 = _dest[13], a32 = _dest[14], a33 = _dest[15],

        b00 = mat[0],  b01 = mat[1],  b02 = mat[2],  b03 = mat[3],
        b10 = mat[4],  b11 = mat[5],  b12 = mat[6],  b13 = mat[7],
        b20 = mat[8],  b21 = mat[9],  b22 = mat[10], b23 = mat[11],
        b30 = mat[12], b31 = mat[13], b32 = mat[14], b33 = mat[15];

    var out = (null == dest ? _dest : dest );
    
    out[0]  = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    out[1]  = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    out[2]  = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    out[3]  = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    out[4]  = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    out[5]  = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    out[6]  = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    out[7]  = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    out[8]  = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    out[9]  = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    out[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    out[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    out[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    out[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    out[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    out[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
  }

  /**
   * Transforms a vec3 with the given matrix
   * 4th vector component is implicitly '1'
   *
   * @param {mat4} mat mat4 to transform the vector with
   * @param {vec3} vec vec3 to transform
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  void multiplyVec3(Vector3 vec, [Vector3 dest]) {
    if (null == dest) {
      dest = vec;
    }

    var x = vec[0], y = vec[1], z = vec[2];

    dest[0] = _dest[0] * x + _dest[4] * y + _dest[8]  * z + _dest[12];
    dest[1] = _dest[1] * x + _dest[5] * y + _dest[9]  * z + _dest[13];
    dest[2] = _dest[2] * x + _dest[6] * y + _dest[10] * z + _dest[14];
  }

  /**
   * Transforms a vec4 with the given matrix
   *
   * @param {mat4} mat mat4 to transform the vector with
   * @param {vec4} vec vec4 to transform
   * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec4} dest if specified, vec otherwise
   */
  void multiplyVec4(Vector4 vec, [Vector4 dest]) {
    if (null == dest) {
      dest = vec;
    }

    var x = vec[0], y = vec[1], z = vec[2], w = vec[3];

    dest[0] = _dest[0] * x + _dest[4] * y + _dest[8] * z  + _dest[12] * w;
    dest[1] = _dest[1] * x + _dest[5] * y + _dest[9] * z  + _dest[13] * w;
    dest[2] = _dest[2] * x + _dest[6] * y + _dest[10] * z + _dest[14] * w;
    dest[3] = _dest[3] * x + _dest[7] * y + _dest[11] * z + _dest[15] * w;
  }

  /**
   * Translates a matrix by the given vector
   *
   * @param {mat4} mat mat4 to translate
   * @param {vec3} vec vec3 specifying the translation
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  void translate(Vector3 vec, [Matrix4 dest]) {
    var x = vec[0], y = vec[1], z = vec[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (null == dest) {
      _dest[12] = _dest[0] * x + _dest[4] * y + _dest[8]  * z + _dest[12];
      _dest[13] = _dest[1] * x + _dest[5] * y + _dest[9]  * z + _dest[13];
      _dest[14] = _dest[2] * x + _dest[6] * y + _dest[10] * z + _dest[14];
      _dest[15] = _dest[3] * x + _dest[7] * y + _dest[11] * z + _dest[15];
    } else {
      a00 = _dest[0]; a01 = _dest[1]; a02 = _dest[2];  a03 = _dest[3];
      a10 = _dest[4]; a11 = _dest[5]; a12 = _dest[6];  a13 = _dest[7];
      a20 = _dest[8]; a21 = _dest[9]; a22 = _dest[10]; a23 = _dest[11];
  
      dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
      dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
      dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;
  
      dest[12] = a00 * x + a10 * y + a20 * z + _dest[12];
      dest[13] = a01 * x + a11 * y + a21 * z + _dest[13];
      dest[14] = a02 * x + a12 * y + a22 * z + _dest[14];
      dest[15] = a03 * x + a13 * y + a23 * z + _dest[15];
    }
  }

  /**
   * Scales a matrix by the given vector
   *
   * @param {mat4} mat mat4 to scale
   * @param {vec3} vec vec3 specifying the scale for each axis
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @param {mat4} dest if specified, mat otherwise
   */
  void scale(Vector3 vec, [Matrix4 dest]) {
    var x = vec[0], y = vec[1], z = vec[2];

    if (null == dest) {
      _dest[0]  *= x;
      _dest[1]  *= x;
      _dest[2]  *= x;
      _dest[3]  *= x;
      _dest[4]  *= y;
      _dest[5]  *= y;
      _dest[6]  *= y;
      _dest[7]  *= y;
      _dest[8]  *= z;
      _dest[9]  *= z;
      _dest[10] *= z;
      _dest[11] *= z;
    } else {
      dest[0]  = _dest[0] * x;
      dest[1]  = _dest[1] * x;
      dest[2]  = _dest[2] * x;
      dest[3]  = _dest[3] * x;
      dest[4]  = _dest[4] * y;
      dest[5]  = _dest[5] * y;
      dest[6]  = _dest[6] * y;
      dest[7]  = _dest[7] * y;
      dest[8]  = _dest[8] * z;
      dest[9]  = _dest[9] * z;
      dest[10] = _dest[10] * z;
      dest[11] = _dest[11] * z;
      dest[12] = _dest[12];
      dest[13] = _dest[13];
      dest[14] = _dest[14];
      dest[15] = _dest[15];
    }
  }

  /**
   * Rotates a matrix by the given angle around the specified axis
   * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {vec3} axis vec3 representing the axis to rotate around
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  void rotate(num angle, Vector3 axis, [Matrix4 dest]) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (0 == len) {
      return null;
    }
    if (len != 1) {
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
    }

    s = Math.sin(angle);
    c = Math.cos(angle);
    t = 1 - c;

    a00 = _dest[0]; a01 = _dest[1]; a02 = _dest[2];  a03 = _dest[3];
    a10 = _dest[4]; a11 = _dest[5]; a12 = _dest[6];  a13 = _dest[7];
    a20 = _dest[8]; a21 = _dest[9]; a22 = _dest[10]; a23 = _dest[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    var out;
    if (null == dest) {
      out = _dest;
    } else { // If the source and destination differ, copy the unchanged last row
      out = dest;
      out[12] = _dest[12];
      out[13] = _dest[13];
      out[14] = _dest[14];
      out[15] = _dest[15];
    }

    // Perform rotation-specific matrix multiplication
    out[0]  = a00 * b00 + a10 * b01 + a20 * b02;
    out[1]  = a01 * b00 + a11 * b01 + a21 * b02;
    out[2]  = a02 * b00 + a12 * b01 + a22 * b02;
    out[3]  = a03 * b00 + a13 * b01 + a23 * b02;

    out[4]  = a00 * b10 + a10 * b11 + a20 * b12;
    out[5]  = a01 * b10 + a11 * b11 + a21 * b12;
    out[6]  = a02 * b10 + a12 * b11 + a22 * b12;
    out[7]  = a03 * b10 + a13 * b11 + a23 * b12;

    out[8]  = a00 * b20 + a10 * b21 + a20 * b22;
    out[9]  = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  }

  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  void rotateX(num angle, [Matrix4 dest]) {
    var s = Math.sin(angle),
        c = Math.cos(angle),
        a10 = _dest[4],
        a11 = _dest[5],
        a12 = _dest[6],
        a13 = _dest[7],
        a20 = _dest[8],
        a21 = _dest[9],
        a22 = _dest[10],
        a23 = _dest[11];

    var out;
    if (null == dest) {
      out = _dest;
    } else { // If the source and destination differ, copy the unchanged rows
      out = _dest;
      out[0]  = _dest[0];
      out[1]  = _dest[1];
      out[2]  = _dest[2];
      out[3]  = _dest[3];

      out[12] = _dest[12];
      out[13] = _dest[13];
      out[14] = _dest[14];
      out[15] = _dest[15];
    }

    // Perform axis-specific matrix multiplication
    out[4]  = a10 * c + a20 * s;
    out[5]  = a11 * c + a21 * s;
    out[6]  = a12 * c + a22 * s;
    out[7]  = a13 * c + a23 * s;

    out[8]  = a10 * -s + a20 * c;
    out[9]  = a11 * -s + a21 * c;
    out[10] = a12 * -s + a22 * c;
    out[11] = a13 * -s + a23 * c;
  }

  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  void rotateY(num angle, [Matrix4 dest]) {
    var s = Math.sin(angle),
        c = Math.cos(angle),
        a00 = _dest[0],
        a01 = _dest[1],
        a02 = _dest[2],
        a03 = _dest[3],
        a20 = _dest[8],
        a21 = _dest[9],
        a22 = _dest[10],
        a23 = _dest[11];

    var out;
    if (null == dest) {
      out = _dest;
    } else { // If the source and destination differ, copy the unchanged rows
      out = dest;
      out[4]  = _dest[4];
      out[5]  = _dest[5];
      out[6]  = _dest[6];
      out[7]  = _dest[7];

      out[12] = _dest[12];
      out[13] = _dest[13];
      out[14] = _dest[14];
      out[15] = _dest[15];
    }

    // Perform axis-specific matrix multiplication
    out[0]  = a00 * c + a20 * -s;
    out[1]  = a01 * c + a21 * -s;
    out[2]  = a02 * c + a22 * -s;
    out[3]  = a03 * c + a23 * -s;

    out[8]  = a00 * s + a20 * c;
    out[9]  = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
  }

  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @returns {mat4} dest if specified, mat otherwise
   */
  void rotateZ(num angle, [Matrix4 dest]) {
    var s = Math.sin(angle),
        c = Math.cos(angle),
        a00 = _dest[0],
        a01 = _dest[1],
        a02 = _dest[2],
        a03 = _dest[3],
        a10 = _dest[4],
        a11 = _dest[5],
        a12 = _dest[6],
        a13 = _dest[7];

    var out;
    if (null == dest) {
      out = _dest;
    } else { // If the source and destination differ, copy the unchanged last row
      out = dest;
      out[8]  = _dest[8];
      out[9]  = _dest[9];
      out[10] = _dest[10];
      out[11] = _dest[11];

      out[12] = _dest[12];
      out[13] = _dest[13];
      out[14] = _dest[14];
      out[15] = _dest[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;

    out[4] = a00 * -s + a10 * c;
    out[5] = a01 * -s + a11 * c;
    out[6] = a02 * -s + a12 * c;
    out[7] = a03 * -s + a13 * c;
  }

  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  static Matrix4 frustum(num left, num right, num bottom, num top, num near, num far, [Matrix4 dest]) {
    var out = (null == dest ? new Float32Array(16) : dest);
    var rl = (right - left),
        tb = (top - bottom),
        fn = (far - near);
    
    out[0] = (near * 2) / rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) / tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) / rl;
    out[9] = (top + bottom) / tb;
    out[10] = -(far + near) / fn;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = -(far * near * 2) / fn;
    out[15] = 0;
    
    return (null == dest ? new Matrix4.fromFloat32Array(out) : null);
  }

  /**
   * Generates a perspective projection matrix with the given bounds
   *
   * @param {number} fovy Vertical field of view
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  static Matrix4 perspective(num fovy, num aspect, num near, num far, [Matrix4 dest]) {
    var top = near * Math.tan(fovy * Math.PI / 360.0),
        right = top * aspect;
    return Matrix4.frustum(-right, right, -top, top, near, far, dest);
  }

  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  static Matrix4 ortho(num left, num right, num bottom, num top, num near, num far, [Matrix4 dest]) {
    var out = (null == dest ? new Float32Array(16) : dest);
    var rl = (right - left),
        tb = (top - bottom),
        fn = (far - near);
    
    out[0] = 2 / rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 2 / tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = -2 / fn;
    out[11] = 0;
    out[12] = -(left + right) / rl;
    out[13] = -(top + bottom) / tb;
    out[14] = -(far + near) / fn;
    out[15] = 1;
    return (null == dest ? new Matrix4.fromFloat32Array(out) : null);
  }

  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis
   *
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing "up"
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  static Matrix4 lookAt(Vector3 eye, Vector3 center, Vector3 up, [Matrix4 dest]) {
    var out = (null == dest ? new Float32Array(16) : dest);

    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (eyex === centerx && eyey === centery && eyez === centerz) {
      if (null == dest) {
        return new Matrix4.identity();
      } else {
        out.identity();
        return out;
      }
    }

    //vec3.direction(eye, center, z);
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    // normalize (no check needed for 0 because of early return)
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    //vec3.normalize(vec3.cross(up, z, x));
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    //vec3.normalize(vec3.cross(z, x, y));
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return (null == dest ? new Matrix4.fromFloat32Array(out) : null);
  }

  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     var quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {quat4} quat Rotation quaternion
   * @param {vec3} vec Translation vector
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  static Matrix4 fromRotationTranslation(Quat4 quat, Vector3 vec, [Matrix4 dest]) {
    var out = (null == dest ? new Float32Array(16) : dest);

    // Quaternion math
    var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = vec[0];
    out[13] = vec[1];
    out[14] = vec[2];
    out[15] = 1;
    
    return (null == dest ? new Matrix4.fromFloat32Array(out) : null);
  }

  /**
   * Returns a string representation of a mat4
   *
   * @param {mat4} mat mat4 to represent as a string
   *
   * @returns {string} String representation of mat
   */
  String toString() {
      return '[' + _dest[0]  + ', ' + _dest[1]  + ', ' + _dest[2]  + ', ' + _dest[3]  + "\n" +
            '  ' + _dest[4]  + ', ' + _dest[5]  + ', ' + _dest[6]  + ', ' + _dest[7]  + "\n" +
            '  ' + _dest[8]  + ', ' + _dest[9]  + ', ' + _dest[10] + ', ' + _dest[11] + "\n" +
            '  ' + _dest[12] + ', ' + _dest[13] + ', ' + _dest[14] + ', ' + _dest[15] + ']';
  }
}
