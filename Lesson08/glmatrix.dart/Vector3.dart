class Vector3 {
  Float32Array dest;

  Vector3.fromValues(num x, num y, num z) {
    dest = new Float32Array.fromList([x,y,z]);
  }
  
  Vector3.zero() {
    dest = new Float32Array(3);
  }
  
  Vector3.fromSingleValues(num value) {
    dest = new Float32Array.fromList([value,value,value]);
  }
  
  Vector3.fromList(List<num> list) {
    
    if(list == null) {
      throw "List is Null";
      dest = new Float32Array(3);
      return;
    }
    if(list.length == 3) {
      dest = new Float32Array.fromList(list);
      return;
    }
    
    if(list.length > 3) {
      dest = new Float32Array.fromList(list.getRange(0, 3));
      return;
    }
    if(list.length == 2) {
      dest = new Float32Array.fromList([list[0],list[1],0]);
      return;
    }
    if(list.length == 1) {
      dest = new Float32Array.fromList([list[0],0,0]);
      return;
    }
    dest = new Float32Array(3);
  }
  
  Vector3(num x, num y, num z) {
    dest = new Float32Array.fromList([x,y,z]);
  }
  
  
  num get X() => dest[0];
  void set X(num val) { dest[0] = val;}
  num get Y() => dest[1];
  void set Y(num val) { dest[1] = val;}
  num get Z() => dest[2];
  void set Z(num val) { dest[2] = val;}
  
  
  /*
   * vec3
   */
   
  /**
   * Creates a new instance of a vec3 using the default array type
   * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
   *
   * @param {vec3} [vec] vec3 containing values to initialize with
   *
   * @returns {vec3} New vec3
   */
  /*static Vector3 create(vec) {
      var dest =new Vector3.zero();

      if (vec) {
          result.dest[0] = vec.dest[0];
          result.dest[1] = vec.dest[1];
          result.dest[2] = vec.dest[2];
      } else {
          result.dest[0] = result.dest[1] = result.dest[2] = 0;
      }

      return result;
  }*/

  
  
  /**
   * Copies the values of one vec3 to another
   *
   * @param {vec3} vec vec3 containing values to copy
   * @param {vec3} dest vec3 receiving copied values
   *
   * @returns {vec3} dest
   */
  static Vector3 Clone(Vector3 vec, [Vector3 result]) {
      result.dest[0] = vec.dest[0];
      result.dest[1] = vec.dest[1];
      result.dest[2] = vec.dest[2];

      return result;
  }
  
  Vector3 clone([Vector3 result]) {
    return Vector3.Clone(this, result);
  }

  /**
   * Performs a vector addition
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Add(Vector3 vec, Vector3 vec2, [Vector3 result]) {
      if (result == null || vec === result) {
          vec.dest[0] += vec2.dest[0];
          vec.dest[1] += vec2.dest[1];
          vec.dest[2] += vec2.dest[2];
          return vec;
      }

      result.dest[0] = vec.dest[0] + vec2.dest[0];
      result.dest[1] = vec.dest[1] + vec2.dest[1];
      result.dest[2] = vec.dest[2] + vec2.dest[2];
      return result;
  }
  Vector3 add(Vector3 vec) => Vector3.Add(this, vec, this);
  /**
   * Performs a vector subtraction
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Subtract(Vector3 vec, Vector3 vec2, [Vector3 result]) {
      if (result == null || vec === result) {
          vec.dest[0] -= vec2.dest[0];
          vec.dest[1] -= vec2.dest[1];
          vec.dest[2] -= vec2.dest[2];
          return vec;
      }

      result.dest[0] = vec.dest[0] - vec2.dest[0];
      result.dest[1] = vec.dest[1] - vec2.dest[1];
      result.dest[2] = vec.dest[2] - vec2.dest[2];
      return result;
  }
  Vector3 subtract(Vector3 vec) => Vector3.Subtract(this, vec, this);

  /**
   * Performs a vector multiplication
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Multiply(Vector3 vec, Vector3 vec2, [Vector3 result]) {
    if(result == null) result = new Vector3.zero();
      if (result == null || vec === result) {
          vec.dest[0] *= vec2.dest[0];
          vec.dest[1] *= vec2.dest[1];
          vec.dest[2] *= vec2.dest[2];
          return vec;
      }

      result.dest[0] = vec.dest[0] * vec2.dest[0];
      result.dest[1] = vec.dest[1] * vec2.dest[1];
      result.dest[2] = vec.dest[2] * vec2.dest[2];
      return result;
  }
  Vector3 multiply(Vector3 vec) => Multiply(this,vec,this);

  /**
   * Transforms a vec3 with the given quaternion
   *
   * @param {quat4} quat quat4 to transform the vector with
   * @param {vec3} vec vec3 to transform
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns dest if specified, vec otherwise
   */
  static Vector3 MultiplyQuat( Vector3 vec, Quaternion quat, [Vector3 result]) {
      if(result == null) { result = new Vector3.zero(); }
  
      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2],
          qx = quat.dest[0], qy = quat.dest[1], qz = quat.dest[2], qw = quat.dest[3],
  
          // calculate quat * vec
          ix = qw * x + qy * z - qz * y,
          iy = qw * y + qz * x - qx * z,
          iz = qw * z + qx * y - qy * x,
          iw = -qx * x - qy * y - qz * z;
  
      // calculate result * inverse quat
      result.dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      result.dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      result.dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  
      return result;
  }
  Vector3 multiplyQuat(Quaternion quat) => Vector3.MultiplyQuat(this,quat,this);
  
  
  
  /**
   * Negates the components of a vec3
   *
   * @param {vec3} vec vec3 to negate
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Negate(Vector3 vec, [Vector3 result]) {
      if(result == null) result = new Vector3.zero();

      result.dest[0] = -vec.dest[0];
      result.dest[1] = -vec.dest[1];
      result.dest[2] = -vec.dest[2];
      return result;
  }
  Vector3 negate() => Vector3.Negate(this,this);

  /**
   * Multiplies the components of a vec3 by a scalar value
   *
   * @param {vec3} vec vec3 to scale
   * @param {number} val Value to scale by
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Scale(Vector3 vec, num val, [Vector3 result]) {
      if (result == null || vec === result) {
          vec.dest[0] *= val;
          vec.dest[1] *= val;
          vec.dest[2] *= val;
          return vec;
      }

      result.dest[0] = vec.dest[0] * val;
      result.dest[1] = vec.dest[1] * val;
      result.dest[2] = vec.dest[2] * val;
      return result;
  }

  /**
   * Generates a unit vector of the same direction as the provided vec3
   * If vector length is 0, returns [0, 0, 0]
   *
   * @param {vec3} vec vec3 to normalize
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Normalize(Vector3 vec, [Vector3 result]) {
      if(result == null) result = new Vector3.zero();

      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2],
          len = Math.sqrt(x * x + y * y + z * z);

      if (!len) {
          result.dest[0] = 0;
          result.dest[1] = 0;
          result.dest[2] = 0;
          return result;
      } else if (len === 1) {
          result.dest[0] = x;
          result.dest[1] = y;
          result.dest[2] = z;
          return result;
      }

      len = 1 / len;
      result.dest[0] = x * len;
      result.dest[1] = y * len;
      result.dest[2] = z * len;
      return result;
  }

  /**
   * Generates the cross product of two vec3s
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Cross(Vector3 vec, Vector3 vec2, [Vector3 result]) {
      if(result == null) result = new Vector3.zero();

      var x = vec.dest[0], y = vec.dest[1], z = vec.dest[2],
          x2 = vec2.dest[0], y2 = vec2.dest[1], z2 = vec2.dest[2];

      result.dest[0] = y * z2 - z * y2;
      result.dest[1] = z * x2 - x * z2;
      result.dest[2] = x * y2 - y * x2;
      return result;
  }

  /**
   * Caclulates the length of a vec3
   *
   * @param {vec3} vec vec3 to calculate length of
   *
   * @returns {number} Length of vec
   */
  num get length() => Math.sqrt(Math.pow(X,2) + Math.pow(Y,2) + Math.pow(Z,2) );
 

  /**
   * Caclulates the dot product of two vec3s
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   *
   * @returns {number} Dot product of vec and vec2
   */
  static num Dot(Vector3 vec, Vector3 vec2) {
      return vec.dest[0] * vec2.dest[0] + vec.dest[1] * vec2.dest[1] + vec.dest[2] * vec2.dest[2];
  }

  /**
   * Generates a unit vector pointing from one vector to another
   *
   * @param {vec3} vec Origin vec3
   * @param {vec3} vec2 vec3 to point to
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Direction(Vector3 vec, Vector3 vec2, [Vector3 result]) {
      if(result == null) result = new Vector3.zero();

      var x = vec.dest[0] - vec2.dest[0],
          y = vec.dest[1] - vec2.dest[1],
          z = vec.dest[2] - vec2.dest[2],
          len = Math.sqrt(x * x + y * y + z * z);

      if (!len) {
          result.dest[0] = 0;
          result.dest[1] = 0;
          result.dest[2] = 0;
          return result;
      }

      len = 1 / len;
      result.dest[0] = x * len;
      result.dest[1] = y * len;
      result.dest[2] = z * len;
      return result;
  }

  /**
   * Performs a linear interpolation between two vec3
   *
   * @param {vec3} vec First vector
   * @param {vec3} vec2 Second vector
   * @param {number} lerp Interpolation amount between the two inputs
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector3 Lerp(Vector3 vec, Vector3 vec2, num lerpVal, [Vector3 result]) {
      if(result == null) result = new Vector3.zero();
      
      

      result.dest[0] = vec.dest[0] + lerpVal * (vec2.dest[0] - vec.dest[0]);
      result.dest[1] = vec.dest[1] + lerpVal * (vec2.dest[1] - vec.dest[1]);
      result.dest[2] = vec.dest[2] + lerpVal * (vec2.dest[2] - vec.dest[2]);

      return result;
  }

  /**
   * Calculates the euclidian distance between two vec3
   *
   * Params:
   * @param {vec3} vec First vector
   * @param {vec3} vec2 Second vector
   *
   * @returns {number} Distance between vec and vec2
   */
  static double Dist(Vector3 vec, Vector3 vec2) {
      var x = vec2.dest[0] - vec.dest[0],
          y = vec2.dest[1] - vec.dest[1],
          z = vec2.dest[2] - vec.dest[2];
          
      return Math.sqrt(x*x + y*y + z*z);
  }
  double distance(Vector3 other) => Vector3.Dist(this, other);

  /**
   * Projects the specified vec3 from screen space into object space
   * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
   *
   * @param {vec3} vec Screen-space vector to project
   * @param {mat4} view View matrix
   * @param {mat4} proj Projection matrix
   * @param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
   * @param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  static Vector4 Unproject(Vector3 vec, Matrix view, Matrix proj, Vector4 viewport, [Vector4 result]) {
      if(result == null) result = new Vector4();

      Matrix m = new Matrix.zero();
      Vector4 v = new Vector4();
      
      v.dest[0] = (vec.dest[0] - viewport.dest[0]) * 2.0 / viewport.dest[2] - 1.0;
      v.dest[1] = (vec.dest[1] - viewport.dest[1]) * 2.0 / viewport.dest[3] - 1.0;
      v.dest[2] = 2.0 * vec.dest[2] - 1.0;
      v.dest[3] = 1.0;
      
      Matrix.Multiply(proj, view, m);
      if(Matrix.Inverse(m) == null) { return null; }
      
      Matrix.MultiplyVec4(m, v);
      if(v.dest[3] === 0.0) { return null; }

      result.dest[0] = v.dest[0] / v.dest[3];
      result.dest[1] = v.dest[1] / v.dest[3];
      result.dest[2] = v.dest[2] / v.dest[3];
      
      return result;
  }

  /**
   * Returns a string representation of a vector
   *
   * @param {vec3} vec Vector to represent as a string
   *
   * @returns {string} String representation of vec
   */
  String toString() => '[' + dest[0] + ', ' + dest[1] + ', ' + dest[2] + ']';
  
  int hashCode() => X.hashCode() + Y.hashCode() + Z.hashCode();
  
}
