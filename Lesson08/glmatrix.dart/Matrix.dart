/*
* mat4
*/
  
class Matrix {

  Float32Array dest;
  
  
  
  void set m11(num value) {dest[0] = value;}
  num get m11() => dest[0];
  void set m12(num value) {dest[1] = value;}
  num get m12() => dest[1];
  void set m13(num value) {dest[2] = value;}
  num get m13() => dest[2];
  void set m14(num value) {dest[3] = value;}
  num get m14() => dest[3];
  
  void set m21(num value) {dest[4] = value;}
  num get m21() => dest[4];
  void set m22(num value) {dest[5] = value;}
  num get m22() => dest[5];
  void set m23(num value) {dest[6] = value;}
  num get m23() => dest[6];
  void set m24(num value) {dest[7] = value;}
  num get m24() => dest[7];
  
  void set m31(num value) {dest[8] = value;}
  num get m31() => dest[8];
  void set m32(num value) {dest[9] = value;}
  num get m32() => dest[9];
  void set m33(num value) {dest[10] = value;}
  num get m33() => dest[10];
  void set m34(num value) {dest[11] = value;}
  num get m34() => dest[11];
  
  void set m41(num value) {dest[12] = value;}
  num get m41() => dest[12];
  void set m42(num value) {dest[13] = value;}
  num get m42() => dest[13];
  void set m43(num value) {dest[14] = value;}
  num get m43() => dest[14];
  void set m44(num value) {dest[15] = value;}
  num get m44() => dest[15];
  
  
  Matrix.zero() {
    dest = new Float32Array(16);
    
  }
  Matrix.identity() {
    dest = new Float32Array.fromList([1,0,0,0,
                                      0,1,0,0,
                                      0,0,1,0,
                                      0,0,0,1]);
  }
  Matrix.fromList(List<num> list) {
    if(list == null) {
      dest = new Float32Array(16);
      return;
    }
    if(list.length != 16) {
      dest = new Float32Array(16);
      return;
    }
    dest = new Float32Array.fromList(list);
  }
  
  Matrix(num M11, num M12, num M13, num M14,
         num M21, num M22, num M23, num M24,
         num M31, num M32, num M33, num M34,
         num M41, num M42, num M43, num M44) {
    dest = new Float32Array.fromList([M11,M12,M13,M14,
                                      M21,M22,M23,M24,
                                      M31,M32,M33,M34,
                                      M41,M42,M43,M44]);
  }
  /**
   * Creates a new instance of a mat4 using the default array type
   * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
   *
   * @param {mat4} [mat] mat4 containing values to initialize with
   *
   * @returns {mat4} New mat4
   */
  /*static Matrix create(mat) {
      var result = new Matrix;
  
      if (mat) {
          result.dest[0] = mat.dest[0];
          result.dest[1] = mat.dest[1];
          result.dest[2] = mat.dest[2];
          result.dest[3] = mat.dest[3];
          result.dest[4] = mat.dest[4];
          result.dest[5] = mat.dest[5];
          result.dest[6] = mat.dest[6];
          result.dest[7] = mat.dest[7];
          result.dest[8] = mat.dest[8];
          result.dest[9] = mat.dest[9];
          result.dest[10] = mat.dest[10];
          result.dest[11] = mat.dest[11];
          result.dest[12] = mat.dest[12];
          result.dest[13] = mat.dest[13];
          result.dest[14] = mat.dest[14];
          result.dest[15] = mat.dest[15];
      }
  
      return result;
  }*/
  
