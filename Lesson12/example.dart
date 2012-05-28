class Example {
  
  CanvasElement canvas;
  
  WebGLRenderingContext gl;
  int viewportWidth;
  int viewportHeight;
  
  WebGLProgram shaderProgram;
  int vertexPositionAttribute;
  int textureCoordAttribute;
  int vertexNormalAttribute;
  
  WebGLUniformLocation pMatrixUniform;
  WebGLUniformLocation mvMatrixUniform;
  WebGLUniformLocation nMatrixUniform;
  WebGLUniformLocation samplerUniform;
  WebGLUniformLocation useLightingUniform;
  WebGLUniformLocation ambientColorUniform;
  WebGLUniformLocation pointLightingLocationUniform;
  WebGLUniformLocation pointLightingColorUniform;
  
  WebGLTexture moonTexture;
  WebGLTexture crateTexture;
  
  WebGLBuffer cubeVertexPositionBuffer;
  WebGLBuffer cubeVertexNormalBuffer;
  WebGLBuffer cubeVertexTextureCoordBuffer;
  WebGLBuffer cubeVertexIndexBuffer;

  WebGLBuffer moonVertexPositionBuffer;
  WebGLBuffer moonVertexNormalBuffer;
  WebGLBuffer moonVertexTextureCoordBuffer;
  WebGLBuffer moonVertexIndexBuffer;
  int cubeVertexPositionBufferitemSize,
  cubeVertexPositionBuffernumItems,
  cubeVertexNormalBufferitemSize,
  cubeVertexNormalBuffernumItems,
  cubeVertexTextureCoordBufferitemSize,
  cubeVertexTextureCoordBuffernumItems,
  cubeVertexIndexBufferitemSize,
  cubeVertexIndexBuffernumItems,
  moonVertexNormalBufferitemSize,
  moonVertexNormalBuffernumItems,
  moonVertexTextureCoordBufferitemSize,
  moonVertexTextureCoordBuffernumItems,
  moonVertexPositionBufferitemSize,
  moonVertexPositionBuffernumItems,
  moonVertexIndexBufferitemSize,
  moonVertexIndexBuffernumItems;
  
  num moonAngle = 180.0;
  num cubeAngle = 0.0;
  num lastTime = 0;
  
  Matrix4 pMatrix;
  Matrix4 mvMatrix;
  List<Matrix4> mvMatrixStack;
  
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
    
    vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    
    pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
    pointLightingColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingColor");
  }
  
  _initBuffers() {
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexPositionBuffer);
    var vertices = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
    ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertices), WebGLRenderingContext.STATIC_DRAW);
    cubeVertexPositionBufferitemSize = 3;
    cubeVertexPositionBuffernumItems = 24;

    cubeVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexNormalBuffer);
    var vertexNormals = [
        // Front face
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,
         0.0,  0.0,  1.0,

        // Back face
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,
         0.0,  0.0, -1.0,

        // Top face
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  1.0,  0.0,

        // Bottom face
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,
         0.0, -1.0,  0.0,

        // Right face
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,
         1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
    ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertexNormals), WebGLRenderingContext.STATIC_DRAW);
    cubeVertexNormalBufferitemSize = 3;
    cubeVertexNormalBuffernumItems = 24;

    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(textureCoords), WebGLRenderingContext.STATIC_DRAW);
    cubeVertexTextureCoordBufferitemSize = 2;
    cubeVertexTextureCoordBuffernumItems = 24;

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, new Uint16Array.fromList(cubeVertexIndices), WebGLRenderingContext.STATIC_DRAW);
    cubeVertexIndexBufferitemSize = 1;
    cubeVertexIndexBuffernumItems = 36;


    var latitudeBands = 30;
    var longitudeBands = 30;
    var radius = 2;

    var vertexPositionData = [];
    var normalData = [];
    var textureCoordData = [];
    for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);

            normalData.add(x);
            normalData.add(y);
            normalData.add(z);
            textureCoordData.add(u);
            textureCoordData.add(v);
            vertexPositionData.add(radius * x);
            vertexPositionData.add(radius * y);
            vertexPositionData.add(radius * z);
        }
    }

    var indexData = [];
    for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
        for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.add(first);
            indexData.add(second);
            indexData.add(first + 1);

            indexData.add(second);
            indexData.add(second + 1);
            indexData.add(first + 1);
        }
    }

    moonVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, moonVertexNormalBuffer);
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(normalData), WebGLRenderingContext.STATIC_DRAW);
    moonVertexNormalBufferitemSize = 3;
    moonVertexNormalBuffernumItems = (normalData.length / 3).toInt();

    moonVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(textureCoordData), WebGLRenderingContext.STATIC_DRAW);
    moonVertexTextureCoordBufferitemSize = 2;
    moonVertexTextureCoordBuffernumItems = (textureCoordData.length / 2).toInt();

    moonVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, moonVertexPositionBuffer);
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertexPositionData), WebGLRenderingContext.STATIC_DRAW);
    moonVertexPositionBufferitemSize = 3;
    moonVertexPositionBuffernumItems = (vertexPositionData.length / 3).toInt();

    moonVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
    gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, new Uint16Array.fromList(indexData), WebGLRenderingContext.STREAM_DRAW);
    moonVertexIndexBufferitemSize = 1;
    moonVertexIndexBuffernumItems = indexData.length;
  }
  
  _initTexture() {
    
    moonTexture = gl.createTexture();
    ImageElement moonTextureImage = new ImageElement();
    moonTextureImage.on.load.add((e) {
      gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, moonTexture);
      gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, moonTextureImage);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR_MIPMAP_NEAREST);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, moonTexture);
    });
    
    moonTextureImage.src = 'moon.gif';  
    
    crateTexture = gl.createTexture();
    ImageElement crateTextureImage = new ImageElement();
    crateTextureImage.on.load.add((e) {
      gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
      gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, crateTextureImage);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR_MIPMAP_NEAREST);
      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
    });
    
    crateTextureImage.src = 'crate.gif';  
    
  }
  
  _setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix.array);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix.array);
    
    Matrix3 normalMatrix = new Matrix3();
    mvMatrix.toInverseMat3(normalMatrix);
    if (normalMatrix == null) {
      normalMatrix = new Matrix3();
    }

    normalMatrix.transpose();
    gl.uniformMatrix3fv(nMatrixUniform, false, normalMatrix.array);
  }
  
  _drawScene() {
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);
    
    Matrix4.perspective(45, viewportWidth / viewportHeight, 0.1, 100.0, pMatrix);
   
    var lighting = document.query("#lighting").checked;
    gl.uniform1i(useLightingUniform, (lighting ? 1:0)); 
    if (lighting) {
      gl.uniform3f(
        ambientColorUniform,
        Math.parseDouble(document.query("#ambientR").value),
        Math.parseDouble(document.query("#ambientG").value),
        Math.parseDouble(document.query("#ambientB").value)
      );
  
      gl.uniform3f(
          pointLightingLocationUniform,
          Math.parseDouble(document.query("#lightPositionX").value),
          Math.parseDouble(document.query("#lightPositionY").value),
          Math.parseDouble(document.query("#lightPositionZ").value)
      );
  
      gl.uniform3f(
          pointLightingColorUniform,
          Math.parseDouble(document.query("#pointR").value),
          Math.parseDouble(document.query("#pointG").value),
          Math.parseDouble(document.query("#pointB").value)
      );
    }
    
    mvMatrix.identity();
    mvMatrix.translate(new Vector3.fromList([0.0, 0.0, -20.0]));
    mvPushMatrix();
    mvMatrix.rotate(degToRad(moonAngle), new Vector3.fromValues(0.0, 1.0, 0.0));
    mvMatrix.translate(new Vector3.fromList([5.0, 0.0, 0.0]));
    
    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, moonTexture);
    gl.uniform1i(samplerUniform, 0);
    
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, moonVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, moonVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, moonVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, moonVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, moonVertexNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, moonVertexNormalBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, moonVertexIndexBuffer);
    _setMatrixUniforms();
    gl.drawElements(WebGLRenderingContext.TRIANGLES, moonVertexIndexBuffernumItems, WebGLRenderingContext.UNSIGNED_SHORT, 0);
    mvPopMatrix();
      
    mvPushMatrix();
    mvMatrix.rotate(degToRad(cubeAngle), new Vector3.fromValues(0.0, 1.0, 0.0));
    mvMatrix.translate(new Vector3.fromList([5.0, 0.0, 0.0]));
    
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, cubeVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, cubeVertexNormalBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, cubeVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
    gl.uniform1i(samplerUniform, 0);

    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    _setMatrixUniforms();
    gl.drawElements(WebGLRenderingContext.TRIANGLES, cubeVertexIndexBuffernumItems, WebGLRenderingContext.UNSIGNED_SHORT, 0);
    mvPopMatrix();
  }
  
  _animate(int timeNow) {
    if (lastTime != 0) {
      double elapsed = (timeNow - lastTime).toDouble();
      moonAngle += 0.05 * elapsed;
      cubeAngle += 0.05 * elapsed;
    }
    lastTime = timeNow;
  }
  
  _tick(int time) {
    
    _drawScene();
    
    _animate(time);
    
    // keep drawing
    window.webkitRequestAnimationFrame(this._tick);
    
  }
  
  init() {
    canvas = document.query("#lesson12-canvas");
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
    _initBuffers();
    _initTexture();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    
    print("done init()");
    window.webkitRequestAnimationFrame(this._tick);
  }
}
