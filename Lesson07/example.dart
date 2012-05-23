class example {

  CanvasElement canvas;
  
  WebGLRenderingContext gl;
  WebGLProgram shaderProgram;
  
  int vertexPositionAttribute;
  int vertexNormalAttribute;
  int textureCoordAttribute;
  
  WebGLUniformLocation pMatrixUniform;
  WebGLUniformLocation mvMatrixUniform;
  WebGLUniformLocation nMatrixUniform;
  WebGLUniformLocation samplerUniform;
  WebGLUniformLocation useLightingUniform;
  WebGLUniformLocation ambientColorUniform;
  WebGLUniformLocation lightingDirectionUniform;
  WebGLUniformLocation directionalColorUniform;
  
  WebGLBuffer cubeVertexPositionBuffer;
  int cubeVertexPositionBufferitemSize;
  int cubeVertexPositionBuffernumItems;
  
  
  WebGLBuffer cubeVertexNormalBuffer;
  int cubeVertexNormalBufferitemSize;
  int cubeVertexNormalBuffernumItems;
  
  WebGLBuffer cubeVertexTextureCoordBuffer;
  int cubeVertexTextureCoordBufferitemSize;
  int cubeVertexTextureCoordBuffernumItems;
  
  WebGLBuffer cubeVertexIndexBuffer;
  int cubeVertexIndexBufferitemSize;
  int cubeVertexIndexBuffernumItems;
  
  WebGLTexture crateTexture;
  
  Map currentlyPressedKeys;
  
  int xRot = 0;
  int xSpeed = 3;
  int yRot = 0;
  int ySpeed = -3;
  double z = -5.0;
  
  Matrix4 pMatrix;
  Matrix4 mvMatrix;
  List<Matrix4> mvMatrixStack;
  
  _getShader(g, id) {
    return createShaderFromScriptElement(g, id);
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

    vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);

    textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(textureCoordAttribute);

    pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
    samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
    ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
    lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightingDirection");
    directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
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
        -1.0,  1.0, -1.0,
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
        -1.0,  0.0,  0.0
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
        0.0, 1.0
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
  }
  
  _initTexture() {
    crateTexture = gl.createTexture();
    //ImageElement crateTextureImage = new Element.html("<img style='display:none' />");
    ImageElement crateTextureImage = new Element.html("<img />");
    
    crateTextureImage.on.load.add((e) {
      gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);

      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
      gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, crateTextureImage);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(WebGLRenderingContext.TEXTURE_2D);

      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
    });
    crateTextureImage.src = 'crate.gif';
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
  
  _degToRad(degrees) {
    return degrees * Math.PI / 180;
  }
  
  _setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix.buf);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix.buf);
    
    var normalMatrix = Matrix4.identity();
    // TODO: create the inverse and transpose on different matrix sizes
    //mat4.toInverseMat3(mvMatrix, normalMatrix);
    //mat3.transpose(normalMatrix);
    //gl.uniformMatrix3fv(nMatrixUniform, false, normalMatrix.buf);
  }
  
  _mvPushMatrix() {
    Matrix4 c = mvMatrix * Matrix4.identity();
    mvMatrixStack.add(c);
  }
  
  _mvPopMatrix() {
    if (mvMatrixStack.length != 0) {
      mvMatrix = mvMatrixStack.removeLast();
    }
  }
  
  _drawScene() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);

    pMatrix = Matrix4.perspective(45.0, canvas.width/canvas.height, 0.1, 100.0);

    mvMatrix = Matrix4.translation(new Vector3(0.0, 0.0, z));

    mvMatrix = mvMatrix*Matrix4.rotation(_degToRad(xRot), new Vector3(1.0, 0.0, 0.0));
    mvMatrix = mvMatrix*Matrix4.rotation(_degToRad(yRot), new Vector3(0.0, 1.0, 0.0));

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, cubeVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, cubeVertexNormalBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, cubeVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
    gl.uniform1i(samplerUniform, 0);
    var lighting = document.query("#lighting").checked;
    gl.uniform1i(useLightingUniform, lighting);
    if (lighting) {
        gl.uniform3f(
            ambientColorUniform,
            Math.parseDouble(document.query("#ambientR").value),
            Math.parseDouble(document.query("#ambientG").value),
            Math.parseDouble(document.query("#ambientB").value)
        );

        var lightingDirection = new Vector3(
            Math.parseDouble(document.query("#lightDirectionX").value),
            Math.parseDouble(document.query("#lightDirectionY").value),
            Math.parseDouble(document.query("#lightDirectionZ").value)
        );
//        var adjustedLD = vec3.create();
//        vec3.normalize(lightingDirection, adjustedLD);
//        vec3.scale(adjustedLD, -1);
        Vector3 adjustedLD = new Vector3(1.0, 0.0, 0.0);
        adjustedLD = lightingDirection.normalize();
        Float32Array fa = new Float32Array.fromList([-adjustedLD.x, -adjustedLD.y, -adjustedLD.z]);
        gl.uniform3fv(lightingDirectionUniform, fa);

        gl.uniform3f(
            directionalColorUniform,
            Math.parseDouble(document.query("#directionalR").value),
            Math.parseDouble(document.query("#directionalG").value),
            Math.parseDouble(document.query("#directionalB").value)
        );
    }

    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    _setMatrixUniforms();
    gl.drawElements(WebGLRenderingContext.TRIANGLES, cubeVertexIndexBuffernumItems, WebGLRenderingContext.UNSIGNED_SHORT, 0);
  }
  
  _animate() {
    xRot += xSpeed;
    yRot += ySpeed;
  }
  
  _handleKeys() {
    if (currentlyPressedKeys[33]) {
      // Page Up
      z -= 0.05;
    }
    if (currentlyPressedKeys[34]) {
        // Page Down
        z += 0.05;
    }
    if (currentlyPressedKeys[37]) {
        // Left cursor key
        ySpeed -= 1;
    }
    if (currentlyPressedKeys[39]) {
        // Right cursor key
        ySpeed += 1;
    }
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        xSpeed -= 1;
    }
    if (currentlyPressedKeys[40]) {
        // Down cursor key
        xSpeed += 1;
    }
  }
  
  _tick(int t) {
    window.requestAnimationFrame(_tick);
    //print("new frame");
    _handleKeys();
    _drawScene();
    _animate();
  }
  
  init() {
    canvas = document.query("#canvas");
    gl = getWebGLContext(canvas);
    
    if (canvas is! CanvasElement || gl is! WebGLRenderingContext) {
      show("failed to load canvas");
      return;
    }
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    _initShaders();
    _initBuffers();
    _initTexture();
    _initKeyboard();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    
    print("done init()");
    

    
    _tick(0);
  }
}
