class Example {
 
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
  
  WebGLTexture mudTexture;
  
  WebGLBuffer worldVertexPositionBuffer;
  int worldVertexPositionBufferitemSize; 
  int worldVertexPositionBuffernumItems;
  
  WebGLBuffer worldVertexTextureCoordBuffer;
  int worldVertexTextureCoordBufferitemSize;
  int worldVertexTextureCoordBuffernumItems;
  
  Map currentlyPressedKeys;
  
  Matrix4 pMatrix;
  Matrix4 mvMatrix;
  List<Matrix4> mvMatrixStack;
  
  int _lastTime;
  
  num pitch = 0.0;
  num pitchRate = 0.0;

  num yaw = 0.0;
  num yawRate = 0.0;

  num xPos = 0.0;
  num yPos = 0.4;
  num zPos = 0.0;

  num speed = 0.0;
  num joggingAngle = 0.0;
  
  _getShader(g, id) {
    return createShaderFromScriptElement(g, id);
  }
  
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
  
  _initKeyboard() {
    currentlyPressedKeys = new Map();
    
    currentlyPressedKeys[33] = false;      
    currentlyPressedKeys[34] = false;
    currentlyPressedKeys[37] = false;
    currentlyPressedKeys[65] = false;
    currentlyPressedKeys[39] = false;
    currentlyPressedKeys[68] = false;
    currentlyPressedKeys[38] = false;
    currentlyPressedKeys[87] = false; 
    currentlyPressedKeys[40] = false;
    currentlyPressedKeys[83] = false;
    
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
    if (currentlyPressedKeys[33]) {
      // Page Up
      pitchRate = 0.1;
    } else if (currentlyPressedKeys[34]) {
      // Page Down
      pitchRate = -0.1;
    } else {
        pitchRate = 0.0;
    }
  
    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
        // Left cursor key or A
        yawRate = 0.1;
    } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
        // Right cursor key or D
        yawRate = -0.1;
    } else {
        yawRate = 0.0;
    }
  
    if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
        // Up cursor key or W
        speed = 0.003;
    } else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
        // Down cursor key
        speed = -0.003;
    } else {
        speed = 0.0;
    }
    
  }
  
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
  }
  
  _initTexture() {
    mudTexture = gl.createTexture();
    ImageElement mudTextureImage = new ImageElement();
    mudTextureImage.on.load.add((e) {
      gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, mudTexture);
      gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, mudTextureImage);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, mudTexture);
    });
    //mudTextureImage.src = 'mud.gif';
    mudTextureImage.src = 'photo.gif';
  }
  
  _loadWorld() {
    XMLHttpRequest request = new XMLHttpRequest.get("world.txt", (XMLHttpRequest req) {
      print(req.responseText);
      var lines = req.responseText.split('\n');
      var vertexCount = 0;
      var vertexPositions = [];
      var vertexTextureCoords = [];
      lines.forEach((String i) {
        var vals = i.replaceFirst("^\s+", "").split("\s+");
        if (vals.length == 1) {
          vals = vals[0].split(' ');
          var tvals = [];
          vals.forEach((t_val) {
            if (!t_val.isEmpty()) {
              tvals.add(t_val);
            }
          });
          
          vals = tvals;
        }
        
        print("vals = ${vals}");
        print("vals.length = ${vals.length}");
        if (vals.length == 5 && vals[0] != "//") { //(vals[0] != "/" && vals[1] != "/" || vals[0] != "//")) {
          // It is a line describing a vertex; get X, Y and Z first
          vertexPositions.add(Math.parseDouble(vals[0]));
          vertexPositions.add(Math.parseDouble(vals[1]));
          vertexPositions.add(Math.parseDouble(vals[2]));

          // And then the texture coords
          vertexTextureCoords.add(Math.parseDouble(vals[3]));
          vertexTextureCoords.add(Math.parseDouble(vals[4]));

          vertexCount += 1;
        }
      });
      
      worldVertexPositionBuffer = gl.createBuffer();
      gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, worldVertexPositionBuffer);
      gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertexPositions), WebGLRenderingContext.STATIC_DRAW);
      worldVertexPositionBufferitemSize = 3;
      worldVertexPositionBuffernumItems = vertexCount;

      worldVertexTextureCoordBuffer = gl.createBuffer();
      gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, worldVertexTextureCoordBuffer);
      gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertexTextureCoords), WebGLRenderingContext.STATIC_DRAW);
      worldVertexTextureCoordBufferitemSize = 2;
      worldVertexTextureCoordBuffernumItems = vertexCount;

      document.query("#loadingtext").innerHTML = "";
      
    });
    
  }
  
  setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix.array);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix.array); 
  }
  
  _drawScene() {
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);

    if (worldVertexTextureCoordBuffer == null || worldVertexPositionBuffer == null) {
      return;
    }
    
    Matrix4.perspective(45, viewportWidth / viewportHeight, 0.1, 100.0, pMatrix);
    mvMatrix.identity();
    mvMatrix.rotate(degToRad(-pitch), new Vector3.fromValues(1.0, 0.0, 0.0));
    mvMatrix.rotate(degToRad(-yaw), new Vector3.fromValues(0.0, 1.0, 0.0));
    mvMatrix.translate(new Vector3.fromValues(-xPos, -yPos, -zPos));
    
    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, mudTexture);
    gl.uniform1i(samplerUniform, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, worldVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, worldVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, worldVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, worldVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    setMatrixUniforms();
    gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, worldVertexPositionBuffernumItems);
  }
  
  _animate(timeNow) {
    if (_lastTime != 0) {
      double elapsed = (timeNow - _lastTime).toDouble();
 
      if (speed != 0.0) {
        
        xPos -= Math.sin(degToRad(yaw)) * speed * elapsed;
        zPos -= Math.cos(degToRad(yaw)) * speed * elapsed;

        joggingAngle += elapsed * 0.6; // 0.6 "fiddle factor" - makes it feel more realistic :-)
        yPos = Math.sin(degToRad(joggingAngle)) / 20 + 0.4;
    }

    yaw += yawRate * elapsed;
    pitch += pitchRate * elapsed;
    
    }
    _lastTime = timeNow;
  }
  
  _tick(int time) {
    
    _handleKeys();
//    
//    print("pitchRate = ${pitchRate}");
//    print("yawRate = ${yawRate}");
//    print("speed = ${speed}");
    
    _drawScene();
    
    // rotate 
    _animate(time);
    
    // keep drawing
    window.webkitRequestAnimationFrame(this._tick);
  }
  
  init() {
    canvas = document.query("#lesson10-canvas");
    gl = getWebGLContext(canvas);
    
    if (canvas is! CanvasElement || gl is! WebGLRenderingContext) {
      throw "failed to load canvas";
    }
    
    viewportWidth = canvas.width;
    viewportHeight = canvas.height;
    
    pMatrix = new Matrix4();
    mvMatrix = new Matrix4();
    mvMatrixStack = new List();
    
    _initShaders();
    _initTexture();
    _loadWorld();
    _initKeyboard();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    
    print("done init()");
    _lastTime = (new Date.now()).value;
    window.webkitRequestAnimationFrame(this._tick);
  }
}
