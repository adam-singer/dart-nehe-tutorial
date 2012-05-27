

/*
 * quat4
 */
class Quaternion {

  Float32Array dest;
  
  int get X() => dest[0];
  void set X(num val) { dest[0] = val;}
  int get Y() => dest[1];
  void set Y(num val) { dest[1] = val;}
  int get Z() => dest[2];
  void set Z(num val) { dest[2] = val;}
  int get W() => dest[3];
  void set W(num val) { dest[3] = val;}
  
  
  Quaternion.zero() {
    dest = new Float32Array(4);
  }
  Quaternion.fromList(List<num> list) {
    if(list == null) {
      throw "List is empty";
      dest = new Float32Array(4);
      return;
    }
    if(list.length == 4) {
      dest = new Float32Array.fromList(list);
      return;
    }
    throw "List has to much or to less values";
    dest = new Float32Array(4);
  }
  
  Quaternion(num x, num y, num z, num w) {
    dest = new Float32Array.fromList([x,y,z,w]);
  }
  
  /**
   * Creates a new instance of a quat4 using the default array type
   * Any javascript array containing at least 4 numeric elements can serve as a quat4
   *
   * @param {quat4} [quat] quat4 containing values to initialize with
   *
   * @returns {quat4} New quat4
   */
  /*
  static Quaternion create(quat) {
      var dest = new MatrixArray(4);
  
      if (quat) {
          result.dest[0] = quat.dest[0];
          result.dest[1] = quat.dest[1];
          result.dest[2] = quat.dest[2];
          result.dest[3] = quat.dest[3];
      }
  
      return result;
  }*/
  
  /**
   * Copies the values of one quat4 to another
   *
   * @param {quat4} quat quat4 containing values to copy
   * @param {quat4} dest quat4 receiving copied values
   *
   * @returns {quat4} dest
   */
  static Quaternion Clone( Quaternion quat, [Quaternion result]) {
    if(result == null) result = new Quaternion.zero();
      result.dest[0] = quat.dest[0];
      result.dest[1] = quat.dest[1];
      result.dest[2] = quat.dest[2];
      result.dest[3] = quat.dest[3];
  
      return result;
  }
  
  Quaternion clone([Quaternion result]) => Quaternion.Clone(this,result);
  
  /**
   * Calculates the W component of a quat4 from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length. 
   * Any existing W component will be ignored. 
   *
   * @param {quat4} quat quat4 to calculate W component of
   * @param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  static Quaternion CalculateW( Quaternion quat, [Quaternion result]) {
      var x = quat.dest[0], y = quat.dest[1], z = quat.dest[2];
  
      if(result == null) result = new Quaternion.zero();
      if (quat === result) {
          quat.dest[3] = -Math.sqrt((1.0 - x * x - y * y - z * z).abs());
          return quat;
      }
      result.dest[0] = x;
      result.dest[1] = y;
      result.dest[2] = z;
      result.dest[3] = -Math.sqrt((1.0 - x * x - y * y - z * z).abs());
      return result;
  }
  
  /**
   * Calculates the dot product of two quaternions
   *
   * @param {quat4} quat First operand
   * @param {quat4} quat2 Second operand
   *
   * @return {number} Dot product of quat and quat2
   */
  static num Dot( Quaternion quat, quat2){
      return quat.dest[0]*quat2.dest[0] + quat.dest[1]*quat2.dest[1] + quat.dest[2]*quat2.dest[2] + quat.dest[3]*quat2.dest[3];
  }
  
