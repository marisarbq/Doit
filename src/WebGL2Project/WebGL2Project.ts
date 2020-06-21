import Shader from "../Shader/Shader";

export default class WebGL2Project {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;


    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    static create(gl: WebGL2RenderingContext, vs: string, fs: string): WebGL2Project {
        const project = new WebGL2Project(gl);
        project.createProgram();
        project.bindShader(vs, fs);
        return project;
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


    drawCall(cb: <Function>(name: WebGL2Project) => void) {
        if (cb) cb(this);
    }
}