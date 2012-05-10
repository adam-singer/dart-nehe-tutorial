// Lesson06
class example {

  HTMLCanvasElement canvas;
  WebGLRenderingContext gl;
  String fragmentShaderSource;
  String vertexShaderSource;
  WebGLShader fragmentShader;
  WebGLShader vertexShader;
  WebGLProgram shaderProgram;
  int vertexPositionAttribute;
  int vertexColorAttribute;
  int textureCoordAttribute;
  WebGLUniformLocation pMatrixUniform;
  WebGLUniformLocation mvMatrixUniform;
  WebGLUniformLocation samplerUniform;
  Matrix4 pMatrix;
  Matrix4 mvMatrix;
  List<Matrix4> mvMatrixStack;
  
  WebGLBuffer pyramidVertexPositionBuffer;
  WebGLBuffer pyramidVertexColorBuffer;
  WebGLBuffer cubeVertexPositionBuffer;
  WebGLBuffer cubeVertexColorBuffer;
  WebGLBuffer cubeVertexIndexBuffer;
  int pyramidVertexPositionBufferitemSize;
  int pyramidVertexPositionBuffernumItems;
  int pyramidVertexColorBufferitemSize;
  int pyramidVertexColorBuffernumItems;
  int cubeVertexPositionBufferitemSize;
  int cubeVertexPositionBuffernumItems;
  int cubeVertexColorBufferitemSize;
  int cubeVertexColorBuffernumItems;
  int cubeVertexIndexBufferitemSize;
  int cubeVertexIndexBuffernumItems;
  var rPyramid = 0;
  var rCube = 0;
  Date lastTime;
  
  var xRot = 0;
  var xSpeed = 50;
  var yRot = 0;
  var ySpeed = 50;
  var z = -5.0;
  var filter = 0;
  
  WebGLBuffer cubeVertexTextureCoordBuffer;
  int cubeVertexTextureCoordBufferitemSize;
  int cubeVertexTextureCoordBuffernumItems;
  
  List<WebGLTexture> crateTextures;
  HTMLImageElement crateImage;
  _createShaders() {
  
    fragmentShaderSource = """
    precision mediump float;

    varying vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    }
    """;
    
    vertexShaderSource = """ 
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    varying vec2 vTextureCoord;


    void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
    }
    """;
    
    // Create fragment & vertext shader
    fragmentShader = gl.createShader(WebGLRenderingContext.FRAGMENT_SHADER);
    vertexShader = gl.createShader(WebGLRenderingContext.VERTEX_SHADER);
    
    // source and compile fragment shader
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    // source and compile vertext shader
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    
    // Create shader program, link and use
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    
    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(textureCoordAttribute);

    pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
  }
  
  _createBuffers() {
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
}
  
  _handleLoadedTexture(textures) {
    gl.pixelStorei(WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL, 1);

    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, textures[0]);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, crateImage);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);

    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, textures[1]);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, crateImage);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR);

    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, textures[2]);
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, crateImage);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.LINEAR);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(WebGLRenderingContext.TEXTURE_2D);

    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, null);
}
  
  _setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix.buf);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix.buf);
  }
  
  _degToRad(degrees) {
    return degrees * Math.PI / 180;
  }
  
  _createTextures() {
    //Element crateImage; // = new HTMLImageElement();
    crateTextures=[];
    crateImage = document.getElementById('crate');
    for (var i=0; i < 3; i++) {
      WebGLTexture texture = gl.createTexture();
      //texture.image = crateImage;
      crateTextures.add(texture);
    }
    
    
    //crateImage = document.getElementById("crate");
    _handleLoadedTexture(crateTextures);
    
    //crateImage
//    createImage.on
//    //crateImage.addEventListener("onload", (var event) {
//      print('onload called');
//      _handleLoadedTexture(crateTextures)
//    });
//    crateImage.src = "crate.gif";
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

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, cubeVertexTextureCoordBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);


    gl.activeTexture(WebGLRenderingContext.TEXTURE0);
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, crateTextures[filter]);
    gl.uniform1i(samplerUniform, 0);

    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    _setMatrixUniforms();
    gl.drawElements(WebGLRenderingContext.TRIANGLES, cubeVertexIndexBuffernumItems, WebGLRenderingContext.UNSIGNED_SHORT, 0);
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
  
  
  
  _tick(int t) {
    window.webkitRequestAnimationFrame(_tick);
   
    _drawScene();
    _animate();
  }
  
  _animate() {
    xRot += xSpeed;
    yRot += ySpeed;
  }
  
  Init() {
    mvMatrixStack = [];
    canvas = document.getElementById("canvas");
    gl = canvas.getContext("experimental-webgl");
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    _createShaders();
    _createBuffers();
    _createTextures();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    
    document.addEventListener("keydown", _doKeyDown, true);
    
    _tick(0);
    
  }
  
  int scale=1;
  _doKeyDown(KeyboardEvent event) {
    var c = event.keyCode;
    // http://asquare.net/javascript/tests/KeyCode.html
    if (c == 90) {
      // z
      z -= 0.05*scale;
    }
    if (c == 88) {
        // x
        z += 0.05*scale;
    }
    if (c == 37) {
        // Left cursor key
        ySpeed -= 1*scale;
    }
    if (c == 39) {
        // Right cursor key
        ySpeed += 1*scale;
    }
    if (c == 38) {
        // Up cursor key
        xSpeed -= 1*scale;
    }
    if (c == 40) {
        // Down cursor key
        xSpeed += 1*scale;
    }
    if (c == 70) {
      // f
        filter += 1;
        if (filter == 3) {
            filter = 0;
        }
    
    }
    if (c == 83) {
      // s 
      scale=scale*10;
      if (scale>50) {
        scale=1;
      }
    }
  }
}
