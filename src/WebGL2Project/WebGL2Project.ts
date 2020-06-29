import Shader from "../Shader/Shader";
import KeyBoard from "../Input/KeyBoard";
import { MoveControl } from "../Control/MoveControl";
import { FPSControl } from "../Control/FPSControl";

export default class WebGL2Project {
    gl: WebGL2RenderingContext;


    imgres: HTMLImageElement[] = [];
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;

        this.onRender();
    }

    //其实不同的Project还可以共用一些ShaderProgram。
    shader: { [name: string]: Shader } = {}

    get program(): WebGLProgram {
        return this._shader.program;
    }

    get _shader(): Shader {
        let shader;
        if (this.shader["default"]) {
            shader = this.shader["default"];
        } else {
            shader = this.shader[Object.keys(this.shader)[0]];
        }
        return shader
    }

    //公共域
    share: any = {}

    static create(gl: WebGL2RenderingContext, vs?: string, fs?: string): WebGL2Project {
        const project = new WebGL2Project(gl);
        // project.createShader(vs, fs);
        return project;
    }

    createShader(name: string, vs: string, fs: string): void {
        let shader = new Shader(vs, fs, this.gl);
        this.shader[name] = shader;
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

    attr(name: string, size: number, stride: number, offset?: number): number {
        let gl = this.gl;
        offset = offset || 0;
        var a = gl.getAttribLocation(this.program, name);
        gl.vertexAttribPointer(a, size, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(a);
        return a;
    }

    drawCall(cb: <Function>(name: WebGL2Project) => void) {
        if (cb) {
            console.timeEnd(`bindShader:`)
            cb.bind(this)();
            console.timeEnd(`Program:`);
            console.log("yes! Marisa Draw it!")
            this.needUpdate = true;
        }
    }

    updateFunction: Function;

    onUpdate() {
        if (!this.updateFunction) this.needUpdate = false;
        if (!this.needUpdate) return;
        this.updateFunction();
    }

    onRender() {
        this.onUpdate();
        // console.log('render');
        if (this.controlPlugin) this.controlPlugin.onUpdate()
        requestAnimationFrame(this.onRender.bind(this))
    }

    draw(marisa: IMarisa) {
        console.time(`Program:`)
        console.time(`bindShader:`)
        this.clearProgram()
        if (marisa.shader) {
            for (let name in marisa.shader) {
                let shader = marisa.shader[name];
                this.createShader(name, shader.vs, shader.fs);
            }
        }
        let count = 0;
        marisa.update ? this.updateFunction = marisa.update.bind(this) : void 0;
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

    clear(r?: number, g?: number, b?: number) {
        let gl = this.gl;
        r = r || 0.2;
        g = g || 0.3;
        b = b || 0.3;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearColor(r, g, b, 1.0);
    }

    use(name: string) {
        name = name || "default"
        if (this.shader[name]) this.shader[name].use();
    }

    clearProgram() {
        // this.closeControl()
        this.needUpdate = false;
        for (let name in this.shader) {
            this.shader[name].destroy()
        }
        this.share = {}
        this.shader = {};
    }

    wasdStatus: IWASDStatus

    controlPlugin: MoveControl;

    control(type: string) {
        // this.initControl();
        type = type || "move";
        let _class = MoveControl;
        switch (type) {
            case "move":
                _class = MoveControl;
                break;
            case "fps":
                _class = FPSControl;
                break;
        }
        let ctrl = this.controlPlugin = new _class();
        ctrl.initControl();
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

    /**
     * 抽空改成GemotryUtils, 用于快速生成某些规则几何数据
     */
    cube() {
        return [
            -0.5, -0.5, -0.5, 0.0, 0.0,
            0.5, -0.5, -0.5, 1.0, 0.0,
            0.5, 0.5, -0.5, 1.0, 1.0,
            0.5, 0.5, -0.5, 1.0, 1.0,
            -0.5, 0.5, -0.5, 0.0, 1.0,
            -0.5, -0.5, -0.5, 0.0, 0.0,

            -0.5, -0.5, 0.5, 0.0, 0.0,
            0.5, -0.5, 0.5, 1.0, 0.0,
            0.5, 0.5, 0.5, 1.0, 1.0,
            0.5, 0.5, 0.5, 1.0, 1.0,
            -0.5, 0.5, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.5, 0.0, 0.0,

            -0.5, 0.5, 0.5, 1.0, 0.0,
            -0.5, 0.5, -0.5, 1.0, 1.0,
            -0.5, -0.5, -0.5, 0.0, 1.0,
            -0.5, -0.5, -0.5, 0.0, 1.0,
            -0.5, -0.5, 0.5, 0.0, 0.0,
            -0.5, 0.5, 0.5, 1.0, 0.0,

            0.5, 0.5, 0.5, 1.0, 0.0,
            0.5, 0.5, -0.5, 1.0, 1.0,
            0.5, -0.5, -0.5, 0.0, 1.0,
            0.5, -0.5, -0.5, 0.0, 1.0,
            0.5, -0.5, 0.5, 0.0, 0.0,
            0.5, 0.5, 0.5, 1.0, 0.0,

            -0.5, -0.5, -0.5, 0.0, 1.0,
            0.5, -0.5, -0.5, 1.0, 1.0,
            0.5, -0.5, 0.5, 1.0, 0.0,
            0.5, -0.5, 0.5, 1.0, 0.0,
            -0.5, -0.5, 0.5, 0.0, 0.0,
            -0.5, -0.5, -0.5, 0.0, 1.0,

            -0.5, 0.5, -0.5, 0.0, 1.0,
            0.5, 0.5, -0.5, 1.0, 1.0,
            0.5, 0.5, 0.5, 1.0, 0.0,
            0.5, 0.5, 0.5, 1.0, 0.0,
            -0.5, 0.5, 0.5, 0.0, 0.0,
            -0.5, 0.5, -0.5, 0.0, 1.0
        ]
    }
}


export interface shaderSource {
    shader: string,
    vs: string,
    img?: string[],
    uniform?: any
}