import Application from "./Application";
import WebGL2Project from "../WebGL2Project/WebGL2Project";

export default class WebGL2Application extends Application {

    public gl: WebGL2RenderingContext;
    public canvas: HTMLCanvasElement;

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

    createProject(vs: string, fs: string) {
        return WebGL2Project.create(this.gl, vs, fs)
    }
}  