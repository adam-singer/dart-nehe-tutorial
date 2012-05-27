Matrix4 pMatrix;
Matrix4 mvMatrix;
List<Matrix4> mvMatrixStack;

mvPushMatrix() {
  Matrix4 c = mvMatrix.clone();
  mvMatrixStack.add(c);
}

mvPopMatrix() {
  if (mvMatrixStack.length != 0) {
    mvMatrix = mvMatrixStack.removeLast();
  }
}

// utils
degToRad(degrees) {
  return degrees * Math.PI / 180;
}


class Star {
  num angle;
  num dist;
  num rotationSpeed;
  num r;
  num g;
  num b;
  num twinkleR;
  num twinkleG;
  num twinkleB;
  num effectiveFPMS;
  WebGLRenderingContext gl; 
  WebGLUniformLocation colorUniform;
  example _example;
  Star(startingDistance, rotationSpeed, gl, colorUniform, e) {
    this._example = e;
    this.gl = gl;
    this.colorUniform = colorUniform;
    this.angle = 0;
    this.dist = startingDistance;
    this.rotationSpeed = rotationSpeed;
    this.effectiveFPMS = 60 / 1000;
    // Set the colors to a starting value.
    this.randomiseColors();
  }
  
  randomiseColors() {
    // Give the star a random color for normal
    // circumstances...
    this.r = Math.random();
    this.g = Math.random();
    this.b = Math.random();

    // When the star is twinkling, we draw it twice, once
    // in the color below (not spinning) and then once in the
    // main color defined above.
    this.twinkleR = Math.random();
    this.twinkleG = Math.random();
    this.twinkleB = Math.random();
    
  }
  
  draw(tilt, spin, twinkle) {
    mvPushMatrix();

    // Move to the star's position
    mvMatrix.rotate(degToRad(this.angle), new Vector3.fromValues(0.0, 1.0, 0.0));
    mvMatrix.translate(new Vector3.fromValues(this.dist, 0.0, 0.0));

    // Rotate back so that the star is facing the viewer
    mvMatrix.rotate(degToRad(-this.angle), new Vector3.fromValues(0.0, 1.0, 0.0));
    mvMatrix.rotate(degToRad(-tilt), new Vector3.fromValues(1.0, 0.0, 0.0));

    if (twinkle) {
        // Draw a non-rotating star in the alternate "twinkling" color
        gl.uniform3f(colorUniform, this.twinkleR, this.twinkleG, this.twinkleB);
        _example.drawStar();
    }

    // All stars spin around the Z axis at the same rate
    mvMatrix.rotate(degToRad(spin), new Vector3.fromValues(0.0, 0.0, 1.0));

    // Draw the star in its main color
    gl.uniform3f(colorUniform, this.r, this.g, this.b);
    _example.drawStar();

    mvPopMatrix();
  }
  
  animate(elapsedTime) {
    this.angle += this.rotationSpeed * this.effectiveFPMS * elapsedTime;

    // Decrease the distance, resetting the star to the outside of
    // the spiral if it's at the center.
    this.dist -= 0.01 * this.effectiveFPMS * elapsedTime;
    if (this.dist < 0.0) {
        this.dist += 5.0;
        this.randomiseColors();
    }
  }
}

class example {
  CanvasElement canvas;
  
  WebGLRenderingContext gl;
  int viewportWidth;
  int viewportHeight;
  
  WebGLProgram shaderProgram;
  
  int vertexPositionAttribute;
  int textureCoordAttribute;
  
  WebGLUniformLocation pMatrixUniform;
  WebGLUniformLocation mvMatrixUniform;
  WebGLUniformLocation samplerUniform;
  WebGLUniformLocation colorUniform;
  
  WebGLTexture starTexture;
  
  WebGLBuffer starVertexPositionBuffer;
  int starVertexPositionBufferitemSize;
  int starVertexPositionBuffernumItems;
  
  WebGLBuffer starVertexTextureCoordBuffer;
  int starVertexTextureCoordBufferitemSize;
  int starVertexTextureCoordBuffernumItems;
  
  List<Star> stars;
  int _lastTime;
  
  Map currentlyPressedKeys;
  

  var zoom = -15;
  var tilt = 90;
  var spin = 0.0;
  

  
  _getShader(g, id) {
    return createShaderFromScriptElement(g, id);
  }
  
  _initKeyboard() {
    currentlyPressedKeys = new Map();
    document.on["keydown"].add( (KeyboardEvent event) {
      //print("keydown");
      currentlyPressedKeys[event.keyCode] = true;
    });
    
    document.on["keyup"].add((KeyboardEvent event) {
      //print("keyup");
      currentlyPressedKeys[event.keyCode] = false;
    });
  }
  
