import Shader from "../Shader/Shader";

export default class WebGL2Project {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;

    imgres: HTMLImageElement[] = [];
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    vs: Shader;
    fs: Shader;

    static create(gl: WebGL2RenderingContext, vs?: string, fs?: string): WebGL2Project {
        const project = new WebGL2Project(gl);
        project.createProgram();
        // project.bindShader(vs, fs);
        return project;
    }

    createProgram(): WebGLProgram {
        return this.program = this.gl.createProgram();
    }


    bindShader(vs: string, fs: string): void {
        let vertexShader = this.vs = new Shader(vs, "vert");
        let fragmentShader = this.fs = new Shader(fs, "frag");

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
        if (cb) {
            cb(this);
            console.timeEnd(`Program:`);
        }
    }

    draw(shader: shaderSource, cb: <Function>(name: WebGL2Project) => void) {
        console.time(`Program:`)
        this.clearProgram()
        this.createProgram()
        this.bindShader(shader.vs, shader.fs);
        let count = 0;
        const comp = () => {
            count++;
            if (count == shader.img.length) this.drawCall(cb);
        }
        if (shader.img && shader.img.length > 0) {
            this.imgres = shader.img.map(url => {
                const img = new Image()
                img.src = url;
                img.onload = comp
                return img;
            })
        } else {
            this.drawCall(cb);
        }
    }

    clearProgram() {
        let gl = this.gl;
        this.program ? gl.deleteProgram(this.program) : void 0;
        this.vs ? this.vs.destroy(gl) : void 0;
        this.fs ? this.fs.destroy(gl) : void 0;
        this.vs = this.fs = this.program = null;
    }



    bindVertices(v: Float32Array) {
        let gl = this.gl;
        const VBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
        return VBO;
    }

    getImage(index: number) {
        return this.imgres[index];
    }
}


export interface shaderSource {
    fs: string,
    vs: string,
    img?: string[],
    uniform?: any
}