  /**
   * Copies the values of one mat4 to another
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat4} dest mat4 receiving copied values
   *
   * Returns result
   */
  static Matrix Clone(Matrix mat, [Matrix result]) {
    if(result == null) return new Matrix.fromList(mat.dest);
      result.dest[0] = mat.dest[0];
      result.dest[1] = mat.dest[1];
      result.dest[2] = mat.dest[2];
      result.dest[3] = mat.dest[3];
      result.dest[4] = mat.dest[4];
      result.dest[5] = mat.dest[5];
      result.dest[6] = mat.dest[6];
      result.dest[7] = mat.dest[7];
      result.dest[8] = mat.dest[8];
      result.dest[9] = mat.dest[9];
      result.dest[10] = mat.dest[10];
      result.dest[11] = mat.dest[11];
      result.dest[12] = mat.dest[12];
      result.dest[13] = mat.dest[13];
      result.dest[14] = mat.dest[14];
      result.dest[15] = mat.dest[15];
      return result;
  }
  Matrix clone([Matrix result]) => Matrix.Clone(this,result);
  
  /**
   * Sets a mat4 to an identity matrix
   *
   * @param {mat4} dest mat4 to set
   *
   * Returns result
   */
  static Matrix Identity([Matrix result]) {
      if(result == null) return new Matrix.identity();
      result.dest[0] = 1;
      result.dest[1] = 0;
      result.dest[2] = 0;
      result.dest[3] = 0;
      result.dest[4] = 0;
      result.dest[5] = 1;
      result.dest[6] = 0;
      result.dest[7] = 0;
      result.dest[8] = 0;
      result.dest[9] = 0;
      result.dest[10] = 1;
      result.dest[11] = 0;
      result.dest[12] = 0;
      result.dest[13] = 0;
      result.dest[14] = 0;
      result.dest[15] = 1;
      return result;
  }
  
  Matrix indentify() => Matrix.Identity(this);
  