  _handleKeys() {
    if (currentlyPressedKeys.containsKey(33)) {
      // Page Up
      zoom -= 0.1;
    }
    if (currentlyPressedKeys.containsKey(34)) {
      // Page Down
      zoom += 0.1;
    }

    if (currentlyPressedKeys.containsKey(38)) {
      // Up cursor key
      tilt += 2;
    }
    if (currentlyPressedKeys.containsKey(40)) {
      // Down cursor key
      tilt -= 2;
    }
  }
  
  // main code
  _initShaders() {
    var fragmentShader = _getShader(gl, "#shader-fs");
    var vertexShader = _getShader(gl, "#shader-vs");
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, WebGLRenderingContext.LINK_STATUS)) {
      throw "Could not initialise shaders";
    }
    
    gl.useProgram(shaderProgram);
    
    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    
    textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(textureCoordAttribute);
    
    pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    colorUniform = gl.getUniformLocation(shaderProgram, "uColor");
  }
  
  _initBuffers() {
    starVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, starVertexPositionBuffer);
    var vertices = [
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0,  1.0,  0.0
    ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertices), WebGLRenderingContext.STATIC_DRAW);
    starVertexPositionBufferitemSize = 3;
    starVertexPositionBuffernumItems = 4;

    starVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, starVertexTextureCoordBuffer);
    var textureCoords = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0
    ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(textureCoords), WebGLRenderingContext.STATIC_DRAW);
    starVertexTextureCoordBufferitemSize = 2;
    starVertexTextureCoordBuffernumItems = 4;
  }
  
  _initTexture() {
    starTexture = gl.createTexture();
    ImageElement starTextureImage = new ImageElement();
    starTextureImage.on.load.add((e) {
      gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, starTexture);
      gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, starTextureImage);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
//      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
//      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
     
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);
    });
    starTextureImage.src = 'star.gif';
  }
  
  setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix.array);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix.array);
  }
  
  drawStar() {
    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, starTexture);
    gl.uniform1i(samplerUniform, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, starVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, starVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, starVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, starVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    setMatrixUniforms();
    gl.drawArrays(WebGLRenderingContext.TRIANGLE_STRIP, 0, starVertexPositionBuffernumItems);
  }
  
  _initWorldObjects() {
    var numStars = 50;

    for (var i=0; i < numStars; i++) {
        stars.add(new Star((i / numStars) * 5.0, i / numStars, gl, colorUniform, this));
    }
  }
  
  _drawScene() {
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);

    Matrix4.perspective(45, viewportWidth / viewportHeight, 0.1, 100.0, pMatrix);
    
    gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE);
    gl.enable(WebGLRenderingContext.BLEND);
    
//    gl.enable(WebGLRenderingContext.BLEND);
//    gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
//    gl.enable(WebGLRenderingContext.BLEND);

//    glEnable(GL_BLEND);
//    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
//    glEnable(GL_ALPHA_TEST);
//    glAlphaFunc(GL_GREATER, 0);
    
    mvMatrix.identity();
    mvMatrix.translate(new Vector3.fromValues(0.0, 0.0, zoom));
    mvMatrix.rotate(degToRad(tilt), new Vector3.fromValues(1.0, 0.0, 0.0));
    
    var twinkle = document.query("#twinkle").checked;
    stars.forEach((s) {
      s.draw(tilt, spin, twinkle);
      spin += 0.1;
    }); 
  }
  
  
  _animate(int timeNow) {
    if (_lastTime != 0) {
      double elapsed = (timeNow - _lastTime).toDouble();
      stars.forEach((s) {
        s.animate(elapsed);
      });
    }
    _lastTime = timeNow;
  }
  
  _tick(int time) {
    
    _handleKeys();
    
    _drawScene();
    
    // rotate 
    _animate(time);
    
    // keep drawing
    window.webkitRequestAnimationFrame(this._tick);
  }
  
  init() {
    canvas = document.query("#lesson09-canvas");
    gl = getWebGLContext(canvas);
    
    if (canvas is! CanvasElement || gl is! WebGLRenderingContext) {
      throw "failed to load canvas";
    }
    
    viewportWidth = canvas.width;
    viewportHeight = canvas.height;
    
    pMatrix = new Matrix4();
    mvMatrix = new Matrix4();
    mvMatrixStack = new List();
    stars = new List<Star>();
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    
    _initShaders();
    _initBuffers();
    _initTexture();
    _initWorldObjects();
    _initKeyboard();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    
    print("done init()");
    _lastTime = (new Date.now()).value;
    window.webkitRequestAnimationFrame(this._tick);
  }
}
