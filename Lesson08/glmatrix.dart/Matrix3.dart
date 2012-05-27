class Matrix3 {

  Float32Array dest;
  
  
  Matrix3([Float32Array list]) {
    if(list == null) dest = new Float32Array(9);
    if(list.length != 9) dest = new Float32Array(9);
    dest = list;
  }

  

  void set m11(num value) {dest[0] = value;}
  num get m11() => dest[0];
  void set m12(num value) {dest[1] = value;}
  num get m12() => dest[1];
  void set m13(num value) {dest[2] = value;}
  num get m13() => dest[2];
  void set m21(num value) {dest[3] = value;}
  num get m21() => dest[3];
  void set m22(num value) {dest[4] = value;}
  num get m22() => dest[4];
  void set m23(num value) {dest[5] = value;}
  num get m23() => dest[5];
  void set m31(num value) {dest[6] = value;}
  num get m31() => dest[6];
  void set m32(num value) {dest[7] = value;}
  num get m32() => dest[7];
  void set m33(num value) {dest[8] = value;}
  num get m33() => dest[8];
  
  
  
/*
 * mat3
 */

/**
 * Creates a new instance of a mat3 using the default array type
 * Any javascript array-like object containing at least 9 numeric elements can serve as a mat3
 *
 * @param {mat3} [mat] mat3 containing values to initialize with
 *
 * @returns {mat3} New mat3
 */
/*
Matrix3 create(mat) {
    var dest = new Matrix3();

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
    }

    return result;
}
*/

/**
 * Copies the values of one mat3 to another
 *
 * @param {mat3} mat mat3 containing values to copy
 * @param {mat3} dest mat3 receiving copied values
 *
 * @returns {mat3} dest
 */
Matrix3 Copy(Matrix3 mat, [Matrix3 result]) {
    result.dest[0] = mat.dest[0];
    result.dest[1] = mat.dest[1];
    result.dest[2] = mat.dest[2];
    result.dest[3] = mat.dest[3];
    result.dest[4] = mat.dest[4];
    result.dest[5] = mat.dest[5];
    result.dest[6] = mat.dest[6];
    result.dest[7] = mat.dest[7];
    result.dest[8] = mat.dest[8];
    return result;
}

/**
 * Sets a mat3 to an identity matrix
 *
 * @param {mat3} dest mat3 to set
 *
 * @returns dest if specified, otherwise a new mat3
 */
Matrix3 Identity([Matrix3 result]) {
    if(result == null) { result = new Matrix3(); }
    result.dest[0] = 1;
    result.dest[1] = 0;
    result.dest[2] = 0;
    result.dest[3] = 0;
    result.dest[4] = 1;
    result.dest[5] = 0;
    result.dest[6] = 0;
    result.dest[7] = 0;
    result.dest[8] = 1;
    return result;
}

/**
 * Transposes a mat3 (flips the values over the diagonal)
 *
 * Params:
 * @param {mat3} mat mat3 to transpose
 * @param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
 *
 * @returns {mat3} dest is specified, mat otherwise
 */
Matrix3 Transpose(Matrix3 mat, [Matrix3 result]) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (result == null || mat === result) {
        var a01 = mat.dest[1], a02 = mat.dest[2],
            a12 = mat.dest[5];

        mat.dest[1] = mat.dest[3];
        mat.dest[2] = mat.dest[6];
        mat.dest[3] = a01;
        mat.dest[5] = mat.dest[7];
        mat.dest[6] = a02;
        mat.dest[7] = a12;
        return mat;
    }

    result.dest[0] = mat.dest[0];
    result.dest[1] = mat.dest[3];
    result.dest[2] = mat.dest[6];
    result.dest[3] = mat.dest[1];
    result.dest[4] = mat.dest[4];
    result.dest[5] = mat.dest[7];
    result.dest[6] = mat.dest[2];
    result.dest[7] = mat.dest[5];
    result.dest[8] = mat.dest[8];
    return result;
}

/**
 * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
 *
 * @param {mat3} mat mat3 containing values to copy
 * @param {mat4} [dest] mat4 receiving copied values
 *
 * @returns {mat4} dest if specified, a new mat4 otherwise
 */
Matrix ToMat4(Matrix3 mat, [Matrix result]) {
    if(result == null) { result = new Matrix.zero(); }

    result.dest[15] = 1;
    result.dest[14] = 0;
    result.dest[13] = 0;
    result.dest[12] = 0;

    result.dest[11] = 0;
    result.dest[10] = mat.dest[8];
    result.dest[9] = mat.dest[7];
    result.dest[8] = mat.dest[6];

    result.dest[7] = 0;
    result.dest[6] = mat.dest[5];
    result.dest[5] = mat.dest[4];
    result.dest[4] = mat.dest[3];

    result.dest[3] = 0;
    result.dest[2] = mat.dest[2];
    result.dest[1] = mat.dest[1];
    result.dest[0] = mat.dest[0];

    return result;
}

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat mat3 to represent as a string
 *
 * @param {string} String representation of mat
 */
String toString() {
    return '[' + dest[0] + ', ' + dest[1] + ', ' + dest[2] +
        ', ' + dest[3] + ', ' + dest[4] + ', ' + dest[5] +
        ', ' + dest[6] + ', ' + dest[7] + ', ' + dest[8] + ']';
}  
}
