/**
 * 关于离屏画布的用途和使用思路，目前还没有完全想清楚，但是的确可以通过额外的渲染途径去创建需要的其他纹理
 * 比如说RenderTarget、canvasFillText等等
 */
export default class BackCanvas {
    node: HTMLCanvasElement;
    constructor() {
        this.node = document.createElement("canvas");
        this.node.width = 1024
        this.node.height = 1024
    }

}