  /**
   * Calculates the inverse of a quat4
   *
   * @param {quat4} quat quat4 to calculate inverse of
   * @param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  static Quaternion Inverse( Quaternion quat, [Quaternion result]) {
      var q0 = quat.dest[0], q1 = quat.dest[1], q2 = quat.dest[2], q3 = quat.dest[3],
          tdot = q0*q0 + q1*q1 + q2*q2 + q3*q3,
          invDot = tdot ? 1.0/tdot : 0;
      
      // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
      
      if(result == null) result = new Quaternion.zero();
      if (quat === result) {
          quat.dest[0] *= -invDot;
          quat.dest[1] *= -invDot;
          quat.dest[2] *= -invDot;
          quat.dest[3] *= invDot;
          return quat;
      }
      result.dest[0] = -quat.dest[0]*invDot;
      result.dest[1] = -quat.dest[1]*invDot;
      result.dest[2] = -quat.dest[2]*invDot;
      result.dest[3] = quat.dest[3]*invDot;
      return result;
  }
  
  
  /**
   * Calculates the conjugate of a quat4
   * If the quaternion is normalized, this function is faster than static Quaternion inverse and produces the same result.
   *
   * @param {quat4} quat quat4 to calculate conjugate of
   * @param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  static Quaternion Conjugate( Quaternion quat, [Quaternion result]) {
      if(result == null) result = new Quaternion.zero();
      if (quat === result) {
          quat.dest[0] *= -1;
          quat.dest[1] *= -1;
          quat.dest[2] *= -1;
          return quat;
      }
      result.dest[0] = -quat.dest[0];
      result.dest[1] = -quat.dest[1];
      result.dest[2] = -quat.dest[2];
      result.dest[3] = quat.dest[3];
      return result;
  }
  
  /**
   * Calculates the length of a quat4
   *
   * Params:
   * @param {quat4} quat quat4 to calculate length of
   *
   * @returns Length of quat
   */
  num length() {
      var x = dest[0], y = dest[1], z = dest[2], w = dest[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  
  /**
   * Generates a unit quaternion of the same direction as the provided quat4
   * If quaternion length is 0, returns [0, 0, 0, 0]
   *
   * @param {quat4} quat quat4 to normalize
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  static Quaternion Normalize( Quaternion quat, [Quaternion result]) {
      if(result == null) { result = new Quaternion.zero(); }
  
      var x = quat.dest[0], y = quat.dest[1], z = quat.dest[2], w = quat.dest[3],
          len = Math.sqrt(x * x + y * y + z * z + w * w);
      if (len === 0) {
          result.dest[0] = 0;
          result.dest[1] = 0;
          result.dest[2] = 0;
          result.dest[3] = 0;
          return result;
      }
      len = 1 / len;
      result.dest[0] = x * len;
      result.dest[1] = y * len;
      result.dest[2] = z * len;
      result.dest[3] = w * len;
  
      return result;
  }
  
  /**
   * Performs a quaternion multiplication
   *
   * @param {quat4} quat First operand
   * @param {quat4} quat2 Second operand
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  static Quaternion Multiply( Quaternion quat, Quaternion quat2, [Quaternion result]) {
      if(result == null) { result = new Quaternion.zero(); }
  
      var qax = quat.dest[0], qay = quat.dest[1], qaz = quat.dest[2], qaw = quat.dest[3],
          qbx = quat2.dest[0], qby = quat2.dest[1], qbz = quat2.dest[2], qbw = quat2.dest[3];
  
      result.dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      result.dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      result.dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      result.dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
  
      return result;
  }
  

  
  /**
   * Calculates a 3x3 matrix from the given quat4
   *
   * @param {quat4} quat quat4 to create matrix from
   * @param {mat3} [dest] mat3 receiving operation result
   *
   * @returns {mat3} dest if specified, a new mat3 otherwise
   */
  static Matrix3 ToMat3( Quaternion quat, [Matrix3 result]) {
      if(result == null) { result = new Matrix3(); }
  
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
  
      result.dest[3] = xy - wz;
      result.dest[4] = 1 - (xx + zz);
      result.dest[5] = yz + wx;
  
      result.dest[6] = xz + wy;
      result.dest[7] = yz - wx;
      result.dest[8] = 1 - (xx + yy);
  
      return result;
  }
  
  /**
   * Calculates a 4x4 matrix from the given quat4
   *
   * @param {quat4} quat quat4 to create matrix from
   * @param {mat4} [dest] mat4 receiving operation result
   *
   * @returns {mat4} dest if specified, a new mat4 otherwise
   */
  static Matrix ToMat4( Quaternion quat, [Matrix result]) {
      if(result == null) { result = new Matrix.zero(); }
  
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
  
      result.dest[12] = 0;
      result.dest[13] = 0;
      result.dest[14] = 0;
      result.dest[15] = 1;
  
      return result;
  }
  
  /**
   * Performs a spherical linear interpolation between two quat4
   *
   * @param {quat4} quat First quaternion
   * @param {quat4} quat2 Second quaternion
   * @param {number} slerp Interpolation amount between the two inputs
   * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * @returns {quat4} dest if specified, quat otherwise
   */
  static Quaternion Slerp( Quaternion quat, Quaternion quat2, num slerpVal, [Quaternion result]) {
      if(result == null) { result = new Quaternion.zero(); }
  
      var cosHalfTheta = quat.dest[0] * quat2.dest[0] + quat.dest[1] * quat2.dest[1] + quat.dest[2] * quat2.dest[2] + quat.dest[3] * quat2.dest[3],
          halfTheta,
          sinHalfTheta,
          ratioA,
          ratioB;
  
      if ((cosHalfTheta).abs() >= 1.0) {
          if (result !== quat) {
              result.dest[0] = quat.dest[0];
              result.dest[1] = quat.dest[1];
              
              
              result.dest[2] = quat.dest[2];
              result.dest[3] = quat.dest[3];
          }
          return result;
      }
  
      halfTheta = Math.acos(cosHalfTheta);
      sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
  
      if ((sinHalfTheta).abs() < 0.001) {
          result.dest[0] = (quat.dest[0] * 0.5 + quat2.dest[0] * 0.5);
          result.dest[1] = (quat.dest[1] * 0.5 + quat2.dest[1] * 0.5);
          result.dest[2] = (quat.dest[2] * 0.5 + quat2.dest[2] * 0.5);
          result.dest[3] = (quat.dest[3] * 0.5 + quat2.dest[3] * 0.5);
          return result;
      }
  
      ratioA = Math.sin((1 - slerpVal) * halfTheta) / sinHalfTheta;
      ratioB = Math.sin(slerpVal * halfTheta) / sinHalfTheta;
  
      result.dest[0] = (quat.dest[0] * ratioA + quat2.dest[0] * ratioB);
      result.dest[1] = (quat.dest[1] * ratioA + quat2.dest[1] * ratioB);
      result.dest[2] = (quat.dest[2] * ratioA + quat2.dest[2] * ratioB);
      result.dest[3] = (quat.dest[3] * ratioA + quat2.dest[3] * ratioB);
  
      return result;
  }
  
  /**
   * Returns a string representation of a quaternion
   *
   * @param {quat4} quat quat4 to represent as a string
   *
   * @returns {string} String representation of quat
   */
  String toString() => '[' + dest[0] + ', ' + dest[1] + ', ' + dest[2] + ', ' + dest[3] + ']';
  
  int hashCode() => X.hashCode() + Y.hashCode() + Z.hashCode() + W.hashCode();
}
