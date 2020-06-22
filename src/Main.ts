
import WebGL2Application from "./Application/WebGL2Application";
import WebGL2Project from "./WebGL2Project/WebGL2Project";


import vs from "./glsl/tex.vert";
import fs from "./glsl/tex.frag";
import BackCanvas from "./Application/BackCanvas";

import marisaDraw from "./Samples/Draw.marisa";
import textureDraw from "./Samples/Texture.marisa";

export default class Main {

    app: WebGL2Application;
    programPool: { [name: string]: WebGL2Project } = {}

    constructor(viewcanvas?: HTMLCanvasElement) {

        viewcanvas = !viewcanvas ? Main.createViewCanvas() : viewcanvas;
        this.app = WebGL2Application.createApplication(viewcanvas);
        console.log(this.app)
        this.init()
        this.drawonce(marisaDraw);
    }

    demo: WebGL2Project;

    private init() {
        this.demo = this.app.createProject();
    }

    tex() {
        console.log(textureDraw);
        this.drawonce(textureDraw);
    }

    drawonce(obj: IMarisa) {
        this.demo.draw({
            vs: obj.vs,
            fs: obj.fs,
            img: obj.img
        }, project => {
            obj.draw(project)
        })
    }

    test2() {
        this.demo.drawCall(project => {
            let gl = project.gl;
            
            let vertices = [
                -1.0, -0.5, 0.0,
                0.5, -0.5, 0.0,
                0.0, 0.5, 0.0,
                1.0, 0.0, 0.0
            ];
            //glGenBuffers
            let VBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            let v = new Float32Array(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);


            var aPos = gl.getAttribLocation(project.program, 'aPos');
            gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 3 * v.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(aPos);

            gl.useProgram(project.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            gl.drawArrays(gl.LINE_STRIP, 0, 4);
        })
    }

    static loadJavaScriptLibrary(url) {
        var script = document.createElement('script');
        script.async = false;
        script.src = url;
        document.body.appendChild(script);
    }

    //创建可见的Canvas对象
    static createViewCanvas(): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.width = 1280;
        canvas.height = 1280;
        canvas.id = "marisa_stage";
        canvas.className = "marisa_stage"
        canvas.style.width = '640px'
        canvas.style.height = '640px'
        document.body.appendChild(canvas);
        return canvas;
    }
}

window["game"] = new Main();

