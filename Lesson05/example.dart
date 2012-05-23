// Lesson05
class example {

  CanvasElement canvas;
  WebGLRenderingContext gl;
  String fragmentShaderSource;
  String vertexShaderSource;
  WebGLShader fragmentShader;
  WebGLShader vertexShader;
  WebGLProgram shaderProgram;
  int vertexPositionAttribute;
  int vertexColorAttribute;
  WebGLUniformLocation pMatrixUniform;
  WebGLUniformLocation mvMatrixUniform;
  
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
  
  _createShaders() {
    fragmentShaderSource = """
    precision mediump float;

    varying vec4 vColor;

    void main(void) {
        gl_FragColor = vColor;
    }
    """;
    
    vertexShaderSource = """ 
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    varying vec4 vColor;

    void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vColor = aVertexColor;
    }""";
    
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

    vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);

    pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  }
  
  _createBuffers() {
    pyramidVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    var vertices = [
                    // Front face
                     0.0,  1.0,  0.0,
                    -1.0, -1.0,  1.0,
                     1.0, -1.0,  1.0,

                    // Right face
                     0.0,  1.0,  0.0,
                     1.0, -1.0,  1.0,
                     1.0, -1.0, -1.0,

                    // Back face
                     0.0,  1.0,  0.0,
                     1.0, -1.0, -1.0,
                    -1.0, -1.0, -1.0,

                    // Left face
                     0.0,  1.0,  0.0,
                    -1.0, -1.0, -1.0,
                    -1.0, -1.0,  1.0
                ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(vertices), WebGLRenderingContext.STATIC_DRAW);
    pyramidVertexPositionBufferitemSize = 3;
    pyramidVertexPositionBuffernumItems = 12;
    
    pyramidVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, pyramidVertexColorBuffer);
    var colors = [
        // Front face
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,

        // Right face
        1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 0.0, 1.0,

        // Back face
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,

        // Left face
        1.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 1.0, 0.0, 1.0
    ];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(colors), WebGLRenderingContext.STATIC_DRAW);
    pyramidVertexColorBufferitemSize = 4;
    pyramidVertexColorBuffernumItems = 12;
    
    
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
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
    
    cubeVertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexColorBuffer);
    colors = [
        [1.0, 0.0, 0.0, 1.0], // Front face
        [1.0, 1.0, 0.0, 1.0], // Back face
        [0.0, 1.0, 0.0, 1.0], // Top face
        [1.0, 0.5, 0.5, 1.0], // Bottom face
        [1.0, 0.0, 1.0, 1.0], // Right face
        [0.0, 0.0, 1.0, 1.0]  // Left face
    ];
    var unpackedColors = [];
    for (var i in colors) {
        //var color = colors[i];
        for (var j=0; j < 4; j++) {
            unpackedColors.addAll(i);
         
        }
    }
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.fromList(unpackedColors), WebGLRenderingContext.STATIC_DRAW);
    cubeVertexColorBufferitemSize = 4;
    cubeVertexColorBuffernumItems = 24;
    

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
  
  _tick(int t) {
    window.webkitRequestAnimationFrame(_tick);
   
    _drawScene();
    _animate();
  }
  
  _degToRad(degrees) {
    return degrees * Math.PI / 180;
  }
  
  _setMatrixUniforms() {
    gl.uniformMatrix4fv(pMatrixUniform, false, pMatrix.buf);
    gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix.buf);
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
    
    // pyramid code 
    mvMatrix = Matrix4.translation(new Vector3(-1.5, 0.0, -8.0));
    _mvPushMatrix();
    
    mvMatrix = mvMatrix*Matrix4.rotation(_degToRad(rPyramid), new Vector3(0.0, 1.0, 0.0));
    
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, pyramidVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, pyramidVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, pyramidVertexColorBuffer);
    gl.vertexAttribPointer(vertexColorAttribute, pyramidVertexColorBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    _setMatrixUniforms();
    gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, pyramidVertexPositionBuffernumItems);
    _mvPopMatrix();
    
    
    mvMatrix = mvMatrix * Matrix4.translation(new Vector3(3.0, 0.0, 0.0));
    
    _mvPushMatrix();
    mvMatrix = mvMatrix * Matrix4.rotation(_degToRad(rCube), new Vector3(1.0, 1.0, 1.0));
    
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, cubeVertexPositionBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, cubeVertexColorBuffer);
    gl.vertexAttribPointer(vertexColorAttribute, cubeVertexColorBufferitemSize, WebGLRenderingContext.FLOAT, false, 0, 0);

    
    gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    _setMatrixUniforms();
    gl.drawElements(WebGLRenderingContext.TRIANGLES, cubeVertexIndexBuffernumItems, WebGLRenderingContext.UNSIGNED_SHORT, 0);
    
    _mvPopMatrix();
      
  }
  
  _animate() {
        rPyramid += 90;
        rCube -= 75;
  }
  
  Init() {
    mvMatrixStack = [];
    canvas = document.query("#canvas");
    gl = canvas.getContext("experimental-webgl");
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    _createShaders();
    _createBuffers();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(WebGLRenderingContext.DEPTH_TEST);
    
    _tick(0);
  }
  

}
