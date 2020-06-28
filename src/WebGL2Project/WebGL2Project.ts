import Shader from "../Shader/Shader";

export default class WebGL2Project {
    gl: WebGL2RenderingContext;


    imgres: HTMLImageElement[] = [];
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;

        this.onRender();
    }

    //其实不同的Project还可以共用一些ShaderProgram。
    shader: Shader[] = []

    get program(): WebGLProgram {
        return this.shader[0].program;
    }

    //公共域
    share: any = {}

    static create(gl: WebGL2RenderingContext, vs?: string, fs?: string): WebGL2Project {
        const project = new WebGL2Project(gl);
        // project.createShader(vs, fs);
        return project;
    }

    createShader(vs: string, fs: string): void {
        let shader = new Shader(vs, fs, this.gl);
        this.shader.push(shader);
        shader.complete();
        if (!shader) return;
    }

    clearScreen(indata?: number[]) {
        let color = indata || [0.0, 0.5, 0.0, 1.0]
        let gl = this.gl;
        gl.clearColor(color[0], color[1], color[2], color[3]);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    needUpdate: Boolean = false;

    attr(name: string, size: number, stride: number): number {
        let gl = this.gl;
        var a = gl.getAttribLocation(this.program, 'aPos');
        gl.vertexAttribPointer(a, size, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(a);
        return a;
    }

    drawCall(cb: <Function>(name: WebGL2Project) => void) {
        if (cb) {
            console.timeEnd(`bindShader:`)
            cb(this);
            console.timeEnd(`Program:`);
            console.log("yes! Marisa Draw it!")
            this.needUpdate = true;
        }
    }

    updateFunction: Function;

    onUpdate() {
        if (!this.updateFunction) this.needUpdate = false;
        if (!this.needUpdate) return;
        this.updateFunction(this);
    }

    onRender() {
        this.onUpdate();
        // console.log('render');
        requestAnimationFrame(this.onRender.bind(this))
    }

    draw(marisa: IMarisa) {
        console.time(`Program:`)
        console.time(`bindShader:`)
        this.clearProgram()
        this.createShader(marisa.vs, marisa.fs);
        let count = 0;
        this.updateFunction = marisa.update;
        const comp = () => {
            count++;
            if (count == marisa.img.length) this.drawCall(marisa.draw);
        }
        if (marisa.img && marisa.img.length > 0) {
            this.imgres = marisa.img.map(url => {
                const img = new Image()
                img.src = url;
                img.onload = comp
                return img;
            })
        } else {
            this.drawCall(marisa.draw);
        }
    }

    clear() {
        let gl = this.gl;
        gl.clearColor(0.2, 0.3, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    clearProgram() {
        this.needUpdate = false;
        this.shader.map(shader => {
            shader.destroy();
        })
        this.share = {}
        this.shader = [];
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