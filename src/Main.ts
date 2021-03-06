
import WebGL2Application from "./Application/WebGL2Application";
import WebGL2Project from "./WebGL2Project/WebGL2Project";
import KeyBoard from "./Input/KeyBoard";
import BackCanvas from "./Application/BackCanvas";


//Samples
import Triangle from "./Samples/Triangle.marisa";
import TriangleTexture from "./Samples/TriangleTexture.marisa";
import CubeTexture from "./Samples/CubeTexture.marisa";
import Transformation from "./Samples/Transformation.marisa";
import TransformationRot from "./Samples/TransformationRot.marisa";
import TransformationCube from "./Samples/TransformationCube.marisa";
import TransformationMultiCube from "./Samples/TransformationMultiCube.marisa";
import CubeTextureGray from "./Samples/CubeTextureGray.marisa";
import CubeTextureColor from "./Samples/CubeTextureColor.marisa";
import ControlBaseMove from "./Samples/Control/BaseMove.marisa";
import ControlBaseFPS from "./Samples/Control/BaseFPS.marisa";
import LightingBase from "./Samples/Lighting/Base.marisa";
import LightingAmbient from "./Samples/Lighting/Ambient.marisa";
import LightingNormal from "./Samples/Lighting/Normal.marisa";
import LightingMaterial from "./Samples/Lighting/Material.marisa";


import Pointer from "./Input/Pointer";


export default class Main {

    samples: { [name: string]: IMarisa } = {
        Triangle,
        TriangleTexture,
        CubeTexture,
        CubeTextureGray,
        CubeTextureColor,
        Transformation,
        TransformationRot,
        TransformationCube,
        TransformationMultiCube,
        ControlBaseMove,
        ControlBaseFPS,
        LightingBase,
        LightingAmbient,
        LightingNormal,
        LightingMaterial
    }

    app: WebGL2Application;

    programPool: { [name: string]: WebGL2Project } = {}
    id: number = 0;

    constructor(viewcanvas?: HTMLCanvasElement) {

        viewcanvas = !viewcanvas ? Main.createViewCanvas() : viewcanvas;
        this.app = WebGL2Application.createApplication(viewcanvas);
        KeyBoard.init();
        Pointer.init(this.app.canvas);
        this.init()

        console.log(this.samples);
        this.runId(0);
        let ex = /\?id=(.*)/g.exec(location.search);
        ex ? this.runId(this.id = ex["1"]) : void 0;

        this.initButton();
    }

    demo: WebGL2Project;

    private init() {
        this.demo = this.app.createProject();
    }

    runId(id: number) {
        let arr = Object.keys(this.samples);
        if (id >= arr.length) { console.error("请输入正确的序号"); return };
        let name = arr[id];
        document.title = name;
        this.drawonce(this.samples[name]);
    }

    run(name: string) {
        this.drawonce(this.samples[name]);
    }

    list() {
        Object.keys(this.samples).map((item, index) => {
            console.log(index, item)
        })
    }

    drawonce(obj: IMarisa) {
        this.demo.draw(obj)
    }

    bar: HTMLDivElement;
    initButton() {
        this.bar = document.createElement("div");
        Object.assign(this.bar.style, {
            width: '200px',
            height: '200px'
        })
        document.body.appendChild(this.bar);
        this.refresh()
    }

    refresh() {
        this.bar.innerHTML = `
        ${this.id > 0 ? `<a href="./index.html?id=${~~this.id - 1}">上一个</a>` : ``}
        ${this.id < Object.keys(this.samples).length - 1 ? `<a href="./index.html?id=${~~this.id + 1}">下一个</a>` : ``}
        `
    }

    static loadJavaScriptLibrary(url: string) {
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

