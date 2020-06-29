import KeyBoard from "../Input/KeyBoard";

export class Control {
    public keyStatus: IWASDStatus = {
        w: false,
        a: false,
        s: false,
        d: false
    }

    public cameraPos = glMatrix.vec3.fromValues(0, 0, 3);
    public cameraFront = glMatrix.vec3.fromValues(0.0, 0.0, -1.0);
    public cameraUp = glMatrix.vec3.fromValues(0.0, 1.0, 0.0);
    public cameraSpeed = 0.2;

    public initControl() {
        KeyBoard.wasd(this.keyStatus);
        
    }

    public closeControl() {
        KeyBoard.clearWASD();
        this.keyStatus.w = false;
        this.keyStatus.a = false;
        this.keyStatus.s = false;
        this.keyStatus.d = false;
    }
}