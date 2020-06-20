import Application from "./Application";
import Shader from "../Shader/Shader";

export default class WebGL2Application extends Application {

    public gl: WebGL2RenderingContext;
    public canvas: HTMLCanvasElement;

    public program: WebGLProgram;

    static createApplication(canvas: HTMLCanvasElement): WebGL2Application {
        let app = new WebGL2Application("webgl2");
        app.canvas = canvas;
        app.gl = app.canvas.getContext("webgl2");
        if (!app.gl) {
            alert("浏览器不支持webgl2,启动失败")
            return;
        }
        return app;
    }

    createProgram(): WebGLProgram {
        return this.program = this.gl.createProgram();
    }


    bindShader(vs: string, fs: string): void {
        let vertexShader = new Shader(vs, "vert");
        let fragmentShader = new Shader(fs, "frag");

        vertexShader.complete(this.gl);
        fragmentShader.complete(this.gl);

        if (!vertexShader || !fragmentShader) return;

        this.gl.attachShader(this.program, vertexShader.shader);
        this.gl.attachShader(this.program, fragmentShader.shader);

        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            var info = this.gl.getProgramInfoLog(this.program);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
    }

    clearScreen(indata?: number[]) {
        let color = indata || [0.0, 0.5, 0.0, 1.0]
        let gl = this.gl;
        gl.clearColor(color[0], color[1], color[2], color[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }


    testDraw() {
        let gl = this.gl;
        let vertices = [
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.0, 0.5, 0.0
        ];
        //glGenBuffers
        let VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        let v = new Float32Array(vertices);
        gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);


        var aPos = gl.getAttribLocation(this.program, 'aPos');
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 3 * v.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(aPos);
        // gl.enableVertexAttribArray(0);
        // gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3*4, 0);
        // gl.bindAttribLocation(program,1,"v3Position");
        gl.useProgram(this.program);
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }


}  