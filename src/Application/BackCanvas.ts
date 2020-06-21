export default class BackCanvas {
    node: HTMLCanvasElement;
    constructor() {
        this.node = document.createElement("canvas");
        this.node.width = 1024
        this.node.height = 1024
    }

}