import WebGL2Project from "../WebGL2Project/WebGL2Project";

export default class Shader {
    isError: boolean = false;

    vs: string;
    fs: string;

    gl: WebGL2RenderingContext;
    program: WebGLProgram;

    vshader: WebGLShader;
    fshader: WebGLShader;

    constructor(vs: string, fs: string, gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.fs = fs;
        this.vs = vs;
        return this;
    }

    create() {
        this.createProgram();
        let gl = this.gl;
        this.vshader = gl.createShader(gl.VERTEX_SHADER);
        this.fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.vshader, this.vs.trim());
        gl.shaderSource(this.fshader, this.fs.trim());
    }

    createProgram(): WebGLProgram {
        this.program = this.gl.createProgram()
        return this.program;
    }

    attach() {
        this.gl.attachShader(this.program, this.vshader);
        this.gl.attachShader(this.program, this.fshader);
    }

    complete() {
        let gl = this.gl;
        this.create();
        gl.compileShader(this.vshader);
        gl.compileShader(this.fshader);
        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(this.vshader);
            console.error(info, this);
            this.isError = true;
            throw info;
        }
        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            var info = gl.getShaderInfoLog(this.fshader);
            console.error(info, this);
            this.isError = true;
            throw info;
        }
        this.attach();
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            var info = this.gl.getProgramInfoLog(this.program);
            throw 'Could not compile WebGL program. \n\n' + info;
        }
        return this;
    }

    use() {
        this.gl.useProgram(this.program);
    }

    destroy() {
        this.gl.detachShader(this.program, this.vshader);
        this.gl.detachShader(this.program, this.fshader);
        this.gl.deleteShader(this.vshader);
        this.gl.deleteShader(this.fshader);
        this.gl.deleteProgram(this.program)
    }
}