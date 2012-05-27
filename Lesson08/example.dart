
class example {

  CanvasElement canvas;
  
  WebGLRenderingContext gl;
  int viewportWidth;
  int viewportHeight;
  
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
  WebGLUniformLocation alphaUniform;
  
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
  
  // utils
  _degToRad(degrees) {
    return degrees * Math.PI / 180;
  }
  
  _mvPushMatrix() {
    //Matrix4 i = new Matrix4.identity();
    //Matrix4 c = Matrix.Multiply(mvMatrix, i);
    //Matrix c = mvMatrix * Matrix.identity();
    Matrix4 c = mvMatrix.clone();
    mvMatrixStack.add(c);
  }
  
  _mvPopMatrix() {
    if (mvMatrixStack.length != 0) {
      mvMatrix = mvMatrixStack.removeLast();
    }
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
      z -= 0.05;
    }
    if (currentlyPressedKeys.containsKey(34)) {
        // Page Down
        z += 0.05;
    }
    if (currentlyPressedKeys.containsKey(37)) {
        // Left cursor key
        ySpeed -= 1;
    }
    if (currentlyPressedKeys.containsKey(39)) {
        // Right cursor key
        ySpeed += 1;
    }
    if (currentlyPressedKeys.containsKey(38)) {
        // Up cursor key
        xSpeed -= 1;
    }
    if (currentlyPressedKeys.containsKey(40)) {
        // Down cursor key
        xSpeed += 1;
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
    alphaUniform = gl.getUniformLocation(shaderProgram, "uAlpha");
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
    ImageElement crateTextureImage = new ImageElement();
    crateTextureImage.on.load.add((e) {
      gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);

      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
      gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, crateTextureImage);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
      gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(WebGLRenderingContext.TEXTURE_2D);

      gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
    });
    crateTextureImage.src = 'glass.gif';
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
//    print("enter draw scene");
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT | WebGLRenderingContext.DEPTH_BUFFER_BIT);

    // field of view is 45°, width-to-height ratio, hide things closer than 0.1 or further than 100
    Matrix4.perspective(45, viewportWidth / viewportHeight, 0.1, 100.0, pMatrix);
    
    // draw triangle
    mvMatrix.identity();

    mvMatrix.translate(new Vector3.fromList([0.0, 0.0, z]));

    mvMatrix.rotate(_degToRad(xRot), new Vector3.fromList([1, 0, 0]));
    mvMatrix.rotate(_degToRad(yRot), new Vector3.fromList([0, 1, 0]));
    
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, cubeVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, cubeVertexNormalBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, cubeVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTexture);
    gl.uniform1i(samplerUniform, 0);
    
    var blending = document.query("#blending").checked;
    if (blending) {
        gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE);
        gl.enable(WebGLRenderingContext.BLEND);
        gl.disable(WebGLRenderingContext.DEPTH_TEST);
        gl.uniform1f(alphaUniform, Math.parseDouble(document.query("#alpha").value));
    } else {
        gl.disable(WebGLRenderingContext.BLEND);
        gl.enable(WebGLRenderingContext.DEPTH_TEST);
    }
    
    var lighting = document.query("#lighting").checked;

    int li = (lighting ? 1:0);
    gl.uniform1i(useLightingUniform, li);
    if (lighting) {

      
        gl.uniform3f(
            ambientColorUniform,
            Math.parseDouble(document.query("#ambientR").value),
            Math.parseDouble(document.query("#ambientG").value),
            Math.parseDouble(document.query("#ambientB").value)
        );

        Vector3 lightingDirection = new Vector3.fromValues(
            Math.parseDouble(document.query("#lightDirectionX").value),
            Math.parseDouble(document.query("#lightDirectionY").value),
            Math.parseDouble(document.query("#lightDirectionZ").value)
        );

        Vector3 adjustedLD = new Vector3.fromValues(0, 0, 0);
        lightingDirection.normalize(adjustedLD);
        adjustedLD.scale(-1);

        gl.uniform3fv(lightingDirectionUniform, adjustedLD.array);

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
    
  _tick(int t) {
    window.requestAnimationFrame(_tick);
    _handleKeys();
    _drawScene();
    _animate();
  }
  
  init() {
    canvas = document.query("#lesson08-canvas");
    gl = getWebGLContext(canvas);
    
    if (canvas is! CanvasElement || gl is! WebGLRenderingContext) {
      throw "failed to load canvas";
    }
    
    viewportWidth = canvas.width;
    viewportHeight = canvas.height;
    
    pMatrix = new Matrix4();
    mvMatrix = new Matrix4();
    mvMatrixStack = new List();
    
    gl.viewport(0, 0, viewportWidth, viewportHeight);
    
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
