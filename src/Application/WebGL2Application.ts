import Application from "./Application";
import Shader from "../Shader/Shader";

export default class WebGL2Application extends Application {

    public gl: WebGL2RenderingContext;
    public canvas: HTMLCanvasElement;

    public program: WebGLProgram;

    static createApplication(canvas: HTMLCanvasElement): WebGL2Application {
        let app = new WebGL2Application("webgl2");
        app.canvas = canvas;
        app.gl = app.canvas.getContext("webgl2");
        if (!app.gl) {
            alert("浏览器不支持webgl2,启动失败")
            return;
        }
        return app;
    }

    createProgram(): WebGLProgram {  


        return this.program = this.gl.createProgram();
    }


    create(vs: string, fs: string): void {
        let vertexShader = new Shader(vs, "vert");
        let fragmentShader = new Shader(fs, "frag");

        vertexShader.complete(this.gl);
        fragmentShader.complete(this.gl);

        if (!vertexShader || !fragmentShader) return;

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);

        this.gl.linkProgram(this.program);
    }

} 