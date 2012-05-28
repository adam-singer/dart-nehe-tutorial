class Vector3 {
  
  Float32Array _items;
  
  Vector3() {
    _items = new Float32Array(3);
  }
  
  Vector3.fromValues(num x, num y, num z) {
    _items = new Float32Array(3); //.fromList([x, y, z]);
    _items[0] = x;
    _items[1] = y;
    _items[2] = z;
  }
  
  Vector3.fromList(List<num> list) {
    _items = new Float32Array.fromList(list);
  }
  
  operator [](int index) => _items[index];

  operator []=(int index, double value) => _items[index] = value;

  Float32Array get array()      => _items;
  set array(Float32Array array) => _items = array;

  
  /**
   * Performs a vector addition
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  void add(Vector3 vec2, [Vector3 dest]) {
    if (null == dest) {
      _items[0] += vec2[0];
      _items[1] += vec2[1];
      _items[2] += vec2[2];
    } else {
      dest[0] = _items[0] + vec2[0];
      dest[1] = _items[1] + vec2[1];
      dest[2] = _items[2] + vec2[2];
    }
  }

  /**
   * Performs a vector subtraction
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  void subtract(Vector3 vec2, [Vector3 dest]) {
    if (null == dest) {
      _items[0] -= vec2[0];
      _items[1] -= vec2[1];
      _items[2] -= vec2[2];
    } else {
      dest[0] = _items[0] - vec2[0];
      dest[1] = _items[1] - vec2[1];
      dest[2] = _items[2] - vec2[2];
    }
  }

  /**
   * Performs a vector multiplication
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  void multiply(Vector3 vec2, [Vector3 dest]) {
    if (dest == null) {
      _items[0] *= vec2[0];
      _items[1] *= vec2[1];
      _items[2] *= vec2[2];
    } else {
      dest[0] = _items[0] * vec2[0];
      dest[1] = _items[1] * vec2[1];
      dest[2] = _items[2] * vec2[2];
    }
  }

  /**
   * Negates the components of a vec3
   *
   * @param {vec3} vec vec3 to negate
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  void negate([Vector3 dest]) {
    var out = (null == dest ? _items : dest);

    out[0] = -_items[0];
    out[1] = -_items[1];
    out[2] = -_items[2];
  }

  /**
   * Multiplies the components of a vec3 by a scalar value
   *
   * @param {vec3} vec vec3 to scale
   * @param {number} val Value to scale by
   * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * @returns {vec3} dest if specified, vec otherwise
   */
  void scale(num val, [Vector3 dest]) {
    if (null == dest) {
      _items[0] *= val;
      _items[1] *= val;
      _items[2] *= val;
    } else {
      dest[0] = _items[0] * val;
      dest[1] = _items[1] * val;
      dest[2] = _items[2] * val;
    }
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
  void normalize([Vector3 dest]) {
    var out = (null == dest ? _items : dest);

    var x = _items[0], y = _items[1], z = _items[2],
        len = Math.sqrt(x * x + y * y + z * z);

    if (0 == len) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    } else if (len == 1) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
    } else {
      len = 1 / len;
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
    }
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
  void cross(Vector3 vec2, [Vector3 dest]) {
    var out = (null == dest ? _items : dest);

    double x  = _items[0], y  = _items[1], z  = _items[2],
           x2 = vec2[0],   y2 = vec2[1],   z2 = vec2[2];

    out[0] = y * z2 - z * y2;
    out[1] = z * x2 - x * z2;
    out[2] = x * y2 - y * x2;
  }

  /**
   * Caclulates the length of a vec3
   *
   * @param {vec3} vec vec3 to calculate length of
   *
   * @returns {number} Length of vec
   */
  double length() {
      double x = _items[0], y = _items[1], z = _items[2];
      return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Caclulates the dot product of two vec3s
   *
   * @param {vec3} vec First operand
   * @param {vec3} vec2 Second operand
   *
   * @returns {number} Dot product of vec and vec2
   */
  double dot(Vector3 vec2) {
      return _items[0] * vec2[0] + _items[1] * vec2[1] + _items[2] * vec2[2];
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
  void direction(Vector3 vec2, [Vector3 dest]) {
    var out = (null == dest ? _items : dest);

    double
        x = _items[0] - vec2[0],
        y = _items[1] - vec2[1],
        z = _items[2] - vec2[2],
        len = Math.sqrt(x * x + y * y + z * z);

    if (0 == len) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    } else {
      len = 1 / len;
      out[0] = x * len;
      out[1] = y * len;
      out[2] = z * len;
    }
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
  void lerp(Vector3 vec2, double coef, [Vector3 dest]) {
    var out = (null == dest ? _items : dest);

    out[0] = _items[0] + coef * (vec2[0] - _items[0]);
    out[1] = _items[1] + coef * (vec2[1] - _items[1]);
    out[2] = _items[2] + coef * (vec2[2] - _items[2]);
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
  double dist(Vector3 vec2) {
    double
        x = vec2[0] - _items[0],
        y = vec2[1] - _items[1],
        z = vec2[2] - _items[2];
        
    return Math.sqrt(x*x + y*y + z*z);
  }

  // Pre-allocated to prevent unecessary garbage collection
  var _unprojectMat = null;
  var _unprojectVec;
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
  void unproject(Matrix4 view, Matrix4 proj, Vector4 viewport, [Vector3 dest]) {
    var out = (null == dest ? _items : dest);

    _unprojectVec = new Float32Array(4);
    
    if (null == _unprojectMat) {
      _unprojectMat = new Matrix4();
    }

    var m = _unprojectMat;
    var v = _unprojectVec;
    
    v[0] = (_items[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
    v[1] = (_items[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
    v[2] = 2.0 * _items[2] - 1.0;
    v[3] = 1.0;
    
    proj.multiply(view, m);
    if (!m.inverse()) { return null; }
    
    m.multiplyVec4(v);
    if (v[3] === 0.0) { return null; }

    out[0] = v[0] / v[3];
    out[1] = v[1] / v[3];
    out[2] = v[2] / v[3];
  }

  /**
   * Generates a quaternion of rotation between two given normalized vectors
   *
   * @param {vec3} a Normalized source vector
   * @param {vec3} b Normalized target vector
   * @param {quat4} [dest] quat4 receiving operation result.
   *
   * @returns {quat4} dest if specified, a new quat4 otherwise
   */
  void rotationTo(Vector3 target, [Quat4 dest]) {
    var out = (null == dest ? _items : dest);
    
    Vector3 xUnitVec3 = new Vector3.fromValues(1,0,0);
    Vector3 yUnitVec3 = new Vector3.fromValues(0,1,0);
    Vector3 zUnitVec3 = new Vector3.fromValues(0,0,1);

    double d = this.dot(target);
    Vector3 axis = new Vector3();
    
    if (d >= 1.0) {
      dest.identity();
    } else if (d < (0.000001 - 1.0)) {
      xUnitVec3.cross(this, axis);
      if (axis.length() < 0.000001) {
        yUnitVec3.cross(this, axis);
      }
      if (axis.length() < 0.000001) {
        zUnitVec3.cross(this, axis);
      }
      axis.normalize();
      /** @TODO: check upstream for: quat4.fromAxisAngle(Math.PI, dest); */
    } else {
      double s = Math.sqrt((1.0 + d) * 2.0);
      double sInv = 1.0 / s;
      this.cross(target, axis);
      
      out[0] = axis[0] * sInv;
      out[1] = axis[1] * sInv;
      out[2] = axis[2] * sInv;
      out[3] = s * 0.5;
      out.normalize();
    }
    if (_items[3] > 1.0) {
      _items[3] = 1.0;
    } else if (_items[3] < -1.0) {
      _items[3] = -1.0;
    }
  }

  /**
   * Returns a string representation of a vector
   *
   * @param {vec3} vec Vector to represent as a string
   *
   * @returns {string} String representation of vec
   */
  String toString() {
      return '[' + _items[0] + ', ' + _items[1] + ', ' + _items[2] + ']';
  }
  
}
