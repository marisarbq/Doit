
import WebGL2Application from "./Application/WebGL2Application";
import vs from "./glsl/tex.vert";
import fs from "./glsl/tex.frag";


export default class Main {

    app: WebGL2Application;

    constructor(canvas?: HTMLCanvasElement) {

        canvas = !canvas ? Main.createCanvas() : canvas;
        this.app = WebGL2Application.createApplication(canvas);
        console.log(this.app)
    }

    private init() {
        this.app.create(vs,fs);


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
        canvas.height = 720;
        canvas.id = "marisa_stage";
        canvas.className = "marisa_stage"
        canvas.style.width = '640px'
        canvas.style.height = '360px'
        document.body.appendChild(canvas);
        return canvas;
    }
}

const game = new Main();

