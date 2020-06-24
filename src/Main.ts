
import WebGL2Application from "./Application/WebGL2Application";
import WebGL2Project from "./WebGL2Project/WebGL2Project";

import BackCanvas from "./Application/BackCanvas";


//Samples
import Triangle from "./Samples/Triangle.marisa";
import TriangleTexture from "./Samples/TriangleTexture.marisa";
import CubeTexture from "./Samples/CubeTexture.marisa";
import Transformation from "./Samples/Transformation.marisa";


export default class Main {

    samples: { [name: string]: IMarisa } = {
        Triangle,
        TriangleTexture,
        CubeTexture,
        Transformation
    }

    app: WebGL2Application;
    programPool: { [name: string]: WebGL2Project } = {}

    constructor(viewcanvas?: HTMLCanvasElement) {

        viewcanvas = !viewcanvas ? Main.createViewCanvas() : viewcanvas;
        this.app = WebGL2Application.createApplication(viewcanvas);
        this.init()
        console.log(this.samples);
        this.runId(0);
    }

    demo: WebGL2Project;

    private init() {
        this.demo = this.app.createProject();
    }

    runId(id: number) {
        let arr = Object.keys(this.samples);
        if (id >= arr.length) { console.error("请输入正确的序号"); return };
        let name = arr[id];
        this.drawonce(this.samples[name]);
    }

    run(name: string) {
        this.drawonce(this.samples[name]);
    }

    drawonce(obj: IMarisa) {
        this.demo.draw(obj)
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