  /**
   * Transposes a mat4 (flips the values over the diagonal)
   *
   * @param {mat4} mat mat4 to transpose
   * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
   *
   * @param {mat4} dest is specified, mat otherwise
   */
  static Matrix Transpose(Matrix mat, [Matrix result]) {
      // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (result == null) result = new Matrix.zero();
    if (mat === result) {
        var a01 = mat.dest[1], a02 = mat.dest[2], a03 = mat.dest[3],
            a12 = mat.dest[6], a13 = mat.dest[7],
            a23 = mat.dest[11];

        mat.dest[1] = mat.dest[4];
        mat.dest[2] = mat.dest[8];
        mat.dest[3] = mat.dest[12];
        mat.dest[4] = a01;
        mat.dest[6] = mat.dest[9];
        mat.dest[7] = mat.dest[13];
        mat.dest[8] = a02;
        mat.dest[9] = a12;
        mat.dest[11] = mat.dest[14];
        mat.dest[12] = a03;
        mat.dest[13] = a13;
        mat.dest[14] = a23;
        return mat;
      }
  
      result.dest[0] = mat.dest[0];
      result.dest[1] = mat.dest[4];
      result.dest[2] = mat.dest[8];
      result.dest[3] = mat.dest[12];
      result.dest[4] = mat.dest[1];
      result.dest[5] = mat.dest[5];
      result.dest[6] = mat.dest[9];
      result.dest[7] = mat.dest[13];
      result.dest[8] = mat.dest[2];
      result.dest[9] = mat.dest[6];
      result.dest[10] = mat.dest[10];
      result.dest[11] = mat.dest[14];
      result.dest[12] = mat.dest[3];
      result.dest[13] = mat.dest[7];
      result.dest[14] = mat.dest[11];
      result.dest[15] = mat.dest[15];
      return result;
  }
  Matrix transpose() => Transpose(this,this);
  
  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} mat mat4 to calculate determinant of
   *
   * @returns {number} determinant of mat
   */
  num get determinant() {
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = dest[0], a01 = dest[1], a02 = dest[2], a03 = dest[3],
          a10 = dest[4], a11 = dest[5], a12 = dest[6], a13 = dest[7],
          a20 = dest[8], a21 = dest[9], a22 = dest[10], a23 = dest[11],
          a30 = dest[12], a31 = dest[13], a32 = dest[14], a33 = dest[15];
  
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
  static Matrix Inverse(Matrix mat, [Matrix result]) {
      if(result == null) { result = mat; }
  
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat.dest[0], a01 = mat.dest[1], a02 = mat.dest[2], a03 = mat.dest[3],
          a10 = mat.dest[4], a11 = mat.dest[5], a12 = mat.dest[6], a13 = mat.dest[7],
          a20 = mat.dest[8], a21 = mat.dest[9], a22 = mat.dest[10], a23 = mat.dest[11],
          a30 = mat.dest[12], a31 = mat.dest[13], a32 = mat.dest[14], a33 = mat.dest[15],
  
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
          if (!d) { return null; }
          invDet = 1 / d;
  
      result.dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
      result.dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
      result.dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
      result.dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
      result.dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
      result.dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
      result.dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
      result.dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
      result.dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
      result.dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
      result.dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
      result.dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
      result.dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
      result.dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
      result.dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
      result.dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
  
      return result;
  }
  Matrix inverse() => Matrix.Inverse(this,this);
  
  /**
   * Copies the upper 3x3 elements of a mat4 into another mat4
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat4} [dest] mat4 receiving copied values
   *
   * Returns result is specified, a new mat4 otherwise
   */
  static Matrix ToRotationMat(Matrix mat, [Matrix result]) {
      if(result == null) result = new Matrix.zero();
  
      result.dest[0] = mat.dest[0];
      result.dest[1] = mat.dest[1];
      result.dest[2] = mat.dest[2];
      result.dest[3] = mat.dest[3];
      result.dest[4] = mat.dest[4];
      result.dest[5] = mat.dest[5];
      result.dest[6] = mat.dest[6];
      result.dest[7] = mat.dest[7];
      result.dest[8] = mat.dest[8];
      result.dest[9] = mat.dest[9];
      result.dest[10] = mat.dest[10];
      result.dest[11] = mat.dest[11];
      result.dest[12] = 0;
      result.dest[13] = 0;
      result.dest[14] = 0;
      result.dest[15] = 1;
  
      return result;
  }
  
  /**
   * Copies the upper 3x3 elements of a mat4 into a mat3
   *
   * @param {mat4} mat mat4 containing values to copy
   * @param {mat3} [dest] mat3 receiving copied values
   *
   * @returns {mat3} dest is specified, a new mat3 otherwise
   */
  static Matrix3 ToMat3(Matrix mat, [Matrix3 result]) {
      if(result == null) { result = new Matrix3(); }
  
      result.dest[0] = mat.dest[0];
      result.dest[1] = mat.dest[1];
      result.dest[2] = mat.dest[2];
      result.dest[3] = mat.dest[4];
      result.dest[4] = mat.dest[5];
      result.dest[5] = mat.dest[6];
      result.dest[6] = mat.dest[8];
      result.dest[7] = mat.dest[9];
      result.dest[8] = mat.dest[10];
  
      return result;
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
  static Matrix3 ToInverseMat3(Matrix mat, [Matrix3 result]) {
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat.dest[0], a01 = mat.dest[1], a02 = mat.dest[2],
          a10 = mat.dest[4], a11 = mat.dest[5], a12 = mat.dest[6],
          a20 = mat.dest[8], a21 = mat.dest[9], a22 = mat.dest[10],
  
          b01 = a22 * a11 - a12 * a21,
          b11 = -a22 * a10 + a12 * a20,
          b21 = a21 * a10 - a11 * a20,
  
          d = a00 * b01 + a01 * b11 + a02 * b21,
          id;
  
      if (!d) { return null; }
      id = 1 / d;
  
      if(result == null) { result = new Matrix3(); }
  
      result.dest[0] = b01 * id;
      result.dest[1] = (-a22 * a01 + a02 * a21) * id;
      result.dest[2] = (a12 * a01 - a02 * a11) * id;
      result.dest[3] = b11 * id;
      result.dest[4] = (a22 * a00 - a02 * a20) * id;
      result.dest[5] = (-a12 * a00 + a02 * a10) * id;
      result.dest[6] = b21 * id;
      result.dest[7] = (-a21 * a00 + a01 * a20) * id;
      result.dest[8] = (a11 * a00 - a01 * a10) * id;
  
      return result;
  }
  
  /**
   * Performs a matrix multiplication
   *
   * @param {mat4} mat First operand
   * @param {mat4} mat2 Second operand
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * Returns result if specified, mat otherwise
   */
  static Matrix Multiply(Matrix mat, mat2, [Matrix result]) {
      if(result == null) { result = new Matrix.zero(); }
  
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat.dest[0], a01 = mat.dest[1], a02 = mat.dest[2], a03 = mat.dest[3],
          a10 = mat.dest[4], a11 = mat.dest[5], a12 = mat.dest[6], a13 = mat.dest[7],
          a20 = mat.dest[8], a21 = mat.dest[9], a22 = mat.dest[10], a23 = mat.dest[11],
          a30 = mat.dest[12], a31 = mat.dest[13], a32 = mat.dest[14], a33 = mat.dest[15],
  
          b00 = mat2.dest[0], b01 = mat2.dest[1], b02 = mat2.dest[2], b03 = mat2.dest[3],
          b10 = mat2.dest[4], b11 = mat2.dest[5], b12 = mat2.dest[6], b13 = mat2.dest[7],
          b20 = mat2.dest[8], b21 = mat2.dest[9], b22 = mat2.dest[10], b23 = mat2.dest[11],
          b30 = mat2.dest[12], b31 = mat2.dest[13], b32 = mat2.dest[14], b33 = mat2.dest[15];
  
      result.dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
      result.dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
      result.dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
      result.dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
      result.dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
      result.dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
      result.dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
      result.dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
      result.dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
      result.dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
      result.dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
      result.dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
      result.dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
      result.dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
      result.dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
      result.dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
  
      return result;
  }
  Matrix multiply([Matrix mat]) => Matrix.Multiply(this, mat, this);
  
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
  static Vector3 MultiplyVec3(Matrix mat, Vector3 vec, [Vector3 result]) {
      if(result == null) { result = vec; }
  
      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2];
  
      result.dest[0] = mat.dest[0] * x + mat.dest[4] * y + mat.dest[8] * z + mat.dest[12];
      result.dest[1] = mat.dest[1] * x + mat.dest[5] * y + mat.dest[9] * z + mat.dest[13];
      result.dest[2] = mat.dest[2] * x + mat.dest[6] * y + mat.dest[10] * z + mat.dest[14];
  
      return result;
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
  static Vector4 MultiplyVec4(Matrix mat, Vector4 vec, [Vector4 result]) {
      if(result == null) { result = vec; }
  
      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2], w = vec.dest[3];
  
      result.dest[0] = mat.dest[0] * x + mat.dest[4] * y + mat.dest[8] * z + mat.dest[12] * w;
      result.dest[1] = mat.dest[1] * x + mat.dest[5] * y + mat.dest[9] * z + mat.dest[13] * w;
      result.dest[2] = mat.dest[2] * x + mat.dest[6] * y + mat.dest[10] * z + mat.dest[14] * w;
      result.dest[3] = mat.dest[3] * x + mat.dest[7] * y + mat.dest[11] * z + mat.dest[15] * w;
  
      return result;
  }
  
  /**
   * Translates a matrix by the given vector
   *
   * @param {mat4} mat mat4 to translate
   * @param {vec3} vec vec3 specifying the translation
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * Returns result if specified, mat otherwise
   */
  static Matrix Translate(Matrix mat, Vector3 vec, [Matrix result]) {
      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2],
          a00, a01, a02, a03,
          a10, a11, a12, a13,
          a20, a21, a22, a23;
  
      if (result == null || mat === result) {
          mat.dest[12] = mat.dest[0] * x + mat.dest[4] * y + mat.dest[8] * z + mat.dest[12];
          mat.dest[13] = mat.dest[1] * x + mat.dest[5] * y + mat.dest[9] * z + mat.dest[13];
          mat.dest[14] = mat.dest[2] * x + mat.dest[6] * y + mat.dest[10] * z + mat.dest[14];
          mat.dest[15] = mat.dest[3] * x + mat.dest[7] * y + mat.dest[11] * z + mat.dest[15];
          return mat;
      }
  
      a00 = mat.dest[0]; a01 = mat.dest[1]; a02 = mat.dest[2]; a03 = mat.dest[3];
      a10 = mat.dest[4]; a11 = mat.dest[5]; a12 = mat.dest[6]; a13 = mat.dest[7];
      a20 = mat.dest[8]; a21 = mat.dest[9]; a22 = mat.dest[10]; a23 = mat.dest[11];
  
      result.dest[0] = a00; result.dest[1] = a01; result.dest[2] = a02; result.dest[3] = a03;
      result.dest[4] = a10; result.dest[5] = a11; result.dest[6] = a12; result.dest[7] = a13;
      result.dest[8] = a20; result.dest[9] = a21; result.dest[10] = a22; result.dest[11] = a23;
  
      result.dest[12] = a00 * x + a10 * y + a20 * z + mat.dest[12];
      result.dest[13] = a01 * x + a11 * y + a21 * z + mat.dest[13];
      result.dest[14] = a02 * x + a12 * y + a22 * z + mat.dest[14];
      result.dest[15] = a03 * x + a13 * y + a23 * z + mat.dest[15];
      return result;
  }
  
  Matrix translate(Vector3 vec) => Matrix.Translate(this, vec, this);
  
  /**
   * Scales a matrix by the given vector
   *
   * @param {mat4} mat mat4 to scale
   * @param {vec3} vec vec3 specifying the scale for each axis
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * @param {mat4} dest if specified, mat otherwise
   */
  static Matrix Scale(Matrix mat, Vector3 vec, [Matrix result]) {
      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2];
  
      if (result == null || mat === result) {
          mat.dest[0] *= x;
          mat.dest[1] *= x;
          mat.dest[2] *= x;
          mat.dest[3] *= x;
          mat.dest[4] *= y;
          mat.dest[5] *= y;
          mat.dest[6] *= y;
          mat.dest[7] *= y;
          mat.dest[8] *= z;
          mat.dest[9] *= z;
          mat.dest[10] *= z;
          mat.dest[11] *= z;
          return mat;
      }
  
      result.dest[0] = mat.dest[0] * x;
      result.dest[1] = mat.dest[1] * x;
      result.dest[2] = mat.dest[2] * x;
      result.dest[3] = mat.dest[3] * x;
      result.dest[4] = mat.dest[4] * y;
      result.dest[5] = mat.dest[5] * y;
      result.dest[6] = mat.dest[6] * y;
      result.dest[7] = mat.dest[7] * y;
      result.dest[8] = mat.dest[8] * z;
      result.dest[9] = mat.dest[9] * z;
      result.dest[10] = mat.dest[10] * z;
      result.dest[11] = mat.dest[11] * z;
      result.dest[12] = mat.dest[12];
      result.dest[13] = mat.dest[13];
      result.dest[14] = mat.dest[14];
      result.dest[15] = mat.dest[15];
      return result;
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
   * Returns result if specified, mat otherwise
   */
  static Matrix Rotate(Matrix mat, num angle, Vector3 axis, [Matrix result]) {
      var x = axis.dest[0], y = axis.dest[1], z = axis.dest[2],
          len = Math.sqrt(x * x + y * y + z * z),
          s, c, t,
          a00, a01, a02, a03,
          a10, a11, a12, a13,
          a20, a21, a22, a23,
          b00, b01, b02,
          b10, b11, b12,
          b20, b21, b22;
  
      if (!len) { return null; }
      if (len !== 1) {
          len = 1 / len;
          x *= len;
          y *= len;
          z *= len;
      }
  
      s = Math.sin(angle);
      c = Math.cos(angle);
      t = 1 - c;
  
      a00 = mat.dest[0]; a01 = mat.dest[1]; a02 = mat.dest[2]; a03 = mat.dest[3];
      a10 = mat.dest[4]; a11 = mat.dest[5]; a12 = mat.dest[6]; a13 = mat.dest[7];
      a20 = mat.dest[8]; a21 = mat.dest[9]; a22 = mat.dest[10]; a23 = mat.dest[11];
  
      // Construct the elements of the rotation matrix
      b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
      b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
      b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
  
      if(result == null) {
          result = mat;
      } else if (mat !== result) { // If the source and destination differ, copy the unchanged last row
          result.dest[12] = mat.dest[12];
          result.dest[13] = mat.dest[13];
          result.dest[14] = mat.dest[14];
          result.dest[15] = mat.dest[15];
      }
  
      // Perform rotation-specific matrix multiplication
      result.dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
      result.dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
      result.dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
      result.dest[3] = a03 * b00 + a13 * b01 + a23 * b02;
  
      result.dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
      result.dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
      result.dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
      result.dest[7] = a03 * b10 + a13 * b11 + a23 * b12;
  
      result.dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
      result.dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
      result.dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
      result.dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
      return result;
  }
  
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * Returns result if specified, mat otherwise
   */
  static Matrix RotateX(Matrix mat, num angle, [Matrix result]) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a10 = mat.dest[4],
          a11 = mat.dest[5],
          a12 = mat.dest[6],
          a13 = mat.dest[7],
          a20 = mat.dest[8],
          a21 = mat.dest[9],
          a22 = mat.dest[10],
          a23 = mat.dest[11];
  
      if(result == null) {
          result = mat;
      } else if (mat !== result) { // If the source and destination differ, copy the unchanged rows
          result.dest[0] = mat.dest[0];
          result.dest[1] = mat.dest[1];
          result.dest[2] = mat.dest[2];
          result.dest[3] = mat.dest[3];
  
          result.dest[12] = mat.dest[12];
          result.dest[13] = mat.dest[13];
          result.dest[14] = mat.dest[14];
          result.dest[15] = mat.dest[15];
      }
  
      // Perform axis-specific matrix multiplication
      result.dest[4] = a10 * c + a20 * s;
      result.dest[5] = a11 * c + a21 * s;
      result.dest[6] = a12 * c + a22 * s;
      result.dest[7] = a13 * c + a23 * s;
  
      result.dest[8] = a10 * -s + a20 * c;
      result.dest[9] = a11 * -s + a21 * c;
      result.dest[10] = a12 * -s + a22 * c;
      result.dest[11] = a13 * -s + a23 * c;
      return result;
  }
  
  Matrix rotateX(num angle) => Matrix.RotateX(this,angle,this);
  
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * Returns result if specified, mat otherwise
   */
  static Matrix RotateY(Matrix mat, num angle, [Matrix result]) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a00 = mat.dest[0],
          a01 = mat.dest[1],
          a02 = mat.dest[2],
          a03 = mat.dest[3],
          a20 = mat.dest[8],
          a21 = mat.dest[9],
          a22 = mat.dest[10],
          a23 = mat.dest[11];
  
      if(result == null) {
          result = mat;
      } else if (mat !== result) { // If the source and destination differ, copy the unchanged rows
          result.dest[4] = mat.dest[4];
          result.dest[5] = mat.dest[5];
          result.dest[6] = mat.dest[6];
          result.dest[7] = mat.dest[7];
  
          result.dest[12] = mat.dest[12];
          result.dest[13] = mat.dest[13];
          result.dest[14] = mat.dest[14];
          result.dest[15] = mat.dest[15];
      }
  
      // Perform axis-specific matrix multiplication
      result.dest[0] = a00 * c + a20 * -s;
      result.dest[1] = a01 * c + a21 * -s;
      result.dest[2] = a02 * c + a22 * -s;
      result.dest[3] = a03 * c + a23 * -s;
  
      result.dest[8] = a00 * s + a20 * c;
      result.dest[9] = a01 * s + a21 * c;
      result.dest[10] = a02 * s + a22 * c;
      result.dest[11] = a03 * s + a23 * c;
      return result;
  }
  
  Matrix rotateY(num angle) => Matrix.RotateY(this,angle,this);
  
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} mat mat4 to rotate
   * @param {number} angle Angle (in radians) to rotate
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   *
   * Returns result if specified, mat otherwise
   */
  static Matrix RotateZ(Matrix mat, num angle, [Matrix result]) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a00 = mat.dest[0],
          a01 = mat.dest[1],
          a02 = mat.dest[2],
          a03 = mat.dest[3],
          a10 = mat.dest[4],
          a11 = mat.dest[5],
          a12 = mat.dest[6],
          a13 = mat.dest[7];
  
      if(result == null) {
          result = mat;
      } else if (mat !== result) { // If the source and destination differ, copy the unchanged last row
          result.dest[8] = mat.dest[8];
          result.dest[9] = mat.dest[9];
          result.dest[10] = mat.dest[10];
          result.dest[11] = mat.dest[11];
  
          result.dest[12] = mat.dest[12];
          result.dest[13] = mat.dest[13];
          result.dest[14] = mat.dest[14];
          result.dest[15] = mat.dest[15];
      }
  
      // Perform axis-specific matrix multiplication
      result.dest[0] = a00 * c + a10 * s;
      result.dest[1] = a01 * c + a11 * s;
      result.dest[2] = a02 * c + a12 * s;
      result.dest[3] = a03 * c + a13 * s;
  
      result.dest[4] = a00 * -s + a10 * c;
      result.dest[5] = a01 * -s + a11 * c;
      result.dest[6] = a02 * -s + a12 * c;
      result.dest[7] = a03 * -s + a13 * c;
  
      return result;
  }
  
  Matrix rotateZ(num angle) => Matrix.RotateZ(this,angle,this);
  
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
   * Returns result if specified, a new mat4 otherwise
   */
  static Matrix Frustum(num left, num right, num bottom, num top, num near, num far, [Matrix result]) {
      if(result == null) result = new Matrix.zero();
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);
      result.dest[0] = (near * 2) / rl;
      result.dest[1] = 0;
      result.dest[2] = 0;
      result.dest[3] = 0;
      result.dest[4] = 0;
      result.dest[5] = (near * 2) / tb;
      result.dest[6] = 0;
      result.dest[7] = 0;
      result.dest[8] = (right + left) / rl;
      result.dest[9] = (top + bottom) / tb;
      result.dest[10] = -(far + near) / fn;
      result.dest[11] = -1;
      result.dest[12] = 0;
      result.dest[13] = 0;
      result.dest[14] = -(far * near * 2) / fn;
      result.dest[15] = 0;
      return result;
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
   * Returns result if specified, a new mat4 otherwise
   */
  static Matrix Perspective(num fovy, num aspect, num near, num far, [Matrix result]) {
      var top = near * Math.tan(fovy * Math.PI / 360.0),
          right = top * aspect;
      return Matrix.Frustum(-right, right, -top, top, near, far, result);
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
   * Returns result if specified, a new mat4 otherwise
   */
  static Matrix Ortho(num left, num right, num bottom, num top, num near, num far, [Matrix result]) {
      if(result == null) result = new Matrix.zero();
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);
      result.dest[0] = 2 / rl;
      result.dest[1] = 0;
      result.dest[2] = 0;
      result.dest[3] = 0;
      result.dest[4] = 0;
      result.dest[5] = 2 / tb;
      result.dest[6] = 0;
      result.dest[7] = 0;
      result.dest[8] = 0;
      result.dest[9] = 0;
      result.dest[10] = -2 / fn;
      result.dest[11] = 0;
      result.dest[12] = -(left + right) / rl;
      result.dest[13] = -(top + bottom) / tb;
      result.dest[14] = -(far + near) / fn;
      result.dest[15] = 1;
      return result;
  }
  
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis
   *
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing "up"
   * @param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * Returns result if specified, a new mat4 otherwise
   */
  static Matrix LookAt(Vector3 eye, Vector3 center, Vector3 up, [Matrix result]) {
      if(result == null) result = new Matrix.zero();
  
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
          eyex = eye.dest[0],
          eyey = eye.dest[1],
          eyez = eye.dest[2],
          upx = up.dest[0],
          upy = up.dest[1],
          upz = up.dest[2],
          centerx = center.dest[0],
          centery = center.dest[1],
          centerz = center.dest[2];
  
      if (eyex === centerx && eyey === centery && eyez === centerz) {
          return Matrix.Identity(result);
      }
  
      //static Vector3 direction(eye, center, z);
      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
  
      // normalize (no check needed for 0 because of early return)
      len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
  
      //static Vector3 normalize(static Vector3 cross(up, z, x));
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
  
      //static Vector3 normalize(static Vector3 cross(z, x, y));
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
  
      result.dest[0] = x0;
      result.dest[1] = y0;
      result.dest[2] = z0;
      result.dest[3] = 0;
      result.dest[4] = x1;
      result.dest[5] = y1;
      result.dest[6] = z1;
      result.dest[7] = 0;
      result.dest[8] = x2;
      result.dest[9] = y2;
      result.dest[10] = z2;
      result.dest[11] = 0;
      result.dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      result.dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      result.dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      result.dest[15] = 1;
  
      return result;
  }
  Matrix lookAt(Vector3 eye, Vector3 center, Vector3 up)
        => Matrix.LookAt(eye,center,up,this);
  
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     static Matrix identity([Matrix result]);
   *     static Matrix translate(dest, vec);
   *     var quatMat = new Matrix.zero();
   *     static Quaternion toMat4( Quaternion quat, quatMat);
   *     static Matrix multiply(dest, quatMat);
   *
   * @param {quat4} quat Rotation quaternion
   * @param {vec3} vec Translation vector
   * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
   *
   * Returns result if specified, a new mat4 otherwise
   */
  static Matrix FromRotationTranslation( Quaternion quat, Vector3 vec, [Matrix result]) {
      if(result == null) result = new Matrix.zero();
  
      // Quaternion math
      var x = quat.dest[0], y = quat.dest[1], z = quat.dest[2], w = quat.dest[3],
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
  
      result.dest[0] = 1 - (yy + zz);
      result.dest[1] = xy + wz;
      result.dest[2] = xz - wy;
      result.dest[3] = 0;
      result.dest[4] = xy - wz;
      result.dest[5] = 1 - (xx + zz);
      result.dest[6] = yz + wx;
      result.dest[7] = 0;
      result.dest[8] = xz + wy;
      result.dest[9] = yz - wx;
      result.dest[10] = 1 - (xx + yy);
      result.dest[11] = 0;
      result.dest[12] = vec.dest[0];
      result.dest[13] = vec.dest[1];
      result.dest[14] = vec.dest[2];
      result.dest[15] = 1;
      
      return result;
  }
  
  
  Matrix fromRotationTranslation( Quaternion quat, Vector3 vec)
      => Matrix.FromRotationTranslation(quat, vec, this);
  
  
  /**
   * Returns a string representation of a mat4
   *
   * @param {mat4} mat mat4 to represent as a string
   *
   * @returns {string} String representation of mat
   */
  String toString() {
      return '[' + dest[0] + ', ' + dest[1] + ', ' + dest[2] + ', ' + dest[3] +
          ', ' + dest[4] + ', ' + dest[5] + ', ' + dest[6] + ', ' + dest[7] +
          ', ' + dest[8] + ', ' + dest[9] + ', ' + dest[10] + ', ' + dest[11] +
          ', ' + dest[12] + ', ' + dest[13] + ', ' + dest[14] + ', ' + dest[15] + ']';
  }  
}
