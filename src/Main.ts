
import WebGL2Application from "./Application/WebGL2Application";
import WebGL2Project from "./WebGL2Project/WebGL2Project";


import vs from "./glsl/tex.vert";
import fs from "./glsl/tex.frag";

export default class Main {

    app: WebGL2Application;
    programPool: { [name: string]: WebGL2Project } = {}

    constructor(canvas?: HTMLCanvasElement) {

        canvas = !canvas ? Main.createCanvas() : canvas;
        this.app = WebGL2Application.createApplication(canvas);
        console.log(this.app)
        this.init()
    }

    demo: WebGL2Project;

    private init() {
        const demo = this.demo = this.app.createProject(vs, fs);
        demo.drawCall(project => {
            let gl = project.gl;
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


            var aPos = gl.getAttribLocation(project.program, 'aPos');
            gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 3 * v.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(aPos);
            // gl.enableVertexAttribArray(0);
            // gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3*4, 0);
            // gl.bindAttribLocation(program,1,"v3Position");
            gl.useProgram(project.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        })
    }

    test() {
        this.demo.drawCall(project => {
            let gl = project.gl;
            let vertices = [
                -0.5, -0.5, 0.0,
                0.5, -0.5, 0.0,
                0.0, 0.5, 0.0,
                0.5, 0.0, 0.0
            ];
            //glGenBuffers
            let VBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            let v = new Float32Array(vertices);
            gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);


            var aPos = gl.getAttribLocation(project.program, 'aPos');
            gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 3 * v.BYTES_PER_ELEMENT, 0);
            gl.enableVertexAttribArray(aPos);
            // gl.enableVertexAttribArray(0);
            // gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3*4, 0);
            // gl.bindAttribLocation(program,1,"v3Position");
            gl.useProgram(project.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            gl.drawArrays(gl.LINE_LOOP, 0, 4);
        })
    }

    static loadJavaScriptLibrary(url) {
        var script = document.createElement('script');
        script.async = false;
        script.src = url;
        document.body.appendChild(script);
    }

    static createCanvas(): HTMLCanvasElement {
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

